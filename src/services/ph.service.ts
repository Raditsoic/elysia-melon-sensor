import { prisma } from '../config/database'
import { CreatePhDTO } from '../types'

export class PhService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.ph.count(),
      prisma.ph.findMany({
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

  async create(data: CreatePhDTO) {
    return await prisma.ph.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.ph.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.ph.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.ph.update({
      where: { id },
      data: { value }
    })
  }
}