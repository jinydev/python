---
layout: default
title: "13.01 내장"
---

# 13.01 내장

일단 추상 클래스의 기본을 제공하는 모듈 abc를 확인하고 그 내부의 추상화에 따른 클래 스들을 알아보겠다.

## 13.1.1 추상 메타 클래스

추상 메타 클래스를 가지고 추상 클래스 및 사용자 추상 클래스를 만들어서 상속 관계를 확인하는 법과 동적으로 추상 클래스화할 수 있도록 register 함수를 통해 등록해서 사용 하는 법을 설명하겠다.

✚ 추상 클래스 모듈 abc

추상 클래스 모듈에서는 추상 클래스를 정의하기 위한 기능들을 제공한다.

예제 13-1 : abc 추상 모듈 내용 조회

파이썬 내의 모듈 abc를 import하면 안에는 추상 기본 클래스(ABC), 추상 메타 클래 스(ABCMeta) 그리고 추상 메서드를 지정하는 추상 클래스 메서드(abstractclassmethod), 추상 메서드(abstractmethod), 추상 프로퍼티(abstractproperty), 추상 정적 메서드 (abstractstaticmethod) 등을 가지고 있다.

```python
In : import abc
for i in dir(abc) :
if not i.startswith("_") :
print(i)
Out: ABC
ABCMeta
WeakSet
abstractclassmethod
abstractmethod
abstractproperty
abstractstaticmethod
get_cache_token
```

파이썬에서 모든 클래스는 메타 클래스인 type이 만든다. 또한 추상 클래스도 추상 메타 클래스(ABCMeta)로 만들어지는 것을 알 수 있다. 추상 메타 클래스는 상속도 type 클래스 라는 것을 확인할 수 있다.

```python
In : print(abc.ABCMeta)
print(abc.ABCMeta.__class__)
print(abc.ABCMeta.__bases__)
Out: <class 'abc.ABCMeta'>
<class 'type'>
(<class 'type'>,)
```

추상 클래스는 추상 메타 클래스로 만들어졌지만 상속은 최상위 클래스인 object이다.

```python
In : print(abc.ABC)
print(abc.ABC.__class__)
print(abc.ABC.__bases__)
Out: <class 'abc.ABC'>
<class 'abc.ABCMeta'>
(<class 'object'>,)
```

추상 클래스 내의 속성을 확인해보면 보호된 이름으로 만들어진 속성이나 메서드만 제공 하는 것을 알 수 있다.

```python
In : import pprint
a = set(dir(abc.ABC))
o = set(dir(object))
pprint.pprint(a - o)
Out: {'__abstractmethods__',
'__dict__',
'__module__',
'__weakref__',
'_abc_cache',
'_abc_negative_cache',
'_abc_negative_cache_version',
'_abc_registry'}
```

추상 클래스도 object를 생성하면 아무 것도 하지 않는 인스턴스가 만들어지는 것을 볼 수 있다. 제공하는 속성과 메서드가 없으므로 특별한 기능으로는 사용하지 않는다.

```python
In : a = abc.ABC()
print(a)
Out: <abc.ABC object at 0x000000000525BE48>
```

## 13.1.2 가상 추상 클래스 생성 및 등록

register 메서드는 서브 클래스에 대한 abc의 가상 서브 클래스 등록을 지원한다. 등록되 면 이를 이용해서 클래스의 관계를 알아볼 수 있다.

추상 클래스 내에 추상 메서드, 추상 클래스 메서드, 추상 정적 메서드, 추상 프로퍼티를 정의한 후에 이를 구현 클래스에 구현할 때 모든 추상 메서드들을 재정의해서 구현해야 한다. 일부를 구현하지 않으면 예외가 발생한다.

✚ 추상 클래스를 만들고 등록하기

직접 상속을 받지 않아도 추상 클래스를 상속받아 처리하는 것처럼 사용하기 위해 등록하 는 기능을 제공한다. 등록을 하면 추상 클래스로 subclass와 instance 여부를 체크할 수 있다.

