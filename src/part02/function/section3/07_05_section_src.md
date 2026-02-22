---
layout: default
title: "07.05 파이썬"
---

# 07.05 파이썬

파이썬에서 함수를 정의하고 함수 내에 함수를 정의해서 사용하는 법을 알아봤으며, 익명 함수를 지정해서 함수를 표현식으로 사용도 해봤다.

이제 자주 사용하는 기능을 함수로 만들어서 기본으로 제공하는 방법도 알아봐야 할 때 이다.

내장으로 제공한다는 것은 파이썬에서는 _ _builtins_ _ 모듈에 들어 있는 함수라는 것을 알려주는 것이다. 일단 제공되는 함수들부터 어떻게 작동하는지를 알아본다.

## 7.5.1 계산 및 문자 변환 내장 함수

기본적인 계산과 문자 등을 변환하는 것들을 함수로 제공한다.

✚ 수치 계산 내장 함수

합, 반올림, 절댓값, 제곱, 몫과 나머지 등을 구하는 함수를 내장 함수로 제공한다.

예제 7-31 : Sequence 자료형 합 구하기 : sum

숫자만을 원소로 갖는 리스트나 튜플을 가지고 합산하면 순환문 없이 전체를 합산해서 처 리하는 것을 알 수 있다. 내장 함수도 함수이므로 하나의 클래스로 만들어져 있다.

파이썬 내부적으로 내장 함수는 builtin_function_or_method 클래스의 인스턴스라는 것을 알 수 있다.

```python
In : print(type(sum))
Out: <class 'builtin_function_or_method'>
```

두 번째 인자로 초기값을 주면 이 초기값까지 합한 결과를 보여주는 것을 알 수 있다.

```python
In : print(sum([1,2,3,4]))
print(sum([1,2,3,4],5))
Out: 10
```

리스트 내의 원소가 2개의 숫자로 된 튜플로 구성되어 이를 정렬하기 위해 특정 함수를 이 용할 때 이 sum 함수를 키에 넣고 정렬하면 두 튜플을 합산한 순서대로 정렬을 하는 것을 알 수 있다.

```python
In : l = [(1,2),(7,9),(3,4)]
l.sort(key=sum)
print(l)
Out: [(1, 2), (3, 4), (7, 9)]
```

예제 7-32 : 소수점 조정 및 몫과 나머지 구하기

두 함수 round, divmod는 내장 함수이다.

```python
In : print(type(round))
print(type(divmod))
Out: <class 'builtin_function_or_method'>
<class 'builtin_function_or_method'>
```

내장 함수 round에 인자에는 실수를 넣고 두 번째 인자에는 소수점 이하의 자리를 지정해 서 처리할 수 있도록 한다.

두 번째 인자가 없으면 소수점 자리가 0이리고 인식하므로 정수라는 것을 알 수 있다.

소수점에서 반올림이 가능할 경우에는 반올림을 하지만 반올림이 필요 없는 경우에는 버 림으로 처리한다.

```python
In : f = 100.123456789
print(round(f))
print(round(f,3))
print(round(f,5))
Out: 100
100.123
100.12346
```

다음은 몫과 나머지를 구하는 함수인 divmod를 알아본다. 이 함수는 나눗셈인 floordivide와 나머지를 구하는 mode를 합쳐서 하나로 계산을 하는 것이다.

이 함수로 계산한 것과 //, %로 구한 값이 같은지를 확인하면 동일한 값이 나오는 것을 알 수 있다.

```python
In : d = 100
n = 23
print(divmod(d,n))
print(d // n)
print(d % n)
Out: (4, 8)
```

예제 7-33 : 절댓값, 제곱 구하기

절댓값은 부호가 음수인 경우 이를 양수로 바꾸어주는 절댓값 처리 함수이다.

```python
In : print(type(abs))
print(abs(-100))
Out: <class 'builtin_function_or_method'>
```

복소수일 경우에는 실수와 허수부를 각각 제곱하고 이를 더해서 sqrt로 처리한 결과와 동 일한 것을 알 수 있다.

```python
In : print(abs(3+4j))
Out: 5.0
```

제곱을 지원하는 함수에 대해 알아보자.

```python
In : print(type(pow))
Out: <class 'builtin_function_or_method'>
```

제곱을 처리하는 pow 내장 함수와 math 모듈 내의 pow 함수를 비교해서 동일한 처리가 되는지도 확인해보겠다. 이 함수의 세 번째 인자가 들어가면 mode 값의 결과가 반환되는 것을 알 수 있다.

