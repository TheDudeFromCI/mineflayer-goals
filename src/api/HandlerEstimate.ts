import { IAction } from '.'

export interface HandlerEstimate {
  /**
   * The action that is being executed by the handler.
   */
  action: IAction

  /**
   * The estimated cost for executing the provided action.
   */
  cost: number
}
