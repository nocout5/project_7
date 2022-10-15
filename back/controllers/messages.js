const Message = require("../models/Message");
const User = require("../models/User");
const fs = require("fs");

exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.message);
  const message = new Message({
    ...messageObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    userId: req.auth.userId,
  });
  if (req.file) {
    message.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

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
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => res.status(404).json(error));
};
exports.deleteMessage = (req, res, next) => {
  user = User.findOne({ _id: req.auth.userId }).then((user) => {
    const user_role = user.role;
    Message.findOne({ _id: req.params.id })
      .then((message) => {
        if (message.userId != req.auth.userId && user_role != "admin") {
          res.status(401).json({ message: "Not authorized" });
        } else {
          if (message.imageUrl) {
            const filename = message.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              Message.deleteOne({ _id: req.params.id })
                .then((infos) => {
                  res.status(200).json(req.params.id);
                })
                .catch((error) => res.status(401).json({ error }));
            });
          } else {
            Message.deleteOne({ _id: req.params.id })
              .then((infos) => {
                res.status(200).json(req.params.id);
              })
              .catch((error) => res.status(401).json({ error }));
          }
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};

exports.likesMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => {
      let indexLike = message.usersLiked.indexOf(req.auth.userId);
      let indexDislike = message.usersDisliked.indexOf(req.auth.userId);
      if (req.body.like == 1 && indexDislike == -1 && indexLike == -1) {
        message.likes++;
        message.usersLiked.push(req.auth.userId);
      }
      if (req.body.like == -1 && indexDislike == -1 && indexLike == -1) {
        message.dislikes++;
        message.usersDisliked.push(req.auth.userId);
      }
      if (req.body.like == 0) {
        if (indexLike != -1) {
          message.likes--;
          message.usersLiked.splice(indexLike, 1);
        }
        if (indexDislike != -1) {
          message.dislikes--;
          message.usersDisliked.splice(indexDislike, 1);
        }
      }
      message
        .save()
        .then((infos) => {
          res.status(201).json({ infos });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
