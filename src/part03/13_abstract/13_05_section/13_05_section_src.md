---
layout: default
title: "13.05 타입"
---

# 13.05 타입

파이썬 3.6 버전부터 정적 분석을 하는 다양한 개발 툴을 사용하거나 변수에 자료형을 붙 여서 사용할 수 있도록 만들었다. 이를 타입 힌트(type hint)라고 부른다.

일단 프로그램을 작성할 때 이 표기법을 사용해도 파이썬 내부의 인터프리터는 단순히 주 석으로 처리된다. 파이썬에 추가된 기능이므로 어떻게 처리하게 되는지를 간단히 알아보 기로 하겠다.

## 13.5.1 type annotation을 작성하는 이유

Type annotation은 파이참(pycharm) 등 파이썬 개발 도구 내의 유형 검사기에서 추가적 인 타입에 대한 주석을 처리할 수 있는 기능을 추가한 것이다. 코딩할 때 작성해도 예외가 발생하지 않지만 global, nonlocal 키워드와 사용하면 예외가 발생한다.

✚ 왜 형식 검사기(type checker)인가?

● 주석이 달린 코드를 이용해서 버그를 더 빨리 발견할 수 있다.

● 많은 프로그램을 위해서 정적 분석(static analysis)를 실행할 때 도움을 준다.

✚ 왜 힌트를 입력해야 하는가?

● 형식 검사기에 도움말을 제공하고 동적인 파이썬 프로그램 객체의 흐름을 따라

실행하기는 어렵지만 개발 도구 내에서 정적인 분석을 위해 사용된다.

● 문서를 작성할 때 타입에 대한 정보를 제공하므로 많은 도움이 된다.

## 13.5.2 함수 등의 docstring을 가지고 테스트하기

파이썬에서는 함수 등의 주석인 도움말을 작성해서 docstring으로 등록할 수 있다.

Docstring에 실행할 예제를 넣고 doctest를 실행하면 동일한 결과가 나오는지를 확인할 수 있다.

주석을 테스트로 사용할 수 있어 간단한 예제를 테스트할 용도로 사용이 가능하다. 지금 부터 예제 테스트를 하는 방법을 알아보겠다.

✚ 실행 명령으로 doctest 실행하기

함수 등에 사용하는 docstring에 특정 함수 호출과 실행을 주고 실행한 결과가 맞는지 확 인할 수 있는 기능을 제공한다. 여러 함수들도 동시에 간단하게 docstring을 작성한 것을 가지고 테스트할 수 있다.

예제 13-24 : doctest하기

주피터 노트북에서 –m과 doctest를 넣어 실행하고 –v는 처리에 대한 기록을 남긴다.

전체 명령은 !python -m doctest -v doctest_simple1.py(파일명)으로 처리하면 된다.

doctest를 할 경우는 함수를 처리할 때 테스트의 내용을 함수 밑에 정의해서 처리한다.

Docstring 내부에 테스트할 로직은 >>> 다음에 놓고 결과는 바로 밑에 적는다. 아래의 로직은 >>> 다음에 이 함수를 호출하는 명령을 작성했고 그 밑에 결과를 적었다.

이를 doctest로 실행하면 이 주석의 내용을 그대로 실행해서 결과값이 같은지 확인해 준다.

```python
In : %%writefile doctest_simple1.py
def my_function(a, b):
"""
>>> my_function(2, 3)
>>> my_function('a', 3)
'aa'
"""
return a * b
Out: Overwriting doctest_simple1.py
```

테스트를 하기 위해 에러 부분을 넣었다. 이 함수가 실행되면 결과값이 실제 aaa로 출력되 어야 한다. 파이썬 내의 doctest를 이용해서 사용할 경우는 어떻게 처리되는지를 한번 확 인해보겠다.

