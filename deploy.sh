#!/bin/sh

HOST=root@ad.aloodo.com
DOCROOT=/var/www/html
DEST="$HOST:$DOCROOT"

scp ad.js $DEST
scp alert.js $DEST
scp index.html $DEST
scp -pr pixel $HOST:/var/www
scp -pr toastr $DEST
scp -pr track $DEST
scp track.js $DEST
ssh $HOST apachectl graceful

