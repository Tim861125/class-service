# 使用 Node.js 作為基礎映像
FROM oven/bun:1.1.34-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package.json bun.lockb* ./

# 安裝相依套件
RUN bun install

# 複製專案原始碼
COPY . .

# 若有使用 TypeScript，可在這裡 build
# RUN npm run build

# 開放 port，實際值依照你應用的 port（例如 3000）
# EXPOSE 3000

# 啟動應用程式
ENTRYPOINT ["bun", "index.ts"]
