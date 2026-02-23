---
layout: docs
title: "40 범인의 발자국 쫓기: traceback 추적"
permalink: /basic/12_exceptions/40_traceback/
---

# 40 범인의 흔적을 쫓아라: `traceback` (트레이스백)

우리가 앞서 배운 `try ~ except` 매직 그물로 에러를 잡으면, 프로그램이 튕겨서 뻗어버리는 대참사는 막을 수 있습니다. 하지만 이 그물에는 한 가지 단점이 있습니다. 파이썬이 "도대체 파일의 몇 번째 줄에서, 정확히 왜 에러가 났는지" 입을 꾹 다물어버린다는 것입니다. (에러를 꿀꺽 삼켜버렸기 때문이죠!)

이럴 때, 범행 현장의 모든 단서(몇 번째 줄 코드, 어느 함수 등)를 적어둔 비밀 장부를 몰래 꺼내보려면 파이썬의 마법 돋보기인 **`traceback` (트레이스백)** 모듈을 꺼내야 합니다!

## 1. Traceback(추적기)가 뭔가요?

에러 방패(`try`) 없이 에러가 파바박 터지며 프로그램이 죽을 때 콜솔 창에 주르륵 쏟아지던 무서운 빨간 글씨들을 본 적 있죠? 그 무서운 발자국들이 바로 `Traceback`입니다.
"A 함수가 B 함수를 불렀고, B 함수가 15번째 줄에서 C를 호출하다가 펑 터졌다!"를 순서대로 기록해 놓은 비행기 블랙박스와도 같습니다.

에러를 안전하게 `except`로 잡아먹은 상태에서도 이 블랙박스(Traceback) 내용을 몰래 출력해 보려면, **`traceback.print_exc()`** 마법 주문을 쓰면 됩니다.

```python
import traceback

def make_trouble():
    # 고의로 수학 에러 발생시키기 (0으로 나누기)
    return 10 / 0

try:
    print("게임을 정상적으로 실행합니다...")
    make_trouble()
    
except Exception as e:
    print("\n앗, 에러를 그물로 부드럽게 잡았습니다!")
    print(f"내가 잡은 에러 이름: {e}")
    print("\n하지만 돋보기로 범행 현장(블랙박스)을 상세히 분석해 보겠습니다!\n")
    
    # 여기서 에러의 발자국(Traceback)을 예쁘게 출력해 줍니다!
    traceback.print_exc()
```

### 💻 실행 결과:
```text
게임을 정상적으로 실행합니다...

앗, 에러를 그물로 부드럽게 잡았습니다!
내가 잡은 에러 이름: division by zero

하지만 돋보기로 범행 현장(블랙박스)을 상세히 분석해 보겠습니다!

Traceback (most recent call last):
  File "game.py", line 10, in <module>
    make_trouble()
  File "game.py", line 5, in make_trouble
    return 10 / 0
ZeroDivisionError: division by zero
```

보셨나요? 분명 프로그램이 강제로 튕기거나 죽지 않았는데도 불구하고 파이썬이 어디서(line 5) 터졌는지 친절하게 현장 기록을 똑같이 다 알려주고 있습니다.

## 2. 왜 이게 중요할까?

이렇게 `traceback` 모듈을 쓰면, **"에러가 나도 프로그램 멈추지 않고 계속 실행되게 하면서 ➔ 동시에 에러 발생 위치와 내역은 눈에 안 띄게 숨겨서 로그(.txt) 파일에만 꼼꼼히 기록해두는"** 고오급 스킬이 가능해집니다.

이는 고수 프로그래머들이 자신의 게임 서버나 웹사이트를 1년 365일 내내 한 번도 튕기지 않게 관리하는 최고의 비법이랍니다!
