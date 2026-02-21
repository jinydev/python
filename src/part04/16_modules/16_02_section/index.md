---
layout: docs
title: "2. 줄서기와 쌓기: stack, queue, heapq"
permalink: /part04/16_modules/16_02_section/
---

# 2. 줄서기와 쌓기: stack, queue, heapq

컴퓨터가 수많은 일들을 처리할 때는, 데이터를 어떻게 줄 세울 것인지가 엄청나게 중요합니다. 파이썬이 제공하는 특급 **줄서기 도구**들을 알아볼까요?

## 2.1 스택(Stack)과 큐(Queue)의 기초

- **스택(Stack)**: 프링글스 감자칩 통을 상상해 보세요! 밑이 꽉 막힌 통에 데이터를 넣기 때문에, **제일 나중에 넣은 데이터가 제일 먼저 나옵니다.** (LIFO: Last In First Out)
- **큐(Queue)**: 놀이공원에 줄 서는 것을 생각하면 됩니다. **가장 먼저 줄을 선 데이터가 가장 먼저 놀이기구를 탑니다.** (FIFO: First In First Out)

파이썬의 기본 리스트(`.append()`, `.pop()`)를 이용해 대충 흉내 낼 수도 있지만, 파이썬은 진짜 프로들이 쓰는 멋진 툴을 따로 준비해 뒀습니다.

---

## 2.2 실전 줄서기: `queue` 모듈

`queue` 모듈은 말 그대로 줄을 세우는 전문 도구 상자입니다. 용량이 꽉 차거나 텅텅 비었을 때를 완벽하게 통제해 줍니다. 

```python
import queue

# 최대 2명만 설 수 있는 줄(Queue)을 만듭니다!
q = queue.Queue(maxsize=2)

q.put(1) # 줄 서기!
q.put(2) # 줄 서기!

print(q.full())  # 꽉 찼나요? -> True
print(q.qsize()) # 몇 명 있나요? -> 2

# 맨 앞사람 빼기
print(q.get()) # 1번이 놀이기구 타러 나감
```

---

## 2.3 양쪽 뚫린 마법 터널: `collections.deque`

양쪽으로 들어오고 나갈 수 있는 마법의 파이프 큐를 **Deque**(데크)라고 부릅니다. 리스트의 `.insert(0, X)`는 매우 느리지만, `deque`는 아주 빛의 속도로 앞뒤 어디서든 데이터를 넣고 뺄 수 있습니다!

```python
from collections import deque

# 양쪽 뚫린 파이프(데크) 만들기
pipe = deque([2, 3])

pipe.append(4)     # 오른쪽(보통)으로 밀어 넣기
print(pipe)        # deque([2, 3, 4])

pipe.appendleft(1) # 특별히 왼쪽(앞)으로 밀어 넣기!
print(pipe)        # deque([1, 2, 3, 4])

pipe.popleft()     # 왼쪽에서 빼기!
print(pipe)        # deque([2, 3, 4])
```
이 녀석은 `rotate`를 써서 마치 회전초밥 기계처럼 데이터를 뱅글뱅글 위상을 섞어 돌릴 수도 있답니다!

---

## 2.4 가장 작은 녀석만 쏙쏙: `heapq` 모듈

만약 상자 안에 무작위로 여러 숫자가 막 섞여 있는데, 계속해서 "상자 안에 있는 것 중 **가장 작은 놈** 당장 나와!"라고 명령해야 한다면 어떨까요?
`heapq`(힙 큐) 모듈은 이럴 때 쓰는 전용 도구입니다.

```python
import heapq

# 섞인 숫자들의 모임
box = [20, 10, 30, 50, 40]

# 1. 힙 정렬 명령! (파이썬이 마법의 구도로 재배치합니다)
heapq.heapify(box)
print(box) # [10, 20, 30, 50, 40] -> 제일 앞에 가장 작은 값이 튀어나옵니다!

# 2. 제일 작은 놈 나와! (heappop)
print(heapq.heappop(box)) # 10이 빠져나옴!
print(heapq.heappop(box)) # 20이 빠져나옴!
```
그 외에도 `heappush`로 새로운 숫자를 상자에 던져 넣으면, 알아서 자리를 찾아 쏙쏙 들어가고 가장 작은 값을 언제나 1번으로 대기시켜주는 초강력 정렬 마법 상자랍니다!
