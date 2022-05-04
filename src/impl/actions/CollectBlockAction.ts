import { Bot } from 'mineflayer'
import { Block } from 'prismarine-block'
import { Item } from 'prismarine-item'
import { IAction, IMutableWorldState } from '../../api'
import { AbstractAction } from '../../util/AbstractAction'

export class CollectBlockAction extends AbstractAction implements IAction {
  readonly bot: Bot
  readonly itemDrops: Item[]
  readonly block: Block

  constructor (bot: Bot, block: Block, itemDrops: Item[] = []) {
    super()
    this.bot = bot
    this.block = block
    this.itemDrops = itemDrops
  }

  async run (): Promise<void> {
    // @ts-expect-error
    await this.bot.collectBlock.collect(this.block)
  }

  updateWorldState (worldState: IMutableWorldState): void {
    for (const itemDrop of this.itemDrops) {
      this.addItemToBotInventory(worldState, itemDrop)
    }
  }
}
