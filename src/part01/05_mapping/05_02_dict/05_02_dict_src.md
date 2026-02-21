---
layout: default
title: "05.02 딕셔너리(dict)"
---

# 05.02 딕셔너리(dict)

딕셔너리 내의 세부 메서드들을 먼저 조회하고 이 메서드들을 가지고 예제를 실행하면서 메서드를 이해해본다.

## 5.2.1 딕셔너리(dict) 갱신 및 삭제 메서드

딕셔너리 클래스에 어떤 메서드들을 관리하는지를 확인하고 이 중에서 딕셔너리 내의 항 목들을 갱신하고 삭제 등을 처리하는 메서드들을 알아본다.

예제 5-10 : 딕셔너리 메서드 조회

딕셔너리 클래스에 메서드 등의 정보를 가지고 있다. dir 함수를 이용해서 내부의 정보를 리스트 내의 문자열로 받아 스페셜 메서드를 제거하고 사용하는 메서드를 확인해본다.

```python
In : for i in dir(dict) :
if not i.startswith("_") :
print(i)
Out: clear
copy
fromkeys
get
items
keys
pop
popitem
setdefault
update
values
```

리스트와 딕셔너리 내의 메서드에 대한 차이를 비교해보면 원소 추가에 대한 기본 메서드 이름은 동일하지만 딕셔너리 내의 항목을 처리하는 get, setdefault, popite, update 메 서드를 가지고 기존에 있는 항목을 검색, 변경, 삭제하는 부분이 추가되었고 내부의 항목 들을 조회할 수 있는 view를 제공하는 keys, values, items 등이 추가되어 있다.

```python
In : l = set(dir(list))
s = set(dir(dict))
print(s - l)
Out: {'setdefault', 'items', 'update', 'keys', 'values', 'get', 'popitem',
'fromkeys'}
```

예제 5-11 : 딕셔너리에 딕셔너리 추가 : update

딕셔너리는 항목을 추가하므로 만들어져 있는 딕셔너리에 딕셔너리를 넣어서 하나의 딕셔 너리로 만드는 방식은 update 메서드를 제공한다.

리터럴로 딕셔너리를 만들어서 변수 d에 할당하고 생성자로 딕셔너리 인스턴스를 만들어 서 d2에 할당했다. 이를 변수 d에 할당된 딕셔너리로 통합하려고 update 메서드에 인자 로 d2를 넣어 실행했다. 두 개의 딕셔너리 내부의 항목을 보면 동일한 키가 없으므로 네 개의 항목을 그대로 유지하는 것을 볼 수 있다.

```python
In : d = {1:1,2:2}
d2 = dict([("a",'apple'), ("b",'ball')])
d.update(d2)
print(d)
Out: {1: 1, 2: 2, 'a': 'apple', 'b': 'ball'}
```

동일한 키가 하나 존재할 때 새로 가져온 딕셔너리가 나중에 들어오는 항목이므로 기존에 있는 값이 나중에 들어오는 값으로 갱신이 된 것을 알 수 있다.

```python
In : d = {1:1,2:2}
d2 = dict([("a",'apple'), (1,'ball')])
d.update(d2)
print(d)
Out: {1: 'ball', 2: 2, 'a': 'apple'}
```

리스트 간에 + 연산자를 이용한 결합으로 새로운 리스트가 만들어진다. 딕셔너리는 + 연 산자가 처리되지 않고 update 메서드에 의해서만 추가되는 것을 확인할 수 있다.

```python
In : d + d2
Out: --------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-11-9b3a7ccf14a7> in <module>()
----> 1 d + d2
TypeError: unsupported operand type(s) for +: 'dict' and 'dict'
```

예제 5-12 : 딕셔너리 내부 item 삭제하기

딕셔너리(dict)는 키에 대한 순서가 없이 관리가 되지만 키에 대한 유일성을 가지므로, 항 목을 삭제할 때도 키를 명기해서 처리할 수도 있지만 임의의 키를 삭제할 수 있는 메서드 도 추가된다.

