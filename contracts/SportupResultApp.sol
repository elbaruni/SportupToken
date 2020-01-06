pragma solidity ^0.5.0;
import "./SportupToken.sol";
import "../node_modules/openzeppelin/contracts/math/SafeMath.sol"; 
import "../node_modules/openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../node_modules/openzeppelin/contracts/lifecycle/Pausable.sol";
contract SportupResultApp is ReentrancyGuard , Pausable {
    using SafeMath for uint256;
    SportupToken public tokenContract;
    SportupResultData resultDataContract;

    // Submission Status status codees
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_NEW = 10;
    uint8 private constant STATUS_CODE_VALID = 20;
    uint8 private constant STATUS_CODE_INVALID = 30;
    

  
struct Submission{
    address submitter;
    uint8 result;
    string blockstack;
    uint8 status;
    string inviteid;
}
    uint256  private _reward_ratio ;
    address private admin ;
mapping (bytes32 => Submission) private result_submitted;
mapping(address => uint256) private authorizedOracles;
mapping(bytes32 =>address) private blockstackIds;
mapping(address => bytes32) private playersAddresses;
/// to improve it use struct later 

 
event OracleRequest(string inviteid,string blockstackid ,address submitter,bytes32 indexed key);
event SubmissionStatus(bytes32 key,string log);
event Submited(address indexed submitter,uint8 result, string  blockstack );
event WinnerMatched( string inviteid );
event WinnerNotMatched( string inviteid );
event RewardRatioChanged(address indexed changer,uint256 newRatio);
modifier onlyOwner() {
        require( msg.sender==admin, "Admin only");
        _;
    }
     modifier requireIsOracleAuthorized()
    {
        require(authorizedOracles[msg.sender] == 1, "Caller is not authorized Oracle");
        _;
    }
  modifier matchBlockstackidEthAddress(string memory blockstackid) {
     
      bytes32 key = keccak256(abi.encodePacked(blockstackid));
       require(msg.sender != address(0) && key[0] !=0   , "Error: zero address /zero blockstack id");
      require(key==playersAddresses[msg.sender] && msg.sender==blockstackIds[key],"Not Matching");
_;
  }  

 modifier notRegisteredBlockstackid(string memory blockstackid) {
      require(msg.sender != address(0), "Error: zero address");
      bytes32 key = keccak256(abi.encodePacked(blockstackid));
      require (playersAddresses[msg.sender][0]==0 && blockstackIds[key]==address(0),"Blockstack Registered");
       
_;
  }  

   function authorizeOracle (
                                address oracleAddress
                            )
                            external
                            onlyOwner
                            whenNotPaused
    {
        authorizedOracles[oracleAddress] = 1;
    }
 
     function deauthorizeOracle
                            (
                                address oracleAddress
                            )
                            external
                          onlyOwner
                            whenNotPaused
    {
        delete authorizedOracles[oracleAddress]; }  
  

 constructor(SportupToken _tokenContract ,SportupResultData _resultDataContract ) public{


           admin=msg.sender;
          tokenContract=_tokenContract;
          _reward_ratio=10000;
           tokenContract.approve(msg.sender,(10 ** 9) * (10 ** uint256(18)));  
           resultDataContract=_resultDataContract;        
    }    

function submitt( uint8 result,
    string memory  blockstack,string memory inviteid) matchBlockstackidEthAddress(blockstack) public {

        bytes32 key = keccak256(abi.encodePacked(inviteid, blockstack, msg.sender));

        result_submitted[key]=Submission({submitter:msg.sender,result:result,blockstack:blockstack,status:STATUS_CODE_NEW,inviteid:inviteid

        });
        emit OracleRequest(inviteid,blockstack,msg.sender,key);


    }    
function oracleResponse(bytes32 key,uint8 status)  requireIsOracleAuthorized public {
    require(result_submitted[key].status==STATUS_CODE_NEW,"status submitted before");
    result_submitted[key].status=status;
    Submission memory submission=result_submitted[key];
    emit SubmissionStatus(key,"first log");
    if (submission.status==STATUS_CODE_VALID) {
      
        resultDataContract.submit(submission.submitter,submission.result,submission.blockstack,submission.inviteid); 
        emit SubmissionStatus(key," Valid submission");
         if (resultDataContract.get_number_of_submissions(submission.inviteid)==2){            
            (address submitter1, uint8 result1, string memory blockstack1)  =resultDataContract.get_submissions(submission.inviteid,0);
             (address submitter2, uint8 result2, string memory blockstack2)  =resultDataContract.get_submissions(submission.inviteid,1);
                    uint256 reward=tokenContract.balanceOf(address(this)).div(_reward_ratio);
                    if( result1== result2){                             
                        tokenContract.transfer(submitter1,reward);
                         tokenContract.transfer(submitter2,reward);
                         emit WinnerMatched(submission.inviteid);
                    }else{
                        emit WinnerNotMatched(submission.inviteid);
                    }
                } 

    }
    else {emit SubmissionStatus(key,"Invalid submission");}
    
   }

  
function setRewardRatio(uint256 _newRatio)  onlyOwner() public {
    require(_newRatio != _reward_ratio,"trying to set same ratio");
    _reward_ratio=_newRatio;
    emit RewardRatioChanged(msg.sender,_newRatio);
}
   function getRewardRatio( )   public view returns (uint256){
         return _reward_ratio;
         }
function addBlockstackID(string memory blockstackid) notRegisteredBlockstackid(blockstackid) public {
 bytes32 key = keccak256(abi.encodePacked(blockstackid));
      

      playersAddresses[msg.sender]=key;
      blockstackIds[key]=msg.sender;
       
}
function updateBlockstackEthAddress(string memory blockstackid ,address currentAddress , address newAddress) onlyOwner() public {
require(currentAddress !=  address(0) && newAddress != address(0) ,"Zero Addresses not allowed");
bytes32 key = keccak256(abi.encodePacked(blockstackid));
require (playersAddresses[currentAddress]==key && blockstackIds[key]==currentAddress ,"Not Matching" );
blockstackIds[key]=newAddress;
delete playersAddresses[currentAddress];
playersAddresses[newAddress]==key;

}
// blockstackethAddress exist() return bool;

function blockstackethAddressStatus (string memory blockstackid) public view returns(bool){     
      bytes32 key = keccak256(abi.encodePacked(blockstackid));       
      return (key==playersAddresses[msg.sender] && msg.sender==blockstackIds[key]);
}
}


contract SportupResultData  {         
     function submit( address submitter,uint8 result,string calldata  blockstack,  string calldata  inviteid)  external ;
     function get_number_of_submissions(  string calldata  inviteid) external view returns( uint256    );
     function get_submissions(  string calldata  inviteid,uint256 index)   external  view returns( address submitter,   uint8 result,string memory blockstack   );
   }
