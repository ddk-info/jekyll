<?php

/** 
 * @package		clubvegas999
 * @subpackage		com_payment
 * @copyright		Copyright (C) 2012 Creativeentertainmen Ltd. All rights reserved.
 * @author			Chamnan Nop. Email: chamnan.nop@gmail.com
 */

defined('_JEXEC') or die;

// Add CSRF anti-spoofing to forms

if(JSession::checkToken()){
}elseif(isset($_GET['skrill']) && addslashes(strip_tags($_GET['skrill']))==1){
}else{
    die( 'Invalid Token');
}

//JSession::checkToken() or die( 'Invalid Token');

require_once (JPATH_ROOT.DS.'cv999'.DS.'classes'.DS.'CV999Utility.php');

// Load the controller framework
jimport('joomla.application.component.controller');

/**
 * Registration controller class for SignUp.
 *
 * @package		Joomla.Site
 * @subpackage	com_payment
 * @since		1.6
 */
class PaymentControllerPayment extends JControllerLegacy
{
	
	/**
	 * Method to register a user.
	 *
	 * @return	boolean		True on success, false on failure.
	 * @since	1.6
	 */
	 
	public function dowithdraw()
	{
		
		if(isset($_SESSION['playerName']) && $_SESSION['playerName']!=""){
			
			$data=null;
			$model	= $this->getModel('Payment');
			
			$requestData = CV999Utility::escape(JRequest::get('post'));		
			$method = CV999Utility::escape(JRequest::getVar('method', null, 'request','INT'));
			
			$data=$model->validateData($requestData,$method);
			
			if($data=='bankError'){
				
				// Create Session for send data back to view
				$_SESSION['payment'.'withdraw_amount']              =   htmlspecialchars($requestData['withdraw_amount']);
							
				$_SESSION['payment'.'withdraw_bank_name']           =   htmlspecialchars(strip_tags(addslashes($requestData['bank_name'])));
				$_SESSION['payment'.'withdraw_bank_branch']         =   htmlspecialchars(strip_tags(addslashes($requestData['bank_branch'])));
				$_SESSION['payment'.'withdraw_bank_account_name']   =   htmlspecialchars(strip_tags(addslashes($requestData['bank_account_name'])));
				$_SESSION['payment'.'withdraw_bank_account_number'] =   htmlspecialchars(strip_tags(addslashes($requestData['bank_account_number'])));
				
				$_SESSION['payment'.'BankWithdrawError']='1';
				
				$_SESSION['payment'.'BankWithdrawErrorData']= $model->getError();
				
				$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
				
			}
			elseif ($data=='skrillError'){
				// Create Session for send data back to view	
				
				$_SESSION['payment'.'withdraw_skrill_email']        =   htmlspecialchars(strip_tags(addslashes($requestData['withdraw_skrill_email'])));
					
				$_SESSION['payment'.'SkrillWithdrawError']='1';
					
				$_SESSION['payment'.'SkrillWithdrawErrorData']= $model->getError();
					
				$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
			}
			elseif ($data=='netellerError')
			{
				// Create Session for send data back to view				
				
				$_SESSION['payment'.'withdraw_neteller']            =   htmlspecialchars(strip_tags(addslashes($requestData['neteller_account'])));
					
				$_SESSION['payment'.'NetellerWithdrawError']='1';
					
				$_SESSION['payment'.'NetellerWithdrawErrorData']= $model->getError();
					
				$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
			}
			elseif($data=='OK'){
				// Data is OK then Save it to DB and Send Email
				$result=$model->dowithdraw($requestData,$method);
				
				$_SESSION['payment'.'withdraw_request_sent']='1';
				
				$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
			}
			
		}else {
			$this->setRedirect(JRoute::_('', false));
		}
	}
	
	public function netellerDeposit()
	{
		
		if(isset($_SESSION['playerName']) && $_SESSION['playerName']!=""){
			
			$modelNeteller	= $this->getModel('Neteller');
		
			$requestData = CV999Utility::escape(JRequest::get('post'));
		
			$data=$modelNeteller->validateData($requestData);
		
			if($data==false){
					
				// Create Session for send data back to view
					
				$_SESSION['neteller'.'Deposit_currency']        =   htmlspecialchars($requestData['deposit_neteller_currency']);
				$_SESSION['neteller'.'Deposit_amount']          =   htmlspecialchars($requestData['deposit_neteller_amount']);
				$_SESSION['neteller'.'Account_id']              =   htmlspecialchars($requestData['deposit_neteller_id']);
				$_SESSION['neteller'.'Secure_id']               =   htmlspecialchars($requestData['deposit_neteller_secure_id']);
					
				$_SESSION['neteller'.'Error']='1';
					
				$_SESSION['neteller'.'ErrorData']= $modelNeteller->getError();
					
				$this->setRedirect(JRoute::_('?option=com_payment&view=payment#deposit', false));
					
			}else{
				// Data is OK then Save it to DB and Send Email
				$result=$modelNeteller->deposit($requestData);
					
				if($result){
					$_SESSION['payment'.'DepositThankYou']='1';
					$this->setRedirect(JRoute::_('?option=com_payment&view=payment#deposit', false));
				}else{
		
					// Create Session for send data back to view
						
					$_SESSION['neteller'.'Deposit_currency']    =   htmlspecialchars($requestData['deposit_neteller_currency']);
					$_SESSION['neteller'.'Deposit_amount']      =   htmlspecialchars($requestData['deposit_neteller_amount']);
					$_SESSION['neteller'.'Account_id']          =   htmlspecialchars($requestData['deposit_neteller_id']);
					$_SESSION['neteller'.'Secure_id']           =   htmlspecialchars($requestData['deposit_neteller_secure_id']);
						
					$_SESSION['neteller'.'Error']='1';
					$_SESSION['netellerCallBack']='1';
						
					$_SESSION['neteller'.'ErrorData']= $modelNeteller->getError();
						
					$this->setRedirect(JRoute::_('?option=com_payment&view=payment#deposit', false));
				}
			}
			
		}else {
			$this->setRedirect(JRoute::_('/', false));
		}
	}
	
	public function confirm(){
		
		if(isset($_SESSION['playerName']) && $_SESSION['playerName']!=""){
			
			$model	= $this->getModel('Payment');
			
			$requestData = CV999Utility::escape(JRequest::get('post'));			
			// Data is OK then Save it to DB and Send Email
			
			if($model->validateConfirmation()){
				$result=$model->confirm($requestData);
				if($result['@result']==1){
					
					$_SESSION['payment'.'Withdraw_success']='1';
					
					$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
				}
				else{
					
					$_SESSION['payment'.'Withdraw_success']='0';				
					$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
				}	
			}else{
				
				$_SESSION['payment'.'Withdraw_success']='2';				
					
				$this->setRedirect(JRoute::_('?option=com_payment&view=payment#withdrawal', false));
			}
		}else {
			$this->setRedirect(JRoute::_('/', false));
		}
	}
	
	public function thankyou(){
		$_SESSION['payment'.'DepositThankYou']='1';
		$this->setRedirect(JRoute::_('?option=com_payment&view=payment#deposit', false));
	}
	
	public function cancelled(){
		$_SESSION['payment'.'DepositCancelled']='1';
		$this->setRedirect(JRoute::_('?option=com_payment&view=payment#deposit', false));
	}
	
}