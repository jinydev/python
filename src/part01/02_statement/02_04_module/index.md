---
layout: docs
title: "4. 모듈(Module)과 패키지(Package)"
permalink: /part01/02_statement/02_04_module/
---

# 4. 모듈(Module)과 패키지(Package)

프로그램의 덩치가 커지면 모든 코드를 하나의 파일에 담아둘 수 없습니다. 파이썬에서는 관련 있는 함수와 클래스들을 하나의 파이썬 파일(`.py`)로 묶어 **모듈(Module)** 단위로 관리하며, 여러 모듈들을 다시 하나의 폴더로 묶은 것을 **패키지(Package)**라고 부릅니다.

## 4.1 `import` 구문의 활용

외부에 작성된 파이썬 모듈을 현재 내 코드에서 불러와 사용하려면 `import` 문을 사용합니다. 파이썬이 기본으로 제공하는 내장 모듈들(예: `math`, `os`) 뿐만 아니라 개발자가 직접 만든 파일들도 동일한 방식으로 호출할 수 있습니다.

### 다양한 import 방식

1. **모듈 전체 불러오기**
   ```python
   import math
   print(math.pi) # 3.141592...
   ```
2. **별칭(alias) 지정하기**
   ```python
   import pandas as pd
   ```
3. **특정 요소만 골라서 불러오기**  
   모듈 이름 대신 내부의 객체 이름만으로 직접 접근하고 싶을 때 사용합니다.
   ```python
   from math import sin, pi
   print(sin(pi / 2)) # 1.0
   ```

> [!TIP]
> `import` 문은 원칙적으로 파이썬 스크립트 파일의 맨 최상단에 모아서 작성하는 것(PEP 8 권장)이 모범 사례입니다. 가독성을 높이고 의존성을 한눈에 파악할 수 있기 때문입니다.

---

## 4.2 메인 모듈의 시작점 ( `__main__` )

자바(Java)나 C언어에는 프로그램의 진입점을 알리는 고정된 `main()` 함수가 존재하지만, 파이썬은 파일이 곧바로 실행되는 스크립트 특성을 가집니다. 

파이썬 인터프리터는 현재 **직접 실행된** 최초의 파이썬 파일 객체에 한해서만 `__name__` 이라는 특수 변수에 `"__main__"` 이라는 문자열표시를 부여해 줍니다. 반면 `import` 로 불려온 파일의 `__name__` 에는 본래 파일명(모듈명)이 들어갑니다.

```python
# calculator.py
def add(a, b):
    return a + b

# 이 파일이 외부에서 import된 것이 아니라 직접 실행(python calculator.py)될 때만 아래 블록이 실행됩니다.
if __name__ == "__main__":
    result = add(10, 20)
    print("단독 실행 테스트 결과:", result)
```
이 패턴은 자신이 작성한 모듈을 테스트하는 용도로도 널리 사용됩니다.

---

## 4.3 모듈 네임스페이스 점검 (`globals`, `locals`)

현재 활성화된 컨텍스트 공간에 어떤 변수와 함수들이 로드되어 있는지 상태를 스캔하기 위해 내장 함수를 사용할 수 있습니다.

- `globals()`: 현재 모듈 파일 전체의 변수 목록을 딕셔너리로 반환합니다.
- `locals()`: 현재 위치한 스코프(함수 내부 등)의 지역 변수 목록을 반환합니다.

```python
x = 100

def check_space(y):
    print("지역:", locals())

check_space(200) # 출력: 지역: {'y': 200}
print("전역 x 확인:", globals()['x']) # 100
```

---

## 4.4 패키지(Package) 아키텍처 구성

관련 모듈들(`.py`)을 디렉터리로 묶어 구조화하려면 해당 디렉터리 내부에 반드시 **`__init__.py`** 라는 특별한 파일을 생성해 두어야 합니다. (파이썬 3.3 이후부터는 없어도 암묵적 패키지로 취급하지만, 호환성과 명시성을 위해 선언하는 것을 권장합니다.)

### 구조 예시
```text
my_game/                  # Top-level 패키지 디렉터리
    __init__.py
    sound/                # Sub-package
        __init__.py
        effects.py
        bgm.py
    graphic/              # Sub-package
        __init__.py
        render.py
```

이렇게 계층화된 패키지는 점(`.`) 연산자를 통해 경로를 거슬러 올라가며 모듈을 자유롭게 엮어 쓸 수 있습니다.
```python
import my_game.sound.effects
# 또는
from my_game.graphic import render
```