일단 빈 딕셔너리 하나를 리터럴로 만들고 딕셔너리 검색에 키를 지정한 뒤, 바로 값을 넣 어서 할당하면 키와 값이 런타임에 들어가는 것을 볼 수 있다.

```python
In : my_dict = {}
for i in range(10) :
my_dict[i] = i
print(my_dict)
Out: {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}
```

딕셔너리 내의 popitem 메서드를 호출해서 처리되면 임의의 항목을 삭제한다. 또 한 번 삭제하면 임의의 항목을 또 삭제하는 것을 볼 수 있다.

```python
In : d = my_dict.popitem()
print(d)
print(my_dict)
f = my_dict.popitem()
print(f)
print(my_dict)
Out: (9, 9)
{0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8}
(8, 8)
{0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7}
```

특정 키를 인자로 넣어서 딕셔너리 항목을 삭제한 후에 반환값으로 받을 수 있다.

```python
In : f1 = my_dict.pop(1)
print(f1)
print(my_dict)
Out: 1
{0: 0, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7}
```

딕셔너리 내부의 모든 항목을 제거하기 위해 메서드 clear를 실행하면 빈 딕셔너리만 남고 키와 값인 항목들이 전부 삭제된다.

```python
In : fc = my_dict.clear()
print(fc)
print(my_dict)
Out: None
{}
```

## 5.2.2 딕셔너리(dict) 타입 keys, values, items 이해하기

딕셔너리 내부에 저장된 키와 값에 대해 검색해서 어떤 내용이 있는지를 확인할 수 있도록 추가적인 메서드를 제공한다.

이 자료형으로 원본은 그대로 있지만 세부 항목에 대한 정보를 검색하기 위한 별도의 클래 스를 만드는 것을 볼 수 있다.

일단 항목으로 키와 값을 처리하는 items 메서드, 키를 조회하는 keys 메서드, 값을 조회 하는 values 메서드 등이 있다.

파이썬 3 버전에서는 이 메서드가 실행되면 반복자를 생성해서 내부의 원소를 볼 수 있는 view를 제공한다. 이에 대한 세부 자료형은 dict_keys, dict_values, dict_items이다. 반 복자이므로 하나씩 호출해서 처리가 가능하고 한번 사용되면 종료가 되므로 다시 메서드 를 생성하고 반복자를 만들어서 처리한다.

예제 5-13 : keys 메서드로 key만 읽어오기

딕셔너리 내부 항목의 키만을 읽어와서 처리할 수 있는 keys 메서드를 실행하고 반복형 타입인 dict_keys 인스턴스를 가져온다.

```python
In : d = dict([('a',1),('b',2)])
keys = d.keys()
print(keys)
Out: dict_keys(['a', 'b'])
```

이를 iter 함수를 통해 반복자로 전환하면 dict_keyiterator로 변환한다. next 함수로 내 부의 키를 하나씩 호출해서 처리한다. 마지막까지 오면 StopIteration이 발생한다.

```python
In : keys = iter(keys)
print(keys)
print(next(keys))
print(next(keys))
print(next(keys))
Out: <dict_keyiterator object at 0x1025019f8>
a
b
---------------------------------------------------------------------
StopIteration           Traceback (most recent call last)
<ipython-input-10-74a8100a78d5> in <module>()
3 print(next(keys))
4 print(next(keys))
----> 5 print(next(keys))
StopIteration:
```

