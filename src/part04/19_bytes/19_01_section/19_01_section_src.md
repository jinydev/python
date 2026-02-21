---
layout: default
title: "19.01 파이썬"
---

# 19.01 파이썬

배열을 처리할 때도 바이트 단위로 관리가 필요한 모듈과 자료형이 있다. 특히 C 언 어 기준으로 IO 처리를 위해 배열을 만들어서 처리하는 방식을 제공하는 array 모듈과 memoryview 자료형에 대해서 자세히 알아보겠다.

## 19.1.1 array.array 배열 처리

모듈 arrays는 c 언어의 배열을 파이썬에서 바로 처리할 수 있는 기준을 만들어서 지원하 는 것이다. 바이트 단위로 데이터를 처리하고 동일한 데이터 타입만 배열로 처리되는 것 을 알 수 있다.

이 배열에는 타입 코드가 제공되어 이 타입 코드 기준으로 배열의 원소가 구성하는 최대의 바이트 단위가 결정된다.

바이트 처리에 대한 사항을 이해하기 위해 array.array를 파일 처리에 넣어서 세부적으로 이해해보겠다.

✚ Array 모듈 이해하기

이 모듈에 구성된 정보를 확인하는 것부터 시작하겠다.

예제 19-1 : array 모듈 확인하기

모듈 array를 import해서 내부에 있는 것을 확인하면 ArrayType 클래스, array 함수, typecodes가 있다. 함수 array는 배열을 생성할 때 사용된다.

```python
In : import array
print(array)
for i in dir(array) :
if not i.startswith("_") :
print(i)
Out: <module 'array' (built-in)>
ArrayType
array
typecodes
```

array 함수를 이용해서 정수형 배열을 생성한다. 생성된 배열의 자료형이 array. ArrayType과 동일한지를 비교하고 True로 표시한다.

```python
In : print(array.ArrayType)
a = array.array("i",[1,2,3])
print(type(a) == array.ArrayType)
Out: <class 'array.array'>
True
```

모듈 array는 특정한 타입 코드로 배열을 만들 때 내부적으로 배열된 원소의 바이트 사이 즈를 정의한다. 배열을 만들어보면 unicode를 처리하는 경우는 반드시 문자 처리를 하는 타입 코드인 u를 이용해서 만들어야 한다.

```python
In : print(array.typecodes)
for i in array.typecodes :
if i != "u" :
a = array.array(i,[1,2,3])
else :
```

a = array.array(i,['가','나','다']) print(a)

```python
Out: bBuhHiIlLqQfd
array('b', [1, 2, 3])
array('B', [1, 2, 3])
```

array('u', '가나다') array('h', [1, 2, 3]) array('H', [1, 2, 3]) array('i', [1, 2, 3]) array('I', [1, 2, 3]) array('l', [1, 2, 3]) array('L', [1, 2, 3]) array('q', [1, 2, 3]) array('Q', [1, 2, 3]) array('f', [1.0, 2.0, 3.0]) array('d', [1.0, 2.0, 3.0])

예제 19-2 : array 모듈 array 클래스 이해하기

모듈 array 내의 array 클래스 내에 있는 메서드들을 확인해본다. 이 메서드들에 대한 작 동 원리는 뒤에서 설명하겠다.

```python
In : import array
count = 1
for i in dir(array.ArrayType) :
if not i.startswith("_") :
if count % 5 == 0 :
print()
print(i, end=" ")
count += 1
Out: append buffer_info byteswap count
extend frombytes fromfile fromlist fromstring
fromunicode index insert itemsize pop
remove reverse tobytes tofile tolist
tostring tounicode typecode
```

파이썬 내장 자료형인 리스크와 비교해서 어떤 메서드가 array 모듈로 만드는 배열에 있 는지를 확인해봤다.

주로 특정 자료형으로 변환하거나 가져와서 처리하는 것이 추가된 것을 볼 수 있다.

```python
In : sl = set(dir(list))
sa = set(dir(array.ArrayType))
count = 1
for i in sa - sl :
if not i.startswith("_") :
if count % 5 == 0 :
print()
print(i, end=" ")
count += 1
Out: itemsize tounicode tostring typecode
byteswap fromunicode tolist tobytes fromstring
tofile fromlist frombytes buffer_info fromfile
```

