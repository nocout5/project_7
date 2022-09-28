const Message = require("../models/Message");

exports.createMessage = (req, res, next) => {
  const messageObject = req.body;
  const message = new Message({
    ...messageObject,
    userId: req.auth.userId,
  });

  message
    .save()
    .then((infos) => {
      res.status(201).json({ infos });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllMessages = (req, res, next) => {
  Message.find()
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(404).json(error));
};
exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => {
      if (message.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Message.deleteOne({ _id: req.params.id })
          .then((infos) => {
            res.status(200).json(req.params.id);
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
