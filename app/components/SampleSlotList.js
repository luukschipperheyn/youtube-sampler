//@flow

import React, { Component } from 'react'
import SampleSlotContainer from '../containers/SampleSlotContainer'
import AddSampleSlot from './AddSampleSlot'
import routes from '../constants/routes.json'
import styles from './global.css'

type Props = {
  sampleSlots: {
    [key: string]: {
      id: string,
      youtube?: Object
    }
  }
}

const style = {
  div: {
    marginBottom: '40px'
  }
}

export default class SampleSlotList extends Component<Props> {

  constructor (props: Props) {
    super(props)
  }

  render () {
    const sampleSlotComponents = Object.keys(this.props.sampleSlots)
        .map(key => {
          const sampleSlot = this.props.sampleSlots[key]
          return (
            <div
              key={sampleSlot.id.toString()}>
              <SampleSlotContainer
                sampleSlotId={sampleSlot.id}
                />
            </div>
          )
        })
    return (
      <div className={styles.container}>
        <div>
          {sampleSlotComponents}
        </div>
        <div className={styles.section}>
          <AddSampleSlot />
        </div>
      </div>
    )
  }
}
