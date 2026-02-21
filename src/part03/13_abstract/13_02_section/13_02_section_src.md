---
layout: default
title: "13.02 수에"
---

# 13.02 수에

이제부터는 내장 자료형들에 대한 추상 클래스를 알아본다. 파이썬 언어에서 숫자들에 대 한 스페셜 메서드로 정의된 사항에 대한 추상 클래스를 알아보면서 구현 클래스가 이를 어 떻게 구현했는지를 알아본다.

숫자 클래스들은 추상 클래스를 상속해서 구현하지 않았지만 상속 관계는 유지된다.

## 13.2.1 numbers 타입 모듈 확인하기

숫자 모듈 내의 추상화 클래스를 확인해보겠다.

✚ Numbers 모듈에는 숫자들을 관리하는 추상 클래스가 있다

numbers 모듈은 추상 클래스 모듈이므로 내부에는 ABCMeta 클래스부터 제공하 고 있으며, 상세 숫자에 대한 추상 클래스(Number, Complex, Real, Rational, Integral)와 astractmethod만 지정할 수 있도록 한다.

예제 13-10 : numbers 모듈 조회

숫자에 대한 추상화 모듈인 numbers 내에 있는 정보를 내장 함수 dir로 확인할 수 있다.

내부에 있는 추상 클래스는 전부 대문자로 처리가 되어 정규 표현식을 사용해서 첫 번째 문자가 대문자일 경우만 출력했다.

```python
In : import numbers,re
for i in dir(numbers) :
if re.match("[A-Z]", i) :
print(i)
Out: ABCMeta
Complex
Integral
Number
Rational
Real
```

numbers 모듈 내의 클래스 간 상속 관계를 확인하면 정수(Integral), 유리수(Rational), 실 수(Real), 복소수(Complex), 수(Number)로 숫자가 큰 관계를 가지는 것을 알 수 있다.

```python
In : import numbers
print(numbers.Integral.__bases__)
print(numbers.Rational.__bases__)
print(numbers.Real.__bases__)
print(numbers.Complex.__bases__)
print(numbers.Number.__bases__)
Out: (<class 'numbers.Rational'>,)
(<class 'numbers.Real'>,)
(<class 'numbers.Complex'>,)
(<class 'numbers.Number'>,)
(<class 'object'>,)
```

추상 클래스를 어떤 클래스에 의해 만드는지를 클래스 내의 속성 _ _class_ _로 확인할 수 있다. 보통 추상 클래스를 상속하지 않았다면 추상 메타 클래스로 만들어진다.

```python
In : import numbers
print(numbers.Integral.__class__)
print(numbers.Rational.__class__)
print(numbers.Real.__class__)
print(numbers.Complex.__class__)
print(numbers.Number.__class__)
Out: <class 'abc.ABCMeta'>
<class 'abc.ABCMeta'>
<class 'abc.ABCMeta'>
<class 'abc.ABCMeta'>
<class 'abc.ABCMeta'>
```

## 13.2.2 정수 : Integral, 유리수 : Rational

수학의 정수와 유리수를 파이썬에는 어떻게 처리하는지를 알아본다.

일단 내장 자료형인 int 클래스가 정수에 해당하고 유리수는 별도의 fractions 모듈 내 Fraction 클래스가 처리한다.

이 두 클래스와 정수(Integral), 유리수(Rational)와의 관계를 알아보겠다.

✚ 내장 int 클래스와의 관계 확인

내장 int 클래스는 정수 타입이므로 추상 클래스 Integral과의 관계를 확인해본다.

예제 13-11 : int와 numbers.Integral 관계

내장 클래스 int와 numbers 모듈 내 추상 클래스 Integral과의 상속 관계를 확인해보 면 True로 표시한다. int 클래스는 Integral 추상 클래스를 상속하지 않지만 protocol interface 규칙에 따라 상속 관계처럼 보여진다.

정수 리터럴 1에 대해 isinstance 관계를 numbers.Integral로 확인해도 True로 표시 한다.

```python
In : import numbers
print(issubclass(int,numbers.Integral))
print(isinstance(1, numbers.Integral))
print(int.__bases__)
Out: True
True
(<class 'object'>,)
```

수에 대한 추상화 모듈인 number.Integral를 상속해서 INT 클래스를 정의하려면 추상 메서드들을 전부 구현해야 한다.

