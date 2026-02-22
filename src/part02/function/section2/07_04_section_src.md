---
layout: default
title: "07.04 내부"
---

# 07.04 내부

함수를 정의할 때 함수 안에 함수를 정의하는 즉, 내부 함수를 정의해서 함수 내에서 함수 를 실행을 시켜서 처리할 수 있다.

이때 기본 함수를 외부 함수(outer 함수)라고 하고 그 내부에 정의된 함수를 내부 함수(inner 함수)라고 한다.

모든 함수는 항상 function class로 만들어지므로 항상 동일한 함수의 인스턴스를 유지 한다. 함수를 함수 내부에 정의해서 사용하므로 함수 간의 네임스페이스를 처리하는 스코 프도 내부적으로 생긴다.

이때 외부 함수의 네임스페이스를 명확히 처리하는 nonlocal 키워드를 사용해서 처리하 는 법도 알아본다.

또한 내부 함수를 외부 함수의 반환으로 전달하는 것도 가능해서 세부적인 클로저 환경이 구성되는 기반을 알아본다.

## 7.4.1 내부 함수(nested function) 정의하기

일단 외부 함수를 정의하고 그 내부에 내부 함수를 정의해본다. 일단 외부 함수 내의 기능 을 나누고 내부 함수로 정의해서 외부 함수의 보조 기능을 처리하는 방식부터 알아본다.

예제 7-23 : 함수 내에 함수 정의 및 내부 실행 처리

일반적으론 외부 함수 math_func1에서 사칙연산이 처리되도록 정의를 하지만 여기선, 내부 함수 add_, sub_, mul_, div_ 4개로 분리해서 함수 처리한다. 이 내부 함수를 딕셔 너리에 넣고 매개변수를 확인해서 내부 함수를 검색한 후 외부 함수를 반환할 때 내부 함 수를 실행한다.

```python
In : def math_func1(x,y,op) :
def add_() :
return x+y
def sub_() :
return x-y
def mul_() :
return x*y
def div_() :
return x/y
op_func = {'+': add_, "-":sub_,
"*":mul_, "/":div_}.get(op,add)
return op_func()
```

사칙연산 기호를 바꿔가면서 이 함수를 실행해보면, 4개의 사칙연산이 수행되는 것을 알 수 있다.

```python
In : print(math_func1(5,5,'+'))
print(math_func1(5,5,'-'))
print(math_func1(5,5,'*'))
print(math_func1(5,5,'/'))
Out: 10
1.0
```

예제 7-24 : 내부 함수 호출을 반환해서 사용하기

사칙연산을 처리하는 하나의 함수를 정의한 뒤 반환값에서 내부 함수를 실행하지 않고 내 부 함수를 그대로 전달했다. 외부에서 다시 전달받은 내부 함수를 실행할 수 있다.

외부 함수의 매개변수는 2개를 지정하고 내부 함수의 매개변수 1개를 지정해 외부 함수를 호출한 경우 전체가 실행되는 것이 아니라 반환된 내부 함수가 호출될 때 최종 결과가 반 환되도록 구성했다,

```python
In : def math_func1(x,op) :
def add_(y) :
return x+y
def sub_(y) :
return x-y
def mul_(y) :
return x*y
def div_(y) :
return x/y
op_func = {'+': add_, "-":sub_,
"*":mul_, "/":div_}.get(op,add)
return op_func
```

함수를 실행해서 내부 함수가 반환되므로 내부 함수의 인자를 하나의 값으로 처리해서 실 행한다.

사칙연산으로 외부 함수를 호출하고 다시 내부 함수에 인자를 넣어서 처리하는 방식으로 진행되는 것을 알 수 있다.

```python
In : add = math_func1(5,'+')
print(add(5))
sub = math_func1(5,'-')
print(sub(5))
mul = math_func1(5,'*')
print(mul(5))
div = math_func1(5,'/')
print(div(5))
Out: 10
1.0
```

## 7.4.2 내부 함수가 외부로 전달된 환경 이해하기

함수 내에서 함수를 호출하는 것과 함수를 정의하고 내부에 함수를 정의하는 것의 차이점 을 알아본다.

외부 함수와 내부 함수는 기본적으로 네임스페이스가 공유된다. 공유되는 순서를 보면, 외부 함수는 지역이 내부 함수의 전역처럼 처리되는 것을 알 수 있다.

함수를 정의하고 내부 함수가 구성된 것과 함수에서 타 모듈이나 모듈 내의 다른 함수를 호출해서 처리하는 것 사이에서 내부 함수의 처리가 어떻게 다른지를 알 수 있다.

