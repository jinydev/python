---
layout: docs
title: "3. 범인의 흔적을 쫓아라: traceback"
permalink: /part04/exception/section3/
---

# 3. 범인의 흔적을 쫓아라: traceback

우리가 `try ~ except` 매직 그물로 에러를 잡으면, 프로그램이 튕기지 않는 것은 좋지만 파이썬이 "도대체 파일의 몇 번째 줄에서 왜 에러가 났는지" 입을 꾹 다물어버린다는 단점이 있습니다. 에러를 꿀꺽 삼켜버렸기 때문이죠!

이럴 때, 범행 현장의 모든 단서(몇 번째 줄, 어느 함수 등)를 적어둔 비밀 장부를 꺼내보려면 마법의 돋보기, **`traceback` (트레이스백)** 모듈을 꺼내야 합니다!

## 3.1 Traceback(추적기)가 뭐길래?

에러가 파바박 터지며 프로그램이 죽을 때 콜솔 창에 주르륵 쏟아지던 무서운 빨간 글씨들을 본 적 있죠? 그 무서운 발자국들이 바로 `Traceback`입니다.
"A 함수가 B 함수를 불렀고, B 함수가 15번째 줄에서 C를 호출하다가 펑 터졌다!"를 순서대로 기록해 놓은 블랙박스와도 같습니다.

에러를 `except`로 잡아먹은 상태에서도 이 블랙박스(Traceback) 내용을 출력하려면 `traceback.print_exc()` 마법 주문을 쓰면 됩니다.

```python
import traceback

def make_error():
    # 고의로 에러 발생시키기 (0으로 나누기)
    return 10 / 0

try:
    print("실행을 시작합니다...")
    make_error()
    
except Exception as e:
    print("앗, 에러를 그물로 부드럽게 잡았습니다!")
    print("하지만 돋보기로 범행 현장을 상세히 분석해야겠어!\n")
    
    # 여기서 에러의 발자국(Traceback)을 예쁘게 출력해줍니다!
    traceback.print_exc()
```

### 실행 결과:
```
실행을 시작합니다...
앗, 에러를 그물로 부드럽게 잡았습니다!
하지만 돋보기로 범행 현장을 상세히 분석해야겠어!

Traceback (most recent call last):
  File "game.py", line 10, in <module>
    make_error()
  File "game.py", line 5, in make_error
    return 10 / 0
ZeroDivisionError: division by zero
```

보셨나요? 프로그램이 강제로 튕기지 않았는데도 불구하고 파이썬이 어디서 터졌는지 친절하게 다 알려주고 있습니다.

이렇게 `traceback` 모듈을 쓰면, 프로그램은 프로그램대로 멈추지 않고 계속 실행되게 하면서, 에러 내역은 숨겨진 텍스트 파일(로그 파일)에 몰래 생생하게 기록해둘 수 있습니다. 고수 프로그래머들이 자신의 게임 서버를 24시간 내내 튕기지 않고 관리하는 최고의 비법이랍니다!
