import React, { Component } from 'react';
import Top from '../../containers/Top';
import Board from '../../containers/Board';
import CSSModules from 'react-css-modules';
import styles from './styles/index.local.css';

@CSSModules(styles)
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Top />
        <Board />
      </div>
    );
  }
}
