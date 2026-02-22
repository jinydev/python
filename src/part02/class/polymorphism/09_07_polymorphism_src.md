---
layout: default
title: "09.07 다형성(Polymorphism)"
---

# 09.07 다형성(Polymorphism)

다형성이란 프로그래밍 언어의 자료형 내 요소들이 다양한 곳에 내포되어 처리하는 것 이다. 특히 객체지향에서는 상속을 받을 경우 부모와 자식 클래스 내에 메서드들이 동일 하게 구현되어 처리하는 것을 말한다.

실질적인 재정의에는 부모의 기능을 사용하지 않고 자식의 기능으로 특화하는 오버라이딩 과 동일한 기능을 여러 개로 분리해서 사용하는 오버로딩 등이 있다. 파이썬은 이름으로 만 관리하므로 동일한 기능을 여러 개로 분리할 수 없지만 특정 모듈을 사용해서 오버로딩 도 가능하다.

특히 연산자를 전부 스페셜 메서드에 의해 처리하므로 다양한 기능을 다양한 클래스에 재 정의해서 사용하는 연산자 오버로딩도 가능하다.

## 9.7.1 다형성이란

파이썬에서 다형성(polymorphism)은 객체의 자료형이 달라도 즉, 클래스가 차이가 생겨도 동일한 이름의 메서드를 이용할 경우에는 동일한 행위를 처리해야 하고 특화된 것이 있을 경우 특화된 기능에 대한 처리도 동일한 행위를 기준으로 추가되어야 한다.

✚ 위키피디아의 다형성 용어 정의

“프로그래밍 언어의 다형성(多形性, polymorphism; 폴리모피즘)은 그 프로그래밍 언어의 자 료형 체계의 성질을 나타낸다. 프로그래밍 언어의 각 요소들(상수, 변수, 식, 오브젝트, 함수, 메서드 등)이 다양한 자료형(type)에 속하는 것이 허가되는 성질을 가리킨다. 반대말은 단형 성(monomorphism)으로, 프로그래밍 언어의 각 요소가 한 가지 형태만 가지는 성질을 가 리킨다.”

## 9.7.2 메서드 오버라이딩(overriding)

부모 클래스를 상속했을 때 부모의 메서드를 사용하지 않고 자식 클래스에서 필요한 기능 을 추가해 재정의한 것을 오버라이딩이라고 한다.

자식 클래스의 인스턴스에서 오버라이딩된 메서드를 호출하면 부모 클래스의 메서드는 더 이상 참조가 되지 않고 자식 클래스의 메서드에서 처리하도록 호출을 한다.

예제 9-48 : 부모 클래스의 메서드를 오버라이딩

부모 클래스는 속성을 하나씩 가지고 메서드도 그 속성을 처리만 하도록 작성을 했다.

```python
In : class Parent1 :
def __init__(self,name) :
print(" Parent1 ")
self.name = name
def getname(self) :
return self.name
class Parent2 :
def __init__(self,age) :
print(" Parent2 ")
self.age = age
def getage(self) :
return self.age
```

두 부모를 상속받은 자식 클래스는 부모 클래스에 있는 메서드들을 전부 재작성해서 오버 라이딩 처리를 했다.

```python
In : class Child2(Parent1, Parent2) :
def __init__(self,name, age=None) :
super().__init__(name)
if age is not None :
Parent2.__init__(self,age)
def getname(self) :
return "child " + self.name
def getage(self) :
return "child " + str(self.age)
```

자식 클래스를 가지고 인스턴스를 하나 만들었다. 이 인스턴스를 가지고 메서드를 호출해 서 처리했다. 자식 클래스에 정의된 메서드들이 호출되어 실행된 결과를 볼 수 있다.

```python
In : c = Child2("오버라이딩", 33)
print(c.getname())
print(c.getage())
Out: Parent1
Parent2
```

