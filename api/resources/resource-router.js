const express = require('express');

const Resources = require('./resource-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.find()
        .then(resources => {
            res.json(resources);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Resources.findById(id)
        .then(resource => {
            if (resource) {
                res.json(resource)
            } else {
                res.status(404).json({message: 'resource not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

router.post('/', (req, res) => {
    const resourceData = req.body;

    Resources.add(resourceData)
        .then(resource => {
            res.status(201).json(resource);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

router.put('/id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Resources.findById(id)
        .then(resource => {
            if (resource) {
                Resources.update(changes, id)
                    .then(updatedResource => {
                        res.json(updatedResource);
                    })
            } else {
                res.status(404).json({message: 'resource not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Resources.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({removed: deleted});
            } else {
                res.status(404).json({message: 'resource not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

module.exports = router;