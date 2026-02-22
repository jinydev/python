---
layout: default
title: "22.02 JSON"
---

# 22.02 JSON

JSON과 파이썬 간에 변환을 하고 이를 파일에 저장한 뒤 저장된 파일을 읽어와서 다시 변 환을 하는 방법을 알아보겠다.

## 22.2.1 파일 처리

JSON 모듈에서 dump/load 함수를 이용해서 파일에 저장하고 읽어오는 과정을 처리해 보겠다.

예제 22-5 : 임시 파일 처리

임시적인 파일을 처리하기 위해 StringIO에서도 JSON이 변경이 되는지를 알아보자. dump 함수로 저장하고 이를 다시 읽은 다음 파이썬 객체로 처리되는 load 함수를 이용 해서 확인해보면 파일과 거의 동일하게 처리되는 것을 확인할 수 있다.

```python
In : from io import StringIO
import json
io = StringIO()
json.dump(['streaming API'], io)
print(io.getvalue())
io = StringIO(io.getvalue())
print(type(io))
print(json.load(io))
Out: ["streaming API"]
<class '_io.StringIO'>
['streaming API']
```

예제 22-6 : 파일 처리

파이썬 딕셔너리를 하나 지정하고 JSON 문자열 dumps로 지정한 뒤 이를 다시 파이썬으 로 변환해서 출력해본다.

```python
In : import json
data = {
'name' : 'Song',
'shares' : 100,
'price' : 542.23
}
json_str = json.dumps(data)
print(json_str)
data = json.loads(json_str)
print(data)
Out: {"name": "Song", "shares": 100, "price": 542.23}
{'name': 'Song', 'shares': 100, 'price': 542.23}
```

하나의 JSON 파일을 만들어서 dump로 지정한 뒤 JSON으로 변환한 것을 저장한다.

```python
In : with open('data.json', 'w') as f:
json.dump(data, f)
```

다시 load 함수로 읽어와서 출력하면 동일한 결과가 출력되는 것을 알 수 있다.

```python
In : with open('data.json', 'r') as f:
data = json.load(f)
print(data)
Out: {'name': 'Song', 'shares': 100, 'price': 542.23}
```

임의의 JSON으로 된 문자열을 파일로 저장한 후에 load 함수로 호출하고 이를 파이썬으 로 전환해서 처리할 수 있다. 파일에 저장된 것은 기본적으로 문자열로 되어 있기에 가능 한 것이다.

```python
In : import json
f = open("file_txt.json",'w+')
f.write('[{"a": "A", "c": 3.0, "b": [2, 4]}]')
f.flush()
f.seek(0)
a = json.load(f)
print(type(a))
print(a)
f.close()
Out: <class 'list'>
[{'a': 'A', 'c': 3.0, 'b': [2, 4]}]
```

## 22.2.2 한글 처리

파이썬 내에서 한글로 처리된 부분을 JSON으로 변환한 것을 확인하면 uft-8로 변환된다.

다시 파이썬으로 변환하면 한글이 제대로 보이는 것을 볼 수 있다.

예제 22-7 : 한글 처리

파이썬에서 한글로 데이터를 넣고 JSON으로 변환해서 파일에 저장한다.

```python
In : import pprint
import json
book = {}
```

book['title'] = '한글로 처리하기' book['tags'] = ('파이썬', 'Kindle', 'Light') book['published'] = True book['comment_link'] = None book['id'] = 1024 with open('ebook.json', 'w') as f:

json.dump(book, f) 이 파일을 읽어와서 출력하면 한글이 유니코드로 보이는 것을 알 수 있다.

```python
In : with open('ebook.json', 'rt') as f:
book = json.load(f)
print(json.dumps(book,indent=4))
Out: {
"title": "\ud55c\uae00\ub85c \ucc98\ub9ac\ud558\uae30",
"tags": [
"\ud30c\uc774\uc36c",
"Kindle",
"Light"
],
"published": true,
"comment_link": null,
"id": 1024
}
```

JSON dump한 부분에 대한 한글을 유니코드 문자열에서 한글 표시 문자열로 보기 위해 pprint 함수로 출력하면 한글로 변환해서 처리되는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(book)
Out: {'comment_link': None,
'id': 1024,
'published': True,
```

'tags': ['파이썬', 'Kindle', 'Light'], 'title': '한글로 처리하기'} 유니코드로 처리되어 있기 때문에 내부 속성에 직접 접근해서 한글로 표시되는 것을 알 수 있다.

```python
In : book["title"]
Out: '한글로 처리하기'
CHAPTER
CSV
```

파이썬에서 엑셀 등을 처리하고 데이터를 특정 포맷으로 처리가 가능하다. 이때 많이 사 용되는 파일 구조가 CSV이다. CSV란 Comma-separated values의 약자로서 CSV 파일 은 각 라인의 컬럼들이 콤마로 분리된 텍스트 파일 포맷이다.
