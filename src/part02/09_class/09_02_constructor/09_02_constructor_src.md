---
layout: default
title: "09.02 생성자(constructor)와"
---

# 09.02 생성자(constructor)와

다른 객체지향 언어처럼 클래스에서 인스턴스 객체를 생성하고 생성된 인스턴스 객체를 소멸하는 메서드를 지원한다. 일반적인 클래스를 작성하는 경우에는 초기화 메서드 _ _ init_ _ 만 작성하지만, 이것은 실질적으로 생성자가 작동으로 처리해주기 때문이다.

클래스에서 특정한 로직이 필요할 경우는 생성자인 _ _new_ _ 메서드를 재정의해 인스턴 스 객체를 만들면서 다양한 기능을 추가할 수 있고 초기화도 생성자에서 처리한다.

객체 소멸자(_ _del_ _)도 사용자 클래스를 정의할 때 별도로 추가할 수 있다. 이번 장에서 생성자, 초기화, 소멸자의 작동 원리를 이해해보자.

## 9.2.1 생성자(Constructor) 이해하기 : _ _new_ _

파이썬에서 생성자는 정적 메서드(static method)이고 첫 번째 매개변수는 cls 즉 클래스 객 체를 받아서 처리한다. 생성자는 아무 것도 하지 않는 인스턴스 객체를 생성만 한다. 인스 턴스 내의 속성은 초기화에서 처리하기를 권고한다.

하지만 특별한 처리가 필요할 경우 추가로 생성자를 재정의해서 사용해야 한다. 재정의를 어떻게 할지를 알아보겠다.

✚ 생성자(_ _new_ _)로 인스턴스만 만들어보기

사용자 클래스를 정의할 때 _ _new_ _ 메서드를 재정의해서 인스턴스 객체만을 만들도록 해본다. 생성자가 어떤 일을 하는지 이해해보자.

예제 9-14 : 클래스 생성자로 인스턴스 생성하기

클래스를 만든 후 내부에 생성자만을 만드는 내부 AAA 클래스 내의 생성자 _ _new_ _ 메서드 내에 아무 것도 하지 않는 자신의 인스턴스를 생성하도록 작성한다. object._ _ new_ _ 메서드를 이용해서 인스턴스를 만든다.

```python
In : class AAA :
def __new__(cls) :
print(" AAA instance")
return object.__new__(cls)
```

클래스를 호출하면 인스턴스가 만들어지고 이 생성자 메서드가 호출된 것을 알 수 있다.

```python
In : aaa = AAA()
print(aaa)
Out: AAA instance
<__main__.AAA object at 0x000000000519B240>
```

