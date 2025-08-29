import type { HttpContext } from '@adonisjs/core/http'
import Memory from '#models/memory'
import Database from '@adonisjs/lucid/services/db'

export default class SearchController {
  public async index({ request, view }: HttpContext) {
    const q = (request.input('q') || '').toString().trim()
    const filiere = (request.input('filiere') || '').toString().trim()

    if (!q && !filiere) {
      return view.render('pages/search', { results: [], q, filiere })
    }

    // Basic keyword search across title, authors, keywords, abstract.
    // For Oracle XE via Lucid/Knex, use ILIKE/LIKE depending on driver; use LOWER for case-insensitive.
    const knex = Database.connection().knexQuery()
    const query = knex.from(Memory.table).select('*')

    const terms = q ? q.split(/\s+/).filter(Boolean) : []
    if (terms.length > 0) {
      query.where(function () {
        for (const term of terms) {
          const like = `%${term}%`
          this.orWhereRaw('LOWER(title) LIKE LOWER(?)', [like])
            .orWhereRaw('LOWER(authors) LIKE LOWER(?)', [like])
            .orWhereRaw('LOWER(keywords) LIKE LOWER(?)', [like])
            .orWhereRaw('LOWER(abstract) LIKE LOWER(?)', [like])
        }
      })
    }

    if (filiere) {
      query.andWhereRaw('LOWER(filiere) = LOWER(?)', [filiere])
    }

    const results = await query.limit(50)
    return view.render('pages/search', { results, q, filiere })
  }
}
