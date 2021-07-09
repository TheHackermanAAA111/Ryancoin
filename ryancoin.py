class Block:
	def __init__(self, index, proof_no, prev_hash, data, timeStamp=none):
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
      
class Blockchain:
  def __init__(self):
		#construct method
    self.chain=[]
    self.current_data = []
    self.nodes = set()
    self.construct_genesis(self)

	def construct_genesis(self):
		#consruct the inital block
	pass
	def construct_block(self,proof_no,prev_hash):
		#construct a new block and adds it to chain
	pass
	@staticmethod
  def check_validity():
		#check whether the blockchain is vaild
	pass
  def new_data(self, sender, recipient, quantity):
		#adds a new transaction to the data of the transactions
	pass
  @staticmethod
  def construct_proof_of_work(prev_proof):
		#protects the blockchain from attack
	pass
  @property
  def last_block(self):
		#returns the last block of the blockchain
		return self.chain[-1]