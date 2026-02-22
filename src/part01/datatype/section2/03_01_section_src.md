---
layout: default
title: "03.01 숫자"
---

# 03.01 숫자

숫자 자료형의 특징은 값이 곧 인스턴스이다. 하나의 값이 만들어지면 이 값은 하나의 인 스턴스로 관리된다. 동일한 숫자는 원칙적으로 하나의 인스턴스이어야 하지만 파이썬 내 부적으로는 특정 숫자까지만 동일한 인스턴스로 관리한다.

숫자는 하나의 값만을 관리해서 원소가 하나인 원자형 구조이고 한번 만들어지면 값이 변 경이 될 수 없으므로 항상 불변(Immutable) 객체이다.

숫자 자료형으로 만들어진 인스턴스들의 연산을 통해 항상 새로운 인스턴스가 만들어 진다.

또한 내장 자료형은 공통으로 사용되므로 런타임에 사용자에 의해 속성이나 메서드를 추 가할 수 없도록 제한을 주고 있다.

## 3.1.1 숫자 자료형의 특징

정수, 실수, 복소수가 생성되면 이 원소는 별도의 속성이 없이 보관된다. 값과 레퍼런스가 유일해야 하지만 성능을 위해서는 필요할 때마다 생성하게 된다.

그러므로 동일한 숫자이지만 인스턴스 간 레퍼런스의 차이가 발생한다. 이를 해결하기 위해 단일 원소만 있을 때 값으로 비교해서 동일하면 같은 인스턴스로 처리하도록 권고 한다.

정수는 기본 10진법을 표시하지만 2진법, 8진법, 16진법 등으로 변환해서 처리할 수 있다.

예제 3-1 : 원자형 정수의 레퍼런스 처리

파이썬에서 인스턴스 처리 기준으로 동일한 정수를 두 번 만들어도 레퍼런스는 동일하다.

정수의 숫자를 만들어서 어느 범위가 동일한지를 알아본다.

숫자 10을 두 개의 변수에 할당하고 is 키워드를 이용해서 두 변수 내의 동일한 정수 인스 턴스가 들어가있는지를 확인한다. 동일한 인스턴스일 경우는 동일한 레퍼런스를 가져야 하므로 True를 반환한다.

```python
In : vari = 10
varb = 10
print(vari is varb)
Out: True
```

정수 1000을 두 변수에 할당했다. 두 변수가 동일한 레퍼런스를 가지는 인스턴스 여부 를 is 키워드로 처리하면 False가 나온다. 동일한 레퍼런스를 가져야 할 규칙을 따르지 않 는다. == 연산자를 이용해서 하나의 원소만 가지므로 값이 같다는 것을 체크하도록 권고 하는 이유이다.

```python
In : vari = 1000
varb = 1000
print(vari is varb)
print(vari == varb)
Out: False
True
```

파이썬에서는 내부적으로 빠른 처리를 위해 특정 숫자까지는 동일한 레퍼런스를 유지하도 록 처리하지만, 더 큰 숫자일 경우는 성능을 위해 다른 인스턴스를 만들어서 처리하도록 구조화되어 있다.

그래서 동일한 인스턴스인지를 체크할 때도 == 연산자로 처리하라는 권고 사항이 있다.

```python
In : vari = 256
varb = 256
print(vari is varb)
print(vari == varb)
Out: True
True
```

예제 3-2 : 런타임에 속성 추가 금지

내장 숫자 자료형에는 인스턴스에 속성이나 메서드가 추가되지 않는다. 그 이유는 정수의 인스턴스를 관리하는 네임스페이스(_ _dict_ _)가 없기 때문이다.

int 클래스 생성자를 이용해서 정수를 만들어 변수에 할당 후 이 정수의 네임스페이스를 조회하면 AttributeError가 발생한다. 내부에 이 속성이 없다는 것이다.

