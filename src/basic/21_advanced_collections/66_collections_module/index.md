---
layout: docs
title: "66 파워업 딕셔너리와 튜플: collections 모듈"
permalink: /basic/21_advanced_collections/66_collections_module/
---

# 66 파워업 딕셔너리와 튜플: `collections` 모듈

기본 딕셔너리와 튜플만으로는 뭔가 아쉬운 적이 있었나요? 파이썬은 **`collections` (컬렉션즈)**라는 마법의 부품 상자를 기본으로 제공합니다. 이 안에는 아주 신기하고 유용한 자료구조들이 가득 들어있어, 코드를 확 줄여주고 성능을 높여줍니다.

## 1. 불평 없는 자상한 딕셔너리: `defaultdict`

기본 딕셔너리에서는 없는 키(Key)를 찾으려고 하면, 파이썬이 `KeyError`라며 버럭 화를 냈었죠? `defaultdict`(디폴트딕트)는 아주 너그러워서 없는 키를 찾으면 에러를 내는 대신 **알아서 지정해 둔 '기본값'을 짠! 하고 만들어줍니다.**

```python
from collections import defaultdict

# '빈 리스트'를 기본값으로 뱉어내는 defaultdict 생성
my_dict = defaultdict(list)

# '사과'라는 키는 없지만, 값을 넣으려 하자마자 자동으로 빈 리스트 []를 먼저 깔아줍니다!
my_dict['사과'].append("맛있어")
my_dict['바나나'].append("길어")

print(my_dict)
# 출력: defaultdict(<class 'list'>, {'사과': ['맛있어'], '바나나': ['길어']})

# 만약 정수 0을 기본값으로 하고 싶다면? (개수 셀 때 유용)
score_dict = defaultdict(int)
score_dict['철수'] += 50 # 0에서 시작해서 50이 됨
```

---

## 2. 순서를 기억하는 딕셔너리: `OrderedDict`

파이썬 옛날 버전(~3.6)까지는 딕셔너리에 데이터를 넣으면 제멋대로 섞였습니다. (물론 최신 파이썬 3.7부터는 넣은 순서를 기억하긴 합니다). 그래도 순서와 관련된 특별하고 섬세한 기능들을 쓰고 싶을 때는 `OrderedDict`(오더드딕트)가 정답입니다!

```python
from collections import OrderedDict

# 평범한 딕셔너리를 OrderedDict 로 업그레이드!
d = {'a': 1, 'b': 2, 'c': 3}
od = OrderedDict(d)

# move_to_end() : 이 마법은 특정 키를 아예 대기줄 맨 뒤로 보내버립니다!
od.move_to_end('a')
print(od)
# 출력: OrderedDict([('b', 2), ('c', 3), ('a', 1)]) 
```

---

## 3. 빛의 속도 개표기: `Counter`

문자열이나 리스트 안에 똑같은 값이 몇 개씩 들어있는지 세고 싶을 때, 무식하게 `for` 문을 돌리며 변수를 더해줄 필요가 없습니다. `Counter`(카운터)를 쓰면 1초 만에 개표가 완료됩니다!

```python
from collections import Counter

# 데이터들을 카운터 상자에 쏟아부어 버립니다.
votes = Counter("aaabbbbcccddddaaaa")

print(votes)
# 출력: Counter({'a': 7, 'b': 4, 'd': 4, 'c': 3}) 

# 1등과 2등만 뽑아볼까요? (가장 많이 득표한 것 찾기)
print(votes.most_common(2))
# 출력: [('a', 7), ('b', 4)]
```
`Counter`끼리는 덧셈(`+`), 뺄셈(`-`), 교집합(`&`) 연산도 상식적으로 척척 해내는 아주 똑똑한 개표기입니다!

---

## 4. 이름이 있는 튜플: `namedtuple`

튜플은 `(10, 20)` 처럼 인덱스 번호(`튜플[0]`)로만 안의 값을 꺼낼 수 있어서 가끔 헷갈렸죠? `namedtuple`(네임드튜플)을 쓰면 각 칸에 이름표를 예쁘게 달아 무거운 객체(Class)처럼 우아하게 사용할 수 있습니다!

```python
from collections import namedtuple

# '이름'과 '나이'칸을 가진 'Person' 이라는 네임드튜플 설계도(공장) 만들기
Person = namedtuple("Person", ["name", "age"])

# 공장에서 튜플 사람 하나 생산
p = Person("홍길동", 33)

# 인덱스로도 꺼내고, 직관적인 이름(점 연산자)으로도 꺼낼 수 있습니다!
print(p[0])       # 홍길동
print(p.name)     # 홍길동 
print(p.age)      # 33
```
딕셔너리보다 시스템 메모리도 훨씬 적게 먹으면서, 점(`.`) 연산자로 편리하게 접근할 수 있는 가벼운 객체가 필요할 때 최고의 선택입니다!
