import { IAction } from '../../api'

export class NoAction implements IAction {
  async run (): Promise<void> {
    // Nothing to do

  }

  updateWorldState (): void {
    // Nothing to do
  }
}
