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

  @column()
  declare filePath: string | null

  @column.date({ autoCreate: true })
  declare createdAt: DateTime

  @column.date({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