child 오버라이딩 child 33 부모 클래스의 메서드를 이용해서 자식 클래스의 인스턴스를 인자로 전달해 처리가 되면 부모 클래스의 메서드가 바인딩되어 처리하는 것을 볼 수 있다.

다형성의 특징으로 부모 클래스는 하위 클래스를 직접적으로 검색할 수 없고 검색하는 기 준도 항상 자기부터 상위로 검색을 하고 실행하게 되어 있다.

```python
In : print(Parent1.getname(c))
print(Parent2.getage(c))
Out: 오버라이딩
```

## 9.7.3 메서드 오버로딩(overloading)

함수형 언어에서 메서드의 시그너처별로 함수를 작성하듯이 동일한 클래스 내에서 메서드 명과 시그너처를 기준으로 여러 메서드를 정의하는 것이다.

파이썬에서 메서드의 시그너처는 단순한 주석이고 메서드는 이름으로만 처리해서 이름이 같으면 동일한 메서드로 처리된다.

메서드 오버로딩을 하려면 overload 모듈을 제공하므로 이를 import해서 동일한 메서드 를 매개변수에 맞춰 처리할 수 있도록 재정의하고 등록을 해서 처리할 수 있다.

예제 9-49 : overload 모듈을 이용

파이썬 코어에서 제공되는 overload 모듈을 pip를 통해 install을 해서 설치한다.

```python
In : !pip install --upgrade overload
Out: Collecting overload
Using cached overload-1.1.tar.gz
Building wheels for collected packages: overload
Running setup.py bdist_wheel for overload: started
Running setup.py bdist_wheel for overload: finished with status 'done'
Stored in directory: C:\Users\06411\AppData\Local\pip\Cache\wheels\8
4\11\4f\398b5a199ac6da983db67bbf794d8fd793f3c53da1254f74f4
Successfully built overload
Installing collected packages: overload
Successfully installed overload-1.1
```

클래스를 정의할 때 동일한 메서드 이름으로 두 개를 정의하고 이 메서드 앞에 데코레이터 를 이용해서 정의한다.

첫 번째 메서드를 데코레이터로 처리하면 overload 클래스로 method라는 함수가 A 클 래스 내에 생성되고 그 안에 메서드들을 내부 함수로 관리한다.

```python
In : from overload import overload
class A :
@overload
def method(self) :
print(" no args method ")
@method.add
def method(self, x) :
print(" one args method "+ x)
@method.add
def method(self, x,y) :
print(" two args method "+ x,y)
```

일단 인스턴스를 만들고 동일한 메서드를 인자만 다르게 실행하면 정상적으로 처리되는 것을 알 수 있다.

```python
In : a = A()
a.method()
a.method("hello")
a.method("hello","world")
Out: no args method
one args method hello
two args method hello world
```

클래스 A의 네임스페이스를 확인해보면 method라는 함수가 만들어져 있는 것을 볼 수 있고 method 함수의 객체 네임스페이스를 확인하면 add라는 함수가 있는 것을 확인할 수 있다. Method.add로 데코레이터를 하면 이 add 함수를 가지고 추가적인 메서드들을 내부에 추가한다.

```python
In : import pprint
pprint.pprint(A.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'A' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'A' objects>,
'method': <function A.method at 0x0000000005DF1620>})
In : print(type(A.method))
pprint.pprint(A.method.__dict__)
Out: <class 'function'>
{'__wrapped__': <function A.method at 0x0000000005DF1598>,
'add': <function overload.<locals>.add at 0x0000000005DF16A8>}
```

파이썬 3.6 버전에서는 typing 모듈이 추가되면서 주석으로 메서드에 대한 오버로딩을 표 시하고 이를 구현해서 처리하면 이 조건이 만족하는 경우 오버로딩을 처리한다.

주석을 추가한 것이므로 구현하는 모듈에서 오버로딩을 처리할 메서드는 정의해야 한다.

