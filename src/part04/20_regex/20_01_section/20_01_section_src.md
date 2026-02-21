---
layout: default
title: "20.01 정규"
---

# 20.01 정규

일단 패턴을 만드는 방식을 이해해야 하므로 정규 표현식이 제공하는 패턴을 만드는 방식 부터 알아보겠다.

## 20.1.1 정규 표현식 모듈 알아보기

파이썬에서는 re 모듈에서 정규 표현식을 지원하며 간단히 정규 표현식을 실행하여 어떻 게 패턴이 문자열과 매칭되는지를 확인해보겠다.

✚ 정규 표현식 모듈 : re

함수와 속성들을 제공해서 정규 표현식을 처리할 수 있도록 한다.

예제 20-1 : 모듈 내의 변수와 함수 보기

주요한 함수로 compile, findall, finditer, match, search 등이 있다.

```python
In : import re
count = 0
for i in dir(re) :
if not i.startswith("_") :
print(i, end=" ")
count += 1
if count % 5 == 0 :
print()
Out: A ASCII DEBUG DOTALL I
IGNORECASE L LOCALE M MULTILINE
RegexFlag S Scanner T TEMPLATE
U UNICODE VERBOSE X compile
copyreg enum error escape findall
finditer fullmatch functools match purge
search split sre_compile sre_parse sub
subn template
```

일단 위에 있는 compile 함수와 match 함수를 통해 간단하게 정규 표현식을 처리해서 어 떻게 작동하는지를 알아보겠다.

일단 정규 표현식 모듈인 re를 import한다. 정규 표현식도 하나의 문자열이므로 “향수”라 는 단어를 검색할 패턴으로 찾으려고 한다. Complie 함수에 패턴을 넣고 실행하면 하나 의 인스턴스가 만들어진다.

```python
In : import re
```

pattern = re.compile("향수") print(pattern) print(type(pattern))

```python
Out: re.compile('향수')
<class '_sre.SRE_Pattern'>
```

위에 정의된 pattern을 가지고 패턴 매칭을 시키는 match 함수를 사용해서 이 패턴을 검 색할 문자열을 넣는다. 이를 실행해서 매칭된 결과가 있으면 mat라는 변수에 하나의 인스 턴스가 만들어진다. 이 인스턴스에 group이라는 메서드를 이용해서 매칭된 결과를 조회 한다.

```python
In : mat = re.match(pattern, "향수 수향")
print(type(mat))
print(mat.group())
Out: <class '_sre.SRE_Match'>
향수
```

## 20.1.2 메타 문자(meta Character)

이제 패턴에 대한 정의를 하기 위해 정규 표현식에서 내부적으로 사용할 규칙인 메타 문자 에 대해 알아보겠다.

프로그래밍 언어에서는 이런 메타 문자를 키워드라고 해서 다른 용도로 사용하지 못하 게 하지만 정규 표현식에서는 이 메타 문자를 가지고 매칭될 기준의 패턴을 만들 때 사용 한다.

✚ 문자 클래스(character class)

하나의 문자를 매칭시키는 문자 클래스부터 알아보겠다. 하나의 문자가 패턴 매칭할 수 있는 기호는 대괄호( [ ] )이다.

이 대괄호 안에 문자가 들어오면 이 문자와 매칭된 것을 체크한다. 특히 다양한 문자를 모 두 기록하지 않는 경우는 하이픈( - )을 이용해서 범위를 지정할 수 있다.

예제 20-2 : 문자 클래스 처리

파싱해야 할 문자들의 패턴을 정의하기 위해 대괄호 사이에 영문 소문자(a-z), 영문 대문 자(A-Z), 숫자(0-9)를 넣고 하나의 문자와 매칭해서 처리를 하도록 정의한다. 대괄호 다음 에 있는 + 기호는 이런 문자가 하나 이상이 있을 때 처리하라는 뜻이다. 패턴을 컴파일하 면 한 Pattern 클래스의 인스턴스가 만들어지고 이를 계속 사용이 가능하다.

