---
layout: default
title: "05.01 파이썬"
---

# 05.01 파이썬

매핑 자료형도 많은 원소를 관리해서 처리하는 기능을 제공한다. 키는 유일성을 유지하는 자료형만 처리되지만, 값으로는 모든 자료형이 들어온다.

딕셔너리는 들어가는 항목의 key와 value가 쌍으로 들어가며 반드시 키를 넣으면 값도 같이 할당된다.

## 5.1.1 딕셔너리(dict)의 키 구성 및 생성 기준

딕셔너리는 항상 키와 값을 쌍으로 처리하므로 생성할 때부터 키는 해시 알고리즘으로 생 성할 때 변경이 불가능한 자료형들(int, float, tuple, str, bytes, frozenset 등)로만 만들어진다.

변경이 가능한 리스트나 딕셔너리 등은 원소들이 변경되어 동일한 형태를 유지할 수 없어 키로는 구성할 수 없다. 또한 튜플도 완전한 불변성을 유지하지 못하므로 원소 일부 리스 트가 들어오면 키로 사용할 수 없다.

✚ 딕셔너리(dict)의 구조

딕셔너리는 별도의 키를 관리하는 해시로 만들어진 구조가 별도로 생기며 이를 기반으로 값이 다양한 인스턴스와 일대일 매핑된 구조가 만들어진다. 이런 일대일 형태의 매핑을 유지하므로 키가 중복되어 관리될 수 없다.

보통 수학에서는 이런 관계 구조가 함수라고 하지만, 파이썬 등 프로그램에서는 딕셔너리 등의 매핑 자료형을 말한다. 내부적인 알고리즘은 파이썬 등 프로그램 언어에 적합한 것 을 사용하고 있다.

예제 5-1 : 키를 구성하는 해시(hash)를 구성하는 기본 정보

파이썬에서 해시에 대한 정보를 가진 모듈을 확인해본다. 이 알고리즘이 어떻게 작동해서 처리되는지에 대해 이 책의 범위를 넘는 설명은 하지 않는다.

다만 해시에 대한 정보를 조회해서 어떻게 관리하는지 알아본다.

해시는 모듈 sys 내의 hash_info 속성에서 관리한다.

● width: 해시 값에 사용되는 비트의 너비

● hash_bits: 해시 알고리즘의 내부 출력 크기

● seed_bits: 해시 알고리즘의 seed key 크기

● inf: 양의 무한대에 해시 값이 반환

● nan: Nan에 대한 해시값

● algorithm: str, bytes, memoryview의 해시 알고리즘의 이름

```python
In : import sys
print(sys.hash_info.width)
print(sys.hash_info.hash_bits)
print(sys.hash_info.seed_bits)
print(sys.hash_info.inf)
print(sys.hash_info.nan)
print(sys.hash_info.algorithm)
Out: 64
siphash24
```

## 5.1.2 딕셔너리(dict) 생성하기

중괄호( { } ) 사이에 키와 값을 쌍으로 구성한 리터럴과 dict 생성자로 딕셔너리 인스턴스 를 만들 수 있다. 생성자로 생성할 때는 키=값을 인자로 처리하는 키워드 인자(keyword argment)를 사용해서 처리한다.

✚ 딕셔너리(dict)의 빈 인스턴스 생성하기

먼저 아무 값도 없는 빈 딕셔너리를 리터럴 표기법에 따라 중괄호( { } )로 생성한다.

다음에 배우는 set 자료형도 표시될 때 중괄호를 사용하지만, 빈 딕셔너리만 중괄호 표기 법을 사용하므로 두 개의 표현법에 익숙해져야 한다.

예제 5-2 : 빈 딕셔너리 생성

{ } 기호를 이용해서 리터럴 표기법으로 딕셔너리 인스턴스를 생성하거나 dict( ) 생성자 표 기법을 이용해서 빈 딕셔너리를 생성할 수 있다.

빈 딕셔너리를 출력하면 리터럴 표기법인 중괄호로 표시되는 것을 볼 수 있다.

```python
In : d = {}
print(type(d),d)
dc = dict()
print(type(dc),dc)
Out: <class 'dict'> {}
<class 'dict'> {}
```

✚ 딕셔너리(dict) 키의 중복 처리

