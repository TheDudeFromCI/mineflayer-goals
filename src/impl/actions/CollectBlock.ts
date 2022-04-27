import { IAction, IMutableWorldState, IWorldState } from '../../api'

export class CollectBlock implements IAction {
  updateWorldState (worldState: IMutableWorldState): void {
  }

  getCost (worldState: IWorldState): number {
    return 0
  }

  canPerform (worldState: IWorldState): boolean {
    return true
  }
}
