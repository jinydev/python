---
layout: default
title: "18.02 BinaryIO"
---

# 18.02 BinaryIO

가장 많이 사용하는 바이트 처리 방식을 알아보겠다. 바이트 단위로 문자를 처리하는 것 이 대부분 컴퓨터 내에서 처리하는 방식이므로 이번에 BinaryIO(bufferIO라고도 함)인 바 이트 단위의 객체로 처리하는 법을 사용해보겠다.

## 18.2.1 Buffer 처리 클래스 구조

직접 IO 모듈 내에 BufferedIOBase 클래스를 상속받아 buffer 처리를 위해 구현한다.

버퍼 처리를 하는 클래스에는 다양한 것이 있다. BufferedRWPair, BufferedReader, BufferedWriter 클래스는 BufferedIOBase를 상속받아 구현된 클래스이므로 바이트 단 위를 처리하는 구현 클래스이다.

✚ BufferedReader 클래스

보통 파일을 열 때 모드를 rb로 처리하면 바이트 단위로 처리되는 객체가 이 클래스라는 것을 위의 예에서 알아봤다.

바이트로 어떻게 파일을 열고 처리하는지를 세부적으로 알아보겠다.

예제 18-8 : BufferedReader 클래스 확인하기

최상위 클래스인 BufferedIOBase에 선언된 메서드에 대해서 검색해보면 다음과 같다.

```python
In : import io
count = 0
for i in dir(io.BufferedIOBase) :
if not i.startswith("_") :
count += 1
_ if (count % 5 != 0) else print()
print(i, end=" ")
Out: close closed detach fileno
flush isatty read read1 readable
readinto readinto1 readline readlines seek
seekable tell truncate writable write
writelines
```

이 클래스를 상속받을 경우 추상 메서드에 대해서는 구상 클래스(concrete class)에서 재정 의해서 작성해야 한다. BufferedReader는 파일을 읽어서 바이트로만 처리가 가능하다.

상위 클래스인 BufferedIOBase 클래스에는 없는 추가된 속성과 메서드가 있다.

```python
In : import io
print(io.BufferedIOBase.__bases__)
print(io.BufferedReader.__bases__)
bb = set(dir(io.BufferedIOBase))
br = set(dir(io.BufferedReader))
print(br - bb)
Out: (<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)
(<class '_io._BufferedIOBase'>,)
{'peek', 'raw', 'mode', 'name', '_finalizing', '_dealloc_warn', '__
getstate__'}
```

이제 바이트 파일을 처리하기 위해 하나의 파일을 만들었다. 기본 바이트 파일이므로 영 어로 작성했다.

```python
In : %%writefile br_data.txt
(<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)
(<class '_io._BufferedIOBase'>,)
{'peek', 'raw', 'mode', 'name', '_finalizing', '_dealloc_warn', '__
getstate__'}
Out: Writing br_data.txt
```

이 파일을 open 함수를 통해 열 때 모드를 rb로 준 것을 확인할 수 있다. 파일이 라인을 원소로 하는 하나의 큰 내용이므로 반복형이면서 반복자라는 것도 확인해봤다.

그리고 for 순환문을 이용해서 이 바이트 파일을 출력해봤다. 문자열은 유니코드이고 바 이트 파일은 유니코드가 아니므로 출력할 때 바이트라는 표시로 문자열 앞에 b가 붙어 있 는 것을 확인할 수 있다.

```python
In : import io
import collections.abc as cols
br = open("br_data.txt","rb")
print(issubclass(type(br), cols.Iterable))
print(issubclass(type(br), cols.Iterator))
for i in br :
print(i)
Out: True
True
b"(<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)\r\n"
b"(<class '_io._BufferedIOBase'>,)\r\n"
b"{'peek', 'raw', 'mode', 'name', '_finalizing', '_dealloc_warn', '__
getstate__'}"
```

파일을 close하지 않았으므로 종료가 되지 않았다. 다시 seek 메서드를 이용해서 파일이 처음으로 이동하면 반복자를 다시 사용할 수 있다.

