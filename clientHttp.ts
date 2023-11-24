import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import { config } from './config';

const apiUrl = 'https://localhost:3000'; // Replace with your server URL

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

const options = {
  cert: clientCert,
  key: clientKey,
  ca: rootCA,
};

const reqPromise = () => new Promise((resolve, reject) => {
  const req = https.get(apiUrl, options, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => resolve(data));
  });

  req.on('error', (error) => reject(error));
});

const run = async () => {
  const response = await reqPromise();

  console.log({
    response,
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