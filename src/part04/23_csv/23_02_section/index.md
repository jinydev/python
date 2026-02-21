---
layout: docs
title: "2. 내 맘대로 룰 정하기: 커스텀 규칙(Dialect)"
permalink: /part04/23_csv/23_02_section/
---

# 2. 내 맘대로 룰 정하기: 커스텀 규칙(Dialect)

프로그래밍 세상에는 수많은 사람들이 규칙을 다르게 씁니다. 어떤 사람은 데이터를 쉼표(`,`)로 떨어뜨려 놓지만, 어떤 사람은 막대기 기호(`|`)나 세미콜론(`;`)으로 떨어뜨려 놓기도 합니다. 

또한, 데이터 안에 "사과, 배" 처럼 진짜 쉼표가 들어있을 땐 어떻게 할까요? 에러를 막기 위해 보통 문자열 양쪽을 큰따옴표(`"`) 기호로 무장시켜(인용부호) 놓곤 합니다.

이렇게 사람마다 다른 다양한 파일 작성 스타일(방언/사투리)을 파이썬에서는 **Dialect(다이얼렉트)** 라고 부릅니다.

## 2.1 나만의 특별한 번역 규칙 만들기

파일을 읽거나 쓸 때마다 "이건 막대기로 구분하고, 양옆 띄어쓰기는 무시하고..." 이렇게 옵션을 다 적으려면 손가락이 아픕니다. 이럴 때 **나만의 사투리 규칙을 등록(`register_dialect`)**해두면, 그 이름만 불러서 한 큐에 처리가 가능합니다!

```python
import csv

# 'my_style' 이라는 나만의 CSV 해독 룰을 만듭니다!
csv.register_dialect(
    'my_style',              # 내가 지은 룰 이름
    delimiter='|',           # 우리는 쉼표 대신 짝대기(|)로 분리한다!
    quotechar='"',           # 문자열을 감싸는 기호는 큰따옴표(")
    skipinitialspace=True    # 쉼표 뒤에 쓸데없는 띄어쓰기가 있으면 무시해!
)

# 룰이 잘 등록되었나 확인해 볼까요?
print(csv.list_dialects())
# 출력: ['excel', 'excel-tab', 'unix', 'my_style'] (내 규칙이 들어갔네요!)
```

## 2.2 등록한 룰 사용하기

이제 파일을 오픈할 때 파이썬에게 "이번에 여는 파일은 `my_style` 룰에 맞춰서 해독해 줘!" 라고 말해주면 끝입니다.

```python
import csv

# test_custom.csv 안에는 이런 데이터가 있다고 가정합니다.
# 이름|나이|직업
# 파이썬| 12 | 학생

with open('test_custom.csv', 'r') as f:
    # dialect='my_style' 이라고 알려줍니다!
    data_reader = csv.reader(f, dialect='my_style')
    
    for row in data_reader:
        # 막대기(|)로 깔끔하게 잘라서 리스트로 가져옵니다!
        print(row)
```

어떤 복잡하고 이상한 텍스트 파일이라도, 규칙만 딱딱 맞게 `dialect`로 정해주면 파이썬은 군말 없이 예쁜 데이터 리스트로 조립해 줍니다. 참 든든하죠?
