---
layout: default
title: "20.02 정규"
---

# 20.02 정규

앞에서 기본적인 함수나 메서드를 간단히 실행해봤다. 이제 정규 표현식 모듈을 확인해서 내부에 있는 객체를 알아보고 세부적인 기능에 대해 알아보겠다.

20.2.1. 컴파일 함수 간단하게 패턴을 컴파일해서 이때 생긴 패턴의 인스턴스를 가지고 패턴 매칭을 해봤다.

컴파일할 때 추가적인 인자를 처리할 때 어떤 추가적인 기능이 처리되는지를 확인해보 겠다.

✚ 정규 표현식 - 컴파일 함수

정규 표현식 패턴을 만들어서 이를 사용하고 적용하기 위해서 추가적인 인자를 넣어서 처 리하는 방법을 알아보겠다.

예제 20-16 : 컴파일 함수에서 패턴 제어하기

특정 문자에 대해 개행 문자도 포함해서 처리할 수 있도록 인자로 추가할 수 있다. 이때 인자로 넣을 때 표기법은 re.DOTALL, re.S이다.

패턴을 지정할 때 “.ake”로 정의했다. 문자열에 개행 문자를 넣어서 패턴 매칭을 하면 매 칭이 되지 않는 것을 확인할 수 있다.

```python
In : import re
pattern = re.compile(".ake")
text = "\nake"
mat = re.match(pattern,text)
print(repr(mat.group()))
Out: ---------------------------------------------------------------------
AttributeError          Traceback (most recent call last)
<ipython-input-2-9f7875befca6> in <module>()
6 mat = re.match(pattern,text)
----> 8 print(repr(mat.group()))
AttributeError: 'NoneType' object has no attribute 'group'
```

컴파일에서 re.S를 넣어서 처리하면 문자열 내에서 개행 문자(\n)가 들어와도 패턴 매칭이 되어 처리가 된다.

```python
In : pattern = re.compile(".ake",re.S)
text = "\nake"
mat = re.match(pattern,text)
print(repr(mat.group()))
Out: '\nake'
```

re.IGNORECASE, re.I 인자는 대소문자에 관계없이 매치할 수 있도록 패턴을 구성하라 는 뜻이다. 소문자을 인식하는 패턴을 만들었을 때 문자열은 대문자가 들어와 있다. 패턴 매칭이 되지 않아서 매칭된 결과가 없으므로 None으로 반환된다. group이라는 메서드가 없어서 예외가 발생하는 것이다.

```python
In : import re
pattern = re.compile("[a-z]+")
text = "Python"
mat = re.match(pattern,text)
print(mat.group())
Out: ---------------------------------------------------------------------
AttributeError        Traceback (most recent call last)
<ipython-input-4-b76a3350d6bd> in <module>()
6 mat = re.match(pattern,text)
----> 8 print(mat.group())
AttributeError: 'NoneType' object has no attribute 'group'
```

이를 해결하기 위해 컴파일 처리할 때 패턴이 소문자로만 만들어졌지만 두 번째 인자로 re.I를 지정해서 패턴 매칭한 결과가 출력되는 것을 알 수 있다.

```python
In : import re
pattern = re.compile("[a-z]+",re.I)
text = "Python"
mat = re.match(pattern,text)
print(mat.group())
Out: Python
```

re.MULTILINE, re.M 인자는 ^, $ 메타 문자의 사용과 관계가 있다. 옵션의 의미는 ^ - 문자열의 처음, $ - 문자열의 마지막이다.

^Hello인 경우 처음은 항상 "Hello"로 시작, Hello$라면 마지막은 항상 "Hello"로 끝나야 매치된다. 여러 줄의 텍스트가 들어왔지만 컴파일 옵션을 주지 않으면 첫 번째 줄만 처리 한다.

```python
In : import re
text = """Hello world
Hello dahl
Hello moon
"""
pattern = re.compile("^Hello\s\w+")
mat = re.findall(pattern,text)
print(mat)
Out: ['Hello world']
```