사용자 정의 클래스 AAA 네임스페이스 안에 _ _new_ _라는 생성자가 재정의되었고 내부 적으로 정적 메서드가 표시된 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(AAA.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'AAA' objects>,
'__doc__': None,
'__module__': '__main__',
'__new__': <staticmethod object at 0x10956d208>,
'__weakref__': <attribute '__weakref__' of 'AAA'
objects>})
```

AAA 클래스로 인스턴스를 만들었으므로 클래스에 의해 인스턴스가 만들어졌는지를 확인 하기 위해 내장 함수 isinstance로 확인을 해보면 True로 출력한다.

```python
In : print(isinstance(aaa,AAA))
Out: True
```

✚ 자기 클래스만 반환해서 인스턴스 생성을 막기

클래스 내에 생성자(_ _new_ _)를 재정의해서 인스턴스를 생성하지 못하도록 만들 필요가 있으면 인스턴스를 생성하는 로직을 막고 자기 자신의 클래스를 반환 처리한다.

예제 9-15 : 자기 자신의 클래스만 처리

OnlyKlass 클래스를 정의하고 생성자 _ _new_ _를 재정의했다. 반환을 인스턴스 생성하 지 않고 자기 자신의 객체를 전달하는 것을 볼 수 있다.

```python
In : class OnlyKlass :
def __new__(cls) :
return cls
```

클래스 생성자를 가지고 인스턴스를 생성해보면 실질적으로 인스턴스가 만들어지는 것이 아니라 클래스 레퍼런스가 나온다.

```python
In : ok = OnlyKlass()
print(ok)
Out: <class '__main__.OnlyKlass'>
```

클래스인지를 확인하기 위해 type 클래스에 생성된 변수를 넣어 실행하면 메타 클래스의 정보를 확인할 수 있다.

클래스일 경우는 type으로 체크하면 메타 클래스를 반환하는 것을 알 수 있고 이 클래스 의 레퍼런스가 원본인 OnlyKlass와 같은지 is 연산자를 확인하면 True로 출력된다.

```python
In : print(type(ok))
print(ok is OnlyKlass)
Out: <class 'type'>
True
```

클래스 내에 속성과 클래스 메서드를 추가하여 클래스만 가지고 메서드를 호출해서 사용 해보겠다. 내부에 name이란 클래스 속성과 이 속성을 갱신하는 메서드 및 조회하는 메서 드를 정의했다.

```python
In : class OnlyKlass :
def __new__(cls) :
return cls
@classmethod
def getname(cls) :
return cls.name
@classmethod
def setname(cls, name) :
cls.name = name
```

클래스의 네임스페이스를 조회하면 클래스에서 정의한 3개의 메서드와 하나의 속성이 정 의된 것을 확인할 수 있다.

클래스의 네임스페이스를 확인해보면 클래스에서 정의한 속성과 메서드가 들어가 있는 것 을 알 수 있다.

```python
In : import pprint
pprint.pprint(OnlyKlass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'OnlyKlass' objects>,
'__doc__': None,
'__module__': '__main__',
'__new__': <staticmethod object at 0x00000000051AB358>,
'__weakref__': <attribute '__weakref__' of 'OnlyKlass'
objects>,
'getname': <classmethod object at 0x00000000051AB2B0>,
'setname': <classmethod object at 0x00000000051AB320>})
```

클래스로 인스턴스를 생성하면 자기 자신의 레퍼런스를 반환하므로 클래스이고 클래스 메 서드를 가지고 클래스 속성을 갱신한 뒤 이를 조회하면 갱신된 결과를 출력하는 것을 볼 수 있다.

클래스를 하나의 객체처럼 사용할 수 있는 방법이 필요한 경우 인스턴스를 생성하지 않고 도 클래스를 하나의 객체처럼 사용할 수 있다.

```python
In : ok = OnlyKlass()
ok.setname(" class method ")
print(ok.getname())
Out: class method
```

## 9.2.2 초기화 메서드 사용하기 :_ _init_ _

파이썬에서 초기화 메서드인 _ _init_ _을 정의해서 사용하는 방법을 왜 권고하는지를 상 세하게 알아보겠다.

이 초기화 메서드에 정의하면 인스턴스 내에 속성이 추가되지만 실질적으로 호출할 필요 는 없다. 내부적으로 이를 호출해서 인스턴스에 값이 추가되는 것을 알 수 있다.

✚ 초기화 메서드로 인스턴스 내의 속성 추가하기

사용자 클래스 정의를 하고 본체에 초기화(_ _init_ _) 메서드를 추가한 뒤 매개변수를 받아 내부의 self + 점 연산을 이용해서 매개변수를 인스턴스 객체의 속성으로 추가한다. 이때 에 초기화(_ _init_ _)의 매개변수를 넣어서 처리하면 된다.

매개변수로 받지 않고 내부적으로 추가해도 런타임에 추가된다. 항상 초기화에 들어온 인 자는 매개변수와 매칭이 되므로 이 점도 이해한다.

예제 9-16 : 인스턴스 속성을 초기화

아무 것도 하지 않는 클래스를 정의하고 인스턴스를 만들었다.

```python
In : class Pass :
pass
```

이 인스턴스의 네임스페이스를 확인하면 아무 것도 없다.

```python
In : p = Pass()
print(p.__dict__)
Out: {}
```

런타임에 인스턴스 속성을 추가할 수 있으므로 name,age를 추가했고 이 인스턴스의 네 임스페이스에 두 개의 속성이 추가되었다.

```python
In : p.name = "양영초"
p.age = 10
print(p.__dict__)
Out: {'name': '양영초', 'age': 10}
```

사용자 클래스에 클래스 속성 count와 초기화 메서드를 정의했다.

```python
In : class INIT :
count = 0
def __init__(self,name,age) :
self.name = name
self.age = age
self.count += 1
```

생성자로 호출할 때 이 초기화 메서드 내의 매개변수와 매칭되는 인자를 넣지 않았다. 인 자가 매칭되지 않는다는 예외가 발생한다.

```python
In : i = INIT()
Out: -----------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-25-bd3ac33b98b6> in <module>()
----> 2 i = INIT()
TypeError: __init__() missing 2 required positional arguments: 'name'
and 'age'
```

사용자 클래스를 정의할 때 초기화가 들어 있으면 인스턴스를 생성할 때 매개변수에 맞도 록 인자를 넣고 실행을 한다. 이처럼 초기화를 정의하면 이 초기화 메서드에서 필요한 것 을 추가할 수도 있다.

```python
In : i = INIT("양영중",15)
print(i.__dict__)
Out: {'name': '양영중', 'age': 15, 'count': 1}
```

name, age, count 세 개의 인스턴스 속성을 점 연산자를 통해 읽어서 출력할 수 있다.

```python
In : print(i.name)
print(i.age)
print(i.count)
Out: 양영중
```

클래스 속성 count에 대한 계산은 클래스를 이용해서 점 연산으로 검색한 후에 갱신을 하 도록 수정했다.

```python
In : class INIT_ :
count = 0
def __init__(self,name,age) :
self.name = name
self.age = age
INIT_.count += 1
```

인스턴스를 확인하면 두 개의 속성만 있고 클래스 속성에 있는 값이 변경된 것을 알 수 있다.

```python
In : import pprint
```

i = INIT_("양영고",18) print(i.__dict__) pprint.pprint(INIT_.__dict__)

```python
Out: {'name': '양영고', 'age': 18}
mappingproxy({'__dict__': <attribute '__dict__' of 'INIT_' objects>,
'__doc__': None,
'__init__': <function INIT_.__init__ at
0x0000000005292D08>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'INIT_' objects>,
'count': 1})
```

## 9.2.3 소멸자 메서드 사용하기 : _ _del_ _

인스턴스가 생성되면 이를 삭제도 가능하지만 특별한 경우가 아니면 가비지 컬렉션에서 자동으로 처리가 되므로 소멸자를 별도로 지정하지 않는다.

하지만 소멸자도 어떻게 작동하는지를 알아보기 위해 _ _del_ _ 스페셜 메서드(special method)의 사용법을 알아보겠다.

✚ 소멸자(_ _del_ _)를 통한 클래스와 인스턴스 삭제

사용자 정의 클래스를 통해 인스턴스를 제거하는 소멸자를 정의해서 제거하면 인스턴스는 삭제된다. 변수는 삭제하나 인스턴스 객체는 가비지 컬렉션(garbage collection)이 발생할 때 사라진다.

예제 9-17 : 소멸자 정의된 클래스 생성하기

Counter 클래스를 만들고 소멸자( _ _del_ _ )를 정의해서 del 키워드로 인스턴스 객체를 삭제한다. 인스턴스가 생성하고 소멸할 때마다 카운터를 증가하거나 감소시킨다.

```python
In : class Counter :
count = 0
def __init__(self,name) :
self.name = name
Counter.count = Counter.count +1
def __del__(self) :
Counter.count = Counter.count -1
```

위 클래스의 네임스페이스를 확인해서 소멸자를 확인하면 함수라는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Counter.__dict__)
Out: mappingproxy({'__del__': <function Counter.__del__ at
0x00000000052A6510>,
'__dict__': <attribute '__dict__' of 'Counter' objects>,
'__doc__': None,
'__init__': <function Counter.__init__ at
0x00000000052A6598>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Counter'
objects>,
'count': 0})
```

