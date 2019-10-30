pragma solidity ^0.5.0;

 

//import "@openzeppelin/contracts/GSN/Context.sol";
import "../node_modules/openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "../node_modules/openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

/**
 * @title SportupToken
 * @dev  ERC20 Token , where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions , Detailed (name , symbol,decimals=1) , Capped to 10^9 Tokens max total supply  and pausable.
 */
contract SportupToken is  ERC20, ERC20Detailed,ERC20Capped,ERC20Pausable {

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor () public ERC20Capped(uint256(10 ** 9)) ERC20Detailed("Sportup", "SUP", 0) {
        _mint(msg.sender, 1000000000);
    }
}