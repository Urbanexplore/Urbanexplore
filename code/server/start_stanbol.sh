#! /bin/sh

# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

### BEGIN INIT INFO
# Provides:          stanbol
# Default-Start:     2 3 4 5
# Default-Stop:
# Short-Description: Semantic HTTP services
# Description:       stanbol is HTTP service that provides semantic analysis and
#                    indexing tools for Content Management Systems.
### END INIT INFO

#echo "Set the ulimit for the current bash"
#ulimit allow to get rid of "too many open files" error
#ulimit -n 1048576

set -e

# /etc/init.d/stanbol: start and stop the stanbol server

# Runtime parameters - feel free to customize:
JAVA=/usr/bin/java
JAVA_OPTS='-Xmx1g -XX:MaxPermSize=256m'
STANBOL_DIR="$(pwd)/launcher/target"
STANBOL_JAR="$STANBOL_DIR/eu.ooffee.urban.launcher-0.0.1-SNAPSHOT.jar "
STANBOL_PID_FILE="$STANBOL_DIR/stanbol.pid"
STANBOL_PORT=8080
STANBOL_OPTS=''

# TODO: make it possible to configure log files and rotation

test -x $JAVA || exit 0

. /lib/lsb/init-functions

export PATH="${PATH:+$PATH:}/usr/sbin:/sbin"


stanbol_start() {
    if start-stop-daemon --start --quiet --background \
        --chdir $STANBOL_DIR \
        --pidfile $STANBOL_PID_FILE --make-pidfile \
        --exec $JAVA -- $JAVA_OPTS -jar $STANBOL_JAR \
        -p $STANBOL_PORT $STANBOL_OPTS
    then
        rc=0
        sleep 5
        if ! kill -0 $(cat $STANBOL_PID_FILE) >/dev/null 2>&1; then
            log_failure_msg "stanbol daemon failed to start"
            rc=1
        fi
    else
        rc=1
    fi
    if [ $rc -eq 0 ]; then
        log_end_msg 0
    else
        log_end_msg 1
        rm -f $STANBOL_PID_FILE
    fi
} # stanbol_start


case "$1" in
    start)
        log_daemon_msg "Starting stanbol daemon on port $STANBOL_PORT"
        if [ -s $STANBOL_PID_FILE ] && kill -0 $(cat $STANBOL_PID_FILE) >/dev/null 2>&1; then
            log_progress_msg "apparently already running"
            log_end_msg 0
            exit 0
        fi
        stanbol_start
        ;;
    stop)
        log_daemon_msg "Stopping stanbol daemon" "stanbol"
        start-stop-daemon --stop --quiet --oknodo --pidfile $STANBOL_PID_FILE
        log_end_msg $?
        rm -f $STANBOL_PID_FILE
        ;;

    reload|force-reload)
        log_warning_msg "Reloading stanbol daemon does nothing"
        ;;

    cleanup)
        set +e
        log_daemon_msg "Restarting stanbol daemon" "stanbol"
        if [ -s $STANBOL_PID_FILE ] && kill -0 $(cat $STANBOL_PID_FILE) >/dev/null 2>&1; then
            start-stop-daemon --stop --quiet --oknodo --pidfile $STANBOL_PID_FILE || true
             #sleep 5
	    sleep 3m
        else
            log_warning_msg "stanbol daemon not running, attempting to start."
            rm -f $STANBOL_PID_FILE
        fi
        log_daemon_msg "Start deleting graphs"
        cd /root/server/current/stanbol/felix/bundle76/data/tdb-data/mgraph
        rm -rf https%3A%2F%2F*
        rm -rf http%3A%2F%2F*
        stanbol_start
        ;;

    restart)
        set +e
        log_daemon_msg "Restarting stanbol daemon" "stanbol"
        if [ -s $STANBOL_PID_FILE ] && kill -0 $(cat $STANBOL_PID_FILE) >/dev/null 2>&1; then
            start-stop-daemon --stop --quiet --oknodo --pidfile $STANBOL_PID_FILE || true
            sleep 5
        else
            log_warning_msg "stanbol daemon not running, attempting to start."
            rm -f $STANBOL_PID_FILE
        fi
        stanbol_start
        ;;

    status)
        status_of_proc -p $STANBOL_PID_FILE "$JAVA" stanbol
        exit $?    # notreached due to set -e
        ;;
    *)
        echo "Usage: /etc/init.d/stanbol {start|stop|reload|cleanup|force-reload|restart|status}"
        exit 1
esac

exit 0
