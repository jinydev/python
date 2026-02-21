---
layout: default
title: "02.02 프로그램"
---

# 02.02 프로그램

프로그램을 작성해서 리터럴과 표현식을 재활용하고 여러 줄의 문장 등을 제어하려면 문 장에 대한 처리 기준인 작성 방법을 알아야 한다.

단순히 값만 처리하면 한번 처리된 결과는 다시 사용할 수 없으므로 문장에 상태를 저장하 는 할당문부터 복잡한 제어 및 순환을 위한 문장 등을 처리하는 방법을 알아본다.

## 2.2.1 할당(assignment) 문장

파이썬에는 별도 변수 정의가 없다. 변수에 리터럴과 표현식이 평가된 결과가 변수에 할 당되어야 변수가 초기화되는 것과 같다.

✚ 변수에 리터럴 할당(변수 정의)

직접 값을 변수에 할당하도록 표현이 되었지만 실제는 변수에 인스턴스 레퍼런스만 할당 해서 이 인스턴스 객체를 찾을 수 있는 참조만 할당한다.

예제 2-7 : 변수 정의

변수를 선언해서 정의하는 방법이 따로 없으므로 변수에 바로 할당한다. 변수 x에 1을 할 당했다. 이것을 출력하면 1이 나오는 것을 알 수 있다.

```python
In : x = 1
print(x)
Out: 1
```

여러 변수에 동일한 값을 할당하기 위해 변수를 여러 개 적고 각 변수에 할당하도록 정의 하면 제일 우측의 할당부터 평가되면서 모든 변수에 동일한 값이 할당되어 처리된다.

```python
In : a = b= c = 1
print(a,b,c)
Out: 1 1 1
```

변수에 값을 할당하는 것도 가능하지만 함수가 실행된 결과를 변수에 할당해도 동일한 결 과가 나오는 것을 알 수 있다.

```python
In : def func() :
return 100
d = func()
print(d)
Out: 100
```

예제 2-8 : 변수 할당되는 순서 이해하기

파이썬에서 할당 기호는 = 표시이고 이 우측부터 평가한 결과를 좌측의 변수에 할당하 게 된다. 할당이 없는 변수를 먼저 사용하면 이 변수가 지정되어 있지 않다고 예외가 발생 한다.

변수가 들어가 있지 않은데 먼저 사용했기 때문에 이런 에러가 발생하는 것이다.

```python
In : xxxx = xxxx + 1
Out: ---------------------------------------------------------------------
NameError             Traceback (most recent call last)
<ipython-input-11-de634f63d52b> in <module>()
----> 1 xxxx = xxxx + 1
NameError: name 'xxxx' is not defined
```

위의 에러를 없애기 위해서는 반드시 변수를 먼저 정의하고 할당을 해서 정의한다. 이런 정의가 있고 난 후에 변수를 사용해야 정의 후에 사용하는 것이다.

```python
In : defined_var = 100
defined_var = defined_var + 30
print(defined_var)
Out: 130
```

## 2.2.2 단순 제어문(simple control statement)

제어문은 if문 내에 있는 조건식을 평가해서 참일 경우는 if문을 실행하고 거짓이면 제어문 을 빠져나간다. Else문이 추가된 경우에는 else문 내의 블록을 실행해서 처리한다.

예제 2-9 : 조건식의 평가 결과는 True/False

조건식(conditional expression)은 평가된 결과가 참과 거짓으로만 판별된다. 파이썬에서는 특정한 결과를 빼면 참으로 평가한다. 특정한 결과는 거짓으로만 인식하는 경우인데 숫자 일 경우는 0이고 문자열 등 다른 자료형일 경우는 원소가 없다는 것을 나타날 때이다.

```python
In : a = None
if a :
print("True")
else :
print("False")
Out: False
```

빈 값이 어떻게 평가되는지를 알아보기 위해 bool 클래스를 이용해서 인자로 넣고 인스턴 스를 만들어보면 전부 False라는 값을 출력한다.

```python
In : a = ""
print(bool(a))
b = []
print(bool(b))
c = None
print(bool(c))
Out: False
False
False
```

특정한 경우가 아닐 경우는 숫자가 들어가 있으므로 참으로 인식된다.

```python
In : a = 100
if a :
print("True")
else :
print("Else")
Out: True
```

✚ 조건식을 사용할 때 주의할 점

조건식을 평가할 때도 예외가 발생할 수 있다. 그래서 예외로 평가가 예상한 곳에서는 예 외를 처리한다.

