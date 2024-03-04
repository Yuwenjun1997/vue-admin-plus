export enum Command {
  refresh = 'refresh',
  closeOther = 'closeOther',
  closeLeft = 'closeLeft',
  closeRight = 'closeRight',
  closeAll = 'closeAll',
}

interface CommandSource {
  command: Command
  name: string
  icon?: string
}

export const commandList: CommandSource[] = [
  {
    command: Command.refresh,
    name: '刷新',
    icon: 'line-md:backup-restore',
  },
  {
    command: Command.closeOther,
    name: '关闭其他',
    icon: 'line-md:close',
  },
  {
    command: Command.closeLeft,
    name: '关闭左侧',
    icon: 'line-md:arrow-small-left',
  },
  {
    command: Command.closeRight,
    name: '关闭右侧',
    icon: 'line-md:arrow-small-right',
  },
  {
    command: Command.closeAll,
    name: '关闭全部',
    icon: 'line-md:close',
  },
]
