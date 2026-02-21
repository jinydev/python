---
layout: docs
title: "2. 마법의 순환 도구 상자 (itertools)"
permalink: /part03/14_iterator/14_02_section/
---

# 2. 마법의 순환 도구 상자 (`itertools`)

파이썬에는 반복자(Iterator)들을 마치 레고 블록처럼 이리저리 조립하고 가공해서 완전히 새로운 데이터 흐름을 만들어낼 수 있는 강력한 마법 도구 상자가 있습니다. 바로 `itertools` (아이터 툴즈) 모듈입니다.

이 도구들도 모조리 **결과를 반복자 형태로 돌려주기 때문에** (즉석에서 생성하기 때문에) 메모리 폭발 걱정 없이 안심하고 쓸 수 있습니다.

## 2.1 데이터를 가공하고 합치는 도구들

* **`accumulate` (누적 계산기)**: 들어오는 값들을 계속 누적해서 더해주는 눈덩이 기계입니다.
* **`chain` (사슬 묶기)**: 두 개 이상의 리스트나 문자열을 하나의 줄로 길게 묶어줍니다.

```python
import itertools

# 1. 눈덩이 굴리기 (누적 계산)
numbers = [1, 2, 3, 4]
acc_iter = itertools.accumulate(numbers)
print(list(acc_iter))  # [1, 3, 6, 10] (1, 1+2, 1+2+3, 1+2+3+4)

# 2. 리스트 이어 붙이기
list_a = [1, 2]
list_b = ["A", "B"]
chained_iter = itertools.chain(list_a, list_b)
print(list(chained_iter))  # [1, 2, 'A', 'B']
```

## 2.2 모든 경우의 수 마스터 (순열과 조합)

카드 게임에서 어떤 카드들을 뽑을 수 있는지, 로또 번호는 몇 가지 경우의 수가 있는지 계산할 때 아주 유용한 도구들입니다.

* **`product` (카테시안 곱)**: 여러 주머니에서 각각 공을 1개씩 꺼내 만들 수 있는 모든 짝을 만듭니다.
* **`permutations` (순열)**: 순서를 따져서 가능한 모든 줄 세우기 경우를 만듭니다.
* **`combinations` (조합)**: 순서에 상관없이 뽑는 경우의 수만 만듭니다.

```python
import itertools

heroes = ["IronMan", "Thor", "Hulk"]

# 3명 중 2명을 뽑아 순서대로 줄 세우기 (순열)
perm = itertools.permutations(heroes, 2)
print(list(perm)) 
# [('IronMan', 'Thor'), ('IronMan', 'Hulk'), ('Thor', 'IronMan'), 
#  ('Thor', 'Hulk'), ('Hulk', 'IronMan'), ('Hulk', 'Thor')]

# 3명 중 2명을 그냥 팀으로 뽑기만 하기 (조합 - 순서 무관)
comb = itertools.combinations(heroes, 2)
print(list(comb))
# [('IronMan', 'Thor'), ('IronMan', 'Hulk'), ('Thor', 'Hulk')]
```

## 2.3 제어 불능을 멈춰라! (무한 반복 컨트롤)

때로는 `cycle`(무한 반복)이나 `count`(무한 숫자 세기)처럼 끝없이 데이터를 생산하는 폭주 기관차 반복자를 만들어야 할 때가 있습니다. 이런 폭주 기관차를 적절하게 잘라주는 훌륭한 브레이크 장치도 존재합니다.

* **`takewhile` (조건이 맞을 때까지만 가기)**: 조건이 참일 때까지만 통과시키고, 거짓을 만나면 가차 없이 셔터를 내립니다.
* **`dropwhile` (조건이 거짓일 때부터 다 통과시키기)**: 조건이 참이면 데이터를 계속 버리다가, 거짓이 되는 순간부터 끝까지 모든 데이터를 쏟아냅니다.

```python
import itertools

# 1부터 0.5 간격으로 무한히 숫자 세기 (1, 1.5, 2.0, 2.5, 3.0 ...)
무한숫자 = itertools.count(1, 0.5)

# 3보다 작을 때까지만 통과시켜라!
안전한숫자 = itertools.takewhile(lambda x: x < 3, 무한숫자)

# 안전하게 멈추기 때문에 list()로 묶어도 무한루프에 빠지지 않아요!
print(list(안전한숫자)) # [1, 1.5, 2.0, 2.5]
```
이 밖에도 리스트의 일부분만 슬라이스 해주는 `islice`, 중복된 값을 그룹으로 묶어주는 `groupby` 등, `itertools`는 능숙하게 다룰수록 코드를 마법처럼 짧고 빠르게 만들어주는 파이썬 최고의 무기입니다.
