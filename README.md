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