또한 조건에 대한 평가를 할 때는 긍정 표현식의 부정보다는 인라인 부정(변수 is not 변수) 을 사용한다. 길이를 조건식으로 평가할 경우 len(변수명) == 0과 같이 길이를 평가하는 것 보다는 빈 값은 False를 의미하므로 not 변수명으로 사용한다.

예제 2-10 : 조건식 평가 시에 예외 발생

조건식 평가(condition expression evaluation)할 때 예외가 발생하면 조건식 평가가 제대로 안되고 예외가 먼저 처리된다.

```python
In : a = 1
b = 1
if a/0 == 1 and b == 1 :
print(" True ")
else :
print(" False ")
Out: ---------------------------------------------------------------------
ZeroDivisionError     Traceback (most recent call last)
<ipython-input-13-24ef035beb61> in <module>()
2 b = 1
----> 4 if a/0 == 1 and b == 1 :
5  print(" True ")
6 else :
ZeroDivisionError: division by zero
```

예외가 발생할 경우를 대비하기 위해 try except 구문을 이용해서 위의 예제를 예외 발생 없이 처리해봤다. 예외에 대한 자세한 부분은 뒤에서 자세히 알아본다.

```python
In : try :
if a/0 == 1 and b == 1 :
print(" True ")
else :
print(" False ")
except ZeroDivisionError as e:
print(" except ", e)
Out: except division by zero
```

예제 2-11 : 인라인 부정 처리

인라인 부정 시 주의할 점이 있는데, is 키워드 앞에 not을 사용하면 SyntaxError가 발생 한다.

```python
In : a = 100
b = 50
if a not is b :
print(" True ")
else :
print(" False ")
Out: File "<ipython-input-14-451887d8b94d>", line 4
if a not is b :
^
SyntaxError: invalid syntax
```

위의 예제를 해결하기 위해 키워드 is 다음에 not을 넣어서 부정을 처리한다.

```python
In : a = 100
b = 50
if a is not b :
print(" True ")
else :
print(" False ")
Out: True
```

✚ 값을 비교 연산으로 처리

제어문을 이용해 조건식에서 값에 대한 비교를 연산할 경우 비교된 값에 대한 참과 거짓을 평가한 후에 결과에 따라 if문이나 else 문에 정해진 로직을 처리한다.

예제 2-12 : 값에 대한 동등성 비교

두 개의 변수에 들어간 값들이 동일한지 여부는 ==을 사용해서 동등성을 비교하여 bool 에 넣고 실행하면 결과가 False로 출력된다.

```python
In : a = 1
b = 2
print(bool(a==b))
Out: False
```

이를 단순 제어문을 사용해서 조건식에 넣고 평가하면 위의 결과가 맞는 평가가 되므로 False로 처리된다.

```python
In : if a == b :
print(" True ")
else :
print(" False ")
Out: False
```

✚ 삼항 연산 처리(Ternary operators)

단순 제어문을 하나의 라인에 작성하면 삼항 연산자로 처리가 가능하다. 이 제어문을 하 나의 라인으로 사용하려면 블록 구문이 없어지고 내부에도 문장을 사용할 수 없다. 하나 의 라인으로만 처리하려면 내부의 결과가 표현식으로만 작성된다.

예제 2-13 : 삼항 연산자 : 인라인으로 if문 사용

두 변수가 있고 이 변수가 동일한 값을 가지면 변수 a가 처리되고 동일한 결과가 아니면 변수 b가 반환되어 처리된다.

삼항 연산의 결과를 다른 변수 c에 할당했으므로 이를 출력하면 변수 b 내의 값이 변수 c 로 넘어간 것을 알 수 있다.

```python
In : a = 100
b = 50
c = a if a == b else b
print(c)
Out: 50
```

삼항 연산자로 처리되는 곳에서 pass문 등 문장을 사용할 경우는 예외가 발생한다. 삼항 연산자에서는 표현식으로 평가가 되는 것만 처리가 되는 것을 알 수 있다.

```python
In : d = a if a==b else pass
print(d)
Out: File "<ipython-input-26-1ac540b51551>", line 1
d = a if a==b else pass
^
SyntaxError: invalid syntax
```

## 2.2.3 복합 제어문(complex control statement)

복합 제어문은 여러 개의 조건식을 별도로 평가하기 위해 elif문을 여러 번 사용하는 것을 말한다.

