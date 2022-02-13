import db from "../../models/index.js";

export function addComment(req, res) {
    db.comments.create({
        content: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(comment => {
            res.status(201).send({
                comment: comment.content,
                user_id: comment.user_id,
                post_id: comment.post_id,
                message: "Comment created successfully",
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
 
// get all comments for a post by id
export function getComments(req, res) {
    db.comments.findAll({
        where: {
            post_id: req.params.post_id
        },
        include: [{
            model: db.users,
            attributes: ["username", "email"]
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(comments => {
            res.status(200).send(comments);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
