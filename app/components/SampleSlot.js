//@flow

import React, { Component } from 'react'
import AddSampleSlot from './AddSampleSlot'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import styles from './global.css'

type Props = {
  sampleSlot: {
    id: string,
    start: number,
    duration: number,
    hotKey?: string,
    youtube: {
      id?: string,
      downloading: boolean,
      downloaded: boolean,
      progress: number,
      path?: string,
    }
  },
  setSampleStart: (string | number, number) => void,
  setSampleDuration: (string | number, number) => void,
  sampleSelected: (string | number) => void
}

export default class SampleSlot extends Component<Props> {
  videoRef: Object
  stopTask: ?any
  componentDidMount () {
    if(this.props.sampleSlot.hotKey) {
      document.addEventListener('keypress', (event : KeyboardEvent) => {
        if(event.key === this.props.sampleSlot.hotKey) {
          this.playSample()
        }
      })
    }
  }
  playSample = () => {
    this.props.sampleSelected(this.props.sampleSlot.id)
    if (this.stopTask) {
      clearTimeout(this.stopTask)
    }
    if (this.videoRef.current) {
      this.videoRef.current.currentTime = this.props.sampleSlot.start
      this.videoRef.current.play()
      this.stopTask = setTimeout(() => {
        this.videoRef.current.pause()
      }, this.props.sampleSlot.duration * 1000)
    }
  }
  setStart = (event : SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget : HTMLInputElement)
    this.props.setSampleStart(this.props.sampleSlot.id, parseFloat(event.currentTarget.value))
  }
  setDuration = (event : SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget : HTMLInputElement)
    this.props.setSampleDuration(this.props.sampleSlot.id, parseFloat(event.currentTarget.value))
  }
  content = () => {
    if (this.props.sampleSlot) {
      const sampleSlot = this.props.sampleSlot
      const video = sampleSlot.youtube.downloading ? (
        <div>
          <div>{sampleSlot.youtube.progress}</div>
        </div>
      ) : sampleSlot.youtube.downloaded ? (
        <video
          className={styles.sampleVid}
          ref={this.videoRef}
          src={sampleSlot.youtube.path} />
      ) : null
      const youtube = sampleSlot.youtube.id ? (
        <div>
          {video}
        </div>
      ) : null
      return (
        <div>
          {youtube}
        </div>
      )
    }
    return (
      <AddSampleSlot navigation={this.props.navigation}/>
    )
  }
  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
  }
  render () {
    return (
      <div className={styles.sampleSlot}>
        <div className={styles.sampleSlotInner}
             onClick={this.playSample}>
          {this.content()}
        </div>
      </div>
    )
  }
}
