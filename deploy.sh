#!/bin/bash
# ============================================
# 🚀 zzqblog 一键部署脚本
# 用法: ./deploy.sh [commit message]
# ============================================

set -e

# ---- 配置 ----
SERVER="root@157.230.246.59"
REMOTE_DIR="/var/www/blog"
PM2_NAME="zqblog"
BRANCH="main"

# ---- 颜色 ----
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${CYAN}[部署]${NC} $1"; }
success() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ---- Step 1: 提交代码 ----
log "📦 提交代码到 GitHub..."
COMMIT_MSG="${1:-🚀 auto deploy $(date '+%Y-%m-%d %H:%M')}"

git add -A
if git diff --cached --quiet; then
  warn "没有新的更改需要提交，跳过 commit"
else
  git commit -m "$COMMIT_MSG"
fi
git push origin "$BRANCH"
success "代码已推送到 GitHub"

# ---- Step 2: SSH 到服务器拉取并构建 ----
log "🔄 连接服务器，拉取代码并构建..."

ssh "$SERVER" << 'DEPLOY_SCRIPT'
set -e
cd /var/www/blog

echo "[服务器] 拉取最新代码..."
git pull origin main

echo "[服务器] 安装依赖..."
npm install --production=false

echo "[服务器] 构建项目..."
npm run build

echo "[服务器] 重启 PM2 进程..."
pm2 restart zqblog

echo "[服务器] ✅ 部署完成！"
DEPLOY_SCRIPT

success "🎉 部署成功！访问 https://zzqblog.codes 查看"
