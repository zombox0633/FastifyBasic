const { getAllItems } = require("../controllers/prismaItem");

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

function ItemDBRoutes(fastify, options, done) {
  fastify.get("/api/items", getItemsOpts);

  done();
}

module.exports = ItemDBRoutes;
