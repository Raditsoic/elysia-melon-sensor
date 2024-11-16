import { prisma } from '../config/database'
import { CreateTemperatureDTO } from '../types'

export class TemperatureService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.temperature.count(),
      prisma.temperature.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: sort
        }
      })
    ])

    return {
      data,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async create(data: CreateTemperatureDTO) {
    return await prisma.temperature.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.temperature.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.temperature.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.temperature.update({
      where: { id },
      data: { value }
    })
  }
}