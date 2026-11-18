#!/bin/bash
sudo ./kill_all.sh
sudo rm -rf db
mkdir db
sudo ./start_db.sh
sudo ./start_server.sh
sleep 3
./make_db.sh
npm install

