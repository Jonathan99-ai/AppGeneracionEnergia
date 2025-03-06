#!/bin/bash

#_Change_Working_Directory
cd /var/www/html

# /var/www/html is the folder apache2 http server uses to serve a website
sudo cp /home/ec2-user/server/dist/* . -r

#restar the apache2 server
sudo systemctl restart httpd