딕셔너리의 키는 유일성을 가져야 하므로 딕셔너리를 생성할 때도 유일한 키를 만들어서 생성한다.

특히 생성자에 키워드 인자로 표시할 때는 키를 중복해서 처리하면 내부적으로 예외를 발 생시킨다.

예제 5-3 : 키워드 인자에 동일한 키를 중복시킬 경우

딕셔너리 생성자(dict(keyword argment) 표기법으로 인스턴스를 생성할 때 키의 이름을 중 복시킬 경우에는 일단 keyword argment가 중복된다는 예외가 발생한다.

```python
In : d = dict(a=10,b=20,a=20)
Out: File "<ipython-input-9-0a724cb5dcb5>", line 1
d = dict(a=10,b=20,a=20)
^
SyntaxError: keyword argument repeated
```

위의 예제를 수정하여 키워드 인자의 이름을 변경해서 처리하면 값은 동일한 것이 있더라 도 키가 다르면 딕셔너리가 생성되는 것을 알 수 있다.

```python
In : d = dict(a=10,b=20,c=20)
print(d)
Out: {'a': 10, 'b': 20, 'c': 20}
```

예제 5-4 : 튜플 원소 리스트로 동일한 키를 중복시킬 경우

리터럴로 리스트 내 2개의 원소를 갖는 튜플을 만들어서 키를 중복시킨다. 이 리터럴 값을 생성자에 넣어서 딕셔너리를 생성하면 예외는 발생하지 않는다.

대신 키가 동일한 때 나중에 들어온 값이 마지막으로 갱신되어 처리되는 것을 확인할 수 있다.

딕셔너리는 키를 변경할 수 없기에 동일한 키에 값이 여러 개 들어오면 제일 마지막에 처 리되는 값이 최종적인 결과가 되는 것이다.

```python
In : l = [ ('a',1),('b',2),('a',3)]
d = dict(l)
print(d)
Out: {'a': 3, 'b': 2}
```

✚ 딕셔너리(dict)를 생성할 때 키의 자료형

딕셔너리를 생성할 때 키는 변경이 불가능한 자료형을 가지고만 생성된다. 파이썬에서 제 공하는 자료형들을 가지고 키로 생성이 가능한지에 대해 예제를 통해서 생성 여부 및 예외 발생을 확인한다.

예제 5-5 : 딕셔너리 키에 대한 처리 방식

문자열을 딕셔너리의 키로 구성하고 딕셔너리 리터럴 표기법을 이용해서 만들어서 출력되 는 결과를 확인한다.

딕셔너리 인스턴스를 하나 만들고 변수 d에 할당했다. 키는 문자열로 name, age를 구 성했고 값은 Jonm과 30으로 매핑해서 처리했다. 생성된 인스턴스가 어느 클래스로 만들 어져 있는지를 type 클래스로 확인하고 인스턴스를 출력해서 결과를 확인해보면 <class dict>에 의해 생성이 되었고 리터럴 표기법과 동일하게 딕셔너리 인스턴스가 출력되는 것 을 볼 수 있다.

```python
In : d = {'name': 'John', 'age': 30 }
print(type(d), d)
Out: <class 'dict'> {'name': 'John', 'age': 30}
```

정수를 키로 구성하고 값을 문자열로 넣어서 딕셔너리를 생성하여 변수에 할당한 후에 type 클래스로 확인하면 딕셔너리 클래스에 의해 만들어져 있는지를 확인할 수 있다.

```python
In : d = {1: 'apple', 2: 'ball'}
print(type(d), d)
Out: <class 'dict'> {1: 'apple', 2: 'ball'}
```

딕셔너리의 키를 정수와 문자열을 혼용해서 만들어도 동일한 결과가 나오는 것을 확인할 수 있다.

```python
In : d = {'name': 'John', 1: [2, 4, 3]}
print(type(d), d)
Out: <class 'dict'> {'name': 'John', 1: [2, 4, 3]}
```

예제 5-6 : bytes와 frozenset도 키로 사용가능

변경 불가한 자료형 중 바이트를 하나의 변수에 할당했다. 이 변수를 딕셔너리 리터럴 키 에 표시하고 값으로 정수 1을 넣어서 딕셔너리를 생성했다.

```python
In : b = bytes(b'123')
d = {b:1}
print(d)
Out: {b'123': 1}
```

frozenset도 변경이 불가능한다. 리스트는 변경이 가능하지만 이를 frozenset에 넣으 면 frozenset로 구성할 수 있다. 이를 키에 넣으면 딕셔너리의 키로 구성되는 것을 알 수 있다.

```python
In : b = frozenset([1,2,3])
d = {b:1}
print(d)
Out: {frozenset({1, 2, 3}): 1}
```

✚ 리터럴을 딕셔너리 생성자의 인자로 처리

파이썬 자료형의 리터럴로 생성된 것을 생성자의 인자로 넣어서 딕셔너리를 생성한다.

대신 키와 값을 구성하는 스타일로 만들어지면 생성자 내부에서 자동으로 매칭하여 처리 한다.

예제 5-7 : 2 튜플 원소를 가진 리스트 인자

딕셔너리 생성자에 딕셔너리 리터럴을 가지고 딕셔너리의 인스턴스를 만들 수 있다.

```python
In : # using dict()
my_dict = dict({1:'apple', 2:'ball'})
print(my_dict)
Out: {1: 'apple', 2: 'ball'}
```

위의 딕셔너리 인스턴스를 만드는 구조는 키와 값을 쌍으로 구성한다. 튜플로 생성하기 위해 키와 값을 쌍으로 구성할 수 있는 튜플을 구성해서 넣으면 딕셔너리로 생성되는 것을 볼 수 있다.

```python
In : # from sequence having each item as a pair
my_dict1 = dict([(1,'apple'), (2,'ball')])
print(my_dict1)
Out: {1: 'apple', 2: 'ball'}
```

두 개의 원소를 가진 리스트를 만들어서 생성자를 이용해 딕셔너리 인스턴스를 만들 수 있다.

```python
In : my_dict2 = dict([[1,'apple'], [2,'ball']])
print(my_dict2)
Out: {1: 'apple', 2: 'ball'}
```

예제 5-8 : 리스트나 튜플을 이용해서 키만 생성

특정 리스트나 튜플의 원소들이 해시가 될 수 있는 자료형일 경우에는 딕셔너리의 fromkeys 메서드를 이용해서 딕셔너리를 생성할 수 있다. 특히 키가 생성되었지만 값이 없어서 자동으로 None으로 처리한다.

```python
In : l = [1,2,3,4]
d = {}
d = d.fromkeys(l)
print(d)
Out: {1: None, 2: None, 3: None, 4: None}
```

튜플의 원소도 fromkeys 메서드를 가지고 새로운 딕셔너리 인스턴스를 생성할 수 있다.

```python
In : t = (1,2,3,4)
d = {}
d = d.fromkeys(t)
print(d)
Out: {1: None, 2: None, 3: None, 4: None}
```

다만, 튜플 내의 원소가 리스트로 들어오면 이 리스트는 변경이 가능하므로 유일한 키인 해시로 변환되지 않는다. 예외의 정보에 unhashable 타입이라고 명기되는 것을 알 수 있다.

```python
In : a = (1,2,[1,2])
d = {}
d.fromkeys(a)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-21-e5b159033d08> in <module>()
2 d = {}
----> 4 d.fromkeys(a)
TypeError: unhashable type: 'list'
```

예제 5-9 : 클래스와 인스턴스를 이용해서 딕셔너리 생성

사용자 클래스를 정의하고 이를 딕셔너리에 키로 할당해서 처리해도 유일한 값으로 생성 되므로 딕셔너리가 만들어진다.

```python
In : class Klass :
pass
d = {Klass : Klass}
print(d)
Out: {<class '__main__.Klass'>: <class '__main__.Klass'>}
```

사용자 클래스의 인스턴스를 만들어서 딕셔너리를 생성해도 유일한 값을 가지므로 딕셔너 리로 생성되는 것을 볼 수 있다.

```python
In : k = Klass()
d = { k: Klass}
print(d)
Out: {<__main__.Klass object at 0x000000000562ACC0>: <class '__main__.Klass'>}
```

함수를 정의해서 키로 넣고 딕셔너리를 생성해도 유일한 키로 생성이 되므로 딕셔너리가 만들어지는 것을 볼 수 있다.

```python
In : def func() :
pass
d = { func : func}
print(d)
Out: {<function func at 0x00000000056BD048>: <function func at
0x00000000056BD048>}
```
