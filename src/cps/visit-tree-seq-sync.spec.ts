import { expect } from 'chai'
import visitTreeSeqSync from './visit-tree-seq-sync'

type Spy <T> = {
  (val: T, inds: number[]): void
  values: T[]
  indices: number[][]
}

const makespy = <T> () => {
  const values = [] as T[]
  const indices = [] as number[][]
  const spy = (val: T, inds: number[]) => {
    values.push(val)
    indices.push(inds)
  }

  (spy as Spy<T>).values = values;
  (spy as Spy<T>).indices = indices

  return spy as Spy<T>
}

describe('[ mapTreeSeqSync ]', () => {
  it('should work', () => {
    const tree = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const spy = makespy()
    visitTreeSeqSync(spy)(tree)
    expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(spy.indices).deep.eq(
      [[0], [1], [2], [3, 0], [3, 1], [3, 2, 0], [3, 2, 1], [3, 3], [4]]
    )
  })
})
