<?php

/** 
 * @package		clubvegas999
 * @subpackage		com_payment
 * @copyright		Copyright (C) 2012 Creativeentertainmen Ltd. All rights reserved.
 * @author			Chamnan Nop. Email: chamnan.nop@gmail.com
 */

defined('_JEXEC') or die;

require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Configuration.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Utility.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Sessions.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999PDOMySQL.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999PDOMaster.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Player.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Utility.php');
require_once (JPATH_ROOT.DS.'cv999'.DS.'libs'.DS.'phpmailer'.DS.'lib'.DS.'class.phpmailer.php');

// Redis Classes

require_once(JPATH_ROOT.DS.'cv999'.DS.'libs'.DS.'Predis'.DS.'RedisSharedConfigurations.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'ICV999RedisCore.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'ICV999RedisStaff.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999RedisCore.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999RedisMain.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999RedisLogin.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999RedisLobbies.php');
require_once(JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999RedisLobbyRisks.php');


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
class PaymentModelPayment extends JModelForm
{
	/**
	 * @var		object	The user registration data.
	 * @since	1.6
	 */
	
	protected $currency			=	array();
	protected $netellercurrency	=	array();
	protected $skrillcurrency	=	array();
	protected $error			=	array();
	
	protected $data;
	protected $dopsit_trans_id;
	protected $withdraw_trans_id;
	protected $skrill_email;

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
		$form = $this->loadForm('com_payment.payment', 'withdraw', array('control' => 'jform', 'load_data' => $loadData));
		if (empty($form)) {
			return false;
		}
		
		return $form;
	}	
	
	/**
	 * Method to save the form data.
	 *	 
	 */ 
	public function dowithdraw($requestData,$method)
	{	
			// Load Joomla for using function genRandomPassword();
			jimport('joomla.user.helper');
			
			// Clean income DATA.
			$requestData			= 	CV999Utility::escape($requestData);
			$method					=	CV999Utility::escape($method);

            //$confirmation_code		=	JUtility::getHash(JUserHelper::genRandomPassword());
			$confirmation_code		=	JApplication::getHash(JUserHelper::genRandomPassword());
			$confirmation_code		=	substr($confirmation_code,0,4);
			
			$account_id				=	$_SESSION['playerName'];
			$amount					=	$requestData['withdraw_amount'];
			$currency_id			=	$_SESSION['playerCurrencyID'];
			$currency_name			=	$_SESSION['playerCurrency'];
			
			$bank_account_number	=	isset($requestData['bank_account_number'])?$requestData['bank_account_number']:'';
			$bank_account_name		=	isset($requestData['bank_account_name'])?$requestData['bank_account_name']:'';
			$bank_name				=	isset($requestData['bank_name'])?$requestData['bank_name']:'';
			$bank_branch			=	isset($requestData['bank_branch'])?$requestData['bank_branch']:'';
			$skrill_email			=	isset($requestData['withdraw_skrill_email'])?$requestData['withdraw_skrill_email']:'';
			$neteller_account		=	isset($requestData['neteller_account'])?$requestData['neteller_account']:'';
			
			// PDO binding parameters
			$insertData				=	Array(
												$account_id,
												$confirmation_code,
												$amount,
												$currency_id,
												$method,
												$bank_account_number,
												$bank_account_name,
												$bank_name,
												$bank_branch,
												$skrill_email,
												$neteller_account
										);
			
			
			$cvDB = new CV999PDOMaster();
			
			$cvDB->doQueryWithParam('CALL spFEPaymentWithdrawalRequest(?,?,?,?,?,?,?,?,?,?,?)',$insertData);
			
			
			$bank_info				=	'Bank Name: <strong>'.$bank_name.'</strong><br />
										Branch: <strong>'.$bank_branch.'</strong><br />
										Account Name: <strong>'.$bank_account_name.'</strong><br />		
										Account Number: <strong>'.$bank_account_number.'</strong>';
			$skill_info				=	'Skrill Email: <strong>'.$skrill_email.'</strong><br />';
			$neteller_info			=	'NETELLER Account: '.$neteller_account.'</strong><br />';
			
			$payment_type			=	($method==1)?$bank_info:(($method==2)?$skill_info:($method==3?$neteller_info:'<br />'));
			
			$email					=	array($_SESSION['playerEmail']);
			
			$email_body				=	'Dear '.$account_id.'<br /><br />'.
										'Following your withdrawal request below:<br /><br />
										Request Amount: <strong>'.$amount.'</strong><br />
										Request Currency: <strong>'.$currency_name.'</strong><br /><br />
										'. $payment_type .'							
										<br /><br />Then please copy the following confirmation code below: <br /><br /><strong>'.$confirmation_code.
										'</strong><br /><br />
										Cheers,<br />Club Vegas 999 Staff';
			
			$this->sendEmail($email,$email_body,$account_id,$amount.$currency_name);
		
			$cvDB->closeConnection();
			
			return $insertData;
	}
	
	public function confirm($requestData){
			// Clean income DATA.
			$requestData			=	CV999Utility::escape($requestData);
			
			$insertData				=	Array(
												$_SESSION['playerName'],
												$requestData['withdraw_confirm_code'],
												CV999Utility::generateTransactionNumber('FW'),
												CV999Utility::getRealIpAddress()
										);
			
			$cvDB = new CV999PDOMaster();
			
			$cvDB->doQueryWithParam('CALL spFEPaymentWithdrawalConfirm(?,?,?,?,@amount,@currency_id,@transaction_via,@bank_account_number,@bank_account_name,@bank_name,@bank_branch,@payment_account,@result)',$insertData);
			$account_id				=	$_SESSION['playerName'];
			$amount					= 	$cvDB->getOutParams('@amount');
			$amount					=	$amount['@amount'];	
			$currency_id			=	$cvDB->getOutParams('@currency_id');
			$currency_id			=	$currency_id['@currency_id'];
			$currency_name			=	$this->getCurrencyNameByID($currency_id);
			$method					=	$cvDB->getOutParams('@transaction_via');
			$method					=	$method['@transaction_via'];
			$bank_account_number	=	$cvDB->getOutParams('@bank_account_number');
			$bank_account_number	=	$bank_account_number['@bank_account_number'];
			$bank_account_name		=	$cvDB->getOutParams('@bank_account_name');
			$bank_account_name		=	$bank_account_name['@bank_account_name'];
			$bank_name				=	$cvDB->getOutParams('@bank_name');
			$bank_name				=	$bank_name['@bank_name'];
			$bank_branch			=	$cvDB->getOutParams('@bank_branch');
			$bank_branch			=	$bank_branch['@bank_branch'];
			$payment_account		=	$cvDB->getOutParams('@payment_account');
			$payment_account		=	$payment_account['@payment_account'];
			$result					=	$cvDB->getOutParams('@result');
			$result					=	$result['@result'];
			
			$bank_info				=	'<strong>BANK WITHDRAWAL</strong><br /><br />
										Bank Name: <strong>'.$bank_name.'</strong><br />
										Branch: <strong>'.$bank_branch.'</strong><br />
										Account Name: <strong>'.$bank_account_name.'</strong><br />
										Account Number: <strong>'.$bank_account_number.'</strong>';
			
			$skill_info				=	'<strong>MONEY BOOKER</strong><br /><br />
										Skrill Email: <strong>'.$payment_account.'</strong><br />';
			$neteller_info			=	'<strong>NETELLER</strong><br /><br />
										NETELLER Account: '.$payment_account.'</strong><br />';
			
			$payment_type			=	($method=='1')?$bank_info:(($method=='2')?$skill_info:($method=='3'?$neteller_info:'<br />'));
			
			if($result['@result']==1){
				$email_body			=	'Dear All,<br /><br />'.
										'Player <strong>'.$account_id.'</strong> has been requested the Withdrawal follow the information below:<br /><br />
										<u><strong>Player Information:</strong></u><br />
										Account ID: <strong>'.$account_id.'</strong><br />
										Player Currency: <strong>'.$_SESSION['playerCurrency'].'</strong><br />
										Email: '.$_SESSION['playerEmail'].'<br />
										Tel: '.$_SESSION['playerPhone'].'<br /><br /><br />
										Request Amount: <strong>'.$amount.'</strong><br />
										Request Currency: <strong>'.$currency_name.'</strong><br /><br />
										<u><strong>Payment Processor:</strong></u><br /><br />
										'. $payment_type .'<br /><br />				
										Please kindly check <a href=\'https://ag.clubvegas999.com\' target="_blank">AG.CLUBVEGAS999.COM</a>'.'<br /><br />
										Cheers,<br />Club Vegas 999 Staff.';


                $ptn = '/.*test-vig.*|.*staging.*:.*/';
                preg_match($ptn, JURI::base(), $matches);
				
				if(isset($matches[0])){
					
					$email			=	array(
												'it.dev@creativeentertainmentltd.com'
										);
				}else{
					
					$email			=	array(
												'cv999.wd@creativeentertainmentltd.com',
												'it.dev@creativeentertainmentltd.com'
										);					
				}
				
				$this->sendEmail($email,$email_body,$account_id,$amount.$currency_name);
			}
			$cvDB->closeConnection();
		
		return $result;
	}
	
	/**
	 * Method to validate data.
	 *
	 */
	public function validateData($requestData,$method)	
	{	
		// Clean income DATA.
		$requestData				= 	CV999Utility::escape($requestData);
		
		$status						=	'OK';
		
		// 1 = banking, 2 = skrill, 3 = neteller
		if($method==1){
			
			if($this->checkPendingWithdraw($_SESSION['playerName'])==1){
				
				$this->setError(' Your previous request is peding please contact Customer Support.');
				$status			=	'bankError';
			}
			
			if($this->checkPlayerOnLobby()){
				
				$this->setError(' Please Logout from Lobby first.');
				$status			=	'bankError';
				
			}
			
			if($_SESSION['playerCurrency']=='TEST' && (strpos($_SESSION['playerName'],'TESTCEDEV')===FALSE)){
				$this->setError(' TEST Currency could not withdraw.');
				$status			=	'bankError';
			}

			// Validate Currency Number must be >0
			if (!is_numeric($requestData['withdraw_amount']))
			{
				$this->setError(' Please insert a valid amount!');
				$status				=	'bankError';
			}else{
				$playerInfo 		=	$this->getPlayerInfo($_SESSION['playerName']);
				if(@$playerInfo[0]['balance'] < $requestData['withdraw_amount']){
					$this->setError(' Insufficient funds');
					$status			=	'bankError';
				}elseif ($requestData['withdraw_amount']<=0){
					$this->setError(' Withdrawal Amount must be bigger than 0.');
					$status			=	'bankError';
				}
					
			}
		}
		elseif($method==2){
			
			if($this->checkPendingWithdraw($_SESSION['playerName'])==1){
			
				$this->setError(' Your previous request is peding please contact Customer Support.');
				$status			=	'skrillError';
			}
			
			if($this->checkPlayerOnLobby()){
			
				$this->setError(' Please Logout from Lobby first.');
				$status			=	'skrillError';
			
			}
			
			if($_SESSION['playerCurrency']=='TEST' && (strpos($_SESSION['playerName'],'TESTCEDEV')===FALSE)){
				$this->setError(' TEST Currency could not withdraw.');
				$status			=	'skrillError';
			}
			
			if($requestData['withdraw_skrill_email']!=""){
				// Validate Email must be available and correct format.
				if (!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $requestData['withdraw_skrill_email']))
				{
					$this->setError(' Please enter valid email!');
					$status			=	'skrillError';
				}
			}
			
			if(strlen($_SESSION['playerEmail'])<1){
					
				$this->setError(' Your profile have no email address.');
				$status				=	'skrillError';
			
			}
			
			// Validate Currency Number must be >0
			if (!is_numeric($requestData['withdraw_amount']))
			{
				$this->setError(' Please insert a valid amount!');
				$status='skrillError';
			}else{
				$playerInfo 		=	$this->getPlayerInfo($_SESSION['playerName']);
				if(@$playerInfo[0]['balance'] < $requestData['withdraw_amount']){
					$this->setError(' Insufficient funds');
					$status			=	'skrillError';
				}elseif ($requestData['withdraw_amount']<=0){
					$this->setError(' Withdrawal Amount must be bigger than 0.');
					$status			=	'skrillError';
				}	
			}
		}
		
		elseif($method==3){
			
				if($this->checkPendingWithdraw($_SESSION['playerName'])==1){
				
					$this->setError(' Your previous request is peding please contact Customer Support.');
					$status			=	'ntellerError';
				}
			
				if($this->checkPlayerOnLobby()){
						
					$this->setError(' Please Logout from Lobby first.');
					$status			=	'ntellerError';
						
				}
				
				if($_SESSION['playerCurrency']=='TEST' && (strpos($_SESSION['playerName'],'TESTCEDEV')===FALSE)){
					$this->setError(' TEST Currency could not withdraw.');
					$status			=	'ntellerError';
				}
			
				if($requestData['neteller_account']!=""){
					if(!is_numeric($requestData['neteller_account'])){
						$this->setError(' NETELLER Account is invalid!');
						$status		=	'ntellerError';
					}else{ 
						if(strlen($requestData['neteller_account'])!=12){
							$this->setError(' NETELLER Account ID must be 12 digits.');
							$status	=	'netellerError';
						}
					}
				}else{
					$this->setError(' NETELLER Account ID must be 12 digits.');
					$status			=	'ntellerError';
				}
				
				// Validate Currency Number must be >0
				if (!is_numeric($requestData['withdraw_amount']))
				{
					$this->setError(' Please insert a valid amount!');
					$status			=	'netellerError';
				}else{
					$playerInfo 	= 	$this->getPlayerInfo($_SESSION['playerName']);
					if(@$playerInfo[0]['balance'] < $requestData['withdraw_amount']){
						$this->setError(' Insufficient funds');
						$status		=	'netellerError';
					}elseif ($requestData['withdraw_amount']<=0){
						$this->setError(' Withdrawal Amount must be bigger than 0.');
						$status		=	'netellerError';
					}
						
				}
		}
		
		return $status;	
		
	}
	
	public function validateConfirmation(){
		
		$status = true;
		if($this->checkPendingWithdraw($_SESSION['playerName'])==1){
		
			$this->setError(' Your previous request is peding please contact Customer Support.');
			$status			=	false;
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
	 * Method to checkPlayerOnLobby.
	 *
	 */
	
	private function checkPlayerOnLobby(){
		
		$redisLobbyRisk = new CV999RedisLobbyRisks(CV999Configuration::load()->getRedis('LOBBY_LIFE_TIME'));
		$redisLobby		= new CV999RedisLobbies(CV999Configuration::load()->getRedis('LOBBY_LIFE_TIME'));
		
		$onLobby		= FALSE;
		
		if($redisLobbyRisk->isOnLobby($_SESSION['playerType'], $_SESSION['playerName']) || $redisLobby->isOnLobby($_SESSION['playerType'], $_SESSION['playerName'])){
			
			$onLobby	= TRUE;
		}
		
		return $onLobby;
		
	}
	
	private function checkPendingWithdraw($account_id){
		
		$cvDB = new CV999PDOMaster();
		
		$status 				= 	'@status1';
		
		$cvDB->doQuery('CALL spFEPaymentCheckPendingWithdraw(\''.$account_id.'\',' . $status . ')');
		
		$result					=	$cvDB->getOutParams($status);
		$cvDB->closeConnection();
		
		return $result[$status];
		
	}
	
	
	/**
	 * Method to checkAccountExist.
	 *
	 */
	private function checkAccountExist($account_id=null){
		
		$cvDB = new CV999PDOMaster();
		$status 				= 	'@status1';
		
		$cvDB->doQuery('CALL spSignUpCheckPlayerExist(\''.$account_id.'\',' . $status . ')');
		
		$result					=	$cvDB->getOutParams($status);
		$cvDB->closeConnection();
		
		return $result[$status];
	}
	
	/**
	 * Method to checkEmailExist.
	 *
	 */
	private function checkEmailExist($email=null){
	
		$cvDB = new CV999PDOMaster();
		$status 				=	'@status1';
		$cvDB->doQuery('CALL spSignUpCheckEmailExist(\''.$email.'\',' . $status . ')');
			
		$result					=	$cvDB->getOutParams($status);	
	
		return $result[$status];
	}
	
	/**
	 * Method to sendEmail.
	 *
	 */
	private function sendEmail($email,$mail_body,$account_id,$amount){
		
		$mail             		=	new PHPMailer(); // defaults to using php "mail()"
		
		$mail->SetFrom('noreply@creativeentertainmentltd.com', 'CLUBVEGAS999.COM');
		
		foreach ($email as $value){			
			$mail->AddAddress($value,' ');
		}
		
		$mail->Subject    		=	'Withdrawal Request - '.$account_id.' - '.$amount.' - '.date('Y-m-d H:i:s');
		
		$body             		=	$mail_body;
			
		$mail->AltBody    		=	"To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
			
		$mail->MsgHTML($body);
			
		if(!$mail->Send()) {
			return false;
		} else {
			return true;
		}
		
	}
	
	private function getPlayerInfo($account_id){
		
		$cvDB = new CV999PDOMaster();
		
		$resultSet				=	$cvDB->getQueryObject('SELECT CONCAT(first_name,\' \',`last_name`) AS fullname, email,balance FROM vwPlayerActiveList WHERE account_id=\''.CV999Utility::escape($account_id).'\'');
		$cvDB->closeConnection();
		return $resultSet;
	}
	
	private function getCountryById($countryId)
	{		
		$cvDB = new CV999PDOMaster();
		
		$resultSet				=	$cvDB->getQueryObject('SELECT printable_name FROM cv999_fd_master.tbl_country WHERE cv999_fd_master.tbl_country.id='.CV999Utility::escape($countryId));
		$cvDB->closeConnection();
		return @$resultSet[0]['printable_name'];
	}
	
	public function getCurrency(){
	
		$cvDB = new CV999PDOMaster();
		
		$this->currency			=	$cvDB->getQueryObject('SELECT id,currency_name FROM cv999_fd_master.tbl_currency where support=1 order by id');
		$cvDB->closeConnection();
		return $this->currency;
	}
	
	public function getNetellerCurrency(){
	
		$cvDB = new CV999PDOMaster();
		
		$this->netellercurrency	=	$cvDB->getQueryObject('SELECT id,currency_name FROM cv999_fd_master.tbl_currency WHERE neteller=1 ORDER BY id');
		$cvDB->closeConnection();
		return $this->netellercurrency;
	}
	
	public function getSkrillCurrency(){
		$cvDB = new CV999PDOMaster();
		
		$this->skrillcurrency	=	$cvDB->getQueryObject('SELECT id,currency_name FROM cv999_fd_master.tbl_currency WHERE skrill=1 ORDER BY id');		
		$cvDB->closeConnection();
		return $this->skrillcurrency;
	}
	
	private function getCurrencyNameByID($currency_id){
		
		$cvDB = new CV999PDOMaster();
		
		$currency_name 			=	$cvDB->getQueryObject('SELECT currency_name FROM cv999_fd_master.tbl_currency where id='.CV999Utility::escape($currency_id));
		$cvDB->closeConnection();
		return @$currency_name[0]['currency_name'];
	}
	
	private function checkCurrencyExist($id){
	
		$cvDB = new CV999PDOMaster();
		
		$this->currency			=	$cvDB->getQueryObject('SELECT count(0) as result FROM cv999_fd_master.tbl_currency where id='.CV999Utility::escape($id).';');
		$cvDB->closeConnection();
		return @$this->currency[0]['result'];
	}
	
	public function getSkrillEmail(){
		
		$cvDB = new CV999PDOMaster();
		
		$skrill_email 			=	'@skrill_email';
		$cvDB->doQuery('CALL spSkrillGetSkrillSetting('.$skrill_email.')');
			
		$result					=	$cvDB->getOutParams($skrill_email);	
		$cvDB->closeConnection();
		return $this->skrill_email=$result[$skrill_email];
		
	}
	
	public function getDepositTransID(){	
		$this->dopsit_trans_id=CV999Utility::generateTransactionNumber("AD");
		return $this->dopsit_trans_id;
	}
	
	public function getPlayerProfile(){
		$account_id= isset($_SESSION['playerName'])?$_SESSION['playerName']:'';
		$account_type= isset($_SESSION['playerType'])?$_SESSION['playerType']:'';
	
		if($account_type!='a'){
			$cvDB = new CV999PDOMaster();	
			// sql statement
			$sql = "SELECT * FROM tbl_cash_player WHERE account_id= :account_id";
				
			// bind param and pretected sql injection
			$data = array(':account_id' =>CV999Utility::escape($account_id));
				
			// query
			$records = $cvDB->getQueryObject($sql, $data);
			$cvDB->closeConnection();
				
			return @$records[0];
		}
	}
	
	
	
}
