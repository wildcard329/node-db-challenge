const db = require('../../data/db-config.js');
module.exports = {
    add,
    findById
}

function findById(id) {
    return db('tasks').where({id}).first();
}

function add(task) {
    return db('tasks')
        .insert(task, 'id')
        .then(id => {
            return findById(id);
        });
};