---
layout: docs
title: "2. 내 손으로 만드는 데코레이터 공장"
permalink: /part03/property/section/
---

# 2. 내 손으로 만드는 데코레이터 공장

파이썬에서 친절하게 기본으로 제공하는 `@property` 라는 데코레이터를 이용해 멋진 보안 문지기를 만들었죠? 그렇다면 이 `property` 는 속이 어떻게 생겼길래 이런 마법을 부리는 걸까요?
우리가 직접 그 내부와 쏙 빼닮은 나만의 "수제 프로퍼티 클래스"를 만들어보면서 원리를 뜯어보겠습니다.

## 2.1 커스텀 Property 클래스의 구조

파이썬의 `property`는 사실 함수가 아니라 거대한 **통제실 클래스**입니다. 
이 통제실 안에는 데이터를 읽고(`fget`), 쓰고(`fset`), 지우는(`fdel`) 3명의 요원이 대기하고 있습니다.

이 원리를 따라 우리만의 통제실 `MyProperty` 인스턴스를 직접 만들어 보면 이렇습니다.

```python
class MyProperty:
    # 3명의 요원(함수)을 초기에 등록받는 역할을 합니다.
    def __init__(self, fget=None, fset=None, fdel=None):
        self.fget = fget
        self.fset = fset
        self.fdel = fdel

    # '읽기' 명령이 들어왔을 때 fget 요원 출동!
    def __get__(self, obj, objtype=None):
        if self.fget is None:
            raise AttributeError("읽을 수 없는 속성입니다.")
        return self.fget(obj)

    # '쓰기' 명령이 들어왔을 때 fset 요원 출동!
    def __set__(self, obj, value):
        if self.fset is None:
            raise AttributeError("변경할 수 없는 속성입니다.")
        self.fset(obj, value)

    # '지우기' 명령이 들어왔을 때 fdel 요원 출동!
    def __delete__(self, obj):
        if self.fdel is None:
            raise AttributeError("지울 수 없는 속성입니다.")
        self.fdel(obj)
```

이 코드가 바로 파이썬에 내장되어 있는 `property` 클래스의 아주 단순화된 핵심 심장부입니다. 이 통제실의 핵심은 바로 `__get__`, `__set__`, `__delete__` 라는 파이썬 고유의 마법 주문(스페셜 메서드)들에 있습니다.

---

## 2.2 데코레이터를 등록해주는 도구 만들기

여기에, 내장 `@property` 처럼 우리도 함수 바로 위에 `@내이름.setter`를 붙일 수 있도록 데코레이터 지원 파트를 마저 붙여주는 것이 좋습니다.

```python
class MyProperty:
    # (앞선 __init__, __get__, __set__ 생략...)
    
    # 누군가 @이름.setter 데코레이터를 쓸 수 있게 열어주기!
    def setter(self, fset_func):
        print(">> 새 setter 요원 등록 완료!")
        # 기존 요원들(fget, fdel)은 살려두고, 
        # 새로운 쓰기 요원(fset_func)을 장착한 MyProperty 기계를 새로 복사해서 줍니다.
        return type(self)(self.fget, fset_func, self.fdel)

    # 누군가 @이름.getter 데코레이터를 쓸 수 있게 열어주기!
    def getter(self, fget_func):
        return type(self)(fget_func, self.fset, self.fdel)
```

이처럼 프로퍼티란, 파이썬이 던져주는 **3가지 특별한 스위치(`__get__`, `__set__`, `__delete__`)가 장착된 리모컨 객체(=디스크립터)**를 변수 이름에 씌워놓은 것에 불과합니다. 이제 대망의 '디스크립터(Descriptor)'가 무엇인지 다음 장에서 더 깊이 알아보겠습니다!
