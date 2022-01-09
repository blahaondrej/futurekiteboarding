FROM php:7.2-apache
RUN a2enmod rewrite
RUN a2enmod headers

WORKDIR /var/www/html
COPY ${source:-dist} .