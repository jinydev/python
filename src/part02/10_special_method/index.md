---
layout: docs
title: "Chapter 10. 스페셜 메서드 (Magic Methods)"
permalink: /part02/10_special_method/
---

# Chapter 10. 스페셜 메서드 (Magic Methods)

![매직 메서드 컨셉](/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd/magic_method_concept_upper_ele_16x9_1771689786754.png)

파이썬의 세계에서는 **"마법(Magic)"**이 존재합니다. 
우리가 흔히 쓰는 덧셈(`+`), 대괄호(`[]`), 속성 점(`.`), 심지어 `len()` 같은 함수까지, 겉보기엔 평범한 연산자와 함수들이지만 객체 내부에서는 **밑줄 두 개(`__`)**로 감싸진 **스페셜 메서드 (Special Methods 또는 Magic Methods)**가 몰래 호출되어 마법처럼 작동합니다.

이 장에서는 우리가 만든 객체에 파이썬의 표준 연산자와 내장 함수들이 자연스럽게 스며들도록 도와주는 마법의 주문, 스페셜 메서드에 대해 알아봅니다.

---

### 📖 목차

1. **[연산자와 스페셜 메서드](./10_01_section/)**
   - 점(`.`) 연산자의 마법: `__getattribute__`, `__getattr__`, `__setattr__`
   - 컨테이너 탐색과 비교: `__contains__`, `__eq__`
   - 대괄호(`[]`)의 비밀: `__getitem__`, `__setitem__`, 슬라이싱
   - 사칙연산 오버로딩: `__add__`, `__iadd__` 등
2. **[내장 함수와 스페셜 메서드](./10_02_builtin/)**
   - 함수처럼 호출하기 `callable()`과 `__call__`
   - 객체의 신분증 `id()`, `hash()`
   - 혈통(타입) 확인 `isinstance()`, `issubclass()`
   - 길이를 재는 `len()`과 `__len__`
   - 동적 속성 제어 `getattr()`, `setattr()`