제어문은 아무리 조건식이 많아도 최종적으로 처리되는 것은 조건식에 해당된 결과가 만 족할 경우만 실행되는 것을 볼 수 있다.

✚ 복합 제어문: elif

다양한 조건식을 사용하고 싶을 경우 elif문에 조건을 추가해서 로직을 넣는다. 해당 if 조 건이 만족하지 않으면 그 다음에 정의된 elif 조건식을 평가하고 만족하면 내부 블록의 로 직을 처리한다.

예제 2-14 : 조건식 세분화하기

비교 연산과 논리 연산 처리 시 주의할 점은 연산자 우선순위에 따른 결과값이 다르게 나 올 수 있다는 것이다.

```python
In : a = 10
b = 20
if a > 5 & b > 20 :
print(" first a > 5 & b > 20 ")
elif a > 7 & b > 20 :
print(" second a > 7 & b > 20 ")
elif a > 7 & b >= 20 :
print(" third a > 7 & b >= 20 ")
else :
print(" other ")
Out: other
```

복잡한 조건식이 있을 경우 괄호를 사용해서 우선순위를 지정한다. 우선순위에 따라 다른 결과가 나올 수 있다.

```python
In : a = 10
b = 20
if (a > 5) & (b > 20) :
print(" first a > 5 & b > 20 ")
elif (a > 7) & (b > 20) :
print(" second a > 7 & b > 20 ")
elif (a > 7) & (b >= 20) :
print(" third a > 7 & b >= 20 ")
else :
print(" other ")
Out: third a > 7 & b >= 20
```

마지막 else문을 사용하는 경우보다는 elif문을 사용해서 조건식을 평가하는 경우가 더 명 확한 결과를 표시할 수 있다. 또한 조건식을 지정할 때 비교 연산자로 동시에 비교할 수 있는 장점도 있다.

```python
In : a = 100
if 50 < a <= 70 :
print(" first ")
elif 70 < a <= 80 :
print(" second ")
elif 80 < a <= 90 :
print(" third ")
elif 90 < a <= 100 :
print(" fourth ")
Out: fourth
```

✚ 스위치 케이스(switch case)문 처리 방법

다른 프로그래밍 언어에서는 복합 제어문을 단순하게 처리하기 위해 스위치 케이스(switch case)문을 제공한다. 파이썬에서는 복합 제어문만 제공한다.

하지만 딕셔너리와 함수를 이용해서 단순하게 스위치 케이스문을 처리할 수 있다. 또한 복합 제어문을 단순하게 처리할 수 있는 방법으로 사용해도 된다.

예제 2-15 : 딕셔너리의 값으로 함수를 넣어 케이스 처리

함수 2개를 정의하는데 하나는 10일 경우 처리하고 다른 하나는 100일 때 처리하는 것으 로 정의했다.

```python
In : def func_10() :
print(" 10 ")
def func_100() :
print(" 100 ")
```

하나의 딕셔너리를 지정해서 키에 10을 주고, 값으로 함수 func_10을 할당하고, 키로 100 을 할당하고, 값에 함수 func_100을 할당했다.

```python
In : switch_case ={ 10: func_10, 100: func_100}
```

이 switch_case 변수에 할당된 딕셔너리 내부를 읽기 위해 10과 100을 넣어서 검색하면 함수가 조회된다. 이 함수를 실행 연산자로 실행을 하면 두 개의 함수가 실행되어 출력을 한다.

이처럼 필요한 경우마다 하나를 호출해서 처리하면 복합 제어문과 스위치 케이스문을 처 리하는 것과 동일한 결과가 나오는 것을 알 수 있다.

```python
In : switch_case[10]()
switch_case[100]()
Out: 10
```

## 2.2.4 순환문 처리 : for

파이썬 for문과 다른 언어와 차이점은 반복형(iterable)/반복자(iterator) 등의 자료를 순환하 면서 자동으로 처리한다는 것이다. 이런 반복형에는 문자열, 리스트, 딕셔너리 등의 내장 자료형이 있고 파일 등도 반복형으로 인식되므로 for문에서 순환해서 처리가 가능하다.

반복형을 반복자로 전환하고 구성 원소들을 하나씩 검색해서 처리하면서 마지막까지 처리 가 된다. 그 마지막 이후의 처리가 있을 경우 StopIteration이 발생한다. for 순환문에서 는 예외를 처리하지 않고 마지막까지 처리된 것이라는 것을 인지해서 순환문을 종료한다.

