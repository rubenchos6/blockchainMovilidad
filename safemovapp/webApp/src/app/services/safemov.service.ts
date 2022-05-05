import { Injectable } from '@angular/core';
const Web3 = require('web3');
const Web3Utils = require('web3-utils');

declare let require: any;
declare let window: any;
const tokenAbi = require('../../../../../build/contracts/SafeMov.json');

@Injectable({
  providedIn: 'root'
})
export class SafemovService {
  private readonly web3: any;
  private accounts: any = null;
  private enable: any;
  
  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      console.log('safemov.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('safemov.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
    }
  }
  
  //ACCOUNTS 
  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }
  
  public async getAccounts(): Promise<any> {
    console.log('safemov.service :: getAccounts :: start');
    if (this.accounts == null) {
      this.accounts = await new Promise((resolve, reject) => {
        console.log('safemov.service :: getAccounts :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err:any, retAccount:any) => {
          console.log('safemov.service :: getAccounts: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.accounts = retAccount;
            resolve(this.accounts);
          } else {
            alert('safemov.service :: getAccounts :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('safemov.service :: getAccounts :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.accounts);
  }
  
  //SETTERS 
  public async initTrip(value:any): Promise<any> {
    const that = this;
    console.log('safemov.service :: initTrip passenger: ' +value.passenger + ', driver: ' + value.driver + ', vehicle: ' + value.vehicle + ', cost:' + value.amount);
      
    return new Promise((resolve) => {
      console.log('safemov.service :: initTrip :: tokenAbi');
      //console.log(tokenAbi);
      const contract = require('truffle-contract');
      const safeMovContract = contract(tokenAbi);
      safeMovContract.setProvider(that.web3); 
      console.log('safemov.service :: initTrip :: initTrip');
      console.log(safeMovContract);
      
      safeMovContract.deployed().then(function(instance:any) {
        return instance.initTrip(value.driver,value.vehicle,parseInt(value.amount),value.timestamp,value.origin,value.destination, {value:Web3Utils.toWei(value.amount,"ether"),from: value.passenger}).then((transaction:any) =>{
	    console.log('safemov.service :: initTrip :: transactionHash');
	    console.log(transaction);
	    resolve(transaction.tx);
	  });
      });
    });
  } 
  
  public async regisAPandTime(value:any):Promise<any>{
    const that = this;
    console.log('safemov.service :: regisAPandTime AP: ' + value.ap + ', transactionHash: '+value.transactionHash+', timestamp:' + value.timestamp);
    return new Promise((resolve, reject) => {
      console.log('safemov.service :: regisAPandTime :: tokenAbi');
      //console.log(tokenAbi);
      const contract = require('truffle-contract');
      const safeMovContract = contract(tokenAbi);
  
      safeMovContract.setProvider(that.web3); 
      console.log('safemov.service :: regisAPandTime :: regisAPandTime');
      console.log(safeMovContract);
      
      safeMovContract.deployed().then(function(instance:any) {
        return instance.regisAPandTime(value.transactionHash,value.ap,value.timestamp,{from: value.vehicle}).then((transaction:any) =>{
	    console.log(transaction);
	    var transactionHash=transaction.tx;
	    return instance.getPastEvents('regisAPandTime',{filter:{_tripTransaction:value.transactionHash}});
	  }).then((result:any) =>{
	    console.log(result);
	    resolve(result);
	  });
      });
    });
  }
  
  public async endTrip(value:any): Promise<any>{
    const that = this;
    console.log('safemov.service :: endTrip driver: ' + value.driver + ', transactionHash: '+value.transactionHash+', cost:' + value.amount);
    return new Promise((resolve, reject) => {
      console.log('safemov.service :: endTrip :: tokenAbi');
      //console.log(tokenAbi);
      const contract = require('truffle-contract');
      const safeMovContract = contract(tokenAbi);
  
      safeMovContract.setProvider(that.web3); 
      console.log('safemov.service :: endTrip :: endTrip');
      console.log(safeMovContract);
      
      safeMovContract.deployed().then(function(instance:any) {
        return instance.endTrip(value.transactionHash,value.driver,parseInt(value.amount),{from: value.driver}).then((transaction:any) =>{
	    console.log(transaction);
	    var transactionHash=transaction.tx;
	    return instance.getPastEvents('endT',{filter:{_tripTransaction:value.transactionHash}})
	  }).then((result:any) =>{
	    console.log(result[0]);
	    resolve(result[0]);
	  });
      });
    });
  }
  
  //GETTERS  
  public async getTripsRelatedToAccount(address:string, type:string):Promise<any>{
    const that = this;
    console.log('safemov.service :: getTripsRelatedToAccount address: ' + address);
    return new Promise((resolve, reject) => {
      console.log('safemov.service :: getTripsRelatedToAccount :: tokenAbi');
      //console.log(tokenAbi);
      const contract = require('truffle-contract');
      const safeMovContract = contract(tokenAbi);
  
      safeMovContract.setProvider(that.web3); 
      console.log('safemov.service :: getTripsRelatedToAccount :: getTripsRelatedToAccount');
      console.log(safeMovContract);
      var filterAdd;
      if (type=='p'){
      	filterAdd='_idPassenger';
      }
      else{
      	filterAdd='_idDriver';
      }
      safeMovContract.deployed().then(function(instance:any) {
        return instance.getPastEvents('initT',{filter:{filterAdd:address}}).then((transaction:any) =>{
	    console.log(transaction);
	    resolve(transaction[0]);
	  });
      });
    });
  }
  
  public async getTripInfoFromTransaction(tx:string):Promise<any>{
    const that = this;
    console.log('safemov.service :: getTripInfoFromTransaction transactionHash: ' + tx);
    return new Promise((resolve, reject) => {
      console.log('safemov.service :: getTripInfoFromTransaction :: tokenAbi');
      //console.log(tokenAbi);
      const contract = require('truffle-contract');
      const safeMovContract = contract(tokenAbi);
  
      safeMovContract.setProvider(that.web3); 
      console.log('safemov.service :: getTripInfoFromTransaction :: getTripInfoFromTransaction');
      console.log(safeMovContract);
      safeMovContract.deployed().then(function(instance:any) {
        return instance.getPastEvents('endT',{filter:{_tripTransaction:tx}}).then((transaction:any) =>{
	    console.log(transaction);
	    resolve(transaction[0]);
	  });
      });
    });
  }
  
  public async getAPsInfoFromTransaction(tx:string):Promise<any>{
    const that = this;
    console.log('safemov.service :: getAPsInfoFromTransaction transactionHash: ' + tx);
    return new Promise((resolve, reject) => {
      console.log('safemov.service :: getAPsInfoFromTransaction :: tokenAbi');
      //console.log(tokenAbi);
      const contract = require('truffle-contract');
      const safeMovContract = contract(tokenAbi);
  
      safeMovContract.setProvider(that.web3); 
      console.log('safemov.service :: getAPsInfoFromTransaction :: getAPsInfoFromTransaction');
      console.log(safeMovContract);
      safeMovContract.deployed().then(function(instance:any) {
        return instance.getPastEvents('registerAP',{filter:{_tripTransaction:tx}}).then((transaction:any) =>{
	    console.log(transaction);
	    resolve(transaction);
	  });
      });
    });
  }

}
