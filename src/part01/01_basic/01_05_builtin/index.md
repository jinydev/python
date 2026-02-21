---
layout: docs
title: "5. 파이썬 내장 객체(Built-ins)"
permalink: /part01/01_basic/01_05_builtin/
---

# 5. 파이썬 내장 객체(Built-ins)

우리가 이전에 다루었던 `int`, `float`, `list`와 같은 기본 자료형 클래스들이나 `print()`, `dir()`, `help()` 같은 필수 함수들은 우리가 별도로 `import` 선언을 하지 않아도 언제나 전역에서 자유롭게 꺼내 쓸 수 있습니다. 

어떻게 파이썬은 이런 일들을 내부적으로 처리하고 있는 걸까요? 정답은 바로 파이썬의 핵심 내장 모듈인 **`__builtins__`** 공간에 있습니다.

## 5.1 `__builtins__` 네임스페이스 이해하기

파이썬 인터프리터가 실행되면서 가장 먼저 메모리에 적재되는 시스템 모듈이 `__builtins__` 입니다. 이 모듈 안에는 프로그래밍에 필수적인 모든 내장 객체들이 담겨 있습니다.

파이썬 엔진은 사용자가 어떤 식별자(함수명, 변수명)를 호출할 때, 우리가 만든 일반적인 변수 네임스페이스를 먼저 뒤져본 뒤, 찾을 수 없으면 최후의 수단으로 이 `__builtins__` 공간을 검색합니다.

### 내장 자료형 스캔 예제

실제로 이 모듈의 내부 딕셔너리(`__dict__`)를 열어보면, 우리가 자주 쓰던 클래스들이 등록되어 있는 것을 확인할 수 있습니다.

```python
# 자주 쓰이는 내장 자료형(클래스) 이름 리스트
type_names = ['int', 'float', 'complex', 'str', 'list', 'tuple', 'dict', 'bytes', 'bytearray']

# __builtins__ 공간을 뒤져서 각 이름이 가리키는 실제 클래스 객체를 출력
print("■ 내장 자료형 목록 확인 ■")
for t_name in type_names:
    actual_class = __builtins__.__dict__[t_name]
    print(f"{t_name} -> {actual_class}")
```
*(실행 시 `<class 'int'>`, `<class 'list'>` 등의 원본 클래스 메타 정보가 매핑되어 있는 모습을 볼 수 있습니다.)*

---

## 5.2 내장 함수 스캔 예제

함수 역시 동일한 원리로 관리됩니다. `print`, `help`, `isinstance` 같은 호출형 도구들도 모두 이 내장 딕셔너리에 등록되어 있습니다.

```python
# 기본 내장 함수들의 이름 리스트
func_names = ['dir', 'help', 'print', 'isinstance']

print("■ 내장 함수 목록 확인 ■")
for f_name in func_names:
    actual_function = __builtins__.__dict__[f_name]
    print(f"{f_name} -> {actual_function}")
```
*(실행 시 `<built-in function print>` 와 같이 파이썬 코어로 구현된 네이티브 함수 정보가 표시됩니다.)*

> **📌 핵심 요약**  
> 파이썬의 모든 '기본 제공' 요소들은 마법처럼 허공에서 나타나는 것이 아니라, `__builtins__` 라는 거대한 부품 상자(모듈) 안에 체계적으로 정리되어 배포되는 일반적인 파이썬 객체일 뿐입니다.
