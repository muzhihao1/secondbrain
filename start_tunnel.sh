#!/bin/bash

# Obsidian REST API + Cloudflare Tunnel 启动脚本
# 用途：将本地Obsidian REST API暴露为公网URL

echo "🚀 启动 Obsidian REST API Tunnel..."
echo ""
echo "====================================="
echo "📋 前提条件检查"
echo "====================================="

# 检查Obsidian是否运行
if ! pgrep -x "Obsidian" > /dev/null; then
    echo "⚠️  警告: Obsidian 未运行"
    echo "请先启动 Obsidian 并确保 Local REST API 插件已启用"
    echo ""
    read -p "按回车继续，或按 Ctrl+C 退出..."
fi

# 检查 cloudflared 是否安装
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared 未安装"
    echo "请运行: brew install cloudflare/cloudflare/cloudflared"
    exit 1
fi

echo "✅ cloudflared 已安装: $(cloudflared --version)"
echo ""

# 检查 Obsidian REST API 是否可访问
echo "====================================="
echo "🔍 测试 Obsidian REST API"
echo "====================================="

# 注意：由于是自签名证书，使用 -k 跳过SSL验证
if curl -k -s -H "Authorization: Bearer a9bb78697a7306061e9131735d4b0e99de6e20d61c57325012d404a25d54e957" \
    https://127.0.0.1:27124/vault/ > /dev/null 2>&1; then
    echo "✅ Obsidian REST API 可访问"
else
    echo "❌ 无法连接到 Obsidian REST API"
    echo ""
    echo "请检查："
    echo "1. Obsidian 是否正在运行"
    echo "2. Local REST API 插件是否已启用"
    echo "3. API 端口是否为 27124"
    echo ""
    exit 1
fi

echo ""
echo "====================================="
echo "🌐 启动 Cloudflare Tunnel"
echo "====================================="
echo ""
echo "正在创建公网访问通道..."
echo "这可能需要几秒钟..."
echo ""

# 启动 Cloudflare Tunnel
cloudflared tunnel --url https://127.0.0.1:27124

# 注意：此脚本会一直运行直到按 Ctrl+C 停止
