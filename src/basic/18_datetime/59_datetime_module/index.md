---
layout: docs
title: "59 시간의 흐름을 지배하는 모듈: datetime"
permalink: /basic/18_datetime/59_datetime_module/
---

# 59 특정 시점(Point in Time)의 좌표를 포착하다: datetime 모듈
</div>

### 현실의 현재 시각 스캔하기
우리가 스마트폰 액정을 켜서 시계를 힐끗 보듯, 파이썬 스크립트 도중에도 `datetime` 시스템을 호출해 현재 흐르고 있는 우주의 정확한 시각을 포착해 낼 수 있습니다.

**REPL 실습 창: 시간아 멈춰라!**
```python
>>> import datetime # 시간 관리 전담 부서를 호출합니다.
>>> current_time = datetime.datetime.now()
>>> current_time
datetime.datetime(2023, 10, 24, 15, 30, 0, 123456)
```
출력된 좌표는 왼쪽부터 차례대로 `연도, 월, 일, 시각, 분, 초, 미세한 마이크로초` 단위까지 정밀하게 쪼개져 있습니다.

### 내 맘대로 과거나 미래 특정 좌표 세팅하기
마치 타임머신 계기판에 가고 싶은 연도를 입력하거나 폰 알람을 내일 아침으로 직접 맞추는 것처럼, 프로그래머가 인위적으로 날짜와 시간을 강제로 부여해 인스턴스(시간 캡슐)를 찍어낼 수도 있습니다.

**REPL 실습 창: 타임머신 좌표 설정**
```python
>>> target_date = datetime.datetime(2024, 1, 1) # 내년 1월 1일 자정으로 세팅!
>>> target_date
datetime.datetime(2024, 1, 1, 0, 0)
```

### 시점 사이의 간격 측정하기 (남은 D-Day 계산)
우리가 설정한 새해 첫날(`target_date`)이 현재 시점(`current_time`)으로부터 도대체 얼마나 남았는지 산술적으로 빼기를 하면 그 거리를 적나라하게 측정할 수 있습니다.

**REPL 실습 창: 디데이 폭파 시간 계산기**
```python
>>> gap = target_date - current_time
>>> gap
datetime.timedelta(days=68, seconds=30600, microseconds=876544)
>>> print(f"새해까지 정확히 {gap.days}일 남았네요!")
새해까지 정확히 68일 남았네요!
```

이 연산을 거쳐 탄생한 녀석은 더 이상 콕 집은 '시점(`datetime`)'이 아닙니다. 두 점액통 사이를 연결하는 "순수한 기간과 길이"만을 의미하는, 시계열의 또 다른 황태자 **`timedelta`** 타입으로 변모합니다.

---

## 💻 미니 실습: 나만의 D-Day 자동 계산기

**Quiz 1** 여러분이 간절히 기다리는 특정 기념일(예: 2024년 10월 31일 할로윈)을 `event_day` 변수에 좌표로 찍어두고, 평범한 오늘 시점 기준으로 대체 며칠이나 참아야 하는지 숫자만 쿨하게 출력해 내는 스크립트를 짜보세요.

<details>
<summary><b>모범 답안 보기</b></summary>

**풀이 1**
```python
import datetime

# 올해 할로윈 파티를 디데이 타겟으로 세팅!
event_day = datetime.datetime(2024, 10, 31)
today_now = datetime.datetime.now()

# 두 시간 좌표를 빼서 순수 '간격(길이)'을 뽑아낸 뒤, '.days' 속성으로 날짜 수만 쏙 빼냅니다.
remaining_days = (event_day - today_now).days

print(f"광란의 할로윈 파티까지 고작 {remaining_days}일 남았습니다.")
```
</details>

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/7feabf48-a00e-4ca0-bc10-0ecaccdfe747" width="400">