두 개의 인스턴스를 생성하고

```python
In : x = Counter(" First ")
print(x)
print(x.__dict__)
print(Counter.count)
y = Counter(" Second ")
print(y)
print(y.__dict__)
print(Counter.count)
Out: <__main__.Counter object at 0x00000000052B0630>
{'name': ' First '}
<__main__.Counter object at 0x00000000052B0FD0>
{'name': ' Second '}
```

하나의 인스턴스를 소멸시켰으므로 현재 처리되는 인스턴스는 하나가 남았다. 내부적으 로 참조 카운터는 생성자가 처리되면 증가하고 소멸자가 실행되면 줄어든다. 이를 기준으 로 가비지 컬렉션이 작동되어 사용하지 않는 인스턴스를 삭제한다.

```python
In : del y
print(Counter.count)
Out: 1
```

✚ 약한 참조를 이용하기

파이썬 표준 라이브러리의 weakref 모듈은 객체 파괴를 방해하지 않고 파이썬 참조를 만 드는 데 유용한 도구이다. weakref 모듈을 참조 카운터를 증가시키지 않고 객체에 대한 약한 참조(Weak reference)를 만들어서 사용을 지원한다.

예제 9-18 : 약한 참조 이용하기

정수 a를 만들어서 b에 할당한 후에 del를 이용해서 a를 삭제해도 정수 1에 대한 참조는 살아있다. 이를 제거하면 자동으로 참조가 없어져서 가비지 컬렉션으로 정리가 된다.