예제 2-16 : 반복자 처리

반복형 range 클래스로 인스턴스를 만들 수가 있지만 이를 반복해서 처리할 수 있도록 iter 함수를 이용해서 만들면 일단 한 번만 사용이 가능한 반복자로 만들어진다.

```python
In : a = iter(range(3))
print(a)
Out: <range_iterator object at 0x10cdbb270>
```

next로 호출해서 하나씩 처리하면 3번째까지 실행된다. 4번째 호출하면 반복자가 다 사용 이 되었기 때문에 예외가 발생한다.

```python
In : print(next(a))
print(next(a))
print(next(a))
print(next(a))
Out: 0
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-35-a2e7f9524bb1> in <module>()
2 print(next(a))
3 print(next(a))
----> 4 print(next(a))
StopIteration:
```

예제 2-17 : 반복형으로 for 순환 처리

for문은 반복형을 받고 반복자로 변환해서 순환을 처리한다.

일단 반복형인 range를 이용해서 10개의 원소를 처리하도록 순환을 실행한다.

```python
In : for i in range(10) :
print(i)
Out: 0
```

반복형인 문자열을 for문으로 순환을 시키면 문자열의 원소 하나씩 검색되어 출력이 되는 것을 볼 수 있다.

```python
In : for i in "Hello" :
print(i)
Out: H
e
l
l
o
```

리스트가 주어질 경우도 원소 하나씩 출력하는 것을 볼 수 있다.

```python
In : for i in [1,2,3] :
print(i)
Out: 1
```

## 2.2.5 순환문 처리 : while

while문은 for문과 달리 특정 조건식을 만족할 때까지 순환문 내를 실행한다. 조건식에 거짓이 발생하면 순환문을 종료하고 다음 문장을 처리하도록 한다.

반복형이나 반복자가 처리되지 않으므로 내부의 로직 중에서 별도로 순환할 수 있는 로직 을 처리한다.

예제 2-18 : 순환하기

순환문에 리스트로 평가해서 빈 리스트가 아니면 True이다. 따라서 원소가 다 사라지기 전까지는 순환이 되므로 리스트 내의 원소를 맨 앞에서부터 하나씩 꺼내도록 pop 메서드 내에 인자로 0을 넣어서 실행한다.

```python
In : l = [1,2,3,4]
while l :
print(l.pop(0))
Out: 1
```

특정 조건을 판단할 때 for문에서 range를 바로 사용하는 것과 유사하게 작성하려면 지능 형 리스트를 먼저 만들고 이를 while 조건절에 넣은 뒤 내부에서 이 리스트를 하나씩 줄 여가면 모든 원소를 다 처리한 후에 종료한다.

일단 모든 리스트의 원소를 덧셈해서 결과를 출력한다.

```python
In : total = 0
l = [x for x in range(5)]
print(l)
while l :
total += l.pop()
print(total)
Out: [0, 1, 2, 3, 4]
```

## 2.2.6 continue/break

순환문 등에서 특정 기능을 처리하지 않거나 중단하려면 continue문과 break문을 사용 한다.

● continue : 순환 처리는 특정 로직을 처리하지 않을 경우 순환문으로 돌아감

● break : 순환 처리 시 순환을 종료하는 경우 사용

✚ 순환문에서 continue와 break 처리 예시

While문에 조건을 True로 지정할 때 특별하게 이 순환문을 빠져나오지 않으면 무한 순환 을 실행한다.

예제 2-19 : 무한 순환 시 특정값 배제 및 순환을 강제 종료하기

일단 count라는 변수가 5와 값이 동일하면 break문을 이용해서 이 순환문을 종료시킨다.

```python
In : count = 0
while True :
if count == 5 :
break
print(count)
count += 1
Out: 0
```

또한 특정 숫자만큼만 처리를 하도록 구성하고 짝수값만 출력하도록 하려면 홀수일 조건 일 경우 출력을 하지 않고 순환문으로 돌아와서 실행되도록 한다. 그러면 이 홀수 조건이 만족할 경우 출력을 하지 않는다.

```python
In : count = 0
while True :
count += 1
if count == 10 :
break
if count % 2 == 1 :
continue
print("even", count)
Out: even 2
even 4
even 6
even 8
```

## 2.2.7 else문 추가하기

파이썬에서는 다른 언어와 달리 순환문이나 예외 처리문에 else문을 추가해서 사용할 수 있도록 별도의 문장으로 구성했다.

