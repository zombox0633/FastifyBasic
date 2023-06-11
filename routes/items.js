const {
  getItem,
  getAllItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/items");
//Options for get all items
//การใช้ getItemsOpts เป็นอาร์กิวเมนต์ใน fastify.get() ช่วยให้ Fastify สามารถตรวจสอบว่าการตอบกลับจากเส้นทางนี้มีโครงสร้างที่ถูกต้องตามที่กำหนดไว้หรือไม่ และให้การตอบกลับที่เป็นอาร์เรย์ของออบเจ็กต์ที่มีคุณสมบัติ

//ITEM SCHEMA
const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    quantity: { type: "integer" },
  },
};

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
      404: {
        type: "string",
      },
    },
  },
  handler: getAllItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
    404: {
      type: "string",
    },
  },
  handler: getItem,
};

//additionalProperties: false เพื่อป้องกันคุณสมบัติอื่นที่ไม่ได้ระบุในสกีม่า
const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "quantity"],
      properties: {
        name: { type: "string" },
        quantity: { type: "integer" },
      },
      additionalProperties: false,
    },
    response: {
      201: Item,
      400: {
        type: "string",
      },
    },
  },
  handler: addItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteItem,
};

const updateItemOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        quantity: { type: "integer" },
      },
      additionalProperties: false,
    },
    response: {
      200: {
        type: "array",
        items: Item,
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: updateItem,
};

function ItemRoutes(fastify, options, done) {
  //GET ITEMS
  //ปกติแบบการแยกโดยใช้ routes
  // fastify.get("/api/items", getItemsOpts, async (request, reply) => {
  //   try {
  //     if (items && items.length > 0) {
  //       reply.send(items);
  //     } else {
  //       reply.status(404).send("Product not found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     reply.status(500).send("Server error");
  //   }
  // });

  //แบบ handler
  fastify.get("/api/items", getItemsOpts);

  //GET SINGLE ITEM
  //ปกติแบบการแยกโดยใช้ routes
  // fastify.get("/api/items/:id", getItemOpts, async (request, reply) => {
  //   try {
  //     const id = parseInt(request.params.id);
  //     const found = items.find((item) => item.id === id);
  //     if (found) {
  //       reply.send(found);
  //     } else {
  //       reply.status(404).send("Product not found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     reply.status(500).send("Server error");
  //   }
  // });

  //แบบ handler
  fastify.get("/api/items/:id", getItemOpts);

  //ADD ITEMS
  // fastify.post("/api/items", async (request, reply) => {
  //   try {
  //     const newItem = {
  //       id: uuidv4(),
  //       name: request.body.name,
  //       quantity: parseInt(request.body.quantity),
  //     };

  //     const checkDuplicateName = items.some((item) => item.name === newItem.name);
  //     // ตรวจสอบว่าปริมาณสินค้าเป็นตัวเลข
  //     const isValidQuantity = !isNaN(newItem.quantity);

  //     if (checkDuplicateName || !newItem.name || !isValidQuantity) {
  //       return reply.status(400).send("Invalid item data");
  //     }

  //     // items.push(newItem);
  //     items = [...items, newItem];
  //     reply.code(201).send(newItem);
  //   } catch (error) {
  //     console.log(error);
  //     reply.status(500).send("Server error");
  //   }
  // };

  //แบบ handler
  fastify.post("/api/items", postItemOpts);

  //DELETE ITEMS
  fastify.delete("/api/items/:id", deleteItemOpts);

  // Update item
  fastify.put("/api/items/:id", updateItemOpts);

  done();
}

module.exports = ItemRoutes;
