---
layout: default
title: "09.01 클래스(class)"
---

# 09.01 클래스(class)

파이썬의 클래스는 하나의 객체로 처리된다. 클래스의 생성자를 가지고 인스턴스 객체를 만들어서 사용한다. 또한, 클래스는 자기 속성과 모든 메서드를 관리한다.

다른 언어처럼 생성자가 있지만, 생성자는 인스턴스만 만들고 인스턴스의 속성은 별도 클 래스 내의 초기화 메서드로 인스턴스의 속성을 만든다.

이런 클래스를 만들기 위해서는 인스턴스 객체에 대한 기본을 명확히 이해해야 클래스를 정의할 때 명확한 기준을 만들 수 있다.

일단 파이썬에서 객체지향 용어를 어떻게 반영하는지부터 차근차근 알아본다.

## 9.1.1 객체의 분류

객체지향이라는 용어의 핵심은 클래스가 아닌 객체이다. 파이썬에서는 보통 객체를 인스 턴스 객체로 이해하면 된다. 클래스도 객체이지만 클래스는 다른 언어의 클래스처럼 이해 하는 것이 좋다.

행위를 수행하는 객체가 중요하며 이런 객체를 명확히 분류해야 대표성 있게 클래스로 정 의해서 처리할 수 있다. 왜 객체를 만들어야 하고 왜 객체가 중요한지를 지금부터 알아 본다.

✚ 사물을 분류하는 예시

사물을 어떻게 분류해서 만드는지에 대해 간단히 알아본다. 이 책의 범위는 프로그래밍 언어에서 객체와 클래스를 작성하는지에 중점을 두고 있지만 간단하게 개념을 설명하는 것이다.

특히 비즈니스가 다를 경우는 도메인에 대한 처리 기준이 차이가 크게 생겨서 동일한 사물 일 경우에도 각 도메인별 다양한 객체들이 만들 수 있으므로 다양한 클래스가 추가될 수도 있다.

간단하게 사물을 보고 이를 클래스로 만들 수 있는 예제를 보여준다.

예제 9-1 : 사물에는 기본 정보를 관리하는 클래스가 필요

책으로 예를 들어보면 책 정보를 관리하는 것도 객체이고, 실물 책도 하나의 객체이다. 일 단 개념인 책에 대한 정보를 간단하게 정의하면 책에 대한 정보만을 관리하는 하나의 클래 스를 만들 수 있다.

간단하게 클래스를 만들어 개념에 대한 처리만 보여주기 때문에 메서드는 인스턴스를 초 기화하는 _ _init_ _만 정의했다.

```python
In : class BookInfo :
def __init__(self,title,author,date,publisher,page) :
self.title = title
self.author = author
self.date = date
self.publisher = publisher
self.page = page
```

이 책이 정보를 가지는 인스턴스 객체를 2개 만들어보면, 이 책에 대한 정보를 향후 다른 실물 책 등과 연결하여 사용할 수 있다.

```python
In : book1 = BookInfo("서시","윤동주","1939","출판사",100)
```

book2 = BookInfo("파이썬","달문","2017","출판사",900) 책에 대한 정보를 가진 인스턴스를 확인하면 속성만 가지고 있는 것을 알 수 있다. 나머지 에 대한 정보는 클래스에 있으므로 호출할 때 클래스를 검색하여 처리한다.

```python
In : import pprint
pprint.pprint(book1.__dict__)
pprint.pprint(book2.__dict__)
Out: {'author': '윤동주',
'date': '1939',
'page': 100,
```

'publisher': '출판사', 'title': '서시'} {'author': '달문', 'date': '2017', 'page': 900, 'publisher': '출판사', 'title': '파이썬'}

예제 9-2 : 책에 대한 메타 정보인 범주 관리

책에 대한 기본 정보는 개념상의 클래스이다. 이 책을 관리하려면 각 책에 대한 관리 기준 정보도 추가되어야 한다.

책에 대한 범주를 관리할 수 있는 하나의 클래스를 정의한다. 보통 책에 대한 도서 문헌 상의 분류 규칙이 추가되었다.