예제 13-2 : 추상 클래스 내부에 가상 클래스 등록하기

MyABC 추상 클래스 ABC를 상속받아 정의했다.

```python
In : from abc import ABC,ABCMeta
class MyABC(ABC) :
pass
```

사용자 정의 추상 클래스를 만들면 추상 메타 클래스에 의해 만들어졌다고 나온다.

```python
In : print(issubclass(MyABC,ABC))
print(MyABC.__class__)
print(MyABC.__bases__)
Out: True
<class 'abc.ABCMeta'>
(<class 'abc.ABC'>,)
```

추상 클래스에 대해 상속은 하지 않지만 가상의 관계를 등록할 수 있다. 이때는 ABCMeta 내에 있는 register 메서드를 이용해서 처리하는 것이다.

```python
In : for i in dir(ABCMeta) :
if not i.startswith("_") :
print(i)
Out: mro
register
```

가상의 관계를 등록하기 위해 사용자 추상 클래스 MyABC에서 register 메서드를 조회하 면 메서드가 어디에 위치하는지도 알 수 있다.

```python
In : MyABC.register
Out: <bound method ABCMeta.register of <class '__main__.MyABC'>>
```

튜플 자료형은 MyABC를 상속하지 않지만 가상 상속 관계를 등록했으므로 내부적으로는 상속이 되어 있게 처리된다.

이를 확인하기 위해 상속 여부는 issubclass로 체크하고 인스턴스 여부는 isinstance로 체 크를 해보면 전부 True로 출력한다.

```python
In : MyABC.register(tuple)
print(issubclass(tuple,MyABC))
print(isinstance(tuple(),MyABC))
Out: True
True
```

✚ 추상 클래스를 만들고 구현 클래스 생성하기

추상 클래스를 만들고 이 추상 클래스를 상속받은 구현 클래스를 정의하는 방식을 알아보 겠다.

예제 13-3 : 추상 인스턴스 메서드를 구현 클래스 정의하기

가상 인스턴스를 만드는 abstractmethod는 하나의 내장 함수이다. 추상 메서드를 정의할 때 데코레이터로 처리하면 된다.

```python
In : from abc import ABCMeta, abstractmethod
print(abstractmethod)
Out: <function abstractmethod at 0x0000000001DD6488>
```

추상 클래스 Base를 정의할 때 추상 인스턴스 메서드를 2개 정의한다.

```python
In : from abc import ABCMeta, abstractmethod
class Base(metaclass=ABCMeta):
@abstractmethod
def foo(self):
return NotImplemented
@abstractmethod
def bar(self):
return NotImplemented
```

추상 클래스를 상속받아 Concrete 구현 클래스를 작성할 때 하나의 메서드만 만들었다.

```python
In : class Concrete(Base):
def foo(self):
pass
```

구현 클래스로 인스턴스를 생성하면 추상 클래스 내의 추상 인스턴스 메서드가 다 만들어 지지 않아서 예외가 발생한다.

```python
In : c = Concrete()
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-37-a067caf37739> in <module>()
----> 1 c = Concrete()
TypeError: Can't instantiate abstract class Concrete with abstract
methods bar
```

구현 클래스 Concrete_를 작성할 추상 클래스의 모든 메서드를 정의하고 내부 로직을 pass로 처리했다.

```python
In : class Concrete_(Base):
def foo(self):
pass
def bar(self):
pass
```

구현 클래스와 추상 클래스의 상속 관계를 issubclass 함수로 확인하면 True가 나오고 구 현 클래스의 인스턴스가 추상 클래스에 의해 만들어졌는지를 isinstance 함수로 확인하면 True로 출력한다.

상속 관계와 인스턴스 관계는 상속을 했기에 전부 만족하는 것을 알 수 있다.

```python
In : c = Concrete_()
print(c)
print(issubclass(Concrete_, Base))
print(isinstance(c, Base))
Out: <__main__.Concrete_ object at 0x00000000052CA0B8>
True
True
```

예제 13-4 : 추상 클래스 메서드와 추상 정적 메서드 처리하기

