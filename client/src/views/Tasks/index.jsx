import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions';

@connect(
  null,
  { logout },
)
class Tasks extends PureComponent {
  logout = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h2>Tasks</h2>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

Tasks.propTypes = {
  logout: PropTypes.func,
  history: PropTypes.object.isRequired,
};

Tasks.defaultProps = {
  logout: () => {},
};

export default Tasks;
