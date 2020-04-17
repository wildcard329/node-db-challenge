const express = require('express');

const Tasks = require('./task-model.js');

const router = express.Router();

router.post('/', (req, res) => {
    const taskData = req.body;

    Tasks.add(taskData)
        .then(task => {
            res.status(201).json(task);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

module.exports = router;