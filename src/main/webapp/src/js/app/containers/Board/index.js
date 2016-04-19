import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../../actions/data';
import CSSModules from 'react-css-modules';
import styles from './styles/index.local.css';

@CSSModules(styles)
class Board extends Component {
  componentDidMount() {
    this.props.fetchDataIfNeeded();
  }
  render() {
    return(
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.getIn(['data'])
  }
}

export default connect(mapStateToProps, {
  fetchDataIfNeeded
})(Board);
