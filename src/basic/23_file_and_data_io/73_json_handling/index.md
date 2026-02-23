---
layout: docs
title: "73 편지 봉투에 담아 통신하기: JSON 데이터 핸들링"
permalink: /basic/23_file_and_data_io/73_json_handling/
---

# 73 규격화된 편지 봉투: JSON 인코딩과 파일 저장

이 세상 수많은 컴퓨터 서비스(웹사이트, 모바일 앱 등)끼리 정보를 통신할 때는 각자의 언어(파이썬, 자바 등)가 달라도 서로 알아먹을 수 있는 아주 표준화된 텍스트 편지가 한 장 필요합니다. 
그래서 전 세계 개발자들이 약속한 이 예쁜 표준 규격 편지봉투가 바로 **JSON (JavaScript Object Notation)**입니다.

JSON 데이터는 사실 파이썬의 **딕셔너리와 리스트 구조**와 거의 99% 비슷하게 생겼습니다만, 몇 가지 이름의 치환 약속이 있습니다. (예를 들어 파이썬의 `True`/`False`/`None` 은 JSON에서 무조건 소문자인 `true`/`false`/`null` 로 바뀝니다.)

## 1. 파이썬을 JSON 봉투로 납작하게 누르기 (`dumps`)

파이썬의 살아 움직이는 복잡한 딕셔너리를, 친구(다른 프로그래밍 언어 서버)에게 인터넷으로 전송하기 위해 빳빳한 단순 텍스트 문자열(JSON)로 납작하게 찍어내는 인코딩 기능이 **`json.dumps()`** 입니다. ('s'는 문자열 string 반환을 의미합니다)

```python
import json

# 평범한 파이썬 딕셔너리 가방
my_bag = {"name": "용사", "level": 10, "is_alive": True, "pet": None}

# 딕셔너리를 JSON 텍스트로 납작하게 인쇄 변환!
json_text = json.dumps(my_bag)

print(type(json_text)) # <class 'str'> 순수한 텍스트 문자열로 바뀜!
# 출력: {"name": "\uc6a9\uc0ac", "level": 10, "is_alive": true, "pet": null}
# (True가 true로, None이 null로 규칙에 맞게 자동 번역된 걸 확인하세요!)
```
가끔 한글이 `\uc6a9\uc0ac` 처럼 기괴한 영어(유니코드 방어 시스템)로 다 뭉개져 나온다면, `ensure_ascii=False` 옵션을 추가해주면 한글 있는 그대로 예쁘게 나옵니다! 보기 좋게 줄바꿈 정렬을 하려면 `indent=4` 옵션을 씁니다.

---

## 2. 낯선 편지 뜯어서 파이썬으로 가공하기 (`loads`)

인터넷 너머로 날아온 혹은 친구가 던져준 낯선 JSON 문자열을 그냥 글자로 놔두면 아무 작업도 못 합니다. 이걸 다시 우리가 써먹고 마음대로 주무를 수 있는 파이썬 딕셔너리로 뻥 튀겨야 합니다. 이 주문은 **`json.loads()`** (로드s) 입니다.

```python
import json

# 다른 기기에서 날아온 덩어리 JSON 텍스트 편지
incoming_json = '{"score": 99, "items": ["sword", "shield"]}'

# 파이썬에서 자유롭게 써먹을 수 있는 딕셔너리/리스트로 부활!
py_data = json.loads(incoming_json)

print(type(py_data))       # <class 'dict'>
print(py_data["items"][0]) # 출력: sword ! (깔끔하게 리스트 인덱싱에 성공!)
```

---

## 3. 디스크 창고에 JSON 파일로 박제 시키기 (`dump` & `load`)

`dumps`나 `loads` 끝에 붙어 있던 작은 꼬리표 `s`만 떼어내면, 메모장 허공이 아니라 **진짜 컴퓨터 내 하드디스크의 깊은 곳 물리적인 `.json` 확장자 파일**로 바로바로 밀어 넣거나 통째로 파일에서 파이썬 객체로 읽어오는 기능이 됩니다.

```python
import json

user_info = {'name': 'Hojin', 'points': 5000}

# 1. 파일 쓰기 모드('w')로 오픈: 
# (한글이 깨지지 않게 보장하는 ensure_ascii=False와 utf-8 옵션 조합 콤보!)
with open('user_data.json', 'w', encoding='utf-8') as file:
    # 2. 파이썬 user_info 창고를 JSON으로 압축해 곧바로 file에 밀어 던짐! (dump)
    json.dump(user_info, file, ensure_ascii=False, indent=2)

# --- 이제 저장된 창고 파일을 다시 까서 깨워볼까요? ---

with open('user_data.json', 'r', encoding='utf-8') as file:
    # 파일 안의 내용을 전부 빨아들여 살아 숨 쉬는 파이썬 딕셔너리로 부활! (load)
    loaded_data = json.load(file)
    print("불러온 포인트:", loaded_data['points']) # 5000
```

복잡한 내 웹 서비스의 사용자 정보나 통계 시스템 설정들을 컴퓨터 밖의 외부 시스템과 완벽하게 저장하고 공유하고 싶다면 이 `JSON` 처리 기술이 여러분의 최고의 구원자가 될 것입니다!
