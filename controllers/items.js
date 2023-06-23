const { v4: uuidv4 } = require("uuid");

let items = require("../items");

const getAllItems = async (request, reply) => {
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
};

const getItem = async (request, reply) => {
  try {
    const id = parseInt(request.params.id);
    const found = items.find((item) => item.id === id);
    if (found) {
      reply.send(found);
    } else {
      reply.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    reply.status(500).send("Server error");
  }
};

const addItem = async (request, reply) => {
  try {
    const newItem = {
      id: uuidv4(),
      name: request.body.name,
      quantity: parseInt(request.body.quantity),
    };

    const checkDuplicateName = items.some((item) => item.name === newItem.name);
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
};

const deleteItem = async (request, reply) => {
  try {
    const id = parseInt(request.params.id);
    const found = items.find((item) => item.id === id);

    if (found) {
      items = items.filter((item) => item.id !== id);

      reply.send({ message: `Item ${id} has been removed` });
    } else {
      reply.status(404).send({ message: `Item ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    reply.status(500).send("Server error");
  }
};

const updateItem = async (request, reply) => {
  try {
    const id = parseInt(request.params.id);
    const found = items.find((item) => item.id === id);

    const UpdateItems = request.body;

    if (found) {
      items.forEach((item) => {
        if (item.id === id) {
          item.name = UpdateItems.name ? UpdateItems.name : item.name;
          item.quantity = UpdateItems.quantity ? parseInt(UpdateItems.quantity) : item.quantity;
        }
      });

      reply.send(items);
    } else {
      reply.status(404).send({ message: `Item ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    reply.status(500).send("Server error");
  }
};


module.exports = {
  getAllItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
};

//find() ใช้สำหรับค้นหาข้อมูลเพียงรายการเดียวในอาร์เรย์ที่ตรงกับเงื่อนไขที่กำหนด ฟังก์ชันจะคืนค่าเฉพาะรายการแรกที่พบที่ตรงกับเงื่อนไข หากไม่พบรายการที่ตรงกับเงื่อนไขเลย จะคืนค่า undefined
//filter() ใช้สำหรับค้นหาและคืนค่ารายการทั้งหมดในอาร์เรย์ที่ตรงกับเงื่อนไขที่กำหนด ฟังก์ชันจะคืนค่าเป็นอาร์เรย์ที่มีรายการทั้งหมดที่ตรงกับเงื่อนไข หากไม่พบรายการที่ตรงกับเงื่อนไขเลย จะคืนค่าอาร์เรย์ว่างเปล่า ([]).

// ใช้ reply.code() เพื่อกำหนดรหัสสถานะโดยตรง
// reply.code(200).send({ message: 'OK' });
// ใช้ reply.status() เพื่อกำหนดรหัสสถานะและข้อความของสถานะ
// reply.status(404).send({ message: 'Not Found' });

// findIndex() คืนค่าดัชนี (index) ของรายการที่พบครั้งแรกที่ตรงเงื่อนไขที่กำหนด หากไม่พบรายการที่ตรงเงื่อนไข จะคืนค่า -1
// find() คืนค่ารายการแรกที่พบที่ตรงเงื่อนไขที่กำหนด หากไม่พบรายการที่ตรงเงื่อนไข จะคืนค่า undefined
