pragma solidity ^0.5.0;
import "./SportupToken.sol";
import "../node_modules/openzeppelin/contracts/math/SafeMath.sol"; 
import "../node_modules/openzeppelin/contracts/utils/ReentrancyGuard.sol";
contract SportupResult is ReentrancyGuard {
    using SafeMath for uint256;
    SportupToken public tokenContract;

    struct  submitted_result {
        address submitter;
        uint8 result;//winner
        string blockstack;
    }
    uint256  private _reward_ratio ;

    address private admin ;
    

    mapping (string => submitted_result[] )private invites;
modifier onlyOwner() {
        require( msg.sender==admin, "Admin only");
        _;
    }
    event Submited(address indexed submitter,uint8 result, string  blockstack );
    event WinnerMatched( string inviteid );
    event WinnerNotMatched( string inviteid );
    event RewardRatioChanged(address indexed changer,uint256 newRatio);

    // The token being sold
    //IERC20 private _token;
function setRewardRatio(uint256 _newRatio) onlyOwner() public {
    require(_newRatio != _reward_ratio,"trying to set same ratio");
    _reward_ratio=_newRatio;
    emit RewardRatioChanged(msg.sender,_newRatio);
}
   function getRewardRatio( )   public view returns (uint256){
         return _reward_ratio;
         }
  //  constructor (uint256 rate, address payable wallet, IERC20 token) public {
       constructor(SportupToken _tokenContract) public{
           admin=msg.sender;
          tokenContract=_tokenContract;
          _reward_ratio=10000;
           
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
    function allowSubmission (address submitter,string memory inviteid) internal 
    returns(bool){
       if (get_number_of_submissions(inviteid)==1){ return invites[inviteid][0].submitter != submitter;               } 
     return true;
    }
    
     function submit( uint8 result,string memory blockstack,  string memory inviteid) public    {
                require (get_number_of_submissions(inviteid)<=1,"can not submit more than 2") ;
                // check if current address submited a result before 
                require(allowSubmission(msg.sender,inviteid),"user submitted result of given invite");
                    invites[inviteid].push(submitted_result(msg.sender,result,blockstack));
                   emit  Submited(msg.sender,result,blockstack);
                if (get_number_of_submissions(inviteid)==2){

                    uint256 reward=tokenContract.balanceOf(address(this)).div(_reward_ratio);
                    if( invites[inviteid][0].result== invites[inviteid][1].result){
                        tokenContract.transfer(invites[inviteid][0].submitter,reward);
                         tokenContract.transfer(invites[inviteid][1].submitter,reward);
emit WinnerMatched(inviteid);
                    }else{
emit WinnerNotMatched(inviteid);
                    }
                }    

        }

        function get_number_of_submissions(  string memory inviteid) public  view returns( uint256    ){
            return  invites[inviteid].length;
        }
   function get_submissions(  string memory inviteid,uint256 index) public  view returns( address submitter,   uint8 result,string memory blockstack   ){
             require (  invites[inviteid].length > index,"invalid index");
            return ( invites[inviteid][index].submitter,invites[inviteid][index].result,invites[inviteid][index].blockstack);
        }
 
  
}
