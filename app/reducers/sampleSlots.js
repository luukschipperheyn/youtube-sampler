//@flow
import * as SamplerActions from '../actions/sampler'
import * as YoutubeActions from '../actions/youtube'
import {combineReducers} from 'redux'


type State = {
  [key: string]: {
    id: string,
    start: number,
    hotKey?: string,
    youtube: {
      id?: string,
      query: string,
      results: Array<Object>,
      downloading: boolean,
      downloaded: boolean,
      progress: number,
      path?: ?string,
    }
  }
}
const hotKeys = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v']
const initialSampleSlotState = hotKeys.reduce((acc, hotKey, i) => {
  return Object.assign(acc, {
    [i.toString()]: {
      id: i.toString(),
      start: 0,
      duration: 1,
      hotKey,
      youtube: {
        query: '',
        results: [],
        downloading: false,
        downloaded: false,
        progress: 0
      }
    }
  })
}, {})

export const sampleSlots : (State, any) => State = (state = initialSampleSlotState, action ) => {
  const previousSampleState = state[action.sampleSlotId]
  switch (action.type) {
    case SamplerActions.ADD_SAMPLE_SLOT:
      return Object.assign({}, state, {
        [action.id]: {
          id: action.id,
          start: 0,
          duration: 1,
          youtube: {
            query: '',
            results: [],
            downloading: false,
            downloaded: false,
            progress: 0
          }
        }
      })
    case SamplerActions.SET_SAMPLE_START:
      return Object.assign({}, state, {
        [action.sampleSlotId]: Object.assign({}, previousSampleState, {
          start: action.start
        })
      })
    case SamplerActions.SET_SAMPLE_DURATION:
      return Object.assign({}, state, {
        [action.sampleSlotId]: Object.assign({}, previousSampleState, {
          duration: action.duration
        })
      })
    case YoutubeActions.YOUTUBE_ITEM_SELECTED: {
      let newYoutubeState = Object.assign({}, previousSampleState.youtube, {
        id: action.itemId,
        query: action.query,
        downloading: true,
        downloaded: false,
        progress: 0
      })
      return Object.assign({}, state, {
        [action.sampleSlotId]: Object.assign({}, previousSampleState, {
          youtube: newYoutubeState
        })
      })
    }
    case YoutubeActions.YOUTUBE_SEARCH_RESPONSE: {
      let newYoutubeState = Object.assign({}, previousSampleState.youtube, {
        results: action.items
      })
      return Object.assign({}, state, {
        [action.sampleSlotId]: Object.assign({}, previousSampleState, {
          youtube: newYoutubeState
        })
      })
    }
    case YoutubeActions.YOUTUBE_ITEM_DOWNLOADED: {
      let newYoutubeState = Object.assign({}, previousSampleState.youtube, {
        downloaded: true,
        downloading: false,
        path: action.path
      })
      return Object.assign({}, state, {
        [action.sampleSlotId]: Object.assign({}, previousSampleState, {
          youtube: newYoutubeState
        })
      })
    }
    case YoutubeActions.YOUTUBE_ITEM_DOWNLOAD_PROGRESS: {
      let newYoutubeState = Object.assign({}, previousSampleState.youtube, {
        progress: parseFloat(action.progress)
      })
      return Object.assign({}, state, {
        [action.sampleSlotId]: Object.assign({}, previousSampleState, {
          youtube: newYoutubeState
        })
      })
    }
    default:
      return state
  }
}

export const selectedSampleSlot = (state: string | null = null, action: Object) => {
  switch(action.type) {
    case SamplerActions.SAMPLE_SELECTED:
      return action.sampleSlotId
    default:
      return state
  }
}
