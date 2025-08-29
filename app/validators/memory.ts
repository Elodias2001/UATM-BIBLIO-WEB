import vine from '@vinejs/vine'

export const createMemoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    authors: vine.string().trim().optional(),
    year: vine
      .number()
      .optional()
      .min(1900)
      .max(new Date().getFullYear() + 1),
    filiere: vine.string().trim().optional(),
    keywords: vine.string().trim().optional(),
    abstract: vine.string().trim().optional(),
    filePath: vine.string().trim().optional(),
  })
)

export const updateMemoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    authors: vine.string().trim().optional(),
    year: vine
      .number()
      .optional()
      .min(1900)
      .max(new Date().getFullYear() + 1),
    filiere: vine.string().trim().optional(),
    keywords: vine.string().trim().optional(),
    abstract: vine.string().trim().optional(),
    filePath: vine.string().trim().optional(),
  })
)