BookInfo 클래스를 상속받아 책을 분류하는 클래스를 생성하고 책에 대한 분류를 관리 하는 BookClass를 만든다. 단순한 책 정보가 아닌 책에 대한 분류 기준 등을 관리하는 메 타 정보를 추가한다.

생성자에는 BookInfo에 생성된 인스턴스를 이용해 인스턴스의 네임스페이스에 접근해서 고정 키워드 인자로 처리한다.

```python
In : class BookClass(BookInfo) :
def __init__(self,title,author,date,publisher,page,isdn=None) :
super().__init__(title,author,date,publisher,page)
self.isdn = isdn
bookclass1 = BookClass(**book1.__dict__,isdn="1111111111111")
bookclass2 = BookClass(**book2.__dict__,isdn="2222222222222")
```

이 범주 클래스에 대한 인스턴스를 생성해서 확인해본다.

```python
In : import pprint
pprint.pprint(bookclass1.__dict__)
pprint.pprint(bookclass2.__dict__)
Out: {'author': '윤동주',
'date': '1939',
'isdn': '1111111111111',
'page': 100,
```

'publisher': '출판사', 'title': '서시'} {'author': '달문', 'date': '2017', 'isdn': '2222222222222', 'page': 900, 'publisher': '출판사', 'title': '파이썬'}

예제 9-3 : 만들어져 있는 객체로써 책을 관리

책에 대한 정보만 관리하는 것은 개념 객체이고 책의 실물을 관리하는 객체가 구별되어 관 리한다.

BookInfo 클래스를 상속받아 재고로 관리하는 실물의 책들에 대한 BookInv 클래스를 만들어서 실물 책에 대한 재고를 관리한다. 내부 처리 메서드는 생략했다. 위의 방식대로 기존에 만들어진 인스턴스를 가지고 생성자에서 키워드 인자로 받아서 처리했다.

```python
In : class BookInv(BookClass) :
def __init__(self,title,author,date,publisher,page,isdn,inventno=
None) :
super().__init__(title,author,date,publisher,page,isdn)
self.inventno = inventno
bookinv1 = BookInv(**bookclass1.__dict__,inventno=3000)
bookinv2 = BookInv(**bookclass2.__dict__,inventno=3000)
```

책에 대한 재고를 관리하는 인스턴스를 만들어서 관리한다.

```python
In : import pprint
pprint.pprint(bookinv1.__dict__)
pprint.pprint(bookinv2.__dict__)
Out: {'author': '윤동주',
'date': '1939',
'inventno': 3000,
'isdn': '1111111111111',
'page': 100,
```

'publisher': '출판사', 'title': '서시'} {'author': '달문', 'date': '2017', 'inventno': 3000, 'isdn': '2222222222222', 'page': 900, 'publisher': '출판사', 'title': '파이썬'}

## 9.1.2 객체의 특징

객체지향에서 제일 중요한 것은 객체를 만들어서 실행을 시켜야 하는 것이다. 객체들이 구별되고 이 객체들 간의 협업하는 규칙에 대한 처리를 알아야 한다.

객체만이 가지고 있는 중요한 특징을 이해해야 한다. 객체가 만들어지면 각각의 객체는 명확히 구별되어야 한다. 이를 정체성(identity)이라고 한다.

각 객체는 자신만의 명확한 행위를 가지고 있다. 이것을 책임성(responsibility)이라 한다.

그리고 객체를 만드는 특정 그룹에 속해야 그 그룹의 특징을 가질 수 있다.

이것은 객체별 자료형(data type, class)으로 구분이 되어야 한다.

이런 특징에 대해 간단한 예시를 통해 알아보자.

✚ 객체의 특징: 정체성(idendity)

모든 객체는 각각의 객체가 유일하다는 것을 구분할 수 있어야 한다. 보통 객체가 생성되 면 유일한 레퍼런스(reference)를 가지며 동일한 객체가 아닐 경우에는 동일한 레퍼런스가 있으면 안 된다.

