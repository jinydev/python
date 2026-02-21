---
layout: default
title: "03.02 내장"
---

# 03.02 내장

파이썬에서 제공하는 내장 자료형과 필수 모듈을 알아보고 숫자를 어떻게 처리하는지를 알아본다.

특히, 정수, 유리수(모듈), 실수, 복소수, decimal(모듈) 등의 자료형 즉 클래스와 내부 속성 그리고 메서드에 대해 자세히 알아보자.

## 3.2.1 정수 int class

파이썬 3 버전에서 정수는 수학의 정수와 동일하게 처리되며 다른 프로그래밍 언어와 달 리 long 타입이 없다. 위에서 본 결과와 같이 엄청 큰 수도 정수로 표현할 수 있다는 것을 알 수 있다.

예제 3-9 : 리터럴과 생성자에 의한 생성

파이썬 정수는 리터럴과 생성자로 인스턴스를 만들 수 있다. 리터럴과 생성자로 만들어도 동일하게 int 클래스 인스턴스라는 것을 알 수 있다.

```python
In : a = 100
b = int(3000)
print(type(a),a)
print(type(b),b)
Out: <class 'int'> 100
<class 'int'> 3000
```

예제 3-10 : 정수의 주요 속성 및 메서드

정수 int 클래스 내부의 스페셜 속성과 메서드를 제외하면 일반적인 속성과 메서드를 조회 할 수 있다.

```python
In : for i in dir(int) :
if not i.startswith("_") :
print(i)
Out: bit_length
conjugate
denominator
from_bytes
imag
numerator
real
to_bytes
```

정수에서만 이진 연산도 가능하므로 이진수로 변환한 경우 bit_length 메서드로 이진수 크기를 알 수 있다. 정수를 bin 함수를 이용해서 변환하면 0b인 이진수 표현을 제외하고 총 7개 bit로 숫자가 만들어진 것을 볼 수 있다.

```python
In : x = 100
print(x.real)
print(x.bit_length())
print(bin(x))
Out: 100
0b1100100
```

정수도 분모(denominator)와 분자(numerator)로 표시해서 최적의 유리수 값을 표시한다.

```python
In : print(x.denominator)
print(x.numerator)
Out: 1
```

예제 3-11 : 바이트 문자열을 정수로 처리

바이트로 생성된 숫자 문자열을 받아서 정수로 변환도 가능하다. 바이트 문자열이 숫자를 표시하는 방식으로 빅 엔디언과 리틀 엔디언이 있으므로 변환하는 숫자의 값들이 위치를 확인해서 정수로 변환되고 이를 다시 바이트로 전환하면 변환 전의 값으로 처리된다.

빅 엔디언으로 바이트 변환했을 때 숫자는 뒤에 표시된다.

```python
In : c = bytes('123',encoding="utf-16be")
print(c)
Out: b'\x001\x002\x003'
```

위의 바이트를 받아서 정수로 변환하고 이를 다시 빅 엔디언(‘big’)으로 처리하면 바이트와 동일한 숫자로 처리되는 것을 알 수 있다.

```python
In : d = int.from_bytes(c,'big')
print(d)
print(d.to_bytes(6,'big'))
Out: 210456674355
b'\x001\x002\x003'
```

리틀 엔디언으로 처리하여 바이트로 변환했을 때 숫자는 뒤에 표시된다.

```python
In : c = bytes('123',encoding="utf-16le")
print(c)
Out: b'1\x002\x003\x00'
```

위의 바이트를 받아서 정수로 변환하고 이를 다시 리틀 엔디언(‘little’)으로 처리하면 바이 트와 동일한 숫자로 처리되는 것을 알 수 있다.

```python
In : e = int.from_bytes(c,'little')
print(e)
print(e.to_bytes(6,'little'))
Out: 219046608945
b'1\x002\x003\x00'
```

## 3.2.2 불리언 타입 : bool class

파이썬에서는 불리언 처리를 위해서 bool 클래스를 사용한다. bool 클래스에는 True와 False 두 개의 인스턴스가 고정으로 만들어져 있다.

이 클래스는 int 클래스를 상속받아 처리되므로 숫자로 계산도 가능하다.

예제 3-12 : bool 클래스 및 False 추론

상속을 int 클래스로 받아 동일한 속성과 메서드를 가지고 있다.

```python
In : for i in dir(bool) :
if not i.startswith("_") :
print(i)
Out: bit_length
conjugate
denominator
from_bytes
imag
numerator
real
to_bytes
```

bool 클래스의 인스턴스인 True와 False의 값을 확인해보면 정수 1과 정수 0이라는 것을 알 수 있다.

```python
In : print(True.real)
print(False.real)
Out: 1
```