```python
In : import re
pattern = re.compile("[a-zA-Z0-9]+")
print(pattern)
print(type(pattern))
Out: re.compile('[a-zA-Z0-9]+')
<class '_sre.SRE_Pattern'>
```

위에서 만들어진 패턴을 pattern 변수에 할당하였으므로 search 함수에 인자로 넣고 매핑 할 문자열 “Python Pattern”을 넣어서 처리하면 첫 번째 단어인 Python과 매칭이 된다.

이 결과를 mat 변수에 할당했으므로 group 매소드로 패턴 매칭될 결과를 조회하면 결과 를 출력하는 것을 볼 수 있다.

```python
In : mat = re.search(pattern,"Python Pattern")
print(type(mat))
print(mat.group())
Out: <class '_sre.SRE_Match'>
Python
```

파이썬이 유니코드를 지원하므로 한글도 처리가 가능하다. 한글의 시작과 끝을 정의해서 처리해보겠다. 일단 문자 클래스로 [가-히] : 한글로 입력된 모든 것의 패턴 처리로 한글 의 시작과 종료를 표시한다. 문자열 “향수 수향”을 넣어서 처리할 때 빈 칸이 있으면 더 이 상 매칭 작업을 하지 않는다. 매칭될 결과 문자열이 “향수”를 출력하는 것을 볼 수 있다.

```python
In : import re
```

pattern = re.compile("[가-히0-9]+") print(pattern) print(type(pattern)) mat = pattern.search("향수 수향") print(type(mat)) print(mat.group())

```python
Out: re.compile('[가-히0-9]+')
<class '_sre.SRE_Pattern'>
<class '_sre.SRE_Match'>
향수
```

특정 메타 문자인 ^는 반대(not)의 의미를 뜻하므로 대괄호 내에 들어가면 [^0-9]라는 숫 자를 문자로 처리하라는 뜻이다. 이때 빈 공간도 문자로 인식되므로 문자열 “향수 수향”을 넣으면 하나로 패턴 매칭되는 것을 알 수 있다.

이번에는 함수 대신 search 메서드를 사용해서 처리하는 것을 알 수 있다. 함수로 처리하 는 것과 메서드로 처리하는 것이 동일한 결과가 나온다.

```python
In : import re
pattern = re.compile("[^0-9]+")
print(pattern)
print(type(pattern))
```

mat = pattern.search("향수 수향") print(type(mat)) print(mat.group())

```python
Out: re.compile('[^0-9]+')
<class '_sre.SRE_Pattern'>
<class '_sre.SRE_Match'>
향수 수향
```

✚ 축약형 문자 표현

패턴을 만들 때 모든 문자를 표시하는 것보다는 축약형 문자로 작성하는 것이 더 편리 하다. 특히 패턴을 정의할 때 역슬래쉬와 영문자를 표시하면 내부적인 규약에 따라 특수 한 의미를 가질 수 있다. 이번에는 축약 문자에 대해 알아보겠다.

예제 20-3 : 숫자와 숫자가 아닐 경우 처리

숫자를 표시하는 축약 코드는 역슬래쉬와 소문자 d를 사용하는 것이다. 이 표시는 \d - 숫자와 매치, [0-9]와 동일한 표현식이라는 것을 알 수 있다.

간단하게 축약 문자를 넣어 숫자를 제외한 특수 문자 등을 문자열에서 추출하기 위해 split 함수를 이용해서 처리한다.

```python
In : import re
mat = re.split("\d+","1\t2\n3\r\n4\f5\xff")
print(type(mat))
print(mat)
Out: <class 'list'>
```

['', '\t', '\n', '\r\n', '\x0c', 'ÿ'] 숫자가 아닌 경우에는 소문자 d가 아닌 대문자 D를 사용해 처리한다. 이를 표기하면 \D

