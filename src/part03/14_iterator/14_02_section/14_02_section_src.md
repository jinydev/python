---
layout: default
title: "14.02 itertools"
---

# 14.02 itertools

파이썬 내에서 반복자 처리를 위한 itertools 모듈을 제공하고 반복형을 인자로 받아 다양 한 반복자를 처리한다.

반복자는 반복형을 가지고 모든 원소를 전부 메모리에 넣지 않고 기존 반복형을 처리해주 는 역할을 하기에 다양한 클래스를 제공해준다.

✚ itertools 내의 함수 결과는 반복자 자료형

반복자(iterator)를 생성하려면 클래스의 인스턴스를 만들어서 처리한다. 다양한 클래스를 확인하기 전에 다양한 반복자를 만드는 방법부터 알아보겠다.

예제 14-6 : itertools 모듈 내의 클래스로 반복자 인스턴스 생성

모듈 내의 다양한 클래스가 반복자를 생성해서 처리한다. 먼저 이 모듈 내에 어떤 반복자 를 생성하는 클래스들이 있는지에 대한 목록을 확인해본다.

함수처럼 이름이 소문자로 쓰였지만 내부를 확인하면 클래스라는 것을 알아야 한다. 함수 처럼 호출해서 사용하는 방식을 통해 함수와 동일한 명명 규칙을 따른다.

```python
In : import itertools as it
for i in dir(it) :
if not i.startswith("_") :
print(i)
Out: accumulate
chain
combinations
combinations_with_replacement
compress
count
cycle
dropwhile
filterfalse
groupby
islice
permutations
product
repeat
starmap
takewhile
tee
zip_longest
```

일단 이 모듈에 있는 compress를 이용해서 반복자 중에 특정한 원소만 추출하는 compress를 사용하겠다. 클래스 여부를 확인하면 반복자를 만드는 클래스라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
print(it.compress)
Out: <class 'itertools.compress'>
```

이 클래스 첫 번째 인자는 반복자로써 값을 추출할 대상이다. 두 번째 인자의 들어오는 반 복형은 첫 번째 인자에 값을 추출할 대상을 나타내는 지표로써, 표시할 값은 1이나 True 인 값으로 나타낸다.

인스턴스를 생성해서 확인하면 반복자라는 것을 알 수 있고 이를 list 생성자로 넣으면 두 개만 결과로 나오는 것을 알 수 있다.

```python
In : com = it.compress([1,2,3,4],[1,1,0,0])
print(it.compress)
print(com)
print(issubclass(type(com), cols.Iterator))
print(list(com))
Out: <class 'itertools.compress'>
<itertools.compress object at 0x10e993710>
True
[1, 2]
```

## 14.2.1 매핑 클래스

반복자를 처리할 때 기존의 원소를 가지고 변형해서 처리하는 반복자부터 알아보려고 한다. 일단 처리하는 방식은 내장 함수 map을 이용해서 처리하는 것과 거의 유사하다.

모든 원소를 반복하고 값을 변형해서 처리하지만 동적으로 하나씩만 처리하는 것이라고 이해하면 된다.

예제 14-7 : 누적 값 구하기 : itertools.accumulate

일단 특정 지능형 리스트로 5개의 원소를 만들고 반복자에서 누적을 구하는 것이 accumulate 클래스이다. 이 반복자의 인스턴스를 만들고 리스트 생성자에 넣어서 간단히 한번에 결과를 받는 것을 확인해본다.

```python
In : import itertools as it
import collections.abc as cols
import operator as op
print(it.accumulate)
print(issubclass(it.accumulate, cols.Iterator))
a = it.accumulate([x for x in range(5)])
print(list(a))
Out: <class 'itertools.accumulate'>
True
[0, 1, 3, 6, 10]
```

이 accumulate 클래스를 가지고 두 번째 인자에 함수를 넣어 실행한 뒤 이 함수가 실행된 결과로 처리되는 것을 알 수 있다.

반복자는 한번 실행되면 다시 실행할 수 없다. 한 번 사용한 반복자 인스턴스를 다시 list 생성자에 넣어서 생성하면 내부의 원소가 다 소진되어 빈 리스트가 만들어진 것을 볼 수 있다.

```python
In : a = it.accumulate([x for x in range(1,5)],op.mul)
print(a)
print(list(a))
print(list(a))
Out: <itertools.accumulate object at 0x10e973cc8>
[1, 2, 6, 24]
[]
```

예제 14-8 : 2개 이상의 원소를 하나로 변형하기 : itertools.starmap

배열 내의 배열을 변형하기 위한 starmap을 가지고 처리할 수 있는 클래스인 itertools. starmap도 반복자 클래스라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
import operator as op
print(it.starmap)
print(issubclass(it.starmap, cols.Iterator))
Out: <class 'itertools.starmap'>
True
```

