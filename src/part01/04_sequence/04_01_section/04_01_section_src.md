---
layout: default
title: "04.01 Sequence"
---

# 04.01 Sequence

Sequence 자료형에는 다양한 클래스들이 존재하고 순서적으로 데이터가 저장되며 이 연 속적인 순서에 따라 검색도 가능하다.

문자열(str)은 주로 유니코드 문자의 순서대로 처리되며, 아스키 문자대로 처리되는 바이트 (bytes, bytearray), 다양한 객체를 넣을 수 있는 리스트(list), tuple 등은 다양한 원소를 가진 컬렉션을 구성한다. 또한 숫자 자료형처럼 인스턴스에 속성을 추가할 수 없는 문자열, 튜 플, 바이트는 한번 생성되면 원소를 변경할 수 없고 바이트 어레이, 리스트는 생성된 후에 원소 추가 및 생성도 가능하다.

변경 가능한 리스트 등의 내부 메서드는 실행되면 내부 원소를 변경하지만 문자열 같은 변 경 불가능한 자료형은 새로운 인스턴스를 생성한다. 또한 변경 불가능한 경우 생성자로 생성할 때 기존에 만들어진 인스턴스에 대해서는 새로 만든 것이 아니라 만들어져 있는 것 을 반환하는 interning 처리를 한다.

## 4.1.1 런타임에 속성 추가 여부

왜 파이썬 내장 자료형에는 런타임에 속성을 추가하지 못하도록 만들었을까? 일단 Cython 엔진이 실행되는 파이썬이라면 c 언어로 제공되는 공통 기능에 대한 일관성을 유 지하기 위해 내장 자료형은 변경할 수 없도록 차단했다.

특히 클래스나 인스턴스에서 속성이나 메서드를 관리하는 네임스페이스(_ _dict_ _) 속성이 없는 경우 접근해서 갱신이나 삭제가 불가능하다.

내부에 만들어진 속성이나 메서드만 이용해서 사용한다. 다른 기능과 속성을 추가하고 싶 을 경우에는 이를 상속받고 사용자 클래스를 만들어서 추가 속성과 기능을 확장한다.

예제 4-1 : Sequence 내장 타입의 인스턴스 Namespace 미존재

리스트를 리터럴로 생성하고 이 리스트 인스턴스에 네임스페이스를 조회하면 예외가 발생 한다. 내부 속성에 _ _dict_ _ 가 존재하지 않는다.

```python
In : l = [1,2,3]
l.__dict__
Out: ---------------------------------------------------------------------
AttributeError        Traceback (most recent call last)
<ipython-input-1-0461b467dbc8> in <module>()
1 l = [1,2,3]
----> 2 l.__dict__
AttributeError: 'list' object has no attribute '__dict__'
```

리스트를 상속한 List 클래스를 정의하고 추가적인 속성으로 name을 만들었다.

```python
In : class List(list) :
def __init__(self, name, value) :
super().__init__(value)
self.name = name
```

List 클래스의 인스턴스를 생성하고 네임스페이스를 확인하면 name 속성이 있는 것을 알 수 있다.

```python
In : l = List("리스트",[1,2,3])
print(l.__dict__)
Out: {'name': '리스트'}
```

리스트에 대한 원소들은 부모 클래스 리스트 내부에 생성했으므로 부모 리스트 클래스의 메서드를 그대로 사용해서 처리가 가능하다.

```python
In : print(l+l)
print(l.__dict__)
Out: [1, 2, 3, 1, 2, 3]
```

{'name': '리스트'}

## 4.1.2 변경 가능 여부 : Mutable & Immutable

변경 가능(Mutable)과 변경 불가능(immutable)에 대한 기본 개념 중 변경 가능하다는 말 은 객체 내부의 원소들을 추가, 삭제, 변경할 수 있다는 것이지만 객체 자신을 변경할 수 있다는 말은 아니다.

변경 가능과 변경 불가능에 대한 처리를 세부적으로 알아보도록 하자.

예제 4-2 : 문자열은 변경 불가

문자열을 리터럴로 정의하고 첫 번째 원소의 값을 변경할 경우 변경이 불가능하다는 예외 가 발생한다.

```python
In : s = "창덕"
print(s[0])
s[0] = "성"
Out: ---------------------------------------------------------------------
TypeError             Traceback (most recent call last)
<ipython-input-3-89e2a22c7d40> in <module>()
3 print(s[0])
```

