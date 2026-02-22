---
layout: default
title: "15.01 프로퍼티(property)"
---

# 15.01 프로퍼티(property)

파이썬 내의 모든 네임스페이스는 이름으로 조회하고 그 값에 있는 클래스나 인스턴스의 레퍼런스를 가져와서 처리한다.

프로퍼티는 하나의 인스턴스를 만들어서 속성에 접근할 메서드를 getter, setter, deleter 내부 메서드에 등록하고 이름으로 접근하면 메서드를 실행해서 인스턴스의 속성에 있는 값을 조회하거나 갱신한다.

인스턴스에 있는 속성과 프로퍼티 인스턴스로 만드는 이름이 동일할 경우 처리가 되지 않 으므로 인스턴스 속성의 이름 앞에 언더스코어( _ )를 하나 넣어서 처리하도록 한다.

프로퍼티를 데코레이터로 메서드 앞에 표시하면 이 클래스를 로딩할 때 내부에 프로퍼티 인스턴스가 자동으로 만들어진다. 이런 메커니즘을 이용해서 프로퍼티가 처리되는 것을 알아보겠다.

## 15.1.1 프로퍼티 작동 기본 원리 이해하기

프로퍼티로 만들어진 인스턴스는 클래스 속성으로 간다. 프로퍼티는 하나의 클래스이므 로 이 프로퍼티가 작동하면 인스턴스를 만들고 그 내부에 메서드를 등록한다. 이 메서드 가 이 프로퍼티의 인스턴스를 호출하면 내부적으로 조회, 갱신, 삭제 메서드를 호출해서 처리한다.

그럼 간단하게 함수를 인스턴스 속성에 저장해서 처리하는 방법과 디스크립터 내의 메서 드를 지정해서 처리하는 방법부터 알아보자.

✚ 함수와 클래스 위임에 대한 기본 알아보기

인스턴스를 생성할 때 함수를 저장한 후에 이 함수를 호출하고 내부 속성을 조회해서 처리 하는 것부터 이해하자.

예제 15-1 : 함수를 속성으로 등록해서 처리

함수를 정의할 때 매개변수로 self를 받고 결과값으로 이 self 내의 속성 _name을 반환하 도록 정의한다.

```python
In : def name(self) :
return self._name
```

Person 클래스를 정의할 때 초기화 매개변수로 속성인 name과 함수인 func을 받아서 등 록한다.

함수를 등록할 때 속성 이름을 _name으로 처리한 이유는 함수의 이름과 속성 이름이 동 일하면 정의하는 순서에 따라 name에 할당되므로 정의한 것이 사라질 수 있기 때문이다.

```python
In : class Person :
def __init__(self,name,func) :
self.name = func
self._name = name
```

Person 생성자로 인스턴스를 만들고 변수 a에 할당했다. 이 인스턴스 내부의 네임스페이 스를 확인하면 name에는 함수가 들어가 있고 _name에는 값이 들어간다.

```python
In : a = Person("프로퍼티",name)
print(a.__dict__)
Out: {'name': <function name at 0x10e63f950>, '_name': '프로퍼티'}
```

인스턴스에서 함수를 조회하고 함수의 첫 번째 인자에 자기 자신을 넣어서 속성을 확인 했다. 함수가 인스턴스 내부에 등록되어 메서드를 호출하는 것과 유사하다는 것을 알 수 있다.

```python
In : a.name(a)
Out: '프로퍼티'
```

✚ 클래스 위임에 대한 기본 알아보기

디스크립터를 만들어서 클래스 속성에 디스크립터로 인스턴스를 만든다. 다른 클래스의 인스턴스에 위임을 줘서 처리하는 방식을 알아보자.

예제 15-2 디스크립터를 간단히 정의해서 처리하기

이번에는 특정 클래스를 정의하고 이 클래스로 다른 클래스의 인스턴스를 호출해서 내부 의 속성을 읽도록 정의했다.

아직 배우지 않았지만 먼저 디스크립터를 사용해서 처리하는 방식만 간단히 알아보겠다.

