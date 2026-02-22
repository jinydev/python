---
layout: default
title: "18.01 IO"
---

# 18.01 IO

파이썬에서 IO 처리에 필요한 추상 클래스를 먼저 이해하고 IO가 발생할 때 어떤 기준으 로 연결되어 처리가 되는지를 알아보겠다.

일단 컴퓨터는 바이트나 비트 스트림을 처리하고 사람은 텍스트로 작성하므로 이에 대한 변환을 내부적으로 해줘야 한다.

일단 바이트와 텍스트 처리를 위해 우리가 작성하는 파일 등에 어떤 추상 클래스가 사용되 는지를 알아보겠다.

## 18.1.1 IO 상속 관계

파이썬에서는 IO 처리를 하기 위한 최상위 클래스를 정의해서 그 내부에 기본적으로 처리 하는 기능을 가지고 있고 구현되는 클래스에서 재정의를 하거나 추가적인 메서드들을 정 의해서 처리한다.

IO 모듈 내에는 추상화 클래스 및 일부 구현 클래스가 존재하며 최상위 추상 클래스를 확 인하면 IOBase 클래스가 있고 이 클래스는 다양한 추상 클래스를 만들 때 사용되는 것을 확인할 수 있다.

✚ IOBase 클래스

바이트의 스트림에 작용하는 모든 IO 클래스의 추상 기본 클래스이다. 추상 클래스는 생 성을 할 수 없는 클래스이고 다른 추상화 클래스 생성을 위한 최상위 클래스로만 사용 된다.

예제 18-1 : IO에 대한 최상위 추상 클래스 확인하기

추상 메타 클래스인 abc.ABCMeta로 IOBase 클래스가 만들어졌으므로 추상 클래스 이다. 상속 관계와 메타 클래스에 대해 조회해보면 이 클래스가 어떻게 만들어져 있는지 알 수 있다.

```python
In : import io
print(io.IOBase)
print(io.IOBase.__bases__)
print(io.IOBase.__bases__[0].__bases__)
print(io.IOBase.__class__)
print(io.IOBase.__class__.__bases__)
Out: <class 'io.IOBase'>
(<class '_io._IOBase'>,)
(<class 'object'>,)
<class 'abc.ABCMeta'>
(<class 'type'>,)
```

IO를 처리하기 위한 메서드를 확인해보면 파일을 읽고, 쓰고, 조정하는 것에 대한 기본적 인 사항을 제공한다.

이 클래스를 상속하면 메서드들이 지정되어 있고 구현 클래스에서 이 메서드들을 구현하 여 처리하고 있다.

이 메서드들을 보면 파일을 읽고, 쓰는 것을 대부분 제공하는 것을 알 수 있다.

```python
In : for i in dir(io.IOBase) :
if not i.startswith("_") :
print(i)
Out: close
closed
fileno
flush
isatty
readable
readline
readlines
seek
seekable
tell
truncate
writable
writelines
```

## 18.1.2 Raw, Bytes, Text 추상 클래스 관계

최상위 클래스를 알았으니 이제는 Raw, Bytes, Text 단위로 처리하는 최상위 추상 클래 스에 대해 알아보겠다.

IO를 처리하는 것은 이미지와 같은 바이너리, 문자를 처리하는 바이트나 텍스트 등의 파 일 처리와 유사하다. 이런 개념을 기준으로 처리하기 위해서 내부적인 기능이 추가가 필 요하므로 어떤 기능이 추가되었는지도 알아보겠다.

파이썬에서는 이런 추상 클래스 3가지(RawIOBase, BufferedIOBase, TextIOBase)를 제공 한다. 이 클래스가 어떤 구조를 가지는지를 알아본다.

✚ RawIOBase

RawIOBase는 IOBase를 상속받아 구현되어 있고 일반적으로 기본 OS 장치 또는 API에 대한 하위 수준 액세스를 제공하는 파일 구조만 처리된다.

예제 18-2 : io.RawIOBase 클래스 확인하기

어떤 클래스를 상속했는지를 보고 바이너리 처리를 위해 필요한 내부 속성이나 메서드를 확인해보겠다. 사용하기 위한 추상 클래스를 확인해보면 IOBase 추상 클래스를 상속해서 만든 것을 확인할 수 있다.

```python
In : import io
print(io.RawIOBase)
print(io.RawIOBase.__class__)
print(io.RawIOBase.__bases__)
print(issubclass(io.RawIOBase, io.IOBase))
Out: <class 'io.RawIOBase'>
<class 'abc.ABCMeta'>
(<class '_io._RawIOBase'>, <class 'io.IOBase'>)
True
```

최상위 클래스인 IOBase에 없는 4개의 메서드가 추가된 것을 볼 수 있다.

```python
In : raw = set(dir(io.RawIOBase))
base = set(dir(io.IOBase))
print(raw - base)
Out: {'read', 'write', 'readinto', 'readall'}
```

✚ BufferedIOBase

