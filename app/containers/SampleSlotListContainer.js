//@flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SampleSlotList from '../components/SampleSlotList'
import * as SamplerActions from '../actions/sampler'

const mapStateToProps = state => ({
  sampleSlots: state.sampleSlots
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(SamplerActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleSlotList)