내장 자료형의 불리언 값이 False로 추론이 되어 처리되는 경우를 보면 자료형 인스턴스 안에 원소가 없는 경우를 False로 처리되는 것을 알 수 있다.

아래의 예제처럼 처리되는 값을 출력해보면 아무 것도 없다는 None, 숫자 0 ,문자열에 없 음(“”), 빈 리스트([ ]), 빈 튜플(( )), 빈 dict({ }, set( )) 등의 인스턴스가 모두 False라는 것을 알 수 있다.

```python
In : for i in [0,0.0,"",(),{},[],set(), None] :
print(str(i), bool(i))
Out: 0 False
0.0 False
False
() False
{} False
[] False
set() False
None False
```

✚ Bool 클래스 내부 정보 조회

클래스 bool를 조회해보면 int를 상속했고 특정 값을 bool 타입으로 변환하는 것을 설명 한다.

예제 3-13 : bool 자료형에 대한 수치 계산

상속을 받았는지를 _ _bases_ _로 확인하면 int 클래스가 있는 것을 볼 수가 있고 issubclass로 확인해보면 결과도 True로 표시한다.

```python
In : print(bool.__bases__)
print(issubclass(bool, int))
Out: (<class 'int'>,)
True
```

내장 타입 bool은 int 클래스를 상속받아 만들어진 클래스이므로 수치 계산이 가능하지만, True는 1이고 False는 0으로만 처리되는 점도 알고 있어야 한다.

```python
In : True + 1
Out: 2
In : False + 1
Out: 1
```

예제 3-14 : 불리언 자료형으로 형 변환 처리

클래스 bool로 생성할 때 리터럴, 표현식, 조건식이 다 가능하며 최종 평가된 결과를 기준 으로 결과값을 True와 False로 반환한다.

예제 3-15 : 함수와 논리식을 변환

Bool 생성자에 함수, 클래스, 논리식 등을 넣어도 평가해서 논리값이 적용된다.

```python
In : bool(lambda x : x)
Out: True
In : class A :
pass
bool(A)
Out: True
In : bool(10 < 20)
Out: True
```

## 3.2.3 실수 float class

파이썬에서 부동소수점 숫자인 실수에 대한 클래스는 float 클래스로 처리한다. 실수형은 기본으로 배정밀도로 처리하지만 정밀도상의 이슈는 그대로 있다. 정밀도에 대한 조정이 필요해서 계산할 때 decimal 모듈을 이용하면 더 정밀도를 높게 처리할 수 있다.

✚ 실수 생성 방법

리터럴과 생성자를 가지고 실수를 표현할 수 있다. 리터럴에 소수점이 표시되면 실수로 인식한다.

예제 3-16 : 실수 리터럴과 생성자 호출

실수 값을 소수점 이하로 표시한 리터럴이나 생성자의 인수로 넣어 처리할 수 있다.

```python
In : x = 100.1
print(x)
Out: 100.1
In : x = float("100.999")
print(x)
Out: 100.999
```

✚ 실수 속성과 메서드

정수와 동일한 속성과 메서드도 있고, 실수에서만 제공하는 메서드들도 있다.

예제 3-17 : 속성과 메서드 처리

실수에 대한 내장 속성과 메서드를 조회한다.

```python
In : for i in dir(float) :
if not i.startswith("_") :
print(i)
Out: as_integer_ratio
conjugate
fromhex
hex
imag
is_integer
real
```

이 중에 is_integer 메서드를 이용하면 정수로 바로 변환이 가능한 실수가 표시되는 경우 는 True로 표시한다. as_integer_ratio 메서드는 정수로 변환될 때 가장 적절한 수의 비 율로 표시한다.

```python
In : x = 100.11
i = 100.0
print(x.is_integer())
print(i.is_integer())
print(x.as_integer_ratio())
print(i.as_integer_ratio())
Out: False
True
(7044614979625943, 70368744177664)
(100, 1)
```

동일한 값인 1과 1.0에 대해 어떻게 판단하는지를 확인해본다. 정수 int를 단순히 float화 한 경우를 비교하면 True로 인식한다.

```python
In : j = 100
k = 100.0
print(j == k)
Out: True
```

실수를 hex 값으로 전환하면 문자열 표시는 [sign] ['0x'] integer ['.' fraction] ['p' exponent] 형태로 만들어진다. 특히 fraction 부분은 16진수의 소수점 이하 부분이므로 이를 산술식으로 계산해도 동일한 값이 처리된다. Fromhex 메서드를 이용하면 이 산술 식을 그대로 계산해서 실수로 출력된다.

