import db from "../../models/index.js";
const Op = db.Sequelize.Op;
export function searchPost(req, res) {
    db.posts.findAll({
        where: {
            title: {
                [Op.like]: "%" + req.query.q + "%"
            },
        },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(posts => {
        res.send(posts);
    });
}