---
layout: docs
title: "2. 실전 수사 돌입: 정규식 함수와 옵션"
permalink: /part04/regex/section2/
---

# 2. 실전 수사 돌입: 정규식 함수와 옵션

패턴 암호를 만들었으면 이제 본격적으로 텍스트 바다에 탐지기를 던져야 합니다.

## 2.1 탐지기 작동 방식 (패턴 함수)

파이썬 `re` 모듈에는 목적에 맞는 3가지 주요 탐지기가 있습니다.

1. **`match(패턴, 문자열)`**: 문장의 **가장 첫 글자부터** 칼같이 맞아야만 인정합니다! 첫 단어가 다르면 뒤는 보지도 않고 포기(None)합니다.
2. **`search(패턴, 문자열)`**: 문장을 처음부터 끝까지 훑다가 **가장 먼저 매칭되는 녀석 딱 1개**를 찾으면 바로 멈춥니다.
3. **`findall(패턴, 문자열)`**: 텍스트 전체를 샅샅이 뒤져서 **매칭되는 모든 결과**를 무더기(리스트)로 가져옵니다!

```python
import re

text = "apple, banana, cherry, apple!"

# 1. search는 처음 찾은 사과 하나만!
print(re.search("apple", text).group()) 
# 출력: apple

# 2. findall은 모든 사과를 싹쓸이!
print(re.findall("apple", text)) 
# 출력: ['apple', 'apple']
```

찾은 결과는 **Match 객체**라는 멋진 보물상자에 담겨 옵니다. 이 상자 안에는 찾은 값(`group()`), 찾은 위치의 시작점과 끝점(`span()`, `start()`, `end()`) 같은 고급 정보가 듬뿍 들어있습니다.

---

## 2.2 탐지 레이더 업그레이드 (컴파일 옵션)

`re.compile()`로 패턴을 만들 때, 뒤에 특별한 마법 부품(옵션)을 붙여주면 편해집니다.

- **`re.I` (IGNORECASE)**: 대문자/소문자를 쿨하게 무시합니다! (A를 찾으라 하면 a도 찾아줌)
- **`re.M` (MULTILINE)**: 엔터(\n)로 여러 줄이 된 글을 검사할 때, 각 줄의 `^처음`과 `끝$`을 따로따로 다 검사해줍니다.
- **`re.S` (DOTALL)**: 줄바꿈(\n) 문자도 포함시켜서 찾습니다.

```python
import re

# 'python'을 찾을건데, 대소문자 무시(re.I) 옵션을 켭니다!
pattern = re.compile("python", re.I)

result = pattern.search("I love PYTHON and PyTHon!")
print(result.group()) # 대문자 PYTHON을 거뜬히 찾아냅니다!
```

---

## 2.3 찾아서 바꿔버리기! (`sub`)

단순히 찾는 걸 넘어서, 찾은 패턴의 글자들을 원하는 다른 글자로 싹 바꿔버리는 `sub` 함수가 있습니다. 메모장의 '찾아 바꾸기'보다 100배는 더 강력합니다!

```python
import re

secret_note = "내 비밀번호는 1234, 네 비밀번호는 5678 이다!"

# 모든 숫자(\d+)를 찾아서 "***" 모양으로 바꿔버립니다!
safe_note = re.sub("\d+", "***", secret_note)

print(safe_note)
# 출력: 내 비밀번호는 ***, 네 비밀번호는 *** 이다!
```

정규표현식은 배우기는 외계어처럼 조금 까다롭지만, 한 번 익혀두면 수십 줄의 파이썬 코드를 단 한 줄로 줄여버리는 놀라운 마법의 도구랍니다!
