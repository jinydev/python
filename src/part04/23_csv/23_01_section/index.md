---
layout: docs
title: "1. 쉼표로 정리하는 마법: CSV 읽기와 쓰기"
permalink: /part04/23_csv/23_01_section/
---

# 1. 쉼표로 정리하는 마법: CSV 읽기와 쓰기

CSV 파일 안에는 이렇게 무미건조한 텍스트만 잔뜩 들어있습니다.
`이름,나이,직업`
`파이썬,12,학생`
`자바,14,선생님`

파이썬의 `csv` 모듈을 사용하면 이 문장들을 깔끔한 리스트나 딕셔너리로 쫙쫙 뽑아낼 수 있습니다.

## 1.1 기본 리스트로 뽑아내기 (`reader` & `writer`)

`csv.reader`를 거치면 한 줄 한 줄이 파이썬 리스트로 변신합니다.

> **[주의!]** CSV `reader`는 "반복자(Iterator)" 입니다. 무슨 말이냐고요? 한 번 처음부터 끝까지 다 읽어내고 나면 텅 비어버립니다! 두 번 출력하고 싶다면 파일을 다시 열거나 처음 위치로 되돌려야 해요.

```python
import csv

# 1. 파일 열기!
with open('students.csv', 'r') as f:
    # 2. CSV 해독기에 넣기
    data_reader = csv.reader(f)
    
    # 3. 한 줄씩 뽑아보기
    for row in data_reader:
        print(row)
        # 출력: ['이름', '나이', '직업']
        # 출력: ['파이썬', '12', '학생']
```

새로운 데이터를 CSV 파일로 저장하려면 `csv.writer`의 `writerow`를 씁니다!

```python
import csv

new_data = [
    ['Hero', 'Level', 'HP'],
    ['Warrior', '15', '300'],
    ['Mage', '12', '150']
]

# newline='' 을 넣어야 줄바꿈이 두 번 일어나는 걸 막을 수 있어요!
with open('game_stats.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    for row in new_data:
        writer.writerow(row)
```

---

## 1.2 이름표 달고 뽑기 (`DictReader` & `DictWriter`)

리스트로 보면 `row[0]`, `row[1]`처럼 숫자(인덱스)로 찾아야 해서 헷갈릴 수 있습니다. 맨 첫 줄에 있는 "이름", "나이" 같은 제목(헤더)을 활용해서 딕셔너리처럼 뽑아주는 기능이 바로 `DictReader` 입니다!

```python
import csv

with open('students.csv', 'r') as f:
    # DictReader를 쓰면 딕셔너리로 변신합니다!
    reader = csv.DictReader(f)
    
    for row in reader:
        # 이제 숫자 대신 직관적인 '이메일'이나 '이름' 태그로 꺼낼 수 있어요!
        print(row['이름'], "학생의 나이는", row['나이'])
```

반대로 저장할 때도 `DictWriter`를 쓰면 됩니다. 단, 파일 맨 앞줄에 제목표(Header)를 써주는 `writeheader()` 함수를 꼭 불러줘야 한다는 점 잊지 마세요!

---

## 1.3 쌍둥이 형제, TSV 파일

쉼표(,) 대신 키보드의 `Tab` 키(간격 띄우기)로 데이터를 잘라놓은 파일을 **TSV(Tab-Separated Values)** 라고 부릅니다. 
파이썬에서는 `csv` 모듈을 그대로 쓰되, "이 파일은 탭(`\t`)으로 잘린 파일이야!" 라고 `delimiter` 옵션만 살짝 알려주면 똑같이 마법을 부릴 수 있습니다.

```python
import csv

with open('data.tsv', 'r') as f:
    # delimiter='\t' 로 탭 구분자라고 알려줍니다!
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        print(row)
```
