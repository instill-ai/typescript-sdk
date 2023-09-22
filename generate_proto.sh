#!/bin/bash

# Clone the repository
git clone https://github.com/instill-ai/protobufs.git

# Move into the cloned repository directory
cd protobufs

rm -rf buf.gen.yaml

cp ../buf.gen.yaml ./

buf generate --template buf.gen.yaml

rm -rf protobufs

echo "TypeScript code generation completed!"
