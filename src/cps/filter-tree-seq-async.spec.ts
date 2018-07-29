import { expect } from 'chai'
import filterTreeSeqSync from './filter-tree-seq-sync'

type Spy<T> = {
  (val: T, inds: number[]): boolean
  values: T[]
  indices: number[][]
}

const makespy = <T> (pred: (arg: T, inds: number[]) => boolean) => {
  const values = [] as T[]
  const indices = [] as number[][]
  const spy = (val: T, inds: number[]) => {
    values.push(val)
    indices.push(inds)

    return pred(val, inds)
  }

  (spy as Spy<T>).values = values;
  (spy as Spy<T>).indices = indices

  return spy as Spy<T>
}

const isEven = (arg: number) => arg % 2 === 0

describe('[ filterTreeSeqSync ]', () => {
  it('should work', () => {
    const tree = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const spy = makespy(isEven)
    const res = filterTreeSeqSync(spy)(tree)
    expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(spy.indices).deep.eq(
      [[0], [1], [2], [3, 0], [3, 1], [3, 2, 0], [3, 2, 1], [3, 3], [4]]
    )
    expect(res).deep.eq([2, [4, [6], 8]])
  })
})
