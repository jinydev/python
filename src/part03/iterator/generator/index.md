---
layout: docs
title: "3. 게으른 데이터 공장: 제너레이터 (generator)"
permalink: /part03/iterator/generator/
---

# 3. 게으른 데이터 공장: 제너레이터 (`generator`)

앞서 클래스에 `__iter__` 와 `__next__` 를 직접 구현해서 멋진 맞춤형 반복자(Iterator)를 만들 수 있었습니다. 하지만 코드가 너무 길어지고 복잡해지는 단점이 있었죠.
파이썬은 이를 훨씬, 아주 훨씬 쉽게 만들 수 있는 마법의 문법을 제공합니다. 바로 **제너레이터(Generator)** 입니다.

제너레이터는 작동 방식이 아주 "게으릅니다(Lazy)". 누가 달라고 조르기 전(`next()`를 부르기 전)에는 절대로 먼저 일해서 데이터를 만들지 않습니다. 이 게으름 덕분에 메모리를 엄청나게 절약할 수 있습니다!

## 3.1 `return` 대신 `yield`

보통의 파이썬 함수는 `return`을 만나면 값을 딱 뱉어내고 아예 소멸해버립니다(종료).
하지만 제너레이터 함수는 **`yield`**(양보하다, 산출하다)라는 특별한 키워드를 사용합니다. `yield`를 만나면 데이터를 뱉어내긴 하지만, 함수가 죽지 않고 현재 상태 그대로 **"작업 일시 정지(Pause)"** 상태에 들어갑니다!

```python
def my_lazy_factory():
    print("첫 번째 공정 작동합니다...")
    yield "아이템 1호"
    
    print("두 번째 공정 작동합니다...")
    yield "아이템 2호"
    
    print("마지막 공정 작동합니다...")
    yield "아이템 3호"

# 공정 기계를 만듭니다 (이때는 함수 내부 코드가 전혀 실행되지 않습니다!)
factory_machine = my_lazy_factory() 

# next()로 기계를 돌려볼까요?
print(next(factory_machine)) 
# "첫 번째 공정 작동합니다..." 출력 후 "아이템 1호" 반환
# 그리고 함수는 일.시.정.지!

print(next(factory_machine))
# 일시 정지된 위치부터 다시 출발!
# "두 번째 공정 작동합니다..." 출력 후 "아이템 2호" 반환
```
이렇게 함수 코드를 끝까지 다 실행하지 않고 중간중간 멈출 수 있기 때문에 수만 개의 연산 결과도 즉석에서 하나씩 만들어 내보낼 수 있습니다.

---

## 3.2 1줄로 끝내는 제너레이터 표현식 (GenExpr)

지능형 리스트(리스트 컴프리헨션)를 쓸 때 꺾쇠 기호 `[]` 대신 소괄호 `()`를 쓰면 그 즉시 세련된 1줄짜리 제너레이터가 완성됩니다.

```python
# 보통의 지능형 리스트 (메모리 쾅! 모든 제곱수를 다 만들어서 저장)
squares_list = [x*x for x in range(100000)] 

# 제너레이터 표현식 (메모리 세이브! 규칙만 기억하고 대기)
squares_gen = (x*x for x in range(100000))

print(squares_gen) # <generator object <genexpr> at ...>
print(next(squares_gen)) # 0
print(next(squares_gen)) # 1
```

---

## 3.3 대규모 하도급 계약! (`yield from`)

가끔 내가 만든 제너레이터가 다른 제너레이터의 값들을 대신 통째로 다 끌어와서 뱉어주고 싶을 때가 있습니다. 이럴 땐 골치 아프게 `for` 루프를 돌릴 필요 없이, **`yield from`** 이라는 키워드 하나면 파이프라인이 마법처럼 뚫립니다.

```python
def small_factory():
    yield "부품 A"
    yield "부품 B"

def big_factory():
    yield "조립 전..."
    # small_factory에 외주를 맡겨서 거기 있는 걸 대신 다 뽑아줍니다!
    yield from small_factory()
    yield "조립 완료!"

bf = big_factory()
for item in bf:
    print(item)
# 조립 전...
# 부품 A
# 부품 B
# 조립 완료!
```
이렇게 제너레이터를 줄줄이 소시지처럼 엮어서 복잡한 데이터 파이프라인을 아주 우아하게 구축할 수 있습니다!
