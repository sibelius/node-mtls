import 'isomorphic-fetch';
import https from 'https';
import fs from 'fs';

const apiUrl = 'https://localhost:3000'; // Replace with your server URL

const clientCert = fs.readFileSync('client.crt');
const clientKey = fs.readFileSync('client-private-key.pem');
const rootCA = fs.readFileSync('rootCA.crt');

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