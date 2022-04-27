import { IAction } from './IAction'

export enum ActionState {
  GOAL_REACHABLE,
  GOAL_TOO_FAR,
  GOAL_UNREACHABLE
}

export class ActionResult {
  readonly bestAction: IAction
  readonly cost: number
  readonly state: ActionState

  constructor (bestAction: IAction, cost: number, state: ActionState) {
    this.bestAction = bestAction
    this.cost = cost
    this.state = state
  }
}
