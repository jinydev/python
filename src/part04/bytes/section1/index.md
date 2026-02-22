---
layout: docs
title: "1. 기계들의 빡빡한 규칙: array와 memoryview"
permalink: /part04/bytes/section1/
---

# 1. 기계들의 빡빡한 규칙: `array`와 `memoryview`

파이썬의 리스트(`list`)는 정말 편리한 가방입니다. 숫자, 글자, 심지어 다른 가방까지 막 섞어서 넣을 수 있죠. 하지만 컴퓨터 입장에서는 이 가방이 너무 무겁고 메모리 낭비가 심합니다. 그래서 아주 빠르고 가벼운 '전용 금고'가 필요합니다.

## 1.1 오직 한 종류만! `array.array`

`array` 모듈의 배열은 아주 깐깐한 수문장이 지키는 창고입니다. "여기엔 정수만 들어올 수 있어!" 또는 "여기엔 소수(float)만 올 수 있어!" 하고 **타입 코드(Type Code)**를 정해놓고 그것만 넣을 수 있습니다.

```python
import array

# 'i'는 정수(integer)만 들어올 수 있는 비밀기지 암호(타입 코드)입니다!
my_arr = array.array("i", [1, 2, 3, 4, 5])

print(my_arr)
# 출력: array('i', [1, 2, 3, 4, 5])

# 파이썬 리스트의 append, pop 다 쓸 수 있습니다.
my_arr.append(6)
print(my_arr)

# 하지만 글자를 몰래 넣으려고 하면? 에러 폭탄 쾅!
# my_arr.append("스파이") -> TypeError 발생!
```

이 방식은 엄청나게 정교하게 컴퓨터의 메모리를 아낄 수 있어서 네트워크나 대규모 데이터를 다룰 때 사랑받습니다. 문자를 다루는 `'u'`, 큰 숫자를 다루는 `'q'` 등 다양한 비밀 코드들이 존재합니다!

---

## 1.2 메모리 분신술! `memoryview`

만약 10GB짜리 엄청 큰 영화 파일 데이터를 슬라이싱(`[0:100]`)해서 편집한다고 쳐 봅시다. 보통 파이썬 리스트에서는 슬라이싱을 하면 똑같은 크기의 복사본 창고가 하나 더 생겨서 순식간에 컴퓨터가 멈춰버립니다.

이때 구세주처럼 등장하는 것이 **`memoryview` (메모리뷰)** 마법의 거울입니다!

```python
# 엄청 큰 바이트 데이터를 상상해봅시다.
giant_data = bytearray(b"abcdefghijklmnopqrstuvwxyz")

# 거울(memoryview)을 꺼내 데이터를 비춰봅니다. (복사가 아님!)
view = memoryview(giant_data)

# 거울 안의 모습을 바꿔볼까요? 0번째 글자를 대문자 'A'로!
view[0] = ord(b'A')

# 원본 데이터를 확인하면?
print(giant_data)
# 출력: bytearray(b'Abcdefghijklmnopqrstuvwxyz')
```

`memoryview`는 데이터를 새로 복사하는 대신, "저기 있는 저 데이터를 거울로 비춰서 바로 조작할게!" 라는 뜻입니다. 아무리 큰 몬스터 데이터라도 아주 빠르고 가볍게 조작할 수 있는 엄청난 마법 스킬입니다!
