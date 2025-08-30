import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'memories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable()
      table.string('authors').nullable()
      table.integer('year').nullable()
      table.string('filiere').nullable()
      table.text('keywords').nullable()
      table.text('abstract').nullable()
      table.string('file_path').nullable()
      table.string('original_filename').nullable() // Nom original du fichier
      table.integer('file_size').nullable() // Taille du fichier en bytes

      table.date('created_at').defaultTo(this.now())
      table.date('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
