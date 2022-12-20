export class UF {
  id: number[]
  constructor(N: number) {
    this.id = []
    for (let i = 0; i < N; i++) {
      this.id[i] = i
    }
  }

  connected(p: number, q: number) {
    return this.id[p] === this.id[q]
  }

  union(p: number, q: number) {
    const pid = this.id[p]
    const qid = this.id[q]
    for (let i = 0; i < this.id.length; i++) {
      // 如果 id[i] 等于 pid，则修改为 qid
      if (this.id[i] === pid) this.id[i] = qid
    }
  }
}
