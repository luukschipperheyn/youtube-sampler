//@flow

let nextSampleSlotId = 12
export const ADD_SAMPLE_SLOT = 'ADD_SAMPLE_SLOT'
export const addSampleSlot = () => {
  return {
    type: ADD_SAMPLE_SLOT,
    id: (nextSampleSlotId++).toString()
  }
}

export const SET_SAMPLE_START = 'SET_SAMPLE_START'
export const setSampleStart = (id: string | number, start: number) => {
  return {
    type: SET_SAMPLE_START,
    sampleSlotId: id.toString(),
    start
  }
}

export const SET_SAMPLE_DURATION = 'SET_SAMPLE_DURATION'
export const setSampleDuration = (id: string | number, duration: number) => {
  return {
    type: SET_SAMPLE_DURATION,
    sampleSlotId: id.toString(),
    duration
  }
}

export const SAMPLE_SELECTED = 'SAMPLE_SELECTED'
export const sampleSelected = (id: string | number) => {
  return {
    type: SAMPLE_SELECTED,
    sampleSlotId: id.toString()
  }
}
