---
layout: default
title: "15.03 디스크립터(descriptor)"
---

# 15.03 디스크립터(descriptor)

프로퍼티 처리를 하면서 디스크립터를 만드는 방식을 이해했다. 프로퍼티는 메서드를 내 부에 저장하고 이 저장된 메서드를 속성처럼 처리하는 것이다.

디스크립터는 디스크립터 클래스의 인스턴스를 처리되는 클래스의 속성으로 저장해서 실 제 사용되는 클래스의 인스턴스 속성에 접근하면 디스크립터 메서드로 접근해서 처리하는 방식이다.

이제 상세한 디스크립터 처리 기법을 알아보겠다.

✚ 디스크립터 만드는 순서

● 디스크립터 클래스 내에 스페셜 메서드를 만든다.

◦ _ _get_ _(self, instance, owner) ◦ _ _set_ _(self, instance, value) ◦ _ _delete_ _(self,instance)

● 소유 클래스를 정의하고 디스크립터 인스턴스를 만들어 소유 클래스에 있는 속성

명을 넣어서 만든다.

● 소유 클래스의 인스턴스가 클래스 내부의 디스크립터 인스턴스가 할당된 속성에

접근하면 디스크립터의 메서드가 실행되어 처리된다.

## 15.3.1 디스크립터 작동 원리

하나의 디스크립터를 만들고 다양한 속성에 인스턴스를 만들어서 처리하려고 하면 초기화 메서드에 호출할 속성의 이름을 넣어서 처리한다. 나중에 사용할 클래스 내의 디스크립터 인스턴스를 생성할 때 사용할 클래스에 정의된 속성의 이름을 문자열로 전달하면 하나의 디스크립터 클래스를 가지고 여러 개의 속성을 처리할 수 있다.

디스크립터로 작성된 사용할 클래스에서 속성에 접근할 때는 항상 클래스의 속성부터 접 근하고 그 다음에 인스턴스 속성을 검색해서 처리한다. 단, 디스크립터가 없을 경우는 파 이썬 규칙에 따라 인스턴스 속성부터 검색해서 처리한다.

예제 15-10 : 디스크립터를 정의해서 사용 시 주의할 점

Descriptor 클래스에 _ _get_ _ 메서드를 정의한 것은 조회만 가능한 디스크립터를 만들 어서 처리하겠다는 뜻이다. 이 클래스에서 인스턴스를 생성할 때 만든 하나의 속성은 인 스턴스가 만들어질 속성의 이름이 들어갈 공간이다.

_ _get_ _메서드에서 접근할 경우 인스턴스의 네임스페이스에 접근해서 이 인스턴스에 등 록된 이름을 가지고 접근하는 것이다.

```python
In : class Descriptor :
def __init__(self,name) :
self._name = "_" + name
def __get__(self,other,owner=None) :
print(" __get__ call ")
return other.__dict__[self._name]
```

사용자 정의 클래스인 Owner를 정의할 때 클래스 속성인 name, age를 디스크립터 인스 턴스로 만들었다. 속성의 이름과 인자의 이름이 동일하도록 했다.

```python
In : class Owner :
name = Descriptor("name")
age = Descriptor("age")
```

인스턴스를 하나 만들었다. 먼저 이 클래스의 네임스페이스를 확인해봤다. 두 개의 디스 크립터 인스턴스가 만들어진 것을 알 수 있다.

```python
In : import pprint
o = Owner()
pprint.pprint(Owner.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Owner' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Owner'
objects>,
'age': <__main__.Descriptor object at 0x10e671f60>,
'name': <__main__.Descriptor object at 0x10e671eb8>})
```

디스크립터를 정의할 때 조회만 했으므로 인스턴스에서 name 속성을 가지고 갱신할 경 우에는 실제 인스턴스에 name 속성이 생겨서 디스크립터가 실행되지 않는다.

```python
In : o.name = " 디스크립터 "
print(o.name)
print(o.__dict__)
Out: 디스크립터
```

{'name': ' 디스크립터 '} 갱신이 된 후에 조회해서 인스턴스 속성으로 접근하면 디스크립터가 실행되지 않고 직접 인스턴스 속성을 읽어 처리한다.

```python
In : o.name
Out: ' 디스크립터 '
```

위의 문제를 해결하기 위해서는 디스크립터를 처리하는 클래스 내의 메서드로 _ _set_ _을 추가하는 것이 좋다. 조회만 필요할 경우에는 _ _set_ _을 작성하지만 갱신이 불가하게 처 리하면 된다.