_ _get_ _ 스페셜 메서드를 정의했다는 것은 이 디스크립터 인스턴스가 만들어지면 이름으 로 접근할 때 이 _ _get_ _ 메서드가 작동되고 인자로 전달된 인스턴스 내에 접근해서 특정 속성을 가져올 수 있다는 것을 말한다.

이 _ _get_ _메서드 로직을 보면 전달된 인스턴스에 접근해서 _name 속성을 검색하는 것 을 알 수 있다.

```python
In : class Name :
def __get__(self,other,owner=None) :
return getattr(other,"_name")
```

인스턴스를 만들어서 사용할 Person 클래스를 정의할 때 명확히 디스크립터의 인스턴스 를 Person 클래스의 속성으로 등록했다. 인스턴스가 가지는 속성은 언더스코어를 붙여서 클래스 속성과 구별되도록 했다.

```python
In : class Person :
def __init__(self,name) :
Person.name = Name()
self._name = name
```

이제 이것을 가지고 하나의 인스턴스를 만들어서 이름으로 속성에 접근하면 _ _get_ _ 메 서드가 실행되어 인스턴스에 저장된 값을 가져오는 것을 알 수 있다.

이름으로 접근하면 Person에 가서 name을 확인하고 이 인스턴스 내에 _ _get_ _이 자동 으로 호출해 그 내부 로직이 접근되면 현재 Person 클래스로 생성된 인스턴스가 있는 곳 을 찾아 _name을 조회하고 그 내부의 값을 출력한다.

```python
In : b = Person("프로퍼티")
print(b.name)
Out: 프로퍼티
```

✚ 프로퍼티 작동 원리 기초 이해하기

프로퍼티는 메서드를 받아서 하나의 프로퍼티 인스턴스에 메서드들을 등록한 뒤 이름으 로 접근할 경우 등록된 메서드를 실행하기 위한 하나의 패턴이다.

파이썬에서는 동일한 이름으로만 네임스페이스에 등록이 가능하므로 동일한 이름으로 여 러 개의 메서드를 직접 정의해서 사용할 수 없다. 그래서 동일한 이름으로 처리하기 위해 서는 별도의 인스턴스를 만들고 메서드들을 내부에 등록해서 관리할 수 있도록 구성해야 한다.

프로퍼티는 하나의 클래스이고 조회, 갱신, 삭제 등의 메서드를 내부에 등록해서 사용할 수 있는 구조를 만드는 것이다. 일단 특정 메서드를 호출해서 기존에 정해진 결과를 조회 하는 방식부터 이해해보자.

예제 15-3 : 클래스 데코레이터로 메서드 감싸기

메서드를 받아서 저장하고 이름으로 검색할 클래스 cached_property를 정의한다. 내부 에 특정 함수를 받아서 저장하고 이름으로 검색할 경우 내부적으로 저장된 함수를 호출해 서 실행하는 _ _get_ _ 메서드를 정의한다.

```python
In : class Cached_property :
def __init__(self, func) :
self._func = func
def __get__(self,obj,Base=None) :
if obj is None :
return self
value = self._func(obj)
return value
```

사용할 Foo 클래스를 정의할 때 인스턴스 내에 저장할 속성의 이름은 _name으로 지정 했다. 그리고 이 _name을 인스턴스에 저장하고 이를 읽을 name 메서드를 정의했다.

이 메서드를 클래스 데코레이터를 이용해서 클래스에 저장했다.

```python
In : class Foo :
def __init__(self,name) :
self._name = name
@Cached_property
def name(self) :
return self._name
```

