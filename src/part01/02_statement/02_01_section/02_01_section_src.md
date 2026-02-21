---
layout: default
title: "02.01 문장"
---

# 02.01 문장

한 라인을 넘어갈 경우 블록 단위로 묶어서 문장을 작성하므로 블록을 어떻게 구성하는 지, 또는 문장에 대한 설명을 어떻게 표시할지 등을 작성하는 법을 알아본다.

한 라인으로 문장을 쓰거나 여러 문장을 작성할 때의 들여쓰기(indentation), 인용 (quotation)과 주석(commemt)에 대한 기본 사항부터 알아본다.

## 2.1.1 줄과 들여쓰기(Lines and Indentation)

문장을 작성할 때 한 라인으로 작성하는 것을 명확히 구분하고 여러 문장을 묶어서 블록으 로 만들려고 할 때도 이를 구분하는 것이 필요하다.

다른 프로그래밍 언어처럼 블록을 구분하는 별도의 기호가 없는 파이썬에서는 블록 단위 로 구분을 하려면 들여쓰기를 사용해서 구분한다.

블록 구분은 콜론( : ) 다음의 문장부터 해당하므로 콜론 이후에 문장은 4칸 들여쓰기를 권 장한다. 블록 구문이 사용되는 문장은 클래스와 함수, 제어문과 순환문 등이 해당한다.

✚ 라인 이해하기

괄호 기호 { }, ( ) ,[ ] 로 사용되는 것은 여러 줄을 사용하지만 하나의 라인으로 이해한다.

내부에 쓴 들여쓰기는 인식되지 않는다.

하나의 문장이 너무 길어질 때 한 라인으로 연결해서 사용하기 위해 라인 끝에 역슬래쉬로 연결하면 하나의 라인으로 인식해서 처리된다.

예제 2-1 : 라인에 대해 이해하기

리스트를 리터럴로 정의할 때 여러 라인으로 작성해도 하나의 라인으로 인식한다.

```python
In : l = [1,
2,
3]
print(l)
Out: [1, 2, 3]
```

딕셔너리를 리터럴로 정의할 때도 중괄호 사이의 처리는 하나의 라인으로 인식해서 처리 가 된다.

```python
In : d = {'a': 1,
'b' : 2}
print(d)
Out: {'a': 1, 'b': 2}
```

괄호일 경우 여러 라인에 작성되어도 하나의 라인으로 인식해서 처리된다.

```python
In : t = (1,
2,
3)
print(t)
Out: (1, 2, 3)
```

문장이 길어지면 하나의 라인으로 인식하므로 역슬래쉬를 이용해서 하나의 라인으로 처리 하도록 할 수 있다.

```python
In : e = 1 + \
3 * \
print(e)
Out: 16
```

멀티 라인으로 작성이 필요할 경우 멀티 라인을 표시하지 않으면 SyntaxError가 발생 한다.

```python
In : total = "item_one" +
"item_two" +
"item_three"
Out: File "<ipython-input-3-5282baac591e>", line 1
total = "item_one" +
^
SyntaxError: invalid syntax
```

✚ 문장의 블록 만들기: 4칸 들여쓰기

콜론( : ) 즉 블록 구문은 다음에 문장을 작성할 경우 4칸을 들여쓰기한다. 기본 권고 사항 이므로 명확히 준수한다.

들여쓰기는 공백(Space), 탭(Tab) 모두 가능하지만 공백 방법과 횟수는 한 블럭 내에 동일 하게 유지되어야 한다.

예제 2-2 : 들여쓰기 오류

함수 정의문을 작성할 경우 블록 구문인 콜론 이후에 들여쓰기를 하지 않으면 오류가 발생 한다. 들여쓰기가 필요한 경우 예외는 IndentationError가 처리된다.

```python
In : def a() :
pass
Out: File "<ipython-input-1-5f0480a001d3>", line 2
pass
^
IndentationError: expected an indented block
```

4칸을 들여쓰기해야 하지만 3칸만 해도 실행은 된다.

