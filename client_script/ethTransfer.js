const Web3 = require('web3');
async function main(){
	const web3 = new Web3('http://localhost:8545');
	const privateKeyA = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
	const accountA = web3.eth.accounts.privateKeyToAccount(privateKeyA);
	var accountABalance = web3.utils.fromWei(await web3.eth.getBalance(accountA.address));
	console.log("Account A has balance of: " + accountABalance);
	
	const privateKeyB = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
	const accountB = web3.eth.accounts.privateKeyToAccount(privateKeyB);
	var accountBBalance = web3.utils.fromWei(await web3.eth.getBalance(accountB.address));
	console.log("Account B has balance of: " + accountBBalance);
	
	const txn = {
	    nonce: web3.utils.numberToHex(await web3.eth.getTransactionCount(accountA.address)),
	    from: accountA.address,
	    to: accountB.address, 
	    value: 200,  //amount of eth to transfer
	    gasPrice: 1, //ETH per unit of gas
	    gasLimit: 21000 //max number of gas units the tx is allowed to use
	  };

	  console.log("create and sign the txn")
	  const signedTx = await web3.eth.accounts.signTransaction(txn, accountA.privateKey);
	  console.log("sending the txn")
	  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	  console.log("tx transactionHash: " + txReceipt.transactionHash);

	  //After the transaction there should be some ETH transferred
	  accountABalance = web3.utils.fromWei(await web3.eth.getBalance(accountA.address));
	  console.log("Account A has an updated balance of: " + accountABalance);
	  accountBBalance = web3.utils.fromWei(await web3.eth.getBalance(accountB.address));
	  console.log("Account B has an updated balance of: " + accountBBalance);
}

if (require.main === module) {
  main();
}

module.exports = exports = main
