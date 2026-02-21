---
layout: docs
title: "3. 객체의 생명주기와 소멸자"
permalink: /part02/09_class/09_03_section/
---

# 3. 객체의 점(Dot) 연산과 속성 제어

파이썬에서 클래스나 인스턴스의 내부 깊숙한 곳(네임스페이스)에 접근할 수 있는 유일한 열쇠는 바로 **점(`.`) 연산자**입니다. 우리가 무심코 사용하는 `p.name`이나 `p.age = 20` 같은 점 연산의 이면에는 파이썬의 정교한 스페셜 메서드 체계가 숨쉬고 있습니다.

## 3.1 점(.) 연산의 숨겨진 호출 구조

점(`.`)을 찍어 인스턴스의 속성에 접근하거나 값을 바꿀 때, 파이썬 내부에서는 다음과 같이 3개의 스페셜 메서드가 보이지 않게 작동합니다.

1. **조회**: `__getattribute__` (가장 먼저 접근 시도)
2. **조회 실패 시 위임**: `__getattr__` (`__getattribute__`에서 못 찾을 때만 호출됨)
3. **할당/갱신**: `__setattr__`
4. **삭제**: `__delattr__`

---

## 3.2 속성 갱신의 통로: `__setattr__`

인스턴스에 새로운 값을 할당할 때마다 항상 `__setattr__` 스페셜 메서드가 가로채기(Intercept)를 수행합니다. 이를 응용하면 데이터베이스에 값을 쓰거나, 특정 값이 들어올 때 타입 검사를 강제할 수 있습니다.

```python
class SmartDevice:
    def __init__(self, name):
        # self.name = name 을 실행하는 순간 __setattr__ 이 발동됨!
        self.name = name
    
    # 속성 할당을 중간에 가로채는 스페셜 메서드
    def __setattr__(self, key, value):
        print(f"[시스템 로그] '{key}' 속성에 '{value}' 값을 저장합니다.")
        # 무한루프를 방지하기 위해 실제 딕셔너리에 직접 값을 밀어넣음
        self.__dict__[key] = value

device = SmartDevice("온도조절기")
# [시스템 로그] 'name' 속성에 '온도조절기' 값을 저장합니다.

device.status = "활성화"
# [시스템 로그] 'status' 속성에 '활성화' 값을 저장합니다.
```

---

## 3.3 우아하게 에러 피하기: `__getattr__`

일반적으로 객체에 정의되지 않은 속성을 점(`.`)으로 호출하면 자비 없이 `AttributeError`가 발생합니다. 하지만 `__getattr__` 메서드를 재정의해두면, **찾는 속성이 없을 때 최후의 보루로 이 메서드가 실행되어 에러를 방지하고 기본값을 던져줄 수 있습니다.**

```python
class UserProfile:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    # 파이썬이 네임스페이스를 완전히 뒤져보고 그래도 없을 때만 호출됨
    def __getattr__(self, missing_attr):
        print(f"[경고] '{missing_attr}' 이라는 속성은 존재하지 않습니다.")
        return "Not Found"

# 1. 속성이 정상적으로 존재할 때 (__getattribute__ 정상 작동)
user = UserProfile(101, "제임스")
print(user.name) # 제임스

# 2. 존재하지 않는 속성을 찾을 때 (에러 대신 __getattr__ 가 막아줌)
print(user.email) 
# [경고] 'email' 이라는 속성은 존재하지 않습니다.
# Not Found
```

> [!CAUTION]
> 무리하게 `__getattribute__`를 가로채려는 시도는 재귀(무한 루프) 함정에 빠지기 십상입니다. 안전하게 처리하려면 가급적 `__getattr__` 을 사용하는 패턴을 추천합니다.