```python
In : import math
print(pow(10,2))
print(pow(10,2,3))
print(math.pow(10,3))
Out: 100
1000.0
```

제곱을 유리수로 표시하면 제곱근과 처리하는 방식이 동일하므로 math.sqrt로 처리해도 동일한 결과를 볼 수 있다.

```python
In : import math
print(pow(10,1/2))
print(math.sqrt(10))
Out: 3.1622776601683795
3.1622776601683795
```

예제 7-34 : 숫자를 문자로 문자를 숫자로 변환하기

내장 함수 ord, chr의 타입을 확인해본다. 내장 함수로 만들어진 것을 확인한다.

```python
In : print(type(ord))
print(type(chr))
Out: <class 'builtin_function_or_method'>
<class 'builtin_function_or_method'>
```

문자열이 유니코드로 변경되면서 한글과 영문 모두 숫자로 변환이 가능하다.

먼저 영어를 숫자로 변경하기 위해 map 함수를 이용해서 들어온 문자열을 전부 ord 함수 를 통해 숫자로 변경해서 리스트로 전환했다.

```python
In : s = "IwanttoknowPython "
l = list(map(ord,s))
print(l)
ls = "".join(list(map(chr,l)))
print(ls)
Out: [73, 119, 97, 110, 116, 116, 111, 107, 110, 111, 119, 80, 121, 116,
104, 111, 110, 32]
IwanttoknowPython
```

일단 한글로 된 글자를 숫자로 변경하고 이를 다시 문자로 변경해도 처리하는 방식이 동일 하다. 하지만 숫자의 크기가 더 큰 것을 알 수 있다.

```python
In : s = "알아보고싶은파이썬"
l = list(map(ord,s))
print(l)
ls = "".join(list(map(chr,l)))
print(ls)
Out: [50508, 50500, 48372, 44256, 49910, 51008, 54028, 51060, 50028]
알아보고싶은파이썬
```

예제 7-35 : 논리식의 결과로 처리하기

파이썬 내의 원소들 중에 모두 불리언으로 평가했을 때 참과 거짓으로 구분을 할 수 있다.

이런 것을 처리할 수 있도록 내장 함수 any와 all을 제공한다.

```python
In : print(type(any))
print(type(all))
Out: <class 'builtin_function_or_method'>
<class 'builtin_function_or_method'>
```

먼저 any, all 함수에 원소가 있는 리스트를 확인해보면 하나라도 참인 원소가 있을 경우 any 함수는 True를 표시한다. 모두 참인 표현을 가진 리스트가 있을 경우는 all에서 참을 표시하지만 거짓인 0이 들어오면 False로 표시한다.

빈 리스트를 처리하면 생각과는 달리 any일 경우는 False 즉 모든 원소가 거짓으로 처리 된다. 하지만 all은 True로 처리하면 리스트라는 객체만을 인지해서 처리가 되므로 True 로 표시한다.

```python
In : print(any([]))
print(any([1,0,0]))
print(all([]))
print(all([1,2,0]))
Out: False
True
True
False
```

하지만 리스트 내의 원소가 None일 경우는 논리적으로 거짓이므로 False가 나온다.

```python
In : print(any([None]))
print(all([None]))
Out: False
False
```

빈 딕셔너리가 있을 때도 any 함수는 거짓이고 all은 참을 표시하는 것을 볼 수 있다. 그리 고 딕셔너리에 원소가 들어가면 전부 참으로 표시한다.

```python
In : print(any({'a':None}))
print(any({}))
print(all({'a':None}))
print(all({}))
Out: True
False
True
True
```

또한 빈 문자열일 경우도 동일한 처리가 나오는 것을 알 수 있다.

```python
In : print(any(""))
print(all(""))
Out: False
True
```

## 7.5.2 정렬 내장 함수 이해하기

함수를 처리할 때 인자를 함수로 받으면 고차 함수 처리 규칙을 따르며 고차 함수는 함수 형 프로그래밍을 설명할 때 자세히 다루겠다. 정렬 함수도 key라는 인자에 함수를 받아서 이 함수가 실행된 결과에 맞춰 정렬을 처리한다.

예제 7-36 : 정렬 함수 sorted

정렬하는 내장 함수이다.

```python
In : print(type(sorted))
Out: <class 'builtin_function_or_method'>
```

아무런 인자를 주지 않으면 문자열의 순서대로 올림차순으로 정렬하고 기존 리스트는 가 만히 두고 새로운 리스트 인자를 만들어서 반환한다.

