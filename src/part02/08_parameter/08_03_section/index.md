---
layout: docs
title: "3. 고정 위치 매개변수와 키워드 인자"
permalink: /part02/08_parameter/08_03_section/
---

# 3. 고정 위치 매개변수와 키워드 인자

함수를 호출할 때 외부에서 던져주는 데이터(인자)들이, 함수 내부의 이름표(매개변수)들과 어떤 기준으로 짝을 맺어 찾아가는지 그 매핑(Mapping) 원리를 알아봅니다.

## 3.1 위치 기반 매핑 (Positional Arguments)

가장 기본적이고 원시적인 방법으로, **매개변수가 선언된 '순서'에 정확하게 맞추어 데이터를 밀어 넣는 방식**입니다. 순서가 곧 기준이 되므로, 하나라도 순서가 꼬이거나 개수가 모자라면 곧바로 에러가 터집니다.

```python
def make_profile(name, age, city):
    return f"이름: {name}, 나이: {age}, 지역: {city}"

# 1. 올바른 위치 매핑
print(make_profile("앨리스", 25, "서울")) 

# 2. 순서가 꼬였을 때의 참사
print(make_profile("부산", "밥", 30)) # 이름: 부산, 나이: 밥, 지역: 30
```

---

## 3.2 이름표 기반 매핑 (Keyword Arguments)

위치 인자의 단점을 극복하기 위해, 파이썬은 **매개변수의 '이름'을 직접 지정하여 값을 꽂아 넣는 키워드 인자(Keyword Arguments) 방식**을 지원합니다. 이 방식을 쓰면 데이터의 순서가 완전히 뒤죽박죽 섞여도 파이썬이 알아서 찰떡같이 찾아냅니다.

```python
def make_profile(name, age, city):
    return f"이름: {name}, 나이: {age}, 지역: {city}"

# 매개변수 이름(Keyword)을 명시적으로 적어줌
# 순서가 완전히 엉망이 되었지만, 이름표 덕분에 완벽하게 조립됨!
result = make_profile(city="제주", age=28, name="찰리")

print(result) # 이름: 찰리, 나이: 28, 지역: 제주
```

> [!TIP]
> 키워드 인자 방식을 사용하면 코드를 읽는 사람(동료 개발자) 입장에서 이 데이터가 도대체 어떤 의미로 들어가는지 직관적으로 파악할 수 있어 **코드의 가독성**이 비약적으로 상승합니다.

---

## 3.3 위치와 키워드의 혼용 규칙 (주의사항)

실무에서는 위치 인자와 키워드 인자를 적절히 섞어서 사용하는 경우가 많습니다. (보통 앞쪽의 핵심 데이터는 위치로, 뒤쪽의 옵션 데이터는 키워드로 넘깁니다.) 
하지만 반드시 지켜야 할 철칙이 하나 있습니다.

**"위치 인자(Positional) 군단은 파괴할 수 없다. 무조건 키워드 인자(Keyword)보다 선봉에 서야 한다."**

```python
def register_user(user_id, email, is_admin):
    pass

# [성공] 위치 인자가 먼저 오고, 그 뒤를 키워드 인자가 따름
register_user(101, is_admin=False, email="test@mail.com")

# [실패: SyntaxError 발생]
# 키워드 인자(email="...")가 나타난 순간, 그 뒤로는 절대로 위치 인자가 올 수 없습니다!
register_user(102, email="admin@mail.com", True) 

# [실패: TypeError 발생]
# 앞에서 이미 위치 인자로 103이 user_id 파라미터로 들어갔는데, 
# 뒤에서 키워드로 user_id를 또 주입하려 하면 중복 에러가 발생합니다.
register_user(103, "test@mail.com", user_id=103)
```
