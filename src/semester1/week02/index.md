---
layout: semester1
title: "2주차: 변수와 메모리의 비밀 🧠"
permalink: /semester1/week02/
description: "2주차: 변수와 메모리의 비밀 🧠에 대한 파이썬(Python) 강좌 문서입니다."
keywords: "2주차: 변수와 메모리의 비밀 🧠, 파이썬, Python, 프로그래밍, 개발, jinydev"
---

# 2주차: 변수와 메모리의 비밀 🧠

안녕하세요! 본 강좌는 파이썬이 데이터를 어떻게 기억하고 관리하는지, 즉 **변수(Variable)**와 **메모리(Memory)**의 관계에 대해 심도 있게 배우는 2주차 바이블 과정입니다.

---

> **학습목표**: 변수의 수학적 기원을 이해하고, 파이썬의 동적 바인딩 및 CPython 내부 `PyObject` 참조 메커니즘을 규명합니다. 또한 변수 값 스왑(Swap)의 튜플 원리와 메모리 가비지 컬렉션(GC) 조건, 그리고 PEP 8 작명 가이드라인을 완전 지배합니다.

---

## 📅 주차별 상세 세션 목차

### [1세션: 변수의 개념 및 파이썬 참조 모델](./session1.html) (50분)
* **변수의 개념과 대수학**: 프랑수아 비에트의 문자 대수학 기원, 투명 상자와 이름표 비유, 리터럴(Literal)과 변수(Variable)의 구분
* **변수에 값 할당하기 (대입)**: 대입 연산자(=)의 진짜 의미, 변수 상자에 데이터 대입 실습, print() 함수의 다양한 출력법
* **대화형 REPL 모드와 명령줄 셸**: REPL 모드에서의 즉석 코드 실행, 개발자의 필수 도구 명령줄 셸(Shell)
* **파이썬의 값(Value) 처리와 타입 시스템**: 파이썬 값(Value) 처리의 특징, 파이썬 문장(Statement)의 기본 규칙

### [2세션: CPython의 동적 타입과 메모리 구조](./session2.html) (50분)
* **파이썬의 동적 타입 (Dynamic Type)**: 동적 타입의 정의와 유연성, 런타임에 결정되는 자료형의 특성
* **타 언어와의 내부 구현 비교**: PHP의 zval 공용체 방식, JavaScript V8 엔진의 태그 포인터 방식
* **CPython 내부 객체 모델**: PyObject 구조체와 CPython 헤더의 비밀, 참조 횟수 카운터(ob_refcnt)의 원리, 객체 타입 신분증(ob_type) 포인터, 변수는 포인터(Name Binding) 화살표일 뿐이다
* **이름(Name)과 네임스페이스**: 이름(Name)과 네임스페이스의 관계, 파이썬 네임스페이스 검색 규칙 (LEGB), 존재하지 않는 이름과 NameError
* **강한 타입(Strong Typing)과 타입 힌트**: 파이썬은 강한 타입(Strong Typing) 언어다, 타입 힌트(Type Hint) 도입배경과 활용

### [3세션: 다중 대입(Swap)과 메모리 라이프사이클 & PEP 8 작명 가이드](./session3.html) (50분)
* **다중 대입과 값 교환 (Swap)**: 다중 대입(Multiple Assignment)의 기초, 임시 변수(temp)를 이용한 전통적 Swap, 파이썬의 우아한 한 줄 Swap (a, b = b, a) 원리, 튜플 패킹(Packing)과 언패킹(Unpacking)의 마법
* **바인딩과 메모리 라이프사이클**: 바인딩(Binding)의 동작 원리, 참조 카운팅(Reference Counting)과 가비지 컬렉터, 순환 참조(Circular Reference)의 맹점과 해결책
* **Java vs Python 비교**: Java Primitive Stack Slot vs Python Heap Reference, 다중 대입과 Swap 방식 비교
* **변수 작명 규칙과 PEP 8 가이드라인**: 식별자 명명 규칙과 예약어(Keywords), PEP 8 코딩 컨벤션의 변수 작명 규칙 (snake_case vs CamelCase), 의미 있는 작명과 boolean 접두사(is_, has_) 규칙

---

## ☕ Java vs 🐍 Python 스나이퍼 요약 비교

1. **변수의 실체**: Java의 기본형은 메모리(Stack)에 고정 크기 상자를 만들어 값을 직접 기록하지만, Python은 **모든 데이터가 힙에 있는 객체**이며 변수는 단순 주소 참조 포인터(Name Binding)입니다.
2. **다중 대입**: Java는 두 변수의 값을 바꿀 때 반드시 `temp` 임시 변수가 필요하지만, Python은 `a, b = b, a` 튜플 언패킹 마술을 사용하여 한 줄로 해결합니다.
3. **코딩 스타일**: Java는 메서드/변수 명명 시 카멜 케이스(`camelCase`)가 절대 규범이지만, Python은 스네이크 케이스(`snake_case`)를 PEP 8 표준 스타일로 삼습니다.

---

## ✍️ 이번 주차 종합 연습 문제

**문제 1.** 다음 코드를 실행했을 때, 변수 `a`와 `b`의 출력 결과가 각각 무엇일지 적고 이유를 참조 ID 개념과 가변성(Mutability)을 빗대어 설명하세요.
```python
a = [1, 2, 3]
b = a
b.append(4)
print(a, b)
```

**문제 2.** 파이썬 REPL에서 `a = 256; b = 256; a is b`는 `True`이지만, `a = 257; b = 257; a is b`는 `False`인 이유를 CPython 엔진 캐싱(Caching) 관례에 따라 쓰세요.

**문제 3.** 식별자 이름의 첫 글자에 숫자를 쓸 수 없는 이유를 번역기 내부 어휘 분석기(Lexer)와 구문 파서(Parser)의 속도 최적화(Lookahead) 관점으로 설명하세요.

---

*상세 강의 교재 및 관련 이미지는 각 세션 파일([1세션](./session1.html) / [2세션](./session2.html) / [3세션](./session3.html))을 참조해 주세요.*
