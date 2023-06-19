const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv").config();
const options = {
  host: process.env.HOST,
  port: process.env.PORT,
};

fastify.register(require("./routes/itemsDB"));

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

start();
