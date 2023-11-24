import fs from 'fs';
import { fetch, Agent } from 'undici'
import { config } from './config';

const apiUrl = 'https://localhost:3000'; // Replace with your server URL

const clientCert = fs.readFileSync(config.CLIENT_CERT);
const clientKey = fs.readFileSync(config.CLIENT_PRIVATE_KEY);
const rootCA = fs.readFileSync(config.ROOT_CA_CERT);

const agent = new Agent({
  connect: {
    tls: {
      ca: [rootCA],
      cert: clientCert,
      key: clientKey,
      rejectUnauthorized: false
    },
  },
});

const run = async () => {
  // agent and tls is not working
  const options = {
    dispatcher: agent,
  };
  const response = await fetch(apiUrl, options);
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