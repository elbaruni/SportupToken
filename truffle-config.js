var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "Your Metamask seeds or any wallet seeds";
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: "7545",
      gas: 4600000,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        var wallet = new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/2a3ef5517fce4991b5d2c4cf004ff40d" //endpoint to ethereum blockchain
        );
        var nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 4
      // gas: 2000000,   // <--- Twice as much
      // gasPrice: 10000000000,
    }
  }
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
};
