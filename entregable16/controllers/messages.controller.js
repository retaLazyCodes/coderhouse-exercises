const { messageService } = require("../services/index")

const getAllMessages = async (req, res) => {
  try {
    let messages = await messageService.getMessages();
    res.send({ status: "success", payload: messages })
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error })
  }
}
const saveMessage = async (req, res) => {
  try {
    const { nombre, apellido, email, text, edad, alias, avatar } = req.body;
    if (!nombre || !apellido || !email || !text || !edad || !alias || !avatar) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const newMessage =
    {
      author: {
        email,
        nombre,
        apellido,
        edad,
        alias,
        avatar,
      },
      text,
      date: new Date().toLocaleString()
    }
    const result = await messageService.saveMessage(newMessage);
    res.send({ status: "success", message: "Message added", payload: result });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error })
  }
}

module.exports = {
  getAllMessages,
  saveMessage
}