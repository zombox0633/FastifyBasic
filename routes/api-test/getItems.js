
//ในเรื่องของ URL, url: "/api/items" ใน getItems และ fastify.get("/api/items", getItems) ต้องเหมือนกัน เพื่อให้การจับคู่เส้นทางที่ถูกลงทะเบียนใน Fastify ใช้งานได้อย่างถูกต้อง
const items = require("../../items");

//GET ITEMS
const getItems = {
  method: "GET",
  url: "/api/items",
  handler: async (request, reply) => {
    try {
      //items && items.length > 0 ใส่สองแบบเพื่อป้องก้อน items ในเงื่อนไข มีค่าและมีความยาวมากกว่าศูนย์ (คือไม่ว่างเปล่า) ก่อนที่จะส่งข้อมูลกลับด้วย reply.send() หาก items เป็น null, undefined หรืออาเรย์ที่ว่างเปล่า
      if (items && items.length > 0) {
        reply.send(items);
      } else {
        reply.status(404).send("Product not found");
      }
    } catch (error) {
      console.log(error);
      reply.status(500).send("Server error");
    }
  },
};

//GET SINGLE ITEM
const getItem = {
  method: "GET",
  url: "/api/items/:id",
  handler: async (request, reply) => {
    try {
      const id = request.params.id;
      const found = items.filter((item) => item.id === parseInt(id));
      if (found) {
        reply.send(found);
      } else {
        reply.status(404).send("Product not found");
      }
    } catch (error) {
      console.log(error);
      reply.status(500).send("Server error");
    }
  },
};

module.exports = { getItems, getItem };
