import { expect } from 'chai'
import filterTreeSeqSync from './filter-tree-seq-sync'

const isEven = (arg: number) => arg % 2 === 0

describe('[ mapTreeSeqSync ]', () => {
  it('should work', () => {
    const tree = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const res = filterTreeSeqSync(isEven)(tree)
    expect(res).deep.eq([2, [4, [6], 8]])
  })
})
