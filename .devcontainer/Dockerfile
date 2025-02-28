FROM laravelsail/php82-composer:latest

# Cài đặt môi trường làm việc
WORKDIR /var/www/html

# Cài đặt các dependency hệ thống
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    nodejs \
    npm \
    && docker-php-ext-install pdo pdo_mysql

# Copy mã nguồn vào container
COPY . .

# Cài đặt Composer dependencies
RUN composer install --no-interaction --no-progress --prefer-dist

# Cấp quyền cho Laravel storage
RUN chmod -R 777 storage bootstrap/cache

# CMD để chạy php-fpm
CMD ["php-fpm"]