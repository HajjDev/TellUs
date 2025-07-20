const redis = require('redis');
require('dotenv').config();

const createClient = async ()=>{

    const client = await redis.createClient({
            username: process.env.REDIS_TOKEN_USR,
            password: process.env.REDIS_TOKEN_SECRET,
            socket: {
                host: process.env.REDIS_TOKEN_URI,
                port: process.env.REDIS_TOKEN_PORT
            }
        });

    client.on('error', err => console.log('Redis Error', err));
    
    await client.connect();

    return client;
}

async function test(){
    const client = await createClient();
    client.set('test', 'token');
    const value = await client.get('nope');
    console.log(value)
}

//test();

module.exports = createClient;



