<div align="center">
<img src="https://raw.githubusercontent.com/Mutantcat-Working-Group/BeverageWiki/main/logo.png" style="width:100px;" width="100"/>
<h2>饮料百科 · BeverageWiki</h2>
</div>

<div align="center">

🇨🇳 [中文](README.zh.md) · 🇺🇸 **English** · 🇯🇵 [日本語](README.ja.md) · 🇰🇷 [한국어](README.ko.md) · 🇫🇷 [Français](README.fr.md) · 🇩🇪 [Deutsch](README.de.md) · 🇪🇸 [Español](README.es.md) · 🇧🇷 [Português](README.pt.md) · 🇷🇺 [Русский](README.ru.md) · 🇸🇦 [العربية](README.ar.md) · 🇮🇳 [हिन्दी](README.hi.md) · 🇹🇭 [ไทย](README.th.md) · 🇻🇳 [Tiếng Việt](README.vi.md)

</div>

> beverage.wiki —— 一座写给全世界饮料的在线百科。
> 记录它们的历史、配方、包装与文化，趁还没消失，先记下来。

### 一、产品概述

- beverage.wiki 是一个开放的饮料百科，收录来自世界各地的饮品，讲清它的来历、配方、包装与背后的文化
- 全站内容以 Markdown 存放在 GitHub，站点为 Next.js 15 静态导出，无运行时数据库，看得见、可追溯
- 一杯饮料不只是一件商品：它带着文化、记忆和情绪。这就是建站的理由
- 页面内置 Giscus 评论区，评论直接落在 GitHub Discussions，访客讨论与内容修订在同一处闭环

核心价值：很多饮料下架、改配方、换包装之后就再也查不到了。这里把它们的样子、故事和数据固定下来，并且对全世界 14 种语言开放。

### 二、站点形式

- 单页应用式百科：全部条目静态导出，加载快、可全文检索式浏览
- 每条饮料一个词条页：外观图 + 简介 + 参数（容量、产地、口味、包装）+ 原料与配方 + 小故事
- 多语言并行：同一词条的多个语言版本并存，按浏览器语言自动切换
- 评论区挂在每个词条底部，无需注册即可参与讨论
- 深浅色界面适配移动端与桌面端

### 三、功能说明

#### 词条浏览

- 已收录 186 个词条，覆盖能量饮料、碳酸饮料、果汁、酸奶饮品、奶茶等品类
- 按品类、产地、语言筛选，词条页之间前后关联阅读
- 图片支持外链与仓库内相对路径两种引用方式

#### 内容组织

- 每种饮料每种语言一份 Markdown，统一放在 `drinks/`，命名格式 `drink-name.locale.md`
- 例如 `CocaCola_Can_330ml.zh.md`、`Aquarius_Bottle_500ml.en.md`
- 只提交自己掌握的语言即可，不要求一次翻译齐全
- `example/` 目录提供词条模板，按模板写即可保证结构与样式一致
- 站点构建时自动读取 front matter 生成列表与索引

#### 工程特性

- Next.js 15 + React 19 + Tailwind CSS 4，`gray-matter` 解析词条头部，`remark` 渲染正文
- 纯静态导出：`next build` 产物直接落在 `out/`，任意静态托管都能跑
- 自带 Dockerfile（node 构建 → nginx 托管）与 Cloudflare 部署工作流
- CI 在打包前执行构建 + 起本地服务冒烟测试，确保 `out/index.html` 可用

### 四、安装与下载

作为在线百科，直接访问 <https://beverage.wiki/> 即可，无需安装。

想自己部署或做数据镜像，从 [Releases](https://github.com/Mutantcat-Working-Group/BeverageWiki/releases) 下载 `BeverageWiki-1.0.20260920.tar.gz`（含全部词条与站点源码），解压后用静态服务器托管构建产物即可：

```bash
tar -xzf BeverageWiki-1.0.20260920.tar.gz
cd BeverageWiki-1.0.20260920
npm install && npm run build     # 产物在 out/
```

也可以直接用容器跑：

```bash
docker run -d -p 8080:80 ghcr.io/mutantcat-working-group/beveragewiki:v1.0.20260920
```

版本号格式为 `主版本.次版本.发布日期`。推送 `v` 前缀标签（如 `v1.0.20260920`）后，GitHub Actions 会自动校验构建、产出源码包与镜像并发布 Release，无需手动上传。

### 五、快速上手

1. 打开 beverage.wiki，首页看到最新收录的饮料。
2. 用顶部搜索或按品类浏览，找到你记得的那一款。
3. 进入词条页看包装、配方和故事。
4. 页面底部留言，说说你和这款饮料的记忆。

### 六、工程结构

- `drinks/`：全部词条，`xxx.zh.md` / `xxx.en.md` 等按语言分文件
- `example/`：词条与图片命名模板
- `public/images/`：词条配图
- `app/`、`components/`：Next.js 页面与组件
- `Dockerfile`：静态托管镜像；`.github/workflows/` 下的 `ci.yml`、`deploy.yml`、`release.yml` 分别负责检查、部署与打包
- 多语言 README：`README.zh.md`、`README.ja.md` 等 13 份

### 开源协议

- 项目采用 MIT 协议开源，详见 [LICENSE.txt](LICENSE.txt)。
- 词条内容欢迎引用与转载，请注明来源 beverage.wiki。
