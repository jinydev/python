---
layout: docs
title: "1. 변수 할당의 원리 (Packing & Unpacking)"
permalink: /part02/parameter/section1/
---

# 1. 변수 할당의 원리 (Packing & Unpacking)

함수의 매개변수가 작동하는 심층적인 원리를 이해하기 위해서는, 먼저 파이썬이 데이터를 변수에 할당할 때 발생하는 **패킹(Packing, 포장하기)**과 **언패킹(Unpacking, 포장 풀기)**의 마법을 짚고 넘어가야 합니다.

## 1.1 컬렉션을 흩뿌려 담기 (언패킹)

리스트, 튜플, 문자열 등 **여러 개의 요소를 가진 데이터(컬렉션)**를 그 개수에 딱 맞춰 콤마(`,`)로 구분된 여러 변수에 일대일로 대입하면, 파이썬은 컬렉션의 껍데기를 벗기고 내용물을 각각의 변수에 나누어 담습니다.

```python
# 1. 튜플 언패킹
a, b, c = (10, 20, 30)
print(a) # 10

# 2. 리스트 언패킹
x, y, z = ["파", "이", "썬"]
print(y) # "이"

# 3. 문자열 언패킹
s1, s2, s3 = "Mac"
print(s1, s2, s3) # M a c
```

이 언패킹 원리를 응용하면 프로그래머들에게 가장 사랑받는 **'임시 변수 없는 변수 값 교환(Swap)'** 기법이 탄생합니다.

```python
left = "사과"
right = "바나나"

# 다른 언어처럼 임시 변수(temp)를 만들 필요 없이,
# 우항에서 튜플로 '패킹'되고, 좌항의 변수들에 다시 '언패킹'됨!
left, right = right, left

print(left)  # 바나나
print(right) # 사과
```

---

## 1.2 변수 개수가 모자랄 때? 별표(`*`) 패킹

언패킹을 하려고 좌측 변수를 나열했는데 우측 데이터의 개수보다 모자라면 어떻게 될까요? 파이썬은 어디에 담아야 할지 몰라 즉시 `ValueError`를 발생시킵니다.

이럴 때, 특정 변수 앞에 구원투수인 **별표(`*`) 표기법**을 붙여주면 남는 모든 잉여 데이터들을 전부 끌어모아 **'하나의 리스트'**로 다시 뭉쳐서(Packing) 담아줍니다.

```python
# 변수는 2개인데 데이터는 4개일 때
# b 앞에 *를 붙여주면 a가 첫 번째 1을 가져가고 남은 나머지 전체를 b가 리스트로 흡수!
a, *b = (1, 2, 3, 4)

print(a) # 1
print(b) # [2, 3, 4]

# *의 위치는 자유롭습니다.
*head, tail = "Python"
print(head) # ['P', 'y', 't', 'h', 'o']
print(tail) # 'n'
```

---

## 1.3 딕셔너리(Dict)의 언패킹과 병합

원소가 단순히 줄지어 있는 리스트와 달리, 키(Key)와 값(Value)의 쌍으로 이루어진 딕셔너리는 언패킹을 할 때 **별표 2개(`**`)**를 사용해야 키와 값이 온전히 전달됩니다.

주로 두 개 이상의 딕셔너리를 손쉽게 하나로 합칠(Merge) 때 이 표기법이 아주 유용하게 쓰입니다.

```python
dict_a = {"name": "Alice", "age": 25}
dict_b = {"city": "Seoul", "job": "Developer"}

# 1. 별 1개(*) 사용 시: Key 들만 추출되어 모임 (집합(set)이나 리스트 형태)
keys_only = {*dict_a, *dict_b}
print(keys_only) # {'name', 'age', 'city', 'job'}

# 2. 별 2개(**) 사용 시: Key-Value 쌍이 모두 추출되어 새로운 딕셔너리로 완벽하게 병합됨!
merged_dict = {**dict_a, **dict_b}
print(merged_dict) 
# {'name': 'Alice', 'age': 25, 'city': 'Seoul', 'job': 'Developer'}
```
