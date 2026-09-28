# CHINA RE:FORM — Contemporary Chinese Upcycled Furniture

> **Concept:** เปลี่ยนพลาสติก PP เหลือใช้จากโรงงานอุตสาหกรรม ให้กลายเป็นเก้าอี้จีนร่วมสมัยที่มีเอกลักษณ์เฉพาะตัว (Chinese Contemporary + Sustainable Circular Craftsmanship)

---

## 🌐 ลิงก์เว็บไซต์สำหรับเข้าชม (Live Demo)

เว็บไซต์นี้เปิดให้เข้าชมและใช้งานได้แล้วผ่าน Cloud Run:
* **Live Web App:** [https://ais-pre-famt3zbf3w23iw67lhpq2b-160618871584.asia-southeast1.run.app](https://ais-pre-famt3zbf3w23iw67lhpq2b-160618871584.asia-southeast1.run.app)
* **Development Preview:** [https://ais-dev-famt3zbf3w23iw67lhpq2b-160618871584.asia-southeast1.run.app](https://ais-dev-famt3zbf3w23iw67lhpq2b-160618871584.asia-southeast1.run.app)

---

## 🚀 วิธีอัพโหลดโปรเจคนี้ขึ้น GitHub (How to Upload to GitHub)

### ขั้นตอนที่ 1: สร้าง Repository ใหม่บน GitHub
1. เข้าไปที่ [GitHub](https://github.com) แล้วลงชื่อเข้าใช้
2. คลิกปุ่ม **New repository** (หรือเครื่องหมาย `+` มุมขวาบน)
3. ตั้งชื่อ Repository เช่น `china-reform` หรือ `china-reform-furniture`
4. เลือกเป็น **Public**
5. **ไม่ต้อง** ติ๊กช่อง Add a README file หรือ .gitignore
6. คลิก **Create repository**

### ขั้นตอนที่ 2: ดึง/นำโค้ดไป Push ขึ้น GitHub

#### กรณีที่ 1: ทำผ่านเครื่องคอมพิวเตอร์ของคุณ (Local Machine)
หากดาวน์โหลดโค้ดโปรเจคมาไว้ที่เครื่อง ให้เปิด Terminal ในโฟลเดอร์โปรเจคแล้วรันคำสั่ง:

```bash
# 1. เริ่มต้น git (หากยังไม่ได้ทำ)
git init
git branch -M main

# 2. เพิ่มไฟล์ทั้งหมดและ Commit
git add .
git commit -m "feat: complete CHINA RE:FORM contemporary upcycled furniture platform"

# 3. เชื่อมโยงกับ GitHub Repository ของคุณ (เปลี่ยน YOUR_USERNAME และ YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 4. Push โค้ดขึ้น GitHub
git push -u origin main
```

---

## 🌍 วิธีเปิดเป็นเว็บไซต์ผ่าน GitHub Pages (Auto-Deploy)

โปรเจคนี้ได้ติดตั้งไฟล์ **GitHub Actions Workflow** ไว้เรียบร้อยแล้วใน `.github/workflows/deploy.yml`

เมื่อคุณ `git push` โค้ดขึ้น GitHub:
1. ไปที่แท็บ **Settings** ของ Repository บน GitHub
2. เมนูด้านซ้ายเลือก **Pages**
3. ภายใต้หัวข้อ **Build and deployment**:
   * ในช่อง **Source** ให้เลือก **GitHub Actions**
4. ระบบจะทำการ Build และเผยแพร่หน้าเว็บให้อัตโนมัติ!
5. เว็บไซต์ของคุณจะเปิดดูได้ที่:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

---

## 🛠️ ฟังก์ชันเด่นของระบบ

### 1. ระบบหน้าบ้าน (Frontend Storefront)
* **Brand Story & Circular Mission**: เล่าเรื่องราวการนำพลาสติก PP 14,820 กก. มาขึ้นรูปใหม่ด้วยเทคนิค Gradient Casting
* **4 Signature Gradient Collections**:
  * 🔴 Vermilion Dawn (Red → Orange)
  * 🔵 Cerulean Porcelain (Blue → White)
  * 🟢 Bamboo Jade (Green → Yellow)
  * ⚫ Imperial Obsidian (Black → Gold)
* **Bespoke Chair Configurator**: ปรับแต่งเฉดสี, เลือกลวดลายจีนนามธรรม (เมฆ, มังกรเรขาคณิต, ไผ่, คลื่น), สีเบาะลินิน และระบบจำลองการสลักชื่อเลเซอร์ลงบนแผ่นทองเหลืองรีไซเคิล
* **Green Loyalty Passport**: 
  * คำนวณคะแนน Green Points จากการซื้อและส่งมอบขยะพลาสติก PP (1 กก. = 50 คะแนน)
  * แคตตาล็อกแลกสิทธิ์ส่วนลดเงินสดและของสะสม Limited Edition
* **Cart, Checkout & Order Tracker**: ตะกร้าสินค้า, สไลเดอร์ใช้แต้มลดเงินสด, จำลอง QR PromptPay และตรวจสอบสถานะคำสั่งซื้อแบบ 6 ขั้นตอน

### 2. ระบบหลังบ้าน (Backend CRM & Operations Portal)
* **Executive Dashboard**: สรุปยอดขาย, ออร์เดอร์, สต็อกต่ำ, กราฟยอดขายรายสัปดาห์
* **Product Management**: เพิ่ม/แก้ไข/ลบ สินค้า, สเปก Gradient และเกณฑ์เตือนสต็อก
* **Stock Management**: บันทึก Stock In (ระบุ Batch การหล่อ), Stock Out และประวัติการเคลื่อนไหว
* **Order Management Pipeline**: อัปเดตสถานะออร์เดอร์ตั้งแต่รับคำสั่งซื้อจนถึงจัดส่งกล่องหมุนเวียน (Reusable Crate)
* **Green Loyalty CRM**: ฐานข้อมูลลูกค้า, ระบบชั่งน้ำหนักเศษพลาสติก PP และเครดิต Green Points ทันที

---

## 💻 Tech Stack
* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS v4
* **Icons & Animation:** Lucide React, Motion
* **Deployment:** Google Cloud Run / GitHub Pages / Vercel
