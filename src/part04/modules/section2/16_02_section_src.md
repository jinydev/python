---
layout: default
title: "16.02 stack/queue/heap"
---

# 16.02 stack/queue/heap

메모리 구조나 프로세스 처리에 필요한 자료 구조들도 제공하므로 이번에 이를 알아보 겠다. stack/queue/heap에 대해서 파이썬에서는 어떻게 처리하는지를 잘 알아본다.

## 16.2.1 stack/queue 이해

프로그램을 실행할 때 프로그램의 처리 순서들을 보관해서 처리할 경우 Stack을 많이 사 용한다. 프로세스 간의 통신을 하거나 서버 간의 통신을 할 때는 Queue를 많이 사용한다.

어떻게 작동되는지를 이해하면 이 이름만 봐도 다양한 처리의 기본을 이해할 수 있다.

예제 16-9 : Stack을 사용자 정의로 사용하기

Stack 클래스를 정의한다. 일단 현재 위치에 저장되고 현재 위치가 삭제되도록 구조를 정 의했다. 스택은 제일 나중에 입력된 것이 제일 먼저 삭제되는 구조이다.

저장된 공간이 아무 것도 없는지와 저장소에 들어간 원소들의 사이즈를 확인하는 메서드 도 추가했다.

```python
In : class Stack :
def __init__(self) :
self.items = []
def is_empty(self) :
return self.items == []
def push(self,item) :
self.items.insert(0,item)
def pop(self) :
return self.items.pop(0)
def size(self) :
return len(self.items)
```

Stack 클래스로 아무 것도 처리하지 않은 빈 인스턴스를 하나 만들고 is_empty 메서드로 확인하면 아무 것도 없으므로 True라고 표시한다.

```python
In : s = Stack()
print(s.is_empty())
Out: True
```

이제 스택에 2개를 차례대로 넣었다. 현재 들어간 값을 조회하면 리스트가 반대로 들어가 있는 것을 확인할 수 있다. 메서드에서 항상 첫 번째 자리를 마지막으로 보고 입력이 되어 서 반대로 입력이 된다. 사이즈도 원소가 2개이므로 2라고 출력했다.

```python
In : s.push(1)
s.push(2)
print(s.items)
print(s.size())
Out: [2, 1]
```

스택에서 하나를 꺼내면 마지막에 들어간 것이 삭제되어 처음에 입력된 것만 남아있는 것 을 볼 수 있다.

```python
In : s.pop()
print(s.items)
print(s.size())
Out: [1]
```

예제 16-10 : queue를 사용자 정의로 사용하기

먼저 들어오면 먼저 나가는 대기 행렬을 만들어 앞에서부터 출력되고 뒤에 쌓이도록 처리 하는 구조라 파이썬으로 내장 자료형인 리스트를 이용해서 간단히 큐를 만들 수 있다. 큐 가 저장될 때 기준을 0번 인덱스로 지정했으므로 입력이 되면 첫 번째 입력된 것이 계속 우측으로 이동하고 이를 꺼낼 때는 제일 우측부터 검색되어 처리된다.

```python
In : class Queue :
def __init__(self) :
self.items = []
def is_empty(self) :
return self.items == []
def enqueue(self,item) :
self.items.insert(0,item)
def dequeue(self) :
return self.items.pop()
def size(self) :
return len(self.items)
```

하나의 빈 큐 인스턴스를 만들고 내부가 비어 있는지를 확인한다.

```python
In : q = Queue()
print(q.is_empty())
Out: True
```

큐에 값을 차례대로 2개를 넣었고 들어간 원소들을 확인한다. 현재 사이즈를 확인하면 2 개가 들어가 있는 것을 알 수 있다.

```python
In : q.enqueue(1)
q.enqueue(2)
print(q.items)
print(q.size())
Out: [2, 1]
```

큐에서 값을 꺼내며 제일 우측에 있는 것을 처리하므로 가장 먼저 입력된 값이 삭제되는 것을 확인할 수 있다.

```python
In : q.dequeue()
print(q.items)
print(q.size())
Out: [2]
```

## 16.2.2 queue 모듈 이해

파이썬에서 큐의 기능은 다양하게 사용되므로 모듈로 제공한다. 위에서 큐라는 것을 간단 히 알아봤다. 이 모듈에서 추가적으로 무엇을 지원하는지를 알아보겠다.

예제 16-11 : queue 모듈 내부 알아보기

모듈 내의 스페셜 속성을 제외하고 출력하면 여러 개의 클래스와 함수가 제공되는 것을 볼 수 있다.

