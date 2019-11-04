const SportupResult = artifacts.require("SportupResult");
var SportupToken = artifacts.require("SportupToken");
var BigNumber = web3.utils.BN;
let SportupTokenIn;
contract("SportupResult", accounts => {
  var defaultAccount = accounts[0];
  var user1 = accounts[1];
  var user2 = accounts[2];
  var user3 = accounts[3];
  beforeEach(async function() {
    SportupTokenIn = await SportupToken.new({ from: defaultAccount });
    console.log("mmm", SportupTokenIn.address);
    this.contract = await SportupResult.new(SportupTokenIn.address, {
      from: defaultAccount
    });
    console.log("ttt", this.contract.address);
    await SportupTokenIn.transfer(this.contract.address, 1000000, {
      from: defaultAccount
    });
    await this.contract.setRewardRatio(20000, { from: defaultAccount });
  });

  describe("get -----", () => {
    it("------- ", async function() {
      await this.contract.submit(1, "1221", "111", { from: user1 });
      let tx = await this.contract.submit(1, "2221", "111", { from: user2 });

      let result = await this.contract.get_submissions("111", 1);
      console.log(tx);
      console.log("result", result);

      // assert.equal(star[2],"story")
    });
  });

  describe("get Balance of sportup result contract", () => {
    it("------- ", async function() {
      const bal = await SportupTokenIn.balanceOf(this.contract.address);
      console.log("balance of", bal.toNumber());
    });
  });
  describe("get2 -----", () => {
    it("------- ", async function() {
      const balnce1before = await SportupTokenIn.balanceOf(user1);
      console.log("balance after", balnce1before);

      await this.contract.submit(1, "1221", "111", { from: user1 });
      let result1 = await this.contract.get_submissions("111", 0);
      await this.contract.submit(1, "2221", "111", { from: user2 });
      let result2 = await this.contract.get_submissions("111", 1);
      const balnce1after = await SportupTokenIn.balanceOf(user1);
      console.log("balance after", balnce1after.toNumber());

      // assert.equal(star[2],"story")
    });
  });

  //transfer
});