이번에는 _ _set_ _ 메서드가 갱신이 가능하도록 정의해서 처리하도록 했다.

```python
In : class Descriptor_set :
def __init__(self,name) :
self._name = "_" + name
def __get__(self,other,owner=None) :
print(" __get__ call ")
return other.__dict__[self._name]
def __set__(self,other,value) :
print(" __set__ call ")
other.__dict__[self._name] = value
```

수정한 디스크립터를 가지고 Owner 클래스의 클래스 속성에 인스턴스로 만들었다. 인스 턴스에서 name을 갱신했는데 인스턴스 내의 네임스페이스에는 _name이 들어가 있는 것 을 확인할 수 있다.

디스크립터가 실행되면 클래스 속성이 우선되어 검색되는 것을 알 수 있다.

```python
In : class Owner :
name = Descriptor_set("name")
age = Descriptor_set("age")
o1 = Owner()
```

o1.name = " 디스크립터 set " print(o1.name) print(o1.__dict__)

```python
Out: __set__ call
__get__ call
디스크립터 set
```

{'_name': ' 디스크립터 set '}

예제 15-11 : 일반적인 속성 접근 순서

사용자 클래스 Klass를 만들고 클래스 속성 name과 인스턴스 속성 name을 정의했다.

```python
In : class Klass :
name = " Class attr"
def __init__(self, name) :
self.name = name
```

인스턴스 k를 만들어서 name 속성에 접근하면 인스턴스에 있는 name을 조회해서 출력 한다.

```python
In : k = Klass("인스턴스 속성")
print(k.name)
print(k.__dict__)
Out: 인스턴스 속성
```

{'name': '인스턴스 속성'} 클래스 속성을 확인해보면 클래스에도 name 속성이 있는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Klass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Klass' objects>,
'__doc__': None,
'__init__': <function Klass.__init__ at
0x0000000004DF09D8>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass'
objects>,
'name': ' Class attr'})
```

예제 15-12 : 디스크립터 지정 시 속성 접근 순서

일반 사용자 클래스에서 인스턴스를 만들면 인스턴스 내부의 속성부터 읽고 처리하도록 구성한다. 디스크립터를 사용할 경우는 인스턴스 내의 속성보다 디스크립터로 정의된 속 성이 우선순위가 높아진다. 조회 및 갱신이 가능한 디스크립터 클래스를 정의한다.

```python
In : class Descriptor_set :
def __init__(self,name) :
self._name = "_" + name
def __get__(self,other,owner=None) :
print(" __get__ call ")
return other.__dict__[self._name]
def __set__(self,other,value) :
print(" __set__ call ")
other.__dict__[self._name] = value
```

디스크립터를 사용하는 클래스인 Klass에 클래스 속성과 인스턴스 속성을 동일한 이름으 로 정의했다.

```python
In : class Klass :
name = Descriptor_set("name")
def __init__(self, name) :
print(" Klass __init__")
self.name = name
```

인스턴스를 생성해보면 초기화 메서드가 실행될 때 인스턴스 네임스페이스 처리를 하지 않는다. 디스크립터의 인스턴스인 클래스 속성을 바로 읽고 _ _set_ _ 메서드를 호출해서 갱신하는 것을 확인할 수 있다.

인스턴스에서 name 속성을 읽으면 디스크립터 내의 _ _get_ _ 메서드가 호출되는 것을 볼 수 있다. 인스턴스 속성은 디스크립터에 정의된 대로 _name이 들어간다.

```python
In : k = Klass("인스턴스 속성")
print(k.name)
print(k.__dict__)
Out: Klass __init__
__set__ call
__get__ call
인스턴스 속성
```

{'_name': '인스턴스 속성'} 클래스 속성에 name이 디스크립터의 인스턴스를 가지고 있는 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(Klass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Klass' objects>,
'__doc__': None,
'__init__': <function Klass.__init__ at 0x0000000004E38048>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass'
objects>,
'name': <__main__.Descriptor_set object at
0x0000000004E46240>})
```

예제 15-13 : 디스크립터 클래스에 __delete__ 생성

디스크립터 클래스에 _ _delete_ _도 추가해서 인스턴스 속성도 삭제하도록 작성했다.

