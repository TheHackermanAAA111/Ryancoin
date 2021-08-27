# hold client class


import crypto
from crypto.Hash import SHA
from crypto.PublicKey import RSA
from crypto.Signature import PKCS1_v1_5


class Client:
    def __init__(self):
        random = crypto.Random.new().read
        self._private_key = RSA.generate(1024,random)
        self._public_key = self._private_key.publickey()
        self._signer = PKCS1_v1_5.new(self._private_key)

    @property
    def identity(self):
        return binascii.hexlify(self._public_key.exportKey(format= 'DER')).decode('ascii')


Bob = Client()
print(Bob.identity)

'''

Bob.identity = 0929209235125321171272...2123124124
Jack = Client()

t = Transaction(
        Bob,
        Jack.identity,
        100.0
        )
signature = t.sign_transaction() = 7ce371wqo4euquqweyey...972

transactions = [].append(t)

'''
