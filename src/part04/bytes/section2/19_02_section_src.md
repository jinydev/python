---
layout: default
title: "19.02 파일"
---

# 19.02 파일

파이썬의 파일은 기본적으로는 텍스트로 처리된다. 기본적인 텍스트는 유니코드와 바이 트로 처리된다.

특히 유니코드로 변환되는 과정을 알아보고 파이썬 내장 자료형 등을 저장하기 위한 별도 의 직렬화 처리를 알아보기로 하겠다.

## 19.2.1 파일 처리 문자열 이해하기

파일 처리에서도 바이트 문자열과 유니코드 문자열이 다른 클래스로 처리되는 것을 알아 봤다. 하지만 바이트와 문자열을 처리하는 것은 혼동되는 경우가 많다. 이번에 이런 부분 을 다시 한 번 명확히 알아보자.

✚ 파일은 기본 문자열로 저장된다

파일을 생성하고 저장하면 문자열이나 바이트 문자열로 저장된다. 파이썬에서 제공되는 다른 자료형은 기본적으로 저장이 안되므로 이를 문자열로 변경해서 저장해야 한다.

예제 19-11 : 파일에 저장할 때 주의 사항

파이썬에서 파일은 텍스트(유니코드, 바이트)로 처리된다. 파이썬 자료형은 리스트를 가지고 파일에 저장하면 문자열이 아니라서 예외가 발생한다.

```python
In : l = [1,2,3]
with open("list.txt","wt") as f :
f.write(l)
Out: ---------------------------------------------------------------------
TypeError             Traceback (most recent call last)
<ipython-input-165-e8b898ae475f> in <module>()
3 with open("list.txt","wt") as f :
----> 4 f.write(l)
TypeError: write() argument must be str, not list
```

리스트를 문자열로 변환해서 저장하면 문자열로 저장된다. 파일을 읽어서 다시 이 문자열 을 리스트로 변환하면 문자열 내부가 전부 리스트의 원소로 나눠서 변환된다. 리스트가 아니라 문자열이라는 것을 알 수 있다.

```python
In : l = [1,2,3]
with open("list.txt","wt") as f :
f.write(str(l))
with open("list.txt","rt") as f :
a = f.read()
print(type(a), a)
print(list(a))
Out: <class 'str'> [1, 2, 3]
['[', '1', ',', ' ', '2', ',', ' ', '3', ']']
```

리스트 자료형을 파일로 저장하려면 각 문자열로 저장한 뒤 바이트로 처리해서 저장해야 한다. 저장된 문자열을 다시 읽으면 바이트 문자열로 저장된 것을 확인할 수 있다.

별도의 리스트에서 요소를 뽑아 문자열로 저장한 것을 다시 int로 변환해서 리스트에 append하면 리스트로 처리되는 것을 알 수 있다.

```python
In : l = [1,2,3]
with open("list.txt","wt") as f :
for i in l :
f.write(str(i))
with open("list.txt","rt") as f :
ll = []
a = f.read()
for i in a :
ll.append(int(i))
print(ll)
Out: [1, 2, 3]
```

## 19.2.2 유니코드 이해하기

문자열 처리 유니코드일 경우 코드 포인트(code point)가 중요하다. 각 코드들이 어떻게 구 성되어 있는지를 이해해야 한다.

유니코드로 변환할 때는 다양한 인코딩 처리가 있다.

● UTF-8의 코드 단위는 8비트로 구성된 고정되지 않는 바이트 문자이다.

● UTF-16의 코드 단위는 16비트로 구성된 고정 문자이다.

● UTF-32의 코드 단위는 32비트로 구성된 고정 문자이다.

예제 19-12 : 한글 문자열을 바이트로 변환하기

한글 처리를 위해 unicodedata 모듈을 이용해서 어떻게 유니코드에 저장되어 있는지를 확인한다.

```python
In : import unicodedata
c = "위"
d = unicodedata.category(c)
print(d)
n = unicodedata.name(c)
print(n)
print(unicodedata.lookup(n))
Out: Lo
HANGUL SYLLABLE WI
위
```

문자열을 바이트 문자열로 전환할 때 utf-8로 처리하면 3의 문자열로 전환된다.

```python
In : u = "가을"
a = u.encode("utf-8")
print(a)
print(a.decode("utf-8"))
Out: b'\xea\xb0\x80\xec\x9d\x84'
가을
```

한글 유니코드 문자열을 가지고 바이트 문자열로 변환할 때 인코딩을 utf-16로 처리하면 맨 앞에 fffe가 출력되고 2바이트 단위로 한글이 변환되어 나오는 것을 볼 수 있다.

