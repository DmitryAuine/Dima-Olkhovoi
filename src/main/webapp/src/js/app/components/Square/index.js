import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './styles/index.local.css';

@CSSModules(styles, {
    allowMultiple: true
  }
)
export default class Square extends Component {
  static pieceMapper = {
    white: {
      k: '&#9812',
      q: '&#9813',
      r: '&#9814',
      b: '&#9815',
      n: '&#9816',
	    p: '&#9817',
    },
    black: {
      k: '&#9818',
      q: '&#9819',
      r: '&#9820',
      b: '&#9821',
      n: '&#9822',
      p: '&#9823',
    }
  }

  render() {
    const {
      type: piece,
      owner: color,
      selected,
      onClick,
      canMove
    } = this.props;
    return (
      <div
        onClick={onClick}
        styleName={
          `square ${selected ? 'active' : '' } ${canMove ? 'can-move' : ''}`
        }
        dangerouslySetInnerHTML={
            {
              __html: (piece) ? Square.pieceMapper[color.toLowerCase()][piece] : ''
            }
          }
        >
      </div>
    );
  }
}
