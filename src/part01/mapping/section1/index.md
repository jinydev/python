---
layout: docs
title: "1. 딕셔너리(Dict)의 기본 구조와 생성 기준"
permalink: /part01/mapping/section1/
---

# 1. 딕셔너리(Dict)의 기본 구조와 생성 기준

파이썬의 **딕셔너리(Dictionary)**는 이름(Key)표를 찾아 이름표가 가리키는 실제 데이터(Value)를 즉시 추적하는 '매핑(Mapping)' 시스템을 제공합니다. 이는 실제 종이 사전에서 단어를 찾으면 뜻이 나오는 원리와 완벽히 일치합니다.

이러한 매핑형 데이터 구조는 인덱스 번호가 아닌 철저히 **키(Key)**를 중심으로 요소를 파악하므로 매우 빠른 데이터 탐색(Search) 속도를 보장합니다.

## 1.1 딕셔너리의 키 (Key) 할당 규칙

딕셔너리의 Key는 수만 개의 데이터를 검색할 때 길잡이가 되는 이정표 역할을 합니다. 파이썬에서는 이름표 구분을 명확히 하기 위해 Key를 생성할 때 철저하게 **'해시(Hash) 알고리즘'**을 적용합니다.

해시는 변경이 발생하면 완전히 다른 값으로 틀어지는 민감한 알고리즘입니다. 따라서 딕셔너리의 Key 자리에는 파이썬에서 **절대 데이터가 변하지 않는(Immutable) 자료형**만이 들어올 수 있습니다.

**Key로 쓸 수 있는 자료형 (생성 가능)**
- 정수(`int`), 실수(`float`)
- 문자열(`str`), 바이트(`bytes`)
- 불변 집합(`frozenset`)
- 모든 원소가 불변(Immutable) 객체로만 이루어진 튜플(`tuple`)
- 함수(`def`), 클래스(`class`), 인스턴스 (고유 메모리 주소를 가짐)

**Key로 쓸 수 없는 자료형 (생성 실패 - TypeError)**
- 리스트(`list`), 딕셔너리(`dict`), 가변 집합(`set`)
- 가변 원소(list 등)를 내부에 하나라도 포함하고 있는 튜플

---

## 1.2 딕셔너리의 생성과 데이터 중복 처리

빈 딕셔너리는 가장 널리 쓰이는 표기법인 대괄호 대신 중괄호 `{}` 형태의 리터럴로 생성하거나 명시적 내장 함수인 `dict()`를 사용합니다. 

```python
# 1. 빈 딕셔너리 생성
empty_dict = {}
also_empty = dict()
print(type(empty_dict)) # <class 'dict'>

# 2. 리터럴 기반 데이터 할당
user = {'name': 'John', 'age': 30}
```

### 다양한 방식의 딕셔너리 객체화 구조
파이썬은 개발자 편의성을 위해 다른 시퀀스 자료형들을 딕셔너리 구조로 둔갑시키는 강력한 팩토리(Factory) 패턴들을 내장하고 있습니다.

```python
# 1. 키워드 인자(Keyword arguments) 형태
d1 = dict(a=10, b=20, c=30)
# 출력: {'a': 10, 'b': 20, 'c': 30}

# 2. (Key, Value) 쌍의 튜플로 이루어진 리스트를 강제 변환
pairs = [('name', 'Alice'), ('role', 'Admin')]
d2 = dict(pairs)
# 출력: {'name': 'Alice', 'role': 'Admin'}
```

### 중복된 Key값이 주어졌을 경우의 방어 메커니즘
동일한 딕셔너리 안에 완전히 같은 Key가 두 개 이상 나타나는 것은 매핑 자료구조의 본질에 어긋납니다. 파이썬은 이런 모순을 겪을 때 코드를 정지시키지 않고 **'마지막으로 확인된 값을 최종값으로 덮어씌우는(Overwrite)'** 방식으로 문제를 회피합니다.

```python
# 키 'a'에 1을 할당했다가, 나중에 3으로 덮어씀
raw_list = [('a', 1), ('b', 2), ('a', 3)]
resolved_dict = dict(raw_list)

print(resolved_dict) 
# 출력 결과: {'a': 3, 'b': 2} (마지막 정보인 3이 최종 승리함)
```

---

## 1.3 기본값이 일괄 적용된 빈 딕셔너리 생성 (`fromkeys`)

게시판의 댓글 수, 방문자 수 집계처럼 특정 데이터 꾸러미(리스트, 튜플)를 가져와서 Key만 등록한 뒤 동일한 초기 빈방(None 이나 0)을 할당해 통계 준비용 딕셔너리를 뽑아낼 때 유용한 메서드입니다.

```python
keys_to_set = ["Seoul", "Busan", "Jeju"]

# fromkeys() 를 이용해 모든 Value를 동일한 None으로 일괄 초기화
city_stats = dict.fromkeys(keys_to_set)

print(city_stats)
# {'Seoul': None, 'Busan': None, 'Jeju': None}
```
