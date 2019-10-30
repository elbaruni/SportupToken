var SportupToken = artifacts.require("SportupToken");
var SportupResult = artifacts.require("SportupResult");

module.exports = function(deployer) {
  deployer.deploy(SportupToken).then(function() {
    return deployer.deploy(SportupResult, SportupToken.address);
  });
};
