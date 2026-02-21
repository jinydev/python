---
layout: default
title: "07.06 함수"
---

# 07.06 함수

이번에는 함수 내의 세부적인 정보를 자세히 알아본다. 간단한 부분은 위에서 확인했지만 이번에 함수 내부의 속성들을 자세히 알아보고 이를 모듈 inspect를 이용해서 조회하는 방법을 알아본다.

## 7.6.1 function 및 code class 이해하기

함수 정의문으로 작성된 함수나 람다 함수는 로딩될 때 function 클래스에 속성이 만들어 지고 이 내부에 code 클래스의 인스턴스까지 연결해서 속성을 확인할 수 있다.

익명 함수인 람다 함수도 동일한 구조이므로 동일한 결과가 나오는 것을 알 수 있다.

✚ 함수의 자료형 확인

다시 함수를 정의하고 어떤 자료형으로 구성되었는지를 다시 확인해본다.

예제 7-40 : 함수의 자료형 확인

함수를 정의하고 이 addd 함수가 함수 클래스에 의해 만들어진 하나의 인스턴스인지를 확인한다.

isinstance 내장 함수를 가지고 불리언 값으로 확인할 수도 있다.

```python
In : def addd(x,y) :
return x+y
print(type(addd))
print(isinstance(addd, type(addd)))
Out: <class 'function'>
True
```

✚ 함수 내의 로직을 관리하는 code 클래스 확인하기

함수 정의문이 로딩되면 함수 내의 다양한 스페셜 속성들이 만들어진다. 이 안에 function 클래스 내 code 클래스의 인스턴스가 생긴다. 이에 대한 정보를 확인해보겠다.

예제 7-41 : _ _code_ _ 속성의 자료형 확인하기

함수를 정의하고 이 함수를 내부의 _ _code_ _ 속성 내 값에 대해 type 클래스가 어떤 클 래스로 만들어졌는지를 확인하면 code class라는 것을 확인할 수 있다.

```python
In : def addd(x,y) :
return x+y
print(type(addd.__code__))
Out: <class 'code'>
```

이제 이 Code 클래스의 속성이나 메서드들이 어떤 것이 있는지를 확인해본다. Code 클 래스와 object 클래스를 비교해서 차집합으로 처리하면 code 클래스만 갖는 속성이나 메 서드를 확인할 수 있다.

```python
In : import pprint
print(type(addd.__code__))
co = set(dir(addd.__code__))
o = set(dir(object))
pprint.pprint(co-o)
Out: <class 'code'>
{'co_argcount',
'co_cellvars',
'co_code',
'co_consts',
'co_filename',
'co_firstlineno',
'co_flags',
'co_freevars',
'co_kwonlyargcount',
'co_lnotab',
'co_name',
'co_names',
'co_nlocals',
'co_stacksize',
'co_varnames'}
```

일단 몇 개의 인자가 들어가있는지를 확인하면 인자가 2개라는 것을 알 수 있고 함수의 이 름도 확인할 수 있으며 함수 내에 있는 변수도 알 수 있다. 일단 매개변수의 변수만을 가 지고 있으므로 변수에 지정된 이름도 전부 매개변수라는 것을 알 수 있다.

```python
In : print(addd.__code__.co_argcount)
print(addd.__code__.co_name)
print(addd.__code__.co_names)
print(addd.__code__.co_varnames)
Out: 2
addd
()
('x', 'y')
```

✚ 함수의 소스 및 바이트 코드 보기

파이썬 함수는 소스를 가지고 있다. 이 소스도 작성된 함수 로직을 살펴보기 위해 inspect 모듈, dis 모듈을 통해 함수에 대한 내부 정보를 확인할 수 있다. 일단 소스와 바이트 코드 를 보는 법을 알아본다.

예제 7-42 : 함수 소스 및 바이트 코드 보기

일단 import inspect를 하고 inspect.getsource 함수의 인자에 함수가 지정된 이름을 넣 으면 함수의 소스(source)가 출력된다.

```python
In : import inspect
def addd(x:int,y:int) -> int :
return x+y
print(inspect.getsource(addd))
Out: def addd(x:int,y:int) -> int :
return x+y
```

파이썬 프로그램 소스를 인터프리터에서 실행하기 위해서는 바이트 코드로 변환이 필요 하다.

이 바이트 코드로 변환된 것을 그대로 보여주는 dis 모듈을 import하고 dis.dis 함수를 이 용해서 함수 로직 처리되는 바이트 코드를 볼 수 있다.

```python
In : import dis
print(dis.dis(addd))
Out: 4      0 LOAD_FAST     0 (x)
2 LOAD_FAST     1 (y)
4 BINARY_ADD
6 RETURN_VALUE
None
```

## 7.6.2 함수 시그너처

파이썬에서도 함수의 매개변수나 반환값에 대한 결과에 대해 주석으로 정보를 더 줄 수 있다.

이는 내부적으로 함수의 시그너처(signature)라는 것을 명확히 파악할 수 있다.

함수의 매개변수 자료형과 반환 자료형을 지정하는 것으로써 파이썬에서는 이를 annotation으로 처리해 하나의 주석처럼 사용된다는 것을 확인한다.

✚ 함수의 시그너처를 가져오기

파이썬의 inspect 모듈을 이용해서 함수의 중요 정보인 매개변수와 반환 값인 시그너처를 알아본다.

표는 inspect 모듈에서 시그너처를 조회하는 함수와 시그너처를 구성하는 클래스 등을 간 략히 설명한다.

