import type { HttpContext } from '@adonisjs/core/http'
import Memory from '#models/memory'
import { createMemoryValidator, updateMemoryValidator } from '#validators/memory'

export default class MemoryController {
  public async index({ view }: HttpContext) {
    const memories = await Memory.query().orderBy('createdAt', 'desc')

    return view.render('pages/admin/memoires/index', { memories })
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/admin/memoires/create')
  }

  public async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(createMemoryValidator)

    try {
      await Memory.create(data)
      session.flash('success', 'Mémoire créé avec succès!')
      return response.redirect().toRoute('admin.memories.index')
    } catch (error) {
      session.flash('error', 'Erreur lors de la création du mémoire')
      return response.redirect().back()
    }
  }

  public async show({ params, view }: HttpContext) {
    const memory = await Memory.findOrFail(params.id)
    return view.render('pages/admin/memoires/show', { memory })
  }

  public async edit({ params, view }: HttpContext) {
    const memory = await Memory.findOrFail(params.id)
    return view.render('pages/admin/memoires/edit', { memory })
  }

  public async update({ params, request, response, session }: HttpContext) {
    const memory = await Memory.findOrFail(params.id)
    const data = await request.validateUsing(updateMemoryValidator)

    try {
      memory.merge(data)
      await memory.save()
      session.flash('success', 'Mémoire mis à jour avec succès!')
      return response.redirect().toRoute('admin.memories.show', { id: memory.id })
    } catch (error) {
      session.flash('error', 'Erreur lors de la mise à jour du mémoire')
      return response.redirect().back()
    }
  }

  public async destroy({ params, response, session }: HttpContext) {
    try {
      const memory = await Memory.findOrFail(params.id)
      await memory.delete()
      session.flash('success', 'Mémoire supprimé avec succès!')
      return response.redirect().toRoute('admin.memories.index')
    } catch (error) {
      session.flash('error', 'Erreur lors de la suppression du mémoire')
      return response.redirect().back()
    }
  }
}
