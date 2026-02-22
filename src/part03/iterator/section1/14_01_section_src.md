---
layout: default
title: "14.01 반복형과"
---

# 14.01 반복형과

반복형(iterable)은 컬렉션 자료형이면서 정적으로 많은 원소를 가진 자료형이 특징이다.

이처럼 동적으로 원소를 하나씩 검색해서 처리할 수 있는 자료형을 반복자(iterator)라고 한다. 반복자는 한 번 사용하면 다시 사용할 때 항상 반복자를 다시 생성해서 처리해야 한다. 이때 반복형을 iter 함수를 통해서 반복자로 변환하고 next 함수를 통해 하나씩 처 리한다. 전부 다 검색하면 종료되었다는 의미인 StopIteration으로 예외를 발생시킨다.

이제부터 반복형에서 반복자로 변환해서 처리되는 경우를 알아보겠다.

## 14.1.1 반복형(iterable)과 반복자(iterator)

보통 문자열, 리스트 등은 기본적으로 반복형 자료형이다. 언제라도 원소를 가지고 있으 므로 이를 원소별로 처리가 가능하다는 뜻이다.

원소별로 반복해서 사용하려면 반복형에서 반복자로 변환해서 처리해야 한다. 반복형은 기본적으로 반복이 가능하므로 내부에 스페셜 메서드 _ _iter_ _가 구현되어 있다. 이 메 서드를 이용해서 반복자로 변환하면 next 함수가 실행되어야 한다. 스페셜 메서드 _ _ next_ _가 생성되어 next 함수로 호출하면 원소를 처리한다.

반복형은 정적이므로 항상 호출해서 처리가 가능하지만 반복자는 동적이라서 한 번 사용 하면 다시 사용할 수 없으므로 사용할 때마다 항상 반복자를 만들어서 사용해야 한다.

예제 14-1 : 반복형과 반복자 차이

추상 클래스를 가지고 반복형 Iterable 클래스 내부를 확인하면 _ _iter_ _ ( _ _getitem_ _)이 있다.

```python
In : import collections.abc as cols
import pprint
pprint.pprint(cols.Iterable.__dict__)
Out: mappingproxy({'__abstractmethods__': frozenset({'__iter__'}),
'__doc__': None,
'__iter__': <function Iterable.__iter__ at 0x10903be18>,
'__module__': 'collections.abc',
'__slots__': (),
'__subclasshook__': <classmethod object at 0x10903e630>,
'_abc_cache': <_weakrefset.WeakSet object at 0x10903e6a0>,
'_abc_negative_cache': <_weakrefset.WeakSet object at
0x10903e320>,
'_abc_negative_cache_version': 45,
'_abc_registry': <_weakrefset.WeakSet object at
0x10903e668>})
```

반복자 Iterator 클래스 내부에는 _ _iter_ _, _ _next_ _ 메서드가 있다.

```python
In : import collections.abc as cols
import pprint
pprint.pprint(cols.Iterator.__dict__)
Out: mappingproxy({'__abstractmethods__': frozenset({'__next__'}),
'__doc__': None,
'__iter__': <function Iterator.__iter__ at 0x1090431e0>,
'__module__': 'collections.abc',
'__next__': <function Iterator.__next__ at 0x109043158>,
'__slots__': (),
'__subclasshook__': <classmethod object at 0x10903e7f0>,
'_abc_cache': <_weakrefset.WeakSet object at 0x10903e860>,
'_abc_negative_cache': <_weakrefset.WeakSet object at
0x10a96c198>,
'_abc_negative_cache_version': 45,
'_abc_registry': <_weakrefset.WeakSet object at
0x10903e828>})
```

내부 메서드들을 집합으로 만들어서 반복자와 반복형의 차집합을 비교하면 _ _next_ _ 만 차이가 있는 것을 알 수 있다.

```python
In : import collections.abc as cols
able = set(dir(cols.Iterable))
ator = set(dir(cols.Iterator))
print(ator-able)
Out: {'__next__'}
```

예제 14-2 : 내장 자료형의 반복자 확인하기

문자열은 인스턴스를 만들어서 반복형인지, 반복자인지를 isinstance로 확인하면 반복형 이라는 것을 알 수 있다.

