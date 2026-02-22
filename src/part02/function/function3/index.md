---
layout: docs
title: "6. 함수의 숨겨진 속성 객체"
permalink: /part02/function/function3/
---

# 6. 함수의 숨겨진 속성 객체

파이썬에서 함수가 만들어지는 순간, 파이썬 인터프리터는 함수의 껍데기뿐만 아니라 함수의 내부 동작 원리가 기록된 여러 스페셜 속성(Dunder Methods)들을 함수 객체 내부에 몰래 복제해 넣습니다. 

이러한 메타데이터 덕분에 파이썬은 실행 중에도 함수의 정체를 낱낱이 파악할 수 있는 고도의 유연성을 발휘합니다.

## 6.1 `__code__` 객체 (바이트코드 보관소)

함수 내부에서 가장 핵심적인 부분은 `__code__` (Code Object) 속성입니다. 우리가 작성한 사람용 문자열 코드는 컴퓨터가 이해할 수 있는 기계어 직전의 상태인 **'바이트코드(Bytecode)'** 로 번역되어 이곳에 꼬리표처럼 저장됩니다.

- `co_varnames`: 함수가 사용하는 지역 변수들의 이름 목록
- `co_argcount`: 함수가 요구하는 매개변수의 개수

```python
def my_func(x, y):
    result = x + y
    return result

# 함수가 가진 코드 객체에 접근
code_obj = my_func.__code__

print(code_obj.co_argcount) # 2 (x와 y 두 개)
print(code_obj.co_varnames) # ('x', 'y', 'result')
```

### 바이트코드 디스어셈블 (dis 모듈)
파이썬 내장 모듈인 `dis`를 사용하면, 내부의 바이트코드가 도대체 어떻게 구성되어 있는지 어셈블리어 형태로 까볼 수 있습니다. 파이썬 최적화에 관심이 깊은 해커들이 자주 사용하는 기법입니다.

```python
import dis

# my_func 이 내부적으로 어떻게 동작하는지 기계어 수준의 절차 출력
dis.dis(my_func)
```

---

## 6.2 `inspect` 모듈로 함수 해부하기

함수 객체의 내부 속성을 일일이 `__dict__`나 `__code__` 로 뒤지는 것은 너무 원시적입니다. 파이썬은 타인의 코드나 알 수 없는 함수를 분석하기 편하도록 **`inspect`** 표준 라이브러리를 제공합니다.

- `inspect.getsource()`: 이 함수가 작성된 원래의 '파이썬 코드 텍스트 전체'를 긁어옵니다.
- `inspect.signature()`: 이 함수가 요구하는 정확한 매개변수 형태(시그니처)와 타입 힌트 정보를 추출합니다.
- `inspect.getsourcefile()`: 이 함수가 도대체 어느 파이썬 파일(.py) 출신인지 출생지를 추적해 줍니다.

```python
import inspect

def calculate_tax(amount: int, rate: float = 0.1) -> float:
    """세금을 계산하는 함수입니다."""
    return amount * rate

# 1. 함수의 파라미터(시그니처) 해부
sig = inspect.signature(calculate_tax)
print(sig) # (amount: int, rate: float = 0.1) -> float

# 2. 함수의 원본 소스코드 그대로 복원해 출력!
source = inspect.getsource(calculate_tax)
print(source) 
# def calculate_tax(amount: int, rate: float = 0.1) -> float:
#     """세금을 계산하는 함수입니다."""
#     return amount * rate
```

> [!TIP]
> 디버깅을 하거나 인공지능 도구(AI Assistant)들이 소스코드를 읽어들일 때 바로 이 `inspect` 모듈의 메타 파싱 능력을 십분 활용합니다.