하나의 배열을 생성해서 내부 속성을 확인하면 이 배열이 만들어진 정보와 내부적인 데이 터를 관리하는 buffer 정보는 저장된 곳의 레퍼런스와 원소의 개수에 대해서 알려준다.

그리고 typecode를 확인해보면 바이트 단위의 길이를 알 수 있지만 각 원소의 바이트 단 위는 itemsize 속성으로 확인이 가능하다.

```python
In : a = array.array("b",[1,2,3])
print(id(a))
print(a.buffer_info())
print(a.buffer_info()[0])
print(a.typecode)
print(a.itemsize)
Out: 88283824
(74726904, 3)
b
```

✚ 배열에 대한 기본 생성, 추가, 삭제 처리

리스트, ArrayType 등 배열은 기본적으로 Sequence 자료형으로 구성되어 처리된다. 이 런 순서로 메서드들을 처리하는 방식을 확인해보겠다.

예제 19-3 : 배열의 생성, 추가, 삭제 처리

파이썬 리스트에서 처리하는 배열에 대한 변경, 삭제 등의 메서드가 ArrayType에서도 유 사하게 있는지를 확인한다.

```python
In : sl = set(dir(list))
sa = set(dir(array.ArrayType))
count = 1
for i in sa & sl :
if not i.startswith("_") :
if count % 5 == 0 :
print()
print(i, end=" ")
count += 1
Out: reverse pop insert remove
count extend index append
```

배열을 생성하기 위해 타입 코드 'i'를 첫 번째 인자에 넣고 4개 원소를 가진 리스트를 두 번째 인자에 넣어서 배열을 생성한다. 리스트와 다른 점은 리터럴 표기법이 없고 항상 함 수를 통해서만 생성된다는 것이다.

```python
In : import array
a = array.array("i",[1,2,3,4])
print(a)
print(a.itemsize)
print(a.typecode)
Out: array('i', [1, 2, 3, 4])
i
```

배열의 원소를 append 메서드로 추가하고 삭제는 pop 메서드로 처리한다. 특정한 위치 에 원소를 넣는 insert와 특정한 원소의 값으로 삭제하는 remove를 처리한다.

```python
In : a.append(5)
print(a)
a.pop()
print(a)
a.insert(2,99)
print(a)
a.remove(99)
print(a)
Out: array('i', [1, 2, 3, 4, 5])
array('i', [1, 2, 3, 4])
array('i', [1, 2, 99, 3, 4])
array('i', [1, 2, 3, 4])
```

배열의 원소를 역으로 정렬하는 reverse와 동일한 원소의 개수를 확인하는 count, 특정 원소의 위치를 검색하는 index 등의 메서드가 처리된다.

```python
In : a.reverse()
print(a)
print(a.count(4), a.index(4))
Out: array('i', [4, 3, 2, 1])
1 0
```

인덱스와 슬라이스 검색에 대해서도 리스트와 동일하게 처리된다. 전체 슬라이스는 다른 배열로 생성되는 것이므로 기존 배열은 변경하지 않는다.

```python
In : print(a)
print(a[0])
b = a[:]
print(a is b)
print(b)
Out: array('i', [4, 3, 2, 1])
False
array('i', [4, 3, 2, 1])
```

슬라이스 처리된 부분을 변경하면 새로 만들어진 배열만 내부가 변경되고 기존 원본은 변 경이 되지 않는 것을 확인할 수 있다.

```python
In : c = slice(2,4)
a.reverse()
print(a[2:4])
b[c] = a[2:4]
print(b)
print(a)
Out: array('i', [3, 4])
array('i', [4, 3, 3, 4])
array('i', [1, 2, 3, 4])
```

✚ 타입 코드 이해하기

동일한 타입으로 인스턴스가 생성되기 위해서는 array 함수에 명확히 타입 코드를 인자로 전달해야 한다. 이제부터 다양한 타입 코드를 어떻게 파이썬에서 지원하고 있는지를 알아 보겠다.

예제 19-4 : 문자 배열을 만들기

문자를 처리할 때 파이썬에서는 char 자료형이 없어서 정수로 처리되지만 한 바이트로 만 들어서 처리된다.

| Type code  C Type | Python Type Minimum size in bytes |

|---|---|

| 'b' | signed char int | 1 |

| 'B' | unsigned char int | 1 |

바이트 단위로 배열을 생성할 때 리스트 내의 원소가 문자열로 들어오면 유니코드로 처리 되므로 생성되지 않는다.

