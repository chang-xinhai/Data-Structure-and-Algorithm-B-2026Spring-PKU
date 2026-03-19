---
theme: seriph
title: Lecture 06 · 笔试复习
info: 数据结构与算法 B 小班课
class: text-center
mdc: true
---

<style>
:root {
  --exam-ink: #1d2732;
  --exam-muted: #5a6775;
  --exam-accent: #9f4a2f;
  --exam-soft: #faf3ea;
  --exam-line: rgba(29, 39, 50, 0.12);
}

.slidev-layout {
  color: var(--exam-ink);
}

.grid-2,
.grid-3,
.steps {
  display: grid;
  gap: 0.9rem;
}

.grid-2,
.steps {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card,
.key-point,
.danger {
  border: 1px solid var(--exam-line);
  border-radius: 18px;
  padding: 0.9rem 1rem;
  background: rgba(255, 250, 244, 0.92);
}

.key-point {
  background: rgba(159, 74, 47, 0.1);
}

.danger {
  background: rgba(159, 74, 47, 0.07);
}

.tiny {
  font-size: 0.84rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

th,
td {
  border: 1px solid var(--exam-line);
  padding: 0.5rem 0.6rem;
  text-align: left;
}

th {
  background: rgba(29, 39, 50, 0.06);
}
</style>

# Lecture 06

## 笔试复习

<div class="key-point" style="margin-top:1rem">
最后一讲不再扩新知识，只做三件事：梳理概念、手推过程、稳定拿分。
</div>

---
layout: section
---

# 开场地图

---

# 冲刺阶段的 4 个任务

<div class="grid-2">
  <div class="card">
    <h3>概念辨析</h3>
    <p>逻辑结构 / 存储结构 / 算法目标别混。</p>
  </div>
  <div class="card">
    <h3>复杂度判断</h3>
    <p>先抓循环层数，再抓主导项。</p>
  </div>
  <div class="card">
    <h3>过程手推</h3>
    <p>排序、遍历、最短路、MST 高频出现。</p>
  </div>
  <div class="card">
    <h3>题型识别</h3>
    <p>先认问题，再选结构与算法。</p>
  </div>
</div>

---

# 笔试高频题型总表

| 模块 | 常考形式 | 一眼识别词 |
| --- | --- | --- |
| 线性结构 | 增删代价、结构比较 | 随机访问、频繁插删 |
| 串 / 栈 / 队列 | KMP 手推、出栈序列 | 失配、括号、FIFO |
| 排序 | 过程手算、稳定性 | 第几趟、交换次数 |
| 树 | 遍历、重建、Huffman | 先中后序、路径长度 |
| 图 | DFS/BFS/MST/最短路 | 连通、最短、依赖 |

<div class="key-point tiny" style="margin-top:0.9rem">
笔试不是“全会写代码”，而是“能快速判题型并给出正确过程”。
</div>

---
layout: section
---

# 知识梳理

---

# 概念辨析：最容易混的 6 组

<div class="grid-3 tiny">
  <div class="card"><h3>逻辑结构 vs 存储结构</h3><p>前者看关系，后者看实现。</p></div>
  <div class="card"><h3>MST vs 最短路径</h3><p>一个求全局连通最省，一个求点到点最短。</p></div>
  <div class="card"><h3>堆 vs BST</h3><p>堆保局部序，BST保检索序。</p></div>
  <div class="card"><h3>DFS vs BFS</h3><p>一个深入，一个分层。</p></div>
  <div class="card"><h3>稳定排序 vs 不稳定排序</h3><p>看相等关键字相对次序。</p></div>
  <div class="card"><h3>邻接矩阵 vs 邻接表</h3><p>一个判边快，一个遍历邻居快。</p></div>
</div>

---

# 复杂度题的 3 步动作

<div class="steps tiny">
  <div class="card">
    <h3>Step 1</h3>
    <p>看最内层操作是不是常数时间。</p>
  </div>
  <div class="card">
    <h3>Step 2</h3>
    <p>数循环执行次数，特别留意对数型更新。</p>
  </div>
  <div class="card">
    <h3>Step 3</h3>
    <p>去掉低阶项和常数，只保留主导项。</p>
  </div>
  <div class="card">
    <h3>Step 4</h3>
    <p>如有递归，再写递推式或递归树。</p>
  </div>
</div>

```python
for i in range(n):
    j = 1
    while j < n:
        j *= 2
```

<div class="danger tiny" style="margin-top:0.8rem">
内层不是跑 n 次，而是跑 log n 次，所以总复杂度是 O(n log n)。
</div>

---

# 手推题的统一检查单

<div class="grid-2 tiny">
  <div class="card">
    <h3>排序</h3>
    <ul>
      <li>第几趟结束后局部有序？</li>
      <li>稳定性和最坏复杂度是什么？</li>
      <li>快排 / 堆排常爱考过程。</li>
    </ul>
  </div>
  <div class="card">
    <h3>树</h3>
    <ul>
      <li>遍历序列能不能互相恢复？</li>
      <li>层次遍历要不要队列？</li>
      <li>Huffman 常考 WPL 与编码。</li>
    </ul>
  </div>
  <div class="card">
    <h3>图</h3>
    <ul>
      <li>先分无权 / 有权，DAG / 非 DAG。</li>
      <li>MST 与最短路不要混用。</li>
      <li>拓扑排序只对有向无环图。</li>
    </ul>
  </div>
  <div class="card">
    <h3>线性结构</h3>
    <ul>
      <li>顺序表重点看搬移代价。</li>
      <li>链表重点看指针顺序。</li>
      <li>栈队列重点看受限访问。</li>
    </ul>
  </div>
</div>

---
layout: section
---

# 典型例题

---

# 例 1：题型识别

<div class="card">
  已知一个有向图表示课程先修关系，要求判断是否存在合法学习顺序，并给出一种顺序。
</div>

<div class="grid-2 tiny" style="margin-top:0.9rem">
  <div class="key-point">
    <h3>关键词</h3>
    <p>有向图、先后依赖、给出顺序。</p>
  </div>
  <div class="card">
    <h3>答案</h3>
    <p>拓扑排序。若排不完全部顶点，则图中有环。</p>
  </div>
</div>

---

# 例 2：排序题怎么看

| 算法 | 最坏时间 | 稳定性 | 笔试爱问什么 |
| --- | --- | --- | --- |
| 冒泡 | O(n^2) | 稳定 | 某趟结束结果 |
| 直接插入 | O(n^2) | 稳定 | 插入过程 |
| 快速排序 | O(n^2) | 不稳定 | 一次划分结果 |
| 归并排序 | O(n log n) | 稳定 | 归并过程 |
| 堆排序 | O(n log n) | 不稳定 | 调整堆过程 |

---

# 例 3：MST 和最短路

<div class="grid-2 tiny">
  <div class="card">
    <h3>最小生成树</h3>
    <p>目标：让所有点连通，总权值最小。</p>
    <p>算法：Prim / Kruskal。</p>
  </div>
  <div class="card">
    <h3>最短路径</h3>
    <p>目标：让某点到某点路径最短。</p>
    <p>算法：Dijkstra / Floyd / BFS。</p>
  </div>
</div>

<div class="danger tiny" style="margin-top:0.9rem">
“从 A 到 B 最省”不等于“把整张图连起来最省”。
</div>

---
layout: section
---

# 课堂练习

---

# 练习清单

<div class="grid-3 tiny">
  <div class="card">
    <h3>练习 1</h3>
    <p>判断 5 个排序算法的稳定性。</p>
  </div>
  <div class="card">
    <h3>练习 2</h3>
    <p>手算一棵二叉树的先中后序。</p>
  </div>
  <div class="card">
    <h3>练习 3</h3>
    <p>比较 BFS 与 DFS 的适用场景。</p>
  </div>
  <div class="card">
    <h3>练习 4</h3>
    <p>判断一题该用 MST 还是最短路。</p>
  </div>
  <div class="card">
    <h3>练习 5</h3>
    <p>手推一段双层循环代码复杂度。</p>
  </div>
  <div class="card">
    <h3>练习 6</h3>
    <p>说明邻接矩阵和邻接表的取舍。</p>
  </div>
</div>

---
layout: section
---

# 课后题

---

# 考前最后一页清单

<div class="grid-2 tiny">
  <div class="card">
    <h3>必须会手推</h3>
    <ul>
      <li>KMP next</li>
      <li>排序过程</li>
      <li>树遍历 / Huffman</li>
      <li>Prim / Kruskal / Dijkstra</li>
    </ul>
  </div>
  <div class="card">
    <h3>必须会判断</h3>
    <ul>
      <li>复杂度主导项</li>
      <li>结构选型</li>
      <li>稳定性 / 适用场景</li>
      <li>概念辨析</li>
    </ul>
  </div>
</div>

<div class="key-point" style="margin-top:0.9rem">
答题顺序建议：先拿稳概念与手推分，再做综合大题。
</div>
