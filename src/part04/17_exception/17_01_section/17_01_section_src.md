---
layout: default
title: "17.01 syntax"
---

# 17.01 syntax

파이썬을 작성할 때 문장 작성에 대한 오류를 처리하는 등 기본적인 예외 및 오류에 대한 처리에 대해 알아보겠다.

## 17.1.1 try/except , raise문 처리

에러가 발생할 경우 처리하는 구문으로 에러가 발생할 수 있는 문장을 try 구문 다음에 넣 고 에러가 발생한 예외 처리를 except 항목으로 추가한다.

✚ 예외 발생 및 raise문 사용

예외는 로직 처리 중 이상을 발견했을 때 에러나 예외를 발생시킨다. 사용자가 로직 상에 예외를 raise문으로 발생시킬 수 있다. 예외가 발생한 경우를 잡고 새로운 로직으로 처리 가 가능하려면 try except문을 이용해서 처리해야 한다. 예외 발생 여부에 따라 finally와 else문을 이용해서 예외가 발생했을 때와 발생하지 않을 때에 대한 추가적인 로직을 작성 할 수 있다.

예제 17-1 : 예외 처리하기

모듈에 생성된 변수 x가 정의되었다. 함수 global_var를 정의해서 글로벌 변수를 갱신하 도록 정의를 했는데 예외가 발생했다. x+1를 평가할 때 x라는 변수를 함수 내의 지역 변 수에서 검색했지만 이 변수를 찾지 못해 UnboundLocalError가 발생해서 프로그램을 중 단시켰다.

```python
In : def global_var(y) :
x = x + 1
return x+y
x = 100
print(global_var(5))
Out: ---------------------------------------------------------------------
UnboundLocalError      Traceback (most recent call last)
<ipython-input-2-9a89576add47> in <module>()
5 x = 100
----> 7 print(global_var(5))
<ipython-input-2-9a89576add47> in global_var(y)
1 def global_var(y) :
----> 2 x = x + 1
3   return x+y
5 x = 100
UnboundLocalError: local variable 'x' referenced before assignment
```

예외가 발생할 때 프로그램의 중단을 막으려면 try except를 예외가 발생하는 부분에 작 성한다.

위의 내용을 함수의 호출에 예외를 잡아서 처리하기 위해 try except로 표시하고 예외 클 래스를 except에 표시했다. 예외가 발생하지만 프로그램이 강제 종료가 되지 않는다.

예외가 발생한 메시지를 출력하고 종료하는 것을 볼 수 있다.

```python
In : try :
print(global_var(5))
except UnboundLocalError as e:
print(e)
Out: local variable 'x' referenced before assignment
```

이제 정상적인 로직에서 강제로 예외를 발생시킬 수도 있다. raise문을 이용해서 강제로 예외를 발생시키고 이를 try except로 예외를 잡고 처리해보겠다. Exception 예외 클래 스의 인스턴스를 만들어서 raise로 발생시키면 except문에 Exception 클래스가 표시되 면서 이 예외를 잡고 내부의 로직이 처리되는 것을 알 수 있다.

```python
In : try :
```

raise Exception(" 예외 발생 ") except Exception as e:

print(e)

```python
Out: 예외 발생
```

✚ finally과 else문 추가하기

예외 처리를 할 때 예외가 발생하더라도 추가적인 로직을 처리할 수 있는 방법이 필 요하다. 특히 else문은 예외가 발생하지 않았을 경우 반드시 처리할 로직이 처리된다.

finally문은 예외가 발생해서 except문에서 로직이 처리된 후에 반드시 처리할 로직을 넣 어두면 이 로직까지 처리한 후에 프로그램이 종료된다.

예제 17-2 : 예외 발생 시 반드시 처리가 필요한 경우 처리 방식

강제로 예외를 발생시켰다. else문과 finally문이 있을 때 except 구문이 처리가 된 후에 어느 구문이 처리되는지를 확인하면 else문은 예외가 발생할 때 처리가 되지 않았지만 반 드시 처리해야 하는 finally 구문에 있는 print문은 출력한다.

```python
In : try :
```

raise Exception(" 예외 발생 ") except Exception as e:

print(e) else :

print(" else ") finally :

print(" finallay ")

```python
Out: 예외 발생
finallay
```