내부 함수가 밖으로 전달될 경우 클로저 환경이 구성되면 외부 함수의 변수는 내부 함수 호출에 따라 값이 변경될 수 있다. 일단 외부 함수의 반환 값이 내부 함수가 되는 것을 이 해해보자.

예제 7-25 : 외부 함수의 반환값으로 내부 함수에 대한 정보 확인

외부 함수에 내부 함수를 정의하고 반환으로 내부 함수를 전달했다. 외부 함수는 단순히 내부 함수만 반환하는 기능을 가지고 있고 덧셈을 처리하는 기능은 내부 함수에만 있다.

```python
In : def outer(x) :
def inner(y) :
return x+y
return inner
```

outer 함수에 인자 하나를 실행하고 결과값을 inner 변수에 할당했다. 이때 inner를 출력 하면 함수 내부에 내부 함수가 출력하는 것을 표시한다.

```python
In : inner = outer(5)
print(inner)
Out: <function outer.<locals>.inner at 0x10ddedd08>
```

내부 함수도 함수이므로 함수의 속성을 가지고 있다. 내부 함수의 _ _name_ _ 속성을 확 인하면 내부 함수라는 것을 알 수 있다.

내부 함수에 인자를 전달해서 실행해야 외부 함수와 내부 함수의 인자가 전부 전달되어 실 행되는 것을 알 수 있다.

```python
In : print(inner.__name__)
print(inner(5))
Out: inner
```

예제 7-26 : 타 모듈의 함수와 내부 함수 사용의 차이점

타 모듈의 함수를 외부 함수 outer 내에서 지정하면 내부 함수를 정의해서 사용하는 것과 어떤 차이가 있는지 알 수 있다.

타 모듈이므로 사용하기 위해 import 모듈명을 사용했고 이 모듈 명칭을 별칭으로 사용하 기 위해 as 별칭을 지정했다.

```python
In : import operator as op
def outer(op_code) :
inner = {'+':op.add,
'-':op.sub,
'*':op.mul,
'/':op.truediv}.get(op_code,op.add)
return inner
```

타 모듈에 정의된 함수를 내부 함수처럼 사용하지만 결과값을 확인하면 동일한 처리를 하 는 것을 알 수 있다.

```python
In : inner = outer('/')
print(inner)
print(inner(5,5))
Out: <built-in function truediv>
1.0
```

위 예제의 처리를 위해 다시 내부 함수에서 외부 모듈이 함수를 로직으로 처리하도록 했다. 이제 내부 함수가 내부적으로 어떻게 처리되는지를 구별해보자. 외부 함수 내에는 내부 함수가 있고 그 내부 함수 안에 외부 모듈의 함수를 지정한다.

최종적인 반환 결과는 내부 함수 내에 return문에 있고 이 딕셔너리는 연산기호에 따라 값 으로 저장된 함수를 호출하는데, 외부 함수로 전달된 매개변수를 이용해서 처리하는 것을 보면 내부 함수 내에서는 외부 함수의 네임스페이스가 항상 검색 가능한 것을 알 수 있다.

```python
In : import operator as op
def outer_(op_code) :
def inner_(x,y) :
return {'+':op.add,
'-':op.sub,
'*':op.mul,
'/':op.truediv}.get(op_code,op.add)(x,y)
return inner_
```

외부 함수를 호출하면 반환 값으로 내부 함수가 전달된다. 이 내부 함수를 출력하면 외부 함수 내의 내부 함수가 내포된 것을 확인한다.

이 내부 함수를 실행하면 결과가 나오는 것을 알 수 있다.

```python
In : inner = outer_('/')
print(inner)
print(inner(5,5))
Out: <function outer_.<locals>.inner_ at 0x10dccfe18>
1.0
```

예제 7-27 : 내부 함수로 외부 함수의 매개변수 자료형 검증

외부 함수를 지정하고 그 내부에 두 개의 내부 함수를 만든다. 하나는 내부 함수에 전달되 는 자료형을 체크할 수 있는 함수를 만들어서 내부의 로직을 공통된 기능으로 처리한다.

또 다른 내부 함수는 들어오는 매개변수의 자료형을 확인하고 최종 기능을 실행해서 반환 한다.

```python
In : def outer_check(type_code) :
def type_check(a) :
return isinstance(a,type_code)
def inner_(x,y) :
if not type_check(x) :
x = type_code(x)
if not type_check(y) :
y = type_code(y)
return x+y
return inner_
```

