<?php

/** 
 * @package		clubvegas999
 * @subpackage		com_payment
 * @copyright		Copyright (C) 2012 Creativeentertainmen Ltd. All rights reserved.
 * @author			Chamnan Nop. Email: chamnan.nop@gmail.com
 */

defined('_JEXEC') or die;
require(JPATH_ROOT."/vendor/autoload.php");
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Configuration.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Utility.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Sessions.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999PDOMySQL.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999PDOMaster.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Player.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Utility.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'libs'.DS.'phpmailer'.DS.'lib'.DS.'class.phpmailer.php');

jimport('joomla.application.component.modelform');
jimport('joomla.event.dispatcher');
jimport('joomla.plugin.helper');

/**
 * Payment model class for Payment components.
 *
 * @package		Joomla.Site
 * @subpackage	com_payment
 * @since		1.6
 */
class PaymentModelNeteller extends JModelForm
{
	/**
	 * @var		object	The user registration data.
	 * @since	1.6
	 */
	
	protected $currency=array();
	protected $data;
	protected $dopsit_trans_id;
	protected $error=array();

	/**
	 * Method to get the registration form.
	 *
	 * The base form is loaded from XML and then an event is fired
	 * for users plugins to extend the form with extra fields.
	 *
	 * @param	array	$data		An optional array of data for the form to interogate.
	 * @param	boolean	$loadData	True if the form is to load its own data (default case), false if not.
	 * @return	JForm	A JForm object on success, false on failure
	 * @since	1.6
	 */
	public function getForm($data = array(), $loadData = true)
	{
		// Get the form.
		$form = $this->loadForm('com_payment.payment', 'neteller', array('control' => 'jform', 'load_data' => $loadData));
		if (empty($form)) {
			return false;
		}
		
		return $form;
	}	
	