이번에는 next 함수로 반복자를 호출해서 사용하겠다. 파일은 종료가 필요할 때 반드시 close 메서드로 종료되었다고 알려줘야 한다.

하지만 파일이 종료되기 전에 전부 다 소비했기에 StopIteration이 발생하는 것을 알 수 있다.

```python
In : br.seek(0)
print(next(br))
print(next(br))
print(next(br))
print(next(br))
br.close()
Out: b"(<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)\r\n"
b"(<class '_io._BufferedIOBase'>,)\r\n"
b"{'peek', 'raw', 'mode', 'name', '_finalizing', '_dealloc_warn', '__
getstate__'}"
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-29-3e6e3bdfb65a> in <module>()
3 print(next(br))
4 print(next(br))
----> 5 print(next(br))
6 br.close()
StopIteration:
```

다시 파일을 열어 next 함수로 처리하고 파일을 닫았다. 그 다음에 next로 파일을 읽으면 파일이 닫혔다고 예외를 발생시킨다.

```python
In : br2 = open("br_data.txt","rb")
print(next(br2))
print(next(br2))
print(next(br2))
br2.close()
print(next(br2))
Out: b"(<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)\n"
b"(<class '_io._BufferedIOBase'>,)\n"
b"{'peek', 'raw', 'mode', 'name', '_finalizing', '_dealloc_warn', '__
getstate__'}"
---------------------------------------------------------------------
ValueError             Traceback (most recent call last)
<ipython-input-17-339629b029ce> in <module>()
5 print(next(br2))
6 br2.close()
----> 7 print(next(br2))
ValueError: readline of closed file
```

✚ BufferedWriter 클래스

이번에는 파일에 자료를 작성할 때 바이트 자료형들을 버퍼에 넣었다가 디스크에 처리해 야 한다.

예제 18-9 : BufferedWriter 클래스 확인하기

BufferedWriter는 BufferedReader에 없는 출력에 대한 메서드들이 추가된 것을 확인할 수 있다.

```python
In : import io
print(io.BufferedIOBase.__bases__)
print(io.BufferedWriter.__bases__)
bb = set(dir(io.BufferedIOBase))
bw = set(dir(io.BufferedWriter))
print(bw - bb)
Out: (<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)
(<class '_io._BufferedIOBase'>,)
{'raw', 'mode', 'name', '_finalizing', '_dealloc_warn', '__getstate__'}
```

출력할 파일을 열려면 모드를 wb로 지정하고 오픈한다. 현재 이 파일이 만들어지지 않았 으므로 write 메서드로 하나의 라인씩 기록하고 파일을 닫았다.

```python
In : f = open("data_bw.txt", "wb")
print(f)
print(issubclass(type(f),io.BufferedIOBase))
f.write(b"when the buffer gets too small for all pending data;\n")
f.write(b"when flush() is called;\n")
f.write(b"when a seek() is requested (for BufferedRandom objects);\n")
f.write(b"when the BufferedWriter object is closed or destroyed.\n")
f.close()
Out: <_io.BufferedWriter name='data_bw.txt'>
True
```

파일이 제대로 저장이 되었는지를 확인하가 위해 다시 바이트 모드로 파일을 오픈하고 순 환문으로 출력을 했다. 제대로 저장이 된 것을 확인할 수 있다.

```python
In : with open("data_bw.txt", "rb") as f :
for i in f :
print(i)
Out: b'when the buffer gets too small for all pending data;\n'
b'when flush() is called;\n'
b'when a seek() is requested (for BufferedRandom objects);\n'
b'when the BufferedWriter object is closed or destroyed.\n'
```

✚ BufferedRWPair 클래스

이번에는 읽고 쓰는 두 가지 기능을 다 처리하는 바이트 자료형을 확인해보겠다.

예제 18-10 : BufferedRWPair 클래스

BufferedIOBase 클래스와 메서드에 대한 차이는 별로 없다.

