---
layout: docs
title: "2. 내장된 데이터 가공 기계들"
permalink: /part03/12_functional/12_02_builtin/
---

# 2. 내장된 데이터 가공 기계들

파이썬은 함수형 프로그래밍의 3대장인 Map, Filter, Reduce를 비롯해 함수를 부품으로 받는 훌륭한 고차 함수 기계들을 기본으로 탑재하고 있습니다. 컨베이어 벨트를 타고 오는 리스트 데이터를 마법처럼 가공해 봅시다.

## 2.1 모두 모아 압축! (Reduction)

여러 개의 데이터를 뭉치고 뭉쳐서 **단 하나의 결과**로 축약하는 기계들입니다. 단일 값을 구하는 과정에서 판단 기준이 되는 '함수'를 key 값으로 집어넣을 수 있습니다.

* **최댓값과 최솟값 조작하기** (`max`, `min`)
  기본적으로는 가장 큰/작은 숫자를 찾지만, `key=` 인자에 함수를 넘겨주면 내 마음대로 기준을 바꿀 수 있습니다.
  
  ```python
  words = ["apple", "elephant", "cat"]
  
  # 길이를 재는 내장 함수 len()을 key로 던져줍니다. (글자가 가장 많은 단어 찾기!)
  print(max(words, key=len)) # "elephant"
  ```

* **눈덩이 굴리기** (`functools.reduce`)
  리스트의 맨 앞부터 숫자 2개를 꺼내서 함수로 계산하고, 그 결과를 다음 숫자와 합치는 과정을 끝까지 반복해서 하나의 값으로 뭉칩니다. 눈 뭉치를 굴려서 큰 눈사람으로 만드는 것과 같습니다.

  ```python
  from functools import reduce
  import operator
  
  # 요소들을 차례차례 더해나가는 눈덩이 방식 (1+2 -> 3+3 -> 6+4 -> 10)
  total = reduce(operator.add, [1, 2, 3, 4])
  print(total) # 10
  ```

---

## 2.2 모양 바꾸기와 채에 거르기 (Transform & Filter)

가장 대표적이고 많이 쓰이는 함수형 도구입니다. 리스트의 원소들을 묶어서 한 번에 가공할 때 유용합니다. (결과를 보려면 꼭 `list()` 포장지로 묶어줘야 합니다.)

* **일괄 변신 기계** (`map`)
  리스트를 통째로 기계에 넣고, 모든 원소 하나하나마다 지정한 함수(변신 마법)를 동일하게 적용합니다.

  ```python
  numbers = [1, 2, 3, 4]
  
  # 모든 숫자를 제곱하는 익명 함수(lambda)를 부품으로 던졌습니다.
  squared = list(map(lambda x: x * x, numbers))
  print(squared) # [1, 4, 9, 16]
  
  # (참고로 지능형 리스트 문법이 더 선호되기도 합니다)
  print([x * x for x in numbers]) # [1, 4, 9, 16]
  ```

* **꼼꼼한 검문소** (`filter`)
  리스트 원소들이 지나갈 때, 지정한 함수에 넣어서 **True(통과)**가 나오는 녀석들만 남기고 나머지는 버리는 기계입니다.

  ```python
  numbers = [1, 2, 3, 4, 5, 6]
  
  # 짝수인지 검사하는 익명 함수를 던졌습니다.
  evens = list(filter(lambda x: x % 2 == 0, numbers))
  print(evens) # [2, 4, 6]
  
  # (이 역시 지능형 리스트로 짤 수 있습니다)
  print([x for x in numbers if x % 2 == 0]) # [2, 4, 6]
  ```
