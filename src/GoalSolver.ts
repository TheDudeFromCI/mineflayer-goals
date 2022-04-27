import { Bot } from 'mineflayer'
import { ActionResult, ActionState, createWorldState, extendWorldState, IAction, IGoal, IGoalHandler, IWorldState } from './api'
import { NO_ACTION } from './Goals'

interface ActionEstimate {
  action: IAction
  totalCost: number
  worldState: IWorldState
}

function analyzeWorldState (handlers: IGoalHandler[], worldState: IWorldState, goal: IGoal, handler: IGoalHandler, earlyCutoff: number): ActionEstimate | null {
  const subgoals = handler.getRequirements(worldState, goal)

  let childAction: IAction | undefined
  let totalCost = 0

  for (const subgoal of subgoals) {
    const bestAction = getBestAction(handlers, worldState, subgoal, earlyCutoff)
    if (bestAction == null) return null

    if (childAction == null) childAction = bestAction.action
    totalCost += bestAction.totalCost
    worldState = bestAction.worldState
  }

  const estimate = handler.createEstimate(worldState, goal)
  if (estimate == null) return null

  const mutWorldState = extendWorldState(worldState)
  estimate.action.updateWorldState(mutWorldState)
  totalCost += estimate.cost

  if (totalCost >= earlyCutoff) return null
  return { action: childAction ?? estimate.action, totalCost, worldState: mutWorldState }
}

function getBestAction (handlers: IGoalHandler[], worldState: IWorldState, goal: IGoal, earlyCutoff: number): ActionEstimate | undefined {
  let best: ActionEstimate | undefined

  for (const handler of handlers) {
    if (handler.goalName() !== goal.getGoalName()) continue

    const estimate = analyzeWorldState(handlers, worldState, goal, handler, best?.totalCost ?? earlyCutoff)
    if (estimate == null) continue
    if (estimate.totalCost < (best?.totalCost ?? earlyCutoff)) best = estimate
  }

  return best
}

export class GoalSolver {
  private readonly goalHandlers: IGoalHandler[] = []
  private readonly bot: Bot

  constructor (bot: Bot) {
    this.bot = bot
  }

  registerHandler (handler: IGoalHandler): void {
    this.goalHandlers.push(handler)
  }

  findBestAction (goal: IGoal): ActionResult {
    const worldState = createWorldState(this.bot)
    const action = getBestAction(this.goalHandlers, worldState, goal, Number.POSITIVE_INFINITY)

    if (action == null) return new ActionResult(NO_ACTION, 0, ActionState.GOAL_UNREACHABLE)
    else return new ActionResult(action.action, action.totalCost, ActionState.GOAL_REACHABLE)
  }
}
