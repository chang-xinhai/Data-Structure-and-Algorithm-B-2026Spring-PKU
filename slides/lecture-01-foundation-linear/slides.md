---
theme: seriph
title: Lecture 01 · 基础、复杂度与线性表
info: 数据结构与算法 B 小班课
class: text-center
mdc: true
transition: slide-left
---

<style>
:root {
  --l1-ink: #17212b;
  --l1-muted: #5d6875;
  --l1-accent: #b44c36;
  --l1-soft: #f7efe5;
  --l1-soft-2: #fffaf4;
  --l1-line: rgba(23, 33, 43, 0.12);
  --l1-warn: #8d2f1f;
  --l1-good: #2f6a4f;
}

.slidev-layout {
  color: var(--l1-ink);
}

h1,
h2,
h3 {
  letter-spacing: 0.01em;
}

p,
li {
  color: var(--l1-muted);
}

.grid-2,
.grid-3,
.steps,
.compare,
.array-row,
.ops-grid {
  display: grid;
  gap: 0.9rem;
}

.grid-2,
.compare,
.array-row {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3,
.ops-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.steps {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.card,
.key-point,
.danger,
.mini,
.stage {
  border: 1px solid var(--l1-line);
  border-radius: 18px;
  padding: 0.9rem 1rem;
  background: var(--l1-soft-2);
}

.card h3,
.mini h3,
.stage h3,
.key-point h3,
.danger h3 {
  margin-top: 0;
  margin-bottom: 0.45rem;
}

.key-point {
  background: linear-gradient(135deg, rgba(180, 76, 54, 0.12), rgba(255, 250, 244, 0.96));
}

.danger {
  background: rgba(141, 47, 31, 0.07);
  border-color: rgba(141, 47, 31, 0.2);
}

.pill-row {
  display: flex;
  gap: 0.55rem;
  justify-content: center;
  flex-wrap: wrap;
}

.pill {
  display: inline-block;
  padding: 0.18rem 0.6rem;
  border-radius: 999px;
  background: rgba(180, 76, 54, 0.1);
  color: var(--l1-accent);
  font-size: 0.78rem;
  font-weight: 700;
}

.big-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--l1-accent);
}

.tiny {
  font-size: 0.82rem;
}

.micro {
  font-size: 0.74rem;
}

.steps .stage {
  position: relative;
}

.steps .stage::after {
  content: "→";
  position: absolute;
  right: -0.55rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-weight: 700;
}

.steps .stage:last-child::after {
  content: "";
}

.mini-table,
.trace-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}

.mini-table th,
.mini-table td,
.trace-table th,
.trace-table td {
  border: 1px solid var(--l1-line);
  padding: 0.45rem 0.55rem;
  text-align: left;
  vertical-align: top;
}

.mini-table th,
.trace-table th {
  background: rgba(23, 33, 43, 0.06);
}

.seq {
  display: flex;
  gap: 0.45rem;
  align-items: center;
  flex-wrap: wrap;
}

.slot {
  border: 1px solid var(--l1-line);
  border-radius: 14px;
  background: white;
  min-width: 3.2rem;
  padding: 0.45rem 0.55rem;
  text-align: center;
  color: var(--l1-ink);
  font-weight: 700;
}

.slot.hot {
  background: rgba(180, 76, 54, 0.12);
  border-color: rgba(180, 76, 54, 0.25);
}

.slot.ghost {
  border-style: dashed;
  color: #94a3b8;
}

.arrow {
  color: var(--l1-accent);
  font-weight: 800;
}

.quote {
  border-left: 4px solid rgba(180, 76, 54, 0.36);
  padding-left: 0.9rem;
  color: var(--l1-ink);
}

.mono {
  font-family: "SFMono-Regular", "Menlo", monospace;
}
</style>

# Lecture 01

## 基础、复杂度与线性表

<div class="pill-row" style="margin-top:1rem">
  <span class="pill">Python 入门约定</span>
  <span class="pill">问题建模</span>
  <span class="pill">复杂度意识</span>
  <span class="pill">顺序表直觉</span>
</div>

<div class="key-point tiny" style="margin-top:1rem">
第一讲的目标不是“背定义”，而是建立一套统一视角：<b>先认问题，再认结构，再估代价。</b>
</div>

---
layout: section
---

# 开场地图

---

# 这一讲到底要搭什么底座

