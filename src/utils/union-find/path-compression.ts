export class WQuickUnionUFWithPath {
  id: number[]
  sz: number[]
  idSet: Set<number>
  constructor(N: number) {
    this.sz = []
    this.id = []
    this.idSet = new Set()
    for (let i = 0; i < N; i++) {
      this.id[i] = i
      this.sz[i] = 1
    }
  }
  root(i: number) {
    while (i !== this.id[i]) {
      // path compression
      this.id[i] = this.id[this.id[i]]
      i = this.id[i]
    }
    return i
  }
  connected(p: number, q: number) {
    return this.root(p) === this.root(q)
  }
  union(p: number, q: number) {
    const i = this.root(p)
    const j = this.root(q)
    if (i === j) return
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j
      this.sz[j] += this.sz[i]
      this.idSet.add(j)
    } else {
      this.id[j] = i
      this.sz[i] += this.sz[j]
      this.idSet.add(i)
    }
  }
  getComponent(threshold: number) {
    const map = new Map()
    this.id.forEach((root, i) => {
      if (!map.get(root)) {
        map.set(root, [])
      }
      map.get(root).push(i)
    })
    map.forEach((value, key, _map) => {
      if (value.length < threshold) {
        _map.delete(key)
      }
    })
    return map
  }
}