```python
In : !python -m doctest -v doctest_simple1.py
Out: Trying:
my_function(2, 3)
Expecting:
ok
Trying:
my_function('a', 3)
Expecting:
'aa'
*********************************************************************
File "C:\Users\06411\Documents\GitHub\python_book\python_gram\doctest_
simple1.py", line 5, in doctest_simple1.my_function
Failed example:
my_function('a', 3)
Expected:
'aa'
Got:
'aaa'
1 items had no tests:
doctest_simple1
*********************************************************************
1 items had failures:
1 of 2 in doctest_simple1.my_function
2 tests in 2 items.
1 passed and 1 failed.
***Test Failed*** 1 failures.
```

타입 힌트를 처리하기 위해 TypeVar를 통해 하나의 타입 자료형을 만들고 int, float, complex가 처리될 수 있도록 했다.

Iterable 자료형 내부는 Tuple 클래스이고 그 내부는 2개의 새로 만들 자료형을 원소로 가져야 한다.

함수 inproduct를 처리할 때 정수의 값이 들어오면 튜플 내에 들어온 두 수를 곱한 결과 를 처리한다.

함수 dilate은 반복형을 받고 정수가 들어오면 곱해서 반복형의 원소를 정수배만큼 확장하 지만 제너레이터 표현식으로 결과를 반환한다.

두 개의 함수 예제를 docstring에 넣어서 처리하면 하나는 성공이지만 하나는 실패가 나 온다. 실행을 할 경우도 주석을 무시하고 로직상으로 처리되는 것만 실행되는 것을 알 수 있다.

```python
In : %%writefile doctest_simple2.py
from typing import TypeVar, Iterable, Tuple
T = TypeVar('T', int, float, complex)
Vector = Iterable[Tuple[T, T]]
def inproduct(v: Vector[T]) -> T:
"""
>>> inproduct([(1,2)])
"""
return sum(x*y for x, y in v)
def dilate(v: Vector[T], scale: T) -> Vector[T]:
"""
>>> dilate([(1,2)],"a")
"""
return ((x * scale, y * scale) for x, y in v)
Out: Writing doctest_simple2.py
```

실행하면 dilate는 제너레이터를 생성한 결과가 나오므로 기대했던 정수가 아니라서 테스 트 실패라고 보여준다.

```python
In : !python -m doctest -v doctest_simple2.py
Out: Trying:
dilate([(1,2)],"a")
Expecting:
*********************************************************************
File "C:\Users\06411\Documents\GitHub\python_book\python_gram\doctest_
simple2.py", line 15, in doctest_simple2.dilate
Failed example:
dilate([(1,2)],"a")
Expected:
Got:
<generator object dilate.<locals>.<genexpr> at 0x0000000002AD4518>
Trying:
inproduct([(1,2)])
Expecting:
ok
1 items had no tests:
doctest_simple2
1 items passed all tests:
1 tests in doctest_simple2.inproduct
*********************************************************************
1 items had failures:
1 of 1 in doctest_simple2.dilate
2 tests in 3 items.
1 passed and 1 failed.
***Test Failed*** 1 failures.
```

## 13.5.3 typing 모듈 이해하기

별도의 annotation 처리를 위해 타입에 대한 별도의 클래스들을 정의한 모듈이 typing 이다.

이 모듈 내에 자료형을 만들어서 새로운 자료형도 만들 수 있도록 구성되었으므로 파이썬 에서 제공하는 자료형과 어떤 차이가 있는지를 알아보겠다.

✚ Generic 자료형 이해하기

자료형 중에 최상위 자료형은 Generic이다. 이 자료형을 기반으로 상세한 자료형을 만들 어서 처리하므로 최상위 자료형부터 이해해보겠다.

예제 13-25 : Genercic 타입 구조

이 typing 모듈도 내부의 자료형을 클래스로 만들었다. 파이썬 기준을 보면 클래스는 항 상 메타 클래스에 의해 만들어지므로 이 모듈도 동일한 원칙을 따르고 있는지를 확인해 본다.

