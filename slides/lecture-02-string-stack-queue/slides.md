---
theme: seriph
title: Lecture 02 · 链表、串与线性结构应用
info: 数据结构与算法 B 小班课
class: text-center
mdc: true
---

# Lecture 02

## 链表、串与线性结构应用

<div class="key-point" style="margin-top: 1.2rem;">
  这一讲的核心不是“多背几个定义”，而是看清：
  <b>数据怎样流动，指针怎样改，失配以后怎样少回头。</b>
</div>

---

<style>
:root {
  --deck-ink: #18222e;
  --deck-muted: #5b6877;
  --deck-accent: #b94f2a;
  --deck-soft: #f6efe6;
  --deck-soft-2: #fffaf4;
  --deck-line: rgba(24, 34, 46, 0.12);
  --deck-green: #346b52;
  --deck-gold: #8d6a1a;
}

.slidev-layout {
  color: var(--deck-ink);
}

h1, h2, h3 {
  letter-spacing: 0.01em;
}

.muted {
  color: var(--deck-muted);
}

.grid-2, .grid-3, .compare, .steps, .queue-row, .node-row {
  display: grid;
  gap: 0.9rem;
}

.grid-2, .compare, .steps {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card, .key-point, .danger, .mini {
  border: 1px solid var(--deck-line);
  border-radius: 18px;
  padding: 0.9rem 1rem;
  background: var(--deck-soft-2);
}

.card h3, .mini h3 {
  margin-top: 0;
  margin-bottom: 0.45rem;
}

.key-point {
  background: linear-gradient(135deg, rgba(185, 79, 42, 0.1), rgba(255, 250, 244, 0.95));
}

.danger {
  background: linear-gradient(135deg, rgba(185, 79, 42, 0.08), rgba(255, 244, 241, 0.95));
  border-color: rgba(185, 79, 42, 0.24);
}

.compare > div, .steps > div {
  border: 1px solid var(--deck-line);
  border-radius: 18px;
  padding: 0.9rem 1rem;
  background: white;
}

.eyebrow {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--deck-accent);
  font-weight: 700;
}

.pill {
  display: inline-block;
  padding: 0.18rem 0.52rem;
  border-radius: 999px;
  background: rgba(185, 79, 42, 0.1);
  color: var(--deck-accent);
  font-size: 0.8rem;
  font-weight: 700;
}

.node-row {
  grid-template-columns: 1.2fr repeat(4, 1fr);
  align-items: center;
  margin-top: 0.8rem;
}

.node-label, .node {
  border: 1px solid var(--deck-line);
  border-radius: 14px;
  padding: 0.55rem 0.6rem;
  background: white;
  text-align: center;
}

.node {
  display: flex;
  justify-content: space-between;
  gap: 0.35rem;
  font-size: 0.85rem;
}

.node b {
  color: var(--deck-accent);
}

.queue-row {
  grid-template-columns: repeat(5, 1fr);
  margin-top: 0.7rem;
}

.slot {
  border: 1px solid var(--deck-line);
  border-radius: 14px;
  padding: 0.6rem 0.2rem;
  background: white;
  text-align: center;
  min-height: 3rem;
}

.arrow {
  color: var(--deck-accent);
  font-weight: 700;
}

.tiny {
  font-size: 0.84rem;
}

