const SafeMov = artifacts.require("./SafeMov.sol");

let transactionHash;

describe('SafeMov Contract',()=>{
	let safemov;
	
	it('Get accounts in the blockchain', () => {
		SafeMov.deployed().then(instance => {	
			console.log(instance);
			safemov=instance;
			return web3.eth.getAccounts();
		}).then(accounts =>{
			console.log(accounts);
			assert(accounts.length,3);
		});
	});
	
	it('Init trip passenger and verify registry',()=>{
		SafeMov.deployed().then(instance=>{
			safemov=instance;
			return safemov.initTrip(accounts[1],accounts[2],10,'testHour',{value:web3.utils.toWei("10","ether"),from: account[0]});
		}).then(transaction =>{
			console.log(transaction);
			transactionHash=transaction.tx;
			return safemov.getPastEvents('initT',{filter:{_idPassenger:accounts[0], _idDriver:accounts[1], _idVehicle:accounts[2], _cost:10, _timestamp:'testHour'}});
		}).then(result =>{
			console.log(result);
			assert(result._idPassenger,accounts[0]);
		});
	});
	
	it('Register 3 different AP with diferent timestamps', ()=>{
		SafeMov.deployed().then(instance=>{
			safemov=instance;
			return safemov.regisAPandTime(transactionHash,'ap1','hora1',{from:accounts[2]});
		}).then(transaction=>{
			return safemov.regisAPandTime(transactionHash,'ap2','hora2',{from:accounts[2]});
		}).then(transaction=>{
			return safemov.regisAPandTime(transactionHash,'ap2','hora3',{from:accounts[2]});
		}).then(transaction=>{
			return safemov.getPastEvents('registerAP',{filter:{_tripTransaction:transactionHash}});
		}).then(result=>{
			console.log(result);
			assert(result.length,3);
		});
	});
	
	it('Finalize trip and verify registry', ()=>{
		SafeMov.deployed().then(instance=>{
			safemov=instance;
			return safemov.endTrip(transactionHash,accounts[1],10,{from:accounts[1]});
		}).then(transaction=>{
			console.log(transaction);
			return safemov.getPastEvents('endT',{filter:{_tripTransaction:transactionHash}});
		}).then(result=>{
			console.log(result);
			assert(result.length,1);
		});
	});
			
});
