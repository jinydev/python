---
layout: docs
title: "2. 함수 쪼개기와 기억력"
permalink: /part02/decorator/section/
---

# 2. 함수 쪼개기와 기억력: 부분 함수와 메모이제이션

클로저의 응용으로 코드를 훨씬 쾌적하고 영리하게 만드는 두 가지 고급 패턴을 알아봅니다.

## 2.1 인자 예약 시스템: 부분 함수 (Partial Function)

기능은 동일한데, 매번 함수를 호출할 때마다 똑같은 인자를 반복해서 입력하기 귀찮을 때가 있습니다. 파이썬의 `functools.partial` 모듈을 쓰면 함수의 **특정 매개변수를 미리 "고정"시켜둔 새로운 함수**를 쉽게 뚝딱 만들 수 있습니다.

```python
from functools import partial

# 기본 함수: 3개의 인자를 모두 더함
def add_three_numbers(a, b, c):
    return a + b + c

# a=10, b=20을 미리 고정해둔 '부분 함수' 생성! (c만 남음)
add_base_30 = partial(add_three_numbers, 10, 20)

# 이제 남은 인자(c)만 보내주면 됩니다.
print(add_base_30(5))   # 10 + 20 + 5 = 35
print(add_base_30(100)) # 10 + 20 + 100 = 130
```

복잡한 클로저를 직접 설계하지 않아도 파이썬이 알아서 커링(Currying) 패턴처럼 인자를 쪼개서 관리해줍니다.

---

## 2.2 한 번 푼 문제는 다시 풀지 않는다: 메모이제이션 (Memoization)

어려운 수학 문제를 풀 때, 똑같은 문제를 누가 또 물어본다면 처음부터 계산하지 않고 예전에 적어둔 답을 쓱 보고 바로 말해주는 것이 효율적입니다. 프로그램에서도 복잡하고 오래 걸리는 함수 호출의 **'결과값'을 캐시(기억)해두는 기법**을 **메모이제이션**이라고 합니다.

파이썬 3에서는 이 기능을 데코레이터 한 줄로 끝낼 수 있게 내장 모듈을 제공합니다.

### 갓성비 데코레이터: `@lru_cache`

```python
import time
from functools import lru_cache

# 이 마법의 한 줄을 추가하면, 파이썬이 함수 결과를 알아서 기억해둡니다.
# maxsize는 몇 개까지 기억할지를 정합니다. (None이면 무제한)
@lru_cache(maxsize=128)
def heavy_computation(num):
    print(f"  [오래 걸리는 연산 시작] {num} 계산 중...")
    time.sleep(2) # 2초 동안 복잡한 계산을 한다고 가정
    return num * 100

print("첫 번째 호출:")
print(heavy_computation(5)) # 2초 걸려서 500 출력

print("\n두 번째 호출 (동일한 인자):")
# 연산(time.sleep) 없이 기억해둔 500을 0.0001초 만에 즉시 반환!
print(heavy_computation(5)) 

print("\n세 번째 호출 (새로운 인자):")
print(heavy_computation(8)) # 8은 처음이므로 다시 2초 걸려서 800 출력
```

과거의 영광(?)을 기억하는 강력한 기능이므로 반복적인 데이터 크롤링, 웹 요청, 무거운 알고리즘 연산에 필수로 쓰이는 기술입니다!
