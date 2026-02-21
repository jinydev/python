---
layout: default
title: "09.06 상속(Inheritance)"
---

# 09.06 상속(Inheritance)

객체지향에서 재사용성을 강조하는데 특히 기존에 만들어진 클래스를 이용해서 추가적인 부분을 처리할 수 있다. 이는 기존 클래스를 내 클래스처럼 사용할 수 있는 상속 구조를 만들어서 제공하기 때문이다.

구조화된 클래스들은 단지 상속이라는 표기법만 사용하면 상속을 받은 클래스와 연계되어 하나의 클래스로 처리되는 구조를 만들어준다.

클래스의 책임성을 어떻게 분리해야 더 좋은 관계를 유지할 수 있는지를 이해하려면 책임 성에 대한 행위 즉 기능을 명확히 결정해야 한다. 보통 추상 클래스를 정의해서 책임성을 분리하고 이 추상 클래스에 맞춰 구현하는 방안으로 구조화해야 한다.

일단 이번 장에서는 상속 관계에 대한 기본적인 개념을 주로 이해하고 구조화를 어떻게 처 리할지 알아보겠다.

9.6.1. 상속 상속에 대해 더 간단히 설명하면 새로운 클래스를 정의할 때 기존의 클래스를 재활용해서 변경되는 부분만 자기 클래스에 추가해서 작성할 수 있다.

파이썬은 다중 상속을 허용하므로 기존에 정의된 클래스들을 여러 개 상속받아서 재사용 이 가능하다. 대신 다중 상속을 함으로써 이슈는 어느 부모 클래스에 있는 것을 재사용할 것인지 결정하는 부분이다.

내부적으로 그 기준이 정의되어 있지만 로직에서 바로 다중 부모 클래스 중에 하나를 선택 하고 싶다면 그 클래스를 바로 정의해서 처리도 가능하다.

✚ 상속 시 초기화 메서드 처리

일단 상속을 하면 상속한 클래스를 부모 클래스(parent class)나 슈퍼 클래스(super class)라 하고 상속을 받은 클래스를 자식 클래스(child class)나 서브 클래스(sub class)라 부른다.

상속을 받았다는 것은 부모 클래스의 속성과 메서드를 사용할 수 있다는 것이다. 전부 자 식 클래스에서 재정의해서 사용한다면 상속을 사용할 필요가 없으므로 부모 클래스를 어 떻게 재사용할지를 정리해야 한다.

일단 간단하게 상속된 속성들을 초기화하는 방법부터 알아보겠다.

예제 9-38 : 부모 클래스의 초기화 모듈을 이용

Parent 클래스에는 초기화만 정의되어 있고 아무런 메서드를 정의하지 않았다.

```python
In : class Parent :
def __init__(self,name,age) :
self.name = name
self.age = age
```

Child 클래스는 Parent 클래스를 상속했지만 내부에 처리하는 로직이 없다.

```python
In : class Child(Parent) :
pass
```

Parent 클래스의 네임스페이스를 조회한다.

```python
In : import pprint
pprint.pprint(Parent.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Parent' objects>,
'__doc__': None,
'__init__': <function Parent.__init__ at
0x0000000005430840>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Parent'
objects>})
```

Child 클래스에 대한 네임스페이스를 조회한다.

```python
In : import pprint
pprint.pprint(Child.__dict__)
Out: mappingproxy({'__module__': '__main__', '__doc__': None})
```

_ _bases_ _ 속성에 직접 접근해서 조회하거나 issubclass 함수를 이용해서 상속 관계를 확인할 수 있다.

```python
In : print(Child.__bases__)
print(issubclass(Child, Parent))
Out: (<class '__main__.Parent'>,)
True
```

Child 클래스가 사용할 수 있는 모든 속성을 조회하면 상위 클래스에 만들어진 스페셜 속 성이나 메서드 호출을 확인할 수 있다.

특히 클래스만 가진 네임스페이스는 _ _dict_ _로 조회하지만 dir 함수를 이용해서 조회하 면 사용이 가능한 속성과 메서드들을 전부 확인할 수 있다.

