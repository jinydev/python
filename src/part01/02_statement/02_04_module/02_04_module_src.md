---
layout: default
title: "02.04 모듈(module)/패키지(package)"
---

# 02.04 모듈(module)/패키지(package)

파이썬만 해도 내장 함수와 클래스를 처리하는 모듈과 사용자가 작성하는 기본적인 프로 그램을 관리하는 모듈 등이 있다.

이 다양한 모듈을 다시 묶어서 하나의 패키지로 사용할 수 있다. 프로그램의 양이 많아지 면 패키지로 많이 분리해서 프로그램들을 나눠 관리할 수 있다.

## 2.4.1 import 구문

작성하고 있는 프로그램에서 타 모듈이나 타 패키지 내의 모듈에 있는 함수나 클래스 등을 사용하고 싶을 경우 이를 현재 작성하는 모듈에서 사용한다는 표시를 한다.

이런 모듈을 사용하기 위해 import문을 이용해서 처리한다.

✚ Import 구문 사용법

● 모듈명을 직접 올리기

import 패키지명.모듈명, import 모듈명

● 패키지나 모듈 내에 일부 요소만 올리기

from 패키지명 import 모듈명, from 패키지명.모듈명 import 함수/클래스명

● 이름의 충돌을 막거나 축약형으로 명칭을 사용하기

as 다음에 별칭(alias)를 부여해서 사용

● import 구문을 사용할 때 주의사항

◦ 모듈을 작성할 때 import문은 항상 처음에 위치하도록 작성한다.

◦ 모듈을 import할 때는 항상 절대 경로를 사용하도록 한다.

◦ 상위와 하위의 모듈이 존재할 때 이를 import할 경우에는 알파벳 순으로 작성 한다.

✚ Import 직접 사용

모듈을 바로 import 모듈명이나 이 모듈명에 별칭을 지정해서 축약형의 이름으로 사용 한다.

예제 2-33 : 파이썬에서 제공하는 전체 모듈을 import하기

파이썬 내에 수학을 처리하는 함수들을 제공하는 모듈인 math를 import하여 이 math라 는 이름을 출력하면 모듈이라는 정보를 출력한다. 이 math에 대한 _ _name_ _을 확인하 면 math라고 출력하는 것을 볼 수 있다.

```python
In : import math
print(math)
print(math.__name__)
Out: <module 'math' from '/Users/dahlmoon/anaconda/lib/python3.6/lib-
dynload/math.cpython-36m-darwin.so'>
math
```

예제 2-34 : 내부 제공 모듈을 import할 때 별칭을 부여하기

수학 함수를 제공하는 모듈에 별칭을 부여해서 pi 상수를 점 연산으로 접근하여 출력할 수 있다. 별칭은 math 모듈을 별도의 mt로 할당해서 처리하는 것과 동일한 결과를 나타낸다.

```python
In : import math as mt
print(mt)
print(mt.__name__)
print(mt.pi)
Out: <module 'math' from '/Users/dahlmoon/anaconda/lib/python3.6/lib-
dynload/math.cpython-36m-darwin.so'>
math
3.141592653589793
```

키워드 as를 사용하지 않으면 별도의 mt 변수를 정의하고 이곳에 import한 모듈 math를 직접 할당해서 처리해도 동일한 결과가 나오는 것을 볼 수 있다.

별칭이란 별도의 변수를 지정해서 그 변수에 모듈의 변수를 재할당하는 것임을 확인할 수 있다.

```python
In : import math
mt = math
print(mt)
print(mt.__name__)
print(mt.pi)
Out: <module 'math' (built-in)>
math
3.141592653589793
```

✚ from/import로 모듈 내에 특정 속성만 사용하기

특정 모듈이나 패키지에 전부를 import하는 것이 아니라 특정 요소만 사용이 필요한 경우 에 필요한 요소만 지정해서 import 처리한다.

예제 2-35 : 모듈 내의 특정 속성만 원래 이름으로 사용하기

모듈을 import해서 처리하는 것이 아니라 모듈 내의 변수와 함수 이름을 직접 import해 서 사용도 가능하다. 기존에 동일한 이름이 있다면 이 이름과 충돌이 나서 다르게 처리할 수 있으므로 권장하지는 않는다.

```python
In : from math import pi, sin
print(pi)
print(sin)
print(sin(0))
pi = 100
print(pi)
Out: 3.141592653589793
<built-in function sin>
0.0
```

