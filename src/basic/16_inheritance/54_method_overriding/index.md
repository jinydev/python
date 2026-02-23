---
layout: docs
title: "54 부모를 뛰어넘는 청출어람: 메서드 오버라이딩(Overriding)"
permalink: /basic/16_inheritance/54_method_overriding/
---

# 54 부모의 낡은 방식을 내 맘대로 덮어씌우기: 메서드 오버라이드

부모 클래스로부터 유용한 행동 지침을 공짜로 물려받긴 했지만, 자식 입장에선 그 낡은 방식이 영 마음에 들지 않아 나만의 멋진 스타일로 뜯어고치고 싶어질 때가 있습니다. 예를 들어, 늠름한 전사 캐릭터라면 평범한 인간처럼 '뚜벅뚜벅' 보단 '위풍당당하고 거칠게' 걸어가야 제맛이죠. 
이럴 때는 자식 클래스의 몸통 안에 **부모가 쓰던 것과 완전히 동일한 이름의 메서드**를 한 번 더 작성해 버리면 됩니다. 이 통쾌한 하극상을 프로그래밍 용어로 **덮어쓰기(Method Override)**라고 부릅니다.

**코드: 내 스타일대로 부모 유전자 덮어쓰기**
```python
class BaseHuman():
    def walk_around(self):
        print("두 발로 평범하게 뚜벅뚜벅 걷습니다.")

class Knight(BaseHuman):
    # 부모가 물려준 walk_around라는 이름을 똑같이 선언하되, 내용물만 내 입맛대로 개조합니다!
    def walk_around(self):
        print("중갑옷을 입고 쿵쿵거리며 위풍당당하게 전진합니다!")

# 확인해 볼까요?
arthas = Knight()
arthas.walk_around() 
```

**콘솔 출력창**
```text
중갑옷을 입고 쿵쿵거리며 위풍당당하게 전진합니다!
```

위처럼 파이썬 엔진은 부모와 자식이 같은 이름의 함수를 가지고 다툴 때, 무조건 자식이 최신형으로 업데이트한 버전을 1순위로 인정해 줍니다. 

---

## 54.1 같은 이름, 다른 행동: 다형성 (Polymorphism)

객체지향 설계의 진정한 꽃이라고 불리는 **다형성(Polymorphism)**은 "다양한(Poly) 형태(morphism)를 띤다"는 뜻입니다. 
쉽게 말해, **똑같은 스위치(메서드 이름)를 눌러도 연결된 기기(객체)에 따라 선풍기가 켜지기도 하고, 에어컨이 켜지기도 하는 마법**입니다. 메서드 오버라이딩은 이 다형성을 구현하는 가장 대표적인 방법입니다.

```python
class Car:
    def drive(self):
        print("가솔린 엔진을 가동하고 주행합니다.")

class ElectricCar(Car):
    # 부모와 똑같은 이름으로 덮어씀 (오버라이딩)
    def drive(self):
        print("배터리 전력으로 조용히 주행합니다.")

# 같은 drive() 스위치 호출이지만, 객체의 실제 종류에 따라 각기 다른 결과가 나옴 (다형성)
my_car = Car()
my_ev = ElectricCar()

my_car.drive() # 가솔린 엔진을 가동하고 주행합니다.
my_ev.drive()  # 배터리 전력으로 조용히 주행합니다.
```

---

## 54.2 파이썬의 상징: 덕 타이핑 (Duck Typing)

> "만약 어떤 새가 오리처럼 걷고, 오리처럼 꽥꽥거린다면, 나는 그 새를 오리라고 부르겠다."

파이썬식 다형성의 끝판왕입니다. 자바나 C++ 같은 깐깐한 언어들은 함수에 인자를 받을 때 "반드시 `Car` 클래스의 자식 객체만 들어올 수 있다"며 철저히 족보(타입 검사)를 따집니다.

하지만 자유로운 영혼인 파이썬은 **"네 족보(부모)가 뭐냐?"는 묻지도 따지지도 않습니다.** 
대신 **"너 지금 내가 시키는 그 행동(메서드) 할 줄 알아?"(행위의 존재 유무)** 하나만 쿨하게 묻습니다. 

```python
class Duck:
    def sound(self): return "꽥꽥!"

class Dog:
    def sound(self): return "멍멍!"

class Robot: # 오리나 개랑은 아무런 족보(상속) 연관이 없는 완전한 남남
    def sound(self): return "삐리리릭."

# 매개변수 animal이 어디 출신인지 묻지 않고 오직 sound() 메서드를 가졌는지만 봅니다!
def make_sound(animal):
    print(animal.sound())

# 모두 다른 클래스이지만 공통된 행동(인터페이스)을 가졌으므로 모두 정상 작동! (덕 타이핑)
make_sound(Duck())  # 꽥꽥!
make_sound(Dog())   # 멍멍!
make_sound(Robot()) # 삐리리릭.
```