```python
In : import pprint
pprint.pprint(dir(Child))
Out: ['__class__',
'__delattr__',
'__dict__',
'__dir__',
'__doc__',
'__eq__',
'__format__',
'__ge__',
'__getattribute__',
'__gt__',
'__hash__',
'__init__',
'__init_subclass__',
'__le__',
'__lt__',
'__module__',
'__ne__',
'__new__',
'__reduce__',
'__reduce_ex__',
'__repr__',
'__setattr__',
'__sizeof__',
'__str__',
'__subclasshook__',
'__weakref__']
```

Child 클래스 생성자를 이용해서 인스턴스를 만든다. Child 클래스에는 초기화 메서드가 없다. 아무런 인자 없이 인스턴스를 만들면 부모 클래스의 초기화 메서드 내에 매개변수 가 없다는 예외를 발생시킨다.

```python
In : c = Child()
print(c)
Out: ---------------------------------------------------------------------
TypeError             Traceback (most recent call last)
<ipython-input-10-87b9592ae1d8> in <module>()
----> 1 c = Child()
2 print(c)
TypeError: __init__() missing 2 required positional arguments: 'name'
and 'age'
```

위의 예외 부분을 해결하려면 name, age에 맞는 인자를 넣어서 인스턴스를 생성한다. 생 성한 이후에 인스턴스 내의 네임스페이스를 조회하면 name, age 속성이 들어가 있다.

상속을 하면 부모 클래스의 네임스페이스를 검색해서 처리가 된다. 자식 클래스로 인스턴 스를 만들 때도 부모 클래스의 _ _init_ _ 메서드가 자식 클래스에서도 그대로 적용이 되므 로 상속을 받으면 부모의 모든 것을 바로 사용할 수 있다는 것을 알 수 있다.

```python
In : c = Child("자식",33)
print(c)
print(c.__dict__)
Out: <__main__.Child object at 0x00000000051080B8>
```

{'name': '자식', 'age': 33}

✚ Super class와 sub class 관계 이해하기

슈퍼 클래스와 서브 클래스 간의 상속 관계(is a)를 확인하기 위해 상속의 단계를 더 깊게 만들어보겠다.

예제 9-39 : 상속 관계 확인하기

조부모, 부모, 자식 등으로 연속적으로 상속을 받을 경우에 처리되는 것을 확인하기 위해 3개의 클래스를 만들었다. 부모는 조부모를 상속했고 자식은 부모를 상속한다.

먼저 조부모 클래스에는 인스턴스 속성을 초기화하는 메서드만 지정한다.

```python
In : class GrandParent :
def __init__(self,name,age) :
self.name = name
self.age = age
```

부모 클래스에는 이 속성을 조회하는 인스턴스 메서드 2개를 지정한다.

```python
In : class Parent(GrandParent) :
def getname(self) :
return self.name
def getage(self) :
return self.age
```

손자 클래스는 아무 일도 하지 않는다.

```python
In : class Child(Parent) :
pass
```

조부모, 부모, 자식 클래스에 대한 상속이 어떻게 되었는지를 _ _bases_ _ 속성으로 확인 해본다. 상속되는 클래스 정보를 알려주는 것을 볼 수 있다.

```python
In : print(GrandParent.__bases__)
print(Parent.__bases__)
print(Child.__bases__)
Out: (<class 'object'>,)
(<class '__main__.GrandParent'>,)
(<class '__main__.Parent'>,)
```

내장 함수를 통해 클래스 간의 상속 관계를 issubclass로 점검해보면 전부 True로 출력되 어 손자는 부모와 조부모를 모두 상속한다는 것을 알 수 있다.

```python
In : print(issubclass(Parent, GrandParent))
print(issubclass(Child, Parent))
print(issubclass(Child, GrandParent))
Out: True
True
True
```

조부모, 부모, 손자에 대한 클래스를 가지고 인스턴스를 만들었다. 이 인스턴스들이 부모 클래스에 정의된 인스턴스 메서드에 사용할 수 있는지를 확인한다.