```python
In : d = (3740.0).hex()
## [sign] ['0x'] integer ['.' fraction] ['p' exponent]
print( (1 + 13./16 + 3./16**2 + 8./16**3) * 2.0**11)
print(d)
print(float.fromhex(d))
Out: 3740.0
0x1.d380000000000p+11
3740.0
```

## 3.2.4 복소수 complex class

파이썬에서 복소수 계산을 기본 자료형으로 제공하고 이 클래스는 complex 클래스이다.

수학과 차이점은 허수부에 정의되는 표기법이 i에서 j로 바뀌어서 사용된다는 것이다.

✚ 생성 방법, 속성과 메서드

복소수도 다른 숫자 자료형과 동일한 방식으로 생성 및 메서드 처리를 한다. 차이점은 허 수부가 추가로 존재한다는 것이다.

예제 3-18 : 복소수 리터럴과 생성자로 생성

리터럴과 클래스로 인스턴스를 생성하는 두 가지 방법이 다 가능하다.

```python
In : x = 100 + 4j
print(x)
Out: (100+4j)
In : y = complex(100,4)
print(y)
print(x == y)
Out: (100+4j)
True
```

예제 3-19 : 복소수 속성과 메서드

속성으로는 real(실수부), imag(허수부)가 있고 메서드 conjugate만 가지고 있다.

```python
In : for i in dir(complex) :
if not i.startswith("_") :
print(i)
Out: conjugate
imag
real
```

복소수를 만들어서 속성과 메서드를 실행하면 현재 만들어진 복소수의 실수부, 허수부 그 리고 허수부의 부호가 반대인 켤레복소수를 표시한다.

```python
In : xx = 200 + 5j
print(xx.real)
print(xx.imag)
print(xx.conjugate())
Out: 200.0
5.0
(200-5j)
```

## 3.2.5 유리수 Fraction class

유리수(Rational)는 정수를 포함해서 소수점이 없는 분수로 구성되는 숫자까지 포함된다.

유리수의 구조는 분모(denominator)와 분자(numerator)로 표시한다.

파이썬에서는 이 유리수를 지원하는 fraction 모듈을 제공하고 이 내부에 Fraction 클래 스로 생성해서 계산할 수 있다. 유리수는 정수와 계산될 때만 유리수로 남아 있고 실수와 계산하면 실수로 자료형이 바뀌는 것을 알 수 있다.

예제 3-20 : 유리수 클래스의 속성과 메서드

숫자 자료형과의 차이점은 from_decimal, from_float, limit_denominator이다.

```python
In : import fractions
for i in dir(fractions.Fraction) :
if not i.startswith("_") :
print(i)
Out: conjugate
denominator
from_decimal
from_float
imag
limit_denominator
numerator
real
```

Fractions 모듈이 Fraction 클래스에 인자로서 분모와 분자의 값을 주고 생성한다.

```python
In : import fractions
x = fractions.Fraction(345,23)
print(x, type(x))
y = fractions.Fraction(20,20000)
print(y, type(y))
Out: 15 <class 'fractions.Fraction'>
1/1000 <class 'fractions.Fraction'>
```

유리수는 분자와 분모가 정수일 경우만 처리가 되므로 실수가 오면 생성이 되지 않는다.

```python
In : import fractions
x = fractions.Fraction(345.0,23)
print(x, type(x))
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-101-1bf1a6729788> in <module>()
1 import fractions
----> 3 x = fractions.Fraction(345.0,23)
4 print(x, type(x))
C:\ProgramData\Anaconda3\lib\fractions.py in __new__(cls, numerator,
denominator, _normalize)
172        )
173    else:
--> 174     raise TypeError("both arguments should be "
175               "Rational instances")
TypeError: both arguments should be Rational instances
```

예제 3-21 : 다른 자료형을 처리하기

실수를 가지고 임의의 유리수로 변경이 가능한 경우에 from_float를 이용해서 처리가 가 능하다. 특정 분모를 제한하면 이 숫자에 맞춰 조정도 가능하다.

```python
In : import fractions
c = fractions.Fraction.from_float(100.1)
print(c)
print(c.limit_denominator(10))
Out: 3521955646092083/35184372088832
1001/10
```

또한 큰 수를 처리하는 decimal 모듈의 Decimal을 가지고도 유리수로 표현할 수 있다.

```python
In : import fractions
import decimal
d = fractions.Fraction.from_decimal(decimal.Decimal(100.1))
print(d)
print(d.limit_denominator(10))
Out: 3521955646092083/35184372088832
1001/10
```

## 3.2.6 큰 수 decimal class

