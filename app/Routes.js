/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Sampler from './components/Sampler';
import YoutubeSearchContainer from './containers/YoutubeSearchContainer';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.SAMPLER} component={Sampler} />
      <Route path={routes.YOUTUBE_SEARCH} component={YoutubeSearchContainer} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
