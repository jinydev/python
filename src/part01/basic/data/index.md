---
layout: docs
title: "3. 데이터와 파이썬 객체 모델"
permalink: /part01/basic/data/
---

# 3. 데이터와 파이썬 객체 모델

파이썬은 "모든 데이터가 객체(Object)다"라는 철학을 근간으로 설계된 언어입니다. 우리가 일상적으로 사용하는 숫자 1부터 거대한 인공지능 모델 요소까지 모두 파이썬 내부에서는 객체라는 틀 안에서 공통된 규칙(데이터 모델)의 지배를 받습니다.

이번 장에서는 이러한 객체들의 속성을 들여다보고, 파이썬이 기본적으로 제공하는 내장 자료형(Built-in Data Type)을 관통하는 원리를 파악해 보겠습니다.

## 3.1 클래스, 객체, 그리고 인스턴스

자료형의 본질을 파악하기 위해 객체지향의 기본 용어들을 간단히 짚어보겠습니다.
- **클래스(Class)**: 데이터와 기능을 묶어 동일한 형태의 객체를 찍어내는 "설계도" 혹은 "틀"입니다. 파이썬에서는 클래스 자체도 메모리 구조를 갖춘 하나의 객체입니다.
- **객체(Object)**: 파이썬에서 메모리에 로드되어 구체적인 값과 상태를 가진 모든 요소를 총칭합니다.
- **인스턴스(Instance)**: 특정 클래스(설계도)를 기반으로 생성된 "실체"를 의미합니다. (예: `1`은 `int` 클래스의 인스턴스입니다.)

### 객체를 분석하는 도구 (Introspection)
주어진 데이터나 클래스가 어떤 속성과 기능을 품고 있는지 살펴볼 때 아래 세 가지 내장 함수를 주로 사용합니다.
1. `dir(객체)`: 해당 객체가 품고 있는 모든 메서드와 속성 목록을 리스트로 반환합니다.
2. `type(객체)`: 이 객체를 찍어낸 원본 설계도(클래스)가 무엇인지 알려줍니다.
3. `id(객체)`: 이 객체가 컴퓨터 메모리 상 어디에 상주하고 있는지 그 고유 주소(레퍼런스 정수)를 반환합니다.

```python
# 최상위 클래스 object의 속성 살펴보기
In : print(type(object))
Out: <class 'type'>

In : print(dir(object)[:5]) # 너무 길기 때문에 앞 5개만 출력
Out: ['__class__', '__delattr__', '__dir__', '__doc__', '__eq__']
```

---

## 3.2 파이썬의 주요 기본 자료형 모음

파이썬은 별도의 모듈 임포트 없이도 즉시 쓸 수 있는 강력한 기본 테이터 타입(내장 자료형)들을 제공합니다.

### 1) None 타입
값이 '아무것도 존재하지 않음'을 명시적으로 나타낼 때 쓰입니다. 다른 언어의 `Null`과 유사합니다. 단 하나뿐인 고유한 `NoneType` 인스턴스입니다.

### 2) 숫자 자료형 (Number)
정수(`int`), 부동소수점 실수(`float`), 복소수(`complex`)가 있습니다. 이들은 단일한 수치 데이터를 표현합니다.

### 3) 시퀀스 자료형 (Sequence)
여러 원소들이 '순서(Index)'를 가지고 나열된 집합체입니다.
- **문자열(`str`)**: 텍스트 데이터 보관
- **리스트(`list`)**: 다양한 요소를 섞어 담을 수 있는 유연한 가변 배열
- **튜플(`tuple`)**: 한 번 생성되면 내부 원소를 바꿀 수 없는 불변 배열

### 4) 매핑과 집합 자료형 (Mapping & Set)
- **딕셔너리(`dict`)**: 키(Key)와 값(Value)의 쌍으로 데이터를 빠르게 임의 접근할 수 있는 해시 기반 구조입니다.
- **세트(`set`)**: 중복을 허용하지 않고, 요소의 순서가 무의미한 수학적 집합체입니다.

---

## 3.3 객체의 비교: `==` 연산자 vs `is` 예약어

파이썬에서 두 데이터가 "같다"고 판단하는 기준은 두 가지로 나뉩니다.

1. **내용(값)의 동등성 (`==`)**: 두 객체 안에 들어있는 실제 내용물이 똑같은지를 봅니다. (권장)
2. **주소(레퍼런스)의 동일성 (`is`)**: 두 이름(변수)이 메모리 상의 완벽히 똑같은 객체 하나를 공유하고 있는지를 봅니다. (주로 `None` 검사에 사용)

```python
# 리스트 비교 예제
In : list_A = [1, 2, 3]
In : list_B = [1, 2, 3]

In : print(list_A == list_B) # 안에 든 숫자가 같으므로 True
Out: True

In : print(list_A is list_B) # 껍데기(메모리 주소)는 각자 생성되었으므로 False
Out: False
```

---

## 3.4 자료형의 가변성 (Mutable vs Immutable)

