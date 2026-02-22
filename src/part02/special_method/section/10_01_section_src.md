---
layout: default
title: "10.01 연산자"
---

# 10.01 연산자

특정 연산자나 대부분의 키워드는 실제로는 내부적으로 메서드를 호출해서 처리한다. 내 장 클래스나 사용자 정의 클래스의 내부 속성과 메서드를 확인해보면 [_ _이름_ _]을 가진 부분이 기본으로 제공되어 있다.

스페셜 메서드를 알아보면서 연산자들이 실행 시에 각 클래스 내부의 메서드를 호출해서 처리한다. 연산자나 키워드별로 어떤 메서드가 호출되어 처리되는지를 확인해보자.

## 10.1.1 점(.) 연산 : 객체 속성 확인하기

클래스나 인스턴스를 전부 객체로 인식하기에 객체 내의 속성과 메서드에 접근해서 조회 한 후 속성은 내부의 값을 가져오고 메서드는 이를 가져온 후에 실행 연산자와 인자를 전 달해서 실행할 수도 있다.

일단 내부에 있는 속성에 접근하는 점 연산자가 어떤 스페셜 메서드와 매핑되어 처리되는 지 알아보자.

✚ 속성/메서드 조회: _ _getattribute_ _ /_ _getattr_ _

파이썬에서는 속성을 조회하는 스페셜 메서드인 _ _getattribute_ _와 _ _getattr_ _ 를 제 공한다. 일반적인 네임스페이스는 전부 _ _getattribute_ _로 처리된다. 그러나 속성이 발 견될 경우에는 추가적인 검색을 처리하는 _ _getattr_ _ 메서드가 실행된다.

예제를 가지고 두 스페셜 메서드(special method)의 작동 원리를 이해해보자.

예제 10-1 : 내부 속성 접근 순서 확인하기

Dot 클래스를 정의하고 인스턴스 네임스페이스 접근을 위한 점 연산인 _ _getattribute_ _ 메서드를 연산자 오버로딩한다.

_ _getattribute_ _ 메서드를 재정의할 때 주의할 부분은 자기 순환인 재귀 호출이 발생하 지 않도록 상위 클래스를 이용해서 현재 인스턴스의 속성을 참조해야 한다.

자기 순환 참조를 없애기 위해 최상위 클래스 object 내의 _ _getattribute_ _를 이용해 이 클래스의 인스턴스를 인자로 전달하고 네임스페이스에 접근해서 속성을 찾는 구조로 만 든다.

```python
In : class Dot :
def __init__(self) :
self.test = 1
self.test2 = 2
def __getattribute__(self, attr) :
print(" __getattribute__ ", attr)
return object.__getattribute__(self,attr)
```

Dot 생성자를 인자 없이 호출하면 인스턴스 속성인 test, test2 값이 할당되도록 처리 한다. 인스턴스가 만들어지고 나서 이 두 개의 속성을 점 연산자를 통해 호출하면 _ _ getattribute_ _ 메서드 내의 print 함수가 실행되어 출력되고 object._ _getattribute_ _ 메서드에 인자로 속성명이 전달되어 출력되는 것을 확인할 수 있다.

```python
In : d = Dot()
print(d.test)
print(d.test2)
Out: __getattribute__ test
__getattribute__ test2
```

이 인스턴스에 없는 속성에 접근했을 때는 _ _getattribute_ _ 메서드에서 어떤 처리를 하 는지도 알아보면 속성이 없으므로 예외가 발생한다.

```python
In : print(d.test3)
Out: __getattribute__
---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-8-dc6ca98608fc> in <module>()
----> 1 print(d.test3)
<ipython-input-5-0815dcde9d27> in __getattribute__(self, attr)
6  def __getattribute__(self, attr) :
7     print(" __getattribute__ ")
----> 8   return object.__getattribute__(self,attr)
AttributeError: 'Dot' object has no attribute 'test3'
```

