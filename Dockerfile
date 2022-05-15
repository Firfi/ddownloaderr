FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
RUN npm install\
       && npm install typescript -g
RUN npx prisma generate
COPY src ./src/
RUN tsc

FROM node:16

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY scripts ./scripts/

ENV DATABASE_URL=file:/downloads/meta.db

RUN chmod -R +x ./scripts/

ENTRYPOINT ["./scripts/run.sh"]
CMD []
