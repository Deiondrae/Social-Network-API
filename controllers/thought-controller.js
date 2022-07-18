const { User, Thought } = require("../models");

const ThoughtController = {
    // get all Thoguhts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this id"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create new Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId },
                    {$push: {thoughts: _id} },
                    {new: true}
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No pizza found with this id!"})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    //update Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({_id: params.id }, body, {new: true})
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought with this Id!"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.Id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this id!"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body} },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No Thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: {reactionId: params.reactionId}} },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;