//@flow
import Youtube from '../utils/youtube'

const youtube = Youtube().getInstance()

export const YOUTUBE_SEARCH_START = 'YOUTUBE_SEARCH_START'
export const startSearch = () => {
  return {
    type: YOUTUBE_SEARCH_REQUEST
  }
}

export const YOUTUBE_SEARCH_RESPONSE = 'YOUTUBE_SEARCH_RESPONSE'
function youtubeResponse(response : any, sampleSlotId) {
  const items = response.items.map(item => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default,
    }
  })
  return {
    type: YOUTUBE_SEARCH_RESPONSE,
    items,
    sampleSlotId
  }
}

export const YOUTUBE_SEARCH_REQUEST = 'YOUTUBE_SEARCH_REQUEST'
export const searchYoutube = function(query : string, sampleSlotId: string) {
  return function (dispatch : (action : Object) => void) {
    dispatch(startSearch())
    youtube.search(query).then(response => {
      dispatch(youtubeResponse(response, sampleSlotId))
    })
  }
}


export const YOUTUBE_ITEM_SELECTED = 'YOUTUBE_ITEM_SELECTED'
export const onSelectYoutubeItem = (itemId : string, sampleSlotId: string, query : string) => {
  return (dispatch : (action : Object) => void) => {
    dispatch(
      {
        type: YOUTUBE_ITEM_SELECTED,
        itemId,
        sampleSlotId,
        query
      }
    )
    youtube.download(
        itemId,
        progress => dispatch(downloadProgress(itemId, sampleSlotId, progress))
      )
      .then(path => dispatch(itemDownloaded(itemId, sampleSlotId, path)))
  }
}

export const YOUTUBE_ITEM_DOWNLOADED = 'YOUTUBE_ITEM_DOWNLOADED'
export const itemDownloaded = (itemId : string, sampleSlotId : string, path : string) => {
  return {
    type: YOUTUBE_ITEM_DOWNLOADED,
    itemId,
    sampleSlotId,
    path
  }
}


export const YOUTUBE_ITEM_DOWNLOAD_PROGRESS = 'YOUTUBE_ITEM_DOWNLOAD_PROGRESS'
export const downloadProgress = (itemId: string, sampleSlotId: string, progress: string) => {
  return {
    type: YOUTUBE_ITEM_DOWNLOAD_PROGRESS,
    itemId,
    sampleSlotId,
    progress
  }
}
