---
layout: default
title: "12.02 내장"
---

# 12.02 내장

수학에서는 함수의 합성을 나타내며 파이썬에서는 함수의 합성이나 함수로의 함수 인자 전달 등을 표현하는 고차 함수를 내장 함수로 지원한다.

함수를 처리하는 방식을 3가지로 구분해서 설명하기로 하겠다.

● 축소된 결과 처리하기 : reduce, sum, min, max

● 받은 인자를 변형하기 : map, filter

● 함수 처리 툴 이용하기 : functools.partial, apply

## 12.2.1 reduction 처리

함수의 인자로 받은 값들을 처리해서 값을 축소한 결과를 보여주는 방식이 고차 함수들 이다.

예제 12-10 : 최댓값/최솟값 구하기

최댓값과 최솟값을 구하는 함수는 내장 함수라 BuiltinFunctionType이다.

```python
In : import types
for i in (min,max) :
if type(i) == types.BuiltinFunctionType :
print(i)
Out: <built-in function min>
<built-in function max>
```

여러 개의 값을 나열한 후 key에 하나의 매개변수를 받고 처리한다. 그중 하나의 결과를 처리하는 함수를 받아서 기존에 들어온 원소의 값을 변환한 후에 최솟값과 최댓값을 처리 할 수 있다.

```python
In : min(1,2,3,4,key=lambda x: -1*x)
Out: 4
In : max(1,2,3,4,key=lambda x: -1*x)
Out: 1
```

Sequence 자료형도 받아서 처리할 수 있으므로 별도의 함수를 정의해서 최댓값과 최솟 값을 구하는 함수를 key로 전달받아 최댓값과 최솟값을 동시에 구한다.

```python
In : def func(l,key=None) :
if key is None :
key = {'key':lambda x :x}
else :
key = {'key' : key}
return min(l,**key),max(l,**key)
```

리스트를 받아서 반대로 최솟값과 최댓값을 구하도록 처리했다.

```python
In : l = [1,2,3,4,5]
print(func(l,lambda x : (5-x)**2))
Out: (5, 1)
```

문자열도 유니코드 값에 따라 최솟값과 최댓값을 구할 수 있다.

```python
In : s = "가을이라"
print(func(s))
Out: ('가', '이')
```

예제 12-11 : functools 모듈 내의 reduce

모듈 functools 내에 reduce 함수도 내장 함수로 제공된다. 특정 함수가 인자로 들어올 경우 뒤에 오는 Sequence 자료형을 가지고 함수를 이용해서 축약된 값을 계산한다.

```python
In : import functools as ft
print(ft.reduce)
Out: <built-in function reduce>
```

모듈 operator 내의 add 함수를 인자로 넣어서 전달받은 값을 처리하며, add라는 함수가 두 수의 덧셈만을 표시하지만 reduce된 결과는 리스트 전체 원소를 더해서 결과를 보여 준다.

```python
In : import functools as ft
import operator as op
print(ft.reduce(op.add,[1,2,3]))
print(sum([1,2,3]))
Out: 6
```

## 12.2.2 변형 및 필터링

Sequence 자료형에 대한 데이터 인자를 가지고 내부 원소의 값을 변형하거나, 또는 전체 원소에서 특정 원소만 추출해서 처리하는 함수 처리를 말한다.

예제 12-12 : 데이터 변형 클래스와 지능형 처리

고차 함수도 클래스로 정의가 가능하다. 일단 고차 함수처럼 처리하기 위해 인스턴스를 만들고 이 인스턴스를 가지고 실행하면 함수의 결과와 동일하게 처리된다.

Sequence 자료형을 받아서 처리하므로 반복형도 가능하지만 반복자로 처리하는 이유는 많은 양이 있을 경우 동적으로 처리할 수 있는 구조를 만들어서 처리하려는 것이다.

```python
In : import collections as cols
print(map)
print(issubclass(map, cols.Iterable))
print(issubclass(map, cols.Iterator))
Out: 6<class 'map'>
True
True
```

Sequence형 리스트를 받고 그 안의 원소를 제곱한 값으로 변형해서 결과를 표시하는 것 이다. 인스턴스에 list 생성자를 이용해서 한꺼번에 전부 리스트로 변형하여 출력하면 리 스트 자료형으로 출력된다.

```python
In : l = [1,2,3,4]
m = map(lambda x : x*x ,l)
print(list(m))
Out: [1, 4, 9, 16]
```

지능형 리스트를 이용해서 작성하면 간단하게 map 클래스처럼 생성도 가능하고 단계도 단순하다. 대신 변형이 되는 람다 함수를 원소로 받을 때 바로 실행된 결과가 리스트의 원 소로 들어가게 만들었다.

```python
In : lc = [ (lambda x : x*x)(x) for x in [1,2,3,4]]
print(lc)
Out: [1, 4, 9, 16]
```

예제 12-13 : 람다 함수를 전달해서 데이터 필터링

필터링을 처리하는 내장 클래스인 filter도 고차 함수를 클래스 방식을 통해 인스턴스로 실 행할 때 처리되는 구조이다.

```python
In : import collections as cols
print(filter)
print(issubclass(filter, cols.Iterable))
print(issubclass(filter, cols.Iterator))
Out: <class 'filter'>
True
True
```

짝수인 값만을 추출하도록 처리하는 람다 함수와 Sequence 자료형을 받아 특정 원소만 을 추출한다. 이때 람다 함수의 결과가 True 조건과 만족하는 경우에만 추출이 되는 것을 알 수 있다.

```python
In : l = [1,2,3,4]
f = filter(lambda x : x%2==0 ,l)
print(list(f))
Out: [2, 4]
```

지능형 리스트로 처리할 때는 제약 조건을 주는 if문으로 람다 함수 부분을 처리하면 위의 filter 클래스와 동일한 처리 결과를 나타낸다 .

```python
In : lc = [ x for x in [1,2,3,4] if x %2 == 0]
print(lc)
Out: [2, 4]
```

## 12.2.3 함수형 처리 툴 : apply 함수

다른 함수를 받아서 그 함수를 처리하는 함수를 정의할 때 전달되는 함수와 전달되는 함수 의 매개변수를 모두 받을 수 있도록 표시하는 것이 중요하다. 특히 전달되는 함수의 매개 변수가 추가되거나 삭제되어도 변하지 않도록 매개변수를 정의해야 한다.

예제 12-14 : apply 함수 정의 및 실행

모든 함수가 내부에서 처리되려면 인자로 전달된 함수의 매개변수를 그대로 받을 수 있도 록 정의되어야 한다. 모든 함수의 매개변수를 받을 수 있는 구조는 *가변인자명, **가변키 워드 인자로 처리한다.

모든 함수를 받아서 실행할 수 있는 apply 함수와 Apply 클래스를 만든다.

```python
In : def apply(func,*args,**kwargs) :
return func(*args,**kwargs)
Out: class Apply :
def __init__(self,func) :
self.func = func
def __call__(self,*args, **kwargs) :
return self.func(*args, **kwargs)
```

내장 함수 sum와 리스트를 받아 apply 함수와 Apply 클래스의 인스턴스를 생성해서 실 행한 결과이다.

```python
In : print(apply(sum,[1,2,3,4]))
Out: 10
In : apply = Apply(sum)
print(apply([1,2,3,4]))
Out: 10
```
