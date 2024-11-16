import { prisma } from '../config/database'
import { CreateNitrogenDTO } from '../types'

export class NitrogenService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.nitrogen.count(),
      prisma.nitrogen.findMany({
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

  async create(data: CreateNitrogenDTO) {
    return await prisma.nitrogen.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.nitrogen.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.nitrogen.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.nitrogen.update({
      where: { id },
      data: { value }
    })
  }
}