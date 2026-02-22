---
layout: default
title: "11.03 함수"
---

# 11.03 함수

파이썬에서는 함수의 기능을 추가하기 위해 많은 함수에 데코레이터를 처리해서 사용 한다. 특히 공통된 기능이 있을 경우 이를 별도의 데코레이터 함수로 정의해서 데코레이 터로 처리하면 일반 함수에도 공통된 기능을 처리할 수 있다.

이 데코레이터 패턴을 이용해서 처리하면 공통된 기능의 변경을 데코레이터 함수로 묶어 서 처리하므로 모듈이 로딩될 때마다 변경된 것을 먼저 적용하고 표준화된 기능을 필요한 함수에 적용할 때 편리하다.

데코레이터 함수도 기본적으로 클로저 환경을 구성해서 실행되므로 매개변수로 전달되는 함수가 내부에 저장되어 처리되고 실행하는 함수는 데코레이터 함수 내부에 정의된 내부 함수를 가지고 실행하는 것이다.

데코레이터 함수명 앞에 @를 붙이면 모듈이 로딩 시점에 먼저 데코레이터된 함수부터 실 행되고 실행 함수가 호출되면 실행시킬 수 있는 준비가 이루어진다. 데코레이터 처리는 항상 모듈 로딩 시점에 한 번만 처리되므로 성능에 커다란 영향을 미치지는 않는다.

## 11.3.1 데코레이터의 기본 이해하기

데코레이터 함수가 인자로 받은 실행 함수를 데코레이터 함수 내의 기능을 처리한 후에 실 행하도록 처리하는 것을 말한다.

보통 실행 함수들에 공통으로 들어갈 수 있는 기능을 하나의 데코레이터 함수를 만들어서 동일한 적용을 할 수 있도록 하는 장식자 패턴이다.

예제 11-10 : 기본 데코레이터 처리

데코레이터 함수 정의 시 실행 함수를 매개변수로 받고 처리한다. 함수를 인자로 받고 이 함수를 외부로 전달했으므로 실행 함수가 호출되면 실행 반환을 반환해준다.

함수 dec_func를 정의하고 인자로 func 즉 함수를 받도록 정의한 뒤, 실행 함수 바로 위 에 @dec_func를 정의하면 add라는 함수를 반환하면서 실행 함수를 호출하면 계산되도 록 처리한다.

```python
In : def decorator(func) :
return func
@decorator
def add(x,y) :
return x+y
print(add(5,5))
Out: 10
```

함수 dec_func을 정의하고 인자로 함수를 받은 뒤 결과로 반환한다. 이 함수의 인자로 add 함수를 받고 add라는 변수에 할당했다. 실행은 add 변수에 저장된 add 함수가 수행 된다.

```python
In : def decorator(func) :
return func
def add(x,y) :
return x+y
add = decorator(add)
print(add(5,5))
Out: 10
```

람다 함수도 함수를 매개변수로 받아 매개변수로 전달해서 바로 데코레이터를 만들 수 있다.

```python
In : lambda_deco = lambda func : func
@lambda_deco
def add(x,y) :
return x+y
```

바로 함수를 전달했으므로 실제는 인자로 전달된 함수가 그대로 실행되는 것을 알 수 있다.

```python
In : print(add.__name__)
print(add(5,5))
Out: add
```

## 11.3.2 데코레이터 상세 정의

데코레이터 내의 기능을 처리하기 위해 내부 전용 함수의 정의가 필요하다. 일단 실행 함 수의 매개변수를 내부 전용 함수에서 받아서 실행 함수의 인자로 전달해야 하기에 동일한 매개변수 구조를 가져야 한다.

내부 전용 함수에 데코레이터에서 처리할 기능들을 추가하면 실행 함수와 별개의 추가 기 능들을 처리할 수 있다.

예제 11-11 : 데코레이터 처리하는 내부 함수 정의하기

데코레이터가 실행되는 내부 함수를 정의하면 클로저 환경이 구성되고 실행 함수의 매개 변수 등을 받아서 실행 함수처럼 실행이 가능하다.

내부 전용 함수의 매개변수를 어떤 것이라도 받아들일 수 있도록 *args, **kwargs로 정의 했고 이를 실행 함수에 다시 unpacking한 구조인 *args, **kwargs로 전달해서 실행되도 록 구성했다. 실행 함수 위에 바로 @데코레이터 함수를 붙여서 실행 함수를 데코레이터화 한다.

