---
layout: default
title: "16.01 collections"
---

# 16.01 collections

튜플과 딕셔너리 자료형의 확장형 자료 구조인 defaultdict, orderdict, Count, NamedTuple에 대해 알아보겠다.

## 16.1.1 defaultdict 처리

내장 자료형인 딕셔너리는 반드시 키와 값을 쌍으로 구성해서 생성해야 한다. 키를 넣고 임의의 값을 넣어서 생성해도 처리가 가능하다. 이를 지원하기 위한 자료형인 defaultdict 클래스를 제공한다. 이 클래스에 초기화 값을 넣어서 새로운 딕셔너리 인스턴스를 어떻게 생성하고 사용하는지를 알아보겠다.

예제 16-1 : 기본 키 처리가 가능한 딕셔너리

딕셔너리를 검색할 때 없는 키로 조회하면 KeyError가 발생한다.

자료형에서 없는 키를 인덱스에 키를 넣고 조회하면 KeyError가 발생한다.

```python
In : d = {'a':1,'b':2}
d['c']
Out: ---------------------------------------------------------------------
KeyError              Traceback (most recent call last)
<ipython-input-2-0d6511672ea6> in <module>()
1 d = {'a':1,'b':2}
----> 3 d['c']
KeyError: 'c'
```

딕셔너리에서 키가 없을 경우 조회하는 메서드 get, setdefault를 제공하고 이를 사용해서 키를 검색하면 예외가 발생하지 않는 것은 앞에서 배웠다.

```python
In : print(d.setdefault('c', None))
print(d)
Out: None
{'a': 1, 'b': 2, 'c': None}
In : print(d.get('e',None))
print(d)
Out: None
{'a': 1, 'b': 2, 'c': None}
```

이런 방식을 사용하는 것보다 defaultdict으로 만들면 검색으로 조회해도 예외가 발생하 지 않고 초기화를 위한 기능이 실행된다.

이제 defaultdict 클래스의 구조를 먼저 알아보겠다. 이 클래스는 collections 모듈에 있다.

```python
In : from collections import defaultdict
print(defaultdict)
Out: <class 'collections.defaultdict'>
```

이 클래스의 대표적인 속성은 초기화될 정보를 관리하는 default_factory라는 속성이다.

없는 키를 조회하거나 갱신할 때 이 속성에 있는 함수나 클래스 등이 실행되어 초기화 값 을 넣도록 하는 것이다.

```python
In : for i in dir(defaultdict) :
if not i.startswith("_") :
if i not in dir(dict) :
print(i)
Out: default_factory
```

딕셔너리를 리터럴로 생성하고 이를 defaultdict를 가지고 인스턴스로 생성했다. 첫 번째 인자는 초기화를 시킬 list 클래스를 넣었다. 인스턴스 내부의 default_factory 속성을 확 인해보면 list 클래스가 들어가 있는 것을 알 수 있다.

```python
In : from collections import defaultdict
d = {'a': 1, 'b': 2, 'c': None}
l = defaultdict(list, d)
print(l)
print(l.default_factory)
Out: defaultdict(<class 'list'>, {'a': 1, 'b': 2, 'c': None})
<class 'list'>
```

없는 키를 검색으로 조회하면 딕셔너리 setdefault 메서드처럼 내부에 키를 넣고 초기화 처리가 실행되어 값이 들어가는 것을 확인할 수 있다.

```python
In : print(l['d'])
print(l)
Out: []
defaultdict(<class 'list'>, {'a': 1, 'b': 2, 'c': None, 'd': []})
```

예제 16-2 : 빈 딕셔너리를 만들고 추가하기

이번에는 defaultdict이 딕셔너리와 동일하게 작동되는지를 확인해보겠다. 일단 초기값 을 주고 하나의 인스턴스를 만들었다. 초기화 값이 생성되는 것은 defaultdict.default_ factory 메서드가 실행되기 때문이다.

```python
In : from collections import defaultdict
s = defaultdict(set)
s.default_factory
Out: set
```

만들어진 인스턴스를 확인해보면 defaultdict 내에 초기값을 표시하는 set 클래스와 아무 것도 없다는 딕셔너리가 표시되었다.

