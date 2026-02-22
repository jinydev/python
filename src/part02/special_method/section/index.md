---
layout: docs
title: "1. 연산자의 숨겨진 마법"
permalink: /part02/special_method/section/
---

# 1. 연산자의 숨겨진 마법

우리가 무심코 사용하는 파이썬의 거의 모든 연산자는 내부적으로 스페셜 메서드를 호출합니다. 이 메서드들을 재정의(오버로딩)하면, 내가 만든 클래스도 파이썬 기본 자료형처럼 자연스럽게 연산자를 쓸 수 있습니다.

## 1.1 점(`.`) 하나에 숨겨진 비밀: 속성 제어

객체 내부의 변수나 함수를 꺼낼 때 쓰는 점(`.`) 연산자에는 3단계 방어선이 숨어있습니다.

* **`__getattribute__`**: 무조건 가장 먼저 호출됩니다. 속성이 있든 없든 가로챕니다. (자칫 무한 재귀에 빠질 위험이 커 주의해야 합니다.)
* **`__getattr__`**: `__getattribute__`가 속성을 찾지 못해 에러가 날 위기에 처했을 때 구원투수처럼 호출됩니다.
* **`__setattr__` & `__delattr__`**: 속성에 값을 할당(`=`)하거나 삭제(`del`)할 때 호출됩니다.

```python
class MagicalBox:
    def __init__(self):
        self.items = {'apple': 10}

    # 없는 속성을 찾으면 에러 대신 친절한 메시지 반환
    def __getattr__(self, name):
        return f"마법 상자에는 '{name}'이(가) 없습니다!"

box = MagicalBox()
print(box.items) # {'apple': 10} (원래 있는 속성)
print(box.gold)  # 마법 상자에는 'gold'이(가) 없습니다! (__getattr__ 발동)
```

---

## 1.2 "네 안에 내가 있니?": `in` 연산자

리스트나 문자열에 `in` 키워드를 써본 적이 있을 겁니다. 이 키워드는 객체 안의 **`__contains__`** 메서드를 호출합니다.

```python
class WordBag:
    def __init__(self, words):
        self.words = words
        
    def __contains__(self, word):
        # 대소문자 구분 없이 찾도록 마법 부여
        return word.lower() in [w.lower() for w in self.words]

bag = WordBag(["Apple", "Banana"])
print("apple" in bag) # True! (__contains__ 발동)
```

---

## 1.3 대괄호 `[]`의 마술: 인덱싱과 슬라이싱

객체에 대괄호를 붙여 `obj[key]` 형태로 값을 찾거나 바꾸게 하려면, 컬렉션의 핵심 스페셜 메서드 3인방이 필요합니다. 

* **`__getitem__(self, key)`**: 값을 찾을 때
* **`__setitem__(self, key, value)`**: 값을 변경하거나 추가할 때
* **`__delitem__(self, key)`**: 값을 지울 때

만약 값을 찾다가 없는 키를 요쳥했을 때 에러 대신 기본값을 주려면 딕셔너리의 특징인 **`__missing__(self, key)`**을 함께 쓰기도 합니다.

```python
class CustomList:
    def __init__(self):
        self.data = ['A', 'B', 'C']

    def __getitem__(self, index):
        print(f"[{index}]번 서랍을 엽니다.")
        return self.data[index]

cl = CustomList()
print(cl[1]) 
# [1]번 서랍을 엽니다.
# B
```

---

## 1.4 사칙연산도 내 마음대로 (+, -, *, /)

숫자끼리 더하는 덧셈 연산자 `+`도 사실은 메서드입니다. 클래스에 아래 메서드들을 정의하면 객체끼리의 덧셈, 뺄셈, 나눗셈 등도 가능해집니다.

* **일반 연산**: `__add__` (+), `__sub__` (-), `__mul__` (*), `__truediv__` (/)
* **할당 연산**: `__iadd__` (+=), `__isub__` (-=) 등
* **우측 연산 (역방향)**: `__radd__` (10 + obj 처럼 우측에 위치할 때)

```python
class Money:
    def __init__(self, amount):
        self.amount = amount

    # 내 돈과 남의 돈을 합치는 마법
    def __add__(self, other_money):
        return Money(self.amount + other_money.amount)
        
    def __str__(self):
        return f"{self.amount}원"

m1 = Money(5000)
m2 = Money(3000)
print(m1 + m2) # 8000원 (__add__ 발동)
```
