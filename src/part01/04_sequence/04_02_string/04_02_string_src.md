---
layout: default
title: "04.02 문자열"
---

# 04.02 문자열

파이썬 3 버전은 문자열이 기본 문자 코드로 유니코드(Unicode)를 사용하면서 다양한 언 어로 처리가 가능하다.

파이썬 2 버전에 있는 Unicode 클래스는 사라졌고 대신 bytes 클래스가 만들어져 있어 바이트 처리는 bytes 클래스를 가지고 처리한다.

## 4.2.1 문자열 생성 방법

내장 자료형은 리터럴 표기법과 생성자 표기법을 다 지원한다. 문자열에서 리터럴 생성은 인용 기호를 이용해서 만들면 된다.

또한 바이트를 만들고 이를 복호화 처리하면 문자열로 변환이 되므로 문자열 생성에 활용 할 수 있다.

예제 4-11 : 문자열을 리터럴과 생성자로 생성

인용 기호를 사용해서 직접 리터럴로 생성한다. 리터럴로 생성해도 해당 자료형은 문자열 클래스이다.

```python
In : sl = "파이썬"
print(sl)
print(type(sl))
Out: 파이썬
<class 'str'>
```

생성자는 문자열 클래스 str 다음에 호출 연산자를 붙이고 인자를 넣어서 실행하면 인스턴 스를 반환한다. 문자열은 정수, 문자열, 실수 등 다양한 자료형으로 생성이 가능하다.

```python
In : s = str(123)
```

ss = str("성대현") sf = str(123.00) print(s, type(s)) print(ss, type(ss)) print(sf, type(sf))

```python
Out: 123 <class 'str'>
```

성대현 <class 'str'> 123.0 <class 'str'> 바이트로 생성하면 문자열이지만 앞에 바이트라는 표시로 b가 붙는다. 이 말은 유니코드 로 된 문자열이 아니라는 것이다. 이를 복호화하기 위해 decode 메서드로 처리하면 문자 열로 변환된다.

```python
In : b = b"abc"
c = b.decode()
print(type(c),c)
Out: <class 'str'> abc
```

## 4.2.2 문자열 주요 메서드

문자열 자료형에도 다양한 메서드를 지원한다. 이 메서드들은 문자열 인스턴스를 변경할 경우 새로운 문자열 인스턴스를 만들어서 반환한다.

✚ 문자열 내의 문자 조정하기

문자열 내의 문자를 대문자나 소문자로 변형하거나 문자들을 특정 형태에 맞춰 패턴화해 서 조정한다.

예제 4-12 : 대소문자 처리

문자열을 소문자로 생성했다. 이 문자열 전체를 대문자로 변환하려면 upper 메서드를 사 용한다. 전체 대문자를 가진 문자열을 전부 소문자로 변환하려면 lower 메서드를 사용 한다.

```python
In : sl = "spiderman"
sh = sl.upper()
print(sh)
su = "WONDER WOMEN"
sh = su.lower()
print(sh)
Out: SPIDERMAN
wonder women
```

문자열을 보통 소설이나 영화의 제목처럼 사용하기 위해서는 단어별로 첫글자를 대문자로 나머지 글자는 소문자로 변환한다. 이때 사용하는 메서드가 title이다.

```python
In : su = "WONDER WOMEN"
st = su.title()
print(st)
Out: Wonder Women
```

특정 단어의 앞문자만 대문자로 처리하기 위해서는 capitalize 메서드를 사용한다.

```python
In : sl = "spiderman is ..."
sc = sl.capitalize()
print(sc)
Out: Spiderman is ...
```

casefold 메서드는 특수한 희랍 문자 등의 경우를 제외하고는 모든 글자를 소문자 처리 한다.

```python
In : su = "WONDER WOMEN"
scc = su.casefold()
print(scc)
Out: wonder women
```

예제 4-13 : 문자열 위치 조정해서 꾸미기

문자열을 처리할 때 포매팅 처리는 내장 메서드로도 가능하다. 간단히 위치를 조정하고 빈 칸을 어떻게 채울지에 대해 알아본다.

먼저 문자열의 글자를 중앙에 놓고 빈 칸을 채우기 위해 %를 넣어서 출력해본다. 글자를 중앙에 위치시키려면 먼저 center 메서드를 사용한다. 인자로는 총 문자가 들어갈 버퍼 길이와 빈 칸에 들어갈 한 자리 문자를 넣고 실행하면 중앙에 맞춰 글자가 배치되고 빈 칸 은 주어진 문자로 채워진다.

빈 칸을 채울 문자를 주지 않으면 빈 공간으로 채워진다.

```python
In : s = "빅데이터와 인공지능"
sc = s.center(30,"%")
print(sc)
sb = s.center(30)
print(sb)
Out: %%%%%%%%%%빅데이터와 인공지능%%%%%%%%%%
빅데이터와 인공지능
```

