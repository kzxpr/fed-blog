# fed-blog
Simple blog with support for Mastodon interaction using ActivityPub

## Running this is your own responsibility
This software is NOT tested for production and installing it is AT YOUR OWN RISK!

## How to run?
This section is coming very soon!!!

## If using a proxy
Remember to add these in Nginx:

    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

## MySQL database

Database is set up to run utf8. To change a table, do:

    ALTER TABLE apactivities CONVERT TO CHARACTER SET utf8;

## ActivityPub requires SSL to test

### Run through SSH tunnel:

    ssh -R remoteport:127.0.0.1:localport user@ip.ip.ip.ip

Example:

    ssh -R 5012:127.0.0.1:3001 root@ip.ip.ip.ip