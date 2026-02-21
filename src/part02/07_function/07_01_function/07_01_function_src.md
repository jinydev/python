---
layout: default
title: "07.01 함수(function)"
---

# 07.01 함수(function)

함수는 사용하기 전에 먼저 정의하고 이를 사용할 때마다 호출해서 매개변수에 할당해 서 실행해 결과를 반환한다. 왜 먼저 하는지를 알아보고 호출할 때 처리하는 방식을 알아 본다.

## 7.1.1 함수 정의 및 호출

문장을 설명할 때 아무 것도 하지 않는 함수를 정의해서 간단하게 알아봤다. 이번에는 함 수 내부에 로직을 정의하고 결과를 return으로 반환하는 절차를 알아본다.

함수가 호출될 때 함수의 매개변수와 매칭되는 인자 및 처리하는 부분도 알아본다.

✚ 함수 정의: def와 parameter

먼저 함수를 정의하는 헤더 부분부터 알아본다. 함수의 헤더 부분에는 def 키워드와 함수 명을 적고 괄호 내에 매개변수를 정의한다. 헤더 부분의 마지막은 로직을 작성할 수 있는 블록 구문의 시작을 표시하는 콜론( : )을 처리한다.

또한 몸체 부분은 블록 구문을 시작하므로 들여쓰기(보통 4칸) 후에 함수 내의 로직을 처리 한다.

끝으로 함수의 꼬리 부분은 함수 내의 모든 로직이 처리된 결과를 반환하는 return과 전 달한 결과를 처리하는 값을 표시한다. 반환 값이 없을 경우 마지막 꼬리 부분은 생략할 수 있다.

예제 7-1 : 함수를 정의하는 이유

함수 헤더 부분, 몸체, 꼬리 부분을 정의한다. 함수를 먼저 정의해야 로딩할 때 함수가 실 행될 수 있는 구조를 내부적으로 만든다.

함수의 매개변수는 함수의 지역 변수로 사용되므로 바로 사용할 수 있다. 이 함수의 로직 은 두 변수의 값을 바꾸는 로직을 작성한 것이다.

```python
In : def func(par1, par2) :
```

""" 함수의 도움말 """ par2, par1 = par1, par2 return par1, par2 함수를 정의한 후에 함수가 로딩되었는지를 확인하기 위해 함수 이름을 출력하면 함수가 function func 다음에 16진수로 함수의 레퍼런스가 같이 출력되는 것을 알 수 있다. 이 말은 function 클래스에 의해 만들어진 하나의 인스턴스 객체라는 것을 알 수 있다.

함수 헤더 부분 다음에 문자열을 사용한 것은 자동으로 도움말로 처리되므로 이를 _ _ doc_ _로 조회하면 함수를 정의할 때 사용된 도움말이 출력된다.

함수가 클래스에 의해 생성된 인스턴스인지 알아보기 위해 type 클래스 내에 함수명을 전 달해서 확인하면 class function이라고 출력된다. 이 말은 함수도 클래스의 인스턴스라는 것을 표시하는 것이다.

```python
In : print(func)
print(type(func))
print(func.__doc__)
Out: <function func at 0x105895bf8>
<class 'function'>
함수의 도움말
```

정의된 함수를 help 함수로 조회하면 함수의 헤더 부분과 함수 도움말이 출력된다.

```python
In : help(func)
Out: Help on function func in module __main__:
func(par1, par2)
함수의 도움말
```

✚ 함수 호출(function call)

위에서는 함수를 정의했다. 함수가 정의되면 내부적으로 로딩이 되면서 function class의 인스턴스로 만들어지는 것을 확인할 수 있다.

이제 이 함수를 어떻게 사용할 것인지에 대해 알아보자. 함수를 호출하려면 함수명을 사 용하고 실행 연산자인 괄호( ( ) )를 표시하여 이 괄호 내에 함수 정의할 때 표시된 매개변 수와 동일한 인자를 전달한다.

예제 7-2 : 함수의 호출

함수 호출할 때 매개변수 정의된 것과 동일하지 않게 인자를 전달하면 예외가 발생한다.

예외에 특정 파라미터가 없다는 것을 표시한다.

