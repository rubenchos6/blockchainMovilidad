pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract RegisterAP {
	
	address[3][] public registers;
	string [2][] public aptimestamp;
	
	string public ap;
	string public timestamp;
	
	event registerAP(address indexed _idVehicle,address indexed _idPassenger, address indexed _idDriver, string _ap, string _timestamp, uint idRegister);
	
	//Register AP and timestamp
	function regisAPandTime(address idPassenger, address idDriver, string memory passedAp, string memory passedTimestamp) public returns (uint){
		ap=passedAp;
		timestamp=passedTimestamp;
		//require(!StringUtils.equal(ap,"") && !StringUtils.equal(timestamp,""));
		
		uint idRegister=registers.length;
		registers.push([msg.sender,idPassenger,idDriver]);
		
		aptimestamp.push([ap,timestamp]);
		emit registerAP(msg.sender,idPassenger,idDriver,ap,timestamp,idRegister);
		return idRegister;
	}
	
	function getSpecificRegister(uint index) public view returns (address[3] memory){
		require(index>=0 && index<registers.length);
		return registers[index];
	}
	
	function getSpecificApTimestamp(uint index) public view returns (string[2] memory){
		require(index>=0 && index<aptimestamp.length);
		return aptimestamp[index];
	}
}
