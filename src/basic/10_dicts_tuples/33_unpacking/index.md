---
layout: docs
title: "33 언패킹(Unpacking) 마술과 두 변수 맞바꾸기"
permalink: /basic/10_dicts_tuples/33_unpacking/
---

# 33 언패킹(Unpacking) 마법과 변수 교체 탈옥기

튜플의 성질을 십분 활용하면 몹시 흥미롭고 세련된 파이썬 특유의 고급 문법을 구사할 수 있습니다.
가장 대표적인 것이 여러 개의 변수 묶음을 단숨에 해체하거나 역으로 조립해 내는 기법입니다.

**코드: 두 변수 안의 내용물 스웝(Swap) 하기**
```python
value_a = 10
value_b = 20

# C나 자바 같은 타 언어에서는 임시 상자(temp) 역할을 할 제3의 변수가 필요하지만, 파이썬은 튜플 덕에 단 한 줄로 교환이 끝납니다!
value_a, value_b = value_b, value_a

print("a:", value_a, "/ b:", value_b)  # a: 20 / b: 10
```
이 밖에도 함수에서 한 번에 2개 이상의 결괏값을 바깥으로 던져줄(`return`) 때 파이썬이 이를 알아서 튜플로 단단히 포장해 주고(`Packing`), 받는 쪽에서 여러 변수에 나눠 담아 포장을 푸는 행위(`Unpacking`) 역시 모두 이 튜플 시스템 덕에 가능한 편리한 기능들입니다.
