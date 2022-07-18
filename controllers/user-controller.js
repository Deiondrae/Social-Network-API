const { User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No User found with this id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    //update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id }, body, {new: true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No User with this Id!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json("No user found with this id!");
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },
    removeFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json("No user found with this id!");
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    }
};

module.exports = userController;