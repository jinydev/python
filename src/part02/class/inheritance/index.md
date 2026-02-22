---
layout: docs
title: "6. 속성과 행위의 대물림: 상속 (Inheritance)"
permalink: /part02/class/inheritance/
---

# 6. 속성과 행위의 대물림: 상속 (Inheritance)

객체지향 프로그래밍의 가장 강력한 무기 중 하나는 바로 **재사용성**입니다. 이미 잘 만들어진 클래스(부모, Super Class)가 있다면, 그 기능을 처음부터 다시 짜지 않고 그대로 물려받아(상속) 새로운 클래스(자식, Sub Class)를 만들 수 있습니다.

파이썬은 클래스 이름 뒤에 소괄호 `()`를 치고 부모 이름을 적어넣는 아주 직관적인 문법으로 상속을 지원합니다.

## 6.1 기본 상속과 네임스페이스 검색 구조

자식 클래스에 없는 속성이나 메서드를 호출하면, 파이썬은 에러를 내뱉기 전에 **부모 클래스의 네임스페이스를 먼저 검색**하여 훔쳐옵니다(?).

```python
class Animal:
    def __init__(self, name):
        self.name = name
        
    def eat(self):
        print(f"{self.name}이(가) 밥을 먹습니다.")

# Animal 클래스의 모든 기능을 그대로 물려받음
class Dog(Animal):
    def bark(self):
        print("멍멍!")

# Dog에는 __init__이 없지만, 부모인 Animal의 __init__이 자동 실행됩니다.
badugi = Dog("바둑이")
badugi.eat()  # 바둑이이(가) 밥을 먹습니다. (부모 메서드 재사용)
badugi.bark() # 멍멍! (자식 고유 메서드)
```

---

## 6.2 부모를 소환하라: `super()`

자식 클래스에서 부모 클래스의 메서드(특히 `__init__`)를 완전히 엎어버리지(Override) 않고, **부모의 기능을 일부 활용하면서 살을 덧붙이고 싶을 때**는 `super()` 함수를 사용합니다.

```python
class Warrior:
    def __init__(self, hp):
        self.hp = hp
        self.attack_power = 10

class Knight(Warrior):
    def __init__(self, hp, shield_power):
        # 1. 부모의 초기화 로직을 호출해서 hp와 attack_power를 먼저 세팅함
        super().__init__(hp)
        # 2. 자식만의 고유한 속성 추가
        self.shield_power = shield_power

k = Knight(100, 50)
print(k.hp, k.attack_power, k.shield_power) # 100 10 50
```

---

## 6.3 욕심쟁이 상속: 다중 상속 (Multiple Inheritance)

Java 같은 언어들은 다중 상속을 엄격히 금지하지만, 파이썬은 쿨하게 **여러 부모로부터 동시에 상속받는 것을 허용**합니다. 
콤마(`,`)로 여러 부모 클래스를 나열하기만 하면 됩니다.

```python
class Flyable:
    def fly(self):
        print("하늘을 납니다.")

class Swimmable:
    def swim(self):
        print("물 속을 헤엄칩니다.")

# 두 가지 능력을 다 물려받은 슈퍼 오리
class Duck(Flyable, Swimmable):
    pass

donald = Duck()
donald.fly()  # 하늘을 납니다.
donald.swim() # 물 속을 헤엄칩니다.
```

### 족보의 룰: MRO (Method Resolution Order)

다중 상속을 받다가 두 부모가 **동일한 이름의 메서드**를 가지고 있다면 자식은 누구의 말을 들어야 할까요? 
파이썬은 혼란을 막기 위해 **MRO(메서드 탐색 순서)**라는 엄격한 족보 탐색 서열을 내부적으로 관리합니다. 보통 괄호 안에 적어준 순서(왼쪽에서 오른쪽)를 우선시합니다. 클래스의 `.mro()` 메서드를 출력해보면 서열을 직접 확인할 수 있습니다.

---

## 6.4 부품 갈아 끼우기: 믹스인 (Mixin) 패턴

다중 상속의 유연함을 극대화한 파이썬 특유의 설계 패턴입니다. 속성(상태 데이터)은 전혀 가지지 않고 오직 **'특정 동작(메서드) 뭉치'만 모아둔 클래스**를 만들어두고, 레고 블록 조립하듯 본체 클래스에 다중 상속으로 끼워 넣는 방식입니다. 이런 클래스 이름 뒤에는 관례적으로 `Mixin`을 붙입니다.

```python
# 날개 모듈 (부품)
class WingMixin:
    def flap(self):
        return "파닥파닥 날갯짓"

# 본체 클래스
class Airplane:
    def __init__(self, model):
        self.model = model

# 조립 과정 (다중 상속)
class FighterJet(Airplane, WingMixin):
    pass

f16 = FighterJet("F-16")
print(f16.flap()) # 파닥파닥 날갯짓
```