```python
In : print(func(10))
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-7-7be88ad437a7> in <module>()
----> 1 print(func(10))
TypeError: func() missing 1 required positional argument: 'par2'
```

함수를 정의한 매개변수와 동일하게 인자를 넣고 실행한다. 인자로 전달된 값이 변경되어 출력되는 것을 볼 수 있다. 파이썬은 함수의 결과는 하나만 반환하므로 함수 내부의 로직 에는 return문 다음에 변수가 2개 지정되어 있지만 반환한 결과는 하나의 튜플로 처리되 는 것을 알 수 있다.

```python
In : print(func(10,20))
Out: (20, 10)
```

✚ 함수 정의와 함수 호출 간의 순서

함수 정의문을 작성한 후에 이 모듈이 로딩이 되면 함수가 호출될 준비를 한다. 함수가 정 의되지 않는 상태로 함수를 호출할 때 어떻게 되는지를 알아본다.

예제 7-3 : 함수 정의와 호출 순서

모듈 내에 함수가 정의되었다면 이 모듈이 로딩될 때 함수가 로딩이 되는 것이다. 모듈의 전역 네임스페이스에 변수가 할당되듯이 함수도 함수 정의문에 작성한 함수 이름을 키로, 함수 인스턴스가 값으로 들어간다.

함수가 호출되는 것은 함수 이름으로, 모듈의 전역 네임스페이스에 이 함수 이름이 있는 지를 확인하고 존재하면 함수 인스턴스를 실행해서 결과를 반환한다.

함수 addx가 정의되지 않았는데 이를 먼저 호출하고 함수 정의는 함수 호출 이후에 넣 었다. 함수 이름을 가지고 모듈의 전역 네임스페이스를 조회했지만 이 addx가 없으므로 이름이 정의되지 않았다는 예외가 발생한다.

```python
In : addx(7,3)
def addx(x,y) :
return x+y
Out: ---------------------------------------------------------------------
NameError              Traceback (most recent call last)
<ipython-input-8-45f42ad991c0> in <module>()
----> 1 addx(7,3)
3 def addx(x,y) :
4  return x+y
NameError: name 'addx' is not defined
```

위의 예제와 달리 함수를 정의하면 모듈의 전역 네임스페이스에 함수 이름을 키로, 함수 인스턴스는 값으로 들어간다고 했는데 어떻게 조회하는지를 알아본다.

```python
In : def addx(x,y) :
print(" addx call ")
return x+y
```

모듈 내의 전역 네임스페이스를 조회하는 내장 함수인 globals를 실행한다. 파이썬 네임 스페이스는 딕셔너리 자료형으로 관리하므로 이름은 키로, 인스턴스는 값으로 들어간다.

내장 함수를 실행하면 결과는 딕셔너리이므로 함수 이름인 addx를 문자열로 조회한다.

인스턴스의 레퍼런스가 동일한지를 확인하기 위해 is 키워드를 가지고 비교하면 동일한 레퍼런스라서 결과가 True로 표시된다.

```python
In : print(globals()["addx"])
print(addx)
print(globals()["addx"] is addx)
Out: <function addx at 0x10598abf8>
<function addx at 0x10598abf8>
True
```

addx(50,60)으로 호출하면 함수가 실행되어 출력된 결과가 110으로 출력된다.

```python
In : print(addx(50,60))
Out: addx call
```

키로, 함수 인스턴스가 레퍼런스로 들어간다는 것을 확인하기 위해 모듈의 전역 네임스페 이스를 globals 함수로 조회해서 그 결과를 가지고 함수명으로 조회하면 결과가 함수의 인스턴스로 전달된다. 이 인스턴스에 함수 호출 연산자와 인자를 주고 실행을 시키면 결 과가 50이라고 출력되는 것을 알 수 있다.

```python
In : print(globals()["addx"](20,30))
Out: addx call
```

✚ 제너릭(Generic) 함수

파이썬 변수를 지정할 때도 별도의 자료형을 할당할 수 없다. 함수의 매개변수도 동일하 게 자료형을 지정할 수 없다.

함수의 매개변수를 지정하면 어떠한 자료형도 인자로 전달해서 호출할 수 있다. 이런 함 수를 정의해서 처리하는 방식을 제너릭 함수라고 한다.

