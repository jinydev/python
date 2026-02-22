---
layout: docs
title: "6. 단순한 네임스페이스 활용"
permalink: /part01/statement/section3/
---

# 6. 단순한 네임스페이스 활용

앞에서 배운 파이썬의 네임스페이스 메커니즘을 보다 직관적으로 이해하고 구조화된 데이터 묶음을 쉽게 만들기 위해, 파이썬 표준 라이브러리인 `types` 모듈은 `SimpleNamespace` 라는 유용한 클래스를 제공합니다.

이번 장에서는 이 간단한 구조체가 어떻게 작동하는지 알아보고, 이와 유사한 형태의 데이터 관리 클래스를 직접 구현해 보겠습니다.

## 6.1 `types.SimpleNamespace` 기본 사용법

`SimpleNamespace`는 이름 그대로 기능이 거의 없이 오로지 **변수 이름표(속성)들을 묶어서 보관하기 위한 빈 껍데기** 역할을 합니다. 딕셔너리(`dict`)와 매우 유사하게 작동하지만 딕셔너리의 키에 점(`.`) 연산자로 접근할 수 있어 가독성이 뛰어납니다.

```python
import types

# 1. 속성을 주입하며 인스턴스 생성
user_info = types.SimpleNamespace(name="Alice", role="Admin")

print(type(user_info)) # <class 'types.SimpleNamespace'>
print(user_info.name)  # "Alice"

# 2. 런타임에 동적으로 속성 추가하기
user_info.level = 99

# 내부 네임스페이스 점검
print(user_info.__dict__)
# 출력: {'name': 'Alice', 'role': 'Admin', 'level': 99}
```

---

## 6.2 SimpleNamespace 작동 방식 모방하기

내부적으로 `SimpleNamespace` 가 어떻게 구성되어 있는지 원리를 파악하기 위해, 파이썬의 기본 클래스로 유사한 동작을 하는 클래스를 직접 정의해 볼 수 있습니다.

파이썬의 모든 클래스 인스턴스는 내부에 `__dict__` 라는 딕셔너리를 몰래 가지고 있으며, 이 공간이 곧 그 인스턴스의 네임스페이스입니다. 이 원리를 활용하여 객체가 생성될 때(`__init__`) 넘겨받은 값들을 즉시 이 딕셔너리에 합치도록(Update) 구현합니다.

```python
class CustomNamespace:
    def __init__(self, **kwargs):
        # 넘겨받은 모든 키워드 인자들을 이 인스턴스의 네임스페이스에 통째로 붓습니다.
        self.__dict__.update(kwargs)

    def __repr__(self):
        # 객체를 출력할 때 예쁘게 보여주기 위한 장치
        keys = sorted(self.__dict__.keys())
        items = [f"{k}={repr(self.__dict__[k])}" for k in keys]
        return f"{type(self).__name__}({', '.join(items)})"

# 직접 만든 클래스 테스팅
config = CustomNamespace(host="localhost", port=8080)

print(config.host) # "localhost"
config.timeout = 30

print(repr(config))
# 출력: CustomNamespace(host='localhost', port=8080, timeout=30)
```

이와 같이 파이썬은 변수와 값이 매칭되는 "이름표 바구니(`__dict__`)" 구조를 통해 모든 메커니즘이 투명하고 일관성 있게 운영됩니다.
