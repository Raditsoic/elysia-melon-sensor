import { SensorDataService } from '../services'
import { PaginationQuery, CreateSensorDataDTO } from '../@types'

export class SensorDataController {
  private sensorDataService: SensorDataService 

  constructor() {
    this.sensorDataService = new SensorDataService()
  }

  async getAll({ query }: { query: PaginationQuery }) {
    const { page = 1, limit = 20, sort = 'asc' } = query
    return await this.sensorDataService.getAll(page, limit, sort)
  }

  async create({ body }: { body: CreateSensorDataDTO }) {
    return await this.sensorDataService.create(body)
  }

  async getById({ params: { id } }: { params: { id: string } }) {
    return await this.sensorDataService.getById(parseInt(id))
  }

  async delete({ params: { id } }: { params: { id: string } }) {
    return await this.sensorDataService.delete(parseInt(id))
  }

  async update({ params: { id }, body }: { params: { id: string }, body: CreateSensorDataDTO }) {
    return await this.sensorDataService.update(parseInt(id), body)
  }
}