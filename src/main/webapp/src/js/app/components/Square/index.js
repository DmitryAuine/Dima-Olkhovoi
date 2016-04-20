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
      n: '&#9812',
      q: '&#9813',
      r: '&#9814',
      b: '&#9815',
      k: '&#9816',
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
      onClick
    } = this.props;

    return (
      <div
        onClick={onClick}
        styleName={ selected ? 'square active' : 'square' }
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
