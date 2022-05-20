const SafeMov = artifacts.require("./SafeMov.sol");

let transactionHash;
const txHash="0xd0ec95e6566c996a292b4dcfa86504c83170c6e26ad4a29267a6fcf9ec21828c";

const reportTest = async function (txNumber,accounts){
	
	SafeMov.deployed().then(safemov =>{
		for (var i=0;i<txNumber; i++){
			safemov.regisAPandTime(txHash,'ap1','hora1',{from:accounts[i]}).then(tx=>{
				return web3.eth.getTransaction(tx.tx);
			}).then(check=>{
				assert.strictEqual(check['from'], accounts[i]);
			});
		}
	});	
}



describe('Stress test', ()=>{
  it('can handle 3 participants', ()=>{
    web3.eth.getAccounts().then(accounts =>{
      reportTest(3, accounts);
    });
  });
  
  it('can handle 5 participants', ()=>{
    web3.eth.getAccounts().then(accounts =>{
      reportTest(5, accounts);
    });
  });
  
  it('can handle 10 participants', ()=>{
    web3.eth.getAccounts().then(accounts =>{
      reportTest(10, accounts);
    });
  });
  
  it('can handle 50 participants', ()=>{
    web3.eth.getAccounts().then(accounts =>{
      reportTest(50, accounts);
    });
  });
  
  it('can handle 100 participants', ()=>{
    web3.eth.getAccounts().then(accounts =>{
      reportTest(100, accounts);
    });
  });
});



