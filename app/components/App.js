import { createStackNavigator } from 'react-navigation'
import SampleBankListContainer from '../containers/SampleBankListContainer'
import YoutubeSearchContainer from '../containers/YoutubeSearchContainer'
import HomePage from '../containers/HomePage'

const App = createStackNavigator({
  Home: { screen: HomePage },
  Sampler: { screen: SampleBankListContainer },
  YoutubeSearch: { screen: YoutubeSearchContainer }
})

export default App