```python
In : print(s)
Out: defaultdict(<class 'set'>, {})
```

검색을 이용해서 e라는 키를 조회하면 내부에 키를 e로 하고 값은 빈 set이 들어가 있는 것을 확인할 수 있다.

```python
In : s['e']
print(s)
Out: defaultdict(<class 'set'>, {'e': set()})
```

새로운 키를 넣고 생성하면 빈 set이 들어가기에 원소의 값을 set의 원소로 변경하기 위해 update 메서드를 이용해서 처리했다.

```python
In : print(set.update)
s['s'].update({1,2,3})
print(s)
Out: <method 'update' of 'set' objects>
defaultdict(<class 'set'>, {'e': set(), 's': {1, 2, 3}})
```

또한 딕셔너리에 키와 값을 할당하는 대괄호 연산자를 이용해서 갱신도 가능하다.

```python
In : s['ss'] = {1,2,3}
print(s)
Out: defaultdict(<class 'set'>, {'e': set(), 's': {1, 2, 3}, 'ss': {1, 2, 3}})
```

초기화 이후에 갱신은 아무 자료형이나 가능하다. 초기화를 위해서만 인스턴스를 만들 때 사용된 set이 작동되는 것을 확인할 수 있다.

```python
In : s['ss'] = 1
print(s)
Out: defaultdict(<class 'set'>, {'e': set(), 's': {1, 2, 3}, 'ss': 1})
```

예제 16-3 : fromkeys 메서드를 가지고 처리하기

임의의 키를 가지고 defaultdict 클래스의 인스턴스를 만들면 초기화 함수 없이 기본값을 기준으로 만들어진다.

```python
In : from collections import defaultdict
a = defaultdict.fromkeys(["name","age"],None)
print(a)
Out: defaultdict(None, {'name': None, 'age': None})
```

초기화 값으로 None이 들어간 것을 알 수 있다.

```python
In : print(a.default_factory)
Out: None
```

단순히 fromkeys로 생성한 후에 새로운 키로 조회하면 초기화에 저장된 값이 실행되지 않아 예외를 처리한다.

```python
In : print(a["school"])
Out: ---------------------------------------------------------------------
KeyError               Traceback (most recent call last)
<ipython-input-47-81bc545e4911> in <module>()
----> 1 print(a["school"])
KeyError: 'school'
```

위의 예외를 방지하기 위해서는 defaultdict.fromkeys 메서드의 두 번째 인자에 함수를 넣어서 실행하도록 해봤다. 하지만 동일하게 예외를 발생시킨다.

```python
In : def init() :
return None
a = defaultdict.fromkeys(["name","age"],init)
print(a["school"])
Out: ---------------------------------------------------------------------
KeyError               Traceback (most recent call last)
<ipython-input-20-381a29a1d1ff> in <module>()
----> 7 print(a["school"])
KeyError: 'school'
```

위의 예외를 없애기 위해 함수 init를 정의하고 defaultdict 클래스가 자동으로 초기화하 는 default_factory에 init 함수를 직접 할당해서 해결을 했다.

```python
In : def init() :
return None
a = defaultdict.fromkeys(["name","age"])
a.default_factory = init
print(a["school"])
Out: None
```

이 인스턴스 a 내의 items 메서드로 항목을 조회해서 출력하면 모든 값이 None으로 처리 된 것을 알 수 있다.

```python
In : for k,v in a.items():
print(k,v)
Out: name None
age None
school None
```

## 16.1.2 OrderedDict

기본 딕셔너리는 해시를 처리하므로 키의 유일성은 구성하지만 순서가 없이 구성된다.

가끔 딕셔너리가 순서별로 저장되어 인덱스를 처리하는 것을 응용해서 사용할 필요가 있다. 이럴 경우에 이 자료형을 사용하면 좋다.

예제 16-4 : 순서 있는 딕셔너리 처리하기

순서 있는 클래스인 OrderedDict을 collections 모듈에서 확인해본다.

```python
In : from collections import OrderedDict
print(OrderedDict)
Out: <class 'collections.OrderedDict'>
```

이 클래스만 가진 메서드가 있는지를 확인해보면 move_to_end가 있는 것을 알 수 있다.