순환문을 이용하면 반복형을 반복자로 변환하지 않아도 동일하게 처리되는 것을 확인할 수 있다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
print(d.keys())
for i in d.keys() :
print(i)
Out: dict_keys(['a', 'b'])
a
b
```

또한 리스트로 형 변환을 원할 경우에는 list 생성자를 통해 변환도 가능하다.

```python
In : print(list(d.keys()))
Out: ['a', 'b']
```

예제 5-14 : 딕셔너리 내의 값들을 value로 읽어오기

딕셔너리(dict) 타입 내에 value값을 가져오는 메서드로 결과값을 views 타입의 인스턴스 로 반환한다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
print(d.values())
print(list(d.values()))
Out: dict_values([1, 2])
[1, 2]
```

예제 5-15 : items로 key/value 읽어오기

key와 value를 전부 조회할 경우 사용하는 메서드로 이를 리스트로 변환하면 내부는 튜 플로 전환되어 보여준다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
print(d.items())
print(list(d.items()))
Out: dict_items([('a', 1), ('b', 2)])
[('a', 1), ('b', 2)]
```

예제 5-16 : 딕셔너리(dict) 내부 원소를 조회하고 tuple/set 변환

items, keys, values 메서드의 결과 tuple, set으로 변환도 가능한 이유는 반복자 타입으 로 만들어져 있기에 생성자와 만나면 그 생성자에 맞춰 새로운 자료형의 인스턴스가 만들 어지기 때문이다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
```

# 튜플로 데이터 변환

print(tuple(d.items())) print(tuple(d.keys())) print(tuple(d.values()))

# set로 데이터 변환

print(set(d.items())) print(set(d.keys())) print(set(d.values()))

```python
Out: (('a', 1), ('b', 2))
('a', 'b')
(1, 2)
{('a', 1), ('b', 2)}
{'a', 'b'}
{1, 2}
```

## 5.2.3 딕셔너리(dict) 내의 키값 조회 메서드

딕셔너리 인스턴스에 없는 키를 조회하면 KeyError가 발생한다. 이를 방지하기 위해 추 가된 메서드가 get, setdefault 메서드이다.

없는 키를 조회할 때 예외를 발생시키지 않으려면 이 두 메서드를 가지고 어떻게 처리하는 지 알아본다.

예제 5-17 : 없는 키를 조회하거나 갱신

두 개의 키를 가지는 딕셔너리 인스턴스를 만들었지만 다른 키를 [ ] 연산자를 통해 검색 했다. 해당된 키가 없으므로 키가 없다고 예외를 발생시킨다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
print(d['c'])
Out: ---------------------------------------------------------------------
KeyError                Traceback (most recent call last)
<ipython-input-49-614f7fc6c77c> in <module>()
1 l = [('a',1), ('b',2)]
2 d = dict(l)
----> 3 print(d['c'])
KeyError: 'c'
```

딕셔너리를 검색할 때 [ ] 연산자 사용보다는 get 메서드를 사용해서 예외 발생을 예방하 는 방법으로 사용을 권고한다.

딕셔너리를 get 메서드로 사용하다가 키가 없을 때 반환하는 인자를 같이 넣어서 처리하 면 키가 없을 경우 예외가 발생하지 않고 인자로 넘긴 값이 출력되는 것을 볼 수 있다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
print(d.get("c", "default value"))
Out: default value
```

이 메서드에 특별한 값을 인자로 넣지 않아도 예외는 발생하지 않고 None을 반환한다.

```python
In : print(d.get("c"))
Out: None
```

또 키가 없을 경우 다른 방식으로 처리하는 setdefault 메서드를 제공한다. 이 방식은 get 메서드와 달리 일단 주어진 키가 없을 경우 딕셔너리에 키와 값을 추가한 후에 이 값을 반 환한다.

```python
In : l = [('a',1), ('b',2)]
d = dict(l)
print(d.setdefault("c", "default value"))
print(d)
Out: default value
{'a': 1, 'b': 2, 'c': 'default value'}
```

기존에 키가 있으면 갱신을 하지 않고 기존에 있는 값을 반환한다.

```python
In : print(d.setdefault("c", "default value"))
print(d)
Out: default value
{'a': 1, 'b': 2, 'c': 'default value'}
```
