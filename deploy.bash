#! /usr/bin/env bash

git pull
pipenv install
cd react-vite
npm run build
sudo systemctl restart where-da-gas-at-back
sudo systemctl restart where-da-gas-at-front
