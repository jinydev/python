---
layout: default
title: "18.03 TextIO"
---

# 18.03 TextIO

파이썬에서 제공되는 문자열인 유니코드 텍스트 처리를 위한 추상 클래스 및 파일 처리 방 식을 이해해보겠다. 기본적인 텍스트에 대한 대부분의 메서드 등도 이번 장에서 설명하기 로 하겠다.

파이썬에서 파일을 컨텍스트 매니저를 통해 읽는 방식에 대해서도 알아보고 암호화와 복 호화를 하면 텍스트에서 바이트로, 바이트에서 텍스트로 변환되는 방법도 알아보겠다.

## 18.3.1 TextIO 추상 구조 확인

텍스트가 처리되는 구조를 알아보기 위해 텍스트 파일을 생성해서 처리하는 순서대로 이 해해보자.

예제 18-14 : 텍스트 파일 처리

텍스트 파일은 TextIOWrapper 클래스로 만들어지는 것을 알 수 있다. 추상 클래스는 TextIOBase이다.

```python
In : import io
print(io.TextIOBase)
print(io.TextIOBase.__bases__)
print(io.TextIOWrapper.__bases__)
Out: <class 'io.TextIOBase'>
(<class '_io._TextIOBase'>, <class 'io.IOBase'>)
(<class '_io._TextIOBase'>,)
```

주피터 노트북의 매직 커맨드 %%writefile를 이용해서 하나의 text 파일을 생성한다.

```python
In : %%writefile text_data.txt
파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다.

```python
Out: Writing text_data.txt
```

텍스트 파일을 읽어올 때 반드시 텍스트 모드를 지정해서 읽으면 파일은 TextIOWrap per 기준으로 된다. 텍스트일 경우는 사용할 수 있는 문자 코드 집합을 지정해서 사용할 수 있다. 윈도우에서 처리할 때는 텍스트가 윈도우 내의 문자 코드일 경우 유니코드로 변 환해서 처리할 필요가 있어 encoding에 utf-8을 지정하고 유니코드로 변환해서 처리하 는 것이 좋다. 파이썬 3 버전부터 텍스트 처리 기준이 유니코드이기 때문이다.

```python
In : f = open("text_data.txt",'rt',encoding="utf-8")
print(f)
Out: <_io.TextIOWrapper name='text_data.txt' mode='rt' encoding='utf-8'>
```

파일을 읽어올 때 모드를 바이트로 처리하면 TextIOWrapper 클래스가 아닌 Buffered IOReader 클래스로 처리되는 것을 알 수 있다. 바이트 처리할 때는 인코딩 처리가 없다.

```python
In : b = open("text_data.txt",'rb')
print(b)
Out: <_io.BufferedReader name='text_data.txt'>
```

파일을 읽어서 상속 관계를 확인해보면 TextIOBase, TextIOWrapper를 상속해서 만들 어졌다.

for문을 통해 파일을 출력하면 print문에도 개행 문자가 있어서 print문 내의 end= “ ”로 처리해야 빈 라인 없이 출력된다.

```python
In : import io
f = open("text_data.txt",'rt',encoding="utf-8")
print(f)
print(issubclass(type(f), io.TextIOBase))
print(issubclass(type(f), io.TextIOWrapper))
for i in f :
print(i, end="")
f.close()
Out: <_io.TextIOWrapper name='text_data.txt' mode='rt' encoding='utf-8'>
True
True
파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다.

파일도 내부의 원소는 라인이므로 반복형과 반복자에 대한 형태로 처리된다. 위의 예제일 경우처럼 반복이 가능하므로 for문으로 처리가 가능했다. 상속 관계를 확인해보면 반복형 이면서 반복자라는 것을 알 수 있어 next 함수로 파일을 호출하고 하나의 라인씩 불러서 출력할 수 있다.