----> 4 s[0] = "성" TypeError: 'str' object does not support item assignment 변경할 수 없다는 뜻은 변경하는 _ _setitem_ _메서드가 만들어져 있지 않다는 뜻이다.

```python
In : str.__setitem__
Out: ---------------------------------------------------------------------
AttributeError          Traceback (most recent call last)
<ipython-input-1-c43c45c0b3f5> in <module>()
----> 1 str.__setitem__
AttributeError: type object 'str' has no attribute '__setitem__'
```

예제 4-3 : 튜플(tuple) 변경 불가

튜플을 리터럴로 정의하고 첫 번째 원소의 값을 변경하려고 하면 문자열과 동일하게 원소 가 변경이 되지 않는다.

```python
In : t = ("고","요","한")
print(t[0])
t[0] = "김"
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-4-862b5e4a5e81> in <module>()
3 print(t[0])
```

----> 4 t[0] = "김" TypeError: 'tuple' object does not support item assignment 튜플도 변경이 불가능한 것은 _ _setitem_ _ 메서드가 없다는 것이다.

```python
In : tuple.__setitem__
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-2-d126425e5ffe> in <module>()
----> 1 tuple.__setitem__
AttributeError: type object 'tuple' has no attribute '__setitem__'
```

✚ 변경 가능 자료형(Mutable )

Sequence 자료형에서 변경이 가능한 자료형은 리스트와 바이트 어레이가 있다. 이 자료 형은 기존에 만들어진 원소들의 변경, 삭제 및 추가 등을 자유롭게 할 수가 있다.

예제 4-4 : 리스트(list) 원소 변경

리스트를 생성하고 리스트 첫 번째 위치를 변경해서 출력하면 첫 번째 위치 원소가 변경된 것을 확인할 수 있다.

```python
In : l = ["전","민","수"]
print(type(l))
l[0] = "김"
print(l)
Out: <class 'list'>
```

['김', '민', '수'] 리스트 클래스 내의 메서드를 확인해보면 _ _setitem과 _ _delitem_ _이 제공된다. 이를 가지고 원소를 추가 및 삭제할 수 있다.

```python
In : list.__setitem__
Out: <slot wrapper '__setitem__' of 'list' objects>
In : list.__delitem__
Out: <slot wrapper '__delitem__' of 'list' objects>
```

## 4.1.3 컬렉션(collections) 여부

컬렉션이란 다양한 원소를 가진 데이터 구조를 말한다. Sequence 자료형은 여러 원소들 로 구성되므로 기본 컬렉션이다. 컬렉션 여부는 원소 개수, 포함 관계, 반복 가능 여부를 확인할 수 있으면 된다.

✚ 자료형(data type) 내의 원소 개수 확인: len 함수

파이썬 Sequence 자료형 내부에 여러 원소를 가지므로 그 데이터에 대한 원소의 개수를 len 함수로 확인할 수 있다.

예제 4-5 : 원소의 개수 확인

한글로 작성된 문자열과 리스트 원소의 개수를 확인할 수 있다. 이때 함수를 len을 이용해 서 처리한다.

파이썬 3 버전에서는 문자열이 유니코드이므로 문자코드 단위 즉 문자 단위로 길이를 표 시한다.

```python
In : s = "강대명"
```

l = ["고","요","한"] print(len(s)) print(len(l))

```python
Out: 3
```

✚ 반복형을 반복자로 변형 처리 : iter 함수

Sequence 자료형들은 내부에 원소들이 없거나 연속적으로 들어 있어 반복해서 원소를 읽을 수 있으므로 반복형(Iterable)으로 처리가 가능하다.

반복자를 생성하는 iter 함수로 호출하려면 내부에 반드시 _ _iter_ _ 스페셜 메서드가 존재 해야 하지만 기존 버전과의 호환성을 유지하기 위해 _ _getitem_ _이 구현되어 있으면 이 를 호출해서 반복자로 처리하도록 만들어준다.

예제 4-6 : 반복형을 반복자로 변환

문자열, 튜플, 리스트 등 반복형 자료형을 반복자로 변형하는 함수 iter를 이용해서 변환을 했다. 각 타입에 맞는 반복자(iterator)형이 만들어지는 것을 확인할 수 있다.

문자열을 정의해서 반복자로 변환을 시키면 문자열 반복자라는 인스턴스를 하나를 만들어 준다. 이를 가지고 순환문에 실행하면 하나의 원소씩 출력한다.

```python
In : s = "강대명"
si = iter(s)
print(si)
for i in si :
print(i)
Out: <str_iterator object at 0x0000000004DC6550>
강
대
명
```