```python
In : import queue
for i in dir(queue) :
if not i.startswith("_") :
print(i)
Out: Empty
Full
LifoQueue
PriorityQueue
Queue
deque
heappop
heappush
threading
time
```

이 모듈에 있는 클래스들을 확인하면 어떤 것들이 있는지를 확인해본다. 여러 가지 queue 를 지원하는 것을 알 수 있다.

```python
In : import queue
print(queue.Empty)
print(queue.Full)
print(queue.LifoQueue)
print(queue.PriorityQueue)
print(queue.Queue)
print(queue.deque)
Out: <class 'queue.Empty'>
<class 'queue.Full'>
<class 'queue.LifoQueue'>
<class 'queue.PriorityQueue'>
<class 'queue.Queue'>
<class 'collections.deque'>
```

예제 16-12 : queue 모듈을 이용하기

Queue 클래스의 기본적인 처리를 이해하기 위해 내부의 메서드들을 알아본다. 일단 이 중에 간단하게 queue를 처리할 메서드들을 이용해서 처리하는 것만 알아보겠다.

```python
In : import queue
for i in dir(queue.Queue) :
if not i.startswith("_") :
print(i)
Out: empty
full
get
get_nowait
join
put
put_nowait
qsize
task_done
```

일단 Queue 클래스로 인스턴스를 만들어서 어떻게 작동하는지를 알아보겠다. get 메서 드에 False로 처리하면 데이터가 없어서 Empty 예외가 발생하므로 try except로 처리했 고 queue.Empty 예외가 발생하는 것을 알 수 있다.

```python
In : import queue
q = queue.Queue(maxsize=2)
try:
task=q.get(False)
except queue.Empty:
print(" Empty ")
Out: Empty
```

Queue 클래스로 빈 인스턴스를 만들고 empty 메서드를 호출하면 True를 출력한다.

```python
In : import queue
q = queue.Queue(maxsize=2)
print(q.empty())
Out: True
```

이 인스턴스를 만들 때 큐에 저장할 사이즈를 maxsize=2로 정의했으므로 2개를 추가 했다. full 메서드로 확인하면 True로 표시하고 qsize 메서드로 확인하면 2라고 출력한다.

```python
In : q.put(1)
q.put(2)
print(q.full())
print(q.qsize())
Out: True
```

이번에는 Queue 인스턴스를 만들 때 사이즈를 제한하지 않았다. 이때 하나를 put 메서드 를 이용해서 입력했고 get 메서드를 이용해서 하나를 꺼냈다. 저장소의 사이즈를 확인하 면 변동이 되는 것을 알 수 있다.

```python
In : import queue
q1 = queue.Queue()
q1.put(1)
print(q1.qsize())
print(q1.get())
print(q1.qsize())
Out: 1
```

## 16.2.3 collections.deque

큐 모듈에도 있는 deque는 collections 모듈에도 있으므로 collections 모듈에 있는 양방 향 큐인 deque에 대한 처리 방법을 알아보겠다.

예제 16-13 : 양방향 큐를 만들고 사용하기

양방향 큐인 deque 내부의 메서드를 확인하면 left가 접미사로 붙은 메서드들이 있다. 이 뜻은 기본적으로 우측 방향으로 입력이 되고 좌측 방향으로 출력이 되지만, 여기서는 좌 측 방향으로 입력이 되고 우측 방향으로도 출력 처리가 된다는 것이다.

```python
In : from collections import deque
for i in dir(deque) :
if not i.startswith("_") :
print(i)
Out: append
appendleft
clear
copy
count
extend
extendleft
index
insert
maxlen
pop
popleft
remove
reverse
rotate
```

양방향 큐를 하나 생성하면 deque의 인스턴스가 하나 만들어진다. 일단 사이즈를 주지 않았으므로 제한 없이 저장되고 처리되는 것을 알 수 있다.

```python
In : from collections import deque
a = deque()
print(a)
Out: deque([])
```

리스트를 extend로 좌측부터 우측으로 증가시켰다. 좌측 방향에 추가하고 싶을 경우 extendleft를 이용해서 리스트를 받아 처리도 가능하다.

```python
In : a.extend([2,3,4])
print(a)
a.extendleft([1])
print(a)
Out: deque([2, 3, 4])
deque([1, 2, 3, 4])
```

일단 양방향 큐인 deque를 만들 때 최대의 사이즈를 지정하면 필요한 공간이 확정된다.

