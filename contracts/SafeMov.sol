pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SafeMov {
	
	//INITIAL VALUES
	//RegisterInitialTrip
	uint WEI_TO_ETH = 10 ** 18;
	
	event initT(address indexed _idPassenger, address indexed _idDriver, address indexed _idVehicle, uint _cost, string _timestamp);
	
	//RegisterAPs
	string public ap;
	string public timestamp;
	event registerAP(bytes32 indexed _tripTransaction, string _ap, string _timestamp);
	
	//End Trip
	event endT(bytes32 indexed _tripTransaction, uint _cost);
	
	
	//FUNCTIONS
	//Register initial Trip
	function initTrip(address idDriver, address idVehicle, uint cost, string memory passedTimestamp) public payable returns (bool){
		//send eth to contract from passenger
		require(uint(msg.value) / WEI_TO_ETH == cost);
		ap=passedTimestamp;		
		emit initT(msg.sender, idDriver, idVehicle, cost,ap);
		return true;
	}
	
	//Register AP and timestamp
	function regisAPandTime(bytes32 tripTransaction, string memory passedAp, string memory passedTimestamp) public returns (bool){
		ap=passedAp;
		timestamp=passedTimestamp;
		emit registerAP(tripTransaction,ap,timestamp);
		return true;
	}
	
	//End Trip
	function endTrip(bytes32 tripTransaction,address driver, uint cost) public returns (bool){
		require(msg.sender == driver);
		//Transfer payment to driver
		msg.sender.transfer(cost * WEI_TO_ETH * 9 / 10);
		emit endT(tripTransaction, cost);
		return true;
	}
	
	function widthdraw(uint amount) external {
		//only validators can widthdraw
		//require(msg.sender == '0x0');
		msg.sender.transfer(amount);
	}		
}