리스트 내에 튜플이나 리스트로 구성될 경우에 내부에 있는 리스트나 튜플의 원소를 계산 해서 처리하는 반복자를 만들어본다.

```python
In : a = it.starmap(op.add, [(2,3),(3,4)])
print(list(a))
Out: [5, 7]
```

여러 개의 인자를 받아서 처리하는 함수를 만들었다. 이 함수를 starmap에 첫 번째 인자 로 넣고 계산되는 4개의 튜플을 가진 원소를 갖는 리스트를 넣어서 반복자를 만든다.

처리된 결과는 4개의 튜플을 덧셈한 값이 출력되는 것을 볼 수 있다.

```python
In : def add(*args) :
result = 0
for i in args :
result += i
return result
a = it.starmap(add, [(2,3,4,5),(3,4,5,6)])
print(list(a))
Out: [14, 18]
```

클래스 map과 starmap을 비교해보면 map은 리스트를 연속으로 내보낸 뒤 자동으로 쌍 을 구성해서 처리한다.

```python
In : l = map(add,(2,3,4,5),(3,4,5,6))
print(list(l))
Out: [5, 7, 9, 11]
```

쌍으로 된 리스트를 처리하려면 starmap을 이용하는 것이 편하다.

```python
In : a = it.starmap(op.add, [(2,3),(3,4),(4,5),(5,6)])
print(list(a))
Out: [5, 7, 9, 11]
```

딕셔너리 내의 항목을 items 메서드로 읽고 리스트로 형을 변환하면 2개의 원소를 갖는 튜플을 원소로 한 리스트로 만들어진다.

```python
In : d = {1:1, 2:2}
print(list(d.items()))
Out: [(1, 1), (2, 2)]
```

반복자 starmap을 이용해서 반복자를 만들고 next 함수를 호출하면 튜플 내의 원소들을 합산해서 출력해주는 것을 볼 수 있다.

```python
In : a = it.starmap(op.add, d.items())
print(next(a))
print(next(a))
print(next(a))
Out: 2
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-36-58d9346178dd> in <module>()
3 print(next(a))
4 print(next(a))
----> 5 print(next(a))
StopIteration:
```

## 14.2.2 병합 클래스

반복형 데이터들을 인자로 받고 이를 하나로 병합해서 처리한다. 하나의 반복형으로 통합 하거나 순서쌍으로 구성해서 처리하는 등 주어진 반복형들이 원소를 묶어서 처리한다.

예제 14-9 : 여러 개의 반복자를 하나로 병합 : itertools.chain

Sequence 타입의 객체들을 인자로 받아 하나로 묶고 체인을 구성해서 처리할 수 있는 기 능을 제공한다.

```python
In : import itertools as it
import collections.abc as cols
print(it.chain)
print(issubclass(it.chain, cols.Iterator))
Out: <class 'itertools.chain'>
True
```

리스트를 하나 만들어서 변수에 할당했다. 이 리스트를 두 개 연결해서 하나의 리스트로 만들고 싶을 때 간단하게 chain 클래스를 이용해서 반복자로 전환하면 된다.

리스트 간의 연계를 통해 반복자를 만들어서 출력하면 두 개의 리스트가 하나로 통합되어 출력되는 것을 알 수 있다.

```python
In : l = [1,2,3,4]
c = it.chain(l,l)
print(list(c))
Out: [1, 2, 3, 4, 1, 2, 3, 4]
```

