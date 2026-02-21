---
layout: docs
title: "4. 내부 함수 (Inner Function)"
permalink: /part02/07_function/07_04_section/
---

# 4. 내부 함수 (Inner Function)

파이썬의 함수는 단순히 코드만 묶어두는 문법 구조가 아니라, 메모리상에 독립적으로 존재하는 값(객체)입니다. 숫자나 문자열처럼 변수에 담거나 다른 함수로 건네줄 수 있으며, 심지어 **함수 내부에서 또 다른 함수를 잉태(정의)하는 것**도 자유롭습니다. 

이렇게 함수 안에 선언된 함수를 **내부 함수(Inner Function)** 혹은 중첩 함수(Nested Function)라고 부릅니다.

## 4.1 내부 함수의 기본 구조와 클로저(Closure) 기초

바깥쪽 함수(외부 함수)는 내부 함수의 공장 역할을 합니다. 외부 함수 내부에 보조 역할을 할 꼬마 함수들을 여러 개 만들어두고, 외부의 조건에 따라 알맞은 내부 함수를 선택해 **'함수 객체 그 자체'**를 외부로 반환(return)할 수 있습니다.

```python
# 외부 함수 (조건에 따라 적절한 계산기 '함수'를 만들어주는 공장)
def make_calculator(op_type):
    
    # 내부 함수 1
    def add(x, y): return x + y
    
    # 내부 함수 2
    def mul(x, y): return x * y
    
    # 인자에 따라 적절한 내부 함수 "객체 자체"를 반환 (괄호() 없이 이름만 넘김!)
    if op_type == "+":
        return add
    else:
        return mul

# 1. 덧셈 역할을 하는 함수를 주문해서 받아옴
my_add_func = make_calculator("+")

# 2. 받아온 함수를 실제로 실행!
print(my_add_func(10, 20)) # 30
```

> [!NOTE]
> 내부 함수는 부모(외부 함수)의 보호를 받기 때문에, 외부 함수의 바깥(전역 공간)에서는 내부 함수를 직접 호출하거나 간섭할 수 없습니다. 철저히 캡슐화되어 외부의 오염으로부터 안전합니다.

---

## 4.2 외부 함수의 변수를 기억하는 내부 함수

내부 함수의 가장 소름 돋는 마법 중 하나는 부모(외부 함수)의 변수를 **'기억'**한다는 점입니다. 
외부 함수가 실행을 마치고 메모리에서 소멸되더라도, 바깥으로 반환된 내부 함수는 자신이 탄생했을 당시 부모가 가지고 있던 환경 변수를 캡슐처럼 감싸 안고 살아남습니다. (이러한 현상을 **클로저(Closure)**라고 합니다.)

```python
def make_greeting(word): # 외부 함수
    # 이 word 변수는 외부 함수가 끝날 때 같이 죽어야 하지만...

    def say_hello(name): # 내부 함수
        # 내부 함수가 부모의 word 변수를 여기서 사용하고 있음!
        return f"{word}, {name}님!"
    
    return say_hello

# "안녕하세요" 라는 환경을 캡슐화한 함수 생성 (외부 함수는 여기서 임무 종료)
korean_hello = make_greeting("안녕하세요")

# 죽은 줄 알았던 외부 함수의 "안녕하세요"가 내부 함수 속에 끈질기게 살아있음!
print(korean_hello("김철수")) # 안녕하세요, 김철수님!
print(korean_hello("홍길동")) # 안녕하세요, 홍길동님!
```

---

## 4.3 `nonlocal` 키워드 (부모 변수 조작하기)

전역 변수를 깔짝거릴 때 `global`을 썼듯이, 내부 함수 안에서 **부모(외부 함수)의 변수를 갱신(수정)**하려 들면 오류가 발생합니다. 파이썬은 변수 값이 바뀌는 순간 내부 함수 공간에 새로운 지역 변수를 하나 더 만들어버리기 때문입니다.

내부 함수에서 부모 방의 변수를 진짜로 수정하고 싶을 때는 **`nonlocal`** 이라는 선언을 반드시 해주어야 합니다.

```python
def counter_factory():
    count = 0 # 부모의 변수
    
    def click_button():
        # "이 count는 내 방에 있는게 아니라, 내 부모의 방에 있는 count다!" 명시
        nonlocal count 
        
        count += 1 # 부모 함수의 변수를 갱신!
        return count
        
    return click_button

# 버튼 카운터 객체 생성
my_counter = counter_factory()

print(my_counter()) # 1
print(my_counter()) # 2
print(my_counter()) # 3 (계속해서 상태가 누적되어 기억됨)
```