추상 인스턴스 메서드를 만들어서 구현 클래스를 만들고 이상 유무를 확인해봤다. 이제 추상 클래스 메서드와 추상 정적 메서드를 정의해서 구현 클래스에 재정의하는 부분을 알 아보겠다. 둘 다 내장 클래스로 지원하는 것을 알 수 있다.

```python
In : from abc import abstractclassmethod, abstractstaticmethod
print(abstractclassmethod)
print(abstractstaticmethod)
Out: <class 'abc.abstractclassmethod'>
<class 'abc.abstractstaticmethod'>
```

이번에는 추상 클래스를 상속받는 것이 아니라 추상 메타 클래스를 사용해서 직접 생성하 는 것으로 처리하겠다.

```python
In : from abc import ABCMeta, abstractmethod, \
abstractclassmethod, abstractstaticmethod
class BaseCS(metaclass=ABCMeta):
@abstractmethod
def foo(self):
pass
@abstractmethod
def bar(self):
pass
@abstractclassmethod
def clsmethod1(cls) :
pass
@abstractclassmethod
def clsmethod2(cls) :
pass
@abstractstaticmethod
def stamethod1(cls) :
pass
@abstractstaticmethod
def stamethod2(cls) :
pass
```

추상 클래스를 상속받고 인스턴스 메서드만 구현했다. 추상 클래스 메서드와 정적 메서드 는 구현하지 않았다.

```python
In : class Concrete_CS(BaseCS):
def foo(self):
pass
def bar(self):
pass
```

구현 클래스로 인스턴스를 생성하면 추상 클래스 메서드와 추상 정적 메서드가 구현 클래 스 내에 작성을 하지 않았다는 예외가 발생한다.

```python
In : c = Concrete_CS()
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-55-e14beec3c1f3> in <module>()
----> 1 c = Concrete_CS()
TypeError: Can't instantiate abstract class Concrete_CS with abstract
methods clsmethod1, clsmethod2, stamethod1, stamethod2w
```

이제 다시 구현 클래스 내에 추상 클래스 메서드와 추상 정적 메서드를 전부 재정의했다.

내부 로직은 구현하지 않고 pass로 처리했다.

추상 클래스에서 사용된 추상 클래스 메서드, 정적 메서드를 classmethod, staticmethod 로 지정해서 만든 것을 알 수 있다.

```python
In : class Concrete_CS1(BaseCS):
def foo(self):
pass
def bar(self):
pass
@classmethod
def clsmethod1(cls) :
pass
@classmethod
def clsmethod2(cls) :
pass
@staticmethod
def stamethod1(cls) :
pass
@staticmethod
def stamethod2(cls) :
pass
```

구현 클래스를 가지고 하나의 인스턴스를 만들었다. 추상 클래스에 정의된 메서드가 구현 되어 있어 예외가 없이 인스턴스가 만들어진다.

상속 관계를 issubclass로 점검하고 인스턴스 관계를 isinstance로 확인한다. 추상 클래스 를 상속했기에 상속 관계도 True로 표시되고, 부모 클래스가 추상 클래스이지만 인스턴스 관계도 True라 표시된다.

```python
In : cs1 = Concrete_CS1()
print(issubclass(Concrete_CS1, BaseCS))
print(isinstance(cs1, BaseCS))
Out: True
True
```

예제 13-5 : 추상 프로퍼티 처리하기

파이썬에서는 프로퍼티 처리가 있으므로 추상 클래스 내에도 추상 프로퍼티가 있다.

Property와 동일하게 abstractproperty도 클래스라는 것을 알 수 있다.

```python
In : from abc import abstractproperty
print(abstractproperty)
Out: <class 'abc.abstractproperty'>
```

추상 클래스를 이번에는 추상 메타 클래스를 가지고 만들었다. abc.abstractproperty로 데코레이터를 만들어서 처리했다.

foo 메서드에 반환값이 3이라는 로직이 있다.

```python
In : import abc
class C(metaclass= abc.ABCMeta) :
@abc.abstractproperty
def foo(self): return 3
```

