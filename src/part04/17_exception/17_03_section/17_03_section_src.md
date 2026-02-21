---
layout: default
title: "17.03 traceback"
---

# 17.03 traceback

이 모듈은 Python 프로그램의 예외에 대한 정보를 추출, 포맷 및 인쇄하는 표준 인터페이 스를 제공한다.

## 17.3.1 traceback 클래스 처리

예외가 처리되면 예외가 발생된 위치를 알려주는 것도 하나의 클래스를 만들어서 추적이 가능하도록 별도의 모듈로 제공한다.

✚ Traceback 이해하기

Traceback 모듈 내에 오류를 발생시켜서 traceback이 어떻게 출력되는지를 확인해 본다.

예제 17-9 : traceback 처리

나눗셈 함수를 정의해서 분모에 0을 주고 처리하면 ZerodivisionError가 발생할 때 Traceback이 처리되어 에러가 발생한 부분을 알려준다.

```python
In : def div(x,y) :
return x/y
div(20,0)
Out: ---------------------------------------------------------------------
ZeroDivisionError      Traceback (most recent call last)
<ipython-input-122-b318a0b435e4> in <module>()
2  return x/y
----> 4 div(20,0)
<ipython-input-122-b318a0b435e4> in div(x, y)
1 def div(x,y) :
----> 2 return x/y
4 div(20,0)
ZeroDivisionError: division by zero
```

예외가 발생한 traceback에 sys 모듈이 exc_info 함수를 통해 정보를 가져오는 과정을 한번 살펴보겠다.

```python
In : import sys
def div(x,y) :
return x/y
try :
div(10,0)
except ZeroDivisionError as e :
se = sys.exc_info()
tb = se[2]
print(type(se[2]))
tb_at = dir(se[2])
Out: <class 'traceback'>
```

예외가 발생한 정보를 tb 변수에 traceback의 인스턴스로 할당했고 이 내부의 속성들은 tb_at에 저장했다. 이 정보들을 출력해보면 traceback 내에 4개의 속성을 가지고 있음을 알 수 있다.

```python
In : print(tb)
print(tb_at)
Out: <traceback object at 0x000000000587C188>
['tb_frame', 'tb_lasti', 'tb_lineno', 'tb_next']
```

이 속성들을 확인해보면 tb_frame은 로딩된 프로그램 처리에 대한 frame 클래스의 인스 턴스이고 next에는 추가적인 정보를 관리하는 traceback의 인스턴스에 대한 정보가 들어 가 있음을 알 수 있다.

```python
In : print(tb.tb_frame)
print(tb.tb_lasti)
print(tb.tb_lineno)
print(tb.tb_next)
Out: <frame object at 0x0000000004EA11D8>
<traceback object at 0x000000000587C948>
```

내장 클래스인 frame을 확인해보면 내부에 실행되는 code 클래스를 가지고 있으며 이는 함수가 생성될 때 내부에 가지는 코드 정보와 동일하다. 이 코드 내의 소스를 보기 위해 inspect 모듈을 이용해서 프로그램 소스를 확인해보면 함수의 소스가 들어가 있는 것을 알 수 있다.

```python
In : import inspect
print(type(tb.tb_frame))
print(tb.tb_frame.f_trace)
print(tb.tb_frame.f_code)
print(inspect.getsource(tb.tb_frame.f_code))
Out: <class 'frame'>
None
<code object <module> at 0x00000000055E29C0, file "<ipython-input-118-
e0c28f43e17c>", line 6>
def div(x,y) :
return x/y
```

## 17.3.2 traceback 모듈 처리

예외나 오류에 대한 정보를 가진 traceback에 대한 정보를 세부적으로 확인하기 위해 traceback 모듈을 이용할 수 있다.

예제 17-10 : traceback 모듈 처리

주피터 노트북에서 예외를 발생시키면 traceback 정보가 출력되는 것을 볼 수 있다.

```python
In : raise IOError(" 트레이스 모듈로 정보 확인하기 ")
Out: ---------------------------------------------------------------------
OSError               Traceback (most recent call last)
<ipython-input-127-e63296f844a4> in <module>()
```

----> 1 raise IOError(" 트레이스 모듈로 정보 확인하기 ") OSError: 트레이스 모듈로 정보 확인하기 이런 예외에 대한 정보를 별도로 처리하려면 traceback 모듈을 사용해서 출력할 수도 있다. IOError를 발생시키고 traceback 모듈에서 print_exc 함수를 이용해서 출력하면 traceback 처리된 결과가 전부 출력된다.