```python
In : g = GrandParent("조부모",80)
```

p = Parent("부모",40) c = Child("손자",10) 부모에 있는 메서드는 부모 클래스의 인스턴스에서 실행이 가능하고 손자 클래스도 부모 클래스의 메서드를 사용할 수 있다.

```python
In : print(p.getname(), p.getage())
print(c.getname(), c.getage())
Out: 부모 40
손자 10
```

하지만 조부모 클래스로 만든 인스턴스는 하위 클래스의 메서드에 접근해서 사용할 수가 없다.

```python
In : print(g.getname(), g.getage())
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-19-42c258dd1fae> in <module>()
----> 1 print(g.getname(), g.getage())
AttributeError: 'GrandParent' object has no attribute 'getname'
```

✚ 상속에 따른 네임스페이스 검색

파이썬에서 객체 네임스페이스에 대한 스코프 규칙으로, 상속한 클래스는 상위 클래스의 네임스페이스를 참조해서 사용이 가능하다. 단지 자기 클래스에 정의가 된 속성과 메서드 를 먼저 사용하므로 이때는 상위 클래스에 속성과 메서드가 있더라도 자동으로 사용을 할 수 없다.

부모 클래스와 자식 클래스에 동일한 속성과 메서드가 있을 경우는 부모 클래스를 명기해 서 호출하여 사용을 해야 한다.

예제 9-40 : 상속에 따른 네임스페이스 검색

파이썬의 네임스페이스가 모두 딕셔너리로 관리된다. 속성과 메서드도 이름으로만 관리 하므로 이번에는 속성을 가지고 상속을 받을 경우 속성을 어떻게 참조하는가를 알아본다.

일단 간단한 클래스 A, B, C를 정의한다. 이때 B, C 클래스는 A 클래스를 상속받았다. 상 속된 B, C 클래스는 내부에서 아무 일도 하지 않는다. 부모 클래스인 A 클래스에만 속성 이 하나 있다.

```python
In : class A :
```

A_cls = "A 클래스 속성" class B(A) :

pass class C(A) :

pass 부모 클래스인 A의 속성을, 자식 클래스인 B, C에서 A_cls 속성을 점 연산자를 통해 접근 해서 출력하면 동일한 결과가 나온다.

```python
In : print(B.A_cls)
print(C.A_cls)
Out: A 클래스 속성
A 클래스 속성
```

자식인 B 클래스에 A_cls 속성을 추가했다. 객체 네임스페이스에 접근하는 규칙에 따라 B 클래스 내에 속성이 추가되었으므로 상위 클래스에 있는 속성은 참조하지 않는다. 또 다

른 C 클래스에는 아무런 속성이 없으므로 부모 클래스의 속성을 계속 참조하는 것을 알 수 있다.

```python
In : B.A_cls = "B 클래스 속성"
print(B.A_cls)
print(C.A_cls)
Out: B 클래스 속성
A 클래스 속성
```

