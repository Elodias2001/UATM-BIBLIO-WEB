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

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      // table.timestamp('created_at').notNullable()
      // table.timestamp('updated_at').nullable()
      // table.timestamp('created_at')
      // table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
