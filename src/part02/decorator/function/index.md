---
layout: docs
title: "3. 아이템 장착! 함수 데코레이터"
permalink: /part02/decorator/function/
---

# 3. 아이템 장착! 함수 데코레이터

진짜 데코레이터의 세계로 진입할 차례입니다. 기존 함수의 코드는 단 한 줄도 수정하지 않은 채, 함수 앞위치에 로그를 찍거나 실행 시간을 측정하는 등 껍질(패키징) 기능을 쉽게 추가하는 방법입니다.

## 3.1 데코레이터의 핵심 구조: 3단 콤보

데코레이터는 본질적으로 **'함수를 매개변수로 받아서, 새로운 함수(클로저)를 리턴하는 함수'**입니다.

1. **데코레이터 로봇 (외부 함수)**: 장착할 아이템. 원본 함수를 인자로 받습니다.
2. **포장지 (내부 wrapper 함수)**: 원본 함수의 앞뒤로 추가할 기능을 작성하는 곳입니다. 어떤 인자가 들어올지 모르니 `*args`, `**kwargs`로 모든 것을 받아냅니다.
3. **원본 실행**: 포장지 기능이 끝나면 원본 함수를 호출하여 임무를 완수합니다.

```python
# 1. 데코레이터 정의 
def timer_booster(func):
    
    # 2. 내부 포장지 함수 (자유 변수 func를 기억하는 클로저)
    def wrapper(*args, **kwargs):
        print("▶ [아이템 발동] 타이머 시작!")
        
        # 3. 원래 함수의 임무 실행
        result = func(*args, **kwargs)
        
        print("■ [아이템 해제] 타이머 종료!")
        return result
        
    return wrapper
```

---

## 3.2 골뱅이(`@`) 마법 부리기

파이썬에서는 데코레이터 함수를 만들어두면, 타겟 함수 바로 윗줄에 `@데코레이터이름` 이라는 직관적인 문법으로 아이템을 장착시킬 수 있습니다.

```python
# 귀찮은 과정 (기존 방식)
# calc_func = timer_booster(calc_func)

# 깔끔한 @ 문법 적용!
@timer_booster
def my_attack():
    print("기본 공격 얍!")
    return "데미지 100"

# my_attack을 실행하면 껍질 안의 wrapper가 먼저 실행됩니다.
defense_result = my_attack()
print("결과:", defense_result)

# [실행 결과]
# ▶ [아이템 발동] 타이머 시작!
# 기본 공격 얍!
# ■ [아이템 해제] 타이머 종료!
# 결과: 데미지 100
```

---

## 3.3. 신분 도용 방지: `functools.wraps`

데코레이터를 장착하면 겉모습이 `wrapper` 함수로 덮어씌워지기 때문에, 원래 함수가 누군지를 잃어버리는(이름이나 주석 파악 불가) 부작용이 생깁니다.  
이를 방지하기 위해 데코레이터를 만들 때는 관례적으로 **`@wraps(func)`**를 내부 함수에 한 번 더 붙여서 원래 함수의 신분증을 그대로 복원해줍니다.

```python
from functools import wraps

def authentic_decorator(func):
    # 원래 함수 func의 이름(__name__)과 주석(__doc__)을 유지시켜줌!
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
```
