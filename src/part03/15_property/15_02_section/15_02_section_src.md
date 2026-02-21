---
layout: default
title: "15.02 사용자"
---

# 15.02 사용자

앞에서는 파이썬에서 제공하는 프로퍼티 클래스를 이용하는 방법을 알아봤다. 파이썬 클 래스에서 인스턴스를 만들면서 메서드나 함수를 저장하고 이를 이름으로 호출해서 파이썬 으로만 처리하는 방법을 자세히 알아보겠다.

(Property 클래스에 대한 정보 : https://docs.python.org/2/howto/descriptor.html#properties)

## 15.2.1 사용자 정의 Property 클래스 초기화 이해하기

사용자 정의 Property 클래스를 정의할 때 초기화 메서드로 어떤 부분을 저장할지를 먼저 알아보겠다.

예제 15-8 : 프로퍼티 클래스 초기화 메서드 알아보기

Property 클래스는 메서드를 등록해서 처리하므로 초기화 _ _init_ _ 메서드도 정의하는 클래스의 메서드들을 받아 저장하는 구조를 만들어야 한다. 기본으로 동일한 이름의 3개 메서드를 받아야 기본 3개의 매개변수를 정의한다. 초기화 메서드에 3개의 메서드를 저장 하도록 만든다.

```python
In : class Property :
def __init__(self, fget=None, fset=None, fdel=None, doc=None) :
self.fget = fget
self.fset = fset
self.fdel = fdel
if doc is None and fget is not None:
doc = fget.__doc__
self.__doc__ = doc
```

두 번째는 Propery 클래스 내에서 인스턴스의 이름으로 접근할 때 조회, 갱신, 삭제 처리 가 가능한 디스크립터 프로토콜 인터페이스 메서드에 대한 재정의를 한다.

이 스페셜 메서드 _ _get_ _, _ _set_ _, _ _delete_ _은 사용자 클래스의 인스턴스를 인자 로 전달받아 내부에 저장된 메서드를 호출해서 인스턴스 내에 있는 속성을 처리한다.

```python
In :   def __get__(self, obj, objtype=None):
if obj is None:
return self
if self.fget is None:
raise AttributeError("unreadable attribute")
return self.fget(obj)
def __set__(self, obj, value):
if self.fset is None:
raise AttributeError("can't set attribute")
self.fset(obj, value)
def __delete__(self, obj):
if self.fdel is None:
raise AttributeError("can't delete attribute")
self.fdel(obj)
```

데코레이터를 이용해서 메서드를 등록하려면 이 메서드들에 대한 정보를 가지고 인스턴스 를 만들어야 한다.

3가지 메서드 getter, setter, deleter는 데코레이터를 처리해서 메서드를 등록하면 새로 운 인스턴스를 만들어서 클래스 속성에 인스턴스를 처리하는 것을 알 수 있다.

```python
In :  def getter(self, fget):
print(" getter call")
return type(self)(fget, self.fset, self.fdel, self.__doc__)
def setter(self, fset):
return type(self)(self.fget, fset, self.fdel, self.__doc__)
def deleter(self, fdel):
return type(self)(self.fget, self.fset, fdel, self.__doc__)
```

## 15.2.2 Property 클래스로 프로퍼티 처리하기

이제 사용자 정의 클래스인 Property를 이용해서 프로터피 처리를 해보겠다. 동일한 결과 가 나오는지를 알아보자.

예제 15-9 : 클래스를 정의하고 프로퍼티 처리

사용자 User_Klass 클래스를 정의할 때 _name 속성만 가지도록 작성했다.

메서드 이름은 name이고 이를 데코레이터를 이용해서 메서드로 등록했다. 갱신할 메서 드는 name.setter로 등록했다.

```python
In : class User_Klass :
def __init__(self,name) :
self._name = name
@Property
def name(self) :
return self._name
@name.setter
def name(self, value) :
self._name = value
```

User_Klass 클래스의 네임스페이스를 확인하면 name 속성이 등록된 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(User_Klass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'User_Klass'
objects>,
'__doc__': None,
'__init__': <function User_Klass.__init__ at
0x0000000004E13F28>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'User_Klass'
objects>,
'name': <__main__.Property object at 0x0000000004E35F98>})
```

인스턴스를 만들었다. 이 인스턴스가 User_Klass에 의해 생성된 인스턴스라는 것을 알 수 있다. 그리고 클래스 내에 name 속성을 확인하면 사용자 정의 Property라는 것을 알 수 있다.

인스턴스로 name에 접근하면 내부에 저장된 값을 조회한다. 인스턴스 name 속성에 값 을 할당하면 값이 변경된 것을 알 수 있다.

```python
In : u = User_Klass("프로퍼티 처리")
print(u)
print(User_Klass.name)
print(u.name)
```

u1.name = " setter로 변경" print(u1.name)

```python
Out: <__main__.User_Klass object at 0x0000000004E232B0>
<__main__.Property object at 0x0000000004E35F98>
프로퍼티 처리
setter로 변경
```

두 번째는 Property 클래스로 name이라는 변수에 인스턴스를 생성한 후에 name 인스턴 스 내의 getter 메서드를 이용해서 데코레이터 @name.getter를 통해 name 메서드를 등 록했고 변경은 name.setter로 등록했다.

```python
In : class User_Klass1 :
def __init__(self,name) :
self._name = name
name = Property()
@name.getter
def name(self) :
return self._name
@name.setter
def name(self, value) :
self._name = value
Out: getter call
```

User_Klass1 클래스 내의 네임스페이스를 확인하면 name 속성이 있는 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(User_Klass1.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'User_Klass1'
objects>,
'__doc__': None,
'__init__': <function User_Klass1.__init__ at
0x0000000004E51378>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'User_Klass1'
objects>,
'name': <__main__.Property object at 0x0000000004E24780>})
```

메서드로 등록을 했기에 getter 메서드 내부의 print문이 실행되어 출력되는 것을 볼 수 있다. 조회나 갱신이 메서드 이름으로 처리되는 것을 확인할 수 있다.

```python
In : u1 = User_Klass1(" getter를 사용")
print(u1)
print(User_Klass1.name)
print(u1.name)
```

u1.name = " setter로 변경" print(u1.name)

```python
Out: <__main__.User_Klass1 object at 0x0000000004E23320>
<__main__.Property object at 0x0000000004E24780>
getter를 사용
setter로 변경
```