Generic 클래스는 메타 클래스인 GenericMeta를 위해 만들어졌고 모든 힌트는 Generic 클래스가 기본으로 처리된다는 것을 알 수 있다.

```python
In : import typing
print(typing.Generic.__bases__)
print(typing.Generic.__class__)
Out: (<class 'object'>,)
<class 'typing.GenericMeta'>
```

GenericMeta는 어느 클래스를 상속해서 만들었는지를 확인해보면 TypingMeta, ABCMeta를 사용한 것을 알 수 있고 이 클래스는 type 메타 클래스에 의해 만들어졌다.

```python
In : print(typing.GenericMeta.__bases__)
print(typing.GenericMeta.__class__)
Out: (<class 'typing.TypingMeta'>, <class 'abc.ABCMeta'>)
<class 'type'>
```

함수 add가 정의될 때 기본으로는 매개변수명도 정의한다. 파이썬은 기본적으로 변수나 매개변수에 특정 자료형을 부여해서 한정할 수 없다.

이 함수를 정의할 때 매개변수에 typing에서 제공하는 자료형인 Generic도 정의해서 사 용할 수 있다.

테스트를 해보려고 한다. 문자열과 정수의 덧셈일 경우에는 예외가 발생하므로 traceback 과 예외 TypeError를 처리 결과로 표시했다.

```python
In : %%writefile var1.py
import typing
def add(x:typing.Generic, y:typing.Generic) :
"""
>>> add(10,10)
>>> add("Hello", "World")
'HelloWorld'
>>> add("Hello",10)
Traceback (most recent call last):
...
TypeError: must be str, not int
"""
return x+y
Out: Overwriting var1.py
```

이를 doctest로 실행해서 3개의 함수 호출을 확인해보면 전부 기대했던 대로 처리가 되는 것을 확인할 수 있다.

```python
In : !python -m doctest var1.py -v
Out: Trying:
add(10,10)
Expecting:
ok
Trying:
add("Hello", "World")
Expecting:
'HelloWorld'
ok
Trying:
add("Hello",10)
Expecting:
Traceback (most recent call last):
...
TypeError: must be str, not int
ok
1 items had no tests:
var1
1 items passed all tests:
3 tests in var1.add
3 tests in 2 items.
3 passed and 0 failed.
Test passed.
```

✚ 파이썬 내장 자료형과의 관계 확인하기

파이썬 내장 자료형과 타입 힌트 내 자료형 간의 기본적인 관계를 알아보고 타입 힌트와의 차이점을 이해해본다.

예제 13-26 : 자료형 간의 관계 알아보기

모듈 typing 내의 List, Tuple, Dict, Set, FrozenSet 클래스가 어느 클래스를 상속해서 만들어져 있는지를 확인해본다.

이 모듈의 자료형은 파이썬 자료형인 list, tuple, dict, set, frozenset을 상속해서 만들어 진 것을 확인할 수 있다.

```python
In : import typing as tp
print(tp.List.__bases__)
print(tp.Tuple.__bases__)
print(tp.Set.__bases__)
print(tp.FrozenSet.__bases__)
print(tp.Dict.__bases__)
Out: ((<class 'list'>, typing.MutableSequence)
(<class 'tuple'>,)
(<class 'set'>, typing.MutableSet)
(<class 'frozenset'>, typing.AbstractSet)
(<class 'dict'>, typing.MutableMapping)
```

모듈 typing 내의 List, Tuple, Dict, Set, FrozenSet과 파이썬 자료형인 list, tuple, dict, set, frozenset 간의 관계는 issubclass로 확인하면 전부 True로 표시한다.

```python
In : print(issubclass(list,tp.List))
print(issubclass(tuple,tp.Tuple))
print(issubclass(set,tp.Set))
print(issubclass(set,tp.MutableSet))
print(issubclass(frozenset,tp.FrozenSet))
print(issubclass(dict,tp.Dict))
print(issubclass(dict,tp.MutableMapping))
Out: True
True
True
True
True
True
True
```