여러 줄의 문자열일 경우 라인별로 매칭이 필요가 있을 경우 컴파일할 때 이 옵션을 추가 해서 사용한다. 첫 문장이 Hello가 입력된 데이터를 받아서 findall 함수를 통해 Hello로 시작되는 패턴을 매핑한 결과를 보여준다. Re.M 옵션이 없을 경우는 한 문장만 매칭되는 것을 확인할 수 있다.

```python
In : import re
text = """Hello world
Hello dahl
Hello moon
"""
pattern = re.compile("^Hello\s\w+")
pattern = re.compile("^Hello\s\w+",re.M)
mat = re.findall(pattern,text)
print(mat)
Out: ['Hello world', 'Hello dahl', 'Hello moon']
```

re.VERBOSE, re.X 인자를 주면 패턴에 대한 주석 처리가 필요한 경우 verbose 모드를 사용해 주석을 달아서 정규 표현식을 보기 편하게 만들 수 있다.

주석을 달았지만 컴파일에 옵션이 넣어져 있어 주석은 무시하고 처리된다.

```python
In : import re
text = "100.123"
```

pat_text = """\d+ # 정수부 \. # 소수점 \d+ # 소수점이하 숫자""" pattern = re.compile(pat_text,re.VERBOSE) mat = re.findall(pattern,text) print(mat)

```python
Out: ['100.123']
```

아래의 예제는 동일한 내용이지만 하나는 주석이 없을 때 처리하는 경우이다.

```python
In : mport re
text = "100.123"
pattern = re.compile("\d+\.\d+")
mat = re.findall(pattern,text)
print(mat)
Out: ['100.123']
```

## 20.2.2 match objects 알아보기

이번에는 패턴이 매칭된 결과가 어떤 클래스로 만들어지는지를 알아보면 match object가 생기는 것을 알 수 있다.

예제 20-17 : compile, match 객체에 대한 속성과 메서드 조회하기

패턴을 컴파일하면 Pattern 클래스의 인스턴스가 만들어진다. 이 클래스의 내부 구조부터 알아보겠다.

일단 소문자로 된 문자들을 인식하기 위해 패턴을 [a-z]+로 만들어서 compile 함수에 넣 어 새로운 인스턴스를 생성한다.

```python
In : import re
pattern = re.compile('[a-z]+',re.I)
print(pattern)
print(type(pattern))
Out: re.compile('[a-z]+', re.IGNORECASE)
<class '_sre.SRE_Pattern'>
```

이 클래스에 속성과 메서드에서 스페셜 메서드를 제외한 것을 조회한다. 메서드들은 대부 분 모듈에 있는 함수들이 메서드로 들어와 있는 것을 알 수 있다.

```python
In : for i in dir(pattern) :
if not i.startswith("_") :
print(i)
Out: findall
finditer
flags
fullmatch
groupindex
groups
match
pattern
scanner
search
split
sub
subn
```

위에서 생성된 인스턴스를 가지고 내부의 속성을 확인하면 flags에 대한 정보는 숫자로 그 리고 pattern 속성은 패턴 문자열이 저장된 것을 알 수 있다.

```python
In : print(re.I)
print(pattern.flags)
print(pattern.pattern)
Out: RegexFlag.IGNORECASE
[a-z]+
```

패턴에 이름을 지정한 그룹으로 만들어서 처리했다.

```python
In : import re
pattern = re.compile('(?P<name>[a-z]+)',re.I)
print(pattern.flags)
print(pattern.pattern)
```

컴파일에서 만들어진 패턴 인스턴스 내의 search 매소드로 매칭된 결과를 가지는 Match 인스턴스를 만들었다.

```python
In : a = "python"
mat = pattern.search(a)
print(type(mat))
Out: <class '_sre.SRE_Match'>
```

이 인스턴스 내부의 속성과 메서드를 확인한다.

