const lag = require('event-loop-lag')(1);
const crypto = require('crypto');

console.log('event loop lag is %d', lag());

for (let index = 0; index < 10000; index++) {
    const cipher = crypto.createCipher('aes192', 'a password not that long a password not that long');
    cipher.write('some clear text data a password not that long a password not that long');
    cipher.end();
    cipher.on('readable', () => {
        if (index % 100 === 0) {
            console.log('event loop lag after some nasty blocking %d', lag());
        }
    });
}