```python
In : for i in dir(OrderedDict) :
if not i.startswith("_") :
if i not in dir(dict) :
print(i)
Out: move_to_end
```

딕셔너리 리터럴을 이용해서 하나의 인스턴스를 만들고 이를 OrderedDict의 인스턴스로 전환하면 순서가 있는 OrderedDict 인스턴스가 만들어진다. 내부를 조회하면 키와 값이 튜플로 구성되어 순서대로 들어가 있는 것을 알 수 있다.

```python
In : from collections import OrderedDict
d = {'a':1,'b':2,'c':3,1:10}
print(d)
od = OrderedDict(d)
print(od)
Out: {'a': 1, 'b': 2, 'c': 3, 1: 10}
OrderedDict([('a', 1), ('b', 2), ('c', 3), (1, 10)])
```

메서드 pop을 실행하려고 딕셔너리 내에 있는 키를 인자로 전달해서 처리한다. 1이라는 키를 주고 항목을 삭제했다.

```python
In : print(od.pop(1))
print(od)
Out: 10
OrderedDict([('a', 1), ('b', 2), ('c', 3)])
```

특징 위치를 꺼낸 후에 삭제하기 위해서는 popitem 메서드를 삭제한다. 기본으로 제일 마지막 것을 삭제하는 것을 알 수 있다.

```python
In : print(od.popitem())
print(od)
Out: ('c', 3)
OrderedDict([('a', 1), ('b', 2)])
```

키 d를 먼저 넣었고 그 다음에 키 c를 가지고 처리했다. 넣은 순서대로 입력이 되므로 c의 순서가 뒤에 있는 것을 확인할 수 있다.

```python
In : od.update({'d':100})
print(od)
od.update({'c':100})
print(od)
Out: OrderedDict([('a', 1), ('b', 2), ('d', 100)])
OrderedDict([('a', 1), ('b', 2), ('d', 100), ('c', 100)])
```

예제 16-5 : OrderedDict 인스턴스 내의 순서 바꾸기

하나의 OrderedDict을 생성해서 확인한다.

```python
In : from collections import OrderedDict
d = {'a':1,'b':2,'c':3,1:10}
print(d)
od = OrderedDict(d)
print(od)
Out: {'a': 1, 'b': 2, 'c': 3, 1: 10}
OrderedDict([('a', 1), ('b', 2), ('c', 3), (1, 10)])
```

특정 원소 1에 대한 위치를 이동할 수 있는 메서드 move_to_end 내에 last=False로 주 고 실행하면 마지막으로 처리가 되지 않고 처음으로 들어가는 것을 볼 수 있다.

```python
In : od.move_to_end(1,last=False)
print(od)
Out: OrderedDict([(1, 10), ('a', 1), ('b', 2), ('c', 3)])
```

인자로 last=False를 지정하지 않으면 문자가 먼저 오고 숫자가 뒤로 가는 것을 볼 수 있다.

```python
In : od.move_to_end(1)
print(od)
Out: OrderedDict([('a', 1), ('b', 2), ('c', 3), (1, 10)])
```

## 16.1.3 Count

리스트나 문자열 등에 동일한 원소들이 얼마나 많은지 등을 계산하기 위해 별도로 계산 없 이 제공되는 클래스인 Counter를 이용해서 처리한다. 내부의 값을 계산할 수 있는 메서드 도 제공한다.

예제 16-6 : 원소에 대한 수치 계산하기

Counter가 클래스인지를 확인해본다.

```python
In : from collections import Counter
print(Counter)
Out: <class 'collections.Counter'>
```

동일한 원소들이 있는 자료형 내의 동일한 원소의 개수를 값으로 처리할 수 있는 자료 구 조를 가진 딕셔너리 확장 클래스이다. 기본 딕셔너리에 아이템별로 덧셈과 뺄셈, 집합 연 산, 3개의 메서드가 추가되어 처리한다.

```python
In : for i in dir(Counter) :
if not i.startswith("_") :
if i not in dir(dict) :
print(i)
Out: elements
most_common
subtract
```

특정 문자열을 이용해서 인스턴스를 생성하면 동일한 문자가 키로 생성되고 개수가 값으 로 들어가 있는 것을 볼 수 있다.