문자열, 바이트, 바이트 어레이에 대한 특별한 클래스는 없으므로 Sequence, ByteString 을 가지고 처리한다.

```python
In : print(tp.Sequence.__bases__)
print(tp.MutableSequence.__bases__)
print(tp.ByteString.__bases__)
Out: (<class 'collections.abc.Sequence'>, typing.Reversible, typing.
Collection)
(<class 'collections.abc.MutableSequence'>, typing.Sequence)
(<class 'collections.abc.ByteString'>, typing.Sequence)
```

문자열과 바이트 문자열에 대한 처리도 issubclass로 점검해보면 전부 True로 표시한다.

```python
In : print(issubclass(str,tp.Sequence))
print(issubclass(bytes,tp.Sequence))
print(issubclass(bytes,tp.ByteString))
print(issubclass(bytearray,tp.ByteString))
Out: True
True
True
True
```

예제 13-27 : 문자열, 바이트 처리하는 예시

변수를 지정해서 문자열과 바이트 문자열을 처리할 수 있도록 AnyStr이라고 만들었다.

```python
In : from typing import TypeVar
AnyStr = TypeVar('AnyStr', str, bytes)
print(type(AnyStr))
Out: typing.TypeVar
```

일단 AnyStr을 하나의 변수로 확인하기 위해 지정한다. 파이썬에서는 바이트 문자열과 문 자열에 대한 처리에 예외가 발생하므로 동일한 자료형이 들어와야 한다.

```python
In : %%writefile String.py
from typing import TypeVar
AnyStr = TypeVar('AnyStr', str, bytes)
def concat(a: AnyStr, b: AnyStr) -> AnyStr:
"""
>>> concat("foo", "bar")
'foobar'
>>> concat(b"foo", b"bar")
b'foobar'
>>> concat("foo", b"bar")
Traceback (most recent call last):
...
TypeError: must be str, not bytes
"""
return a + b
Out: Writing String.py
```

함수의 docstring에 들어 있는 doctest를 가지고 내부적으로 테스팅해서 실행할 때 문 자열은 단일 인용 부호로만 처리되므로 단일 인용 부호로 문자열 처리의 결과를 넣어야 한다.

3가지 경우가 전부 실행되면 동일한 결과가 나오므로 정상으로 처리되는 것을 확인할 수 있다.

```python
In : !python -m doctest String.py -v
Out: Trying:
concat("foo", "bar")
Expecting:
'foobar'
ok
Trying:
concat(b"foo", b"bar")
Expecting:
b'foobar'
ok
Trying:
concat("foo", b"bar")
Expecting:
Traceback (most recent call last):
...
TypeError: must be str, not bytes
ok
1 items had no tests:
String
1 items passed all tests:
3 tests in String.concat
3 tests in 2 items.
3 passed and 0 failed.
Test passed.
```

타입 힌트에 대한 타입 체크는 추상 클래스인 typing.List로 체크해도 인스턴스 관계를 확 인할 수 있다. 이유는 typing.List가 list를 상속해서 만들어져 있기 때문이다.

```python
In : import typing
l : typing.List
l = [1,2,3,4]
def type_check(l) :
if isinstance(l, typing.List) :
return True
return False
print(type_check(l))
Out: True
```

예제 13-28 : 속성 주석을 처리하기

타입 힌트는 주석이기 때문에 딕셔너리 내에 대괄호 연산자인 _ _setitem_ _를 처리하 는 곳에도 지정할 수 있다. 값을 처리하므로 그 값에 들어갈 주석에 자료형을 처리할 수 있다.

또한 할당이 발생하지 않을 경우도 타입 힌트를 주고 처리하면 예외는 발생하지 않는다.

할당될 때까지 주석으로 인식한다.

```python
In : d = {}
d['a'] : int = 100
d['b'] : int
print(d)
Out: {'a': 100}
```

