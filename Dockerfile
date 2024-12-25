FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY server ./server
COPY games ./games

RUN bun install --production

EXPOSE 3000

CMD ["bun", "run", "server/src/index.ts"] 