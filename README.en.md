<div align="center">
<img src="https://s2.loli.net/2025/10/04/lMf9pqYnQD3kt7T.png" style="width:100px;" width="100"/>
<h1>BeverageWiki</h1>
</div>

## 1. Project Overview

- 🍹 **[beverage.wiki](https://beverage.wiki/) is an open beverage encyclopedia** documenting the history, recipes, packaging, and culture of drinks from around the world.
	- From sodas to juices, from energy drinks to regional specialties, we aim to build a community-driven knowledge base that preserves fading beverage memories. Every bottle tells a story.
- 📖 **All content is written in Markdown and hosted on GitHub; anyone can contribute.**
	- Share your favorite drinks, the soda from your childhood, or a rare/retired beverage. We welcome contributions from everyone—professional research and personal experiences alike.
- 🌐 **beverage.wiki is built as a static site using edge computing technologies** for speed, security, and sustainability.
	- We explore Cloudflare Pages, Vercel Edge Functions, and more to deploy efficiently, while preparing for ads to support long-term maintenance.
- 🧃 **Why does this project exist?** Beverages are not just products—they carry culture, memory, and emotion.
	- We hope beverage.wiki becomes a digital museum of drinks where people can browse, comment, share, and connect through taste memories and life stories.
- 🛠 **Open source.** We welcome Forks, Stars, PRs, suggestions, and discussions.
	- We believe in collaboration and in the value of preserving beverage culture. Your contribution may become the missing link in someone’s search for the flavor of their youth.

## 2. How to Contribute

### 🧃 Contribute a Drink Entry (Pull Request Guide)

We welcome you to add or extend drink entries for beverage.wiki! Everyone is encouraged to participate and help document beverage culture.

#### ✅ Step 1: Check for Existing Entries

Before submitting a new entry, visit the website or browse the `/drinks` folder to confirm the drink isn’t already present. You can search by name or scan the directory.

#### 📄 Step 2: Prepare Your Entry

- Place each entry under the `/drinks` folder; file names in English are recommended (e.g., `coca-cola.md`).
- Use `example/example.md` as a template.
- Fields like name, origin, year, description, etc. are flexible—omit what you don’t need.
- You can also update existing entries (e.g., add history, image links, etc.).

#### 🔧 Step 3: Submit a Pull Request

1. Fork this repo to your GitHub account.
2. Create a new branch in your fork (e.g., `add-pepsi-blue`).
3. Add or modify Markdown files under the `/drinks` folder.
4. Commit and push your changes to your branch.
5. Open a Pull Request with a clear title and description; then wait for review and merge.

We appreciate all types of contributions—adding new drinks, fixing typos, enriching content, or improving formatting. Every submission helps preserve beverage culture.

### 🖼 Adding Images

Entries support images to illustrate packaging, color, and branding. You can choose either method below:

#### ✅ Option 1: Link an Image on the Web

```text
https://example.com/images/coca-cola-can.jpg
```

Please make sure the image source is legal and stable, and credit appropriately if needed.

#### ✅ Option 2: Upload to the Repository

Place image files under `/public/images` and reference them via a relative path:

```text
/images/CocaCola_Can_330ml_pour.jpg
```

> ⚠️ Make sure file names don’t conflict with existing images. A good naming pattern is brand + spec + action, for example: `Pepsi_Blue_Bottle_500ml_front.jpg`, `Sprite_Can_330ml_open.jpg`.

## 3. Languages

- 🇨🇳 [Chinese README](README.md)
- 🇺🇸 [English README](README.en.md)

