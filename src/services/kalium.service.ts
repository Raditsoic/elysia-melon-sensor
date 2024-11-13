import { prisma } from '../config/database'
import { CreateKaliumDTO } from '../types/kalium'

export class KaliumService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.kalium.count(),
      prisma.kalium.findMany({
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

  async create(data: CreateKaliumDTO) {
    return await prisma.kalium.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.kalium.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.kalium.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.kalium.update({
      where: { id },
      data: { value }
    })
  }
}