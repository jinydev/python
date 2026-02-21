---
layout: default
title: "11.02 부분"
---

# 11.02 부분

함수 내부에 정의된 것을 외부로 전달해서 처리할 수 있으면 여러 함수를 연결해서 처리가 가능해진다. 앞에서 사용된 클로저 환경을 이용하면 실행되는 함수를 가지고 인자를 나눠 서 처리하는 것도 손쉽게 할 수 있다.

이렇게 기능과 매개변수를 분리해서 처리할 수 있도록 구성한 함수를 부분 함수(partial function 또는 curring)라고 한다. 특히 클로저 환경으로 처리할 때 다양한 부분 함수를 생성 해서 사용할 수 있고 더 편리하게 만들 수 있도록 파이썬에서는 부분 함수를 처리하는 모 듈인 functools를 제공한다.

또한, 클로저 환경은 아니지만 함수를 계속 호출해서 사용할 때마다 매번 계산되는 것을 방지하고 기존에 실행된 결과는 저장된 값으로 처리할 수 있도록 구성해서 메모리 사용을 줄이고 빠른 계산 구조를 만들 수 있는 메모이제이션(memoization)도 제공한다.

## 11.2.1 부분 함수(Partial Function)

함수의 기능을 분리하고 이 기능에 맞는 매개변수도 분리해서 처리하도록 구성한다. 함수 가 단계별로 호출될 때마다 기능의 일부씩만 처리되고 마지막 실행된 함수의 결과가 최종 함수의 처리 결과로 구성되는 패턴이다.

예제 11-3 : 클로저를 이용한 커링(currying) 처리

함수의 매개변수를 외부 함수와 내부 함수로 분리해서 처리할 수 있도록 정의하고 모든 매 개변수가 다 들어오면 실행을 시킨다.

몫과 나머지를 구하기 위해 operator 모듈을 이용해서 floordiv, mod 함수들을 딕셔너리 에 값으로 넣고 키는 문자열을 연산자로 넣었다.

외부 함수는 단지 하나의 매개변수만 받고 내부 함수를 외부로 전달하는 역할을 한다. 내 부 함수는 나눗셈의 나머지를 구하는 역할을 한다.

```python
In : import operator as op
op = {"//":op.floordiv,"%":op.mod}
def outer(x) :
def inner(y) :
return op["//"](x,y), op["%"](x,y)
return inner
```

외부 함수에 나눌 수 있는 값을 넣고 실행하면 내부 함수가 반환된다. 이를 재사용하기 위 해 변수에 할당한다.

내부 함수에 인자를 넣어서 실행하면 몫과 나머지가 나오는 것을 볼 수 있다. 부분 함수 패턴을 실행하면 함수가 두 번 실행되는 것을 알 수 있다. 동일한 값을 넣고 변하는 값을 나중에 넣어서 처리하기 때문에 두 번째 값을 바꿔서 처리할 때는 내부 함수의 인자만 바 꿔가면서 함수를 실행한다. 값을 확인할 경우에는 이 패턴이 좋은 효과가 있다.

```python
In : inner = outer(123)
print(inner(5))
Out: (24, 3)
```

이번에는 함수가 저장된 딕셔너리를 외부 함수에 전달하여 기능을 분리해서 처리한다. 내 부 함수는 2개의 인자를 받아 외부 함수로부터 전달된 함수들의 정보를 조회해서 처리할 수도 있다.

```python
In : def outer(op) :
def inner(x,y) :
return op["//"](x,y), op["%"](x,y)
return inner
```

외부 함수를 실행한 뒤 내부 함수에 값을 넣고 실행하면 몫과 나머지 계산된 결과가 나 온다.

```python
In : inner = outer(op)
print(inner(123,5))
Out: (24, 3)
```

## 11.2.2 부분 함수 : functools 모듈 이용

파이썬에서 부분 함수를 처리하기 위해 functools 모듈을 제공한다. 함수와 메서드가 처 리하는 결과가 유사하므로 내부적으로 두 개의 클래스를 제공한다. 왜 클래스를 사용해서 부분 함수를 만드는지도 알아본다.