```python
In : class Descriptor_del :
def __init__(self,name) :
self._name = "_" + name
def __get__(self,other,owner=None) :
print(" __get__ call ")
return other.__dict__[self.name]
def __set__(self,other,value) :
print(" __set__ call ")
other.__dict__[self._name] = value
def __delete__(self,other) :
print(" __delete__ call ")
del other.__dict__[self._name]
```

만들어지는 클래스에 name 속성을 하나 만들었다.

```python
In : class Klass :
name = Descriptor_del("name")
def __init__(self, name) :
print(" Klass __init__")
self.name = name
```

인스턴스를 만들어서 속성을 조회하면 디스크립터 내의 _ _get_ _, _ _set_ _을 호출해서 처리되는 것을 알 수 있다.

```python
In : k = Klass("인스턴스 속성")
print(k.name)
print(k.__dict__)
Out: Klass __init__
__set__ call
__get__ call
인스턴스 속성
```

{'_name': '인스턴스 속성'} 인스턴스를 삭제하면 _ _delete_ _를 호출해서 인스턴스 속성을 삭제하는 것을 확인할 수 있다.

```python
In : del k.name
print(k.__dict__)
Out: __delete__ call
{}
```

## 15.3.2 디스크립터 정의할 때 무한 순환 발생 해결 방안

디스크립터가 정의되면 _ _getattribute_ _가 소유자 클래스의 속성부터 참조하기 때문에 내장 함수 getattr, setattr, delattr로 처리 시 주의해야 한다.

인스턴스와 클래스 속성이 동일할 경우는 특히 getattr,setattr, delattr로 호출할 경우 계 속 _ _get_ _을 호출해서 처리가 된다. 특히 이 내장 함수를 디스크립터 메서드에 정의할 때는 클래스 속성명과 인스턴스 속성명을 달리 표시해서 처리해야 한다.

동일한 이름으로 처리를 원할 때는 직접 인스턴스 네임스페이스인 _ _dict_ _로 접근해서 처리하도록 작성해야 한다.

예제 15-14 : 무한 순환 발생 원인

동일한 이름으로 처리할 때는 인스턴스의 네임스페이스를 직접 읽어서 처리하면 무한 순 환을 방지할 수 있다.

주석으로 막은 getattr(other, self._name)으로 처리할 경우 무한 순환이 되는 이유는 클래스 속성에 있는 이름으로 조회가 되므로 계속 디스크립터를 호출해서 처리가 되는 것이다.

그래서 소유자 클래스로 만든 인스턴스의 네임스페이스에 접근해서 처리하고 있다.

```python
In : class Descriptor_loop :
def __init__(self,name) :
self._name = name
def __get__(self,other,owner=None) :
print(" __get__ call ")
#return getattr(other, self._name)
return other.__dict__[self._name]
def __set__(self,other,value) :
print(" __set__ call ")
other.__dict__[self._name] = value
def __delete__(self,other) :
print(" __delete__ call ")
del other.__dict__[self._name]
```

또한 더 명확히 해서 사용하려면 인스턴스 속성의 이름을 명확히 보호된 속성으로 정의해 서 만드는 것이다. 그러면 getattr, setattr, delattr로 접근해도 아무런 문제가 발생하지 않 는다.

```python
In : class Descriptor_loop1 :
def __init__(self,name) :
self._name = "_"+name
def __get__(self,other,owner=None) :
print(" loop1 __get__ call ")
return getattr(other, self._name)
def __set__(self,other,value) :
print(" loop1 __set__ call ")
setattr(other, self._name, value)
def __delete__(self,other) :
print(" loop1 __delete__ call ")
delattr(other, self._name)
```

클래스 속성으로 디스크립터를 정의했다. 초기화 메서드에서 인스턴스 .name을 호출 했다.

```python
In : class Klass :
name = Descriptor_loop1("name")
def __init__(self, name) :
print(" Klass __init__")
self.name = name
```

인스턴스를 만들었다. 초기화 메서드에서 인스턴스.name은 클래스 속성을 참조해서 _ _ set_ _이 실행되는 것을 알 수 있다. 그리고 인스턴스.name으로 접근하면 _ _get_ _을 조 회한다.

```python
In : k = Klass("인스턴스 속성")
print(k.name)
print(k.__dict__)
Out: Klass __init__
loop1 __set__ call
loop1 __get__ call
인스턴스 속성
```

{'_name': '인스턴스 속성'} 이 속성을 삭제하면 _ _del_ _이 실행되는 것을 알 수 있다.

```python
In : del k.name
print(k.__dict__)
Out: loop1 __delete__ call
{}
```

## 15.3.3 메서드도 디스크립터로 구현

