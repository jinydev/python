---
layout: docs
title: "3. 바이트 (Bytes)"
permalink: /part01/sequence/section2/
---

# 3. 바이트 (Bytes)

파이썬 3으로 넘어오면서 기본 문자열 체계가 유니코드(Unicode)로 통합됨에 따라, 메모리, 네트워크 송수신, 바이너리 파일 입출력 등 기계 친화적인 로우레벨 작업을 위해 **바이트(Bytes)** 자료형이 철저하게 분리되었습니다. 

바이트 자료형 역시 시퀀스의 한 종류이므로 내부 요소를 개별적으로 조회할 수 있으며, 문자열(`str`)과 마찬가지로 내부 요소가 변하지 않는 **변경 불가능(Immutable)**한 특성을 가집니다.

## 3.1 바이트 생성

영문이나 숫자의 경우, 문자열 앞에 리터럴 기호 `b`를 붙여서 직관적으로 순수 바이트 배열을 생성할 수 있습니다. (ASCII 기반)

```python
# 1. 리터럴을 이용한 생성
ascii_bytes = b"hello"
print(type(ascii_bytes)) # <class 'bytes'>
print(ascii_bytes)       # b'hello'

# 2. 한글처럼 아스키코드 범위를 넘어서는 문자열은 encode()를 동반해야 합니다.
korean_str = "파이썬"
# korean_bytes = b"파이썬" -> SyntaxError 발생! 
korean_bytes = korean_str.encode("utf-8")
print(korean_bytes)      # b'\xed\x8c\x8c\xec\x9d\xb4\xec\x8d\xac'
```

---

## 3.2 바이트만의 특수 메서드 (hex)

바이트 자료형은 시퀀스의 일종이므로 문자열이 제공하는 `count`, `find`, `split` 등의 유용한 가공 메서드들을 거의 그대로 제공합니다. 하지만 바이너리 형태를 시각적으로 다루기 위해 문자열에는 없는 `hex` 관련 메서드가 추가로 존재합니다.

- **`hex()`**: 바이트 데이터를 16진수 형태의 "문자열(str)"로 예쁘게 변환하여 출력해줍니다.
- **`fromhex()`**: 순수한 16진수 문자열을 다시 "바이트(bytes)" 객체로 복원합니다.

```python
# 순수 바이트
secret_byte = b"Hello"

# 1. 바이트를 16진수 텍스트로 변환
hex_str = secret_byte.hex()
print(hex_str) # "48656c6c6f"

# 2. 16진수 텍스트를 다시 바이트로 복원
restored_byte = bytes.fromhex("48656c6c6f")
print(restored_byte) # b'Hello'
```

---

## 3.3 문자열(str)과 바이트(bytes)의 통합 변환

인터넷 너머로 "안녕하세요"라는 텍스트를 전송하려면, 반드시 출발지에서 문자열을 바이트로 `encode()` 하고, 도착지에서 바이트를 문자열로 `decode()` 하는 암호화/복호화 규격이 성립되어야 합니다.

```python
# 1. 송신: 유니코드(Str) -> 바이트 배열(Bytes) 변환
message = "데이터 전송"
packet = message.encode("utf-8")
print(type(packet)) # <class 'bytes'>

# ======== (네트워크/파일 입출력 전송 중) ========

# 2. 수신: 바이트 배열(Bytes) -> 유니코드(Str) 복원
received_message = packet.decode("utf-8")
print(received_message) # "데이터 전송"
```

파이썬의 가장 강력한 특징 중 하나는 이처럼 `str` 객체와 `bytes` 객체 간의 경계를 명확하게 구분하여 데이터 인코딩 버그를 원천적으로 차단한다는 점입니다.
