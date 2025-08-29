import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    try {
      // Create admin user with minimal data
      const user = await User.create({
        fullName: 'Elodias ADIMOU',
        email: 'admin@uatm-gasa.com',
        password: await hash.make('admin123'),
        isAdmin: true,
      })

      console.log('Admin user created successfully:', user.id)
    } catch (error) {
      console.error('Error creating admin user:', error.message)
      throw error
    }
  }
}
