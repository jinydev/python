---
layout: default
title: "05.03 set"
---

# 05.03 set

해시 처리를 하는 set과 frozenset이 있다. 집합을 처리하므로 동일한 값이 여러 번 나올 수 없기 때문에 원소를 해시로 처리해서 유일성을 유지하고 있다.

일반적인 수학의 집합을 구현한 자료형이므로 집합에서 처리하는 산식을 메서드로 제공 한다.

## 5.3.1 set

집합을 구성하면 내부에 제공하는 모든 원소는 유일해야 한다. 리터럴 표기법이 중괄호를 사용해서 딕셔너리와 동일한 중괄호 표기이지만 내부에 키만 원소로 가지므로 값에 대한 정보는 없다.

✚ set 생성하기

딕셔너리 자료형에서 아무 것도 없는 딕셔너리 표현이 { }으로 정의되어 있어 빈 set 타입 은 set( )으로 표현한다.

예제 5-18 : 빈 set 생성은 반드시 set()으로 처리

빈 집합을 표현할 때는 중괄호 표기법 대신 set( ) 표기법을 사용한다.

빈 집합과 빈 딕셔너리를 생성해서 비교하면 중괄호는 딕셔너리 내에 원소가 없다고 표시 하는 것을 확인할 수 있다.

```python
In : s = set()
d = {}
print(type(s), s)
print(type(d), d)
Out: <class 'set'> set()
<class 'dict'> {}
```

예제 5-19 : 리터럴이나 생성자로 집합 만들기

생성자를 이용해서 set 인스턴스를 만들 때 리스트나 문자열로 인자가 들어오지만 원소가 해시 처리가 되는 경우에는 set 인스턴스가 만들어진다.

```python
In : l = set([1,2,3,'a','b'])
s = set("abc")
print(l)
print(s)
Out: {1, 2, 3, 'a', 'b'}
{'c', 'a', 'b'}
```

집합 리터럴 표기법으로 바로 작성해도 인스턴스가 만들어진다.

```python
In : sl = {1,2,3}
print(sl)
Out: {1, 2, 3}
```

리스트 내에 원소 리스트가 들어온 경우에 리스트는 해시 처리가 불가능하므로 예외가 발 생한다.

```python
In : ll = set([[1,2,3],4,5])
print(ll)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-30-2b0e93317527> in <module>()
----> 1 ll = set([[1,2,3],4,5])
2 print(ll)
TypeError: unhashable type: 'list'
```

리스트 내에 튜플이 원소로 들어올 경우에는 set 생성자로 인스턴스가 만들어진다.

```python
In : ll = set([(1,2,3),4,5])
print(ll)
Out: {4, 5, (1, 2, 3)}
```

✚ set 기본 연산 처리하기

집합 자료형은 수학의 집합 연산을 그대로 수용해서 처리하며 메서드와 연산자를 사용해 서 연산이 가능하다.

예제 5-20 : 집합 연산에 대한 연산자와 메서드 처리하기

합집합(|, union), 교집합( &, intersection), 차집합(-, difference), 대칭 차집합(^,symmetric_ difference)의 집합 연산을 처리한다. 이 메서드들의 처리는 내부를 변경하는 것이 아니라 새로운 set 인스턴스를 만든다.

두 개의 set 인스턴스로 이용해서 만들어서 변수에 할당한다.

```python
In : l = set([1,2,3,'a','b'])
s = set("abc")
```

논리 연산자( | )와 union 메서드를 이용해서 두 집합의 합집합을 구해 출력한다. 집합에 서 메서드로 합집합을 만드는 경우는 리스트의 extend 메서드나 딕셔너리의 update 메 서드와 다르게, 원본 집합을 변경하지 않고 새로운 인스턴스를 만드는 것을 알 수 있다.

```python
In : u1 = l | s
print(u1)
u2 = l.union(s)
print(u2)
print(l)
print(s)
Out: {1, 2, 3, 'a', 'c', 'b'}
{1, 2, 3, 'a', 'c', 'b'}
{1, 2, 3, 'a', 'b'}
{'c', 'a', 'b'}
```

두 집합에 대한 교집합을 & 연산자와 intersection 메서드로 처리해도 동일한 결과를 출 력한다.

```python
In : u3 = l & s
print(u3)
u4 = l.intersection(s)
print(u4)
print(l)
print(s)
Out: {'a', 'b'}
{'a', 'b'}
{1, 2, 3, 'a', 'b'}
{'c', 'a', 'b'}
```

두 집합에 대한 차집합을 연산자와 메서드로 처리해도 동일한 결과를 출력한다.

```python
In : u5 = l - s
print(u5)
u6 = l.difference(s)
print(u6)
print(l)
print(s)
Out: {1, 2, 3}
{1, 2, 3}
{1, 2, 3, 'a', 'b'}
{'c', 'a', 'b'}
```

집합에 대한 대칭 차집합에 대해서도 연산자와 메서드를 가지고 처리하면 동일한 결과가 출력된다.