- 숫자가 아닌 것과 매치, [^0-9]와 동일한 표현식이다. 위와 반대인 결과가 나오는 것을

볼 수 있다.

```python
In : import re
mat = re.split("\D+","1\t2\n3\r\n4\f5\xff")
print(type(mat))
print(mat)
Out: <class 'list'>
['1', '2', '3', '4', '5', '']
```

예제 20-4 : whitespace 문자인 것과 매치 : \s, \S

보통 영어 단어는 빈 칸을 기준으로 분리한다. 파일에서 문장의 라인은 개행 문자를 기준 으로 분리한다. 이런 의미있는 특수 문자를 whitespace라고 하고 이를 매칭시키는 것은 축약 문자인 \s 를 사용한 뒤 -whitespace 문자를 사용해서 매핑을 시킨다. 이 축약 문 자와 매칭되는 공백(whitespace)문자를 전부 적은 [ \t\n\r\f\v]와 동일한 표현식이다.

이 공백 문자를 제외한 나머지 문자를 split해서 리스트로 결과를 표시한다.

```python
In : import re
mat = re.split("\s+","a\tb\nc\r\nd\fe\xff")
print(type(mat))
print(mat)
Out: <class 'list'>
```

['a', 'b', 'c', 'd', 'eÿ'] 대문자 축약형 표현은 \S - whitespace 문자가 아닌 것과 매치, [^ \t\n\r\f\v]와 동일 한 표현식이다. 위의 처리와 반대로 문자를 기준으로 분리하므로 공백 문자가 출력되는 것을 알 수 있다.

```python
In : import re
mat = re.split("\S+","a\tb\nc\r\nd\fe\xff")
print(type(mat))
print(mat)
Out: <class 'list'>
['', '\t', '\n', '\r\n', '\x0c', '']
```

예제 20-5 : 문자일 경우 : \w, \W

보통 문자열에 \w 축약형을 사용하면 문자+숫자(alphanumeric), 한글도 포함되며 [a- zA-Z가-히0-9]와 동일한 표현식의 결과를 처리한다. 문자를 제외한 나머지만 출력되는 것을 볼 수 있다.

```python
In : import re
```

mat = re.split("\w+","a\tb\nc\r\nd\f가을\xff") print(type(mat)) print(mat)

```python
Out: <class 'list'>
['', '\t', '\n', '\r\n', '\x0c', '']
```

alphanumeric이 아닌 문자와 매치, [^a-zA-Z가-히0-9]와 동일한 표현식과 매칭되려 면 역슬래스와 대문자 W로 표시해서 사용하면 된다. 문자가 아닌 것을 기준으로 분리하 므로 문자만 출력되는 것을 알 수 있다.

```python
In : import re
```

mat = re.split("\W+","a\tb\nc\r\nd\f가을e\xff") print(type(mat)) print(mat)

```python
Out: <class 'list'>
```

['a', 'b', 'c', 'd', '가을eÿ']

✚ 앵커 문자 Anchor (^ / $)

패턴을 매칭하려면 특정 문자가 시작과 마지막 부분 등을 지정할 필요가 있을 때 앵커를 사용해서 처리한다.

예제 20-6 : 시작과 끝을 표시하는 anchor

문자열의 맨 처음과 일치함을 의미한다. 특히, 컴파일 옵션 re.MULTILINE 을 사용할 경 우에는 여러 줄의 문자열에서는 각 라인의 처음과 일치하는 것을 의미한다.

또한 ^ 문자를 메타 문자가 아닌 문자 그 자체로 매치하고 싶은 경우에는 [^] 처럼 사용하 거나 \^ 로 사용해야 한다.

```python
In : import re
```

mat = re.match("^하늘을","하늘을 우러러 한점 부끄럼없이") print(type(mat)) print(mat.group())

```python
Out: <class '_sre.SRE_Match'>
하늘을
```