.small {
  font-size: 0.92rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th, td {
  border: 1px solid var(--deck-line);
  padding: 0.55rem 0.65rem;
  text-align: left;
}

th {
  background: rgba(24, 34, 46, 0.06);
}

code {
  white-space: pre-wrap;
}
</style>

# Opening Map

<div class="grid-2">
  <div class="card">
    <div class="eyebrow">Part A</div>
    <h3>链表</h3>
    <ul class="small">
      <li>为什么“增删快”不是一句空话</li>
      <li>指针到底改哪两三处</li>
      <li>什么时候不该用链表</li>
    </ul>
  </div>
  <div class="card">
    <div class="eyebrow">Part B</div>
    <h3>串与匹配</h3>
    <ul class="small">
      <li>朴素匹配为什么会重复比较</li>
      <li>KMP 的 next 到底记住了什么</li>
      <li>手推过程如何不乱</li>
    </ul>
  </div>
  <div class="card">
    <div class="eyebrow">Part C</div>
    <h3>栈</h3>
    <ul class="small">
      <li>LIFO 的本质是“最近状态先返回”</li>
      <li>和递归、括号、表达式天然相关</li>
    </ul>
  </div>
  <div class="card">
    <div class="eyebrow">Part D</div>
    <h3>队列</h3>
    <ul class="small">
      <li>FIFO 适合调度、缓冲、层次扩展</li>
      <li>顺序队列与链式队列如何取舍</li>
    </ul>
  </div>
</div>

---
layout: section
---

# 一条主线

## 访问方式受限，就会长出新的数据结构

---

# 先做选择题

## 顺序存储 vs 链式存储

<div class="compare">
  <div>
    <div class="pill">顺序表</div>
    <ul class="small">
      <li>随机访问快：<code>a[i]</code> 直接到位</li>
      <li>插入删除常要整体搬家</li>
      <li>空间连续，缓存友好</li>
      <li>适合：查得多、改得少</li>
    </ul>
  </div>
  <div>
    <div class="pill">链表</div>
    <ul class="small">
      <li>定位靠遍历，访问第 <code>i</code> 个慢</li>
      <li>已知位置后改链很快</li>
      <li>空间不要求连续</li>
      <li>适合：频繁局部插删</li>
    </ul>
  </div>
</div>

<div class="key-point tiny" style="margin-top: 0.9rem;">
  判断题第一步：题目更在意 <b>按下标访问</b>，还是更在意 <b>在中间改结构</b>？
</div>

---

# 链表家族一图看清

<div class="grid-3">
  <div class="card">
    <h3>单链表</h3>
    <p class="small muted">每个结点只知道后继</p>
    <p class="tiny">省空间，操作最基础</p>
  </div>
  <div class="card">
    <h3>双链表</h3>
    <p class="small muted">同时知道前驱与后继</p>
    <p class="tiny">删除当前结点更自然</p>
  </div>
  <div class="card">
    <h3>循环链表</h3>
    <p class="small muted">尾结点连回头结点</p>
    <p class="tiny">轮转场景更顺手</p>
  </div>
</div>

<div class="node-row tiny">
  <div class="node-label"><b>单链表</b></div>
  <div class="node"><span>40</span><b>next</b></div>
  <div class="arrow">→</div>
  <div class="node"><span>17</span><b>next</b></div>
  <div class="node"><span>93</span><b>None</b></div>
</div>

<div class="node-row tiny">
  <div class="node-label"><b>双链表</b></div>
  <div class="node"><b>prev</b><span>40</span><b>next</b></div>
  <div class="arrow">⇄</div>
  <div class="node"><b>prev</b><span>17</span><b>next</b></div>
  <div class="node"><b>prev</b><span>93</span><b>next</b></div>
</div>

<div class="node-row tiny">
  <div class="node-label"><b>循环链表</b></div>
  <div class="node"><span>A</span><b>next</b></div>
  <div class="arrow">→</div>
  <div class="node"><span>B</span><b>next</b></div>
  <div class="node"><span>C ↺</span><b>head</b></div>
</div>

---

# 单链表真正要记住什么

<div class="steps">
  <div>
    <div class="pill">结构</div>
    <ul class="small">
      <li><code>data</code> 存值</li>
      <li><code>next</code> 指向后继</li>
      <li><code>head</code> 保存首结点引用</li>
    </ul>
  </div>
  <div>
    <div class="pill">遍历</div>
    <ul class="small">
      <li>从 <code>head</code> 出发</li>
      <li>每次只看当前结点与后继</li>
      <li>直到 <code>None</code> 结束</li>
    </ul>
  </div>
</div>

<div class="key-point small" style="margin-top: 0.8rem;">
  链表题最容易错的，不是“不会写循环”，而是 <b>没有先固定谁是当前、谁是前驱、谁是后继</b>。
</div>

---

# 指针改动可视化

## 在 `17` 后插入新结点 `50`

<div class="card tiny">
  插入前：<code>head → 12 → 17 → 23 → None</code>
</div>

<div class="compare" style="margin-top: 0.8rem;">
  <div>
    <div class="pill">错误直觉</div>
    <p class="small">先让 <code>17.next = new</code></p>
    <p class="tiny muted">原来的 <code>23</code> 可能丢失</p>
  </div>
  <div>
    <div class="pill">正确顺序</div>
    <ol class="small">
      <li><code>new.next = cur.next</code></li>
      <li><code>cur.next = new</code></li>
    </ol>
  </div>
</div>

<div class="card tiny" style="margin-top: 0.8rem;">
  插入后：<code>head → 12 → 17 → 50 → 23 → None</code>
</div>

---

# 删除结点也只有两步

## 删除 `17` 的后继 `23`

<div class="node-row tiny">
  <div class="node-label"><b>删除前</b></div>
  <div class="node"><span>12</span><b>next</b></div>
  <div class="node"><span>17</span><b>next</b></div>
  <div class="node"><span>23</span><b>next</b></div>
  <div class="node"><span>35</span><b>None</b></div>
</div>

<div class="key-point small" style="margin-top: 0.9rem;">
  核心一句：<code>cur.next = cur.next.next</code>
</div>

<div class="danger tiny" style="margin-top: 0.8rem;">
  删首结点是特例：如果没有哨兵结点，就要单独处理 <code>head = head.next</code>。
</div>

---

# 代码模板

```python
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

def insert_after(cur, value):
    node = Node(value)
    node.next = cur.next
    cur.next = node

def delete_after(cur):
    if cur is None or cur.next is None:
        return None
    removed = cur.next
    cur.next = removed.next
    return removed.data
```

<div class="mini tiny" style="margin-top: 0.8rem;">
  能解释这 6 行指针变化，比机械背一整页模板更重要。
</div>

---

# 什么时候该用链表

<table>
  <thead>
    <tr>
      <th>需求</th>
      <th>更合适</th>
      <th>原因</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>频繁按下标查第 k 个</td>
      <td>顺序表</td>
      <td>随机访问 O(1)</td>
    </tr>
    <tr>
      <td>经常在已知位置后插入</td>
      <td>链表</td>
      <td>改引用即可</td>
    </tr>
    <tr>
      <td>数据量变化很频繁</td>
      <td>链表偏优</td>
      <td>不要求连续空间</td>
    </tr>
    <tr>
      <td>追求缓存友好与批量扫描</td>
      <td>顺序表</td>
      <td>连续存储更稳定</td>
    </tr>
  </tbody>
</table>

---

# 链表常见失分点

<div class="grid-2">
  <div class="danger">
    <h3>空表没判</h3>
    <p class="tiny">直接访问 <code>head.next</code> 导致异常</p>
  </div>
  <div class="danger">
    <h3>改链顺序反了</h3>
    <p class="tiny">新结点还没接住后继，旧链先断了</p>
  </div>
  <div class="danger">
    <h3>首结点特判漏掉</h3>
    <p class="tiny">没有哨兵时最常见</p>
  </div>
  <div class="danger">
    <h3>遍历终止条件写错</h3>
    <p class="tiny">想删后继时，应检查 <code>cur.next</code></p>
  </div>
</div>

---
layout: section
---

# 串

## 本质上也是线性结构，只是元素变成字符

---

# 字符串要分清的三个词

<div class="grid-3">
  <div class="card">
    <h3>子串</h3>
    <p class="small">连续</p>
    <p class="tiny muted"><code>"algo"</code> 是 <code>"algorithm"</code> 的子串</p>
  </div>
  <div class="card">
    <h3>子序列</h3>
    <p class="small">保持相对顺序即可</p>
    <p class="tiny muted"><code>"agtm"</code> 是子序列但不是子串</p>
  </div>
  <div class="card">
    <h3>匹配</h3>
    <p class="small">在主串中找模式串第一次出现位置</p>
    <p class="tiny muted">找不到通常返回 <code>-1</code></p>
  </div>
</div>

<div class="mini tiny" style="margin-top: 0.8rem;">
  题目写“连续字符”时，默认是在问 <b>子串</b>，不是子序列。
</div>

---

# Python 中的字符串

<div class="compare">
  <div>
    <div class="pill">性质</div>
    <ul class="small">
      <li><code>str</code> 是不可变类型</li>
      <li>切片会生成新串</li>
      <li>拼接很多次会有额外代价</li>
    </ul>
  </div>
  <div>
    <div class="pill">常用操作</div>
    <ul class="small">
      <li><code>len(s)</code></li>
      <li><code>s[i]</code>, <code>s[a:b]</code></li>
      <li><code>"-".join(parts)</code></li>
      <li><code>s.find(p)</code></li>
    </ul>
  </div>
</div>

```python
s = "ababcabcacbab"
print(s[2:7])      # abcab
print("::".join(["K", "M", "P"]))
```

---

# 朴素匹配在做什么

<div class="card small">
  <b>主串</b> <code>T = ababcabcacbab</code><br>
  <b>模式</b> <code>P = abcac</code>
</div>

<div class="steps" style="margin-top: 0.8rem;">
  <div>
    <div class="pill">方法</div>
    <ol class="small">
      <li>对齐当前位置</li>
      <li>从模式串首字符开始比</li>
      <li>一旦失配，模式整体右移 1</li>
    </ol>
  </div>
  <div>
    <div class="pill">问题</div>
    <ul class="small">
      <li>主串字符会被反复比较</li>
      <li>已经知道的信息没有保留</li>
      <li>最坏复杂度 O(nm)</li>
    </ul>
  </div>
</div>

---

# 一次手推就能看出浪费

<div class="card tiny">
  <code>T = a b a b c a b c a c b a b</code><br>
  <code>P = a b c a c</code>
</div>

<table style="margin-top: 0.8rem;">
  <thead>
    <tr>
      <th>对齐起点</th>
      <th>比较结果</th>
      <th>失配位置</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td><code>ab</code> 成功，第三个字符失配</td>
      <td><code>T[2]</code> vs <code>P[2]</code></td>
    </tr>
    <tr>
      <td>1</td>
      <td>首字符直接失配</td>
      <td><code>T[1]</code> vs <code>P[0]</code></td>
    </tr>
    <tr>
      <td>2</td>
      <td>又重新比较前面见过的 <code>ab</code></td>
      <td>重复劳动</td>
    </tr>
  </tbody>
</table>

<div class="key-point tiny" style="margin-top: 0.8rem;">
  KMP 的想法：主串别回头，模式串自己决定下一次该跳到哪。
</div>

---

# KMP 的直觉

## 失配后，模式串内部能不能“接上前面已经匹配的部分”

<div class="compare">
  <div>
    <div class="pill">已经知道</div>
    <p class="small">某一段前缀已经和主串后缀匹配成功</p>
  </div>
  <div>
    <div class="pill">想要</div>
    <p class="small">找一个更短前缀，继续与当前主串位置对齐</p>
  </div>
</div>

<div class="card tiny" style="margin-top: 0.8rem;">
  所以 <code>next[j]</code> 记录的是：当 <code>P[j]</code> 失配时，模式串应该退到哪。
</div>

---

# `next` 不是魔法表

## 它描述的是“最长相等前后缀”

<table>
  <thead>
    <tr>
      <th>前缀串</th>
      <th>最长相等前后缀</th>
      <th>长度</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>a</code></td>
      <td>无</td>
      <td>0</td>
    </tr>
    <tr>
      <td><code>ab</code></td>
      <td>无</td>
      <td>0</td>
    </tr>
    <tr>
      <td><code>aba</code></td>
      <td><code>a</code></td>
      <td>1</td>
    </tr>
    <tr>
      <td><code>abab</code></td>
      <td><code>ab</code></td>
      <td>2</td>
    </tr>
    <tr>
      <td><code>ababa</code></td>
      <td><code>aba</code></td>
      <td>3</td>
    </tr>
  </tbody>
</table>

---

# KMP 手推示例

<div class="card small">
  <b>模式串</b> <code>P = a b a b a c</code><br>
  <b>前缀函数长度版</b> <code>[0, 0, 1, 2, 3, 0]</code>
</div>

<div class="steps" style="margin-top: 0.8rem;">
  <div>
    <div class="pill">当比较到 <code>c</code> 失配</div>
    <p class="small">不用回到 0，而是先退到长度 3 的状态</p>
  </div>
  <div>
    <div class="pill">为什么</div>
    <p class="small">前面已经有 <code>aba</code> 可以继续复用</p>
  </div>
</div>

<div class="mini tiny" style="margin-top: 0.8rem;">
  这就是“无回溯主串”的关键：<b>主串指针只前进，模式指针按 next 调整。</b>
</div>

---

# KMP 代码骨架

```python
def build_lps(p):
    lps = [0] * len(p)
    j = 0
    for i in range(1, len(p)):
        while j > 0 and p[i] != p[j]:
            j = lps[j - 1]
        if p[i] == p[j]:
            j += 1
        lps[i] = j
    return lps

def kmp_find(t, p):
    lps, j = build_lps(p), 0
    for i, ch in enumerate(t):
        while j > 0 and ch != p[j]:
            j = lps[j - 1]
        if ch == p[j]:
            j += 1
        if j == len(p):
            return i - len(p) + 1
    return -1
```

---
layout: section
---

# 栈与队列

## 限制访问端口，换来更清晰的行为模式

---

# 栈：后进先出

<div class="compare">
  <div>
    <div class="pill">规则</div>
    <ul class="small">
      <li>只在一端进出</li>
      <li>最后放进去的先出来</li>
      <li>适合处理“最近状态”</li>
    </ul>
  </div>
  <div>
    <div class="pill">典型联系</div>
    <ul class="small">
      <li>函数调用栈</li>
      <li>括号匹配</li>
      <li>表达式求值</li>
      <li>递归的运行时展开</li>
    </ul>
  </div>
</div>

<div class="card tiny" style="margin-top: 0.8rem;">
  若用 Python <code>list</code> 实现栈，通常把末端当栈顶，<code>append/pop()</code> 都是 O(1)。
</div>

---

# 栈应用：括号匹配

<div class="card small">
  扫描表达式 <code>(a+[b*c]-{d/e})</code>
</div>

<table style="margin-top: 0.8rem;">
  <thead>
    <tr>
      <th>读到字符</th>
      <th>操作</th>
      <th>栈内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(</code></td>
      <td>入栈</td>
      <td><code>(</code></td>
    </tr>
    <tr>
      <td><code>[</code></td>
      <td>入栈</td>
      <td><code>( [</code></td>
    </tr>
    <tr>
      <td><code>]</code></td>
      <td>与栈顶配对，弹出</td>
      <td><code>(</code></td>
    </tr>
    <tr>
      <td><code>}</code></td>
      <td>最后配对成功</td>
      <td>空</td>
    </tr>
  </tbody>
</table>

<div class="mini tiny" style="margin-top: 0.8rem;">
  关键词：<b>最近未配对的左括号</b>，这正是栈。
</div>

---

# 队列：先进先出

<div class="compare">
  <div>
    <div class="pill">规则</div>
    <ul class="small">
      <li>一端入队，另一端出队</li>
      <li>先来的先处理</li>
      <li>适合调度、缓冲、层次扩展</li>
    </ul>
  </div>
  <div>
    <div class="pill">实现提醒</div>
    <ul class="small">
      <li>顺序队列：可能有一端 O(n)</li>
      <li>循环队列：复用空位</li>
      <li>链式队列：头尾指针都要维护</li>
    </ul>
  </div>
</div>

<div class="queue-row tiny">
  <div class="slot">front</div>
  <div class="slot">7</div>
  <div class="slot">11</div>
  <div class="slot">20</div>
  <div class="slot">rear</div>
</div>

---

# 队列应用：打印任务

<div class="steps">
  <div>
    <div class="pill">进入系统</div>
    <p class="small">打印请求到来，先入队等待</p>
  </div>
  <div>
    <div class="pill">设备处理</div>
    <p class="small">打印机每次只处理队首任务</p>
  </div>
</div>

<div class="card tiny" style="margin-top: 0.8rem;">
  这类系统关注的是：平均等待时间、队列长度、服务速率是否匹配。
</div>

<div class="key-point tiny" style="margin-top: 0.8rem;">
  看到“先来先服务”“缓冲区”“层次遍历”，优先联想到队列。
</div>

---

# 栈和队列怎么区分

<table>
  <thead>
    <tr>
      <th>结构</th>
      <th>次序</th>
      <th>常见信号词</th>
      <th>代表问题</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>栈</td>
      <td>LIFO</td>
      <td>最近、回退、配对、递归</td>
      <td>括号、表达式、DFS 过程栈</td>
    </tr>
    <tr>
      <td>队列</td>
      <td>FIFO</td>
      <td>排队、调度、逐层、缓冲</td>
      <td>BFS、打印任务、消息处理</td>
    </tr>
  </tbody>
</table>

---
layout: section
---

# 典型例题

## 题目要会做，更要会识别

---

# 例 1：删除单链表中值为 x 的首个结点

<div class="grid-2">
  <div class="card">
    <h3>识别点</h3>
    <ul class="small">
      <li>需要 <code>prev</code> 与 <code>cur</code></li>
      <li>首结点可能就是答案</li>
      <li>找到后立即改链并结束</li>
    </ul>
  </div>
  <div class="card">
    <h3>伪代码</h3>
    <p class="tiny">
      若 <code>head.data == x</code>，直接改头；<br>
      否则一路找，命中时执行
      <code>prev.next = cur.next</code>。
    </p>
  </div>
</div>

---

# 例 2：手算 `next / lps`

<div class="card small">
  模式串：<code>ababaca</code>
</div>

<div class="grid-2" style="margin-top: 0.8rem;">
  <div class="card">
    <h3>建议步骤</h3>
    <ol class="small">
      <li>逐个看前缀</li>
      <li>写出最长相等前后缀</li>
      <li>再写长度数组</li>
    </ol>
  </div>
  <div class="card">
    <h3>答案</h3>
    <p class="small"><code>[0, 0, 1, 2, 3, 0, 1]</code></p>
    <p class="tiny muted">关键转折出现在读到 <code>c</code> 时连续回退</p>
  </div>
</div>

---

# 例 3：合法出栈序列判断

<div class="card small">
  入栈次序：<code>1, 2, 3, 4, 5</code><br>
  判断：<code>2, 1, 5, 4, 3</code> 是否可能？
</div>

<div class="key-point small" style="margin-top: 0.8rem;">
  模拟即可：能入就入，能出就出；最后若全部匹配，则合法。
</div>

<div class="mini tiny" style="margin-top: 0.8rem;">
  这种题本质不是“猜”，而是用一个辅助栈去跑流程。
</div>

---
layout: section
---

# 课堂练习

---

# 课堂练习

<div class="grid-3">
  <div class="card">
    <h3>练习 1</h3>
    <p class="small">顺序表与链表，谁更适合频繁中间插入？为什么？</p>
  </div>
  <div class="card">
    <h3>练习 2</h3>
    <p class="small">手推模式串 <code>ababa</code> 的 lps 数组。</p>
  </div>
  <div class="card">
    <h3>练习 3</h3>
    <p class="small">设计一个队列场景，解释为什么不能用栈代替。</p>
  </div>
</div>

<div class="danger tiny" style="margin-top: 0.9rem;">
  上课时别急着写代码。先画状态，再写变量含义，再动手。
</div>

---
layout: section
---

# 课后题

---

# 课后题

<div class="grid-2">
  <div class="card">
    <h3>A 组：基础巩固</h3>
    <ul class="small">
      <li>写出单链表头插、尾插步骤</li>
      <li>比较朴素匹配与 KMP 的最坏复杂度</li>
      <li>解释栈与递归的关系</li>
    </ul>
  </div>
  <div class="card">
    <h3>B 组：提高</h3>
    <ul class="small">
      <li>实现删除有序链表中的重复元素</li>
      <li>手推 <code>ababaca</code> 的 KMP 匹配过程</li>
      <li>设计循环队列的判空判满规则</li>
    </ul>
  </div>
</div>

---

# Takeaway Checklist

<div class="grid-2">
  <div class="card">
    <h3>会判断</h3>
    <ul class="small">
      <li>何时选顺序表，何时选链表</li>
      <li>何时题目本质是栈，何时是队列</li>
    </ul>
  </div>
  <div class="card">
    <h3>会手推</h3>
    <ul class="small">
      <li>链表插删的指针变化</li>
      <li>朴素匹配与 KMP 的状态迁移</li>
    </ul>
  </div>
  <div class="card">
    <h3>会解释</h3>
    <ul class="small">
      <li>KMP 为什么能减少重复比较</li>
      <li>栈与队列为何适合不同应用</li>
    </ul>
  </div>
  <div class="card">
    <h3>会编码</h3>
    <ul class="small">
      <li>链表基础操作模板</li>
      <li>KMP 骨架</li>
      <li>栈与队列基础 ADT</li>
    </ul>
  </div>
</div>

<div class="key-point tiny" style="margin-top: 0.9rem;">
  真正常见的失分，不是“题太难”，而是：概念混、状态乱、指针与下标不稳定。
</div>
