#!/bin/sh

DEST=root@track.aloodo.com:/var/www/html

scp ad.js $DEST
scp alert.js $DEST
scp -pr css $DEST
scp -pr images $DEST
scp index.html $DEST
scp -pr toastr $DEST
scp -pr track $DEST
scp track.js $DEST
