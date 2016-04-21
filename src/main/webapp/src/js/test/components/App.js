import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../../app/components/App';
import Top from '../../app/containers/Top';
import Board from '../../app/containers/Board';

function setup() {
  const renderer = TestUtils.createRenderer();
  renderer.render(<App />);
  const output = renderer.getRenderOutput();

  return {
    output,
    renderer,
  };
}

describe('components', () => {
  describe('App', () => {
    it('should render correctly', () => {
      const { output } = setup()

      expect(output.type).to.equal('div')

      const [TopElm, BoardElm] = output.props.children

      expect(TopElm.type).to.equal(Top)

      expect(BoardElm.type).to.equal(Board)
    })
  })
})
