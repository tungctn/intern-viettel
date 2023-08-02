const Message = require("../models/Message");

const MessageController = {
  getMessages: async (req, res) => {
    try {
      const message = new Message();
      const messages = await message.getMessagesByRoom(req.params.room);
      return res.json({ success: true, messages: messages });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  createMessage: async (req, res) => {
    try {
      const message = new Message();
      const response = await message.createMessage({
        message: req.body.message,
        senderId: req.userId,
        room: req.params.room,
      });
      if (response) {
        return res.json({ success: true, message: "Message sent" });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = MessageController;
