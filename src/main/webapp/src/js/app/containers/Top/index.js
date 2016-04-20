import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startNewGame } from '../../actions/data/data';
import Board from '../../containers/Board';
import CSSModules from 'react-css-modules';
import styles from './styles/index.local.css';

@CSSModules(styles)
class Top extends Component {
  render() {
    const { startNewGame, player } = this.props;
    console.log(this.props)

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Chess game
              </a>
            </div>
            <button
              type="button"
              onClick={startNewGame}
              className="btn btn-default navbar-btn pull-right"
              >
                Start a new game
            </button>
          </div>
        </nav>
        <div styleName="tip">
          <p>{player}, it's your turn</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.getIn(['data', 'currentPlayer'])
  }
}

export default connect(mapStateToProps, {
  startNewGame
})(Top)
