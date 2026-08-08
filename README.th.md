<div align="center">
<img src="https://s2.loli.net/2025/10/04/lMf9pqYnQD3kt7T.png" style="width:100px;" width="100"/>
<h1>饮料百科 / BeverageWiki</h1>
</div>

<div align="center">

🇨🇳 [中文](README.zh.md) · 🇺🇸 [English](README.md) · 🇯🇵 [日本語](README.ja.md) · 🇰🇷 [한국어](README.ko.md) · 🇫🇷 [Français](README.fr.md) · 🇩🇪 [Deutsch](README.de.md) · 🇪🇸 [Español](README.es.md) · 🇧🇷 [Português](README.pt.md) · 🇷🇺 [Русский](README.ru.md) · 🇸🇦 [العربية](README.ar.md) · 🇮🇳 [हिन्दी](README.hi.md) · 🇹🇭 **ไทย** · 🇻🇳 [Tiếng Việt](README.vi.md)

</div>

### 1. ภาพรวมโครงการ

- **🍹 [beverage.wiki](https://beverage.wiki/) เป็นสารานุกรมเครื่องดื่มแบบเปิด** ที่บันทึกประวัติศาสตร์ สูตร บรรจุภัณฑ์ และวัฒนธรรมของเครื่องดื่มจากทั่วโลก
- **📖 เนื้อหาทั้งหมดเขียนด้วย Markdown และโฮสต์บน GitHub ใครก็มีส่วนร่วมได้**
- **🧃 เครื่องดื่มไม่ใช่แค่สินค้า — มันเป็นสื่อกลางของวัฒนธรรม ความทรงจำ และอารมณ์**
- **🛠 โอเพนซอร์สทั้งหมด ยินดีต้อนรับ Fork, Star, PR, ข้อเสนอแนะ และการอภิปราย**

### 2. วิธีการมีส่วนร่วม

#### ✅ ขั้นตอนที่ 1: ตรวจสอบรายการที่มีอยู่

ก่อนส่ง ให้เรียกดูโฟลเดอร์ `/drinks` เพื่อยืนยันว่าเครื่องดื่มยังไม่มีอยู่

#### 📄 ขั้นตอนที่ 2: เตรียมรายการของคุณ

- เครื่องดื่มแต่ละชนิดมีไฟล์ Markdown หนึ่งไฟล์ต่อภาษาใน `/drinks`
- รูปแบบชื่อไฟล์: `ชื่อเครื่องดื่ม.locale.md` เช่น:
  - `CocaCola_Can_330ml.th.md` (ภาษาไทย)
- รหัส locale ที่รองรับ: `zh`, `en`, `ja`, `ko`, `fr`, `de`, `es`, `pt`, `ru`, `ar`, `hi`, `th`, `vi` ฯลฯ
- ไม่จำเป็นต้องแปลทั้งหมด ส่งเฉพาะภาษาที่คุณรู้
- ดูเทมเพลตในโฟลเดอร์ `/example`

#### 🔧 ขั้นตอนที่ 3: ส่ง Pull Request

1. Fork รีโพซิทอรีนี้
2. สร้างสาขาใหม่ (เช่น `add-pepsi-blue`)
3. เพิ่ม/แก้ไขไฟล์ Markdown ใน `/drinks`
4. commit, push และเปิด PR

### 🖼 การเพิ่มรูปภาพ

#### ✅ ตัวเลือก 1: ลิงก์รูปภาพจากเว็บ

```text
https://example.com/images/coca-cola-can.jpg
```

#### ✅ ตัวเลือก 2: อัปโหลดไปยังรีโพซิทอรี

วางรูปภาพใน `/public/images` และอ้างอิงด้วย path สัมพัทธ์:

```text
/images/CocaCola_Can_330ml_pour.jpg
```

> ⚠️ รูปแบบการตั้งชื่อ: แบรนด์ + สเปก + การกระทำ