```python
In : a = 1
print(id(a))
b = a
print(id(b))
del a
print(b)
Out: 1575533008
```

약한 참조를 사용하면 가비지 컬렉션을 사용한 참조에 대한 관리에서 벗어나서 특정 인스 턴스를 만들어서 사용하고 인스턴스에 대한 삭제를 점검하는 부수적인 처리에서 벗어날 수 있다.

일반적인 클래스를 만들고 이 인스턴스를 생성한다.

```python
In : import weakref
class MyObject(object):
def my_method(self):
print('my_method was called!')
obj = MyObject()
```

위의 인스턴스를 이용해서 약한 참조 인스턴스를 하나 만든다. 약한 참조 인스턴스를 실 행하면 MyObject로 만든 인스턴스를 다시 변수에 할당한다.

```python
In : r = weakref.ref(obj)
print(type(r), r)
s = r()
Out: <class 'weakref'> <weakref at 0x00000000052AB7C8; to 'MyObject' at
0x000000000529DCC0>
```

약한 참조를 이용해서 사용하는 객체는 위에서 만든 obj라는 것을 확인할 수 있다. 키워드 assert을 이용해서 점검해보자. 동일한 인스턴스가 아니지만 조건에 맞으므로 내부 메서 드를 호출해서 처리되는 것을 확인할 수 있다.

```python
In : assert isinstance(obj, MyObject)
assert s is obj
s.my_method()
Out: my_method was called!
```

obj 변수에 정수 1을 할당했으므로 obj 변수에 있던 MyObject 클래스의 인스턴스는 사 라졌다.

이를 가비지 컬렉션을 했으므로 남아 있지 않지만 약한 참조를 이용해서 만든 인스턴스는 그대로 살아 있는 것을 확인할 수 있다.

```python
In : import gc
obj = 1
gc.collect()
print(r)
print(s)
assert r() is not None
Out: <weakref at 0x00000000052AB7C8; to 'MyObject' at 0x000000000529DCC0>
<__main__.MyObject object at 0x000000000529DCC0>
```

변수 s를 삭제하면 약한 참조를 하던 인스턴스가 사라졌기에 약한 참조를 이용해서 만드 는 인스턴스가 없다. Assert문이 실행되어 예외가 발생하는 것을 알 수 있다.

