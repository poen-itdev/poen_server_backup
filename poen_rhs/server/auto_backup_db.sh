#!/bin/bash
while [ 1 ]; do
	sleep 60m
	./backup_db.sh
	mv /home/poen/poen/backup/poenDB /home/poen/poen/backup/$(date +%Y)-$(date +%m)-$(date +%d)T$(date +%H):$(date +%M):$(date +%S)_poenDB
	/usr/bin/find /home/poen/poen/backup -type f -mtime +7 -exec rm -rf {} +
done

