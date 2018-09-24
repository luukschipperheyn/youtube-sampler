//@flow

import React, { Component } from 'react'
import AddSampleSlot from './AddSampleSlot'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import styles from './global.css'

type Props = {
  sampleSlot?: {
    id: string,
    start: number,
    duration: number,
    youtube: {
      id?: string,
      downloading: boolean,
      downloaded: boolean,
      progress: number,
      path?: string,
    }
  },
  setSampleStart: (string | number, number) => void,
  setSampleDuration: (string | number, number) => void
}

export default class SampleSlot extends Component<Props> {
  setStart = (event : SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget : HTMLInputElement)
    if (this.props.sampleSlot) {
      this.props.setSampleStart(this.props.sampleSlot.id, parseFloat(event.currentTarget.value))
    }
  }
  setDuration = (event : SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget : HTMLInputElement)
    if (this.props.sampleSlot) {
      this.props.setSampleDuration(this.props.sampleSlot.id, parseFloat(event.currentTarget.value))
    }
  }
  controls = () => {
    if (!this.props.sampleSlot) {
      return (
        <div>
          No sample selected
        </div>
      )
    } else {
      const sampleSlot = this.props.sampleSlot
      return (
        <div>
          <div>
            <input
              type="number"
              onChange={this.setStart}
              value={this.props.sampleSlot.start} />
          </div>
          <div>
            <input
              type="number"
              onChange={this.setDuration}
              value={this.props.sampleSlot.duration} />
          </div>
          <div>
            <Link to={routes.YOUTUBE_SEARCH.replace(':slot', sampleSlot.id)}>
              set source
            </Link>
          </div>
        </div>
      )
    }
  }
  constructor(props: Props) {
    super(props);
  }
  render () {
    return (
      <div className={styles.section}>
        {this.controls()}
      </div>
    )
  }
}
