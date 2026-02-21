---
layout: docs
title: "1. 편지 봉투 씌우기: JSON 인코딩과 디코딩"
permalink: /part04/22_json/22_01_section/
---

# 1. 편지 봉투 씌우기: JSON 인코딩과 디코딩

JSON은 사실 아주 단순하고 긴 '문자열'입니다. 중괄호 `{ }` 와 대괄호 `[ ]` 만 사용해서 파이썬의 딕셔너리나 리스트와 거의 비슷하게 생겼지만, 약간의 차이가 있습니다. 

| 파이썬 자료형     | JSON 으로 변하면?                |
| ----------------- | -------------------------------- |
| `dict` (딕셔너리) | `object` `{ }`                   |
| `list`, `tuple`   | `array` `[ ]`                    |
| `str` (문자열)    | `string` `" "`                   |
| `True`, `False`   | `true`, `false` (소문자로 변형!) |
| `None`            | `null` (아무것도 없다는 뜻)      |

## 1.1 파이썬을 JSON 봉투에 담기 (인코딩, dumps)

파이썬의 살아 움직이는 리스트나 딕셔너리를, 다른 컴퓨터로 전송하기 위해 텍스트 문자열(JSON)로 납작하게 찍어내는 마법 주문이 **`json.dumps()`** 입니다.

```python
import json

my_bag = {"name": "용사", "level": 10, "is_alive": True}

# 딕셔너리를 JSON 텍스트로 납작하게 변환! (인코딩)
json_text = json.dumps(my_bag)

print(type(json_text)) # <class 'str'> 문자열로 바뀜!
print(json_text)       
# 출력: {"name": "\uc6a9\uc0ac", "level": 10, "is_alive": true}
# (True가 true로 소문자로 바뀐 걸 확인하세요!)
```

보기 예쁘게 줄바꿈을 하려면 `indent=4` 같은 도구를 추가하면 됩니다.

---

## 1.2 봉투 뜯어서 파이썬으로 조립하기 (디코딩, loads)

인터넷 너머로 날아온 낯선 JSON 문자열을 받았다면, 이걸 다시 우리가 쓰기 편한 파이썬 딕셔너리로 뻥 튀겨야 합니다. 이 주문은 **`json.loads()`** (문자열에서 로드한다는 뜻의 s가 붙어요!) 입니다.

```python
import json

# 다른 곳에서 날아온 JSON 텍스트 편지
incoming_json = '{"score": 99, "items": ["sword", "shield"]}'

# 파이썬에서 써먹을 수 있는 딕셔너리로 부활! (디코딩)
py_data = json.loads(incoming_json)

print(type(py_data))       # <class 'dict'>
print(py_data["items"][0]) # 출력: sword ! 잘 조립되었네요!
```

---

## 1.3 내 로봇(클래스)도 JSON으로 보낼 수 있을까?

기본적으로 딕셔너리나 리스트만 JSON이 될 수 있습니다. 여러분이 새로 설계한 `로봇(클래스)` 객체를 넣으면 에러를 뿜어냅니다!
이때 "야, 내 로봇 객체는 내부의 `__dict__` 라는 설명서를 보고 딕셔너리 흉내를 내서 던져라!" 라고 해결해주는 도우미 함수를 심어놓을 수 있습니다.

```python
import json

class Robot:
    def __init__(self, name):
        self.name = name

# 도우미 함수: 클래스의 내부 속성 딕셔너리를 던져준다!
def robot_to_dict(obj):
    return obj.__dict__ 

my_bot = Robot("RX-78")

# 에러 없이 my_bot 객체를 JSON으로 인쇄해 냄!
print(json.dumps(my_bot, default=robot_to_dict))
# 출력: {"name": "RX-78"}
```
