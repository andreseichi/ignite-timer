import { Cycle } from "./reducer";

export enum ActionTypes {
  CreateNewCycle = "CREATE_NEW_CYCLE",
  InterruptCurrentCycle = "INTERRUPT_CURRENT_CYCLE",
  MarkCurrentCycleAsFinished = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CreateNewCycle,
    payload: {
      newCycle,
    },
  };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MarkCurrentCycleAsFinished,
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.InterruptCurrentCycle,
  };
}