```python
In : import array
b = array.array('b', ['a','b','c','d'])
print(b)
print(b.itemsize)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-9-c06e4b55a478> in <module>()
1 import array
----> 3 b = array.array('b', ['a','b','c','d'])
4 print(b)
5 print(b.itemsize)
TypeError: an integer is required (got type str)
```

바이트 문자열로 처리해도 배열이 생성되지 않는다.

```python
In : import array
b = array.array('b', [b'a',b'b',b'c',b'd'])
print(b)
print(b.itemsize)
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-10-407b98bb32d6> in <module>()
1 import array
----> 3 b = array.array('b', [b'a',b'b',b'c',b'd'])
4 print(b)
5 print(b.itemsize)
TypeError: an integer is required (got type bytes)
```

배열을 한 바이트로 생성하려면 정수로 전달해서 생성해야 하므로 문자를 정수로 전달하 는 ord 함수를 이용해서 변환 후에 처리해야 한다.

```python
In : import array
b = array.array('b',map(ord,['a','b','c','d']))
print(b)
print(b.itemsize)
B = array.array('B',map(ord,['a','b','c','d']))
print(B)
print(B.itemsize)
Out: array('b', [97, 98, 99, 100])
array('B', [97, 98, 99, 100])
```

파이썬 3 버전부터 문자열이 유니코드가 되었다. array 함수에서 유니코드 문자를 처리하 려면 타입 코드를 ‘u’ 모드로 처리해야 한다.

| Type code C Type | Python Type | Minimum size in bytes |

|---|---|---|

| 'u' | Py_UNICODE Unicode character 2 |

배열의 원소로 한글을 넣어서 처리해도 유니코드이므로 처리되는 것을 알 수 있다.

```python
In : import array
```

u = array.array('u', "가을이란") print(u) print(u.itemsize)

```python
Out: array('u', '가을이란')
```

배열의 원소로 바이트 문자열을 넣었을 경우는 두 바이트 단위로 처리하므로 넣은 값이 줄 어들고 한자로 전환된 것을 알 수 있다.

```python
In : import array
u = array.array('u', b"abcd")
print(u)
print(u.itemsize)
Out: array('u', '扡摣')
```

예제 19-5 : 숫자 배열을 만들기

파이썬에는 int, float으로 숫자 자료형이 통합되었지만 c 언어는 다양한 자료형을 가지고 있다. 파이썬에서 어떻게 내부적으로 처리하는지를 알아보겠다.

| Type code | C Type | Python Type Minimum size in bytes |

|---|---|---|

| 'h' | signed short  int | 2 |

| 'H' | unsigned short int | 2 |

| 'i' | signed int | int | 4 |

| 'I' | unsigned int  int | 4 |

| 'l' | signed long | int | 4 |

| 'L' | unsigned long int | 4 |

| 'q' | signed long long int | 8 |

| 'Q' | unsigned long long int | 8 |

정수 처리 중에 short일 경우는 2바이트로 숫자를 관리한다.

```python
In : b = array.array('h',[1,2,3,4])
print(b)
print(b.itemsize)
B = array.array('H',[1,2,3,4])
print(B)
print(B.itemsize)
Out: array('h', [1, 2, 3, 4])
array('H', [1, 2, 3, 4])
```

int는 기본적으로는 4바이트 기준으로 처리하므로 조회해보면 4바이트 단위로 저장되어 처리되는 것을 확인할 수 있다.

```python
In : b = array.array('i',[1,2,3,4])
print(b)
print(b.itemsize)
B = array.array('I',[1,2,3,4])
print(B)
print(B.itemsize)
Out: array('i', [1, 2, 3, 4])
array('I', [1, 2, 3, 4])
```

정수 중에 long일 경우도 4바이트의 길이로 처리하므로 위의 방식과 동일하게 파이썬 int 로 처리된다.

```python
In : b = array.array('l',[1,2,3,4])
print(b)
print(b.itemsize)
B = array.array('L',[1,2,3,4])
print(B)
print(B.itemsize)
Out: array('l', [1, 2, 3, 4])
array('L', [1, 2, 3, 4])
```

8바이트로 인식하는 정수도 파이썬에서는 int 자료형으로 처리된다.

```python
In : b = array.array('q',[1,2,3,4])
print(b)
print(b.itemsize)
B = array.array('Q',[1,2,3,4])
print(B)
print(B.itemsize)
Out: array('q', [1, 2, 3, 4])
array('Q', [1, 2, 3, 4])
```

