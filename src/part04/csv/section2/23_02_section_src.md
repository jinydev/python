---
layout: default
title: "23.02 CSV"
---

# 23.02 CSV

CSV 파일을 처리할 때 다양한 포맷이 있을 수 있으므로 이를 조정하기 위해 별도의 포맷 을 등록한 후 지정해서 파일을 읽고 쓸 수 있다.

## 23.2.1 dialect 이해하기

파이썬에서 제공하는 기본 dialect을 조회하고 신규로 추가해서 dialect들을 확인해본다.

## 23.2.2 사용자 dialect 이용하기

사용자 지정 dialect을 이용해서 파일을 읽고 쓰기를 해보기로 하겠다.

예제 23-7 : 사용자 정의 dialect 등록하기

사용자 지정된 dialect은 Register_dialect 함수를 통해 등록한다.

```python
In : import csv
csv.register_dialect(
'mydialect',
delimiter = ',',
quotechar = '"',
doublequote = True,
skipinitialspace = True,
lineterminator = '\r\n',
quoting = csv.QUOTE_MINIMAL)
```

list_dialects 함수를 통해 사용자 dialect 등록된 것을 조회해본다.

```python
In : import csv
csv.list_dialects()
Out: ['excel', 'excel-tab', 'unix', 'mydialect']
```

주피터 노트북에서 하나의 CSV 파일을 생성한다.

```python
In : %%writefile test2.csv
first_name , last_name,  city
Aleshia,  Tomkiewicz ,   St. Stephens Ward
Evan,     Zigomalas,     Abbey Ward
France,   Andrade,       East Southbourne and Tuckton W
Ulysses,  Mcwalters ,    Hawerby cum Beesby
Tyisha,   Veness ,       Greets Green and Lyng Ward
Eric,     Rampy ,        Desborough
Marg,     Grasmick,      Bargate Ward
Laquita , Hisaw,         Chirton Ward
Lura,     Manzella ,     Staple Hill Ward
Out: Writing test2.csv
```

등록된 사용자 dialect인 mydialect를 지정해서 reader로 읽으면 리스트 형태로 접근 이 가능하고 행에 대한 리스트를 가지고 포매팅 문자열에 배정하면 출력되는 것을 알 수 있다.

```python
In : with open('test2.csv', 'r') as mycsvfile:
thedata = csv.reader(mycsvfile, dialect='mydialect')
for row in thedata:
print(row[0]+"\t \t"+row[1]+"\t \t"+row[2])
Out: first_name last_name city
Aleshia Tomkiewicz St. Stephens Ward
Evan  Zigomalas Abbey Ward
France  Andrade East Southbourne and Tuckton W
Ulysses Mcwalters Hawerby cum Beesby
Tyisha  Veness Greets Green and Lyng Ward
Eric  Rampy Desborough
Marg  Grasmick Bargate Ward
Laquita Hisaw Chirton Ward
Lura  Manzella Staple Hill Ward
```

예제 23-8 : 파일을 생성하고 읽기 - DictReader 읽기

주피터 노트북에서 또 다른 CSV 파일을 생성한다.

```python
In : %%writefile test3.csv
Name, Phone numbers, Address
Aleshia, 01835-703597, St. Stephens Ward
Evan , 01937-864715, Abbey Ward
France, 01347-368222, East Southbourne and Tuckton W
Ulysses, 01912-771311 , Hawerby cum Beesby
Tyisha, 01547-429341, Greets Green and Lyng Ward
Eric , 01969-886290, Desborough
Marg , 01865-582516, Bargate Ward
Laquita, 01746-394243, Chirton Ward
Lura , 01907-538509, Staple Hill Ward
Out: Writing test3.csv
```

DictReader로 파일을 생성하면 dict 자료형을 지원하므로 헤더 정보 처리는 index에 칼 럼명을 넣고 처리한다.

