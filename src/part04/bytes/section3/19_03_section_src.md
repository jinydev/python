---
layout: default
title: "19.03 직렬화"
---

# 19.03 직렬화

파이썬 내의 객체를 그대로 파일에 저장했다가 다시 꺼내서 바로 처리하고 싶을 때가 있다. 이때 파이썬 객체를 그대로 저장했다가 꺼내서 처리해야 한다. 파이썬 객체를 바로 저장할 수 있는 직렬화를 지원하는 모듈이 pickle 모듈이다.

## 19.3.1 pickle 모듈 사용

Pickle 파일의 확장자는 pickle, pkl이므로 확장자를 보고 직렬화를 확인할 수도 있다.

예제 19-18 : 파이썬 객체를 pickle로 처리하기

리스트 내에 함수를 넣고 pickle.dump를 이용해서 직렬화해 파일에 저장한다. 이를 다시 pickle.load로 읽어와서 리스트 내의 함수를 실행해 처리한다.

```python
In : import pickle
import operator as op
l = [op.add,op.sub]
with open("obj.pickle", "wb") as f :
pickle.dump(l,f)
with open("obj.pickle", "rb") as f :
a = pickle.load(f)
print(a[0](5,6))
print(a[1](5,4))
Out: 11
```

문자열과 딕셔너리를 만들고 pickle 모듈을 이용해서 객체를 직렬화하여 파일에 저장 한다. 이 저장한 것을 차례대로 읽어오면 문자열과 딕셔너리를 불러온다. 문자열은 그대 로 출력하고 딕셔너리 내에 저장된 함수를 불러와서 실행한다.

```python
In : import pickle
import operator as op
s = "피클처리"
d = {'add':op.add}
with open("obj.pickle", "wb") as f :
pickle.dump(s,f)
pickle.dump(d,f)
with open("obj.pickle", "rb") as f :
a = pickle.load(f)
b = pickle.load(f)
print(a)
print(b["add"](10,10))
Out: 피클처리
```

예제 19-19 : pickle을 문자열로 할당하고 내부 생성된 값 보기

직렬화해서 파일에 저장하지 않고 문자열로 저장해도 처리가 가능하다. 문자열로 저장하 려면 Pickle 모듈의 dumps 함수를 사용하고 이 문자열을 읽어 다시 객체로 전환하려면 loads 함수로 처리한다.

```python
In : import pickle
import operator as op
l = [op.add,op.sub]
s = pickle.dumps(l)
print(s)
a = pickle.loads(s)
print(a)
print(a[0](5,6))
print(a[1](5,4))
Out: b'\x80\x03]q\x00(c_operator\nadd\nq\x01c_operator\nsub\nq\x02e.'
[<built-in function add>, <built-in function sub>]
```

객체를 직렬화해서 여러 개를 저장할 수 있다. 이것을 여러 번 다시 읽어서 직렬화를 할 수 있다. 문자열을 처리하든 객체를 처리하든 방식은 거의 동일하다.

```python
In : import pickle
import operator as op
s = "피클처리"
d = {'add':op.add}
ds = pickle.dumps(s)
ds = pickle.dumps(d)
print(ds)
a = pickle.loads(ds)
b = pickle.loads(ds)
print(a)
print(b["add"](10,10))
Out: b'\x80\x03}q\x00X\x03\x00\x00\x00addq\x01c_operator\nadd\nq\x02s.'
{'add': <built-in function add>}
CHAPTER
```

정규 표현식(regular expression) 이런 패턴 매칭을 처리하기 위해 만들어진 것이 정규 표현식이다. 파이썬에서도 모듈 re를 통해 지원한다.

정규 표현식 내에 있는 특정한 규칙을 배우고 문자열을 패턴 매칭해서 처리하는 방법을 알 아보겠다.

✚ 알아볼 주요 내용

● 메타 문자, 수량자

● 전후방 탐색 및 주석 처리

● 정규 표현 매칭 객체

● 패턴 compile, compile 인자

● 패턴 매칭 함수 : match, search, findall, finditer

● 패턴 변경 및 분리 : sub, subn, split
