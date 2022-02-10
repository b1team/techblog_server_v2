const db = require("../models");

exports.searchPost = (req, res) => {
    db.posts.findAll({
        where: {
            title: {
                [Op.like]: "%" + req.body.search + "%"
            }
        }
    }).then(posts => {
        res.send(posts);
    });
}