```python
In : def a() :
print("aaa")
a()
Out: aaa
```

## 2.1.2 인용(Quotation)

single('), double("), triple(''' or """) 를 사용하여 문자열을 감싸서 사용한다.

특히 triple 따옴표는 여러 줄에 걸쳐 문자열을 작성할 때나 함수 등의 docstring을 작성 할 때 사용된다.

✚ 인용: 문자열 처리

인용은 코딩 시 문자열을 표시하는 방법이다. 3가지 방법을 이용해서 문자열을 출력한다.

예제 2-3 : 문자열을 정의하기

하나의 문자열을 정의할 때 인용 부호를 사용해서 한 줄로 표시하면 된다.

```python
In : word = 'word'
sentence = "This is a setence"
print(word)
print(sentence)
Out: word
This is a setence
```

여러 라인에 대한 문자열을 작성할 경우 단순 인용 부호를 이용할 경우는 문장의 끝을 알 지 못해 예외가 발생한다.

```python
In : multi_line = " string
multiline "
Out: File "<ipython-input-7-a15e3dc7e2c8>", line 1
multi_line = " string
^
SyntaxError: EOL while scanning string literal
```

여러 라인을 만들 때는 세 개의 인용 부호로 연결한 인용을 사용해서 작성하면 멀티라인 인용을 하나의 문자열로 이해한다. 특히 함수나 클래스의 docstring으로 사용할 때 여러 줄을 문자열로 써야 할 경우에 사용한다.

```python
In : paragraph = """단락이란
```

여러 문장을 하나로 묶어 단락으로 본다.

""" print(paragraph)

```python
Out: 단락이란
```

여러 문장을 하나로 묶어 단락으로 본다.

## 2.1.3 주석 (Comments)

주석은 프로그램 내에서는 일반적으로 단순한 설명으로 보기 때문에 별도의 기호가 필요 하다. 기호 ? (#)을 사용해서 한 줄에 주석을 표시한다.

예제 2-4 : 문장에 주석문 달기

빈 문장에 주석을 표시하면 그 문장은 프로그램이 실행될 때는 아무런 인식도 하지 않 는다.

```python
In : # 문장으로 보지 않는다.
var = 100
print(var)
Out: 100
```

프로그램 로직을 사용 시 바로 옆에 설명이 필요한 경우 바로 주석을 달아서 그 문장의 설 명을 표시할 수 있다. 이럴 경우도 실행할 때 주석은 무시된다.

```python
In : var = 100 # var = 100
print(var)
Out: 100
```

예제 2-5 : 변수 주석 달기

파이썬 3.6 버전이 되면서 파이썬 변수에 대한 주석을 추가할 수 있도록 문법이 추가되 었다. 이 주석을 표시해도 실행할 때에는 아무런 영향이 없다. 정수를 할당했다가 후에 문 자열을 할당해도 예외가 발생하지 않고 할당된 대로 처리되는 것을 알 수 있다.

```python
In : var : int
var = 100
print(var)
var = 'str'
print(var)
Out: 100
str
```

예제 2-6 : 매개변수 주석 달기

함수나 메서드 내의 매개변수도 주석을 표시할 수 있다. 함수 내의 매개변수와 처리된 결 과를 주석으로 표시할 수 있다. 실행될 경우에는 이 주석과 다른 자료형이 매치되어도 예 외는 발생하지 않는다.

```python
In : def func(x:int, y:int) -> int :
pass
print(func.__annotations__)
Out: {'x': <class 'int'>, 'y': <class 'int'>, 'return': <class 'int'>}
```

클래스 내 _ _init_ _ 메서드 내의 매개변수에도 주석으로 타입을 정의할 수 있다. 이것도 주석으로 확인은 되지만 실행할 때는 자료형을 체크하지 않으므로 주석으로만 사용되는 것을 알 수 있다.

```python
In : class Klass :
def __init__(self:object, name:str) :
self.name = name
```

k = Klass("지원") print(Klass.__init__.__annotations__)

```python
Out: {'self': <class 'object'>, 'name': <class 'str'>}
```