```python
In : import collections.abc as cols
s = "Iterator"
print(isinstance(s, cols.Iterable))
print(isinstance(s, cols.Iterator))
Out: True
False
```

문자열 클래스 내부를 확인하면 _ _iter_ _는 있고 _ _next_ _는 없는 것을 알 수 있다.

```python
In : print(str.__dict__['__iter__'])
print(str.__dict__['__next__'])
Out: <slot wrapper '__iter__' of 'str' objects>
---------------------------------------------------------------------
KeyError               Traceback (most recent call last)
<ipython-input-10-d13dc96e5e1c> in <module>()
1 print(str.__dict__['__iter__'])
----> 2 print(str.__dict__['__next__'])
KeyError: '__next__'
```

이제 문자열을 반복자로 만들어보자. 문자열 인스턴스를 하나 만들고 이를 iter 함수를 호 출할 때 인자로 전달한다. 이때 만들어진 인스턴스를 sator 변수에 할당했다.

이 인스턴스가 어떤 자료형인지를 type 클래스로 확인하면 새로운 자료형의 인스턴스가 만들어진 것을 알 수 있다. 새로운 클래스는 반복자형인 str_iterator이다.

```python
In : s = "Iteraotr"
sator = iter(s)
print(sator)
print(type(sator))
Out: <str_iterator object at 0x1064e0710>
<class 'str_iterator'>
```

위의 문자열처럼 리스트도 반복형이므로 이를 반복자로 변경하고 내부 인스턴스를 확인하 면 list_iterator로 바뀐 것을 알 수 있다.

```python
In : l = [1,2,3,4,]
lator = iter(l)
print(lator)
print(type(lator))
Out: <list_iterator object at 0x1064e0a20>
<class 'list_iterator'>
```

튜플도 마찬가지로 반복형이므로 tuple_iterator 클래스로 변환된 것을 알 수가 있다.

```python
In : t = (1,2,3,4)
tator = iter(t)
print(tator)
print(type(tator))
Out: <tuple_iterator object at 0x1064e0828>
<class 'tuple_iterator'>
```

바이트도 마찬가지로 반복형이므로 bytes_iterator 클래스로 전환된 것을 알 수 있다.

```python
In : b = b"Iteraotr"
bator = iter(b)
print(bator)
print(type(bator))
Out: <bytes_iterator object at 0x1064e0ac8>
<class 'bytes_iterator'>
```

바이트 어레이도 반복형이므로 bytearray_iterator 클래스로 전환된다.

```python
In : b = bytearray(b"Iteraotr")
bator = iter(b)
print(bator)
print(type(bator))
Out: <bytearray_iterator object at 0x1064e0b38>
<class 'bytearray_iterator'>
```

또한 딕셔너리도 반복형으로 처리가 가능하다. 대신 반복자로 변형을 할 경우 키만 반복 이 되고 값은 반복이 되지 않는다. 반복자인 클래스는 dict_keyiterator로 변환된다.

```python
In : d = {'a':1}
dator = iter(d)
print(dator)
print(type(dator))
Out: <dict_keyiterator object at 0x1064ec5e8>
<class 'dict_keyiterator'>
```

set도 반복형이므로 반복자인 set_iterator로 변환된다.

```python
In : s = { 1,2,3}
sator = iter(s)
print(sator)
print(type(sator))
Out: <set_iterator object at 0x1064e9900>
<class 'set_iterator'>
```

문자열을 대표적으로 반복자 변환해서 이를 next 함수로 처리해본다. 문자열이 5개 의 문자를 가지고 있으므로 5번째까지 next문을 이용하면 문자를 출력한다. 하지만 6 번째 호출하면 이 반복자가 전부 처리되어 더 이상 내부에 원소가 없다. 끝을 나타내는 StopIteration 예외가 발생한다.

```python
In : import collections.abc as cols
s = "Hello"
siter = iter(s)
print(next(siter))
print(next(siter))
print(next(siter))
print(next(siter))
print(next(siter))
print(next(siter))
Out: H
e
l
l
o
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-11-344f36f77f2f> in <module>()
10 print(next(siter))
11 print(next(siter))
---> 12 print(next(siter))
StopIteration:
```

