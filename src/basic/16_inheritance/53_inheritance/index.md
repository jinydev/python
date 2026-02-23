---
layout: docs
title: "53 유전자 물려받기: 상속(Inheritance)"
permalink: /basic/16_inheritance/53_inheritance/
---

# 53 코드를 복사하지 않고 부모 능력을 훔쳐오기: 상속

온라인 게임 캐릭터를 기획하며 '검사'와 '마법사'라는 두 직업의 코드를 짠다고 상상해 봅시다. 두 직업은 휘두르는 무기와 공격 스킬만 다를 뿐, '숨쉬기', '걷기', '뛰기' 같은 사람 고유의 기본 행동 패턴은 완벽히 같습니다. 
이럴 땐 모든 직업마다 똑같은 걷기 코드를 노가다로 붙여넣는 대신, 공통분모를 묶어 '인간(부모)'이라는 베이스 클래스로 선언해 두고 두 하위 직업(자식)에게 이 능력을 통째로 **상속(Inheritance)**해 주는 기법이 효율적입니다.

**코드: 부모의 유전자를 상속받는 자식들**
```python
# 1. 뼈대가 될 부모 클래스(Base Class)를 먼저 세팅합니다.
class BaseHuman():
    def walk_around(self):
        print("두 발로 뚜벅뚜벅 걸어갑니다.")
    def eat_food(self):
        print("음식을 맛있게 우물우물 먹습니다.")

# 2. 새로운 클래스를 만들 때, 이름 옆 괄호 안에 부모 클래스 이름을 슬쩍 밀어 넣으면 유전자 복제 끝!
class Knight(BaseHuman):
    # 전사만의 전용 고유 스킬을 타이핑해 넣습니다.
    def slash_sword(self):
        print("양손검으로 적을 무자비하게 내리치기!")

class Sorcerer(BaseHuman):
    def cast_fireball(self):
        print("강력한 파이어볼 연성 후 발사!")

# 전사 캐릭터를 하나 서버에 스폰시켜 볼까요?
arthas = Knight()

arthas.slash_sword() # 기사가 원래 갖고 태어난 자신의 고유 검술도 잘 작동하고,
arthas.walk_around() # 띠용? 한 줄도 안 적은 부모의 걷기 기능(walk_around)까지 내 것처럼 뻔뻔하게 쓸 수 있습니다!
```

**콘솔 출력창**
```text
양손검으로 적을 무자비하게 내리치기!
두 발로 뚜벅뚜벅 걸어갑니다.
```

자식 클래스는 별도의 수고 없이 부모 클래스에 정의된 알짜배기 기능들을 고스란히 끌어다 쓸 수 있습니다. 일상생활의 유산 상속과 다른 점이 있다면, 파이썬에서는 자식 수백 명에게 코드를 상속해 줘도 부모의 원본 재산(코드 블록)이 절대 닳아 없어지지 않는다는 점입니다!

---

## 53.1 욕심쟁이 상속: 다중 상속 (Multiple Inheritance)

Java 같은 강력한 타입 기반 언어들은 부모를 딱 한 명만 모실 수 있도록 다중 상속을 엄격히 금지합니다. 반면, 파이썬은 대단히 자유분방해서 **여러 부모로부터 동시에 유전자를 물려받는 다중 상속을 쿨하게 허용**합니다. 
클래스를 괄호로 열고 콤마(`,`)로 여러 부모 클래스 이름을 쭈르륵 나열하기만 하면 됩니다.

```python
class Flyable:
    def fly(self):
        print("하늘을 사뿐하게 납니다.")

class Swimmable:
    def swim(self):
        print("물 속을 유유히 헤엄칩니다.")

# 공중과 수중의 두 가지 능력을 모두 물려받은 궁극의 오리 클래스!
class SpecialDuck(Flyable, Swimmable):
    pass

donald = SpecialDuck()
donald.fly()  # 엄마 능력 발동: 하늘을 사뿐하게 납니다.
donald.swim() # 아빠 능력 발동: 물 속을 유유히 헤엄칩니다.
```
