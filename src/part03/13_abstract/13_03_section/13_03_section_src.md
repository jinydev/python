---
layout: default
title: "13.03 컬렉션"
---

# 13.03 컬렉션

자료 구조는 보통 다양한 원소를 가진 클래스로 처리된다. 내장 자료형인 문자열, 튜플, 리스트, 딕셔너리, set 등의 클래스가 어떤 추상 클래스에 의해 정의되었는지를 확인할 필 요가 있다.

이번에는 컬렉션 자료형에 대한 추상 클래스를 확인하고 내부가 어떻게 정의되었는지를 알아보겠다.

## 13.3.1 collections.abc 모듈 이해하기

컬렉션 모듈은 원소 하나 이상을 가진 자료형에 대한 추상화 클래스들의 관계를 나타내고 이에 관련된 클래스들을 표시한다.

예제 13-16 : collections.abc 모듈 구조

컬렉션 모듈이 가진 추상화 클래스는 컬렉션을 구성해야 할 클래스 간의 관계 클래스를 정 의한다.

```python
In : import collections.abc as cols
count = 0
for i in dir(cols) :
count += 1
if not i.startswith("_") :
print(i, end= " ")
if count %5 ==0 :
print()
Out: AsyncGenerator AsyncIterable AsyncIterator Awaitable ByteString
Callable Collection Container Coroutine Generator
Hashable ItemsView Iterable Iterator KeysView
Mapping MappingView MutableMapping MutableSequence MutableSet
Reversible Sequence Set Sized ValuesView
```

Collection 추상 클래스는 Sized, Iterable, Container 3개의 추상 클래스를 상속해서 구 성한 것을 알 수 있다.

```python
In : print(cols.Collection.__bases__)
print(cols.Sized.__bases__)
print(cols.Iterable.__bases__)
print(cols.Container.__bases__)
Out: (<class 'collections.abc.Sized'>, <class 'collections.abc.Iterable'>,
<class 'collections.abc.Container'>)
(<class 'object'>,)
(<class 'object'>,)
(<class 'object'>,)
```

추상 클래스는 Sized, Iterable, Container를 상속받을 경우 구현할 메서드들에 대해 알 아본다. 각 클래스별로 구현할 스페셜 메서드에 _ _len_ _, _ _iter_ _, _ _contains_ _가 있 는 것을 알 수 있다.

```python
In : cols.Sized.__abstractmethods__
Out: frozenset({'__len__'})
In : cols.Iterable.__abstractmethods__
Out: frozenset({'__iter__'})
In : cols.Container.__abstractmethods__
Out: frozenset({'__contains__'})
```

Collection 클래스는 3개의 추상 클래스를 상속했으므로 기본으로 상속한 클래스가 그대 로 반영된 것을 알 수 있다. 이를 상속받았으면 3개의 메서드는 반드시 구현을 해야 한다.

```python
In : cols.Collection.__abstractmethods__
Out: frozenset({'__contains__', '__iter__', '__len__'})
```

## 13.3.2 Sequence 타입

str, bytes, bytearray, tuple, list 등의 내장 클래스에 대한 collections.abc와의 관계를 이해해보자.

✚ Sequence 타입 체크

파이썬 내의 Sequence 타입은 기본적으로는 Sequence 추상 클래스 기반으로 만들어져 있다.상속은 받지 않지만 추상 클래스와의 관계를 체크할 수 있는 기준을 파이썬에서는 지원한다. 단 Array.array 내장 자료형은 Sequence 타입이 아니다.

예제 13-17 : Sequence 자료형 확인하기

Sequence 자료형들의 최상위 추상화 모듈을 확인해보면 변경이 불가능한 Sequence 클 래스와 변경이 가능한 MutableSequence 클래스로 구성되어 있다.

```python
In : import collections.abc as cols
print(cols.Sequence.__bases__)
print(cols.Reversible.__bases__)
print(cols.MutableSequence.__bases__)
Out: (<class 'collections.abc.Reversible'>, <class 'collections.abc.
Collection'>)
(<class 'collections.abc.Iterable'>,)
(<class 'collections.abc.Sequence'>,)
```

