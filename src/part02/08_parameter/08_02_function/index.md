---
layout: docs
title: "2. 함수의 매개변수와 인자 (Parameters & Arguments)"
permalink: /part02/08_parameter/08_02_function/
---

# 2. 함수의 매개변수와 인자 (Parameters & Arguments)

파이썬 함수 세계에서 데이터를 넘겨주는 방식은 다른 프로그래밍 언어의 '값 복사(Call by value)'나 '참조 복사(Call by reference)' 개념과는 사뭇 다릅니다. 파이썬은 오직 객체의 이름표(레퍼런스)만을 전달하는 **'객체 참조 전달(Call by Object Reference)'** 방식을 고수합니다.

## 2.1 인자 전달 방식의 비밀: Call by Object Reference

함수를 호출할 때 외부에서 전달하는 변수(인자)는 파이썬 내부 메모리에 존재하는 객체를 가리키는 포인터(이름표)일 뿐입니다. 
따라서 함수 내부에 들어온 매개변수와 바깥의 원본 변수는 **컴퓨터 메모리 상의 완벽히 동일한 객체**를 쳐다보고 있습니다.

이때, 전달된 데이터가 리스트나 딕셔너리처럼 **변경 가능한(Mutable) 데이터**라면 함수 내부에서 값을 수정했을 때 바깥에 있는 원본 데이터까지 같이 훼손되어 버립니다.

```python
# 1. 원본을 파괴하는 위험한 함수
def modify_list(data_list):
    data_list.append(999) # 전역 변수(원본)의 메모리에 직접 침투하여 수정함

original_data = [1, 2, 3]
modify_list(original_data)

print(original_data) # [1, 2, 3, 999] (원본 데이터가 오염됨!)
```

**[해결책: 사본(Copy) 전달하기]**
원본 데이터를 안전하게 보호하려면, 함수를 호출할 때 원본의 메모리 주소가 아닌 쌍둥이 사본을 만들어서 넘겨야 합니다. 주로 **슬라이싱(`[:]`)** 이나 **`.copy()`** 메서드를 사용합니다.

```python
original_data = [1, 2, 3]

# [:] 를 통해 완전히 똑같이 생긴 새로운 리스트 객체를 생성하여 넘김
modify_list(original_data[:]) 
modify_list(original_data.copy())

print(original_data) # [1, 2, 3] (안전하게 보존됨)
```

---

## 2.2 파이썬 최대의 함정: 가변 기본값 (Mutable Default Argument)

함수를 정의할 때 매개변수에 미리 기본값을 지정해두면, 인자 없이 호출할 때 그 값이 채워지는 편리한 기능이 있습니다. 
하지만 이 **기본값 자리에 리스트(`[]`)나 딕셔너리(`{}`)를 절대로 넣어서는 안 됩니다.**

파이썬은 함수가 호출될 때마다 기본값을 갱신하는 것이 아니라, **함수가 최초로 텍스트로 정의(Compile)될 때 단 한 번만 생성**하여 메모리에 묶어둡니다. 즉, 모든 함수 호출이 단 하나의 리스트 객체를 영원히 공유하게 됩니다.

```python
# [치명적 버그를 유발하는 안 좋은 코딩 패턴]
def add_to_cart(item, cart=[]):
    cart.append(item)
    return cart

print(add_to_cart("사과"))   # ['사과']
print(add_to_cart("바나나")) # ['사과', '바나나'] (이전 호출 결과가 누적됨!)
print(add_to_cart("포도"))   # ['사과', '바나나', '포도'] 
```

**[해결책: None 안전망 사용하기]**
기본값이 컬렉션이어야 한다면, 무조건 파라미터 초기값을 `None`으로 설정하고 함수 실행부(Body) 내부에서 빈 리스트를 생성해 주어야 호출될 때마다 독립적인 방이 생성됩니다.

```python
# [견고하고 안전한 파이썬 코딩 패턴]
def safe_add_to_cart(item, cart=None):
    if cart is None:
        cart = [] # 함수가 호출될 때마다 새로운 빈 리스트 객체를 메모리에 생성!
        
    cart.append(item)
    return cart

print(safe_add_to_cart("사과"))   # ['사과']
print(safe_add_to_cart("바나나")) # ['바나나'] (이전 호출과 섞이지 않음)
```
