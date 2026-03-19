---
theme: seriph
title: Lecture 03 · 排序、树与检索
info: 数据结构与算法 B 小班课
class: text-center
mdc: true
---

<style>
:root {
  --ds-ink: #1f2937;
  --ds-muted: #5b6472;
  --ds-accent: #b45309;
  --ds-accent-soft: #fff5e8;
  --ds-line: #d7dde5;
  --ds-good: #14532d;
  --ds-warn: #991b1b;
}

.slidev-layout {
  color: var(--ds-ink);
}

h1, h2, h3 {
  letter-spacing: 0.01em;
}

p, li {
  color: var(--ds-muted);
}

.grid-2,
.grid-3,
.compare,
.steps,
.tree-grid,
.exercise-grid {
  display: grid;
  gap: 0.9rem;
}

.grid-2,
.compare,
.tree-grid,
.exercise-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card,
.key-point,
.danger,
.mini,
.stage {
  border: 1px solid var(--ds-line);
  border-radius: 16px;
  padding: 0.8rem 0.95rem;
  background: rgba(255, 255, 255, 0.82);
}

.card h3,
.mini h3,
.stage h3 {
  margin-top: 0;
  margin-bottom: 0.35rem;
}

.key-point {
  background: var(--ds-accent-soft);
}

.danger {
  border-color: rgba(153, 27, 27, 0.22);
  background: rgba(254, 242, 242, 0.95);
}

.tiny {
  font-size: 0.82rem;
}

.micro {
  font-size: 0.74rem;
}

.big-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--ds-accent);
}