```python
In : import collections.abc as cols
f = open("text_data.txt",'rt',encoding="utf-8")
print(issubclass(type(f), cols.Iterable))
print(issubclass(type(f), cols.Iterator))
print(next(f), end=" ")
print(next(f), end=" ")
print(next(f), end=" ")
Out: True
True
파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다.

---------------------------------------------------------------------

| StopIteration | Traceback (most recent call last) |

|---|---|

<ipython-input-19-025316a5dc38> in <module>() 8 print(next(f), end=" ") 9 print(next(f), end=" ") ---> 10 print(next(f), end=" ") StopIteration:

## 18.3.2 StringIO 클래스

파이썬에서 텍스트도 ByteIO처럼 파일을 사용하지 않고 임시로 저장해서 사용할 수 있는 클래스를 지원한다. 이 클래스가 StringIO이고 IO 모듈 내에 있다.

예제 18-15 : 텍스트 임시 파일 처리

문자열 임시 처리인 StringIO도 문자 처리이므로 Text 기반으로 처리된다. 처리는 Text IOBase 클래스를 기준으로 텍스트를 처리하는 클래스라는 것을 확인할 수 있다.

```python
In : import io
print(io.StringIO.__bases__)
print(issubclass(io.StringIO, io.TextIOWrapper))
Out: (<class '_io._TextIOBase'>,)
False
```

파일을 생성해서 확인하면 TextIOBase를 상속받아 처리하는 것을 알 수가 있다. String IO로 인스턴스를 만들고 write 메서드를 이용해서 파일을 갱신하면 메모리에 데이터를 갱신한다. 출력을 하면서 데이터를 조회할 경우에는 getvalue 메서드를 이용하면 저장된 문자열을 출력한다.

```python
In : import io
output = io.StringIO()
```

output.write("텍스트 임시 파일 처리\n") output.write("라인을 처리가 가능") print(output) print(output.getvalue())

```python
Out: <_io.StringIO object at 0x10f2d9f78>
```

텍스트 임시 파일 처리 라인을 처리가 가능 파일처럼 read, readline 등으로 조회하기 위해 다시 seek 메서드를 이용해서 첫 번째 위 치로 이동한다. 라인별로 읽고 출력한다. 파일을 다 사용하면 닫는 것처럼 StringIO 객체 도 다 사용하면 close 메서드로 이 임시 파일을 종료한다.

```python
In : output.seek(0)
print(output.readline(),end=" ")
print(output.readline(),end=" ")
output.close()
Out: 텍스트 임시 파일 처리
라인을 처리가 가능
```

StringIO에 인스턴스를 하나 만들고 문자를 읽고 쓰기가 가능한지를 확인해보면 둘 다

True라고 출력되는 것을 알 수 있다.

```python
In : import io
output = io.StringIO()
```

output.write("텍스트 임시 파일 처리\n") output.write("왜 쓰고 읽고가 다 가능한지? ") print(output.writable()) print(output.readable())

```python
Out: True
True
```

## 18.3.3 파일에 대한 처리 객체 이해하기

TextIOWrapper 클래스로 직접 인스턴스도 만들어서 처리해봤다. 이제 이 클래스 내의 속성과 메서드들을 확인해본다.

파일도 반복형이고 반복자이기에 처리된 경우 for 순환문에서 반복해서 처리가 가능하다.

파일을 open하고 read/write 처리하는 법을 알아보겠다.

예제 18-16 : TextIOWrapper 이해하기

파일을 하나 만들고 이 파일을 open해서 type을 조사하면 TextIOWrapper 클래스이다.

이 내부의 속성을 확인하면 파일의 이름과 모드 그리고 인코딩에 대한 정보를 확인할 수 있다.

```python
In : import io
f = open("text_data.txt",'rt',encoding="utf-8")
print(f)
print(f.name)
print(f.mode)
print(f.encoding)
Out: <_io.TextIOWrapper name='text_data.txt' mode='rt' encoding='utf-8'>
text_data.txt
rt
utf-8
```

내부의 속성과 메서드를 확인하면 일반적인 파일 처리 메서드들이 구현되어 있는 것을 알 수 있다.

```python
In : import io
count = 1
for i in dir(io.TextIOWrapper) :
if not i.startswith("_") :
print(i, end=" ")
if count % 5 == 0 :
print()
count += 1
Out: buffer close closed detach encoding
errors fileno flush isatty line_buffering
name newlines read readable readline
readlines seek seekable tell truncate
writable write writelines
```

추상 클래스 TextIOBase 내에서 정의된 메서드 외에 추가적으로 구현된 메서드나 속성 을 확인한다.

```python
In : tw = set(dir(io.TextIOWrapper))
tb = set(dir(io.TextIOBase))
print(tw - tb)
Out: {'buffer', '_CHUNK_SIZE', 'name', 'line_buffering', '_finalizing', '__
getstate__'}
```

추가된 것 중 buffer는 바이트 처리이므로 이를 읽으면 바이트로 출력되는 것을 확인할 수 있다. 이런 것은 텍스트로 처리하지만 내부적으로 바이트로도 지원하는 것을 알 수 있다.

```python
In : import io
f = open("text_data.txt",'rt',encoding="utf-8")
print(f)
print(f.buffer)
print(f.line_buffering)
print(f.buffer.readlines())
Out: <_io.TextIOWrapper name='text_data.txt' mode='rt' encoding='utf-8'>
<_io.BufferedReader name='text_data.txt'>
False
[b'\xed\x8c\x8c\xec\x9d\xbc\xec\x9d\x84 \xec\xb2\x98\xeb\xa6\xac\
xed\x95\xb4 \xeb\xb3\xb4\xea\xb8\xb0\r\n', b'\xec\x9c\xa0\xeb\x8b\x88\
xec\xbd\x94\xeb\x93\x9c \xeb\xac\xb8\xec\x9e\x90\xec\x97\xb4 \xed\x85\
x8d\xec\x8a\xa4\xed\x8a\xb8\xeb\xa5\xbc \xec\xb2\x98\xeb\xa6\xac\xed\
x95\x9c\xeb\x8b\xa4.']
```

## 18.3.4 컨텍스트 제어문 : with

컨텍스트 관리자를 사용하면 원할 때 정확하게 자원을 할당 및 해제할 수 있다. 컨텍스트 관리자로 파이썬에서는 with문을 사용하고 _ _enter_ _, _ _exit_ _ 메서드로 내부에 정의 되어 있는 것을 실행하고 종료한다.

예제 18-17 : 컨텍스트 매니저로 파일 처리

파일을 오픈하고 _ _enter_ _ 메서드로 이 파일을 컨텍스트 매니저로 처리하도록 한다. 파 일을 for문으로 처리하고 _ _exit_ _으로 닫는다. 이 파일의 종료 여부를 closed 속성으로 확인하면 True로 나오므로 이 파일의 처리가 종료되었다는 것을 확인할 수 있다.

```python
In : f = open("text_data.txt",'rt',encoding="utf-8")
f.__enter__()
for i in f :
print(i, end=" ")
f.__exit__()
print(f)
print(f.closed)
print(f.read())
Out: 파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다. <_io.TextIOWrapper name='text_data.txt' mode='rt' encoding='utf-8'> True ---------------------------------------------------------------------

| ValueError | Traceback (most recent call last) |

|---|---|

<ipython-input-51-5065995d1f01> in <module>() 10 print(f) 11 print(f.closed) ---> 12 print(f.read()) ValueError: IO operation on closed file. With 구문을 이용해서 헤더 부분에 파일을 open 함수로 열고 as 다음에 변수를 배정하면 위의 예제에 _ _enter_ _ 메서드로 들어가는 것과 동일하다.

순환문 처리가 끝나면 자동으로 _ _exit_ _메서드를 호출해서 파일이 닫히므로 이 with문 이후에 파일을 처리하려면 종료가 된 것을 알 수 있다.

```python
In : with open("text_data.txt",'rt',encoding="utf-8") as f :
for i in f :
print(i, end=" ")
print(f)
print(f.closed)
print(f.read())
Out: 파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다. <_io.TextIOWrapper name='text_data.txt' mode='rt' encoding='utf-8'> True ---------------------------------------------------------------------

| ValueError | Traceback (most recent call last) |

|---|---|

<ipython-input-52-846f9d0df1e5> in <module>() 5 print(f) 6 print(f.closed) ----> 7 print(f.read()) ValueError: IO operation on closed file.

## 18.3.5 파일을 메서드 확인하기

파일 읽기 메서드는 라인, 라인 전체, 블록 단위로 읽는 메서드들이 있다.

파일도 여러 라인 쓰기, 블록 단위로 쓰기, 또는 print 함수를 이용해서 파일을 작성하는 방법이 있다.

예제 18-18 : 파일을 연결해서 쓰고 읽기

기존 파일이 존재하면 a 모드는 파일을 open하고 파일의 맨 마지막 부분에 추가하라는 뜻이다. 이 파일을 오픈해보면 기존 파일 뒤에 방금 write한 것을 볼 수 있다.

```python
In : with open("text_data.txt",'at',encoding="utf-8") as f :
```

f.write("파일에 붙여 쓰기") with open("text_data.txt",'rt',encoding="utf-8") as f :

print(f.read())

```python
Out: 파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다.파일에 붙여 쓰기 위에 정의된 파일을 열고 라인별로 읽어서 출력한다. 파일이 라인별로 개행 문자를 관리 하므로 라인과 라인 사이에 빈 라인이 출력된다.

```python
In : with open("text_data.txt",'rt',encoding="utf-8") as f :
for _ in range(3) :
print(f.readline())
Out: 파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다.파일에 붙여 쓰기 파일을 open하고 read 메서드에 특정한 길이로 읽어서 파일을 출력한다. 라인 단위로 읽 지 않기에 주어진 파일을 특정 길이만큼만 읽을 수 있어서 라인 단위로 읽는 것보다 더 다

양하게 읽고 처리가 가능하다.

```python
In : with open("text_data.txt",'rt',encoding="utf-8") as f :
print(f.read(20))
Out: 파일을 처리해보기
유니코드 문자열
```

특정 문자열에 여러 개의 개행 문자를 포함했고 이것을 한번에 파일로 썼다. 읽어오면 개 행 문자에 따라 여러 라인으로 분리되어서 읽어야 한다.

여러 라인을 파일에 쓸 때도 개행 문자가 항상 라인 끝에 오도록 정리해서 write할 필요가 있다.

```python
In : with open("text_data.txt",'at',encoding="utf-8") as f :
a = """
```

set things up에는 file을 열거나 외부 리소스와 같은 것을 얻는 처리가 해당되고, tear things down에는 file을 닫거나 리소스를 제거, 해제하는 처리가 해당된다.

이와 같은 try-finally 구조는 코드가 제대로 동작하지 않고 끝나더라도 tear things down은 무조건 실행되는 것을 보장한다.

""" f.writelines(a) with open("text_data.txt",'rt',encoding="utf-8") as f :

print(f.read())

```python
Out: 파일을 처리해보기
```

유니코드 문자열 텍스트를 처리한다.파일에 붙여 쓰기 set things up에는 file을 열거나 외부 리소스와 같은 것을 얻는 처리가 해당되고, tear things down에는 file을 닫거나 리소스를 제거, 해제하는 처리가 해당된다.

이와 같은 try-finally 구조는 코드가 제대로 동작하지 않고 끝나더라도 tear things down은 무조건 실행되는 것을 보장한다.

예제 18-19 : 파일을 만들고 현재 위치 알기

파일을 하나 만들어서 파일의 위치를 알고 조정하는 법을 알아보겠다. 먼저 텍스트 파일 을 하나 생성한다.

```python
In : %%writefile data3.txt
The module defines a mixin, DictMixin, defining all dictionary methods
for classes that already have a minimum mapping interface.
This greatly simplifies writing classes that need to be substitutable
for dictionaries (such as the shelve module).
Out: Overwriting data3.txt
```

파일을 open 함수로 열고 현재 위치를 tell 메서드로 확인하면 제일 처음이기 때문에 0을 출력한다.

```python
In : fr3 = open("data3.txt","rt", encoding="utf-8")
print(fr3.tell())
Out: O
```

파일을 특정 위치로 이동하려면 seek 메서드에 인자로 특정 위치를 지정하면 된다. 이동 된 현재 위치를 알려면 tell 메서드를 실행해서 현재 위치를 확인한다. 다시 처음으로 돌아 가려면 seek 메서드에 0을 주고 처리한다.

```python
In : fr3.seek(10)
print(fr3.tell())
fr3.seek(0)
print(fr3.tell())
Out: 10
```

파일을 for문을 통해 읽으면 저장된 파일을 전부 출력한다.

```python
In : for i in fr3 :
print(i, end="")
fr3.close()
Out: The module defines a mixin, DictMixin, defining all dictionary methods
for classes that already have a minimum mapping interface.
This greatly simplifies writing classes that need to be substitutable
for dictionaries (such as the shelve module).
```

## 18.3.6 파일의 존재 및 디렉터리 처리

OS 상에서 파일을 확인하고 처리하기 위해서는 파일의 존재 및 디렉터리 위치 등을 확인 해야 한다. 특히 windows OS상의 디렉터리 처리 방식도 알아본다.

예제 18-20 : 기존 파일 존재 확인

기존 파일의 존재 여부를 체크한 후에 없으면 파일을 작성해야 한다.

모듈 OS를 import하고 path.exists 함수를 이용해서 존재 여부를 확인하면 True/False 로 정보를 전달한다.

```python
In : import os
if os.path.exists("data3.txt") :
fr3 = open("data3.txt","rt", encoding="utf-8")
for i in fr3 :
print(i,end=" ")
Out: The module defines a mixin, DictMixin, defining all dictionary methods
for classes that already have a minimum mapping interface.
This greatly simplifies writing classes that need to be substitutable
for dictionaries (such as the shelve module).
```

파일의 디렉터리와 파일 이름을 분리하려면 dirname 함수를 이용해서 디렉터리만 확인 하고 basename 함수를 사용해서 파일명만 확인한다.

윈도우 OS 처리를 위해 raw 문자열로 접근해서 처리하는 것이 편하다. 아니면 특수 문자 인 역슬래쉬 두 개로 문자열에서 표시해야 한다.

맥 OS나 리눅스일 경우는 “/”로 디렉터리를 구분해서 처리하면 된다.

```python
In : import os
print(os.path.dirname(r"C:\Users\06411\Documents\GitHub\python_book\
python_gram" ))
print(os.path.dirname("C:\\Users\\06411\\Documents\\GitHub\\python_
book\\python_gram\\"))
print(os.path.dirname(r"C:\Users\06411\Documents\GitHub\python_book\
python_gram\data3.txt"))
print(os.path.basename(r"C:\Users\06411\Documents\GitHub\python_book\
python_gram\data3.txt"))
Out: C:\Users\06411\Documents\GitHub\python_book
C:\Users\06411\Documents\GitHub\python_book\python_gram
C:\Users\06411\Documents\GitHub\python_book\python_gram
data3.txt
CHAPTER
```

다양한 바이트 처리 다른 언어에서 사용되는 배열에 대해 알아보고 이 배열도 파일을 이용해서 처리하는 방법 을 알아본다. 내장 자료형인 메모리뷰(memoryview)는 바이트 자료형에 대한 메모리 공유 를 처리해서 뷰를 보여주는 역할을 한다.

텍스트 처리를 위한 유니코드에 대한 처리 방식을 제대로 알아본다. 그리고 바이트 단위 로 언패킹이나 패킹 처리하는 struct 모듈도 알아보도록 하겠다.

마지막으로 파이썬 객체들을 보관해서 처리하는 pickle 모듈에 대해서도 알아보겠다.

✚ 알아볼 주요 내용

● C 언어 처리를 위한 array.array 모듈

● 뷰를 처리하는 memoryview로 버퍼 사용

● 텍스트 문자열인 유니코드

● struct 모듈을 이용해서 패킹과 언패킹하기

● 인스턴스나 객체를 저장하는 직렬화(pickle)