기존 반복자가 StopIteration로 종료되었다. 이 변수로 다시 next 함수를 이용해서 처리 해보면 동일하게 StopIteration이 발생한다. 반복자는 한 번 사용하면 다시 사용할 수 없 이 모든 원소를 다 소비해서 내부에 아무 것도 없다는 것을 확인할 수 있다.

```python
In : next(siter)
Out: ---------------------------------------------------------------------
StopIteration         Traceback (most recent call last)
<ipython-input-15-1ef989b1f03b> in <module>()
----> 1 next(siter)
StopIteration:
```

다시 사용하기 위해서는 새롭게 반복자를 또 만들어야 한다. 이번에는 반복자가 종료되어 도 더 이상 예외를 발생시키지 않기 위해 for문을 사용해서 처리하면 들어 있는 원소까지 만 처리한다. 다시 반복자를 순환문에서 처리하면 결과가 아무 것도 출력이 되지 않는 것 을 알 수 있다.

```python
In : siter2 = iter(s)
for i in siter2 :
print(i)
Out: H
e
l
l
o
In : for i in siter2 :
print(i)
```

## 14.1.2 사용자 정의 클래스 반복형 생성 및 실행

사용자 클래스도 반복형을 정의할 수 있다. 반복형 클래스를 만들어서 어떻게 움직이는 지를 알아보겠다.

✚ 사용자 정의 클래스로 iterable 처리

사용자 정의 클래스 내부에 _ _iter_ _를 정의할 때 반환 결과를 iter 함수로 처리해서 반복 자를 반환해준다.

예제 14-3 : 사용자 클래스 반복형을 반복자로 처리

사용자 클래스 SeqIterable을 정의할 때 초기화 메서드 내에 반복형 문자열을 저장하는 속성을 하나 만들었다.

또한 반복형이 되려면 _ _iter_ _ 메서드를 정의해야 한다. 인스턴스 내부에 있는 속성이 반복자로 반환되도록 만들어 외부에서 iter 함수가 호출될 때에 이 반환값을 처리하도록 한다.

```python
In : import collections.abc as cols
class SeqIterable :
def __init__(self,seq) :
self.seq = seq
def __iter__(self) :
return iter(self.seq)
```

이 반복형 클래스를 가지고 하나의 인스턴스를 만든다. 사용자 클래스로 만든 Seq Iterable 클래스가 반복형인 지 알아보기 위해 issubclass 함수를 이용해서 추상 클래스와 의 상속 관계를 비교하면 True라고 표시된다.

```python
In : s = SeqIterable("abcdefg")
print(s)
print(issubclass(SeqIterable, cols.Iterable))
Out: <__main__.SeqIterable object at 0x10ad77e10>
True
```

이 인스턴스를 iter 함수에 넣어 반복자를 생성해서 sit 변수에 할당한다. 내부의 속성이 문 자열이므로 문자열의 반복자가 만들어진 것을 알 수 있다.

이를 issubclass를 이용해서 상속 관계를 확인해도 True라고 나온다.

```python
In : sit = iter(s)
print(sit)
print(issubclass(type(sit), cols.Iterator))
Out: <str_iterator object at 0x10ad77940>
True
```

반복자로 변환해서 next 함수를 호출하는 대신 순환문으로 처리하면 모든 문자를 출력하 는 것을 알 수 있다.

```python
In : for i in sit :
print(i)
Out: a
b
c
d
e
f
g
```

## 14.1.3 사용자 정의 클래스로 반복자 정의 및 실행

이번에는 사용자 정의 클래스로 반복자를 만들어서 반복자가 어떻게 움직이는지를 알아보 겠다.

✚ 사용자 반복자 정의

반복자를 생성할 때 _ _iter_ _, _ _next_ _를 전부 작성했다. 일단 어떻게 반복자가 처리되 는지를 이해해보자.

예제 14-4 : 사용자 클래스 반복자 처리

반복자는 _ _iter_ _ 결과로 자기 인스턴스를 전달해야 하므로 이 클래스의 인스턴스를 전 달했다. 내용이 저장된 것에 대한 초기값도 이때 만들었다.