A 클래스의 네임스페이스를 조회하면 동일한 속성 A_cls가 있는 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(A.__dict__)
Out: mappingproxy({'A_cls': 'A 클래스 속성',
'__dict__': <attribute '__dict__' of 'A' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'A' objects>})
```

B 클래스의 네임스페이스를 확인해도 A_cls가 정의할 때는 없었지만 런타임에 추가된 것 을 알 수 있다.

```python
In : import pprint
pprint.pprint(B.__dict__)
Out: mappingproxy({'__module__': '__main__', '__doc__': None, 'A_cls': 'B
클래스 속성'})
```

## 9.6.2 상속할 때 자식 클래스 초기화 기능 추가

부모 클래스를 상속받아서 처리할 때 부모 클래스에서 자식 클래스의 클래스 속성을 추가 하는 방식이 파이썬 3.6 버전부터 추가되었다.

예제 9-41 : _ _init_subclass_ _ 클래스 메서드

Object 클래스에 _ _init_subclass_ _ 메서드가 추가되어 자식 클래스에 필요한 속성을 추 가할 수 있다.

```python
In : help(object.__init_subclass__)
Out: Help on built-in function __init_subclass__:
__init_subclass__(...) method of builtins.type instance
This method is called when a class is subclassed.
The default implementation does nothing. It may be
overridden to extend subclasses.
```

부모 클래스인 Super에서 자식 클래스 Sub 내의 클래스 속성인 name을 추가했다. _ _ init_subclass_ _ 내의 cls를 출력해보면 자식 클래스 레퍼런스가 전달되는 것을 확인할 수 있다.

```python
In : class Super :
def __init_subclass__(cls,name) :
print(type(cls),cls)
cls.name = name
```

Sub 클래스 상속 부분에 부모 클래스와 Sub 클래스 속성으로 초기화 가능한 속성을 지정 해서 처리할 수 있다.

```python
In : class Sub(Super, name="sub") :
pass
print(Sub.name)
Out: <class 'type'> <class '__main__.Sub'>
sub
```

부모 클래스의 네임스페이스를 확인하며 기본적인 속성과 메서드만 존재하는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Super.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Super' objects>,
'__doc__': None,
'__init_subclass__': <classmethod object at
0x00000000056E49B0>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Super'
objects>})
```

자식 클래스의 네임스페이스를 확인해보면 자식 클래스에 클래스 속성 name이 있는 것 을 알 수 있다.

```python
In : import pprint
pprint.pprint(Sub.__dict__)
Out: mappingproxy({'__module__': '__main__', '__doc__': None, 'name': 'sub'})
```

## 9.6.3 다중 상속(Multiple inheritance)

여러 부모 클래스를 자식 클래스에서 사용할 필요가 있다. 이때 여러 개의 부모 클래스를 한번에 상속받는 것을 다중 상속(Multiple inheritance)이라고 한다.

자식 클래스를 정의할 때 클래스 헤더의 상속 부분에 부모 클래스를 나열하면 여러 개의 부모 클래스가 상속이 된다.

다중 상속을 할 경우 자식 클래스에서 부모 클래스까지 어떻게 읽어 처리해야 하는지에 따라 부모 클래스들이 가진 속성과 메서드를 사용할 수 있다. 이런 규칙을 mro(Method Resolution Order)라고 부른다.

부모 클래스에 동일한 이름이 메서드가 있어서 제공하는 규칙에 따라 검색되면 자식 클래 스에서 실행된다. 원하는 속성이나 메서드가 검색이 되지 않으면 부모 클래스명을 직접 호출해서 처리해야 할 수도 있다.

이런 이유로 다중 상속을 지정할 때 관행적으로 Mixin 클래스(메서드만 존재하는 클래스)가 먼저 온 후에 부모 클래스(재활용 속성이나 메서드 등)가 위치하도록 정의한다.

✚ 다중 상속 클래스 읽는 순서

자식 클래스에서 상속에 대한 정보는 _ _bases_ _ 속성에서 보관되어 있고 이 속성 내에서 보관된 순서에 맞춰 읽는 것을 알 수 있다.

부모 클래스들에서 동일한 이름이 속성과 메서드를 가지고 있을 경우 자식 클래스에서 어 느 부모 클래스의 속성과 메서드를 읽어야 하는지를 명확히 지정해야 할 경우가 생긴다.

예제 9-42 : 다중 상속 Class 정의 및 읽는 순서 확인하기

두 개의 부모 클래스 Parent1, Parent2를 지정한다. 두 개의 클래스에는 _ _init_ _ 메서드 만 있다.

```python
In : class Parent1 :
def __init__(self,name) :
print(" Parent1 ")
self.name = name
class Parent2 :
def __init__(self,name) :
print(" Parent2 ")
self.name = name
```

자식 클래스를 정의하고 클래스명 다음에는 괄호 안에 상속하는 부모 클래스 두 개를 지정 했다. 다중 상속이 구성된 것을 알 수 있다.

```python
In : class Child(Parent1, Parent2) :
pass
```

자식 클래스 내에 mro라는 메서드를 가지고 클래스를 참조하는 순서를 확인해보면 자기 클래스부터 순서를 정해서 처리되는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Child.mro())
Out: [<class '__main__.Child'>,
<class '__main__.Parent1'>,
<class '__main__.Parent2'>,
<class 'object'>]
```

자식 클래스 생성자를 이용해서 인스턴스를 만들고 어느 초기화를 사용하는지를 알아보면 부모 클래스 Parent1 클래스를 사용하는 것을 알 수 있다.

```python
In : c = Child("다중 상속")
Out: Parent1
```

예제 9-43 : 다른 부모 클래스의 __init__ 메서드를 사용하고 싶을 경우

부모 클래스의 동일한 초기화 메서드가 존재하므로 자식 클래스로 초기화할 경우에 mro 로 조회한 순서대로 검색하므로 다른 부모 클래스의 초기화 메서드를 호출하지 못했다.

다른 부모 클래스의 초기화 메서드를 호출하려면 직접 지정해서 호출해야 하므로 자식 클 래스에 초기화 처리를 할 필요가 있다.

파이썬은 이름으로만 체크해서 사용하므로 두 개의 부모 클래스가 매개변수의 차이에 있 어도 호출할 수 있는 다른 방안은 없다.

```python
In : class Parent1 :
def __init__(self,name) :
print(" Parent1 ")
self.name = name
class Parent2 :
def __init__(self,name,age) :
print(" Parent2 ")
self.name = name
self.age = age
```

자식 클래스가 두 개의 부모 클래스를 상속받아서 처리한다. 자식 클래스는 두 개의 매개 변수를 받아 인스턴스를 생성할 수 있으므로 상속된 클래스를 확인해서 상위 클래스에 대 한 초기화 메서드를 재활용해야 한다.

보통 super를 가지고 접근하면 mro 처리 기준으로만 호출하므로 age 매개변수에 인자가 없을 경우는 mro 순서에 맞는 초기화 메서드를 호출해서 인스턴스가 생성되도록 했다. 두 개의 인자가 다 들어오면 부모 클래스를 명기하고 초기화 메서드를 호출해서 직접 처리하 도록 지정했다.

```python
In : class Child2(Parent1, Parent2) :
def __init__(self,name, age=None) :
if age is None :
super().__init__(name)
else :
Parent2.__init__(self,name,age)
```

자식 클래스의 인스턴스를 생성할 때 매개변수에 이름만 넣고 만든다.

```python
In : c1 = Child2("다중 상속")
print(c1.__dict__)
Out: Parent1
```

{'name': '다중 상속'} 이름과 나이를 넣어서 만들면 초기화 메서드는 각각의 부모 클래스를 호출해서 인스턴스 를 생성하는 것을 볼 수 있다.

```python
In : c2 = Child2("다중 상속", 33)
print(c2.__dict__)
Out: Parent2
```

{'name': '다중 상속', 'age': 33} 부모 클래스를 가지고 이 인스턴스가 누구에 의해 만들어졌는지도 isinstance 함수를 통 해 확인할 수 있다.

```python
In : print(isinstance(c1,Parent1))
print(isinstance(c2,Parent2))
Out: True
True
```

## 9.6.4 super 클래스 이해하기

상속해서 부모 클래스에 접근할 때 기본적인 mro에 따른 것은 super로 접근이 가능하다.

접근하는 법을 자세히 알아보겠다.

예제 9-44 : super 클래스 이해하기

super도 클래스이다.

```python
In : print(super)
Out: <class 'super'>
```

이 클래스에 대한 help를 전부 출력하면 내용이 많으므로 _ _doc_ _ 속성에 들어온 문자 열을 가지고 개행 문자 단위로 나눠서 split을 처리한 후에 라인별로 출력했다.

이 클래스를 가지고 처리하는 것은 상위의 슈퍼 클래스에 대한 레퍼런스를 가져오는 역할 을 한다.

```python
In : for i in super.__doc__[:289].split("\n") :
print(i)
Out: super() -> same as super(__class__, <first argument>)
super(type) -> unbound super object
super(type, obj) -> bound super object; requires isinstance(obj, type)
super(type, type2) -> bound super object; requires issubclass(type2, type)
Typical use to call a cooperative superclass method:
```

부모 클래스 A와 자식 클래스 B를 정의했고 내부에 동일한 클래스 속성이 있다.

```python
In : class A :
A_cls = " AAA "
class B(A) :
A_cls = " BBB "
```

상위 클래스의 레퍼런스를 가져오기 위해 super(B,.B( ))을 실행해서 부모 클래스를 가져온 이후에 점 연산으로 클래스 속성을 가지고 출력하면 부모 클래스의 속성이 출력된다.

```python
In : print(super(B,B()).A_cls)
Out: AAA
```

이번에는 속성이 아닌 메서드를 검색해서 처리하도록 super 클래스의 인스턴스를 만들어 보겠다.

부모 클래스에 name 속성만 가지는 초기화 메서드를 정의했다.

```python
In : class AA :
def __init__(self,name) :
self.name = name
```

자식 클래스의 초기화 메서드에 부모 클래스의 초기화 메서드를 호출해서 처리한 후에 자 식 클래스만 가진 속성인 age를 추가했다.

```python
In : class BB(AA) :
def __init__(self,name,age) :
super().__init__(name)
self.age = age
```

자식 클래스로 인스턴스를 생성하면 부모 클래스의 초기화 메서드와 자식 클래스 내의 초 기화 기능이 다 활용된다.

```python
In : b = BB("슈퍼우먼", 33)
print(b.__dict__)
Out: {'name': '슈퍼우먼', 'age': 33}
```

다중 상속일 경우에 어떻게 처리되는지를 다시 한번 자세히 알아보겠다.

두 개의 부모 클래스를 정의한다. 두 부모 클래스의 초기화 메서드로 인스턴스를 생성하 는 속성이 다르다.

```python
In : class A :
def __init__(self,name) :
self.name = name
class B :
def __init__(self,name,age) :
self.name = name
self.age = age
```

자식 클래스에서 초기화를 정의할 때 기본적으로 첫 번째 부모 클래스에 대해서는 super 를 이용해서 처리한다.

두 번째일 경우는 mro 메서드를 호출하면 두 번째 인덱스에 두 번째 상속한 부모 클래스 의 정보가 있다. 이를 이용해서 초기화 모델을 호출해 초기화하는 것을 작성했다.

```python
In : class C(A,B) :
def __init__(self,name,age=None) :
super().__init__(name)
if age :
C.mro()[2].__init__(self,name,age)
```

두 개의 인스턴스를 만들면 인자가 둘 다 다 들어온 경우는 두 번째 상속한 부모의 초기화 메서드를 호출해서 인스턴스가 만들어졌고 인자가 하나만 들어온 경우는 super를 이용해 서 초기화 메서드를 실행한 것을 알 수 있다.

```python
In : c = C("슈퍼우먼", 33)
print(c.__dict__)
```

c2 = C("수퍼맨") print(c2.__dict__)

```python
Out: {'name': '슈퍼우먼', 'age': 33}
```

{'name': '수퍼맨'}

## 9.6.5 Mixin 패턴 이해하기

다중 상속을 해도 메서드만 가지고 있는 클래스를 상속해서 동일한 기능을 처리할 수 있다.

자바 프로그램은 인터페이스를 내부에 구현해서 사용하지만 파이썬은 메서드만 구현된 것 을 상속받아서 작성하므로 더 다양한 메서드를 외부에 정의해서 사용할 수 있다.

다중 상속(Multiple inheritance)을 처리하는 하나의 패턴이다. 메서드 내부에 정의해서 호출 하는 것과 동일하게 사용할 수 있으므로 패턴을 잘 이용하면 더 다양한 기능을 처리할 수 있다. 이 패턴으로 구현한 클래스는 클래스명에 Mixin을 붙여서 사용하는 것이 관행이다.

✚ 메서드만 처리하는 Mixin 클래스 정의

메서드만 처리하는 Mixin 클래스를 정의한다. 속성 등 상태를 보관하는 것은 정의하지 않 는다. Mixin을 상속받는 두 개의 클래스를 정의하고 Mixin 클래스의 메서드를 사용하도 록 한다.

예제 9-45 : Mixin 클래스 하나를 상속 처리

하나의 메서드를 가진 OpMixin 클래스를 정의한다. 덧셈과 곱셈으로 숫자, 문자열, 리스 트 등을 처리할 수 있도록 구성한다.

계산을 위한 코드가 2개만 존재하므로 다른 코드가 오면 +로 처리한다.

문자열과 리스트 등일 경우 두 번째 빈 문자열이나 빈 리스트가 들어오면 첫 번째 인자를 그대로 출력하도록 만들었다.

인스턴스 속성 중에 두 번째 인자 y에 대해서만 각각 계산할 경우에 필요한 로직을 처리 했다. 일단 삼항 연산자도 중복이 가능하도록 작성할 수 있다는 것을 보여주기 위해 복잡 하게 연결을 했으니 어떻게 작동하는지도 알아보면 좋다.

딕셔너리 내 함수의 정보를 get 메서드로 가져오고 그 다음 호출 연산자를 연결하기 위해 라인 연결을 하는 백슬래쉬를 사용했다. 함수 호출 연산자가 괄호라서 괄호가 종료될 때 까지는 하나의 라인으로 인식하므로 문장 연결을 하는 백슬래쉬는 사용하지 않았지만 삼 항 연산자의 반복은 self.y에 대한 로직을 처리하는 것이다.

```python
In : import operator as op
class OpMixin :
def aroper(self,op_code) :
return {'+':op.add,
'*':op.mul}.get(op_code,"+") \
(self.x, self.y if type(self.y) not in [str,list, tuple]
else self.y if op_code != "*"
else len(self.y) if len(self.y)
!= 0
else 1)
```

자식 클래스 Num. STR, LIST를 정의하고 OpMixin 클래스를 상속받았다. 자식 클래스 내부는 초기화 메서드만 있고 인스턴스의 속성도 2개만 있는 것을 볼 수 있다.

```python
In : class Num(OpMixin) :
def __init__(self, x,y) :
self.x = x
self.y = y
In : class STR(OpMixin) :
def __init__(self, x,y) :
self.x = x
self.y = y
In : class LIST(OpMixin) :
def __init__(self, x,y) :
self.x = x
self.y = y
```

정수를 연산하도록 인스턴스를 하나 만들었다. +, * 연산 기호를 넣고 메서드를 호출하면 부모 클래스의 메서드가 작동해서 덧셈과 곱셈이 작동된다.

```python
In : n = Num(5,6)
print(n.aroper("+"))
print(n.aroper("*"))
Out: 11
```

두 번째 인자로 0을 넣고 처리해도 덧셈과 곱셈이 계산되는 것을 확인할 수 있다.

```python
In : n1 = Num(5,0)
print(n1.aroper("+"))
print(n1.aroper("*"))
Out: 5
```

문자열로 하나의 인스턴스를 만들고 덧셈과 곱셈을 처리하면 문자열이 연결되고 배수만큼 문자열이 늘어난 것을 알 수 있다.

```python
In : s = STR("Hello","World")
print(s.aroper("+"))
print(s.aroper("*"))
Out: HelloWorld
HelloHelloHelloHelloHello
```

두 번째 인자에 빈 문자열을 넣고 메서드를 호출하면 덧셈과 곱셈이 동일한 결과를 출력하 는 것을 알 수 있다.

```python
In : s1 = STR("Hello","")
print(s1.aroper("+"))
print(s1.aroper("*"))
Out: Hello
Hello
```

리스트를 가지고 인스턴스를 만들어 덧셈과 곱셈을 처리하면 리스트와 하나로 통합되거나 리스트 원소가 배수만큼 늘어난 것을 확인할 수 있다.

```python
In : l = LIST([1,2,3,4],[6,7])
print(l.aroper("+"))
print(l.aroper("*"))
Out: [1, 2, 3, 4, 6, 7]
[1, 2, 3, 4, 1, 2, 3, 4]
```

리스트를 만들 때 두 번째 인자에 빈 리스트를 주었을 경우는 덧셈과 곱셈이 동일한 결과 가 나온다.

```python
In : l1 = LIST([1,2,3,4],[])
print(l1.aroper("+"))
print(l1.aroper("*"))
Out: [1, 2, 3, 4]
[1, 2, 3, 4]
```

✚ Mixin 다중 상속 시 주의할 사항

파이썬 다중 상속(Multiple inheritance)을 정의할 때 권고 사항은 Mixin 클래스를 먼저 정 의하고 속성 등을 가진 클래스는 후순위로 정의한다.

Mixin 클래스도 정의할 때 동일한 메서드가 있을 경우에는 자식 클래스에서 어떤 메서드 를 주로 사용하는지를 명확히 알고 순서를 결정해야 한다.

필요에 따라 자식 클래스에서 부모의 동일한 메서드를 지정해서 호출하게 할 수도 있다.

예제 9-46 : 여러 Mixin 클래스에 동일한 메서드

두 개의 mixin 클래스에 동일한 메서드가 있을 경우 상속을 받았지만 첫 번째 상속한 메 서드만 처리가 된다.

```python
In : class AMixin :
def method(self) :
return "A Mixin"
class BMixin :
def method(self) :
return "B Mixin"
```

두 개의 Mixin 클래스를 상속했지만 자식 클래스에서는 아무런 일도 하지 않는다.

```python
In : class A(AMixin, BMixin) :
pass
```

하나의 인스턴스를 만들고 부모 클래스인 Mixin 메서드를 호출하면 처리되는 것은 상속 할 때 먼저 정의된 클래스의 메서드이다.

```python
In : a = A()
print(a.method())
Out: A Mixin
```

두 개의 Mixin 클래스는 동일하고 자식 클래스에서 두 부모 클래스의 메서드를 전부 호출 할 수 있도록 처리하려면 자식 클래스 인스턴스를 생성할 때 code를 받아서 부모 클래스 를 선택하도록 했다.

```python
In : class AB(AMixin, BMixin) :
def __init__(self,code) :
self.code = code
def method(self) :
if self.code == "B" :
return BMixin.method(self)
else :
return AMixin.method(self)
```

특정 코드를 넣고 인스턴스를 생성했다. 인스턴스에서 메서드를 실행하면 두 번째 부모 클래스의 메서드가 실행 처리된다.

```python
In : ab = AB("B")
print(ab.method())
Out: B Mixin
```

첫 번째 클래스의 메서드를 실행하려면 B 코드 말고 다른 코드를 넣고 실행을 하면 된다.

```python
In : ab = AB("")
print(ab.method())
Out: A Mixin
```

예제 9-47 : Mixin 클래스 다중 상속 처리 : 다른 메서드 이름

두 개의 mixin 클래스에 서로 다른 이름의 메서드를 정의했고 이 메서드들은 자식 클래스 의 인스턴스 내 특정 속성을 읽어서 조회한다.

```python
In : class AMixin :
def getname(self) :
return self.name
class BMixin :
def getage(self) :
return self.age
```

자식 클래스는 두 개의 부모 클래스를 상속하고 내부의 초기화 메서드에 2개의 속성을 만 들도록 처리했다.

```python
In : class AB(AMixin, BMixin) :
def __init__(self,name,age) :
self.name = name
self.age = age
```

하나의 인스턴스를 정의해서 상속받은 메서드를 호출하면 두 개의 부모에 다른 메서드가 존재하므로 검색해서 실행해주는 것을 볼 수 있다.

이처럼 내가 정의한 클래스에 메서드를 정의하지 않고 부모 클래스에 다양한 메서드를 정 의한 후에 필요한 것을 실행해서 처리할 경우에 더 단순하게 처리할 수 있는 방안을 많이 만들 수 있다.

```python
In : ab = AB("다중 상속",33)
print(ab.getname())
print(ab.getage())
Out: 다중 상속
```
