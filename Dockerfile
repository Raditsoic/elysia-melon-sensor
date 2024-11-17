FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --production

COPY prisma ./prisma
RUN bunx prisma generate

COPY src ./src
COPY tsconfig.json .

COPY .env.dev .env

ENV NODE_ENV=development

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy && bun src/index.ts"]

