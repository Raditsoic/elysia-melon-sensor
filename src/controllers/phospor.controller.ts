import { PhosporService } from '../services/phospor.service'
import { CreatePhosporDTO } from '../types/phospor'
import { PaginationQuery } from '../types'

export class PhosporController {
  private phosporService: PhosporService

  constructor() {
    this.phosporService = new PhosporService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.phosporService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreatePhosporDTO }) {
    return await this.phosporService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.phosporService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.phosporService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreatePhosporDTO }) {
    return await this.phosporService.update(parseInt(id), body.value)
  }
}