```python
In : from collections import deque
b = deque(maxlen=3)
print(b)
Out: deque([], maxlen=3)
```

내부의 원소가 큐 사이즈를 넘기면 맨 앞에 있는 원소가 자동으로 삭제된다. 이때도 양방 향으로 추가가 가능해서 extendleft로 좌측 방향을 추가했기 때문에 우측에 있는 것이 삭 제되는 것을 볼 수 있다.

```python
In : b.extend([2,3,4])
print(b)
b.extendleft([1])
print(b)
Out: deque([2, 3, 4], maxlen=3)
deque([1, 2, 3], maxlen=3)
```

또 deque로 큐를 만들었다. 이번에는 원소들을 하나씩 처리해본다.

```python
In : from collections import deque
b = deque(maxlen=3)
print(b)
Out: deque([], maxlen=3)
```

먼저 3개의 원소를 한꺼번에 extend로 넣는다. 그 다음에 원소를 하나씩 넣어서 maxsize 가 어떻게 변하는지를 알아본다.

원소를 삭제하는 pop, popleft 메서드를 이용해서 일단 좌측에 있는 원소를 하나 제거하 고 그 다음에 우측에 있는 원소를 2번 제거했다.

큐에 들어간 원소가 하나도 없으므로 사이즈가 0이 되어 pass가 처리되는 것을 확인할 수 있다.

```python
In : b.extend([2,3,4])
print(b)
b.popleft()
print(b)
b.pop()
print(b)
b.pop()
if len(b) == 0 :
pass
else :
b.pop()
Out: deque([2, 3, 4], maxlen=3)
deque([3, 4], maxlen=3)
deque([3], maxlen=3)
```

양방향으로 append, appendleft를 이용해서 원소를 추가해보겠다. 일단 하나의 deque 인스턴스를 생성한다.

```python
In : from collections import deque
b = deque(maxlen=3)
print(b)
Out: deque([], maxlen=3)
```

큐에 원소를 넣으면 우측으로 들어가고 좌측으로 원소를 추가하려면 appendleft 메서드 를 실행했다.

```python
In : b.append(1)
print(b)
b.appendleft(2)
print(b)
Out: deque([1], maxlen=3)
deque([2, 1], maxlen=3)
```

내부의 원소를 이동해서 처리하려면 rotate 메서드를 이용한다. 일단 한 칸을 우측에서 좌 측으로 이동해보겠다.

```python
In : from collections import deque
b = deque([1,2,3])
print(b)
b.rotate(1)
print(b)
Out: deque([1, 2, 3])
deque([3, 1, 2])
```

큐에 대해 이번에는 2칸을 이동하면 우측에서 좌측으로 2칸이 이동되는 것을 알 수 있다.

```python
In : from collections import deque
b = deque([1,2,3])
print(b)
b.rotate(2)
print(b)
Out: deque([1, 2, 3])
deque([2, 3, 1])
```

## 16.2.4 heapq 모듈

Heap은 해시로 처리된 데이터를 보관하고 관리한다. 파이썬에서는 이를 큐와 연결하여 처리하는 모듈을 제공한다. 힙과 큐를 동시에 어떻게 처리하는지를 알아보겠다.

예제 16-14 : heapq를 만들기

모듈 heapq 내에 어떤 함수가 있는지를 확인해보면 다양한 함수들이 있는 것을 알 수 있다.

```python
In : import heapq
for i in dir(heapq) :
if not i.startswith("_") :
print(i)
Out: heapify
heappop
heappush
heappushpop
heapreplace
merge
nlargest
nsmallest
```

리스트를 정의해서 heap 변수에 할당한다. 이 heap을 보관 장소로 사용하고 여기에 heappush 함수를 이용해서 원소를 추가할 수 있다.

저장된 정보를 확인해보면 리스트에 추가된 것을 알 수 있다.

```python
In : import heapq
heap = []
for value in [20, 10, 30, 50, 40]:
heapq.heappush(heap, value)
print(heap)
Out: [10, 20, 30, 50, 40]
```

이 heap이 들어간 데이터를 while문에 조건식으로 넣으면 heappop 함수를 이용해서 이 원소를 전부 하나씩 꺼낸다. 전부 삭제되면 빈 리스트이므로 False로 인식되어 마지막으 로 출력이 끝나면 순환문이 종료된다. Heap 변수를 확인하면 아무 것도 없는 것을 알 수 있다.

```python
In : while heap:
print(heapq.heappop(heap),end=",")
print()
print(heap)
Out: 10,20,30,40,50,
[]
```