```python
In : with open('test3.csv', 'r') as mycsvfile:
dictofdata = csv.DictReader(mycsvfile, dialect='mydialect')
for row in dictofdata:
print(row['Name']+"\t "+row['Phone numbers']+"\t
"+row['Address'])
Out: Aleshia 01835-703597 St. Stephens Ward
Evan  01937-864715 Abbey Ward
France 01347-368222 East Southbourne and Tuckton W
Ulysses 01912-771311 Hawerby cum Beesby
Tyisha 01547-429341 Greets Green and Lyng Ward
Eric 01969-886290 Desborough
Marg 01865-582516 Bargate Ward
Laquita 01746-394243 Chirton Ward
Lura 01907-538509 Staple Hill Ward
```

예제 23-9 : Dialect을 사용해서 파일 생성하고 읽기

새로 생성한 dialect를 이용해서 리스트로 만들어진 데이터를 가지고 CSV 파일을 생성 한다.

```python
In : arrayofdata=[['A','B', "C"],
['something','spam',2.334],
['anything','spam',0]]
with open('test4.csv', 'w', newline='') as mycsvfile:
thedatawriter = csv.writer(mycsvfile, dialect='mydialect')
for row in arrayofdata:
thedatawriter.writerow(row)
```

이 파일을 읽고 출력한다.

```python
In : with open('test4.csv', 'r') as mycsvfile:
thedata = csv.reader(mycsvfile, dialect='mydialect')
for row in thedata:
print(row[0]+"\t \t"+row[1]+"\t \t"+row[2])
Out: A  B  C
something spam 2.334
anything spam 0
```

파이썬 공부과 데이터 분석 등을 공부하기 위해 아나콘다를 설치한다. 기본 설치 방식은 윈도우에 대해서만 설명한다. 리눅스나 맥 OS에서 처리하려면 각 버전에 맞게 설치하면 된다.

APPENDIX

| 주피터 | 노트북 | 사용법 |

|---|---|---|

| 1. 아나콘다 | 네비게이터를 | 실행 |

아나콘다 네비게이터에서 launch 버튼을 눌러 주피터 노트북을 실행한다.

혹시 주피터 노트북에 password를 입력하라고 나올 때 크롬 브라우저를 기본 브라우저 로 지정하면 이 부분은 사라진다.

부록 주피터 노트북 사용법 | 1005

| 2. 주피터 | 노트북 | 파일  선택 |

|---|---|---|

New 버튼을 눌러 파이썬(Python)을 선택한다.

| 3. 주피터 | 노트북 | 파일 | 생성하기 |

|---|---|---|---|

파일이 별도의 브라우저 창으로 나타난다.

| 4. 주피터 | 노트북 | 파일명 | 바꾸기 |

|---|---|---|---|

파일명을 수정하기 위해 Untitled로 명명된 위치에 마우스를 가져간 후에 마우스 왼쪽 버 튼을 누르면 변경 창이 뜬다.

5. cell 창 이해하기

✚ 프로그램 코드를 넣으려면 cell 표시가 되어 있어야 함

부록 주피터 노트북 사용법 | 1007

✚ 별도의 설명 자료를 넣으려면 Markdown으로 교체해서 처리해야 함

✚ 단축키 : Ctrl + Enter

Cell 창에 입력한 후 [Ctrl + Enter]를 누르면 실행된다.

✚ 단축키 : Shift + Enter

Cell 창에 입력한 후 [Shift + Enter]를 누르면 실행되고 다음 cell 창이 하나 만들어진다.

✚ 단축키 : Ctrl + Shift + “-”

현재 셀에서 새로운 셀을 나누기 위해 사용한다. 새로 만들어진 셀이 초록색으로 변한다.

✚ 단축키 : Esc

현재 실행을 위한 셀은 초록색으로 테두리가 있지만 ESC를 누르면 초록색이 사라지고 파 란색으로 변경되어 편집 모드가 해제된다.

✚ 자동 완성 : Tab

모듈 등을 import하고 모듈명 다음에 점을 찍은 후에 Tab 키를 누르면 해당되는 함수나 클래스 또는 변수 등이 보인다.

✚ 객체 정보 조회 : Shift + TAB

변수를 키인하고 [Shift + TAB]을 누르면 내부 특성이 조회된다.

부록 주피터 노트북 사용법 | 1009

✚ 함수 정보 조회 : Shift + TAB

