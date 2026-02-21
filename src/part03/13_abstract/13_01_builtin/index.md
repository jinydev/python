---
layout: docs
title: "1. 추상 클래스 기본기 (abc 모듈)"
permalink: /part03/13_abstract/13_01_builtin/
---

# 1. 추상 클래스 기본기 (`abc` 모듈)

로봇 공장 시스템을 만든다고 상상해봅시다. 모든 '로봇'은 '움직이기' 기능을 반드시 만들어야 한다는 공통 규칙을 정하고 싶습니다. 이때 사용하는 것이 바로 추상 클래스입니다.

파이썬에서는 `abc` (Abstract Base Classes) 모듈을 이용해 추상 클래스를 정의합니다.

## 1.1 강제 규칙 만들기 (추상 메서드)

추상 클래스 자체는 불완전한 뼈대이므로 인스턴스(실제 로봇)를 만들 수 없습니다. 이것을 상속받는 자식 클래스(구현 클래스)가 지시사항(추상 메서드)을 모두 채워 넣어야만 비로소 완성품이 됩니다.

```python
from abc import ABC, abstractmethod

# ABC(Abstract Base Class)를 상속받으면 추상 클래스가 됩니다.
class RobotBlueprint(ABC):
    
    # "자식 클래스는 무조건 이 메서드를 구현해라!" 라는 데코레이터
    @abstractmethod
    def move(self):
        pass  # 뼈대이므로 구현하지 않습니다.

# 자식 클래스 (구현 클래스)
class TankRobot(RobotBlueprint):
    def move(self):
        return "캐터필러로 묵직하게 움직입니다!"
```
만약 `TankRobot`이 `move` 메서드를 빼먹고 인스턴스를 만들려고 하면 에러(TypeError)가 나면서 프로그램이 멈춥니다. 안전장치가 완벽하죠!

---

## 1.2 "넌 이제 내 자식이다!" - 가상 서브클래스 (`register`)

직접 상속(`class A(B):`)을 받지 않아도, 족보에 강제로 이름을 올려 "가상의 자식"으로 취급하는 재미있는 기능이 있습니다. 

```python
from abc import ABC

class PowerCore(ABC):
    pass

# 배터리 클래스는 PowerCore를 상속받은 적이 없지만...
class Battery:
    pass

# 명부(register)에 강제 등록합니다.
PowerCore.register(Battery)

# 진짜 자식이냐고 물어보면? True가 나옵니다!
print(issubclass(Battery, PowerCore)) # True
```

---

## 1.3 암묵적 규칙 (프로토콜과 Duck Typing)

파이썬은 아주 유연한 언어입니다. "오리처럼 걷고 오리처럼 꽥꽥대면, 그건 오리다(Duck Typing)!"라는 철학이 있죠.

즉, 명시적으로 추상 클래스를 상속받지 않았더라도 클래스 내부에 특정 매직 메서드(예: `__len__`)를 잘 만들어 두었다면, 파이썬은 이를 길이를 잴 수 있는 `Sized` 컬렉션의 자식이라고 암묵적으로 인정해 줍니다. 이렇게 동작과 행동 패턴(메서드 유무)만으로 자격을 판단하는 방식을 '프로토콜 인터페이스(Protocol Interface)'라고 부릅니다.
