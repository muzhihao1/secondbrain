#!/bin/bash
#
# Cloudflare Tunnel 修复脚本
# 问题：代理拦截UDP/QUIC流量，导致Tunnel连接失败
# 解决：强制使用HTTP/2协议（TCP 443）代替QUIC（UDP 7844）
#

set -e

echo "🔧 开始修复 Cloudflare Tunnel..."
echo ""

# 1. 停止当前服务
echo "📍 步骤 1/5: 停止 cloudflared 服务..."
sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist 2>/dev/null || true
echo "✅ 服务已停止"
echo ""

# 2. 备份原配置
echo "📍 步骤 2/5: 备份原配置文件..."
if [ -f /Library/LaunchDaemons/com.cloudflare.cloudflared.plist ]; then
    sudo cp /Library/LaunchDaemons/com.cloudflare.cloudflared.plist \
            /Library/LaunchDaemons/com.cloudflare.cloudflared.plist.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ 备份完成"
else
    echo "⚠️  原配置不存在，跳过备份"
fi
echo ""

# 3. 安装新配置（添加 --protocol http2）
echo "📍 步骤 3/5: 安装新配置（启用 HTTP/2 协议）..."
sudo cp com.cloudflare.cloudflared.plist /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo chown root:wheel /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo chmod 644 /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
echo "✅ 配置已更新"
echo ""

# 4. 重新加载服务
echo "📍 步骤 4/5: 重新启动 cloudflared 服务..."
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
echo "✅ 服务已启动"
echo ""

# 5. 验证服务状态
echo "📍 步骤 5/5: 验证服务状态..."
sleep 3

# 检查进程
if pgrep -x "cloudflared" > /dev/null; then
    echo "✅ cloudflared 进程正在运行"
    echo ""
    echo "📋 进程信息:"
    ps aux | grep cloudflared | grep -v grep
else
    echo "❌ cloudflared 进程未运行"
    echo "⚠️  查看错误日志:"
    echo "   tail -50 /Library/Logs/com.cloudflare.cloudflared.err.log"
    exit 1
fi

echo ""
echo "⏳ 等待20秒让 Tunnel 建立连接..."
sleep 20

# 检查日志确认连接成功
echo ""
echo "📋 最新日志 (最后10行):"
tail -10 /Library/Logs/com.cloudflare.cloudflared.err.log
echo ""

# 测试API连接
echo "🧪 测试 Obsidian API 连接..."
if curl -s -m 5 https://obsidian-api.chuhaihub.org/ | grep -q "error code: 1033"; then
    echo "❌ API仍然返回530错误，Tunnel可能未完全连接"
    echo ""
    echo "🔍 故障排查步骤："
    echo "1. 检查日志: tail -50 /Library/Logs/com.cloudflare.cloudflared.err.log"
    echo "2. 查找 'Connection registered' 或 'Started tunnel' 消息"
    echo "3. 如果看到 'timeout' 或 'connection terminated'，可能需要配置代理bypass"
    echo ""
    echo "💡 代理配置建议："
    echo "   在你的代理软件 (127.0.0.1:7890) 中添加以下域名到 bypass 列表:"
    echo "   - *.argotunnel.com"
    echo "   - *.cfargotunnel.com"
    echo "   - cftunnel.com"
    exit 1
else
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 5 https://obsidian-api.chuhaihub.org/)
    if [ "$HTTP_CODE" = "401" ] || [ "$HTTP_CODE" = "404" ] || [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Tunnel 连接成功！API返回 HTTP $HTTP_CODE"
        echo "   (401/404/200 都表示 Tunnel 工作正常，只是API需要认证或路径不存在)"
    else
        echo "⚠️  API返回 HTTP $HTTP_CODE，Tunnel状态未知"
    fi
fi

echo ""
echo "🎉 修复完成！"
echo ""
echo "📊 下一步："
echo "1. 访问 Cloudflare Dashboard 查看 Tunnel 状态是否变为 UP"
echo "2. 测试生产网站: https://secondbrain-two.vercel.app/tasks"
echo "3. 检查浏览器控制台，确认没有530错误"
echo ""
echo "📁 配置文件位置:"
echo "   /Library/LaunchDaemons/com.cloudflare.cloudflared.plist"
echo ""
echo "📝 日志文件位置:"
echo "   /Library/Logs/com.cloudflare.cloudflared.out.log"
echo "   /Library/Logs/com.cloudflare.cloudflared.err.log"