	/**
	 * Method to save the form data.
	 *	 
	 */ 
	public function deposit($requestData)
	{
			$deposit_status=true;	
			// OUT Params for spNetellerGetNetellerSetting
			$po_url_api='@po_url_api';
			$po_version='@po_version';
			$po_language_code='@po_language_code';
			$po_merchant_id='@po_merchant_id';
			$po_merch_key='@po_merch_key';
			$po_merch_pass='@po_merch_pass';
			$po_merch_name='@po_merch_name';
			$po_merch_account='@po_merch_account';
			
			$trans_data= null;
			$fields_string= null;
			
			$playerName= (isset($_SESSION['playerName']) && $_SESSION['playerName']!="")?$_SESSION['playerName']:"No Player Session";
			$playerEmail= (isset($_SESSION['playerEmail']) && $_SESSION['playerEmail']!="")?$_SESSION['playerEmail']:"No Email Session";
			$playerCurrency= (isset($_SESSION['playerCurrency']) && $_SESSION['playerCurrency']!="")?$_SESSION['playerCurrency']:"NO";
			$playerIP= (isset($_SESSION['playerIP']) && $_SESSION['playerIP']!="")?$_SESSION['playerIP']:"No IP";
			
			// Generate CV99 DepositeID for NETELLER Request Param.
			$cv_trans_id =$this->getDepositTransID();
			$currency_name= $this->getCurrencyNameByID($requestData['deposit_neteller_currency']);
			
			// Use for post back validation.
			$custom_1='CV999-Account: '.$playerName;
			$custom_2='CV999-PassCode: '.md5(strrev(microtime(true)).microtime(true));
			$custom_3='CV999-Email: '.$playerEmail;
			binding();
			// Get Neteller Setting Params.
			$cvDB = new CV999PDOMaster();

			$cvDB->doQuery('CALL spNetellerGetNetellerSetting('.$po_url_api.','.$po_version.','.$po_language_code.','.$po_merchant_id.','.$po_merch_key.','.$po_merch_pass.','.$po_merch_name.','.$po_merch_account.')');
			$neteller = $cvDB->getOutParams($po_url_api.','.$po_version.','.$po_language_code.','.$po_merchant_id.','.$po_merch_key.','.$po_merch_pass.','.$po_merch_name.','.$po_merch_account);
			
			//http://davidwalsh.name/execute-http-post-php-curl
			
			//set POST variables
			$url = $neteller[$po_url_api];
			$fields = array(
					'version'=>$neteller[$po_version],
					'amount'=>$requestData['deposit_neteller_amount'],
					'currency'=>$currency_name,
					'net_account'=>$requestData['deposit_neteller_id'],
					'secure_id'=>$requestData['deposit_neteller_secure_id'],
					'merchant_id'=>$neteller[$po_merchant_id],
					'merch_key'=>$neteller[$po_merch_key],
					'merch_name'=>$neteller[$po_merch_name],
					'merch_account'=>$neteller[$po_merch_account],
					'merch_transid'=>$cv_trans_id,
					'language_code'=>$neteller[$po_language_code],
					'custom_1'=>$custom_1,
					'custom_2'=>$custom_2,
					'custom_3'=>$custom_3
			);
			
			//url-ify the data for the POST
			foreach($fields as $key=>$value) {
				$fields_string .= $key.'='.$value.'&';
			}
			rtrim($fields_string,'&');
			
			//open connection
			$ch = curl_init();
			
			//set the url, number of POST vars, POST data
			curl_setopt($ch,CURLOPT_URL,$url);
			curl_setopt($ch,CURLOPT_POST,count($fields));
			curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
			
			//execute post
			$result = curl_exec($ch);
			
			//close connection
			curl_close($ch);
			
			// Convert Respond object from xml to arrayObject. 
			$netellerRespondArray= CV999Utility::xml2array($result);
			
			// transactions log for tbl_neteller_transactions_history.
						
			$logNetellerRequest = var_export($fields,true);
			
			// XML Format
			$logNetellerRespond = $result;
			
			$logNetellerRespondArray = var_export($netellerRespondArray,true);

			dump($logNetellerRespondArray);
			exit();
			if (array_key_exists('netdirect',$netellerRespondArray)&&array_key_exists('netdirect_attr',$netellerRespondArray)) {
			
				// Check transaction approval
				if($netellerRespondArray['netdirect']['approval']=='yes' && $netellerRespondArray['netdirect']['error']=='none'){
					
					// Verification Request and Respond
					if($netellerRespondArray['netdirect']['custom_1']==$custom_1 && $netellerRespondArray['netdirect']['custom_2']==$custom_2 && $netellerRespondArray['netdirect']['custom_3']==$custom_3){
						
						$trans_data= array(
								0,
								$playerName,
								$requestData['deposit_neteller_id'],
								$cv_trans_id,
								$netellerRespondArray['netdirect']['trans_id'],
								date('Y-m-d H:i:s'),
								$netellerRespondArray['netdirect']['approval'],
								$netellerRespondArray['netdirect']['error'],
								$netellerRespondArray['netdirect']['merchant_currency'],
								$netellerRespondArray['netdirect']['merchant_amount'],
								$netellerRespondArray['netdirect']['total_fee'],
								$playerCurrency,
								$playerIP,
								6,
								$logNetellerRequest,
								$logNetellerRespond,
								$logNetellerRespondArray
								);
						
						$cvDB->doQueryWithParam('CALL spNetellerInsertTransactions(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',$trans_data);
						
						
						$email_body='Dear Developers,<br /><br />'.
								'There is Deposit transaction with NETELLER as information below:<br /><br />

								<table border=0>
								    <tr>
								        <td>Player Account</td>
								        <td>:</td>
								        <td>'.$playerName.'</td>
								    </tr>
								    <tr>
								        <td>Player Currency</td>
								        <td>:</td>
								        <td>'.$playerCurrency.'</td>
								    </tr>
								    <tr>
								        <td>IP</td>
								        <td>:</td>
								        <td>'.$playerIP.'</td>
								    </tr>
								    <tr>
								        <td>Neteller ID</td>
								        <td>:</td>
								        <td>'.$requestData['deposit_neteller_id'].'</td>
								    </tr>
								    <tr>
								        <td>Neteller Transaction ID</td>
								        <td>:</td>
								        <td>'.$netellerRespondArray['netdirect']['trans_id'].'</td>
								    </tr>
								    <tr>
								        <td>Deposit Amount</td>
								        <td>:</td>
								        <td>'.$netellerRespondArray['netdirect']['merchant_amount'].'</td>
								    </tr>
								    <tr>
								        <td>Deposit Fee</td>
								        <td>:</td>
								        <td>'.$netellerRespondArray['netdirect']['total_fee'].'</td>
								    </tr>
								    <tr>
								        <td>Deposit Currency</td>
								        <td>:</td>
								        <td>'.$currency_name.'</td>
								    </tr>
								</table>
								<br /><br />Please check AG.CLUBVEGAS999.COM.<br /><br />'.
								'Cheers,<br />CLUBVEGAS999.COM';
						
// 						error_log(	date('Y-m-d H:i:s').' Neteller Request: ' . $logNetellerRequest . "\n".
// 									date('Y-m-d H:i:s').' Neteller Respond XML: ' . $logNetellerRespond . "\n".
// 									date('Y-m-d H:i:s').' Neteller Respond Array: ' . $logNetellerRespondArray . "\n"
// 									, 3, "/var/log/clubvegas/php.log");

						$deposit_status= true;
						$this->sendEmail($email_body);
					}else{
							$trans_data= array(
							1,
							$playerName,
							$requestData['deposit_neteller_id'],
							$cv_trans_id,
							'0',
							date('Y-m-d H:i:s'),
							'no',
							'wrong',
							$currency_name,
							'0',
							'0',
							$playerCurrency,
							$playerIP,
							7,
							$logNetellerRequest,
							$logNetellerRespond,
							$logNetellerRespondArray
							);
							// dump($trans_data);
							// exit();
							$cvDB->doQueryWithParam('CALL spNetellerInsertTransactions(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',$trans_data);
							
// 							error_log(	date('Y-m-d H:i:s').' Neteller Request: ' . $logNetellerRequest . "\n".
// 									date('Y-m-d H:i:s').' Neteller Respond XML: ' . $logNetellerRespond . "\n".
// 									date('Y-m-d H:i:s').' Neteller Respond Array: ' . $logNetellerRespondArray . "\n"
// 									, 3, "/var/log/clubvegas/php.log");
			
							$this->error=null;
							//$error_message= $this->getNetellerErrorMessage($netellerRespondArray['netdirect']['error']);
							$this->setError(' Wrong Respond. Please try again later.');
							$deposit_status= false;
						}
					}elseif ($netellerRespondArray['netdirect']['approval']=='no' && is_numeric($netellerRespondArray['netdirect']['error'])){
						// Transaction Declined
						
						$trans_data= array(
								1,
								$playerName,
								$requestData['deposit_neteller_id'],
								$cv_trans_id,
								'0',
								date('Y-m-d H:i:s'),
								$netellerRespondArray['netdirect']['approval'],
								$netellerRespondArray['netdirect']['error'],
								$currency_name,
								'0',
								'0',
								$playerCurrency,
								$playerIP,
								7,
								$logNetellerRequest,
								$logNetellerRespond,
								$logNetellerRespondArray
						);
						dump($trans_data);
						exit();
							
						$cvDB->doQueryWithParam('CALL spNetellerInsertTransactions(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',$trans_data);
						
// 						error_log(	date('Y-m-d H:i:s').' Neteller Request: ' . $logNetellerRequest . "\n".
// 								date('Y-m-d H:i:s').' Neteller Respond XML: ' . $logNetellerRespond . "\n".
// 								date('Y-m-d H:i:s').' Neteller Respond Array: ' . $logNetellerRespondArray . "\n"
// 								, 3, "/var/log/clubvegas/php.log");
						
						$this->error=null;
						$this->setError(' NETELLER Transaction');
						$this->setError(' Error Code: '.$netellerRespondArray['netdirect']['error']);
						$this->setError(' Error Message: '.$netellerRespondArray['netdirect']['error_message']);
						
						$deposit_status= false;
				}
			
			}else{
				
				// NETELLER Respond Wrong Fromat
					
				$trans_data= array(
						1,
						$playerName,
						$requestData['deposit_neteller_id'],
						$cv_trans_id,
						'0',
						date('Y-m-d H:i:s'),
						'no',
						'wrong',
						$currency_name,
						'0',
						'0',
						$playerCurrency,
						$playerIP,
						7,
						$logNetellerRequest,
						$logNetellerRespond,
						$logNetellerRespondArray
				);
				$cvDB->doQueryWithParam('CALL spNetellerInsertTransactions(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',$trans_data);
				
// 				error_log(	date('Y-m-d H:i:s').' Neteller Request: ' . $logNetellerRequest . "\n".
// 						date('Y-m-d H:i:s').' Neteller Respond XML: ' . $logNetellerRespond . "\n".
// 						date('Y-m-d H:i:s').' Neteller Respond Array: ' . $logNetellerRespondArray . "\n"
// 						, 3, "/var/log/clubvegas/php.log");

				$this->error=null;
				//$error_message= $this->getNetellerErrorMessage($netellerRespondArray['netdirect']['error']);
				$this->setError(' Request have no Respond. Please try again later.');
				
				$deposit_status= false;
			}
		
			$cvDB->closeConnection();
			
		return $deposit_status;
	}
	
	
	/**
	 * Method to validate data.
	 *
	 */
	public function validateData($requestData)	
	{
		$status=true;
		
		if($requestData['deposit_neteller_id']==""){
			$this->setError(' Account ID is required!');
			$status=false;
		}
		elseif(!is_numeric($requestData['deposit_neteller_id'])){
				$this->setError(' Account ID is invalid!');
				$status=false;
		}else{
			if(strlen($requestData['deposit_neteller_id'])!=12){
				$this->setError(' Account ID must be 12 digits.');
				$status=false;
			}
		}
		
		if($requestData['deposit_neteller_secure_id']==""){
			$this->setError(' Secure ID is required!');
			$status=false;
		}
		elseif(!is_numeric($requestData['deposit_neteller_secure_id'])){
			$this->setError(' Secure ID is invalid!');
			$status=false;
		}else{
			if(strlen($requestData['deposit_neteller_secure_id'])!=6){
				$this->setError(' Secure ID must be 6 digits.');
				$status=false;
			}
		}
				
		// Validate Currency Number must be >0
		if($requestData['deposit_neteller_currency'] ==0)
		{
			$this->setError(' Please select currency.');
			$status=false;
		}else {
			if($this->checkCurrencyExist($requestData['deposit_neteller_currency'])==0){
				$this->setError(' Please select the correct currency.');
				$status=false;
			}
		}
		
		// Validate Currency Number must be >0
		if (!is_numeric($requestData['deposit_neteller_amount']))
		{
			$this->setError(' Please insert a valid amount!');
			$status=false;
		}

		// validate deposit amount for USD
		if ($requestData['deposit_neteller_currency'] == 1)
		{
			// validate USD
			if ($requestData['deposit_neteller_amount'] < 10)
			{
				$this->setError(' Please enter 10 USD as minimum.');
				$status=false;
			}
		}
		// validate deposit amount for EUR
		else if ($requestData['deposit_neteller_currency'] == 12)
		{
			// validate EUR
			if ($requestData['deposit_neteller_amount'] < 10)
			{
				$this->setError(' Please enter 10 EUR as minimum.');
				$status=false;
			}
		}
		
		if ($this->checkPlayerOnlineGameLoby($_SESSION['playerName'])==1)
		{
			$this->setError(' Please Logout From GAME LOBBY.');
			$status=false;
		}
		
		return $status;		
		
	}
	
