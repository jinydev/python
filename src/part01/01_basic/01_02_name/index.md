---
layout: docs
title: "2. 이름(Name)과 네임스페이스"
permalink: /part01/01_basic/01_02_name/
---

# 2. 이름(Name)과 네임스페이스

파이썬에서 생성된 모든 **값(Value)**을 재사용하려면 그것들을 호출할 수 있는 명칭이 필요합니다. 우리는 데이터를 메모리에 적재한 후, 그 메모리 주소를 가리키는 라벨을 붙이게 되는데, 이를 **이름(Name)** 또는 **식별자(Identifier)**라고 부릅니다. 

파이썬은 작성된 모든 식별자들을 **네임스페이스(Namespace)**라는 고유한 관리 공간에 등록하여 충돌 없이 사용할 수 있도록 통제합니다. 식별자로 쓰일 수 있는 대상에는 변수, 함수, 클래스, 모듈, 패키지 등이 존재합니다.

## 2.1 예약어(Keyword) 확인하기

문법의 구조를 파악하기 위해 파이썬 시스템 내부에서 미리 독점하여 사용 중인 단어들을 **예약어(Keyword)**라고 합니다. 예약어는 일반적인 변수나 함수의 식별자로 사용할 수 없습니다.

어떤 단어들이 예약어인지 파악하기 위해 `keyword` 내장 모듈을 사용할 수 있으며, `pprint`(Pretty Print) 모듈을 엮어 결과를 깔끔하게 출력해 볼 수 있습니다.

### 예약어 출력 예제
```python
import keyword
import pprint

# 현재 파이썬 버전에 등록된 30여 개의 예약어 목록 가져오기
print("파이썬 예약어 목록:")
pprint.pprint(keyword.kwlist, compact=True)
```
*실행 결과 (`and`, `break`, `class`, `def`, `if`, `True`, `False` 등 내부 핵심 문법 용어들이 출력됩니다.)*

> **SyntaxError 주의**  
> `for`나 `in` 같은 예약어를 변수명으로 강제 할당하려고 하면, 파이썬 인터프리터는 구문 에류(`SyntaxError: invalid syntax`)를 뱉고 실행을 거부합니다.

---

## 2.2 파이썬 명명 규칙 (Naming Convention)

식별자는 코드의 가독성과 협업을 위해 언어 생태계 전반에서 합의된 권장 표기법(PEP 8 등)을 따르는 것이 좋습니다. 기본적으로 식별자는 **알파벳, 숫자, 언더바(`_`)**로만 구성해야 하며 빈칸이나 특수문자를 포함할 수 없습니다.

### 주요 명명 규칙 요약표

|      종류       | 규칙 설명                                                         | 예시                             |
| :-------------: | :---------------------------------------------------------------- | :------------------------------- |
|    **상수**     | 모든 글자를 대문자로 표기하며 언더바로 띄어쓰기                   | `MAX_COUNT`, `PORT`              |
|  **변수/함수**  | 모든 글자를 소문자로 표기하며 언더바로 띄어쓰기 (스네이크 케이스) | `user_name`, `get_data()`        |
|   **클래스**    | 단어의 첫 글자마다 대문자로 표기 (파스칼 또는 카멜 케이스)        | `DatabaseManager`, `UserAccount` |
| **비공개 속성** | 변수나 메서드 이름 앞에 언더바 두 개 장착                         | `__secret_key`                   |

> **이름 선언 제약 사항**  
> 모든 식별자(이름)의 맨 첫 글자는 절대 **숫자(0~9)로 시작할 수 없습니다.** 에러가 발생합니다.

---

## 2.3 변수(Variable)의 작동 원리

C언어나 Java와 같은 과거의 정적 타입 언어들과 달리, 파이썬의 변수는 박스 형태의 저장 공간이 아니라 단순히 데이터 객체가 머무는 메모리의 주소를 보관하는 **이름표(주소 레퍼런스)**에 불과합니다.

- 변수를 선언할 때 자료형(정수, 실수 등)을 미리 선언할 필요가 없습니다.
- 단순히 선언된 이름에 `=` 연산자를 이용해 값을 연결(묶음)해주기만 하면 됩니다.

<div class="text-center my-4">
  <svg viewBox="0 0 600 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
    <style>
      .memory-box { fill: #E3F2FD; stroke: #64B5F6; stroke-width: 2; rx: 8; }
      .memory-text { font-size: 20px; font-weight: bold; fill: #1565C0; font-family: monospace; }
      .label-box { fill: #FFEB3B; stroke: #FBC02D; stroke-width: 2; rx: 4; }
      .label-text { font-size: 18px; font-weight: bold; fill: #F57F17; font-family: sans-serif; }
      .arrow { stroke: #E53935; stroke-width: 3; fill: none; marker-end: url(#arrowhead); }
    </style>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#E53935" />
      </marker>
    </defs>
    <!-- Memory object -->
    <g transform="translate(350, 50)">
      <rect x="0" y="0" width="120" height="60" class="memory-box" />
      <text x="60" y="36" text-anchor="middle" class="memory-text">100</text>
      <text x="60" y="80" text-anchor="middle" font-size="12" fill="#777">Memory Object</text>
    </g>
    <!-- Name Label -->
    <g transform="translate(100, 50)">
      <rect x="0" y="10" width="100" height="40" class="label-box" />
      <text x="50" y="37" text-anchor="middle" class="label-text">temp_value</text>
      <text x="50" y="80" text-anchor="middle" font-size="12" fill="#777">Name</text>
    </g>
    <!-- Reference Arrow -->
    <path d="M 210,30 L 330,80" class="arrow" opacity="0">
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="4s" repeatCount="indefinite" />
      <animate attributeName="d" values="M 210,30 L 210,30; M 210,30 L 335,80" keyTimes="0;1" dur="0.8s" begin="0s" fill="freeze" />
    </path>
    <text x="270" y="45" font-size="14" fill="#E53935" font-weight="bold" opacity="0">
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="4s" repeatCount="indefinite" />
      Reference
    </text>
  </svg>
</div>

### 변수 할당 에러 (NameError)
가상 공간에 변수 이름만 던져놓고 아무런 값을 할당하지 않은 채 호출하게 되면, 파이썬의 네임스페이스에는 해당 식별자가 존재하지 않기 때문에 언제나 `NameError: name '...' is not defined` 에러가 발생합니다.

```python
# 에러가 발생하는 경우
In : temp_value
Out: NameError: name 'temp_value' is not defined

# 올바른 사용법
In : temp_value = 100
In : temp_value
Out: 100
```

---

## 2.4 함수와 클래스의 고유 이름 (`__name__`)

변수뿐만 아니라 함수와 클래스 객체 역시 생성 시점에 자신들만의 식별자를 네임스페이스에 저장합니다. 이때 파이썬 인터프리터는 객체 내부에 `__name__` 이라는 특수한 속성을 자동으로 부여하여 해당 객체의 본래 이름을 텍스트(문자열)로 간직합니다.

```python
# 함수 정의
def calculate_sum():
    pass

print(calculate_sum.__name__)  # 출력 결과: "calculate_sum"

# 클래스 정의
class MachineLearningModel:
    pass

print(MachineLearningModel.__name__)  # 출력 결과: "MachineLearningModel"
```

이와 같이 파이썬에서는 모든 요소가 이름(Name)을 부여받은 객체로서 네임스페이스 내부에서 안전하고 일관적으로 관리됩니다.
