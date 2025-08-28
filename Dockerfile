FROM node:18-alpine

# Install system dependencies (only what's absolutely necessary)
RUN apk add \
  git \
  tini \
  bash

WORKDIR /shared

# Copy entrypoint script first and verify it exists
COPY ./entrypoint.sh /entrypoint.sh
RUN ls -la /entrypoint.sh && chmod +x /entrypoint.sh

COPY ./.env /

# Expose ports (Site, Admin, Info, Hype, Sponsor)
EXPOSE 3001 3002 3003 3004 3005 3006

ENTRYPOINT ["tini", "--", "/entrypoint.sh"]