예제 2-36 : 모듈 내의 특정 속성에 별칭 부여하기

속성에 대한 이름이 충돌하는 것을 방지하기 위해 pi 변수에 대해 별칭으로 mtpi를 할당 해서 처리하도록 할 수도 있다.

```python
In : from math import pi as mtpi
print(mtpi)
Out: 3.141592653589793
```

별칭은 별도의 변수를 지정하고 import한 것을 할당해서 사용하는 것과 동일한 처리라는 것을 알 수가 있다.

```python
In : from math import pi
mtpi = pi
print(mtpi)
Out: 3.141592653589793
```

## 2.4.2 모듈 생성 및 실행하기

사용자 정의 모듈에 함수를 정의하고 이를 import해서 처리하는 예시를 확인해보겠다.

✚ 모듈을 생성하고 import 후에 메인 모듈에서 처리하기

파이썬에는 main 함수를 제공하지 않는다. 대신 module의 _ _name_ _ 관리 규칙이 현 재 실행되는 모듈일 경우는 “_ _main_ _” 으로 관리하므로 이 기준으로 실행을 확인확인 한다.

예제 2-37 : 함수를 정의해서 파이썬 파일로 저장

주피터 노트북에서 %%writefile add.py를 입력하고 그 다음 라인에 add 함수를 정의하 여 실행하면 add.py 모듈이 만들어진다. 파이썬에서 프로그램 모듈에 대한 확장자는 py 이다.

```python
In : %%writefile add.py
def add(x,y) :
return x+y
Out: Writing add.py
```

이 모듈을 다른 프로그램에서 사용하려면 add.py 모듈을 import해서 사용한다.

이 add라는 모듈 내에 있는 함수 add를 사용하려면 모듈명.함수명을 쓰고 다음 호출 연 산자에 인자를 넣고 호출하면 된다.

모듈의 이름을 확인하고 싶을 경우는 add._ _name_ _으로 검색하면 이 모듈의 이름을 출 력한다.

```python
In : import add
print(add.add(10,10))
print(add.__name__)
Out: 20
add
```

위의 예제는 타 모듈을 호출해서 바로 실행하는 것을 의미한다. 현재 사용하는 모듈이 항 상 처음으로 실행되는 메인 역할을 하므로 파이썬에서는 처음으로 실행되는 프로그램의 이름을 _ _main_ _으로 인지해서 처리한다.

파이썬에서는 별도의 main 함수가 없으므로 첫 번째 모듈이 실행될 때 이 모듈 이름이 _ _ main_ _인지를 확인해서 내부에 로직을 넣으면 이 모듈이 처음으로 호출될 때 실행되는 것을 볼 수 있다.

```python
In : import add
if __name__ == "__main__" :
print(add.add(10,10))
Out: 20
```

✚ 모듈을 생성하고 shell에서 실행하기

주피터 노트북에서 실행된 것을 파이썬 실행창에서 실행해도 동일한지를 알아보자. 두 개의 모듈을 작성하고 하나의 모듈을 먼저 호출하면 _ _main_ _으로 모듈명이 바뀌어 서 실행되는지를 확인한다.

예제 2-38 : 두 개의 모듈을 생성하고 shell에서 실행하기

호출되는 관계를 확인하기 위해서 2개의 모듈을 작성한다. 첫 번째 모듈은 곱셈을 하는 함 수를 가진 mul.py이다.

```python
In : %%writefile mul.py
def mul(x,y) :
return x*y
Out: Writing mul.py
```

두 번째 모듈은 Main_mul.py이다. 모듈 mul을 불러서 main_mul.py가 처음으로 호출 될 경우 mul 모듈 내의 mul 함수를 호출해서 계산된 결과를 출력한다.

```python
In : %%writefile main_mul.py
import mul
if __name__ == "__main__" :
print(mul.mul(10,10))
Out: Writing main_mul.py
```

shell 명령어는 주피터 노트북 내의 cell에서도 작동이 가능하다. 이때 명령어 앞에 느낌표 ( ! )를 붙여서 사용하면 shell창에서 실행하는 것과 동일하다.

```python
In : !python main_mul.py
Out: 100
```

주피터 노트북 내의 magic 명령은 % 다음에 명령어를 붙여서 사용할 수 있다.