파이썬 함수를 정의하고 이를 디스크립터로 전달한 뒤 메서드를 등록해서 사용도 가능 하다.

예제 15-15 : 메서드 디스크립터 처리

디스크립터 클래스에서 _ _get_ _ 메서드를 정의할 때 메서드가 실행되어야 하므로 메서드 를 검색한 후에 실행하도록 처리하면 된다.

하지만 _ _set_ _ 메서드는 함수가 등록된 것을 갱신하면 안 되므로 속성이 들어가는 부분 을 갱신하도록 만들었다.

```python
In : class Descriptor_method :
def __init__(self,name) :
self._name = name
def __get__(self,other,owner=None) :
print(" __get__ call ")
return other.__dict__[self._name](other)
def __set__(self,other,value) :
print(" __set__ call ")
other.__dict__[self._name] = value
```

함수 getname을 정의하고 이를 클래스 내에 등록했다. 이를 호출하면 디스크립터가 호출 되고 메서드를 조회해서 실행한다.

```python
In : def getname(self) :
return self._name
class Method :
name = Descriptor_method("getname")
def __init__(self, func_name) :
self.name = func_name
```

self._name = " 메서드 호출 " 인스턴스를 생성할 때 함수를 전달하고 내부에 등록 Method 클래스 생성자에 함수를 인 자로 전달하면 이 함수가 name이라는 속성에 저장된다. 이 함수의 이름을 호출하면 메서 드처럼 사용할 수 있다.

```python
In : m = Method(getname)
print(m.name)
Out: __set__ call
__get__ call
메서드 호출
```

이 클래스의 네임스페이스를 확인해보면 name이라는 속성에 디스크립터 인스턴스가 하 나 들어가 있는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Method.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Method' objects>,
'__doc__': None,
'__init__': <function Method.__init__ at
0x0000000004C1E0D0>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Method'
objects>,
'name': <__main__.Descriptor_method object at
0x0000000004C1A278>})
```

## 15.3.4 파이썬 함수도 디스크립터

클래스의 스페셜 메서드들도 내부를 보면 _ _get_ _이 있다. 이를 통해 메서드들이 하나의 디스크립터라는 것을 알 수 있다.

예제 15-16 : 내장 클래스 int 내의 스페셜 메서드도 디스크립터

int._ _add_ _._ _get_ _(1)로 호출하면 메서드로 연결되어 처리된다. 이를 실행하면 결과 로 4가 나온다.

```python
In : int.__add__.__get__(1)
Out: <method-wrapper '__add__' of int object at 0x10c5c5800>
In : int.__add__.__get__(1)(3)
Out: 4
```

이와 동일한 것이 (1)._ _add_ _ 와 동일한 처리가 되는 것을 알 수 있다.

```python
In : (1).__add__
Out: <method-wrapper '__add__' of int object at 0x10c5c5800>
In : (1).__add__(3)
Out: 4
```

예제 15-17 : 함수도 디스크립터이다

함수를 정의해서 그 내부에 _ _get_ _이 있는지를 확인하면 있다. 이 디스크립터는 특정 인자를 주고 실행하면 바운드 메서드가 된다. 함수가 내부적으로 처리될 때도 메서드처럼 작동되는 것을 알 수 있다.

```python
In : def add(x,y) :
return x+y
In : add.__get__
Out: <method-wrapper '__get__' of function object at 0x10e65d620>
```

이 메서드에 첫 번째 인자를 넣고 실행하면 정수 인스턴스의 메서드가 만들어지는 것을 알 수 있다.

```python
In : a = add.__get__(10)
In : a
Out: <bound method add of 10>
```

다음 인자를 넣어서 실행하면 결과가 나온다.

```python
In : a(10)
Out: 20
```

위의 절차는 함수를 호출할 때 인자로 10,10을 전달하는 것과 동일한 결과가 나온다.

```python
In : add(10,10)
Out: 20
CHAPTER
```

자료 구조 및 알고리즘 모듈 파이썬 내장 자료형을 보완하기 위해 다양한 자료 구조에 대한 자료형을 만들어서 모듈로 제공한다. 특히 딕셔너리, 튜플, 리스트가 확장된 형태의 자료 구조들을 제공한다. 또한 간단한 검색 알고리즘 처리를 위한 모듈도 제공되고 있다.

✚ 알아볼 주요 내용

● Collections 모듈

● Queue 모듈

● Heapq 모듈

● Bisect 모듈
