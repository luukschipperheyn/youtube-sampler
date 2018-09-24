//@flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Youtube from '../utils/youtube'
import YoutubeComponent from 'react-youtube'
import routes from '../constants/routes.json'
import styles from './global.css'

const youtube = Youtube().getInstance()

type State = {
  text: string,
  item: ?{
    id: string
  }
}

export default class YoutubeSearch extends Component<any, State> {
  search = (event : SyntheticEvent<HTMLButtonElement>) => {
    this.props.searchYoutube(this.state.text, this.props.match.params.slot)
  }
  updateQuery = (event : SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget : HTMLInputElement)
    this.setState({
      text: event.currentTarget.value
    })
  }
  onClickItem = (id : string) => {
    this.setState({
      item: {
        id
      }
    })
  }
  onSelectItem = () => {
    if (this.state.item) {
      this.props.onSelectYoutubeItem(
        this.state.item.id, this.props.match.params.slot, this.state.text)
    }
  }
  constructor (props: any) {
    super(props)
    this.state = {
      text: '',
      item: null
    }
  }
  render () {
    console.log('joaah', this.props)
    const results = this.props.youtube &&
        this.props.youtube.results.map(result => {
          return(
            <div
              className={styles.section}
              key={result.id}
              onClick={() => this.onClickItem(result.id)}>
                <div>{result.id}</div>
                <div>{result.title}</div>
                <div>{result.description}</div>
                <img
                  src={result.thumbnail.url}
                  width={result.thumbnail.width}
                  height={result.thumbnail.height} />
            </div>
          )
        })
    const player = this.state.item && (
      <div className={styles.section}>
        <YoutubeComponent
          videoId={this.state.item.id}
          opts={{
            width: '100%'
          }}
        />
      </div>
    )
    return (
      <div>
        <div className={styles.section}>
          <Link
            className={styles.navLink}
            to={routes.SAMPLER}>
            cancel
          </Link>
          {
            this.state.item &&
            <Link
            className={styles.navLink}
            onClick={this.onSelectItem}
            to={routes.SAMPLER}>
            select
            </Link>
          }
        </div>
        {player}
        <div className={styles.section}>
          <form onSubmit={this.search}>
            <input
              type="text"
              value={this.state.text}
              onChange={this.updateQuery}
            />
            <button>search</button>
          </form>
        </div>
        <div className={styles.section}>
          {results}
        </div>
      </div>
    )
  }
}
