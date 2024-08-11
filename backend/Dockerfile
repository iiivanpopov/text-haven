FROM imbios/bun-node:latest-18-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bunx prisma generate
RUN bun run build

FROM base AS release
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/dist/app.js ./dist/
COPY --from=build /usr/src/app/package.json ./
COPY prisma prisma

EXPOSE ${PORT}

CMD ["bun", "run", "start:migration:prod"]