```python
In : del s
assert r() is not None
Out: ---------------------------------------------------------------------
AssertionError          Traceback (most recent call last)
<ipython-input-38-fc1e42b8bbcd> in <module>()
1 del s
----> 2 assert r() is not None
AssertionError:
```

## 9.2.4 생성자 작동 원리 이해하기

생성자, 초기화, 소멸자를 각각 알아봤다. 생성자와 초기화가 클래스명과 호출 연산자를 통해 호출되는 원리를 알아본다.

예제 9-19 : 생성자, 초기화, 호출 연산자를 정의한 클래스

사용자 정의 클래스에서 _ _new_ _와 _ _init_ _을 전부 정의하고 _ _call_ _ 메서드에 _ _ new_ _와 _ _init_ _를 호출해서 처리할 수 있도록 구성한다.

```python
In : class MDPerson(object) :
def __new__(cls,name,major) :
return object.__new__(cls)
def __init__(self,name, major) :
self.name = name
self.major = major
@classmethod
def __call__(cls, name, major) :
print(" __new__ ")
self = cls.__new__(cls,name,major)
print(" __init__ ")
self.__init__(name,major)
return self
```

위의 클래스에 정의한 메서드들이 어떻게 저장되어 있는지를 확인해보겠다.

```python
In : import pprint
pprint.pprint(MDPerson.__dict__)
Out: mappingproxy({'__call__': <classmethod object at 0x00000000052BD2E8>,
'__dict__': <attribute '__dict__' of 'MDPerson' objects>,
'__doc__': None,
'__init__': <function MDPerson.__init__ at
0x0000000005292E18>,
'__module__': '__main__',
'__new__': <staticmethod object at 0x00000000052BD358>,
'__weakref__': <attribute '__weakref__' of 'MDPerson'
objects>})
```

클래스 MDPerson에서 _ _call_ _ 메서드를 호출하여 인스턴스를 생성해보면 아래의 결과 가 나온다.

```python
In : mdp = MDPerson.__call__("이주원","quant")
print(mdp)
print(mdp.name)
print(mdp.major)
Out: __new__
__init__
<__main__.MDPerson object at 0x00000000052C03C8>
이주원
quant
```

클래스 생성자를 이용하면 MDPerson 클래스에 정의한 _ _call_ _연산자를 호출하지 않는 것을 알 수 있다.

```python
In : mdp = MDPerson("박주원","quant")
print(mdp)
print(mdp.name)
print(mdp.major)
Out: <__main__.MDPerson object at 0x00000000052C04A8>
박주원
quant
```

클래스 생성자를 호출하면 type 클래스의 _ _call_ _를 호출해서 처리하는 방식과 동일한 결과를 처리한다.

```python
In : mdp2 = type.__call__(MDPerson,"최주원","quant")
print(mdp2)
print(mdp2.name)
print(mdp2.major)
Out: <__main__.MDPerson object at 0x00000000052C0320>
최주원
quant
```

## 9.2.5 함수를 이용한 생성자 패턴

파이썬에서는 함수를 가지고 다양한 인스턴스를 생성하는 기능을 내부적으로 많이 제공 한다. 직접 생성자를 이용해서도 생성이 가능하지만 클래스를 생성할 때 다양한 로직을 점검해서 처리가 필요할 경우 함수에 포함해서 처리하도록 구성해서 제공한다.

간단하게 여러 클래스를 하나의 함수를 통해 인스턴스로 생성하는 방식을 알아보겠다.

✚ 두 개의 클래스에 대한 생성

매개변수가 유사한 두 개의 클래스가 있다. 각각 인스턴스를 생성하는 것보다 하나의 생 성자 함수를 만들어서 두 개 클래스의 인스턴스가 생성되도록 처리하는 것이 더 편리 하다.

클래스들이 늘어나도 다른 프로그램과의 인터페이스 처리가 편리하므로 파이썬 각 모듈에 서 특히 이런 패턴을 많이 지원한다.

