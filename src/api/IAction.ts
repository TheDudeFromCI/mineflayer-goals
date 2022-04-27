import { IMutableWorldState } from '../api/WorldState'

export interface IAction {
  updateWorldState: (worldState: IMutableWorldState) => void
}