특정 버퍼를 정의하고 문자열을 위치를 왼쪽으로부터 채워지도록 만들려면 ljust 메서드를 이용해서 처리한다. Center 메서드와 동일하게 길이와 빈 칸을 채울 문자를 받는다.

```python
In : s = "빅데이터와 인공지능"
sc = s.ljust(30,"%")
print(sc)
sb = s.ljust(30)
print(sb)
Out: 빅데이터와 인공지능%%%%%%%%%%%%%%%%%%%%
빅데이터와 인공지능
```

특정 버퍼를 정의하고 문자열을 오른쪽으로 배치되어 표시하기 위해서는 rjust 메서드를 이용해서 처리하면 된다.

```python
In : s = "빅데이터와 인공지능"
sc = s.rjust(30,"%")
print(sc)
sb = s.rjust(30)
print(sb)
Out: %%%%%%%%%%%%%%%%%%%%빅데이터와 인공지능
빅데이터와 인공지능
```

위의 메서드에 빈칸을 채울 문자를 넣어야 한다고 했다. 이 문자는 유니코드 기준의 문자 를 의미하므로 한글을 넣어도 하나의 문자로 인식한다.

```python
In : s = "빅데이터와 인공지능"
```

sc = s.center(30,"파") print(sc)

```python
Out: 파파파파파파파파파파빅데이터와 인공지능파파파파파파파파파파
```

문자를 2개 넣으면 범위를 벗어나서 예외가 발생하므로 문자를 하나만 넣고 처리한다.

```python
In : sb = s.center(30,"bb")
print(sb)
Out: ---------------------------------------------------------------------
TypeError             Traceback (most recent call last)
<ipython-input-16-08e0cdd763a4> in <module>()
----> 1 sb = s.center(30,"bb")
2 print(sb)
TypeError: The fill character must be exactly one character long
```

✚ 문자열 찾기 및 패턴 매칭하기

문자열에 대한 검색(find, index) 및 개수(count)를 확인하는 메서드를 제공한다. 패턴 매칭 을 위해서는 처음(startswith)과 마지막(endswith) 메서드를 이용해서 문자열의 부분 문자열 로 매칭을 처리한다.

예제 4-14 : 특정 문자 세기 및 찾기

특정 문자열 내에 동일한 문자가 몇 개 있는지를 확인하기 위해 count 메서드를 이용해서 특정 문자를 확인하면 총 개수가 나온다.

```python
In : s = "특정 문자 찾기를 한다. 찾은 문자는"
```

print(s.count("찾"))

```python
Out: 2
```

문자열 내의 특정 문자를 찾을 때 사용하는 find 메서드가 있다. 특정 문자 하나를 찾아서 위치 정보를 반환한다. 문자열 내에 찾으려는 문자가 여러 개 있을 경우는 검색을 시작할 인덱스를 넣어서 위치 정보를 검색해야 한다.

```python
In : s = "특정 문자 찾기를 한다. 찾은 문자는"
```

print(s.find("찾")) print(s[s.find("찾")]) print(s.find("찾", 7))

```python
Out: 6
찾
```

우측부터 검색할 경우 rfind 메서드가 있다. 마찬가지로 첫 번째는 바로 찾을 수 있다. 그 다음을 검색해서 찾을 경우 시작과 끝을 넣어서 하나의 슬라이스를 만들고 그 내부에서 검 색하면 된다.

```python
In : print(s.rfind("찾"))
```

print(s[s.rfind("찾")]) print(s.rfind("찾", 0,10))

```python
Out: 14
찾
```

특정 문자를 검색해서 index도 find 메서드와 동일하게 처리한다.

```python
In : s = "특정 문자 찾기를 한다. 찾은 문자는"
```

print(s.index("찾")) print(s[s.index("찾")]) print(s.index("찾", 7))

```python
Out: 6
찾
```

우측부터 검색하는 rindex 메서드도 rfind 메서드와 유사하게 처리되는 것을 알 수가 있다.

```python
In : print(s.rindex("찾"))
```

print(s[s.rindex("찾")]) print(s.rindex("찾", 0,10))

```python
Out: 14
찾
```

예제 4-15 : 문자열 패턴 매칭하기

문자열로 작성된 문자를 체크해서 매칭된 경우에 True 결과가 나온다. 특히 제어문에 넣 어 사용하면 문자열에 대한 조건을 점검할 수 있다.

문자열의 네임스페이스 내 정보를 dir 함수로 받으면 리스트로 제공하고 내부의 원소를 문 자열로 표시한다.

```python
In : s = dir(str)
print(type(s))
print(s[0])
Out: <class 'list'>
__add__
```

