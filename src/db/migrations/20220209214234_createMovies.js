exports.up = function (knex) {
    return knex.schema.createTable("movies", (table) => {
      table.increments("movie_id").primary()
      table.text("title")
      table.integer("runtime_in_minutes")
      table.text("rating")
      table.text("description")
      table.text("image_url")
      table.timestamps(true, true)
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTable("movies")
  }