```python
In : import traceback
try :
```

raise IOError(" 트레이스 모듈로 정보 확인하기 ") except IOError as e :

traceback.print_exc()

```python
Out: Traceback (most recent call last):
File "<ipython-input-126-7a0d3854d674>", line 4, in <module>
```

raise IOError(" 트레이스 모듈로 정보 확인하기 ") OSError: 트레이스 모듈로 정보 확인하기 별도의 파일을 처리해서 저장도 가능하다. 일단 IO 모듈에 StringIO를 이용해서 하나의 임시 저장 문자열을 만들고 print_exc 함수 내부에 file=file로 실행하면 문자열로 정보를 저장한다. 이 문자열을 finally에서 출력하는 것을 볼 수 있다.

```python
In : import traceback
import io
try :
```

raise IOError(" 트레이스 모듈로 정보 확인하기 ") except IOError as e :

file = io.StringIO() traceback.print_exc(file=file) finally :

print(file.getvalue())

```python
Out: Traceback (most recent call last):
File "<ipython-input-129-0773bcea41ce>", line 5, in <module>
```

raise IOError(" 트레이스 모듈로 정보 확인하기 ") OSError: 트레이스 모듈로 정보 확인하기

예제 17-11 : 네임스페이스에 실행된 이름의 존재 여부 확인

특정 문을 입력하고 그 입력한 것을 exec 함수로 실행해서 특정 네임스페이스에 저장되어 있는지를 확인한다. 파이썬으로 코딩된 모든 것은 네임스페이스에 이름과 값으로 저장되 어 관리된다. 네임스페이스에서 없을 경우 예외가 발생하므로 except 구문을 처리한다.

```python
In : import sys, traceback
def exec_run(namespace) :
command = input(">>>")
if command == "exit" :
sys.exit()
try :
exec(command)
if namespace[command] :
print(" namespace has ", command)
except :
print(" Exception")
print("-"*60)
traceback.print_exc(file=sys.stdout)
print("_"*60)
```

별도의 네임스페이스를 만들어서 함수에 전달하면 input 함수가 실행되고 sys를 입력 한다. sys라는 이름은 함수가 있는 모듈에는 존재하지만 함수의 인자로 넘긴 네임스페이 스 내에는 아무 것도 없으므로 KeyError가 발생하는 것을 알 수 있다.

```python
In : namespace = {}
exec_run(namespace)
Out: >>>sys
Exception
------------------------------------------------------------
Traceback (most recent call last):
File "<ipython-input-28-8e4d20a74363>", line 10, in exec_run
if namespace[command] :
KeyError: 'sys'
____________________________________________________________
```

네임스페이스를 모듈의 전역 네임스페이스로 전달하고 input 함수에 sys를 전달하면 이 이름이 기존에 존재하므로 출력된다. 이 함수를 통해 파이썬 네임스페이스의 이름은 키로 관리하고 값은 객체의 레퍼런스가 오는 것을 알 수 있다. 키와 값이 쌍을 구성하는 딕셔너 리 구조를 준수하면서 관리되는 것도 이해할 수 있다.

```python
In : exec_run(globals())
Out: >>>sys
namespace has sys
CHAPTER
```

파이썬 파일 처리 컴퓨터가 처리하는 bits, bytes에 대한 데이터 처리의 기본을 IO 모듈에 추상 클래스로 제 공하고 있다. 다양한 IO 처리가 있지만 기본으로 데이터가 전달되어 처리될 때는 비트, 바 이트, 텍스트 구조로 변환되어 처리되는 것을 알 수 있다. 텍스트로 처리하려면 다양한 언 어를 지원하는 문자 팩이 있기에 이런 부분을 처리하기 위해서는 IO 처리의 기본을 이해 해야 한다.

이번 장에서는 먼저 IO 처리의 기본부터 이해하고 세부적인 파일 처리 및 직렬화 등의 모 듈까지 이해해보기로 하겠다.

✚ 알아볼 주요 내용

● IO 추상 클래스

● Raw IO 처리

● 텍스트, 바이트에 대한 메서드 기본 처리

● BytesIO, StringIO 임시 파일 처리
