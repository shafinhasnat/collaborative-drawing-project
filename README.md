# INSTALL OPENFIRE
It has three parts, set up database where all openfire data will be stored, install openfire, connect openfire with database then finally run. In this case we will be using Postgresql database.

## Setup database
`sudo -iu postgres`

`CREATE DATABASE openfiredb;`

`CREATE USER openfireuser WITH ENCRYPTED PASSWORD 'OpenFirePWD';`

To show roles `\du`

## Install Openfire
`cd /opt`

`sudo wget https://www.igniterealtime.org/downloadServlet?filename=openfire/openfire_4.6.4_all.deb`

`sudo apt install ./downloadServlet\?filename\=openfire%2Fopenfire_4.6.4_all.deb`

`sudo systemctl start openfire`

`sudo systemctl enable openfire`

## Connect postgres and openfire
`sudo psql -f /usr/share/openfire/resources/database/openfire_postgresql.sql -h localhost -U openfireuser -d openfiredb -W`

`sudo psql -h localhost -d openfiredb -U openfireuser -W` or `\c openfiredb;`

`dt`

## Run
`ip:9090`