<div class="grid-2">
  <div class="key-point">
    <div class="big-number">1</div>
    <h3>会看 Python 代码</h3>
    <p>之后所有模板、算法题都默认能读懂列表、循环、函数。</p>
  </div>
  <div class="key-point">
    <div class="big-number">2</div>
    <h3>会区分“逻辑”和“实现”</h3>
    <p>线性表不是数组，ADT 不是某一种代码写法。</p>
  </div>
  <div class="key-point">
    <div class="big-number">3</div>
    <h3>会估复杂度</h3>
    <p>先抓主导项，再判断最坏情况和平均情况。</p>
  </div>
  <div class="key-point">
    <div class="big-number">4</div>
    <h3>会解释顺序表代价</h3>
    <p>随机访问快，插删靠搬移，这就是顺序存储的核心代价。</p>
  </div>
</div>

<div class="quote tiny" style="margin-top:0.9rem">
后面每一讲其实都在重复这一套框架：结构 + 操作 + 代价 + 适用题型。
</div>

---

# 本讲结构

<div class="steps tiny">
  <div class="stage">
    <h3>Part A</h3>
    <p>Python 与课堂约定</p>
  </div>
  <div class="stage">
    <h3>Part B</h3>
    <p>数据结构与算法的基本视角</p>
  </div>
  <div class="stage">
    <h3>Part C</h3>
    <p>复杂度分析与手推</p>
  </div>
  <div class="stage">
    <h3>Part D</h3>
    <p>线性表与顺序表</p>
  </div>
</div>

---
layout: section
---

# 知识梳理 · Python 与建模

---

# 课堂里最常出现的 Python 组件

<table class="mini-table tiny">
  <thead>
    <tr>
      <th>对象</th>
      <th>关键词</th>
      <th>这门课里最常干什么</th>
      <th>注意点</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="mono">list</span></td>
      <td>有序、可变</td>
      <td>顺序表、栈、队列、邻接表容器</td>
      <td>中间插删会搬移元素</td>
    </tr>
    <tr>
      <td><span class="mono">str</span></td>
      <td>有序、不可变</td>
      <td>模式匹配、切片、遍历字符</td>
      <td>KMP 题常与下标一起考</td>
    </tr>
    <tr>
      <td><span class="mono">dict</span></td>
      <td>键值映射</td>
      <td>计数、索引、散列思想预热</td>
      <td>后面学字典与检索时再回看</td>
    </tr>
    <tr>
      <td><span class="mono">function</span></td>
      <td>封装操作</td>
      <td>把“增删查改”写成统一接口</td>
      <td>ADT 常以函数/类形式表达</td>
    </tr>
  </tbody>
</table>

<div class="key-point tiny" style="margin-top:0.9rem">
我们学 Python 不是为了语言本身，而是为了低阻力地表达数据结构操作。
</div>

---

# 数据结构三要素

<div class="grid-3 tiny">
  <div class="card">
    <h3>逻辑结构</h3>
    <p>元素和元素之间是什么关系。</p>
    <p>线性、树形、图形是这一层的概念。</p>
  </div>
  <div class="card">
    <h3>存储结构</h3>
    <p>这些关系怎样落到内存中。</p>
    <p>顺序存储、链式存储是这一层的概念。</p>
  </div>
  <div class="card">
    <h3>数据运算</h3>
    <p>对结构允许做哪些操作。</p>
    <p>插入、删除、检索、更新都属于这一层。</p>
  </div>
</div>

---

# ADT 不是实现，线性表也不是数组

<div class="compare tiny">
  <div class="card">
    <h3>抽象数据类型 ADT</h3>
    <ul>
      <li>关心“有什么数据、允许做什么操作”</li>
      <li>不强制你用数组还是链表</li>
      <li>强调语义与接口</li>
    </ul>
  </div>
  <div class="card">
    <h3>具体实现</h3>
    <ul>
      <li>顺序表：连续存储，随机访问快</li>
      <li>链表：节点分散，插删局部更灵活</li>
      <li>同一个 ADT 可以有不同代价</li>
    </ul>
  </div>
</div>

<div class="danger tiny" style="margin-top:0.9rem">
考试里常见误区：把“线性表”直接说成“数组”。正确说法是：线性表是一种逻辑结构，数组式顺序表只是它的一种实现。
</div>

---

# 算法这件事，至少要回答 3 个问题

<div class="ops-grid tiny">
  <div class="card">
    <h3>问题是什么</h3>
    <p>输入、输出、约束条件说清楚了吗？</p>
  </div>
  <div class="card">
    <h3>步骤是什么</h3>
    <p>能不能写成有限、明确、可执行的过程？</p>
  </div>
  <div class="card">
    <h3>代价是什么</h3>
    <p>规模增大后，时间和空间怎么变化？</p>
  </div>
