import json
from flask import Flask, Response, request, jsonify
from marshmallow import Schema, fields, ValidationError
from web3 import Web3
from hexbytes import HexBytes
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


class HexJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, HexBytes):
            return obj.hex()
        return super().default(obj)
        
@app.route('/safemov/registerAPandTime', methods=['POST'])
def safemov():
  # Create the contract instance with the newly-deployed address
  safemov = w3.eth.contract(address=contract_address, abi=abi)
  
  body = request.get_json()
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
  
  receipt = w3.eth.getTransaction(txid)
  tx_dict = dict(receipt)
  tx_json = json.dumps(tx_dict, cls=HexJsonEncoder)
  return jsonify(tx_json,200)

