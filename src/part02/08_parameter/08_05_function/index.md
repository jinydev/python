---
layout: docs
title: "5. 함수 인자/반환값 언패킹 패턴"
permalink: /part02/08_parameter/08_05_function/
---

# 5. 함수 인자/반환값 언패킹 패턴

앞서 배운 `*args`와 `**kwargs`는 함수를 **'만들 때(정의할 때)'** 매개변수를 하나로 뭉치는(Packing) 기술이었습니다. 
반대로 함수를 **'사용할 때(호출할 때)'**에는, 이미 뭉쳐져 있는 리스트나 딕셔너리를 해체해서(Unpacking) 개별 인자로 흩뿌려 던져주는 마법을 부릴 수 있습니다.

## 5.1 컬렉션을 해체해서 함수로 던지기

리스트나 튜플 등에 담긴 데이터 덩어리를 함수의 개별 매개변수 자리에 하나씩 밀어넣고 싶을 때, 변수 앞에 **별표(`*`)**를 붙여서 넘겨주면 껍데기가 벗겨지며 안의 내용물이 각 매개변수로 흩어집니다.

```python
def print_vector(x, y, z):
    print(f"좌표: X={x}, Y={y}, Z={z}")

# 데이터가 리스트 덩어리로 존재함
my_location = [100, 200, 300]

# [에러 발생] 리스트 객체 1개만 x 자리로 통째로 들어가고 y, z가 비어버림
# print_vector(my_location) 

# [성공] 별표를 붙이면 리스트가 해체되어 100, 200, 300으로 각각 날아감!
print_vector(*my_location) 
# 좌표: X=100, Y=200, Z=300
```

---

## 5.2 딕셔너리를 해체해서 키워드 인자로 던지기

딕셔너리를 해체할 때는 **별표 2개(`**`)**를 붙여서 넘깁니다. 이러면 딕셔너리의 Key-Value 쌍이 함수의 **'키워드 인자(Keyword Arguments)'**로 완벽하게 변형되어 각각의 매개변수 자리에 꽂힙니다.

이 기법은 주로 데이터베이스에서 읽어온 JSON 데이터(딕셔너리)를 객체 생성 함수에 밀어넣을 때 아주 유용하게 쓰입니다.

```python
def create_student(name, grade, active):
    print(f"학생 이름: {name}, 학년: {grade}, 상태: {active}")

# DB나 API에서 받아온 딕셔너리 데이터
student_data = {
    "name": "Jane",
    "grade": "Senior",
    "active": True
}

# 딕셔너리가 해체되면서 내부적으로 create_student(name="Jane", grade="Senior", active=True) 로 변환됨!
create_student(**student_data)
# 학생 이름: Jane, 학년: Senior, 상태: True
```

---

## 5.3 다중 반환값(Multiple Returns) 언패킹

파이썬 함수는 `return a, b, c` 처럼 여러 개의 결과값을 동시에 뱉어낼 수 있습니다. 사실 이 반환값들은 파이썬 내부에서 **'튜플(Tuple)' 형태 하나로 조용히 패킹**되어 던져진 것입니다.

함수 밖에서는 이 튜플 반환값을 변수 할당 언패킹 기법으로 우아하게 받아낼 수 있습니다.

```python
def calculate_stats(numbers):
    total = sum(numbers)
    avg = total / len(numbers)
    # 두 개의 값을 반환하는 것처럼 보이지만, 사실은 (total, avg) 라는 하나의 튜플임!
    return total, avg 

# 함수의 튜플 반환값을 곧바로 언패킹해서 각각의 변수에 이쁘게 담아냄
sum_val, avg_val = calculate_stats([10, 20, 30, 40])

print(f"합계: {sum_val}, 평균: {avg_val}")
# 합계: 100, 평균: 25.0
```

> [!TIP]
> 만약 5를 반환하는 함수에서 `return 5,` 처럼 끝에 콤마가 붙어있다면, 단순 정수 5가 아니라 원소가 1개인 튜플 `(5,)`가 반환되어 치명적인 에러가 발생할 수 있습니다. 콤마의 존재에 유의하세요.
