const db = require('../../data/db-config.js');
module.exports = {
    add,
    find,
    findById,
    findTasksProject
}

function findTasksProject() {
    return db('tasks')
        .join('projects', 'projects.id', 'tasks.id')
        .select('projects.name as project_name', 'tasks.description as task_description', 'projects.description as project_description')
}

function findById(id) {
    return db('tasks').where({id}).first();
}

function find() {
    return db('tasks')
}

function add(task) {
    return db('tasks')
        .insert(task, 'id')
        .then(id => {
            return findById(id);
        });
};