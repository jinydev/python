---
layout: default
title: "04.04 바이트"
---

# 04.04 바이트

바이트 자료형은 문자열처럼 변경이 불가능하지만 바이트 어레이 자료형은 리스트처럼 변 경이 가능한 구조를 지원한다.

변경이 가능하므로 리스트처럼 원소를 변경, 추가, 삭제할 수 있는 메서드를 지원한다. 또 한 바이트 자료형처럼 바이트 기준으로 데이터를 관리한다.

## 4.4.1 바이트 어레이 생성

바이트 어레이 자료형은 기본적으로 바이트 자료형에 대한 갱신을 위한 버퍼로 사용하는 경우가 많다.

예제 4-24 : 바이트로 생성한 것을 바이트 어레이로 변환

바이트 자료형으로 인스턴스를 만들고 이를 바이트 어레이로 전환했다. 직접 문자열을 넣 고 인자에 인코딩을 하면 바이트로 만들어지므로 바이트 어레이로 생성할 수 있다.

```python
In : b = b"abcde"
ba = bytearray(b)
print(type(ba))
print(ba)
```

bs = bytearray("바이트 어레이","utf-8") print(bs)

```python
Out: <class 'bytearray'>
bytearray(b'abcde')
bytearray(b'\xeb\xb0\x94\xec\x9d\xb4\xed\x8a\xb8\xec\x96\xb4\xeb\xa0\
x88\xec\x9d\xb4')
```

예제 4-25 : 버퍼 처리하기 : 바이트 어레이

바이트 어레이에 숫자를 인자로 주고 인스턴스를 생성하면 길이가 20인 바이트 어레이가 만들어진다.

내부를 확인하면 x00으로 20개가 만들어져 있다. 이 버퍼를 슬라이스로 지정해서 5개 문 자를 가진 바이트 인스턴스를 할당하면 변경되는 것을 확인할 수 있다.

```python
In : buffer = bytearray(20)
print(buffer)
b = b"abcde"
buffer[:len(b)] = b
print(buffer)
Out: bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00')
bytearray(b'abcde\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00')
```

## 4.4.2 바이트 어레이 속성/메서드

변경 가능한 bytearray는 리스트(list) 자료형처럼 내부 원소들을 갱신 및 삭제, 복사할 수 있는 메서드들을 가지고 있다.

예제 4-26 : 바이트와 바이트 어레이 메서드 차이 확인

바이트 어레이는 변경이 가능하므로 스페셜 메서드인 _ _setitem_ _, _ _delitem_ _을 제 공한다.

내부 원소를 변경 및 삭제할 수 있는 append, extend, remove, pop 메서드 등이 있다.

역으로 정렬하는 reverse 메서드도 제공되는 것을 알 수 있다.

```python
In : import pprint
bs = set(dir(bytes))
bb = set(dir(bytearray))
pprint.pprint(bb - bs)
Out: {'__alloc__',
'__delitem__',
'__iadd__',
'__imul__',
'__setitem__',
'append',
'clear',
'copy',
'extend',
'insert',
'pop',
'remove',
'reverse'}
```

메서드 insert는 특징 인덱스 위치에 정수값을 인자로 받아 처리한다.

```python
In : buffer = bytearray(20)
print(buffer)
buffer.insert(0, 31)
print(buffer)
Out: bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00')
bytearray(b'\x1f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00\x00')
```

메서드 pop에 0번째 인덱스를 지정해서 처리하면 첫 번째에 들어간 31 값이 삭제되는 것 을 알 수 있다.

```python
In : print(buffer)
cc = buffer.pop(0)
print(cc)
print(buffer)
Out: bytearray(b'\x1f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00\x00')
bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00')
```

메서드 append로 붙이면 제일 뒤에 원소가 추가된 것을 확인할 수 있다.

```python
In : print(buffer)
buffer.append(31)
print(buffer)
Out: bytearray(b'\x1f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00')
bytearray(b'\x1f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x00\x00\x1f')
```

예제 4-27 : 바이트 어레이 갱신할 때 값을 할당하는 방법

바이트 어레이 자료형을 슬라이스로 처리할 때는 바이트 문자로 직접 할당해서 처리가 가 능하다.

```python
In : buffer[:3] = b'abc'
print(buffer)
Out: bytearray(b'abc\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
x00\x00\x00\x00\x1f')
```

바이트 어레이 자료형에 하나의 원소를 검색해서 값을 갱신할 때는 정수를 사용하지 않으 면 처리가 되지 않고 예외를 발생시킨다.

```python
In : buffer[0] = b'a'
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-131-61113b78b6ee> in <module>()
----> 1 buffer[0] = b'a'
TypeError: an integer is required
```

바이트 어레이의 insert 메서드로 특정 위치에 원소를 추가할 때도 바이트 인스턴스를 넣 어서 처리하면 예외가 발생한다. 항상 정수값으로 넣어서 처리한다.

```python
In : buffer.insert(0,b'a')
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-133-5fcfc6c82405> in <module>()
----> 1 buffer.insert(0,b'a')
TypeError: an integer is required
```
