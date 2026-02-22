---
layout: docs
title: "3. 지능형 컬렉션 생성 (Comprehension)"
permalink: /part01/formatting/comprehension/
---

# 3. 지능형 컬렉션 생성 (Comprehension)

수학에서 집합을 정의할 때 '조건 제시법'을 쓰듯, 파이썬도 여러 줄의 `for`문과 `if`문을 거쳐 배열을 만드는 대신 단 한 줄의 표현식만으로 컬렉션 내부 요소 전체를 동적으로 찍어내는 **지능형(Comprehension)** 생성 문법을 제공합니다. 

이 방식은 단순히 코드가 짧아지는 것을 넘어 파이썬 내부 C 최적화 엔진을 직접 통과하므로 일반 `for`문에 비해 **실행 속도도 월등히 빠르며**, 변수의 범위(Namespace)가 블록 내부로 엄격히 제한되어 외부 변수를 오염시키지도 않습니다.

## 3.1 지능형 리스트 (List Comprehension)

파이썬 코딩의 꽃이자 가장 빈번하게 사용되는 패턴입니다. 대괄호 `[]` 안에 가공할 출력값, `for`문, 그리고 필터 역할을 할 `if`문을 순서대로 배치합니다.

**기본 문법: `[표현식 for 변수 in 반복가능객체 if 조건식]`**

```python
# 1. 일반적인 for문 사용 방식
squares = []
for i in range(10):
    if i % 2 == 0:  # 짝수일 때만
        squares.append(i * i) # 제곱해서 넣기

print(squares) # [0, 4, 16, 36, 64]


# 2. 지능형 리스트 방식 (단 1줄로 완벽히 대체)
clever_squares = [i * i for i in range(10) if i % 2 == 0]

print(clever_squares) # [0, 4, 16, 36, 64]
```

### 다중 반복문 (Nested For)
지능형 문법 내에서 `for`문을 여러 개 이어 붙이면 리스트 안에 튜플 쌍을 만들거나, 2차원 리스트 형태를 매우 쉽게 뽑아낼 수 있습니다. 

```python
# 구구단 조합 만들기
pairs = [(x, y) for x in range(2) for y in range(3)]

print(pairs) 
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]
```

---

## 3.2 지능형 딕셔너리 (Dict Comprehension)

지능형 문법은 리스트뿐만 아니라 딕셔너리(`dict`) 포맷에도 그대로 적용됩니다. 

중괄호 `{}` 를 사용하며 출력값 부분에 반드시 콜론(`:`)을 이용한 **`Key: Value`** 쌍 형태의 표현식이 들어가야 합니다. 리스트 요소들의 인덱스와 값을 뒤집어 딕셔너리를 만들거나, 두 리스트를 결합할 때 탁월합니다.

```python
word = "Python"

# 문자열에서 문자(char)를 Key로, 해당 글자의 인덱스 번호를 Value로 하는 사전 생성
char_dict = {char: idx for idx, char in enumerate(word)}

print(char_dict)
# {'P': 0, 'y': 1, 't': 2, 'h': 3, 'o': 4, 'n': 5}
```

---

## 3.3 지능형 집합 (Set Comprehension)

지능형 딕셔너리와 같이 중괄호 `{}`를 사용하지만, 콜론 없이 요소 1개만 반환하도록 명시하면 파이썬은 이를 **'지능형 집합(Set)'**으로 알아서 인식합니다. 

집합의 특성 덕분에 결과물 배열 내의 모든 데이터는 자동으로 "중복"이 말끔히 제거됩니다.

```python
raw_data = [1, -1, 2, -2, 3, -3]

# 절댓값 처리(abs)를 진행한 뒤 집합에 쏟아 넣기
unique_absolutes = {abs(x) for x in raw_data}

print(unique_absolutes) 
# {1, 2, 3} (결괏값의 중복이 자동으로 제거됨)
```
