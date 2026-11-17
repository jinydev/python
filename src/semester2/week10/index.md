---
layout: semester2
title: "10주차: 디자인 패턴 (2) - 전략과 옵저버 패턴 ⚙️"
permalink: /semester2/week10/
description: "10주차: 디자인 패턴 (2) - 전략과 옵저버 패턴 ⚙️에 대한 파이썬(Python) 강좌 문서입니다."
keywords: "10주차: 디자인 패턴 (2) - 전략과 옵저버 패턴 ⚙️, 파이썬, Python, 프로그래밍, 개발, jinydev"
---

# 10주차: 디자인 패턴 (2) - 전략과 옵저버 패턴 ⚙️

지난 시간에는 객체 생성의 효율성을 높이는 생성 패턴(싱글톤, 팩토리)을 배웠습니다. 이번 시간에는 객체들이 서로 어떻게 상호작용하고 행동해야 하는지를 정의하는 **행위 패턴(Behavioral Patterns)** 중 가장 많이 쓰이는 전략 패턴과 옵저버 패턴을 배웁니다.

---

## 1. 전략 패턴 (Strategy Pattern)

전략 패턴은 **실행 중에 알고리즘(전략)을 선택하여 교체**할 수 있게 하는 패턴입니다.

![전략과 옵저버](./img/design_patterns_2.svg)

### 1.1 왜 사용하나요?
예를 들어, 게임 캐릭터의 공격 방식이 '검', '활', '마법'으로 바뀔 수 있다고 합시다. 만약 `if-else` 문으로 구현한다면 공격 방식이 추가될 때마다 캐릭터 클래스의 코드를 계속 수정해야 합니다. 전략 패턴을 쓰면 공격 방식만 따로 클래스로 만들어 갈아 끼울 수 있습니다.

### 1.2 구현 예시
```python
from abc import ABC, abstractmethod

# 전략 인터페이스
class AttackStrategy(ABC):
    @abstractmethod
    def attack(self): pass

# 구체적인 전략들
class SwordAttack(AttackStrategy):
    def attack(self): return "칼로 베기!"

class BowAttack(AttackStrategy):
    def attack(self): return "활로 쏘기!"

# 컨텍스트 (캐릭터)
class Character:
    def __init__(self, strategy):
        self.strategy = strategy # 전략 설정

    def set_strategy(self, strategy):
        self.strategy = strategy # 런타임에 전략 교체

    def perform_attack(self):
        print(self.strategy.attack())

# 사용
hero = Character(SwordAttack())
hero.perform_attack() # 결과: 칼로 베기!

hero.set_strategy(BowAttack()) # 전략 교체
hero.perform_attack() # 결과: 활로 쏘기!
```

---

## 2. 옵저버 패턴 (Observer Pattern)

옵저버 패턴은 **어떤 객체의 상태가 변했을 때, 그 객체에 의존하는 다른 객체들에게 자동으로 알림을 보내는** 패턴입니다. '구독-발행(Pub-Sub)' 모델이라고도 합니다.

### 2.1 왜 사용하나요?
유튜브 채널을 생각하면 쉽습니다. 유튜버(Subject)가 영상을 올리면, 구독자(Observer)들에게 알림이 갑니다. 유튜버는 누가 구독했는지 일일이 알 필요 없이, 그냥 "영상 올렸어!"라고 알림만 보내면 됩니다.

### 2.2 구현 예시
```python
class YoutubeChannel:
    def __init__(self):
        self._subscribers = [] # 구독자 리스트

    def subscribe(self, observer):
        self._subscribers.append(observer)

    def notify(self, video_title):
        for sub in self._subscribers:
            sub.update(video_title)

class Subscriber:
    def __init__(self, name):
        self.name = name

    def update(self, video_title):
        print(f"[{self.name}] 알림: {video_title} 영상이 업로드되었습니다!")

# 사용
channel = YoutubeChannel()
sub1 = Subscriber("지니")
sub2 = Subscriber("철수")

channel.subscribe(sub1)
channel.subscribe(sub2)

channel.notify("파이썬 OOP 정복하기") 
# 결과: [지니] 알림: ... / [철수] 알림: ...
```

---

## 3. 🔍 Deep Dive: 전략 패턴 vs 옵저버 패턴

두 패턴 모두 **인터페이스(추상 클래스)**를 사용하여 결합도를 낮춘다는 공통점이 있지만, 목적이 다릅니다.

