export class UserListQuery {
  pageNum: number = 1
  pageSize: number = 20
  email?: string
  mobile?: string
  nickname?: string
  username?: string
}

export type UserRole = {
  id: number
  name: string
}

export type UserDetail = {
  id: number
  username: string
  avatar: string
  createDate: string
  email: string
  mobile: string
  nickname: string
  roles: UserRole[]
  updateDate: string
}