```python
In : u7 = l ^ s
print(u7)
u8 = l.symmetric_difference(s)
print(u8)
Out: {1, 2, 3, 'c'}
{1, 2, 3, 'c'}
```

예제 5-21 : 집합 연산을 통해 자기 내부 변경하기

기본 메서드들은 내부의 원소를 변경하지 않지만 내부 원소를 갱신하는 추가적인 메서드 를 제공한다.

difference_update, intersection_update, symmetric_difference_update 메서드는 자기 내부의 원소들을 변경한다.

합집합은 update 메서드를 통해서 set 인스턴스 내부의 값을 추가하므로 별도의 메서드 는 제공하지 않는다.

```python
In : ll = set([1,2,3,'a','b'])
ss = set("abc")
ll.update(ss)
print(ll)
Out: {1, 2, 3, 'a', 'c', 'b'}
```

차집합을 처리하고 기존 set 인스턴스 내부의 원소를 갱신하려면 difference_update 메 서드로 처리하여 차집합의 결과로 변경한다.

```python
In : ll = set([1,2,3,'a','b'])
ss = set("abc")
ll.difference_update(ss)
print(ll)
Out: {1, 2, 3}
```

교집합을 처리하고 인스턴스 내부를 갱신하려면 intersection_update 메서드로 실행하 면 된다.

```python
In : ll = set([1,2,3,'a','b'])
ss = set("abc")
ll.intersection_update(ss)
print(ll)
Out: {'a', 'b'}
```

대칭 차집합을 처리하고 인스턴스 내부를 symmetric_difference 메서드로 실행하면 된다.

```python
In : ll = set([1,2,3,'a','b'])
ss = set("abc")
ll.symmetric_difference_update(ss)
print(ll)
Out: {1, 2, 3, 'c'}
```

✚ set 내부 원소 값 조정하기

set 자료형은 변경이 가능하므로 내부 원소에 대한 원소 추가, 삭제 등을 처리하는 메서드 를 제공한다.

예제 5-22 : 집합 원소 처리

원소를 추가하는 add 메서드, 원소를 삭제하는 pop 메서드, 원소의 값을 삭제하는 remove 메서드, discard 메서드가 있고 discard는 원소가 없으면 처리하지 않는다.

집합에 하나의 원소만 추가할 경우는 add 메서드로 처리하면 된다. 합집합을 만드는 update 메서드와의 차이점은 원소 하나만 처리된다는 것이다.

```python
In : s = set([1,2,3,'a','b'])
s.add('c')
print(s)
s.update({4,5,})
print(s)
Out: {1, 2, 3, 'a', 'c', 'b'}
{1, 2, 3, 4, 'a', 'c', 5, 'b'}
```

원소 하나를 삭제할 때 remove 메서드에 삭제할 원소를 인자로 전달해서 처리한다.

```python
In : s = set([1,2,3,'a','b'])
s.remove('b')
print(s)
Out: {1, 2, 3, 'a'}
```

원소를 삭제할 때 삭제할 키가 없으면 KeyError가 발생한다.

```python
In : s.remove('c')
print(s)
Out: ---------------------------------------------------------------------
KeyError               Traceback (most recent call last)
<ipython-input-47-f076a8819ac5> in <module>()
----> 1 s.remove('c')
2 print(s)
KeyError: 'c'
```

원소에 해당하는 것이 없을 때에는 discard 메서드를 이용해서 처리하는 것이 더 좋다. 일 단 처리가 되지 않으면 None으로 반환한다.

```python
In : sp = s.discard('c')
print(s)
print(sp)
Out: {1, 2, 3, 'a'}
None
```

있는 원소를 삭제해도 변환 결과는 None을 반환하는 단점이 있지만 있는 원소를 삭제하 는 것을 알 수 있다.

```python
In : sp = s.discard('a')
print(s)
print(sp)
Out: {1, 2, 3}
None
```

원소를 임의로 삭제하는 pop 메서드를 실행하면 삭제가 된다. 결과로 반환된 결과는 삭제 된 원소이다.

```python
In : s = set([1,2,3,'a','b'])
sp = s.pop()
print(sp)
print(s)
Out: 1
{2, 3, 'a', 'b'}
```

✚ 집합 간의 관계를 확인하기

두 개의 집합을 만들어서 두 집합의 어느 집합의 부분집합인지에 대한 메서드나 연산자로 집합 간의 계층 관계를 확인할 수 있다.

예제 5-23 : 집합 간의 관계 확인 연산자 및 메서드

두 집합을 비교해서 하나의 집합이 다른 집합의 부분집합인지를 확인해본다. 이때 issubset 메서드를 이용해서 관계가 맞는지를 확인하면 된다.

```python
In : s = set([1,2,3,'a','b'])
ss = set([1,2,3])
print(ss < s)
print(ss.issubset(s))
Out: True
True
```

서로의 관계를 비교할 때도 집합에서는 부분집합의 관계가 명확할 때만 비교 연산이 실행 되는 것을 확인할 수 있다.

```python
In : s = set([1,2,3,'a','b'])
ss = set([1,2,3,'a','b'])
print(ss <= s)
print(ss.issubset(s))
Out: True
True
```