```python
In : u = "가을"
a = u.encode("utf-16")
print(a)
print(a.decode("utf-16"))
Out: b'\xff\xfe\x00\xacD\xc7'
가을
```

한글을 변환할 때 한글이 처리되어 저장되는 바이트의 순서를 엔디언으로 관리한다. 유니 코드의 문자 코드를 확인하면 플랜과 문자의 위치가 16진수로 표시되어 저장된다.

리틀 엔디언(little endian)으로 처리하면 이 문자 코드를 역전해서 표시한다. 유니코드를 확 인해서 리틀 엔디언으로 인코딩하고 변환한 것을 확인해보면 유니코드의 문자 코드가 반 대로 저장된 것을 알 수 있다.

```python
In : u = "가을"
print("\uac00")
print("\uc744")
a = u.encode("utf-16le")
print(a)
print(a.decode("utf-16le"))
Out: 가
을
b'\x00\xacD\xc7'
가을
```

빅 엔디언(big endian)으로 인코딩해서 변환하면 유니코드의 문자 코드로 변환된 것을 알 수 있다.

```python
In : u = "가을"
a = u.encode("utf-16be")
print(a)
print(a.decode("utf-16be"))
Out: b'\xac\x00\xc7D'
가을
```

한글 유니코드 문자열을 가지고 바이트 문자열로 변환할 때 encoding을 utf-32로 처리 하면 맨 앞에 fffe가 출력되고 4바이트 단위로 한글이 변환되어 나오는 것을 볼 수 있다.

```python
In : u = "가을"
a = u.encode("utf-32")
print(a)
print(a.decode("utf-32"))
Out: b'\xff\xfe\x00\x00\x00\xac\x00\x00D\xc7\x00\x00'
가을
```

utf-32le로 처리하면 리틀 엔디언으로 표시되지만 앞자리에 x00이 하나씩 더 들어가 있 는 것을 알 수 있다.

```python
In : u = "가을"
print("\uac00")
print("\uc744")
a = u.encode("utf-32le")
print(a)
print(a.decode("utf-32le"))
Out: 가
을
b'\x00\xac\x00\x00D\xc7\x00\x00'
가을
```

인코딩을 utf-32be 즉 빅 엔디언으로 처리하면 뒤에 16진수로 00이 더 들어가 있는 것을 알 수 있다.

```python
In : u = "가을"
a = u.encode("utf-32be")
print(a)
print(a.decode("utf-32be"))
Out: b'\x00\x00\xac\x00\x00\x00\xc7D'
가을
✚ 엔디언이란
```

위의 예제에서 문자가 바뀌는 것을 가지고 엔디언이 구성되는 원리는 이해했다. 왜 변환 할 때 이런 규칙을 만들어서 사용하는지를 알아보겠다.

컴퓨터는 메모리나 디스크에 비트 스트림으로 데이터를 보관한다. 이 데이터들을 사람이 이해하기 위한 단위로 처리하기 위해서는 세부적인 규칙이 필요하다. 유니코드 등 다양한 문자 코드가 있지만 사용되는 규칙이 통일된 유니코드가 나오면서 다양한 언어가 수용되 었다. 하지만 지금도 다양한 문자 코드가 사용되므로 파일 등 IO에서 어떻게 바이트를 묶 어서 문자로 전환하는지를 규격화해야 한다.

이를 지원하기 위해 문자로 작성될 때 인코딩과 엔디언을 사용해서 문자를 처리하는 방법 을 정의했다. 이를 다른 말로는 바이트 순서(Byte order)라 하고 내부적으로 엔디언을 사용 한다.

● 엔디언은 보통 큰 단위가 앞에 나오는 빅 엔디언(Big-endian)이다. 보통 유니코

드일 경우는 플랜으로 각 언어를 구분하고 코드로 다양한 언어를 매칭해서 처리 한다. 바이트 순서를 표시하는 기호는 빅 엔디언일 때는 \xfe\xff를 명기해서 사 용한다.

● 작은 단위가 앞에 나오는 리틀 엔디언(Little-endian)으로 나눌 수 있다. 유니코드

일 경우는 문자를 지정하는 코드가 먼저 오고 언어를 알려주는 플랜이 뒤에 온다.

또한 기호는 리틀 엔디언일 경우는 \xff\xfe가 앞에 붙는다.

예제 19-13 : 엔디언 이해하기

