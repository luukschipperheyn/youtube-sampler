// @flow

import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import SampleSlotListContainer from '../containers/SampleSlotListContainer'
import SampleSlotControlsContainer from '../containers/SampleSlotControlsContainer'
import routes from '../constants/routes.json'
import styles from './global.css'

class Sampler extends Component<{}> {
  render () {
    return (
      <div>
        <div className={styles.section}>
          <Link to={routes.HOME}>
            {'<'}
          </Link>
        </div>
        <SampleSlotListContainer />
        <SampleSlotControlsContainer />
      </div>
    )
  }
}

export default Sampler