문자열의 맨 마지막부터 일치함을 의미하고, $ 문자를 메타 문자가 아닌 문자 그 자체로 매치하고 싶은 경우에는 [$]처럼 사용하거나 \$로 사용한다.

```python
In : import re
```

mat = re.search("부끄럼없이$","하늘을 우러러 한점 부끄럼없이") print(type(mat)) print(mat.group())

```python
Out: <class '_sre.SRE_Match'>
부끄럼없이
```

✚ 임의의 문자를 표시하는 점 : .

dot(.) 메타 문자는 줄바꿈 문자인 \n를 제외한 모든 문자와 매치하고, re.DOTALL이라 는 옵션을 주면 \n 문자와도 매치할 수 있다. 보통 a.b : "a + 모든 문자 + b“를 표시하지 만 a[.]b : "a + Dot(.)문자 + b"은 두 문자 사이에 꼭 점이 들어가있는 문자를 표시하는 것이다.

예제 20-7 : 문자 사이에 . 이 패턴으로 들어간 경우

문제 사이에 다른 문자가 하나 더 들어가 있는 경우를 매칭해서 이를 처리하라는 뜻이다.

```python
In : import re
```

mat = re.search("하늘을.우러러","하늘을 우러러 한점 부끄럼없이") print(type(mat)) print(mat.group())

```python
Out: <class '_sre.SRE_Match'>
하늘을 우러러
```

✚ 선택 문자: Alternatives (|,or)

| 메타 문자는 "or"의 의미와 동일하며, A|B 라는 정규식이 있다면 이것은 A 또는 B라는

의미이다.

예제 20-8 : 특정 문자들의 선택 조건을 주기

특정 단어들이나 문자를 선택해서 매칭하려면 정의된 요건에 두 개를 정의해서 선택하라 는 패턴을 만들어서 문자열과 매칭하여 처리한다.

```python
In : import re
```

mat = re.search("([하늘을|우러러].)+","하늘을 우러러 한점 부끄럼없이") print(type(mat)) print(mat.group())

```python
Out: <class '_sre.SRE_Match'>
하늘을 우러러
```

## 20.1.3 수량자

주어진 문자열과 매칭하고 반복해서 표현할 때 숫자로 부여해서 수량으로 표시도 가능하 고 이를 축약형을 이용해서 기호로 표시도 할 수 있다. 들어오는 문자열이 다양하기 때문 에 패턴을 만들 때 연속되는 동일한 문자에 대해서는 수량자를 이용해서 표시하는 것이 편 하다.

예제 20-9 : 반복 : ({m,n}), (*), (+), (?)

패턴을 정의할 때 일단 반복을 위한 { } 메타 문자를 이용해서 반복 횟수를 지정한다. 내부 의 인자는 시작점과 종료점을 지정할 수 있다.

정규 표현식 내 특정 문자 다음에 {m, n} 기호를 지정할 경우에 그 앞에 정한 문자가 반복 되어진다. 반복 횟수는 시작점 m부터 종료점 n으로 표시한다. 시작점만 표시하면 종료는 무한으로 처리되므로 이를 다른 기호와 연계해서 사용하면 {1,}은 +와 동일하며 {0,}은 *와 동일하다.

일단 *표와 동일하게 문자 m이 없거나 다수가 들어 있는 단어를 매칭해서 처리한다. 이번 에는 컴파일한 패턴 인스턴스를 만들고 그 내부에 있는 search 함수에 문자열을 넣어서 처리한다.

일단 문자열 내에 m이 없거나 여러 개가 있어도 고정으로 들어갈 부분은 ummy이므로 패턴 매칭된 결과를 확인하면 이 부분이 매칭된 것을 출력해주는 것을 알 수 있다.

```python
In : import re
pattern = re.compile("m{0,}ummy")
mat = pattern.search("mummy")
print(mat.group())
mat = pattern.search("mmmmmummy")
print(mat.group())
mat = pattern.search("ummy")
print(mat.group())
Out: mummy
mmmmmummy
ummy
```

