---
layout: docs
title: "Part 3: 고급 프로그래밍 기법"
permalink: /part03/
---

# Part 3. 고급 프로그래밍 기법

이 파트에서는 파이썬 고수들이 즐겨 사용하는 함수형 프로그래밍, 제너레이터, 그리고 추상화 기법을 배웁니다.

## 학습목표

1. **함수형 프로그래밍**: 상태 변경을 피하고 순수 함수를 활용하는 파이썬의 함수형 패러다임을 이해합니다.
2. **추상화 설계**: 추상 클래스를 통해 인터페이스를 정의하고, 안전하고 일관된 객체 모델을 설계하는 방법을 배웁니다.
3. **제너레이터와 이터레이터**: 대용량 데이터를 메모리 효율적으로 처리할 수 있는 제너레이터의 작동 원리와 코루틴을 배웁니다.
4. **프로퍼티와 디스크립터**: 객체의 속성 접근을 제어하는 강력한 매커니즘인 프로퍼티와 디스크립터 구조를 확립합니다.

## 📖 학습 목차

### [12. 함수형 프로그래밍](./functional/)
프로그램의 사이드 이펙트를 최소화하고, 순수한 함수들의 조합으로 간결한 코드를 작성하는 방법을 파고듭니다.
파이썬의 내장 함수들과 조합하여 고차 함수(Higher-order functions)를 다루는 기법을 익히게 됩니다.

- [학습목표](./functional/)
- [12.01_함수형](./functional/function/)
- [12.02_내장](./functional/builtin/)
- [12.03_멀티플](./functional/section/)

### [13. 추상 클래스](./abstract/)
상속 과정에서 필수적으로 구현해야 할 메서드를 강제하는 추상 클래스(Abstract Base Class)의 개념을 확립합니다.
복잡한 프로젝트에서 다형성을 보장하고 견고한 아키텍처를 세우기 위한 인터페이스 설계 기법을 다룹니다.

- [학습목표](./abstract/)
- [13.01_내장](./abstract/builtin/)
- [13.02_수에](./abstract/section1/)
- [13.03_컬렉션](./abstract/section2/)
- [13.04_Sequence](./abstract/section3/)
- [13.05_타입](./abstract/section4/)

### [14. 제너레이터](./iterator/)
리스트나 튜플과 달리 한 번에 하나씩 값을 생산하여 메모리 사용을 극히 줄여주는 제너레이터와 반복형(Iterable) 객체를 배웁니다.
데이터 스트림 처리와 동시성 프로그래밍의 기반이 되는 코루틴(Coroutine)의 기본기까지 폭넓게 살펴봅니다.

- [학습목표](./iterator/)
- [14.01_반복형과](./iterator/section1/)
- [14.02_itertools](./iterator/section2/)
- [14.03_제너레이터(generator)](./iterator/generator/)
- [14.04_코루틴(coroutine)](./iterator/coroutine/)

### [15. 프로퍼티](./property/)
객체의 속성에 값을 읽고 쓸 때 메서드를 투명하게 가로채어 실행시킬 수 있는 @property의 개념을 명확히 합니다.
더 나아가 이를 파이썬 코어 레벨에서 직접 제어할 수 있는 디스크립터(Descriptor) 메커니즘을 마스터합니다.

- [학습목표](./property/)
- [15.01_프로퍼티(property)](./property/property/)
- [15.02_사용자](./property/section/)
- [15.03_디스크립터(descriptor)](./property/descriptor/)
