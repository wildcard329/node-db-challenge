const db = require('../../data/db-config.js')
module.exports = {
    find, 
    findById,
    add,
    update,
    remove,
    findTasks
}

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects').where({id}).first();
}

function add(project) {
    return db('projects')
    .insert(project, 'id')
    .then(id => {
        return findById(id);
    })
}

function update(changes, id) {
    return db('projects')
        .where({id})
        .update(changes)
}

function remove(id) {
    return db('projects as p')
        .join('tasks as t', 'p.id', 't.id')
        .select('p.name', 't.description as task', 't.notes')
        .where({'p.id':id})
}

function findTasks(id) {
    return db('projects as p')
        .join('tasks as t', 'p.id', 't.id')
        .select('p.name', 't.description as task', 't.notes')
        .where({'p.id': id})
}