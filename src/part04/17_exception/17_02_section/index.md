---
layout: docs
title: "2. 에러 가족의 족보: 예외 클래스"
permalink: /part04/17_exception/17_02_section/
---

# 2. 에러 가족의 족보: 예외 클래스

에러(예외)들도 사실은 파이썬의 **'클래스(Class)'** 로 만들어진 하나의 큰 가족(가문)이랍니다! 그 족보를 알면 어떤 에러를 어떤 그물(`except`)로 잡아야 할지 작전이 보입니다.

## 2.1 내장 에러 가문(족보) 파헤치기

파이썬이 기본으로 가지고 있는 에러 가문의 꼭대기에는 가장 큰 할아버지인 `BaseException`과 `Exception` 클래스가 있습니다.

1. **`Exception` (모든 에러의 기둥)**
   - 거의 모든 런타임 에러들이 바로 이 `Exception` 이라는 아버지 클래스를 상속받아서 만들어집니다.
   - 그래서 `except Exception:` 그물을 치면, 세상의 거의 모든 잡다한 에러를 다 걸러낼 수 있습니다!

2. **`ArithmeticError` (수학 에러 가족)**
   - `Exception`의 자식 중 하나입니다. 주로 수학 계산을 하다가 터지는 에러들이 속해 있습니다.
   - 0으로 나누려 할 때 터지는 `ZeroDivisionError`가 바로 이 가족의 대표적인 손자입니다!

3. **`LookupError` (찾기 실패 에러 가족)**
   - 리스트의 칸 수를 넘어가는 곳을 찾거나(`IndexError`), 딕셔너리에 없는 키를 달라고 조를 때(`KeyError`) 발생하는 에러들입니다.

이처럼 파이썬의 에러들은 꼬리에 꼬리를 무는 부모-자식 상속 구조로 이루어져 있습니다.

---

## 2.2 나만의 맞춤형 에러 경고장 만들기!

게임에서 플레이어의 레벨이 0보다 떨어지는 것은 원래 파이썬에는 없는 오류입니다. 문법이나 수학적으로는 문제가 없지만 우리 게임 규칙에서는 **엄청난 에러**죠!
이럴 때는 파이썬의 에러 족보에 '우리가 만든 에러'를 입양시킬 수 있습니다.

방법은 아주 간단합니다. 파이썬의 `Exception` 클래스를 상속받는 우리만의 클래스를 만드는 것입니다!

```python
# 1. 나만의 '레벨 마이너스 방지' 에러 클래스 만들기
class LevelMinusError(Exception):
    def __init__(self, msg, bad_level):
        # 아버지(Exception)한테 메시지를 넘겨줌
        super().__init__(msg)
        self.bad_level = bad_level # 잘못 입력된 레벨도 팁으로 저장해두기

# 2. 게임에 써먹기!
try:
    player_level = -5
    if player_level < 0:
        # 내가 만든 위험 경보 강제로 울리기! (raise)
        raise LevelMinusError("레벨은 음수가 될 수 없어!", player_level)

except LevelMinusError as e:
    # 내가 만든 특별한 에러 그물로 잡아내기!
    print(f"[경고] {e}")
    print(f"입력된 이상한 레벨 값: {e.bad_level}")
```

이렇게 하면, 파이썬이 모르는 우리만의 비즈니스 룰 기반 에러도 멋지게 방어할 수 있습니다!
