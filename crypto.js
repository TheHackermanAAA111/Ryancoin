const crypto = require ('crypto');

// encryption

const encrypt = (messageToEncrypt, salt) => {
  let cipher = crypto.createCipher('aes-256-ctr', salt);
  let crypted = cipher.update(message, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

// decryption
const decrypt = (messageToDecrypt, salt) => {
  let decipher = crypto.createDecipher('aes-256-ctr', salt);
  let dec = decipher.update(message, 'utf8', 'hex');
  dec += decipher.final('hex');
  return dec;
}

//making app to test crypto
const http = require('http');

//create an instance of the server to handle requests
let app = http.createServer((req,res,next) => {
	//set a response
	res.writeHead(200, {'Content-Type': 'text/plain'});

	//send back a response
	res.end('Hope this works');
});

//Start server
app.listen(3000, '127.0.0.1');
console.log('Server running on 3000 port');

app.post('/api/encrypt/:id', (req, res, next)=> {
  let {message} = req.body;
  let salt = req.params.id;
  let encrypted = encrypt(message, salt);
  if (!encrypted){
    res.status(404);
    res.json({
      error: 'information is invalid AAAAAHHHHHHHH!!!!!'
    })
  }else{
    res.send(encrypted);
  }
});

app.get('/api/encrypt/:id', (req, res, next) => {
  let salt = req.params.id;
  let messageToDecrypt = red.query.message;
  let decrypted = decrypt(messageToDecrypt, salt);
  if(!decrypted){
    res.status(404);
    res.json({
      error: 'information is invalid AAAAAHHHHHHHH!!!!!'
    });
  }else{
    res.send(decrypted);
  }
})