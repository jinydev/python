---
layout: default
title: "01.03 데이터"
---

# 01.03 데이터

이제 값에 대한 처리가 왜 객체인지를 확인하기 위해 파이썬이 제공하는 자료형에 대한 관 리 규칙인 데이터 모델(data model)을 알아본다.

파이썬은 내부에서 제공하는 모든 객체들 즉, 자료형(data type)을 어떻게 만드는지에 대한 규칙을 데이터 모델로 관리한다.

클래스가 어떤 기준으로 만들어지는지, 이 클래스로 생성된 인스턴스에 대한 비교, 다른 자료형으로 변환해서 처리하는 방법 등이 정의되어 있다.

## 1.3.1 클래스(class), 객체(object), 인스턴스(instance)

파이썬은 객체지향 개념(object-oriented paradigm)을 수용해서 모든 것을 객체로 관리 한다. 만들어지는 모든 값은 객체이고 객체를 처리하기 위해 속성과 메서드를 제공한다.

일단 객체지향 내의 용어 중에 클래스, 객체, 인스턴스에 대한 개념부터 알아보자. 클래스는 객체를 만드는 틀로 사용하도록 고안되었다. 파이썬에서도 클래스를 정의하고 이 클래스를 이용해서 객체를 만든다. 이때 만들어진 객체를 인스턴스 객체라고 한다. 파 이썬은 클래스도 별도의 객체로 인식해서 사용할 수 있으므로 클래스 객체로 사용된다.

명확히 구분을 위해 파이썬에서는 클래스와 인스턴스로 구분해서 사용하는 것이 좋다.

파이썬에서 클래스가 정의되면 모든 메서드와 클래스 내부에 있는 속성은 클래스에서 관 리하고 객체가 만들어질 경우만 인스턴스 속성을 관리한다.

인스턴스로 인스턴스 메서드를 호출하면 클래스에 메서드 이름을 검색한 후에 바인딩해서 사용하는 개념으로 처리가 된다.

클래스와 인스턴스에 대해 하나하나씩 조회하면서 내부 구조를 알아본다.

✚ 객체 내부 검사(object introspection)

파이썬은 클래스와 인스턴스를 알아보기 위해 내장에서 제공하는 함수와 클래스가 있다.

클래스와 인스턴스 내부에서 사용할 수 있는 정보를 확인하는 dir 함수 및 클래스와 인스 턴스의 레퍼런스를 정수로 보여주는 id 함수가 있다. 또한 클래스와 인스턴스가 누구에 의 해 만들어졌는지에 대한 정보를 확인하는 type 메타 클래스도 있다.

● dir 함수: 객체 내부의 속성과 메서드 확인

● type 클래스: 객체를 누가 만들었는지에 대한 정보를 확인

● id 함수: 객체들의 레퍼런스를 정수로 확인

✚ 클래스 객체(class object)

파이썬에서 내장으로 제공하는 최상위 클래스인 object 클래스를 이용하여 클래스 내에 어떤 속성과 메서드가 만들어져있는지를 확인해보자.

예제 1-12 : object 클래스 내의 속성과 메서드 관리

최상위 클래스인 object 클래스를 가지고 내부의 속성을 확인한다. 클래스의 이름인 object로 출력하면 object 클래스라고 출력되고 object도 하나의 변수처럼 사용되는 것을 알 수 있다.

이 클래스의 레퍼런스를 id 함수로 확인하려 id 함수에 object를 넣어 실행시키면 정수로 레퍼런스 주소를 알려준다.

```python
In : print(object)
print(object.__str__(object))
print(id(object))
Out: <class 'object'>
<class 'object'>
```

클래스가 어느 클래스에 의해 만들어졌는지에 대한 정보는 _ _class_ _속성이 갖고 있다.

type 클래스를 이용하면 이 클래스를 만든 클래스를 표시하므로 동일한 정보를 출력한다.

Object 클래스의 이름은 _ _name_ _속성에 들어가 있는 것을 확인할 수 있다.

```python
In : print(object.__class__)
print(type(object))
print(object.__name__)
Out: <class 'type'>
<class 'type'>
object
```

또한, 이 object 클래스 내부에 가진 속성과 메서드를 출력하기 위해 dir 함수를 이용해서 출력하면 위에서 출력한 _ _class_ _, _ _name_ _ 속성도 들어가 있는 것을 알 수 있다.

