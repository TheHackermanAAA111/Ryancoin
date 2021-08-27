const http = require('http');
const crypto = require('crypto');

const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

//encryption
const encrypt = (messageToEncrypt, salt)=> {
	let cipher = crypto.createCipher('aes-256-ctr', salt);
	let crypted = cipher.update(message, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

//decryption
const decrypt = (messageToDencrypt, salt)=> {
	let decipher = crypto.createDecipher('aes-256-ctr', salt);
	let dec = decipher.update(message, 'utf8', 'hex');
	dec += decipher.final('hex');
	return dec;
}



//create an instance of the server to handle requests
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


http.request('http://localhost:8000', (req, res, next) => {
	let {message} = req.body;
	let salt = req.params.id;
	let encrypted = encrypt(message, salt);
	if(!encrypted){
		res.satus(404);
		res.json({
			error: 'information is invalid'
		});
	} else{
		res.send(encrypted);
	}
});

http.get('http://localhost:8000', (req, res, next) => {
	let salt = req.params.id;
	let messageToDecrypt = req.query.message;
	let decrypted = decrypt(messageToDecrypt, salt);
	if(!decrypted){
		res.satus(404);
		res.json({
			error: 'information is invalid'
		});
	} else{
		res.send(decrypted);
	}
})