일단 함수 처리하는 partial과 부분 메서드를 처리하는 partialmethod를 가지고 부분 함 수를 처리할 경우, 인스턴스를 만들고 이 인스턴스 내부에 전달된 함수를 실행해서 처리 할 수도 있고 인자에 대한 전달을 제어하기 편리한 구조가 만들어진다는 것을 알아본다.

✚ functools.partial을 이용한 currying 처리

함수를 정의하고 functools.partial 클래스에 인자로 함수와 인자값을 주어 부분 함수를 처리한다.

두 번째 인자를 넣고 함수를 실행하면 실행된 반환이 처리된다.

예제 11-4 : 내장 모듈을 이용한 커링

내장 모듈 functools.partial이 어떻게 구성되었는지부터 확인하기 위해서 import하고 partial을 출력해보면 하나의 클래스라는 것을 알 수 있다.

```python
In : import functools as ft
print(ft.partial)
Out: <class 'functools.partial'>
```

이 partial 클래스에 함수와 하나의 인자를 넣어서 인스턴스를 만들고 내부적으로 구조화 된 것을 확인해보면 함수와 인자를 가지는 하나의 인스턴스가 만들어진 것을 알 수 있다.

부분 함수로 만들어질 때 들어간 인자 부분이 고정되고 함수만 호출할 때마다 값을 바꾸면 인자로 넣어서 처리되는 구조는 클로저 부분 함수와 동일하다.

```python
In : import operator as op
s = ft.partial(op.add,5)
print(s)
Out: functools.partial(<built-in function add>, 5)
```

이 partial 클래스에서 제공하는 기본 속성을 확인해보면 위치 인자 정보(args), 키워드 인 자 정보(keywords), 함수를 관리하는 정보(func)로 구성되어 있다.

```python
In : for i in dir(s) :
if not i.startswith("__") :
print(i)
Out: args
func
keywords
```

인스턴스를 가지고 속성을 조회해보면 func 속성에는 함수 add가 들어가 있고 args에는 5가 들어가 있지만 이 함수는 키워드 인자가 없으므로 keywords 속성에는 빈 딕셔너리 만 출력된다.

```python
In : print(s.args)
print(s.func)
print(s.keywords)
Out: (5,)
<built-in function add>
{}
```

이 부분 함수를 나머지 인자를 넣고 실행시키면 add라는 함수는 인자가 2개만 필요하므 로 실행되어 결과값을 반환한다.

이 인스턴스 내에 저장된 함수와 인자에 직접 접근하고 나머지 인자를 넣어서 실행해도 동 일한 결과를 얻을 수 있다.

```python
In : print(s(10))
print(s.func(s.args[0],10))
Out: 15
```

이번에는 세 개의 매개변수를 갖는 함수 addx를 정의하고 부분 함수로 두 개의 인자를 전 달해서 만들었다. 이 내부의 속성을 확인해보면 위치 인자에 한 개, 키워드 인자에 한 개 의 인자가 들어가 있는 것을 알 수 있다.

```python
In : import functools as ft
def addx(x,y,z) :
return x+y+z
s = ft.partial(addx,1,z=100)
print(s.args)
print(s.keywords)
Out: (1,)
{'z': 100}
```

세 번째 인자를 넣어 함수를 실행하면 결과가 나온다. 키워드 인자로 전달했는데 위치 인자가 들어간 x를 처리하면 동일한 인자가 들어가 있어서 예외가 발생하는 것을 알 수 있다.

```python
In : print(s(20))
Out: 121
In : print(s(x=10))
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-22-4a4101dbea81> in <module>()
----> 1 print(s(x=10))
TypeError: addx() got multiple values for argument 'x'
```

예제 11-5 : 가변 인자를 활용한 커링

가변 키워드 인자를 활용해서 커링을 만들면 기본적으로 내부에는 고정 위치 인자나 고 정 키워드 인자만 보관하므로 가변 인자에 대해서는 들어올 때마다 처리하도록 구성되어 있다.

```python
In : import functools as ft
def addx(x,y,*,z,**kwargs) :
result = x+y+z
for v in kwargs.values() :
result = result + v
return result
```