빈 cell에 %run 프로그램 모듈을 실행하면 모듈이 실행된다. 결과를 확인해보면 내부의 모듈명이 _ _main_ _ 으로 결정되고 제어문 내에 함수가 실행되어 결과를 출력하는 것을 볼 수 있다.

```python
In : %run main_mul.py
Out: 100
```

## 2.4.3 모듈 네임스페이스 확인하기

프로그램을 관리하는 단위는 모듈이다. 이 모듈 내에 변수, 함수, 클래스들이 정의된다.

이를 호출해서 함수의 결과 또는 클래스의 인스턴스가 만들어지고 이 인스턴스의 메서드 가 실행되어 결과를 처리한다.

이처럼 모듈 내에서 실행되는 것을 관리할 기준을 만들어야 하는데 이를 네임스페이스라 하고 이 네임스페이스 중에 어떤 것부터 검색해서 처리하는 방식을 스코프라 한다.

파이썬에서는 모듈 내의 전역 네임스페이스를 조회할 수 있는 globals 내장 함수가 있고 함수 등 지역 네임스페이스를 관리하는 locals 함수를 지원하고 있다. 이 함수를 통해 전 역과 지역에 대한 네임스페이스를 알아본다.

✚ 모듈과 함수 내의 네임스페이스 확인

현재 작성하는 모듈에는 변수, 함수, 클래스 등이 모듈 내 네임스페이스에 등록된다. 네임 스페이스는 파이썬에서 제공되는 딕셔너리 자료형으로 관리하므로 키와 값의 쌍으로 구성 된다.

파이썬에서 왜 이름과 값으로 관리할까라는 의문이 있었을 것이다. 네임스페이스 관리 원 칙이 키와 값으로 구성되어 키는 이름이고 값은 객체를 유지하기 때문이다.

예제 2-39 : globals와 locals 함수 처리

내장 함수 globals는 모듈에서 실행하면 모듈 내의 모든 이름을 관리하는 네임스페이스 이다. 이 네임스페이스를 관리하는 자료형이 딕셔너리 타입이라는 결과를 보여준다.

```python
In : print(type(globals()))
Out: <class 'dict'>
```

하나의 함수 내에 locals 함수를 실행하고 이 타입을 확인하면 딕셔너리 자료형이라는 것 을 알 수 있다.

```python
In : def add(x,y) :
print(type(locals()))
return x+y
print(add(10,10))
Out: <class 'dict'>
```

함수 add 내에 있는 속성_ _globals_ _는 모듈에 있는 전역 네임스페이스를 가지고 처리 해보면 globals 함수를 처리하는 것과 동일한 결과가 나오는 것을 알 수 있다.

```python
In : print(add.__globals__['add'])
print(add.__globals__['__name__'])
Out: <function add at 0x10cda9d08>
__main__
In : print(globals()['add'])
print(globals()['__name__'])
Out: <function add at 0x10cda9d08>
__main__
```

예제 2-40 : 모듈에 변수와 함수를 정의하고 전역에서 조회

모듈 func_st를 작성해서 이 안에 함수 하나와 변수 하나를 정의한다. 전역 네임스페이스 를 관리하는 globals 함수를 실행하고 add_f 함수와 CONT 변수를 조회한다. 함수의 이 름을 전역 네임스페이스에서 조사한 후 호출 연산자에 인자를 넣고 호출한다.

```python
In : %%writefile func_st.py
def add_f(x,y) :
return x+y
CONT = 100
if __name__ == "__main__" :
print(globals()["add_f"])
print(globals()["CONT"])
print(globals()["add_f"](CONT,20))
Out: Writing func_st.py
```

이 모듈을 실행하면 모듈 내의 네임스페이스를 조회하고 함수를 실행해서 함수의 결과도 보여주는 것을 볼 수 있다.

```python
In : !python func_st.py
Out: <function add_f at 0x10b8a2ea0>
In : %run func_st.py
Out: <function add_f at 0x10cdfeea0>
```

## 2.4.4 패키지(package) 처리

다양한 모듈들을 어떻게 관리할 것인가를 고민할 경우가 많다. 다양한 모듈들을 분류해서 패키지로 묶는 방법을 알아본다.

✚ testpk 패키지 생성하기

모듈을 관리하는 상위 testpk 패키지를 만든다. 파이썬 모듈이 관리하는 패키지에는 반드 시 _ _init_ _.py 모듈을 만들어야 한다.