C 언어에 있는 float, double도 파이썬은 실수형 float으로 통합되어 있다.

| Type code | C Type | Python Type Minimum size in bytes |

|---|---|---|

| 'f' | float | float | 4 |

| 'd' | double | float | 8 |

부동소수점도 4바이트와 8바이트의 실수로 처리되지만 파이썬은 float으로만 지원한다.

```python
In : b = array.array('f',[1,2,3,4])
print(b)
print(b.itemsize)
B = array.array('d',[1,2,3,4])
print(B)
print(B.itemsize)
Out: array('f', [1.0, 2.0, 3.0, 4.0])
array('d', [1.0, 2.0, 3.0, 4.0])
```

## 19.1.2 array.array 배열을 파이썬 자료형, 파일 처리

파이썬에서 제공하는 자료형을 읽어와서 배열을 만들거나 파일을 읽어와서 바로 배열을 만들 수 있다. 파이썬에서 만들어진 것을 일단 배열로 변환해서 처리하는 방법을 알아보 겠다.

예제 19-6 : 파이썬 자료형을 이용해서 처리하기

배열은 기본적으로 바이트 단위 처리이므로 숫자 처리도 바이트 문자열로 확인할 수 있다. 일단 정수로 원소를 가진 리스트를 생성하고 tostring과 tobytes 메서드를 이용해서 출력해보면 바이트로 표시하는 것을 알 수 있다.

```python
In : import array
b = array.array('i',[1,2,3,4])
print(b)
to_s = b.tostring()
print(to_s)
to_b = b.tobytes()
print(to_b)
Out: array('i', [1, 2, 3, 4])
b'\x01\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\x04\x00\x00\x00'
b'\x01\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\x04\x00\x00\x00'
```

파이썬 문자열을 받아서 배열을 만들었다. 파이썬 텍스트는 유니코드이지만 tosting으로 출력해보면 바이트로 출력하는 것을 알 수 있다.

```python
In : import array
```

b = array.array('u',"가을이라") print(b) to_s = b.tostring() print(to_s) to_b = b.tobytes() print(to_b)

```python
Out: array('u', '가을이라')
b'\x00\xacD\xc7t\xc7|\xb7'
b'\x00\xacD\xc7t\xc7|\xb7'
```

파이썬 문자열을 하나 정의하고 이 문자열을 불러오기 위해 빈 배열을 만든다. fromuni code 메서드에 문자열을 인자로 받아서 처리하면 배열을 갱신한다. 이를 tostring 메서드 로 출력하면 바이트 표기법으로 출력되는 것을 알 수 있다.

```python
In : s = "겨울이라"
b = array.array('u',"")
print(b)
b.fromunicode(s)
print(b)
print(b.tostring())
Out: array('u')
```

array('u', '겨울이라') b'\xa8\xac\xb8\xc6t\xc7|\xb7' 위의 유니코드가 들어간 것을 tobytes 메서드를 이용해서 바이트로 변환했다. 이를 가지 고 frombytes 메서드로 배열에 추가하면 원래 배열이 유니코드이므로 한글로 보이는 것 을 알 수 있다.

```python
In : sb = b.tobytes()
print(sb)
b.frombytes(sb)
print(b)
Out: b'\xa8\xac\xb8\xc6t\xc7|\xb7'
```

array('u', '겨울이라겨울이라') 파이썬 리스트를 가지고 정수와 실수로 가져올 수 있고 이를 다시 파이썬 리스트로 전환할 수 있다.

```python
In : l = [1,2,3,4]
b = array.array("i")
b.fromlist(l)
print(b)
print(b.tolist())
Out: array('i', [1, 2, 3, 4])
[1, 2, 3, 4]
```

실수를 원소로 하는 리스트를 만들어서 이를 배열에 갱신할 수 있고 다시 파이썬 리스트로 전환할 수도 있다.

```python
In : f = [1.0,2.0,3.0,4.0]
c = array.array("f")
c.fromlist(f)
print(c)
print(c.tolist())
Out: array('f', [1.0, 2.0, 3.0, 4.0])
[1.0, 2.0, 3.0, 4.0]
```

예제 19-7 : 파일 처리하기

배열도 파일에 저장하거나 다시 읽어와서 처리할 수 있다.

