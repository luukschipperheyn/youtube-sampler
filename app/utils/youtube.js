// @flow
import youtubeSearch from 'youtube-api-v3-search'
import fs from 'fs'
// import youtubedl from 'youtube-dl'
import { spawn } from 'child_process'

const API_KEY = 'AIzaSyDNiEUjhrdFkr8B6awa_ZxUwUswX2nGdK8'

const Youtube = function () {
}

Youtube.prototype = {
  search (query : string) {
    return youtubeSearch(
      API_KEY,
      {
        q: query,
        part: 'snippet',
        type: 'video'
      }
    )
  },
  download (id : string, onProgress : () => {}) {
    return new Promise((resolve, reject) => {
      const outputDir = './videos'
      const outputPath = `${outputDir}/${id}.mp4`
      !fs.existsSync(outputDir) && fs.mkdirSync(outputDir)

      const binPath = require.resolve('youtube-dl').replace('lib/youtube-dl.js', 'bin/youtube-dl')
      const dl = spawn(
        binPath, [
          'http://www.youtube.com/watch?v=' + id,
          '-o',
          outputPath
        ]
      )
      dl.on('close', () => resolve('.' + outputPath))
      dl.stdout.on('data', data => {
          let result = []
          let regex = RegExp("\\d+(\\.\\d+)?%", 'g')

          while ((result = regex.exec(data)) !== null) {
            if (onProgress) {
              onProgress(result[0])
            }
          }
      })
    })
  }
}

export default () => {
  let instance
  function createInstance() {
    const object = new Youtube()
    return object
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
}
