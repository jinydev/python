---
layout: default
title: "03.00 3.0"
---

# 03.00 3.0

나눠서 나머지 값만을 처리하는 모드 연산자 %도 제공한다. Floordiv 계산 결과 나머지가 버려지지만 divmod로 계산하면 두 값을 튜플로 제공한다.

```python
In : import operator as op
print(op.mod(10,3),10 % 3 )
print(divmod(10,3))
Out: 1 1
(3, 1)
```

3.3.3. 비교 연산(comparison operation) 비교 연산자도 이항 연산자(binary)이다. 비교 연산자는 두 수식을 비교하는 연산자로써 비 교 연산한 결과를 True, False로 표현한다.

>(큼), <(작음), >=(크거나 같음), <=(작거나 같음), !=(같지 않음), ==(같음) 등 비교 연산은 조 건식을 평가하는 if문이나 while문에 사용된다. 또한 비교 연산에 대해서 operator 모듈 에서 함수를 만들어서 제공한다.

예제 3-28 : 비교 연산(comparison operation)

앞의 수가 뒤의 수보다 작거나 같을 경우에는 Operator 모듈에서 le, lt 함수로 처리한다.

```python
In : import operator as op
print(op.le(10,5), 10 <= 5)
print(op.lt(10,5), 10 < 5)
Out: False False
False False
```

앞의 수가 뒤에 수보다 크거나 같을 경우에는 ge, gt 함수로 처리한다.

```python
In : import operator as op
print(op.ge(10,5), 10 >= 5)
print(op.gt(10,5), 10 > 5)
Out: True True
True True
```

앞과 뒤의 수가 같거나 같지 않을 경우에는 eq, ne 함수로 처리한다. 최종 결과는 True/ False 값으로 반환한다.

```python
In : print(op.eq(10,5), 10 == 5)
print(op.ne(10,5), 10 != 5)
Out: False False
True True
```

## 3.3.4 비트 연산(bits wise operation)

파이썬의 비트 연산자는 숫자를 2진법으로 계산하는 연산자이다. 숫자 타입에서 비트 연 산자는 내장 타입 int 타입일 경우에만 처리된다.

예제 3-29 : 논리곱, 논리합

논리곱 연산자(&/and)로서 비트가 두 항에 모두 나타나는 경우 비트 결과를 표시, 논리합 연산자(|/or )로서 비트가 두 항 중 어떤 곳에 나타나는 경우 비트 결과를 표시한다.

```python
In : import operator as op
In : print(op.and_(10,11), 10 & 11)
Out: 10 10
In : print(op.or_(10,11), 10 | 11)
Out: 11 11
```

예제 3-30 : 배타적 논리합, invert

배타적 논리합 연산자(^)로서 한쪽의 항에만 비트가 존재할 경우 비트 결과를 표시, 단항 연산자 invert(~)로 비트를 뒤집어서 각 비트에 대하여 정확히 반대를 반환하며 처리 결과 는 숫자 1을 추가하고 부호를 바꾸면 된다.

```python
In : import operator as op
In : print(op.xor(10,11), 10 ^ 11)
Out: 1 1
In : print(op.invert(10), ~10)
Out: -11 -11
```

예제 3-31 : shift 연산

비트 연산 중에 비트의 자리를 이동해서 계산하는 방식으로 왼쪽으로 이동하면 곱하기 연 산과 같고 오른쪽으로 이동하면 나누기 연산과 동일하게 처리된다.

정수에 대해 비트 연산을 사용하면 2를 가지고 곱하기와 나누기 중 한 값으로 처리된 결과 를 확인할 수 있다.

```python
In : import operator as op
In : print(op.lshift(10,2), 10 << 2 )
print(10 * 2**2)
Out: 40 40
In : print(op.rshift(10,2), 10 >> 2 )
print(10 // 2**2)
Out: 2 2
```

## 3.3.5 논리 연산(logica operation) 및 단축 연산(short cut

operation) 논리 연산자(Logical operation)는 Logical operator와 Boolean value를 함께 사용하여 Boolean value를 반환(return)한다.

단축 연산(short cut operation)은 표현식을 평가할 경우 둘 다 논리적인 평가를 하지 않고 논리적인 판단에 해당하면 결과를 반환해서 처리한다.

예제 3-32 : 논리 연산

논리합(and) x and y 평가에 있어서, x가 거짓으로 판명되면 x를 반환하고, 그렇지 않은 경우에는 y를 평가하여 결과값을 반환한다. 논리곱(or) x or y 평가에 있어서, x가 참으 로 판명되면 x를 반환하고, 그렇지 않은 경우에는 y를 평가하여 결과값을 반환한다. 논리 부정(not) not x 평가에 있어서, x가 거짓이라는 것은 x의 반대를 참값으로 반환한다는 뜻 이다.

```python
In : import operator as op
In : print(op.and_(True, False), True and False)
Out: False False
In : print(op.or_(True, False), True or False)
Out: True True
In : print(op.xor(True, False), True ^ False)
Out: True True
In : print(op.not_(True), not True)
Out: False False
```

예제 3-33 : 축약 연산

and 연산은 첫 번째가 True일 경우는 and 우측 편을 반환하고 첫 번째가 False이면 and 의 좌측 편을 반환한다.

```python
In : a = 100
c = (a*10) and (a*a)
print(c)
Out: 10000
```

or 연산의 경우는 첫 번째가 True일 경우는 or 좌측 편을 반환하고 False이면 or의 우측 편을 반환한다.

```python
In : a = 100
c = (a*10) or (a*a)
print(c)
Out: 1000
CHAPTER
```

Sequence 자료형 숫자 자료형은 하나의 원소만으로 이루어졌다. 이번 장에서는 순서를 유지하는 다양한 원 소로 구성된 자료형에 대해 알아본다.

여러 원자로 구성된 자료형은 대표적인 명칭으로 시퀀스(Sequence) 자료형이라고 부른다.

파이썬에서는 문자열, 리스트, 튜플, 바이트, 바이트 어레이 등을 포함하고 있다.

Sequence 자료형의 특징은 동일한 타입의 원소를 가질 수도 있고 리스트처럼 객체를 원 소로 가질 수도 있다. 특정 자료형은 한번 생성되면 원소를 변경할 수 없고 다른 경우는 원소들을 변경할 수 있다.

순서가 있으므로 인덱스를 이용해서 검색이 가능하고 슬라이스로 부분도 검색이 가능 하다.

✚ 알아볼 주요 내용

● 문자열 처리 : str

● 바이트 문자열 처리 : bytes, bytearray

● 배열 처리 : list, tuple

● 얇은 복사와 깊은 복사
