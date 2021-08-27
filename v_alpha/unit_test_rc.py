#Ryancoin Unit Test
from ryancoin import Blockchain

blockchain=Blockchain()

print("****Mining Ryancoin about to start****")
print(blockchain.chain)

last_block=blockchain.last_block
last_proof_no=last_block.proof_no
proof_no=blockchain.construct_proof_of_work(last_proof_no)

blockchain.new_data(
        sender="0",
        recipient="George Clooney",
        quantity=1,
        )

last_hash=last_block.calculate_hash
block=blockchain.construct_block(proof_no, last_hash)

print("****Mining Ryancoin has been successful****")
print(blockchain.chain)