예제 2-41 : os 모듈 확인

파이썬에서 os 모듈은 다양한 operating system을 위한 wrapper 처리용 모듈로써 리눅 스와 윈도우 등의 os 명령어를 함수로 처리할 수 있도록 지원한다.

```python
In : import os
print(os)
Out: <module 'os' from '/Users/dahlmoon/anaconda/lib/python3.6/os.py'>
```

함수를 통해 현재 디렉터리를 확인한다.

```python
In : os.getcwd()
Out: '/Users/dahlmoon/Documents/GitHub/python_book/python_gram'
```

주피터 노트북 내의 magic 명령을 통해 현재 디렉터리를 확인한다.

```python
In : %pwd
Out: '/Users/dahlmoon/Documents/GitHub/python_book/python_gram'
```

예제 2-42 : 패키지 만들기 : testpk

모듈 os 내의 함수 makedirs를 이용해서 현재 디렉터리에 testpk를 만든다.

```python
In : os.makedirs("testpk")
In : print(os.getcwd())
Out: /Users/dahlmoon/Documents/GitHub/python_book/python_gram
```

모듈 os 내의 chdir 함수를 이용해서 방금 만든 testpk 디렉터리(패키지)로 이동한다. 모듈 os 내의 getcwd를 이용해서 현재 디렉터리를 확인하면 testpk 디렉터리에 있는 것을 확 인할 수 있다.

```python
In : os.chdir("testpk")
In : print(os.getcwd())
Out: /Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk
```

파이썬은 패키지(디렉터리)도 하나의 객체로 관리한다. 객체가 되려면 _ _init_ _.py를 반 드시 지정한다. _ _init_ _.py 내부에는 아무 것도 없어도 패키지로 인식하는 데는 이상이 없다.

```python
In : %%writefile __init__.py
## init
Out: Writing __init__.py
```

✚ testpk 패키지 내의 하위 패키지 생성하기

최상위 testpk 패키지를 만들었다. 이 아래에 모듈을 관리할 패키지를 만들고 이를 기반으 로 모듈을 만들 것이다.

패키지도 모두 객체로 인식되므로 각 패키지 안에 기본적으로 하나의 모듈인 _ _init_ _.py 을 만들어야 한다.

예제 2-43 : 하위 패키지 만들기 : spam

상위 패키지 testpk 내부에 다른 패키지인 spam을 만들고 패키지 내부에 _ _init_ _.py를 정의했다.

```python
In : os.getcwd()
Out: '/Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk'
In : os.makedirs("spam")
In : os.chdir("spam")
In : os.getcwd()
Out: '/Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk/spam'
In : %%writefile __init__.py
## init
Out: Writing __init__.py
```

이 패키지 내에 spam이라는 모듈을 만들었고 그 내부에 spam이라는 함수를 정의했다.

```python
In : %%writefile spam.py
def spam():
print("call spam")
Out: Writing spam.py
```

예제 2-44 : 하위 패키지 만들기 : grok

다시 상위 패키지인 testpk로 이동하기 위해 현재 디렉터리( .. )에서 상위( . )로 이동하는 인자를 상대 경로로 제시했다. Chdir 함수가 실행되면 디렉터리를 이동하는 것을 확인할 수 있다.

```python
In : os.chdir(r".././")
In : os.getcwd()
Out: '/Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk'
```

다시 패키지 grok을 만들고 이 디렉터리 내부로 들어가서 _ _init_ _.py를 만든다.

```python
In : os.makedirs("grok")
In : os.chdir("grok")
In : os.getcwd()
Out: '/Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk/grok'
In : %%writefile __init__.py
## init
Out: Writing __init__.py
```

이 패키지 밑 grok 모듈 내에 grok 함수를 정의한다.

```python
In : %%writefile grok.py
def grok():
print("call grok")
Out: Writing grok.py
```

예제 2-45 : 상위 패키지 내부 정보 확인하기

현재 작성된 패키지에서 최상위 패키지 바로 위로 이동하려고 한다. 일단 한 단계를 상위 로 올라가본다.

그 다음에 다시 한 단계를 상위로 올라가본다. 그러면 지금까지 만든 패키지보다 더 상위 로 올라가있는 것을 알 수 있다.

```python
In : os.chdir(r".././")
print(os.getcwd())
Out: /Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk
In : os.chdir(r".././")
print(os.getcwd())
Out: /Users/dahlmoon/Documents/GitHub/python_book/python_gram
```