```python
In : b = int(100)
print(b)
print(b.__dict__)
Out: 100
---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-4-26dca5bfbabf> in <module>()
1 b = int(100)
2 print(b)
----> 3 print(b.__dict__)
AttributeError: 'int' object has no attribute '__dict__'
```

정수에 대한 추가 내용을 가지고 싶을 경우에는 사용자 클래스를 만들어야 한다. 정수 클 래스를 상속받은 사용자 클래스 Int를 정의했다.

내부 인스턴스 속성을 추가했다. 하나의 인스턴스를 만들어서 그 인스턴스 내부의 네임스 페이스를 조회하면 속성이 있는 것을 알 수가 있다.

```python
In : class Int(int) :
def __init__(self, value) :
self.value = value
a = Int(100)
print(a.__dict__)
Out: {'value': 100}
```

사용자 클래스에 연산자를 추가해서 정수와 INT 클래스가 모두 덧셈을 할 수 있도록 정 의했다. 반환값을 보면 항상 새로운 인스턴스를 만들어서 새로운 것으로 변환하도록 처리 한다. 하나의 원자만을 갖는 자료형이므로 항상 계산된 값을 처리한 후에 하나의 새로운 인스턴스가 만들어져야 하기 때문이다.

```python
In : class INT(int) :
def __init__(self, value) :
self.value = value
def __add__(self, other) :
print(" add ")
if isinstance(other, int) :
return Int(self.value + other)
else :
return Int(self.value + other.value )
```

두 개의 인스턴스를 만들어서 덧셈한 경우에는 새로운 값을 가진 인스턴스가 만들어져 있다.

정수와 덧셈을 한 경우에도 사용자 클래스의 인스턴스가 만들어져 있다.

```python
In : aa = INT(100)
bb = INT(200)
aa = aa + bb
print(aa.__dict__)
aa = aa + 500
print(aa.__dict__)
Out: add
{'value': 300}
add
{'value': 800}
```

## 3.1.2 숫자 타입의 형 변환(type conversion)

별도의 형 변환하는 함수가 없고 생성자를 이용해서 새로운 인스턴스를 만들어 형 변환을 하므로 원본은 변경이 되지 않는다. 혹시 동일한 변수를 사용한다면 형 변환을 할 때 동일 한 변수에 새로운 인스턴스를 만들고 할당해서 사용하도록 한다.

예제 3-3 : 정수와 실수 형 변환

실수를 하나 정의해서 자료형과 인스턴스 레퍼런스를 확인한다.

```python
In : f = 100.11
print(type(f), id(f), f)
Out: <class 'float'> 87938152 100.11
```

실수를 정수로 형 변환을 하기 위해 정수를 생성하는 int 클래스의 생성자에 실수를 넣고 정수 인스턴스를 생성한다.

정수에 대한 자료형, 레퍼런스를 출력해서 다른 인스턴스가 만들어졌다.

```python
In : i = int(f)
print(type(i), id(i), i)
Out: <class 'int'> 1520485936 100
```

실수의 값을 int를 이용해 소수점 이하의 숫자를 버려 정수로 바꾸는 것은 round 함수를 이용해도 동일하게 할 수 있다.

이 함수도 처리된 결과를 반환할 때 정수이면 int로 인스턴스를 생성해서 결과를 보내고 실수이면 float를 이용해서 인스턴스를 생성하고 결과를 반환하는 것이다. 왜냐하면 모든 숫자 객체는 자신의 값만 가지기 때문에 값이 달라지게 하려면 새로운 객체를 만들어야 한다.

```python
In : f = 100.33
print(type(f),id(f),f)
c = round(f)
print(type(c),id(c),c)
d = round(f,1)
print(type(d),id(d),d)
Out: <class 'float'> 87938080 100.33
<class 'int'> 93701040 100
<class 'float'> 87938296 100.3
```

예제 3-4 : 복소수, 정수, 실수 형 변환

