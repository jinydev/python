---
layout: docs
title: "4. 클래스로 만드는 데코레이터"
permalink: /part02/decorator/class/
---

# 4. 클래스로 만드는 데코레이터

지금까지는 "함수"로 데코레이터를 만들었지만, 복잡하게 상태를 제어하거나 더 큰 규모의 아이템을 만들 때는 "클래스"로도 데코레이터를 제조할 수 있습니다. 

단지 `__call__` 스페셜 메서드 하나만 잘 오버로딩하면 됩니다. (이전 장에서 배운 `callable` 개념이 여기서 빛을 발합니다!)

## 4.1 `__init__`과 `__call__`의 합작

클래스로 데코레이터를 만들 때는 두 가지 문만 기억하면 됩니다.
1. `__init__`: 타겟 함수를 인자로 받아서, 초기 속성으로 **저장**합니다.
2. `__call__`: 클래스의 인스턴스가 괄호 문법 `()`으로 실행될 때, 포장지 역할을 하면서 저장해둔 본래 **함수를 호출**합니다.

```python
class PowerUpItem:
    # 1. 대상 함수 func를 뱃속에 담아둡니다.
    def __init__(self, func):
        self.func = func
        
    # 2. 아이템이 장착된 함수가 실행될 때 호출됩니다. (wrapper 역할)
    def __call__(self, *args, **kwargs):
        print(f"[{self.func.__name__}] 함수에 로켓 엔진 가동!")
        # 본래 함수 실행!
        return self.func(*args, **kwargs)

# 함수가 아닌 내가 직접 조립한 클래스 객체로 데코레이터 장착!
@PowerUpItem
def sprint(speed):
    print(f"시속 {speed}km로 달립니다.")

# sprint 함수를 호출하면, 사실은 PowerUpItem의 __call__이 실행됩니다!
sprint(150)

# [실행 결과]
# [sprint] 함수에 로켓 엔진 가동!
# 시속 150km로 달립니다.
```

---

## 4.2 내장된 클래스 데코레이터

우리가 파이썬 코드에서 익숙하게 봐왔던 `@classmethod`, `@staticmethod`, 그리고 변수처럼 함수를 쓰게 해주는 `@property` 역시, 파이썬이 내부적으로 C언어로 구현해둔 **클래스 기반의 강력한 데코레이터**들입니다.

원리만 파악하면 여러분도 Django 웹 프레임워크나 딥러닝 패키지에 존재하는 거대한 마법(데코레이터)들을 여러분의 코드에 아주 쉽게 이식하고 사용할 수 있습니다.
