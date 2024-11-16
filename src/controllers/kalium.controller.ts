import { KaliumService } from '../services'
import { PaginationQuery, CreateKaliumDTO } from '../types'

export class KaliumController {
  private kaliumService: KaliumService

  constructor() {
    this.kaliumService = new KaliumService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.kaliumService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreateKaliumDTO }) {
    return await this.kaliumService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.kaliumService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.kaliumService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreateKaliumDTO }) {
    return await this.kaliumService.update(parseInt(id), body.value)
  }
}