먼저 배열로 만든 것은 바이트 기준이므로 파일을 처리하는 모드는 wb로 지정하고 이 배 열을 받아서 파일에 쓰기를 하고 저장한다.

```python
In : import array
a = array.array("i",[1,2,3,4,5])
with open("array.bin","wb") as f :
f.write(a)
```

배열을 하나 버퍼로 만들고 파일에 있는 readinto 메서드를 이용해서 배열에 전달하여 처 리하면 배열로 변환되어 처리된다.

```python
In : c = array.array("i",[0,0,0,0,0,0,0])
with open("array.bin","rb") as f :
print(f.readinto(c))
print(c)
Out: 20
array('i', [1, 2, 3, 4, 5, 0, 0])
```

파이썬 바이트 어레이 클래스를 이용해서 하나의 버퍼를 만들고 파일을 읽어와도 결과를 처리할 수 있지만 헥사값으로 표시된다. 이를 배열로 전환하기 위해 array 함수로 넣어서 확인하면 정수로 표시되는 것을 알 수 있다.

```python
In : bb = bytearray(20)
with open("array.bin","rb") as f :
print(f.readinto(bb))
print(bb)
a = array.array('i', bb)
print(a)
Out: 20
bytearray(b'\x01\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\x04\x00\
x00\x00\x05\x00\x00\x00')
array('i', [1, 2, 3, 4, 5])
```

위에서는 파일을 열고 파일에 있는 메서드로 처리했다. 이번에는 배열 내의 메서드를 가 지고 파일을 처리해보겠다.

배열 내의 tofile 메서드를 이용해서 파일에 저장하고 fromfile로 파일을 읽어서 특정 배열 에 붙이면 배열의 원소로 추가된 것을 알 수 있다.

```python
In : import array
b = array.array("i",[1,2,3,4,5,6])
with open("array.bin","wb") as f :
b.tofile(f)
c = array.array("i",[99,99])
with open("array.bin","rb") as f :
c.fromfile(f,6)
print(c)
Out: array('i', [99, 99, 1, 2, 3, 4, 5, 6])
```

## 19.1.3 memoryview 자료형

버퍼를 기반으로 하는 데이터 자료형(bytes, bytearray, array.array 등)에 대해 메모리 공유 처리를 위한 memoryview 데이터 자료형을 제공한다.

파이썬은 메모리를 직접 참조하는 포인터가 없으므로 이 데이터 자료형을 사용해서 서로 공유가 필요할 경우를 지정하고 메모리에 있는 것을 직접 참조할 수 있는 데이터 자료형을 만들어준다. 동일한 메모리를 참조할 수 있는 데이터 자료형이다.

예제 19-8 : 바이트 자료형일 경우만 처리

파이썬 문자열은 3 버전부터는 유니코드이다. Memoryview는 바이트일 경우만 처리가 되므로 유니코드를 주면 예외를 발생시킨다.

```python
In : s = "가을이라"
bm = memoryview(s)
print(bm)
Out: ---------------------------------------------------------------------
TypeError             Traceback (most recent call last)
<ipython-input-131-9f92930fea9e> in <module>()
```

1 s = "가을이라" ----> 3 bm = memoryview(s) 4 print(bm) TypeError: memoryview: a bytes-like object is required, not 'str' 메모리뷰는 기존에 생성된 바이트 문자열을 원본으로 가지고 있다. 새로운 객체가 생기 는 이유는 memoryview로 처리하는 인스턴스 객체의 주소가 다르다는 것을 가르킨다.

원본은 obj 속성에 가지고 있으므로 원본 데이터만을 참조한다. 이를 bytes로 변환하고 decode 메서드로 처리하면 유니코드로 출력된다.

```python
In : s = "가을이라"
bm = memoryview(s.encode())
print(bm)
print(bm.obj)
print(bytes(bm.obj).decode())
Out: <memory at 0x0000000005811D08>
b'\xea\xb0\x80\xec\x9d\x84\xec\x9d\xb4\xeb\x9d\xbc'
가을이라
```

예제 19-9 : 다양한 바이트 자료형에 대한 view 처리

메모리뷰에 있는 속성과 메서드를 확인한다.

```python
In : for i in dir(memoryview) :
if not i.startswith("_") :
print(i)
Out: c_contiguous
cast
contiguous
f_contiguous
format
hex
itemsize
nbytes
ndim
obj
readonly
release
shape
strides
suboffsets
tobytes
tolist
```

