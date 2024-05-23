export type PageInfo<T> = {
  hasNextPage: boolean
  pageNum: number
  pageSize: number
  pages: number
  records: T[]
  total: number
}
