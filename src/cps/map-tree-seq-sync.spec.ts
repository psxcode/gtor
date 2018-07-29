import { expect } from 'chai'
import mapTreeSeqSync from './map-tree-seq-sync'

type Spy<A, B> = {
  (val: A, inds: number[]): B
  values: A[]
  indices: number[][]
}

const makespy = <A, B> (xf: (arg: A, inds: number[]) => B) => {
  const values = [] as A[]
  const indices = [] as number[][]
  const spy = (val: A, inds: number[]): B => {
    values.push(val)
    indices.push(inds)

    return xf(val, inds)
  }

  (spy as Spy<A, B>).values = values;
  (spy as Spy<A, B>).indices = indices

  return spy as Spy<A, B>
}


const mult2 = (arg: number) => arg * 2

describe('[ mapTreeSeqSync ]', () => {
  it('should work', () => {
    const tree = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const spy = makespy(mult2)
    const res = mapTreeSeqSync(spy)(tree)
    expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(spy.indices).deep.eq(
      [[0], [1], [2], [3, 0], [3, 1], [3, 2, 0], [3, 2, 1], [3, 3], [4]]
    )
    expect(res).deep.eq([2, 4, 6, [8, 10, [12, 14], 16], 18])
  })
})
