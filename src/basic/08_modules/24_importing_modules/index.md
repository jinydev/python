---
layout: docs
title: "24 내장 모듈 가져다 쓰기 (import)"
permalink: /basic/08_modules/24_importing_modules/
---

# 24 남이 만든 훌륭한 도구 빌려오기: 모듈과 import

진정한 개발자라면 모든 기능을 바닥부터 스스로 짜는 수고를 덜어야 합니다. 파이썬 생태계에는 이미 수학 연산, 무작위 뽑기 기능, 웹 통신 기능 등을 담아둔 수많은 마법의 상자가 완벽하게 준비되어 있습니다. 
우리는 이런 완성된 도구 상자들을 가리켜 **모듈(Module)**이라고 부릅니다.

내 파이썬 스크립트 안으로 이런 외부 도구를 영입해 오는 필수 명령어가 바로 **`import`**입니다.

### 1. math 모듈: 정교한 수학 공학용 계산기
원주율(파이, $\pi$)을 소수점 끝까지 직접 외워서 3.1415... 라며 타이핑할 필요가 전혀 없습니다. 파이썬의 핵심 수학 관련 모듈인 `math`를 불러서 맡기면 됩니다.

**REPL 실습: math 모듈 써보기**
```python
>>> import math
>>> r = 10
>>> circle_area = math.pi * r * r  # pi 상수를 이용한 원의 넓이
>>> print(circle_area)
314.1592653589793
```
모듈이 품고 있는 특정 기능이나 변수를 호출하려면 항상 **`모듈명.기능명`** 형식처럼 중간에 마침표(`.`)로 다리를 놔주어야 합니다.
`math` 모듈 안에는 억지로 소수점을 끌어올리는 올림 함수 `math.ceil()`과, 냉정하게 깎아내리는 내림 함수 `math.floor()` 등 유용한 도구들이 가득합니다.

> **⚠️ 팁:** 일반적으로 실생활에서 자주 쓰이는 '반올림' 연산은 굳이 `math` 모듈을 임포트하지 않아도 되는 파이썬의 영구 내장 함수 `round()`가 기본 담당하고 있습니다.

### 2. random 모듈: 예측 불가능한 주사위 굴리기
RPG 게임에서 드랍되는 몬스터의 아이템이나 오늘 점심 메뉴를 무작위로 고르려면 `random` 모듈이 필수적입니다.
그중에서도 리스트 내부에 늘어선 여러 후보 중 하나를 임의로 콕 집어주는 `choice` 함수는 매우 활용도가 높습니다.

**코드: random_picker.py**
```python
import random

lucky_numbers = [7, 12, 23, 31, 40, 45]
my_pick = random.choice(lucky_numbers)
print(f"시스템이 추천하는 오늘의 번호는: {my_pick}")
```

### 3. 통신 모듈로 인터넷 훔쳐보기 (맛보기)
파이썬 기본 내장 모듈들의 기능은 무궁무진합니다. 심지어 인터넷 사이트의 코드(HTML)를 단 몇 줄의 코딩으로 쭉 빨아들이는 것도 가능합니다. (아래 코드는 "이렇게도 쓸 수 있구나" 정도로 감상만 하고 넘어가시면 됩니다.)

**코드: 웹 페이지 데이터 추출 맛보기**
```python
import urllib.request

target_url = "http://example.com/"
response_data = urllib.request.urlopen(target_url)
print(response_data.read().decode('utf-8'))
```
이렇듯 단 한 줄의 `import` 구문은 내 코드를 전 세계 파이썬 고수들이 쌓아올린 거대한 지식의 탑과 연결해 줍니다.

---

## 💻 미니 실습: 외부 모듈 활용하기

**Quiz 1** `math` 모듈을 제일 먼저 불러온 뒤, `50.7`이라는 실수의 소수점을 무자비하게 날려버리는(내림 연산) 함수를 찾아내 터미널에 결과를 띄워보세요.

---
<details>
<summary><b>모범 답안 보기</b></summary>

**풀이 1**
```python
import math
print(math.floor(50.7))  # 결과: 50
```
</details>
