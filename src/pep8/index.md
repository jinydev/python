---
layout: docs
title: "파이썬 스타일 가이드: PEP 8 핵심 정리"
permalink: /pep8/
description: "파이썬 공식 코딩 스타일 가이드인 PEP 8(Python Enhancement Proposal 8)의 핵심 규칙인 네이밍 컨벤션, 코드 레이아웃, 공백 규칙, 프로그래밍 권장 사항을 예제와 함께 정리합니다."
keywords: "PEP 8, PEP8, 파이썬 스타일 가이드, 파이썬 코딩 규칙, snake_case, PascalCase, 파이썬 클린코드, jinydev"
---

# 🐍 파이썬 공식 스타일 가이드: PEP 8 핵심 정리

> *"코드는 작성하는 시간보다 읽히는 시간이 훨씬 길다."*  
> — 귀도 반 로섬 (Guido van Rossum)

**PEP 8(Python Enhancement Proposal 8)**은 파이썬 창시자 귀도 반 로섬, 배리 워소(Barry Warsaw), 닉 코글런(Nick Coghlan)이 2001년에 작성한 **파이썬 공식 소스 코드 스타일 가이드(Style Guide for Python Code)**입니다.

파이썬의 가장 큰 장점 중 하나는 "가독성(Readability)"입니다. 전 세계의 수많은 파이썬 개발자와 오픈소스 프로젝트, 그리고 PyTorch, NumPy, DeZero와 같은 프레임워크들이 통일된 규칙인 PEP 8을 준수함으로써 누구나 남의 코드를 마치 자신이 짠 것처럼 쉽게 읽고 협업할 수 있습니다.

---

## 📌 1. 명명 규칙 (Naming Conventions)

식별자(변수, 함수, 클래스, 모듈 등)의 이름을 짓는 규칙은 PEP 8에서 가장 널리 쓰이며 중요한 부분입니다.

| 대상 | 표기법 (Convention) | 올바른 예시 | 지양해야 할 예시 |
| :--- | :--- | :--- | :--- |
| **클래스 (Class)** | **PascalCase** (CapWords) | `Variable`, `Function`, `LinearRegression` | `variable`, `linear_regression` |
| **함수 (Function)** | **snake_case** (소문자 + 밑줄) | `numerical_diff()`, `forward()`, `get_data()` | `numericalDiff()`, `GetData()` |
| **메서드 (Method)** | **snake_case** (소문자 + 밑줄) | `def backward(self):` | `def Backward(self):` |
| **변수 (Variable)** | **snake_case** (소문자 + 밑줄) | `input_data`, `learning_rate`, `batch_size` | `inputData`, `LR`, `b` |
| **상수 (Constant)** | **UPPER_SNAKE_CASE** (대문자 + 밑줄) | `MAX_ITER`, `DEFAULT_EPSILON`, `PI` | `max_iter`, `defaultEpsilon` |
| **모듈 (Module / .py)** | **짧은 소문자** (밑줄 지양) | `dezero`, `tensor`, `layers.py` | `my_long_module_name.py` |
| **패키지 (Package / 폴더)** | **짧은 소문자** (밑줄 사용 안 함) | `numpy`, `matplotlib`, `dezero` | `Deep_Learning_Framework` |

### 🔍 밑줄(_)의 특별한 의미
* `_single_leading_underscore` (예: `_internal_cache`): 모듈 내부나 클래스 내부에서만 비공개(private/internal)로 사용함을 암묵적으로 표시합니다. (`from module import *` 시 임포트되지 않음)
* `single_trailing_underscore_` (예: `class_`, `type_`): 파이썬 예약어(Keyword)와 충돌을 피하기 위해 뒤에 밑줄을 하나 붙입니다.
* `__double_leading_underscore` (예: `__private_attr`): 클래스 상속 시 이름 충돌을 방지하는 네임 맹글링(Name Mangling)을 발동시킵니다.
* `__dunder__` (예: `__init__`, `__call__`): 파이썬 언어가 미리 정의한 특수 매직 메서드(Magic/Dunder Method)입니다. 개발자가 임의로 만들어서는 안 됩니다.

---

## 📐 2. 코드 레이아웃 (Code Layout)

### ① 들여쓰기 (Indentation)
* **공백(Space) 4칸**을 원칙으로 합니다.
* 탭(Tab) 대신 항상 스페이스를 사용합니다. 탭과 공백을 절대 혼용해서는 안 됩니다 (파이썬 3에서는 탭과 스페이스 혼용 시 문법 오류 발생).

