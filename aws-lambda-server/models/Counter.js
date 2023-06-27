const dynamoose = require("dynamoose");

const CounterSchema = new dynamoose.Schema(
  {
    type: {
      type: String,
    },
    seq: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Counter = dynamoose.model("counters", CounterSchema);

// module.exports.counter = { Counter, getNextId };
module.exports = Counter;
