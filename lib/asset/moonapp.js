<?php

/** 
 * @package		clubvegas999
 * @subpackage		com_payment
 * @copyright		Copyright (C) 2012 Creativeentertainmen Ltd. All rights reserved.
 * @author			Chamnan Nop. Email: chamnan.nop@gmail.com
 */

defined('_JEXEC') or die;

// Add CSRF anti-spoofing to forms
JSession::checkToken() or die( 'Invalid Token');

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
class PaymentControllerNeteller extends JControllerLegacy
{
	
	/**
	 * Method to register a user.
	 *
	 * @return	boolean		True on success, false on failure.
	 * @since	1.6
	 */
	 
	public function netellerDeposit()
	{
		if(isset($_SESSION['playerName']) && $_SESSION['playerName']!=""){
			
			$modelNeteller	= $this->getModel('Neteller');
			
			$requestData = CV999Utility::escape(JRequest::get('post'));
			
			$data=$modelNeteller->validateData($requestData);
			
			if($data==false){
				
				// Create Session for send data back to view
				
				$_SESSION['neteller'.'Deposit_currency']        = htmlspecialchars($requestData['deposit_neteller_currency']);
				$_SESSION['neteller'.'Deposit_amount']          = htmlspecialchars($requestData['deposit_neteller_amount']);
				$_SESSION['neteller'.'Account_id']              = htmlspecialchars($requestData['deposit_neteller_id']);
				$_SESSION['neteller'.'Secure_id']               = htmlspecialchars($requestData['deposit_neteller_secure_id']);
				
				$_SESSION['neteller'.'Error']='1';
				$_SESSION['netellerCallBack']='1';
				
				$_SESSION['neteller'.'ErrorData']= $modelNeteller->getError();
				
				$this->setRedirect(JRoute::_('?option=com_payment&view=neteller', false));
				
			}else{
				// Data is OK then Save it to DB and Send Email
				$result=$modelNeteller->deposit($requestData);
				
				if($result){
					$this->setRedirect(JRoute::_('?option=com_payment&view=neteller&layout=thankyou', false));
				}else{
					
					// Create Session for send data back to view
						
					$_SESSION['neteller'.'Deposit_currency']    = htmlspecialchars($requestData['deposit_neteller_currency']);
					$_SESSION['neteller'.'Deposit_amount']      = htmlspecialchars($requestData['deposit_neteller_amount']);
					$_SESSION['neteller'.'Account_id']          = htmlspecialchars($requestData['deposit_neteller_id']);
					$_SESSION['neteller'.'Secure_id']           = htmlspecialchars($requestData['deposit_neteller_secure_id']);
						
					$_SESSION['neteller'.'Error']='1';
					$_SESSION['netellerCallBack']='1';
						
					$_SESSION['neteller'.'ErrorData']= $modelNeteller->getError();
						
					$this->setRedirect(JRoute::_('?option=com_payment&view=neteller', false));
				}
			}
		}else{
			$this->setRedirect(JRoute::_('/', false));
		}		
	}
	
}