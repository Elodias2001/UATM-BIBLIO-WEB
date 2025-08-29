import type { HttpContext } from '@adonisjs/core/http'
import Memory from '#models/memory'

export default class HomeController {
  public async index({ view }: HttpContext) {
    // Fetch the 3 most recent memories for the hero section
    const recentMemories = await Memory.query()
      .orderBy('year', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(3)

    return view.render('pages/home', { recentMemories })
  }
}