```python
In : import io
print(io.BufferedIOBase.__bases__)
print(io.BufferedRWPair.__bases__)
bb = set(dir(io.BufferedIOBase))
brw = set(dir(io.BufferedRWPair))
print(brw - bb)
Out: (<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)
(<class '_io._BufferedIOBase'>,)
{'peek', '__getstate__'}
```

위에서 만든 파일 하나를 가지고 읽고 쓰기 위해 두 개를 파일로 열었다. 이 파일을 Buf feredRWPair에 인자로 넣어 wrapper 인스턴스를 만들었다.

그리고 순환문에 넣어서 읽고 이를 출력하는 것을 만들었다.

```python
In : f = open("data_bw.txt", "rb")
w = open("data_rw.txt", "wb")
wrapper = io.BufferedRWPair(f, w)
print(wrapper)
for i in wrapper :
print(i)
wrapper.write(b"rw : " + bytes(i))
wrapper.close()
Out: <_io.BufferedRWPair object at 0x0000000005BD2EA0>
b'when the buffer gets too small for all pending data;\n'
b'when flush() is called;\n'
b'when a seek() is requested (for BufferedRandom objects);\n'
b'when the BufferedWriter object is closed or destroyed.\n'
```

다시 이 파일을 읽고 출력해보면 라인의 앞에 rw가 붙어 있는 것을 확인할 수 있다. 읽고 동시에 출력을 하면서 변경할 수 있는 구조라는 것을 알 수 있다.

```python
In : with open("data_rw.txt", "rb") as f :
for i in f :
print(i)
Out: b'rw : when the buffer gets too small for all pending data;\n'
b'rw : when flush() is called;\n'
b'rw : when a seek() is requested (for BufferedRandom objects);\n'
b'rw : when the BufferedWriter object is closed or destroyed.\n'
```

BufferedReader 클래스의 인스턴스를 지정해서 임시로 사용하는 바이트 문자열을 Bytes IO로 전환한 뒤 저장도 가능하다.

이를 다시 BufferedRWPair 내에 넣어서 새로운 wrapper 인스턴스를 만들어 출력을 처 리해도 된다.

```python
In : import io
```

s = "가나다라마바" reader = io.BufferedReader(io.BytesIO(s.encode())) writer = open("data_rw1.txt", "wb") wrapper = io.BufferedRWPair(reader,writer) line = wrapper.read() wrapper.write(line) print(line) print(line.decode()) wrapper.flush() wrapper.close()

```python
Out: b'\xea\xb0\x80\xeb\x82\x98\xeb\x8b\xa4\xeb\x9d\xbc\xeb\xa7\x88\xeb\
xb0\x94'
가나다라마바
```

위의 결과를 다시 읽어서 처리하면 동일한 바이트 처리가 되는 것을 확인할 수 있다. 일단 한글로 처리된 것을 바이트로 암호화해서 처리하므로 글자가 보이지 않고 hex 값으로만 처리되는 것을 알 수 있다.

```python
In : with open("data_rw1.txt", "rb") as f :
for i in f :
print(i)
Out: b'\xea\xb0\x80\xeb\x82\x98\xeb\x8b\xa4\xeb\x9d\xbc\xeb\xa7\x88\xeb\
xb0\x94'
```

다시 파일을 열어 바이트에서 텍스트로 변환하는 decode 메서드를 이용해서 유니코드 문 자열로 바꾸면 한글로 출력되는 것을 확인할 수 있다.

```python
In : with open("data_rw1.txt", "rb") as f :
for i in f :
print(i.decode())
Out: 가나다라마바
```

## 18.2.2 BytesIO 클래스 구조

파이썬은 임시 파일 처리를 제공하는 BytesIO 클래스를 IO 모듈에서 제공한다. 앞에서 간단하게 처리하는 방법을 사용해봤다. 일단 메모리상에서 파일처럼 처리하는 클래스이 므로 임시적인 버퍼로 파일을 지정하지 않고 사용한다.