heap으로 만들 때 원소가 다른 자료형으로 구성되면 예외가 발생한다. 원소에 문자열과 숫자가 혼재되면 예외가 발생한다. 동일한 자료형으로 처리해야 하는 것을 알 수 있다.

```python
In : heap_all = []
for value in [20, 'a', 30, 50, 'c']:
heapq.heappush(heap_all, value)
print(heap)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-54-8c32bc6dfe83> in <module>()
3 for value in [20, 'a', 30, 50, 'c']:
----> 4 heapq.heappush(heap_all, value)
6 print(heap)
TypeError: '<' not supported between instances of 'str' and 'int'
```

기존에 만들어진 리스트를 처리하기 위해 기본적으로 인덱스가 지정되어 있다. heapify 함수로 먼저 만들어진 리스트가 heapq 처리에 맞도록 조정할 필요가 있다. 조정된 후에 이 원소를 꺼내어 출력하면 순서대로 출력된다.

```python
In : import heapq
heap = [20, 10, 30, 50, 40]
heapq.heapify(heap)
print(heap)
for i in range(5) :
print(heapq.heappop(heap))
Out: [10, 20, 30, 50, 40]
```

heapify 처리를 하지 않은 리스트를 가지고 heapq를 처리하면 현재 만들어진 대로 처리 가 되므로 순서를 맞추고 처리하려면 반드시 heapify를 먼저 실행해야 한다. 이번에 리스 트를 그대로 처리한 것과 heapify 함수로 처리한 것과의 차이를 알아본다.

```python
In : import heapq
heap1 = [20, 10, 30, 50, 40]
for i in range(5) :
print(heapq.heappop(heap1))
Out: 20
```

모듈 heapq를 이용하면 동시에 push와 pop를 처리할 수 있다. 먼저 빈 리스트에 튜플을 원소로 해서 저장한다.

```python
In : import heapq
heap_queue = []
heapq.heappush(heap_queue,(3,"c"))
heapq.heappush(heap_queue,(2,"b"))
heapq.heappush(heap_queue,(1,"a"))
heapq.heappush(heap_queue,(4,"d"))
print(heap_queue)
Out: [(1, 'a'), (3, 'c'), (2, 'b'), (4, 'd')]
```

먼저 push가 처리된 후에 pop이 되어 결과를 만드는 것을 알 수 있다.

```python
In : a = heapq.heappushpop(heap_queue,(5,"e"))
print(a)
print(heap_queue)
Out: (1, 'a')
[(2, 'b'), (3, 'c'), (5, 'e'), (4, 'd')]
```

기존에 삭제된 것을 추가하면 이 내용이 첫 번째로 pop가 된다. 다른 것을 입력했을 경우 두 번째가 나오고 새로운 것이 입력되었음을 확인할 수 있다.

```python
In : print(heap_queue)
b = heapq.heappushpop(heap_queue,(1,"a"))
print(b)
print(heap_queue)
b = heapq.heappushpop(heap_queue,(6,"a"))
print(b)
print(heap_queue)
Out: [(2, 'b'), (3, 'c'), (5, 'e'), (4, 'd')]
(1, 'a')
[(2, 'b'), (3, 'c'), (5, 'e'), (4, 'd')]
(2, 'b')
[(3, 'c'), (4, 'd'), (5, 'e'), (6, 'a')]
```

이 내부에 대한 세부적인 것을 조회하기 위해 nlargest, nsmallest 함수를 제공한다. 위에 서 실행된 heapq를 가지고 값이 크고 작음에 따라 인자로 출력할 개수를 넣으면 출력해 준다.

```python
In : ln = heapq.nlargest(2,heap_queue)
print(ln)
Out: [(6, 'a'), (5, 'e')]
In : ln = heapq.nsmallest(2,heap_queue)
print(ln)
Out: [(3, 'c'), (4, 'd')]
```

튜플에 저장된 내용을 계산해서 계산된 값에 따라 크고 작음을 표시할 수 있다. 이때 key 에 람다 함수를 정의해서 내부 원소들의 크고 작음을 확인해보겠다.

```python
In : ln = heapq.nlargest(2,heap_queue,key=lambda s : (5-s[0])**2)
print(ln)
Out: [(3, 'c'), (4, 'd')]
In : ln = heapq.nsmallest(2,heap_queue,key=lambda s : (5-s[0])**2)
print(ln)
Out: [(5, 'e'), (4, 'd')]
```
