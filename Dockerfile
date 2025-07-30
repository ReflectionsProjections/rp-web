FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
  curl \
  git \
  build-essential \
  vim \
  tini \
  sudo \
  && rm -rf /var/lib/apt/lists/*

# Install Node.js (LTS) and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn

WORKDIR /shared

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./.env /

# Expose ports (Site, Admin, Info, Hype, Sponsor)
EXPOSE 3001 3002 3003 3004 3005

ENTRYPOINT ["tini", "--", "/entrypoint.sh"]

