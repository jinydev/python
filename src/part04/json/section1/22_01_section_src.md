---
layout: default
title: "22.01 JSON"
---

# 22.01 JSON

JSON 모듈은 파이썬을 가지고 JSON으로 변환하거나 JSON을 파이썬으로 변환하는 과정 의 함수들을 제공하므로 처리를 쉽게 할 수 있다.

일단 기본적으로 JSON과 파이썬 간의 문자열 단위로 변환이 되는 기준부터 확인해보 겠다.

## 22.1.1 JSON 인코딩/디코딩

파이썬 내의 자료형과 JSON이 가진 자료형으로 전환할 수 있도록 변환에 대한 규칙을 제 공한다.

✚ JSON과 파이썬 자료형 매핑

| JSON | 설명 | 파이썬 |

|---|---|---|

| object | 순서가 없는 키와 값의 쌍 | dict |

| array | 순서가 있는 sequence들의 값 | list |

| string | 문자열 | str |

number (int) double- precision in JavaScript int number (real) floating-point format in JavaScript float

| true | Boolean | True |

|---|---|---|

| false | Boolean | False |

| null | empty | None |

✚ JSON 인코딩과 디코딩

파이썬 object(딕셔너리, 리스트, 튜플 등)를 JSON 문자열로 변경하는 것을 JSON 인코딩 이라 부른다. JSON 인코딩을 위해서는 우선 JSON 라이브러리를 import한 후, JSON. dumps( ) 메서드를 사용하여 파이썬 object를 문자열로 변환하면 된다.

JSON 문자열을 파이썬 자료형(딕셔너리, 리스트, 튜플 등)으로 변경하는 것을 JSON 디코딩 이라 부른다. JSON 디코딩은 JSON.loads( ) 메서드를 사용하여 문자열을 파이썬 자료형 으로 변경하게 된다.

예제 22-1 : JSON 모듈 이해하기

모듈 JSON 내에 있는 함수와 클래스를 조회해보면 JSON을 처리할 때 필요한 함수들과 클래스가 나온다.

```python
In : import json
for i in dir(json) :
if not i.startswith("_") :
print(i)
Out: JSONDecodeError
JSONDecoder
JSONEncoder
codecs
decoder
detect_encoding
dump
dumps
encoder
load
loads
scanner
```

JSON 클래스를 이용해서 파이썬 문자열을 인코딩하여 JSON 문자열로 전환하고 이를 다

시 디코딩 처리해 파이썬 리스트로 처리한다.

```python
In : import json
a = json.JSONEncoder().encode(['streaming API'])
print(type(a),a)
a = json.JSONDecoder().decode(a)
print(type(a),a)
Out: <class 'str'> ["streaming API"]
<class 'list'> ['streaming API']
```

바이트 문자열을 통해 JSON으로 변환하면 TypeError가 발생한다.

```python
In : import json
try :
a = json.JSONEncoder().encode([b'streaming API'])
print(type(a),a)
except TypeError as e :
print(e)
Out: Object of type 'bytes' is not JSON serializable
```

예제 22-2 : JSON 함수를 이용해서 변환하기

dumps 함수를 이용해서 리스트를 JSON 문자열로 변환한다. 다시 loads 함수를 이용해 서 JSON 문자열을 파이썬 객체인 리스트로 전환한 결과를 확인할 수 있다.

```python
In : import json
list_ = ['foo', {'bar': ('baz', None, 1.0, 2)}]
a = json.dumps(list_)
print(type(a))
print(a)
b = json.loads(a)
print(type(b))
print(b)
Out: <class 'str'>
["foo", {"bar": ["baz", null, 1.0, 2]}]
<class 'list'>
['foo', {'bar': ['baz', None, 1.0, 2]}]
```

JSON으로 변환한 것을 출력할 때 sort_keys=True를 지정하면 순서대로 처리되며, indent를 주면 JSON 스타일로 출력이 가능하다.

```python
In : import json
d = {'a': 5, '6': 7}
print(json.dumps(d))
print(json.dumps(d, sort_keys=True, indent=4))
Out: {"a": 5, "6": 7}
{
"6": 7,
"a": 5
}
```

JSON으로 변환할 때 compact style로 처리하기 위해 separators를 주고 출력하면 compact하게 출력이 되는 것을 확인할 수 있다.

```python
In : import json
list_ = [1,2,3,{'4': 5, '6': 7}]
print(json.dumps(list_, separators=(',', ':')))
print(json.dumps(list_, sort_keys=True, indent=4))
Out: [1,2,3,{"4":5,"6":7}]
[
1,
2,
3,
{
"4": 5,
"6": 7
}
]
```

## 22.1.2 객체 자료형에 대한 변환

JSON으로 변환이 안되는 객체에 대해서는 별도로 전환 가능하게 함수를 만들어서 JSON 함수에 연결하면 최종 처리된 결과를 가지고 변환한다.

✚ 파이썬 클래스나 인스턴스에 대해 JSON으로 전환

파이썬 인스턴스는 JSON으로 바로 전환이 되지 않으므로 defaults에 별도의 함수를 지정 하여 JSON object로 변경한다.

예제 22-3 : 파이썬 클래스를 JSON으로 변환하기

사용자 클래스를 정의한 후에 하나의 인스턴스를 만들었다. 인스턴스는 JSON 스타일로 변환이 될 수 없으므로 내부의 속성만 딕셔너리로 전달하면 JSON의 자료형인 객체로 전 환이 가능하다.

이를 위해 하나의 함수 jdefault를 만들어서 인스턴스의 Namespace만을 저장하도록 만 들면 바로 JSON으로 변환을 할 수 있다. 이 변환 함수를 dumps 함수 내에 default 매 개변수에 주면 이 함수의 처리 결과가 JSON 스타일에 맞게 변환이 되는 것을 확인할 수 있다.

```python
In : class User(object):
def __init__(self, name, password):
self.name = name
self.password = password
alice = User('Alice A. Adams', 'secret')
def jdefault(o):
return o.__dict__
print(json.dumps(alice, default=jdefault))
Out: {"name": "Alice A. Adams", "password": "secret"}
```

파이썬 set 자료형도 JSON에 매칭되는 자료형이 존재하지 않으므로 set 내부에 Name space를 전달해서 구성하면 값만 처리되어 배열이 만들어지는 것을 확인할 수 있다.

```python
In : import json
def jdefault(o):
if isinstance(o, set):
return list(o)
return o.__dict__
pets = set(['Tiger', 'Panther', 'Toad'])
print(json.dumps(pets, default=jdefault))
Out: ["Panther", "Tiger", "Toad"]
```

예제 22-4 : JSON을 파이썬 클래스로 변환하기

반대로 JSON을 파이썬에서 제공되는 자료형으로 변환을 하기 위해서는 loads 함수로 매 개변수인 object_pairs_hook에 특정 클래스를 지정해서 처리한다. JSON 객체는 파이썬 딕셔너리로 전환은 되지만 OrderedDict 자료형으로 변환하기 위해 object_pairs_hook 에 OrderedDict를 배정하면 변환이 되는 것을 알 수가 있다.

```python
In : import json
from collections import OrderedDict
data = json.loads('{"foo":1, "bar": 2}', object_pairs_hook=OrderedDict)
print(type(data))
print(json.dumps(data, indent=4))
Out: <class 'collections.OrderedDict'>
{
"foo": 1,
"bar": 2
}
```