이를 상속받은 구현 클래스를 하나 정의하고 그 내부에 구현 property를 지정한 뒤 동일 한 메서드를 재정의한다. 내부 로직은 부모 클래스 내의 메서드 foo 이름으로 접근해서 결 과를 가져오도록 했다.

프로퍼티는 이름으로 접근하므로 구상 클래스 내에서 추상 클래스에 직접 접근하여 결과 를 반환했다.

```python
In : class D(C):
@property
def foo(self):
return super(D, self).foo
```

구현 클래스를 가지고 인스턴스를 만들어서 프로퍼티를 호출하면 추상 클래스 내의 프로 퍼티를 읽어서 처리하는 것을 알 수 있다.

```python
In : d = D()
print(d.foo)
Out: 3
```

예제 13-6 : 추상 클래스를 정의하고 직접 상속받아 구현하기

추상 클래스를 상속받아 새로운 추상 클래스를 만든다. 내부에 인스턴스 메서드를 정의 한다.

스페셜 메서드 _ _lt_ _, _ _add_ _를 정의하고 반환값에 메서드가 구현이 되지 않았다는 것을 명기했다. 추상 클래스를 상속받아 구현 클래스에서 구현해야 한다.

```python
In : import abc
class ABCD(abc.ABC) :
def __lt__(self, a):
return NotImplemented
def __add__(self, a):
return NotImplemented
```

추상 클래스를 상속받아 초기화 메서드를 정의했다. 인스턴스 내부의 속성은 value 하나 를 정의했다.

인스턴스 메서드인 스페셜 메서드 _ _lt_ _, _ _add_ _는 int 클래스 내의 스페셜 메서드로 처리했다. 보통 이런 스페셜 메서드를 재정의할 때 주의할 점은 점 연산자를 통해 접근할 때 재귀 호출도 발생할 수 있으므로 정수를 처리하기 위해 int 클래스 내의 스페셜 메서드 를 이용해서 처리했다.

```python
In : class A(ABCD) :
def __init__(self,value) :
self.value = value
def __lt__(self, a):
return int.__lt__(self.value,a.value)
def __add__(self, a):
return int.__add__(self.value,a.value)
```

두 개의 인스턴스를 만들어서 덧셈과 비교했다. 스페셜 메서드가 처리되어 결과가 나오는 것을 알 수 있다.

```python
In : a = A(1)
b = A(2)
print(a < b)
print(a + b)
Out: True
```

## 13.1.3 추상 클래스 내의 subclasshook 추가

파이썬의 특징으로 상속 관계를 명확히 하지 않아도 상속 관계를 처리하는 issubclass로 처리할 수 있다.

이런 이유로 스페셜 메서드를 이용해서 프로토콜 규약에 따라 상속 관계를 처리하는 것을 볼 수 있다.

또한 subclasshook 기능을 처리하기 위해 두 스페셜 메서드인 _ _subclasshook_ 와 _ _ instancecheck_ _ 메서드를 재정의해서 issubclass 함수와 isinstance 함수가 이 메서드 를 호출하여 처리할 수 있도록 해준다.

✚ 서브 클래스 체크

상속 관계를 변경하기 위해 _ _subclasshook_ _ 를 재정의해서 작성할 수 있다. 하위 클 래스와의 관계를 명확히 하기 위해서는 내부 특정 메서드들이 같을 경우 이를 추가로 작성 해서 하위 클래스를 인식할 수 있도록 만들 수 있다.

예제 13-7 : 추상 클래스 정의 : __subclasshook__ 재정의

하나의 추상 클래스 ABCD를 만든다. 이 클래스 내부에 인스턴스 메서드 _ _len_ _를 정 의했다. 내부는 구현하지 않았으므로 구상 클래스에서 로직을 작성해야 한다.

상속 관계를 명확히 하기 위해 _ _subclasshook_ _를 재정의했다. 하위 클래스의 _ _ mro_ _ 속성으로부터 클래스를 가져와서 그 내부에 메서드로 “_ _len_ _”이 지정되어 있다면 True로 처리하도록 한다.

