import { addCollection } from '@iconify/vue'
import { icons as lineMdIcons } from '@iconify-json/line-md'
import { icons as epIcons } from '@iconify-json/ep'

export function setupIconify() {
  addCollection(lineMdIcons)
  addCollection(epIcons)
}
