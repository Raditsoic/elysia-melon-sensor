import { MoistureService } from '../services'
import { PaginationQuery, CreateMoistureDTO } from '../types'

export class MoistureController {
  private moistureService: MoistureService

  constructor() {
    this.moistureService = new MoistureService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.moistureService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreateMoistureDTO }) {
    return await this.moistureService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.moistureService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.moistureService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreateMoistureDTO }) {
    return await this.moistureService.update(parseInt(id), body.value)
  }
}