추상 클래스에 추상 인스턴스 메서드로 _ _len_ _를 정의했다. 그리고 _ subclasshook_ _ 메서드 내부에 구현된 클래스들이 ABCD 추상 클래스와 동일한 메서드를 구현하는지를 확인하고 상속 관계를 True로 반환한다.

```python
In : import abc
class ABCD(abc.ABC) :
def __len__(self) :
return NotImplemented
@classmethod
def __subclasshook__(cls, C) :
print(" __subclasshook__ ")
if any( "__len__" in B.__dict__ for B in C.__mro__ ) :
return True
else :
return False
```

이제 이 추상 클래스를 가지고 Seq 구상 클래스를 정의했다. 내부에 _ _len_ _이라는 메서 드를 재정의했다. 그 내부 로직에는 인스턴스 값이 들어간 seqs 속성의 길이를 처리하기 위해 str 클래스 내의 _ _len_ _으로 처리하는 것을 알 수 있다.

```python
In : class Seq(ABCD) :
def __init__(self, seqs) :
self.seqs = seqs
def __len__(self) :
print(" Seq __len__")
return str.__len__(self.seqs)
```

이 클래스의 mro 속성을 확인하면 기본적으로 자기 자신부터 사용자 추상 클래스, 추상 클래스, object 클래스 순으로 상속된 절차대로 나열된 것을 알 수 있다.

```python
In : Seq.__mro__
Out: (__main__.Seq, __main__.ABCD, abc.ABC, object)
```

인스턴스를 하나 만들어서 클래스 간의 관계를 확인하는 함수인 issubclass를 호출하면 사용자 추상 클래스에 정의된 메서드가 호출되어 처리되는 것을 알 수 있다. 그리고 문자 열의 길이를 확인하는 len 함수를 호출하면 Seq 클래스 내의 메서드를 호출한 것도 알 수 있다.

```python
In : s = Seq("문자열")
print(issubclass(Seq, ABCD))
print(isinstance(s, ABCD))
print(len(s))
Out: __subclasshook__
True
True
Seq __len__
```

새로운 클래스를 하나 정의하는데 내부에는 아무런 로직이 없다. 이 클래스의 mro 관계를 확인하면 최상위 클래스인 object만 상속한 것을 알 수 있다.

```python
In : class Not_seq :
pass
print(Not_seq.__mro__)
Out: (<class '__main__.Not_seq'>, <class 'object'>)
```

이 클래스와 ABCD 추상 클래스와의 상속 관계를 처리하면 이 추상 클래스에 정의된 _ _ subclasshook_ _가 호출되어 처리되는 것을 확인할 수 있다.

```python
In : print(issubclass(Not_seq, ABCD))
print(isinstance(Not_seq(), ABCD))
Out: __subclasshook__
False
False
```

상속을 받지 않았지만 issubclass, isinstance로 확인해보면 상속을 하고 있는 것을 알 수 있다. 파이썬은 이처럼 상속을 하지 않아도 내부에 정의된 스페셜 메서드가 동일한 경우 는 상속을 한 것으로 여긴다.

```python
In : class Seq2 :
def __len__(self) :
pass
print(Seq2.__mro__)
Out: (<class '__main__.Seq2'>, <class 'object'>)
In : print(issubclass(Seq2, ABCD))
print(isinstance(Seq2(), ABCD))
Out: __subclasshook__
True
True
```

✚ 사용자 클래스를 정의해서 인스턴스 확인하기

클래스와 인스턴스 관계를 확인하기 위해 스페셜 메서드 _ _instancecheck_ _도 재정의 해서 세부적인 기능을 추가할 수 있다.

예제 13-8 : 추상 메타 클래스 정의 : __instancecheck__ 재정의

Enumeration 메타 클래스를 정의하고 내부에 있는 스페셜 메서드 _ _instancecheck_ _ 를 재정의한다.