예제 9-4 : object 클래스로 객체의 레퍼런스 확인하기

파이썬에서 최상위 클래스인 object를 이용해서 아무 것도 하지 않는 두 개의 object 인 스턴스 객체를 만든다. 이 인스턴스의 레퍼런스를 id 함수로 조회해서 서로 다른 인스턴스 인지를 구분한다.

```python
In : a = object()
b = object()
print(a is b)
print(id(a), id(b))
Out: False
4419762960 4419762976
```

튜플 자료형을 tuple 생성자를 이용해서 기존에 정의된 인스턴스로 다시 생성하면 있는 그대로 반환하는 인터닝(interning)이 발생해서 동일한 인스턴스의 레퍼런스를 전달하므로 별도의 사본이 만들어지는 것은 아니다.

두 개의 인스턴스는 사실 동일한 객체를 표시하면 동일한 인스턴스라는 것을 알 수 있다.

```python
In : t = (1,2,3)
ts = tuple(t)
print(t is ts)
print(id(t), id(ts))
Out: True
4450584904 4450584904
```

아무 것도 하지 않는 클래스를 사용할 경우 클래스도 하나의 레퍼런스를 가지고 있다면 다

른 인스턴스 객체와 동일하다는 것을 알 수 있다.

```python
In : class Klass :
pass
print(id(Klass))
Out: 140721026318296
```

✚ 객체의 특징: 책임성(responsibility)

객체는 행위(behavior) 중심으로 분류를 하므로 객체가 가져야 할 행위에 대한 책임성이 아 주 중요하다.

이 책임성을 준수하는 범위 내에서 객체의 행위인 메서드가 만들어지고 이 메서드가 외부 로 공개되어 처리된다. 메서드는 이 객체가 해야 할 일을 명확히 보장해야 한다.

예제 9-5 : int 클래스에 대한 책임성 확인하기

정수는 사칙연산을 정수로 반환해야 하는 책임성을 가지고 있다. 클래스는 수학의 정수형 값에 대한 행위인 메서드가 구현되어 있다.

```python
In : count = 0
for i in dir(int) :
print(i,end=" ")
count += 1
print() if count % 5 ==0 else _
Out: __abs__ __add__ __and__ __bool__ __ceil__
__class__ __delattr__ __dir__ __divmod__ __doc__
__eq__ __float__ __floor__ __floordiv__ __format__
__ge__ __getattribute__ __getnewargs__ __gt__ __hash__
__index__ __init__ __init_subclass__ __int__ __invert__
__le__ __lshift__ __lt__ __mod__ __mul__
__ne__ __neg__ __new__ __or__ __pos__
__pow__ __radd__ __rand__ __rdivmod__ __reduce__
__reduce_ex__ __repr__ __rfloordiv__ __rlshift__ __rmod__
__rmul__ __ror__ __round__ __rpow__ __rrshift__
__rshift__ __rsub__ __rtruediv__ __rxor__ __setattr__
__sizeof__ __str__ __sub__ __subclasshook__ __truediv__
__trunc__ __xor__ bit_length conjugate denominator
from_bytes imag numerator real to_bytes
```

파이썬에서는 모든 연산자가 메서드이므로 정수가 할 수 있는 행위는 수학적으로 처리되 는 연산자를 모두 행위로 처리하는 것임을 알 수 있다.

두 개의 정수를 만들어 덧셈과 뺄셈에 대한 행위를 연산자로 처리하는 것과 이를 연산자와 동일한 스페셜 메서드로 처리하는 것의 결과는 같다.

```python
In : a = int(10)
b = int(5)
print(a+b)
print(a.__add__(b))
print(a-b)
print(a.__sub__(b))
Out: 15
```

✚ 객체의 특징: 자료형(data type)

파이썬에서 객체는 인스턴스 객체이므로 자신이 속한 클래스 객체를 항상 가지고 다닌다.

자신이 속한 클래스가 이 인스턴스 객체가 처리할 모든 메서드를 가지므로 자신을 만든 클 래스가 아주 중요하다.