```python
In : for i in dir(mat) :
if not i.startswith("_") :
print(i)
Out: end
endpos
expand
group
groupdict
groups
lastgroup
lastindex
pos
re
regs
span
start
string
```

원본 문자열에서 검색을 시작하는 위치(pos), 원본 문자열에서 검색을 종료하는 위치 (endpos), start, end, span 메서드를 실행해도 동일한 정보가 나온다.

```python
In : print(mat.string)
print(mat.span())
print(mat.pos, mat.endpos)
print(mat.start(), mat.end())
Out: python
(0, 6)
0 6
0 6
```

매칭의 대상은 전체 그룹과 그룹 안에 있는 세부 정보를 확인했고 그룹에 이름이 있으므로 groupdict 메서드로도 출력이 된다. 마지막 그룹은 처리된 마지막 그룹 이름이 출력되고 마지막 인덱스는 그 그룹이 마지막에 처리된 인덱스의 위치를 알려준다.

```python
In : print(mat.groups())
print(mat.group(0))
print(mat.groupdict())
print(mat.lastgroup)
print(mat.lastindex)
Out: ('python',)
python
{'name': 'python'}
name
```

## 20.2.3 정규 표현식 검색 함수

정규 표현식 모듈에서 제공하는 주요 4개의 함수인 match, search, findall, finditer에 대해 자세히 알아보겠다. 이 함수들도 정규 표현식을 컴파일한 후 내부에 메서드가 있다.

사용법은 거의 동일하니 함수들을 이해하면 메서드도 동일하게 사용이 가능하다.

예제 20-18 : Match 함수 처리

문장을 처리할 때 패턴 내에 다양한 그룹이 있을 수 있다. 이때 각 그룹별로 처리된 결과 를 조회할 수 있다. 일단 그룹명을 부여하지 않았으므로 1부터 순서대로 group 메서드의 인자로 처리하면 조회되는 것을 확인할 수 있다.

```python
In : import re
text = "Artificial intelligence is wiser than man."
mat = re.match("(.*) is (.*)? (.*) (.*)",text)
print(mat.group())
print(mat.group(1))
print(mat.group(2))
print(mat.group(3))
print(mat.group(4))
print(mat.groups())
Out: Artificial intelligence is wiser than man.
Artificial intelligence
wiser
than
man.
('Artificial intelligence', 'wiser', 'than', 'man.')
```

그룹에 이름을 부여하고 groupdict 메서드로 호출하면 그룹명이 키로 처리되고 매칭된 결과가 값으로 처리된다.

```python
In : import re
```

name = "문 용준" mat = re.match("(?P<last>\w+)\W+(?P<first>\w+)", name) if mat:

d = mat.groupdict() print(d)

```python
Out: {'last': '문', 'first': '용준'}
```

예제 20-19 : search 함수 처리

매칭 함수와의 차이점은 시작부터 처리하는 것이 아니라 매칭되는 순간부터 패턴이 처리 된다.

```python
In : import re
```

value = "파이썬은 문법은 쉽지만 개념은 어렵다" m = re.search("(개념.*)", value) if m:

print("search:", m.group(1)) m = re.match("(개념.*)", value) if m:

print("match:", m.group(1)) else :

print(" mismatching ")

```python
Out: search: 개념은 어렵다
mismatching
```

패턴 그룹에 이름을 부여해서 search 함수로 패턴을 매칭시킨 후에 나온 결과를 가지고 groupdict 메서드에 그룹의 이름이나 숫자를 부여해서 조회했다.

```python
In : import re
list_ = ["dog dot", "do don't", "dumb-dumb", "no match"]
for element in list_:
m = re.search("(?P<first>d\w+)\W(?P<last>d\w+)", element)
if m:
print(m.groupdict())
Out: {'first': 'dog', 'last': 'dot'}
{'first': 'do', 'last': 'don'}
{'first': 'dumb', 'last': 'dumb'}
```

