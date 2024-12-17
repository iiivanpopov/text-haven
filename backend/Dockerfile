FROM oven/bun:latest AS base
WORKDIR /usr/src/app

COPY package.json ./
RUN bun i --production

FROM base AS build
COPY . .
RUN bunx prisma generate && bun run build

FROM oven/bun:latest AS release
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY prisma ./prisma

EXPOSE $PORT

CMD ["bun", "run", "start:migrate"]