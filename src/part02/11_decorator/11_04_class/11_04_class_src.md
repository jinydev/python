---
layout: default
title: "11.04 클래스를"
---

# 11.04 클래스를

파이썬은 데코레이터 함수 말고도 callable이 가능한 경우에 내부적으로 구조화해서 만들 수 있다. 전달되는 구조는 실행이 가능한 구조이어야 하고 인자로 전달하면 먼저 전달되 어 내부에 저장된 함수가 실행된다.

## 11.4.1 데코레이터의 실행 함수를 클래스로 처리하기

데코레이터 함수를 정의하고 클래스를 실행 함수 역할로도 사용할 수 있다. 클래스를 실 행 함수로 정의할 때 먼저 클래스에 필요한 정보를 추가해서 클래스가 처리하기 전에 클래 스에 임의의 상태를 세팅하는 구조를 만들어 클래스 처리 제어를 위한 목적으로 사용이 가 능하다.

예제 11-15 : 클래스에 함수 데코레이터 처리하기

일단 클래스도 함수처럼 데코레이터 함수를 통해 특정한 기능을 처리할 수 있다.

decorator 함수를 작성해서 전달된 클래스에 대한 속성을 추가하고 클래스를 전달하는 구성을 해봤다.

```python
In : import pprint
def decorator(cls) :
cls.a = "insert attribute"
return cls
```

클래스 A를 정의하고 데코레이터를 처리하면 클래스 A에 a라는 속성이 데코레이터를 처 리할 때 생긴다.

```python
In : @decorator
class A :
pass
print(A.a)
Out: insert attribute
```

이 클래스로 인스턴스도 만들 수 있다. 데코레이터를 처리할 때 내부에 클래스 속성인 a가 들어가 있는 것을 확인할 수 있다.

```python
In : ai = A()
pprint.pprint(A.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'A' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'A' objects>,
'a': 'insert attribute'})
```

## 11.4.2 클래스 데코레이터

클래스가 데코레이터 함수의 기능을 대신할 수 있도록 구성하는 것이 클래스 데코레이터 기능이다.

함수나 클래스 등에 데코레이터를 처리하기 전에 필요한 부분을 클래스로 정의하고 추가 적인 로직이나 클래스의 속성 등을 추가해서 공통적인 제어를 하도록 만들 때 사용한다.

대표적인 클래스 데코레이터는 property, classmehtod, staticmethod 등이 있다.

예제 11-16 : 클래스로 데코레이터 정의

Prop_dec 클래스를 정의하고 인스턴스를 만들 때 실행 함수를 전달받는다. 이 실행 함수 를 인스턴스의 속성으로 저장한다.

인스턴스가 호출될 때 저장된 함수의 매개변수를 전부 받아들이고 이를 저장된 함수에 전 달해서 실행할 수 있도록 만든다.

인스턴스를 호출하기 위해서는 _ _call_ _ 스페셜 메서드를 정의하고 내부에 저장된 함수 는 fget이라는 속성을 이용해서 실행하도록 한다.

```python
In : class Prop_dec(object):
"Emulate PyProperty_Type() in Objects/descrobject.c"
def __init__(self, fget=None):
self.fget = fget
Prop_dec.add = self
def __call__(self, obj, objtype=None):
return self.fget(obj)
```

실행 함수에는 클래스 데코레이터를 처리하고 인스턴스에는 이 함수를 내부에 저장했다.

클래스의 네임스페이스에 함수가 처리하는 인스턴스를 함수 이름으로 보관하도록 넣어두 었다. 이 인스턴스가 프로퍼티처럼 디스크립터로 생성된다면 이름으로 호출해서 처리도 가능하다.

```python
In : import pprint
pprint.pprint(Prop_dec.__dict__)
Out: mappingproxy({'__call__': <function Prop_dec.__call__ at
0x00000000052D4400>,
'__dict__': <attribute '__dict__' of 'Prop_dec' objects>,
'__doc__': 'Emulate PyProperty_Type() in Objects/
descrobject.c',
'__init__': <function Prop_dec.__init__ at
0x00000000052D4F28>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Prop_dec'
objects>})
```

실행 함수 add를 정의해서 하나의 파라미터 x로 처리하도록 만든다.

```python
In : @Prop_dec
def add(x):
return x['x'], x['y']
```

실행 함수를 실행하면 인스턴스가 들어가 있으므로 _ _call_ _이 호출되고 함수가 처리되 어 결과를 반환한다.

```python
In : print(add)
print(add.__dict__)
print(add({'x':5, 'y':5}))
Out: <__main__.Prop_dec object at 0x00000000052BF588>
{'fget': <function add at 0x00000000052B0AE8>}
(5, 5)
```

데코레이터를 일반 절차대로 처리해보면 생성자로 인스턴스를 생성할 때 함수를 넣고 실 행 함수랑 동일한 변수에 인스턴스를 생성한 후, 이 인스턴스를 실행하면 내부에 있는 함 수가 실행되어 결과를 출력하는 구조이다.

```python
In : add = Prop_dec(add)
print(add.__dict__)
print(add({'x':5, 'y':5}))
Out: {'fget': <__main__.Prop_dec object at 0x00000000052BF588>}
(5, 5)
```

## 11.4.3 메서드를 이용한 데코레이터로 사용하기

클래스 메서드나 인스턴스 메서드도 callable 처리가 되므로 매개변수 인자로 함수를 받 아서 메서드 내부 전달을 받은 함수를 저장하고 처리할 수도 있으나 간단히 함수의 객체 영역에서 추가적인 로직을 처리하는 구조를 이해한다.

