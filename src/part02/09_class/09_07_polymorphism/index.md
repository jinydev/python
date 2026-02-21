---
layout: docs
title: "7. 같은 이름, 다른 행동: 다형성 (Polymorphism)"
permalink: /part02/09_class/09_07_polymorphism/
---

# 7. 같은 이름, 다른 행동: 다형성 (Polymorphism)

객체지향 프로그래밍의 꽃이라고 불리는 **다형성(Polymorphism)**은 "다양한(Poly) 형태(morphism)를 띤다"는 뜻입니다. 
쉽게 말해, **똑같은 스위치(메서드 이름)를 눌러도 연결된 기기(객체)에 따라 선풍기가 켜지기도 하고, 에어컨이 켜지기도 하는 마법**입니다. 파이썬에서는 크게 세 가지 방식으로 이 다형성을 구현합니다.

## 7.1 부모의 유산을 내 입맛대로: 오버라이딩 (Overriding)

부모에게서 물려받은 메서드 이름은 그대로 쓰되, **내용물(로직)만 자식 클래스 상황에 맞게 뜯어고치는 기법**입니다. 
부모의 메서드는 무시되고, 가장 최신인 자식의 메서드가 덮어쓰기(Override) 되어 실행됩니다.

```python
class Car:
    def drive(self):
        print("엔진을 가동하고 주행합니다.")

class ElectricCar(Car):
    # 부모와 완전히 똑같은 이름으로 메서드를 재정의 (오버라이딩)
    def drive(self):
        print("배터리 전력으로 조용히 주행합니다.")

# 같은 drive() 호출이지만 객체의 종류에 따라 결과가 다름 (다형성)
gas_car = Car()
ev_car = ElectricCar()

gas_car.drive() # 엔진을 가동하고 주행합니다.
ev_car.drive()  # 배터리 전력으로 조용히 주행합니다.
```

---

## 7.2 같은 이름, 다른 매개변수: 오버로딩 (Overloading)

자바나 C++에서는 메서드 이름이 같아도 매개변수 개수나 타입이 다르면 서로 다른 메서드로 인식하는 '오버로딩'을 기본 지원합니다. 
하지만 **파이썬은 메서드 이름을 하나만 기억하기 때문에 기본적으로 오버로딩을 지원하지 않습니다.** (나중에 쓴 메서드가 앞의 메서드를 덮어써버림)

대신, 매개변수의 디폴트 값(`=None`)이나 가변 인수(`*args`)를 써서 우회하거나, 외부 라이브러리(`multipledispatch`)를 달아 억지로 구현할 수는 있습니다.

```python
# 파이썬의 우회적인 오버로딩 흉내내기 (디폴트 인자 활용)
class Calculator:
    # 2개짜리 인자도 받고, 3개짜리 인자도 받을 수 있게 하나의 메서드로 처리
    def add(self, a, b, c=0):
        return a + b + c

calc = Calculator()
print(calc.add(10, 20))     # 30
print(calc.add(10, 20, 30)) # 60
```

---

## 7.3 파이썬의 상징: 덕 타이핑 (Duck Typing)

> "만약 어떤 새가 오리처럼 걷고, 오리처럼 꽥꽥거린다면, 나는 그 새를 오리라고 부르겠다."

다형성의 끝판왕입니다. 파이썬은 **"네 부모가 누구 파(족보)냐?"(클래스의 타입)를 따지지 않습니다.** 
대신 **"너 지금 그 기능(메서드) 할 줄 알아?"(행위의 존재 유무)**만 따집니다. 이를 **덕 타이핑**이라고 합니다.

```python
class Duck:
    def sound(self):
        return "꽥꽥!"

class Dog:
    def sound(self):
        return "멍멍!"

class Robot: # 오리나 개랑은 아무런 족보(상속) 연관이 없음
    def sound(self):
        return "삐리릭. 꽥꽥."

# 매개변수 animal이 어느 클래스 출신이든 상관 안 함.
# 그저 sound() 메서드를 할 줄 아는지만 봄!
def make_sound(animal):
    print(animal.sound())

# 모두 다른 클래스임에도 동일한 인터페이스(sound)를 호출 (덕 타이핑 & 다형성)
make_sound(Duck())  # 꽥꽥!
make_sound(Dog())   # 멍멍!
make_sound(Robot()) # 삐리릭. 꽥꽥.
```

## 7.4 연산자 오버로딩 (Operator Overloading)

객체끼리 산술 연산자(`+`, `-`)를 쓰게 만드는 마법입니다.
파이썬의 모든 연산자는 내부적으로 스페셜 메서드(`__add__` 등)로 맵핑되어 있습니다. 이를 오버라이딩하면 내가 만든 객체끼리 덧셈을 구현할 수 있습니다.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # '+' 연산자를 내 입맛대로 재정의!
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

p1 = Point(1, 2)
p2 = Point(3, 4)

# 원래라면 객체끼리 못 더하지만, __add__ 덕분에 다형적으로 작동함
p3 = p1 + p2 
print(p3.x, p3.y) # 4 6
```
