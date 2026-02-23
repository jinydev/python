---
layout: docs
title: "57 리스트 컴프리헨션: 한 줄로 끝내는 리스트 만들기"
permalink: /basic/17_comprehensions/57_list_comprehensions/
---

# 57 리스트 컴프리헨션: 한 줄로 끝내는 리스트 만들기

수학 시간에 배운 '조건제시법'과 똑같습니다. "이러이러한 조건을 만족하는 원소들을 모아서 집합으로 만들어라"라는 명령을 파이썬 코드로 그대로 번역한 것입니다.

**목표**: 1부터 5까지 숫자를 각각 3배 곱한 리스트 만들기

**코드: 초보자의 방식 (for문)**
```python
result = []
for i in range(1, 6):
    result.append(i * 3)

print(result) # [3, 6, 9, 12, 15]
```
초보자 시절에는 이렇게 세 줄이 필요했습니다. 하지만 컴프리헨션을 쓰면 대괄호 `[]` 안에서 모든 작업이 끝납니다.

**코드: 고수의 방식 (컴프리헨션)**
```python
# [넣을_값 for 변수 in 반복_가능한_데이터]
result = [i * 3 for i in range(1, 6)]

print(result) # [3, 6, 9, 12, 15]
```

### if문까지 한 줄에 구겨 넣기!
이번엔 1부터 10까지 숫자 중에서 **짝수만 골라서 제곱**해 보겠습니다.

```python
# [넣을_값 for 변수 in 데이터 if 조건]
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]

print(even_squares) # [4, 16, 36, 64, 100]
```
어떤가요? 이 코드는 다른 프로그래밍 언어 사용자들의 부러움을 한 몸에 받는 파이썬만의 아름다운 문법입니다. 

---

## 💻 실습: 리스트 컴프리헨션 마스터하기

**문제** 1부터 20까지의 숫자 중에서 5의 배수인 숫자들만 그대로 모아서 `my_list`라는 리스트로 만드는 코드를 컴프리헨션으로 작성해 보세요.

---
<details>
<summary><b>정답 확인하기</b></summary>

**해답**
```python
my_list = [i for i in range(1, 21) if i % 5 == 0]
```
</details>

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/b87bd0ab-7d7d-411a-82dc-eb4ebfccece9" width="400">