예제 18-11 : BytesIO 클래스 처리

ByteIO 클래스와 추상 클래스와의 관계를 확인해보겠다. BufferedIOBase 추상 클래스 를 상속해서 만든 것을 알 수 있다. 파일을 처리하지 않기 때문에 다른 클래스를 상속하지 않는다.

```python
In : import io
print(issubclass(io.BytesIO, io.IOBase))
print(issubclass(io.BytesIO, io.BufferedIOBase))
print(issubclass(io.BytesIO, io.BufferedReader))
print(issubclass(io.BytesIO, io.BufferedWriter))
print(issubclass(io.BytesIO, io.BufferedRWPair))
Out: True
True
False
False
False
```

파일을 모드 rb로 읽었다. 이 파일은 예제 18-6에서 만든 파일이다. 또 BytesIO 클래스 로 바이트 인스턴스를 하나 만들었다.

이 두 가지를 가지고 내부를 확인해보면 파일은 BufferedReader이고 BytesIO는 이 클래 스의 인스턴스이다.

```python
In : import io
f = open("data.txt","rb")
b = io.BytesIO(b"BytesIO processing ")
print(f)
print(b)
Out: <_io.BufferedReader name='data.txt'>
<_io.BytesIO object at 0x106d23620>
```

파일을 바이트로 오픈한 것과 BytesIO로 인스턴스를 만든 것 사이에 추상 클래스로 인스 턴스 관계를 확인해보면 기본적으로 BufferedIOBase 클래스를 상속했다는 것을 알 수 있다.

```python
In : print(isinstance(f, io.BufferedIOBase))
print(isinstance(b, io.BufferedIOBase))
print(isinstance(b, io.BufferedReader))
print(isinstance(f, io.BufferedReader))
Out: True
True
False
True
```

이제 BytesIO 클래스로 만든 인스턴스 내부의 구조를 확인해보겠다. 일단 다시 BytesIO 로 인스턴스를 만들어서 getbuffer 메서드로 다른 변수에 할당했다.

또한 내부에 저장된 바이트 문자열을 getvalue 메서드로 가져와 출력했다.

getbuffer 메서드로 할당한 것은 이 내용을 보기 위한 memoryview 인스턴스로 만들어 서 처리하는 것임을 알 수 있다. 동일한 내용을 뷰로 보면서 사용할 수도 있는 기능을 지 원한다.

```python
In : import io
b = io.BytesIO(b"last checkpoint 2 hour age ")
c = b.getbuffer()
print(b.getvalue())
print(isinstance(c, memoryview))
Out: b'last checkpoint 2 hour age '
True
```

예제 18-12 : BytesIO 인스턴스 사용하기

아무런 인자도 없이 BytesIO로 인스턴스를 생성한다. 이 인스턴스 내부에 바이트 문자열 을 갱신할 수 있는지를 writeable 메서드를 가지고 확인할 수 있다.

```python
In : import io
b = io.BytesIO()
print(b.writable())
Out: True
```

파일처럼 바이트 문자열을 write 메서드로 쓰고 그 내용을 getvalue 메서드로 읽어와서 출력했다.

두 번째 출력을 보면 들어가 있는 전체를 한꺼번에 읽어와서 출력하는 것을 볼 수 있다.

```python
In : b.write(b" unsaved changes\n")
print(b.getvalue())
b.write(b"Modules\n, that is libraries intended to be used by other
programs\n ")
print(b.getvalue())
Out: b' unsaved changes\n'
b' unsaved changes\nModules\n, that is libraries intended to be used by
other programs\n '
```

파일처럼 for 순환문으로 처리하기 위해 seek 메서드를 이용해서 처음으로 이동한 후에 처리하면 개행 문자 단위로 출력하는 것을 볼 수 있다.

```python
In : print(b.seek(0))
for i in b :
print(i)
Out: 0
b' unsaved changes\n'
b'Modules\n'
b', that is libraries intended to be used by other programs\n'
b' '
```

