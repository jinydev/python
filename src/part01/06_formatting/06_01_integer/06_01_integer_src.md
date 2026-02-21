---
layout: default
title: "06.01 정수"
---

# 06.01 정수

검색은 대괄호([ ]) 연산자를 사용하여 인스턴스 내 하나의 원소를 검색해서 해당 원소의 조회한 결과를 보여주거나 이 조회한 결과에 값을 할당해서 변경도 가능하다.

Sequence(문자열, 리스트, 튜플 등) 자료형은 정수를 사용해서 검색하지만 Mapping(딕셔너 리) 자료형은 키를 가지고 조회가 된다.

인덱싱 처리는 특정 원소 하나만을 검색한다. Sequence 자료형은 인덱스 범위가 중요하 고 이 범위 내에서만 조회, 갱신, 삭제가 가능하다. 딕셔너리는 키에 대해 유일성만 체크 하므로 새로운 키를 가지고 갱신하면 추가된다. 단지 조회나 삭제할 때 조회한 키가 없다

면 예외가 발생한다.

## 6.1.1 Sequence 타입 인덱스 순서

인덱스는 정수로 생성되면 순방향은 0부터 시작해서 원소의 개수보다 하나가 작은 수만큼 양수로 처리한다. 역방향으로도 처리가 가능하므로 역방향은 첫 번째 위치가 -1부터 시 작해서 원소를 가진 개수만큼 증가시켜 처리할 수 있다.

예제 6-1 : 순방향(forward)과 역방향(backward)으로 검색

순방향으로 원소를 찾아서 처리할 경우는 0부터 양수를 인덱스로 처리한다. 조회할 최대 크기는 원소의 개수에서 -1을 처리한다. 처음 시작점이 0이라서 총 개수보다 1이 작아 야 처리가 된다. 원소의 개수를 검색하면 인덱스 처리하는 범위가 넘어가서 예외가 발생 한다.

빈 공간을 포함해서 6개의 문자열을 만들었다. 정방향으로 이동하므로 인덱스도 0부터 5 까지 출력되는 것을 볼 수 있다.

```python
In : s = "순방향 검색"
for i in range(len(s)) :
print("index : ",i," value :",s[i])
Out: index : 0 value : 순
```

index : 1 value : 방 index : 2 value : 향 index : 3 value :

index : 4 value : 검 index : 5 value : 색 역방향일 경우는 반대 방향으로 이동을 해서 음수로 인덱스를 넣어 처리한다. 음수이기 때문에 -1부터 시작해서 총 원소 개수만큼 음수로 처리한 부분까지 마지막을 처리한다.

빈 공간을 포함해서 6개 원소를 가지는 문자열을 만들어 역방향으로 조회를 하면 인덱스 가 -1부터 -6까지 출력되는 것을 알 수 있다.

```python
In : s = "역방향 검색"
for i in range(1,len(s)+1) :
print("index : ",-1*i," value :",s[-1*i])
Out: index : -1 value : 색
```

index : -2 value : 검 index : -3 value :

index : -4 value : 향 index : -5 value : 방 index : -6 value : 역

예제 6-2 : 인덱스 범위가 넘어갈 경우

Sequence 자료형에서는 원소의 개수 즉 인덱스의 범위가 정해져 있다. 인덱스 범위가 벗 어나서 검색이 발생하면 예외를 발생시킨다. 항상 범위 내에서 검색할 수 있어야 한다.

리스트를 리터럴 표기법으로 원소가 3개인 경우를 만들었다. 이 리스트에 인덱스를 정수 로 4를 넣을 경우 이 인덱스 처리하는 범위를 넘어서 IndexError가 발생하는 것을 볼 수 있다.

```python
In : l = [1,2,3]
print(l[4])
Out: ---------------------------------------------------------------------
IndexError              Traceback (most recent call last)
<ipython-input-5-b183477db7a2> in <module>()
1 l = [1,2,3]
----> 3 print(l[4])
IndexError: list index out of range
```

예제 6-3 : 길이보다 작은 경우까지 인덱스가 처리

인덱스를 조회할 경우 범위를 별도로 체크한다. 별도의 함수를 지정해 들어가는 범위를 제약해서 처리한다.

인덱스 범위를 관리하는 인덱스 체크 로직을 만든다. Sequence 자료형 인스턴스와 처리 할 인덱스 정수를 인자로 받아 길이보다 작을 때까지만 처리하도록 한다. 인덱스 범위를 넘으면 제일 마지막 위치는 역방향일 경우에는 항상 -1이므로 범위가 넘을 경우는 마지막 부분만 처리되도록 할당해서 예외 발생을 방지한다.

```python
In : def index_check(l,a) :
if a < len(l) :
return a
else :
return -1
```

리스트를 하나 만들고 검색하는 대괄호 내에 함수 호출을 하면 함수 호출된 결과를 처리한 후에 결과값이 정수로 나오므로 검색이 처리된다.

범위가 벗어나는 경우에도 제일 마지막 원소를 처리하므로 예외가 발생하지 않는 것을 알 수 있다.

```python
In : l = [1,2,3]
print(l[index_check(l,4)])
print(l[index_check(l,0)])
print(l[index_check(l,1)])
Out: 3
```

