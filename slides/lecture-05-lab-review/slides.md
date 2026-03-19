---
theme: seriph
title: Lecture 05 · 上机复习
info: 数据结构与算法 B 小班课
class: text-center
mdc: true
transition: slide-left
---

<style>
:root {
  --lab-ink: #17212b;
  --lab-accent: #b44c36;
  --lab-soft: #f7efe5;
  --lab-line: rgba(23, 33, 43, 0.12);
  --lab-warn: #8d2f1f;
}

.slidev-layout {
  color: var(--lab-ink);
}

.grid-2,
.grid-3,
.grid-4,
.steps {
  display: grid;
  gap: 14px;
}

.grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.card,
.key-point,
.danger,
.pill-box {
  border: 1px solid var(--lab-line);
  border-radius: 18px;
  padding: 14px 16px;
  background: rgba(255, 250, 243, 0.9);
}

.card h3,
.key-point h3,
.danger h3 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 1.02rem;
}

.key-point {
  background: linear-gradient(135deg, rgba(180, 76, 54, 0.12), rgba(255, 255, 255, 0.92));
}

.danger {
  background: rgba(141, 47, 31, 0.08);
}

.compare {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.compare th,
.compare td {
  border: 1px solid var(--lab-line);
  padding: 8px 10px;
  vertical-align: top;
}

.compare th {
  background: rgba(180, 76, 54, 0.1);
}

.steps {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.step {
  border: 1px solid var(--lab-line);
  border-radius: 999px;
  padding: 10px 12px;
  font-size: 0.86rem;
  background: #fffdf9;
  text-align: center;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(180, 76, 54, 0.12);
  color: var(--lab-accent);
  font-size: 0.78rem;
  margin-right: 6px;
}

.tiny {
  font-size: 0.82rem;
  line-height: 1.45;
}

.mono {
  font-family: "SFMono-Regular", "Menlo", monospace;
}

.center-note {
  text-align: center;
  color: #5b6670;
  font-size: 0.9rem;
}
</style>

# Lecture 05

## 上机复习

<div class="center-note">
考前代码诊所：题型识别、模板调用、边界排查、复杂度止损
</div>

---
layout: section
---

# 开场地图

---

## 这讲只做一件事

<div class="grid-3">
  <div class="key-point">
    <h3>先认题型</h3>
    <div>不要一上来就写代码。</div>
    <div class="tiny">先判断是线性结构、字符串、树还是图。</div>
  </div>
  <div class="key-point">
    <h3>再拿模板</h3>
    <div>模板要短、稳、可手写。</div>
    <div class="tiny">考场不是拼 API，而是拼正确率。</div>
  </div>
  <div class="key-point">
    <h3>最后查边界</h3>
    <div>WA/TLE/RE 大多死在细节。</div>
    <div class="tiny">空输入、重复值、断链、越界、未初始化。</div>
  </div>
</div>

---

## 本讲路线

<div class="steps">
  <div class="step">1. 题型识别图</div>
  <div class="step">2. 高频模板群</div>
  <div class="step">3. 典型例题拆解</div>
  <div class="step">4. 调试与冲刺</div>
</div>

<div class="grid-2" style="margin-top: 18px">
  <div class="card">
    <h3>覆盖范围</h3>
    <div>线性结构 / KMP / 排序 / 树 / 图</div>
  </div>
  <div class="card">
    <h3>目标输出</h3>
    <div>一套可复写的考场动作序列</div>
  </div>
</div>

---

## 题型识别 -> 数据结构选型

<div class="grid-4 tiny">
  <div class="card">
    <div class="tag">顺序处理</div>
    <h3>线性表 / 数组</h3>
    <div>随机访问多，尾部追加多。</div>
  </div>
  <div class="card">
    <div class="tag">频繁插删</div>
    <h3>链表</h3>
    <div>重点是指针修改顺序。</div>
  </div>
  <div class="card">
    <div class="tag">前后缀</div>
    <h3>字符串 / KMP</h3>
    <div>要找模式、循环节、匹配位置。</div>
  </div>
  <div class="card">
    <div class="tag">先进后出</div>
    <h3>栈</h3>
    <div>括号、表达式、递归展开。</div>
  </div>
  <div class="card">
    <div class="tag">先进先出</div>
    <h3>队列</h3>
    <div>层次遍历、窗口、模拟调度。</div>
  </div>
  <div class="card">
    <div class="tag">局部最值</div>
    <h3>堆 / 排序</h3>
    <div>Top-k、优先级、批量有序。</div>
  </div>
  <div class="card">
    <div class="tag">父子关系</div>
    <h3>树</h3>
    <div>遍历、重建、递归分治。</div>
  </div>
  <div class="card">
    <div class="tag">点边关系</div>
    <h3>图</h3>
    <div>BFS/DFS、最短路、最小生成树。</div>
  </div>
</div>

---
layout: section
---

# 知识梳理

---

## 模板组 1：线性结构

<table class="compare tiny">
  <thead>
    <tr>
      <th>结构</th>
      <th>常见上机动作</th>
      <th>最易丢分点</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>顺序表</td>
      <td>插入、删除、去重、双指针压缩</td>
      <td>下标边界、覆盖顺序</td>
    </tr>
    <tr>
      <td>链表</td>
      <td>插入、删除、合并、反转</td>
      <td>先断后连导致丢链</td>
    </tr>
    <tr>
      <td>栈</td>
      <td>合法性判断、表达式处理</td>
      <td>空栈弹出、优先级漏判</td>
    </tr>
    <tr>
      <td>队列</td>
      <td>层序遍历、模拟、BFS</td>
      <td>访问标记时机错误</td>
    </tr>
  </tbody>
</table>

---

## 线性结构边界清单

<div class="grid-2 tiny">
  <div class="danger">
    <h3>数组类题目</h3>
    <ul>
      <li>空数组 / 单元素 / 全相等</li>
      <li>插入到头、尾、越界位</li>
      <li>删除后长度是否同步更新</li>
      <li>双指针是否覆盖未读数据</li>
    </ul>
  </div>
  <div class="danger">
    <h3>链表类题目</h3>
    <ul>
      <li>头结点是否变化</li>
      <li>删除首元 / 删除末尾</li>
      <li>循环链表停止条件</li>
      <li><span class="mono">cur.next = prev</span> 前先保存后继</li>
    </ul>
  </div>
</div>

---

## I/O 与模板细节

<div class="grid-3 tiny">
  <div class="card">
    <h3>读入</h3>
    <div>先看多组数据还是单组数据。</div>
    <div>看清是否有空行、结尾标记。</div>
  </div>
  <div class="card">
    <h3>输出</h3>
    <div>不要多空格、漏换行、漏去零项。</div>
    <div>格式错常常就是 WA。</div>
  </div>
  <div class="card">
    <h3>复杂度</h3>
    <div>输入大时，嵌套循环要先估量级。</div>
    <div><span class="mono">N=1e5</span> 基本拒绝 <span class="mono">O(N^2)</span>。</div>
  </div>
</div>

---

## 代码模板：单链表反转

```python
class Node:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev
```

<div class="center-note">核心只有 4 行状态更新，顺序不能乱。</div>

---

## 典型例题 1：多项式加法

<div class="grid-2 tiny">
  <div class="card">
    <h3>题型识别</h3>
    <div>本质是按指数合并两个有序序列。</div>
    <div>可用字典，也可用链表双指针。</div>
  </div>
  <div class="card">
    <h3>实现提醒</h3>
    <div>指数相同先合并，再判系数是否为 0。</div>
    <div>一边结束后别忘记接剩余部分。</div>
  </div>
</div>

```text
p1: 7x^5 + 2x^2 - 3
p2: 5x^4 - 2x^2 + 9
res: 7x^5 + 5x^4 + 6
```

---

## 模板组 2：字符串与 KMP

<div class="grid-2 tiny">
  <div class="card">
    <h3>什么时候上 KMP</h3>
    <ul>
      <li>题目反复提“匹配”“模式”“循环节”</li>
      <li>朴素匹配可能退化到 <span class="mono">O(NM)</span></li>
      <li>要复用前后缀信息</li>
    </ul>
  </div>
  <div class="key-point">
    <h3>你真正要背的不是代码</h3>
    <div>是 next 数组表示：</div>
    <div class="mono">到 i 为止，最长可复用前后缀长度</div>
  </div>
</div>

---

## KMP 手推只看三件事

<div class="grid-3 tiny">
  <div class="card">
    <h3>1. 失配时跳到哪</h3>
    <div>不是回到 0，而是回到 <span class="mono">next[j-1]</span>。</div>
  </div>
  <div class="card">
    <h3>2. 文本指针回不回退</h3>
    <div>不回退，这是线性复杂度的关键。</div>
  </div>
  <div class="card">
    <h3>3. next 如何构造</h3>
    <div>本质也是前后缀匹配问题。</div>
  </div>
</div>

```text
pattern = ababa
next    = 0 0 1 2 3
```

---

## 代码模板：KMP 匹配

```python
def build_next(p):
    nxt = [0] * len(p)
    j = 0
    for i in range(1, len(p)):
        while j > 0 and p[i] != p[j]:
            j = nxt[j - 1]
        if p[i] == p[j]:
            j += 1
        nxt[i] = j
    return nxt

def kmp(text, pattern):
    nxt = build_next(pattern)
    j = 0
    for i, ch in enumerate(text):
        while j > 0 and ch != pattern[j]:
            j = nxt[j - 1]
        if ch == pattern[j]:
            j += 1
        if j == len(pattern):
            return i - len(pattern) + 1
    return -1
```

---

## 典型例题 2：字符串乘方

<div class="grid-2 tiny">
  <div class="card">
    <h3>题目翻译</h3>
    <div>求最小循环节长度。</div>
    <div>若 <span class="mono">N % (N - nxt[-1]) == 0</span>，则存在重复结构。</div>
  </div>
  <div class="card">
    <h3>为什么常考</h3>
    <div>它逼你真正理解 next。</div>
    <div>不是背模板，而是会解释含义。</div>
  </div>
</div>

---

## 模板组 3：排序 / 树 / 图

<table class="compare tiny">
  <thead>
    <tr>
      <th>场景</th>
      <th>先想什么</th>
      <th>常用模板</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>排序题</td>
      <td>只要结果，还是要过程可解释</td>
      <td>内置排序 / 堆 / 归并思想</td>
    </tr>
    <tr>
      <td>树题</td>
      <td>递归边界、遍历顺序、空节点</td>
      <td>DFS / 层序队列</td>
    </tr>
    <tr>
      <td>图题</td>
      <td>建模方式、邻接表、访问标记</td>
      <td>BFS / DFS / Dijkstra / 并查集</td>
    </tr>
  </tbody>
</table>

---

## 代码模板：层序遍历

```python
from collections import deque

def level_order(root):
    if root is None:
        return []
    q = deque([root])
    ans = []
    while q:
        node = q.popleft()
        ans.append(node.val)
        if node.left:
            q.append(node.left)
        if node.right:
            q.append(node.right)
    return ans
```

<div class="center-note">队列模板一旦熟，树和图都会轻很多。</div>

---

## 代码模板：邻接表 BFS

```python
from collections import deque

def bfs(graph, start):
    q = deque([start])
    seen = {start}
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in graph[u]:
            if v not in seen:
                seen.add(v)
                q.append(v)
    return order
```

<div class="center-note">标记时机要在入队时，而不是出队时。</div>

---

## 例题 3：等式 / 不等式判定

<div class="grid-2 tiny">
  <div class="card">
    <h3>题型识别</h3>
    <div>不是字符串题。</div>
    <div>本质是“动态维护等价类”。</div>
  </div>
  <div class="key-point">
    <h3>正确结构</h3>
    <div>并查集。</div>
    <div>先合并所有等式，再检查不等式。</div>
  </div>
</div>

---

## 调试工作流

<div class="steps tiny">
  <div class="step">先造最小样例</div>
  <div class="step">打印关键状态</div>
  <div class="step">单独验证子函数</div>
  <div class="step">最后再跑大数据</div>
</div>

<div class="grid-2" style="margin-top: 18px">
  <div class="danger tiny">
    <h3>不要一开始就喂大样例</h3>
    <div>你会看到“错了”，但不知道错在哪里。</div>
  </div>
  <div class="card tiny">
    <h3>优先打印什么</h3>
    <div>指针、队列内容、next 数组、visited、循环变量。</div>
  </div>
</div>

---

## 常见错误：WA / TLE / RE

<table class="compare tiny">
  <thead>
    <tr>
      <th>症状</th>
      <th>高频原因</th>
      <th>首查位置</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>WA</td>
      <td>边界漏掉、输出格式错、状态未重置</td>
      <td>样例外最小数据</td>
    </tr>
    <tr>
      <td>TLE</td>
      <td>误写成 <span class="mono">O(N^2)</span>、重复扫描</td>
      <td>双层循环与字符串匹配</td>
    </tr>
    <tr>
      <td>RE</td>
      <td>空指针、越界、除零、递归过深</td>
      <td>初始化与终止条件</td>
    </tr>
  </tbody>
</table>

---

## 复杂度止损表

<div class="grid-3 tiny">
  <div class="card">
    <h3><span class="mono">N ≤ 1e3</span></h3>
    <div>可以考虑 <span class="mono">O(N^2)</span>。</div>
  </div>
  <div class="card">
    <h3><span class="mono">N ≤ 1e5</span></h3>
    <div>优先 <span class="mono">O(N)</span> / <span class="mono">O(N log N)</span>。</div>
  </div>
  <div class="card">
    <h3><span class="mono">图边很多</span></h3>
    <div>邻接表比邻接矩阵更稳。</div>
  </div>
</div>

<div class="key-point tiny" style="margin-top: 16px">
  先估复杂度，再写代码；不要写完再祈祷。
</div>

---

## 限时训练建议

<div class="grid-2 tiny">
  <div class="card">
    <h3>90 分钟怎么分</h3>
    <ul>
      <li>10 分钟：扫题并选结构</li>
      <li>45 分钟：拿下 2 道稳题</li>
      <li>20 分钟：冲 1 道中档题</li>
      <li>15 分钟：补边界与格式</li>
    </ul>
  </div>
  <div class="danger">
    <h3>不要做的事</h3>
    <ul>
      <li>卡 25 分钟还不换题</li>
      <li>边写边改大结构</li>
      <li>最后 2 分钟才测边界</li>
    </ul>
  </div>
</div>

---
layout: section
---

# 典型例题

---

## 高频题型包

<div class="grid-2 tiny">
  <div class="card">
    <h3>基础稳分题</h3>
    <ul>
      <li>链表反转 / 合并</li>
      <li>栈判断合法序列</li>
      <li>队列模拟</li>
    </ul>
  </div>
  <div class="card">
    <h3>进阶区分题</h3>
    <ul>
      <li>KMP / 循环节</li>
      <li>树层序与递归遍历</li>
      <li>图 BFS / Dijkstra / 并查集</li>
    </ul>
  </div>
</div>

---

## 例题拆解模板

<div class="steps tiny">
  <div class="step">题目翻译成人话</div>
  <div class="step">找结构与状态</div>
  <div class="step">写 10 行内核心循环</div>
  <div class="step">补边界与输出</div>
</div>

<div class="center-note" style="margin-top: 18px">
不会做时，不要空想；先把“状态”写出来。
</div>

---
layout: section
---

# 课堂练习

---

## 课堂练习

<div class="grid-2 tiny">
  <div class="card">
    <h3>练习 1</h3>
    <div>手写单链表反转，说明每轮 3 个指针的含义。</div>
  </div>
  <div class="card">
    <h3>练习 2</h3>
    <div>给出模式串 <span class="mono">ababaca</span>，手推 next 数组。</div>
  </div>
  <div class="card">
    <h3>练习 3</h3>
    <div>写出层序遍历模板，并指出空树返回什么。</div>
  </div>
  <div class="card">
    <h3>练习 4</h3>
    <div>说明 BFS 中为何要在入队时标记访问。</div>
  </div>
</div>

---
layout: section
---

# 课后题

---

## 课后题

<div class="grid-2 tiny">
  <div class="card">
    <h3>1. 多项式加法</h3>
    <div>分别用字典和链表实现，比较两种写法。</div>
  </div>
  <div class="card">
    <h3>2. 字符串乘方</h3>
    <div>分别写暴力版与 KMP 版，并比较复杂度。</div>
  </div>
  <div class="card">
    <h3>3. 二叉树层序遍历</h3>
    <div>输出每层结点个数。</div>
  </div>
  <div class="card">
    <h3>4. 无权图最短步数</h3>
    <div>用 BFS 写完整程序并处理不可达情况。</div>
  </div>
  <div class="card">
    <h3>5. 等式约束判定</h3>
    <div>用并查集实现，并解释为何顺序不能乱。</div>
  </div>
  <div class="card">
    <h3>6. 自拟一题</h3>
    <div>从自己的错题中挑 1 题，重写一遍模板。</div>
  </div>
</div>

---
layout: section
---

# Takeaway

---

## 最后一页清单

<div class="grid-2 tiny">
  <div class="key-point">
    <h3>考前要会</h3>
    <ul>
      <li>链表反转 / 合并</li>
      <li>KMP 模板与 next 含义</li>
      <li>层序遍历与 BFS</li>
      <li>并查集 / 最短路的题型识别</li>
    </ul>
  </div>
  <div class="danger">
    <h3>考前别再犯</h3>
    <ul>
      <li>不看数据范围就写</li>
      <li>不造最小样例就交</li>
      <li>模板改到自己都不认识</li>
      <li>输出格式最后才检查</li>
    </ul>
  </div>
</div>

<div class="center-note" style="margin-top: 18px">
稳题先拿满，再冲难题。上机不是拼灵感，是拼执行质量。
</div>
