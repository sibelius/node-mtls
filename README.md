# node-mtls

## Generate certificates

First generate rootCA, client and server certificates

```sh
./generate_certs.sh
```

## Run server

```sh
yarn es server.ts
```

## Test using client

```sh
yarn es client.ts
```

## Clean certificates

```
yarn clean
```

## Verify rootCA and client and server

```
openssl verify -CAfile rootCA.crt client.crt
openssl verify -CAfile rootCA.crt server.crt
```