리스트를 생성하고 iter 함수로 처리하면 리스트 반복자 인스턴스가 만들어지고 순환문으 로 처리하면 원소 하나씩 출력한다.

```python
In : l = ["고","요","한"]
li = iter(l)
print(li)
for i in li :
print(i)
Out: <list_iterator object at 0x0000000004DD3198>
고
요
한
```

✚ Sequence 자료형 내에 원소 포함 확인: in 연산자

Sequence 자료형 내에 특정 원소가 들어가 있는지를 확인할 수 있다. in 연산자를 통해 내부에 포함 관계를 처리한다.

예제 4-7 : 원소들에 대한 포함 여부 확인하기

Sequence 타입으로 생성된 모든 자료형 내의 원소의 포함 여부를 확인할 수 있는 키워드 이다. 포함이 되면 True, 포함이 안 되면 False로 표시한다.

문자열을 생성하고 하나의 문자가 이 문자열에 속하는지를 확인하여 있으면 True로 표시 한다.

```python
In : s = "강대명"
```

print("대" in s)

```python
Out: True
```

리스트를 생성하고 하나의 문자열로 만들어진 원소가 특정 문자열과 같은지를 확인하여 포함되어 있다면 True로 표시한다.

```python
In : l = ["고","요","한"]
```

print("한" in l)

```python
Out: True
```

## 4.1.4 sequence 타입 내의 메서드 처리 기준

변경 가능(Mutable) 여부에 따라 내부 메서드 처리도 다른 기준이 적용된다. 변경 가능한 자료형이 메서드를 실행하면 내부의 원소들이 변경된다. 변경이 불가능한 자료형의 메서 드를 실행하면 새로운 인스턴스를 만들지만 원본 인스턴스는 변경하지 않는다.

✚ 내장 메서드 처리 기준

메서드 대부분은 자기 객체 내를 변경하므로 메서드 처리 결과값을 None으로 처리한다.

예제 4-8 : 변경 가능한 자료형의 메서드는 내부를 갱신

리스트를 가지고 내부의 원소를 정렬하는 메서드를 호출한다. 내부의 원소들이 순서가 바 뀌므로 내부 값의 위치를 변경하게 된다.

변경 가능한 자료형은 내부의 값을 변경하고 메서드의 결과값은 None으로 처리한다.

```python
In : l = ["고","가","한"]
c = l.sort()
print(c)
print(l)
Out: None
```

['가', '고', '한']

예제 4-9 : 변경 불가능한 경우는 별도의 객체를 만들어서 반환 처리

문자열은 내부 원소를 변경할 수 없으므로 변경하는 메서드인 replace를 실행하면 다른 인스턴스를 하나 더 생성한다. 기존 문자열 인스턴스는 변경되지 않는다.

```python
In : s = "강대명"
```

sr = s.replace("명","한") print(id(s), s) print(id(sr),sr)

```python
Out: 81568656 강대명
```

81631392 강대한

## 4.1.5 interning 처리

기존에 만들어진 변경이 불가능한 Sequence 자료형이 있을 경우 생성자를 통해 인스턴 스를 다시 생성하면 새로운 인스턴스를 만드는 것이 아니라 기존에 있는 것을 불러다 반환 해준다. 이런 처리 방식을 interning이라 한다.

예제 4-10 : 변경 불가능한 자료형의 interning 처리

튜플을 리터럴로 생성하고 이것을 다시 tuple 생성자로 인스턴스를 만들면 새로운 인스턴 스를 만들지 않고 기존의 인스턴스를 반환한다. 동일한 인스턴스를 처리하기 위해 이렇게 만들어진다.

```python
In : t = ("고","가","한")
ti = tuple(t)
print(t is ti)
Out: True
```

하지만 두 개의 리터럴을 생성해서 처리하면 interning이 만들어지지 않고 두 개의 인스 턴스가 별도로 만들어진다. 생성자로 호출하지 않아서 기존에 만들어진 것을 확인하지 않 기 때문이다.

```python
In : t = ("고","가","한")
```

ti = ("고","가","한") print(t is ti)

```python
Out: False
```

변경이 가능한 리스트를 리터럴로 만들고 다시 생성자로 처리하면 새로운 리스트 인스턴 스가 만들어진다. 변경이 가능한 경우에는 interning이 발생하지 않는다.

```python
In : l = ["고","요","한"]
li = list(l)
print(l is li)
Out: False
```