Foo 클래스의 네임스페이스는 데코레이터가 실행된 메서드를 어떻게 처리했는지 궁금할 것이다. 이제 확인을 해보니 Foo 클래스 네임스페이스에 name이라는 속성이 만들어지고 이 name 속성에 들어간 객체가 Cached_property 인스턴스라는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Foo.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Foo' objects>,
'__doc__': None,
'__init__': <function Foo.__init__ at 0x10e65dae8>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Foo' objects>,
'name': <__main__.Cached_property object at 0x10e66e4e0>})
```

Foo 클래스를 이용해서 하나의 인스턴스를 만든다. 인스턴스 f의 네임스페이스를 확인하 면 내부에 _name 속성이 있는 것을 알 수 있다.

이 인스턴스로 클래스 속성인 name에 접근하면 이 인스턴스의 _name 속성을 확인해서 출력한다.

```python
In : f = Foo("이름을 읽는다")
print(f.__dict__)
print(f.name)
Out: {'_name': '이름을 읽는다'}
이름을 읽는다
```

## 15.1.2 프로퍼티 이해하기

이제 프로퍼티가 처리하는 방식을 알아봤다. property 클래스를 이용하여 데코레이터로 메서드를 등록해서 사용하는 방법을 알아보자. 일단 프로퍼티 내부의 구성을 알아보고 예제를 가지고 이렇게 구성되었는지를 확인해 본다.

✚ 프로퍼티 구성 알아보기

● 내장 클래스로서 메서드를 관리하는 인스턴스를 생성하고 초기화 매개변수로 3개

의 메서드를 받아 인스턴스의 속성으로 fget, fset, fdel한다.

● 인스턴스 내에 메서드들을 저장하므로 이름으로 접근할 때 조회, 갱신, 삭제 등을

사용할 수 있도록 내부적으로 메서드가 호출되어 처리된다.

● 반드시 property로 데코레이터를 처리하며 getter 메서드에 등록되고 나머지

setter와 deleter는 인스턴스를 통해 지정해야 한다.

● 프로퍼티도 실제는 디스크립터이다. 호출되면 _ _get_ _, _ _set_ _, _ _delete_ _

가 호출되어 저장된 메서드들을 호출해서 처리한다.

● 프로퍼티로 생성되는 인스턴스는 클래스의 속성으로 보관되므로 동일한 이름으

로 인스턴스에 존재하면 프로퍼티가 작동하지 않는다.

예제 15-4 : 프로퍼티 클래스 이해하기

프로퍼티 property가 클래스인지를 확인한다. 클래스는 메타 클래스에 의해 만들어진 것 을 알 수 있다.

```python
In : print(property)
print(type(property))
Out: <class 'property'>
<class 'type'>
```

Person 클래스를 정의하고 인스턴스를 초기화할 속성으로 name과 age를 지정했다.

이 두 개의 속성에 접근하고 갱신할 것을 전부 프로퍼티로 지정해서 정의했다. 값을 반환 할 때 사용할 메서드는 property 데코레이터로 처리한다. 값을 변경할 때 사용할 메서드 는 메서드명.setter 데코레이터로 정의한다.

```python
In : class Person :
def __init__(self,name,age) :
self._name = name
self._age = age
@property
def name(self) :
return self._name
@name.setter
def name(self,value) :
self._name = value
@property
def age(self) :
return self._age
@age.setter
def age(self,value) :
self._age = value
```

Perosn 클래스 내부에 클래스 속성으로 name, age가 property 인스턴스로 만들어진 것 을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(Person.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Person' objects>,
'__doc__': None,
'__init__': <function Person.__init__ at 0x10e65dd90>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Person'
objects>,
'age': <property object at 0x10e669a48>,
'name': <property object at 0x10e6699f8>})
```

인스턴스를 만들어서 그 인스턴스 내부의 속성을 확인해보면 _name, _age가 들어가 있 는 것을 확인할 수 있다.

```python
In : p = Person("연개소문",30)
print(p.__dict__)
Out: {'_name': '연개소문', '_age': 30}
```

이어서 p.name과 p.age를 가지고 변경하면 Person 클래스 내부의 name, age 속성을 검색하고 내부의 갱신 메서드를 실행해서 p 인스턴스 내부의 _name과 _age 속성을 변경 한다.

```python
In : p.name = "프로퍼티로 속성을 바꾸다"
p.age = 55
In : print(p.__dict__)
Out: {'_name': '프로퍼티로 속성을 바꾸다', '_age': 55}
```