.pill-row {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.pill {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(180, 83, 9, 0.12);
  color: var(--ds-accent);
  font-size: 0.76rem;
  font-weight: 700;
}

.steps {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stage {
  position: relative;
}

.stage::after {
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

.sort-table,
.trace-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.sort-table th,
.sort-table td,
.trace-table th,
.trace-table td {
  border: 1px solid var(--ds-line);
  padding: 0.45rem 0.55rem;
  text-align: left;
}

.sort-table th,
.trace-table th {
  background: rgba(241, 245, 249, 0.9);
  color: var(--ds-ink);
}

.tree-box {
  font-family: "SFMono-Regular", "Menlo", monospace;
  white-space: pre;
  font-size: 0.86rem;
  line-height: 1.32;
  color: var(--ds-ink);
}

.summary-list {
  margin: 0;
  padding-left: 1.1rem;
}

.summary-list li {
  margin: 0.28rem 0;
}

.quote {
  border-left: 4px solid rgba(180, 83, 9, 0.4);
  padding-left: 0.8rem;
  color: var(--ds-ink);
}
</style>

# Lecture 03

## 排序、树与检索

<div class="pill-row" style="justify-content:center;margin-top:1rem">
  <span class="pill">算法全景</span>
  <span class="pill">结构对比</span>
  <span class="pill">手推过程</span>
  <span class="pill">考题识别</span>
</div>

---
layout: section
---

# 开场地图

---

# 这一讲到底在解决什么

<div class="grid-2">
  <div class="key-point">
    <div class="big-number">1</div>
    <h3>排序</h3>
    <p>把“乱”变成“有序”，比较策略与代价。</p>
  </div>
  <div class="key-point">
    <div class="big-number">2</div>
    <h3>树</h3>
    <p>把“线性”升级成“层次”，遍历是核心语言。</p>
  </div>
  <div class="key-point">
    <div class="big-number">3</div>
    <h3>检索</h3>
    <p>把“找得到”升级成“找得快”。</p>
  </div>
  <div class="key-point">
    <div class="big-number">4</div>
    <h3>选型</h3>
    <p>题目常问的不是定义，而是为什么用它。</p>
  </div>
</div>

<div class="quote tiny" style="margin-top:0.9rem">
  这讲内容多，但考试抓的是地图感：先分问题类型，再套结构与算法。
</div>

---

# 本讲结构

<div class="steps tiny">
  <div class="stage">
    <h3>Part A</h3>
    <p>排序的思想、复杂度、稳定性</p>
  </div>
  <div class="stage">
    <h3>Part B</h3>
    <p>二叉树、遍历、堆</p>
  </div>
  <div class="stage">
    <h3>Part C</h3>
    <p>Huffman、BST、树森林转换</p>
  </div>
  <div class="stage">
    <h3>Part D</h3>
    <p>字典、检索、结构选型</p>
  </div>
</div>

---
layout: section
---

# 知识梳理 · 排序

---

# 排序先抓 4 个问题

<div class="grid-2 tiny">
  <div class="card">
    <h3>思想</h3>
    <p>插入、选择、交换、归并、堆排序。</p>
  </div>
  <div class="card">
    <h3>过程</h3>
    <p>能手推 2 到 3 轮，知道每轮在做什么。</p>
  </div>
  <div class="card">
    <h3>代价</h3>
    <p>时间复杂度、空间复杂度、最坏还是平均。</p>
  </div>
  <div class="card">
    <h3>性质</h3>
    <p>稳定性、是否原地、是否适合近乎有序数据。</p>
  </div>
</div>

---

# 常见排序算法比较

<table class="sort-table micro">
  <thead>
    <tr>
      <th>算法</th>
      <th>核心动作</th>
      <th>平均时间</th>
      <th>稳定性</th>
      <th>适合场景</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>插入排序</td>
      <td>把新元素插入前缀有序区</td>
      <td>O(n²)</td>
      <td>稳定</td>
      <td>小规模、近乎有序</td>
    </tr>
    <tr>
      <td>选择排序</td>
      <td>每轮选最小值放前面</td>
      <td>O(n²)</td>
      <td>不稳定</td>
      <td>交换次数要少</td>
    </tr>
    <tr>
      <td>冒泡排序</td>
      <td>逆序对逐步冒走</td>
      <td>O(n²)</td>
      <td>稳定</td>
      <td>教学手推、逆序理解</td>
    </tr>
    <tr>
      <td>归并排序</td>
      <td>分治后合并两个有序段</td>
      <td>O(n log n)</td>
      <td>稳定</td>
      <td>稳定排序、链表也友好</td>
    </tr>
    <tr>
      <td>快速排序</td>
      <td>按枢轴分区</td>
      <td>O(n log n)</td>
      <td>不稳定</td>
      <td>平均性能强、原地感强</td>
    </tr>
    <tr>
      <td>堆排序</td>
      <td>维护大根堆/小根堆</td>
      <td>O(n log n)</td>
      <td>不稳定</td>
      <td>空间小、适合 top-k 思路</td>
    </tr>
  </tbody>
</table>

---

# 题目里怎么选排序

<div class="compare tiny">
  <div class="card">
    <h3>几乎有序</h3>
    <p><strong>插入排序</strong> 往往很顺手。</p>
    <p>每次只移动少量元素。</p>
  </div>
  <div class="card">
    <h3>要求稳定</h3>
    <p>优先想 <strong>插入 / 归并</strong>。</p>
    <p>快排、堆排先排除。</p>
  </div>
  <div class="card">
    <h3>平均性能优先</h3>
    <p><strong>快速排序</strong> 常是默认答案。</p>
    <p>但别忘最坏退化到 O(n²)。</p>
  </div>
  <div class="card">
    <h3>空间更紧</h3>
    <p><strong>堆排序</strong> 比归并更稳妥。</p>
    <p>代价是过程不稳定。</p>
  </div>
</div>

---

# 例：插入排序在做什么

<div class="steps micro">
  <div class="stage">
    <h3>初始</h3>
    <p>[ 8, 3, 6, 2, 7 ]</p>
    <p>默认 `8` 已有序</p>
  </div>
  <div class="stage">
    <h3>插入 3</h3>
    <p>[ 3, 8, 6, 2, 7 ]</p>
    <p>向前找位置</p>
  </div>
  <div class="stage">
    <h3>插入 6</h3>
    <p>[ 3, 6, 8, 2, 7 ]</p>
    <p>前缀继续扩张</p>
  </div>
  <div class="stage">
    <h3>核心观察</h3>
    <p>第 i 轮后，前 i 个元素有序</p>
  </div>
</div>

<div class="key-point tiny" style="margin-top:0.9rem">
  考试常问：写出某一轮结果，或者判断“循环不变式”是什么。
</div>

---
layout: section
---

# 知识梳理 · 二叉树

---

# 二叉树的地图

<div class="tree-grid tiny">
  <div class="card">
    <h3>基本概念</h3>
    <ul class="summary-list">
      <li>根、父子、兄弟、叶结点</li>
      <li>度、层次、高度、深度</li>
      <li>空树也是合法对象</li>
    </ul>
  </div>
  <div class="card">
    <h3>二叉树特别之处</h3>
    <ul class="summary-list">
      <li>左子树和右子树有顺序</li>
      <li>不是“度最多为 2 的普通树”</li>
      <li>只有一棵子树也要区分左右</li>
    </ul>
  </div>
</div>

<div class="key-point tiny" style="margin-top:0.9rem">
  只要题目出现“层次关系 + 左右区分”，大概率应该想到树或二叉树。
</div>

---

# 遍历是树题的语言

<div class="grid-2 tiny">
  <div class="card">
    <h3>先序</h3>
    <p>根 → 左 → 右</p>
    <p>适合“先看到根”的构造问题。</p>
  </div>
  <div class="card">
    <h3>中序</h3>
    <p>左 → 根 → 右</p>
    <p>BST 的中序结果天然有序。</p>
  </div>
  <div class="card">
    <h3>后序</h3>
    <p>左 → 右 → 根</p>
    <p>适合“先处理子树再归并”。</p>
  </div>
  <div class="card">
    <h3>层次</h3>
    <p>按层从上到下、从左到右。</p>
    <p>本质是队列在工作。</p>
  </div>
</div>

---

# 手推一棵树的遍历

<div class="grid-2">
  <div class="card">
    <div class="tree-box">        A
      /   \
     B     C
    / \     \
   D   E     F</div>
  </div>
  <div class="card tiny">
    <ul class="summary-list">
      <li>先序：A B D E C F</li>
      <li>中序：D B E A C F</li>
      <li>后序：D E B F C A</li>
      <li>层次：A B C D E F</li>
    </ul>
  </div>
</div>

<div class="danger tiny" style="margin-top:0.9rem">
  易错点：层次遍历不是 DFS；中序不是“根在中间位置”，而是“根在左右子树之间被访问”。
</div>

---

# 典型题：由先序 + 中序还原二叉树

<div class="steps micro">
  <div class="stage">
    <h3>已知</h3>
    <p>先序：A B D E C F</p>
    <p>中序：D B E A C F</p>
  </div>
  <div class="stage">
    <h3>找根</h3>
    <p>先序首元素 `A` 是根</p>
    <p>中序按 `A` 切左右</p>
  </div>
  <div class="stage">
    <h3>递归切分</h3>
    <p>左：B D E / D B E</p>
    <p>右：C F / C F</p>
  </div>
  <div class="stage">
    <h3>结论</h3>
    <p>根由先序给出</p>
    <p>左右边界由中序给出</p>
  </div>
</div>

---

# 一个遍历代码就够理解递归

```python
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)
```

<div class="key-point tiny" style="margin-top:0.7rem">
  递归遍历的结构固定：空树是边界，左右子树是子问题，当前结点是“访问时机”。
</div>

---

# 完全二叉树与堆

<div class="compare tiny">
  <div class="card">
    <h3>完全二叉树</h3>
    <p>除了最后一层，其余层全满。</p>
    <p>最后一层从左到右连续。</p>
  </div>
  <div class="card">
    <h3>堆</h3>
    <p>形状是完全二叉树。</p>
    <p>再加“父结点 ≥ 子结点”或相反。</p>
  </div>
</div>

<div class="grid-2 tiny" style="margin-top:0.9rem">
  <div class="mini">
    <h3>数组下标很自然</h3>
    <p>若根在 `1`，则左子为 `2i`，右子为 `2i+1`。</p>
  </div>
  <div class="mini">
    <h3>考试高频</h3>
    <p>建堆、调整堆、堆排序过程、top-k 思路。</p>
  </div>
</div>

---
layout: section
---

# 知识梳理 · Huffman / BST / 树森林

---

# Huffman 树抓住 2 个关键词

<div class="grid-2 tiny">
  <div class="card">
    <h3>目标</h3>
    <p>让带权外部路径长度最小。</p>
    <p>高频字符路径更短。</p>
  </div>
  <div class="card">
    <h3>方法</h3>
    <p>每次取权值最小的两棵树合并。</p>
    <p>反复直到只剩一棵树。</p>
  </div>
</div>

---

# Huffman 构造示例

<table class="trace-table micro">
  <thead>
    <tr>
      <th>字符</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>频率</td>
      <td>5</td>
      <td>9</td>
      <td>12</td>
      <td>13</td>
    </tr>
  </tbody>
</table>

<div class="steps micro" style="margin-top:0.8rem">
  <div class="stage">
    <h3>第 1 次</h3>
    <p>5 + 9 → 14</p>
  </div>
  <div class="stage">
    <h3>第 2 次</h3>
    <p>12 + 13 → 25</p>
  </div>
  <div class="stage">
    <h3>第 3 次</h3>
    <p>14 + 25 → 39</p>
  </div>
  <div class="stage">
    <h3>结论</h3>
    <p>频率越高，编码越短</p>
  </div>
</div>

<div class="key-point tiny" style="margin-top:0.8rem">
  Huffman 题常考“合并顺序”和“编码长度”，不是要你死背具体 0/1 方向。
</div>

---

# BST 的价值

<div class="compare tiny">
  <div class="card">
    <h3>定义</h3>
    <p>左子树关键码小，右子树关键码大。</p>
  </div>
  <div class="card">
    <h3>直接结论</h3>
    <p>中序遍历结果一定递增。</p>
  </div>
  <div class="card">
    <h3>检索思路</h3>
    <p>每一步只向一侧走，像二分但在树上。</p>
  </div>
  <div class="card">
    <h3>风险</h3>
    <p>若退化成链，性能降到 O(n)。</p>
  </div>
</div>

---

# BST 删除只分 3 类

<div class="grid-3 tiny">
  <div class="card">
    <h3>叶结点</h3>
    <p>直接删。</p>
  </div>
  <div class="card">
    <h3>只有一个孩子</h3>
    <p>让孩子顶上来。</p>
  </div>
  <div class="card">
    <h3>两个孩子</h3>
    <p>用前驱或后继替换，再删对应结点。</p>
  </div>
</div>

<div class="danger tiny" style="margin-top:0.8rem">
  易错点：删“值”不是删“结点本身”那么简单，连接关系必须保持 BST 性质。
</div>

---

# 树与森林如何转成二叉树

<div class="grid-2 tiny">
  <div class="card">
    <h3>规则</h3>
    <ul class="summary-list">
      <li>第一个孩子变左孩子</li>
      <li>下一个兄弟变右孩子</li>
      <li>整片森林从左到右串起来</li>
    </ul>
  </div>
  <div class="card">
    <h3>意义</h3>
    <p>把一般树的多叉结构，映射成二叉树处理。</p>
    <p>很多遍历与存储技巧因此统一。</p>
  </div>
</div>

---
layout: section
---

# 知识梳理 · 字典与检索

---

# “找得快”有哪些代表结构

<table class="sort-table micro">
  <thead>
    <tr>
      <th>结构</th>
      <th>前提</th>
      <th>检索代价</th>
      <th>适合</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>顺序检索</td>
      <td>无序也能用</td>
      <td>O(n)</td>
      <td>数据少、一次性查询</td>
    </tr>
    <tr>
      <td>二分检索</td>
      <td>顺序表 + 已排序</td>
      <td>O(log n)</td>
      <td>静态字典</td>
    </tr>
    <tr>
      <td>BST</td>
      <td>动态插删</td>
      <td>平均 O(log n)</td>
      <td>有序检索、范围感</td>
    </tr>
    <tr>
      <td>散列表</td>
      <td>设计好散列函数</td>
      <td>平均 O(1)</td>
      <td>精确匹配、高频查询</td>
    </tr>
  </tbody>
</table>

---

# 什么时候用哪一个

<div class="exercise-grid tiny">
  <div class="key-point">
    <h3>数据静态 + 已排序</h3>
    <p>二分检索最直接。</p>
  </div>
  <div class="key-point">
    <h3>频繁精确查询</h3>
    <p>优先散列表。</p>
  </div>
  <div class="key-point">
    <h3>既想查也想保持有序</h3>
    <p>BST 思路更自然。</p>
  </div>
  <div class="key-point">
    <h3>规模很小</h3>
    <p>顺序检索足够，别过度设计。</p>
  </div>
</div>

---

# 常见误区总表

<div class="grid-2 tiny">
  <div class="danger">
    <h3>排序</h3>
    <ul class="summary-list">
      <li>把“平均快”误写成“最坏也快”</li>
      <li>忘了稳定性只看相等关键码</li>
      <li>只背名字，不会手推一轮</li>
    </ul>
  </div>
  <div class="danger">
    <h3>树与检索</h3>
    <ul class="summary-list">
      <li>把普通树和二叉树混为一谈</li>
      <li>遍历顺序背对了，代码就全错</li>
      <li>把 BST 和堆的性质混用</li>
    </ul>
  </div>
</div>

---
layout: section
---

# 典型例题

---

# 例 1：排序题怎么答才像样

<div class="card tiny">
  <h3>题目</h3>
  <p>“在稳定排序中选一个平均性能较好的算法，并说明理由。”</p>
</div>

<div class="steps micro" style="margin-top:0.8rem">
  <div class="stage">
    <h3>先筛性质</h3>
    <p>稳定</p>
  </div>
  <div class="stage">
    <h3>再看复杂度</h3>
    <p>O(n log n)</p>
  </div>
  <div class="stage">
    <h3>剩下谁</h3>
    <p>归并排序</p>
  </div>
  <div class="stage">
    <h3>补一句</h3>
    <p>代价是额外空间</p>
  </div>
</div>

---

# 例 2：遍历重建的答题模板

<div class="grid-2 tiny">
  <div class="card">
    <h3>固定句式</h3>
    <ul class="summary-list">
      <li>先序首元素是根</li>
      <li>中序定位根，切出左右子树</li>
      <li>对子树递归重复</li>
    </ul>
  </div>
  <div class="card">
    <h3>阅卷点</h3>
    <ul class="summary-list">
      <li>切分边界是否正确</li>
      <li>左右子树长度是否一致</li>
      <li>最终遍历是否能自检</li>
    </ul>
  </div>
</div>

---

# 例 3：BST、堆、散列表怎么区分

<div class="compare tiny">
  <div class="card">
    <h3>BST</h3>
    <p>保有序，适合范围与动态查找。</p>
  </div>
  <div class="card">
    <h3>堆</h3>
    <p>只保证极值，适合优先队列。</p>
  </div>
  <div class="card">
    <h3>散列表</h3>
    <p>平均查得最快，但不保序。</p>
  </div>
  <div class="card">
    <h3>核心问法</h3>
    <p>题目要“有序”还是只要“快”。</p>
  </div>
</div>

---
layout: section
---

# 课堂练习

---

# 课堂练习

<div class="exercise-grid tiny">
  <div class="card">
    <h3>练习 1</h3>
    <p>把 6 个排序算法按稳定 / 不稳定分组。</p>
  </div>
  <div class="card">
    <h3>练习 2</h3>
    <p>手推给定二叉树的四种遍历序列。</p>
  </div>
  <div class="card">
    <h3>练习 3</h3>
    <p>给出字符频率，写出 Huffman 合并次序。</p>
  </div>
  <div class="card">
    <h3>练习 4</h3>
    <p>判断题：BST、堆、散列表谁能直接做范围查询？</p>
  </div>
</div>

---
layout: section
---

# 课后题

---

# 课后题建议

<div class="grid-3 tiny">
  <div class="card">
    <h3>基础</h3>
    <p>整理排序算法比较表，自己默写一遍。</p>
  </div>
  <div class="card">
    <h3>核心</h3>
    <p>完成 2 道遍历重建题，做到不看答案。</p>
  </div>
  <div class="card">
    <h3>提高</h3>
    <p>比较 BST 与散列表在动态字典中的利弊。</p>
  </div>
</div>

---

# Takeaway Checklist

<div class="grid-2 tiny">
  <div class="key-point">
    <ul class="summary-list">
      <li>会用四个维度比较排序算法</li>
      <li>会手推二叉树四种遍历</li>
      <li>会从先序 + 中序恢复结构</li>
    </ul>
  </div>
  <div class="key-point">
    <ul class="summary-list">
      <li>知道堆、BST、Huffman 各做什么</li>
      <li>知道树森林转换的规则</li>
      <li>知道检索结构的选型逻辑</li>
    </ul>
  </div>
</div>

<div class="quote tiny" style="margin-top:0.95rem">
  如果这讲结束后你脑中只有一句话，那应该是：题目先分“排序 / 层次结构 / 检索”，再选对工具。
</div>
