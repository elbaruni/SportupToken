var SportupToken = artifacts.require("SportupToken");
var SportupResultData = artifacts.require("SportupResultData");
var SportupResultApp = artifacts.require("SportupResultApp");

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(SportupToken).then(function() {
    let owner = accounts[0];
    let oracle = accounts[2];
    return deployer.deploy(SportupResultData).then(function() {
      return deployer.deploy(
        SportupResultApp,
        SportupToken.address,
        SportupResultData.address
      );
    });
  });
};
