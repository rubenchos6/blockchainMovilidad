var RegisterAP = artifacts.require("./RegisterAP.sol");
var Trips = artifacts.require("./Trips.sol");
var SafeMov = artifacts.require("./SafeMov.sol");

module.exports = function(deployer){
	deployer.deploy(RegisterAP);
	deployer.deploy(Trips);
	deployer.deploy(SafeMov);
};