리스트와 리스트를 덧셈 연산자로 해도 하나로 연결된다. 반복자와의 차이점은 엄청 긴 리스트를 연결해서 메모리에 올려놓고 처리하려면 성능이 많이 떨어진다는 것이다.

반복자로 변형할 때마다 메모리에 넣어서 처리하므로 아주 큰 리스트도 처리할 수 있는 것 이다.

```python
In : l+l
Out: [1, 2, 3, 4, 1, 2, 3, 4]
```

두 개의 리스트를 통합해서 for 순환문을 통해 출력해본다.

```python
In : for i in it.chain(l,l) :
print(i)
Out: 1
```

예제 14-10 : 여러 개의 반복자를 순서쌍으로 통합 : itertools.product

리스트 등의 반복형인 인스턴스를 받아서 순서쌍을 구성할 수 있는 클래스가 product 이다. 또한 반복자 클래스라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
print(it.product)
print(issubclass(it.product, cols.Iterator))
Out: <class 'itertools.product'>
True
```

두 개의 원소를 갖는 리스트를 만들어서 순서쌍을 만든다. 총 4개의 순서쌍이 만들어진 것 을 알 수 있다.

순서쌍을 만드는 반복자를 리스트 생성자와 딕셔너리 생성자의 인자로 넣으면 리스트와 딕셔너리가 생성된다. 딕셔너리는 동일한 키를 가지면 값만 변형되므로 딕셔너리는 나중 에 갱신된 값만 가진 원소들로 만들어진 것을 볼 수 있다.

```python
In : l1 = ['a','b']
l2 = [1,2]
c = it.product(l1,l2)
print(list(c))
c2 = it.product(l1,l2)
print(dict(c2))
Out: [('a', 1), ('a', 2), ('b', 1), ('b', 2)]
{'a': 2, 'b': 2}
```

순서쌍을 하나 만들고 반복해서 두 번째 순서쌍을 만든다. 반복한 순서쌍은 repeat과 함 께 숫자를 넣어서 처리하면 된다.

```python
In : c5 = it.product(l1,l2, repeat=2)
for i in c5 :
print(i)
Out: ('a', 1, 'a', 1)
('a', 1, 'a', 2)
('a', 1, 'b', 1)
('a', 1, 'b', 2)
('a', 2, 'a', 1)
('a', 2, 'a', 2)
('a', 2, 'b', 1)
('a', 2, 'b', 2)
('b', 1, 'a', 1)
('b', 1, 'a', 2)
('b', 1, 'b', 1)
('b', 1, 'b', 2)
('b', 2, 'a', 1)
('b', 2, 'a', 2)
('b', 2, 'b', 1)
('b', 2, 'b', 2)
```

3개 원소를 갖는 순서쌍을 만들 때에도 동일한 원소가 3개로 구성될 경우에는 repeat을 3 으로 처리해도 되고 리스트를 3개를 묶어서 순서쌍을 만들어도 된다.

```python
In : c6 = it.product(l1, repeat=3)
for i in c6 :
print(i)
Out: ('a', 'a', 'a')
('a', 'a', 'b')
('a', 'b', 'a')
('a', 'b', 'b')
('b', 'a', 'a')
('b', 'a', 'b')
('b', 'b', 'a')
('b', 'b', 'b')
```

동일한 리스트를 3개 넣어서 만들어도 위의 repeat= 3과 동일한 처리를 하는 것을 알 수 있다.

```python
In : c7 = it.product([1,2],[1,2],[1,2])
for i in c7 :
print(i)
Out: (1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 2, 2)
(2, 1, 1)
(2, 1, 2)
(2, 2, 1)
(2, 2, 2)
```

예제 14-11 : 원소가 다른 것을 순서쌍 처리 : itertools.zip_longest

서로 길이가 다른 경우 가장 긴 원소를 기준으로 순서쌍을 만들기 위해서는 zip_longest 클래스를 이용해서 모든 것을 순서쌍으로 구성해야 한다.

이 zip_longest도 반복자 클래스라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
print(it.zip_longest)
print(issubclass(it.zip_longest, cols.Iterator))
Out: <class 'itertools.zip_longest'>
True
```

