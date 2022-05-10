import json
from flask import Flask, Response, request, jsonify
from marshmallow import Schema, fields, ValidationError
from web3 import Web3
# web3.py instance
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
account = w3.eth.account.privateKeyToAccount('0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f')
w3.eth.defaultAccount = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'

# Get stored abi and contract_address
with open('../build/contracts/SafeMov.json', 'r') as f:
  datastore = json.load(f)
  abi = datastore['abi']
  #print(datastore['networks']['2018']['address'])
  contract_address = datastore['networks']['2018']['address']

# Initializing flask app
app = Flask(__name__)
# api to set new user every api call

@app.route('/safemov/registerAPandTime', methods=['POST'])
def safemov():
  # Create the contract instance with the newly-deployed address
  safemov = w3.eth.contract(address=contract_address, abi=abi)
  
  body = request.get_json()
  
  #print(body['tx'])
  #0x37ea1526c1857f6e8c945ca51ab5b319e5bb7d6a326112b526cb8f8999537846
  tx=''
  for i in range(2,len(body['tx']),2):
    tx=tx+r"\x"+body['tx'][i:i+2]
  #print(tx)
  tx=bytes(tx,'utf-8')
  #print(tx)
  
  
  #tx=b'\x37\xea\x15\x26\xc1\x85\x7f\x6e\x8c\x94\x5c\xa5\x1a\xb5\xb3\x19\xe5\xbb\x7d\x6a\x32\x61\x12\xb5\x26\xcb\x8f\x89\x99\x53\x78\x46'
  nonce = w3.eth.get_transaction_count(account.address)
  
  tx_hash = safemov.functions.regisAPandTime(body['tx'],body['ap'], body['timestamp'],body['rssi']).buildTransaction({
        'chainId': 1337, 
        'gasPrice': w3.eth.gas_price,
        'nonce': nonce,
    })
    
  signed_txn = account.signTransaction(tx_hash)
  txid = w3.toHex(w3.eth.sendRawTransaction(signed_txn.rawTransaction))
  
  print('TX_HASH')
  print(txid)
  
  #receipt = w3.eth.getTransaction(signed_txn)
  
  return jsonify({'hola':'hola'},200)
  '''
  tx_hash = user.functions.setUser(result['name'],result['gender']).transact()
  # Wait for transaction to be mined…
  receipt = w3.eth.waitForTransactionReceipt(tx_hash)
  user_data = user.functions.getUser().call()
  return jsonify({'data': user_data}, 200)
  '''
