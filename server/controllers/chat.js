import Chat from "../models/Chat.js";
export const createChat = async (req, res) => {
  const { firstId, seconId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, seconId] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new Chat({
      members: [firstId, seconId],
    });
    const response = await newChat.save()
    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findUserChat = async (req,res) => {
    const userId = req.params.id
    try {
        const chats = await Chat.find({
            members:{$in:[userId]}
        })
        res.status(200).json(chats)
    } catch (error) {
        return res.status(500).json(error)
    }
};
export const findChat = async (req,res) => {
    const {firstId,seconId} = req.params
    try {
        const chat = await Chat.find({
            members: { $all: [firstId, seconId] },
        })
        res.status(200).json(chat)
    } catch (error) {
        return res.status(500).json(error)
    }
};