타입 힌트가 없이 딕셔너리를 검색해서 실행이 되면 주어진 딕셔너리의 키가 없으므로 예 외가 발생한다. 이런 예외가 발생하지 않으려면 위의 예제처럼 타입 힌트를 붙여 일단 주 석으로 처리해도 된다.

```python
In : d = {}
d['a'] : int = 100
d['b']
print(d)
Out: ---------------------------------------------------------------------
KeyError                Traceback (most recent call last)
<ipython-input-95-1b78388ab2a7> in <module>()
3 d['a'] : int = 100
----> 4 d['b']
6 print(d)
KeyError: 'b'
```

하나의 클래스를 정의하고 이 정의한 클래스의 속성에 할당할 때도 이 속성에 들어갈 자료 형을 타입 힌트로 표시했다.

타입 힌트가 표시된 후에 할당 연산자를 사용해서 값을 주면 속성이 네임스페이스로 들어 가지만 처리가 없다면 타입 힌트를 붙여서 주석으로만 사용한다.

```python
In : import pprint
class Klass :
pass
Klass.a : int = 100
Klass.b : int
pprint.pprint(Klass.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Klass' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass' objects>,
'a': 100})
```

클래스를 가지고 인스턴스를 만든 후에 이 인스턴스에 속성을 추가할 때도 클래스에서 처 리되는 경우와 동일하게 처리되는 것을 알 수 있다.

```python
In : class Klass :
pass
c = Klass()
c.a : int = 100
c.b : int
print(c.__dict__)
Out: {'a': 100}
```

✚ TypeVar 이해하기

위에서 간단하게 TypeVar를 만들어봤다. 이제 어떤 경우에 이 TypeVar를 만들어서 사 용하는지도 알아보겠다.

자료형을 아무 것도 정의하지 않으면 모든 것을 다 허용하고 두 개를 주면 _ _constraints _ _속성에 자료형을 보관하므로 이를 이용해서 타입 체크도 가능하다.

예제 13-29 : 새로운 타입을 생성해보기

typing 모듈에 필요한 타입을 만드는 것이므로 type 클래스처럼 하나의 메타 클래스인 TypeVar를 통해 만들어야 한다. 파이썬은 타입 클래스를 통해 클래스를 만들어야 하므 로 TypeVar는 TypingMeta에 의해 만들어져 있고 TypingMeta는 최상위 메타 클래스인 Type에 의해 만들어진 것을 확인할 수 있다.

```python
In : from typing import TypeVar
print(TypeVar.__bases__)
print(TypeVar.__class__)
print(isinstance(TypeVar, type))
Out: (typing._TypingBase,)
<class 'typing.TypingMeta'>
True
```

TypeVar로 새로운 자료형을 생성하면 _ _constrains_ _ 속성에 지정한 자료형을 보관하 고 있으므로 타입 체크를 하려면 이 내부의 클래스가 존재하는지를 비교하여 제한할 수 있다.

```python
In : from typing import TypeVar
T = TypeVar("T", str,bytes)
print(T, type(T))
print(T.__constraints__)
Out: ~T typing.TypeVar
(<class 'str'>, <class 'bytes'>)
```

함수 repeat을 만들어서 매개변수 x에 새로 지정한 T를 주석으로 표시했고 결과로는 T로 처리하도록 지정했다. 타입 체크할 때 T는 문자열과 정수를 처리하도록 구성했기에 내부 에 _ _constraints_ _가 생겨서 두 가지 타입을 체크할 수 있다.

```python
In : def repeat(x: T, y:int) -> T :
if type(x) in T.__constraints__ :
return x *y
else :
return TypeError(" type error")
```

repeat 함수에 문자열이나 바이트 문자열로 전달된 결과가 타입 체크에서 맞으면 배수만 큼 문자열이 늘어나는 것을 확인할 수 있다.

