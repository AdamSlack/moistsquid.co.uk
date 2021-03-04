import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import {
  BinDaysPage,
} from './pages';

import {
  DefaultLayout
} from './layouts'

export const Routes = () => {
  return (
    <Router>
      <Switch>
          <Route path="/" exact>
            <DefaultLayout>
              <BinDaysPage />
            </DefaultLayout>
          </Route>
      </Switch>
    </Router>
  )
}

export default Routes;