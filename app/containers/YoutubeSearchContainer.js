//@flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import YoutubeSearch from '../components/YoutubeSearch'
import * as YoutubeActions from '../actions/youtube'

const mapStateToProps = (state, ownState) => {
  console.log('sttp', ownState.match.params.slot, state, ownState)
  return state.sampleSlots[ownState.match.params.slot]
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(YoutubeActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YoutubeSearch)
