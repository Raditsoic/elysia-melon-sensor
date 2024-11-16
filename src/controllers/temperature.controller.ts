import { TemperatureService } from '../services'
import { PaginationQuery, CreateTemperatureDTO } from '../types'

export class TemperatureController {
  private temperatureService: TemperatureService

  constructor() {
    this.temperatureService = new TemperatureService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.temperatureService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreateTemperatureDTO }) {
    return await this.temperatureService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.temperatureService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.temperatureService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreateTemperatureDTO }) {
    return await this.temperatureService.update(parseInt(id), body.value)
  }
}