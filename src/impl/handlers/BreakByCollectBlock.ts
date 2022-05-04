import { Bot } from 'mineflayer'
import { HandlerEstimate, IGoal, IGoalHandler, IWorldState } from '../../api'
import { CollectBlockAction } from '../actions'
import { BreakBlockGoal } from '../goals'

export class BreakByCollectBlock implements IGoalHandler {
  readonly bot: Bot

  constructor (bot: Bot) {
    this.bot = bot
  }

  goalName (): string {
    return 'goals:break_block'
  }

  getRequirements (): IGoal[] {
    return []
  }

  createEstimate (_worldState: IWorldState, goal: IGoal): HandlerEstimate | undefined {
    const breakBlockGoal = goal as BreakBlockGoal
    return { action: new CollectBlockAction(this.bot, breakBlockGoal.block), cost: 10 }
  }
}