지금까지 만든 testpk 패키지 내부에 어떤 것이 만들어져 있는지를 확인해본다. 모듈 os 내의 listdir 함수를 이용하거나 주피터 노트북 %ls에 패키지 이름을 주고 조회하면 내부에 있는 패키지와 파일을 보여준다.

```python
In : os.listdir("testpk")
Out: ['__init__.py', 'grok', 'spam']
In : %ls testpk
Out: __init__.py grok/ spam/
```

윈도우에서 확인하면 아래의 그림처럼 볼 수 있다.

상위 패키지(testpk) 내부의 spam 패키지 내에 만들어진 정보를 조회해본다.

```python
In : os.listdir("testpk/spam")
Out: ['spam.py', '__init__.py']
In : %ls testpk/spam
Out: __init__.py spam.py
```

상위 패키지(testpk) 내부의 grok 패키지 내에 만들어진 정보를 조회해본다.

```python
In : os.listdir("testpk/grok")
Out: ['grok.py', '__init__.py']
In : %ls testpk/grok
Out: __init__.py grok.py
```

✚ testpk 패키지 내부 속성 확인

파이썬은 패키지도 객체로 인식하므로 패키지도 dir 함수로 조회하면 스페셜 메서드가 자 동으로 만들어져 있다. 내부 모듈들에 대한 재로딩을 import로만 처리하는 것을 기준으로 설명한다.

예제 2-46 : package를 import해서 내부 속성을 확인

파이썬은 두 패키지를 전부 import하고 testpk 패키지의 내부 정보를 dir 함수로 조회하 면 만들지 않은 속성들이 자동으로 생성되어 있는 것을 볼 수 있다.

```python
In : import testpk
import pprint
pprint.pprint(dir(testpk))
print(testpk.__path__)
Out: ['__builtins__',
'__cached__',
'__doc__',
'__file__',
'__loader__',
'__name__',
'__package__',
'__path__',
'__spec__']
['/Users/dahlmoon/Documents/GitHub/python_book/python_gram/testpk']
```

하위 패키지를 로딩해서 확인한다. 로딩이 제대로 안될 경우 로딩해서 처리하면 패키지까 지 재로딩이 된다.

```python
In : import testpk.grok
dir(testpk.grok)
Out: ['__builtins__',
'__cached__',
'__doc__',
'__file__',
'__loader__',
'__name__',
'__package__',
'__path__',
'__spec__']
In : import testpk.spam
dir(testpk.spam)
Out: ['__builtins__',
'__cached__',
'__doc__',
'__file__',
'__loader__',
'__name__',
'__package__',
'__path__',
'__spec__']
```

다시 최상위 패키지 testpk를 import할 경우 내부에 하위 패키지들이 들어와있는 것을 확 인할 수 있다.

```python
In : import testpk
import pprint
pprint.pprint(dir(testpk))
Out: ['__builtins__',
'__cached__',
'__doc__',
'__file__',
'__loader__',
'__name__',
'__package__',
'__path__',
'__spec__',
'grok',
'spam']
```

✚ 내부 모듈의 함수 실행

Testpk 내부 패키지 내의 패키지와 모듈을 import하고 내부 함수를 호출해서 실행시 킨다.

예제 2-47 : import로 패키지 내부의 모듈 내 함수를 호출하기

grok 패키지와 spam 패키지 내의 grok과 spam 모듈을 로딩시키고 이것을 types 모듈 내의 자료형으로 확인해본다.

패키지와 모듈은 types.ModuleType으로 인식되고 모듈 내의 함수는 FunctionType으 로 인식되는 것을 확인할 수 있다.

```python
In : import testpk.grok.grok
import testpk.spam.spam
import types
if type(testpk.grok) == types.ModuleType :
print(" module")
if type(testpk.grok.grok) == types.ModuleType :
print(" module")
if type(testpk.grok.grok.grok) == types.FunctionType :
print(" function")
Out: module
module
function
```

패키지 testpk 내부에서 서브 패키지 grok과 spam 밑의 grok과 spam 모듈 내에 grok 과 spam 함수를 호출해서 처리한다.

```python
In : import testpk.grok.grok as grok
import testpk.spam.spam as spam
grok.grok()
spam.spam()
Out: call grok
call spam
```
