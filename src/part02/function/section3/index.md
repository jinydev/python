---
layout: docs
title: "5. 파이썬 내장 함수 (Built-in Functions)"
permalink: /part02/function/section3/
---

# 5. 파이썬 내장 함수 (Built-in Functions)

우리가 함수를 굳이 직접 `def`로 하나하나 정의하지 않아도, 파이썬이 태어날 때부터 기본적으로 뱃속에 품고 있는 든든한 함수들이 있습니다. 이들을 **내장 함수(Built-in Functions)**라고 부릅니다.

내장 함수들은 파이썬의 핵심 모듈인 `__builtins__` 네임스페이스 영역에 항상 상주하고 있으므로, 언제 어디서든 `import` 명령어 없이 즉시 가져다 사용할 수 있습니다.

## 5.1 사칙연산과 수학 제어 함수

복잡한 수식을 일일이 반복문으로 풀지 않아도, 파이썬은 직관적인 함수를 기본 제공합니다. 

```python
# 1. 합계 합산: sum()
scores = [90, 80, 75, 100]
print(sum(scores)) # 345 (반복문 없이 통째로 더함)

# 2. 몫과 나머지 동시 출력: divmod()
# 100을 23으로 나눈 몫과 나머지를 '튜플'로 묶어 반환합니다.
print(divmod(100, 23)) # (4, 8)

# 3. 절댓값 처리: abs()
print(abs(-250.5)) # 250.5

# 4. 반올림 처리: round()
pi = 3.141592
print(round(pi, 2)) # 3.14 (소수점 둘째 자리까지 반올림)
```

---

## 5.2 진위 논리 판독 함수 (any / all)

리스트나 튜플 내부에 거짓(False) 판정을 받는 불순물(예: `0`, `""`, `None`)이 섞여 있는지 한 번에 스캔하는 지뢰 탐지기 같은 기능입니다.

- **`all()`**: 원소가 **"전부 참(True)"** 이어야만 최종적으로 True (교집합)
- **`any()`**: 원소 중 **"단 하나라도 참"** 이 존재하면 최종적으로 True (합집합)

```python
status_logs = [1, 2, 0, 4] # 0 은 False 로 간주됨

print(all(status_logs)) # False (불량 값 0 이 섞여 있으므로 전체 실패)
print(any(status_logs)) # True  (참인 값들이 존재하므로 일단 패스)
```

---

## 5.3 배열 원본 보존형 정렬 `sorted()`

리스트가 가진 고유 메서드 `.sort()`는 배열 원본 자체를 개조(파괴)해버리지만, 내장 함수인 **`sorted()`**는 절대로 원본을 건드리지 않고 정렬이 완료된 완전히 다려진 **'새로운 복사본'을 창조해서 반환**합니다.

함수를 평가하는 기준(key)으로 또 다른 내장 함수(예: `len`)를 넘겨주어 고차원적인 정렬도 가능합니다.

```python
words = ['banana', 'apple', 'pie']

# 알파벳순 정렬 (원본 words 는 그대로 보존됨)
ordered = sorted(words)
print(ordered) # ['apple', 'banana', 'pie']

# 단어의 길이(len)를 평가 기준으로 정렬!
length_ordered = sorted(words, key=len, reverse=True)
print(length_ordered) # ['banana', 'apple', 'pie'] (제일 긴 단어부터 정렬됨)
```

---

## 5.4 런타임 코드 실행기와 입력기

실행 도중 사용자의 입력을 실시간으로 묻거나, 심지어 텍스트 문장을 파이썬 코드 그 자체로 해석해서 강제 실행시켜버리는 놀라운 내장 함수들입니다.

- **`input("메시지")`**: 프로그램 실행을 잠깐 정지시키고 텍스트를 입력받습니다. 결과는 무조건 '문자열'로 인식되므로 `int()` 형 변환이 자주 필요합니다.
- **`eval("코드")` / `exec("명령어")`**: 문자열 안에 들어있는 파이썬 코드를 런타임 중에 인터프리터에 꽂아 넣어 실시간으로 평가 및 실행해버립니다.

```python
# 문자열이지만 exec()를 만나면 진짜 함수 코드로 부활시킵니다!
code_script = """
def magic_add(a, b):
    return a + b
"""

exec(code_script) 
# 방금 문자열에서 창조해낸 함수를 바로 써먹을 수 있음
print(magic_add(70, 30)) # 100
```