BufferedIOBase는 원시 바이트 스트림(RawIOBase)을 버퍼링해서 바이트 단위로 처리를 한다. 이 서브 클래스에는 BufferedWriter, BufferedReader, 및 BufferedRWPair가 있 고 이들은 버퍼 스트림 읽기, 쓰기를 지원하며, BufferedRandom은 랜덤 액세스 스트림 에 대한 버퍼 인터페이스를 제공한다.

예제 18-3 : io.BufferedIOBase 클래스 확인하기

BufferedIOBase 내의 상속 관계를 확인한다. 추상 클래스이므로 메타 클래스도 추상 메 타 클래스로 만들어진 것을 확인할 수 있다.

```python
In : import io
print(io.BufferedIOBase)
print(io.BufferedIOBase.__class__)
print(io.BufferedIOBase.__bases__)
print(issubclass(io.BufferedIOBase, io.IOBase))
Out: <class 'io.BufferedIOBase'>
<class 'abc.ABCMeta'>
(<class '_io._BufferedIOBase'>, <class 'io.IOBase'>)
True
```

BufferedIOBase 클래스에 readinto, read, write, detach 등 속성이나 메서드가 추가되 어 구현된 것을 알 수 있다.

```python
In : buffer = set(dir(io.BufferedIOBase))
base = set(dir(io.IOBase))
print(buffer - base)
Out: {'write', 'read1', 'detach', 'readinto', 'read', 'readinto1'}
```

✚ TextIOBase

IOBase의 또 다른 서브 클래스인 TextIOBase는 바이트가 텍스트를 나타내는 스트림을 처리하고 문자열과의 인코딩 및 디코딩을 처리할 수 있는 추상화 클래스이다.

구현된 클래스는 TextIOWrapper를 사용하면 이 클래스를 이용해서 파일 등에 Text 처 리를 수행한다.

예제 18-4 : io.TextIOBase 클래스 확인하기

Text를 처리하기 위한 추상 클래스도 IOBase를 상속했고 ABCMeta를 위해 만들어진 것 을 알 수 있다.

```python
In : import io
print(io.TextIOBase)
print(io.TextIOBase.__class__)
print(io.TextIOBase.__bases__)
print(issubclass(io.TextIOBase, io.IOBase))
Out: <class 'io.TextIOBase'>
<class 'abc.ABCMeta'>
(<class '_io._TextIOBase'>, <class 'io.IOBase'>)
True
```

TextIOBase 클래스에는 read, newlines, encoding, write, errors, detach 등 IOBase 클래스보다 속성이나 메서드가 추가된 것을 알 수 있다.

IOnu t:: text = set(dir(io.TextIOBase)) base = set(dir(io.IOBase)) print(text - base)

```python
Out: {'write', 'newlines', 'encoding', 'detach', 'errors', 'read'}
```

## 18.1.3 파일 모드 처리

파이썬에서는 파일을 읽고 처리할 때 IO 모듈을 별도로 지정하지 않는다. 이 파일이 모드 에 맞춰 파일로 처리할 클래스를 매칭시키므로 파일을 처리할 때 어떤 모드를 사용하는지 가 중요하다.

✚ 파일 모드(file mode)

파일을 저장하거나 읽기 위해서는 파일 모두를 지정해야 한다. 파일을 수정할 경우에도 모드를 지정하면 처리할 수 있다.

| 파일 열기 모드 | 설명 |

|---|---|

| r | 읽기 모드 - 파일을 읽기만 할 때 사용 |

| r+ | 읽고 쓰기 모드 - 파일의 내용을 읽고 쓸 때 사용 |

| a | 추가 모드 - 파일의 마지막에 새로운 내용을 추가시킬 때 사용(쓰기 전용) |

| 파일 열기 모드 | 설명 |

| a+ | 파일 끝에 추가(읽기도 가능) |

| w | 쓰기 모드 - 파일의 내용을 쓸 때 사용 |

| w+ | 읽고 쓰기(기존 파일 삭제) |

| x | 존재한 파일이 없을 때만 파일을 생성 |

| t | 텍스트 모드 - 기본 텍스트 |

| b | 바이너리 모드 - 바이너리로 처리 |

| rb | 이진 파일 읽기 전용 |

| rb+ | 이진 파일 읽고 쓰기 |

| wb+ | 이진 파일 읽고 쓰기(기존 파일 삭제) |

| ab+ | 이진 파일 끝에 추가(읽기도 가능) |

예제 18-5 : File IO 파일 열기

일반적으로 바이너리 데이터 처리는 저수준 빌딩 블록인 이미지 등에 사용된다. 파일을 오픈할 때 buffering=0를 주고 처리해야 한다.

이 이미지를 matplotlib 모듈을 이용해서 이미지를 출력하고 필요한 이미지를 구현하는 디렉터리에 넣어서 처리하도록 한다.

```python
In : import matplotlib.pyplot as plt
import matplotlib.image as mpimg
```

img = open("내사진2","rb", buffering=0) print(img) plt.imshow(mpimg.imread(img)) plt.show()

```python
Out: <_io.FileIO name='내사진2' mode='rb' closefd=True>
```