파이썬 함수는 기본적으로 제너릭 함수가 기본이다. 함수 처리할 때 매개변수에 전달하는 인자를 특정 자료형으로만 제어할 필요가 있을 경우에는 함수 내부에서 별도의 로직으로 처리를 해야 한다.

예제 7-4 : 함수 파라미터 자료형 제한하기

일반적인 덧셈을 하는 제너릭 함수를 정의하고 정수를 전달하면 정수에 대한 덧셈을 처리 하고 문자열로 전달하면 문자열을 연결 처리한다.

```python
In : def generic_add(x,y) :
return x+y
```

특정 자료형을 처리하지 않았으므로 전달된 인자가 지원하는 덧셈을 처리하면 예외가 발 생하지 않고 처리되는 것을 알 수 있다.

```python
In : print(generic_add(5,5))
print(generic_add("Hello","World"))
Out: 10
HelloWorld
```

이 함수의 인자로 딕셔너리를 전달하면 덧셈을 처리하지 못하므로 덧셈이 불가능하다는 결과를 전달했다.

이런 예외를 해결하려면 전달되는 인자의 자료형을 제한할 필요가 있다.

```python
In : print(generic_add({'a':5}, {'b':5}))
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-21-3bb874cb04c6> in <module>()
----> 1 print(generic_add({'a':5}, {'b':5}))
<ipython-input-19-9dd074ecba0b> in generic_add(x, y)
1 def generic_add(x,y) :
----> 2 return x+y
TypeError: unsupported operand type(s) for +: 'dict' and 'dict'
```

인자에 대한 전달을 제한하는 덧셈 함수 add를 정의할 때 내부에 두 매개변수가 정수의 인스턴스가 아니면 예외를 발생시키라는 로직을 표현했다. 이 로직은 isinstance 함수를 이용해서 정수 자료형에 의해 만들어졌으면 실행되고 정수가 아니면 예외를 발생시킨다.

```python
In : def add(x,y) :
if not isinstance(x,int) :
raise ValueError(" x is not integer ")
if not isinstance(y,int) :
raise ValueError(" y is not integer ")
return x+y
```

함수를 호출할 때 실수를 첫 번째 x 매개변수에 매칭되도록 전달했다. 첫 번째 x 매개변수 를 내부에서 처리할 때 예외가 발생하는 것을 알 수 있다.

```python
In : add(11.1, 10)
Out: ---------------------------------------------------------------------
ValueError              Traceback (most recent call last)
<ipython-input-19-c7b8d28eb680> in <module>()
----> 1 add(11.1, 10)
<ipython-input-18-946f74918e85> in add(x, y)
1 def add(x,y) :
2   if not isinstance(x,int) :
----> 3   raise ValueError(" x is not integer ")
4   if not isinstance(y,int) :
5     raise ValueError(" y is not integer ")
ValueError: x is not integer
```

함수를 호출할 때 실수가 y 매개변수와 매칭되어 예외가 발생한 것을 알 수가 있다.

```python
In : add(10,11.1)
Out: ---------------------------------------------------------------------
ValueError              Traceback (most recent call last)
<ipython-input-21-ecb6909acf54> in <module>()
----> 1 add(10,11.1)
<ipython-input-18-946f74918e85> in add(x, y)
3     raise ValueError(" x is not integer ")
4   if not isinstance(y,int) :
----> 5   raise ValueError(" y is not integer ")
7   return x+y
ValueError: y is not integer
```

함수를 호출할 때 두 매개변수에 각각 매칭되는 정수를 인자로 넣어야 예외 없이 처리되 는 것을 확인할 수 있다.

```python
In : add(10,10)
Out: 20
```

## 7.1.2 함수 호출 연산자 이해하기

함수를 호출할 때 괄호를 사용하고 인자를 전달하면 함수가 실행되는 것을 알 수 있다. 함 수 호출 연산자 괄호가 어떻게 호출되어 처리되는지를 알아본다.

✚ 함수 호출 이해하기: _ _call_ _

함수가 기본적으로 function 클래스의 인스턴스이므로 호출 연산자도 메서드를 이용해서 처리하는 것이다. 내부적으로 함수 호출 연산자는 _ _call_ _ 메서드를 실행해서 처리하는 것을 알 수 있다.

