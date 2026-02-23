---
layout: docs
title: "62 마르지 않는 샘물: 반복형(Iterable)과 반복자(Iterator)"
permalink: /basic/20_advanced_iteration/62_iterators/
---

# 62 마르지 않는 샘물: 반복형(Iterable)과 반복자(Iterator)

파이썬에서 `for` 문을 돌릴 수 있는 리스트, 튜플, 문자열 같은 데이터 꾸러미들을 우리는 **반복형(Iterable)**이라고 부릅니다. 하지만 이 꾸러미들 자체가 데이터를 하나씩 '알아서' 뱉어내는 능력까지 가진 것은 아닙니다. 꾸러미 안에서 데이터를 하나씩 쏙쏙 꺼내주는 **반복자(Iterator)**라는 별도의 뽑기 기계를 거쳐야만 합니다.

## 1. `iter()`와 `next()`의 콤비 플레이

- **반복형(Iterable)**: 원소들을 품고 있는 상자. 내부에 `__iter__` 라는 특수한 마법 메서드가 구현되어 있습니다.
- **반복자(Iterator)**: 상자에 관을 꽂아 하나씩 뽑아내는 기계. 내부에 `__next__` 라는 마법 단어가 구현되어 있습니다.

`iter()` 함수 상자에 반복형을 집어넣으면 반복자 기계가 되어 나옵니다. 이 기계에 `next()` 버튼을 누를 때마다 뱃속의 항목이 하나씩 세상 밖으로 튀어나옵니다.

```python
# 문자열은 반복형(Iterable) 상자입니다.
my_str = "Hi!"

# iter()를 써서 하나씩 뽑아내는 기계(Iterator)로 변신시킵니다.
my_iterator = iter(my_str) 

# next()를 누를 때마다 하나씩 튀어나옵니다!
print(next(my_iterator)) # 'H'
print(next(my_iterator)) # 'i'
print(next(my_iterator)) # '!'
```

더 이상 뽑을 게 없는데 계속 `next()`를 누르면 파이썬 엔진은 **`StopIteration`** 이라는 경고음을 내며 기계를 멈춥니다. 
(`for` 문은 사실 우리가 모르는 뒤편에서 몰래 이 `StopIteration` 에러가 날 때까지 무한정 `next()` 버튼을 광클해주는 아주 고마운 녀석이었습니다!)

> [!WARNING]
> 반복자 기계는 데이터를 한 번 다 뽑아내면 수명이 완전히 끝납니다(소진됨). 다시 처음부터 뽑고 싶다면 텅 빈 기계를 누를 게 아니라, `iter()`를 써서 기계를 **새로 다시 만들어야** 합니다.

---

## 2. 내 손으로 뚝딱! 나만의 반복자 기계 만들기

우리가 직접 만든 클래스도 특정 규칙(`__iter__` 와 `__next__` 구현)만 완벽히 지키면, 파이썬이 인정해 주는 내장 반복자가 될 수 있습니다.

```python
class MyCounter:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1

    # "나 반복형이야!" 하고 선언하는 부분 (기계 자기 자신을 그대로 리턴)
    def __iter__(self):
        return self

    # next()가 불릴 때마다 어떻게 숫자를 뱉어낼지 정해줍니다.
    def __next__(self):
        if self.current <= self.limit:
            value = self.current
            self.current += 1
            return value
        else:
            # 한계치에 도달하면 뽑기를 멈추는 에러를 뿜어냄!
            raise StopIteration

# 딱 3까지만 연속해서 나오는 뚝딱 카운터 기계 생성!
counter_machine = MyCounter(3)

print("첫 번째:", next(counter_machine)) # 1
print("두 번째:", next(counter_machine)) # 2
print("세 번째:", next(counter_machine)) # 3
# print(next(counter_machine)) # 여기서 숨겨진 StopIteration 에러 발생!
```

이렇게 원할 때마다 필요한 데이터를 **그 자리에서(즉석에서) 딱 한 개씩 만들어주기 때문에**, 노트북의 뇌 용량(메모리)을 아주아주 조금만 쓰면서도 무한대에 가까운 데이터를 에러 없이 쉽게 처리할 수 있는 강력한 설계 패턴이 됩니다.
