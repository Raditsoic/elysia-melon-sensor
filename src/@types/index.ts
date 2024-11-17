export * from './sensorData'

export interface PaginationQuery {
    page?: number
    limit?: number
    sort?: 'asc' | 'desc'
  }