#!/bin/bash

while [ 1 ]; do
    pid=$(ps -ef | grep "node" | grep -v 'grep' | awk '{print $2}')

    if [ -z "$pid" ]; then
    	    sleep 60
	    current_date_time=$(date)
	    echo "Current date and time: $current_date_time"
            echo "restart server start"
            /home/poen/poen/poen_rhs/server/start_server.sh
    fi

    sleep 60
done