바이너리로 처리하는 것은 FileIO 추상 클래스를 지원하며 이 세부적인 상속 관계는 RawIOBase를 상속받아서 처리한다.

```python
In : print(io.FileIO)
print(io.FileIO.__bases__)
Out: <class '_io.FileIO'>
(<class '_io._RawIOBase'>,)
```

상속 관계를 확인해보면 IOBase, RawIOBase를 상속하는 것을 알 수 있다.

```python
In : print(issubclass(io.FileIO,io.IOBase))
print(issubclass(io.FileIO,io.RawIOBase))
print(issubclass(io.FileIO,io.FileIO))
print(issubclass(io.FileIO,io.BufferedIOBase))
print(issubclass(io.FileIO,io.TextIOBase))
Out: True
True
True
False
False
```

✚ 바이트 파일 처리

바이트로 파일을 읽으려면 mode에 byte라는 것을 명기해서 open해야 한다. 바이트는 인코딩, 디코딩 또는 개행 문자 변환을 하지 않아도 바이트 단위로 모든 파일의 원소에 접 근하며 비 텍스트 데이터를 다룰 사용한다.

예제 18-6 : 바이트 파일 열기

바이트 파일은 기본적으로 open 함수에서 읽고 바이트 처리는 모드에 b를 붙여서 처리해 야 한다.

일단 텍스트 파일을 하나 만들고 바이트 자료형으로 어떻게 처리되는지를 확인해보겠다.

```python
In : %%writefile data.txt
BinaryIO (also called buffered IO) expects bytes-like objects
and produces bytes objects. No encoding,
decoding, or newline translation is performed.
This category of streams can be used for all kinds of non-text data,
and also when manual control over the handling of text data is desired.
Out: Writing data.txt
```

파일을 open해보면 읽기 전용이기에 BufferedReader로 처리되고 이 상속 관계를 다시 확인해보면 BufferedIOBase를 상속했다는 것을 알 수 있다.

```python
In : import io
data = open("data.txt","rb")
print(data)
print(issubclass(type(data),io.BufferedIOBase))
print(issubclass(type(data),io.BufferedReader))
print(issubclass(type(data),io.BufferedRWPair))
print(issubclass(type(data),io.BufferedRandom))
Out: <_io.BufferedReader name='data.txt'>
True
True
False
False
```

출력하면 파일의 개행 문자까지도 전부 바이트로 출력되는 것을 알 수 있다.

```python
In : for i in data :
print(i)
data.close()
Out: b'BinaryIO (also called buffered IO) expects bytes-like objects \n'
b'and produces bytes objects. No encoding, \n'
b'decoding, or newline translation is performed. \n'
b'This category of streams can be used for all kinds of non-text data,\n'
b'and also when manual control over the handling of text data is
desired.'
```

✚ text 파일 처리

파일을 텍스트로 읽기 위한 모드가 t 즉 텍스트이다. Open 함수는 기본적으로는 t로 처리 하므로 파일을 읽으면 기본으로 텍스트 처리된다. 인코딩에 대한 기본은 OS에서 처리하 는 기준이므로 utf-8로 변환이 필요하면 반드시 인코딩을 utf-8로 처리해야 한다.

예제 18-7 : 텍스트 파일 열기

한글 파일로 텍스트 파일을 만든다.

```python
In : %%writefile data_t.txt
```

로그를 생성하는 방법 중에 가장 간단한 것으로 print()을 이용해서 현재의 상태를 화면에 출력하는 방식이다.

알고 싶은 값을 print()을 사용해서 출력하면 그뿐이다.

너무나 간단해서 로그라는 것을 모르면서도 쓰고 있다.

```python
Out: Writing data.txt
```

파일을 텍스트로 열면 TextIOWrapper로 처리된다. 맥에서는 기본적으로 utf-8 유니코 드로 처리되므로 별도의 인코딩이 없어도 되지만 윈도우에서는 cp949를 사용하므로 처리 상에 이상이 있을 경우는 인코딩을 처리할 수도 있다.

```python
In : import io
data = open("data_t.txt","rt")
print(data)
print(issubclass(type(data),io.IOBase))
print(issubclass(type(data),io.FileIO))
print(issubclass(type(data),io.TextIOBase))
print(issubclass(type(data),io.TextIOWrapper))
data.close()
Out: <_io.TextIOWrapper name='data_t.txt' mode='rt' encoding='UTF-8'>
True
False
True
True
```

이 파일을 읽어서 개행 문자를 없애고 출력한 후에 이 파일을 종료한다.

```python
In : data = open("data_t.txt","rt")
print(data)
for i in data :
print(i, end="")
data.close()
Out: <_io.TextIOWrapper name='data_t.txt' mode='rt' encoding='UTF-8'>
```

로그를 생성하는 방법 중에 가장 간단한 것으로 print()을 이용해서 현재의 상태를 화면에 출력하는 방식이다.

알고 싶은 값을 print()을 사용해서 출력하면 그뿐이다.

너무나 간단해서 로그라는 것을 모르면서도 쓰고 있다.
