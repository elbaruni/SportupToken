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

    mapping (string => submitted_result[] )private invites;



    // The token being sold
    //IERC20 private _token;

   
  //  constructor (uint256 rate, address payable wallet, IERC20 token) public {
       constructor(SportupToken _tokenContract) public{
          tokenContract=_tokenContract;
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
    event Submited(address indexed submitter,uint8 result, string  blockstack );
     event WinnerMatched( string inviteid );
       event WinnerNotMatched( string inviteid );
     function submit( uint8 result,string memory blockstack,  string memory inviteid) public    {
            require (get_number_of_submissions(inviteid)<=1,"can not submit more than 2") ;  

                    invites[inviteid].push(submitted_result(msg.sender,result,blockstack));
                   emit  Submited(msg.sender,result,blockstack);
                if (get_number_of_submissions(inviteid)==2){
                    if( invites[inviteid][0].result== invites[inviteid][1].result){
                        tokenContract.transfer(invites[inviteid][0].submitter,1);
                         tokenContract.transfer(invites[inviteid][1].submitter,1);
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