```python
In : def decorator(func) :
def wrapper(*args,**kwargs) :
""" wrapper call """
return func(*args,**kwargs)
return wrapper
```

실행은 addx 함수를 호출하면 된다.

```python
In : @decorator
def add(x,y) :
""" add call """
return x+y
print(add(5,51))
Out: 56
```

실행이 되는 함수는 내부에 정의된 wrapper 함수이다. 그래서 전달된 실행 함수에 대한 상세한 정보가 없다.

```python
In : for i in add.__dict__ :
print(i)
In : print(add.__name__)
print(add.__qualname__)
print(add.__doc__)
Out: wrapper
decorator.<locals>.wrapper
wrapper call
```

람다 함수를 이용해서 데코레이터도 만들 수 있다. 데코레이터는 함수가 인자로 함수를 받아서 내부 함수를 결과로 전달한다. 첫 번째 인자로 전달된 매개변수를 내부 람다 함수 가 받아서 외부 함수 인자로 전달받은 함수를 내부 함수의 결과로 전달한다.

```python
In : lambda_deco = lambda func : (lambda *args : func(*args))
@lambda_deco
def add(x,y) :
return x+y
```

데코레이터를 구성한 함수를 실행 함수로 처리하면 내부 함수가 전달된 것을 알 수 있고 인자를 넘기면 결과가 나오는 것을 볼 수 있다.

```python
In : print(add.__name__)
print(add(5,5))
Out: <lambda>
```

## 11.3.3 실행 함수 정보 복원하기

데코레이터를 작동하면 내부 함수가 외부로 전달되므로 인자로 전달된 함수에 대한 정보 는 없어진다.

이 정보를 내부 함수에 세팅해서 인자로 전달된 함수의 정보를 같이 넘기면 처리되는 실행 함수에 대한 정보도 확인되는 것을 알 수 있다.

파이썬의 functools 모듈이 wrap 함수를 내부 함수에 데코레이터로 처리할 때 인자로 전 달받은 함수를 넣으면 내부 함수의 정보가 전달된 함수의 정보로 대체된다.

예제 11-12 : 실행 함수의 함수 정보를 유지하기

파이썬에서 전달되는 실행 함수의 정보를 보관하기 위해 functools.wrap 함수를 제공 한다. 내부 함수 정의 위에 functools.wrap(func)으로 데코레이터 처리하면 실행 함수의 정보가 내부 함수 정보로 갱신된다.

```python
In : from functools import wraps
def decorator(func) :
@wraps(func)
def wrapper(*args,**kwargs) :
""" wrapper call """
return func(*args,**kwargs)
return wrapper
```

실행 함수를 실행한다. 계산된 결과가 나오는 것을 확인할 수 있다.

```python
In : @decorator
def add(x,y) :
""" add call """
return x+y
print(add(5,51))
Out: 56
```

함수의 객체 네임스페이스 영역에 _ _wrapped_ _ 속성이 추가된다.

```python
In : for i in add.__dict__ :
print(i)
Out: __wrapped__
```

그리고 실행 함수의 함수명, 함수 설명 정보가 내부 함수의 정보를 갱신해서 보여주는 것 을 확인할 수 있다.

```python
In : print(add.__name__)
print(add.__qualname__)
print(add.__doc__)
print(add.__wrapped__)
Out: add
add
add call
<function add at 0x00000000052B0A60>
```

functools.wraps를 데코레이터로 처리하면 _ _wrapped_ _ 속성에 실행 함수가 세팅되 어 이를 확인할 수 있고 이를 직접 실행하면 데코레이터로 전달된 실행 함수의 원본임을 알 수 있다.

```python
In : print(add.__wrapped__.__name__)
Out: add
In : print(add.__wrapped__(5,51))
Out: 56
```

## 11.3.4 데코레이터 함수 내의 공통 기능 처리

공통적인 기능을 함수마다 추가하기보다는 공통된 기능을 데코레이터 함수에 추가하면 다

른 함수들도 데코레이터를 사용하여 공통 기능을 동일한 방법으로 적용할 수 있다.

예제 11-13 : 공통 함수를 내부 함수에 추가

