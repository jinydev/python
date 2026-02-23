---
layout: docs
title: "19 코드 건드리지 않고 성능 업그레이드! 데코레이터"
permalink: /basic/04_functions/19_decorators/
---

# 19 기존 코드를 건드리지 않는 마법: 데코레이터(Decorator)

직장 상사가 "네가 짠 30개의 모든 함수 앞뒤로, 실행 소요 시간을 찍어주는 타이머 로그를 추가해라"라고 지시했다고 칩시다. 초보자는 30개 함수 배를 일일이 갈라 코드를 쑤셔 넣겠지만, 파이썬 고수들은 원래 코드에 털끝 하나 손대지 않고 껍질만 씌우는 **데코레이터(Decorator)**를 사용합니다.

데코레이터는 문자 그대로 함수에 예쁜 포장지를 감싸서(장식해서) 추가 기능을 부여하는 강력한 문법입니다. 클로저(Closure)의 원리를 완벽히 활용한 마법입니다.

## 1. 데코레이터의 3단 포장 원리

데코레이터는 본질적으로 **'원본 함수를 집어삼킨 뒤, 새롭게 장식된 포장지 함수(클로저)를 돌려주는 고차 함수'**입니다.

```python
# 1. 장식 기계(데코레이터) 정의 
def timer_booster(func):
    """넘겨받은 원래 함수(func)의 앞뒤로 타이머 로그를 찍어주는 기계"""
    
    # 2. 내부 포장지 함수 (클로저)
    # 어떤 형태의 데이터가 들어올지 모르니 *args, **kwargs로 모두 받아냅니다.
    def wrapper(*args, **kwargs):
        print("▶ [아이템 켜짐] 타이머 시작!")
        
        # 3. 보관하고 있던 진짜 원본 함수의 임무를 빙의(실행)합니다.
        result = func(*args, **kwargs)
        
        print("■ [아이템 꺼짐] 타이머 종료!")
        return result # 원본이 내뱉은 결과를 그대로 토해냅니다.
        
    return wrapper # 포장지를 반환
```

## 2. 골뱅이(`@`) 마법 부리기

파이썬에서는 위와 같이 데코레이터 기계를 한 번 만들어두면, 아이템을 장착하고 싶은 타겟 함수 바로 머리 윗줄에 **`@데코레이터이름`** 이라는 초간단 직관적 문법으로 기능을 스며들게 할 수 있습니다.

```python
# 타이머 부스터 장착!!
@timer_booster 
def skill_attack():
    print("기본 공격 얍! 얍!")
    return "데미지 100"

# my_attack을 평소처럼 실행하지만, 파이썬 몰래 포장지(wrapper)가 가로채서 실행됩니다.
defense_result = skill_attack()
print("최종 결과:", defense_result)
```

**콘솔 출력 화면**
```text
▶ [아이템 켜짐] 타이머 시작!
기본 공격 얍! 얍!
■ [아이템 꺼짐] 타이머 종료!
최종 결과: 데미지 100
```
원본 함수 `skill_attack`의 코드를 한 글자도 수정하지 않았는데 앞뒤로 기능이 쏙 들어가 버렸습니다!

---

## 3. 원본의 신분증 유지하기 (`@wraps`)

데코레이터를 장착하면 함수가 투구(wrapper 포장지)를 둘러쓰기 때문에, 남들이 볼 때 원래 이름(`skill_attack`)이 아니라 투구 이름(`wrapper`)으로 오해하는 부작용이 생깁니다.  

이 신분증 분실 사고를 막기 위해, 포장지를 만들 때는 파이썬 기본 도구인 `functools.wraps`를 겉에 한 겹 더 발라주어 원본 함수의 이름과 주석 정보를 그대로 보존해 주는 것이 고수들의 핵심 매너입니다.

```python
from functools import wraps

def authentic_decorator(func):
    
    @wraps(func) # 원본 함수 func의 본래 이름과 혼(신분증)을 그대로 복원!
    def wrapper(*args, **kwargs):
        print("뭔가 추가 기능 동작 중...")
        return func(*args, **kwargs)
        
    return wrapper
```