### ② 최대 줄 길이 (Maximum Line Length)
* 소스 코드 한 줄은 **최대 79자** 이하를 권장합니다.
* 긴 주석이나 독스트링(Docstring)은 **72자** 이하로 제한합니다.
* 긴 수식이나 괄호는 역슬래시(`\`)보다 소괄호 `()`를 활용한 암시적 행 연결(Implicit line continuation)을 사용합니다:
  ```python
  # 권장: 괄호를 이용한 자연스러운 줄바꿈
  total_loss = (
      loss_reconstruction 
      + loss_regularization 
      + penalty_term
  )
  ```

### ③ 빈 줄 (Blank Lines)
* **최상위(Top-level) 함수 및 클래스 정의 사이**: 빈 줄 **2줄**을 둡니다.
* **클래스 내부의 메서드 정의 사이**: 빈 줄 **1줄**을 둡니다.
* 함수 내부의 논리적 단락을 구분할 때: 빈 줄 **1줄**을 적절히 사용합니다.

### ④ 임포트 (Imports) 규칙
`import` 문은 항상 소스 파일의 **최상단(Top)**에 작성하며, 다음의 세 그룹으로 나누고 그룹 사이에 빈 줄 1칸을 둡니다:
1. **표준 라이브러리 (Standard Library)** (예: `os`, `sys`, `math`)
2. **서드파티 라이브러리 (Related Third Party)** (예: `numpy`, `matplotlib`)
3. **로컬 애플리케이션 / 라이브러리 모듈** (예: `dezero`, `steps`)

```python
# 올바른 임포트 순서 예시
import math
import sys

import numpy as np
import matplotlib.pyplot as plt

from dezero.core import Variable, Function
```

> ⚠️ **주의**: 한 줄에 여러 모듈을 임포트하지 마세요.  
> `import os, sys` (X) ➔ `import os` / `import sys` (O)  
> `from module import *` 와 같은 와일드카드 임포트는 네임스페이스 오염을 일으키므로 피해야 합니다.

---

## ⚪ 3. 표현식과 문장의 공백 (Whitespace)

### ① 괄호 바로 안쪽에는 공백을 두지 않음
```python
# 올바른 예 (Yes)
spam(ham[1], {eggs: 2})

# 지양할 예 (No)
spam( ham[ 1 ], { eggs: 2 } )
```

### ② 쉼표, 쌍점, 세미콜론 바로 앞에는 공백을 두지 않음
```python
# 올바른 예 (Yes)
if x == 4: print(x, y); x, y = y, x

# 지양할 예 (No)
if x == 4 : print(x , y) ; x , y = y , x
```

### ③ 이항 연산자 양옆 공백
할당(`=`), 비교(`==`, `<`, `>`), 불리언(`and`, `or`, `not`) 연산자 양옆에는 항상 **공백 1칸**을 둡니다:
```python
# 올바른 예 (Yes)
i = i + 1
submitted += 1
x = x * 2 - 1

# 지양할 예 (No)
i=i+1
submitted +=1
```

> 💡 **예외**: 함수의 기본 매개변수(default parameter)나 키워드 인수를 지정할 때는 `=` 주위에 공백을 두지 않습니다.
> ```python
> # 올바른 예
> def complex(real, imag=0.0):
>     return magic(r=real, i=imag)
> ```

---

## 💡 4. 프로그래밍 모범 권장 사항 (Programming Recommendations)

### ① 싱글톤 객체 비교는 항상 `is` / `is not`
`None`과 같은 싱글톤(단일 인스턴스) 객체를 비교할 때는 동등성(`==`)이 아닌 식별성(`is`)을 검사해야 합니다:
```python
# 올바른 예
if x is None:
    pass

if x is not None:
    pass

# 지양할 예
if x == None:
    pass
```

### ② 불리언(Boolean) 값의 직접 비교 지양
```python
# 올바른 예 (자연스럽고 파이썬다운 평가)
if is_valid:
    pass

# 지양할 예
if is_valid == True:
    pass
if is_valid is True:  # 불필요한 엄격성
    pass
```

### ③ 예외 처리 시 구체적인 Exception 명시
아무런 예외 타입을 지정하지 않는 이른바 'Bare except'는 `KeyboardInterrupt`나 `SystemExit`까지 가로채어 프로그램 종료를 방해하므로 절대로 피해야 합니다:
```python
# 올바른 예
try:
    value = int(raw_input)
except ValueError:
    value = 0

# 지양할 예 (버그 추적을 방해함)
try:
    value = int(raw_input)
except:
    value = 0
```

---

## 🛠️ 5. 딥러닝 프레임워크 DeZero에서의 PEP 8 적용

본 강좌인 **DeZero 프레임워크** 구현에서도 PEP 8의 명명 규칙과 코딩 컨벤션을 엄격하게 따르고 있습니다:

* **클래스명**: 계산 그래프의 노드가 되는 변수와 함수는 대문자로 시작하는 PascalCase를 적용합니다.
  - `class Variable:`
  - `class Function:`, `class Square(Function):`, `class Exp(Function):`
* **함수 및 메서드명**: 파이썬다운 간결한 snake_case를 사용합니다.
  - `def numerical_diff(f, x, eps=1e-4):`
  - `def backward(self):`
* **인스턴스 변수**:
  - `x.data` (값 데이터 ndarray)
  - `x.grad` (미분값 ndarray)
  - `x.creator` (변수를 만들어낸 함수 객체)

---

## 🔗 참고 링크 및 도구

* [파이썬 공식 PEP 8 명세 (python.org)](https://peps.python.org/pep-0008/)
* [PEP 257 – Docstring Conventions](https://peps.python.org/pep-0257/)
* [파이썬 코드 자동 정렬 도구]:
  - **Black**: 타협 없는 파이썬 공식 스타일 코드 포매터
  - **Flake8 / Ruff**: PEP 8 규칙 위반을 실시간으로 감지하는 린터(Linter)
