#!/bin/bash

#go to the server folder where the file is
cd /home/ec2-user/server

#unzip the folder in the required route for apache2
unzip TestBuild.zip -d /var/www/html

#restar the apache2 server
sudo systemctl restart httpd

#_Change_Working_Directory
#cd /var/www/html

# /var/www/html is the folder apache2 http server uses to serve a website
#sudo cp /home/ec2-user/TestBuild.zip/* . -r