위의 예시처럼 _ _getattribute_ _만 있을 때는 예외가 발생하므로 _ _getattr_ _ 메서드를 정의해서 예외가 발생할 경우에도 예외에 대한 정보를 반환하는 것으로 만든다.

```python
In : class Dot :
def __init__(self) :
self.test = 1
self.test2 = 2
def __getattribute__(self, attr) :
print(" __getattribute__ ", attr)
return object.__getattribute__(self,attr)
def __getattr__(self, attr) :
print(" __getattr__ ", attr)
try :
self.__dict__[attr]
except KeyError as e :
return "Key Error " + e.args[0]
```

Dot 클래스로 인스턴스를 만들어서 있는 속성을 호출하면 동일한 처리를 하는 것을 볼 수 있다.

```python
In : d = Dot()
print(d.test)
print(d.test2)
Out: __getattribute__ test
__getattribute__ test2
```

인스턴스에 없는 속성인 test3로 조회하면 _ _getattribute_ _를 호출해도 없으므로 _ _ getattr_ _가 호출되고 다시 호출한다. 이 메서드 내부에서 다시 점 연산을 통해 _ _dict_ _ 를 호출해도 그 내부에 없으므로 예외가 발생한다. 그것을 try except 문으로 처리해서 예 외가 발생해도 중단하지 않도록 처리했다.

조회한 결과값 대신에 예외가 발생한 내용을 반환 결과로 받아서 출력한 것을 알 수 있다.

```python
In : print(d.test3)
Out: __getattribute__ test3
__getattr__ test3
__getattribute__ __dict__
Key Error test3
```

예제 10-2 : 내부 속성 갱신과 삭제

Dot1 클래스 내에 속성을 추가하는 _ _setattr_ _과 속성을 삭제하는 _ _delattr_ _를 작성 한다.

_ _setattr_ _ 메서드 내부에서 점 연산자로 속성에 접근하면 다시 _ _gettattribte_ _를 통 해 재귀 호출이 발생할 수 있으므로 점 연산자를 사용하지만 이 인스턴스의 네임스페이스 에 접근해서 키를 넣고 값을 할당한다.

_ _delattr_ _도 동일하게 처리하고 del 키워드를 이용해서 삭제한다.

```python
In : class Dot1 :
def __init__(self) :
self.test = 1
self.test2 = 2
def __setattr__(self,attr,value) :
print(" set attr ",attr)
self.__dict__[attr] = value
def __delattr__(self,attr) :
print(" del attr ",attr)
del self.__dict__[attr]
```

이 클래스로 만들었을 때 없는 속성을 좌측에 표시하고 할당(=) 연산자를 이용하여 값 100 을 할당했다.

이 인스턴스 네임스페이스를 확인하면 속성 3개가 만들어진다.

_ _init_ _ 메서드 내에 2개의 할당과 인스턴스를 생성한 후 런타임에 속성 1을 추가해서 _ _setattr_ _ 메서드 내의 print문이 3번 출력된 것을 알 수 있다.

```python
In : d = Dot1()
d.test3 = 100
print(d.__dict__)
Out: set attr test
set attr test2
set attr test3
{'test': 1, 'test2': 2, 'test3': 100}
```

방금 생성한 test3 속성을 del로 삭제하면 _ _delattr_ _ 내에 print문이 한 번 출력되고 이 인스턴스를 조회하면 속성이 2개만 출력된다.

```python
In : del d.test3
print(d.__dict__)
Out: del attr test3
{'test': 1, 'test2': 2}
```

## 10.1.2 in, is 키워드

많은 원소를 가지는 자료형에는 문자열, 리스트 등의 Sequence 자료형, 딕셔너리, 집합 등도 여러 원소를 가지므로 이런 형태의 자료형을 컬렉션 또는 컨테이너 자료형(container) 이라고 한다.

