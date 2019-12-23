const SportupResultData = artifacts.require("SportupResultData");
const SportupResultApp = artifacts.require("SportupResultApp");
var SportupToken = artifacts.require("SportupToken");
var BigNumber = web3.utils.BN;
let SportupTokenIn;
let SportupResultDataIn;
let SportupResultAppIn;
contract("SportupResult", accounts => {
  const defaultAccount = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];
  const oracle = accounts[6];
  let user1Bal;
  let user2Bal;
  let user3Bal;
  let oracleBal;
  const tokenAmnt = "1000000";

  beforeEach(async function() {
    SportupTokenIn = await SportupToken.new({ from: defaultAccount });
    SportupResultDataIn = await SportupResultData.new({ from: defaultAccount });
    SportupResultAppIn = await SportupResultApp.new(
      SportupTokenIn.address,
      SportupResultDataIn.address,
      { from: defaultAccount }
    );

    await SportupTokenIn.transfer(
      SportupResultAppIn.address,
      web3.utils.toWei(tokenAmnt, "ether"),
      {
        from: defaultAccount
      }
    );
    //await SportupResultAppIn.setRewardRatio(20000, { from: defaultAccount });

    await SportupResultDataIn.authorizeContract(SportupResultAppIn.address, {
      from: defaultAccount
    });

    await SportupResultAppIn.authorizeOracle(oracle, { from: defaultAccount });
  });

  describe("check blockstack and eth address ", () => {
    it("------- ", async function() {
      let status1 = await SportupResultAppIn.blockstackethAddressStatus(
        "elbaruni.blockstack.id",
        {
          from: user2
        }
      );
      tx = await SportupResultAppIn.addBlockstackID("elbaruni.blockstack.id", {
        from: user2
      });
      console.log(tx.logs);

      let status2 = await SportupResultAppIn.blockstackethAddressStatus(
        "elbaruni.blockstack.id",
        {
          from: user2
        }
      );

      let tx3 = await SportupResultAppIn.updateBlockstackEthAddress(
        "elbaruni.blockstack.id",
        user2,
        user3
      );

      console.log(status1.logs, status2.logs, tx3.logs);
    });
  });
});