원소가 다른 두 개의 리스트를 리터럴로 만들었다. 순서쌍을 만들어보면 긴 리스트의 원 소를 기준으로 만들어지므로 짧은 원소의 리스트 값이 들어갈 곳에는 값이 없으므로 None을 표시하는 것을 볼 수 있다.

```python
In : l1 = [1,2,3]
l2 = ['a','b','c','d']
z = it.zip_longest(l1,l2)
for i in z:
print(i)
Out: (1, 'a')
(2, 'b')
(3, 'c')
(None, 'd')
```

이 자료를 가지고 zip 클래스를 이용해서 만들면 작은 원소의 리스트에 맞도록 순서쌍이 처리되는 것을 알 수 있다.

```python
In : l1 = [1,2,3]
l2 = ['a','b','c','d']
z = zip(l1,l2)
for i in z:
print(i)
Out: (1, 'a')
(2, 'b')
(3, 'c')
```

## 14.2.3 확장 클래스

기존 데이터를 가지고 새로운 확장 반복자를 만들어서 처리해보자. 주로 순열과 조합 등 을 만들어서 사용한다.

✚ 순열과 조합으로 처리하기

Sequence 원소에 대해 반복자 자료형으로 순열과 조합을 만들어준다.

예제 14-12 : 순열과 조합 처리

순열을 처리하는 permutations도 하나의 클래스이며 반복자 클래스라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
print(it.permutations)
print(issubclass(it.permutations, cols.Iterator))
Out: <class 'itertools.permutations'>
True
```

permutations 내의 순열이므로 특정 원소의 개수를 순서대로 나열해서 쌍으로 만드는 것 이다.

일단 3개의 요소를 순열로 구성하므로 6개를 쌍으로 해서 구성하는 것을 알 수 있다.

```python
In : l1 = [1,2,3]
p = it.permutations(l1)
for i in p :
print(i)
Out: (1, 2, 3)
(1, 3, 2)
(2, 1, 3)
(2, 3, 1)
(3, 1, 2)
(3, 2, 1)
```

총 3개의 원소 중에 2개의 원소를 순서대로 처리하면 n!/(n-r)! 이므로 총 6개가 나온다.

이 클래스의 두 번째 인자로 2를 주고 처리하면 2개의 쌍으로 구성된 것을 6개 보여준다.

```python
In : l1 = [1,2,3]
p = it.permutations(l1,2)
for i in p :
print(i)
Out: (1, 2)
(1, 3)
(2, 1)
(2, 3)
(3, 1)
(3, 2)
```

순열을 알아봤으니 이제 조합에 대해서 알아보겠다. 조합은 순서가 없이 구성하는 것을 표시한다. 조합 combinations 클래스도 반복자인지를 알아보면 상속 관계가 True라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
print(it.combinations)
print(issubclass(it.combinations, cols.Iterator))
Out: <class 'itertools.combinations'>
True
```

조합의 산식을 잘 보면 순열에서 자기가 선택한 만큼을 다시 팩토리만큼 나눠서 순서가 없 는 것을 구하면 된다. 조합으로 처리될 때 산식은 n!/(n-r)!*r! 이다.

일단 원소가 3개인 리스트에 대해 3개의 원소로 조합을 만들면 1개만 출력되는 것을 확인 할 수 있다.

```python
In : l1 = [1,2,3]
c = it.combinations(l1,3)
for i in c :
print(i)
Out: (1, 2, 3)
```

세 개의 원소를 가진 리스트에서 두 개의 원소만을 조합으로 만들면 산식에 따라 3!/1!*2! 로 총 원소가 3개 만들어진다.

```python
In : l1 = [1,2,3]
c = it.combinations(l1,2)
for i in c :
print(i)
Out: (1, 2)
(1, 3)
(2, 3)
```

두 개의 리스트 간에 조합으로 구성하는 것과 같이 처리된다. combinations_with_ replacement 클래스를 이용해서 처리하는 방법을 알아보자. 동일한 리스트를 2개로 인식해서 2개의 원소를 가지는 조합으로 처리하면 6개가 나온다.

