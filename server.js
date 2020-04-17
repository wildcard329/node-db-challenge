const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./api/projects/project-router.js');
const resourceRouter = require('./api/resources/resource-router.js');
const taskRouter = require('./api/tasks/task-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

module.exports = server;