이 배열의 전체 사이즈인 nbytes는 len 함수의 길이와 itemsize를 곱한 길이가 된다. 타 입 코드에 대한 정보는 format 속성에 있는 것을 확인할 수 있다.

```python
In : import array
a = array.array('i',[1,2,3,4])
b = memoryview(a)
print(len(b))
print(b.itemsize)
print(b.nbytes)
print(b.format)
print(b.readonly)
Out: 4
i
False
```

바이트 어레이도 바이트 단위로 처리하므로 하나의 인스턴스를 바이트 문자열로 만들 었다. 이를 memoryview로 변환했다. 내부의 길이를 확인하면 원본에 있는 원소의 개수 를 출력한다.

바이트 문자열이므로 기본으로 B 코드가 출력되어 원소를 한 바이트 단위로 구성해서 처 리하는 것을 알 수 있다. 또한 바이트 어레이가 갱신이 가능하므로 readonly가 False로 표시된다.

```python
In : a = bytearray(b"abcd")
b = memoryview(a)
print(len(b))
print(b.itemsize)
print(b.nbytes)
print(b.format)
print(b.readonly)
Out: 4
False
```

바이트 어레이에 유니코드 문자열을 넣고 생성하려면 인코딩을 처리해야 한다. 인스턴스 를 만들어서 메보리뷰로 전환했다. 이때 메모리뷰는 원본 데이터의 참조를 관리하는 속성 인 obj에 원본 레퍼런스를 저장한다.

메모리뷰도 검색과 슬라이스가 처리되는 것을 알 수 있다. 대신 슬리이스를 처리할 때는 bytes 클래스로 전환해서 출력해야 한다. 슬라이스를 하면 메모리뷰 인스턴스로 전달하므 로 값을 확인하기 위해서는 변환해서 봐야 한다.

또 메모리뷰로 슬라이스를 한 것을 리스트 생성자에 넣으면 리스트로 변환해주는 것을 알 수 있다. 리스트로 변환하면 별도의 인스턴스가 만들어지므로 원본을 갱신하지 않는다.

```python
In : r = bytearray('ABC', 'utf-8')
mv = memoryview(r)
print(mv.obj)
print(r[0],mv[0])
bs = bytes(mv[0:2])
print(bs)
ls = list(mv[0:3])
ls[0] = 100
print(ls,r)
Out: bytearray(b'ABC')
65 65
b'AB'
[100, 66, 67] bytearray(b'ABC')
```

바이트 어레이는 변경이 가능하지만 바이트 자료형은 변경 불가능하다. 바이트 자료형으 로 인스턴스를 만들어서 메모리뷰로 변환한다.

이를 가지고 속성 readonly를 확인하면 True가 나오는 것을 확인할 수 있다.

```python
In : a = bytes(b"abcd")
b = memoryview(a)
print(len(b))
print(b.itemsize)
print(b.nbytes)
print(b.format)
print(b.readonly)
Out: 4
True
```

예제 19-10 : 메모리뷰 변경하기

메모리뷰로 처리하면 값을 변경할 때 에러가 발생할 수 있으므로 문자열일 경우는 문자라 는 것을 확인해야 한다. 타입 코드가 B라는 것은 정수로 넣어서 처리해야 하므로 문자를 넣어서 처리가 되지 않는다.

```python
In : s = bytearray(b"str")
bm = memoryview(s)
print(bm.readonly)
print(bm.format)
bm[0] = bytearray(b'b')
Out: False
---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-35-7089f6d2b9b6> in <module>()
4 print(bm.readonly)
5 print(bm.format)
----> 6 bm[0] = bytearray(b'b')
TypeError: memoryview: invalid type for format 'B'
```

문자를 정수로 전환해서 메모리뷰에 넣어 갱신하면 원본이 변경된 것을 알 수 있다.

```python
In : bm[0] = ord(b'b')
print(bm)
print(s)
print(bm.obj)
Out: <memory at 0x0000000005213288>
bytearray(b'btr')
bytearray(b'btr')
```

에러 발생 시 cast 메서드를 ‘c’ 자료형으로 다른 변수에 할당해서 변경하면 원본도 같이 변경되는 것을 알 수 있다.

```python
In : c = bm.cast('c')
print(c.readonly)
print(c.format)
c[0] = b'b'
print(s)
Out: False
c
bytearray(b'btr')
```
