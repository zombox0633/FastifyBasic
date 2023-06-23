const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getItems = async () => {
  const items = await prisma.item.findMany();
  return items;
};

const getAllItems = async (request, reply) => {
  try {
    // เรียกใช้งาน Prisma Client เพื่อดึงข้อมูล Items จากฐานข้อมูล (Items ต้องเป็นตัวพิมเล็ก)
    // const items = await prisma.item.findMany();
    const items = await getItems();
    if (items && items.length > 0) {
      reply.send(items);
    } else {
      reply.status(404).send("Product not found");
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

const getItem = async (request, reply) => {
  try {
    const items = await getItems();
    const id = parseInt(request.params.id);
    const found = items.find((item) => item.id === id);

    if (found) {
      reply.send(found);
    } else {
      reply.status(404).send({ massage: `Item id ${id} not found` });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

const addItem = async (request, reply) => {
  try {
    const items = await getItems();
    const newItem = {
      name: request.body.name,
      quantity: parseInt(request.body.quantity),
    };

    const checkDuplicateName = items.some((item) => item.name === newItem.name);
    const isValidQuantity = !isNaN(newItem.quantity);

    if (checkDuplicateName || !newItem.name || !isValidQuantity) {
      return reply.status(400).send("Invalid item data");
    }

    const createItem = await prisma.item.create({
      data: {
        name: newItem.name,
        quantity: newItem.quantity,
      },
    });

    reply.code(201).send(createItem);
  } catch (error) {
    reply.status(500).send(error);
  }
};

const deleteItem = async (request, reply) => {
  try {
    const id = parseInt(request.params.id);

    const deletedItem = await prisma.item.delete({
      where: {
        id: id,
      },
    });

    if (deletedItem) {
      const updatedItems = await prisma.item.findMany();
      reply.send(updatedItems);
    } else {
      reply.status(404).send({ message: `Item ${id} not found` });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

const updateItem = async (request, reply) => {
  try {
    const id = parseInt(request.params.id);
    //ในการค้นหาข้อมูลรายการสินค้าที่มี id ตรงกับค่าที่กำหนดในตัวแปร id ที่ส่งมาในคำขอ (request params)
    const foundItem = await prisma.item.findUnique({
      where: {
        id: id,
      },
    });

    if (foundItem) {
      const updateValues = request.body;
      const newName = updateValues.name ? updateValues.name : foundItem.name;
      const newQuantity = updateValues.quantity
        ? parseInt(updateValues.quantity)
        : foundItem.quantity;

      const updatedItem = await prisma.item.update({
        where: {
          id: id,
        },
        data: {
          name: newName,
          quantity: newQuantity,
        },
      });

      const updatedItems = await prisma.item.findMany(); // ดึงข้อมูลรายการสินค้าใหม่
      reply.send(updatedItems); // ส่งข้อมูลรายการสินค้าทั้งหมดที่อัปเดตแล้วกลับไป
    } else {
      reply.status(404).send({ message: `Item ${id} not found` });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = {
  getAllItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
};