```python
In : from collections import Counter
c = Counter("aaabbbbcccddddaaaaeeecccfff")
print(c)
Out: Counter({'a': 7, 'c': 6, 'b': 4, 'd': 4, 'e': 3, 'f': 3})
```

원소들의 값들 중 개수가 큰 것을 조회할 수 있도록 most_common 메서드를 제공한다.

most_common 메서드에 인자로 숫자를 넣으면 가장 많은 순서의 개수를 출력한다.

```python
In : print(c.most_common(2))
Out: [('a', 7), ('c', 6)]
```

예제 16-7 : 연산자를 통한 계산하기

두 개의 Counter 인스턴스를 만든다. 이 클래스가 덧셈과 뺄셈 연산과 집합 연산이 가능 하므로 이를 알아보겠다.

```python
In : from collections import Counter
```

c = Counter("가을이라가을바람") print(c) d = Counter("너을이라너을을바람") print(d)

```python
Out: Counter({'가': 2, '을': 2, '이': 1, '라': 1, '바': 1, '람': 1})
```

Counter({'을': 3, '너': 2, '이': 1, '라': 1, '바': 1, '람': 1}) 뺄셈 연산자를 사용할 경우는 새로운 인스턴스로 결과치를 차집합처럼 표시하는 것을 알 수 있다.

```python
In : print(d-c)
Out: Counter({'너': 2, '을': 1})
```

뺄셈을 하기 위해 substract 메서드를 사용해서 처리하면 모든 것을 빼므로 뺄셈 연산자를 사용하는 것과 다른 결과를 표시한다.

```python
In : print(d.subtract(c))
print(d)
Out: None
```

Counter({'너': 2, '을': 1, '이': 0, '라': 0, '바': 0, '람': 0, '가': -2}) 메서드 substract한 경우에는 인스턴스가 변경되었다. 다시 생성을 해서 덧셈과 집합 연산 을 처리한다.

```python
In : from collections import Counter
```

c = Counter("가을이라가을바람") print(c) d = Counter("너을이라너을을바람") print(d)

```python
Out: Counter({'가': 2, '을': 2, '이': 1, '라': 1, '바': 1, '람': 1})
```

Counter({'을': 3, '너': 2, '이': 1, '라': 1, '바': 1, '람': 1}) 두 인스턴스를 덧셈하면 결과를 보여준다.

```python
In : print(d+c)
Out: Counter({'을': 5, '너': 2, '이': 2, '라': 2, '바': 2, '람': 2, '가': 2})
```

집합 연산으로 각 원소들의 값들을 처리할 수 있다. 교집합일 경우는 두 개 중에 개수가 작은 값을 출력하고 합집합일 경우는 큰 값을 출력한다.

```python
In : print(d&c)
Out: Counter({'을': 2, '이': 1, '라': 1, '바': 1, '람': 1})
In : print(d|c)
Out: Counter({'을': 3, '너': 2, '가': 2, '이': 1, '라': 1, '바': 1, '람': 1})
```

전체 원소를 알기 위해 내장 메서드인 element를 이용하면 itertools이 chain을 이용해서 각 원소별로 반복자를 만들어 처리한다. list 생성자로 인스턴스를 만들면 모든 원소를 나 열해서 출력하는 것을 볼 수 있다.

```python
In : from collections import Counter
```

c = Counter("가을이라가을바람") print(c) print(c.elements()) print(list(c.elements()))

```python
Out: Counter({'가': 2, '을': 2, '이': 1, '라': 1, '바': 1, '람': 1})
<itertools.chain object at 0x0000000004C43A58>
```

['가', '가', '을', '을', '이', '라', '바', '람']

## 16.1.4 namedtuple

Sequnece 자료형인 튜플을 mapping 자료형인 딕셔너리처럼 사용할 수 있도록 새로운 클래스를 만들어서 사용할 수 있는 클래스가 namedtuple이다. 딕셔너리로 전환하면 점 연산자를 이용해서 이름으로 접근하여 사용할 수 있는 기능이 추가된다.

예제 16-8 : 네임드 튜플을 생성 및 접근

네임드 튜플은 하나의 함수로서 새로운 네임드 튜플을 만들 수 있는 클래스를 만든다.