이 내부에서 원소인지 확인하는 것이 in 연산자이다. 또한 연산자들이 동일한 레퍼런스를 가지는지 알아보는 is 키워드도 확인해보자.

예제 10-3 : in 연산자 : 객체 내의 원소 포함 여부를 확인

In 연산자를 사용하면 스페셜 메서드(special method)인 _ _contains_ _가 실행된다.

Sequence 자료형(문자열, 리스트 등) 내의 원소로 있으면 반환값은 불리언 값이 된다.

오버로딩 연산자을 통해 사용자 클래스에 정의해도 실행이 되는지를 알아보자. IN 클래스를 정의할 때 초기화 메서드 내 인스턴스 속성에 다양한 원소를 가지도록 정의 한다.

스페셜 메서드를 재정의하면서 _ _contains_ _ 내부 로직이 이 인스턴스의 원소와 매핑되 면 True로 출력한다.

```python
In : class IN :
def __init__(self, elements) :
self.elements = elements
def __contains__(self,element) :
print(" __contains__")
result = False
for i in self.elements :
if element == i :
result = True
break
return result
```

문자열을 리터럴로 정의하고 이를 IN 클래스 생성자의 인자로 넣어 인스턴스를 하나 만들 었다. 이 인스턴스에 한글로 “원”이 원소에 해당하는지를 in 키워드를 이용해서 포함 관계 를 확인했다.

_ _contains_ _ 메서드 내의 print문으로 반환값이 출력되는 것을 알 수 있다.

```python
In : s = "원소를 찾기"
i = IN(s)
```

print("원" in i)

```python
Out: __contains__
True
```

예제 10-4 : 연산자 is

파이썬에서는 is를 제공하는 연산자에 대한 스페셜 메서드(special method)는 없으나 object._ _eq_ _일 경우 최상위 object 클래스는 인스턴스만을 생성하고 내부 속성을 만 들지 않는다.

is 연산자와 동일하게 처리되므로 이를 이용해서 처리하면 된다.

IS 클래스 내에 _ _eq_ _메서드를 정의하고 내부에 object._ _eq_ _를 이용해서 동일한 객 체인지를 확인하도록 구현했다.

```python
In : class IS :
def __eq__(self,element) :
print(" __eq__ ")
return object.__eq__(self,element)
```

인스턴스를 하나 만들고 is 키워드로 비교하면 True라고 처리된다. 이를 이 인스턴스에서 _ _eq_ _ 메서드로 실행해도 동등한 결과가 나오는 것을 알 수 있다.

== 연산자는 동등한 값을 비교하고 이와 매칭되는 스페셜 메서드가 _ _eq_ _이다. 현재는 아무런 값이 없으므로 레퍼런스만 비교하는 것을 알 수 있다.

```python
In : i = IS()
print(i is i)
print(i.__eq__(i))
print(i == i)
Out: True
__eq__
True
__eq__
True
```

## 10.1.3 인덱싱과 슬라이싱 검색 처리

인덱스와 슬라이싱의 연산자는 대괄호이다. Sequence나 mapping 자료형 내의 요소를 검색할 때 대괄호 연산을 이용해서 인덱싱 검색을 한다.

인덱싱을 조회나 삭제할 때는 하나의 인자만 전달하고 갱신을 할 때는 두 개의 인자를 전 달한다. 스페셜 메서드는 _ _getitem_ _(조회), _ _setitem_ _(갱신), _ _delitem_ _(삭제)을 이용해서 처리한다.

예제 10-5 : 인덱싱 검색

_ _getitem_ _ 스페셜 메서드를 Indexing 클래스에서 연산자 오버로딩한다. 정수로 검색 할 위치를 지정하므로 range를 이용해서 순환문을 통해 key와 동일한 값일 경우 인스턴 스 내의 content 항목을 조회한 결과를 반환하게 한다. 또한 인덱스 범위를 벗어날 경우 인덱스 예외로 처리한다.

