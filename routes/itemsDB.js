const {
  getAllItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/prismaItem");

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
      type: "object",
      properties: {
        message: { type: "string" },
      },
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
  handler: deleteItem,
};

//nullable ในการกำหนดคุณสมบัติของสกีมาแปลว่าค่าที่ระบุสามารถเป็น null ได้หรือไม่
const updateItemOpts = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string", nullable: true },
        quantity: { type: "integer", nullable: true },
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

function ItemDBRoutes(fastify, options, done) {
  fastify.get("/api/items", getItemsOpts);

  fastify.get("/api/items/:id", getItemOpts);

  fastify.post("/api/items", postItemOpts);

  fastify.delete("/api/items/:id", deleteItemOpts);

  fastify.put("/api/items/:id", updateItemOpts);

  done();
}

module.exports = ItemDBRoutes;
