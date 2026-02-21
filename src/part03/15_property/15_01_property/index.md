---
layout: docs
title: "1. 프로퍼티(property)의 마법"
permalink: /part03/15_property/15_01_property/
---

# 1. 프로퍼티(`property`)의 마법

로봇의 체력을 관리하는 프로그램을 짜고 싶습니다. 체력(`hp`)은 무조건 0에서 100 사이여야 합니다. 누군가 `robot.hp = 9999` 처럼 비정상적인 체력을 직접 집어넣는 것을 막으려면 어떻게 해야 할까요? 

이를 위해 파이썬은 변수 앞을 가로막는 **프로퍼티(Property)**라는 스마트 가드(경호원)를 제공합니다. 

## 1.1 직접 접근 금지! 프라이빗 변수 흉내 내기

파이썬에서는 진짜 데이터를 남몰래 숨겨두기 위해 변수 이름표 앞에 밑줄(`_`)을 하나 붙이는 암묵적인 약속을 합니다. `self.hp` 대신 `self._hp` 라고 쓰는 것이죠. 이건 "이 데이터는 직접 건드리지 마세요!"라는 뜻입니다.

대신 외부에서 접근할 수 있도록 안전한 창구를 열어주는데, 이때 사용하는 것이 바로 `@property` 마법(데코레이터)입니다.

---

## 1.2 `getter`, `setter`, `deleter` 구조

프로퍼티는 데이터를 건드릴 때 일어나는 3가지 행동을 감시합니다.

1. **읽을 때 (getter)**: `@property`
2. **쓸 때 (setter)**: `@메서드이름.setter`
3. **지울 때 (deleter)**: `@메서드이름.deleter`

```python
class Robot:
    def __init__(self, hp):
        # 진짜 데이터는 밑줄 '_' 을 붙여서 숨깁니다.
        self._hp = hp 

    # 1. 누군가 robot.hp 를 "읽으려" 할 때 작동! (getter)
    @property
    def hp(self):
        print("[경비원] 체력을 조회합니다.")
        return self._hp

    # 2. 누군가 robot.hp 에 숫자를 "넣으려" 할 때 작동! (setter)
    @hp.setter
    def hp(self, value):
        print(f"[경비원] 조심해! {value}로 변경 요청이 들어왔어!")
        if value < 0:
            self._hp = 0   # 0 밑으로는 못 내려가게 막기!
        elif value > 100:
            self._hp = 100 # 100 이상으로는 못 올라가게 막기!
        else:
            self._hp = value

    # 3. 누군가 del robot.hp 로 "지우려" 할 때 작동! (deleter)
    @hp.deleter
    def hp(self):
        print("[경비원] 체력 데이터가 삭제되었습니다.")
        del self._hp

# 로봇을 생성해 볼까요?
my_robot = Robot(50)

# (1) 값 읽기 -> 내부적으로 @property가 달린 함수가 자동 실행!
print(my_robot.hp)  
# [경비원] 체력을 조회합니다.
# 50

# (2) 값 쓰기 (해킹 시도!) -> 내부적으로 @hp.setter 함수가 방어!
my_robot.hp = 999
print(my_robot.hp)  
# [경비원] 체력을 조회합니다.
# 100 (999가 아니라 100으로 철벽 방어!)
```

이렇게 프로퍼티를 사용하면, 마치 평범한 변수처럼(`my_robot.hp = 10`) 편하게 코드를 짜면서도, 그 뒷면에서는 함수가 작동하기 때문에 강력한 검사와 통제를 할 수 있습니다!

---

## 1.3 가짜 변수 (계산된 프로퍼티) 만들기

심지어 실제로는 존재하지도 않는 변수를 존재하는 것처럼 꾸밀 수도 있습니다. 
사각형의 경우 너비와 높이만 저장해 두고, '면적(`area`)' 이라는 프로퍼티를 호출할 때 즉석에서 계산해서 뱉어주게 만들면 됩니다.

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    # 면적은 값을 저장해두지 않고 부를 때마다 즉석 요리!
    @property
    def area(self):
        return self.width * self.height

box = Rectangle(10, 5)
print(box.area)  # 50 (함수지만 이름처럼 부름!)
```
