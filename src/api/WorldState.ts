import { Bot } from 'mineflayer'
import { Item } from 'prismarine-item'
import deepCopy from '../util/DeepCopy'

export function createWorldState (bot: Bot): IWorldState {
  return new BaseWorldState(bot)
}

export function extendWorldState (parentState: IWorldState): IMutableWorldState {
  return new ChildWorldState(parentState)
}

export interface IWorldState {
  botInventory: () => Item[]
}

export interface IMutableWorldState extends IWorldState{
  setBotInventory: (items: Item[]) => void
}

class BaseWorldState implements IWorldState {
  private readonly bot: Bot

  constructor (bot: Bot) {
    this.bot = bot
  }

  botInventory (): Item[] {
    return this.bot.inventory.items()
  }
}

class ChildWorldState implements IMutableWorldState {
  private _botInventory: Item[]

  constructor (parent: IWorldState) {
    this._botInventory = deepCopy(parent.botInventory())
  }

  botInventory (): Item[] {
    return this._botInventory
  }

  setBotInventory (items: Item[]): void {
    this._botInventory = items
  }
}