예제 9-20 : 함수의 결과로 인스턴스 생성하기

부모 클래스 Person과 자식 클래스 Employer, Employee를 정의했다.

상속을 받은 부분에 대해 초기화는 부모 클래스를 이용해서 초기화했다.

```python
In : class Person :
def __init__(self,name,age) :
self.name = name
self.age = age
In : class Employee(Person):
def __init__(self, name, age, depart,salary) :
super().__init__(name,age)
self.depart = depart
self.salary = salary
In : class Employer(Person) :
def __init__(self, name, age, salary) :
super().__init__(name,age)
self.salary = salary
```

함수를 정의해서 특정 정보에 매칭되는 클래스에 해당하는 생성자를 만들어 인스턴스를 반환하도록 처리한다. 특히 중요한 처리가 필요한 경우 키워드 인자로 처리하도록 구분을 *로 했다. 함수 내부의 분기 로직은 depart 매개변수를 기준으로 처리한다.

```python
In : def employ(name,age, *,depart=None,salary=None) :
if depart is None :
return Employer(name,age,salary=salary)
else :
if salary == None :
salary = 0
return Employee(name,age,depart=depart,salary=salary)
```

함수의 매개변수에 depart, salary를 키워드 인자로 전달해서 Employee 인스턴스를 만 들었다.

```python
In : e = employ("정찬혁",31,depart="빅데이터부",salary=30000)
print(e)
print(type(e))
Out: <__main__.Employee object at 0x0000000004B7B780>
<class '__main__.Employee'>
```

함수에 depart를 키워드 인자로 전달해서 Employer 인스턴스를 생성했다.

```python
In : e = employ("달문",52,salary=300000)
print(e)
print(type(e))
Out: <__main__.Employer object at 0x0000000004B7BEF0>
<class '__main__.Employer'>
```

## 9.2.6 인스턴스 네임스페이스 변경하기 : _ _slots_ _ :

클래스나 인스턴스의 네임스페이스는 해시가 가능한 딕셔너리를 사용한다. 많은 인스턴 스를 생성해서 처리하려면 메모리가 많이 사용된다.

특별히 생성되어 내부 변경이 없고 주로 검색해서 처리하는 인스턴스로만 사용할 경우에 는 메모리를 적게 차지하는 튜플로 변경해서 사용하는 것이 더 좋다. 이럴 때 네임스페이 스를 관리하는 속성인 _ _slots_ _을 사용해서 인스턴스 네임스페이스를 제한할 수 있다.

단점은 _ _slots_ _ 을 가지고 인스턴스 네임스페이스가 만들어지면 런타임에 속성을 추가 할 수 없는 immutable 처리된다.

예제 9-21 : _ _slots_ _ 사용하기

클래스 내부에 _ _slots_ _으로 인스턴스를 생성할 때 필요한 속성을 정의하고 나서 초기 화에 다른 속성도 추가하면 에러를 발생시킨다.

```python
In : class Klass :
__slots__ = ("name",)
def __init__(self, name,age) :
self.name = name
self.age = age
```

_ _slots_ _에 할당되지 않으면 초기화에 정의가 되어 추가될 수 없다.

```python
In : k = Klass("name","age")
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-55-7888ea427118> in <module>()
----> 1 k = Klass("name","age")
<ipython-input-54-60c9f29d33b8> in __init__(self, name, age)
3   def __init__(self, name,age) :
4     self.name = name
----> 5   self.age = age
AttributeError: 'Klass' object has no attribute 'age'
```

클래스를 정의할 때 _ _slots_ _에 정의된 이름만 인스턴스의 속성으로 만들어서 처리하면 생성자를 이용해서 인스턴스가 만들어진다.

```python
In : class Klass_ :
__slots__ = ("name",)
def __init__(self, name) :
self.name = name
k = Klass_("name")
print(k)
Out: <__main__.Klass_ object at 0x00000000051ADBB8>
```

