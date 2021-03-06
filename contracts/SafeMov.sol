pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SafeMov {
	
	//INITIAL VALUES
	//RegisterInitialTrip
	uint WEI_TO_ETH = 10 ** 18;
	string public orig;
	string public dest;
	event initT(address indexed _idPassenger, address indexed _idDriver, address indexed _idVehicle, uint _cost, string _timestamp, string origin, string destination);
	
	//RegisterAPs
	string public ap;
	string public timestamp;
	string public rssi;
	
	event registerAP(bytes32 indexed _tripTransaction, string _ap, string _timestamp,string _rssi);
	
	//End Trip
	event endT(bytes32 indexed _tripTransaction, uint _cost);
	
	
	//FUNCTIONS
	//Register initial Trip
	function initTrip(address idDriver, address idVehicle, uint cost, string memory passedTimestamp, string memory passedOrigin, string memory passedDestination) public payable returns (bool){
		//send eth to contract from passenger
		require(uint(msg.value) / WEI_TO_ETH == cost);
		ap=passedTimestamp;		
		orig=passedOrigin;
		dest=passedDestination;
		emit initT(msg.sender, idDriver, idVehicle, cost,ap,orig,dest);
		return true;
	}
	
	//Register AP and timestamp
	function regisAPandTime(bytes32 tripTransaction, string memory passedAp, string memory passedTimestamp, string memory passedRSSI) public returns (bool){
		ap=passedAp;
		timestamp=passedTimestamp;
		rssi=passedRSSI;
		emit registerAP(tripTransaction,ap,timestamp,rssi);
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
