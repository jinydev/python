---
layout: docs
title: "2. 내장 함수와 소통하는 마법"
permalink: /part02/10_special_method/10_02_builtin/
---

# 2. 내장 함수와 소통하는 마법

우리가 너무나 당연하게 쓰던 파이썬의 내장 함수들(`len()`, `isinstance()` 등)도 객체를 억지로 분석하는 것이 아니라, 객체 내부의 '스페셜 메서드'와 정중하게 대화하여 값을 얻어냅니다.

---

## 2.1 "이 객체, 실행할 수 있나요?" `callable()`과 `__call__`

파이썬에서는 함수만 가로치고 실행(`()`)할 수 있는 것이 아닙니다. 일반 클래스로 만든 인스턴스라도 **`__call__`** 스페셜 메서드만 달아주면 마치 함수처럼 실행할 수 있습니다. `callable()` 내장 함수는 바로 이 스페셜 메서드의 파편이 있는지를 검사합니다.

```python
class Robot:
    def __init__(self, name):
        self.name = name
        
    # 인스턴스를 함수처럼 괄호 열고 닫기로 실행했을 때 호출됨
    def __call__(self):
        return f"위이잉~ {self.name} 로봇 가동!"

r = Robot("R2D2")

print(callable(r)) # True (r 객체는 실행이 가능하다!)
print(r())         # 위이잉~ R2D2 로봇 가동!
```

---

## 2.2 객체의 주민등록번호 `id()` 와 `hash()`

동일한 값을 가졌는지 비교할 때(동등성, `==`)는 **`__eq__`**가 호출되고, 완전히 똑같은 메모리 주소(주민등록번호)를 가진 같은 놈인지 확인할 때(동일성, `is`)는 **`id()`** 값을 기반으로 처리됩니다. 딕셔너리의 키로 사용할 때 필수적인 **`hash()`** 함수는 객체 내부의 **`__hash__`**를 조회합니다.

---

## 2.3 혈통 검사기: `isinstance()` 와 `issubclass()`

이 객체가 저 클래스의 핏줄을 이어받았는지 확인할 때 쓰는 함수들입니다.
* `isinstance(객체, 클래스)`: 저 클래스로 만든 인스턴스니? `__instancecheck__` 호출
* `issubclass(자식클래스, 부모클래스)`: 저 클래스의 자식 클래스니? `__subclasscheck__` 호출

```python
class Animal: pass
class Dog(Animal): pass

badugi = Dog()
print(isinstance(badugi, Dog))    # True
print(isinstance(badugi, Animal)) # True (상속 받았으니까)
print(issubclass(Dog, Animal))    # True
```

---

## 2.4 "너의 길이는 얼마냐?" `len()` 과 `__len__`

리스트나 문자열의 길이를 재는 `len()` 함수는 무작정 원소를 하나씩 세어보는 게 아닙니다. 객체 내부의 **`__len__`** 메서드를 조용히 호출해서 결과만 쏙 빼갑니다.

```python
class ParkingGarage:
    def __init__(self):
        self.cars = ["Sonata", "K5", "BMW"]
        
    # 주차장의 '길이'는 주차된 차의 대수로 정의한다
    def __len__(self):
        return len(self.cars)

garage = ParkingGarage()
print(len(garage)) # 3 (__len__ 발동)
```

---

## 2.5 동적 속성 관리: `getattr()`, `setattr()`, `delattr()`

앞 장에서 점(`.`) 연산자로 속성을 접근하는 스페셜 메서드를 배웠습니다. 코드 실행 중에 문자열로 속성 이름을 다루고 싶을 때는 이 내장 함수 삼총사를 씁니다. (알고 보면 다 통합니다)

* **`getattr(obj, 'name', default)`** -> `obj.__getattribute__` 호출
* **`setattr(obj, 'name', value)`** -> `obj.__setattr__` 호출
* **`delattr(obj, 'name')`** -> `obj.__delattr__` 호출

```python
class User:
    pass

u = User()

# 런타임에 동적으로 속성 추가하기 (u.age = 20 과 동일)
setattr(u, "age", 20)

# 동적으로 속성 읽어오기 (없는 경우 기본값 0 반환)
print(getattr(u, "age", 0))    # 20
print(getattr(u, "level", 0))  # 0
```
