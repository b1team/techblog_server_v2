import db from '../../models/index.js';
export function allAccess(req, res) {
    res.status(200).send("Public Content.");
}

export function userBoard(req, res) {
    res.status(200).send("User Content.");
}

export function adminBoard(req, res) {
    res.status(200).send("Admin Content.");
}

export function moderatorBoard(req, res) {
    res.status(200).send("Moderator Content.");
}

export function updateProfile(req, res) {
    db.users.findOne({
        where: {
            id: req.body.id
        }
        }).then(user => {
            if (user) {
                user.update({
                    name: req.body.name,
                    username: req.body.username,
                    phone_number: req.body.phone_number
                }).then(updatedUser => {
                        res.status(200).send({
                            name: updatedUser.name,
                            username: updatedUser.username,
                            phone_number: updatedUser.phone_number,
                            message: 'User updated successfully'
                        });
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
}