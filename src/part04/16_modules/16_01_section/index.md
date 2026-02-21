---
layout: docs
title: "1. 업그레이드된 자료구조: collections 모듈"
permalink: /part04/16_modules/16_01_section/
---

# 1. 업그레이드된 자료구조: collections 모듈

기본 딕셔너리와 튜플만으로는 뭔가 아쉬운 적이 있었나요? 파이썬은 `collections` (컬렉션즈)라는 마법의 부품 상자를 제공합니다. 이 안에는 아주 신기하고 유용한 자료구조들이 들어있습니다.

## 1.1 불평 없는 딕셔너리: `defaultdict`

기본 딕셔너리에서는 없는 키(Key)를 찾으려고 하면, 파이썬이 `KeyError`라며 버럭 화를 냈었죠? `defaultdict`(디폴트딕트)는 아주 너그러워서 없는 키를 찾으면 에러를 내는 대신 **알아서 기본값을 만들어줍니다!**

```python
from collections import defaultdict

# '빈 리스트'를 기본값으로 만드는 defaultdict 생성
my_dict = defaultdict(list)

# '사과'라는 키는 없지만, 접근하자마자 자동으로 값 칸에 빈 리스트 []를 만듭니다!
my_dict['사과'].append("맛있어")
my_dict['바나나'].append("길어")

print(my_dict)
# 출력: defaultdict(<class 'list'>, {'사과': ['맛있어'], '바나나': ['길어']})
```
이렇게 미리 없는 키에 대해 리스트나 정수(0) 등을 뱉게 설정해두면, 복잡한 if문을 쓰지 않아도 돼서 너무 편리합니다!

---

## 1.2 순서를 기억하는 딕셔너리: `OrderedDict`

파이썬 옛날 버전까지는 딕셔너리에 데이터를 넣으면 제멋대로 섞였습니다. (물론 최신 파이썬은 넣은 순서를 기억하긴 합니다). 그래도 순서와 관련된 특별한 기능들을 쓰고 싶을 때는 `OrderedDict`(오더드딕트)가 정답입니다!

```python
from collections import OrderedDict

# 평범한 딕셔너리를 OrderedDict 로 변환
d = {'a': 1, 'b': 2, 'c': 3}
od = OrderedDict(d)

# move_to_end() : 이 마법은 특정 키를 맨 뒤로(작업줄 끝으로) 보내버립니다!
od.move_to_end('a')
print(od)
# 출력: OrderedDict([('b', 2), ('c', 3), ('a', 1)]) # 'a'가 맨 뒤로 갔죠?
```

---

## 1.3 투표결과 개표기: `Counter`

문자열이나 리스트 안에 똑같은 값이 몇 개씩 들어있는지 세고 싶을 때, 반복문으로 하나씩 셀 필요가 없습니다. `Counter`(카운터)를 쓰면 1초 만에 개표가 완료됩니다!

```python
from collections import Counter

# 글자들을 카운터 상자에 쏟아붓습니다.
votes = Counter("aaabbbbcccddddaaaa")
print(votes)
# 출력: Counter({'a': 7, 'b': 4, 'd': 4, 'c': 3}) # 각 글자의 개수를 딕셔너리처럼 보여줌!

# 1등과 2등만 뽑아볼까요? (가장 많은 것 찾기)
print(votes.most_common(2))
# 출력: [('a', 7), ('b', 4)]
```
`Counter`끼리는 덧셈(`+`), 뺄셈(`-`), 교집합(`&`) 연산도 상식적으로 척척 해내는 똑똑한 개표기입니다!

---

## 1.4 이름이 있는 튜플: `namedtuple`

튜플은 `(10, 20)` 처럼 인덱스 번호(`튜플[0]`)로만 안의 값을 꺼낼 수 있었죠? `namedtuple`(네임드튜플)을 쓰면 각 칸에 이름표를 달아 객체(Class)처럼 우아하게 사용할 수 있습니다!

```python
from collections import namedtuple

# '이름'과 '나이'를 저장하는 'Person' 이라는 네임드튜플 공장 만들기
Person = namedtuple("Person", ["name", "age"])

# 공장에서 사람 하나 만들기
p = Person("홍길동", 33)

# 인덱스로도, 이름(점 연산자)으로도 꺼낼 수 있습니다!
print(p[0])       # 홍길동
print(p.name)     # 홍길동 
```
딕셔너리보다 메모리도 적게 먹으면서, 점(`.`) 연산자로 편리하게 접근할 수 있는 가벼운 객체가 필요할 때 최고입니다!
