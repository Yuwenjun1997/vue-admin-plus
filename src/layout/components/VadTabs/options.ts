import { CommandEnums } from '@/layout/types'

interface CommandSource {
  command: CommandEnums
  name: string
  icon?: string
}

export const commandList: CommandSource[] = [
  {
    command: CommandEnums.refresh,
    name: '刷新',
    icon: 'line-md:backup-restore',
  },
  {
    command: CommandEnums.closeOther,
    name: '关闭其他',
    icon: 'line-md:close',
  },
  {
    command: CommandEnums.closeLeft,
    name: '关闭左侧',
    icon: 'line-md:arrow-small-left',
  },
  {
    command: CommandEnums.closeRight,
    name: '关闭右侧',
    icon: 'line-md:arrow-small-right',
  },
  {
    command: CommandEnums.closeAll,
    name: '关闭全部',
    icon: 'line-md:close',
  },
]
