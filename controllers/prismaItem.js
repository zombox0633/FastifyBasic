const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllItems = async (request, reply) => {
  try {
    // เรียกใช้งาน Prisma Client เพื่อดึงข้อมูล items จากฐานข้อมูล
    const items = await prisma.item.findMany()
    if (items && items.length > 0) {
      reply.send(items);
    } else {
      reply.status(404).send("Product not found");
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = {
  getAllItems,
};
