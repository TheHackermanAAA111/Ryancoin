# Ryancoin
BITCOIN BUT BY RYAN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE IT OR ELSE


### Updates:
#### Basic encrpytion/decryption set up

#### Ryancoin.py
##### Block breakdown

- self: Instance of the block class
- index: keeping track of the block within the change
- proof_no: number produced during creation of block (aka mining)
- prev_has: hash of the previous block
- data: record of all transaction completed
- timestamp: place timestamp for the transaction

######Blockchain breakdown
#######Roles of Attributes:
- self.chain is key to all the blocks
- self.current_data: keeps all the completed transactions
- self.construct_genesis(): method takes care of constructing the intitial block of the chain
- just the construct_block method