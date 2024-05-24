export type MenuPermission = {
  id: number
  name: string
  identifier: string
}

export enum MenuType {
  LINK = 'LINK',
  ROUTER = 'ROUTER',
}

export type MenuItem = {
  id: number
  parentId: number
  title: string
  name: string
  path: string
  component: string
  jumpType: MenuType
  link: string
  icon: string
  permission: MenuPermission
  redirect: string
  hidden: number
  createDate: string
}

export type MenuItemTree = MenuItem & {
  children: MenuItemTree[]
}

export class MenuEditForm {
  id?: number
  parentId?: number
  title: string = ''
  name: string = ''
  path: string = ''
  component: string = ''
  jumpType: MenuType = MenuType.ROUTER
  link: string = ''
  icon: string = ''
  redirect: string = ''
  hidden: number = 0
  permissionId?: number
}

export class MenuListQuery {
  pageNum: number = 1
  pageSize: number = 20
  jumpType?: MenuType
  name: string = ''
  parentIds: number[] = []
  title: string = ''
}