Sequence 클래스와 Reverible 클래스 내의 스페셜 메서드는 총 4개가 있고 이를 구현해 야 Sequence 자료형이라는 것을 알 수 있다.

```python
In : cols.Reversible.__abstractmethods__
Out: frozenset({'__iter__', '__reversed__'})
In : cols.Sequence.__abstractmethods__
Out: frozenset({'__getitem__', '__len__'})
```

리스트 등 변경이 가능한 MutableSequence 클래스일 경우는 5개의 메서드가 구현되어 야 하는 것을 알 수 있다.

```python
In : cols.MutableSequence.__abstractmethods__
Out: frozenset({'__delitem__', '__getitem__', '__len__', '__setitem__',
'insert'})
```

내장 자료형인 문자열, 바이트, 바이트 어레이, 튜플, 리스트 등은 추상 클래스인 Sequence 클래스와 상속 관계를 유지한다. 단 array.ArrayType 클래스는 상속 관계를 유지하지 않 는 것을 확인할 수 있다.

```python
In : import collections.abc as cols
import array
print(issubclass(str, cols.Sequence))
print(issubclass(bytes, cols.Sequence))
print(issubclass(bytearray, cols.Sequence))
print(issubclass(list, cols.Sequence))
print(issubclass(tuple, cols.Sequence))
print(issubclass(array.ArrayType, cols.Sequence))
Out: True
True
True
True
True
False
```

Sequence 자료형 중에 변경이 가능한 경우 상속 관계가 차이에 생긴다. 리스트나 bytearray에 대한 상위 클래스는 MutableSequence 추상 클래스를 상속해서 구현되었다

는 것을 알 수가 있다.

```python
In : print(issubclass(bytearray, cols.MutableSequence))
print(issubclass(list, cols.MutableSequence))
Out: True
True
```

array 모듈에서 ArrayType 클래스도 MutableSequence로 구현되어야 할 메서드가 구 현되었지만 파이썬 내부적으로는 상속 관계가 아닌 것을 알 수 있다.

```python
In : import array
print(issubclass(array.ArrayType, cols.MutableSequence))
aa = frozenset(dir(array.ArrayType))
print( cols.MutableSequence.__abstractmethods__ & aa)
Out: False
frozenset({'__getitem__', '__setitem__', '__delitem__', '__len__',
'insert'})
```

사용자 클래스 Sequence를 추상 클래스 collections.Sequence 클래스로 상속하고 스페 셜 메서드를 오버라이딩해서 처리하면 Sequence 자료형처럼 처리된다.

```python
In : import collections.abc as cols
class SEQ(cols.Sequence) :
def __init__(self, seq) :
self.seq = seq
def __getitem__(self,index) :
return self.seq[index]
def __len__(self) :
return len(self.seq)
```

SEQ 클래스에 대한 상속 관계를 확인하고 인스턴스를 만들어서 정수 인덱스 검색 및 길 이를 확인해본다.

```python
In : s = SEQ("변경불가능한 시퀀스 자료형")
print(issubclass(SEQ, cols.Sequence))
print(SEQ.__bases__)
print(s[5])
print(len(s))
Out: True
(<class 'collections.abc.Sequence'>,)
한
```

## 13.3.3 Mapping 타입 : dict

내장 자료형인 딕셔너리(dict)에 대한 collections.abc 모듈의 상속 관계를 확인해보면 Collections, Mapping, MutableMapping 추상 클래스를 상속받아 만들어진 클래스 이다.

예제 13-18 : 딕셔너리 자료형의 상속 관계

추상 클래스의 상속 관계를 확인해보면 mapping 자료형도 Collection 클래스를 상속받 고 변경이 가능한 경우 MutableMapping 클래스가 만들어져서 상속 관계를 처리하도록 했다.

```python
In : import collections.abc as cols
print(cols.Mapping.__bases__)
print(cols.MutableMapping.__bases__)
Out: (<class 'collections.abc.Collection'>,)
(<class 'collections.abc.Mapping'>,)
```

변경 가능 여부에 따라서 구현할 인스턴스 메서드는 _ _setitem_ _, _ _delitem_ _이 더 추 가되는 것을 알 수 있다.

