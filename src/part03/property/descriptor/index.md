---
layout: docs
title: "3. 강력한 보안 요원: 디스크립터(Descriptor)"
permalink: /part03/property/descriptor/
---

# 3. 강력한 보안 요원: 디스크립터(Descriptor)

프로퍼티(`@property`)는 너무 멋지고 편하지만, 단점이 하나 있습니다. 만약 로봇의 양팔, 양다리, 머리 등 수십 개의 부품을 모두 보안 검사해야 한다면? 방어 코드(`setter`)를 10번, 20번 주저리주저리 반복해서 적어줘야 하니 귀찮고 지저분해집니다.

이럴 때, 나만의 막강한 '보안 요원 템플릿'을 딱 하나 만들어두고 여러 변수에 찰싹찰싹 붙여서 재활용하는 고급 기술이 바로 **디스크립터(Descriptor)** 입니다.

## 3.1 디스크립터 요원의 3가지 핵심 무기

파이썬의 인스턴스가 어떤 변수에 접근하려 할 때, 파이썬은 변수가 방치되어 있는지 아니면 '디스크립터 요원'이 지키고 있는지 검사합니다.
요원이 되기 위해선 다음 3가지 특별한 방패(메서드) 중 하나 이상을 들고 있어야 합니다.

1. `__get__(self, instance, owner)` : 데이터를 읽으려 할 때 튀어나오는 방패
2. `__set__(self, instance, value)` : 데이터를 바꾸려 할 때 튀어나오는 방패
3. `__delete__(self, instance)`: 데이터를 지우려 할 때 튀어나오는 방패

---

## 3.2 디스크립터 직접 만들어보기

'이름표'를 지키는 보안 요원 클래스를 만들어 볼까요? 누군가 값을 갱신하려 할 때마다 화면에 누가 접근 중인지 경고를 띄워봅시다.

```python
# 1. 보안 요원(디스크립터) 클래스 만들기
class NameGuard:
    def __init__(self, key_name):
        self.key_name = "_" + key_name # 실제 값을 담아둘 보물 상자 이름 (예: _player)

    def __get__(self, instance, owner):
        print(f"[알림] 앗! 누군가 {self.key_name} 금고를 열어 데이터를 읽어가네요!")
        # 로봇(instance)의 뱃살(__dict__) 안에서 남몰래 값을 꺼내 줌
        return instance.__dict__[self.key_name]

    def __set__(self, instance, value):
        print(f"[보안] 스탑! {self.key_name} 금고 속 데이터를 '{value}' 로 바꾸겠습니다.")
        instance.__dict__[self.key_name] = value


# 2. 로봇(소유자) 클래스에 방패 달아주기
class GameCharacter:
    # 플레이어 1과 2 변수에 NameGuard 보안 요원 배치!
    player1 = NameGuard("player1")
    player2 = NameGuard("player2")

    def __init__(self, p1_name, p2_name):
        self.player1 = p1_name
        self.player2 = p2_name

# 3. 실행해보기!
game = GameCharacter("마리오", "쿠파")
# 출력: 
# [보안] 스탑! _player1 금고 속 데이터를 '마리오' 로 바꾸겠습니다.
# [보안] 스탑! _player2 금고 속 데이터를 '쿠파' 로 바꾸겠습니다.

# 데이터를 읽어도 에이전트가 작동!
print(game.player1)
# 출력: 
# [알림] 앗! 누군가 _player1 금고를 열어 데이터를 읽어가네요!
# 마리오
```
멋지지 않나요? `NameGuard` 하나만 만들어 두면, 아무리 많은 변수라도 단 한 줄로 강력한 방어 요원을 배치할 수 있습니다!

---

## 3.3 [주의] 내 꼬리 내가 물기 (무한 루프 조심!)

디스크립터를 짤 때 가장 많이 하는 실수가 바로 영원히 빙글빙글 도는 **무한 루프**의 지옥에 빠지는 것입니다.

만약 보안 요원 내부의 `__get__` 설계도 창에서 
`return getattr(instance, self.key_name)` (파이썬 내장 조회 함수)을 무심코 쓰면 어떻게 될까요?
`getattr` 함수는 내부적으로 또 `__get__` 가드를 불러오기 때문에, 가드가 튀어나와서 `getattr`을 부르고 -> `getattr`이 또 가드를 부르고 -> 가드가 또 부르는 끝없는 악몽(에러)이 펼쳐집니다!

그래서 디스크립터 강호들은 이런 꼬리 물기를 피하기 위해, 객체의 뱃속 깊은 주머니인 **`instance.__dict__` (인스턴스 딕셔너리)를 강제로 직접 열어서** 값을 안전하게 훔쳐(조회해) 옵니다. 주의하세요!

> [!TIP]
> 놀랍게도 파이썬이 자랑하는 평범한 '함수(`function`)'나 '클래스 메서드(`method`)'들 역시, 내부적으로는 `__get__` 이 구현되어 있는 아주 거대한 디스크립터 보안 요원 중 하나일 뿐입니다! 즉, 디스크립터는 '파이썬의 심장'과도 같은 초특급 핵심 지식입니다!
