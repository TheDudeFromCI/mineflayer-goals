import { Block } from 'prismarine-block'
import { IGoal } from '../../api'

export class BreakBlockGoal implements IGoal {
  readonly block: Block

  constructor (block: Block) {
    this.block = block
  }

  getGoalName (): string {
    return 'goals:break_block'
  }
}
