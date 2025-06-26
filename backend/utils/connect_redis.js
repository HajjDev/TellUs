const redis = require('redis');
require('dotenv').config();

const createclient = async ()=>{
        const client = await redis.createClient({
        username: process.env.REDIS_USR,
        password: process.env.REDIS_SECRET,
        socket: {
            host: process.env.REDIS_URI,
            port: process.env.REDIS_PORT
        }
    });

    client.on('error', err => console.log('Redis Error', err));
    
    await client.connect();

    return client;
}

async function test(){
    const client = await createclient();
    client.set('test');
    const value = await client.get('test');
    console.log(value)
}

test();

module.exports = createclient;



