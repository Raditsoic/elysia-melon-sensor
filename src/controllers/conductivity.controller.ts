import { ConductivityService } from '../services'
import { PaginationQuery, CreateConductivityDTO } from '../types'

export class ConductivityController {
  private conductivityService: ConductivityService

  constructor() {
    this.conductivityService = new ConductivityService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.conductivityService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreateConductivityDTO }) {
    return await this.conductivityService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.conductivityService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.conductivityService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreateConductivityDTO }) {
    return await this.conductivityService.update(parseInt(id), body.value)
  }
}