다시 예외가 없을 경우를 처리하면 except 구문은 처리가 되지 않지만 예외가 없으므로 else 구문을 처리하고 이 try except문이 마지막에 있는 finally문을 처리하는 것을 확인 할 수 있다.

```python
In : try :
```

print("정상처리") except Exception as e:

print(e) else :

print(" else ") finally :

print(" finallay ")

```python
Out: 정상처리
else
finallay
```

## 17.1.2 블록 구문 오류

간단한 예외가 발생하는 것을 알아보고 프로그램을 작성할 때 이런 예외가 발생하면 수정 할 수 있는 연습을 해보겠다.

순환문과 제어문 등의 블록을 처리하는 구분에서 블록 표시와 그 하부에 들어가는 로직에 대한 indentation 처리를 해야 한다. 명확하게 블록에서 처리하지 않는 경우를 확인해보 겠다.

예제 17-3 : 블록을 표시하지 않을 경우

SyntaxError도 파이썬 내에서는 내장 클래스로 기본 제공된다. 상속은 Exception 클래 스를 받아서 구현된 것을 확인할 수 있다.

```python
In : print(SyntaxError)
print(SyntaxError.__bases__)
Out: <class 'SyntaxError'>
(<class 'Exception'>,)
```

순환문 while에 True를 지정해서 무한 순환을 처리하도록 했다. 하지만 블록을 구분하는 콜론을 작성하지 않았다. 이럴 때 SyntaxError가 발생하는 것을 확인할 수 있다.

```python
In : while True
print(" while block ")
Out: File "<ipython-input-8-d774f636cb6c>", line 1
while True
^
SyntaxError: invalid syntax
In : while True print(" while block ")
Out: File "<ipython-input-2-188133094a03>", line 1
while True print(" while block ")
^
SyntaxError: invalid syntax
```

순환문 for도 블록을 표시하지 않는 경우는 while문과 동일한 예외를 처리한다.

```python
In : for i in range(3)
print(" for block ")
Out: File "<ipython-input-9-9095674caf91>", line 1
for i in range(3)
^
SyntaxError: invalid syntax
```

순환문 for에 한 문장으로 print문을 작성할 경우에는 예외가 발생한 위치가 print 함수를 가리키는 것을 알 수 있다.

```python
In : for i in range(3) print(" for block ")
Out: File "<ipython-input-1-804eedbf2480>", line 1
for i in range(3) print(" for block ")
^
SyntaxError: invalid syntax
```

블록문 내에 로직을 작성할 때 블록이 아닌데 4칸을 띄어쓰면 IndentationError가 발생 하는 것을 알 수 있다.

```python
In : counter = 0
while True :
print(counter)
counter += 1
Out: File "<ipython-input-3-e6a46ef4fe6f>", line 4
counter += 1
^
IndentationError: unexpected indent
```

IndentationError 클래스는 SyntaxError를 상속해서 만든 내장 클래스라는 것을 확인할 수 있다.

```python
In : print(IndentationError)
print(IndentationError.__bases__)
Out: <class 'IndentationError'>
(<class 'SyntaxError'>,)
```

## 17.1.3 표현식 및 문장 처리 오류

표현식을 처리할 때 우선순위 등을 처리하는 괄호에 대해 매우 주의해야 한다.

예제 17-4 : 괄호나 인용 부호 처리 에러

표현식에서 괄호의 수나 인용 부호의 수가 쌍을 이루지 못할 경우는 예외가 발생한다.

```python
In : ((x+4) *(3/3)
Out: File "<ipython-input-37-d6e95b5b0567>", line 1
((x+4) *(3/3)
^
SyntaxError: unexpected EOF while parsing
```

특히 한 문장일 경우는 정확한 위치에 예외를 표시하지만 두 문장 이상일 경우는 예외가 발생한 곳이 아닌 다른 곳에 표시가 될 수 있다.

```python
In : b = ((x+4) *(3/3)
print(b)
Out: File "<ipython-input-38-618919223ff1>", line 2
print(b)
^
SyntaxError: invalid syntax
```

인용 부호의 개수가 짝을 이루지 못했을 때도 예외가 발생한다.

```python
In : b = "가을이라 "가을바람"
Out: File "<ipython-input-39-e5fcb569a5c9>", line 1
```

