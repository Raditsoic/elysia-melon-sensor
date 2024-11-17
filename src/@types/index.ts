export * from "./nitrogen"
export * from "./kalium"
export * from "./phospor"
export * from "./ph"
export * from "./moisture"
export * from "./temperature"
export * from "./conductivity"

export interface PaginationQuery {
    page?: number
    limit?: number
    sort?: 'asc' | 'desc'
  }