문자열이 가지는 속성 내에서 스페셜 속성과 메서드를 제외해서 출력을 하고 싶을 경우 스 페셜 속성과 메서드의 이름에는 앞과 뒤에 “_ _”가 붙어 있으므로 시작하는 문자 매칭을 “_ _”로 처리하는 startswith 메서드를 사용한다.

문자열이 “_ _”로 시작되는 경우만 if문에서 True로 처리되므로 이를 출력한다. Print문에 end=“ ”을 지정했기에 라인별로 출력을 하지 않고 한 줄에 여러 개를 출력한다. 특정 개 수 출력 후 print문에 인자 없이 출력하면 다음 라인으로 넘어가서 그 다음 출력은 다음 줄 에 출력되는 것을 알 수 있다.

```python
In : count = 1
for i in s :
if i.startswith("__") :
continue
else :
print(i, end=" ")
if count % 6 == 0 :
print()
count += 1
Out: capitalize casefold center count encode endswith
expandtabs find format format_map index isalnum
isalpha isdecimal isdigit isidentifier islower isnumeric
isprintable isspace istitle isupper join ljust
lower lstrip maketrans partition replace rfind
rindex rjust rpartition rsplit rstrip split
splitlines startswith strip swapcase title translate
upper zfill
```

마지막 문자열에 “_ _””으로 되어 있는 문자열에 매칭되는 경우를 처리하기 위해 ends with 메서드를 사용한다. 스페셜 속성과 메서드들을 출력하는 것을 볼 수 있다.

```python
In : count = 1
for i in s :
if i.endswith("__") :
print(i, end=" ")
else :
continue
if count % 6 == 0 :
print()
count += 1
Out: __add__ __class__ __contains__ __delattr__ __dir__ __doc__
__eq__ __format__ __ge__ __getattribute__ __getitem__ __getnewargs__
__gt__ __hash__ __init__ __init_subclass__ __iter__ __le__
__len__ __lt__ __mod__ __mul__ __ne__ __new__
__reduce__ __reduce_ex__ __repr__ __rmod__ __rmul__ __setattr__
__sizeof__ __str__ __subclasshook__
```

✚ 문자열을 분리 및 문자열 결합

메서드 split은 문자열을 분리하려면 문자열 분리자를 인자로 넣어서 분리자별로 리스트 의 원소로 구성한다. 메서드 join은 분리자를 문자열로 정하고 리스트를 인자로 받아 리스 트의 원소를 분리자별로 나눠 문자열로 변경한다.

예제 4-16 : 빈 문자열로 분리하고 결합

문자열 내에서 단어별로 분리하기 위해서는 공백으로 분리하는 것이 가장 편하다. Split 메서드의 인자에 공백을 주면 문자열 사이의 공백을 기준으로 분리해서 리스트의 원소로 넣어 처리하는 것을 볼 수 있다.

```python
In : s = "빈 문자열로 분리하고 결합하기"
ss = s.split(" ")
print(ss)
Out: ['빈', '문자열로', '분리하고', '결합하기']
```

리스트 내에 원소들이 문자열로 된 경우에는 공백 문자열을 기준으로 join 메서드를 사용 하면 리스트의 원소들을 하나로 연결하면서 중간에 공백을 넣어 연결한다.

```python
In : sl = " ".join(ss)
print(sl)
Out: 빈 문자열로 분리하고 결합하기
```

예제 4-17 : 개행 문자가 있는 경우 문자열을 라인 단위로 분리

여러 문장을 처리하는 문자열(“”” “””,’’’ ‘’’)을 처리할 때는 라인을 기준으로 분리도 가능하다.

일단 개행 문자(“\”)를 기준으로 split 메서드를 사용해서 분리하면 하나의 라인 단위로 분 리되어 리스트에 원소로 들어간다.

```python
In : import pprint
s ="""A simple object subclass
that provides attribute access
to its namespace,
as well as a meaningful repr."""
ss = s.split("\n")
pprint.pprint(ss)
Out: ['A simple object subclass ',
'that provides attribute access ',
'to its namespace, ',
'as well as a meaningful repr.']
```

라인 단위로 분리된 리스트를 가지고 결합할 때 슬라이스를 사용해서 특정 원소 단위로 나 누고 결합해서 사용할 수 있다.

```python
In : sl1 = " ".join(ss[:2])
print(sl1)
sl2 = " ".join(ss[2:])
print(sl2)
Out: A simple object subclass that provides attribute access
to its namespace, as well as a meaningful repr.
✚ 문자열 길이
```

여러 원소를 가지고 만들어진 문자열이기 때문에 길이를 확인하면 문자 단위로 원소를 표 시한다.

이때 사용하는 함수는 len이며 문자열의 원소 개수를 출력한다.

예제 4-18 : 길이 확인하기