b = "가을이라 "가을바람" ^ SyntaxError: invalid syntax 이번에는 인용 부호 3개로 처리하는 것은 맞지만 앞에 하나의 인용 부호가 있어 짝을 이루 지 못해 예외가 발생한다.

```python
In : b = "가을이라 """ 가을바람"""
Out: File "<ipython-input-42-a48de3e2b83e>", line 1
```

b = "가을이라 """ 가을바람""" ^ SyntaxError: invalid syntax

예제 17-5 : 코딩 실수로 발생하는 오류

변수를 먼저 정의하지 않고 호출해서 처리할 경우에 왜 name 변수가 정의되지 않았다는 에러를 발생시키는지를 이해해야 한다. 파이썬은 현재 실행되는 문장에서 현재 전역과 지 역 네임스페이스를 검색하고 이름이 없을 경우는 예외를 발생시킨다.

```python
In : print(abc)
Out: ---------------------------------------------------------------------
NameError              Traceback (most recent call last)
<ipython-input-1-fb8e540c9088> in <module>()
----> 1 print(abc)
NameError: name 'abc' is not defined
```

변수나 모듈 등에 대한 부분을 먼저 정의하지 않을 경우에는 이 이름이 없다는 것을 알 수 있다. 파이썬에서 모든 변수는 이름으로 처리하므로 이름이 없다는 예외가 발생하는 것 이다.

```python
In : print(NameError)
print(NameError.__bases__)
Out: <class 'NameError'>
(<class 'Exception'>,)
```

함수 호출을 먼저 하고 나중에 정의가 되었다. 파이썬은 이 함수의 이름을 검색해서 먼저 확인하므로 이 이름이 모듈에 등록되지 않으면 이 이름을 검색할 수 없는 것이다.

파이썬은 함수나 클래스도 하나의 이름으로 모듈 내의 네임스페이스에 등록되지 않으 면 이 네임스페이스를 검색해서 찾지 못할 경우 항상 NameError가 발생하는 것을 알 수 있다.

```python
In : print(add(10,10))
def add(x,y) :
return x+y
Out: ---------------------------------------------------------------------
NameError              Traceback (most recent call last)
<ipython-input-44-61a399181d0f> in <module>()
----> 1 print(add(10,10))
3 def add(x,y) :
4  return x+y
NameError: name 'add' is not defined
```

이번에는 Sequence 자료형을 검색할 때 많이 발생시키는 인덱스 범위를 초과해서 조회 할 경우 발생하는 예외를 알아보자. 리스트, 문자열, 딕셔너리 등의 Sequence 자료형과 딕셔너리를 처리할 때는 원소를 검색 하는 방법이 유사하다. 하지만 Key를 관리하는 방식이 다르므로 범위를 벗어난 것을 검색 할 때 예외 클래스는 다른 것을 표시한다.

```python
In : l = [1,2,3]
print(l[3])
Out: ---------------------------------------------------------------------
IndexError             Traceback (most recent call last)
<ipython-input-45-2bf7b87cfcda> in <module>()
1 l = [1,2,3]
----> 2 print(l[3])
IndexError: list index out of range
```

Mapping 자료형은 인덱스을 사용하지 않으므로 동일한 검색을 해도 키에 대한 예외를 발생시킨다.

```python
In : d = {0:1, 1:2, 2:3}
print(d[3])
Out: ---------------------------------------------------------------------
KeyError              Traceback (most recent call last)
<ipython-input-47-ecabbe39e780> in <module>()
1 d = {0:1, 1:2, 2:3}
----> 2 print(d[3])
KeyError: 3
```

인덱스 검색을 이용해서 처리하면 IndexError와 KeyError를 발생시키는 것을 알 수 있다.

```python
In : print(IndexError)
print(IndexError.__bases__)
Out: <class 'IndexError'>
(<class 'LookupError'>,)
In : print(KeyError)
print(KeyError.__bases__)
Out: <class 'KeyError'>
(<class 'LookupError'>,)
```

상위 클래스인 LookupError가 이 두 예외를 발생시키는 상위 예외 클래스라는 것을 알 수 있다.

```python
In : print(LookupError)
print(LookupError.__bases__)
Out: <class 'LookupError'>
(<class 'Exception'>,)
```