예제 9-6 : 숫자 클래스 내에서 관리하는 속성과 메서드 확인하기

파이썬에서 숫자를 처리하는 int와 float 클래스는 숫자 처리를 위한 책임성을 가지고 있다.

정수는 이진수 등도 처리할 수 있으므로 이에 대한 메서드가 추가된 것을 알 수 있다. 실 수일 경우는 hex 또는 포맷 처리에 대한 메서드가 더 추가되어 있다.

```python
In : for i,v in enumerate(dir(float),1) :
print(v,end=" ")
if i % 5 == 0 :
print()
Out: __abs__ __add__ __bool__ __class__ __delattr__
__dir__ __divmod__ __doc__ __eq__ __float__
__floordiv__ __format__ __ge__ __getattribute__ __getformat__
__getnewargs__ __gt__ __hash__ __init__ __init_subclass__
__int__ __le__ __lt__ __mod__ __mul__
__ne__ __neg__ __new__ __pos__ __pow__
__radd__ __rdivmod__ __reduce__ __reduce_ex__ __repr__
__rfloordiv__ __rmod__ __rmul__ __round__ __rpow__
__rsub__ __rtruediv__ __setattr__ __setformat__ __sizeof__
__str__ __sub__ __subclasshook__ __truediv__ __trunc__
as_integer_ratio conjugate fromhex hex imag
is_integer real
```

실수는 포맷에 관련된 처리와 hex 처리 메서드가 추가되어 있다.

```python
In : i = set(dir(int))
f = set(dir(float))
print(f-i)
Out: {'is_integer', 'hex', 'as_integer_ratio', 'fromhex', '__setformat__',
'__getformat__'}
```

정수는 이진수에 대한 처리도 추가해서 실수와 다른 메서드를 가진다.

```python
In : print(i-f)
Out: {'__or__', 'numerator', '__xor__', '__index__', 'to_bytes', '__
rand__', '__rlshift__', '__floor__', '__rshift__', '__lshift__',
'from_bytes', '__invert__', '__rxor__', '__and__', 'bit_length', '__
ror__', '__ceil__', 'denominator', '__rrshift__'}
```

## 9.1.3 최상위 클래스 object 이해하기

파이썬에서 클래스에 대한 구조를 이해하기 위해서는 최상위 클래스인 object 클래스가 어떻게 구성되었는지를 알아야 한다.

파이썬의 모든 클래스는 기본적으로 object 클래스를 상속받아 만들어지므로 이 클래스가 모든 클래스의 최상위 부모 클래스가 된다.

이 클래스 안에 어떤 속성과 메서드가 있는지를 알아보자.

예제 9-7 : object 클래스 내부의 속성과 메서드 보기

object 클래스 내에는 스페셜 메서드(special method)나 스페셜 속성으로만 구성된다. 특 히 _ _dict_ _ 속성이 존재하지 않아서 런타임에 속성을 추가할 수 없다.

```python
In : for i,v in enumerate(dir(object),1) :
print(v,end=" ")
if i % 5 == 0 :
print()
Out: __class__ __delattr__ __dir__ __doc__ __eq__
__format__ __ge__ __getattribute__ __gt__ __hash__
__init__ __init_subclass__ __le__ __lt__ __ne__
__new__ __reduce__ __reduce_ex__ __repr__ __setattr__
__sizeof__ __str__ __subclasshook__
```

object 클래스 내부의 도움말과 이 객체의 이름 속성을 조회하고 이 클래스가 어떻게 출력 이 되어야 하는지 _ _str_ _, _ _repr_ _에 대해 출력해본다.

```python
In : print(object.__doc__)
print(object.__name__)
print(object.__str__(object))
print(object.__repr__(object))
Out: The most base type
object
<class 'object'>
<type object at 0x000000005DE687A0>
```

object 클래스 내부의 _ _eq_ _메서드를 사용해서 동일한 클래스를 비교하면 레퍼런스로 비교하므로 is 키워드를 통해 처리되는 것과 동일한 결과가 나온다.

```python
In : print(object.__eq__(object, object))
print(object is object)
Out: True
True
```