이번에는 고정된 반복자를 {0,3}으로 사용해서 처리해본다. 메서드 search는 첫 번째 문자 가 아닐 때에도 처리해서 중간이 맞으면 패턴이 매칭되는 것을 알 수 있다. 하지만 match 매소드는 첫 번째 시작하는 문자열부터 처리하므로 패턴 매칭이 되지 않은 것을 알 수 있다.

```python
In : import re
pattern = re.compile("m{0,3}ummy")
mat = pattern.search("mummy")
print(mat.group())
mat = pattern.search("ummy")
print(mat.group())
mat = pattern.search("mmmmmmummy")
print(mat.group())
mat = pattern.match("mmmmmmummy")
if mat is None :
print(" mismatching ")
else :
print(mat.group())
Out: mummy
ummy
mmmummy
mismatching
```

위에서 처리된 것을 이번에는 반복자로 처리하는 기호를 이용해서 만들어본다. 일단 별표 * 기호는 없거나 무한으로 앞에 있는 문자들이 반복을 한다는 뜻이다. 반복자로 작성하면 {0, }과 동일한 표현이다.

```python
In : import re
pattern = re.compile("m*ummy")
mat = pattern.search("mummy")
print(mat.group())
mat = pattern.search("mmmmmummy")
print(mat.group())
mat = pattern.search("ummy")
print(mat.group())
Out: mummy
mmmmmummy
ummy
```

반복자 + 기호는 최소 1개 이상의 반복을 필요로 하는 메타 문자이다. 패턴 매칭이 안되면 None으로 결과를 내므로 맨 마지막 처리 이후 group 메서드를 사용하면 NoneType에 는 group이라는 메서드가 없다고 예외 처리되는 것을 알 수 있다.

```python
In : import re
pattern = re.compile("m?ummy")
mat = pattern.search("mummy")
print(mat.group())
mat = pattern.search("ummy")
print(mat.group())
Out: mummy
ummy
```

## 20.1.4 그룹으로 묶기

문자열에서 찾아야 할 패턴들의 특징이 다양할 경우 이를 하나의 묶음을 만들어서 처리할 수 있어야 한다. 이번에는 특정한 그룹을 만들어서 문자열에 대한 패턴을 매칭하는 방법 을 알아보겠다.

✚ 그룹 처리하기

정규 표현식에 대한 패턴을 그룹화는 패턴 문자열 내에 괄호로 묶어서 작성하면 된다. 그 룹도 특정화하고 싶을 경우에는 그룹 내에 이름을 부여할 수 있다. 일단 그룹에 이름을 주 지 않고 처리하는 구조부터 알아보겠다.

그룹화가 되면 group 메서드를 가지고 호출할 때도 각 그룹별로 조회도 가능하다. 그룹이 순서는 1부터 시작해서 조회가 가능하고 이름이 있을 경우는 그룹의 이름을 명기해서 조 회도 가능하다.

예제 20-10 : 전화번호 가져오기

많이 사용되는 주소, 전화번호를 문자열로 받아서 이 내부에 있는 전화번호를 패턴으로 추출해보겠다.

일단 전화번호는 지역을 나타내는 번호를 하나의 그룹으로 처리하고 두 번째는 국번을 그 룹으로 지정하며 마지막 일련번호도 그룹화했다. 문자열 첫 번째부터 전화번호를 찾는 것 이 아니므로 search 메서드를 이용해서 패턴 매칭을 처리한다.

전체 결과는 groups 메서드로 조회하면 각 그룹에 맞춰 나눠서 출력되는 것이고 group 메서드에 인자를 주지 않으면 패턴과 동일한 것을 출력한다.

각 패턴별로 조회는 인덱스를 1번부터 시작해서 각 그룹에 맞게 조회할 수 있다.

```python
In : import re
```

