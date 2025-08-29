import type { HttpContext } from '@adonisjs/core/http'
import Memory from '#models/memory'
import Database from '@adonisjs/lucid/services/db'

export default class SearchController {
  public async index({ request, view }: HttpContext) {
    const q = (request.input('q') || '').toString().trim()
    const filiere = (request.input('filiere') || '').toString().trim()

    const results = await this.performSearch(q, filiere)

    // Return JSON for AJAX requests, or render view for regular requests
    if (request.header('X-Requested-With') === 'XMLHttpRequest') {
      return { results, q, filiere }
    }

    return view.render('pages/search', { results, q, filiere })
  }

  private async performSearch(q: string, filiere: string) {
    if (!q && !filiere) {
      return []
    }

    const knex = Database.connection().knexQuery()
    const query = knex.from(Memory.table).select('*')

    // Recherche par mots-clés
    const terms = q ? q.split(/\s+/).filter(Boolean) : []
    if (terms.length > 0) {
      query.where(function () {
        for (const term of terms) {
          const like = `%${term}%`
          this.orWhereRaw('LOWER(??) LIKE LOWER(?)', ['title', like])
            .orWhereRaw('LOWER(??) LIKE LOWER(?)', ['authors', like])
            .orWhereRaw('LOWER(??) LIKE LOWER(?)', ['keywords', like])
            .orWhereRaw('LOWER(??) LIKE LOWER(?)', ['abstract', like]) // ✅ échappé avec ??
        }
      })
    }

    // Filtrage par filière
    if (filiere) {
      query.andWhereRaw('LOWER(??) = LOWER(?)', ['filiere', filiere])
    }

    return await query.limit(50)
  }
}