```python
In : import collections.abc as cols
class SeqIterator :
def __init__(self, seq):
self.seq = seq
def __iter__(self):
self.n = 0
return self
def __next__(self):
if self.n < len(self.seq) :
result = self.seq[self.n]
self.n += 1
return result
else:
raise StopIteration
```

반복자 클래스로 문자열을 받아서 인스턴스를 만든다. 이 인스턴스가 반복자인지를 추상 클래스를 이용해서 확인했다.

```python
In : s = SeqIterator("반복자처리")
siter = iter(s)
print(siter)
print(issubclass(type(siter), cols.Iterator))
Out: <__main__.SeqIterator object at 0x108ffc160>
True
```

순환문을 이용해서 반복자를 실행하면 종료가 되어도 처리에 이상이 없다.

```python
In : for i in siter :
print(i)
Out: 반
복
자
처
리
```

이 반복자를 전부 처리하고 다시 next로 사용할 때 예외를 발생시켜야 하는지를 확인해보 면 StopIteration이 발생하는 것을 확인할 수 있다.

```python
In : next(siter)
Out: ---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-33-1ef989b1f03b> in <module>()
----> 1 next(siter)
<ipython-input-30-b5e6a98ddda6> in __next__(self)
16       return result
17     else:
---> 18     raise StopIteration
StopIteration:
```

반복자를 앞으로 배울 제너레이터 표현식을 이용해서도 단순하게 처리할 수 있다. 일 단 _ _iter_ _ 메서드 내부에 제너레이터를 하나 만들고 이를 인스턴스로 전달한다. 그리 고 _ _next_ _ 함수로 전달되는 self가 제너레이터 인스턴스이므로 하나씩 생성해서 반환 한다.

```python
In : import collections.abc as cols
class SeqIterator :
def __init__(self,seq) :
self.seq = seq
def __iter__(self) :
self = (n for n in self.seq)
return self
def __next__(self) :
for i in self :
return i
```

함수 iter로 반복자 인스턴스를 만들면 제너레이터 인스턴스가 만들어진 것을 알 수 있다.

제너레이터도 반복자 추상 클래스를 상속받은 것을 알 수 있다.

```python
In : s = SeqIterator("반복자처리")
siter = iter(s)
print(siter)
print(issubclass(type(siter), cols.Iterator))
Out: <generator object SeqIterator.__iter__.<locals>.<genexpr> at 0x10ea50e60>
True
```

next 함수를 호출해서 처리하는 방식으로 실행할 때마다 결과를 가져온다.

```python
In : print(next(siter))
print(next(siter))
print(next(siter))
print(next(siter))
print(next(siter))
print(next(siter))
Out: 반
복
자
처
리
---------------------------------------------------------------------
StopIteration           Traceback (most recent call last)
<ipython-input-7-816c1cbae006> in <module>()
4 print(next(siter))
5 print(next(siter))
----> 6 print(next(siter))
StopIteration:
```

위에서 반복자를 다 사용했다. 다시 내부 원소를 검색하면 더 이상 사용할 수 없다는 것을 표시해준다.

```python
In : next(siter)
Out: ---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-8-1ef989b1f03b> in <module>()
----> 1 next(siter)
StopIteration:
```

예제 14-5 : 예외 없이 종료하기

next 함수에도 초기값을 부여할 수 있다. 이 함수에 초기값을 부여하면 StopIteration 예 외가 발생하지 않고 처리가 종료될 경우 이를 반환한다.

위의 제너레이터로 만든 예제를 가지고 인스턴스를 다시 만들었다.

```python
In : s = SeqIterator("반복자처리")
siter = iter(s)
print(siter)
print(issubclass(type(siter), cols.Iterator))
Out: <generator object SeqIterator.__iter__.<locals>.<genexpr> at 0x10ea50eb8>
True
```

next 함수의 default 값에 None을 부여해서 예외가 발생하지 않도록 하여 처리한다. 종 료가 되면 초기값은 None이 반환되므로 StopIteration 예외는 발생하지 않는다.

```python
In : print(next(siter, None))
print(next(siter, None))
print(next(siter, None))
print(next(siter, None))
print(next(siter, None))
print(next(siter, None))
Out: 반
복
자
처
리
None
```
