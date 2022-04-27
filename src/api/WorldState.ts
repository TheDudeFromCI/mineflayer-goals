import { Bot } from 'mineflayer'
import { Item } from 'prismarine-item'
import { IAction } from './IAction'

export function createWorldState (bot: Bot): IWorldState {
  return new BaseWorldState(bot)
}

export function extendWorldState (parentState: IWorldState): IMutableWorldState {
  return new ChildWorldState(parentState)
}

export interface IWorldState {
  botInventory: () => Item[]
  actionsPreformed: () => IAction[]
}

export interface IMutableWorldState extends IWorldState{
  setBotInventory: (items: Item[]) => void
  appendAction: (action: IAction) => void
}

class BaseWorldState implements IWorldState {
  private readonly bot: Bot

  constructor (bot: Bot) {
    this.bot = bot
  }

  botInventory (): Item[] {
    return this.bot.inventory.items()
  }

  actionsPreformed (): IAction[] {
    return []
  }
}

class ChildWorldState implements IMutableWorldState {
  private readonly parent: IWorldState
  private _botInventory?: Item[]
  private readonly _actionsPreformed: IAction[] = []

  constructor (parent: IWorldState) {
    this.parent = parent
  }

  setBotInventory (items: Item[]): void {
    this._botInventory = items
  }

  botInventory (): Item[] {
    if (this._botInventory != null) return this._botInventory
    else return this.parent.botInventory()
  }

  appendAction (action: IAction): void {
    this._actionsPreformed.push(action)
  }

  actionsPreformed (): IAction[] {
    return [...this.parent.actionsPreformed(), ...this._actionsPreformed]
  }
}
