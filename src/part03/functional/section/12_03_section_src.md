---
layout: default
title: "12.03 멀티플"
---

# 12.03 멀티플

함수형 프로그래밍 처리를 하거나 동일 함수를 정의할 때 다양한 시그너처를 가진 함수도 같이 지정해서 하나의 이름으로 호출해도 각 시그너처에 맞춰 처리해준다.

파이썬에서는 이름으로만 호출해서 함수의 시그니처에 따라 함수 호출이 불가하지만 멀티 플 디스패치(multiple dispatch) 처리를 위한 모듈을 제공한다.

## 12.3.1 멀티플 디스패치 모듈 이해하기

시그너처가 다른 동일한 이름의 함수를 정의하고 데코레이터를 사용하여, 각 함수들이 상 황에 따라 호출될 수 있도록 구성한다.

예제 12-15 : 멀티플 디스패치 이해하기

새로운 모듈을 설치한다.

```python
In : !pip install --upgrade multipledispatch
```

모듈 multipledispatch의 내부를 조회하면 dispatch 함수가 있고 이 함수를 가지고 사용 자가 정의한 동일한 함수들을 별도로 처리할 수 있도록 구성한다. 동일한 이름의 함수들 을 가지고 시그너처에 따라 함수를 정의해서 등록할 수 있도록 구조화를 지원한다.

```python
In : import multipledispatch
for i in dir(multipledispatch) :
if not i.startswith("__") :
print(i)
Out: Dispatcher
MDNotImplementedError
conflict
core
dispatch
dispatcher
halt_ordering
restart_ordering
utils
```

멀티플 디스패치를 처리할 dispatch가 함수인지를 확인해본다.

```python
In : print(multipledispatch.dispatch)
Out: <function dispatch at 0x00000000025C3D90>
```

동일한 함수 add를 가지고 다양한 자료형을 넣어서 하나의 함수로 처리할 수 있도록 구성 한다.

이때 dispatch를 데코레이터 처리하고 함수에 들어가 매개변수들이 자료형을 dispatch 인자로 전달하면, 내부적으로 dispatch에 전달된 인자로 키로 구성되고 데코레이터 처리 되는 실행 함수가 값으로 매핑되어 저장된다.

```python
In : from multipledispatch import dispatch
@dispatch(int, int)
def add(x,y) :
print(" integer add call ")
return x+y
@dispatch(str, str)
def add(x,y) :
print(" string add call ")
return x+y
@dispatch(list, list)
def add(x,y) :
print(" list add call ")
return x+y
```

정수를 매개변수로 해서 처리하면 정수값을 계산하는 add 함수가 호출되어 처리되는 것 을 알 수 있다.

```python
In : print(add(5,5))
Out: integer add call
```

문자열을 인자로 전달하면 문자열을 처리하는 함수가 호출된다.

```python
In : print(add("멀티플 ","디스패치"))
Out: string add call
멀티플 디스패치
```

리스트를 인자로 전달받으면 리스트를 더하는 함수가 호출되어 처리된다.

```python
In : print(add([1,2,3,4],[5,6,7,8]))
Out: list add call
[1, 2, 3, 4, 5, 6, 7, 8]
```

## 12.3.2 멀티플 디스패치 클래스 이해하기

멀티플 디스패치는 여러 개의 함수가 정의되지만 하나의 함수명으로만 호출된다. 내부적 으로는 여러 개의 함수가 있지만 작동되는 함수를 내부적으로 호출해서 처리한다.

예제 12-16 : 멀티플 디스패치 처리 구조 이해하기

별도의 namespace를 구성해서 @dispatch로 데코레이터 처리할 때 인자로 넣는다. 이 함수들이 처리되는 구조를 알기 위해 별도의 네임스페이스를 부여했다.

```python
In : from multipledispatch import dispatch
my_namespace = {}
@dispatch(int, namespace=my_namespace)
def foo(x) :
```

print(" 정수 처리") return x+ 1 @dispatch(str, namespace=my_namespace) def foo(x) :

print(" 문자 처리") return x+ " 문자 " 이 네임스페이스 내를 조사하면 foo 이름으로 하나의 Dispatcher라는 클래스의 인스턴스 가 만들어진다.

```python
In : print(my_namespace)
print(my_namespace["foo"])
print(type(my_namespace["foo"]))
Out: {'foo': <dispatched foo>}
<dispatched foo>
<class 'multipledispatch.dispatcher.Dispatcher'>
```

이 클래스의 속성을 확인해보면 이 중에 funcs 속성이 있고 이 속성 내에 정의된 함수들은 시그너처 자료형이 키로, 함수가 값으로 구성된 딕셔너리에 들어 있다.

```python
In : for i in dir(my_namespace["foo"]) :
if not i.startswith("_") :
print(i)
Out: add
dispatch
dispatch_iter
doc
funcs
help
name
ordering
register
reorder
resolve
source
```

이 인스턴스의 속성 중에 funcs를 확인해보면 딕 타임의 키가 다른 2개의 함수가 들어가 있는 것을 확인할 수 있다.

```python
In : for i in my_namespace["foo"].funcs.items() :
print(i)
Out: ((<class 'int'>,), <function foo at 0x00000000052257B8>)
((<class 'str'>,), <function foo at 0x0000000005225730>)
CHAPTER
```

파이썬 추상 클래스 파이썬도 추상 클래스가 있고 이를 기반으로 구현 클래스로 확장할 수 있다. 하지만 내장 된 스페셜 메서드를 사용해서 명확하게 상속을 하지 않아도 추상 클래스를 상속한 것처럼 처리도 가능하다.

기본 파이썬 문법에 제공되는 자료형들은 대부분 추상 클래스를 상속받아 구현을 하지 않 고 메서드 오버로딩을 사용해서 프로토콜 규약으로 추상 클래스와의 연관성을 유지한다.

이번에는 추상 클래스에 대한 사용법과 숫자와 컬렉션 자료형에 대한 추상 클래스 간의 관 계를 이해해서 상속 관계와 인스턴스 관계를 추상 클래스에 의해 체크해본다.

마지막은 타입에 대한 힌트도 알아보면서 추상 클래스와 연계된 자료형 간의 관계를 알아 보겠다.

✚ 알아볼 주요 내용

● 추상 메타 클래스, 추상 클래스

● 추상 클래스로 자료형 체크

● 추상 메서드, 추상 클래스 메서드, 추상 정적 메서드, 추상 프로퍼티

● 수에 대한 추상 클래스

● 컬렉션 타입에 대한 추상 클래스

● 변수 등에 대한 타입 힌트 처리

● doctest로 테스트하기