Klass_ 내부에 _ _slots_ _을 정의하고 이를 기반으로 _ _init_ _에 속성을 추가한다. 인스 턴스의 네임스페이스를 딕셔너리_ _dict_ _에서 _ _slots_ _으로 변경했으므로 _ _dict_ _으 로 조회하면 AttributeError가 발생한다.

```python
In : print(k.name)
print(k.__dict__)
Out: name
---------------------------------------------------------------------
AttributeError          Traceback (most recent call last)
<ipython-input-57-4736842b6265> in <module>()
1 print(k.name)
----> 2 print(k.__dict__)
AttributeError: 'Klass_' object has no attribute '__dict__'
```

_ _slots_ _가 정의되면 관리되는 것은 클래스 네임스페이스에 들어가 있는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Klass_.__dict__)
Out: nmappingproxy({'__doc__': None,
'__init__': <function Klass_.__init__ at
0x0000000005292F28>,
'__module__': '__main__',
'__slots__': ('name',),
'name': <member 'name' of 'Klass_' objects>})
```

클래스의 _ _slots_ _ 내부에 정의된 name이라는 속성이 하나 만들어져 있는 것을 볼 수 있다.

```python
In : print(Klass_.__slots__)
print(Klass_.__dict__[Klass.__slots__[0]])
Out: ('name',)
<member 'name' of 'Klass_' objects>
```

클래스에 정의된 name을 확인해보면 디스크립터로 만들어져 있다. 디스크립터는 이름으 로 접근을 하지만 이 내용은 메서드를 이용해서 인스턴스에 접근하는 것이다.

```python
In : print(type(Klass_.name))
Out: <class 'member_descriptor'>
```

내부의 값을 변경할 경우 변경이 되는 것을 확인할 수 있다.

```python
In : print(k.name)
```

k.name = "가을이" print(k.name)

```python
Out: name
가을이
```

_ _slots_ _ 으로 정의해도 클래스 객체에 런타임으로 속성이 추가되지만 인스턴스에는 추 가가 되지 않는다. 클래스에 추가된 age 속성을 인스턴스에서 조회해서 출력을 했다.

```python
In : Klass_.age = 100
In : k.age
Out: 100
```

하지만 인스턴스에서 직접 age 속성을 추가하면 에러가 발생한다.

```python
In : k.age = 100
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-76-76a2575e7959> in <module>()
----> 1 k.age = 100
AttributeError: 'Klass_' object attribute 'age' is read-only
```

예제 9-22 : 관행적으로 __dict__ 속성 조회 로직이 있을 경우

파이썬 프로그램에 보면 내부 속성에 _ _dict_ _로 접근하는 경우가 많다. 관행적으로 _ _ dict_ _를 조회하므로 이 속성을 _ _slots_ _에 추가하면 기존 관행을 처리하는 데 예외가 없어질 수 있다.

클래스 내에 인스턴스에서 처리할 속성을 3개 추가했다. _ _dict_ _는 빈 딕셔너리를 할당 했다.

```python
In : class MyClass :
__slots__ = ['x','y','__dict__']
def __init__(self,x,y) :
self.x = x
self.y = y
self.__dict__ = {}
```

클래스로 인스턴스를 하나 만들고 속성을 조회해본다. 그리고 _ _dict_ _ 속성을 조회해도 일단 예외는 발생하지 않는다.

```python
In : m = MyClass(5,5)
print(m.x, m.y)
print(m.__dict__)
Out: 5 5
{}
```

_ _slots_ _으로 처리하고 있는데 _ _dict_ _을 추가하면 인스턴스 객체 내에 속성들을 추가 할 수 있다. 인스턴스 속성에 대한 제약을 주려고 사용한 _ _slots_ _ 에 대한 효과가 떨어 진다.

```python
In : m.__dict__['a'] = 100
print(m.a)
Out: 100
In : m.b = 100
print(m.__dict__)
Out: {'a': 100, 'b': 100}
In : print(type(m), m.__slots__)
Out: <class '__main__.MyClass'> ['x', 'y', '__dict__']
```
