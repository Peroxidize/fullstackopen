#!/bin/bash

echo "Build script"

echo "Install packages for frontend"
cd ../part2/phonebook && pnpm install && cd ../../part3

echo "Install packages"
pnpm install

echo "Build UI"
pnpm run build:ui