```python
In : l1 = [1,2,3]
c = it.combinations_with_replacement(l1,2)
for i in c :
print(i)
Out: (1, 1)
(1, 2)
(1, 3)
(2, 2)
(2, 3)
(3, 3)
```

두 번째 인자를 3으로 하면 3개 리스트를 가지고 조합을 이루는 것과 동일하게 구성한 것 을 알 수 있다.

```python
In : l1 = [1,2,3]
c = it.combinations_with_replacement(l1,3)
for i in c :
print(i)
Out: (1, 1, 1)
(1, 1, 2)
(1, 1, 3)
(1, 2, 2)
(1, 2, 3)
(1, 3, 3)
(2, 2, 2)
(2, 2, 3)
(2, 3, 3)
(3, 3, 3)
```

✚ 자료형을 반복하기

리스트 같은 Sequence 자료형을 받아서 유한 개로 반복하거나 아니면 무한으로 반복하 는 것을 만들 수 있는 클래스를 제공한다. 특히 리스트 등의 원소를 유한 반복해서 처리하 는 repeat과 리스트 내의 원소를 무한 반복하는 cycle 클래스가 있고, 숫자를 무한 순환하 는 count 클래스 등이 있다.

예제 14-13 : 반복 처리

주어진 숫자만큼만 반복해서 처리하는 repeat 클래스도 반복자라는 것을 알 수 있다.

```python
In : import itertools as it
import collections.abc as cols
print(it.repeat)
print(issubclass(it.repeat, cols.Iterator))
Out: <class 'itertools.repeat'>
True
```

이 반복자를 가지고 하나의 리스트를 첫 번째 인자, 두 번째 인자에 2를 전달해서 하나의 인스턴스를 만들었다. 이 인스턴스를 반복해서 처리할 경우 하나의 원소가 리스트가 되어 인자로 넣은 리스트를 2번 출력한다.

```python
In : l= [1,2,3]
r = it.repeat(l,2)
print(r)
for i in r :
print(i)
Out: repeat([1, 2, 3], 2)
[1, 2, 3]
[1, 2, 3]
```

무한 순환을 처리하는 반복자는 cycle이고 이 클래스가 반복자인지를 확인했더니 True라 고 출력된다.

```python
In : import itertools as it
import collections.abc as cols
print(it.cycle)
print(issubclass(it.cycle, cols.Iterator))
Out: <class 'itertools.cycle'>
True
```

리스트를 정의하고 cycle 클래스에 이 리스트를 인자로 넣어 출력하면 무한 반복이 발생 해서 종료되지 않는다.

순환해서 출력해보면 리스트 내의 원소가 하나씩 출력되는 것을 알 수 있다. 리스트 원소 를 한 번 다 출력하고 두 번째 출력할 때 이를 강제 종료하도록 만들었다.

```python
In : l= [1,2,3]
c = it.cycle(l)
print(c)
count = 1
for i in c :
if count == 5 :
break
count += 1
print(i)
Out: <itertools.cycle object at 0x0000000004B575E8>
```

숫자에 대한 무한 수열을 발생시키는 반복자인 count 클래스이다. 실행 시 주의할 점은 종료를 위한 중단점을 만들어서 처리해야 한다.

```python
In : import itertools as it
import collections.abc as cols
print(it.count)
print(issubclass(it.count, cols.Iterator))
Out: <class 'itertools.count'>
True
```

순환문에서 종단점을 표시하는 특정 조건을 주고 이 조건을 만족하면 종료된다.

```python
In : c = it.count(3)
print(c)
count = 1
for i in c :
if count == 5 :
break
count += 1
print(i)
Out: count(3)
```

순환 객체를 반복해서 생성하려면 tee 함수를 사용한다. 이 함수 tee로 만들어지는 인스턴 스도 반복자로 처리가 가능하다.

