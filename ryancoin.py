import hashlib
import time
import json
import binascii
import numpy as np
import pylab as pl
import logging
import collections
import random
#import pprint


class Block:
    def __init__(self, index, proof_no,data,prev_hash="0000",timestamp=None):
        #first block class
        self.index=index
        self.proof_no = proof_no
        self.prev_hash = prev_hash
        self.data = data
        self.timestamp = timestamp or time.time()

    def calculate_hash():
        #calculate the cryptographic hash of every block
        block_of_string = "{}{}{}{}{}".format(self.index, self.proof_no, self.prev_hash, self.data,self.timestamp)

        return hashlib.sha256(block_of_string.encode()).hexidigest()

    def __repr__(self):
        return "{} - {} - {} - {} - {}".format(self.index, self.proof_no, self.prev_hash, self.data,self.timestamp)

    #def mining(self, difficulty):
        # get transaction data from self.data


class Transaction:
    def __init__(self, diff, sender, recipient, value):
        #construct method
        self.difficulty = diff
        self.sender = sender # sender's public key
        self.recipient = recipient # recipient's public key
        self.value = value
        self.time = timestamp

    def to_dict(self):
        # converts data into dictionary object

        #setting identity
        if self.sender == "Genesis":
            identity = "Genesis"
        else:
            identity = self.sender.identity

        return collections.OrderedDict({
            'sender'    :   identity,
            'recipient' :    self.recipient,
            'value' :    self.value,
            'time'  : self.time})

    def sign_transaction(self):
        # sign dictionary using private key of the sender
       private_key = self.sender._private_key #protected variable
       signer = PKCS1_v1_5.new(private_key)
       h = SHA.new(str(self.to_dict()).encode('utf8'))
       return binascii.hexlify(signer.sigh(h)).decode('ascii')

class Blockchain:
    def __init__(self):
        #construct method
        self.chain=[]
        self.current_data = []
        self.nodes = set()
        self.construct_genesis()

    def construct_genesis(self):
        #construct the initial block
        self.construct_block(proof_no=0,prev_hash=0)

    def construct_block(self,proof_no,prev_hash):
        #construct a new block and adds it to chain
        block = Block(index=len(self.chain),
                proof_no=proof_no,
                prev_hash=prev_hash,
                data=self.current_data)
        self.current_data=[]
        self.chain.append(block)
        return block

    @staticmethod
    def check_validity():
        if prev_block.index +1 != block.index:
            return False
        return True


    @staticmethod
    def check_validity():
        #check whether the blockchain is valid
        if prev_block.index +1 != block.index:
            return False
        elif prev_block.calculate_hash != block.prev_hash:
            return False
        elif not Blockchain.verifying_proof(block.proof_no,prev_block.proof_no):
            return False
        elif block.timestamp <= prev_block.timestamp:
            return False
        #passed all tests HOORAY
        return True

    def new_data(self, sender, recipient, quantity):
        #adds a new transaction to the data of the transactions
        self.current_data.append({
            'sender': sender,
            'recipient': recipient,
            'quantity': quantity
            })
        return True

    @staticmethod
    def construct_proof_of_work(prev_proof):
        #protects the blockchain from attack
        proof_no = 0
        while Blockchain.verifiying_proof(proof_no,prev_proof) is False:
            proof_no += 1
        return proof_no


    @staticmethod
    def verifying_proof(prev_proof, proof):
        #does hash(last_proof,proof) contain 4 leading 0's?
        guess=f'{prev_proof}{proof}'.encode()
        guess_hash=hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"

    @property
    def last_block(self):
        #returns the last block of the blockchain
        return self.chain[-1]
