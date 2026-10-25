FROM node:24.22.1-alpine3.23 AS base
WORKDIR /app

FROM base AS dependencies
COPY app/package*.json ./
RUN npm ci

FROM dependencies AS test
COPY app/ ./
RUN npm test && npm run lint

FROM base AS production-dependencies
COPY app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM base AS runtime
ENV NODE_ENV=production PORT=3000
ARG APP_VERSION=0.1.0
ARG GIT_SHA=local
# npm is only needed while building dependencies. Removing it keeps the
# runtime image limited to the Node.js application and avoids shipping the
# base image's unused global npm dependency tree.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
ENV APP_VERSION=${APP_VERSION} GIT_SHA=${GIT_SHA}
LABEL org.opencontainers.image.title="DevOps Portfolio" \
      org.opencontainers.image.description="Portfolio app for a DevOps delivery project" \
      org.opencontainers.image.version=${APP_VERSION} \
      org.opencontainers.image.revision=${GIT_SHA}
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node app/package.json ./package.json
COPY --chown=node:node app/src ./src
COPY --chown=node:node app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "src/server.js"]
