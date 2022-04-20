//const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

//const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

//const { expect } = require('chai');

const Trips = artifacts.require("./Trips.sol");

let transactionIndex;
let transactionHash;

describe('Trips',()=>{
	let trips;
	
	it('Get accounts in the blockchain', () => {
		Trips.deployed().then(instance => {	
			console.log(instance);
			trips=instance;
			return web3.eth.getAccounts();
		}).then(accounts =>{
			console.log(accounts);
			assert(accounts.length,3);
		});
	});
	
	it('Init trip passenger and verify registry',()=>{
		Trips.deployed().then(instance=>{
			trips=instance;
			return trips.initTrip(accounts[1],accounts[2],1,{from: account[0]});
		}).then(transaction =>{
			console.log(transaction);
			transactionHash=transaction.tx;
			transactionIndex=transaction.logs[0].args[3].toNumber();
			return trips.getInitialTripData(transactionIndex);
		}).then(result =>{
			console.log(result);
			assert(result.idPassenger,accounts[0]);
		});
	});
	
	it('Register 3 different AP with diferent timestamps', ()=>{
		Trips.deployed().then(instance=>{
			trips=instance;
			return trips.regisAPandTime(transactionHash,'ap1','hora1',transactionIndex);
		}).then(transaction=>{
			return trips.regisAPandTime(transactionHash,'ap2','hora2',transactionIndex);
		}).then(transaction=>{
			return trips.regisAPandTime(transactionHash,'ap2','hora3',transactionIndex);
		}).then(transaction=>{
			return trips.getAPsInfo(transactionHash);
		}).then(result=>{
			console.log(result);
			assert(result.length,3);
		});
	});
	
	it('Finalize trip and verify registry', ()=>{
		Trips.deployed().then(instance=>{
			trips=instance;
			return trips.endTrip(transactionHash,transactionIndex);
		}).then(transaction=>{
			console.log(transaction);
			return trips.getFinalTripData(transactionHash);
		}).then(result=>{
			console.log(result);
			assert(transactionIndex,result.indexTrip);
		});
	});
			
});
/**
contract("Trips",async () => {
  let instance;
  let accounts;
  let transactionInit;
  let transIndex;
  
  before(async () => {
      accounts = await web3.eth.getAccounts();
      instance = await Trips.deployed();
  });

  describe("Init Trip", async () => {
    before("Pasajero accounts[0], Conductor accounts[1], Vehiculo accounts[2]", async () => {
      //transactionInit = 
      await instance.initTrip(accounts[1],accounts[2],1,{value:web3.utils.toWei("1","ether"),from:accounts[0]});
      //transIndex = parseInt(transactionInit.logs[0][3]);
    });
    
    
    it("Verificando información guardada en transIndex", async () => {
      //const request = await instance.getInitialTripData(0);
      assert.equal('', '', "El pasajero debe encontrarse en este request");
    });
    
  });
});
*/
