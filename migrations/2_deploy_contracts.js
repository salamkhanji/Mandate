var Mandate = artifacts.require("./Mandate.sol");

module.exports = function(deployer) {
  deployer.deploy(Mandate);
};
