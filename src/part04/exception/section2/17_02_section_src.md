---
layout: default
title: "17.02 Exception"
---

# 17.02 Exception

앞의 장에서 간단하게 Exception이 발생할 때 어떤 예외 클래스에 의해 발생했는지도 간 단히 알아봤다.

이번에는 내장 예외 클래스들을 알아본 후에 사용자 예외 클래스를 정의해서 처리하는 방 식을 알아보겠다.

## 17.2.1 내장 예외 클래스 구조

내장 예외도 메타 클래스에 의해 생성되고 최상위 클래스를 상속받아서 클래스가 생성되 어 있다.

예제 17-6 : Exception 클래스 구조 알아보기

최상위 예외 클래스는 BaseException이고 나머지 예외나 오류에 대한 클래스는 이를 상 속받아 처리한다. 기본 속성은 agrs, with_traceback을 가지고 있다.

```python
In : print(BaseException)
print(BaseException.__bases__)
for i in dir(BaseException) :
if not i.startswith("_") :
print(i)
Out: <class 'BaseException'>
(<class 'object'>,)
args
with_traceback
```

최상위 클래스인 object를 상속받아 만들어진 최상위 예외 클래스의 스페셜 메서드에 대 해 알아보면 여러 개가 추가된 것을 알 수 있다.

```python
In : b = set(dir(BaseException))
o = set(dir(object))
for i in (b - o) :
print(i)
Out: with_traceback
__setstate__
__context__
__cause__
__traceback__
args
__suppress_context__
__dict__
```

기본 예외에서 with_traceback 메서드를 확인하면 예외가 발생할 때 traceback에 대한 정보를 처리한다.

```python
In : try :
```

raise BaseException(" 예외 강제 발생 "," 정말") except BaseException as e :

print(e) print(e.with_traceback)

```python
Out: (' 예외 강제 발생 ', ' 정말')
<built-in method with_traceback of BaseException object at 0x102e81b48>
```

Sys 모듈을 이용해서 예외가 발생할 때 현재의 실행 정보를 sys.exc_info 함수로 불러와 서 내부에서 traceback 클래스로 만든 예외의 정보를 가져올 수 있다.

```python
In : import sys
try :
```

raise BaseException(" 예외 강제 발생 "," 정말") except BaseException as e :

for i in sys.exc_info() :

print(i)

```python
Out: <class 'BaseException'>
```

(' 예외 강제 발생 ', ' 정말') <traceback object at 0x102ebe148> 이를 이 예외 클래스 내의 with_traceback 메서드 인자로 traceback 정보를 넣어서 예외 메시지만 처리할 수 있다.

```python
In : import sys
try :
```

raise BaseException(" 예외 강제 발생 "," 정말") except BaseException as e :

tb = sys.exc_info()[2] print(e.with_traceback(tb)) print(" 예외에 보관된 내용 출력")

```python
Out: (' 예외 강제 발생 ', ' 정말')
```

예외에 보관된 내용 출력 Exception 클래스가 어떤 클래스를 상속받았는지를 확인하면 BaseException을 받은 것 을 알 수 있고 이 클래스는 type 메타 클래스로 만들어진 것을 알 수 있다.

```python
In : print(Exception.__bases__)
print(Exception.__class__)
Out: (<class 'BaseException'>,)
<class 'type'>
```

Exception 클래스의 네임스페이스에는 생성에 관련된 스페셜 메서드와, 인스턴스를 만드 는 생성자 및 초기화 메서드만 있다.

```python
In : import pprint
pprint.pprint(Exception.__dict__)
Out: mappingproxy({'__doc__': 'Common base class for all non-exit exceptions.',
'__init__': <slot wrapper '__init__' of 'Exception' objects>,
'__new__': <built-in method __new__ of type object at
0x00000000542FA370>})
```

Exception 클래스에 정보를 넣으면 이 클래스의 인스턴스가 만들어진다. Exception 클 래스 내부에 있는 스페셜 메서드는 인스턴스를 생성하는 것만 가지고 있기 때문이다.

이 인스턴스에 생성해서 내부 속성을 args로 확인하면 인스턴스를 만들 때 전달한 값이 들 어가 있는 것을 볼 수 있다. 인스턴스를 생성할 때 값이 들어가면 args가 튜플로 실행되어 넣은 정보를 처리할 수 있다.

```python
In : e = Exception("예외 인스턴스를 하나를 만든다.")
print(e)
print(e.args)
Out: 예외 인스턴스를 하나를 만든다.
```

('예외 인스턴스를 하나를 만든다.',) Exception을 상속받아 다양한 최상위 클래스를 만들었다. 다양한 예외나 에러가 발생할 경우 Exception을 상속받아 새롭게 예외나 에러 클래스를 만들어야 한다.

