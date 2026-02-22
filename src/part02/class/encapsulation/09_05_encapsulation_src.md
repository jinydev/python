---
layout: default
title: "09.05 캡슐화(Encapsulation)"
---

# 09.05 캡슐화(Encapsulation)

클래스를 정의할 때 내부의 속성과 메서드를 묶어서 하나의 단위로 처리할 수 있다. 이렇 게 하나의 단위로 묶어서 클래스를 만드는 것을 캡슐화했다고 한다.

파이썬에서는 속성과 메서드가 전부 외부에 공개되므로 속성을 감출 수 있는 방안은 없다. 이런 속성을 감추는 것은 정보 은닉이라고 한다. 다양한 방법을 제시해서 최대한 정 보 은닉을 처리하도록 한다.

## 9.5.1 내부 속성이나 메서드 명명 규칙 관행

클래스의 네임스페이스는 키인 이름과 값으로 구성되므로 속성이나 메서드들이 전부 이름 으로 관리된다. 속성과 메서드가 동일한 이름을 가지면 이슈가 발생할 수도 있지만 동일 한 규칙으로 이름을 가지면 실제 최종 값으로 대치되어 처리되는 것을 알 수 있다. 이름을 처리하는 규칙에 대해서도 잘 알아야 이름으로 속성에 접근할 때 발생하는 오류를 제대로 처리할 수 있다.

## 9.5.2 보호된 이름 : _이름

클래스 내부에 _가 있는 속성이나 메서드는 관행적으로 private으로 약속해서 처리한다.

이는 외부에서 보호된 이름으로 사용되기에 호출해서 사용하면 안된다.

✚ 메서드로 보호 속성 감추기

_속성명은 관행상 접근을 보호해야 하므로 별도의 메서드를 구현해서 작성한다. 프로그램 작성 시 이 속성에 직접 접근하지 않고 메서드를 이용해서 실행하도록 한다.

예제 9-35 : 보호된 이름 사용

Protected 클래스를 정의할 때 보호된 이름으로 _set 메서드를 정의했다. 이 메서드를 _ _ init_ _ 메서드 내에서 호출해 인스턴스가 생성될 때에도 보호된 속성으로 _name, _age 속성을 추가하도록 만들었다.

보호된 속성에 직접 접근하지 않도록 getname, getage 메서드를 정의해서 호출하도록 구성했다.

```python
In : class Protected :
def __init__(self,name,age) :
self._set(name,age)
def _set(self,name,age) :
self._name = name
self._age = age
def getname(self) :
return self._name
def getage(self) :
return self._age
```

하나의 인스턴스를 생성하고 그 인스턴스 네임스페이스를 조회했다. 내부에 보호된 속성 이 만들어져 있는 것을 알 수 있다.

```python
In : p = Protected("정찬혁", 31)
print(p.__dict__)
Out: {'_name': '정찬혁', '_age': 31}
```

인스턴스의 메서드를 호출해서 출력하면 인스턴스의 보호된 속성을 조회해서 출력한다.

```python
In : print(p.getname())
print(p.getage())
Out: 정찬혁
```

하지만 다 공개되었기에 이 속성이 이름을 알면 바로 접근해서 조회가 가능하다.

```python
In : print(p._name)
print(p._age)
Out: 정찬혁
```

## 9.5.3 mangling을 이용한 정보 은닉

파이썬 명명 규칙 중 이름 앞에 두 개의 언더스코어를 작성해서 처리한다. 이를 표기법으 로 사용하면 _ _ + 이름으로 처리한다.

이런 이름을 사용하면 내부적으로 _클래스_ _이름으로 처리되도록 구성된다. 이런 처리 방식을 맹글링(mangling)이라고 한다.

클래스 외부에서는 직접 _ _+이름으로는 호출해도 검색이 불가능하지만 내부 클래스나 인 스턴스에서는 _ _+이름으로 처리한다.

예제 9-36 : 속성이나 메서드에 대한 맹글링 처리

Mangling 클래스를 정의할 때 인스턴스 속성(_ _name, _ _age), 인스턴스 메서드(_ _set)를 맹글링 처리하도록 정의했다.

이 클래스 내의 메서드에서는 속성을 전부 _ _+이름으로 호출해서 사용할 수 있다.

```python
In : class Mangling :
def __init__(self,name,age) :
self.__set(name,age)
def __set(self,name,age) :
self.__name = name
self.__age = age
def getname(self) :
return self.__name
def getage(self) :
return self.__age
```

인스턴스를 하나 생성해서 인스턴스 내의 네임스페이스를 확인해보면 인스턴스 속성이 맹 글링되어 처리된 것을 볼 수 있다.

인스턴스 메서드로 호출해도 내부의 인스턴스 속성을 검색해서 처리한다.

```python
In : p = Mangling("정찬혁", 31)
print(p.__dict__)
Out: {'_Mangling__name': '정찬혁', '_Mangling__age': 31}
In : print(p.getname())
print(p.getage())
Out: 정찬혁
```

하지만 인스턴스를 가지고 점 연산자로 직접 _ _name과 _ _age 속성에 접근하며 예외가 발생한다. 외부에서 조회할 때는 속성 등의 이름 변경 시 이런 속성이 없다는 것이다.

