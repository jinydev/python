---
layout: docs
title: "57 강제적인 규약: 추상 클래스(Abstract Class)"
permalink: /basic/16_inheritance/57_abstract_classes/
---

# 57 뼈대만 물려주고 구현은 강제하기: 추상 클래스(Abstract Class)

지금까지 우리는 부모가 완성된 기능(메서드)을 만들어 놓으면 자식이 편하게 그걸 가져다 쓰는 '상속'을 배웠습니다. 그렇다면 만약 부모가 **"나는 어떤 입구랑 출구가 필요한지만(이름만) 껍데기로 만들어 둘 테니, 안에 들어가는 진짜 알맹이(기능)는 상속받는 자식인 너희들이 무조건 각자 알아서 새로 짜넣어라!"** 하고 강제하고 싶다면 어떻게 해야 할까요?

이때 등장하는 것이 바로 **추상 클래스(Abstract Class)**입니다. 메서드의 '이름과 인자'라는 뼈대만 존재하고, 뱃속의 실제 코드는 텅 비어있는 미완성 클래스입니다.

## 1. 왜 이런 텅 빈 껍데기가 필요할까? (다형성의 보장)

게임을 만들 때 여러 개발자에게 "각자 몬스터를 하나씩 만들어와라"라고 지시했다고 칩시다. 
어떤 개발자는 공격 함수를 `attack()`으로 만들고, 다른 개발자는 `hit()`, 또 다른 사람은 `strike()`로 마음대로 지어버리면 나중에 이 몬스터들을 한 번에 조종할 때 코드가 엉망진창이 됩니다.

이때 **추상 클래스**를 부모로 만들어 **"내 밑으로 상속받는 모든 몬스터는 무조건 `attack()`이라는 이름의 메서드를 니들이 직접 안에 코드를 채워 넣어서 구현해라. 안 그러면 에러 띄워서 게임 실행도 못하게 막을 거다!"**라고 **강력한 규약(Protocol)**을 걸어버리는 것입니다.

## 2. 파이썬에서 추상 클래스 만들기 (`abc` 모듈)

파이썬은 `abc` (Abstract Base Classes)라는 멋진 기본 모듈을 통해 추상 클래스를 지원합니다.
추상 클래스를 만들려면 **1. `ABC`라는 특별한 부모를 상속받고**, **2. 강제할 메서드 위에 `@abstractmethod` 데코레이터를 붙여주면** 됩니다.

```python
from abc import ABC, abstractmethod

# [미완성 뼈대] 추상 클래스 선언 (이 자체로는 인스턴스를 찍어낼 수 없습니다)
class MonsterProtocol(ABC):
    
    # 자식에게 강제로 할당할 미완성 과제 (뼈대만 있고 본문은 pass)
    @abstractmethod
    def attack(self):
        pass

    @abstractmethod
    def move(self):
        pass

# [개발자 A의 바른 예]
class Slime(MonsterProtocol):
    def attack(self):
        print("슬라임이 끈적한 점액을 발사합니다!")
        
    def move(self):
        print("슬라임이 꾸물꾸물 기어갑니다.")

# 오케이 통과! 완벽하게 작동합니다.
slime = Slime() 
slime.attack() # 슬라임이 끈적한 점액을 발사합니다!


# [개발자 B의 잘못된 예]
class Dragon(MonsterProtocol):
    def attack(self):
        print("드래곤의 거대한 브레스 파이어!!")
    # 앗! 실수로 move() 를 오버라이딩(구현)하는 것을 깜빡했습니다!!

# [에러 폭발!] 부모가 지시한 숙제(move 구현)를 다 안 했다고 객체 생성 자체를 거부합니다!
# dragon = Dragon() 
# TypeError: Can't instantiate abstract class Dragon with abstract method move
```

## 3. 파이썬 코어의 숨겨진 추상 클래스들

파이썬 내부를 뜯어보면, 우리가 자주 쓰는 `리스트(List)`, `딕셔너리(Dict)` 같은 녀석들도 제멋대로 만들어진 게 아닙니다. 파이썬 코어 개발자들이 `collections.abc`라는 곳에 만들어둔 수많은 추상 클래스의 깐깐한 규약을 모두 통과한 엘리트 객체들입니다.

* **`Sequence` 추상 클래스**: "너희가 순서가 있는 리스트나 튜플 행세를 허고 싶어? 그럼 길이(`__len__`) 재는 법이랑 인덱싱(`__getitem__`) 하는 법은 무조건 구현해!"
* **`Mapping` 추상 클래스**: "너희가 딕셔너리처럼 키값으로 놀고 싶다구? 그럼 키값 불러오는 방식 뼈대를 강제로 지켜!"

이렇게 파이썬은 보이지 않는 곳에서 추상 클래스라는 단단한 뼈대를 통해 거대한 표준을 유지하고 있는 아주 치밀한 언어입니다.
