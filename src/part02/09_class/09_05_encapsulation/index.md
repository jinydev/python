---
layout: docs
title: "5. 정보 은닉과 프로퍼티 (Encapsulation)"
permalink: /part02/09_class/09_05_encapsulation/
---

# 5. 정보 은닉과 프로퍼티 (Encapsulation)

클래스를 설계할 때, 객체 내부의 민감한 데이터나 복잡한 상태를 외부에서 함부로 건드리지 못하게 꽁꽁 싸매어 보호하는 기법을 **캡슐화(Encapsulation)** 또는 **정보 은닉(Information Hiding)**이라고 부릅니다. 
다른 언어(Java 등)는 `private`, `public` 같은 엄격한 접근 제어자 키워드가 있지만, 파이썬은 **'우리 모두 다 큰 성인이니 굳이 문을 잠그진 말자'**는 철학을 가져서 진짜 완벽한 은닉은 없습니다. 대신, 독특한 이름표 규칙(Naming Convention)과 데코레이터를 통해 은닉을 훌륭하게 모방합니다.

## 5.1 암묵적인 경고: 언더스코어 1개 (`_name`)

파이썬 개발자들 사이의 굳은 약속입니다. 변수나 메서드 이름 앞에 **언더스코어(`_`)를 1개** 붙이면, *"이 변수는 내부적으로만 쓸 거니까 외부에서 함부로 점(`.`) 찍어서 건드리지 마세요"* 라는 강력한 경고 메시지를 뜻합니다. (문법적인 강제성은 없습니다.)

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        # 외부에서 함부로 건드리면 안 되는 민감한 잔고 데이터
        self._balance = balance

account = BankAccount("홍길동", 10000)

# (강제성은 없으므로 읽거나 수정할 수는 있지만, 파이썬 생태계의 금기사항입니다!)
print(account._balance) 
```

---

## 5.2 강렬한 방어막: 맹글링 (`__name`)

정말로 이름을 꽁꽁 숨기고 싶을 때는 변수명 앞에 **언더스코어 2개(`__`)**를 연속으로 붙입니다. 
파이썬은 이 변수를 보는 순간, 몰래 변수 이름을 `_클래스명__변수명` 형태로 괴상하게 찌그러뜨려 놓습니다. 이를 **이름 맹글링(Name Mangling)**이라고 부릅니다.

```python
class SecretAgent:
    def __init__(self, code_name):
        # 맹글링 발동! 외부에선 절대 '__code_name' 으로 찾을 수 없습니다.
        self.__code_name = code_name
        
    def reveal(self):
        # 클래스 내부의 메서드에서는 정상적인 이름으로 접근 가능합니다.
        return f"내 정체는 {self.__code_name} 이다."

agent = SecretAgent("007")

# [에러 발생] 외부에서 이 이름으로 찾으려고 하면 찾을 수 없다고 튕겨냅니다.
# print(agent.__code_name) 

# (굳이 해킹(?) 하자면 찌그러진 맹글링 이름 전체를 치면 접근할 순 있습니다.)
print(agent._SecretAgent__code_name) # 007
```

---

## 5.3 우아한 속성 제어: `@property` 데코레이터

데이터를 은닉(`_변수명`)해놓고 외부에는 이를 안전하게 읽고 쓸 수 있는 통로만 열어주고 싶을 때, 자바처럼 `get_name()`, `set_name()` 같은 투박한 메서드를 만드는 대신 파이썬은 **`@property`** 라는 우아한 마법을 제공합니다.

마치 일반 변수에 접근하는 것처럼 보이지만, 사실은 우리가 숨겨둔 통제(메서드)를 반드시 거치게 만드는 필터 역할을 합니다.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        # 실제 나이 데이터는 철저히 은닉 (직접 수정 불가)
        self._age = age
        
    # [1. Getter] 프로퍼티를 달아주면 밖에서는 변수처럼 읽을 수 있습니다.
    @property
    def age(self):
        return self._age
        
    # [2. Setter] 값을 수정할 때 반드시 이 검사소(메서드)를 통과하게 만듭니다.
    @age.setter
    def age(self, new_age):
        if new_age < 0:
            print("[시스템 경고] 나이는 0보다 작을 수 없습니다!")
        else:
            self._age = new_age

p = Person("앨리스", 25)

# 마치 변수처럼 값을 읽음 (사실은 @property 메서드 실행됨)
print(p.age) # 25

# 마치 변수처럼 값을 할당함 (사실은 @age.setter 검사소가 발동됨)
p.age = -10 # [시스템 경고] 나이는 0보다 작을 수 없습니다!

print(p.age) # 여전히 안전하게 25를 유지함!
```
