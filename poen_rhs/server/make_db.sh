#!/bin/bash
mongosh << EOF
use poenDB
db.createUser({user: "poen", pwd: "poen4upoen4u", roles: [{role: "readWrite", db: "poenDB"}]})
EOF