외부 함수에서 자료형으로 int를 넣었다. 이제 이 함수는 정수에 대한 덧셈을 처리한다. 내 부 함수를 호출할 때 실수 값을 전달하면 정수가 아니므로 형 변환을 정수로 해서 계산이 되는 것을 알 수 있다.

```python
In : inner = outer_check(int)
print(inner(1.1,2.2))
Out: 3
```

외부 함수에 float를 넣어서 실수 자료형으로 처리하도록 하면 inner 함수에 실수와 정수 를 넣어서 처리하여 실수 계산이 된다.

```python
In : inner = outer_check(float)
print(inner(1.3,2))
Out: 3.3
```

## 7.4.3 내부 함수 안에서 nonlocal 변수 사용하기

외부 함수와 내부 함수도 함수이므로 각 함수별로 지역 변수가 있고 이 지역 변수를 관리 하는 네임스페이스가 만들어진다. 내부 함수에서 외부 함수의 네임스페이스에 어떻게 접 근하고 내부를 갱신하는지를 알아본다.

또한 nonlocal 키워드를 사용해서 처리하는 방법도 알아본다.

✚ 함수별로 네임스페이스 영역을 별도로 생성

함수가 정의되어 로딩이 되면 모든 함수는 클래스 function이 하나의 인스턴스로 만들어 진다. 이 함수가 어디에서 만들어졌는지에 따라 연결되는 네임스페이스 연결 계층이 달라 진다.

모듈 내에서 생성된 함수의 경우 자기 자신의 네임스페이스에서 상위는 바로 모듈의 네임 스페이스이지만, 함수 내에 함수 정의문에 의해 생성된 내부 함수인 경우는 자기 네임스 페이스를 처리하고 상위의 외부 함수 네임스페이스를 검색한 후에 모듈의 전역 네임스페 이스를 검색하는 스코프 규칙이 생성된다.

함수별로 어떻게 네임스페이스가 생성되어 참조하는지를 알아본다.

예제 7-28 : 함수별 네임스페이스 생성 확인하기

함수를 정의할 때 외부 함수에 대한 로컬 영역은 함수 내부에서 pprint.pprint를 가지고 네임스페이스를 출력했다.

내부 함수의 네임스페이스는 내부 함수가 실행될 때 반환한다. 외부 함수에서 내부 함수 를 밖으로 전달했으므로 외부에서 실행해야 내부 함수의 네임스페이스를 출력할 수 있다.

```python
In : import pprint
def outer_local(x,y) :
def inner_local(a,b) :
return locals()
print("outer_local")
pprint.pprint(locals())
return inner_local
```

외부 함수를 실행하면 외부 함수 네임스페이스에 내부 함수와 매개변수 2개가 저장되어 있는 것을 알 수 있다.

```python
In : inner = outer_local(10,20)
Out: outer_local
{'inner_local': <function outer_local.<locals>.inner_local at 0x10dded0d0>,
'x': 10,
'y': 20}
```

전달받은 내부 함수를 실행하면 내부 함수의 네임스페이스가 출력되는 것을 알 수 있다.

```python
In : print("inner_local")
print(inner(30,40))
Out: inner_local
{'b': 40, 'a': 30}
```

✚ 내부 함수 외의 변수를 사용: nonlocal로 지정

외부 함수 영역을 nonlocal로 정의하고 내부 함수 내에서 외부 함수의 로컬 변수를 참조 할 수 있다. 내부 함수를 정의해서 사용할 경우 대부분 클로저 환경을 만들어서 사용한다.

예제 7-29 : 외부 함수 네임스페이스 사용하기

외부 함수의 매개변수 x가 있지만 이들 내부 함수에는 x라는 변수가 없다. 하지만 내부 함 수에서 x라는 변수를 참조만 하기에 외부 함수의 네임스페이스에서 검색하여 읽어온다.

```python
In : def outer_local(x) :
def inner_local(y) :
return x+y
return inner_local
```

매개변수 x에 10이 연결되도록 외부 함수를 실행하고 반환된 내부 함수를 inner라는 변 수에 할당했다. 내부 함수를 호출하고 매개변수 y에 40을 할당해서 계산을 수행하면 외부 함수의 x를 검색해서 가져온 것을 확인할 수 있다.

이때에 주의할 점은 변수를 참조만 할 경우에는 스코프 규칙에 따라 외부를 검색해서 가져 온다는 것이다.

```python
In : inner = outer_local(10)
print("inner_local")
print(inner(40))
Out: inner_local
```