## 6.1.2 딕셔너리(dict) 키 인덱싱 이해하기

딕셔너리는 인덱스를 사용하지 않고 hash 처리한 키를 가지고 검색을 한다. 동일한 대괄 호 기호([ ])를 사용해서 키가 존재할 경우에는 결과를 반환하지만 키가 없는 경우에는 예 외가 발생한다.

해시 처리된 키에는 방향성이 없기 때문에 순방향과 역방향 조회는 별도로 없고 유일한 키 만 처리가 된다.

✚ 딕셔너리 원소 검색

딕셔너리를 검색할 경우 해시가 가능한 자료형을 기준으로 키가 만들어진다. 키가 만들어 진 범위 이내에서 검색할 수 있다.

예제 6-4 : 딕셔너리 키가 정수일 경우

키 값이 정수로 되어 있으면 이를 이용해서 정수로 하나의 원소를 읽을 수 있다. 키 값이 없는 경우를 처리하면 index 오류가 아닌 key 오류가 발생한다.

```python
In : a = { 1: 1, 2:2}
print(a[1])
print(a[2])
print(a[3])
Out: 1
---------------------------------------------------------------------
KeyError               Traceback (most recent call last)
<ipython-input-11-bf86105b63a1> in <module>()
3 print(a[1])
4 print(a[2])
----> 5 print(a[3])
KeyError: 3
```

Key 범위를 벗어난 것을 해결하기 위해 하나의 함수를 정의한다. 범위가 벗어날 경우 내 부 Key 중의 하나를 할당해서 조회가 되도록 정의한다.

```python
In : def key_check(d,a) :
if a in d :
pass
else :
a = list(d.keys())[0]
return a
```

딕셔너리의 키가 정수로 처리될 경우에도 범위가 벗어날 때 예외가 발생하지 않고 내부 키 에 맞는 값을 가지고 처리했다.

```python
In : a = { 1: 1, 2:2}
print(a[key_check(a,1)])
print(a[key_check(a,2)])
print(a[key_check(a,3)])
Out: 1
```

문자열이 키일 경우도 동일하게 처리되는 것을 확인할 수 있다.

```python
In : d = {'a': 1, 'b':2}
print(d[key_check(d,1)])
print(d[key_check(d,"c")])
print(d[key_check(d,'a')])
print(d[key_check(d,'b')])
Out: 1
```

✚ operator 모듈의 함수 이용하기

검색도 하나의 연산이므로 이 연산에 대한 함수도 operator 모듈에 만들어져 있다.

getitem, itemgetter라는 함수를 이용해서 검색을 할 수 있다.

예제 6-5 : getitem으로 검색

Sequence나 Mapping 자료형에서 검색 연산자는 대괄호([ ])이고 이를 함수로 만들 때 getitem으로 정의를 했다. 첫 번째 인자에 자료형을 넣고 두 번째 인자에 인덱스나 키를 넣어서 처리가 가능하다.

리스트를 만들어 리스트 범위 내의 인덱스로 조회해서 값을 가져왔고 범위를 넘은 인덱스 로 조회하면 IndexError가 발생한다.

```python
In : import operator as op
l = [1,2,3,4]
print(op.getitem(l,0))
print(op.getitem(l,4))
Out: 1
---------------------------------------------------------------------
IndexError              Traceback (most recent call last)
<ipython-input-12-7089df53f22e> in <module>()
5 print(op.getitem(l,0))
----> 6 print(op.getitem(l,4))
IndexError: list index out of range
```

딕셔너리도 동일하게 처리가 가능하므로 리스트에서는 인덱스를 부여했지만 딕셔너리에 서는 Key를 넣어서 검색을 한다. 키의 범위가 벗어날 경우는 동일하게 예외가 발생한다.

```python
In : import operator as op
a = {'a': 1, 'b':2}
print(op.getitem(a,'a'))
print(op.getitem(a,'c'))
Out: 1
---------------------------------------------------------------------
KeyError               Traceback (most recent call last)
<ipython-input-13-b25e019db480> in <module>()
5 print(op.getitem(a,'a'))
----> 6 print(op.getitem(a,'c'))
KeyError: 'c'
```

예외가 발생하지 않으려면 위에서 정의된 key_check 함수를 불러서 범위를 벗어날 경우 에 특정 값을 처리해서 사용하도록 구현한다.

```python
In : print(op.getitem(a,key_check(a,'c')))
Out: 1
```

예제 6-6 : itemgetter로 여러 개의 key를 동시에 검색

항목들의 키 여러 개를 동시에 조회해서 값을 처리하고자 할 때는 itemgetter 함수를 이용 해 키를 등록해서 사용할 수도 있다.

해당되는 키의 범위를 벗어나지 않도록 하기 위해 읽을 수 있는 키를 지정해서 처리할 수 있다.

두 개의 키를 놓고 만든 itg_two에 딕셔너리 인스턴스를 전달하면 튜플로 값들이 출력 된다.

```python
In : import operator as op
a = {'a': 1, 'b':2}
itg_two = op.itemgetter('a','b')
print(itg_two(a))
Out: (1, 2)
```

