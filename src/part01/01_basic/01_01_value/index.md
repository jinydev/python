---
layout: docs
title: "1. Python의 값(Value) 처리"
permalink: /part01/01_basic/01_01_value/
---

# 1. Python의 값(Value) 처리

파이썬 환경에서는 우리가 다루는 모든 데이터가 근본적으로 하나의 **값(Value)**, 즉 **객체(Object)** 형태로 관리됩니다. 이렇게 모든 요소를 객체로 다루게 되면, 코드 전반에서 일관성 있는 처리가 가능해집니다.

## 1.1 리터럴 (Literal)

프로그래밍에서 **리터럴(Literal)**이란, 코드 상에 고정된 형태로 직접 입력되어 그 자체가 값을 나타내는 표기법을 뜻합니다. 

파이썬에서는 정수, 실수(부동소수점), 문자열, 불리언(True/False) 등 다양한 형태의 리터럴을 지원하며, 입력 즉시 고유의 객체와 값으로 평가됩니다.

### 리터럴 실습 예제
셀(Cell) 또는 터미널에서 리터럴 값을 직접 입력하고 실행하면 파이썬 엔진은 그 값을 그대로 반환하여 출력합니다.

```python
# 1. 정수 리터럴
In : 100
Out: 100

# 2. 실수 리터럴
In : 3.14
Out: 3.14

# 3. 문자열 리터럴
In : "Hello Python!"
Out: "Hello Python!"
```

---

## 1.2 표현식 (Expression)

값(리터럴) 하나만 단독으로 쓸 수도 있지만, 보통 여러 값을 엮어서 특정한 수학적/논리적 결과를 만들어냅니다. 이를 **표현식(Expression)**이라고 부릅니다.

표현식을 만들기 위해서는 계산의 대상이 되는 **피연산자(Operand)**와, 연산을 지시하는 **연산자(Operator)**가 필요합니다.
- **단항 연산(Unary)**: 하나의 값에 작용 (예: `-5`)
- **이항 연산(Binary)**: 두 개의 값에 작용 (예: `3 + 4`)

### 표현식의 평가 원리
파이썬 엔진이 표현식을 읽고 나면, 연산자 우선순위 규칙에 따라 순차적으로 계산을 수행합니다. 제일 중요한 규칙은 **모든 표현식은 실행 후 최종적으로 "단 하나의 값"으로 평가된다**는 점입니다. 함수 호출 역시 그 자체가 반환값을 가지므로 표현식의 일종으로 취급됩니다. 괄호 `( )`를 사용하면 연산의 우선순위를 강제할 수 있습니다.

<div class="text-center my-4">
  <svg viewBox="0 0 600 150" width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
    <style>
      .block { fill: #FFE082; stroke: #FFB300; stroke-width: 2; rx: 8; }
      .op { font-size: 24px; font-weight: bold; fill: #555; font-family: sans-serif; }
      .val { font-size: 20px; font-weight: bold; fill: #333; font-family: monospace; }
      .result-box { fill: #81C784; stroke: #388E3C; stroke-width: 2; rx: 8; opacity: 0; }
      .result-val { font-size: 24px; font-weight: bold; fill: #fff; font-family: monospace; opacity: 0; }
    </style>
    <g transform="translate(50, 50)">
      <!-- Expression 10 + 20 * 2 -->
      <rect x="0" y="0" width="60" height="40" class="block" />
      <text x="30" y="26" text-anchor="middle" class="val">10</text>
      <text x="85" y="26" text-anchor="middle" class="op">+</text>
      <rect x="110" y="0" width="60" height="40" class="block" />
      <text x="140" y="26" text-anchor="middle" class="val">20</text>
      <text x="195" y="28" text-anchor="middle" class="op">*</text>
      <rect x="220" y="0" width="60" height="40" class="block" />
      <text x="250" y="26" text-anchor="middle" class="val">2</text>
      <text x="310" y="26" text-anchor="middle" class="op">=</text>
      <!-- Result Box -->
      <g transform="translate(340, 0)">
        <rect x="0" y="-5" width="80" height="50" class="result-box">
           <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.9;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <text x="40" y="28" text-anchor="middle" class="result-val">
           <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.9;1" dur="4s" repeatCount="indefinite" />
           50
        </text>
      </g>
      <!-- Highlight Priority (Multiplication) -->
      <rect x="100" y="-10" width="190" height="60" fill="none" stroke="#E53935" stroke-width="3" stroke-dasharray="5,5" rx="10" opacity="0">
         <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.1;0.4;0.5;1" dur="4s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
</div>

### 표현식 실습 예제
```python
# 숫자 연산 표현식
In : 10 + 20 * 2
Out: 50

# 문자열 연결 표현식
In : "Python " + "Programming"
Out: "Python Programming"
```

---

## 1.3 조건식 (Condition Expression)

일반적인 표현식 모음 중에서도, 결과가 항상 참(True) 또는 거짓(False)인 불리언(Boolean) 형태로 평가되는 특별한 표현식이 있는데 이를 **조건식(Condition Expression)**이라고 합니다. 보통 `if` 구문이나 `while` 반복문 등 흐름을 제어할 때 사용됩니다.

### 조건식 실습 예제
빈 문자열이나 숫자 0처럼 데이터가 비어있거나 없는 상태는 파이썬에서 `False`로 취급됩니다. 그 외 데이터가 존재하는 경우는 `True`가 됩니다.

```python
# 내장 bool() 함수를 이용한 조건 평가
In : bool("")
Out: False

In : bool("Python")
Out: True
```

`if` 문안에 조건식을 직접 배치하여 실행의 흐름을 분기할 수 있습니다.

```python
In : text_data = ""
In : if text_data:
        print("데이터가 존재합니다.")
     else:
        print("데이터가 비어있습니다. (False로 평가됨)")
Out: 데이터가 비어있습니다. (False로 평가됨)
```
