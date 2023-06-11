const uuid = require("uuid");

//CREATE ITEMS
const items = require("../../items");

const createItems = {
  method: "POST",
  url: "/api/items",
  handler: async (request, reply) => {
    try {
      const newItem = {
        id: uuidv4(),
        name: request.body.name,
        quantity: parseInt(request.body.quantity),
      };

      const checkDuplicateName = items.some(
        (item) => item.name === newItem.name
      );
      // ตรวจสอบว่าปริมาณสินค้าเป็นตัวเลข
      const isValidQuantity = !isNaN(newItem.quantity);

      if (checkDuplicateName || !newItem.name || !isValidQuantity) {
        return reply.status(400).send("Invalid item data");
      }

      // items.push(newItem);
      items = [...items, newItem];
      reply.code(201).send(newItem);
    } catch (error) {
      console.log(error);
      reply.status(500).send("Server error");
    }
  },
};

module.exports = createItems;