정밀한 수치 계산이 필요한 경우 decimal 모듈을 이용해서 처리한다. Decimal로 생성하 면 정밀도에 대해 조정이 가능해서 실수로 계산하는 것보다 더 큰 정밀도도 계산이 가능하 고 정밀도에 대한 조정도 가능하다.

✚ Decimal 클래스 이해하기

실수보다 더 정밀한 계산을 위해서는 decimal 모듈을 이용해서 계산하는 것이 더 좋다.

예제 3-22 : Decimal 모듈의 환경 이해하기

Decimal 모듈을 사용하기 위해서는 context를 알아야 하고 현재 context는 getcontext 함수로 조회하면 Context 인스턴스를 가져온다. 그 내부의 속성인 prec는 소수점 이하의 정밀도이므로 정밀도에 대한 처리 기준을 알 수 있다.

```python
In : import decimal
c = decimal.getcontext()
print(type(c))
print(c.prec)
Out: <class 'decimal.Context'>
```

입력한 것보다 더 높은 정밀도가 표시되는 이유는 정밀도가 28자리까지이기 때문이다.

```python
In : import decimal
d = decimal.Decimal(0.1111111111111)
print(type(d))
print(d)
Out: <class 'decimal.Decimal'>
0.111111111111100002712959167183726094663143157958984375
```

계산된 결과를 더 작은 정밀도로 처리하기 위해 정밀도 컨텍스트를 줄이고 계산을 하면 정 밀도가 조정된다.

```python
In : decimal.getcontext().prec = 6
d = decimal.Decimal(1) / decimal.Decimal(7)
print(d)
print(repr(d))
Out: 0.142857
Decimal('0.142857')
```

✚ 생성 방법 및 계산 처리

Decimal 클래스의 인자로서 정수와 실수 또는 문자열로 정수와 실수를 정의해서 생성하 지만 다른 클래스와 계산 시 오류가 발생할 수 있으므로 자료형을 맞춰 계산을 수행한다.

예제 3-23 : Decimal 클래스 생성 및 실수와 연산

문자열로 정수나 실수를 배정해서 생성할 수 있다. 숫자 문자열일 경우 표시되는 숫자까 지만 생성한다.

```python
In : import decimal
a = decimal.Decimal('123456789')
print(a, repr(a))
b = decimal.Decimal('1234567.1234567')
print(b, repr(b))
Out: 123456789 Decimal('123456789')
1234567.1234567 Decimal('1234567.1234567')
```

숫자로 생성하면 컨텍스트 내의 정밀도 길이만큼 소수점 이하가 생기는 것을 확인할 수 있다.

```python
In : c = decimal.Decimal(1234567.1234567)
print(c)
print(repr(c))
Out: 1234567.12345670000649988651275634765625
Decimal('1234567.12345670000649988651275634765625')
```

파이썬 float와 decimal 모듈의 인스턴스는 서로 다른 자료형이므로 계산 시 예외가 발생 한다. 동일한 타입을 맞춰 계산한다.

```python
In : import decimal
a = 1234.123
print(a)
b = decimal.Decimal('1234567.1234567')
print(b)
c = a + b
Out: 1234.123
1234567.1234567
---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-128-ab62e8972ef8> in <module>()
7 print(b)
----> 9 c = a + b
TypeError: unsupported operand type(s) for +: 'float' and 'decimal.
Decimal'
```

실수와 Decimal을 연산하려면 각 자료형에 맞춰 계산한다. 현재까지는 실수와 큰 수에 대해 동일한 연산자로는 처리하지 못하게 구성되었다.

일단 실수 자료형에 맞춰 계산하고 두 번째는 큰 수에 대한 자료형을 맞춰 계산하면 두 숫 자 자료형에 맞춰 정밀도가 계산되는 것을 확인할 수 있다.

```python
In : import decimal
a = 1234.123
print(a)
b = decimal.Decimal('1234567.1234567')
print(b)
c = a + float(b)
print(type(c),c)
d = decimal.Decimal(a) + b
print(type(d),d)
Out: 1234.123
1234567.1234567
<class 'float'> 1235801.2464567
<class 'decimal.Decimal'> 1235801.246456700000047293724
```

예제 3-24 : 화폐 단위 등 특정 단위 계산이 필요한 경우

Penny 등 화폐 단위의 계산이 필요한 경우는 별도의 단위를 만들어서 이를 quantize 메 서드에 넣어 단위를 조정할 수 있다.

단위의 값을 문자로 생성해야 소수점 이하의 값도 유지해서 처리되는 것을 알 수 있다.

```python
In : import decimal
a = decimal.Decimal(1234.123)
print(a)
penny = decimal.Decimal('0.00')
print(penny)
print(a.quantize(penny))
Out: 1234.12300000000004729372449219226837158203125
0.00
1234.12
```