```python
In : class Indexing :
def __init__(self, content) :
self.content = content
def __getitem__(self,key) :
print(" __getitem__ call ")
result = ""
for i in range(len(self.content)) :
if i == key :
result = self.content[key]
break
if len(self.content) < key :
raise IndexError(key)
return result
```

문자열을 하나 생성하고 Indexing 클래스 생성자의 인자로 전달해서 하나의 인스턴스를 만든다.

이 인스턴스의 첫 번째 원소를 읽어오기 위해 대괄호를 사용하고 그 안에 정수로 0을 넣어 서 처리하면 스페셜 메서드 _ _getitem_ _을 읽어오는 것을 알 수 있다.

```python
In : s = "Inexing search"
i = Indexing(s)
print(i[0])
Out: __getitem__ call
```

Indexing 클래스에서 인덱스 범위를 벗어난 것을 대괄호 안에 넣어 조회하면 _ _ getitem_ _ 메서드를 호출하고 내부에서 예외를 처리한다.

```python
In : print(i[30])
Out: __getitem__ call
---------------------------------------------------------------------
IndexError            Traceback (most recent call last)
<ipython-input-72-918ad9897c5f> in <module>()
----> 1 print(i[30])
<ipython-input-70-a9123fe42eff> in __getitem__(self, key)
11         break
12     if len(self.content) < key :
---> 13     raise IndexError(key)
14     return result
IndexError: 30
```

Index를 검색할 때 예외가 발생해서 프로그램이 중단되지 않도록 이 예외를 잡아서 반환 값으로 전달하려면 추가로 스페셜 메서드인 _ _missing_ _ 을 오버로딩한다.

위에서 정의한 클래스를 변경해서 클래스 내에 스페셜 메서드 _ _missing_ _에 예외 처리 를 하는 로직을 작성한다.

Key가 문자열이 아닐 경우 문자열로 처리하도록 삼항 연산자를 문자열로 변환한다.

```python
In : class Indexing1 :
def __init__(self, content) :
self.content = content
def __getitem__(self,key) :
print(" __getitem__ call ")
try :
result = self.content[key]
except IndexError :
result = self.__missing__(key)
return result
def __missing__(self,key) :
print(" __missing__ ")
return " no key " + (key if type(key) == str else str(key))
```

인덱스 범위 이내에서 정상적인 값을 반환한다.

```python
In : s = "Inexing search"
i = Indexing1(s)
print(i[0])
Out: __getitem__ call
```

없는 인덱스를 넣으면 _ _missing_ _을 호출해서 대신 예외에 대한 정보를 반환하는 것을 알 수 있다.

```python
In : print(i[30])
Out: __getitem__ call
__missing__
no key 30
```

예제 10-6 : 인덱싱 내부 갱신 및 삭제

문자열 클래스는 변경이 불가능하므로 내부의 스페셜 메서드는 조회 가능한 _ _ getitem_ _만 구현되어 있다.

```python
In : for i in dir(str) :
if i.endswith("item__") :
print(i)
Out: __getitem__
```

리스트 클래스는 조회, 변경, 추가, 삭제가 전부 가능하므로 3개의 스페셜 메서드가 다 구 현되어 있다.

```python
In : for i in dir(list) :
if i.endswith("item__") :
print(i)
Out: __delitem__
__getitem__
__setitem__
```

이번에는 삭제도 추가해서 처리하기 위해 _ _setitem_ _, _ _delitem_ _ 을 추가한다.

모든 Sequence 자료형(리스트 등) 내의 요소 값을 변경해야 할 경우 이 _ _setitem_ _를 추 가한다.

문자열일 경우는 변경할 수 없지만 변경과 삭제에 문자열도 처리가 될 수 있도록 문자열을 리스트로 변경하고, 이를 가지고 추가 및 삭제를 할 수 있도록 내부 로직을 추가한다.

