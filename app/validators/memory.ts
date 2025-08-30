import vine from '@vinejs/vine'

export const createMemoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    authors: vine.string().trim().optional(),
    year: vine
      .number()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .optional(),
    filiere: vine.string().trim().optional(),
    keywords: vine.string().trim().optional(),
    abstract: vine.string().trim().optional(),
    file: vine.file().optional(),
  })
)

export const updateMemoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    authors: vine.string().trim().optional(),
    year: vine
      .number()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .optional(),
    filiere: vine.string().trim().optional(),
    keywords: vine.string().trim().optional(),
    abstract: vine.string().trim().optional(),
    file: vine.file().optional(),
  })
)