utf-16은 2바이트로 저장되므로 각 숫자별로 저장된 것을 알 수 있다. 빅 엔디언은 뒤에 서부터 숫자가 저장되고 빈 공간을 그 다음 저장한다. 리틀 엔디언은 숫자부터 저장하고 뒤에 빈 공간을 저장한다.

```python
In : hi = 255
si = str(hi)
print(si.encode('utf-16le'))
print(si.encode('utf-16be'))
Out: b'2\x005\x005\x00'
b'\x002\x005\x005'
```

✚ UTF-8 인코딩

가장 많이 사용하는 UTF-8 인코딩은 유니코드를 한 바이트부터 네 바이트까지로 변경해 서 사용한다. 특징은 1~4바이트의 가변 길이를 가지는 멀티바이트 캐릭터 형식이라는 점 이다. 때문에 아스키 코드와 하위 호환성을 가진다. 아스키 코드의 0~127까지는 UTF-8 로 완전히 동일하게 기록된다.

예제 19-14 : Utf-8 변환 예시

유니코드에서 바이트로 변환될 때 바뀌는 바이트 수가 고정된 것이 아니므로 유니코드를 넣고 문자열을 가져오면 utf-16be로 처리하는 것을 볼 수 있다. 이 문자를 utf-8로 변환 하면 2바이트로 변환되는 것을 알 수 있다.

```python
In : u = '\u0700'
print(u)
```

print('◊'.encode("utf-16be")) print('◊'.encode("utf-8"))

```python
Out: ◊
b'\x07\x00'
b'\xdc\x80'
```

유니코드가 08부터 ff까지는 3바이트로 변환이 가능하므로 변환할 때 이 규칙에 따라 3바 이트로 변환된다.

```python
In : u2 = '\uff01'
print(u2)
```

print('！'.encode("utf-16be")) print('！'.encode("utf-8"))

```python
Out: ！
b'\xff\x01'
b'\xef\xbc\x81'
```

유니코드를 8자리로 표시할 때는 대문자 U를 사용하고 총 숫자도 8개로 넣어서 처리해야 한다. 임의의 문자가 들어가 있고 이를 utf-8로 변환하면 4바이트로 처리된다.

```python
In : u3 = '\U0001ff01'
print(u3)
```

print('□'.encode("utf-16be")) print('□'.encode("utf-8"))

```python
Out: □
b'\xd8?\xdf\x01'
b'\xf0\x9f\xbc\x81'
✚ 한글 변환
```

유니코드가 기본인 파이썬 문자열은 한글도 사용되지만 한글을 바이트로 변환하면 문자에 서 바이트로 변환된다. 특히 utf-8로 변환하면 3바이트로 변환되는 것을 알 수 있다.

일단 Unicodedata 모듈을 확인해서 어떻게 관리되는지를 확인해보겠다.

예제 19-15 : 한글을 유니코드로 전환하기

유니코드가 파이썬 기본 문자열이고 한글도 전부 문자열로 되어 있다. 내부적으로 변환되 는 기본을 이해해야 한다.

“한”, ”글” 이라는 단어를 기준으로 유니코드 내의 범주(category)와 글자(lookup) 그리고 그 글자의 이름(name)을 조회해서 출력한다.

```python
In : h = '\ud55c'
h2 = '\uae00'
print(h)
print(h2)
for i in [h,h2] :
print(i," %4x " % ord(i), end=" ")
print(unicodedata.category(i), end=" ")
print(unicodedata.lookup(unicodedata.name(i)), end = " ")
print(unicodedata.name(i))
Out: 한
글
```

한 d55c Lo 한 HANGUL SYLLABLE HAN 글 ae00 Lo 글 HANGUL SYLLABLE GEUL 한글도 통합된 코드와 분리된 코드 2가지를 지원한다. “위”에 대한 한글 분리 코드가 ‘\u110b’ + ‘\u1171’인데 정규화 처리를 NFC로 하면 통합된 코드인 ‘\uc704’로 처리 한다.

```python
In : h = '\u110b'
h2 = '\u1171'
print(h)
print(h2)
a = unicodedata.normalize("NFC",h+h2)
print(a.encode("utf-16be"))
Out: ◦
ㅟ
b'\xc7\x04'
```

“위”에 대한 한글 통합 코드가 ‘\uc704’이고 이를 NFD 분리하면 한글이 분할되어 두 개의 유니코드 ‘\u110b’ + ‘\u1171’로 표현한다. 영문자 q를 숫자로 바꾸고 hex로 변환하면 71이라는 것을 알 수 있다.

```python
In : h3 = "\uc704"
print(h3)
b = unicodedata.normalize("NFD","\uc704")
print(b.encode("utf-16be"))
print(hex(ord('q')))
Out: 위
b'\x11\x0b\x11q'
0x71
```

