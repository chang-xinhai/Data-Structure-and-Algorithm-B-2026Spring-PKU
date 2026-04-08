# OpenJudge Crawler

爬取 OpenJudge 比赛和题目的工具，支持增量爬取。

## 安装

```bash
pip install -r requirements.txt
```

## 配置

```bash
python crawler.py --init  # 创建 config.json
# 然后编辑 config.json，填入你的 cookie
```

从浏览器开发者工具获取 `PHPSESSID` cookie 的值（Chrome: F12 → Application → Cookies → PHPSESSID）。

## 使用

```bash
# 爬取所有配置好的 base URL
python crawler.py

# 指定 base URL
python crawler.py --base http://xlxxsjjg.openjudge.cn/

# 强制覆盖已存在的文件
python crawler.py --force

# 爬取特定比赛
python crawler.py --contest 2026hw3

# 查看已爬取统计
python crawler.py --stats

# 设置请求延迟
python crawler.py --delay 1.0
```

## 输出结构

```
reference/openjudge/
├── xlxxsjjg.openjudge.cn/
│   ├── 2026hw3/
│   │   ├── A.html
│   │   ├── B.html
│   │   └── ...
│   ├── 2026hw2/
│   └── 2026hw1/
└── dsb12.openjudge.cn/
    └── 26hw5/
        ├── 1.html
        ├── 2.html
        └── ...
```

## 增量爬取

默认跳过已存在的文件。使用 `--force` 强制覆盖。
