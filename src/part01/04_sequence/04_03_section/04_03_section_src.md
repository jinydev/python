---
layout: default
title: "04.03 바이트"
---

# 04.03 바이트

컴퓨터가 기본으로 처리하는 바이트 자료형을 파이썬 3 버전에 별도로 만들었다. 저장되 는 형태가 16진수의 hexa 값으로 관리되고 아스키 코드일 경우는 hexa 값 대신에 문자로 보여준다.

바이트 또한 파이썬 기본 문자열인 유니코드와 동일한 메서드들을 가지고 처리된다. 문자 열 자료형처럼 변경이 불가능한 구조를 따른다.

## 4.3.1 바이트 생성

바이트 자료형의 생성은 리터럴 형태로 b를 문자열 앞에 붙여서 표시한다. Bytes 생성자 를 기반으로 인스턴스도 만들 수 있다.

예제 4-20 : 바이트 생성

바이트 리터럴로 생성해서 어떤 클래스를 위해 만들어져 있는지를 확인하면 bytes 자료형 이라고 표시한다. 영문자이므로 헥사값으로 표시되지 않고 알파벳으로 표시되는 것을 알 수 있다.

```python
In : b = b"hello"
print(type(b), b)
Out: <class 'bytes'> b'hello'
```

한글 문자열을 하나 만들고 바이트 생성자에 인자로 넣을 때는 바이트로 전환해서 처리 한다.

일단 한글을 바이트로 변환할 때 한 문자당 3개의 바이트로 변환하는 utf-8로 전환해서 처리한다. 문자열은 6개이지만 바이트로 변환되면 18개로 구성된 것을 알 수 있다.

```python
In : s = "성균관대학교"
bs = bytes(s.encode("utf-8"))
print(type(bs))
print(bs)
```

print(bytes("성균관대학교",encoding="utf-8"))

```python
Out: <class 'bytes'>
b'\xec\x84\xb1\xea\xb7\xa0\xea\xb4\x80\xeb\x8c\x80\xed\x95\x99\xea\
xb5\x90'
b'\xec\x84\xb1\xea\xb7\xa0\xea\xb4\x80\xeb\x8c\x80\xed\x95\x99\xea\
xb5\x90'
```

## 4.3.2 바이트 주요 메서드

주요 메서드는 문자열과 거의 유사하지만 유니코드가 아닌 바이트 단위로 처리되므로 상 이한 것이 몇 개 존재한다.

✚ 문자열과 다른 메서드들

바이트 자료형 내에서 제공하는 문자열만 추가적으로 알아본다.

예제 4-21 : 바이트 자료형의 메서드 확인

아직 배우지는 않았지만 동일한 원소는 하나만 만드는 집합(Set) 자료형을 이용해서 문자 열과 바이트 내의 속성과 메서드를 비교하고 간단히 바이트 내에만 있는 메서드만을 추출 한다.

집합 클래스 내의 차집합을 하기 위해서는 뺄셈 기호만을 사용해서 표현할 수 있다. 3개의 다른 hex, decode, fromhex 메서드를 가지고 있다.

```python
In : b = set(dir(bytes))
s = set(dir(str))
bs = b - s
print(bs)
Out: {'hex', 'decode', 'fromhex'}
```

바이트 자료형을 기본 16진수로 표현하므로 이를 hex 메서드를 통해 문자열로 전환하고 숫자만 출력하도록 처리한다.

```python
In : bb = b"Hello"
bh = bb.hex()
print(type(bh), bh)
Out: <class 'str'> 48656c6c6f
```

이처럼 처리된 값이 fromhex 메서드를 실행하면 바이트에 16진수로 표시된다.

```python
In : bfh = bytes.fromhex('B901EF')
print(b fh)
Out: b'\xb9\x01\xef'
```

✚ 바이트 타입에서 문자열로 전환

한글 등 유니코드 문자열을 바이트 자료형으로 암호화해서 만들 때는 문자열의 encode 메서드를 가지고 처리한다. 반대로 바이트를 문자열로 변경하려면 decode 메서드로 처리 한다.

예제 4-22 : encode/decode 메서드 처리

한글 문자열을 encode 메서드로 bytes 변환했다.

```python
In : s = "하늘과 바람과 별과 시"
b = s.encode("utf-8")
print(type(b))
Out: <class 'bytes'>
```

이것을 가지고 다시 bytes에서 decode 메서드를 이용하여 한글 문자열로 변환 처리하면 동일한 한글이 출력되는 것을 확인할 수 있다.

```python
In : bs = b.decode("utf-8")
print(type(bs))
print(bs)
Out: <class 'str'>
```

하늘과 바람과 별과 시

예제 4-23 : bytes/str 생성자에서 직접 encode, decode하기

문자열에서 암호화하면서 인코딩을 처리하면 바이트 자료형으로 변경이 된다.

또한 이 문자열을 바이트에 넣고 인코딩을 부여하면 바이트 자료형의 인스턴스가 만들어 지는 것을 알 수 있다.

두 개 인스턴스의 변환된 값을 비교하면 동일하므로 True가 표시된다.

```python
In : s = "휀휁휂휃휄"
b = s.encode("utf-8")
print(b)
bb = bytes(s, "utf-8")
print(bb)
print(b == bb)
Out: b'\xed\x9c\x80\xed\x9c\x81\xed\x9c\x82\xed\x9c\x83\xed\x9c\x84'
b'\xed\x9c\x80\xed\x9c\x81\xed\x9c\x82\xed\x9c\x83\xed\x9c\x84'
True
```

바이트를 문자열 생성자에서 인코딩하면 문자열로 처리되는 것을 확인할 수 있다.

```python
In : print(str(bb, "utf-8"))
Out: 휀휁휂휃휄
```