object 클래스를 가지고 하나의 인스턴스를 만들었다. 이 인스턴스에는 어떤 속성들이 있 는지를 확인해보려고 하는데 _ _dict_ _속성이 없다는 에러를 출력한다. 이 말은 인스턴스 에서 보관하는 별도의 네임스페이스가 없다는 뜻이다.

```python
In : o = object()
print(o)
print(o.__dict__)
Out: <object object at 0x0000000002079CF0>
---------------------------------------------------------------------
AttributeError          Traceback (most recent call last)
<ipython-input-14-b56a300d7645> in <module>()
3 print(o)
----> 4 print(o.__dict__)
AttributeError: 'object' object has no attribute '__dict__'
```

## 9.1.4 파이썬 클래스 생성 및 기본 상속 구조

파이썬 클래스와 객체 간의 관계 등에 대한 용어를 이해해서 클래스 생성과 상속 관계에 대한 기본 구조를 이해할 필요가 있다.

다른 언어들과 차이점이 발생하는 이유는 클래스를 객체처럼 사용하기 위해 이 클래스를 만드는 메타 클래스가 추가되어 있기 때문이다.

✚ 파이썬 클래스 생성 및 기본 상속 구조

파이썬의 모든 클래스는 메타 클래스로 만들어진다. 최상위 메타 클래스는 type 클래스 이다. 최상위 상속이 가능한 클래스는 object이다.

사용자 정의한 클래스도 사용자 정의 메타 클래스를 별도로 지정하지 않으면 type 메타 클래스로 만들어진다. 사용자 메타 클래스는 기본적으로 type 클래스를 상속해서 만든다.

예제 9-8 : Type 클래스의 instance 여부 확인

위의 그림을 보면 파이썬의 모든 클래스는 메타 클래스에 의해 만들어지는 것을 알 수 있다. 누구에 의해 만들어졌는지 isinstance 내장 함수를 이용해서 체크하여 True로 나오 면 인스턴스 관계이다.

```python
In : l = [type, object, int, float, str, tuple, list, dict,set]
for i in l :
print(isinstance(i,type))
Out: True
True
True
True
True
True
True
True
True
```

내장 클래스에 대한 상속 관계를 issubclass 내장 함수로 확인해보면 내장 클래스는 기본 으로 object 클래스를 상속받아서 만들어진 것을 확인할 수 있다.

```python
In : l = [type, object, int, float, str, tuple, list, dict,set]
for i in l :
print(issubclass(i,object))
Out: True
True
True
True
True
True
True
True
True
```

예제 9-9 : Class 내부 속성 __class__, __bases__ 확인

내장 클래스들이 누구에 의해 만들어졌는지는 _ _class_ _속성을 조회해도 알 수 있다.

type 클래스라는 내장 클래스는 항상 메타 클래스인 type에 의해 만들어진다는 것을 알 수가 있다.

```python
In : l = ['type', 'object', 'int', 'float', 'str', 'tuple', 'list',
'dict','set']
for i in l :
print(eval(i+".__class__"))
Out: <class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
```

클래스의 상속 여부를 관리하는 속성은 _ _bases_ _이고 이를 확인해보면 상속 관계를 알 수 있다. Object 클래스를 제외하고는 모든 클래스가 object 클래스를 상속받는다.

```python
In : l = ['type', 'object', 'int', 'float', 'str', 'tuple', 'list',
'dict','set']
for i in l :
print(eval(i+".__bases__"))
Out: (<class 'object'>,)
()
(<class 'object'>,)
(<class 'object'>,)
(<class 'object'>,)
(<class 'object'>,)
(<class 'object'>,)
(<class 'object'>,)
(<class 'object'>,)
```

✚ 파이썬 클래스와 인스턴스 관계

파이썬에서 클래스의 생성자를 이용하여 인스턴스를 만들 수 있다. 클래스와 인스턴스의 생성 관계도 isinstance 내장 함수를 통해 알 수 있다.

생성 클래스는 클래스를 생성하는 것이므로 메타 클래스이고, 인스턴스를 생성하는 것이 클래스가 된다.

