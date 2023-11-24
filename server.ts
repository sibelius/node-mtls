import Koa from 'koa';
import https from 'https';
import fs from 'fs';

const app = new Koa();
const port = 3000;

const server = https.createServer(
  {
    key: fs.readFileSync('server-private-key.pem'),
    cert: fs.readFileSync('server.crt'),
    ca: fs.readFileSync('rootCA.crt'),
    requestCert: true,
    rejectUnauthorized: true,
  },
  app.callback()
);

app.use(async (ctx) => {
  console.log('hello');
  ctx.body = 'Hello, secure world!';
  ctx.status = 200;
});

server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