파이썬의 가장 중요한 개념 중 하나는 데이터 타입별 **가변성 여부**입니다. 한 번 생성된 후 자신의 메모리 상태를 "수정"할 수 있는지에 따라 자료형이 명확히 반으로 나뉩니다.

### 변경 불가 (Immutable) 자료형
**숫자형(`int`, `float`), 문자열(`str`), 튜플(`tuple`)** 등이 속합니다.  
값을 바꾸는 것처럼 코드를 짜더라도, 사실 내부적으로는 아예 새로운 객체를 새로 창조해 메모리에 띄우고 이름표만 바꿔 다는 식으로 동작합니다.

<div class="text-center my-4">
  <svg viewBox="0 0 600 250" width="100%" height="250" xmlns="http://www.w3.org/2000/svg">
    <style>
      .box { rx: 8; stroke-width: 2; }
      .text-val { font-size: 18px; font-weight: bold; font-family: monospace; }
      .label { font-size: 14px; font-family: sans-serif; fill: #666; }
      .arrow { stroke: #555; stroke-width: 2; fill: none; marker-end: url(#arr); }
    </style>
    <defs>
      <marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
      </marker>
    </defs>

    <!-- IMMUTABLE EXAMPLE -->
    <g transform="translate(50, 40)">
      <text x="70" y="-15" font-weight="bold" fill="#D32F2F">Immutable (문자열)</text>
      <!-- Label -->
      <rect x="0" y="0" width="60" height="30" fill="#FFCDD2" stroke="#E53935" class="box"/>
      <text x="30" y="20" text-anchor="middle" class="text-val" fill="#B71C1C">word</text>

      <!-- Original Box -->
      <rect x="120" y="-10" width="100" height="50" fill="#E3F2FD" stroke="#1E88E5" class="box">
        <animate attributeName="opacity" values="1;1;0.3;0.3;1" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="170" y="20" text-anchor="middle" class="text-val" fill="#0D47A1">
        <animate attributeName="opacity" values="1;1;0.3;0.3;1" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
        "Hello"
      </text>
      <text x="170" y="55" text-anchor="middle" class="label">id: 111</text>

      <!-- New Box (After concatenation) -->
      <rect x="120" y="60" width="140" height="50" fill="#E8F5E9" stroke="#43A047" class="box" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="190" y="90" text-anchor="middle" class="text-val" fill="#1B5E20" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
        "Hello World"
      </text>
      <text x="190" y="125" text-anchor="middle" class="label" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
        id: 222 (New!)
      </text>

      <!-- Arrow -->
      <path d="M 60,15 L 110,15" class="arrow">
        <animate attributeName="d" values="M 60,15 L 110,15; M 60,15 L 110,15; M 60,20 L 110,80; M 60,20 L 110,80; M 60,15 L 110,15" keyTimes="0; 0.4; 0.5; 0.9; 1" dur="5s" repeatCount="indefinite" />
      </path>
    </g>

    <!-- MUTABLE EXAMPLE -->
    <g transform="translate(350, 40)">
      <text x="70" y="-15" font-weight="bold" fill="#1976D2">Mutable (리스트)</text>
      <!-- Label -->
      <rect x="0" y="0" width="60" height="30" fill="#BBDEFB" stroke="#1E88E5" class="box"/>
      <text x="30" y="20" text-anchor="middle" class="text-val" fill="#0D47A1">bag</text>

      <!-- Persistent Box -->
      <rect x="120" y="-10" width="120" height="120" fill="#FFF3E0" stroke="#FB8C00" class="box" />
      <text x="180" y="125" text-anchor="middle" class="label">id: 333 (Same)</text>

      <!-- Original Item -->
      <rect x="130" y="0" width="100" height="30" fill="#FFE082" stroke="#FFB300" class="box"/>
      <text x="180" y="20" text-anchor="middle" class="text-val" fill="#E65100">'apple'</text>
      
      <!-- Appended Item -->
      <rect x="130" y="40" width="100" height="30" fill="#FFE082" stroke="#FFB300" class="box" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="180" y="60" text-anchor="middle" class="text-val" fill="#E65100" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
        'cherry'
      </text>

      <!-- Arrow stays the same -->
      <path d="M 60,15 L 110,40" class="arrow" />
    </g>
  </svg>
</div>
```python
In : word = "Hello"
In : print(id(word))
Out: 1111000

# "World"를 붙이게 되면, 기존 1111000 메모리가 변하는게 아니라 새 객체가 탄생합니다.
In : word = word + " World"
In : print(id(word))
Out: 2222000
```

### 변경 가능 (Mutable) 자료형
**리스트(`list`), 딕셔너리(`dict`), 세트(`set`)** 가 속합니다.  
객체의 메모리 주소(id)는 그대로 고정된 채, 그 보따리 속의 내용물(원소)들만 자유롭게 추가, 삭제, 교체가 가능합니다.
```python
In : bag = ['apple', 'banana']
In : print(id(bag))
Out: 3333000

# 내용물을 추가해도 상자의 주소는 유지됩니다.
In : bag.append('cherry')
In : print(bag)
Out: ['apple', 'banana', 'cherry']
In : print(id(bag))
Out: 3333000
```
