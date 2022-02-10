const db = require("../models");

exports.addVote = (req, res) => {
    db.votes.create({
        vote: req.body.vote,
        userId: req.body.userId,
        postId: req.body.postId
    })
        .then(vote => {
            res.send(vote);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getVotes = (req, res) => {
    db.votes.findAll({
        where: {
            postId: req.params.postId
        }
    })
        .then(votes => {
            res.send(votes);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}