```python
In : import itertools as it
import collections.abc as cols
print(it.tee)
print(it.tee(it.count(3)))
print(issubclass(type(it.tee(it.count(3))[0]),cols.Iterator))
Out: <built-in function tee>
(<itertools._tee object at 0x0000000004B5B308>, <itertools._tee object
at 0x0000000004B6DFC8>)
True
```

리스트를 원소로 받으면 2개의 리스트 반복자가 내부에 생긴다. 이를 하나씩 읽어 처리하 기 위해서는 순환문을 2개 작성해야 한다.

```python
In : t = it.tee([1,2,3])
for i in t :
for j in i :
print(j)
Out: 1
```

리스트 하나를 두 개의 반복자로 만들어 달라고 했다. 이를 출력하기 위해 다시 chain으로 연결했다. 이때 *를 변수 이름 앞에 붙인 이유는 tee가 생성한 각각의 반복자를 chain 클 래스 인자로 분리하고 인자를 언패킹해서 처리하는 것이다.

```python
In : a = it.tee([1,2,3],2)
for i in it.chain(*a) :
print(i)
Out: 1
```

2개가 만들어진 것을 chain으로 묶어 순환문을 하나만 사용해서 출력할 수 있다.

```python
In : t = it.tee([1,2,3])
c = it.chain(*t)
for i in c :
print(i)
Out: 1
```

## 14.2.4 그룹화 및 필터링 처리

itertools 모듈 내의 반복자를 처리하는 클래스를 확인했다. 반복자를 처리할 때 내부의 원 소들을 그루핑해서 처리가 필요하거나 기존 반복자들에게 제약이 필요할 경우, 특정 반복 자의 필터링 등이 필요한 경우에 사용되는 클래스를 알아보겠다.

예제 14-14 : 순환 객체 내의 원소를 그룹화하기

순환 객체가 반복되는 원소들을 그룹으로 처리하는 groupby도 반복자인 클래스이다.

```python
In : import itertools as it
import collections.abc as cols
print(it.groupby)
print(issubclass(it.groupby, cols.Iterator))
Out: <class 'itertools.groupby'>
True
```

리스트를 가지고 groupby로 생성하면 하나의 반복자를 만들어준다. 이 반복자의 구조에 서 내부를 출력하면 그룹화된 키와 그 값들을 표현하는 반복자가 만들어진다.

```python
In : l = [1,2,2,2,3,3,3,4,4,4,2,2]
g = it.groupby(l)
print(g)
for i in g :
print(i)
Out: <itertools.groupby object at 0x0000000004B47408>
(1, <itertools._grouper object at 0x0000000004AC82E8>)
(2, <itertools._grouper object at 0x0000000004AC8550>)
(3, <itertools._grouper object at 0x0000000004AC8588>)
(4, <itertools._grouper object at 0x0000000004AC8630>)
(2, <itertools._grouper object at 0x0000000004AC86D8>)
```

내부의 반복자를 리스트 생성자로 확인해보면 반복자가 리스트로 변환되어 표시된다.

```python
In : l = [1,2,2,2,3,3,3,4,4,4,2,2]
g = it.groupby(l)
for i in g :
print(i[0],list(i[1]))
Out: 1 [1]
2 [2, 2, 2]
3 [3, 3, 3]
4 [4, 4, 4]
2 [2, 2]
```

예제 14-15 : 무한 순환 제어하기

itertools.count는 무한 숫자를 반복하는 반복자이다. 특정한 영역까지만 처리하도록 itertools. takewhile 내의 첫 번째 인자에 함수를 넣어 이 클래스의 조건이 거짓일 경우 중단되도록 처리하면 특정 값까지 추출된다.

itertools.dropwhile은 True 값일 때는 처리하지 않고 첫 번째 False가 발생하면 출력되 기 시작한다.

Takewhile은 True까지만 처리하므로 무한 순환을 제어하기에 좋지만 dropwhile을 처 리할 때는 무한 순환 조건을 처리할 때 조심해야 한다.

무한 순환을 제어하는 것도 반복자로 만들어져 있다. 이 반복자를 제어해서 무한 반복 등 의 처리를 제약하도록 만든 takewhile 클래스이다.

