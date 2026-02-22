---
layout: docs
title: "4. 시퀀스를 다루는 내장 도구들"
permalink: /part03/abstract/section3/
---

# 4. 시퀀스를 다루는 내장 도구들

파이썬은 여러 개의 데이터(시퀀스)를 편리하게 가공할 수 있도록 내장형 마법 도구들을 기본 지원합니다. 이 도구들은 함수처럼 생겼지만 사실은 하나의 **클래스(객체)**로 작동합니다. 
가장 큰 특징은 이들은 메모리를 아끼기 위해 "필요할 때 딱 하나씩만" 데이터를 뱉어내는 **반복자(Iterator)**나 **반복형(Iterable)** 성질을 갖고 있다는 것입니다. 

## 4.1 짝 맞추기 달인: `zip`

서로 다른 겉옷(리스트)에 들어있는 요소들을 순서대로 하나씩 꺼내서 예쁜 순서쌍(튜플)으로 지퍼(zip)를 채워주는 기계입니다. 
가장 짧은 길이를 가진 리스트에 맞춰서 동작합니다.

```python
names = ["Iron Man", "Spider-Man", "Hulk"]
colors = ["Red", "Red-Blue", "Green", "Extra-Color"] # 마지막은 짝이 없어 무시됨

# zip 객체(반복자)가 만들어짐
z = zip(names, colors) 

# 눈으로 보려면 리스트로 포장합니다.
print(list(z)) 
# [('Iron Man', 'Red'), ('Spider-Man', 'Red-Blue'), ('Hulk', 'Green')]
```
> [!NOTE]
> 반복자(Iterator) 인스턴스는 한 번 데이터를 뽑아 쓰고 나면 **텅 빈 껍데기**가 되므로, 다시 쓰려면 새로 만들어야 합니다!

---

## 4.2 내 맘대로 번호 부여기: `enumerate`

데이터들 앞에 순번 스티커를 착착 붙여주는 기계입니다. 리스트의 인덱스 번호와 실제 내용을 쌍으로 묶어줍니다.

```python
heroes = ["Batman", "Superman", "Flash"]

# 번호 스티커를 붙입니다. (기본은 0번부터 시작)
for idx, hero in enumerate(heroes):
    print(idx, hero)
# 0 Batman / 1 Superman / 2 Flash

# 100번부터 시작하고 싶다면?
print(list(enumerate(heroes, 100)))
# [(100, 'Batman'), (101, 'Superman'), (102, 'Flash')]
```

---

## 4.3 뒤집기 요정: `reversed`

주어진 데이터를 맨 끝에서부터 역순으로 집어서 던져주는 반복자를 만듭니다. 원본 자체를 거꾸로 파괴하는 것이 아니라, 꺼내는 순서만 거꾸로 해주는 아주 착한 기능입니다.

```python
nums = [1, 2, 3, 4]
r = reversed(nums)

print(list(r)) # [4, 3, 2, 1]
```

## 4.4 무한의 숫자 찍어내기: `range`

`range`는 리스트처럼 전체 숫자를 한 번에 메모리에 올리지 않고 숫자들을 생성하는 규칙(시작, 끝, 보폭)만 똑똑하게 기억하는 반복형(Iterable) 객체입니다. 덕분에 `range(1000000)` 처럼 100만 길이를 만들어도 컴퓨터가 힘들어하지 않습니다.