```python
In : from typing import overload
class Overload_ :
@overload
def method(self) :
pass
@overload
def method(self, x:str) :
pass
@overload
def method(self, x:str,y:str) :
pass
def method(self,*args) :
if len(args) == 0 :
print(" no args method ")
if len(args) == 1 :
print(" one args method "+ args[0])
if len(args) == 2 :
print(" two args method "+ args[0], args[1])
```

위의 클래스를 가지고 인스턴스를 만들어서 수행하면 오버로딩이 처리되는 것을 알 수 있다.

```python
In : a = Overload_()
a.method()
a.method("hello")
a.method("hello","world")
Out: no args method
one args method hello
two args method hello world
```

오버로딩을 할 때도 함수의 다양한 타입을 지정해서 처리하는 방식을 사용하여 처리가 가 능하다. 예제 전에 !pip install multipledispatch로 모듈을 설치한다. multipledispach 모듈 내의 dispatch를 이용해서 메서드이므로 self를 빼고 매개변수에 들어갈 자료형으로 구분해서 처리한다.

```python
In : from multipledispatch import dispatch
class A :
@dispatch()
def method(self) :
print(" no args method ")
@dispatch(str)
def method(self, x) :
print(" one args method "+ x)
@dispatch(str,str)
def method(self, x,y) :
print(" two args method "+ x,y)
```

인스턴스를 생성해서 메서드를 호출하면 실행되는 것을 확인할 수 있다.

```python
In : a = A()
a.method()
a.method("hello")
a.method("hello","world")
Out: no args method
one args method hello
two args method hello world
```

