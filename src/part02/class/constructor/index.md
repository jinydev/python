---
layout: docs
title: "2. 생성자(__new__)와 초기화(__init__)"
permalink: /part02/class/constructor/
---

# 2. 생성자(`__new__`)와 초기화(`__init__`)

파이썬에서 흔히 `__init__`을 '생성자'라고 부르지만, 엄밀한 파이썬의 구조적 관점에서는 이는 **초기화(Initializer)** 메서드일 뿐입니다. 진짜 객체를 메모리에 탄생시키는 창조주 역할은 `__new__`라는 **생성자(Constructor)** 스페셜 메서드가 담당합니다.

## 2.1 진정한 창조주: `__new__` 메서드

우리가 `Book("파이썬")` 형식으로 클래스 이름표를 호출할 때, 사실 파이썬 내부에서는 가장 먼저 `__new__` 메서드가 발동됩니다. 
이 메서드는 메모리 상에 아무것도 칠해지지 않은 텅 빈 인스턴스(객체)를 만들어서 반환하는 역할을 합니다.

```python
class Alien:
    # 인스턴스 객체를 메모리에 생성하는 진짜 '생성자'
    # 첫 번째 매개변수로 클래스 자기 자신(cls)을 받습니다.
    def __new__(cls, *args, **kwargs):
        print("1. __new__ 호출: 텅 빈 인스턴스를 메모리에 창조합니다.")
        # 부모인 object 클래스의 __new__를 빌려와 객체를 실체화함
        instance = super().__new__(cls)
        return instance

    # 생성된 인스턴스에 값을 채워넣는 '초기화' 메서드
    def __init__(self, name):
        print("2. __init__ 호출: 생성된 인스턴스에 이름을 부여합니다.")
        self.name = name

# 객체 생성 과정
alien1 = Alien("외계인 A")
```

> [!NOTE]
> 일반적인 프로그래밍에서는 `__new__`를 직접 건드릴 일이 거의 없습니다. 하지만 **싱글턴 패턴(Singletion Pattern)**처럼 메모리에 단 하나의 객체만 존재하도록 객체 생성을 통제해야 할 때는 `__new__`를 오버라이딩하여 제어합니다.

---

## 2.2 인스턴스 변수 세팅: `__init__` 메서드

`__new__`가 텅 빈 인스턴스를 반환하면, 파이썬은 즉시 그 반환된 인스턴스를 파라미터 `self` 자리에 담아 `__init__` 메서드로 넘겨줍니다. 
여기서 비로소 인스턴스만의 고유한 속성(이름, 나이 등)을 딕셔너리(`__dict__`) 네임스페이스에 채워 넣게 됩니다.

```python
class Robot:
    def __init__(self, model_num):
        # 각각의 로봇(self)은 자기만의 고유한 모델 번호를 가집니다.
        self.model_num = model_num
        self.battery = 100 # 기본값 세팅

robotX = Robot("X-99")
print(robotX.__dict__) # {'model_num': 'X-99', 'battery': 100}
```

---

## 2.3 객체의 최후: 소멸자 `__del__`

객체의 임무가 끝나고 메모리에서 사라질 때(가비지 컬렉터에 의해 수거될 때) 마지막 유언을 남기듯 실행되는 메서드가 바로 **소멸자 `__del__`** 입니다.

```python
class ServerConnection:
    def __init__(self, ip):
        self.ip = ip
        print(f"[{self.ip}] 서버에 연결을 시작합니다.")

    # 객체가 파괴될 때 자동으로 실행됨
    def __del__(self):
        print(f"[{self.ip}] 안전하게 연결을 종료하고 메모리를 해제합니다.")

# 연결 객체 생성
conn = ServerConnection("192.168.0.1")

# 연결 객체를 명시적으로 파괴 (또는 프로그램이 끝날 때 자동 파괴됨)
del conn 
# 출력: [192.168.0.1] 안전하게 연결을 종료하고 메모리를 해제합니다.
```

---

## 2.4 메모리 다이어트: `__slots__`

파이썬의 각 인스턴스는 자유롭게 속성을 무한히 추가할 수 있도록 내부에 `__dict__`라는 해시 테이블을 몰래 들고 다닙니다. 이로 인해 클래스가 굉장히 유연해지지만, 객체를 수십만 개씩 만들어야 할 때는 메모리 소모가 극심해집니다.

이때, 클래스에 **`__slots__`** 리스트를 선언하면 거대한 `__dict__` 대신 속성의 자리를 미리 고정시켜 메모리 사용량을 획기적으로 줄일 수 있습니다.

```python
class MemoryEfficientPoint:
    # 이 인스턴스는 오직 x, y 속성만을 가질 수 있다고 족쇄를 채움!
    __slots__ = ['x', 'y']
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

point = MemoryEfficientPoint(10, 20)

# [에러 발생] __slots__에 정의되지 않은 새로운 속성을 몰래 추가할 수 없음!
# point.z = 30 
```
