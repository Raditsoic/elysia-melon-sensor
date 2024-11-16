import { prisma } from '../config/database'
import { CreateConductivityDTO } from '../types'

export class ConductivityService {
  async getAll(page: number = 1, limit: number = 20, sort: 'asc' | 'desc' = 'asc') {
    const skip = (page - 1) * limit
    
    const [total, data] = await Promise.all([
      prisma.conductivity.count(),
      prisma.conductivity.findMany({
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

  async create(data: CreateConductivityDTO) {
    return await prisma.conductivity.create({
      data: {
        value: data.value
      }
    })
  }

  async getById(id: number) {
    return await prisma.conductivity.findUnique({
      where: { id }
    })
  }

  async delete(id: number) {
    return await prisma.conductivity.delete({
      where: { id }
    })
  }

  async update(id: number, value: number) {
    return await prisma.conductivity.update({
      where: { id },
      data: { value }
    })
  }
}