예제 20-20 : find 함수 처리들

함수 findall을 실행하면 실행 결과가 리스트로 출력된다.

```python
In : import re
```

pattern = "(향수|수향)." text = "향수 수향 향수 수향 " mat = re.findall(pattern, text) print(mat)

```python
Out: {'향수', '수향', '향수', '수향'}
```

모듈 내의 finditer 함수는 일단 반복자를 생성하고 호출할 때마다 매칭시킨 결과를 처리 한다. 매칭된 것을 group 메서드로 조회해서 결과를 볼 수 있다.

```python
In : import re
```

pattern = "(향수|수향)." text = "향수 수향 향수 수향 " mat = re.finditer(pattern, text) print(mat) for i in mat :

print(i.group())

```python
Out: <callable_iterator object at 0x0000000005A9ECF8>
향수
수향
향수
수향
```

## 20.2.4 문자열 변경/분할 함수

문자열 내의 특정한 문자를 변경하거나 특정 문자를 기준으로 분리할 때 사용하는 함수들 이다.

예제 20-21 : sub과 subn 함수 처리

정규 표현식 패턴에 맞는 경우에 대해 문자열을 변경해준다. 특정 단어를 지정해서 변경 될 문자를 인자로 전달하면 기존 문자열을 변경한다. 문자열 자료형 내의 replace 메서드 와 같은 기능을 처리한다.

```python
In : import re
```

text = "사랑이라는 한 소녀가 향수를 바르고 또 한 소년이 에프터쉐이브를 바르고 만나서" s = re.sub("한", "", text) print(s) print(text.replace("한", ""))

```python
Out: 사랑이라는 소녀가 향수를 바르고 또 소년이 에프터쉐이브를 바르고 만나서
```

사랑이라는 소녀가 향수를 바르고 또 소년이 에프터쉐이브를 바르고 만나서 Sub 함수에 변경될 값의 함수를 받아 함수의 실행 결과를 내부의 변경값으로도 사용이 가 능하다. 숫자로 구성된 문자열에 이 숫자들을 제공해서 결과를 다시 문자열로 처리할 수 도 있다.

보통 파일을 읽어서 처리할 때 내부가 문자열로 들어오므로 직접 값의 변경이 필요할 경우 이러한 패턴을 이용해서 변환도 가능하다.

```python
In : import re
def sequare(match) :
num = int(match.group())
return str(pow(num,2) )
s = re.sub("\d+", sequare, "1 2 3")
print(s)
Out: 1 4 9
```

subn 함수로 매칭되는 부분에 변경되는 횟수를 조정할 수 있다. 문자열의 변경도 변경되 는 횟수를 조정할 수 있다. Sub 함수와 다른 점은 결과를 튜플로 표시한다. 결과값과 변경 된 횟수가 동시에 나오는 것을 볼 수 있다.

```python
In : import re
```

text = "사랑이라는 한 소녀가 향수를 바르고 또 한 소년이 에프터쉐이브를 바르고 만나서" s = re.subn("한", "", text,1) print(s) print(text.replace("한", "",1))

```python
Out: ('사랑이라는 소녀가 향수를 바르고 또 한 소년이 에프터쉐이브를 바르고 만나서', 1)
```

사랑이라는 소녀가 향수를 바르고 또 한 소년이 에프터쉐이브를 바르고 만나서 CHAPTER XML XML(Extensible Markup Language)은 W3C에서 개발되어 특수한 목적을 갖는 마크업 언어 이다. 주로 다른 종류의 시스템, 특히 인터넷에 연결된 시스템끼리 데이터를 쉽게 주고받 을 수 있게 하여 HTML의 한계를 극복할 목적으로 만들어졌다.

✚ 알아볼 주요 내용

● XML 구조

● XML 내부 파싱 및 검색

● XML 문서에 대한 XPATH로 접근

● XML 문서 생성 및 파일 처리
