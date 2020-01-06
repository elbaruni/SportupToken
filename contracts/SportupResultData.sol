pragma solidity ^0.5.0;
import "../node_modules/openzeppelin/contracts/math/SafeMath.sol"; 
import "../node_modules/openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../node_modules/openzeppelin/contracts/lifecycle/Pausable.sol";
contract SportupResultData is ReentrancyGuard , Pausable {
    using SafeMath for uint256;
    struct  submitted_result {
        address submitter;
        uint8 result;//winner
        string blockstack;
        }
    address private admin ;
    mapping (string => submitted_result[] )private invites;
    mapping(address => uint256) private authorizedContracts;
    modifier onlyOwner() {require( msg.sender==admin, "Admin only");
     _;
    } 
   modifier requireIsCallerAuthorized()
    {
        require(authorizedContracts[msg.sender] == 1, "Caller is not authorized contract");
        _;
    }
    event Submited(address indexed submitter,uint8 result, string  blockstack );
  
function authorizeContract (
                                address contractAddress
                            )
                            external
                            onlyOwner
                            whenNotPaused
    {
        authorizedContracts[contractAddress] = 1;
    }

     function deauthorizeContract
                            (
                                address contractAddress
                            )
                            external
                          onlyOwner
                            whenNotPaused
    {
        delete authorizedContracts[contractAddress]; }  
 
       constructor() public{
           admin=msg.sender;                 
    }
    /**
     * @dev fallback function ***DO NOT OVERRIDE***
     * Note that other contracts will transfer funds with a base gas stipend
     * of 2300, which is not enough to call buyTokens. Consider calling
     * buyTokens directly when purchasing tokens from a contract.
     */
    function () external payable {
       // buyTokens(msg.sender);
    }
    function allowSubmission (address submitter,string memory inviteid) whenNotPaused internal 
    returns(bool){
       if (invites[inviteid].length==1){ return invites[inviteid][0].submitter != submitter;               } 
     return true;
    }    
     function submit( address submitter,uint8 result,string calldata  blockstack,  string calldata  inviteid) whenNotPaused requireIsCallerAuthorized external 
        {
                require (invites[inviteid].length<=1,"can not submit more than 1") ;
                // check if current address submited a result before 
                require(allowSubmission(submitter,inviteid),"user submitted result of given invite");
                    invites[inviteid].push(submitted_result(submitter,result,blockstack));
                   emit  Submited(submitter,result,blockstack);
               
                } 
       
        function get_number_of_submissions(  string calldata  inviteid)  whenNotPaused requireIsCallerAuthorized external view returns( uint256    ){
            return  invites[inviteid].length;
        }
   function get_submissions(  string calldata  inviteid,uint256 index)  whenNotPaused requireIsCallerAuthorized external  view returns( address submitter,   uint8 result,string memory blockstack   ){
             require (  invites[inviteid].length > index,"invalid index");
            return ( invites[inviteid][index].submitter,invites[inviteid][index].result,invites[inviteid][index].blockstack);
        }  
 
}
