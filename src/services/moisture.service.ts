import { prisma } from '../config/database'
import { CreateMoistureDTO } from '../types'

export class MoistureService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.moisture.count(),
      prisma.moisture.findMany({
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

  async create(data: CreateMoistureDTO) {
    return await prisma.moisture.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.moisture.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.moisture.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.moisture.update({
      where: { id },
      data: { value }
    })
  }
}