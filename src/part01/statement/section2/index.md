---
layout: docs
title: "2. 프로그램의 제어 흐름"
permalink: /part01/statement/section2/
---

# 2. 프로그램의 제어 흐름

단순한 리터럴이나 사칙연산만으로는 복잡한 문제를 해결할 수 없습니다. 데이터에 이름을 붙여 보관하고(할당), 상황에 따라 분기하며(제어), 특정한 작업을 반복(순환)하게 만드는 흐름 제어가 필요합니다.

## 2.1 할당문 (Assignment)

파이썬에서는 변수 선언 시 타입을 지정하지 않으며, 값(인스턴스 객체의 주소)을 할당하는 순간이 곧 변수의 탄생입니다. 변수 할당은 우변부터 평가되어 좌변의 이름과 연결됩니다.

```python
# 다중 할당: 우측부터 1을 c, b, a에 차례대로 할당합니다.
a = b = c = 1

# 함수 실행 결과를 즉시 할당받을 수도 있습니다.
def fetch_token():
    return "ABC-123"

token = fetch_token()
```

> [!WARNING]
> 파이썬에서는 이름이 네임스페이스에 한 번이라도 할당(등록)되지 않은 변수에 접근하려고 하거나, 연산(`x = x + 1`)을 시도하면 즉시 `NameError` 예외가 발생합니다. 반드시 초기값이 정의되어야 합니다.

---

## 2.2 조건문: `if`, `elif`, `else`

제어문은 주어진 조건식이 `True` 인지 `False` 인지 판별하여 실행 흐름을 둘로 가릅니다.

### 빈(Empty) 데이터의 False 평가
파이썬은 숫자 `0`, 빈 문자열 `""`, 빈 리스트 `[]`, 빈 딕셔너리 `{}` 그리고 `None` 객체를 모두 조건식에서 `False`로 간주합니다. 그 외에 데이터가 차단된 상태면 `True`로 봅니다.

```python
user_items = []

if user_items:
    print("아이템이 존재합니다.")
else:
    print("인벤토리가 비어있습니다. (False 로 평가됨)")
# 출력: 인벤토리가 비어있습니다. (False 로 평가됨)
```

### 복합 제어 (elif)
여러 개의 조건을 연쇄적으로 판별해야 할 때는 중첩된 `if` 대신 `elif` 블록을 구성합니다. 이렇게 하면 코드가 훨씬 논리적이고 깔끔해집니다.

```python
score = 85

if score >= 90:
    print("A 학점")
elif score >= 80:
    print("B 학점") # 여기가 실행됨
else:
    print("C 학점")
```

### 삼항 연산자 (Ternary Operator)
IF 문장을 한 줄로 축약하여 변수 할당 시 다이내믹하게 사용할 수 있습니다. `[참일 때 반환값] if [조건식] else [거짓일 때 반환값]` 형태로 작성합니다.

```python
status_code = 200
message = "Success" if status_code == 200 else "Error"
print(message) # 출력: Success
```

---

## 2.3 반복문: `for` 와 `while`

### 리터레이터 순환 (`for`)
파이썬의 `for`문은 전통적인 언어들의 숫자 증가 방식(예: `for(int i=0; i<10; i++)`)이 아니라, 리스트나 문자열 같은 **반복 가능한 객체(Iterable)**에서 원소를 하나씩 꺼내어 순환장을 형성합니다.

```python
# 문자열의 글자 순환
for char in "Python":
    print(char, end=" ")
# 출력: P y t h o n 
```

### 조건부 순환 (`while`)
`while` 문은 특정 조건식이 `True`인 동안 무한히 반복 블록을 실행합니다. 조건이 `False`로 바뀌거나 `break`를 만나야 종료됩니다.

```python
countdown = 3
while countdown > 0:
    print(countdown)
    countdown -= 1
# 출력: 3, 2, 1 차례대로 줄바꿈 출력
```

---

## 2.4 순환 흐름 제어: `break`, `continue`, `else`

- **`break`**: 루프(순환문)를 즉시 중단하고 빠져나오게 합니다.
- **`continue`**: 남은 로직을 건너뛰고 다음 반복 회차로 곧바로 점프합니다.

파이썬만이 가지는 독특한 문법 중 하나는 반복문에 **`else` 블록**을 붙일 수 있다는 점입니다. 
루프가 중간에 `break` 당하지 않고 **끝까지 온전히 순환을 전부 마쳤을 때**에만 `else` 블록이 실행됩니다. (검색 로직 등에 유용합니다)

```python
targets = [1, 3, 5, 7, 9]

for val in targets:
    if val % 2 == 0:
        print("짝수를 찾았습니다!")
        break
else:
    print("명단에 짝수가 하나도 없습니다. 루프 완전 종료.")
# 출력: 명단에 짝수가 하나도 없습니다. 루프 완전 종료.
```

---

## 2.5 전역/외부 스코프 접근: `global` 과 `nonlocal`

파이썬 함수 안에서 바깥에 있는 변수를 "읽는 것(조회)"은 자유롭지만, 그 값을 **직접 덮어씌워 갱신(할당)**하려고 하면 함수는 그 변수를 '자신만의 지역 변수를 새로 만든 것'으로 착각하게 되어 에러가 납니다. 이것을 방지하기 위한 키워드입니다.

1. **`global`**: 함수 내부에서 파일 전체의 전역 변수를 수정하겠다고 선언합니다.
2. **`nonlocal`**: 함수 속에 함수가 겹쳐져 있을 때(내부 함수), 바로 상위 부모 함수의 지역 변수를 수정하겠다고 선언합니다.

```python
global_count = 0

def update_counter():
    global global_count # 전역 변수를 수정하겠다는 강제 선언
    global_count += 1

update_counter()
print(global_count) # 1
```