```python
In : import abc
class Enumeration(abc.ABCMeta):
def __instancecheck__(self, other):
print('hi')
if type(other) == type(self) :
return True
else :
return False
```

구현 클래스인 EnumInt를 만들면서 메타 클래스를 Enumeration으로 지정했다.

Isinstance로 호출하면 스페셜 메서드를 호출해서 처리한다.

```python
In : class EnumInt(metaclass= Enumeration):
pass
print(isinstance('abc', EnumInt))
print(isinstance( EnumInt, EnumInt))
Out: hi
False
hi
True
```

하나의 인스턴스 c를 생성해서 isinstance 함수로 확인해보면 결과는 True이지만 Enumeration 메타 클래스를 호출하지 않았다는 것을 확인할 수 있다. instance를 만들 어서 호출하면 결과는 나오지만 기존에 정의된 기준으로 호출된다.

```python
In : c = EnumInt()
print(isinstance(c, EnumInt))
Out: True
In : Enumeration.__instancecheck__(c,c)
Out: hi
True
```

## 13.1.4 Protocol interface 이해하기

파이썬에서 상속 없이도 자료형 간의 상속 관계가 처리되는 것을 예제로 봤다. 이런 규칙 을 만들어서 관리하는 경우를 조금 더 알아본다.

내장 클래스들에 대한 추상 클래스를 이해하려면 이 개념을 명확히 숙지하고 가야 한다.

동적으로 클래스 간의 관계를 확인할 수 있는 기법을 프로토콜 인터페이스(protocol interface)라 한다. 파이썬에서 기본으로 제공되는 추상 클래스들은 상속 없이 이 규칙에 따 라 암묵적으로 처리된다.

✚ 추상 클래스 Sized의 프로토콜 정의

일단 collections.abc 모듈에 있는 Sized 클래스를 가지고 프로토콜 인터페이스가 어떻게 처리되는지를 알아보겠다.

예제 13-9 : 추상 클래스를 상속받고 구현한 후 점검하기

Sized 추상 클래스에는 _ _len_ _ 스페셜 메서드만 이 추상 클래스의 메서드이고 len 함수 를 호출하면 실행하게 되는 메서드이므로 이를 상속받으면 구현 클래스에서 원소의 개수 를 계산하는 로직을 재정의해야 한다.

```python
In : import collections.abc as cols
import pprint
pprint.pprint(cols.Sized.__dict__)
Out: mappingproxy({'__abstractmethods__': frozenset({'__len__'}),
'__doc__': None,
'__len__': <function Sized.__len__ at 0x00000000022067B8>,
'__module__': 'collections.abc',
'__slots__': (),
'__subclasshook__': <classmethod object at
0x00000000022049E8>,
'_abc_cache': <_weakrefset.WeakSet object at
0x0000000002204A58>,
'_abc_negative_cache': <_weakrefset.WeakSet object at
0x0000000002204A90>,
'_abc_negative_cache_version': 9,
'_abc_registry': <_weakrefset.WeakSet object at
0x0000000002204A20>})
```

하나의 사용자 클래스 Len을 정의하면서 추상 클래스 등을 상속하지 않고 _ _len_ _ 메서 드를 재정의했다.

```python
In : class Len(object) :
def __init__(self, seq) :
self.seq = seq
def __len__(self) :
return len(self.seq)
```

Len 클래스가 참조하는 클래스를 확인해보면 Sized 클래스는 없다.

```python
In : Len.__mro__
Out: (__main__.Len, object)
```

Len 클래스로 인스턴스를 만들고 이 인스턴스의 자료형을 확인한 후에 len 함수를 통해 길이를 확인한다.

```python
In : import collections.abc as cols
```

s = Len("길이 메서드") print(type(s)) print(len(s))

```python
Out: <class '__main__.Len'>
```

그리고 collections.abc.Sized 추상 클래스와의 상속 관계를 issubclass 함수로 확인하면 True로 출력되는 것을 확인할 수 있다.

```python
In : import collections.abc as cols
print(issubclass(Len, cols.Sized))
Out: True
```
