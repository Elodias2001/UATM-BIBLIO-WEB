import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Memory extends BaseModel {
  public static table = 'memories'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare authors: string | null

  @column()
  declare year: number | null

  @column()
  declare filiere: string | null

  @column()
  declare keywords: string | null

  @column()
  declare abstract: string | null

  @column({ columnName: 'file_path' })
  declare filePath: string | null

  @column({ columnName: 'original_filename' })
  declare originalFilename: string | null

  @column({ columnName: 'file_size' })
  declare fileSize: number | null

  @column.date({ autoCreate: true })
  declare createdAt: DateTime

  @column.date({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