```python
In : print(repeat("str",3))
print(repeat(b"str",3))
Out: strstrstr
b'strstrstr'
```

예제 13-30 : Sequence 자료형 내부 첫 번째 원소 출력

특정 함수로 들어오는 변수에 대한 타입을 지정할 때 사용한다. List 자료형이면 가능하다

는 뜻이다. 그리고 TypeVar를 내부에 정의된 매개변수들의 자료형에 대해서 체크할 때 사용한다.

함수 first를 정의해서 TypeVar로 생성된 자료형과 동일할 경우 첫 번째 원소만 출력하도 록 정의했다.

```python
In : from typing import TypeVar, List
T = TypeVar("T", int,int)
def first(l:List[T]) -> T :
if issubclass(type(l),List) :
if type(l[0]) in T.__constraints__ :
return l[0]
else :
return " Type error"
```

리스트의 첫 번째 원소만 처리해서 결과를 확인한다.

```python
In : print(first([1,2,3]))
Out: 1
```

## 13.5.4 type annotation 사용 시에 주의할 점

타입 힌트는 변수, 함수 내의 매개변수나 함수의 반환값 등에 주석을 표시하기 위한 방법 이다. 특정 주석을 정하면 이것을 가지고 타입을 체크하는 기능을 제공할 수는 있지만 런 타임 실행에는 영향을 미치지 않는다.

특히 문장으로 인식되는 키워드가 사용되는 곳에는 쓸 수 없다. 변수를 정의하고 할당할 때는 동일한 문장에 사용되지만 주석으로 인식되는 것이다.

예제 13-31 : global/nonlocal 키워드 사용 시 예외 발생

전역 변수라고 지정하는 global 키워드와 같이 타입 힌트를 지정할 수 없다. 먼저 지정하 지 않는 함수를 정의하고 실행하겠다.

```python
In : from typing import List
some_list : List[int] = []
def add(x,y) :
some_list = x+y
return some_list
In : print(add([5],[5]))
Out: [5, 5]
```

전역 키워드인 global 다음에 주석을 표시하면 에러가 발생한다.

```python
In : from typing import List
x : List[int] = []
def f() :
global x : List[int]
return x
print(f())
Out: File "<ipython-input-3-56eef41f5e44>", line 6
global x : List[int]
^
SyntaxError: invalid syntax
```

내부 함수에서 자신의 함수에 속하지 않은 변수의 nonlocal 키워드에 타입 힌트를 부여하 면 예외가 발생한다. 변수에 대한 주석이므로 문장으로 인식하는 키워드에 같이 표현하면 안 된다.

```python
In : def outer(x) :
def inner(y) :
nonlocal x : ing
return x+y
return inner
a = outer(5)
print(a(7))
Out: File "<ipython-input-4-f2505dbf66d0>", line 3
nonlocal x : ing
^
SyntaxError: invalid syntax
CHAPTER
```

파이썬 제너레이터 및 이터레이터 파이썬에서 기능에 대한 평가가 필요할 때까지 계산을 늦춰서 처리하는 느긋한 계산법을 도입해서 반복형(iterator)을 연산할 수 있게 지원한다.

특히, 제너레이터(Generator)는 동적인 스트림을 처리하기 위해 함수를 이용해서 새로운 객체를 만들고 동적으로 실행한 결과를 하나씩 처리한다.

반복자인 이터레이터(Iterator)는 정적 접근을 동적으로 전환해서 한 번 접근할 때마다 하나 씩 처리한다.

두 방식은 공통적으로 한번 동적으로 처리하고 끝나면 다시 처리가 되지 않아 새로 생성 해서 처리해야 하는 단점도 있다. 동적으로 접근해서 사용하면 컴퓨터의 자원을 최소화할 수 있다.

✚ 알아볼 주요 내용

● 반복형과 반복자

● 반복자 처리 모듈 및 클래스

● 제너레이터 표현식과 함수

● 제너레이터의 연결 처리

● 코루틴