```python
In : class Indexing1 :
def __init__(self, content) :
self.content = content
def __getitem__(self,key) :
return self.content[key]
def __setitem__(self, key, value) :
a = [x for x in self.content]
if a[key] == value :
pass
else :
a.insert(key,value)
self.content = "".join(a)
def __delitem__(self, key) :
a = [x for x in self.content if self[key] != x ]
self.content = "".join(a)
```

하나의 인스턴스를 만들고 첫 번째 문자열을 삭제한다. 문자열 자료형은 변경 불가능하 므로 삭제가 안 되지만 _ _delitem_ _을 오버로딩해서 문자열을 삭제하게 만드므로 삭제 된다.

```python
In : i = Indexing1("갱신 및 삭제")
del i[0]
print(i.content)
Out: 신 및 삭제
```

인스턴스의 첫 번째 인덱스에 다시 원소를 추가하면 _ _setitem_ _ 메서드가 실행되어 추 가가 된 것을 알 수 있다.

```python
In : i[0] = "갱"
print(i.content)
Out: 갱신 및 삭제
```

같은 문자가 들어올 경우는 갱신하지 않도록 하므로 변경되는 것은 없다.

```python
In : i[1] = "신"
print(i.content)
Out: 갱신 및 삭제
```

## 10.1.4 슬라이싱(Slicing) 처리

인덱싱 검색은 정수를 통해서 하나의 값만 조회하여 갱신한다. 주로 주어진 범위 내만을 처리한다.

슬라이싱은 슬라이스 클래스의 인스턴스를 만들어서 특정 범위를 가지고 부분집합을 만드 는 것이다.

연산자 대괄호([ ]) 및 인덱싱 검색과 동일하므로 스페셜 메서드도 _ _getitem_ _, _ _ setitem_ _, _ _delitem_ _ 을 사용한다.

슬라이싱은 추출해서 만들어진 결과를 별도의 인스턴스 객체로 만들어서 사용하므로 원본 과 다르지만, 갱신과 삭제는 원본을 변경하는 것을 알 수 있다.

예제 10-7 : 슬라이싱으로 데이터 변경 및 삭제

문자열을 사용자 클래스 슬라이싱에서 변경 및 삭제로 처리하기 위해 _ _setitem_ _ 메서 드 내부에 로직을 갱신 및 추가할 수 있도록 수정한다.

문자열을 슬라이스에 따라 특정 부분일 때는 변경하고 문자열보다 더 크게 들어오면 슬라 이스는 변경한 이후에 추가해서 반영하도록 정의한다.

삭제는 리스트 슬라이스 처리를 이용해서 간단하게 처리한다.

```python
In : class Slicing :
def __init__(self, content) :
self.content = content
def __getitem__(self,key) :
return self.content[key]
def __setitem__(self, key, value) :
start,stop,a,j = (0,len(value),[],0) \
if key.stop is None else (key.start,key.stop,[x
for x in self.content],0)
for i in range(start, stop) :
if key.stop is None :
a.insert(i,value[j])
else :
if len(a) > i :
a[i] = value[j]
else :
a.append(value[j])
j += 1
if len(value) == j :
break
self.content = "".join(a)
def __delitem__(self, key) :
a = [x for x in self.content ]
del a[key]
self.content = "".join(a)
```

하나의 인스턴스를 만들고 전체를 조회하면 기존의 내용을 전부 보여준다.

```python
In : s = Slicing("슬라이싱")
In : s[:] = "슬라이싱 처리"
print(s.content)
Out: 슬라이싱 처리
```

부분을 갱신하면 문자열 내용도 부분만 갱신해준다. 부분을 삭제하면 삭제한 부분을 빼고 출력한다.

```python
In : s[1:3] = "부분"
print(s.content)
Out: 슬부분싱 처리
In : del s[1:3]
print(s.content)
Out: 슬싱 처리
```

슬라이싱 범위가 기존에 있는 content보다 클 경우에는 원서가 들어온 범위까지 처리 한다.

