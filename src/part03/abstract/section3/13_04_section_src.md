---
layout: default
title: "13.04 Sequence"
---

# 13.04 Sequence

Sequence 자료형을 인자로 받아 연결해서 순서쌍 등을 처리하는 내장 클래스를 알아보 겠다.

## 13.4.1 Sequence 자료형 처리 내장 클래스 종류

함수처럼 사용이 되지만 클래스이며 생성하면 하나의 인스턴스 객체가 만들어지고 이를 인스턴스들을 이용해서 처리한다.

예제 13-22 : 반복형을 처리하는 클래스 상속 관계 확인하기

내장 클래스 zip, enumerate, range, reversed는 함수가 아니라 클래스라는 것을 알 수 가 있다.

```python
In : print(zip)
print(enumerate)
print(reversed)
print(range)
Out: <class 'zip'>
<class 'enumerate'>
<class 'reversed'>
<class 'range'>
```

4개의 클래스는 기본적으로 모두 반복형 iterable 클래스라는 것을 알 수 있고 range만 반 복자 Iterator가 아닌 것을 알 수 있다. Range를 반복자로 처리하려면 iter 내장 함수를 이 용해서 반복자로 변경해야 한다.

```python
In : import collections.abc as cols
print(issubclass(zip, cols.Iterable))
print(issubclass(zip, cols.Iterator))
print(issubclass(enumerate, cols.Iterable))
print(issubclass(enumerate, cols.Iterator))
print(issubclass(reversed, cols.Iterable))
print(issubclass(reversed, cols.Iterator))
print(issubclass(range, cols.Iterable))
print(issubclass(range, cols.Iterator))
Out: True
True
True
True
True
True
True
False
```

range 클래스는 반복형이지만 반복자가 아니다. 반복자로 만들려면 iter 내장 함수를 이 용해서 반복자(Iterator) 인스턴스로 만들어 사용해야 한다.

```python
In : import collections.abc as cols
a = range(10)
b = iter(a)
print(b)
print(issubclass(type(b),cols.Iterator))
Out: <range_iterator object at 0x00000000051ECD30>
True
```

반복형은 정적이므로 항상 사용이 가능하다. Range에 list 생성자로 리스트를 만들고 그 내부의 속성을 조회해서 출력해본다.

```python
In : l = list(a)
print(l)
Out: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
In : print(a.start, a.stop, a.step)
Out: 0 10 1
```

파이썬 3.6 버전부터는 반복형(Iterable) 하위 추상 클래스인 Reversible가 만들어져 있다.

Range 클래스는 Reversible 추상 클래스를 상속받아 처리하는 것을 알 수 있다.

```python
In : import collections.abc as cols
print(issubclass(zip, cols.Reversible))
print(issubclass(enumerate, cols.Reversible))
print(issubclass(reversed, cols.Reversible))
print(issubclass(range, cols.Reversible))
Out: False
False
False
True
```

Range는 반대로 처리도 가능하므로 Reversible 추상 클래스가 처리 가능한 것을 알 수 있다. 내부에는 _ _reversed_ _ 스페셜 메서드가 추가 구현을 해야 한다.

```python
In : it = set(dir(cols.Iterable))
re = set(dir(cols.Reversible))
print(re-it)
print(range.__dict__['__reversed__'])
Out: {'__reversed__'}
<method '__reversed__' of 'range' objects>
```

역방향으로 처리하기 위해서는 step에 음수를 할당해서 역순으로 계산하면 된다.

```python
In : for i in range(10,-1,-1) :
print(i, end=" ")
Out: 10 9 8 7 6 5 4 3 2 1 0
```

## 13.4.2 Sequence 자료형 내장 클래스 예시

Sequence 자료형인 내장 클래스들에 대한 처리를 한다. 반복자형은 한번 만들고 사용하 면 없어지므로 사용할 때마다 할당을 해야 한다.

예제 13-23 : 클래스는 반복자 자료형

순서쌍을 만드는 zip 클래스부터 확인하면 동일한 원소가 아닐 경우는 원소 수가 작은 것 을 기준으로 순서쌍을 만들어서 처리된다. 만들어진 인스턴스가 반복자이므로 next 함수 를 통해 처리하면 된다.

```python
In : a = [1,2,3,4]
b = [1,2,3]
z = zip(a,b)
print(z)
print(next(z))
print(next(z))
print(next(z))
print(next(z))
Out: <zip object at 0x0000000004CB96C8>
(1, 1)
(2, 2)
(3, 3)
---------------------------------------------------------------------
StopIteration         Traceback (most recent call last)
<ipython-input-141-d5b03ab584e4> in <module>()
8 print(next(z))
9 print(next(z))
---> 10 print(next(z))
StopIteration:
```

인스턴스를 리스트 생성자에 넣으면 내부의 원소를 순서쌍으로 만든 리스트가 생긴다.

```python
In : a = [1,2,3,4]
b = [1,2,3]
c = ['a','b','c','d']
z = zip(a,b,c)
print(list(z))
Out: [(1, 1, 'a'), (2, 2, 'b'), (3, 3, 'c')]
```

위에서 사용한 반복자 인스턴스를 다시 사용하면 내부에 처리할 원소가 없으므로 빈 리스 트만 출력하는 것을 알 수 있다.

```python
In : print(list(z))
Out: []
```

Sequence 자료형 자신의 인스턴스 객체 인덱스와 원소를 순서쌍으로 표시할 수 있다.

```python
In : a = [1,2,3,4]
e = enumerate(a)
print(e)
print(next(e))
print(next(e))
print(next(e))
print(next(e))
print(next(e))
Out: <enumerate object at 0x0000000004C91120>
(0, 1)
(1, 2)
(2, 3)
(3, 4)
---------------------------------------------------------------------
StopIteration           Traceback (most recent call last)
<ipython-input-145-64ef425a22a1> in <module>()
8 print(next(e))
9 print(next(e))
---> 10 print(next(e))
StopIteration:
```

열거형의 순서도 조정이 가능하다. Sequence 자료형 내의 인덱스 값이 아닌 시작값으로 부여된 것과 원소 값을 쌍으로 만든다.

```python
In : a = [1,2,3,4]
e = enumerate(a,3)
print(e)
for i,v in e :
print(i,v)
Out: <enumerate object at 0x00000000054C8240>
3 1
4 2
5 3
6 4
```

위에 사용한 반복자를 다시 리스트로 만들면 빈 리스트가 나온다. 반복자를 사용하려면 다시 인스턴스를 만들어서 처리해야 한다.

```python
In : print(list(e))
Out: []
```

역순으로 처리하고자 할 때 reversed 클래스를 이용해서 처리할 수 있다. 반복자를 상속 받아 처리하므로 iter 함수를 수행하지 않고 바로 next 함수로 처리가 가능하다.

```python
In : a = [1,2,3,4]
r = reversed(a)
print(r)
print(next(r))
print(next(r))
print(next(r))
print(next(r))
print(next(r))
Out: <list_reverseiterator object at 0x0000000004C92A58>
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-149-6ebd6e1ba0a2> in <module>()
7 print(next(r))
8 print(next(r))
----> 9 print(next(r))
StopIteration:
```

reversed 처리는 하나의 reversed 객체를 제공해서 list 등으로 보면 결과가 나온다.

```python
In : a = [1,2,3,4]
r = reversed(a)
print(list(r))
Out: [4, 3, 2, 1]
```
