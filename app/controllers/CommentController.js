const db = require("../models");

exports.addComment = (req, res) => {
    db.comments.create({
        comment: req.body.comment,
        userId: req.body.userId,
        postId: req.body.postId
    })
        .then(comment => {
            res.send(comment);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getComments = (req, res) => {
    db.comments.findAll({
        where: {
            postId: req.params.postId
        }
    })
        .then(comments => {
            res.send(comments);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}