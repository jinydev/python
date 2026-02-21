---
layout: docs
title: "2. 딕셔너리(Dict)의 활용 및 주요 메서드"
permalink: /part01/05_mapping/05_02_dict/
---

# 2. 딕셔너리(Dict)의 활용 및 주요 메서드

파이썬의 딕셔너리는 항목을 마음대로 추가하고 삭제할 수 있는 **변경 가능(Mutable)**한 자료형입니다. 

리스트가 `append` 등의 메서드를 통해 원소를 조작하듯, 딕셔너리 역시 내부에 들어있는 Key와 Value 데이터들을 조작하고 안전하게 조회하기 위한 전용 메서드들을 폭넓게 제공합니다.

## 2.1 딕셔너리 병합 및 데이터 삭제 (`update`, `pop`, `clear`)

딕셔너리에 또 다른 딕셔너리의 데이터를 한꺼번에 들이부어 병합하거나, 내부의 특정 항목을 뽑아낼 때 주로 사용됩니다.

### 병합 (`update`)
기존 딕셔너리에 다른 딕셔너리를 덮어씌웁니다. **기존에 없던 키는 새롭게 추가되며, 기존에 중복된 키가 있다면 새 딕셔너리의 값으로 완벽히 덮어씌워져(갱신) 버립니다.** (리스트처럼 `+` 연산자로 딕셔너리를 더할 수는 없습니다)

```python
target_dict = {'a': 1, 'b': 2}
new_dict = {'b': 99, 'c': 3} # 'b'는 겹치고, 'c'는 새로운 키

target_dict.update(new_dict)

print(target_dict)
# {'a': 1, 'b': 99, 'c': 3} ('b' 값이 갱신되었음)
```

### 항목 삭제 (`pop` / `popitem` / `clear`)
- **`pop(키)`**: 전달한 키에 해당하는 (Key-Value) 쌍을 딕셔너리에서 영구히 삭제하며, 동시에 지워진 값을 반환합니다.
- **`popitem()`**: 딕셔너리의 '맨 마지막'에 들어왔던 항목을 무작위로 삭제하면서, `(키, 값)` 형태의 튜플로 반환합니다.
- **`clear()`**: 안의 모든 값들을 휴지통에 버리고 완벽한 빈 딕셔너리 `{}` 로 만듭니다.

---

## 2.2 딕셔너리 내부 들여다보기용 View 메서드

딕셔너리에서 Key들만 따로 필요하거나, 혹은 순수 데이터(Value)만 모아서 작업해야 할 때 파이썬은 **뷰(View)**라고 불리는 특별한 객체를 반환합니다. 

이 View들은 딕셔너리의 실시간 상태를 그대로 거울처럼 비치는 **'반복형(Iterable)'** 객체이므로 for문에서 즉시 사용할 수 있습니다.

1. **`keys()`**: 딕셔너리 내부의 모든 'Key'들만 모아 보여줍니다.
2. **`values()`**: 딕셔너리 내부의 모든 'Value'들만 모아 보여줍니다.
3. **`items()`**: 딕셔너리 내부의 모든 'Key와 Value'를 쌍(`Tuple` 형태)으로 묶어 보여줍니다.

```python
user_info = {'name': 'Alice', 'role': 'Admin'}

print(user_info.keys())   # dict_keys(['name', 'role'])
print(user_info.values()) # dict_values(['Alice', 'Admin'])
print(user_info.items())  # dict_items([('name', 'Alice'), ('role', 'Admin')])

# 데이터 활용: 반복문에 items() 적극 활용하기
for key, val in user_info.items():
    print(f"[{key}]의 값은 -> {val}")
```
> [!TIP]
> 반환된 View 자체는 리스트가 아닙니다. 인덱스 번호(`[0]`)로 접근하려면 `list(user_info.keys())` 처럼 강제로 형 변환을 거쳐야 합니다.

---

## 2.3 안전하게 값 꺼내오기 (`get`, `setdefault`)

일반적으로 딕셔너리의 값을 읽을 땐 대괄호 `[]` 사이에 찾고자 하는 Key를 명시합니다. (`ex: user_info['age']`) 하지만 **딕셔너리 내부에 해당하는 Key가 존재하지 않으면, 파이썬은 그 즉시 시스템 다운과 함께 `KeyError` 예외를 내뿜고 죽어버립니다.**

이러한 치명적인 에러를 막기 위해 파이썬은 철저한 '방어 코드'를 위한 메서드 2가지를 제공합니다.

### 안전한 조회전용 방패: `get`
해당 Key가 존재하면 값을 돌려주지만, **해당 Key가 없더라도 절대 뻗지 않고 `None`을 돌려줍니다.** 직접 기본 예비값을 지정해줄 수도 있습니다. (원본 딕셔너리는 변화가 없습니다)

```python
score_dict = {'math': 80}

# 1. 뻗는 코드 (KeyError 발생)
# error_score = score_dict['english']

# 2. 안전한 조회 (에러 없이 None 반환)
safe_score = score_dict.get('english') 

# 3. 값이 없을 때 반환할 기본값 세팅
default_score = score_dict.get('english', 0) # "영어가 없으면 0점을 주어라"
print(default_score) # 0
```

### 조회와 동시에 삽입까지 처리: `setdefault`
`get`이 단순 조회용 방패라면, `setdefault`는 **"없어? 그럼 이참에 그냥 내가 빈 자리를 새로 파줄게!"** 하는 능동적인 속성을 가집니다. 찾는 키가 없을 때 새롭게 항목을 생성해 끼워넣기까지 수행합니다.

```python
cart = {'apple': 3}

# 'banana' 키가 없다면, 즉시 만들어버리고 1을 할당합니다.
result = cart.setdefault('banana', 1) 

print(result) # 1
print(cart)   # {'apple': 3, 'banana': 1} (원본 딕셔너리 자체에 바나나가 추가됨!)
```
