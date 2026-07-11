FROM oven/bun:1

WORKDIR /app

COPY package.json package-lock.json ./
RUN bun install --production

COPY . .

EXPOSE 8080

CMD ["bun", "app.js"]