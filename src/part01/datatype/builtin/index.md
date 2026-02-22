---
layout: docs
title: "3. 내장 숫자 클래스 심화"
permalink: /part01/datatype/builtin/
---

# 3. 내장 숫자 클래스 심화

파이썬의 숫자는 단순한 값이 아니라 모두 내장 클래스로부터 파생된 어엿한 객체(Instance)들입니다. 

기본적으로 제공되는 정수(`int`), 불리언(`bool`), 실수(`float`), 복소수(`complex`) 외에도, 수치 정밀도를 완벽히 통제해야 하는 금융/과학 계산을 위해 파이썬은 `fractions`와 `decimal` 같은 강력한 모듈들을 기본적으로 내장하고 있습니다.

## 3.1 정수 ( `int` )

수학의 정수와 동일하며, 파이썬 3부터는 메모리 허용치 안에서 자릿수 제한 없이(`long` 타입이 폐지되어 `int`로 통합됨) 무한대의 정수를 다룰 수 있습니다.

내부적으로 `bit_length()` 메서드를 포함해 정수의 이진수 길이를 확인하거나, 바이트(Byte) 배열로부터 곧바로 정수를 추출해 내는(`from_bytes`) 유용한 기능들을 내포하고 있습니다.

---

## 3.2 불리언 ( `bool` )

참과 거짓을 판별하는 `True`, `False` 값은 파이썬 내부적으로 **`int` 클래스를 상속받아 만들어진 정수의 일종**입니다. 즉 `True`는 사실상 `1`, `False`는 `0`과 동일하게 동작합니다. 

```python
# bool은 int의 자식 클래스입니다.
print(issubclass(bool, int)) # True

# 따라서 산술 연산도 통과합니다 (권장하지는 않음)
print(True + True) # 2
print(False * 10)  # 0
```

---

## 3.3 실수 ( `float` ) 와 복소수 ( `complex` )

### 부동소수점 실수 (float)
소수점을 지닌 숫자이며, 내부적으로 C 언어의 `double` 에 준하는 배정밀도(8바이트)로 처리됩니다. `float` 구조상 무한 소수를 유한한 메모리에 담아야 하므로, 필연적으로 **미세한 반올림 오차(정밀도 이슈)**가 발생합니다.

- `is_integer()`: 소수부 값이 `.0` 으로 딱 떨어지는지 검사합니다.
- `as_integer_ratio()`: 해당 실수를 기약분수 형태의 (분자, 분모) 튜플로 반환합니다.

### 복소수 (complex)
수학과 달리 허수 단위를 기호 `j` 로 표기합니다. 
- 복소수 속성: `real` (실수부), `imag` (허수부)
- `conjugate()`: 허수부의 부호가 역전된 켤레복소수를 반환합니다.

---

## 3.4 분수와 초정밀 실수 연산 ( `fractions`, `decimal` )

### 분수 모듈 (`fractions.Fraction`)
실수의 근사치 오차를 원천 차단하고 싶을 때, 아예 숫자를 분자/분모 형태의 유리수로 유지하며 계산하는 모듈입니다.

```python
import fractions

# 인자: (분자, 분모)
fraction_val = fractions.Fraction(3, 4)
print(fraction_val) # 3/4
```

### 십진 초정밀 모듈 (`decimal.Decimal`)
금융/은행권 처리처럼 단 0.000000001의 소수점 오차도 허용 불가능할 때 사용하는 최고 정밀도 객체입니다. 전역 컨텍스트(`getcontext().prec`)를 수정하여 소수점 아래 무한 자릿수까지 정밀도를 통제할 수 있습니다.

> [!WARNING]
> `Decimal`을 생성할 때 일반 `float` 자료형을 그대로 집어넣으면, 이미 `float` 자체에 스며들어 있던 오차가 그대로 전달됩니다. 따라서 반드시 **문자열(String) 형태의 숫자**로 초기화해야 절대 정밀도를 보장받을 수 있습니다.

```python
import decimal

# 나쁜 예 (float 오차 발생)
bad_dec = decimal.Decimal(0.1)

# 좋은 예 (오차 원천 차단)
good_dec = decimal.Decimal("0.1") 
```
