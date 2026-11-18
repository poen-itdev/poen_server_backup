#!/bin/bash
pkill -9 -f mongod
pkill -9 -f npm
pkill -9 -f nodemon
pkill -9 -f node
killall -I BUN