클래스 object로 출력할 경우는 내부적으로 _ _str_ _ 메서드를 호출해서 출력하는 것이므 로 _ _str_ _을 호출해서 출력해도 동일한 결과를 출력하는 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(dir(object), width=60, compact=True)
print(object.__str__(object))
Out: ['__class__', '__delattr__', '__dir__', '__doc__', '__eq__',
'__format__', '__ge__', '__getattribute__', '__gt__',
'__hash__', '__init__', '__init_subclass__', '__le__',
'__lt__', '__ne__', '__new__', '__reduce__',
'__reduce_ex__', '__repr__', '__setattr__', '__sizeof__',
'__str__', '__subclasshook__']
<class 'object'>
```

예제 1-13 : 프로퍼티(property) 처리할 경우 속성 구분하기

파이썬에서 프로퍼티(property)는 속성(attribute)과 메서드(method)가 추가된 정보이다. 프 로퍼티가 어떻게 구성되는지도 간단히 알아본다.

클래스를 정의하고 하나의 메서드 위에 @property를 지정하면 메서드이면서 이름으로 호출이 가능한 구조를 구성한다. 속성이 아닌 메서드이지만 속성처럼 사용하면서 내부적 으로는 메서드가 실행되는 구조이다.

```python
In : class Klass :
@property
def Name(self) :
return Klass.__name__
```

Klass 클래스로 하나의 인스턴스를 만들어서 메서드 Name을 이름으로 호출하면 메서드 가 실행되어 클래스의 이름이 출력된다.

```python
In : c = Klass()
print(c.Name)
Out: Klass
```

✚ 인스턴스 객체(instance object)

사용자 정의 클래스(user defined class)를 정의하고 이 클래스를 기반으로 객체를 생성한 후 인스턴스를 만들어서 사용한다. 이 인스턴스 객체가 어떻게 클래스를 위해 생성되는지 를 확인하고 인스턴스 객체 내부에서 관리하는 속성들이 무엇인지를 확인한다.

예제 1-14 : 사용자 클래스에 대한 인스턴스 객체 확인하기

사용자 클래스 Person을 정의하고 인스턴스를 생성할 때 기본적으로 속성을 생성하는 스 페셜 메서드인 _ _init_ _가 정의된다. 이 _ _init_ _ 메서드는 클래스에서 인스턴스를 생성 할 때 이 내부에 정의된 매개변수(parameter)를 클래스에 인자로 받는다. 이 인자를 가지고 인스턴스 내부 속성에 값을 생성한다.

그리고 인스턴스 메서드인 getName을 정의하고 이 메서드는 인스턴스 내의 속성 name 을 반환한다.

```python
In : class Person :
def __init__(self,name) :
self.name = name
def getName(self) :
return self.name
```

Person 클래스 이름과 호출 연산자 괄호, 그리고 매개변수 name에 맞는 인자로 문자열 “요한”을 넣었다. 클래스는 인스턴스를 생성한 후 변수 p에 할당된다.

인스턴스 내부에 어떤 속성이 있는지를 확인하기 위해서 인스턴스의 속성인 _ _dict_ _로 조회하면 인스턴스 내부에 name을 키로 하고 요한을 값으로 하는 딕셔너리 타입이 있는 것을 확인할 수 있다.

```python
In : p = Person("요한")
print(p.__dict__)
Out: {'name': '요한'}
```

Person 클래스 내의 속성을 확인하기 위해 클래스 내의 속성인 _ _dict_ _로 조회하면 내 부에 _ _init_ _, getName 메서드가 있는 것을 확인할 수 있다. _ _doc_ _, _ _module_ _ 등 모든 클래스를 정의하면 만들어지는 속성들도 확인할 수 있다.

```python
In : import pprint
pprint.pprint(Person.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Person' objects>,
'__doc__': None,
'__init__': <function Person.__init__ at 0x109ded950>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Person' objects>,
'getName': <function Person.getName at 0x109ded8c8>})
```

✚ 내장 자료형(built-in data type)의 클래스 정보 확인

사용자 정의 클래스를 확인해봤으니 파이썬에서 제공하는 내장 클래스인 자료형에 대한 기본적인 사항을 확인해본다.

사용자 정의한 클래스와 내장 클래스 간의 차이점과 인스턴스에서의 차이점도 알아본다.

예제 1-15 : float 클래스 내부의 일반 속성과 메서드 조회

클래스 float를 출력해보면 클래스라고 표시해준다.

```python
In : print(float)
Out: <class 'float'>
```

내장 클래스인 float 내의 속성과 메서드를 dir 함수를 통해 확인하면 스페셜 속성들도 전 부 출력한다. dir 함수 실행 결과는 리스트 자료형이고 내부의 원소들은 문자열로 제공되 므로 이를 for 순환문에 넣어 처리하면 리스트의 원소 하나하나씩 처리한다.

스페셜 속성과 메서드의 명명 규칙은 앞과 뒤에 두 개의 언더스코어(_ _)가 붙어 있으므로 문자열 내의 메서드인 startswith문을 이용해서 인자로 “_”과 동일하면 출력을 하지 않도 록 처리하고 이 클래스만 가진 속성과 메서드를 출력하는 것을 확인할 수 있다.

```python
In : for i in dir(float) :
if not i.startswith("_") :
print(i)
Out: as_integer_ratio
conjugate
fromhex
hex
imag
is_integer
real
```

예제 1-16 : float 자료형의 인스턴스 확인하기

내장 자료형 float는 생성자 없이 리터럴로 직접 지정해도 인스턴스가 float 클래스에 의해 만들어진다. type 메타 클래스 내에 인스턴스를 넣으면 확인할 수 있다.

(1.0)이 float 클래스의 인스턴스이므로 내부 속성을 객체 접근 연산자인 점 연산자를 통해 내부의 real 속성에 접근해서 보관하는 값을 출력할 수 있다.

```python
In : print(type(1.0))
print((1.0).real)
Out: <class 'float'>
1.0
```

인스턴스인 (1.0)을 가지고 메서드를 호출하면 이 인스턴스의 상태 변화를 확인할 수 있다.

점 연산자를 통해 is_integer( ) 메서드를 호출해서 이 인스턴스의 값이 정수로 변환이 가 능한지를 확인하면 결과는 True로 출력한다.

```python
In : print(type((1.0)))
print((1.0).is_integer())
Out: <class 'float'>
True
```

## 1.3.2 파이썬 기본 내장 함수 이해

파이썬은 공통으로 사용하는 다양한 함수를 제공한다. 내장으로 만들어진 기본 함수에 대 한 사용법을 알아본다.

✚ 내장 자료형 int에 대한 help 조회

정수값을 관리하는 int는 함수가 아닌 클래스이며 내부의 속성과 메서드에 대한 정보를 출력한다.

예제 1-17 : help 보기

내장 함수 help는 int 클래스가 어떻게 작동하는지를 알 수 있다. 일단 내장 클래스 int를 이용해서 생성하면 정수가 나오고 base로 진법을 넣어서 처리할 수 있다.

```python
In : help(int)
Out: Help on class int in module builtins:
class int(object)
| int(x=0) -> integer
| int(x, base=10) -> integer
|
| Convert a number or string to an integer, or return 0 if no arguments
| are given. If x is a number, return x.__int__(). For floating point
| numbers, this truncates towards zero.
|
| If x is not a number or if base is given, then x must be a string,
| bytes, or bytearray instance representing an integer literal in the
| given base. The literal can be preceded by '+' or '-' and be
| surrounded by whitespace. The base defaults to 10. Valid bases are
| 0 and 2-36.
| Base 0 means to interpret the base from the string as an integer
| literal.
| >>> int('0b100', base=0)
| 4
|
| Methods defined here:
|
| __abs__(self, /)
|   abs(self)
|
| __add__(self, value, /)
|   Return self+value.
|
| __and__(self, value, /)
|   Return self&value.
|
| __bool__(self, /)
|   self != 0
|
| __ceil__(...)
|   Ceiling of an Integral returns itself.
|
| __divmod__(self, value, /)
|   Return divmod(self, value).
|
| __eq__(self, value, /)
|   Return self==value.
|
| __float__(self, /)
|   float(self)
|
| __floor__(...)
|   Flooring an Integral returns itself.
|
| __floordiv__(self, value, /)
|   Return self//value.
|
| __format__(...)
|   default object formatter
|
| __ge__(self, value, /)
|   Return self>=value.
|
| __getattribute__(self, name, /)
|   Return getattr(self, name).
|
| __getnewargs__(...)
|
| __gt__(self, value, /)
|   Return self>value.
|
| __hash__(self, /)
|   Return hash(self).
|
| __index__(self, /)
|   Return self converted to an integer, if self is suitable for use
|   as an index into a list.
|
| __int__(self, /)
|   int(self)
|
| __invert__(self, /)
|   ~self
|
| __le__(self, value, /)
|   Return self<=value.
|
| __lshift__(self, value, /)
|   Return self<<value.
|
| __lt__(self, value, /)
|   Return self<value.
|
| __mod__(self, value, /)
|   Return self%value.
|
| __mul__(self, value, /)
|   Return self*value.
|
| __ne__(self, value, /)
|   Return self!=value.
|
| __neg__(self, /)
|   -self
|
| __new__(*args, **kwargs) from builtins.type
|   Create and return a new object. See help(type) for accurate
|   signature.
|
| __or__(self, value, /)
|   Return self|value.
|
| __pos__(self, /)
|   +self
|
| __pow__(self, value, mod=None, /)
|   Return pow(self, value, mod).
|
| __radd__(self, value, /)
|   Return value+self.
|
| __rand__(self, value, /)
|   Return value&self.
|
| __rdivmod__(self, value, /)
|   Return divmod(value, self).
|
| __repr__(self, /)
|   Return repr(self).
|
| __rfloordiv__(self, value, /)
|   Return value//self.
|
| __rlshift__(self, value, /)
|   Return value<<self.
|
| __rmod__(self, value, /)
|   Return value%self.
|
| __rmul__(self, value, /)
|   Return value*self.
|
| __ror__(self, value, /)
|   Return value|self.
|
| __round__(...)
|   Rounding an Integral returns itself.
|   Rounding with an ndigits argument also returns an integer.
|
| __rpow__(self, value, mod=None, /)
|   Return pow(value, self, mod).
|
| __rrshift__(self, value, /)
|   Return value>>self.
|
| __rshift__(self, value, /)
|   Return self>>value.
|
| __rsub__(self, value, /)
|   Return value-self.
|
| __rtruediv__(self, value, /)
|   Return value/self.
|
| __rxor__(self, value, /)
|   Return value^self.
|
| __sizeof__(...)
|   Returns size in memory, in bytes
|
| __str__(self, /)
|   Return str(self).
|
| __sub__(self, value, /)
|   Return self-value.
|
| __truediv__(self, value, /)
|   Return self/value.
|
| __trunc__(...)
|   Truncating an Integral returns itself.
|
| __xor__(self, value, /)
|   Return self^value.
|
| bit_length(...)
|   int.bit_length() -> int
|
|   Number of bits necessary to represent self in binary.
|   >>> bin(37)
|   '0b100101'
|   >>> (37).bit_length()
|   6
|
| conjugate(...)
|   Returns self, the complex conjugate of any int.
|
| from_bytes(...) from builtins.type
|   int.from_bytes(bytes, byteorder, *, signed=False) -> int
|
|   Return the integer represented by the given array of bytes.
|
|   The bytes argument must be a bytes-like object (e.g. bytes or
|   bytearray).
|
|   The byteorder argument determines the byte order used to
|   represent the integer.
|   If byteorder is 'big', the most significant byte is at the
|   beginning of the byte array. If byteorder is 'little', the most
|   significant byte is at the end of the byte array. To request
|   the native
|   byte order of the host system, use `sys.byteorder' as the byte
|   order value.
|
|   The signed keyword-only argument indicates whether two's
|   complement is
|   used to represent the integer.
|
| to_bytes(...)
|   int.to_bytes(length, byteorder, *, signed=False) -> bytes
|
|   Return an array of bytes representing an integer.
|
|   The integer is represented using length bytes. An OverflowError
|   is raised if the integer is not representable with the given
|   number of bytes.
|
|   The byteorder argument determines the byte order used to
|   represent the
|   integer. If byteorder is 'big', the most significant byte is at
|   the beginning of the byte array. If byteorder is 'little',
|   the most significant byte is at the end of the byte array.
|   To request the native byte order of the host system,
|   use `sys.byteorder' as the byte order value.
|
|   The signed keyword-only argument determines whether two's
|   complement is
|   used to represent the integer. If signed is False and a negative
|   integer is given, an OverflowError is raised.
|
| ------------------------------------------------------------------
| Data descriptors defined here:
|
| denominator
|   the denominator of a rational number in lowest terms
|
| imag
|   the imaginary part of a complex number
|
| numerator
|   the numerator of a rational number in lowest terms
|
| real
|   the real part of a complex number
```

내장 클래스에 10을 넣고 생성해도 10이 표시된다. 문자열 ‘0b10’은 2진법으로 표기되어 있다는 정보를 함께 주면 정수로 변환한다. 2진수이기 때문에 base=2를 넣어 문자열인 2 진수를 10진수로 변환해서 출력하는 것을 알 수 있다.

```python
In : int(10)
Out: 10
In : int('0b10',base=2)
Out: 2
```

✚ 사용자 정의 함수와 클래스에 docstring 처리하기

사용자 정의 함수나 클래스에는 내부 속성 _ _doc_ _에 도움말인 docstring을 넣을 수 있다.

사용자 정의 함수나 클래스의 헤드를 정의한 후 바로 밑에 “ ” ” “ ” ”, ‘ ’’ ‘ ’’으로 도움말을 정의 하면 로딩하는 시점에 자동으로 _ _doc_ _에 저장된다.

이를 help 함수로 호출하면 이 정보를 가져와 출력한다.

예제 1-18 : 함수 내부의 도움말 추가

함수를 정의하고 바로 아래에 함수에 대한 설명을 추가할 수 있다.

```python
In : def kor_root() :
```

""" 한글로 이 함수의 설명을 추가 """ pass 함수 내의 속성인 _ _doc_ _로 조회하면 함수 정의 바로 밑에 정의된 문자열이 저장된 것 을 알 수 있고 help 함수로 출력하면 함수명과 함수 설명이 출력되는 것을 알 수 있다.

```python
In : print(kor_root.__doc__)
help(kor_root)
Out: 한글로 이 함수의 설명을 추가
Help on function kor_root in module __main__:
kor_root()
```

한글로 이 함수의 설명을 추가

예제 1-19 : 클래스 내부의 도움말 추가

클래스를 정의할 때 헤더를 정의하고 로직을 정의하기 전에 이를 문자열로 추가하면 이것 이 _ _doc_ _에 할당이 된다.

```python
In : class Klass :
```

""" 한글로 이 클래스의 설명을 추가 """ pass 클래스 내의 _ _doc_ _ 속성을 출력하면 docstring이 출력된다. Help 함수를 출력하면 docstring가 내부의 정보와 같이 출력된다.

```python
In : print(Klass.__doc__)
help(Klass)
Out: 한글로 이 클래스의 설명을 추가
Help on class Klass in module __main__:
class Klass(builtins.object)
```

| 한글로 이 클래스의 설명을 추가

|

| Data descriptors defined here:

|

| __dict__

|   dictionary for instance variables (if defined)

|

| __weakref__

|   list of weak references to the object (if defined)

✚ 함수 print 처리 예시

출력을 하는 기본 함수가 print이다.

예제 1-20 : print 함수 출력

print 함수를 help로 조회하면 여러 개의 인자를 넣어서 전달할 수 있다. 내부에 sep, end, file, flush 등에 새로운 값을 줄 수 있다.

```python
In : help(print)
Out: Help on built-in function print in module builtins:
print(...)
print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
Prints the values to a stream, or to sys.stdout by default.
Optional keyword arguments:
file: a file-like object (stream); defaults to the current sys.stdout.
sep: string inserted between values, default a space.
end: string appended after the last value, default a newline.
flush: whether to forcibly flush the stream.
```

print 함수로 출력하려면 여러 개의 매개변수를 다음과 같이 입력 후 출력한다. 빈 공간이 하나 더 들어가서 출력된다.

```python
In : print("Hello", "World")
Out: Hello World
```

함수 내부의 매개변수인 분리자(sep)에 쉼표 “,” 를 넣고 출력하면 문자열 중간에 쉼표가 표시된다.

```python
In : print("Hello", "World",sep=",")
Out: Hello,World
```

함수 내부의 매개변수인 end는 기본값이 개행 문자이다. 이곳에 다른 문자를 주면 맨 뒤 에 ***가 출력된다.

```python
In : print("Hello", "World",end="***")
Out: Hello World***
```

## 1.3.3 메타 클래스(meta class): type class

파이썬 언어는 클래스를 생성하는 별도의 클래스를 만들어서 관리한다. 클래스를 만드는 클래스는 메타 클래스이고 type class를 내장으로 제공한다.

보통 이 메타 클래스의 사용 용도는 일반적인 사용자 정의 클래스(class)와 인스턴스 (instance)가 누구에 의해 만들어졌는지를 확인하는 함수처럼 사용된다.

메타 클래스에 대한 다양한 용도는 객체지향을 설명하는 장에서 상세히 다루고, 여기서는 간단히 메타 클래스가 어떻게 사용되는지를 알아본다.

✚ help 함수를 이용해서 type class 조회

내장 함수 help를 이용해서 메타 클래스인 type이 어떤 기능이 있는지를 확인한다.

예제 1-21 : 메타 클래스인 type 조회

메타 클래스의 이름으로 출력하면 이 type이라는 변수가 가리키고 있는 class type이라는 것을 출력한다. 내장 함수 help를 이용해서 출력하면 2가지 기능을 하는 것을 확인할 수 있다.

인스턴스를 인자로 전달하면 이 인스턴스를 만든 클래스의 정보를 보여주고 클래스명, 상 속 관계, 네임스페이스를 인자로 전달하면 새로운 클래스를 만들어준다.

```python
In : print(type)
help(type)
Out: <class 'type'>
Help on class type in module builtins:
class type(object)
| type(object_or_name, bases, dict)
| type(object) -> the object's type
| type(name, bases, dict) -> a new type
|
| Methods defined here:
|
| __call__(self, /, *args, **kwargs)
|   Call self as a function.
|
| __delattr__(self, name, /)
|   Implement delattr(self, name).
|
| __dir__(...)
|   __dir__() -> list
|   specialized __dir__ implementation for types
|
| __getattribute__(self, name, /)
|   Return getattr(self, name).
|
| __init__(self, /, *args, **kwargs)
|   Initialize self. See help(type(self)) for accurate signature.
|
| __instancecheck__(...)
|   __instancecheck__() -> bool
|   check if an object is an instance
|
| __new__(*args, **kwargs)
|   Create and return a new object. See help(type) for accurate
|   signature.
|
| __prepare__(...)
|   __prepare__() -> dict
|   used to create the namespace for the class statement
|
| __repr__(self, /)
|   Return repr(self).
|
| __setattr__(self, name, value, /)
|   Implement setattr(self, name, value).
|
| __sizeof__(...)
|   __sizeof__() -> int
|   return memory consumption of the type object
|
| __subclasscheck__(...)
|   __subclasscheck__() -> bool
|   check if a class is a subclass
|
| __subclasses__(...)
|   __subclasses__() -> list of immediate subclasses
|
| mro(...)
|   mro() -> list
|   return a type's method resolution order
|
| ------------------------------------------------------------------
| Data descriptors defined here:
|
| __abstractmethods__
|
| __dict__
|
| __text_signature__
|
| ------------------------------------------------------------------
| Data and other attributes defined here:
|
| __base__ = <class 'object'>
|   The most base type
|
| __bases__ = (<class 'object'>,)
|
| __basicsize__ = 864
|
| __dictoffset__ = 264
|
| __flags__ = -2146675712
|
| __itemsize__ = 40
|
| __mro__ = (<class 'type'>, <class 'object'>)
|
| __weakrefoffset__ = 368
✚ 타입 체크하기
```

위의 도움말 기능 중에 첫 번째인 클래스와 인스턴스의 자료형에 대한 체크를 해보고 어떠 한 결과가 나오는지를 확인해보자.

예제 1-22 : int 클래스와 정수 인스턴스 타입 체크

내장 클래스인 int를 출력하면 int가 클래스라는 것을 확인할 수 있다. 이 클래스가 어느 클래스에 의해 만들어졌는지를 확인하면 <class ‘type’>이 출력된다.

또한, 정수 100을 아래와 같이 확인해보면 int 클래스에 의해 만들어진 것을 확인할 수 있다.

```python
In : print(int)
print(type(int))
print(type(100))
Out: <class 'int'>
<class 'type'>
<class 'int'>
```

## 1.3.4 내장 자료형(built-in data type)

파이썬은 객체지향을 수용해서 구현되어 처리되는 모든 값을 객체로 관리한다. 그리고 기 본적인 클래스를 내장 자료형으로 제공해서 사용하도록 지원한다.

데이터 모델의 핵심도 파이썬에서 어떻게 자료형을 관리하는지를 이해하는 것이므로 내장 자료형을 파악하면서 데이터 모델에 대한 개념을 알 수 있다.

✚ 아무 것도 없는 자료형(None data type)

프로그램을 작성할 때 내부의 값으로 가져야 할 것들 중에 아무런 값도 없다는 것을 정의 한다. 보통 다른 프로그램 언어에서는 Null이 많이 사용되지만 파이썬에서는 None으로 정의한다.

이 표현은 변수 등으로 사용하지 못하도록 키워드로 관리하고 이 데이터 자료형은 하나의 인스턴스만 사용한다.

예제 1-23 : None 타입의 None 인스턴스 확인

None은 하나의 인스턴스이므로 type으로 어느 클래스에 의해 생성되었는지 확인하면 클 래스 NoneType이라는 것을 알 수 있다.

```python
In : print(None)
print(type(None))
Out: None
<class 'NoneType'>
```

함수 func을 정의하였지만 pass를 사용해서 내부적으로 아무런 일을 하지 않는다. 이 함 수를 실행하면 실행된 결과가 없다. 하지만 파이썬에서는 return이 없는 함수여도 아무런 일을 하지 않으므로 None을 자동으로 반환한다.

이 함수의 처리 결과를 변수에 할당한 후에 출력해보면 None이 출력되는 것을 확인할 수 있다.

```python
In : def func() :
pass
a = func()
print(a)
Out: None
```

✚ 숫자 자료형(number data type)

숫자는 자기 자신만을 갖는 인스턴스를 만들어서 사용하므로 하나의 원소만을 가진 원자 (atom) 타입으로 사용한다.

파이썬에서 제공되는 숫자 자료형에는 정수(int), 실수(float), 복소수(complex)가 있다.

예제 1-24 : 숫자 클래스를 만든 메타 클래스 확인

정수, 실수, 복소수가 클래스인 것을 확인하기 위해 메타 클래스 type에 인자로 넣어 확인 하면 이 클래스들이 전부 type 클래스에 의해 생성된 것을 확인할 수 있다.

```python
In : print(type(int), type(float), type(complex))
Out: <class 'type'> <class 'type'> <class 'type'>
```

✚ 시퀀스(Sequence) 자료형

여러 원소를 가지는 분자형 자료형에는 문자열(string), tuple, list, 바이트(bytes), 바이트 어레이(bytearray) 등을 제공한다.

● Sequence의 특징

1. 동 질성을 가지고 각 원소가 순서를 가지는 모임이다. 단, 리스트(list)만 동질성 보다 상위 수준인 객체 모임이다.

2. 순 서와 원소가 정해진 형태도 있지만 순서와 원소의 수가 고정적이지 않을 수 도 있다. 순서를 처리할 때는 index를 기준으로 처리가 된다.

3. S equence의 형태를 유지하면 기본 연산은 동일하게 처리된다. 단, 각 자료형 의 특징인 변경 가능 여부에 따라 내부의 원소를 갱신하거나 삭제할 수 있는 연산도 제공된다.

예제 1-25 : Sequence 자료형에 대한 메타 클래스 확인

문자열, 바이트 문자열, 바이트 문자열의 배열, 튜플, 리스트는 전부 type에 의해 만들어 진 것을 확인할 수 있다.

```python
In : print(str)
print(bytes)
print(bytearray)
print(type(str), type(bytes), type(bytearray))
Out: <class 'str'>
<class 'bytes'>
<class 'bytearray'>
<class 'type'> <class 'type'> <class 'type'>
In : print(tuple)
print(list)
print(type(tuple), type(list))
Out: <class 'tuple'>
<class 'list'>
<class 'type'> <class 'type'>
```

✚ 스트림(Stream) 형태 자료형

파이썬에서는 한 번 만들어지면 고정적으로 처리되는 정적인 sequence 자료형도 있지만 특정 시점에만 사용되는 동적인 Sequence 자료형인 스트림(stream)도 제공한다.

예제 1-26 : range 클래스

보통 반복적 처리를 위해 사용되는 range 클래스이지만 시작, 종료, 간격 등을 주고 구성 하면 호출된 결과가 한 번 사용되고 사라진다. 사용할 때마다 정의해서 사용하는 구조를 제공한다.

```python
In : print(range)
print(type(range))
Out: <class 'range'>
<class 'type'
```

✚ Mapping 형태 자료형(data type)

순서에 상관없이 키와 값을 쌍으로 구성해서 관리하는 자료형인 매핑 자료형, 즉 사전형 자료형(dictionary data type)인 딕셔너리(dict)가 있다.

예제 1-27 : 딕셔너리(dict) 클래스를 만든 메타 클래스

딕셔너리도 클래스이고 이를 print하면 클래스 정보가 나오지만 type으로 출력하면 type 에 의해 만들어졌다는 것을 표시한다.

```python
In : print(dict)
print(type(dict))
Out: <class 'dict'>
<class 'type'>
```

✚ Set 형태 자료형

집합형(Set data type)인 set, frozenset 자료형을 제공한다. set 자료형에는 원소에 대한 변 경이 가능한 set과 변경이 불가한 frozenset이 있다.

예제 1-28 : Set 클래스를 만든 메타 클래스

클래스를 출력하면 자기 자신을 보여주지만 type으로 클래스를 확인하면 메타 클래스로 만들었다는 내용을 출력한다.

```python
In : print(set)
print(frozenset)
print(type(set), type(frozenset))
Out: <class 'set'>
<class 'frozenset'>
<class 'type'> <class 'type'>
```

## 1.3.5 객체 비교 방식(is, = =), 레퍼런스 확인 함수

모든 값이 객체이므로 객체 간의 비교를 어떻게 할지도 중요하다. 파이썬은 동일한 객체를 비교하는 is 키워드도 존재하고 동일한 원소를 가졌는지를 확인하는 == 연산자도 있다.

객체 레퍼런스의 동일 여부를 is로 확인할 수 있지만, 파이썬은 관행상 내부 처리하는 is를 권고하지 않는다. 동일한 객체로 인식되는 경우에도 내부적으로 동일하지 않게 관리하기 에 객체를 비교할 경우에는 == 연산으로 처리하는 것을 권고한다.

굳이 레퍼런스를 점검하고 싶을 경우에는 id 함수를 이용해서 레퍼런스를 비교하는 것이 더 맞을 수도 있다.

✚ 키워드 is

is는 두 객체가 동일한 객체인지 확인할 때 사용하지만 일부 내장 객체 등을 처리할 때 여 러 개의 인스턴스를 만들어서 처리되므로 동일한 인스턴스가 아닌 경우가 발생한다.

객체의 유일함이 보장되는 None 같은 경우는 is를 사용해도 좋다.

예제 1-29 : 인스턴스의 주소 확인 및 동일한 객체 여부 점검하기

정수 1을 변수 i와 j에 할당한다. 정수는 프로그램을 실행할 때마다 항상 동일한 객체이므 로 is 키워드로 비교하면 True가 반환된다.

```python
In : i = 1
j = 1
print(id(i))
print(id(j))
print(i is j)
Out: 1528412624
True
```

정수 257를 두 변수에 할당했다. 정수이므로 동일한 객체가 맞지만 내부적으로는 두 개의 인스턴스를 만들어서 관리하므로 is 키워드로 비교할 경우 False가 나온다.

```python
In : i = 257
j = 257
print(id(i))
print(id(j))
print(i is j)
Out: 79950544
False
```

✚ 원소의 동일한지 체크: = = 연산자, id 함수

== 연산자는 두 인스턴스 객체 간 원소들을 비교해서 같으면 True를 표시한다. 파이썬은 내장 자료형 중에 정수, 실수 등은 같은 값이 동일한 레퍼런스를 유지하지만 파이썬 내부 적으로 두 개의 다른 인스턴스 객체를 만들 경우도 있으므로 객체의 비교는 == 연산자를 권고한다. 객체들의 레퍼런스는 id 함수로 조회한다.

예제 1-30 : 인스턴스 내 원소의 동등성 점검하기

두 개의 리스트를 정의해서 두 개의 리스트 인스턴스 객체의 레퍼런스(reference)를 출력 한다.

두 개 리스트의 원소들이 동일한지를 == 연산자로 비교하면 동일한 원소들로 구성되었으 므로 True라고 표시한다.

```python
In : l1 = [1,2,3]
l2 = [1,2,3]
print(id(l1))
print(id(l2))
print(l1 == l2)
Out: 79744840
True
```

## 1.3.6 자료형의 변환(Mutation)

클래스에 의해 생성된 인스턴스들을 다른 클래스에 의해 생성된 것처럼 변환해서 처리할 경우가 많다.

프로그래밍 언어마다 내부적으로 동일한 자료형만 연산을 처리할 수 있도록 구성하고 다

른 자료형일 때는 형 변환을 통해 연산을 처리하도록 구성이 된다.

파이썬에서 인스턴스들이 다른 자료형을 가질 경우 어떻게 처리되는지 알아본다.

✚ 자료형 변경 가능 여부

일단 형 변환에 앞서 클래스로 생성된 인스턴스 내부의 값을 변경할 수 있는지 알아야 한다.

파이썬 자료형은 단일 원소만 가지는 경우 변경을 할 수 없다. 문자열은 단일 원소는 아니 지만 문자열이 생성되면 단일 원소로 처리가 되어 변경이 불가능하다.

다양한 원소를 가진 자료형인 경우는 기본으로 변경할 수 있지만 객체를 변경하는 것이 아 닌 내부에 있는 원소들을 추가하거나 변경을 할 수 있는 구조로 만들어져 있다.

이런 변경 가능(Mutable)과 변경 불가능(Immutable)이라는 용어를 먼저 이해해보자.

● 변경 가능 : Mutable

다양한 원소들로 구성된 자료형일 경우 원소의 추가나 삭제 등이 가능한 리스트, 딕셔너리 등이 속한다. 사용자 정의 클래스는 여기에 속한다.

● 변경 불가능 : Immutable

하나의 원소로 구성될 경우는 원소가 하나밖에 없으므로 원소를 변경하는 것 자 체가 객체를 대체하는 것이다. 내부적으로 원소를 변경하는 메서드가 존재하지만 이럴 경우 새로운 인스턴스를 만들어서 처리한다. 즉 새로운 인스턴스를 만들어 서 대체하는 것이지 변경을 하는 것이 아니다. 내장 클래스인 정수, 실수, 복소수, 문자열 등이 이에 속한다.

예제 1-31 : 변경 불가능한 문자열 대체 및 형 변환

문자열 자료형은 변경이 불가능한 단일 원소로 구성된 자료형이다. 일단 문자열 리터럴로 Hello와 World를 정의하고 각각 인스턴스의 레퍼런스를 id 함수로 조회해서 인스턴스의 레퍼런스가 다른지를 확인한다.

```python
In : sh = "Hello"
print(id(sh))
sw = "World"
print(id(sw))
Out: 93496688
```

두 개의 문자열을 하나로 합칠 경우 다른 인스턴스가 생기는 것을 id 함수로 조회하면 확인할 수 있다. 변수 내에 할당된 것을 확인하면 ‘HelloWorld’가 출력되는 것을 볼 수 있다.

```python
In : sh += sw
print(id(sh))
print(sh)
Out: 93538736
HelloWorld
```

하나의 문자열을 정의하고 다른 자료형인 리스트로 변환한 뒤 동일한 변수에 할당하면 변 수명은 값을 가르키는 역할만 해서 자료형이 변환되는 것을 알 수 있다.

```python
In : sp = "Seoul"
print(type(sp))
sp = list(sp)
print(type(sp))
print(sp)
Out: <class 'str'>
<class 'list'>
['S', 'e', 'o', 'u', 'l']
```

예제 1-32 : 변경 가능한 리스트에 문자열을 원소로 처리

두 개의 리스트를 만든다. 하나의 리스트에는 문자열을 원소로 해서 구성하고 다른 리스 트에는 정수로만 원소를 구성한다.

이 리스트로 만들어진 인스턴스의 레퍼런스를 출력하면 두 개가 다르다는 것을 보여준다.

```python
In : ls = ['a','b','c']
print(id(ls))
li = [1,2,3]
print(id(li))
Out: 93537288
```

두 개의 리스트를 하나로 결합해보면 리스트 내의 원소는 추가되었지만 원래 가진 리스트 의 레퍼런스는 변하지 않는 것을 확인할 수 있다. 변경 가능하다는 것은 원소들이 변한다

는 의미임을 확인할 수 있다.

```python
In : ls += li
print(id(ls))
print(ls)
Out: 93537288
['a', 'b', 'c', 1, 2, 3]
```
