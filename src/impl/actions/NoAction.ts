import { IAction } from '../../api'

export class NoAction implements IAction {
  canPerform (): boolean {
    return true
  }

  updateWorldState (): void {
    // Nothing to do
  }

  getCost (): number {
    return 0
  }
}
