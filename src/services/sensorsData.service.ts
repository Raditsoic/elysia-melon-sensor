import { SensorData } from '@prisma/client'
import { prisma } from '../config/database'
import { CreateSensorDataDTO, GetSensorDataDTO } from '../@types'

export class SensorDataService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.sensorData.count(),
      prisma.sensorData.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: sort
        }
      })
    ])

    // Transform to DTO
    const dtoData = data.map(this.toDTO)

    return {
      data: dtoData,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async create(data: CreateSensorDataDTO): Promise<GetSensorDataDTO> {
    const created = await prisma.sensorData.create({
      data
    })
    return this.toDTO(created)
  }

  async getById(id: number): Promise<GetSensorDataDTO | null> {
    const data = await prisma.sensorData.findUnique({
      where: { id }
    })
    return data ? this.toDTO(data) : null
  }

  async delete(id: number): Promise<GetSensorDataDTO> {
    const deleted = await prisma.sensorData.delete({
      where: { id }
    })
    return this.toDTO(deleted)
  }

  async update(id: number, data: CreateSensorDataDTO): Promise<GetSensorDataDTO> {
    const updated = await prisma.sensorData.update({
      where: { id },
      data
    })
    return this.toDTO(updated)
  }

  private toDTO(data: SensorData): GetSensorDataDTO {
    return {
      id: data.id,
      nitrogen: data.nitrogen,
      phospor: data.phospor,
      kalium: data.kalium,
      ph: data.ph,
      temperature: data.temperature,
      moisture: data.moisture,
      conductivity: data.conductivity,
      createdAt: data.createdAt
    }
  }
}