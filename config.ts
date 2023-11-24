import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

const getEnvFile = () => {
  if (process.env.ENV_FILE !== undefined) {
    return process.env.ENV_FILE;
  }

  return '.env';
};

const envFile = getEnvFile();

dotenvSafe.config({
  path: root(envFile),
  sample: root('.env.example'),
});

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  console.log('.env: ', path.join(cwd, envFile));
}

export const config = {
  SERVER_PRIVATE_KEY: process.env.SERVER_PRIVATE_KEY || 'server-private-key.pem',
  SERVER_CERT: process.env.SERVER_CERT || 'server.crt',
  ROOT_CA_CERT: process.env.ROOT_CA_CERT || 'rootCA.crt',
  CLIENT_CERT: process.env.CLIENT_CERT || 'client.crt',
  CLIENT_PRIVATE_KEY: process.env.CLIENT_PRIVATE_KEY || 'client-private-key.pem',
}