```python
In : l = ['abc', 'bc', 'a']
s = sorted(l)
print(s)
Out: ['a', 'abc', 'bc']
```

역순으로 정렬을 하기 위해 reverse=True를 키워드 인자로 놓고 실행하면 역순으로 처리 되는 것을 볼 수 있다, 일단 첫 번째 자리의 문자를 비교하고 그 다음에 두 번째 문자열을 비교해서 순서를 정하 는 것을 확인할 수 있다.

```python
In : l = ['abc', 'bc', 'a']
s = sorted(l,reverse=True)
print(s)
Out: ['bc', 'abc', 'a']
```

특정 함수를 이용하려면 key=len으로 len 함수를 제공한다. 내부에 구성된 문자열의 원 소 개수를 보고 올림차순으로 정렬해서 보여준다.

```python
In : l = ['abc', 'bc', 'a']
s = sorted(l,key=len)
print(s)
Out: ['a', 'bc', 'abc']
```

리스트 자료형에는 정렬을 처리하는 sort 메서드는 리스트 내부를 수정해서 처리하므로 내장 함수 sorted는 새로운 리스트를 만드는 것이 차이점이다.

```python
In : l = ['abc', 'bc', 'a']
l.sort()
print(l)
Out: ['a', 'abc', 'bc']
In : l = ['abc', 'bc', 'a']
l.sort(reverse=True)
print(l)
Out: ['bc', 'abc', 'a']
In : l = ['abc', 'bc', 'a']
l.sort(key=len)
print(l)
Out: ['a', 'bc', 'abc']
```

## 7.5.3 임의의 문자열을 문장으로 평가하기 : exec

파이썬에서 문자열로 작성된 문장을 평가하는 것을 알 수 있다. 문장을 문자열로 정의해 서 처리하는 것을 알아본다.

예제 7-37 : 문자열을 바로 실행하기

내장 함수 여부를 확인한다.

```python
In : print(type(exec))
Out: <class 'builtin_function_or_method'>
```

하나의 문자열 안에 할당문을 문자열로 정의하고 이를 exec 함수로 처리하면 변수에 할당 이 되는지를 확인해 볼 필요가 있다.

모듈에서 정의했으므로 전역 네임스페이스에서 exec 함수가 실행된 다음에 문자열 내에 정의된 변수가 할당되어 있는지를 확인한다. Globals 함수를 실행한 결과의 딕셔너리에 이 변수명을 주고 조회해보니 동일한 결과가 나오는 것을 알 수 있다.

```python
In : s = "exec_a = '변수에 할당하기'"
exec(s)
print(globals()["exec_a"])
Out: 변수에 할당하기
```

특정 변수에 특정 값을 더해서 할당하는 계산식 문장을 문자열로 정의해서 변수에 할당 했다.

이 문자열을 처리하기 전에 변수를 할당하는 것을 정의했다. 이를 exec 함수로 실행하고 결과를 전역 네임스페이스에 검색하면 이 문자열을 실행한 결과가 확인되는 것을 알 수 있다.

```python
In : s = "a_e = a_e + 100"
a_e = 100
exec(s)
print(globals()["a_e"])
Out: 200
```

함수를 문자열 내에 정의했다. 이를 exex 함수로 실행하면 함수 정의문이 실행된 것을 알 수 있다.

이 함수를 전역 네임스페이스에서 호출해서 처리하나 전역 네임스페이스에 등록된 이름을 직접 변수로 작성해서 호출해도 동일하게 처리되는 것을 알 수가 있다.

```python
In : s = """
def add_exec(x,y) :
return x+y
"""
exec(s)
print(globals()["add_exec"])
print(globals()["add_exec"](10,10))
print(add_exec(20,20))
Out: <function add_exec at 0x00000000050809D8>
In [95]:
```

주피터 노트북을 가지고 %%writefile로 하나의 파이썬 모듈을 만든다. 이 모듈은 하나의 문자열이 있고 그 내부에 하나의 함수 정의문이 있다.

이 모듈이 로딩되고 exec 함수가 실행되며 이 모듈 내에 add_exec 함수가 만들어지는 것 을 알 수 있다.

```python
In : %%writefile exec_add.py
s = """
def add_exec(x,y) :
return x+y
"""
exec(s)
Out: Writing exec_add.py
```

이 모듈을 import하고 이 내부의 add_exec 함수를 호출하면 값이 실행되는 것을 알 수 있다.

