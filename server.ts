import Koa from 'koa';
import https from 'https';
import fs from 'fs';
import { config } from './config';

const app = new Koa();
const port = 3000;

const options = {
    // key: fs.readFileSync('server-private-key.pem', 'utf-8').toString(),
    // cert: fs.readFileSync('server.crt', 'utf-8').toString(),
    // ca: fs.readFileSync('rootCA.crt', 'utf-8').toString(),
  key: fs.readFileSync(config.SERVER_PRIVATE_KEY),
  cert: fs.readFileSync(config.SERVER_CERT),
  ca: fs.readFileSync(config.ROOT_CA_CERT),
    requestCert: true,
    rejectUnauthorized: true,
  };

console.log({
  ...options,
  key: options.key.toString(),
  cert: options.cert.toString(),
  ca: options.ca.toString(),
});

const server = https.createServer(options, app.callback());

app.use(async (ctx) => {
  console.log('hello');
  ctx.body = 'Hello, secure world!';
  ctx.status = 200;
});

server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