일단 순환문에서 else문을 사용하면 break가 발생하지 않을 경우에만 이 결과를 처리해 서 표시한다.

예제 2-20 : 순환 처리 시에 강제 중단 없을 경우 추가 처리

순환문에서 강제 종료인 break문이 처리가 되지 않으면 이 순환문이 처리된 후에 반드시 else문을 수행한다.

출력된 결과를 보면 짝수일 경우 출력을 하고 종료된 후에 else문 내의 출력을 표시했다.

```python
In : count = 0
while count < 10 :
count += 1
if count % 2 == 1 :
continue
print(count)
else :
print(" no break ")
Out: 2
no break
```

예제 2-21 : 순환문에서 break가 발생할 경우

이번에는 순환문 for문에 else문을 사용해서 처리한다. For 순환문도 특정 시점에 강제 로 종료를 원할 경우 내부에 특정 조건을 만족하면 break문을 이용해서 강제 종료도 가능 하다.

위의 예제와 동일하게 홀수는 continue문을 이용해서 출력을 하지 않았고 짝수만 출력 했다. 특정 값이 9일 경우 강제 종료를 했기때문에 for문에 붙은 else문이 실행이 되지 않 는 것을 확인할 수 있다.

```python
In : for i in range(10) :
if i == 9 :
break
if i % 2 == 1 :
continue
print(i)
else :
print(" no break ")
Out: 0
```

## 2.2.8 global문과 nonlocal문 처리

파이썬 모듈은 하나의 전역 네임스페이스를 가진다. 모듈에 변수, 함수, 클래스 등을 지정 하면 전역 네임스페이스에 이 모듈 내에 정의된 모든 이름을 관리한다.

함수나 클래스도 자기만의 네임스페이스를 가지며 함수와 클래스 내부에 정의된 이름을 관리한다.

함수 내부에서 전역 네임스페이스를 호출하여 변경하고 싶을 경우는 변수가 모듈에 있다

는 것을 global 키워드를 이용해서 명기한다.

또한 함수 내부에 내부 함수를 정의할 경우 함수 단위로 네임스페이스를 관리하므로 외 부 함수의 네임스페이스 영역을 변경하고 싶을 경우는 변수가 외부 함수에 있다는 것을 nonlocal 키워드를 이용해서 확정한다.

이런 이슈가 발생하는 이유는 변수가 할당되어야 네임스페이스에 등록이 되므로 이를 검 색해서 사용이 가능하지만 가끔 내부적으로 검색했는데 참조가 안 될 경우가 발생하므로, 전역과 자기 지역이 아니라는 것을 표시해줘야 자기 지역에서 찾지 않고 상위에서 찾아서 실행을 할 수 있기 때문이다.

이번에는 사용될 때 예외가 왜 발생하는지에 대한 설명만 할 것이다. 네임스페이스와 스 코프에 대한 세부적인 요건은 함수를 설명할 때 추가적으로 설명한다.

✚ 모듈 내에서 지정되지 않는 변수 변경

모듈을 작성할 때 변수를 정의 즉 변수를 먼저 할당하지 않고 연산을 수행할 경우 이 변수 가 먼저 네임스페이스에서 등록이 되지 않아 검색할 때 없으므로 예외가 발생한다.

예제 2-22 : 모듈에서 변수 정의 없이 사용할 경우 예외 발생

모듈에 변수 정의를 하지 않고 변수에 덧셈을 할 경우 일단 모듈 내의 네임스페이스에서 var_x를 검색하지만 정의된 것이 없기 때문에 정의되지 않았다는 예외가 발생한다.

```python
In : var_x = var_x + 100
Out: ---------------------------------------------------------------------
NameError               Traceback (most recent call last)
<ipython-input-41-20db88d605bf> in <module>()
----> 1 var_x = var_x + 100
NameError: name 'var_x' is not defined
```

✚ 함수 내에서 지정되지 않는 변수 변경

위의 모듈이 예제와 동일하게 함수 내에서도 발생한다. 파이썬에서 변수는 반드시 할당을 해야 네임스페이스에 들어간다. 특히 할당문 우측에 있는 변수는 자기 영역에 없으면 상 위에서 찾지 않는다.

예제 2-23 : 함수 내 표현식에 할당되지 않은 변수가 존재

