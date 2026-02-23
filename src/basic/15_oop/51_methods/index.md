---
layout: docs
title: "51 생명력을 불어넣는 행동 지침서: 메서드(Method)"
permalink: /basic/15_oop/51_methods/
---

# 51 스스로 생각하고 움직이게 하라: 메서드(Method)

클래스라는 도화지 위에는 이름이나 체력 같은 정적인 테이터(변수)뿐만 아니라, 살아 움직이는 **행동 패턴(함수)**도 얼마든지 스케치할 수 있습니다. 이렇게 클래스 내부 생태계에 철석같이 소속되어 특수 임무를 띠는 함수들을 우리는 일반 함수와 구분 지어 **메서드(Method)**라고 칭합니다.

클래스 내부에 나만의 메서드를 창조할 때 절대 까먹으면 안 되는 단 하나의 황금률이 있습니다. **무조건 첫 번째 매개변수 구멍에는 `self`라는 마법의 단어를 박아 넣는다!**
이 `self`는 "현재 생명을 얻어 활동 중인 나 자신(인스턴스)"을 직통으로 가리킵니다. "내 체력(`self.health`)을 깎아내라", "내 이름표(`self.name`)를 자랑스럽게 외쳐라" 하고 본인에게 명령을 내릴 때 빠져선 안 될 가장 중요한 주어(Subject)입니다.

**코드: 샌드백이 된 불쌍한 몬스터**
```python
class GameMonster():
    # 클래스 내부에 서식하는 함수(메서드)는 언제나 첫 빠따로 self를 챙겨가야 합니다.
    def receive_strike(self, damage_amount):
        self.health = self.health - damage_amount
        print(f"크윽! {self.name}(이)가 {damage_amount}만큼의 뼈아픈 일격을 당했습니다! (잔여 체력: {self.health})")

# 몬스터 스폰
orc_warrior = GameMonster()
orc_warrior.name = "성난 오크 전사"
orc_warrior.health = 200

# 개발자인 우리가 receive_strike 메서드를 호출할 땐 순수 데미지 수치(50)만 입에 넣어주면 됩니다.
# 맨 앞자리를 떡하니 차지했던 self 변수에는 파이썬 엔진이 센스 있게 'orc_warrior' 본체를 몰래 욱여넣어 줍니다.
orc_warrior.receive_strike(50) 
orc_warrior.receive_strike(100)
```

**콘솔 출력창**
```text
크윽! 성난 오크 전사(이)가 50만큼의 뼈아픈 일격을 당했습니다! (잔여 체력: 150)
크윽! 성난 오크 전사(이)가 100만큼의 뼈아픈 일격을 당했습니다! (잔여 체력: 50)
```
