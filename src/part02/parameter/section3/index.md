---
layout: docs
title: "4. 가변 매개변수 (*args, **kwargs)"
permalink: /part02/parameter/section3/
---

# 4. 가변 매개변수 (*args, **kwargs)

함수를 만들 때, 사용자가 데이터를 몇 개나 던져줄지 미리 예측할 수 없는 경우가 많습니다. (예: `print()` 함수처럼 무한정 인자를 받을 수 있는 함수) 

파이썬은 매개변수 이름표 앞에 **별표(`*`) 기호**를 붙여서, 한계를 알 수 없이 쏟아지는 수많은 인자들을 단일 컬렉션으로 쓸어담는 우아한 **가변(Variable) 파라미터** 문법을 제공합니다.

---

## 4.1 가변 위치 인자: `*args`

개수가 정해지지 않은 위치 인자 여러 개를 받을 때 사용합니다. 넘어온 모든 위치 인자 찌꺼기들을 모조리 긁어모아 **'튜플(Tuple)'** 형태로 압축(Packing)하여 `args`라는 이름의 방에 저장합니다. 관행적으로 변수명은 arguments의 약자인 `args`를 씁니다.

```python
# 몇 개가 들어올지 모르는 숫자들을 전부 받아서 더하는 함수
def sum_all(*args):
    print(f"args의 정체는 튜플입니다: {args}")
    
    total = 0
    for num in args:
        total += num
    return total

# 1개든 5개든 전부 args 튜플 안으로 쏙 들어갑니다.
print(sum_all(10))             # args = (10,)
print(sum_all(1, 2, 3, 4, 5))  # args = (1, 2, 3, 4, 5) => 15
```

---

## 4.2 가변 키워드 인자: `**kwargs`

개수가 정해지지 않은 키워드 방식의 인자(Key=Value)들을 받을 때 사용합니다. 별표 2개(`**`)를 붙이며, 넘어온 데이터들을 **'딕셔너리(Dict)'** 형태로 압축하여 `kwargs`라는 이름의 방에 저장합니다. (Keyword Arguments의 약자)

함수를 유연하게 디자인하거나, 설정(Option) 값들을 한 번에 넘겨받을 때 극도로 유용합니다.

```python
# 사용자의 프로필 설정 정보를 유연하게 받아오는 함수
def build_profile(first, last, **kwargs):
    # kwargs는 딕셔너리로 조립됨!
    profile = {}
    profile['first_name'] = first
    profile['last_name'] = last
    
    # 전달받은 추가 설정값(kwargs 딕셔너리)들을 프로필에 병합함
    for key, value in kwargs.items():
        profile[key] = value
        
    return profile

# 고정 매개변수인 first, last 외에 city, job 이라는 새로운 옵션을 동적으로 투척함
user = build_profile("albert", "einstein", location="princeton", field="physics")

print(user)
# {'first_name': 'albert', 'last_name': 'einstein', 'location': 'princeton', 'field': 'physics'}
```

---

## 4.3 모든 인자를 흡수하는 무적의 패턴

실무에서 데코레이터나 유틸리티 함수를 짤 때, 외부에서 어떤 형태의 파라미터 폭탄이 떨어지더라도 에러 없이 전부 다 받아내야 하는 경우가 있습니다. 이때 아래의 조합을 사용합니다. 

단, 규칙상 **`*args`가 무조건 `**kwargs`보다 먼저 선언되어야 합니다.**

```python
# 세상에 존재하는 모든 파라미터 호출 방식을 다 흡수해버리는 마법의 서명(Signature)
def ultimate_func(*args, **kwargs):
    print("위치 인자들(Tuple):", args)
    print("키워드 인자들(Dict):", kwargs)

# 뒤죽박죽으로 보내도 알아서 분류해서 담아냅니다.
ultimate_func(1, 2, 3, name="Alice", age=30)
# 위치 인자들(Tuple): (1, 2, 3)
# 키워드 인자들(Dict): {'name': 'Alice', 'age': 30}
```
