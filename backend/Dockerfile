FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN --mount=type=cache,target=/root/.bun \
    cd /temp/dev && bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY prisma prisma
COPY src src
COPY package.json bun.lock tsconfig.json ./
RUN --mount=type=cache,target=/root/.bun \
    bunx prisma generate && bun run build

FROM base AS release
COPY --from=prerelease /usr/src/app/generated generated
COPY --from=prerelease /usr/src/app/dist dist
COPY --from=prerelease /usr/src/app/prisma prisma
COPY --from=prerelease /usr/src/app/package.json ./

USER bun
EXPOSE ${PORT}
ENTRYPOINT ["bun", "run", "prisma:migrate:start"]
