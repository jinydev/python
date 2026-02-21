---
layout: default
title: "16.03 bisect"
---

# 16.03 bisect

정렬된 순서로 목록을 유지하면서 요소의 목록을 검색하고 삽입할 수 있는 간단한 알고리 즘을 처리하는 모듈도 제공한다.

예제 16-15 : bisect 처리하기

이 모듈 내부에 있는 함수들을 찾아보면 좌측과 우측으로 처리할 수 있는 함수들도 전부 제공하는 것을 알 수 있다.

```python
In : import bisect
for i in dir(bisect) :
if not i.startswith("_") :
print(i)
Out: bisect
bisect_left
bisect_right
insort
insort_left
insort_right
```

리스트를 하나 만들고 특정 값이 어떤 위치에 들어갈 수 있는지를 확인할 수 있다. 일단 입력된 숫자가 4라서 제일 마지막에 있는 원소 다음에 들어가야 하므로 인덱스가 3이라고 알려준다.

```python
In : import bisect
bl = [1,2,3]
a = bisect.bisect(bl,4)
print(a)
print(bl)
Out: 3
[1, 2, 3]
```

이번에는 인덱스를 확인하고 내부에 정렬한 값을 삽입하기 위해 insort 함수로 처리한다.

리스트 내부에 원소가 추가된 것을 알 수 있다.

```python
In : bisect.insort(bl,4)
print(bl)
Out: [1, 2, 3, 4]
```

위의 리스트를 가지고 3이 들어갈 인덱스를 먼저 알아본다. 후에 연속해서 insort로 처리 하면 정렬된 결과대로 원소가 들어가 있는 것을 볼 수 있다.

```python
In : a = bisect.bisect(bl,3)
print(a)
bisect.insort(bl,3)
print(bl)
Out: 3
[1, 2, 3, 3, 4]
```

좌측으로 추가도 가능하도록 접미사에 left 메서드가 있다. 좌측에서부터 추가할 경우 사 용하면 된다.

```python
In : import bisect
lf = [1,2,3]
c = bisect.bisect_left(lf,-4)
print(c)
bisect.insort_left(lf,-4)
print(lf)
Out: 0
[-4, 1, 2, 3]
```

인덱스를 찾는 로직을 별도로 작성해서 실행해본다. 별도로 작성하는 것보다 bisect 모듈 을 이용해서 처리하는 것이 간단해서 좋다.

```python
In : l= [1,2,3,10]
position = 0
found = False
item = 10
while position < len(l) and not found:
position = position + 1
if l[position] == item:
found = True
if l[position] > item :
found = True
print(position)
Out: 3
CHAPTER
예외     처리
```

파이썬도 오류, 예외가 발생한다. 발생한 뒤 이 예외를 처리하지 않으면 프로그램이 중단 된다. 이런 중단도 프로그램에서 제외해서 처리할 수 있다.

예외가 발생하면 try except로 발생한 예외를 잡고 예외 클래스 내의 메시지를 확인해 서 세부적인 로직을 처리할 수 있다. 또한 어느 프로그램에서 발생했는지에 대한 정보도 traceback에서 확인할 수 있다.

이 책에서는 예외가 발생할 때 어떤 정보가 필요하고 발생할 때 어떻게 출력되는지 확인 해보겠다.

✚ 알아볼 주요 내용

● Try except

● Finally, else

● 예외 클래스 구조 및 상속 구현

● Traceback 클래스와 모듈