문자열의 길이는 문자열 내부에 있는 모든 문자들 개수의 합이다. 유니코드로 처리하므로 한글도 하나의 문자로 처리되어 문자열의 길이를 계산할 때 한글 문자도 하나씩 증가하는 것을 확인할 수 있다.

```python
In : s = "문자열 검색"
print(len(s))
sa = " string indexing"
print(len(sa))
Out: 6
```

문자열을 인덱스로 확인하면 한글도 하나의 문자로 처리된다.

```python
In : s = "문자열 검색"
print(s[0])
print(s[1])
Out: 문
자
```

역방향으로 검색하기 위해 음수로 인덱스를 넣어도 한글은 문자 단위로 검색되는 것을 알 수 있다.

```python
In : s = "문자열 검색"
print(s[-1])
print(s[-2])
Out: 색
검
```

✚ 문자열(str)에서 bytes로 전환하기

유니코드가 파이썬 3.0에서 문자열로 반영되었기에 바이트 단위로 관리하는 별도의 자료 형이 필요하다. 바이트는 문자 단위가 아닌 바이트 단위로 관리하므로 문자의 길이가 보 는 것과 달라진다.

문자열과 바이트는 관리 기준이 다르므로 변환을 하기 위해 인코딩 처리한다.

예제 4-19 : 암호화(encode)와 복호화(decode) 기준

문자열에서 바이트로 인코딩해서 변환하는 것을 암호화라고 하고 이 암호화는 문자열 내 의 encode 메서드로 수행한다. 유니코드 문자열을 바이트로 변환할 때 바이트 길이가 다

르게 변하므로 한글을 바이트 코드로 바꿀 때 인코딩을 utf-8로 지정하면 한글이 3bytes 로 변경되는 것을 알 수 있다.

```python
In : s = "성균관대학교"
print(len(s))
sb = s.encode("utf-8")
print(len(sb))
print(sb)
Out: 6
b'\xec\x84\xb1\xea\xb7\xa0\xea\xb4\x80\xeb\x8c\x80\xed\x95\x99\xea\
xb5\x90'
```

바이트 자료형에서 문자열 자료형으로 변환은 복호화한다고 하고 이를 처리하기 위해서는 바이트 자료형에 있는 decode 메서드를 이용한다.

```python
In : sc = sb.decode("utf-8")
print(len(sc))
print(sc)
Out: 6
성균관대학교
```

문자 코드를 관리하는 유니코드에는 다른 인코딩 방식이 있다. utf-16으로 처리를 한다는 것은 문자 코드가 2바이트 단위로 처리된다는 것이다. 이 중에 두 바이트 코드를 앞과 뒤 에 어떻게 배열할지 결정한다. 특히 유니코드의 기준 언어들이 관리 키인 평면을 뒤에 놓 고 그 안에 문자의 위치를 앞에 처리하는 구조가 리틀 엔디언이다.

기본으로 utf-16으로 처리하면 리틀엔디언으로 표시된다. 첫 번째 코드에 hex 값으로 문 자가 처리된 정보를 fffe로 보여준다.

```python
In : s = "성균관대학교"
print(s[0].encode("utf-16"))
sb = s.encode("utf-16")
print(sb)
print(sb.decode("utf-16"))
Out: b'\xff\xfe1\xc1'
b'\xff\xfe1\xc1\xe0\xad\x00\xad\x00\xb3Y\xd5P\xad'
성균관대학교
In [12]:
```

인코딩 기준을 utf-16으로 주면 리틀 엔디언으로 처리하라고 명기했기에 utf-16에 맨 앞 에 표시된 바이트 생성 규칙이 없이 변환된다.

특히 유니코드로 한글 “성”자는 uc131이다. 리틀 엔디언으로 표시하면 31c1으로 처리된 것을 알 수 있다. 출력된 것을 보면 숫자 1이 출력되었다. 숫자 1은 아스키 코드이므로 31 이라는 것을 알 수 있다.

```python
In : s = "성균관대학교"
print(s[0].encode("utf-16le"))
print('\uc131')
sb = s.encode("utf-16le")
print(sb)
print(sb.decode("utf-16le"))
성
b'1\xc1'
b'1\xc1\xe0\xad\x00\xad\x00\xb3Y\xd5P\xad'
성균관대학교
```

인코딩을 utf-16으로 하면 변환된 바이트 순서를 빅 엔디언 처리한다. 유니코드에서 정한 그대로 출력되는 한글 성이라는 유니코드 uc131과 동일한 헥사값을 가지도록 처리된 결 과를 확인할 수 있다.

s = "성균관대학교" print(s[0].encode("utf-16be")) print('\uc131') sb = s.encode("utf-16be") print(sb) print(sb.decode("utf-16be")) b'\xc11' 성 b'\xc11\xad\xe0\xad\x00\xb3\x00\xd5Y\xadP' 성균관대학교