</div>

---
layout: section
---

# 知识梳理 · 复杂度

---

# 复杂度分析的 4 步动作

<div class="steps tiny">
  <div class="stage">
    <h3>看基本操作</h3>
    <p>最内层到底在重复什么。</p>
  </div>
  <div class="stage">
    <h3>数执行次数</h3>
    <p>循环跑多少次，递归分几层。</p>
  </div>
  <div class="stage">
    <h3>取主导项</h3>
    <p>忽略低阶项和常数。</p>
  </div>
  <div class="stage">
    <h3>写清条件</h3>
    <p>最好 / 最坏 / 平均不要混。</p>
  </div>
</div>

---

# 复杂度例 1：双层循环

```python
cnt = 0
for i in range(n):
    for j in range(i, n):
        cnt += 1
```

<table class="trace-table tiny" style="margin-top:0.8rem">
  <thead>
    <tr>
      <th>观察点</th>
      <th>结论</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>外层有几轮</td>
      <td><span class="mono">n</span> 轮</td>
    </tr>
    <tr>
      <td>第 <span class="mono">i</span> 轮内层次数</td>
      <td><span class="mono">n - i</span></td>
    </tr>
    <tr>
      <td>总次数</td>
      <td><span class="mono">n + (n-1) + ... + 1 = n(n+1)/2</span></td>
    </tr>
    <tr>
      <td>时间复杂度</td>
      <td><b>O(n^2)</b></td>
    </tr>
  </tbody>
</table>

---

# 复杂度例 2：对数型循环

```python
def f(n):
    s = 0
    for _ in range(n):
        j = 1
        while j < n:
            s += 1
            j *= 2
    return s
```

<div class="grid-2 tiny" style="margin-top:0.8rem">
  <div class="card">
    <h3>内层为什么是 log n</h3>
    <p><span class="mono">j</span> 每轮翻倍：1, 2, 4, 8, ...</p>
    <p>翻到接近 <span class="mono">n</span> 需要约 <span class="mono">log2(n)</span> 轮。</p>
  </div>
  <div class="key-point">
    <h3>总复杂度</h3>
    <p>外层 <span class="mono">n</span> 次 × 内层 <span class="mono">log n</span> 次</p>
    <p><b>O(n log n)</b></p>
  </div>
</div>

---

# 常见复杂度要形成直觉顺序

<table class="mini-table tiny">
  <thead>
    <tr>
      <th>量级</th>
      <th>典型来源</th>
      <th>脑中画面</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="mono">O(1)</span></td>
      <td>直接访问、固定次数操作</td>
      <td>一步到位</td>
    </tr>
    <tr>
      <td><span class="mono">O(log n)</span></td>
      <td>折半、翻倍、二分</td>
      <td>每次砍掉一大半</td>
    </tr>
    <tr>
      <td><span class="mono">O(n)</span></td>
      <td>单次遍历</td>
      <td>整列扫一遍</td>
    </tr>
    <tr>
      <td><span class="mono">O(n log n)</span></td>
      <td>外层遍历 + 内层对数，或分治</td>
      <td>扫描很多次，但每次很快</td>
    </tr>
    <tr>
      <td><span class="mono">O(n^2)</span></td>
      <td>双层嵌套、两两比较</td>
      <td>小规模能做，大规模就慢</td>
    </tr>
  </tbody>
</table>

---
layout: section
---

# 知识梳理 · 线性表与顺序表

---

# 线性表：先看关系，再看存储

<div class="compare tiny">
  <div class="card">
    <h3>线性表作为逻辑结构</h3>
    <ul>
      <li>元素一对一排成序列</li>
      <li>除首尾外，每个元素恰有一个前驱和一个后继</li>
      <li>典型操作：查、插、删、改</li>
    </ul>
  </div>
  <div class="card">
    <h3>顺序表作为实现</h3>
    <ul>
      <li>元素放在连续存储单元</li>
      <li>按下标访问快</li>
      <li>中间插删会产生搬移成本</li>
    </ul>
  </div>
</div>

---

# 顺序表插入：为什么中间位置最贵

<div class="card tiny">
  例：把 <span class="mono">99</span> 插到下标 <span class="mono">2</span>，原表是 <span class="mono">[10, 20, 30, 40]</span>。
</div>

