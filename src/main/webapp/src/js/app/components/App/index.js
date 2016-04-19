import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../../containers/Board';
import CSSModules from 'react-css-modules';
import styles from './styles/index.local.css';

@CSSModules(styles)
export default class App extends Component {
  render() {
    return (
      <div styleName="red">
        <Board />
      </div>
    );
  }
}