부분 함수를 만들기 위해 고정 위치 인자와 고정 키워드 인자를 넣었다.

```python
In : s = ft.partial(addx,1,1,z=10)
```

인스턴스에 가변 키워드 인자를 주고 실행하면 고정 인자 값은 고정값이고 가변 키워드 인 자가 주어질 때마다 값이 변하는 것을 알 수 있다.

```python
In : print(s(k=10))
print(s.args, s.keywords)
print(s(a =100))
print(s.args, s.keywords)
Out: 22
(1, 1) {'z': 10}
(1, 1) {'z': 10}
```

가변 위치 인자만 받는 내장 함수 sum을 부분 함수로 만들면 고정 인자들 값이 없으므로 처음에 할당할 때 아무 것도 주지 않았다.

```python
In : import functools as ft
ss = ft.partial(sum)
```

인스턴스를 호출할 때마다 가변 위치 인자를 넣어서 계산하면 가변 인자만 처리되는 것을 알 수 있다.

```python
In : print(ss([1,2,3]))
print(ss.args, ss.keywords)
print(ss([1,2,3,4,5,6]))
print(ss.args, ss.keywords)
Out: 6
() {}
() {}
```

✚ 부분 메서드 처리

파이썬은 기본적으로는 함수 기준으로 만들어진다. 이 함수는 메서드로 전환되도록 재구 성되는 것이므로, 메서드에 대한 처리는 일반적인 함수와 약간 차이가 생겨서 별도의 메 서드를 부분 처리할 수 있는 클래스인 functools.partialmethod가 제공된다.

메서드에서 사용하려면 데코레이터를 이용해서 먼저 메서드가 로딩할 때 부분 메서드로 만든다.

예제 11-6 : functools.partialmethod를 이용한 메서드 커링 처리

클래스 A 내의 add 메서드를 정의하고 부분 메서드 처리를 한다. 이런 경우는 매개변수가 아무 것도 들어가지 않는다.

```python
In : import functools as ft
class A :
@ft.partialmethod
def add(self,x,y) :
return x+y
```

인스턴스를 만들어서 add를 확인하면 고정 위치 인자와 고정 키워드 인자에 아무런 값이 들어가 있지 않다.

```python
In : a = A()
print(a.add)
print(a.add.args)
print(a.add.func)
print(a.add.keywords)
Out: functools.partial(<bound method A.add of <__main__.A object at
0x00000000050005F8>>)
()
<bound method A.add of <__main__.A object at 0x00000000050005F8>>
{}
```

이 메서드에 나머지 인자인 두 개의 인자를 넣어 호출해야 결과값을 반환한다.

```python
In : print(a.add(5,5))
Out: 10
```

메서드도 클로저 환경을 구성할 수 있다. 부분 메서드를 처리하기 위해 인자를 나눠서 처 리하도록 클로저 환경을 구성해서 처리하도록 했다.

메서드 내에 내부 함수가 정의되어 있고 이 메서드가 실행되면 이 내부 함수가 외부로 전 달되어 인자를 나눠서 받아 처리할 수 있다.

```python
In : import functools as ft
class A :
@ft.partialmethod
def add(self,x) :
def inner(y) :
return x+y
return inner
```

a.add가 부분 메서드를 처리하기 위해 만들어졌다. 인자는 하나도 안 들어간 것을 알 수 있다.

```python
In : a = A()
print(a)
print(a.add)
print(a.add.args)
Out: <__main__.A object at 0x000000000503B278>
functools.partial(<bound method A.add of <__main__.A object at
0x000000000503B278>>)
()
```

이 메서드에 인자를 하나 넣고 실행하면 내부 함수가 변수에 반환된다. 나머지 인자는 이 변수를 호출해 넣으면서 실행하면 최종 결과가 나온다.

```python
In : add = a.add(5)
print(add)
print(add(5))
Out: <function A.add.<locals>.inner at 0x00000000050336A8>
```

## 11.2.3 부분 함수 : 사용자 클래스 이용

클래스 functools.partial의 작동 원리를 알아보기 위해 클래스를 정의해서 유사하게 처리 해보겠다.

어떻게 인스턴스를 가지고 함수처럼 사용이 가능한지를 이해해보자.