예제 9-10 : 내장 클래스와 인스턴스의 관계 확인

내장 클래스로 인스턴스를 생성해서 만든 후에 자기 클래스와의 인스턴스 관계를 확인하 면 True를 출력한다.

isinstance 함수를 바로 실행하는 게 아니라 문자열로 저장해서 실행을 내장 함수 eval로 실행한다.

```python
In : l = ['object', 'int', 'float', 'str', 'tuple', 'list', 'dict','set']
for i in l :
print(eval("isinstance("+i+"(),"+i+")"))
Out: True
True
True
True
True
True
True
True
```

내장 클래스인 object, int, float, str, list, dict를 가지고 인스턴스를 만든다. 인스턴스에 서 _ _class_ _ 속성을 검색하면 이 인스턴스 객체를 어느 클래스가 만들었는지 확인할 수 있다.

```python
In : l = ['object', 'int', 'float', 'str', 'tuple', 'list', 'dict','set']
for i in l :
print(eval(i+"().__class__"))
Out: <class 'object'>
<class 'int'>
<class 'float'>
<class 'str'>
<class 'tuple'>
<class 'list'>
<class 'dict'>
<class 'set'>
```

## 9.1.5 사용자 정의 클래스

내장 클래스는 파이썬 프로그램에서 기본으로 제공하는 클래스이다. class 키워드로 사 용자 정의 클래스를 정의하고 이를 이용해서 인스턴스를 생성하고 다양하게 처리할 수 있다.

사용자 정의 클래스를 어떻게 정의하고 사용하는지를 알아보자.

✚ 사용자 클래스 만들기

사용자 클래스는 class 키워드를 이용해서 작성하고 상속은 클래스명 옆 괄호 안에 작성하 면 된다. 최상위 Object 클래스만 상속할 경우에는 괄호 안에 표시하지 않아도 기본으로 상속한다.

타 클래스를 부모 클래스로 상속해야 하는 경우에는 다중 상속도 가능하므로 항상 중요도 순으로 표시해야 한다.

예제 9-11 : 사용자 정의 클래스 기본 확인

Klass라는 사용자 클래스를 정의하고 속성과 메서드는 아무 것도 정의하지 않는다. 이때 pass문을 사용해서 내부에 아무 것도 없다는 것을 표시한다.

```python
In : class Klass :
pass
```

이 사용자 클래스가 메타 클래스인 type 클래스로 만들어져 있는지를 isinstance나 _ _ class_ _ 로 확인한다.

```python
In : print(Klass.__class__)
print(isinstance(Klass, type))
Out: <class 'type'>
True
```

object 클래스는 상속 관계가 있는지를 issubclass 함수로 확인하고 상속하는 클래스 정 보를 _ _bases_ _ 속성으로 확인한다.

```python
In : print(Klass.__bases__)
print(issubclass(Klass, object))
Out: (<class 'object'>,)
True
```

사용자 Int 클래스는 내장 클래스 int를 상속받고, 내부에 추가된 내용이 존재하지 않도록 정의했다.

```python
In : class Int(int) :
pass
a = Int(10)
print(type(a),a)
Out: <class '__main__.Int'> 10
```