Person 클래스에서 프로퍼티(property)로 생성된 name 인스턴스 속성이 3개 즉, fget, fset, fdel를 확인한다.

```python
In : print(Person.name.fget)
print(Person.name.fset)
print(Person.name.fdel)
Out: <function Person.name at 0x10e65de18>
<function Person.name at 0x10e65dea0>
None
```

두 번째는 함수명.setter로 처리하는 이유는 프로퍼티 내부에 3가지 메서드인 getter/ setter/deleter를 메서드 데코레이터를 이용해서 처리하려는 것이다.

```python
In : print(Person.name.getter)
print(Person.name.setter)
print(Person.name.deleter)
Out: <built-in method getter of property object at 0x10e6699f8>
<built-in method setter of property object at 0x10e6699f8>
<built-in method deleter of property object at 0x10e6699f8>
```

이름으로 접근하도록 지원하는 디스크립터 메서드 _ _get_ _, _ _set_ _, _ _delete_ _가 만 들어져 있다는 것을 확인할 수 있다.

```python
In : print(Person.name.__get__)
print(Person.name.__set__)
print(Person.name.__delete__)
Out: <method-wrapper '__get__' of property object at 0x10e6699f8>
<method-wrapper '__set__' of property object at 0x10e6699f8>
<method-wrapper '__delete__' of property object at 0x10e6699f8>
```

## 15.1.3 프로퍼티의 다양한 처리 예시

프로퍼티를 이용해서 인스턴스의 속성을 읽고 갱신하는 것을 확인했다. 이번에는 다른 방 식으로 사용하는 방법을 알아보겠다.

✚ 프로퍼티로 직접 인스턴스를 만들어서 사용하기

이번에는 프로퍼티가 클래스이므로 인스턴스를 직접 만들어서 사용도 가능하다.

프로퍼티 인스턴스를 만들어 이 인스턴스의 메서드를 이용해서 메서드 데코레이더로 메서 드를 등록하여 사용해보겠다.

예제 15-5 : 프로퍼티 인스턴스를 생성 후에 getter 메서드 할당

Rectangle 클래스를 정의할 때 초기화 메서드에는 height, width 두 개의 매개변수를 정 의했다. Property 클래스의 인스턴스를 area 변수에 할당했다.

Rectangle 클래스 내부에 생성된 area 속성은 이 클래스의 속성으로 만들어지고 property 클래스 생성자로 만든 인스턴스가 할당된다.

메서드 area는 높이와 면적을 곱해서 사각형의 면적을 구하도록 정의했다. 프로퍼티로 만 든 인스턴스의 getter 메서드에 데코레이터를 이용해서 메서드 area를 저장했다.

```python
In : class Rectangle :
def __init__(self, height, width) :
self.height = height
self.width = width
area = property()
@area.getter
def area(self) :
return self.height * self.width
```

클래스 네임스페이스에 area 속성이 들어가 있다. 프로퍼티를 생성자로 이용해서 인스턴 스를 만들고 난 다음에 getter 메서드를 데코레이터로 처리해도 동일한 결과가 나오는 것 을 알 수 있다.

```python
In : import pprint
r = Rectangle(10,10)
print(r)
pprint.pprint(Rectangle.__dict__)
Out: <__main__.Rectangle object at 0x11150d860>
mappingproxy({'__dict__': <attribute '__dict__' of 'Rectangle'
objects>,
'__doc__': None,
'__init__': <function Rectangle.__init__ at 0x1115190d0>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Rectangle'
objects>,
'area': <property object at 0x111517318>})
```

인스턴스로 r을 만들고 area 속성에 접근하면 등록된 area 메서드가 호출되어 실행된다.

면적이 계산되어 출력되는 것을 볼 수 있다.

```python
In : print(r.area)
Out: 100
```

Rectangle_ 클래스를 정의하고 area 메서드를 직접 @property 데코레이터로 처리했다.

위의 예제와 동일한 처리인 것을 확인할 수 있다.

