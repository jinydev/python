---
layout: docs
title: "4. 메서드의 종류 (인스턴스, 정적, 클래스)"
permalink: /part02/class/section2/
---

# 4. 메서드의 종류 (인스턴스, 정적, 클래스)

파이썬의 클래스 내부에는 인스턴스의 데이터를 볶고 지지는 함수들이 존재합니다. 이것들을 흔히 **메서드(Method)**라고 부릅니다. 
어떤 주체(인스턴스냐, 클래스 껍데기냐)가 이 메서드를 다루느냐에 따라 파이썬은 **인스턴스 메서드**, **클래스 메서드**, **정적 메서드** 세 가지 종류로 구분하여 지원합니다.

## 4.1 가장 흔한 일꾼: 인스턴스 메서드 (Instance Method)

우리가 파이썬에서 밥 먹듯이 쓰게 될 가장 기본적인 형태의 메서드입니다. 
인스턴스가 생성되고 나면, 그 **인스턴스 고유의 데이터(상태)를 지지고 볶는 역할**을 합니다. 파이썬 문법상 첫 번째 매개변수로 항상 자기 자신을 뜻하는 `self`를 무조건 넘겨받아야 합니다.

```python
class Robot:
    def __init__(self, name):
        self.name = name
    
    # 1. 인스턴스 메서드 정의 (첫 번째 인자는 무조건 self)
    def say_hello(self):
        print(f"삐리릭. 내 이름은 {self.name} 입니다.")

r1 = Robot("R2D2")
# 호출 시, 파이썬이 내부적으로 r1 인스턴스를 self 자리에 몰래 끼워넣습니다.
r1.say_hello() # 삐리릭. 내 이름은 R2D2 입니다.
```

---

## 4.2 클래스의 대표자: 클래스 메서드 (Class Method)

인스턴스 개별 데이터가 아니라, **'클래스 전체를 아우르는 공통 데이터(클래스 변수)'**를 조작하고 싶을 때 사용합니다.
메서드 머리통 위에 `@classmethod`라는 훈장(데코레이터)을 달아주며, 첫 번째 파라미터로는 인스턴스(`self`)가 아니라 **클래스 껍데기 자체(`cls`)**를 넘겨받습니다.

```python
class Employee:
    # 모든 직원이 공유하는 클래스 변수 (사원수)
    total_count = 0 
    
    # 2. 클래스 메서드 정의 (첫 번째 인자는 무조건 cls)
    @classmethod
    def print_company_size(cls):
        print(f"현재 우리 회사의 총 사원수는 {cls.total_count} 명입니다.")

# 인스턴스를 안 만들고도, 곧바로 '클래스명'으로 메서드 호출이 가능합니다!
Employee.print_company_size()
```

---

## 4.3 독립적인 늑대: 정적 메서드 (Static Method)

클래스 안에 둥지를 틀고 있기는 하지만, **클래스 변수(`cls`)나 인스턴스 변수(`self`) 그 어느 것도 건드리지 않는 완벽히 독립적인 함수**입니다. 
머리통에 `@staticmethod` 훈장을 달아주며, 파라미터에 `self`나 `cls` 같은 까다로운 요구사항이 아예 없습니다. 보통 단순 계산이나 보조 유틸리티성 로직을 끼워넣을 때 씁니다.

```python
class MathUtils:
    
    # 3. 정적 메서드 정의 (self, cls 둘 다 필요 없는 순수 계산용 함수)
    @staticmethod
    def add(a, b):
        return a + b

# 단순히 클래스라는 'namespace(이름 공간)' 역할만 빌려 쓰는 셈입니다.
result = MathUtils.add(10, 20)
print(result) # 30
```

---

## 4.4 보너스: 플루언트 인터페이스 (메서드 체이닝)

인스턴스 메서드의 마지막 꼬리 부분(`return` 문)에 `self`를 반환하도록 설계하면, 물 흐르듯이 메서드를 꼬리에 꼬리를 물고 연속으로 부르는 마법이 가능해집니다. 이를 흔히 **메서드 체이닝(Method Chaining)** 패턴이라고 부릅니다.

```python
class TextBuilder:
    def __init__(self, text=""):
        self.text = text
    
    def bold(self):
        self.text = f"**{self.text}**"
        # 나 자신(self)을 고스란히 던져줍니다!
        return self 
        
    def italic(self):
        self.text = f"_{self.text}_"
        # 또 나 자신(self)을 던져줍니다!
        return self

# 꼬리에 꼬리를 무는 기차놀이(Chaining) 방식의 호출
doc = TextBuilder("파이썬").bold().italic()

print(doc.text) # _**파이썬**_
```