예제 7-5 : 함수 호출 연산자

함수가 호출이 가능한지를 확인하기 위해 내장 함수 callable에 함수의 이름을 인자로 전 달하면 True가 표시된다. 함수가 호출이 가능하다는 것은 함수 호출 연산자로 실행이 가 능하다는 것이다.

```python
In : def mul(x,y) :
return x*y
print(mul)
Out: <function mul at 0x0000000004DA5598>
In : print(callable(mul))
Out: True
```

내장 함수 callable은 객체 내의 스페셜 메서드인 _ _call_ _의 존재 여부를 확인해서 있으 면 True로 출력한다. 이 사항을 확인하기 위해 함수의 이름에 점 연산을 이용해서 메서드 _ _call_ _을 출력해보면 이 메서드의 레퍼런스가 출력되는 것을 볼 수 있다.

특히 method-wrapper로 출력된 것은 이 메서드가 호출이 가능한 내부적인 메서드를 제 공한다는 뜻이다.

_ _call_ _ 메서드에 인자를 넣고 실행하면 곱셈의 결과를 출력하는 것을 알 수 있다.

```python
In : print(mul.__call__)
print(mul.__call__(10,10))
Out: <method-wrapper '__call__' of function object at 0x0000000004DA5598>
```

✚ 함수 객체 바인딩 규칙

파이썬에서 클래스는 모든 메서드를 관리한다. 인스턴스는 클래스를 검색해 인스턴스 메 서드에 인스턴스 인자를 전달하면 메서드를 실행한다.

인스턴스는 클래스 검색 후에 메서드를 호출해서 인스턴스 메서드일 경우에는 인스턴스 인자를 전달하고 이를 바인딩해서 메서드를 실행한다.

함수도 클래스 function의 인스턴스이므로 실행을 처리할 때 _ _call_ _ 메서드를 바인딩 해서 처리하는 방식은 동일하다. 예제를 통해 처리 방식을 알아본다.

예제 7-6 : 함수 호출 바인딩 절차

뺄셈하는 함수를 정의했다. 이 함수가 어떤 클래스의 인스턴스인지를 확인하기 위해 이 인스턴스의 _ _class_ _ 속성을 점 연산자로 확인하면 클래스 정보를 출력하는 것을 알 수 있다.

```python
In : def sub(x,y) :
return x-y
print(type(sub))
print(sub.__class__)
Out: <class 'function'>
<class 'function'>
```

클래스에 메서드가 있는지를 확인해보자. sub._ _class_ _가 클래스의 레퍼런스를 보관하 므로 이 클래스 내의 _ _call_ _ 메서드 이름을 출력하면 이 함수가 아직 메서드가 아닌 함 수라는 것을 알 수 있다.

함수가 인스턴스이므로 _ _call_ _ 메서드를 점 연산자로 해서 이름을 출력하면 메서드라 는 것을 알 수 있다.

```python
In : print(sub.__class__.__call__)
print(sub.__call__)
Out: <slot wrapper '__call__' of 'function' objects>
<method-wrapper '__call__' of function object at 0x10598a840>
```

클래스에 바인딩된 경우에는 인스턴스 정보가 없으므로 첫 번째 인스턴스 정보를 넣어 처 리해야 하고 메서드로 호출할 때는 첫 번째가 인스턴스로 바인딩했으므로 나머지 인자만 전달하면 동일한 뺄셈 결과가 나오는 것을 알 수 있다.

```python
In : print(sub.__class__.__call__(sub,10,10))
print(sub.__call__(10,10))
Out: 0
```

## 7.1.3 함수 return문 처리

함수를 정의할 때 꼬리 부분에 함수 내의 모든 로직 처리가 끝난 결과를 반환되도록 반드 시 return문을 사용한다.

함수의 모든 로직이 처리된 후에 결과를 반환할 필요가 없을 때는 return문이 필요하지 않 지만 내부적으로는 반드시 None으로 반환한다.

예제 7-7 : 함수는 반환 처리

반환이 없는 함수를 정의하면 return문이 없다. 이 none_return 함수를 호출하면 x를 출 력하고 종료한다.