	/**
	 * Method to return the error object.
	 *
	 */
	public function setError($errorString=null){
		$this->error[]=$errorString;		
	}	
	
	/**
	 * Method to Return the error object.
	 *
	 */
	public function getError(){
		return $this->error;
	}
	
	/**
	 * Method to sendEmail.
	 *
	 */
	private function sendEmail($mail_body){		
		
		$mail             = new PHPMailer(); // defaults to using php "mail()"
		$mail->SetFrom('noreply@creativeentertainmentltd.com', 'CLUBVEGAS999.COM');
		$mail->AddAddress('it.dev@creativeentertainmentltd.com','IT DEV');
        $mail->AddCC('kim.mou@creativeentertainmentltd.com','Kimny');
		$mail->Subject    = 'Club Vegas 999 - NETELLER Deposit - '.date("Y-m-d H:i:s");
		$body             = $mail_body;
		$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

		$mail->MsgHTML($body);

		if(!$mail->Send()) {
			return false;
		} else {
			return true;
		}
		
	}
	
	
	public function getCurrency(){
	
		$cvDB = new CV999PDOMaster();
	
		$this->currency=$cvDB->getQueryObject('SELECT id,currency_name FROM cv999_fd_master.tbl_currency WHERE neteller=1 ORDER BY id');
		$cvDB->closeConnection();
		return $this->currency;
	}
	