예제 11-17 : 클래스 메서드를 데코레이터

클래스 메서드를 정의할 때 함수를 인자로 받아서 추가적인 로직을 처리한다. 클래스 메 서드의 반환값은 단순히 하기 위해서 함수로 처리했고 함수의 객체 영역에 a라는 속성을 추가했다.

```python
In : class DECC :
@classmethod
def attr_check(cls, Base) :
print(" DECC ")
Base.a = "decc"
return Base
```

함수에 데코레이터를 처리하면 함수가 반환되어 오는 단순한 구조이다.

```python
In : @DECC.attr_check
def add(x,y) :
return x+y
Out: DECC
```

클래스 메서드에서 반환값은 전달을 한 함수이므로 add는 원본 함수와 같고 이 함수를 실행해도 동일한 결과가 나온다. 함수 객체 영역에 변수 a를 조회하면 추가된 값을 알 수 있다.

```python
In : print(add)
print(add(5,5))
print(add.a)
Out: <function add at 0x0000000004C3AEA0>
decc
```

예제 11-18 : 인스턴스 메서드로 함수에 대한 데코레이터 처리

클래스의 인스턴스 정의 시 함수를 인자로 받고 함수로 반환하면 인스턴스 메서드도 데코 레이터로 사용이 가능하다.

위의 예와 동일하게 함수의 속성 a를 추가한 것을 확인해보면 된다.

```python
In : class DECD :
def attr_check(self, Base) :
print(" DECD ")
Base.a = "decd"
return Base
```

인스턴스를 생성하고 인스턴스 메서드로 함수의 데코레이터를 처리한다.

```python
In : d = DECD()
@d.attr_check
def add(x,y) :
return x+y
Out: DECD
```

처리된 결과를 보면 함수의 객체 영역에 변수 a가 추가되었다.

```python
In : print(add)
print(add(5,5))
print(add.a)
Out: <function add at 0x0000000004C3AE18>
decd
```

## 11.4.4 클래스 스페셜 메서드(special method) 조정

특정한 클래스의 특정한 메서드 등( _ _subclasshook_ _, _ _instancecheck_ _)에 대해 오버로 딩 등이 필요하면 함수로 데코레이터를 만들어서 클래스에 오버로딩한 속성을 추가할 수 있다.

예제 11-19 : 데코레이터를 이용해서 type 체크를 위한 작업

함수로 베이스가 되는 클래스 내의 _ _subclasshook_ _, _ _instancecheck_ _ 메서드를 동일한 속성으로 처리하는 함수를 가지고 메서드를 할당한다.

```python
In : def interface(*attributes):
def decorator(Base):
def checker(Other):
return all(hasattr(Other, a) for a in attributes)
def __subclasshook__(cls, Other):
if checker(Other):
return True
return NotImplemented
def __instancecheck__(cls, Other):
return checker(Other)
Base.__subclasshook__ = classmethod(__subclasshook__)
Base.__instancecheck__ = classmethod(__instancecheck__)
return Base
return decorator
```

추상 클래스를 만들고 그 내부에 스페셜 메서드들을 재정의한다. 이 데코레이터가 실행되 면 Foo 클래스에 2개의 클래스 메서드가 삽입된다(_ _subclasshook_ _, _ _instancecheck_ _).

```python
In : from abc import ABC
@interface("x", "y")
class Foo(ABC):
def x(self): return 5
def y(self): return 10
```

상속하지는 않는 다른 3개의 구현 클래스를 만든다.

```python
In : fclass Bar(object):
def x(self): return "blah"
def y(self): return "blah"
class Baz(object):
def __init__(self):
self.x = "blah"
self.y = "blah"
class attrdict(dict):
def __getattr__(self, attr):
return self[attr]
```

상속을 받지 않았지만 동일한 메서드가 포함된 경우 서브클래스로 평가가 된다. 그래서 Bar는 Foo 클래스의 subclass가 된다.

```python
In : b = Bar()
z = Baz()
t = attrdict({"x":27.5, "y":37.5})
print(isinstance(b, Foo))
print(issubclass(Bar, Foo))
print(isinstance(z, Foo))
print(isinstance(t, Foo))
Out: True
True
False
False
CHAPTER
```

파이썬 함수형 프로그래밍 파이썬은 명령형 프로그래밍 언어임과 동시에 객체지향 프로그래밍 언어이다. 다양한 함 수형 프로그래밍 언어들의 기법을 수용해서 다양하게 적용할 수 있는 기법을 지원한다.

수학적 함수와 프로그래밍 언어의 함수 간에 차이가 있지만 프로그래밍 언어들이 이 용어 를 채용한 것은 블랙박스로 기능을 캡슐화하는 방법을 수용했고 기능이 처리된 후에 상태 의 값을 바꿀 수 있는 부작용이 발생하지 않는 개념을 수용한 것이다.

명령형 프로그래밍 언어의 특징인 상태의 변화를 함수형 프로그래밍 언어의 특징인 함수 로 변경해서 적용하는 방법을 배울 수 있다. 함수형 프로그래밍 기반이 파이썬에서 어떻 게 적용하는지를 알아보겠다.

✚ 알아볼 주요 내용

● 순수 함수

● 일급 객체

● 재귀 호출 처리

● 고차 함수

● Apply 처리

● 멀티 디스패치 처리
