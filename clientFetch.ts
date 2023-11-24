import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import { config } from './config';

const apiUrl = 'https://localhost:3000'; // Replace with your server URL

// const clientCert = fs.readFileSync('client.crt', 'utf-8').toString();
// const clientKey = fs.readFileSync('client-private-key.pem', 'utf-8').toString();
// const rootCA = fs.readFileSync('rootCA.crt', 'utf-8').toString()

const clientCert = fs.readFileSync(config.CLIENT_CERT);
const clientKey = fs.readFileSync(config.CLIENT_PRIVATE_KEY);
const rootCA = fs.readFileSync(config.ROOT_CA_CERT);

console.log({
  cert: clientCert,
  key: clientKey,
  ca: rootCA,
  rejectUnauthorized: false
});

const agent = new https.Agent({
  cert: clientCert,
  key: clientKey,
  ca: rootCA,
  rejectUnauthorized: false
});

const run = async () => {
  const response = await fetch(apiUrl, { agent });
  // const response = await fetch(apiUrl);
  const data = await response.text();
  console.log({
    response,
    data,
  });
}

(async () => {
  try {
    await run();
  } catch(err){
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
})();