var RegisterAP = artifacts.require("./RegisterAP.sol");
var Trips = artifacts.require("./Trips.sol");

module.exports = function(deployer){
	//deployer.deploy(RegisterAP);
	deployer.deploy(Trips);
};
