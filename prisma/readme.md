npm install prisma -D เพื่อตัวโปรเจค fastify สามารถเชื่อมต่อข้อมูลกับฝั่ง MySQL Docker Compose
เมื่อติดตั้งเสร็จก็ทำการ สร้างไฟล์ prisma/schema.prisma และทำการกำหนดค่าฐานข้อมูล MySQL Docker Compose

datasource db {
  provider = "mysql"
  url      = "mysql://user:password@localhost:3306/mydatabase"
}

db เป็นชื่อตัวแปรที่กำหนดให้กับ datasource ซึ่งคุณสามารถเปลี่ยนชื่อตัวแปรได้ตามต้องการ
provider ระบุว่าเราใช้ฐานข้อมูลประเภทใด เช่น "mysql" สำหรับ MySQL
url คือ URL หรือข้อมูลการเชื่อมต่อกับฐานข้อมูล MySQL ซึ่งประกอบด้วยชื่อผู้ใช้ (user) รหัสผ่าน (password) ที่ใช้เข้าถึงฐานข้อมูล MySQL ที่ตั้งอยู่ที่ localhost พร้อมกับพอร์ต (3306) และชื่อฐานข้อมูล (mydatabase) ที่ต้องการเชื่อมต่อ

https://www.prisma.io/docs/concepts/components/prisma-schema

ใส่ตามใน link

npx prisma generate


//เป็นเพียงตัวอย่าง
model User {
  id        Int      @id @default(autoincrement()) //@default(autoincrement()) เป็นตัวเลือกเพิ่มเติมที่คุณสามารถใช้เพื่อระบุว่าในกรณีที่ค่า id ไม่ได้ถูกระบุเอง ระบบฐานข้อมูลจะใช้ค่าที่เพิ่มขึ้นโดยอัตโนมัติแทน
  
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER) //เป็นการระบุบว่าใครใช้ผู้ดูจาก enum Role
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  USER
  ADMIN
}