```python
In : import itertools as it
import collections.abc as cols
print(it.takewhile)
print(issubclass(it.takewhile, cols.Iterator))
Out: <class 'itertools.takewhile'>
True
```

itertools.count는 무한 반복이 가능하고 증가도 조정이 가능하다. 이 증가하는 원소들을 확인해서 제약을 줄 수 있다.

첫 번째 인자로 제약을 처리하도록 lambda 함수로 3보다 작을 때까지만 처리하고 종료하 게 했다.

```python
In : t = it.takewhile(lambda x : x < 3, it.count(1,0.5))
print(t)
print(list(t))
Out: <itertools.takewhile object at 0x0000000004B5BD08>
[1, 1.5, 2.0, 2.5]
```

이 itertools.dropwhile 반복자도 하나의 클래스이다.

```python
In : import itertools as it
import collections.abc as cols
print(it.dropwhile)
print(issubclass(it.dropwhile, cols.Iterator))
Out: <class 'itertools.dropwhile'>
True
```

특정 함수의 takewhile과 dropwhile 처리를 비교해본다. 참인 조건에 출력하는 takewhile, 거짓인 조건을 만나면 전부 출력하는 dropwhile의 결과를 확인한다.

```python
In : d = it.dropwhile(lambda x : x < 3, [1,2,3,4,5])
print(d)
print(list(d))
Out: <itertools.dropwhile object at 0x0000000004B2DD48>
[3, 4, 5]
In : d = it.takewhile(lambda x : x < 3, [1,2,3,4,5])
print(d)
print(list(d))
Out: <itertools.takewhile object at 0x0000000004AB3C88>
[1, 2]
```

특정 조건을 만족하지 않을 경우 동일한 원소도 처리하는지를 확인해보자. 거짓 조건을 만나면 그 다음부터는 전부 출력을 처리한다.

```python
In : d = it.dropwhile(lambda x : x < 3, [1,2,3,3,3,3,4,5])
print(d)
print(list(d))
Out: <itertools.dropwhile object at 0x0000000004B59E08>
[3, 3, 3, 3, 4, 5]
```

무한 순환을 처리할 때 dropwhile로 특정 거짓 조건을 처리하고 takewhile로 무한 순환 을 제어할 수 있다.

무한 순환되는 count 클래스를 제어하기 위해 숫자 중에 3보다 크고 5보다 작은 것을 추 출해서 처리했다.

```python
In : d = it.takewhile(lambda x : x < 5, it.dropwhile(lambda x : x < 3,it.
count(1,0.5)))
print(d)
print(list(d))
Out: <itertools.takewhile object at 0x0000000004B5B188>
[3.0, 3.5, 4.0, 4.5]
```

예제 14-16 : 반복자에 대한 슬라이싱 처리

반복자에 대해서도 슬라이스를 처리할 수 있는 클래스를 제공한다. 이 클래스가 islice 이다.

```python
In : import itertools as it
import collections.abc as cols
print(it.islice)
print(issubclass(it.islice, cols.Iterator))
Out: <class 'itertools.islice'>
True
```

부분집합을 하기 위해서는 내부 인자를 넣어줘야 하는데 하나만 주면 끝을 의미하고 두 개 를 넣으면 시작과 끝을 표시한다. 세 개를 넣으면 시작, 끝, 간격인 스텝을 처리한다.

특히 반복자는 한번 생성되면 연결해서 처리되고 다 사용하면 소멸되므로 연결해서 islice 를 사용하면 소멸되기 전까지 계속 처리되는 것을 알 수 있다.

```python
In : l = [1,2,3,4]
c = it.chain(l,l)
isl = it.islice(c,2,3)
print(list(isl))
isl = it.islice(c,2)
print(list(isl))
Out: [3]
[4, 1]
```

새로운 반복자 인스턴스를 만들어서 시작과 끝을 부여했고 간격을 넣어서 새롭게 슬라이 스를 처리했다.

```python
In : l = [1,2,3,4]
c = it.chain(l,l)
isl = it.islice(c,2,8,2)
print(list(isl))
Out: [3, 1, 3]
```
