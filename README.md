# node-mtls

Article [Node mTLS from scratch](https://dev.to/woovi/node-mtls-from-scratch-3p4e)

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

node-fetch
```sh
yarn es clientFetch.ts
```

http.get
```sh
yarn es clientHttp.ts
```

undici fetch
```sh
yarn es clientUndici.ts
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