number.Integral 클래스 내부의 _ _abstractmethods_ _에 있는 메서드를 전부 INT 클 래스에 재정의해야 하므로 빠짐없이 정의해야 한다. 재정의할 메서드는 아래와 같다.

```python
In : count = 1
for i in numbers.Integral.__abstractmethods__ :
print(i,end="")
count += 1
if count % 5 == 0 :
print()
Out: __floordiv____lt____truediv____mod__
__trunc____pos____neg____rand____floor__
__radd____rmul____and____or____rrshift__
__ror____lshift____add____rlshift____le__
__pow____rxor____invert____eq____rpow__
__abs____mul____rshift____int____rtruediv__
__xor____rmod____round____rfloordiv____ceil__
```

구현할 때 int 클래스에 있는 것은 int 내의 메서드로 대체했고, 나머지 메서드들은 None 으로 처리했다.

```python
In : import numbers
import operator as op
class INT(numbers.Integral) :
def __init__(self,value) :
self.value = value
__abs__ = int.__abs__
def __add__(self,other) :
return op.add(self.value, other)
__and__ = int.__and__
__ceil__ = int.__ceil__
__eq__ = int.__eq__
__floor__ = int.__floor__
__floordiv__= int.__floordiv__
__int__ = int.__int__
__invert__ = int.__invert__
__le__ = int.__le__
__lshift__ = int.__lshift__
__lt__ = int.__lt__
__mod__ = int.__mod__
__mul__ = int.__mul__
__neg__ = int.__neg__
__or__ = int.__or__
__pos__ = int.__pos__
__pow__ = int.__pow__
__radd__ , __rand__, __rfloordiv__, __rlshift__ =
None
__rmod__, __rmul__, __ror__, __round__, __rpow__ =
None
__rrshift__, __rshift__, __rtruediv__, __rxor__ =
None
__truediv__ = int.__truediv__
__trunc__ = int.__trunc__
__xor__ = int.__xor__
```

INT 클래스로 인스턴스를 생성한 후에 이 인스턴스를 연산자로 덧셈을 처리한 뒤 스페셜 메서드를 이용해서 처리되는 것을 확인할 수 있다. 추상 클래스를 상속해서 전부 정의하 지 않고 protocol interface를 사용해서 처리해도 동일한 결과가 나온다.

```python
In : i = INT(100)
print(issubclass(INT,numbers.Integral))
print(isinstance(i, numbers.Integral))
Out: True
True
```

add 연산만 int 자료형과 덧셈을 수행하도록 재정의가 되어 있는 것을 확인할 수 있다. int 자료형과의 연산을 하기 위해서는 모든 메서드를 수정해야 한다.

```python
In : print(i + 100)
Out: 200
```

✚ Fraction 클래스와의 관계 확인

유리수 처리를 위해 제공되는 fractons 모듈 내의 Fraction 타입도 유리수를 처리할 수 있 도록 구현되어 있다.

예제 13-12 : 유리수에 대한 사항 항목 점검

정수인 int도 Rational의 상속 관계가 True이다. fractions 모듈 내의 Faction 클래스도 유리수이므로 numbers.Rational 추상 클래스와의 관계도 상속 관계가 True라는 것을 알 수 있다. 정수 int는 fractions 모듈이 Fraction 클래스와 상속 관계가 없지만 계산이 가능 하며 계산 결과는 항상 Fraction class로 표시한다.

```python
In : import numbers
import fractions
print(issubclass(fractions.Fraction, numbers.Rational))
print(issubclass(int, numbers.Rational))
print(issubclass(int, fractions.Fraction))
Out: True
True
False
```

유리수를 상속해서 메서드를 구현하려면 아래의 메서드를 전부 구현해야 한다.

```python
In : count = 1
for i in numbers.Rational.__abstractmethods__ :
print(i,end="")
count += 1
if count % 5 == 0 :
print()
Out: __add____floordiv____lt____truediv__
__mod____trunc____le____pos____pow__
__neg____floor____eq____rpow____radd__
__rmul____abs____mul____rtruediv__numerator
__rmod__denominator__round____rfloordiv____ceil__
```

## 13.2.3 실수 : Real, 복소수 : Complex

수학에서의 실수와 복소수 처리를 파이썬에서 어떻게 표현하는지를 이해해보자.