```python
In : print(p.__name)
print(p.__age)
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-126-39890ff3efd6> in <module>()
----> 1 print(p.__name)
2 print(p.__age)
AttributeError: 'Mangling' object has no attribute '__name'
```

맹글링 처리된 이름을 외부에서 전체 이름을 주고 조회하면 결과가 출력되는 것을 확인할 수 있다.

```python
In : print(p._Mangling__name)
print(p._Mangling__age)
Out: 정찬혁
```

클래스의 네임스페이스를 조회하면 _ _set 메서드도 맹글링 처리가 된 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(Mangling.__dict__)
Out: mappingproxy({'_Mangling__set': <function Mangling.__set at
0x000000000501E1E0>,
'__dict__': <attribute '__dict__' of 'Mangling' objects>,
'__doc__': None,
'__init__': <function Mangling.__init__ at
0x000000000501E2F0>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Mangling'
objects>,
'getage': <function Mangling.getage at
0x000000000501E730>,
'getname': <function Mangling.getname at
0x000000000501E268>})
```

인스턴스 메서드도 맹글링되면 이름이 바뀌었기 때문에 맹글링된 이름이 호출되지 않으면 예외가 발생한다.

```python
In : p.__set("맹글링",55)
Out: ---------------------------------------------------------------------
AttributeError          Traceback (most recent call last)
<ipython-input-129-184d8e5290bb> in <module>()
```

----> 1 p.__set("맹글링",55) AttributeError: 'Mangling' object has no attribute '__set' 그렇지만 맹글린된 전체 이름으로 인스턴스 메서드를 호출하면 인스턴스 내부의 값이 변 경되는 것을 확인할 수 있다.

```python
In : p._Mangling__set("맹글링",55)
print(p._Mangling__name)
print(p._Mangling__age)
Out: 맹글링
```

## 9.5.4 property를 이용한 정보 은닉

정보 은닉을 처리해도 기본이 퍼블릭이므로 모든 것을 조회할 수가 있다. 그래서 메서드 를 가지고 이름으로 접근해서 사용할 수 있는 프로퍼티(property) 처리하는 방식으로 속성 을 숨기고 처리하는 정보 은닉도 추가되었다.

프로퍼티를 지정할 때도 주로 데코레이터를 사용한다. 메서드 바로 위에 @property를 지 정하면 함수명으로 하나의 인스턴스를 만들고 그 내부의 getter 메서드에 등록된다. 갱신 이 필요한 메서드에는 @함수명.setter로 처리해야 한다. 하지만 내부의 속성 이름을 알고 있다면 메서드 대신 속성에 직접 접근해서도 조회나 갱신이 가능하다.

예제 9-37 : 프로퍼티로 속성을 숨기기

PropertyClass 클래스를 정의할 때 인스턴스의 속성 이름을 보호된 속성으로 정의하고 호출되는 메서드의 이름을 속성 이름으로 처리한다.

이 클래스에 name으로 조회 및 갱신을 하려면 두 개의 메서드가 필요하다. 메서드의 이 름은 동일하지만 하나는 조회를 하는 것이고 또 다른 하나는 속성을 갱신하는 것이다. 첫 번째 조회하는 메서드 위에 @property를 지정하면 내부적으로 name이라는 인스턴스가 만들어지고 그 내부에 이 메서드가 getter로 등록된다.

두 번째 메서드는 name 인스턴스에 점 연산자를 이용해서 setter로 프로퍼티를 만들면 동일한 메서드가 등록된다.

```python
In : class PropertyClass :
def __init__(self,name) :
self._name = name
@property
def name(self) :
return self._name
@name.setter
def name(self,value) :
self._name = value
```

정의가 끝나고 이를 로딩하면 이 클래스가 객체로 전환된다. 이 클래스 내부의 네임스페 이스를 조회하면 name 속성이 property 인스턴스라는 것과, 클래스 내부에 정의된 메서 드들이 name이라는 property 인스턴스 내부에 들어가 있는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(PropertyClass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'PropertyClass'
objects>,
'__doc__': None,
'__init__': <function PropertyClass.__init__ at
0x0000000005230EA0>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'PropertyClass'
objects>,
'name': <property object at 0x0000000005245818>})
```

하나의 인스턴스를 만들고 name으로 조회하면 인스턴스를 생성할 때 넣은 값이 출력 된다.

```python
In : p = PropertyClass("은옥주")
print(p.name)
Out: 은옥주
```

Name에 다른 값을 할당한 후에 다시 조회하면 변경된 것을 확인할 수 있다.

```python
In : p.name = "금옥주"
print(p.name)
Out: 금옥주
```

인스턴스의 네임스페이스를 조회하면 사용하는 name이 아닌 _name 속성을 가지고 있다. 직접 인스턴스 내의 속성을 가지고 조회해서 결과를 확인할 수 있다. _name의 내부 값을 변경한 후에 프로퍼티 name으로 조회해도 변경된 내용이 조회된다.

```python
In : print(p.__dict__)
print(p._name)
```

p._name = "동옥주" print(p.name)

```python
Out: {'_name': '금옥주'}
금옥주
동옥주
```
