# GitHub Pages 部署说明

本项目使用 Next.js 静态导出，并通过 GitHub Actions 发布到 GitHub Pages。
问答和方言翻译在浏览器本地运行，不依赖 GitHub Pages 无法提供的服务端路由。

## 部署结构

- `pnpm build`：生成 `out/` 静态文件。
- `.github/workflows/deploy.yml`：测试、构建并发布 `out/`。
- `NEXT_PUBLIC_BASE_PATH`：项目仓库页面需要的子路径，例如 `/ningxia-tourism`。
- `NEXT_PUBLIC_SITE_URL`：公开站点根地址，用于 sitemap、robots 和页面元数据。
- `NEXT_PUBLIC_API_BASE_URL`：可选的独立问答 API 根地址；留空时完全本地运行。

## 首次发布

1. 在 GitHub 创建仓库，例如 `ningxia-tourism`。
2. 将本项目推送到仓库的 `main` 分支。
3. 打开仓库的 `Settings > Pages`。
4. 在 `Build and deployment` 中将 `Source` 设为 `GitHub Actions`。
5. 打开 `Actions > Deploy to GitHub Pages`，等待首次工作流完成。
6. 访问 `https://<用户名>.github.io/<仓库名>/`。

如果仓库名是 `<用户名>.github.io`，站点位于域名根目录，不需要子路径。

## 自定义域名

1. 先在 GitHub Pages 中添加并验证自定义域名，配置 DNS。
2. 在仓库的 `Settings > Secrets and variables > Actions > Variables` 添加：

   ```text
   SITE_URL=https://你的域名
   ```

3. 重新运行 `Deploy to GitHub Pages`。工作流会把 basePath 设为空，
   并让 sitemap、robots 与 metadata 使用自定义域名。

## 外部问答 API

GitHub Pages 只提供静态文件。如果需要 LLM 或共享限流，可独立部署问答 API，
然后在 GitHub 仓库变量中配置：

```text
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

该地址会出现在浏览器代码中，不能直接放密钥。服务端密钥、Redis 限流、
超时、日志和监控都应由外部 API 服务管理。

不配置此项时，浏览器直接执行 `src/lib/retriever.ts` 中的站内检索和
`src/lib/dialect.ts` 中的方言翻译。

## 本地验收

```powershell
pnpm test
pnpm build
pnpm preview
```

打开 `http://127.0.0.1:3000/`，重点检查：

- 首页与各级详情链接。
- 路线规划器生成结果。
- 方言翻译。
- 站内问答及引用。
- `sitemap.xml`、`robots.txt` 和 404 页面。

## 公开前说明

该项目定位为学习 / 演示项目。内容仍带「待核实」标记，未提供用户账号、
支付或评论功能，不采集登录信息。正式用于商业服务前仍需完成内容校订、
隐私政策、用户协议、图片与地图授权，以及自定义域名配置。