	private function getCurrencyNameByID($currency_id){
		
		$cvDB = new CV999PDOMaster();
		
		$currency_name = $cvDB->getQueryObject('SELECT currency_name FROM cv999_fd_master.tbl_currency where id='.$currency_id);
		$cvDB->closeConnection();
		return @$currency_name[0]['currency_name'];
	}
	
	private function checkCurrencyExist($id){
	
		$cvDB = new CV999PDOMaster();
	
		$this->currency=$cvDB->getQueryObject('SELECT count(0) as result FROM cv999_fd_master.tbl_currency where id='.$id.';');
		$cvDB->closeConnection();
		return @$this->currency[0]['result'];
	}
	
	private function checkPlayerOnlineGameLoby($account_id){
		
		$po_result='@po_result';

		$cvDB = new CV999PDOMaster();

		$cvDB->doQuery('CALL spNetellerIsPlayerOnlineInGameLobby(\''.$account_id.'\','.$po_result.')');
		$result = $cvDB->getOutParams($po_result);
		$cvDB->closeConnection();
		
		return $result[$po_result];
	}
	
	private  function getNetellerErrorMessage($error_code){
		
		$po_message='@po_message';
		$po_error_type='@po_error_type';

		$cvDB = new CV999PDOMaster();

		$cvDB->doQuery('CALL spNetellerGetErrorMessage(\''.$error_code.'\','.$po_error_type.','.$po_message.')');
		$result = $cvDB->getOutParams($po_message);
		$cvDB->closeConnection();
	
		return $result[$po_message];
	}

	private function getDepositTransID(){	
		$this->dopsit_trans_id=CV999Utility::generateTransactionNumber("AD");
		return $this->dopsit_trans_id;
	}
	
}

	function dump($data) {
		echo('
			<body style="background-color:black; ">
			<pre  style="font-size: 16px; color: #00FF09; background-color: black; padding:15px; border-radius: 4px; font-family: "Times New Roman", Times, serif;>'.$data. '</pre>
			</body>
		');
	}

	function binding() {
		eval(\Psy\sh());
	}