<div class="grid-2 tiny" style="margin-top:0.9rem">
  <div class="mini">
    <h3>插入前</h3>
    <div class="seq">
      <span class="slot">10</span>
      <span class="slot">20</span>
      <span class="slot hot">30</span>
      <span class="slot">40</span>
      <span class="slot ghost">_</span>
    </div>
  </div>
  <div class="mini">
    <h3>从后往前搬移</h3>
    <div class="seq">
      <span class="slot">10</span>
      <span class="slot">20</span>
      <span class="slot hot">30</span>
      <span class="arrow">→</span>
      <span class="slot">30</span>
      <span class="slot">40</span>
    </div>
  </div>
  <div class="mini">
    <h3>继续搬移</h3>
    <div class="seq">
      <span class="slot">10</span>
      <span class="slot">20</span>
      <span class="arrow">→</span>
      <span class="slot">20</span>
      <span class="slot">30</span>
      <span class="slot">40</span>
    </div>
  </div>
  <div class="key-point">
    <h3>插入后</h3>
    <div class="seq">
      <span class="slot">10</span>
      <span class="slot">20</span>
      <span class="slot hot">99</span>
      <span class="slot">30</span>
      <span class="slot">40</span>
    </div>
  </div>
</div>

<div class="danger tiny" style="margin-top:0.9rem">
如果没有空位，顺序表还可能先扩容；但考试里更常问的是元素搬移代价。
</div>

---

# 删除也一样，本质仍是“补空位”

<div class="grid-2 tiny">
  <div class="card">
    <h3>删除下标 1 的元素</h3>
    <div class="seq" style="margin-top:0.7rem">
      <span class="slot">10</span>
      <span class="slot hot">20</span>
      <span class="slot">30</span>
      <span class="slot">40</span>
    </div>
  </div>
  <div class="key-point">
    <h3>后继向前补位</h3>
    <div class="seq" style="margin-top:0.7rem">
      <span class="slot">10</span>
      <span class="slot">30</span>
      <span class="slot">40</span>
      <span class="slot ghost">_</span>
    </div>
  </div>
</div>

<table class="mini-table tiny" style="margin-top:0.9rem">
  <thead>
    <tr>
      <th>操作</th>
      <th>最好情况</th>
      <th>最坏情况</th>
      <th>为什么</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>按下标访问</td>
      <td>O(1)</td>
      <td>O(1)</td>
      <td>地址可直接计算</td>
    </tr>
    <tr>
      <td>尾部插入</td>
      <td>O(1)</td>
      <td>O(1)</td>
      <td>有空位时无需搬移</td>
    </tr>
    <tr>
      <td>中间插入 / 删除</td>
      <td>O(1)</td>
      <td>O(n)</td>
      <td>可能搬移大量元素</td>
    </tr>
  </tbody>
</table>

---

# 代码页：顺序表插入的核心模板

```python
def insert(seq, i, x):
    if i < 0 or i > len(seq):
        raise IndexError("illegal index")
    seq.append(None)          # 先腾出一个位置
    j = len(seq) - 1
    while j > i:
        seq[j] = seq[j - 1]   # 从后往前搬移
        j -= 1
    seq[i] = x
```

<div class="key-point tiny" style="margin-top:0.8rem">
真正重要的不是背代码，而是理解“为什么一定要从后往前搬”。如果从前往后搬，原数据会被覆盖。
</div>

---

# 顺序表 vs 链式存储：第一眼怎么选

<div class="compare tiny">
  <div class="card">
    <h3>更偏向顺序表</h3>
    <ul>
      <li>读多写少</li>
      <li>经常按下标访问</li>
      <li>需要缓存友好、实现简单</li>
    </ul>
  </div>
  <div class="card">
    <h3>更偏向链表</h3>
    <ul>
      <li>频繁局部插删</li>
      <li>元素位置不固定</li>
      <li>愿意接受访问慢、指针复杂</li>
    </ul>
  </div>
</div>

<div class="quote tiny" style="margin-top:0.9rem">
这不是“谁更高级”的问题，而是“代价能否和题目要求对齐”的问题。
</div>

---
layout: section
---

# 典型例题

---

# 例 1：复杂度别只看循环层数

<div class="card tiny">
  题目：分析下面代码的时间复杂度。
</div>

```python
for i in range(n):
    k = n
    while k > 0:
        k //= 2
```