## 19.2.3 struct 모듈

이 모듈은 파이썬 바이트 객체로 표현된 파이썬 값과 C 구조체 사이의 변환을 수행한다.

이 파일은 다른 소스와 마찬가지로 파일이나 네트워크 연결에 저장된 바이너리 데이터를 처리하는 데 사용할 수 있다.

Format String을 C 구조체의 레이아웃에 대한 간략한 설명과 파이썬 값으로부터 의도된 변환으로 사용한다.

예제 19-16 : 문자열 및 정수 packing과 unpacking하기

정수를 “hhl” short integer(2바이트), long integer(4바이트)로 해서 하나로 묶어 바이트로 표시하고 이를 다시 각각의 수로 분리하는 것이다.

```python
In : import struct
import array
a = array.typecodes
print(a)
Out: bBuhHiIlLqQfd
```

calsize 함수를 이용해서 특정 타입 코드들이 몇 바이트로 구성된 길이를 갖는지를 확인할 수 있다.

```python
In : s = a[3]+a[3]+a[7]
print(s)
print(struct.calcsize(s[0]), "bytes")
print(struct.calcsize(s[2]), "bytes")
print(struct.calcsize(s), "bytes")
Out: hhl
2 bytes
4 bytes
8 bytes
```

정수 1, 2, 3을 “hhl”로 packing하면 총 8바이트로 구성되어 처리하고 이를 가지고 다시 unpacking을 처리하면 튜플로 나눠서 처리한다.

```python
In : import struct
a = struct.pack("hhl",1,2,3)
print(a)
b = struct.unpack('hhl',a)
print(b)
Out: b'\x01\x00\x02\x00\x03\x00\x00\x00'
(1, 2, 3)
```

바이트 문자열을 특정 사이즈별로 나눠서 unpacking도 가능하며, 좌측부터 처리하는 < 표시를 하고 문자열 10자리(10s), 두 바이트 정수(h) , 네 바이트 정수(i)로 나눠서 변수에 할당하여 처리한다.

```python
In : s = b"abcdefghij\x01\x00\x02\x00\x03\x00\x00\x00"
print(len(s))
fmt = "<10shhl"
print(struct.calcsize(fmt), "bytes")
a = struct.unpack(fmt,s)
print(a)
Out: 18
18 bytes
(b'abcdefghij', 1, 2, 3)
```

연속으로 구성된 문자열을 전부 문자로 처리하기 위해 타입 코드 s와 숫자로 길이를 표시 해서 5s 처리하면 문자열로 묶인다. 세부적으로 unpacking하고 sssss로 분리해서 표시하 면 문자열이 문자로 분리되어 처리되는 것을 알 수 있다.

```python
In : import struct
b = b"hello"
s5 = struct.unpack('5s', b)
print(s5)
s51 = struct.unpack('sssss', b)
print(s51)
Out: (b'hello',)
(b'h', b'e', b'l', b'l', b'o')
```

예제 19-17 : Array.array 모듈을 가지고 struct 모듈 처리하기

Long Integer는 4bytes 단위로 숫자를 분리해서 표시하므로 두 개의 정수가 4바이트씩 변환된 것을 확인할 수 있다.

Long 자료형에서 int 자료형으로 변환하면서 unpacking하고 두 개의 변수에 할당해서 처리한다.

```python
In : import array
import struct
a = array.array('l',[1,2])
print(a.tobytes())
print(struct.calcsize("<ii"))
s = struct.unpack('<ii',a)
print(s)
Out: b'\x01\x00\x00\x00\x02\x00\x00\x00'
(1, 2)
```

B는 unsinged char, b는 singed char로 packing을 하므로 숫자로 나열한 것을 묶으면 문자열로 전환된다.

```python
In : import array
import struct
a = [ ord(x) for x in "hello"]
print(a)
s = struct.pack(b'bbbbb',*a)
print(s)
s = struct.pack('BBBBB',*a)
print(s)
Out: [104, 101, 108, 108, 111]
b'hello'
b'hello'
```

Array 모듈로 만든 배열의 숫자도 packing해서 처리하면 바이트 문자열로 변환되는 것을 알 수 있다.

```python
In : import array
import struct
a = array.array('b', b"hello")
print(a)
s = struct.pack(b'bbbbb',*a)
print(s)
s = struct.pack('BBBBB',*a)
print(s)
Out: array('b', [104, 101, 108, 108, 111])
b'hello'
b'hello'
```
