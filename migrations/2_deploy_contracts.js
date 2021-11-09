var KaseyCoin = artifacts.require("./KaseyCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(KaseyCoin, "KaseyCoin", "KCC", 20000);
};