정수나 실수를 복소수(complex)로 전환하면 정수와 실수에는 허수부가 없으므로 허수부가 전부 0으로 변경되는 것을 확인할 수 있다.

```python
In : a = complex(1)
b = complex(100.22)
print(type(a),a)
print(type(b),b)
Out: <class 'complex'> (1+0j)
<class 'complex'> (100.22+0j)
```

정수와 실수를 형 변환 복소수를 가지고 비교하면 동일한 값으로 판단한다는 것을 알 수 있다.

```python
In : print(1 == a )
print(100.22 == b)
Out: True
True
```

복소수를 정수나 실수로 형을 바꾸면 복소수 부분이 처리가 되지 않는다.

```python
In : int(a)
Out: ---------------------------------------------------------------------
TypeError             Traceback (most recent call last)
<ipython-input-14-c8db2292b237> in <module>()
----> 1 int(a)
TypeError: can't convert complex to int
In : float(b)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-15-c3f4d1eb8547> in <module>()
----> 1 float(b)
TypeError: can't convert complex to float
```

위의 복소수를 만든 예제에서 실수부만 가지고 형 변환을 하면 허수부가 없으므로 형 변환 이 가능하다.

```python
In : print(int(a.real))
print(float(b.real))
Out: 1
100.22
```

## 3.1.3 문자열 중에 숫자 형태의 숫자 형 변환

문자열로 들어온 숫자에 대한 형 변환이 필요한 경우가 있다. 프로그램에서 io 처리는 기 본적으로 바이트나 텍스트가 다 문자열이므로 이 문자열을 숫자 자료형으로 변환해야 숫 자로 계산이 가능하다.

문자열로 들어온 숫자에 대해 정수와 실수 등 숫자로 어떻게 변환이 되는지를 알아본다.

예제 3-5 : 문자열을 정수로 형 변환

문자열 내의 isdigit 메서드를 이용해서 문자열 내의 모든 것이 숫자일 경우만 정수에서 처 리가 된다.

```python
In : s = "100"
print(s.isdigit())
print(int(s))
Out: True
```

문자열에 숫자가 아닌 점은 정수로 형 변환할 경우 문자로 인식된다. 숫자가 아닌 값들이 들어왔을 때는 형 변환 시에 예외가 발생한다.

```python
In : sf = "100.11"
print(sf.isdigit())
print(int(sf))
Out: False
---------------------------------------------------------------------
ValueError             Traceback (most recent call last)
<ipython-input-9-9bd7ff72df45> in <module>()
1 sf = "100.11"
2 print(sf.isdigit())
----> 3 print(int(sf))
ValueError: invalid literal for int() with base 10: '100.11'
```

위의 예제를 해결하기 위해 실수로 형 변환을 한 후에 다시 정수로 형 변환을 한다.

```python
In : sf = "100.11"
print(sf.isdigit())
print(int(float(sf)))
Out: False
```

## 3.1.4 2, 8, 16진법을 정수에서 변환하기

파이썬에서는 정수일 때만 2진수는 bin 함수를 이용해서 0b+ 숫자로 표시하고 8진수는 oct 함수를 이용해서 0o+ 숫자로 표시하며, 16진수는 hex 함수를 사용해서 0x+숫자로 표현한다.

예제 3-6 : 2/8/16진법으로 변환

변수 x에 100을 할당하고 내장 함수 bin을 이용해서 이진수로 변환한다. 변환된 값이 0x 가 붙으므로 문자열로 처리되는 것을 알 수 있다.

다시 정수로 변환하기 위해서는 int 클래스의 인자에 2진수라는 것을 명기한다.

```python
In : x = 100
print(bin(x), type(bin(x)))
print(int(bin(x),2))
Out: 0b1100100 <class 'str'>
```

8진수와 16진수도 2진수로 변환하는 방식과 동일하지만 내장 함수 oct, hex를 사용하는 것이 다르다.

