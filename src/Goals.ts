import { Bot } from 'mineflayer'
import { ActionResult } from './api/ActionResult'
import { NoAction } from './impl/actions/NoAction'
import { IGoal } from './api/IGoal'
import { GoalSolver } from './GoalSolver'
import { IGoalHandler } from './api'

export const NO_ACTION = new NoAction()

export class Goals {
  private readonly goalSolver: GoalSolver

  constructor (bot: Bot) {
    this.goalSolver = new GoalSolver(bot)
  }

  registerGoalHandler (handler: IGoalHandler): void {
    this.goalSolver.registerHandler(handler)
  }

  calculateNextAction (goal: IGoal): ActionResult {
    return this.goalSolver.findBestAction(goal)
  }
}