✚ 사용자 클래스 정의

함수와 인자를 받는 클래스를 정의하고 이 클래스의 인스턴스가 실행될 때 추가적으로 인 자를 받도록 처리한 후에 인자가 다 들어오면 인스턴스 내에서 저장된 함수를 바로 실행하 면 된다.

예제 11-7 : 사용자 클래스로 부분 함수 만들기

부분 처리 클래스 part를 정의할 때 매개변수로 함수와 인자를 받아야 하므로 초기화 메서 드에 함수와 인자를 받을 수 있는 구조를 정의한다. 일단 간단하게 처리하므로 키워드 인 자로 받는 부분은 정의하지 않는다.

이 클래스를 가지고 인스턴스를 만들고 다시 이 인스턴스를 호출해서 인자로 받은 것과 내 부에 저장된 함수 및 인자를 가지고 실행할 수 있도록 _ _call_ _ 인스턴스 메서드 내에 로 직을 만든다.

내부 함수의 인자가 하나일 경우는 _ _code_ _.co_argcount == 1이 나올 때 자료형을 리스트나 튜플로 처리한다는 것이므로 언패킹하지 않고 리스트를 그대로 전달해서 처리 한다.

```python
In : class part :
def __init__(self,func,*args) :
self.func = func
self.args = []
if len(args) :
for i in args :
self.args.append(i)
def __call__(self,*args) :
if len(args) :
for i in args :
self.args.append(i)
if self.func.__code__.co_argcount == 1 :
return self.func(self.args)
else :
return self.func(*self.args)
```

함수 add는 두 개의 매개변수를 가진 함수이고 part 클래스로 인스턴스를 만들 때 인자 하나만 지정했다. 이 내부의 args를 확인해보면 하나의 인자가 고정으로 들어가 있는 것을 알 수 있다. 다른 인자를 전달해서 실행하면 두 인자를 합산한 결과가 출력된다.

```python
In : def add(x,y) :
return x+y
a = part(add,5)
print(a.args)
Out: [5]
In : print(a(5))
Out: 10
```

리스트나 튜플 등을 받아서 내부적으로 원소를 계산하는 함수를 정의한다. 이때 매개변수 는 하나이기에 내부적으로 언패킹을 시키지 않고 바로 전달을 해야 한다.

```python
In : def list_sum(l) :
return sum(l)
s = part(list_sum)
print(s.args)
Out: []
```

이 인스턴스에 가변 인자로 전달하면 전부 리스트로 처리가 되므로 내부에 있는 sum 함 수와 맞게 처리가 되는 것을 알 수 있다.

```python
In : print(s(1,2,3,4,5))
Out: 15
```

## 11.2.4 메모이제이션 함수 처리

함수 호출이 많아지고 내부 처리량이 많아지면 메모리 사용이 기하급수적으로 늘어날 수 밖에 없다. 메모리 사용량을 줄이려면 일단 계산한 부분을 저장해서 다시 계산을 하지 않 는 방법도 있다. 완벽한 해결 방안은 아니지만 반복적으로 함수가 활성화되지 않아 실행 속도나 메모리 활용량은 줄일 수 있다.

파이썬에서 함수도 객체이므로 계산된 반환을 저장해두고 다시 계산이 발생하지 않도록 처리하는 방법을 메모이제이션 패턴이라 한다. 객체 네임스페이스나 functools 모듈에서 제공하는 기능을 사용해서 처리하면 된다.

예제 11-8 : 함수의 객체 영역 이용하기

반복 수행하는 피보나치 함수를 정의하고

```python
In : def fib(n) :
if (n == 0) or (n== 1) :
return 1
return fib(n-1) + fib(n-2)
```

특정 숫자를 넣어서 실행해보면 이 함수의 처리 결과가 나온다. 이 함수는 한번 실행되고 나면 함수 내의 지역 네임스페이스가 모두 사라진다. 다시 호출하면 처음부터 다시 시작 하는 것을 알 수 있다.

```python
In : a = fib(5)
In : print(a)
Out: 8
```

