import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as actions from '../../actions';
import { StyledIndex } from './styles';

import Home from '../../views/Home';
import Tasks from '../../views/Tasks';
import Navbar from '../../components/Navbar';

const Habits = () => <h2>Habits</h2>;
const Awards = () => <h2>Awards</h2>;

@connect(
  null,
  actions,
)
class App extends PureComponent {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const isRootUrl = window.location.pathname === '/';

    return (
      <BrowserRouter>
        <StyledIndex
          notifications
          fa={__FONT_AWESOME__}
          bodyClassName="mainBody"
          before={<Navbar />}
          isRootUrl={isRootUrl}
        >
          <Switch>
            <Route path="/tasks" component={Tasks} />
            <Route path="/habits" component={Habits} />
            <Route path="/awards" component={Awards} />
            <Route exact path="/" component={Home} />
          </Switch>
        </StyledIndex>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: func.isRequired,
};

export default App;
