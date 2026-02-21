---
layout: docs
title: "2. 숫자들의 가계도 (numbers)"
permalink: /part03/13_abstract/13_02_section/
---

# 2. 숫자들의 가계도 (`numbers`)

우리가 매일 쓰는 1, 3.14 같은 단순한 숫자들도 파이썬 내부에서는 아주 거대한 족보(추상 클래스 체계)를 가지고 있습니다. 파이썬의 `numbers` 모듈을 들여다보면 수학의 수 체계가 그대로 코드로 구현되어 있습니다.

## 2.1 숫자의 가장 큰 조상, Number

모든 숫자의 단군 할아버지(?) 격인 추상 클래스는 `Number`입니다. 정수(`int`), 실수(`float`), 복소수(`complex`) 등 파이썬 내의 모든 숫자 자료형은 결국 이 `Number` 소속입니다.

```python
import numbers

# 정수 10은 Number의 후손이 맞을까?
print(isinstance(10, numbers.Number)) # True

# 3.14 (실수)도 Number의 후손일까?
print(isinstance(3.14, numbers.Number)) # True
```

---

## 2.2 구체적인 숫자 계급표

`numbers` 모듈 안에는 점차 구체화되는 4단계의 숫자 추상 클래스 계급이 있습니다. 

1. **`Number` (수)**: 가장 큰 범주 (더하기, 빼기 등을 포괄적 정의)
2. **`Complex` (복소수)**: 내장 `complex` 타입과 연관 (실수부, 허수부 등)
3. **`Real` (실수)**: 내장 `float` 타입과 연관
4. **`Rational` (유리수)**: 분수 표기가 가능한 숫자 (예: `fractions.Fraction`)
5. **`Integral` (정수)**: 내장 `int` 타입과 연관

(아래로 내려갈수록 상위 클래스의 성질을 물려받아 더 좁은 범위의 숫자가 됩니다.)

```python
import numbers
import fractions

# int(정수)는 Integral(정수 추상 클래스)의 자식입니다.
print(issubclass(int, numbers.Integral)) # True

# 분수(Fraction)는 실수(Real)의 자식입니다.
print(issubclass(fractions.Fraction, numbers.Real)) # True
```

파이썬의 내장 함수나 연산자들은 내부적으로 숫자가 들어올 때 "아, 이 녀석이 `Real` 추상 클래스의 규격을 만족하는 (즉, 더하고 뺄 수 있는) 진짜 숫자가 맞구나!"라고 판단하여 똑똑하게 계산을 처리합니다.
