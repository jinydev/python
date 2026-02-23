---
layout: docs
title: "74 엑셀과 친구 맺기: CSV 데이터 읽고 쓰기"
permalink: /basic/23_file_and_data_io/74_csv_handling/
---

# 74 엑셀과 친구 맺기: CSV 데이터 읽고 쓰기

엑셀 파일 수준의 방대한 고객 리스트나 물품 데이터를 통째로 다루고 싶을 때, 파이썬에서 가장 빠르고 간편하게 쓰는 포맷이 바로 **CSV (Comma-Separated Values, 쉼표로 분리된 값)**입니다.

CSV 파일 안에는 이렇게 무미건조한 텍스트만 잔뜩 들어있습니다.
`이름,나이,직업`
`파이썬,12,학생`
`자바,14,선생님`

파이썬의 내장 `csv` 모듈을 사용하면 이 문장들을 깔끔한 파이썬 리스트나 딕셔너리로 쫙쫙 뽑아낼 수 있습니다.

## 1. 기본 리스트로 뽑아내기 (`reader` & `writer`)

`csv.reader`를 거치면 한 줄 한 줄이 파이썬 리스트로 변신합니다.
단, 한 번 처음부터 끝까지 다 뽑아내고 나면 텅 비어버리는 반복자(Iterator) 성질이 있으니 주의하세요!

```python
import csv

# 1. 파일 열기 (한글 호환 옵션 장착!)
with open('students.csv', 'r', encoding='utf-8') as f:
    # 2. 파이썬 CSV 전용 해독기에 집어넣기
    data_reader = csv.reader(f)
    
    # 3. 한 줄씩 빙글빙글 뽑아오기
    for row in data_reader:
        print(row)
        # 1회차 출력: ['이름', '나이', '직업']
        # 2회차 출력: ['파이썬', '12', '학생']
```

새로운 데이터를 CSV 파일로 저장하려면 반대로 **`csv.writer`**를 쓰고 `.writerow()`를 반복해 주면 됩니다! (주의: 줄바꿈이 두 번씩 띄워지는 엑셀 고질병 에러를 막기 위해 `newline=''` 옵션을 꼭 열 때 넣어주세요!)

---

## 2. 헷갈리는 숫자 대신 직관적인 이름표 달기 (`DictReader`)

위의 기본 리스트로 뽑으면 `row[0]`, `row[1]`처럼 인덱스 숫자로 찾아야 해서 데이터가 20개가 넘어가면 내가 뭘 뽑는지 헷갈립니다. 맨 첫 줄에 있는 "이름", "나이" 같은 제목칸(헤더)을 활용해서 진짜 파이썬 객체인 **딕셔너리처럼 통째로 뽑아주는 고급 기능**이 바로 `DictReader` 입니다!

```python
import csv

with open('students.csv', 'r', encoding='utf-8') as f:
    # DictReader를 쓰면 똑똑한 딕셔너리로 변신합니다!
    reader = csv.DictReader(f)
    
    for row in reader:
        # 이제 숫자 인덱스(0,1) 대신 아주 직관적인 '이름' 태그로 꺼낼 수 있어요!
        print(row['이름'], "학생의 나이는", row['나이'])
```

---

## 3. 쌍둥이 형제, TSV 처리와 커스텀 사투리(Dialect)

쉼표(`,`) 대신 키보드의 넓은 `Tab` 키(간격 띄우기)로 데이터를 잘라놓은 파일을 **TSV(Tab-Separated Values)** 라고 부릅니다. 
파이썬에서는 `csv` 모듈을 그대로 똑같이 쓰되, "선생님, 이 파일은 쉼표가 아니라 탭(`\t`)으로 잘린 녀석이에요!" 라고 **`delimiter` 문자만 살짝 알려주면** 완벽하게 똑같은 위력을 낼 수 있습니다.

```python
import csv

with open('data.tsv', 'r', encoding='utf-8') as f:
    # delimiter='\t' 로 탭 구분자라고 파이썬에게 친절히 귀띔해줍니다!
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        print(row) # 탭으로 예쁘게 찢어져서 리스트로 잘 나옵니다.
```

만약 여러분의 상사가 쉼표도, 탭도 아닌 뜬금없이 세로막대기(`|`) 기호로 천만 건의 데이터를 분류해 가져왔다고 쳐봅시다!
이럴 땐 당황하지 말고, **나만의 사투리 규칙을 등록(`csv.register_dialect`)** 해버리면 한 큐에 처리가 가능합니다. 

```python
import csv

# 'my_boss_style' 이라는 특수한 CSV 해독 룰을 내가 발명해 냅니다!
csv.register_dialect(
    'my_boss_style',         # 룰 이름
    delimiter='|',           # 우리는 쉼표 대신 짝대기(|)로 분리한다!
    quotechar='"',           # 글자를 묶는 따옴표 표시는 큰따옴표
    skipinitialspace=True    # 쓰레기 띄어쓰기가 있으면 좀 무시해!
)

# 파일을 열 때 dialect='my_boss_style' 이라고만 말해주면 복잡한 룰이 한방에 적용 완료!
# reader = csv.reader(f, dialect='my_boss_style')
```

이렇듯 파이썬의 `csv` 모듈은 전 세계의 어떤 괴랄하고 이상한 형태의 텍스트 표일지라도, 여러분의 구미에 딱 맞게 정제된 데이터 리스트로 번역해 주는 강력한 조력자입니다.