- **전략 패턴:** "어떻게 행동할 것인가"라는 **방법(Algorithm)**을 교체하는 것이 목적입니다. (1:1 관계 중심)
- **옵저버 패턴:** "상태가 변했음을 알리는" **통지(Notification)**가 목적입니다. (1:N 관계 중심)

---

## ✍️ 이번 주 연습 문제

**문제 1.** 결제 시스템을 전략 패턴으로 구현해 보세요.
- 전략: `CardPayment`, `CashPayment`, `PaypalPayment`
- `PaymentProcessor` 클래스가 현재 선택된 전략에 따라 결제를 진행하도록 구현하세요.

**문제 2.** 날씨 알림 시스템을 옵저버 패턴으로 구현해 보세요.
- `WeatherStation` (주체): 온도 변화가 생기면 알림을 보냄
- `PhoneApp`, `WebDashboard` (옵저버): 온도 변화 알림을 받아 화면에 표시

**문제 3.** (심화) 옵저버 패턴에서 구독자가 너무 많아질 경우 발생할 수 있는 성능 문제와, 이를 해결하기 위한 방법(예: 비동기 알림)에 대해 생각해서 적어보세요.
---

## 🔍 Deep Dive: 함수형 파이썬을 이용한 전략(Strategy) 패턴 극적 다이어트

전략 패턴은 행위를 클래스로 캡슐화하여 동적으로 갈아끼우는 패턴입니다.
- **클래스 기반의 무거움**: 자바나 C++에서는 추상 전략 인터페이스를 상속받은 ConcreteStrategy 클래스를 각각 다 만들어야 해서 구조가 거대해집니다.
- **파이썬 일급 객체의 마법**: 파이썬에서는 함수가 **일급 객체(First-class Object)**이므로 굳이 껍데기뿐인 클래스를 매번 정의할 필요가 없습니다. 그저 적용할 행동 함수(예: `discount_vip(price)`)를 직접 변수에 담아 객체의 전략 변수로 주입해 주기만 하면 끝납니다. 이는 디자인 패턴의 복잡성을 언어 자체의 기능(함수 전달)으로 녹여내어 극적으로 코드를 단순화(다이어트)하는 파이썬의 강력한 무기입니다.

---

## ☕ Java vs Python 스나이퍼 비교

### 옵저버(Observer) 패턴과 이벤트 발행 모델
*   **Java**: 이벤트 통보 대상인 관찰자들을 저장하기 위해 `List<Observer>` 컬렉션을 클래스 내부에 명시하고, 인터페이스 기반으로 구독과 취소를 철저히 바인딩합니다. (최근에는 람다식 기반 리스너도 사용)
*   **Python**: 유연한 리스트 구조를 활용하여 구독 대상 함수(Callback)들을 단순 배열에 때려 넣고, 이를 루프로 돌아 호출해 줍니다. 인터페이스 선언을 강제하지 않는 덕 타이핑 덕분에 관찰자 클래스의 본질이 달라도 메서드 이름만 맞추면 즉시 이벤트 구독자로 편입되어 작동합니다.

---

## 🎧 Vibe Coding

> **🗣️ 학생 프롬프트 (AI에게 이렇게 명령해 보세요):**
> "파이썬으로 **전략 패턴**을 사용하여 쇼핑몰의 결제 시스템을 설계해 줘. 결제 수단으로 신용카드 전략, 페이코 전략, 계좌이체 전략이 있으며, 런타임에 결제 전략을 자유롭게 바꿔 결제를 진행하는 코드를 작성해 줘."

---

## 코딩 영단어 학습 📝

*   **`Strategy Pattern`**: 전략 패턴. (알고리즘의 행위군을 정의하고 각각을 캡슐화하여 동적으로 서로 교환해서 사용할 수 있도록 만드는 디자인 패턴입니다.)
*   **`Observer Pattern`**: 옵저버 패턴. (한 객체의 상태 변화가 발생했을 때, 그 객체에 의존하는 다른 객체들에게 알림이 자동으로 전달되어 갱신되게 만드는 일대다(1:N) 관계 패턴입니다.)
*   **`Publish-Subscribe`**: 발행-구독. (이벤트 발행자가 구독자들을 직접 알지 못해도 중간 브로커 채널을 통해 이벤트를 비동기로 중계하고 전파하는 분산 아키텍처 모델입니다.)
