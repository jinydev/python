---
layout: docs
title: "1. 반복형(Iterable)과 반복자(Iterator)"
permalink: /part03/14_iterator/14_01_section/
---

# 1. 반복형(Iterable)과 반복자(Iterator)

파이썬에서 `for` 문을 돌릴 수 있는 리스트, 튜플, 문자열 같은 데이터 꾸러미들을 우리는 **반복형(Iterable)**이라고 부릅니다. 하지만 이 꾸러미들 자체가 데이터를 하나씩 '알아서' 뱉어내는 능력까지 가진 것은 아닙니다. 꾸러미 안에서 데이터를 하나씩 쏙쏙 꺼내주는 **반복자(Iterator)**라는 별도의 뽑기 기계를 거쳐야만 합니다.

## 1.1 `iter()`와 `next()`의 콤비 플레이

- **반복형(Iterable)**: 원소들을 가지고 있는 상자. 내부에 `__iter__` 라는 마법 단어가 구현되어 있습니다.
- **반복자(Iterator)**: 상자에 관을 꽂아 하나씩 뽑아내는 기계. 내부에 `__next__` 라는 마법 단어가 구현되어 있습니다.

`iter()` 함수 상자에 반복형을 넣으면 반복자 기계가 되어 나옵니다. 이 기계에 `next()` 버튼을 누를 때마다 항목이 하나씩 나옵니다.

```python
# 문자열은 반복형(Iterable) 상자입니다.
my_str = "Hi!"

# iter()를 써서 뽑기 기계(Iterator)로 변신시킵니다.
my_iterator = iter(my_str) 

# next()를 누를 때마다 하나씩 튀어나옵니다!
print(next(my_iterator)) # 'H'
print(next(my_iterator)) # 'i'
print(next(my_iterator)) # '!'
```

더 이상 뽑을 게 없는 데 계속 `next()`를 누르면 파이썬 엔진은 **`StopIteration`** 이라는 경고음을 내며 기계를 멈춥니다. 
(`for` 문은 사실 뒤에서 몰래 이 `StopIteration` 에러가 날 때까지 반복해서 `next()` 버튼을 눌러주는 고마운 녀석입니다!)

> [!WARNING]
> 반복자 기계는 데이터를 한 번 다 뽑아내면 수명이 끝납니다. 다시 처음부터 뽑고 싶다면 `iter()`를 써서 기계를 **새로 다시 만들어야** 합니다.

---

## 1.2 내 손으로 뚝딱! 나만의 반복자 만들기

우리가 직접 만든 클래스도 특정 규칙(`__iter__` 와 `__next__` 구현)만 지키면 완벽한 반복자가 될 수 있습니다.

```python
class MyCounter:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1

    # "나 반복형이야!" 하고 선언하는 부분 (자기 자신을 그대로 리턴)
    def __iter__(self):
        return self

    # next()가 불릴 때마다 어떻게 할지 정해줍니다.
    def __next__(self):
        if self.current <= self.limit:
            value = self.current
            self.current += 1
            return value
        else:
            # 한계치에 도달하면 뽑기 종료!
            raise StopIteration

# 3까지만 나오는 뚝딱 카운터 기계 생성!
counter_machine = MyCounter(3)

print(next(counter_machine)) # 1
print(next(counter_machine)) # 2
print(next(counter_machine)) # 3
# print(next(counter_machine)) # 여기서 StopIteration 에러 발생!
```

이렇게 원할 때마다 필요한 데이터를 즉석에서 한 개씩 만들어주기 때문에, 메모리(노트북의 임시 뇌 용량)를 아주아주 조금만 쓰면서도 수백만 개의 데이터를 쉽게 처리할 수 있는 강력한 무기가 됩니다.