파일의 현재 위치를 확인하는 tell 메서드를 이용해서 확인했다. 다시 seek 메서드를 이용 해서 처음으로 가 하나의 라인을 readline 메서드로 읽어서 처리하고 파일을 종료한다.

```python
In : print(b.tell())
print(b.seek(0))
print(b.readline())
b.close()
Out: 84
b' unsaved changes\n'
```

예제 18-13 : BytesIO 인스턴스를 파일처럼 사용하기

파일을 지정하지 않고 메모리로 처리할 수 있는 방법도 있다. 일단 BytesIO로 빈 인스턴 스를 만들고 저장 공간을 만들어서 처리할 수 있다.

일단 BytesIO 클래스로 인스턴스를 만들어서 output 변수에 할당했고 이를 TextIO Wrapper 클래스 생성자 내에 파일명 대신 넣었다. 일단 바이트로 처리하므로 문자열을 바이트로 암호화하도록 인코딩 처리를 하고 출력할 수 있는 write_through를 True로 처 리해서 새로운 파일을 생성한다.

wrapper에는 파일 처리를 하게 된다. 저장되는 곳은 파일이 아닌 ByteIO로 지정된 메모 리이므로 텍스트를 저장하면 바이트로 처리되는지를 확인할 필요가 있다.

```python
In : import io
output = io.BytesIO()
wrapper = io.TextIOWrapper(output,
encoding="utf-8",
write_through = True)
print(wrapper)
Out: <_io.TextIOWrapper encoding='utf-8'>
```

일단 문자열을 write 메서드를 가지고 파일에 쓴다.

```python
In : a = wrapper.write("Truncate file to size bytes.\n")
print(a)
b = wrapper.write("Return whether object supports random access.\n")
print(b)
Out: 29
```

임시 파일인 BytesIO의 인스턴스에 파일처럼 처리를 했을 때 제대로 데이터가 저장이 되 어 있는지를 확인하기 위해 output 내의 getvalue 메서드를 이용해서 조회한 후에 출력 한다.

```python
In : print(output.getvalue())
Out: b'Truncate file to size bytes.\nReturn whether object supports random
access.\n'
```

문자열이 바이트 문자열로 인코딩되어 저장된 것을 알 수 있다. 이제 이 파일이 첫 번째로 이동해서 readlines로 전체를 읽고 이 파일을 닫는다.

파일이 상태가 닫혔는지를 확인하기 위해 closed 속성을 확인해보면 닫혔다는 것을 알 수 있다.

```python
In : print(wrapper.seek(0))
print(wrapper.readlines())
wrapper.close()
print(wrapper.closed)
Out: 0
['Truncate file to size bytes.\n', 'Return whether object supports
random access.\n']
True
```

이번에는 직접 BytesIO의 인스턴스를 가지고 파일 입력으로 사용해서 처리해보겠다.

BytesIO에 바이트 문자열을 정의하고 하나의 인스턴스를 만들어서 input 변수에 할당 한다.

```python
In : import io
input = io.BytesIO(b"""On output, if newline is None, any '\n'
characters written are
translated to the system default line separator,
os.linesep.""")
```

파일을 생성하는 TextIOWrapper 클래스를 가지고 BytesIO의 인스턴스를 넣어서 한 파 일의 인스턴스를 만들었다. wrapper를 출력해보면 파일이 만들어진 것을 알 수 있다. 한 파일이 아닌 임시로 메모리에 저장된 BytesIO이다.

이 파일을 read 메서드로 읽고 파일을 닫는다. 그리고 나서 파일의 상태를 확인하면 닫혀 있는 것을 알 수 있다.

```python
In : wrapper = io.TextIOWrapper(input,
encoding="utf-8")
print(wrapper)
print(wrapper.read())
wrapper.close()
print(wrapper.closed)
Out: <_io.TextIOWrapper encoding='utf-8'>
On output, if newline is None, any '
' characters written are
translated to the system default line separator, os.linesep.
True
```