함수 내에 x = x+1에서 x+1이 처리될 때 x 내의 값이 갱신되어야 하므로 일단 함수 내 지역 영역의 x 변수를 검색했지만, 실제로는 없어서 지역 영역에 없는 변수를 갱신한다는 에러가 발생했다.

```python
In : x = 10
def func() :
print(locals())
x = x+ 1
return x
print(func())
Out: {}
---------------------------------------------------------------------
UnboundLocalError     Traceback (most recent call last)
<ipython-input-48-6d2e2b0e044e> in <module>()
6  return x
----> 8 print(func())
<ipython-input-48-6d2e2b0e044e> in func()
3 def func() :
4  print(locals())
----> 5 x = x+ 1
6  return x
UnboundLocalError: local variable 'x' referenced before assignment
```

예제 2-24 : 함수 내에서 전역 변수만 조회할 경우

함수 내에서 단순히 전역 변수를 조회할 경우는 지역 변수에 없으면 이를 상위 전역 네임 스페이스를 검색해서 처리하는 것을 볼 수 있다.

```python
In : x = 10
def func() :
print(locals())
print(x)
func()
Out: {}
```

✚ 키워드 global을 사용

위의 예제처럼 할당문 우측에 할당되지 않는 변수를 갱신할 경우 예외를 발생시켰다. 이 변수를 지역에서 정의하지 않을 경우 반드시 전역 네임스페이스에 있다는 것을 명기한다.

예제 2-25 : 함수에 없는 전역 변수를 지정해 사용하기

전역 변수 x에 정수 10을 할당해서 정의했다. 함수 내에서 이 변수를 갱신한다. 이 결과를 전역 네임스페이스와 공유해서 사용하도록 했다.

함수의 결과를 출력한 것과 전역 변수 x를 출력한 것이 동일한 결과가 나오는 것을 확인할 수 있다.

```python
In : x = 10
def func() :
global x
print(locals())
x = x+ 1
print(locals())
return x
print(func())
print(x)
Out: {}
{}
```

✚ 내부 함수에서도 변수 할당 없이 갱신하는 경우

함수 내부에 함수를 정의할 경우에도 지역 변수가 별도로 생성되므로 변수 할당 없이 사용 하면 변수가 정의되지 않고 사용하는 것이므로 예외가 발생한다. 예외 발생을 해결하려면 변수를 할당해서 정의한 후에 사용한다.

예제 2-26 : 내부 함수 내에 미지정된 변수 사용

외부 함수 outer를 정의하고 내부 변수로 x를 지정했다. 이 외부 함수의 지역에 내부 함수 inner를 정의하고 변수 x를 갱신했다. 함수 내부에서 갱신을 할 때 일단 함수가 지역 변수 에 있는지를 확인하는데 지역에는 x라는 변수가 없어서 예외가 발생했다.

```python
In : def outer() :
x = 10
def inner() :
print("inner", locals())
x = x+ 1
print("outer ", locals())
return inner()
print(outer())
Out: outer {'inner': <function outer.<locals>.inner at 0x0000000004BD0598>,
'x': 10}
inner {}
---------------------------------------------------------------------
UnboundLocalError      Traceback (most recent call last)
<ipython-input-55-514fd25bc913> in <module>()
7  return inner()
----> 9 print(outer())
<ipython-input-55-514fd25bc913> in outer()
5     x = x+ 1
6  print("outer ", locals())
----> 7 return inner()
9 print(outer())
<ipython-input-55-514fd25bc913> in inner()
3  def inner() :
4     print("inner", locals())
----> 5   x = x+ 1
6  print("outer ", locals())
7  return inner()
UnboundLocalError: local variable 'x' referenced before assignment
```

예제 2-27 : 내부 함수 내에 미지정된 변수를 nonlocal로 지정

inner 함수 내에 미정의된 변수를 nonlocal 키워드를 이용해서 inner 함수에 정의된 변 수가 아니라고 표시했다. outer 함수에 x가 정의되어 있으므로 x = x+1에서 x라는 변수 를 처리 시 outer 함수의 x를 찾아서 처리한다. 처리된 결과는 inner 함수 내의 지역에 저 장되어 변경된 것을 확인할 수 있다.

```python
In : def outer() :
x = 10
def inner() :
nonlocal x
print("inner", locals())
x = x+ 1
print("inner", locals())
print("outer ", locals())
return inner()
print(outer())
Out: outer {'inner': <function outer.<locals>.inner at 0x0000000004BD01E0>,
'x': 10}
inner {'x': 10}
inner {'x': 11}
None
```
