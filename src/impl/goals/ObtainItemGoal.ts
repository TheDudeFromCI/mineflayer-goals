import { IGoal } from '../../api'

export class ObtainItemGoal implements IGoal {
  getGoalName (): string {
    return 'goals:obtain_item'
  }
}