```python
In : cols.Mapping.__abstractmethods__
Out: frozenset({'__getitem__', '__iter__', '__len__'})
In : cols.MutableMapping.__abstractmethods__
Out: frozenset({'__delitem__', '__getitem__', '__iter__', '__len__', '__
setitem__'})
```

변경 불가능한 Mapping과 변경 가능한 MutableMapping 클래스 간의 메서드 차이는 원소를 변경할 수 있는 메서드 차이인 것을 알 수 있다.

```python
In : import pprint
mp = set(dir(cols.Mapping))
mm = set(dir(cols.MutableMapping))
pprint.pprint(mm-mp)
Out: {'_MutableMapping__marker',
'__delitem__',
'__setitem__',
'clear',
'pop',
'popitem',
'setdefault',
'update'}
```

내장 자료형인 딕셔너리는 Mapping이면서 MutableMapping 추상 클래스를 상속받아 생성되는 관계를 가진다. 딕셔너리는 변경이 가능한 클래스인 것을 알 수 있다.

```python
In : print(issubclass(dict, cols.Mapping))
print(issubclass(dict, cols.MutableMapping))
Out: True
True
```

Dict 클래스는 MutableMapping 추상 클래스를 상속받아 스페셜 메서드를 정의한다.

_ _iter_ _를 지정하지 않으면 검색할 때 예외가 발생하므로 반드시 오버로딩으로 구현을 해야 한다.

```python
In : import collections.abc as cols
class Dict(cols.MutableMapping) :
def __init__(self,dict_) :
self.dict_ = dict_
def __getitem__(self, key) :
return self.dict_[key]
def __setitem__(self, key, value) :
self.dict_[key] = value
def __delitem__(self,key) :
del self.dict_[key]
def __iter__(self) :
return iter(self.dict_)
def __len__(self) :
return len(self.dict_)
```

Dict 클래스로 인스턴스를 정의해서 딕셔너리 자료형처럼 _ _getitem_ _에 속성 ‘a’를 넣 고 해당 값을 조회하면 1을 출력하는 것을 볼 수 있다. 갱신을 하기 위해 d[‘c’]를 넣고 처 리하면 키와 값이 추가되고 조회하면 결과가 반환된다.

```python
In : d = Dict({'a':1, 'b':2})
print(d['a'])
d['c'] = 100
print(d['c'])
Out: 1
```

## 13.3.4 Set 타입 : set, frozenset

Set과 frozenset에 대한 추상 클래스 관계를 확인해본다.

✚ 변경 불가 및 변경 가능 여부

파이썬 내장 자료형은 변경 가능한 set과 변경 불가능한 frozenset 타입이 있다. 두 개의 자료형이 변경 가능한지에 대한 여부를 확인해보겠다.

예제 13-19 : set과 frozenset 클래스의 상속 관계

Set과 MutableSet에 대한 상속 관계를 확인해보면 set 자료형은 Set이면서 MutableSet 이고 frozenset은 Set만을 상속했다.

```python
In : print(cols.Set.__bases__)
print(cols.MutableSet.__bases__)
Out: (<class 'collections.abc.Collection'>,)
(<class 'collections.abc.Set'>,)
```

MuatableSet 추상 클래스에 변경이 가능한 메서드가 더 추가된 것을 확인할 수 있다.

```python
In : import pprint
mp = set(dir(cols.Set))
mm = set(dir(cols.MutableSet))
pprint.pprint(mm-mp)
Out: {'__iand__',
'__ior__',
'__isub__',
'__ixor__',
'add',
'clear',
'discard',
'pop',
'remove'}
```

내장 자료형인 set, frozenset을 확인해보면 set은 변경 가능한 자료형이고 frozenset은 변경이 불가능한 자료형이라는 것을 알 수 있다.

```python
In : print(issubclass(set, cols.MutableSet))
print(issubclass(frozenset, cols.MutableSet))
print(issubclass(frozenset, cols.Set))
print(issubclass(set, cols.Set))
Out: True
False
True
True
```

사용자 클래스 Set에 MutableSet 추상 클래스를 상속받아서 재정의하려면 세부적인 스페 셜 메서드들을 구현해야 한다.

