import { prisma } from '../config/database'
import { CreatePhosporDTO } from '../types'

export class PhosporService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.phospor.count(),
      prisma.phospor.findMany({
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

  async create(data: CreatePhosporDTO) {
    return await prisma.phospor.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.phospor.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.phospor.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.phospor.update({
      where: { id },
      data: { value }
    })
  }
}