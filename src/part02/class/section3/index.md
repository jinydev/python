---
layout: docs
title: "8. 메타 클래스의 이해"
permalink: /part02/class/section3/
---

# 8. 메타 클래스의 이해

지금까지 우리는 붕어빵 틀(클래스)로 붕어빵(인스턴스)을 찍어냈습니다. 그런데 문득 궁금증이 생깁니다. **"도대체 그 붕어빵 '틀' 자체는 누가 찍어내는 거지?"** 
이 호기심의 종착지에 바로 **메타 클래스(Metaclass)**라는 개념이 기다리고 있습니다.

## 8.1 붕어빵 틀 공장: `type`

우리가 객체의 자료형을 확인할 때 무심결에 쓰는 `type()` 함수는 사실 함수가 아니라 **파이썬의 가장 거대한 공장(메타 클래스)**입니다. 

우리가 에디터에 `class MyClass:` 라고 치면, 파이썬은 내부적으로 몰래 `type` 공장을 가동시켜 `MyClass`라는 붕어빵 틀을 쇳물에서 주조해냅니다. 즉, 파이썬의 모든 클래스는 `type`이 만들어낸 하나의 인스턴스에 불과합니다.

```python
# 일반적인 붕어빵 틀(클래스) 정의
class Dog:
    name = "강아지"

# 이 '틀' 자체의 자료형(누가 만들었지?)을 물어봄
# [결과] <class 'type'> -> "type 이라는 메타 클래스가 만들었습니다."
print(type(Dog)) 
```

---

## 8.2 코딩 없이 클래스 찍어내기

메타 클래스 `type`의 진짜 힘은 코드 문자열과 딕셔너리만으로 **런타임(실행 중)에 동적으로 새로운 클래스를 창조**할 수 있다는 점입니다. 

`type(이름, 상속받을부모튜플, 속성딕셔너리)` 형태로 설계도를 넘겨주면, 눈 깜짝할 새에 새로운 클래스가 뚝딱 튀어나옵니다.

```python
# 1. 속성들을 담은 딕셔너리 준비
namespace = {
    'name': '스카이넷',
    'hp': 9999
}

# 2. type 메타 클래스를 가동하여 'Robot' 이라는 새로운 클래스 창조!
# (상속받을 튜플이 비어있으므로 (object,) 가 기본값)
RobotClass = type('Robot', (), namespace)

# 마치 'class Robot:' 으로 만든 것과 똑같이 완벽하게 작동합니다.
terminator = RobotClass()
print(terminator.name) # 스카이넷
print(terminator.hp)   # 9999
```

---

## 8.3 나만의 메타 클래스 만들기

기본 공장인 `type` 대신 우리가 직접 **맞춤형 붕어빵 틀 공장(Custom Metaclass)**을 지을 수도 있습니다. 
`type`을 상속받아 나만의 메타 클래스를 작성한 뒤, 일반 클래스를 만들 때 `metaclass=` 옵션을 달아주면 파이썬은 기본 공장 대신 내 공장으로 주문서를 넘깁니다.

이 기법은 웹 프레임워크(Django 등) 핵심 개발자들이 ORM 테이블 구조를 마법같이 생성할 때 사용하는 궁극기 중 하나입니다.

```python
# 1. 나만의 붕어빵 틀 공장 건축 (반드시 type을 상속)
class MyCustomMeta(type):
    # 클래스가 탄생(?)하기 직전에 호출됨
    def __new__(mcs, name, bases, namespace):
        print(f"[메타 공장] '{name}' 클래스 조립을 시작합니다...")
        return super().__new__(mcs, name, bases, namespace)

# 2. 클래스 주문 시 내 공장에 하청 주기
class User(metaclass=MyCustomMeta):
    pass
    
# 화면 출력: [메타 공장] 'User' 클래스 조립을 시작합니다...
```
