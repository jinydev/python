---
layout: docs
title: "3. 람다 익명 함수 (Lambda)"
permalink: /part02/07_function/07_03_section/
---

# 3. 람다 익명 함수 (Lambda)

지금까지 배운 `def` 키워드는 함수에 번듯한 이름을 붙여두고 여러 번 두고두고 사용할 때 쓰는 방식입니다. 

하지만 오직 한 번만 잠깐 쓰고 버릴, 아주 단순한 계산 로직에 굳이 이름을 짓고 메모리를 차지하게 두는 것은 낭비일 수 있습니다. 이럴 때 파이썬에서는 이름 없는 일회용 퀵-함수, **람다(Lambda) 표현식**을 제공합니다.

## 3.1 람다의 기본 문법

람다는 오직 **단 한 줄**로만 작성할 수 있으며, `return` 키워드조차 쓸 필요가 없이 콜론(`:`) 뒤의 계산식이 자동으로 결과물로 반환됩니다.

**기본 문법: `lambda 매개변수들: 반환할 표현식`**

```python
# 일반적인 함수 정의 방식
def normal_add(x, y):
    return x + y

# 람다(익명) 함수 방식
# 코드가 훨씬 간결하고 직관적입니다.
lambda_add = lambda x, y: x + y

print(normal_add(10, 20))   # 30
print(lambda_add(10, 20)) # 30
```

> [!NOTE]
> 람다 역시 내부적으로는 `def`로 만든 함수와 100% 동일하게 `function` 클래스 객체 취급을 받습니다. 단지 파이썬 내부 시스템에서 이름이 없다는 뜻으로 `<lambda>`라는 임시 명찰을 달고 있을 뿐입니다.

---

## 3.2 즉시 실행 함수 (IIFE) 패턴

람다 함수는 선언과 동시에 바로 실행시켜 버릴 수도 있습니다. (Immediately-Invoked Function Expression)
주로 임시적인 계산을 일회성으로 처리하고 깔끔하게 변수를 소멸시키고 싶을 때 사용합니다. 람다 표현식 전체를 괄호 `()`로 감싸고, 바로 뒤에 다시 괄호 `()`를 붙여 인자를 모조리 던져주면 됩니다.

```python
# "나는 x를 받아서 x의 제곱을 곧바로 구하겠다!"
# (선언부)(실행부) 구조
result = (lambda x: x * x)(5)

print(result) # 25
```

---

## 3.3 지능형 컬렉션(Comprehension)과의 시너지

람다 함수가 가장 강력한 힘을 발휘하는 순간은 리스트나 딕셔너리를 가공하기 위한 `map()`, `filter()` 또는 지능형 리스트(List Comprehension) 내부에서 사용될 때입니다.

단, 반복문(for) 안에서 람다를 동적으로 생성할 때는 외부 변수의 상태가 람다 내부로 어떻게 전달되는지(Late Binding) 주의해야 합니다.

```python
# 1. 일반적인 람다 생성 (실행 시점의 x를 참조하려 함)
# 반복문이 끝나고 x는 2가 된 상태에서 일괄 실행되므로 모두 2를 리턴함.
bug_lambdas = [lambda: x for x in range(3)]
print(bug_lambdas[0]()) # 2
print(bug_lambdas[1]()) # 2
print(bug_lambdas[2]()) # 2

# 2. 올바른 람다 바인딩 방법
# 람다 매개변수의 기본값 기능(x=n)을 이용해, 생성 당시의 값을 단단히 묶어둡니다.
safe_lambdas = [(lambda n=x: n)() for x in range(3)]
print(safe_lambdas) # [0, 1, 2]
```
