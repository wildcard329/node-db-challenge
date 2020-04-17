const db = require('../../data/db-config.js')
module.exports = {
    find, 
    findById,
    add,
    update,
    remove,
    findProjectTasks
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
    return db('projects')
        .where({id})
        .del();
}

function findProjectTasks(id) {
    return db('projects')
        .join('tasks', 'projects.id', 'tasks.id')
        .select('projects.name as project_name', 'tasks.description as task_description', 'tasks.notes as task_notes')
        .where({'projects.id': id})
}