```python
In : print(oct(x), type(oct(x)))
print(int(oct(x),8))
Out: 0o144 <class 'str'>
In : print(hex(x), type(hex(x)))
print(int(hex(x),16))
Out: 0x64 <class 'str'>
```

8진수에 대해 2진수로 변환이 필요할 경우 내부적으로 base가 상이해서 처리가 되지 않 으므로 int로 전환했다가 다시 2진수로 처리한 후에 이 값이 정수로 전환했을 때 값이 맞 는지를 10진수로 확인했다.

```python
In : print(int(bin(int(oct(x),8)),2))
Out: 100
```

## 3.1.5 숫자 자료형 최대 처리 수 확인

파이썬에서 처리되는 숫자의 범위를 확인한다. 정수는 거의 무제한 처리되지만, 내부적인 시스템에 따라 다를 수도 있다.

기본적인 os에 대한 정보 중 sys 모듈을 이용해 숫자 자료형 정보를 확인해본다.

예제 3-7 : 숫자에 대한 범위 확인하기

숫자에 대한 기본 처리 범위에 대해서는 sys 모듈을 import하고 int_info, float_info 함 수를 통해 확인할 수 있다.

내부적인 정수의 범위는 2**bits_per_digit까지이지만 더 큰 수도 생성해서 처리된다.

```python
In : import sys
print(sys.int_info)
Out: sys.int_info(bits_per_digit=30, sizeof_digit=4)
```

정수일 경우는 더 큰 수인 10의 3300제곱을 연산하며 10964비트까지 처리되는 것을 볼 수 있다.

```python
In : a = 10**3300
print(a.bit_length())
Out: 10963
```

실수 자료형은 범위에 대해 한정하므로 이 범위가 넘을 경우 overflow도 발생할 수 있다.

```python
In : import sys
print("max",sys.float_info.max)
print("min",sys.float_info.min)
print("10 max",sys.float_info.max_10_exp)
print("10 min",sys.float_info.min_10_exp)
print("e max",sys.float_info.max_exp)
print("e min",sys.float_info.min_exp)
print("epsilon",sys.float_info.epsilon)
Out: max 1.7976931348623157e+308
min 2.2250738585072014e-308
10 max 308
10 min -307
e max 1024
e min -1021
epsilon 2.220446049250313e-16
```

실수 e의 지수 제곱에 대한 최댓값 범위를 넘어서 처리하면 오버플로(overflow) 에러가 발 생한다.

```python
In : import math
print(math.exp(1025))
Out: ---------------------------------------------------------------------
OverflowError          Traceback (most recent call last)
<ipython-input-28-d99dba7b5536> in <module>()
1 import math
----> 3 print(math.exp(1025))
OverflowError: math range error
```

예제 3-8 : 엡실론(epsilon) 이해하기

엡실론은 함수의 극한에서 사용되는 작은 수를 의미하며 파이썬 실수 계산에서도 정밀도 처리를 위해 아주 작은 값으로 사용된다. 1에다 엡실론을 더한 후에 1.0과 비교하면 동일 한 수가 아니라고 인지한다.

```python
In : import sys
a = sys.float_info.epsilon
print(a)
b = 1+ a
print(b)
print( 1.0 == b )
Out: 2.220446049250313e-16
1.0000000000000002
False
```

엡실론보다 수가 한 자리 낮아지면 1.0과 비교하여 정밀도 범위 밖임을 얘기하므로 동일 한 숫자로 인지한다.

```python
In : a = a * (1/10)
print( 1.0 == (1.0+a) )
Out: True
```

엡실론보다 더 작은 수로 들어오면 정밀도 범위 밖이므로 이 숫자는 정수로 인식되는 것도 알 수 있다.

```python
In : import sys
a = sys.float_info.epsilon
a = a * (1/10)
print((1.0 + a).is_integer())
print(int((1.0+a)))
Out: True
```
