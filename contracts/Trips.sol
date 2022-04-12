pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Trips {
	
	//INITIAL VALUES
	//RegisterInitialTrip
	address[3][] public initialRegisterTrip;
	event initT(address indexed _idPassenger, address indexed _idDriver, address indexed _idVehicle, uint _idRegister);
	
	//RegisterAPs
	struct APTS{
		uint indexTrip;
		string ap;
		string timestamp;
	}
	mapping(address => APTS[]) apts;
	string public ap;
	string public timestamp;
	event registerAP(address indexed _tripTransaction, string _ap, string _timestamp, uint _idRegister);
	
	//End Trip
	struct TripReceipt{
		uint cost;
		uint indexTrip;
	}
	mapping(address => TripReceipt) receipts;
	event endT(address indexed _tripTransaction, uint _cost, uint _indexTrip);
	
	
	//FUNCTIONS
	//Register initial Trip
	function initTrip(address idDriver, address idVehicle) public returns (uint){
		
		//send eth to contract
		
		uint idRegister = initialRegisterTrip.length;
		initialRegisterTrip.push([msg.sender,idDriver,idVehicle]);
		
		emit initT(msg.sender, idDriver, idVehicle,idRegister);
		return idRegister;
	}
	
	//Register AP and timestamp
	function regisAPandTime(address tripTransaction, string memory passedAp, string memory passedTimestamp,uint indexTrip) public returns (uint){
		ap=passedAp;
		timestamp=passedTimestamp;
		
		apts[tripTransaction].push(APTS(indexTrip, ap, timestamp));
		uint idRegister = apts[tripTransaction].length-1;
		emit registerAP(tripTransaction,ap,timestamp,idRegister);
		return idRegister;
	}
	
	//End Trip
	function endTrip(address tripTransaction, uint cost, uint indexTrip) public returns (uint){
		receipts[tripTransaction]=TripReceipt(cost,indexTrip);
		address addressDriver=initialRegisterTrip[indexTrip][2];
		
		//send eth to address
		
		emit endT(tripTransaction, cost, indexTrip);
		return 0;
	}	
	
	
	//LOOK UP FUNCTIONS
	function getInitialTripData(uint index) public view returns (address[3] memory){
		require(index>=0 && index<initialRegisterTrip.length);
		return initialRegisterTrip[index];
	}
	
	function getAPsInfo(address transaction) public view returns (APTS[] memory){
		return apts[transaction];
	}
	
	function getFinalTripData(address transaction) public view returns (TripReceipt memory){
		return receipts[transaction];
	}
	
	
}
