import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Create admin user
    await User.create({
      fullName: 'Elodias ADIMOU',
      email: 'nounagnonadimou@gmail.com',
      password: await hash.make('admin123'),
      isAdmin: true,
    })
  }
}
