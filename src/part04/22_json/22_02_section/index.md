---
layout: docs
title: "2. 디스크 창고에 엽서 보관하기: 파일 입출력"
permalink: /part04/22_json/22_02_section/
---

# 2. 디스크 창고에 엽서 보관하기: 파일 입출력

`dumps`나 `loads` 끝에 붙어 있던 작은 `s`는 문자열(string)의 약자였습니다! 
만약 메모장 허공이 아니라 진짜 컴퓨터의 하드디스크 깊은 곳에 '파일'로 저장하고 싶거나, 거대한 JSON 파일에서 바로 딕셔너리로 깨우고 싶다면 꼬리표 `s`가 빠진 **`dump`** 와 **`load`** 를 씁니다!

## 2.1 파일로 냅다 쏘기! (`dump`)

파일 문을 열고 거기에 다이렉트로 JSON을 밀어 넣습니다.

```python
import json

user_info = {
    'name': 'Hojin',
    'points': 5000,
    'badges': ['Gold', 'Silver']
}

# 1. user_data.json 이라는 빈 파일을 쓰기 'w' 모드로 엶
with open('user_data.json', 'w') as file:
    # 2. user_info 파이썬 창고를 JSON으로 찌부시켜 file에 바로 던짐!
    json.dump(user_info, file)
    
print("파일이 무사히 생성되었습니다!")
```

---

## 2.2 잠자는 파일 깨우기! (`load`)

이번엔 반대로 파일 문을 열고 그 안에 잠든 JSON 텍스트를 바로 파이썬 딕셔너리로 부활시킵니다.

```python
import json

# 1. 파일 문을 읽기 'r' 모드로 엽니다.
with open('user_data.json', 'r') as file:
    # 2. 파일 정보를 쭈욱 빨아들여 파이썬 딕셔너리로 조립 완료!
    loaded_data = json.load(file)

print(loaded_data['points']) # 출력: 5000
```

---

## 2.3 🚨 한글이 다 깨져 보인다면? (유니코드 방어전)

파이썬 마법사는 너무 똑똑해서, 한글 "사과"를 JSON으로 인코딩할 때 전 세계 어느 브라우저에서도 박살 나지 않으라고 `"\uc0ac\uacfc"` 같은 기괴한 유니코드 암호(이스케이프 문자)로 바꿔서 보냅니다. 

코딩 프로그램 안에서는 어차피 파이썬이 다시 예쁘게 읽어오니 상관없지만, 윈도우 메모장으로 그 파일을 직접 열어볼 여러분은 눈이 아플 수 있습니다!

"파이썬아! 한글을 외계어로 바꾸지 말고 **그냥 생긴 대로 깔끔하게 폰트 안 깨지게 저장해 줘!**" 라고 명령하려면 `ensure_ascii=False` 마법과 파일의 `encoding='utf-8'` 조합을 써야 합니다!

```python
import json

korean_data = {'과일': '사과'}

# 1. 파일 열때 utf-8 로 폰트 깨짐 열쇠를 채우고
with open('korean.json', 'w', encoding='utf-8') as f:
    
    # 2. ASCII(영어) 강제 변환을 끄라고 지시합니다!! (핵심)
    json.dump(korean_data, f, ensure_ascii=False, indent=4)
```

이제 저장된 `korean.json` 파일을 열어보면 외계어 대신 예쁜 글꼴의 "사과"가 반겨줄 것입니다!
