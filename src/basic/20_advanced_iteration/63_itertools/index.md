---
layout: docs
title: "63 마법의 순환 도구 상자: itertools 모듈"
permalink: /basic/20_advanced_iteration/63_itertools/
---

# 63 데이터 조립의 신: 마법의 순환 도구 상자 (`itertools`)

파이썬 창조주가 태초부터 만들어둔 기본 창고에는, 수많은 반복자(Iterator)들을 마치 찰흙이나 레고 블록처럼 이리저리 뭉치고 떼어내어 완전히 새로운 데이터 흐름을 만들어내는 초강력 마법 도구 상자가 있습니다. 바로 **`itertools` (아이터 툴즈)** 모듈입니다.

이 도구들도 모조리 **결과를 반복자 형태로만 돌려주기 때문에** (한꺼번에 리스트를 만들지 않음) 아무리 거대한 데이터를 집어넣어도 메모리가 폭발하지 않아 대규모 데이터 집계에 안성맞춤입니다.

## 1. 차곡차곡 데이터 쌓고 엮기

* **`accumulate` (눈덩이 계산기)**: 들어오는 값들을 계속 누적해서 더해주는 무서운 눈덩이 기계입니다.
* **`chain` (사슬 묶기)**: 생판 다른 두 개 이상의 리스트나 문자열을 하나의 거대한 밧줄로 길게 묶어줍니다.

```python
import itertools

# 1. 눈덩이 굴리기 (누적 합산)
numbers = [1, 2, 3, 4]
# 눈으로 결과물을 확인하기 위해 억지로 list()로 포장해줍니다.
acc_iter = itertools.accumulate(numbers)
print(list(acc_iter))  # [1, 3, 6, 10] (과정: 1, 1+2, 1+2+3, 1+2+3+4)

# 2. 다른 종족 리스트 이어 붙이기
list_a = [1, 2]
list_b = ["A", "B"]
chained_iter = itertools.chain(list_a, list_b)
print(list(chained_iter))  # [1, 2, 'A', 'B'] 무심하게 한 줄로 이어버림!
```

## 2. 모든 사건의 배후: 경우의 수 마스터 (순열과 조합)

카드 게임에서 내가 어떤 카드 패를 뽑을지 확률을 계산하거나, 자물쇠 번호의 모든 경우의 수를 부술 때 아주 유용한 도구들입니다.

* **`product` (카테시안 곱)**: 여러 주머니에서 각각 공을 1개씩 꺼내 만들 수 있는 모든 '짝꿍'을 만듭니다.
* **`permutations` (순열)**: **순서를 따져서** 가능한 모든 줄 세우기 포지션을 만듭니다.
* **`combinations` (조합)**: **순서에 상관없이** 그냥 뽑아온 조편성 경우의 수만 구합니다.

```python
import itertools

heroes = ["IronMan", "Thor", "Hulk"]

# 3명 중 2명을 뽑아서 '어떤 순서'로 공격을 보낼지? (순열)
perm = itertools.permutations(heroes, 2)
print("■ 공격조 (순서 중요):", list(perm)) 
# [('IronMan', 'Thor'), ('IronMan', 'Hulk'), ('Thor', 'IronMan'), 
#  ('Thor', 'Hulk'), ('Hulk', 'IronMan'), ('Hulk', 'Thor')]

# 3명 중 2명을 그냥 같은 '한 팀'으로 편성하기 (조합 - 순서 무관)
comb = itertools.combinations(heroes, 2)
print("■ 한 팀 (순서 무관):", list(comb))
# [('IronMan', 'Thor'), ('IronMan', 'Hulk'), ('Thor', 'Hulk')]
```

## 3. 폭주 기관차 멈추기! (무한 반복 컨트롤러)

때로는 `cycle`(무한 반복)이나 `count`(무한 숫자 세기)처럼 끝없이 데이터를 찍어내는 브레이크 고장 난 폭주 기관차 반복자를 만들어야 할 때가 있습니다. 이런 기관차를 적절하게 썰어버리는 훌륭한 안전 장치도 세트로 존재합니다.

* **`takewhile` (조건이 맞을 때까지만 살리기)**: 조건이 참(`True`)일 때까지만 문을 열어두고, 단 한 번이라도 거짓이 들어오면 가차 없이 셔터를 닫아 기계를 멈춥니다.
* **`dropwhile` (조건이 거짓일 때부터 다 살리기)**: 조건이 참이면 데이터를 쿨하게 쓰레기통에 버리다가, 거짓이 되는 순간부터 정신을 차리고 끝까지 모든 데이터를 쏟아냅니다.

```python
import itertools

# 1부터 0.5 간격으로 평생 무한히 숫자 세기 (1, 1.5, 2.0, 2.5, 3.0 ...)
무한숫자 = itertools.count(1, 0.5)

# 값이 3보다 작을 때까지만 문을 열어놔라!
안전한숫자 = itertools.takewhile(lambda x: x < 3, 무한숫자)

# 안전하게 멈추기 때문에 list()로 묶어도 컴퓨터가 터지지 않아요!
print("수집 요원:", list(안전한숫자)) # [1.0, 1.5, 2.0, 2.5]
```

이 밖에도 리스트의 일부분만 슬라이스 해주는 `islice`, 중복된 값을 그룹으로 에쁘게 묶어주는 `groupby` 등, `itertools`는 장인이 될수록 코드를 마법처럼 짧고 빠르게 만들어주는 파이썬 최고의 무기입니다.
