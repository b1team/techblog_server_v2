import db from "../../models/index.js";

export function getTag(req, res) {
    db.tags.findAll({
        where: {
            slug: req.params.slug
        },
        include: [{
            model: db.posts,
            as: "posts",
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(dbPost => {
            if (dbPost) {
                res.status(200).send(dbPost);
            } else {
                res.status(404).send({
                    message: "Post not found"
                });
            }
        })
        .catch(err => res.status(422).json(err));
}



// get number of posts for each tag
export function getAllTagsCount(req, res) {
    db.tags.findAll({
        group: ["tags.id"],
        includeIgnoreAttributes: false,
        include: [{
            model: db.posts,
        }],
        attributes: [
            "id",
            "name",
            "slug",
            [db.sequelize.fn("COUNT", db.sequelize.col("posts.id")), "count"]
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(dbPost => res.status(200).send(dbPost))
        .catch(err => res.status(422).json(err));
}