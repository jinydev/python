---
layout: docs
title: "Chapter 13. 뼈대만 있는 청사진: 추상 클래스와 타입"
permalink: /part03/13_abstract/
---

# Chapter 13. 뼈대만 있는 청사진: 추상 클래스와 타입

![추상 클래스 컨셉](/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd/abstract_concept_upper_ele_16x9_1771690140422.png)

파이썬에서 클래스를 만들 때, "이 클래스를 상속받는 모든 로봇들은 반드시 `power_up()` 이라는 기능을 스스로 만들어야 해!" 하고 강제하고 싶다면 어떻게 해야 할까요?
이때 등장하는 것이 바로 **추상 클래스(Abstract Class)**입니다. 

자체적으로는 완성된 모양(인스턴스)을 가질 수 없지만, 자식 클래스들이 반드시 구현해야 할 핵심 뼈대와 규칙을 제시하는 '홀로그램 청사진'과도 같습니다. 이 장에서는 파이썬의 `abc` 모듈을 이용한 강력한 설계 규칙과 파이썬 내부 자료형들의 뼈대 구조, 그리고 코드의 안정성을 높여주는 '타입 힌트(Type Hint)'에 대해 배웁니다.

---

### 📖 목차

1. **[추상 클래스 기본기 (`abc` 모듈)](./13_01_builtin/)**
   - 뼈대를 만드는 마법: `ABC`, `ABCMeta`
   - 부모인 척하기: `register`와 가상 서브클래스
   - 암묵적 룰: 덕 타이핑과 프로토콜 인터페이스
2. **[숫자들의 가계도 (`numbers`)](./13_02_section/)**
   - 정수(`Integral`), 실수(`Real`), 복소수(`Complex`), 수(`Number`)의 추상 클래스 구조
3. **[컬렉션의 뼈대 (`collections.abc`)](./13_03_section/)**
   - 자료 구조의 조상님: `Sequence`, `Mapping`, `Set`
   - 읽기 전용 뷰 자료형들 (`KeysView`, `ValuesView` 등)
4. **[시퀀스를 다루는 내장 도구들](./13_04_section/)**
   - 여러 개를 묶어주는 `zip`, 번호를 매겨주는 `enumerate`
   - 값을 뒤집어주는 `reversed`, 범위 요정 `range`
5. **[타입 힌트와 코드 테스트 (`typing`, `doctest`)](./13_05_section/)**
   - 내 코드에 명찰 달아주기 (Type Annotation)
   - 나만의 타입 만들기: `TypeVar`, `Generic`
   - 주석으로 자동 테스트하기: `doctest`