이 경우에도 내부에 키가 없을 경우에는 처리 중에 예외가 발생한다.

내부적으로 작성할 때 키가 있어야 특별한 문제가 없다는 것을 알 수 있다.

```python
In : itg_ac = op.itemgetter('a','c')
print(itg_ac(a))
Out: ---------------------------------------------------------------------
KeyError                Traceback (most recent call last)
<ipython-input-18-b2ee225d55bb> in <module>()
1 itg_ac = op.itemgetter('a','c')
----> 3 print(itg_ac(a))
KeyError: 'c'
```

딕셔너리로 키를 검색해서 값을 호출할 때 예외가 발생하는 것을 방지하기 위해 두 개의 특별한 메서드를 제공한다.

런타임에 예외를 방지하기 위해 검색을 위한 연산자 사용보다 이 get, setdefualt 두 메서 드를 사용해서 처리하는 것이 더 무난할 수 있다.

✚ KeyError를 방지하기 위한 메서드 처리

딕셔너리 get, setdefault 메서드를 사용해서 검색해 처리하면 KeyError를 예방할 수 있 으므로 위에 나온 방식보다 더 편리하게 사용할 수 있다.

예제 6-7 : 딕셔너리 내부 원소를 메서드로 검색하기

딕셔너리 인스턴스에 키가 없을 것을 대비해서 get 메서드 Key가 없는 경우 get 메서드를 이용해서 내부에 default 값을 지정할 수 있다. 조회 시 없으면 default 값을 전달한다.

```python
In : d = {'a': 1, 'b':2}
print(d.get('c',"defaults"))
Out: defaults
```

Setdefault 메서드를 사용하면 키가 없을 경우에는 추가하고 있을 경우에는 조회한다. 기 존에 키가 없을 경우는 default 값을 세팅하고 조회를 처리한다.

```python
In : d.setdefault('c',"defaults")
print(d)
print(d['c'])
Out: {'a': 1, 'b': 2, 'c': 'defaults'}
defaults
```

## 6.1.3 인덱싱을 이용한 갱신 및 삭제하기

인덱스는 현재 정해진 범위 내에서만 조회, 갱신이 가능하다. 인덱스를 이용해서 추가하 면 범위가 벗어나서 추가할 수 없다.

예제 6-8 : 인덱스로 갱신하기

리스트는 인덱스를 검색하고 = 이후에 할당하면 인덱스가 가리키는 곳을 갱신한다.

```python
In : l = [1,2,3,4]
l[2]= 99
print(l)
Out: [1, 2, 99, 4]
```

리스트의 인덱스 범위가 넘는 곳에 값을 추가하려고 했지만 인덱스로 검색하는 경우는 기 존에 만들어진 범위를 벗어나서 추가할 수 없다. 기존에 있는 범위를 검색해서 갱신만 가 능하다.

```python
In : l[4] = 100
Out: ---------------------------------------------------------------------
IndexError              Traceback (most recent call last)
<ipython-input-24-59f9aea0ef4c> in <module>()
----> 1 l[4] = 100
IndexError: list assignment index out of range
```

딕셔너리를 생성하고 주어진 키를 검색해서 이를 갱신한다. 주어진 키로 검색한 내부의 값이 갱신된다.

```python
In : d = {'a':1, 'b':2}
d['b'] = 99
print(d)
Out: {'a': 1, 'b': 99}
```

딕셔너리는 리스트와 달리 해시로 유일성을 관리하기 때문에 키가 다른 것이 들어오면 새 롭게 추가해서 딕셔너리 내에 항목을 추가한다.

```python
In : d['c'] = 100
print(d)
Out: {'a': 1, 'b': 99, 'c': 100}
```

예제 6-9 : 인덱스로 삭제하기

리스트를 정의하고 특정 위치의 인덱스의 원소를 삭제하려면 del l[2]로 삭제하여 지정된 인덱스를 조회하고 이를 삭제한다. 리스트가 삭제되면 내부의 원소들이 다시 재인덱싱 처 리되어 리스트가 줄어든 것을 알 수 있다.

```python
In : l = [1,2,3,4]
del l[2]
print(l)
Out: [1, 2, 4]
```

리스트의 인덱스 범위를 벗어난 것을 삭제하면 예외가 발생한다.

```python
In : del l[3]
Out: ---------------------------------------------------------------------
IndexError              Traceback (most recent call last)
<ipython-input-31-2e17e54224b5> in <module>()
----> 1 del l[3]
IndexError: list assignment index out of range
```

딕셔너리를 만들고 키로 검색하고 del 키워드를 이용해서 삭제할 수 있다.

```python
In : d = {'a':1, 'b':2}
del d['b']
print(d)
Out: {'a': 1}
```

리스트와 마찬가지로 딕셔너리도 기존에 없는 키를 검색해서 키워드 del로 삭제할 때 예 외가 발생한다.

```python
In : del d['b']
Out: ---------------------------------------------------------------------
KeyError                Traceback (most recent call last)
<ipython-input-32-14d28ad6b85d> in <module>()
----> 1 del d['b']
KeyError: 'b'
```
