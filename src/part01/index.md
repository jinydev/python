---
layout: docs
title: "Part 1: 파이썬 기초 다지기"
permalink: /part01/
---

# Part 1. 파이썬 기초 다지기

이 파트에서는 파이썬의 가장 기본적인 동작 원리와 필수 자료형, 그리고 제어문 구조를 다룹니다.

## 학습목표

1.  **파이썬 기본 개념 이해**: 파이썬의 값(Value), 이름(Name), 데이터 타입 및 바인딩의 기본 원리를 이해합니다.
2.  **프로그램 흐름 제어**: 변수, 조건문, 반복문 등 기본적인 파이썬 문장의 구조와 흐름 제어를 학습합니다.
3.  **핵심 자료형 활용**: 숫자, 문자열, 리스트, 튜플, 딕셔너리, 세트 등 다양한 파이썬 핵심 자료형의 특징과 사용법을 익힙니다.
4.  **데이터 다루기**: 슬라이싱, 포매팅, 컴프리헨션 등을 통해 데이터를 효율적으로 가공하고 다루는 방법을 배웁니다.

## 📖 학습 목차

### [0. 파이썬 개발환경 구축](./setup/)
이 장에서는 2026년 기준 최신 파이썬 버전의 설치 방법과 현대적인 개발 환경을 구축하는 방법을 다룹니다.
실무에서 필수적으로 사용되는 파이썬 핵심 도구들과 가상환경(Virtual Environment)의 개념 및 활용법을 익힙니다.

- [학습목표](./setup/)
- [00.01_파이썬 설치 가이드 (2026)](./setup/install/)
- [00.02_가상환경 (Virtual Environment)](./setup/venv/)

### [1. 파이썬 기본 핵심 understanding](./basic/)
파이썬에서 다루는 데이터의 기본 단위인 '값'과 이를 가리키는 '이름', 그리고 두 요소를 연결하는 '바인딩'의 핵심 원리를 가볍게 살펴봅니다.
초보자도 파이썬이 데이터를 어떻게 메모리에서 다루는지 직관적으로 이해할 수 있습니다.

- [학습목표](./basic/)
- [01.01_값(value)](./basic/value/)
- [01.02_이름(name)](./basic/name/)
- [01.03_데이터](./basic/data/)
- [01.04_바인딩(binding)](./basic/binding/)
- [01.05_내장](./basic/builtin/)

### [2. 파이썬 문장](./statement/)
파이썬 코드를 구성하는 가장 기본적인 단위인 '문장'의 구조를 배우고, 이를 모아 흐름을 제어하는 방법을 익힙니다.
나아가 함수와 모듈을 통해 재사용 가능한 구조적인 프로그램을 작성하는 기초를 다집니다.

- [학습목표](./statement/)
- [02.01_문장](./statement/section1/)
- [02.02_프로그램](./statement/section2/)
- [02.03_함수](./statement/function/)
- [02.04_모듈(module)_패키지(package)](./statement/module/)
- [02.05_네임스페이스(Namespace)](./statement/namespace/)
- [02.06_단순한](./statement/section3/)

### [3. 숫자 자료형](./datatype/)
파이썬에서 제공하는 다양한 숫자형 데이터(정수, 실수 등)의 특징과 객체 지향적인 특성을 이해합니다.
수학적 연산을 수행하는 연산자들의 종류와 올바른 활용법을 실습을 통해 배웁니다.

- [학습목표](./datatype/)
- [03.00_3.0](./datatype/section1/)
- [03.01_숫자](./datatype/section2/)
- [03.02_내장](./datatype/builtin/)
- [03.03_연산자(Operator)](./datatype/operator/)

### [4. Sequence 자료형](./sequence/)
문자열, 리스트, 튜플 등 여러 개의 데이터를 순서대로 늘어놓은 '시퀀스(Sequence)' 자료형의 공통된 특징을 파악합니다.
인덱싱과 슬라이싱 기법을 통해 원하는 데이터를 빠르고 정확하게 추출하는 방법을 다룹니다.

- [학습목표](./sequence/)
- [04.01_Sequence](./sequence/section1/)
- [04.02_문자열](./sequence/string/)
- [04.03_바이트](./sequence/section2/)
- [04.04_바이트](./sequence/section3/)
- [04.05_튜플](./sequence/tuple/)
- [04.06_리스트](./sequence/list/)
- [04.07_Sequence](./sequence/section4/)

### [5. Mapping/Set 자료형](./mapping/)
키와 값의 쌍으로 데이터를 효율적으로 저장하는 딕셔너리와, 수학의 집합과 같은 특성을 지닌 세트(Set) 자료형을 익힙니다.
이들 매핑 및 집합 자료형이 제공하는 고유한 구조를 통해 데이터를 손쉽게 검색하고 분류하는 법을 배웁니다.

- [학습목표](./mapping/)
- [05.01_파이썬](./mapping/section1/)
- [05.02_딕셔너리(dict)](./mapping/dict/)
- [05.03_set](./mapping/section2/)

### [6. 정수형 검색](./formatting/)
문자열이나 숫자 데이터를 원하는 형식으로 깔끔하게 가공하여 출력하는 포매팅 기법들을 다룹니다.
기존 데이터를 바탕으로 간결하고 직관적으로 새로운 리스트 묶음을 만들어내는 지능형(Comprehension) 문법의 기초도 함께 살펴봅니다.

- [학습목표](./formatting/)
- [06.01_정수](./formatting/integer/)
- [06.02_슬라이싱(slicing)](./formatting/slicing/)
- [06.03_지능형(comprehension)](./formatting/comprehension/)
- [06.04_문자열](./formatting/string/)
