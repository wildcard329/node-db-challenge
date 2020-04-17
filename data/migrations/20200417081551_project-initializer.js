
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name', 255)
                .notNullable()
                .unique();
            tbl.string('description', 255);
            tbl.boolean('completed', false)
                .notNullable();
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name', 255)
                .notNullable();
            tbl.string('description')
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('description', 255)
                .notNullable();
            tbl.string('notes', 255);
            tbl.string('completed', false)
                .notNullable();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
        })
        .createTable('project_resources', tbl => {
            tbl.increments();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources');
        })
  )
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
