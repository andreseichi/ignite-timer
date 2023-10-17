import { produce } from "immer";

import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CreateNewCycle:
      return produce(state, (draftState) => {
        draftState.cycles.push(action.payload.newCycle);
        draftState.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.InterruptCurrentCycle: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draftState) => {
        draftState.cycles[currentCycleIndex].interruptedDate = new Date();
        draftState.activeCycleId = null;
      });
    }
    case ActionTypes.MarkCurrentCycleAsFinished: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draftState) => {
        draftState.cycles[currentCycleIndex].finishedDate = new Date();
        draftState.activeCycleId = null;
      });
    }
    default:
      return state;
  }
}
