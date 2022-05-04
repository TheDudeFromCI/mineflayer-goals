import { Item } from 'prismarine-item'
import { IMutableWorldState } from '../api'

export abstract class AbstractAction {
  addItemToBotInventory (worldState: IMutableWorldState, item: Item): void {
    const inv = worldState.botInventory()

    let count = item.count
    for (const element of inv) {
      if (Item.equal(element, item, false) && element.count < item.stackSize) {
        const shift = Math.min(count, item.stackSize - element.count)
        element.count += shift
        count -= shift
        if (count === 0) break
      }
    }
  }
}
