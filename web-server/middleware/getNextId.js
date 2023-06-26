const Counter = require("../models/Counter");

const getNextId = async (modelName) => {
  const counter = await Counter.scan("type").eq(modelName).exec();
  if (counter.length === 0) {
    const newCounter = await Counter.create({
      type: modelName,
      seq: 1,
    });
  } else {
    const updatedCounter = await Counter.update(
      { type: modelName },
      { seq: counter[0].seq + 1 }
    );
    return updatedCounter.seq;
  }
  const result = await Counter.scan("type").eq(modelName).exec();

  return result[0].seq;
};

module.exports = getNextId;
