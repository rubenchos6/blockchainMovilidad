pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Trips {
	
	//INITIAL VALUES
	//RegisterInitialTrip
	uint WEI_TO_ETH = 10 ** 18;
	
	struct Trip{
		address idPassenger;
		address idDriver;
		address idVehicle;
		uint cost;
	}
	Trip[] initialRegisterTrip;
	event initT(address indexed _idPassenger, address indexed _idDriver, address indexed _idVehicle, uint _idRegister, uint cost);
	
	//RegisterAPs
	struct APTS{
		uint indexTrip;
		string ap;
		string timestamp;
	}
	mapping(bytes32 => APTS[]) apts;
	string public ap;
	string public timestamp;
	event registerAP(bytes32 indexed _tripTransaction, string _ap, string _timestamp, uint _idRegister);
	
	//End Trip
	struct TripReceipt{
		uint256 cost;
		uint indexTrip;
	}
	mapping(bytes32 => TripReceipt) receipts;
	event endT(bytes32 indexed _tripTransaction, uint _cost, uint _indexTrip);
	
	
	//FUNCTIONS
	//Register initial Trip
	function initTrip(address idDriver, address idVehicle, uint cost) public payable returns (uint){
		//send eth to contract
		require(uint(msg.value) / WEI_TO_ETH == cost);
		
		uint idRegister = initialRegisterTrip.length;
		initialRegisterTrip.push(Trip(msg.sender,idDriver,idVehicle,cost));
		
		emit initT(msg.sender, idDriver, idVehicle,idRegister, cost);
		return idRegister;
	}
	
	//Register AP and timestamp
	function regisAPandTime(bytes32 tripTransaction, string memory passedAp, string memory passedTimestamp,uint indexTrip) public returns (uint){
		ap=passedAp;
		timestamp=passedTimestamp;
		
		apts[tripTransaction].push(APTS(indexTrip, ap, timestamp));
		uint idRegister = apts[tripTransaction].length-1;
		emit registerAP(tripTransaction,ap,timestamp,idRegister);
		return idRegister;
	}
	
	//End Trip
	function endTrip(bytes32 tripTransaction, uint indexTrip) public returns (uint){
		uint cost= initialRegisterTrip[indexTrip].cost;
		address driver = initialRegisterTrip[indexTrip].idDriver;
		require(msg.sender == driver);
		
		//Transfer payment to driver
		msg.sender.transfer(cost * 9 / 10 * WEI_TO_ETH);
		
		receipts[tripTransaction]=TripReceipt(cost,indexTrip);
		emit endT(tripTransaction, cost, indexTrip);
		return 0;
	}
	
	function widthdraw(uint amount) external {
		//only validators can widthdraw
		//require(msg.sender == '0x0');
		msg.sender.transfer(amount);
	}	
	
	//LOOK UP FUNCTIONS
	function getInitialTripData(uint index) public view returns (Trip memory){
		require(index>=0 && index<initialRegisterTrip.length);
		return initialRegisterTrip[index];
	}
	
	function getAPsInfo(bytes32 transaction) public view returns (APTS[] memory){
		return apts[transaction];
	}
	
	function getFinalTripData(bytes32 transaction) public view returns (TripReceipt memory){
		return receipts[transaction];
	}
	
	
}
