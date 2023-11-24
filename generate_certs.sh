#!/bin/bash

# Generate RootCA
openssl genpkey -algorithm RSA -out rootCA-private-key.pem
openssl req -new -key rootCA-private-key.pem -out rootCA.csr -subj "/CN=client"
openssl x509 -req -days 3650 -in rootCA.csr -signkey rootCA-private-key.pem -out rootCA.crt

# Generate client mTLS certificate
openssl genpkey -algorithm RSA -out client-private-key.pem
openssl req -new -key client-private-key.pem -out client.csr -subj "/CN=client"
openssl x509 -req -days 365 -in client.csr -CA rootCA.crt -CAkey rootCA-private-key.pem -CAcreateserial -out client.crt

# Generate server certificate
openssl genpkey -algorithm RSA -out server-private-key.pem
openssl req -new -key server-private-key.pem -out server.csr -subj "/CN=localhost"
openssl x509 -req -days 365 -in server.csr -CA rootCA.crt -CAkey rootCA-private-key.pem -CAcreateserial -out server.crt

# Output confirmation
echo "Certificates generated successfully."