Isinstance를 점검하기 위해서는 반드시 _ _contains_ _, _ _iter_ _도 추가되어야 한다. 또 한 원소를 추가 및 삭제하기 위한 메서드를 add, discard로 재정의했다.

```python
In : import collections.abc as cols
class Set(cols.MutableSet) :
def __init__(self,set_) :
self.set_ = set(set_)
def __contains__(self, key) :
return key in self.set_
def __getitem__(self, key) :
return self.set_[key]
def __setitem__(self, key, value) :
self.set_[key] = value
def __delitem__(self,key) :
del self.set_[key]
def __iter__(self) :
return iter(self.set_)
def __len__(self) :
return len(self.set_)
def add(self, key) :
self.set_.add(key)
def discard(self,key) :
self.set_.discard(key)
def __str__(self) :
return str(self.set_)
```

인스턴스를 생성해서 출력해보면 set 연산처럼 _ _str_ _ 출력하는 부분을 str(self.set)으로 처리하도록 만들었다.

```python
In : ss = Set([1,2,3])
print(isinstance(ss, cols.MutableSet))
ss.add(4)
print(ss)
ss.discard(4)
print(ss)
Out: True
{1, 2, 3, 4}
{1, 2, 3}
```

13.3.5. 딕셔너리의 view 타입 내장 타입인 딕셔너리(dict) 내부의 키, 값, item들에 대한 view 자료형에 대한 추상 관계 를 알아보기로 하겠다.

예제 13-20 : view 형태의 클래스 제공

동적인 형태를 만들어서 호출할 때마다 원소를 가져올 수 있도록 정의해서 사용한다. 정 적인 타입과의 차이점은 필요 시마다 호출되므로 컴퓨터의 메모리 사용량을 줄일 수 있다

는 것이다.

예제 13-21 : Key 값에 대한 자료형 확인

MappingView는 view 자료형 중에 최상위 추상 클래스이다. Key에 대한 view는 Keys View, values에 대한 view는 ValuesView, Key와 Value의 쌍을 처리하는 ItemsView 추상 클래스를 가지고 있다.

```python
In : import collections.abc as cols
print(cols.MappingView.__bases__)
print(cols.KeysView.__bases__)
print(cols.ValuesView.__bases__)
print(cols.ItemsView.__bases__)
Out: (<class 'collections.abc.Sized'>,)
(<class 'collections.abc.MappingView'>, <class 'collections.abc.Set'>)
(<class 'collections.abc.MappingView'>,)
(<class 'collections.abc.MappingView'>, <class 'collections.abc.Set'>)
```

KeysView는 Mapping 즉 dict 타입처럼 처리할 수 있는 자료형을 만들지만 값들은 원래 정의된 것을 직접 참조만 하는 객체를 제공하는 클래스이다. set도 상속을 받아 구현했기 때문에 집합 연산 처리도 가능하다.

```python
In : import collections.abc as cols
d = dict({'a': 1, 'b':2})
print(issubclass(type(d.keys()),cols.KeysView))
s = d.keys()
print(isinstance(s,cols.Set))
Out: True
True
```

ValuesView는 Mapping 즉 dict 타입처럼 처리할 수 있는 자료형을 만들지만 값들은 원 래 정의된 것을 직접 참조만 하는 객체를 제공하는 클래스이다. 이를 기반으로 원 dict 내 의 Value 값들만 바로 참조할 수 있는 구조가 되었다는 것을 보여준다.

```python
In : import collections.abc as cols
d = dict({'a': 1, 'b':2})
print(issubclass(type(d.values()),cols.ValuesView))
s = d.values()
print(isinstance(s,cols.Set))
Out: True
False
```

ItemsView는 Mapping 즉 dict 타입처럼 처리할 수 있는 자료형을 만들지만 값들은 원 래 정의된 것을 직접 참조만 하는 객체를 제공하는 클래스이다. 이를 기반으로 원 dict 내 의 key/Value 값들만 바로 참조할 수 있는 구조가 되었다는 것을 보여준다.

```python
In : import collections.abc as cols
d = dict({'a': 1, 'b':2})
print(issubclass(type(d.items()),cols.ItemsView))
s = d.items()
print(isinstance(s,cols.Set))
Out: True
True
```
