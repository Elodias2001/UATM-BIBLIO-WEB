import type { HttpContext } from '@adonisjs/core/http'
import Memory from '#models/memory'
import { createMemoryValidator, updateMemoryValidator } from '#validators/memory'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
// import { DateTime } from 'luxon'

export default class MemoryController {
  public async index({ view }: HttpContext) {
    const memories = await Memory.query().orderBy('createdAt', 'desc')
    console.log('memories', memories)

    return view.render('pages/admin/memoires/index', { memories })
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/admin/memoires/create')
  }

  public async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(createMemoryValidator)

    try {
      console.log('Données reçues:', data)
      console.log('Fichier reçu:', data.file)

      // Gérer l'upload du fichier
      let filePath = null
      let originalFilename = null
      let fileSize = null

      if (data.file) {
        const file = data.file
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'memories')

        // Créer le dossier s'il n'existe pas
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true })
        }

        // Générer un nom unique pour le fichier
        const fileExtension = file.extname || '.pdf'
        const fileName = `${randomUUID()}${fileExtension}`
        const fullPath = join(uploadDir, fileName)
        console.log('fullPath', fullPath)
        console.log('fileName', fileName)
        console.log('fileExtension', fileExtension)

        // Sauvegarder le fichier
        console.log('Tentative de sauvegarde du fichier...')
        await file.move(uploadDir, { name: fileName })
        console.log('Fichier sauvegardé avec succès')

        filePath = `/uploads/memories/${fileName}`
        originalFilename = file.clientName
        fileSize = file.size
        console.log('filePath final:', filePath)
        console.log('originalFilename:', originalFilename)
        console.log('fileSize:', fileSize)
      }

      // Créer le mémoire avec les informations du fichier
      await Memory.create({
        title: data.title,
        authors: data.authors,
        year: data.year,
        filiere: data.filiere,
        keywords: data.keywords,
        abstract: data.abstract,
        filePath,
        originalFilename,
        fileSize,
        // createdAt: DateTime.now(),
        // updatedAt: DateTime.now(),
      })

      session.flash('success', 'Mémoire créé avec succès!')
      return response.redirect().toRoute('admin.memories.index')
    } catch (error) {
      console.error('Erreur création mémoire:', error)
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
      // Gérer l'upload du fichier si un nouveau fichier est fourni
      if (data.file) {
        const file = data.file
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'memories')

        // Créer le dossier s'il n'existe pas
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true })
        }

        // Générer un nom unique pour le fichier
        const fileExtension = file.extname || '.pdf'
        const fileName = `${randomUUID()}${fileExtension}`

        // Sauvegarder le nouveau fichier
        await file.move(uploadDir, { name: fileName })

        // Mettre à jour les informations du fichier
        memory.filePath = `/uploads/memories/${fileName}`
        memory.originalFilename = file.clientName
        memory.fileSize = file.size
      }

      // Mettre à jour les autres champs
      memory.merge({
        title: data.title,
        authors: data.authors,
        year: data.year,
        filiere: data.filiere,
        keywords: data.keywords,
        abstract: data.abstract,
        // updatedAt: DateTime.now(),
      })

      await memory.save()
      session.flash('success', 'Mémoire mis à jour avec succès!')
      return response.redirect().toRoute('admin.memories.show', { id: memory.id })
    } catch (error) {
      console.error('Erreur mise à jour mémoire:', error)
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