```python
In : class Rectangle_ :
def __init__(self, height, width) :
self.height = height
self.width = width
@property
def area(self) :
return self.height * self.width
r_ = Rectangle_(20,20)
print(r_.area)
Out: 400
```

✚ 계산 및 계산에 필요한 값을 모두 프로퍼티로 처리하기

프로퍼티(property)로 계산된 값을 조회해서 처리도 가능하지만 계산된 값을 변경하는 것 도 프로퍼티로 처리가 가능하다. 속성과 동일한 이름은 아니지만 계산을 위한 처리를 위 해 이 방식을 사용할 수도 있다.

예제 15-6 : 계산 처리 메서드를 데코레이터로 등록(getter/setter)

사용자 클래스 Area 내에 get_area라는 메서드를 프로퍼티로 지정했다. 이 메서드는 인 스턴스 속성을 조회하는 것이 아닌 계산된 결과값을 처리한다.

setter에 등록되는 메서드도 get_area가 지정하고 인자는 튜플을 지정해서 처리하도록 한다.

```python
In : class Area :
def __init__(self, x,y) :
self.x = x
self.y = y
@property
def get_area(self) :
return self.x * self.y
@get_area.setter
def get_area(self, args) :
self.x = args[0]
self.y = args[1]
```

인스턴스를 만들어서 프로퍼티에 등록된 이름으로 호출하면 면적을 계산한 결과가 나 온다. 인스턴스 네임스페이스의 값을 확인하면 생성자를 호출할 때 넣은 인자 값이 들어 가 있는 것을 알 수 있다.

```python
In : ar = Area(5,5)
In : print(ar.get_area)
print(ar.__dict__)
Out: 25
{'x': 5, 'y': 5}
```

get_area 이름으로 10,10을 할당했다. 두 개의 값을 넣은 것 같지만 튜플을 구분할 때 숫 자 사이의 쉼표로 구분하므로 하나의 인자로 전달된 것을 알 수 있다.

인스턴스의 네임스페이스를 확인하면 내부 로직에 따라 두 개의 속성에 나눠서 들어가 있 는 것을 확인할 수 있다. 다시 get_area로 조회하면 바뀐 값에 따라 계산된 결과가 변경되 어 출력되는 것을 알 수 있다.

```python
In : ar.get_area = 10,10
print(ar.__dict__)
Out: {'x': 10, 'y': 10}
In : print(ar.get_area)
Out: 100
```

예제 15-7 : 프로퍼티 deleter 등록하기

계산하는 메서드를 프로퍼티로 만들었고 이 메서드를 가지고 인스턴스 속성 변경도 했다.

이번에는 속성을 삭제하는 메서드 get_area를 정의하고 deleter에 등록한다.

```python
In : class Area :
def __init__(self, x,y) :
self.x = x
self.y = y
@property
def get_area(self) :
return self.x * self.y
@get_area.setter
def get_area(self, txy) :
self.x = txy[0]
self.y = txy[1]
@get_area.deleter
def get_area(self) :
del self.x
del self.y
```

Area 클래스의 인스턴스를 만들고 면적을 계산하면 계산된 결과를 확인할 수 있다. 등록 된 메서드를 del로 삭제하면 deleler에 등록된 get_area 메서드가 실행되어 두 개의 속성 을 삭제한다. 인스턴스 네임스페이스를 조회하면 속성이 전부 삭제된 것을 알 수 있다.

```python
In : ar = Area(15,15)
print(ar.get_area)
print(ar.__dict__)
Out: 225
{'x': 15, 'y': 15}
In : del ar.get_area
print(ar.__dict__)
Out: {}
```

다시 인스턴스에 get_area = 10,10으로 속성을 추가하면 인스턴스에 속성이 추가되고 get_area로 조회하면 면적의 값이 계산되어 반환하는 것을 알 수 있다.

```python
In : ar.get_area = 10,10
print(ar.__dict__)
print(ar.get_area)
Out: {'x': 10, 'y': 10}
```