```python
In : from collections import namedtuple
print(namedtuple)
Out: <function namedtuple at 0x109cd7378>
```

네임드 튜플을 사용하려면 일단 새로운 네임드 튜플을 생성하는 클래스를 만들어야 한다.

Person 변수에 “Person”, 필드명 name, age를 리스트로 만들어서 하나의 클래스를 만 든다.

```python
In : from collections import namedtuple
Person = namedtuple("Person", ["name", "age"])
print(Person)
Out: <class '__main__.Person'>
```

Person 클래스의 네임스페이스를 확인하면 두 개의 속성도 들어가 있는 것을 확인할 수 있다.

```python
In : for i in Person.__dict__ :
if not i.startswith("__") :
print(i)
Out: _fields
_make
_replace
_asdict
name
age
_source
```

이 클래스에 생긴 name이라는 속성을 확인해보면 property 클래스의 인스턴스인 것을 알 수 있다.

프로퍼티 내부의 조회 메서드는 operator 모듈이 itemgetter를 이용해서 호출하도록 등 록된 것을 알 수 있다. 변경이 불가능하므로 fset 내의 메서드에는 아무 것도 등록이 되지 않는 것을 알 수 있다.

```python
In : print(Person.name)
print(Person.name.fget)
print(Person.name.fset)
Out: <property object at 0x00000000052DE368>
operator.itemgetter(0)
None
```

네임드 튜플 함수로 만들어진 클래스를 가지고 인스턴스를 만들 때는 2개의 인자를 넣어 서 생성한다.

```python
In : p = Person("네임드 튜플",33)
print(p, type(p))
Out: Person(name='네임드 튜플', age=33) <class '__main__.Person'>
```

이 인스턴스는 검색과 점 연산자를 이용해서 접근이 가능한 것을 알 수 있다. 점 연산자는 프로퍼티로 처리되었으므로 name을 호출하는 메서드가 실행되는 것을 알 수 있다.

```python
In : print(p[0], p.name)
print(p[1], p.age)
Out: 네임드 튜플 네임드 튜플
33 33
```

튜플은 갱신할 수 없는 자료형이므로 값을 다시 할당하면 예외를 발생시킨다.

```python
In : p[1] = 300
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-10-1fec4b0d7283> in <module>()
----> 1 p[1] = 300
TypeError: 'Person' object does not support item assignment
```

프로퍼티로 처리할 때도 fset 내에 메서드가 등록되어 있지 않아서 갱신하면 예외가 발생 한다.

```python
In : p.age = 300
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-11-937f9d076655> in <module>()
----> 1 p.age = 300
AttributeError: can't set attribute
```

네임드 튜플에 대한 필드들을 조회할 속성이 있다. 기존에 만들어진 네임드 튜플을 딕셔 너리로 변환하면 OrderedDict으로 만들어진다.

```python
In : print(p._fields)
print(p._asdict())
Out: ('name', 'age')
```

OrderedDict([('name', '네임드 튜플'), ('age', 33)]) 또한 기존 네임드 튜플은 _make 내에 반복자를 넣어서 네임드 튜플을 만들 수 있다. 대신 필드에 대한 항목이 동일해야 한다.

```python
In : pp = Person._make(["리스트",55])
print(pp)
Out: Person(name='리스트', age=55)
```

Operator 모듈 itemgetter, attrgetter 함수는 검색과 점 연산자를 처리한다. 네임드 튜플 로 만들어진 클래스는 2가지를 다 지원하므로 이 함수들도 다 가능해야 한다.

일단 itemgetter를 이용해서 내부 속성을 확인해도 잘 검색되는 것을 알 수 있다.

```python
In : from collections import namedtuple
from operator import itemgetter, attrgetter
Person = namedtuple("Person","name age")
```

p = Person("네임드 튜플",33) item = itemgetter(0,1) print(item(p))

```python
Out: ('네임드 튜플', 33)
```

또한 점 연산자가 실행되므로 속성 접근하기 위해 attrgetter를 이용하면 동일한 결과를 얻을 수 있다. 대신 여러 원소도 동시에 처리할 수 있어 같이 사용하면 활용도가 높다.

```python
In : attr = attrgetter("name","age")
print(attr(p))
Out: ('네임드 튜플', 33)
```
