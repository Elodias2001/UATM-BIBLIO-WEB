import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    // Create admin user using query builder to avoid date format issues
    await db.table('users').insert({
      full_name: 'Elodias ADIMOU',
      email: 'nounagnonadimou@gmail.com',
      password: await hash.make('admin123'),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}
