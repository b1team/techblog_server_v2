import db from "../../models/index.js";

export function getTag(req, res) {
    db.tags.findAll({
        where: {
            slug: req.params.slug
        },
        include: [{
            model: db.posts,
            attributes: ["title", "thumbnail", "brief", "createdAt"],
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(dbPost => res.status(200).send(dbPost))
        .catch(err => res.status(422).json(err));
}