함수를 키인하고 [Shift + TAB]을 누르면 내부 특성이 조회된다.

✚ Help 정보 조회 : ?

함수를 키인한 후에 ?를 입력하고 [Shift + Enter]로 실행하면 설명이 보인다.

✚ 소스까지 조회 : ??

??(물음표 두 개)를 입력하고 [Shift + Enter]를 실행하면 소스도 출력한다.

✚ 파이썬 표현식을 입력 후에 실행하기

표현식을 입력하고 실행하면 결과 창에 나온다. _ 변수에는 최근 결과값이 들어가 있다.

✚ 셀 단위로 함수 등 로직을 입력한 후에 호출 실행하기

함수가 정의된 모듈을 import하고 다른 셀에서 실행한다. 다음 셀에서 이를 가지고 실행 하면 결과가 나오는 것을 확인할 수 있다.

부록 주피터 노트북 사용법 | 1011

✚ 셀에 라인 표기하기

Ctrl + “m”을 누른 후에 l을 누르면 셀에 라인이 생긴다. 이를 실행을 시키면 예외가 발생 하는 곳에 라인 번호가 출력되고 로직 라인과 동일한 번호가 나온다.

✚ 매직 command

%lsmagic으로 조회하면 내부의 매직 커맨드가 조회된다. 운영체제별로 나오는 결과가 조 금 다를 수 있다.

| 명령어 | 설명 |

|---|---|

%pwd, %cd 현재 위치 및 다른 디렉터리로 이동

| %history | 명령어 히스토리 출력 |

|---|---|

| %reset | 모든 정의된 변수 삭제 |

%%capture 실행되는 명령에 대한 정보의 결과를 저장

| %whos | 현재 정의된 변수 표시 |

|---|---|

%pdoc, %psource Help 기능 실행

| %timeit | 평균 실행 시간을 출력 |

|---|---|

%bookmark 디렉터리에 대한 별칭을 저장하고 쉽게 이동할 수 있게 해줌 %%writefile 현재 디렉터리에 파일 생성

| %load | 디렉터리에 있는 파일을 셀에 로딩 |

|---|---|

| %run | py 프록램 파일을 실행 |

%matplotlib inline matplotlib을 내부 셀에서 실행하기

| %ls | 현재 디렉터리의 파일들을 보기 |

|---|---|

| 명령어 | 설명 |

| %magic | 모든 매직 함수에 대한 상세 도움말 출력 |

| %pdb | 예외가 발생하면 자동적으로 디버거 진입(한 번 입력 시 ON, 다시 입력 시 OFF) |

| %debug | 작성된 코드에 대한 디버그 처리 |

✚ %%writefile로 파일 생성하기

✚ shell 명령어를 통해 doctest를 이용해서 테스트하기

부록 주피터 노트북 사용법 | 1013

✚ %% 프로그래밍 언어를 넣고 그 내부에 로직을 넣어 실행하기

파이썬을 표시하고 내부에 함수를 정의한 뒤 실행을 시키면 결과가 나온다.

손에 잡히는 파이썬 주피터 노트북을 이용한 파이썬 프로그래밍 초판 1쇄 발행 | 2018년 3월 30일 지은이 | 문용준 펴낸이 | 김범준 기획 | 서현 책임편집 | 이동원 편집디자인 | 한지혜 표지디자인 | 김민정 발행처 | 비제이퍼블릭 출판신고 | 2009년 05월 01일 제 300-2009-38호 주소 | 경기도 고양시 덕양구 통일로 140 삼송테크노밸리 B동 229호 주문/문의 | 02-739-0739 팩스 | 02-6442-0739 홈페이지 | http://bjpublic.co.kr 이메일 | bjpublic@bjpublic.co.kr 가격 | 44,000원 ISBN | 979-11-86697-57-3 한국어판 © 2018 비제이퍼블릭 이 책은 저작권법에 따라 보호받는 저작물이므로 무단 전재와 무단 복제를 금지하며, 내용의 전부 또는 일부를 이용하려면 반드시 저작권자와 비제이퍼블릭의 서면 동의를 받아야 합니다.

잘못된 책은 구입하신 서점에서 교환해드립니다.
