---
layout: docs
title: "9. 객체 간의 연관 관계와 의존성"
permalink: /part02/09_class/09_09_section/
---

# 9. 객체 간의 연관 관계와 의존성

지금까지 클래스를 재사용하는 핵심 방법으로 상속(Inheritance)을 배웠습니다. 하지만 상속의 깊이가 깊어지면 부모의 작은 변화가 자식에게 연쇄적인 버그를 일으키는 **'깨지기 쉬운 부모 클래스 문제(Fragile Base Class Problem)'**가 발생합니다. 

그래서 현대 객체지향 설계에서는 **"상속(Inheritance)보다는 연관(Association)과 구성(Composition)을 활용하라"**는 명언이 있습니다. 부모-자식 관계 대신 포함 관계로 서로를 참조하는 방식을 알아봅니다.

## 9.1 공동 운명체: 구성 (Composition)

한 객체가 생성될 때 내부에 다른 객체를 직접 생성하여 품고 있는 형태입니다. **컨테이너 객체가 소멸하면 부품 객체도 함께 운명을 같이하는 강력한 생명주기 동일성**을 가집니다.

```python
class Engine:
    def __init__(self, hp):
        self.hp = hp
        print("엔진이 조립되었습니다.")

class SportsCar:
    def __init__(self, brand, engine_hp):
        self.brand = brand
        # 차가 만들어지는 순간, 차 내부에서 엔진 객체를 직접 생성함 (강한 결합)
        self.engine = Engine(engine_hp)
        
    def show_info(self):
        print(f"{self.brand} 스포츠카 (출력: {self.engine.hp}마력)")

# 자동차가 폐차(소멸)되면 내부의 엔진도 함께 사라집니다.
ferrari = SportsCar("페라리", 800)
ferrari.show_info()
```

---

## 9.2 느슨한 결합: 집합 (Aggregation)

구성(Composition)보다 **훨씬 느슨하고 자유로운 연관 관계**입니다. 외부에서 이미 완성된 부속품(객체)을 넘겨받아 잠시 담아둘 뿐입니다. 
본체 객체가 파괴되어도 부속품 객체는 바깥에서 여전히 생존할 수 있습니다.

```python
class Keyboard:
    def __init__(self, switch_type):
        self.switch_type = switch_type
        print("키보드가 준비되었습니다.")

class Computer:
    def __init__(self, model):
        self.model = model
        self.keyboard = None # 초기엔 키보드가 없음
        
    def plug_in(self, keyboard_obj):
        # 외부에서 만들어진 키보드 객체를 꽂아넣음 (약한 결합)
        self.keyboard = keyboard_obj

# 컴퓨터와 키보드가 각자 독립적으로 창조됨
mech_keyboard = Keyboard("청축")
mac_studio = Computer("Mac Studio")

# 연결 (Aggregation)
mac_studio.plug_in(mech_keyboard)

# 컴퓨터를 버린(삭제)해도, 키보드는 여전히 내 책상에 살아있습니다!
del mac_studio
print(mech_keyboard.switch_type) # 청축
```

---

## 9.3 남에게 떠넘기기: 위임 패턴 (Delegation)

상속을 쓰지 않으면서도 다른 클래스의 기능을 내 것처럼 재사용할 때 유용한 패턴입니다. 자신에게 접수된 작업 지시(메서드 호출)를, **자신이 품고 있는 다른 전담 객체(연관 객체)에게 그대로 토스(Toss)**해버립니다.

```python
class PrinterModule:
    def do_print(self, document):
        return f"[출력 중] {document}"

# 부모 PrinterModule을 상속받지 않고, 객체로 품어서 기능을 위임합니다.
class OfficeAssistant:
    def __init__(self):
        # 복잡한 인쇄 기능은 내부 전담 객체를 구성(Composition)하여 처리
        self.printer = PrinterModule()
        
    def print_document(self, doc_name):
        print("비서: 네, 인쇄를 지시하겠습니다.")
        # 일은 내가 직접 안 하고 품고 있는 프린터 객체에게 '위임'
        result = self.printer.do_print(doc_name)
        print(result)

assistant = OfficeAssistant()
assistant.print_document("월간 보고서.pdf")
# 비서: 네, 인쇄를 지시하겠습니다.
# [출력 중] 월간 보고서.pdf
```
