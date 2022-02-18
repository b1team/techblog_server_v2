import db from "../../models/index.js";
import slugify from 'slugify';

export function createPost(req, res) {
    db.posts.create({
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            content: req.body.content,
            brief: req.body.brief,
            user_id: req.body.user_id,
            slug: `${slugify(req.body.title, {lower: true})}-${Math.floor(Date.now()/1000)}`
        })

        .then(post => {
            if (req.body.tags) {
                var split_tags = req.body.tags.split(",");
                var clean_tags = split_tags.map(item => {return item.replace(" ",'')});
                for (let i = 0; i < split_tags.length; i++) {
                    db.tags.findOne({
                            where: {
                                name: clean_tags[i]
                            }
                        })
                        .then(tag => {
                            if (tag) {
                                post.addTags(tag.id);
                            } else {
                                db.tags.create({
                                        name: clean_tags[i],
                                        slug: `${slugify(clean_tags[i], {lower: true})}-${Math.floor(Date.now()/1000)}`
                                    })
                                    .then(tag => {
                                        post.setTags(tag.id);   
                                    })
                            }
                        })
                }
                res.status(201).send({
                    message: "Post created successfully",
                    user_id: post.user_id,
                    slug: post.slug,
                });
            } else {
                res.status(201).send({
                    message: "Post created successfully",
                    user_id: post.user_id,
                    slug: post.slug,
                });
            }
        })
        .catch(err => {
            res.status(422).json(err);
        });
}
// get a post by slug
export function getPost(req, res) {
    db.posts.findOne({
        where: {
            slug: req.params.slug
        }
    })
        .then(post => {
            if (post) {
                res.status(200).send(post);
            } else {
                res.status(404).send({
                    message: "Post not found"
                });
            }
        })
        .catch(err => {
            res.status(422).json(err);
        });
}

// get a post by id
export function getPostById(req, res) {
    db.posts.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(post => {
            if (post) {
                res.status(200).send(post);
            } else {
                res.status(404).send({
                    message: "Post not found"
                });
            }
        })
        .catch(err => {
            res.status(422).json(err);
        });
}

// get all posts for a user
export function getAllPostsForUser(req, res) {
    db.posts.findAll({
            where: {
                user_id: req.params.user_id
            },
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
// get a post by id and return tags
export function getPostWithTags(req, res) {
    db.posts.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (post) {
                post.getTags()
                    .then(tags => {
                        res.status(200).send({
                            tags: tags.map(tag => tag.name)
                        });
                    })
            } else {
                res.status(404).send({
                    message: "Post not found"
                });
            }
        })
        .catch(err => {
            res.status(422).json(err);
        });
}


// get all posts
export function getAllPosts(req, res) {
    db.posts.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(dbPost => res.status(200).send(dbPost))
        .catch(err => res.status(422).json(err));
}

// update a post by id
export function updatePost(req, res) {
    var datetime = new Date();
    db.posts.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(dbPost => {
            dbPost.update({
                    title: req.body.title,
                    thumbnail: req.body.thumbnail,
                    content: req.body.content,
                    brief: req.body.brief,
                    last_edited_at: datetime,
                    slug: `${slugify(req.body.title, {lower: true})}-${Math.floor(Date.now()/1000)}`
                })
                .then(dbPost => {
                    if (req.body.tags) {
                        var split_tags = req.body.tags.split(",");
                        var clean_tags = split_tags.map(item => {return item.replace(" ",'')});
                        for (let i = 0; i < split_tags.length; i++) {
                            db.tags.findOne({
                                    where: {
                                        name: clean_tags[i]
                                    }
                                })
                                .then(tag => {
                                    if (tag) {
                                        dbPost.addTags(tag.id);
                                    } else {
                                        db.tags.create({
                                                name: clean_tags[i],
                                                slug: `${slugify(clean_tags[i], {lower: true})}-${Math.floor(Date.now()/1000)}`
                                            })
                                            .then(tag => {
                                                dbPost.setTags(tag.id);
                                            })
                                    }
                                })
                        }
                        res.status(200).send({
                            message: "Post updated successfully",
                            user_id: dbPost.user_id,
                            slug: dbPost.slug,
                        });
                    } else {
                        res.status(200).send({
                            message: "Post updated successfully",
                            user_id: dbPost.user_id,
                            slug: dbPost.slug,
                        });
                    }
                })
                .catch(err => {
                    res.status(422).json(err);
                });
        })
        .catch(err => {
            res.status(422).json(err);
        });
}

export function deletePost(req, res) {
    db.comments.findOne({
            where: {
                post_id: req.params.id
            }
        })
        .then(dbComment => {
            if(dbComment) {
                dbComment.destroy()
                .then(dbComment => {
                    db.posts.findOne({
                            where: {
                                id: dbComment.post_id
                            }
                        })
                        .then(dbPost => {
                            dbPost.removeTags()
                            dbPost.destroy()
                            res.status(201).send({
                            slug: dbPost.slug,
                            user_id: dbPost.user_id,
                            message: "Post deleted successfully",
                        })})
                })
            } else {
                db.posts.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(dbPost => {
                    dbPost.removeTags()
                    dbPost.destroy()
                    res.status(201).send({
                    slug: dbPost.slug,
                    user_id: dbPost.user_id,
                    message: "Post deleted successfully",
                })})
            }
        })
        .catch(err => console.log(err));
}

//random posts and limit to 5
export function getRandomPosts(req, res) {
    db.posts.findAll({
            order: db.sequelize.random() , limit: 5
        })
        .then(dbPost => res.status(200).send(dbPost))
        .catch(err => res.status(422).json(err));
}