✚ 내장 float 클래스와의 관계 확인

내장 float 클래스는 실수를 처리하도록 구현되어 있고 추상 클래스 Real의 서브 클래스 이다. 직접적으로 상속은 받지 않았지만 동일한 메서드가 구현되어 있다.

예제 13-13 : 실수 처리하는 관계 확인

추상 클래스 Real을 이용해서 파이썬 내부에서 사용되는 정수 int, 실수 float, 유리수 fractions.Fraction, 확장 실수 decimal.Decimal의 상속 관계를 확인해보면 Decimal을 빼고 나머지는 True가 나온다.

```python
In : import numbers
import fractions
import decimal
print(issubclass(int, numbers.Real))
print(issubclass(numbers.Rational, numbers.Real))
print(issubclass(float, numbers.Real))
print(issubclass(decimal.Decimal, numbers.Real))
print(issubclass(numbers.Real, decimal.Decimal))
Out: True
True
True
False
False
```

추상 클래스 Real을 상속해서 처리하려면 아래의 메서드들을 추가적으로 반드시 구현해 야 한다.

```python
In : count = 1
for i in numbers.Real.__abstractmethods__ :
print(i,end="")
count += 1
if count % 5 == 0 :
print()
Out: __add____floordiv____lt____truediv__
__mod____trunc____le____pos____pow__
__neg____floor____eq____rpow____radd__
__rmul____abs____mul____float____rtruediv__
__rmod____round____rfloordiv____ceil__
```

✚ 내장 complex 클래스와의 관계 확인

내장 complex 클래스는 복소수를 처리하도록 구현되어 있고 추상 클래스 Complex의 서브 클래스이다. 직접적으로 상속은 받지 않았지만 동일한 메서드가 구현되어 있다.

예제 13-14 : 복소수 상속 관계 확인

추상 클래스 Real을 이용해서 파이썬 내부에서 사용되는 정수 int, 실수 float, 복소수 complex, 유리수 fractions.Fraction, 확장 실수 decimal.Decimal의 상속 관계를 확인 해보면 Decimal을 빼고 나머지는 True가 나온다.

```python
In : import numbers
import fractions
import decimal
print(issubclass(int, numbers.Complex))
print(issubclass(fractions.Fraction, numbers.Complex))
print(issubclass(numbers.Rational, numbers.Complex))
print(issubclass(float, numbers.Real))
print(issubclass(numbers.Real, numbers.Complex))
print(issubclass(decimal.Decimal, numbers.Complex))
Out: True
True
True
True
True
False
```

추상 클래스의 복소수를 상속받아 구현하려면 아래의 메서드는 반드시 구현해야 한다.

```python
In : count = 1
for i in numbers.Complex.__abstractmethods__ :
print(i,end="")
count += 1
if count % 5 == 0 :
print()
Out: __add____truediv____pos____pow__
__neg____eq____rpow____radd__conjugate
__rmul____abs____mul____rtruediv__imag
real__complex__
```

## 13.2.4 수 : Number

수학의 수 체계 중에 가장 상위를 나타내는 numbers 모듈 내의 추상 클래스 Number에 대해 알아보자.

✚ 수 체계에 대한 기본 관계

파이썬 내부의 모든 숫자인 int, float, complex, 처리 클래스는 Number 클래스와의 관 계, frations.Fraction, decimal.Decimal의 모든 상속 관계도 확인할 수 있다.

예제 13-15 : 수에 대한 상속 관계를 확인

모든 숫자를 사용하는 것은 Number를 상속한 관계를 True로 표시한다.

```python
In : import numbers
import fractions
import decimal
print(issubclass(int, numbers.Number))
print(issubclass(fractions.Fraction, numbers.Number))
print(issubclass(numbers.Rational, numbers.Number))
print(issubclass(float, numbers.Number))
print(issubclass(numbers.Real, numbers.Number))
print(issubclass(decimal.Decimal, numbers.Number))
print(issubclass(complex, numbers.Number))
print(issubclass(numbers.Complex, numbers.Number))
Out: True
True
True
True
True
True
True
True
```

추상 클래스에서 제일 상위 클래스인 Number는 구현할 메서드가 존재하지 않는다.

```python
In : numbers.Number.__abstractmethods__
Out: frozenset()
```
