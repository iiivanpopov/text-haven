FROM imbios/bun-node:latest-18-alpine AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package.json ./
RUN bun install

FROM base AS build
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN bunx prisma generate
RUN bun run build

FROM base AS release
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist/app.js ./dist/
COPY --from=build /usr/src/app/package.json ./
COPY prisma prisma

EXPOSE ${PORT}

CMD ["bun", "run", "start:migration:prod"]