address = "경기도 성남시 분당구 031-123-1234" pattern = re.compile("(\d+)-(\d+)-(\d+)") mat = pattern.search(address) print(mat.groups()) print(mat.group()) print(mat.group(1)) print(mat.group(2)) print(mat.group(3))

```python
Out: ('031', '123', '1234')
031-123-1234
```

이 (?:정규 표현식) 기호는 no-capturing 처리로 그룹을 분리한 것처럼 보이지만 일반 괄 호를 인식하지 않고 처리된다. 정규 표현식이 괄호 안에 있는 경우와 일치하지만 그룹과 일치하는 하위 문자열에 대해 처리를 하지 않게 한다.

```python
In : import re
```

address = "경기도 성남시 분당구 031-123-1234" pattern = re.compile("(?:\d+)-(?:\d+)-(?:\d+)") mat = pattern.search(address) print(mat.groups()) print(mat.group()) print(mat.group(1)) print(mat.group(2)) print(mat.group(3))

```python
Out: ()
031-123-1234
---------------------------------------------------------------------
IndexError             Traceback (most recent call last)
<ipython-input-4-898c5add55b6> in <module>()
7 print(mat.groups())
8 print(mat.group())
----> 9 print(mat.group(1))
10 print(mat.group(2))
11 print(mat.group(3))
IndexError: no such group
```

✚ Named Group

이번에는 패턴에 대한 그룹을 처리하기 위해 이름을 부여해서 사용한다. 그룹에 이름을 부여하기 위해서 (?P<명칭>패턴 )을 사용한다.

예제 20-11 : 그룹 이름으로 전화번호 가져오기

위의 예제와 동일한 문자열에서 전화번호를 처리할 경우 패턴에 이름을 지정해서 처리해 보겠다.

패턴 문자열에 ?P를 쓰고 바로 붙여서 <패턴그룹명>을 작성하면 하나의 패턴의 명칭이 부여된다. 그 뒤에 패턴에 매칭될 문자를 정의하고 search 메서드를 이용해서 문자열 중 간에 있는 전화번호를 추출했다.

일반적인 그룹에 대해서는 정수 인덱스와 그룹명으로 조회를 해보면 동일한 결과가 출력 된다.

```python
In : import re
```

address = "경기도 성남시 분당구 031-123-1234" pattern = re.compile("(?P<province>\d+)-(?P<local>\d+)-(?P<number>\d+)") mat = pattern.search(address) print(mat.groups()) print(mat.group()) print(mat.group(1)) print(mat.group(2)) print(mat.group(3)) print(mat.group("province")) print(mat.group("local")) print(mat.group("number"))

```python
Out: ('031', '123', '1234')
031-123-1234
```

## 20.1.5 전후방 탐색 하기

문자열의 현재 위치에서 패턴과 매칭된 경우만 추출했다. 특정 매칭된 것을 기분으로 그 앞과 뒤에 있는 부분을 추출하는 방법을 이제부터 알아보겠다. 특정 기준을 가지고 특정 문자가 매칭되면 앞쪽을 추출하는 전방(lookahead) 처리 방식과 후방(lookbehind) 처리 방 식이 있다.

✚ 전방 탐색 패턴

(?=...) 전방 탐색 패턴은 내부에 정의된 패턴이 일치할 경우 앞에 정의된 것을 반환하는 패 턴 처리 방식이다.

예제 20-12 : URL 주소 내의 전방 탐색 사용하기

URL 주소 내의 통신 프로토콜을 가져오기 위해서는 문자열 내부의 : 를 매칭하고 그 앞의 문자를 전부 가져오면 프로토콜을 검색할 수 있다.

```python
In : import re
pattern = ".+(?=:)"
mat = re.match(pattern,"https://www.slideshare.net/dahlmoon")
print(mat.group())
Out: https
✚ 후방 탐색 패턴
```

