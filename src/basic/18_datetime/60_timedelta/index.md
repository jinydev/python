---
layout: docs
title: "60 덩어리진 시간을 덧붙이고 빼기: timedelta"
permalink: /basic/18_datetime/60_timedelta/
---

# 60 덩어리진 시간(Duration)을 마음대로 조종하기: timedelta
</div>

앞서 배운 `datetime.datetime` 모듈이 거대한 우주 달력에 압정을 콱 박아 표시한 **콕 집은 특정 시점(좌표)**이라면, 이번에 다룰 `datetime.timedelta`는 하루, 열흘, 혹은 365일 같이 쭉 뻗은 **길이나 양(Duration)** 그 자체를 의미합니다.

과거나 현재의 특정 '시점' 좌푯값에 이 '길이' 덩어리를 더하면, 미래에 도달할 새로운 좌푯값을 너끈히 알아낼 수 있습니다!

### 사귄 지 100일째 되는 기념일 파워 로직 계산
방금 막 1일 차가 된 풋풋한 커플이 100일 파티를 예약할 날짜는 정확히 언제 며칠일까요?

**REPL 실습 창: 기념일 계산기**
```python
>>> import datetime
>>> current_date = datetime.datetime.now()

# '100일'이라는 압도적인 덩어리(길이)를 창조해 냅니다.
>>> hundred_span = datetime.timedelta(days=100)

# 현재 달력 시점(좌표) + 100일(길이) = 다가올 미래의 도착일(좌표)
>>> party_day = current_date + hundred_span
>>> print(f"두근두근 100일 기념일은 {party_day.year}년 {party_day.month}월 {party_day.day}일입니다!")
두근두근 100일 기념일은 2024년 2월 1일입니다! (실행하는 시능에 따라 결괏값은 요동칩니다)
```

### 아침 9시 정각으로 고집스럽게 고정하기 (`replace`)
특정 디데이 계산기나 업무용 타이머의 기준이 늘 '오전 9시 정각 출근 시간'이라면, 날짜를 뭉텅이로 더하기 전에 엉망인 현재 시, 분, 초 단위들을 오전 9시로 강제 덮어쓰기(`replace`) 해두면 계산이 아주 깔끔하게 떨어집니다.

**REPL 실습 창: 시간 리셋의 연금술**
```python
# 지금 우주 시계가 오후든 새벽이든 무시하고, '시, 분, 초'를 무자비하게 09:00:00 으로 억지로 밀어버립니다.
>>> today_work_start = datetime.datetime.now().replace(hour=9, minute=0, second=0)

# 이 깨끗하게 리셋된 상태에서 1일이라는 '길이'를 살포시 더해주면, 한 치의 오차도 없이 완벽한 낼 아침 9시 좌표가 툭 튀어나옵니다.
>>> tomorrow_work_start = today_work_start + datetime.timedelta(days=1)
```

달력을 보며 손가락으로 짚어가던 복잡한 아날로그 방식은 버리세요. 이제 여러분은 `datetime` 클래스와 `timedelta` 클래스의 이중 플레이를 통해 완벽한 시간의 지배자로 거듭났습니다.

---

## 💻 미니 실습: 업무 마감일 수명 연장 프로젝트

**Quiz 1** 여러분의 과한 업무를 위해 오늘 자정 직전인 밤 11시 59분 59초에 맞춰진 `death_line` 변수를 하나 생성하세요. 그런 다음, 이 피 말리는 `death_line`에 은혜롭게도 정확히 **단 7일의 시간**을 극적으로 연장해 준 `new_death_line` 변수를 탄생시키고 그 은총 가득한 날짜를 출력해 보세요.

<details>
<summary><b>모범 답안 보기</b></summary>

**풀이 1**
```python
import datetime

# 1. 오늘 날짜를 기준으로 시간 파츠만 23시 59분 59초로 가혹하게 튜닝합니다.
death_line = datetime.datetime.now().replace(hour=23, minute=59, second=59)

# 2. 7일 치만큼의 생명줄(길이 단위)을 덧붙여줍니다!
new_death_line = death_line + datetime.timedelta(days=7)

print(f"극적으로 연장된 새로운 데드라인은 {new_death_line} 입니다. 살았다!")
```
</details>
