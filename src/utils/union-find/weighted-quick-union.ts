export class WQuickUnionUF {
  id: number[]
  sz: number[]
  constructor(N: number) {
    // 增加树的大小 size 数组
    this.sz = []
    this.id = []
    for (let i = 0; i < N; i++) {
      this.id[i] = i
      this.sz[i] = 1
    }
  }
  root(i: number) {
    while (i !== this.id[i]) i = this.id[i]
    return i
  }
  connected(p: number, q: number) {
    return this.root(p) === this.root(q)
  }
  union(p: number, q: number) {
    const i = this.root(p)
    const j = this.root(q)
    if (i === j) return
    // 如果 p 的根节点的 size 比 q 的小，说明 p 所在的树高度较小，
    // 则应该将 p 所在的树加到 q 所在的树的下面，即将 p 根节点 i 的父节点设置为 q 的根节点 j
    // 然后更新 size 数组
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j
      this.sz[j] += this.sz[i]
    } else {
      this.id[j] = i
      this.sz[i] += this.sz[j]
    }
  }
}