```python
In : print(ArithmeticError.__bases__)
print(ArithmeticError.__class__)
Out: (<class 'Exception'>,)
<class 'type'>
In : print(BufferError.__bases__)
print(BufferError.__class__)
Out: (<class 'Exception'>,)
<class 'type'>
In : print(LookupError.__bases__)
print(LookupError.__class__)
Out: (<class 'Exception'>,)
<class 'type'>
```

## 17.2.2 내장 예외 클래스 인스턴스 객체

예외는 예외 클래스의 인스턴스 객체가 만들어져서 발생한다. 이때에 메시지를 넣어서 보 내준다.

예제 17-7 : 내장 예외에 대한 관계 확인하기

수학적인 예외를 처리하는 예외는 ArithmeticError를 상속한 것을 알 수 있다.

```python
In : print(FloatingPointError.__bases__)
print(OverflowError.__bases__)
print(ZeroDivisionError.__bases__)
Out: (<class 'ArithmeticError'>,)
(<class 'ArithmeticError'>,)
(<class 'ArithmeticError'>,)
```

상위 상속 관계를 확인하면 Exception과 BaseException 클래스를 상속한다.

```python
In : print(ArithmeticError.__bases__)
Out: (<class 'Exception'>,)
In : print(Exception.__bases__)
Out: (<class 'BaseException'>,)
```

ZeroDivisionError는 부모 클래스로 ArithmeticError를 상속받아 처리하지만 추가된 내 부 속성을 가지지 않는다.

```python
In : a = ZeroDivisionError(" 0이 분모에 들어가 있다 ")
z = set(dir(ZeroDivisionError))
ar = set(dir(ArithmeticError))
c = (z-ar)
print(a)
print(c)
Out: 0이 분모에 들어가 있다
set()
```

반복자 처리가 끝나면 예외를 발생시키는 StopIteration 클래스는 valu라는 속성이 추가 된 것을 알 수 있다.

```python
In : print(StopIteration.__bases__)
sid = set(dir(StopIteration))
exp = set(dir(Exception))
print(sid-exp)
Out: (<class 'Exception'>,)
{'value'}
```

반복자 처리가 끝날 때 발생하는 StopIteration 예외에도 메시지를 주고 처리 가능하다.

```python
In : si = StopIteration("반복자 처리 종료")
print(si)
print(si.args)
print(si.value)
Out: 반복자 처리 종료
```

('반복자 처리 종료',) 반복자 처리 종료

## 17.2.3 사용자 예외 클래스 정의 및 처리

사용자 예외를 만들 경우 예외에 필요한 정보를 어떻게 처리할지를 정의해야 한다. 추가 적인 속성을 사용할지 아니면 기존에 정해진 속성만 사용해서 처리할지에 대한 정의가 필 요한다.

예제 17-8 : 사용자 예외를 정의해서 처리해보기

사용자 예외를 정의할 때 일단 Exception 클래스를 상속한다. 인스턴스가 만들어질 때 들 어갈 속성은 예외 번호, 예외 모듈, 예외 메시지 등을 추가해서 정의한다.

```python
In : class UserError(Exception) :
def __init__(self,err_no,err_pgm,err_msg) :
super().__init__(err_msg)
self.err_no = err_no
self.err_pgm = err_pgm
self.err_msg = err_msg
```

예외를 raise문으로 강제 발생시킨다. 이 인스턴스에서 발생한 정보를 except문에서 잡아 출력해보면 입력한 예외가 그대로 출력되는 것을 확인할 수 있다.

```python
In : try :
```

raise UserError(1,__name__,"장애가 발생했습니다.") except UserError as e :

print(e.err_no) print(e.err_pgm) print(e.err_msg)

```python
Out: 1
__main__
```

장애가 발생했습니다.

예외를 별도의 모듈로 만들어서 저장했다. 이 모듈을 import해서 처리해도 동일한 결과가 나오는지를 확인해보겠다.

```python
In : %%writefile UserError.py
class UserError(Exception) :
def __init__(self,err_no,err_pgm,err_msg) :
super().__init__(err_msg)
self.err_no = err_no
self.err_pgm = err_pgm
self.err_msg = err_msg
Out: Writing UserError.py
```

실행할 모듈을 별도의 파일로 만들었다. 내부의 로직은 단순히 위의 예외를 강제로 발생 시켜서 모듈 내에서도 동일하게 처리되는지를 확인해보는 것이다.

```python
In : %%writefile error.py
import UserError as UE
try :
```

raise UE.UserError(1,__name__,"장애가 발생했습니다.") except UE.UserError as e :

print(e.err_no) print(e.err_pgm) print(e.err_msg)

```python
Out: Writing error.py
```

이 모듈을 실행한다. 출력된 결과는 동일한 것을 보면 별도의 모듈에 사용자 예외를 만들 어서 등록하고 이를 import해서 처리할 수 있도록 만들면 된다.

```python
In : !python error.py
Out: 1
__main__
```

장애가 발생했습니다.