두 집합이 동등하면 진부분집합이므로 원소가 같으면 진부분집합도 issubset 메서드에서 는 True로 표시한다.

```python
In : s = set([1,2,3,'a','b'])
ss = set([1,2,3])
print(s.issuperset(ss))
print(s.issuperset(s))
Out: True
True
```

위의 부분집합과 반대로 점검도 가능하다. 더 큰 집합에서 부분집합을 확인하는 issuperset 도 있다.

```python
In : s = set([1,2,3,'a','b'])
ss1 = set([1,2,3])
ss2 = set([1,2,4])
print(ss1 < s )
print(ss2 < s )
Out: True
False
```

## 5.3.2 frozenset 이해하기

집합 자료형에 변경 가능한 set과 변경 불가능한 frozenset을 제공한다. set은 딕셔너리의 키로 사용하지 못하므로 불변형을 제공하고 필요할 경우 frozenset으로 형 변환을 해서 처리할 수 있다.

한번 만들어지면 변경이 불가능하므로 사용되는 범위는 작을 수밖에 없다.

예제 5-24 : frozenset 생성하기

집합을 만들 때 변경되지 않는 집합도 필요하다. 이 집합은 딕셔너리 타입의 key로도 사 용이 가능하지만 한번 생성되면 원소를 추가나 삭제할 수 없다.

생성자의 인자를 넣지 않고 빈 객체를 만들면 frozenset( )로 표현된다.

```python
In : s = frozenset()
print(s)
print(type(s))
Out: frozenset()
<class 'frozenset'>
```

변경이 불가능하지만 최초 생성 시에는 생성되는 원소를 넣고 만든다.

```python
In : s = frozenset([1,3,4])
l = frozenset([1,2,4])
print(s)
print(l)
Out: frozenset({1, 3, 4})
frozenset({1, 2, 4})
```

set으로 인스턴스를 만들고 이를 frozenset으로 형 변환을 할 수 있다.

```python
In : s = frozenset(set([1,3,4]))
l = frozenset(set([1,2,4]))
print(s)
print(l)
Out: frozenset({1, 3, 4})
frozenset({1, 2, 4})
✚ 연산 처리
```

변경 불가한 자료형이므로 집합 연산 결과는 내부를 변경하지 않고 새로운 인스턴스 객체 를 만든다.

예제 5-25 : 집합 연산 처리

집합 연산은 set과 동일한 처리를 한다. 집합 연산을 하고 난 후에 다른 인스턴스를 생성하 므로 원본 frozenset은 갱신되지 않는다.

합집합, 교집합을 처리하면 연산의 결과로 새로운 frozenset 인스턴스가 만들어진다.

```python
In : s = frozenset([1,3,4])
l = frozenset([1,2,4])
u = s.union(l)
print(u)
u = s.intersection(l)
print(u)
Out: frozenset({1, 2, 3, 4})
frozenset({1, 4})
```

차집합과 대칭차집합을 처리해도 새로운 frozenset을 반환하는 것을 알 수 있다.

```python
In : s = frozenset([1,3,4])
l = frozenset([1,2,4])
u = s.difference(l)
print(u)
u = s.symmetric_difference(l)
print(u)
Out: frozenset({3})
frozenset({2, 3})
```

부분집합에 대한 관계도 issubset, issuperset 메서드로 확인할 수 있다.

```python
In : s = frozenset([1,2,3,4])
ss = frozenset([1,2,4])
print(ss.issubset(s))
print(s.issuperset(ss))
Out: True
True
CHAPTER
```

정수형 검색, 지능형,

| 문자열 | 포매팅하기 |

|---|---|

기본적인 Sequence 자료형인 문자열, 리스트, 튜플 등과 mapping 타입인 dict에 대해 알아봤다. 이런 자료형들의 원소를 검색하는 방식은 이번 장에서 같이 설명한다.

하나의 원소를 검색하는 정수 검색과 부분을 검색하는 슬라이스를 어떻게 처리하는지를 알아본다.

리터럴 표기법 중에 원소를 나열해 작성해서 인스턴스를 만드는 방식을 알아봤지만 원소 를 나열하지 않고 특정한 조건을 산식으로 표현해서 작성된 문장이 로딩될 때 원소들이 생 성되는 방식인 지능형 처리 방식도 알아본다. 지능형 처리 방식으로는 리스트, 딕셔너리, set 클래스의 리터럴 처리 방식을 제공한다.

마지막으로 텍스트를 처리해서 사용자가 볼 수 있는 출력을 만드는 문자열과 날짜에 대한 포매팅 방식도 알아본다.

✚ 알아볼 주요 내용

● 정수 및 키 검색 : integer indexing & key indexing

● 인덱싱 갱신 및 삭제

● 슬라이싱 검색 : slicing

● 슬라이스 클래스(slice)

● 슬라이스 갱신 및 삭제

● 지능형 리스트(list comprehension)

● 지능형 딕셔너리(dict comprehension)

● 지능형 집합(set comprehension)

● 문자열 포매팅 처리

● 날짜에 대한 문자열 포매팅 처리