런타임에 exec를 처리한다는 것은 exec 로딩 타임에도 모듈에 함수가 로딩되는 것이다.

```python
In : import exec_add
print(exec_add.add_exec(20,30))
Out: 50
```

예제 7-38 : 컴파일에서 eval, exec 실행을 지정한 후 나중에 실행하기

문자열을 평가되어 처리하기 위해서는 내장 함수인지를 확인한다.

```python
In : print(type(compile))
print(type(eval))
Out: <class 'builtin_function_or_method'>
<class 'builtin_function_or_method'>
```

하나의 클래스를 문자열에 넣어 compile해서 하나의 변수에 할당을 했다. 변수에 할당하 면 나중에 이 변수에 저장된 것을 사용할 수 있다.

이 함수에 문자열과 빈 파일을 지정하고 제일 마지막에 실행할 함수를 문자열로 제공 한다. 이 변수에 할당된 것을 확인하면 code 객체라는 것을 알 수 있다.

```python
In : sc = """
class Person :
def __init__(self,name) :
self.name = name
def getname(self) :
return self.name
"""
ex = compile(sc,"fakefile",'exec')
print(ex)
Out: <code object <module> at 0x10ddfd6f0, file "fakefile", line 2>
```

이 eval을 실행하면 하나의 클래스가 로딩된다.

이 클래스를 가지고 하나의 인스턴스를 만들면 p 변수에 할당된다. 내부에 있는 메서드를 실행하면 생성자에서 만들어지는 이름을 출력하는 것을 확인할 수 있다.

```python
In : eval(ex)
```

p = Person("정찬혁") print(p.getname())

```python
Out: 정찬혁
```

위의 클래스 생성자를 문자열에 넣고 이를 컴파일해서 eval로 처리하려고 했다. 이를 eval 함수를 이용해서 실행한 후에 다시 메서드로 처리하면 값이 실행되는 것을 알 수 있다.

```python
In : sv = "Person('박세본')"
ev = compile(sv,"fakefile",'eval')
b = eval(ev)
print(b.getname())
Out: 박세본
```

## 7.5.4 input 함수 처리

파이썬도 표준 입력을 이용해서 간단히 처리할 수 있는 함수를 만들어 제공한다. 프로그 램에서 input 함수를 지정하면 표준 입력이 들어올 때까지 프로그램이 멈춰 있는다. 특히 개발 도구에서 입력을 받아 처리하고자 할 때 이 함수를 이용해서 테스트를 하면 좋다.

예제 7-39 : 약수 구하기

이 함수는 하나의 수를 받아서 이 숫자가 나눠져 결과가 0으로 나오는 것을 확인할 수 있다. 이렇게 처리하는 것은 약수를 구하는 방법이다. 이를 집합에 넣어서 반환한다.

```python
In : def common_div(x) :
s = set()
for i in range(1,x+1) :
if x % i == 0 :
s.add(i)
return s
```

두 수 10과 5를 input 함수로 받는다. 이 함수는 표준 입출력이기 때문에 문자열로 처리되 는 것을 알 수 있다. 이 문자열을 정수로 처리하면 형 변환이 일어나는 것을 알 수 있다.

받은 수의 약수를 구하도록 해서 이 약수를 가지고 교집합으로 처리하면 이것을 공약수로 표시한다.

```python
In : a = int(input(" 수를 입력하세요"))
ass = common_div(a)
```

b = int(input(" 수를 입력하세요")) bss = common_div(b) print(ass) print(bss) print((ass & bss))

```python
Out: 수를 입력하세요10
수를 입력하세요5
{1, 2, 10, 5}
{1, 5}
{1, 5}
```

공약수를 가지고 최대 공약수를 구하는 방법을 알아보자. 아래처럼 함수를 만들어서 두 수를 input 함수로 받고 gcd 함수를 수행하면 최대 공약 수가 나오는 것을 확인할 수 있다. 이 최대 공약수는 반환문에 자기 자신의 함수를 호출 한다. 재귀 순환을 해서 서로 동일한 공약수가 나올 수 있도록 처리하고 결과를 반환한다.

```python
In : a = int(input(" 수를 입력하세요 "))
```

b = int(input(" 수를 입력하세요 ")) print(a,b) def gcd(p, q) :

print(p,q) if (q == 0) :

return p; return gcd(q, p%q) print(" 최대 공약수 ",gcd(a,b))

```python
Out: 수를 입력하세요 10
수를 입력하세요 5
10 5
10 5
5 0
최대 공약수 5
```
