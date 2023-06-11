//npm install fastify

//{ logger: true } ใช้เพื่อเปิดใช้งานระบบบันทึกข้อมูลของ Fastify ซึ่งจะทำให้ Fastify บันทึกข้อมูลเกี่ยวกับคำขอและตอบสนองที่เกิดขึ้น เช่น เวลาที่คำขอเข้ามา รหัสสถานะของการตอบสนอง และข้อความข้อผิดพลาด (error messages) ไปยังระบบบันทึกที่กำหนดไว้
const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv").config();

//TEST
// const GET_items = require("./routes/api-test/getItems");
// const POST_items = require("./routes/api-test/getItems");

//

// const items = require("./items");

const options = {
  host: process.env.HOST,
  port: process.env.PORT,
};

// Declare a basic route
// fastify.get("/", async (request, reply) => {
//   //การแสดงในหน้า web
//   // return { hello: "world" };

//   reply.send("hello world");
// });

// fastify.get("/items", async (request, reply) => {
//   reply.send(items);
// });

//การใช้งานกับไฟล์แยก
//fastify.register(async (fastify, opts) => {}) ใช้สำหรับลงทะเบียนเส้นทางหรือโมดูลในแอปพลิเคชัน Fastify ของคุณ โดยการใช้ fastify.register() คุณสามารถเพิ่มเส้นทางหรือโมดูลจากไฟล์แยกเข้าไปใน Fastify ได้เพื่อจัดการกับการเรียกใช้เส้นทางและการดำเนินการ

//fastify ใช้ในการลงทะเบียนเส้นทางหรือปลั๊กอินใน Fastify โดยเราใช้ fastify เพื่อเพิ่มเส้นทางหรือปลั๊กอินใน Fastify instance ที่กำลังทำงานอยู่
//opts เกี่ยวข้องกับตัวลงทะเบียน ซึ่งใช้ในการส่งค่าอื่นๆ ที่จำเป็นสำหรับการลงทะเบียน เช่น การกำหนดค่า, การส่งค่า default options ของปลั๊กอิน ฯลฯ

//TEST

//GET ALL ITEMS
//ในเรื่องของ URL, url: "/api/items" ใน getItems และ fastify.get("/api/items", getItems) ต้องเหมือนกัน เพื่อให้การจับคู่เส้นทางที่ถูกลงทะเบียนใน Fastify ใช้งานได้อย่างถูกต้อง
// fastify.register(async (fastify, opts) => {
//   fastify.get("/api/items", GET_items.getItems);
// });

//GET SINGLE ITEM
// fastify.register(async (fastify, opts) => {
//   fastify.get("/api/items/:id", GET_items.getItem);
// });

//POST ITEMS
// fastify.register(async (fastify, opts) => {
//   fastify.post("/api/items", POST_items);
// });

//
//npm i @fastify/swagger เป็นแพ็กเกจที่ใช้สำหรับสร้างเอกสาร API อัตโนมัติในรูปแบบ Swagger สำหรับ Fastify เซิร์ฟเวอร์ของคุณ
// fastify.register(require("@fastify/swagger"), {
//   exposeRoute: true,
//   routePrefix: "/docs",
//   swagger: {
//     info: { title: "fastify-api" },
//   },
// });

fastify.register(require("./routes/items"));

// Run the basic server!
const start = async () => {
  try {
    await fastify.listen(options, () => {
      console.log(`Server listening at ${options.port}`);
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

//process.exit(1) เป็นเมธอดที่ใช้ใน Node.js เพื่อสิ้นสุดการทำงานของโปรแกรมทันที และส่งสถานะออกจากโปรแกรมโดยกำหนดค่าสถานะออกจากโปรแกรมให้เป็น 1 ซึ่งเป็นสถานะผิดพลาด (Error status code) ที่บ่งบอกว่าโปรแกรมมีปัญหาหรือเกิดข้อผิดพลาดในการทำงาน

start();