공통 기능을 할 수 있는 함수를 정의하고 이를 데코레이터 내부에서 기능을 점검할 수 있 도록 처리해본다.

함수 typecheck를 정의해서 내부에 들어온 인자에 대해 튜플과 딕셔너리 여부를 확인 한다.

추상화 클래스가 있는 모듈인 collections.abc을 import한다. 튜플은 Sequence 자료형 이고 딕셔너리는 Mapping 자료형이므로 이 인스턴스가 추상 클래스에 의해 만들어졌는 지를 isinstance로 확인해본다.

```python
In : import collections.abc as cols
def typecheck(args,kwargs) :
print("{:-^40s}".format(" wrapper "))
if isinstance(args, cols.Sequence) :
print(" args type ", "tuple")
if isinstance(kwargs, cols.Mapping) :
print(" kwargs type ", "dict")
print("{:-^40s}".format(""))
```

데코레이터 함수를 정의하고 typecheck 함수로 내부 함수 안의 인자가 실행 함수의 인자 들이 맞는지를 확인하도록 했다.

```python
In : from functools import wraps
def dec_func(func) :
@wraps(func)
def wrapper1(*args, **kwargs) :
typecheck(args,kwargs)
return func(*args, **kwargs)
return wrapper1
```

실행 함수를 데코레이터 함수로 처리한 후에 이 실행 함수를 인자를 받고 실행하면 typecheck 함수도 내부에서 실행되어 결과를 반환한다.

이런 경우 말고도 로깅 등 다양한 기능을 넣어서 실행 함수마다 점검이 필요한 경우를 내 부 함수로 넣어 로직으로 점검할 수 있다.

```python
In : @dec_func
def add(x,y) :
"doc add "
return x+y
print(add.__name__)
print(add.__doc__)
print(add(5,5))
Out: add
doc add
--------------- wrapper ----------------
args type tuple
kwargs type dict
----------------------------------------
```

## 11.3.5 데코레이터 함수에 매개변수가 필요할 경우

데코레이터 함수도 매개변수를 받을 수 있다. 이 매개변수는 데코레이터 함수가 필요한 처리를 위한 것이니 실행 함수가 필요한 데코레이터 기능과 다른 부분이다.

데코레이터 로딩 시 함수의 매개변수를 받는 부분부터 처리한 후에 실행 함수를 받는 데코 레이터가 작동된다.

예제 11-14 : 데코레이터 함수에 매개변수 정의하기

데코레이터 함수에 별도의 매개변수가 필요하므로 실행 함수를 받는 데코레이터 외부에 추가적으로 데코레이터의 매개변수를 받는 함수를 정의한다. 매개변수를 받는 함수가 데 코레이터한 후 내부에 실행 함수를 받아 데코레이터를 수행하는 함수가 있고 그 내부에 실 행 함수를 실행하는 함수로 3단계 함수를 구성한다.

데코레이터 함수를 3단계로 구성하면 이 함수들이 차례로 실행되는 것을 확인할 수 있다.

```python
In : from functools import wraps
def out_para(x) :
print(x)
def dec_func(func) :
@wraps(func)
def wrapper(*args, **kwargs) :
return func(*args, **kwargs)
return wrapper
return dec_func
```

실행 함수에 위에 정의된 데코레이터 처리를 위한 함수를 가지고 데코레이터를 처리한 후 에 실행 함수를 실행하면 데코레이터 매개변수와 실행 함수를 모두 인자로 받아 처리하는 것을 확인할 수 있다.

```python
In : @out_para("decorator parameter")
def add(x,y) :
return x+y
print(add(5,5))
print(add.__name__)
Out: decorator parameter
add
```

데코레이터를 함수의 호출 순서대로 처리한다. 가장 외부의 파라미터를 받는 함수를 실행 하면 실행 함수를 받는 데코레이터 함수가 반환되고, 이 데코레이터 함수에 인자로 실행 함수를 받아 처리하면 내부의 wrapper 함수가 나온다. wrapper 함수는 실행 함수의 인 자를 받아온 후에 내부에서 실행 함수를 호출해서 실행하고 결과를 반환한다. 위와 동일 한 결과가 나오는 것을 볼 수 있다.

```python
In : dec_func = out_para(" first func ")
wrapper = dec_func(add)
print(wrapper(5,5))
Out: first func
```
