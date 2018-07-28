import { expect } from 'chai'
import mapTreeSeqSync from './map-tree-seq-sync'

const mult2 = (arg: number) => arg * 2

describe('[ mapTreeSeqSync ]', () => {
  it('should work', () => {
    const tree = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const res = mapTreeSeqSync(mult2)(tree)
    expect(res).deep.eq([2, 4, 6, [8, 10, [12, 14], 16], 18])
  })
})
