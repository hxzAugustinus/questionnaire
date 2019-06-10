#Nginx
#Author : hxz
#version 1.0.0

#basic image
FROM nginx
#copy  web  files
COPY dist/  /usr/share/nginx/html/
#copy  config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf