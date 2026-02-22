---
layout: default
title: "23.01 CSV"
---

# 23.01 CSV

CSV 파일에 대한 특징을 알아보고 파일을 리스트나 딕셔너리 스타일로 읽고 처리해보자.

✚ 알아볼 주요 내용

● CSV 파일 처리

● TSV 파일 처리

## 23.1.1 CSV 파일의 특징

엑셀 파일에 있는 많은 특징을 제거해서 데이터만을 관리하는 구조이다. 반복자(iterator)이 므로 한번 읽고 나면 처리가 소진된다. 다시 처리하려면 file.seek를 이용하여 제일 처음 으로 가서 처리해야 한다.

✚ CSV 파일의 구조

● 값에 대한 유형이 없고, 모든 것이 문자열이다.

● 글꼴 크기 또는 색상에 대한 설정이 없다.

● 여러 개의 워크 시트가 없다.

● 셀 너비와 높이를 지정할 수 없다.

● 병합된 셀을 가질 수 없다.

● 이미지 또는 차트를 포함할 수 없다.

예제 23-1 : CSV 모듈

```python
In : import csv
count = 0
for i in dir(csv) :
if not i.startswith("_") :
print(i, end= " ")
count += 1
if count % 5 == 0 :
print()
Out: Dialect DictReader DictWriter Error OrderedDict
QUOTE_ALL QUOTE_MINIMAL QUOTE_NONE QUOTE_NONNUMERIC Sniffer
StringIO excel excel_tab field_size_limit get_dialect
list_dialects re reader register_dialect unix_dialect
unregister_dialect writer
```

예제 23-2 : CSV 파일은 반복자(Iterator)

주피터 노트북 셀에서 %%writefile 명령어를 이용해서 하나의 CSV 파일을 만든다.

```python
In : %%writefile data.csv
1,2,3
4,5,6
Out: Writing data.csv
```

이 CSV 파일을 읽어온다. 이를 CSV를 처리할 수 있는 객체로 변환하기 위해 csv.reader 함수를 사용한다. 파일을 읽을 때와 다른 객체로 변환되는 것을 알 수 있다. 두 번째 인자 인 dialect는 내부에 지정된 CSV 기준에 대한 정보를 지정해서 처리할 수 있다. Dialect 에 대한 기본 정보만 확인하고 사용자 정의 등에 대한 설명은 다음 장에서 설명하겠다.

```python
In : import csv
import collections.abc as cols
data = open("data.csv","r")
read = csv.reader(data,dialect='excel')
print(type(read))
for i in dir(read) :
if not i.startswith("_") :
print(i)
Out: <class '_csv.reader'>
dialect
line_num
```

위의 dialect에 대한 속성을 확인해서 출력하고 CSV 파일을 읽은 클래스의 반복자 여부를 확인한다. Iterator의 상속 관계가 True라는 것을 확인할 수 있다.

```python
In : print(read.dialect.delimiter)
print(read.line_num)
print(issubclass(type(read),cols.Iterator))
Out: ,
True
```

예제 23-3 : CSV 파일은 반복자(Iterator) 처리

파일을 오픈해서 reader 함수로 row를 처리한다. 2개의 행밖에 없기에 첫 번째 순환문만 처리된 것을 알 수 있다. 반복자는 두 번 처리할 수 없으므로 반복자의 특징을 그대로 반 영하고 있다.

```python
In : f = open("data.csv")
c = csv.reader(f)
for row in c:
print(row)
for row in c:
print(row)
Out: ['1', '2', '3']
['4', '5', '6']
```

파일을 두 번 처리하려면 이 파일이 첫 번째 위치로 다시 돌아가야 하며 이때 seek 메서드 를 이용해서 파일의 첫 번째로 간 후에 다시 처리하면 반복자가 다시 실행되는 것을 확인 할 수 있다.

```python
In : f = open("data.csv")
c = csv.reader(f)
for row in c:
print(row)
f.seek(0)
for row in c:
print(row)
Out: ['1', '2', '3']
['4', '5', '6']
['1', '2', '3']
['4', '5', '6']
```

리스트 원소를 가지는 리스트를 CSV 파일로 출력하려면 파일을 오픈하고 writer 함수를 이용해서 CSV 파일을 저장할 객체를 만든다. 반복자나 반복형은 아니지만 파일 저장을 위 한 writerrow 메서드를 이용해서 파일의 라인을 추가한다.

```python
In : import csv
arrayofdata=[['A','B', "C"],
['something','spam',2.334],
['anything','spam',0]]
with open('test.csv', 'w', newline='') as mycsvfile:
thedatawriter = csv.writer(mycsvfile)
print(thedatawriter)
for row in arrayofdata:
thedatawriter.writerow(row)
Out: <_csv.writer object at 0x00000000054C4FC0>
```

저장된 파일을 오픈해서 읽으면 각 라인별로 리스트가 출력이 된다.

```python
In : f = open("test.csv")
c = csv.reader(f)
for row in c:
print(row)
Out: ['A', 'B', 'C']
['something', 'spam', '2.334']
['anything', 'spam', '0']
```

## 23.1.2 CSV: 딕셔너리(dict) 처리

헤더와 칼럼별 값에 대한 처리를 딕셔너리로 표시해서 행 단위로 관리할 수 있다. 파이썬 딕셔너리를 CSV로 처리해도 동일한 구조를 형성하므로 내부적으로 딕셔너리가 들어오면 CSV 파일로 처리될 수 있다.

예제 23-4 : CSV : DictWriter/DictReader

파이썬 딕셔너리를 처리하기 위해 fieldnames를 리스트로 정의한 후에 DictWriter로 CSV 인스턴스를 하나 만든다. 그리고 이 인스턴스의 writeheader 메서드를 실행해서 헤 더부를 먼저 처리한 후에 writerow 메서드에 파이썬 딕셔너리를 매개변수로 전달하면 파 일이 갱신되는 것을 확인할 수 있다.

```python
In : import csv
with open('dic_file.csv', 'w') as csvfile:
fieldnames = ['first_name', 'last_name']
writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
writer.writeheader()
writer.writerow({'first_name' : 'banana', 'last_name' : 'ssang'})
writer.writerow({'first_name' : 'kong', 'last_name' : 'al'})
writer.writerow({'first_name' : 'kong', 'last_name' : 'dal'})
```

출력된 파일을 확인해보면 뉴 라인이 입력되어 빈 라인이 추가된 것을 확인할 수 있다.

파일에 뉴 라인을 없애기 위해 open 함수에서 newline 매개변수를 지정하면 빈 라인은 사라지는 것을 확인할 수 있다. CSV 파일을 만들 때 newline=‘\r\n’이 기본이므로 ‘\n’으 로 변경해야 한다.

```python
In : import csv
with open('dic_file1.csv', 'w',newline="\n") as csvfile:
fieldnames = ['first_name', 'last_name']
writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
writer.writeheader()
writer.writerow({'first_name' : 'banana', 'last_name' : 'ssang'})
writer.writerow({'first_name' : 'kong', 'last_name' : 'al'})
writer.writerow({'first_name' : 'kong', 'last_name' : 'dal'})
```

엑셀에서 확인해보면 빈 라인이 없이 입력이 된 것을 확인할 수 있다.

CSV 파일 두 개를 읽어서 파이썬 OrderDict으로 가져올 수 있다. 엑셀에서 빈 라인이 생 긴 것과 달리 DictReader로 읽으면 OrderDict으로는 빈 라인을 제외하고 값이 들어온 경 우만 처리되는 것을 알 수 있다.

```python
In : import csv
with open('dic_file.csv', 'r') as csvfile:
reader = csv.DictReader(csvfile)
for row in reader:
print(row)
Out: OrderedDict([('first_name', 'banana'), ('last_name', 'ssang')])
OrderedDict([('first_name', 'kong'), ('last_name', 'al')])
OrderedDict([('first_name', 'kong'), ('last_name', 'dal')])
In : import csv
with open('dic_file1.csv', 'r') as csvfile:
reader = csv.DictReader(csvfile)
for row in reader:
print(row)
Out: OrderedDict([('first_name', 'banana'), ('last_name', 'ssang')])
OrderedDict([('first_name', 'kong'), ('last_name', 'al')])
OrderedDict([('first_name', 'kong'), ('last_name', 'dal')])
```

## 23.1.3 CSV 인용 기호 처리

CSV 파일의 헤더부를 제외하고 값만 처리하는 경우에는 리스트(list)로 처리가 가능하다.

읽을 때 일단 헤더부를 제거하고 내부 값만 행으로 처리하고 리스트에 저장해서 처리하는 방법을 알아보겠다.

예제 23-5 : CSV 인용 기호 넣고 처리

CSV 파일을 쓰기 위해서는 CSV 파일을 쓰기 모드로 오픈하고 파일 객체를 CSV.writer(파 일 객체)에 넣으면 된다.

Quoting 인자 처리하는 4가지 처리 방식이 있다.

● 특수 문자가 있는 필드를 인용 처리(QUOTE_MINIMAL)

● 유형에 관계없이 모든 것을 인용 처리(QUOTE_ALL)

● 정수 또는 부동 소수점이 아닌 모든 필드를 인용 처리(QUOTE_NONNUMERIC)

● 출력 시에는 아무 것도 인용 처리를 안 함(QUOTE_NONE)

```python
In : import csv
print(csv.QUOTE_MINIMAL)
print(csv.QUOTE_ALL)
print(csv.QUOTE_NONNUMERIC)
print(csv.QUOTE_NONE)
Out: 0
```

헤더에 Name, Profession, Age으로 처리하고 인용에는 |가 들어간다. 파일을 만든다.

```python
In : import csv
with open('persons1.csv', 'w', newline='') as csvfile:
filewriter = csv.writer(csvfile, delimiter=',',
quotechar='|', quoting=csv.QUOTE_ALL)
filewriter.writerow(['Name', 'Profession', "Age"])
filewriter.writerow(['Derek', 'Software Developer',33])
filewriter.writerow(['Steve', 'Software Developer',44])
filewriter.writerow(['Paul', 'Manager',55])
```

엑셀을 열어서 보면 데이터에 모두 인용 부호가 표시된 것을 알 수 있다.

이 파일을 읽고 다시 파이썬 리스트로 전환해서 읽어보면 문자열 사이에 인용 기호가 다

들어가 있는 것을 알 수 있다.

```python
In : with open('persons1.csv', 'r') as f:
reader = csv.reader(f)
# read file row by row
for row in reader:
print(row)
Out: ['|Name|', '|Profession|', '|Age|']
['|Derek|', '|Software Developer|', '|33|']
['|Steve|', '|Software Developer|', '|44|']
['|Paul|', '|Manager|', '|55|']
```

## 23.1.4 TSV

CSV 파일과 비슷하지만, 콤마 대신 Tab으로 컬럼을 분리하는 파일 포맷을 TSV 파일이라 한다.

예제 23-6 : TSV 파일 처리하기

TSV 파일은 컬럼 delimiter만 차이가 나므로, CSV 모듈의 reader( ) 혹은 writer( ) 함수에 서 delimiter='\t' 옵션만 지정해주면 나머지는 CSV와 동일하다.

```python
In : import csv
with open('persons1.tsv', 'w', newline='') as csvfile:
filewriter = csv.writer(csvfile, delimiter='\t')
filewriter.writerow(['Name', 'Profession'])
filewriter.writerow(['Derek', 'Software Developer'])
filewriter.writerow(['Steve', 'Software Developer'])
filewriter.writerow(['Paul', 'Manager'])
```

엑셀로 확인하면 구분자 세팅하는 부분만 차이가 있고 나머지는 동일하다.

파일을 읽어보면 구분자에 탭으로 표시된다.

```python
In : with open('persons1.tsv', 'r') as f:
reader = csv.reader(f)
# read file row by row
for row in reader:
print(row)
Out: ['Name\tProfession']
['Derek\tSoftware Developer']
['Steve\tSoftware Developer']
['Paul\tManager']
```

CSV 파일 처리할 때에 delimiter를 정의하고 처리하면 데이터가 분리되어 처리된다.

```python
In : with open('persons1.tsv', 'r') as f:
reader = csv.reader(f, delimiter='\t')
# read file row by row
for row in reader:
print(row)
Out: ['Name', 'Profession']
['Derek', 'Software Developer']
['Steve', 'Software Developer']
['Paul', 'Manager']
```
