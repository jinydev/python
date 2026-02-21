---
layout: default
title: "02.05 네임스페이스(Namespace)"
---

# 02.05 네임스페이스(Namespace)

위에서 모듈과 함수의 네임스페이스를 조회하는 globals와 locals 함수를 알아봤다. 네임 스페이스를 지정하는 키워드인 global, nonlocal도 배웠다. 또 한 번 강조해서 다시 설명 하는 이유는 이름과 값으로 처리되는 파이썬에 대한 개념을 알아보기 위해서이다.

## 2.5.1 모듈 네임스페이스에 할당하고 조회하기

프로그램을 작성하면 문장에 있는 이름을 관리해서 다시 호출할 때 재사용할 수 있도록 만 들어야 한다. 이때 해당하는 이름을 관리하는 것을 네임스페이스라 하고 이 네임스페이스 에 등록하고 조회해서 처리하는 방식을 알아본다.

예제 2-48 : 네임스페이스는 변수 할당하고 조회

하나의 모듈별로 별도의 네임스페이스가 만들어진다. Variable이라는 모듈을 만들고 변 수 x에 1을 할당한다.

이 모듈이 전역 네임스페이스에서 함수 globals( )로 이 안에 들어가 있는 이름 x를 조회해 서 출력한다.

```python
In : %%writefile variable.py
x = 1
print(globals()['x'])
Out: Writing variable.py
In : %run variable.py
Out: 1
```

함수만을 지정한 모듈에 add 함수를 정의했다. 이 모듈 내에서 이름으로 add를 검색하면 함수 레퍼런스를 출력하고 이 함수를 호출 연산자에 의해 실행시키면 함수 객체가 실행되 어 처리되는 것을 알 수 있다.

함수가 정의되면 함수명이 네임스페이스의 이름으로 등록되고 함수 객체가 값으로 저장되 기에 이 이름으로 호출해서 실행하면 함수로 정의한 것이 호출되어 처리된다.

```python
In : %%writefile functions.py
def add(x,y) :
print("namespace")
return x+y
print(globals()['add'])
print(globals()['add'](10,20))
Out: Writing functions.py
In : %run functions.py
Out: <function add at 0x10cda9e18>
namespace
```

별도의 모듈에 Car 클래스를 정의하면 위의 함수처럼 Car라는 이름과 이 클래스의 로딩된 객체가 값으로 등록된다. 이를 검색해서 실행시키면 하나의 인스턴스를 만들고 그 인스턴 스의 속성을 조회해서 출력도 가능하다.

```python
In : %%writefile Klass.py
class Car :
def __init__(self,name) :
self.name = name
print(globals()['Car'])
c = globals()['Car']("Ford")
print(c.name)
Out: Writing Klass.py
In : %run Klass.py
Out: <class '__main__.Car'>
Ford
```

## 2.5.2 전역 네임스페이스 접근 방식

파이썬은 모듈별로 생긴 전역 네임스페이스를 호출할 수 있는 기능도 그 모듈에 속한 함수 에서 사용이 가능하다.

다른 모듈에 전역 네임스페이스는 참조가 안 되므로 이를 사용할 경우는 함수의 인자로 전 달한다.

✚ 함수가 보는 전역 네임스페이스 확인

함수가 모듈 안에 작성될 때부터 전역 영역이 결정된다. 어떻게 자기의 전역을 검색해서 결과를 주는지를 확인해본다.

예제 2-49 : 함수 내의 전역 네임스페이스 확인

함수 func에 속한 모듈인 func_nam에서 x라는 변수를 정의하고 결과로 x를 리턴한다.

```python
In : %%writefile func_name.py
x = 100
def func() :
print(globals()['x'])
return x
Out: Writing func_name.py
```

함수 func_main이 속한 모듈인 func_main에서 x라는 변수를 정의하고 결과로 x를 리턴 한다.

```python
In : %%writefile func_main.py
x = 888
def func_main() :
return x
Out: Writing func_main.py
```

두 개의 모듈 func_name, func_main을 import하고 이 모듈을 이용해서 함수를 호출하 면 각 모듈 내 변수 x에 대해 출력한다. 함수가 속한 모듈을 import했고 x라는 변수를 별 도의 모듈인 main_call.py에 지정했지만 함수는 항상 자신의 속한 모듈 내의 전역 네임스 페이스에서 x 변수를 검색해서 처리하는 것을 알 수 있다.

```python
In : %%writefile main_call.py
import func_name
import func_main
x = 999
print(func_name.func())
print(x)
print(func_main.func_main())
Out: Writing main_call.py
In : !python main_call.py
Out: 100
```