Int 클래스가 가진 정보를 _ _dict_ _ 으로 조회해서 보면 클래스를 가져야 기본 스페셜 속 성이 조회되는 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(Int.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Int' objects>,
'__doc__': None,
'__module__': '__main__'})
```

이 사용자 클래스도 _ _class_ _에 메타 클래스가 들어가 있고 _ _bases_ _에는 상속 관계 의 클래스가 내포된 것을 볼 수 있다.

```python
In : print(Int.__class__)
print(Int.__bases__)
print(isinstance(Int, type))
print(issubclass(Int, object))
print(issubclass(Int, int))
Out: <class 'type'>
(<class 'int'>,)
True
True
True
```

✚ 인스턴스 속성을 _ _init_ _메서드로 추가하기

사용자 클래스를 정의할 때 생성자를 통해 인스턴스 객체를 만드는 데 필요한 인스턴스 속 성을 표시해야 한다. 일단 초기화 _ _init_ _ 스페셜 메서드(special method)를 정의하면 이 내부에 정의된 속성이 인스턴스 객체의 네임스페이스에 생성되고 인스턴스의 속성에 접근 하면 제일 먼저 이 네임스페이스를 검색한다.

예제 9-12 : Person 사용자 클래스를 정의 및 속성 확인

Person 클래스를 정의하는 경우, 내부에 초기화 _ _init_ _ 메서드를 선언한다. _ _init_ _ 메서드에는 self, name, age 3개의 매개변수가 들어간다. 이 메서드 내부의 self.name과 self.age에 매개변수 name과 age를 할당하면 인스턴스가 생성될 때 인스턴스 내부 네임 스페이스에 이 속성들이 생성된다.

파이썬에서는 인스턴스 메서드 즉 인스턴스가 실행되면 내부적으로 인스턴스가 호출해서 처리하는 메서드를 실행한다. 이때 첫 번째 매개변수에 그 인스턴스의 레퍼런스를 자동으 로 세팅해서 인스턴스가 실행되도록 만들기 때문에 _ _init_ _ 메서드에 첫 번째 매개변수 인 self를 부여한다.

```python
In : class Person :
def __init__(self, name, age) :
self.name = name
self.age = age
```

Person 클래스를 생성자로 사용해서 인스턴스를 만들 때는 _ _init_ _ 메서드 내의 self를 제외한 매개변수에 매핑되는 인자를 넣어야 한다.

인스턴스를 생성한 후에 속성을 확인하면 name, age가 들어가 있는 것을 알 수 있다.

```python
In : p = Person("줄리아",15)
print(p)
print(p.__dict__)
print(p.name)
print(p.age)
Out: <__main__.Person object at 0x10956d6a0>
```

{'name': '줄리아', 'age': 15} 줄리아 사용자 클래스인 Person과 최상위 클래스인 object 간 내부적인 구조의 차이점을 확인 해보면 사용자 클래스에 _ _dict_ _, _ _module_ _, _ _weakref_ _ 3개의 속성이 차이가 있다.

사용자 클래스는 특정 모듈에 정의가 되어 클래스가 가진 네임스페이스를 별도로 관리하 며 약한 레퍼런스를 처리할 수 있는 속성이 추가된 것을 확인할 수 있다.

```python
In : o = set(dir(object))
pc = set(dir(Person))
print(pc-o)
Out: {'__weakref__', '__dict__', '__module__'}
```

사용자 클래스인 Person은 _ _bases_ _ 를 이용해 어떤 클래스를 상속받았는지를 확인하 고, _ _class_ _ 로는 어떤 메타 클래스를 위해 만들었는지 확인한다.

```python
In : print(Person.__module__)
print(Person.__bases__)
print(Person.__class__)
Out: __main__
(<class 'object'>,)
<class 'type'>
```

## 9.1.6 객체 네임스페이스 및 스코프

앞에서 함수와 모듈 간의 네임스페이스와 스코프 규칙을 알아보았다. 이번 장에서는 클래 스 객체와 인스턴스 객체가 가진 객체 네임스페이스를 알아보자. 네임스페이스에 접근하는 방식은 변수명이 함수에 없으면 자동으로 모듈로 가지지만, 인 스턴스와 클래스일 경우 항상 점 연산자를 통해 네임스페이스에 접근한다는 차별성을 가 진다.

클래스와 인스턴스 간의 객체 네임스페이스 참조 관계 및 부모 클래스와 자식 클래스 간의 객체 네임스페이스 상속 관계를 명확히 이해할 필요가 있다. 이런 객체 네임스페이스 간 의 규칙을 스코프라고 한다.

✚ 인스턴스와 클래스 객체 네임스페이스 및 스코프 처리 기준

인스턴스와 클래스는 객체이므로 각각의 네임스페이스를 가지고 있다. 이들은 자신을 생 성한 클래스의 네임스페이스를 참조할 권한이 있다.

일단 인스턴스 네임스페이스에 있으면 클래스를 참조하지 않지만 없으면 자신을 만든 클 래스나 상속을 받은 부모 클래스를 검색한다. 여기에도 없으면 더 이상 검색할 수 없으므 로 예외를 발생시킨다.

예제 9-13 : 클래스와 인스턴스 객체 간의 네임스페이스 접근

클래스 속성과 메서드는 클래스를 정의한 블록 내에서 존재하므로 모두 클래스 네임스페 이스에 등록이 된다. 인스턴스 속성은 _ _init_ _ 메서드 내에서 self. 속성명을 주고 할당 이 되는 경우만 인스턴스 네임스페이스에 등록한다.

이 규칙을 확인하기 위해서 사용자 클래스 Klass를 정의한다. 클래스 속성에 name이 있 고 _ _init_ _ 메서드 내부에 name 인스턴스 속성이 하나 있다.

인스턴스 메서드에 getname을 정의한다.

```python
In : class Klass :
name = "Klass attr"
def __init__(self, name) :
self.name = name
def getname(self) :
return self.name
```

인스턴스를 하나 생성해서 인스턴스.속성명으로 접근하면 인스턴스 내의 네임스페이스에 있는 name만 검색이 된다. 인스턴스에 없는 경우만 클래스의 네임스페이스를 검색해서 조회할 수 있다.

클래스명.속성명으로 접근하면 클래스 속성인 name에 접근해서 출력하는 것을 확인할 수 있다.

```python
In : k = Klass("instance attr")
print(k.name)
print(Klass.name)
Out: instance attr
Klass attr
```

인스턴스 속성을 런타임에 추가하고 값을 클래스의 name 속성 값을 할당한다. 인스턴스 네임스페이스가 어떻게 변했는지 조회하면 런타임 실행할 때 추가한 속성이 보인다.

추가된 getclassname 속성을 인스턴스에서 조회해서 출력하면 결과값이 출력된다.

```python
In : k.getclassname = Klass.name
print(k.__dict__)
print(k.getclassname)
Out: {'name': 'instance attr', 'getclassname': 'Klass attr'}
Klass attr
```

인스턴스에서 인스턴스 메서드를 호출하면 클래스에 있는지를 확인하고, 확인 후 인스턴 스 메서드를 만들고 이를 실행한다.

클래스로 인스턴스 메서드에 접근하면 함수로서 접근이 되므로 실행을 하려면 첫 번째 인 자에 인스턴스를 넣고 실행한다.

```python
In : print(k.getname())
print(Klass.getname(k))
Out: instance attr
instance attr
```

외부 함수에 내부 함수를 정의하면 변수와 내부 함수가 지역 네임스페이스에 키와 값으로 들어가 있듯이 사용자 클래스를 정의하면 클래스 내의 변수와 메서드가 전부 클래스의 네 임스페이스에 들어간다.

클래스의 네임스페이스를 출력하면 클래스 속성과 메서드를 모두 가지고 있다는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Klass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Klass' objects>,
'__doc__': None,
'__init__': <function Klass.__init__ at
0x0000000004BF3378>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass'
objects>,
'getname': <function Klass.getname at 0x0000000004BF30D0>,
'name': 'Klass attr'})
```

인스턴스와 클래스를 통해 동일한 메서드를 조회하면 메서드의 자료형에 차이가 있는 것 을 알 수 있다.

인스턴스에서 인스턴스 메서드를 점 연산자를 통해 바인딩하면 인스턴스 메서드라는 것을 확인할 수 있지만 클래스에서 인스턴스 메서드를 점 연산자를 통해 확인하면 함수라고만 출력된다.

함수로 표시되는 것은 항상 하나의 함수 인스턴스라는 것을 알 수 있지만 메서드는 하나의 인스턴스에 특화되어 처리된다.

```python
In : print(k.getname)
print(Klass.getname)
Out: <bound method Klass.getname of <__main__.Klass object at
0x0000000004B6C208>>
<function Klass.getname at 0x0000000004BF30D0>
```
