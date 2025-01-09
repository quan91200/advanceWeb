FROM mcr.microsoft.com/devcontainers/php:1-8.2-bookworm

# Tạo thư mục và thay đổi quyền sở hữu
RUN mkdir -p /workspace && chown -R vscode:vscode /workspace

# Cài đặt MariaDB client
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mariadb-client \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Cài đặt php-mysql driver
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Cài đặt Node.js (v16.x hoặc bản mới nhất)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Kiểm tra phiên bản Node.js và npm
RUN node -v && npm -v

# Cài đặt các gói npm toàn cục (global npm packages)
RUN npm install -g typescript vite eslint

# Đặt thư mục làm việc cho ứng dụng
WORKDIR /workspace

# Cài đặt các phụ thuộc của ứng dụng
RUN su vscode -c "npm install" 2>&1
