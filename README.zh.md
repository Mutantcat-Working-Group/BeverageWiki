<div align="center">
<img src="https://s2.loli.net/2025/10/04/lMf9pqYnQD3kt7T.png" style="width:100px;" width="100"/>
<h1>饮料百科 / BeverageWiki</h1>
</div>

<div align="center">

🇨🇳 **中文** · 🇺🇸 [English](README.md) · 🇯🇵 [日本語](README.ja.md) · 🇰🇷 [한국어](README.ko.md) · 🇫🇷 [Français](README.fr.md) · 🇩🇪 [Deutsch](README.de.md) · 🇪🇸 [Español](README.es.md) · 🇧🇷 [Português](README.pt.md) · 🇷🇺 [Русский](README.ru.md) · 🇸🇦 [العربية](README.ar.md) · 🇮🇳 [हिन्दी](README.hi.md) · 🇹🇭 [ไทย](README.th.md) · 🇻🇳 [Tiếng Việt](README.vi.md)

</div>

### 一、项目简介

- **🍹 [beverage.wiki](https://beverage.wiki/) 是一个开放的饮料百科项目，旨在记录全球饮料的历史、配方、包装与文化。**
  - 从汽水到果汁，从功能饮料到地方特色，我们希望构建一个由社区共同维护的知识库，保存那些正在消失的饮料记忆。
- **📖 所有内容都以 Markdown 编写，托管在 GitHub 上，任何人都可以提交饮料条目。**
- **🧃 因为饮料不仅是商品，它是文化、是记忆、是情感的载体。**
- **🛠 项目完全开源，欢迎你 Fork、Star、提交 PR。**

### 二、贡献方式

#### ✅ 步骤一：先查查有没有

在提交新饮料之前，请先浏览仓库中的 `/drinks` 文件夹，确认该饮料是否已经存在。

#### 📄 步骤二：准备你的条目

- 每个饮料每种语言一个独立的 Markdown 文件，放在 `/drinks` 文件夹下
- 文件命名格式：`饮料名称.语言代码.md`，例如：
  - `CocaCola_Can_330ml.zh.md`（中文版）
  - `CocaCola_Can_330ml.en.md`（英文版）
- 语言代码支持：`zh`、`en`、`ja`、`ko`、`fr`、`de`、`es`、`pt`、`ru`、`ar`、`hi`、`th`、`vi` 等
- 你只需要提交你掌握的语言版本，不需要全部翻译
- 内容格式参考 `/example` 文件夹中的示例文件

#### 🔧 步骤三：提交 Pull Request

1. Fork 本仓库
2. 创建新分支（如 `add-pepsi-blue`）
3. 添加或修改 `/drinks` 中的 Markdown 文件
4. 提交并推送，打开 Pull Request

### 🖼 如何添加饮料图片

#### ✅ 方式一：引用网络图片

```text
https://example.com/images/coca-cola-can.jpg
```

#### ✅ 方式二：上传本地图片到仓库

将图片放入 `/public/images` 文件夹，并使用相对路径引用：

```text
/images/CocaCola_Can_330ml_pour.jpg
```

> ⚠️ 建议使用品牌名 + 规格 + 动作等组合命名方式