함수 처리 반환을 memoize 함수의 객체 영역 속성에 추가하도록 구성한다. 내부 함수를 전달해서 캐싱 반환을 처리하는 로직을 추가한다. memoize.cache는 이 함수의 객체 네 임스페이스 영역에 cache 속성을 딕셔너리 자료형으로 등록한다.

함수 객체 영역에 저장하면 다음 함수가 호출되어도 사라지지 않고 사용할 수 있다.

```python
In : def memoize(func) :
memoize.cache = {}
def g(x) :
if x not in memoize.cache :
memoize.cache[x] = func(x)
return memoize.cache[x]
return g
```

함수의 반복 처리 부분이 내부 함수의 cache에 있는지를 확인하고 없으면 함수를 계산해 서 cache에 저장하는 구조로 만들었다.

```python
In : a = memoize(fib)
s = a(5)
```

함수 내의 속성인 cache를 조회하면 인자값과 이 결과가 들어가 있는 것을 알 수 있다.

```python
In : memoize.cache
Out: {5: 8}
```

이 memoize 내에 피보나치 함수를 전달해서 하나의 함수를 등록한 후에 순환문으로 14 까지 함수를 호출해서 메모리에 저장한다.

```python
In : fib = memoize(fib)
for i in range(15) :
print(fib(i),end= ' ')
Out: 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610
```

메모리에 저장된 값을 확인해보면 14까지 함수의 결과가 저장된 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(memoize.cache)
Out: {0: 1,
1: 1,
2: 2,
3: 3,
4: 5,
5: 8,
6: 13,
7: 21,
8: 34,
9: 55,
10: 89,
11: 144,
12: 233,
13: 377,
14: 610}
```

예제 11-9 : 메모이제이션을 functools.lru_cache로 사용

모듈 내의 lru_cache 함수를 이용하여 저장할 수 있는 사이즈를 정해서 만들 수도 있다.

```python
In : from functools import lru_cache
print(lru_cache)
Out: <function lru_cache at 0x0000000002571158>
```

내부의 변수가 3개 있다.

```python
In : print(lru_cache.__code__.co_varnames)
Out: ('maxsize', 'typed', 'decorating_function')
```

함수 캐싱은 함수의 반환값들을 캐싱해서 호출될 때 시간을 절약할 수 있다. 데코레이 터를 이용해서 lru_cache를 사용하고 maxsize를 부여하면 캐싱되는 범위도 지정할 수 있다.

maxsize를 지정하지 않아서 os에 맞춰 처리되도록 한 것이므로 성능상의 이슈도 발생할 수 있기 때문에 maxsize는 성능을 보고 결정한다.

```python
In : from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n) :
if n < 2 :
return 1
return fib(n-1) + fib(n-2)
```

이 fib 함수가 데코레이터로 처리되면 fib 함수명으로 하나의 인스턴스가 만들어지는 것을 알 수 있다.

```python
In : print(fib)
Out: <functools._lru_cache_wrapper object at 0x00000000052D80F0>
```

이 인스턴스의 내부에 lru_cache가 데코레이터 처리되면 cache에 대한 정보와 cache를 클리어하는 메서드가 생기는 것을 확인할 수 있다.

```python
In : for i in dir(fib) :
if not i.startswith("_") :
print(i)
Out: cache_clear
cache_info
```

함수를 실행해서 결과를 리스트에 보관했다.

```python
In : print([fib(n) for n in range(15)])
Out: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
```

내부 캐쉬에 대한 정보를 확인하고 정리할 수 있다.

```python
In : fprint(fib.cache_info())
fib.cache_clear()
print(fib.cache_info())
Out: CacheInfo(hits=26, misses=15, maxsize=None, currsize=15)
CacheInfo(hits=0, misses=0, maxsize=None, currsize=0)
```

다시 동일한 것을 실행해본다.

```python
In : print([fib(n) for n in range(15)])
Out: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
```

위에서 동일한 내용을 처리했기에 추가적인 계산이 발생하지 않았으므로 캐쉬 정보의 변 경이 없다는 것을 확인한다.

```python
In : print(fib.cache_info())
Out: CacheInfo(hits=26, misses=15, maxsize=None, currsize=15)
```
