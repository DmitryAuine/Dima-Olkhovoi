import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSquare } from '../../actions/data/';
import { doMove } from '../../actions/data/moves';
import { fetchDataIfNeeded } from '../../actions/data/data';
import Square from '../../components/Square';
import CSSModules from 'react-css-modules';
import styles from './styles/index.local.css';

@CSSModules(styles)
class Board extends Component {
  static boardMap = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
  ]

  componentDidMount() {
    this.props.fetchDataIfNeeded();
  }

  render() {
    const { data, selectSquare, doMove } = this.props;
    const positionToPieces = data.get('positionToPieces');
    const currentPlayer = data.get('currentPlayer');
    const selectedSquare = data.get('selectedSquare');
    const moves = data.get('moves');
    const canMoves = moves
      .filter(square => (square.get('origin') === selectedSquare))
      .map(square => (square.get('destination'))).toJS();

    return(
      <div styleName="board">
        {

          Board.boardMap.map((col, key) => {
            return (
              <div styleName="row" key={ key }>
                {
                  col.map((item, key) => {
                    const square = positionToPieces.get(item);
                    const canMove = canMoves.indexOf(item) !== -1;

                    if(square){
                      const owner = square.get('owner');

                      return <Square
                        key={ key }
                        type={ square.get('type') }
                        owner={ owner }
                        selected={ selectedSquare === item }
                        canMove={ canMove }
                        onClick={() => {
                          if(canMove){
                            return doMove(selectedSquare, item);
                          }

                          if(owner === currentPlayer){
                            return selectSquare(item);
                          }else{
                            alert('It\'s not your piece');
                          }
                        }}
                      />
                    }else{
                      return <Square key={ key } onClick={() => {
                        if(canMove){
                          return doMove(selectedSquare, item);
                        }
                      }} canMove={ canMove } />
                    }
                  })
                }
              </div>
            )
          })
        }
        <div className="clearfix"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.get('data')
  }
}

export default connect(mapStateToProps, {
  fetchDataIfNeeded,
  selectSquare,
  doMove,
})(Board);