이 함수 처리 결과를 a라는 변수에 할당했다. 이 변수를 출력하면 반환값이 None이라는 것을 알 수 있다. 함수가 처리되면 반환문이 없어도 항상 임의의 값인 None을 반환한다.

```python
In : def none_return(x) :
print(x)
```

a = none_return(" return문이 없을 때 ") print(a)

```python
Out: return문이 없을 때
None
```

함수를 정의할 때 반환문을 작성했다. 이 함수를 실행하면 return 다음의 값이 외부로 전 달된다.

함수 return_에 인자를 전달해서 실행하면 인자가 그대로 할당된 변수에 전달이 되는 것 을 알 수 있다.

```python
In : def return_(x) :
return x
```

a = return_(" return문이 있을 때 ") print(a)

```python
Out: return문이 있을 때
```

예제 7-8 : 함수의 반환 여러 개가 필요한 경우

함수가 실행된 후에 여러 개의 값을 반환하려면 여러 개의 원소를 하나로 구성하는 자료형 에 묶어서 반환한다. 일반적으로 return문 다음에 쉼표로 구분하는 것은 튜플을 만드는 것 이므로 하나의 튜플로 반환되는 것을 알 수 있다.

```python
In : def func_tuple(x,y,z) :
return x,y,z
a = func_tuple(10,20,30)
print(type(a), a)
Out: <class 'tuple'> (10, 20, 30)
```

함수의 결과로 지역 네임스페이스를 통해 외부로 전달했다. 지역 네임스페이스는 딕셔너 리로 구성되었으므로 전달한 결과도 딕셔너리를 출력하는 것을 알 수 있다.

```python
In : def func_dict(x,y,z) :
return locals()
a = func_dict(10,20,30)
print(type(a), a)
Out: <class 'dict'> {'z': 30, 'y': 20, 'x': 10}
```

## 7.1.4 함수는 function 클래스의 인스턴스 객체

파이썬은 모든 것을 다 객체로 관리하고, 함수는 function 클래스의 인스턴스이므로 이에 대한 기본 정보를 이해해야 한다. 함수가 만들어지면 자동으로 생기는 내부 스페셜 속성 들을 알아본다.

✚ 함수 내부의 스페셜 속성 알아보기

함수가 만들어지면 기본 정보는 function class의 속성에서 관리하고 실행에 필요한 정보 는 code 클래스 내에서 관리한다.

스페셜 속성이 들어가 있는 부분을 확인해보자.

예제 7-9 : 함수의 기본 속성을 확인해보기

함수를 정의할 때 매개변수에 자료형과 초기값을 할당한다. 함수 매개변수를 할당할 때 별표에 아무런 변수를 부여하지 않는 것은 이 다음에 인자를 전달할 때는 반드시 키워드 인자로 전달을 해야 한다는 것을 의미한다.

반환값에 필요한 자료형을 선언하기 위해 매개변수를 정의한 다음 -> 이후에 자료형을 정의하면 반환값의 결과에 대한 자료형을 확정한다.

```python
In : def div(x:int=100,*, y:int=100) -> float:
return x/y
```

일단 함수 div를 통해 내부의 속성을 dir 함수로 추출하면 리스트가 만들어진다. 이를 set 자료형으로 형 변환을 해서 변수 s에 할당한다.

최상위 클래스인 object도 동일하게 내부 속성과 메서드의 이름을 set 자료형으로 만들어 변수 o에 할당한다.

차집합을 이용해서 함수 내부에만 있는 스페셜 속성과 메서드를 확인한다.

```python
In : import pprint
s = set(dir(div))
o = set(dir(object))
pprint.pprint(s-o)
Out: {'__annotations__',
'__call__',
'__closure__',
'__code__',
'__defaults__',
'__dict__',
'__get__',
'__globals__',
'__kwdefaults__',
'__module__',
'__name__',
'__qualname__'}
```

함수 div를 가지고 이름과 이 함수가 속한 모듈을 확인하기 위해 _ _name_ _, _ _ qualname_ _, _ _module_ _ 속성에 접근해서 출력을 해본다.

현재 작성하는 모듈이 첫 번째 모듈이므로 _ _main_ _이라고 출력된 것을 알 수 있다.

