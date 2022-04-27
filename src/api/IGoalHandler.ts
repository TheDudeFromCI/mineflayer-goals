import { HandlerEstimate } from '.'
import { IGoal } from './IGoal'
import { IWorldState } from './WorldState'

/**
 * This interface can be used as a factory for generating new action instances
 * in order to complete goals.
 */
export interface IGoalHandler {

  /**
   * Gets the name of the goal type that this handler can be used to solve.
   */
  goalName: () => string

  /**
   * Gets a list of goals that need to be satisfied in order for this handler
   * to be valid. All goals within this array, if any, must be solved before
   * the main goal may be continued with this handler.
   *
   * @param worldState - The estimated world state before subgoals are
   *                     considered.
   * @param mainGoal - The main goal that is trying to be solved.
   *
   * @returns A list of goals that must be completed, in order, for this handler
   *          to execute it's action.
   */
  getRequirements: (worldState: IWorldState, mainGoal: IGoal) => IGoal[]

  /**
   * Creates an estimated available action that can be performed in order to
   * complete the provided goal for the given world state.
   *
   * @param worldState - The estimated world state for when this action is
   *                     executed.
   * @param goal - The goal to try and complete.
   */
  createEstimate: (worldState: IWorldState, goal: IGoal) => HandlerEstimate | undefined
}