<div class="grid-2 tiny" style="margin-top:0.8rem">
  <div class="card">
    <h3>容易错的想法</h3>
    <p>“两个循环，所以是 O(n^2)”</p>
  </div>
  <div class="key-point">
    <h3>正确结论</h3>
    <p>外层 O(n)，内层 O(log n)，总复杂度 <b>O(n log n)</b></p>
  </div>
</div>

---

# 例 2：什么时候顺序表适合这道题

<div class="grid-2 tiny">
  <div class="card">
    <h3>场景 A</h3>
    <p>频繁查询第 <span class="mono">i</span> 个元素，并偶尔尾插。</p>
    <p><b>选顺序表。</b></p>
  </div>
  <div class="card">
    <h3>场景 B</h3>
    <p>频繁在表头或中间插入、删除。</p>
    <p><b>顺序表可能不优。</b></p>
  </div>
</div>

---

# 例 3：插入代价到底看什么

<div class="card tiny">
  题目：向长度为 <span class="mono">n</span> 的顺序表中第 <span class="mono">i</span> 个位置插入元素，时间复杂度是多少？
</div>

<div class="grid-2 tiny" style="margin-top:0.9rem">
  <div class="card">
    <h3>核心观察</h3>
    <p>需要搬移的元素个数约为 <span class="mono">n - i</span>。</p>
  </div>
  <div class="key-point">
    <h3>结论</h3>
    <p>最好 O(1)，最坏 O(n)，等概率平均仍是 O(n)。</p>
  </div>
</div>

---
layout: section
---

# 课堂练习

---

# 课堂练习：先自己判断，再讨论

<div class="grid-3 tiny">
  <div class="card">
    <h3>练习 1</h3>
    <p>分析下面代码是 <span class="mono">O(n)</span>、<span class="mono">O(n log n)</span> 还是 <span class="mono">O(n^2)</span>。</p>
  </div>
  <div class="card">
    <h3>练习 2</h3>
    <p>画出顺序表在下标 0 删除元素时的搬移过程。</p>
  </div>
  <div class="card">
    <h3>练习 3</h3>
    <p>判断“线性表 = 顺序表”这句话为什么错。</p>
  </div>
</div>

```python
for i in range(n):
    for j in range(1, n, 2):
        pass
```

---
layout: section
---

# 课后题

---

# 课后题按 3 档做

<div class="grid-3 tiny">
  <div class="card">
    <h3>A 档：必做</h3>
    <ul>
      <li>整理常见复杂度量级</li>
      <li>会解释 ADT / 顺序表 / 链表</li>
    </ul>
  </div>
  <div class="card">
    <h3>B 档：提分</h3>
    <ul>
      <li>自己手写顺序表插入删除</li>
      <li>能说清最好、最坏、平均代价</li>
    </ul>
  </div>
  <div class="card">
    <h3>C 档：预习</h3>
    <ul>
      <li>思考链表为什么访问慢</li>
      <li>预习字符串、栈、队列题型</li>
    </ul>
  </div>
</div>

---

# 高频易错点

<div class="grid-2 tiny">
  <div class="danger">
    <h3>误区 1</h3>
    <p>把“两个循环”直接看成 <span class="mono">O(n^2)</span>，忽略内层可能是对数级。</p>
  </div>
  <div class="danger">
    <h3>误区 2</h3>
    <p>把逻辑结构和存储结构混成一层。</p>
  </div>
  <div class="danger">
    <h3>误区 3</h3>
    <p>顺序表插入时从前往后搬，结果把数据覆盖掉。</p>
  </div>
  <div class="danger">
    <h3>误区 4</h3>
    <p>只写复杂度结论，不写为什么。</p>
  </div>
</div>

---

# 一页带走

<div class="grid-2 tiny">
  <div class="key-point">
    <h3>今天建立的 4 个关键词</h3>
    <ul>
      <li>ADT</li>
      <li>逻辑结构 / 存储结构</li>
      <li>时间 / 空间复杂度</li>
      <li>顺序表的访问与搬移</li>
    </ul>
  </div>
  <div class="card">
    <h3>下一讲要接什么</h3>
    <ul>
      <li>链表：把“连续存储”换成“指针连接”</li>
      <li>字符串：开始进入模式匹配</li>
      <li>栈 / 队列：线性结构的受限操作版本</li>
    </ul>
  </div>
</div>

<div class="quote tiny" style="margin-top:0.9rem">
如果第一讲只记住一句话，那就是：<b>所有数据结构题，都可以从“结构是什么、操作是什么、代价是什么”三个问题切入。</b>
</div>