| Function 및 속성 | Description |

|---|---|

inspect.signature(함수명) 함수에 대한 시그너처 정보를 출력 Signature.parameter 시그니처 객체의 매개변수 주석 Signature.return_annotation 시그니처 객체의 반환 값 주석

예제 7-43 : 시그너처와 매개변수 정보 확인하기

함수를 정의한다. 매개변수와 반환 값 처리에 대한 자료형을 지정한다.

```python
In : import inspect
def addd(x:int,y:int) -> int :
return x+y
```

이 함수의 signature로 함수를 조회하면 자료형이 한 Signature 클래스의 인스턴스로 나 온다.

이 결과를 출력하면 시그너처 정보가 확인된다.

```python
In : a = inspect.signature(addd)
print(type(a))
print(a)
Out: <class 'inspect.Signature'>
(x:int, y:int) -> int
```

이 인스턴스를 OrderedDict 클래스 인스턴스로 확인할 수 있다. 이 parameters 내의 속 성을 확인하면 속성 내부의 값을 출력한다. 반환값은 return_annotation이 있어 이를 조 회하면 매개변수와 반환값에 대한 정보를 조회할 수 있다.

```python
In : print(a.parameters)
print(a.parameters['x'])
print(a.parameters['y'])
print(a.return_annotation)
Out: OrderedDict([('x', <Parameter "x:int">), ('y', <Parameter "y:int">)])
x:int
y:int
<class 'int'>
```

## 7.6.3 함수 기본 정보

함수 인스턴스의 속성 정보에 직접 접근하지 않고 inspect 모듈 내의 함수를 이용해서 조 회해본다. 상세한 처리는 이 책의 범위를 넘으므로 기본적인 호출에 대해서만 알아본다.

✚ 함수의 doc과 module 정보 가져오기

함수 내부의 속성에 직접 접근하지 않고 inspect 모듈로 함수의 정보에 접근할 수 있다.

표는 함수의 _ _doc_ _, _ _module_ _ 에 대한 정보를 함수로 처리하는 예시이다.

| function | Description |

|---|---|

inspect.getdoc(obj) obj 내부의 doc을 출력 inspect.getmodule(obj) obj에 대한 모듈 이름을 출력 inspect.getsourcefile(obj) obj에 대한 소스파일(모듈 이름)을 출력

예제 7-44 : 함수에 대한 기본 정보도 함수로 조회하기

함수의 정보도 속성을 이용하지 않고 inspect 모듈에 있는 함수를 통해 조회할 수 있다.

함수 설명, 함수 모듈명, 함수의 인자, 함수가 작성되어 있는 파일 등을 출력해서 볼 수 있다.

```python
In : import inspect
def addd(x:int,y:int) -> int :
```

""" addd 함수에 대한 __doct__ """ return x+y 함수 내의 도움말을 조회해서 출력한다.

```python
In : a = inspect.getdoc(addd)
print(type(a))
print(a)
Out: <class 'str'>
```

addd 함수에 대한 __doct__ 이 함수의 code 클래스를 확인해서 인자를 조회하면 Arguments 인스턴스로 처리하는 것을 알 수 있다.

이 함수의 소스가 어느 파일에 있는지를 확인하면 주피터 노트북에서 처리하는 것을 알 수 있다.

```python
In : b = inspect.getargs(addd.__code__)
print(b)
c = inspect.getsourcefile(addd)
print(c)
Out: <Arguments(args=['x', 'y'], varargs=None, varkw=None)
<ipython-input-103-04e88e16e840>
CHAPTER
```

변수/함수 매개변수 파이썬에서 모든 이름은 네임스페이스에서 관리한다. 즉, 변수, 함수, 클래스 등도 이름이 므로 네임스페이스에서 관리한다. 네임스페이스는 파이썬 딕셔너리 자료형이므로 정보는 키와 값으로 저장되며, 파이썬 구성 요소인 변수, 함수, 클래스의 이름은 키로 가고 이름 에 할당되는 객체는 값으로 저장된다. 함수와 클래스도 이름을 키로 넣고 인스턴스는 값 으로 전환되어 관리한다.

모듈에 있는 전역 네임스페이스에서 처리하는 것처럼 함수 내부의 지역 네임스페이스에서 처리되는 것도 구별해서 이해를 해야 한다.

특히 변수는 튜플이나 딕셔너리 값을 관리할 수 있는데 이런 부분을 어디에서 사용할 것인 가에 대해서도 자세히 알아봐야 한다.

파이썬에서 함수의 매개변수와 인자 등도 전부 변수의 할당처럼 사용된다. 하나의 원소만 가지는 자료형과 여러 원소를 가지는 자료형이 변수에 할당될 때 하나로 묶여서 할당이 되 거나 여러 원소를 가진 자료형이 여러 변수에 할당되는 것도 가능하다.

이런 처리가 packing과 unpacking 규칙으로 표현되므로 이번 장에서 같이 알아본다.

✚ 이해해야 할 사항

● 변수로 할당할 때 변수에 각각 할당되는 언패킹

● 변수명 앞에 별표(*)를 붙여 다양한 원소를 갖도록 패킹

● 함수의 매개변수도 다양한 인자 할당

● 함수 매개변수와 인자 정의 순서

● 함수 매개변수에 패킹 : 가변 위치와 가변 키워드

● 함수 호출에 의한 인자의 언패킹 : 가변 위치와 가변 키워드

● 함수 결과에 대한 반환값을 변수에 패킹하거나 언패킹하기