A 클래스 내부의 네임스페이스를 확인하면 method가 하나 만들어진 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(A.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'A' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'A' objects>,
'method': <dispatched method>})
```

만들어진 method 내부의 속성을 확인하면 다양한 메서드들이 있는 것을 알 수 있다.

```python
In : for i in dir(A.method) :
if not i.startswith("_") :
print(i)
Out: add
cls
dispatch
dispatch_iter
doc
funcs
help
name
obj
ordering
register
reorder
resolve
source
```

이 중에 func 속성을 확인해보면 dispatch에 들어온 인자들을 키로 해서 함수들을 저장하 는 것을 알 수 있다. 실행될 때 이 인자들을 검색하고 맞는 메서드를 호출해서 처리한다.

```python
In : A.method.funcs
Out: {(): <function __main__.A.method>,
(str,): <function __main__.A.method>,
(str, str): <function __main__.A.method>}
```

## 9.7.4 연산자 오버로딩(operator overloading)

연산자 오버로딩(operator overloading)은 연산자를 내부의 인스턴스 처리하는 스페셜 메서 드의 인터페이스만을 이용한 뒤 사용자 클래스에 재정의하는 것이며 이를 연산자 오버로 딩이라고 한다.

동일한 연산자를 다양한 클래스에서 동일하게 적용하기 위해서이다. 각 클래스를 정의할 때마다 연산자에 맞게 처리되도록 연산자 오버로딩이 필요하다.

예제 9-50 : 연산자 오버로딩 이해하기

실수를 계산하는 Float_ 클래스를 하나 만들어서 덧셈을 처리하는 연산자에 대한 메서드 를 재정의했다.

```python
In : class Float_(float) :
def __init__(self,value) :
self.value = float(value)
def __add__(self,value) :
return Float_(self.value + float(value))
```

인스턴스를 만들어서 이 값을 조회한 후에 정수와 덧셈을 하면 실수 값이 출력된다. 출력 되는 값에 대한 클래스를 조회하면 Float_ 클래스라는 것을 확인할 수 있다.

```python
In : v = Float_(100.5)
print(v.value)
print(v+100)
print(type(v+100))
Out: 100.5
200.5
<class '__main__.Float_'>
```

위의 예제를 다시 작성해서 float 클래스를 상속받지 않고 덧셈 연산자에 대한 메서드를 재정의했다.

```python
In : class Float_ :
def __init__(self,value) :
self.value = float(value)
def __add__(self,value) :
return Float_(self.value + float(value)).value
```

이를 가지고 인스턴스를 만들어서 이를 정수와 덧셈을 해도 결과의 자료형은 Float_ 클래 스라는 것을 알 수 있다.

```python
In : v = Float_(100.5)
print(v.value)
print(v+100)
print(type(v+100))
Out: 100.5
200.5
<class '__main__.Float_'>
```

## 9.7.5 덕 타이핑(Duck typing) 패턴 이해하기

덕 타이핑(Duck typing)은 별도의 인터페이스 지정 없이 동적으로 동일한 인터페이스를 가 지는 객체들을 확인하고 호출해서 처리할 수 있는 패턴을 말한다. 특히, 파이썬에서는 다

형성으로 구성된 메서드에 대해 동적으로 바인딩해서 실행할 수 있는 구조를 지원한다.

대신 각 클래스 내에 동일한 인터페이스 규약을 준수하도록 동일한 이름의 메서드가 구현 되어 있어야 한다.

덕 타이핑은 클래스의 타입을 체크하지 않고 행위의 동일성만을 가지고 처리하는 것이므 로 객체 간의 관계성이 중요하지 않는다.

✚ 함수와 클래스를 이용한 덕 타이핑

함수를 인터페이스로 처리할지, 클래스를 인터페이스로 처리할지에 따라 구현하는 방식 이 조금 차이가 있을 수 있다. 함수와 클래스를 이용해서 동일한 메서드가 호출되도록 처 리한다.

예제 9-51 : 함수 내에서 인터페이스 처리

클래스에 가지고 있는 동일한 메서드가 동적인 인터페이스로 결정되면 하나의 함수에서 이 인터페이스를 호출하여 처리할 수 있어야 한다. 이처럼 동적 인터페이스를 처리하기 위해 함수를 이용해서 클래스의 인스턴스를 간접적으로 접근하여 처리한다.

두 개의 클래스 Duck과 Person를 정의할 때 내부에 say라는 메서드를 정의한다. 두 메서 드의 기능은 다른 역할을 하지만 외부 함수에서 불러서 사용할 수 있는 동일한 매개변수를 가지도록 처리한다.

```python
In : class Duck :
def say(self) :
return "quack quack"
class Person :
def say(self) :
return "Hello !"
```

다른 곳에서 say라는 함수의 매개변수로 인스턴스를 받는다. 이 인스턴스 내에는 반드시 동일한 메서드가 있어야 한다. 함수의 로직은 단순히 모든 인스턴스가 say라는 메서드가 있다고 알고 처리한다.

```python
In : def say(obj) :
return obj.say()
```

인스턴스를 클래스별로 만들고 동일한 함수 say를 두 번 실행했다. 인스턴스 내의 메서드 가 실행되어 처리되는 것을 보여준다.

```python
In : d = Duck()
p = Person()
print(say(d))
print(say(p))
Out: quack quack
Hello !
```

예제 9-52 : class 내에서 인터페이스 제공

별도의 클래스의 정적 메서드를 정의해서 타 클래스들의 동적 인터페이스를 호출하도록 처리해도 동일한 덕 타이핑 처리가 가능하다.

두 개의 클래스 Duck과 Person의 say라는 메서드를 작성했다.

```python
In : class Duck :
def say(self) :
return "quack quack"
class Person :
def say(self) :
return "Hello !"
```

Say라는 클래스에서 정적 메서드로 say를 작성한다.

```python
In : class Say :
@staticmethod
def say(obj) :
return obj.say()
```

Say.say를 두 번 호출해서 실행하면 각각의 인스턴스의 say 메서드가 실행되어 결과를 처 리한다.

인스턴스 내의 메서드가 실행되어 처리되는 것을 보여준다.

```python
In : d = Duck()
p = Person()
print(Say.say(d))
print(Say.say(p))
Out: quack quack
Hello !
```
