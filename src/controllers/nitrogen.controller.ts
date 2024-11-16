import { NitrogenService } from '../services'
import { PaginationQuery, CreateNitrogenDTO } from '../types'

export class NitrogenController {
  private nitrogenService: NitrogenService

  constructor() {
    this.nitrogenService = new NitrogenService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.nitrogenService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreateNitrogenDTO }) {
    return await this.nitrogenService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.nitrogenService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.nitrogenService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreateNitrogenDTO }) {
    return await this.nitrogenService.update(parseInt(id), body.value)
  }
}