이번에는 내부 함수에 정의되지 않은 변수를 수정해서 처리해본다. 단순하게 검색한 경우 와 어떻게 달라지는지를 확인한다.

```python
In : def outer_local_(x) :
def inner_local_(y) :
x = x + 1
return x
return inner_local_
```

외부 함수를 호출해서 x에 10이 할당되었다. 내부 함수에 40을 인자로 전달해서 실행시키 면 예외가 발생한다.

예외는 x = x + 1에서 x + 1이라는 표현식이 평가될 때 발생하는 것을 알 수 있다. 왜 x 라는 변수가 로컬에 지정되는지를 명확히 알아야 한다. 단순히 참조만 할 경우에는 상위 로 검색해서 가져왔지만 갱신할 경우는 일단 자기 내부에 지정되지 않으면 예외를 발생시 킨다.

```python
In : inner = outer_local_(10)
print("inner_local")
print(inner(40))
Out: inner_local
---------------------------------------------------------------------
UnboundLocalError       Traceback (most recent call last)
<ipython-input-57-19afb953bcfd> in <module>()
1 inner = outer_local_(10)
2 print("inner_local")
----> 3 print(inner(40))
<ipython-input-55-877a21c5dce1> in inner_local_(y)
3   def inner_local_(y) :
----> 4   x = x + 1
5     return x
UnboundLocalError: local variable 'x' referenced before assignment
```

예외가 발생한 부분을 수정해서 x라는 변수가 nonlocal이라는 키워드를 명기했다. 이제 외부 함수에 있다면 검색해서 처리를 할 것이다.

```python
In : def outer_local_(x) :
def inner_local_(y) :
nonlocal x
x = x + 1
return x
return inner_local_
```

외부 함수의 네임스페이스를 검색하고 x라는 변수를 찾아서 값을 가져온 후 이 값에 1을 더해서 처리하지만 실제 내부 함수로 전달된 인자에 대한 처리는 없으므로 별도 표시가 없다.

```python
In : inner = outer_local_(10)
print("inner_local")
print(inner(40))
Out: inner_local
```

예제 7-30 : 내부 함수 내에 내부 함수를 내포하기

이번에는 그 내부 함수를 외부 함수로 보고 또 하나의 내부 함수를 지정했다.

내부 함수 내의 내부 함수를 지정할 때 어떻게 처리되는지를 알아보자. 내부 함수 내에 내 부 함수를 정의했고 내포된 내부 함수에 없는 변수를 가지고 계산하는 로직을 넣었다.

```python
In : def out_(x) :
def inn_1(y) :
def inn_2(z) :
#nonlocal y
y = y+1
return x+y+z
return inn_2
return inn_1
```

외부 함수와 첫 번째 내부 함수를 실행했을 때까지는 아무런 예외가 발생하지 않았다.

```python
In : inn_1 = out_(10)
inn_2 = inn_1(20)
```

내부 함수 내의 내부 함수를 실행하면 내부 함수 내의 내부 함수에서 계산될 때 변수 y가 지역에 지정되어 있지 않아 예외가 발생한 것을 알 수 있다.

전역과 지역 네임스페이스에서 예외가 발생한 것처럼 동일하게 예외가 발생하는 것을 알 수 있다. 일단 함수 내에서 실행되어 평가될 때에는 그 앞에 해당되는 변수가 먼저 지역 네임스페이스에 할당이 되어 있어야 한다.

```python
In : print(inn_2(30))
Out: --------------------------------------------------------------------
UnboundLocalError      Traceback (most recent call last)
<ipython-input-70-a5cc9b67a986> in <module>()
----> 1 print(inn_2(30))
<ipython-input-68-cb7d88a7a98e> in inn_2(z)
3     def inn_2(z) :
4       #nonlocal y
----> 5     y = y+1
6       return x+y+z
7     return inn_2
UnboundLocalError: local variable 'y' referenced before assignment
```

그래서 내부 함수 내에 내포된 내부 함수에 주석으로 막혀 있던 nonlocal 키워드를 풀어 서 변수 y가 내 지역 네임스페이스에 저장된 변수가 아니라고 하면 예외가 사라지고 제대 로 처리되는 것을 알 수 있다.

```python
In : def out_(x) :
def inn_1(y) :
def inn_2(z) :
nonlocal y
y = y+1
return x+y+z
return inn_2
return inn_1
In : inn_1 = out_(10)
inn_2 = inn_1(20)
print(inn_2(30))
Out: 61
```