```python
In : s[0:30] = "슬라이싱 범위가 넘을 경우 처리는"
print(s.content)
Out: 슬라이싱 범위가 넘을 경우 처리는
```

## 10.1.5 정수(int), 실수(float), 복소수(complex) 내부 메서드

숫자 자료형의 연산자도 스페셜 메서드(special method)로 처리된다. 이 연산자에 대해 간 단하게 처리하는 방법을 알아본다.

예제 10-8 : 할당 연산자에 대한 스페셜 메서드 처리

정수를 처리하는 하나의 클래스를 만들어서 할당 및 덧셈 연산자를 구현하고 부동소 수점 나눗셈인 _ _truediv_ _, _ _itruediv_ _( / )와 정수 나눗셈인 _ _floordiv_ _, _ _ ifloordiv_ _(//) 등 4개의 스페셜 메서드를 작성한다.

메서드 내부의 로직은 operator 모듈을 import해서 계산 처리하도록 구현한다. 내부 산 식을 계산할 때 self.value에 할당된 정수를 가지고 계산을 처리해야 한다.

```python
In : import operator as op
class Int :
def __init__(self,value) :
self.value = value
def __iadd__(self,other) :
print(" __iadd__")
return self.value + other
def __truediv__(self,other) :
print(" __truediv__")
return op.truediv(self.value,other)
def __floordiv__(self,other) :
print(" __floordiv__")
return op.floordiv(self.value,other)
def __itruediv__(self,other) :
print(" __itruediv__")
return op.itruediv(self.value,other)
def __ifloordiv__(self,other) :
print(" __ifloordiv__")
return op.ifloordiv(self.value,other)
```

덧셈에 대한 할당 연산자를 사용해서 실행해보면 정수와의 계산이 되는 것을 확인할 수 있다.

```python
In : i = Int(100)
i += 99
print(i)
Out: __iadd__
```

부동소수점을 처리하는 나눗셈을 실행해보면 일반 나눗셈과 할당 연산 나눗셈을 실행해서 결과가 동일한 것을 알 수 있다.

```python
In : i = Int(100)
print(type(i))
print(i / 3)
i /= 3
print(i)
Out: <class '__main__.Int'>
__truediv__
33.333333333333336
__itruediv__
33.333333333333336
```

소수점 값이 절사되는 나눗셈도 일반 연산과 할당 연산 처리가 동일한 것을 알 수 있다.

```python
In : i = Int(100)
print(type(i))
print(i//3)
i //= 3
print(i)
Out: <class '__main__.Int'>
__floordiv__
__ifloordiv__
```

예제 10-9 : 반대 연산에 대한 스페셜 메서드 처리

위에서 할당 연산자에 대한 스페셜 메서드를 처리했다. 이번에는 우측 연산을 처리하는 스페셜 메서드를 사용해서 좌측부터 처리하지 않고 우측부터 처리하는지를 확인해보자. 클래스 내부에 좌측부터 계산하는 _ _add_ _와 우측부터 계산하는 _ _radd_ _ 메서드를 정의한다.

```python
In : class RInt :
def __init__(self,value) :
self.value = value
def __add__(self,other) :
print(" __add__")
return self.value + other
def __radd__(self,other) :
print(" __radd__")
return other + self.value
```

인스턴스를 하나 만들고 일반 덧셈을 계산해서 결과를 확인한다. 우측 연산을 인자로 넣 고 수행하면 우측 연산이 계산되는 것을 알 수 있다.

```python
In : i = RInt(100)
print(i + 88)
i = i.__radd__(99)
print(i)
Out: __add__
__radd__
```

정수에는 우측 연산이 없지만 RInt 클래스 내에는 우측 연산을 하는 메서드가 만들어져 있 으므로 인스턴스를 우측에 넣고 정수를 좌측에 넣으면 우측 연산이 일어나는 것을 볼 수 있다.

```python
In : i = RInt(100)
i = 99 + i
print(i)
Out: __radd__
```
