import { PhService } from '../services'
import { PaginationQuery, CreatePhDTO } from '../types'

export class PhController {
  private phService: PhService

  constructor() {
    this.phService = new PhService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.phService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreatePhDTO }) {
    return await this.phService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.phService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.phService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreatePhDTO }) {
    return await this.phService.update(parseInt(id), body.value)
  }
}