```python
In : print(div.__name__)
print(div.__qualname__)
print(div.__module__)
Out: div
div
__main__
```

함수의 매개변수에 대한 정의를 세부적으로 확인하기 위해 일단 매개변수와 반환값에 대 한 주석을 확인하고 매개변수를 정의할 때 초기값으로 할당한 것도 확인해본다.

매개변수에 대한 주석은 _ _annotations_ _으로 확인하고 위치변수에 대한 초기값은 _ _ defaults_ _, 키워드 인자에 대한 초기값은 _ _kwdefaults_ _에 할당되는 것을 알 수 있다.

```python
In : print(div.__annotations__)
print(div.__defaults__)
print(div.__kwdefaults__)
Out: {'x': <class 'int'>, 'y': <class 'int'>, 'return': <class 'float'>}
(100,)
{'y': 100}
```

이 함수를 인자 없이 실행하면 초기값이 지정되어 있는 것을 사용해서 결과를 반환함을 알 수 있다.

```python
In : print(div())
Out: 1.0
```

✚ 함수 인스턴스 내에 속성 추가

함수도 하나의 인스턴스 객체이므로 인스턴스 내부의 네임스페이스가 있다. 함수에도 함 수의 인스턴스를 추가하거나 삭제가 가능하다.

예제 7-10 : 함수에 대한 사용자 객체 속성 추가

함수의 인스턴스 속성을 이해하기 위해 인스턴스를 함수 로직에 정의해서 사용해보자. 함수 func_state를 정의하고 내부 로직 func_state.count에 1씩 증가하도록 한다.

```python
In : def func_state(x,y) :
func_state.count += 1
return x+y
```

함수의 이름으로 내부의 속성 중에 _ _dict_ _를 읽어서 그 안의 네임스페이스를 조회한다.

함수가 정의될 때 하나의 속성에 대해 계산되도록 했지만 호출이 되지 않았으므로 현재 이 함수의 속성이 없어 예외는 발생하지 않는다.

```python
In : print(func_state.__dict__)
Out: {}
```

count라는 속성을 함수에 추가하고 값을 0으로 할당했다. 이제 함수의 인스턴스 네임스 페이스를 조회하면 count와 0이 추가된 것을 알 수 있다.

이 함수를 3번 호출해서 계산된 결과를 출력했다. 함수의 인스턴스 네임스페이스를 조회 하면 함수 인스턴스 내의 count 속성이 3으로 변한 것을 알 수 있다.

함수 인스턴스의 속성은 함수가 호출될 때 공유되므로 함수 내에서 이 함수 인스턴스의 속 성을 변경하면 값이 저장되고 함수가 호출될 때마다 이 인스턴스의 속성은 공유된다.

```python
In : func_state.count = 0
print(func_state.__dict__)
print(func_state(10,10))
print(func_state(10,10))
print(func_state(10,10))
print(func_state.__dict__)
Out: {'count': 0}
{'count': 3}
```

예제 7-11 : 함수 인스턴스 내 함수를 속성에 할당하기

함수 인스턴스 내의 인스턴스 속성을 정의해서 사용해보려고 한다. 함수를 정의할 때 함 수 이름과 점 연산자를 이용해서 인자를 전달받아 함수 호출을 실행하도록 로직을 작성 했다.

```python
In : def func_func(x,y) :
return func_func.func(x,y)
```

이 함수 인스턴스의 네임스페이스를 확인해보면 현재는 아무 것도 들어가지 않음을 알 수 있다.

```python
In : print(func_func.__dict__)
Out: {}
```

덧셈 함수 하나를 정의하고 func_func 함수의 인스턴스에 func라는 속성의 함수를 할당 했다. 이 인스턴스의 네임스페이스를 확인하면 func라는 키에 add라는 함수가 값으로 들 어가있는 것을 볼 수 있다.

```python
In : def add(x,y) :
return x+y
func_func.func = add
print(func_func.__dict__)
Out: {'func': <function add at 0x10599a488>}
```

이 함수를 실행하면 내부의 로직처럼 함수 인스턴스의 네임스페이스 내 함수를 호출해서 실행한 결과를 출력한다.

```python
In : print(func_func(5,5))
Out: 10
```