(?<=...) 후방 탐색 패턴은 내부에 정의된 것과 매칭되는 것이 나오면 그 뒷부분의 패턴의 매칭을 처리한다.

예제 20-13 : 금액 표시 문자 이후에 금액만 가져오기

$기호 이후의 숫자를 전부 검색해서 출력하는 방식이다. 앞의 $ 이후의 숫자만을 검색하 므로 빈 칸 이전의 숫자만을 검색한다. 뒤에 작성된 것은 숫자와 빈 공간을 기준으로 앞의 숫자만 매칭되어 처리하는 것을 알 수 있다.

```python
In : import re
pattern = "(?<=\$)([0-9.]+)"
mat = re.search(pattern,"$100000.00 888888")
print(mat.group())
pattern = "([0-9.]+)"
mat = re.search(pattern,"$100000.00 888888")
print(mat.group())
Out: 100000.00
100000.00
```

✚ 부정형 전방과 후방 탐색: (?!...) / (?<!...)

패턴으로 지정된 것과 일치하지 않는 것을 매칭했을 때만 결과를 출력하라고 지정할 수 있다. 특정 탐색한 것이 없는 경우에 한해 처리가 된다.

예제 20-14 : 금액 표시가 없는 경우만 출력

문자열에 숫자 표시가 여러 개 있다. 이때 금액을 표시하는 숫자만 가져와서 처리하려고 한다. 위에서 match와 search 함수나 메서드를 사용할 때는 주로 한 번 추출하지만 이번 에는 findall을 사용하여 문자열 전체를 순환하면서 이 패턴에 맞는 것을 전부 찾는다. 결 과는 리스트로 제공하는 것을 알 수 있다.

```python
In : import re
text = "I paid $30 for 100 apples, 50 oranges,and 60 pears. I saved $5
on the order."
pattern = "(?<=\$)\d+"
mat = re.findall(pattern,text)
print(mat)
Out: ['30', '5']
```

이번에는 모든 숫자를 추출하기 위해 전방 탐색을 해서 금액 표시를 제외한 모든 숫자를 찾아보았다.

```python
In : import re
text = "I paid $30 for 100 apples, 50 oranges,and 60 pears. I saved $5
on the order."
pattern = "(?!\$)\d+"
mat = re.findall(pattern,text)
print(mat)
Out: ['30', '100', '50', '60', '5']
```

이에 사례를 보면 $ 표시와 상관없이 전체 숫자가 추출된 것을 볼 수 있다. 이번에는 $ 표 시가 된 숫자를 제외하고 숫자만 되는 것을 추출하기 위해 스페이스 다음에 $ 표시가 아닌 경우만 패턴을 매칭해서 맞는 결과만 보여주도록 변경을 했다.

```python
In : import re
text = "I paid $30 for 100 apples, 50 oranges,and 60 pears. I saved $5
on the order."
pattern = "\s(?!\$)\d+"
mat = re.findall(pattern,text)
print(mat)
Out: [' 100', ' 50', ' 60']
```

위의 방식을 후방 부정으로 처리해도 동일한 결과가 나온다.

```python
In : import re
text = "I paid $30 for 100 apples, 50 oranges,and 60 pears. I saved $5
on the order."
pattern = "\s(?<!\$)\d+"
mat = re.findall(pattern,text)
print(mat)
Out: [' 100', ' 50', ' 60']
```

✚ 주석 처리 (?#...)

패턴을 지정할 때도 복잡할 경우 패턴에 대한 설명을 추가해서 작성할 수 있다.

예제 20-15 : 주석을 무시

주석은 패턴에서는 아무런 역할을 하지 않는다. 패턴에 주석이 있지만 대문자 P만 패턴에 해당하고 나머지는 단순한 주석으로 인식하므로 매칭된 결과도 P만 출력한다.

```python
In : import re
text = "Python"
pattern = "P(?#comment)"
mat = re.findall(pattern,text)
print(mat)
Out: ['P']
```
