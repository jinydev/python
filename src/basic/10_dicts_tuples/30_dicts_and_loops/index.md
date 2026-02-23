---
layout: docs
title: "30 딕셔너리와 for 반복문의 완벽한 조화"
permalink: /basic/10_dicts_tuples/30_dicts_and_loops/
---

# 30 딕셔너리와 for 반복문의 환상적인 앙상블

딕셔너리 안에 저장된 수많은 쌍의 데이터를 화면에 차례대로 뿌려주려면 `for` 반복문을 돌리는 것이 가장 정석입니다. 다만, 단일 아이템만 들어있는 리스트와 달리 딕셔너리는 '키(Key)'와 '값(Value)'이라는 앞뒷면 요소가 존재하므로 반복문을 돌리는 타기팅 방식도 목적에 따라 세 가지로 세분화됩니다.

1. **키(Key) 부분만 추출할 때**: `for key in dict_name.keys():` (참고로 뒤에 `.keys()`를 빼고 그냥 딕셔너리 이름만 써도 기본적으로 키만 뽑힙니다)
2. **값(Value) 부분만 추출할 때**: `for value in dict_name.values():`
3. **키와 값을 동시에 페어로 뽑을 때**: `for key, value in dict_name.items():` (실무에서 가장 많이, 그리고 요긴하게 쓰이는 패턴입니다!)

**실습 코드: 딕셔너리 루프 돌리기**
```python
exam_scores = {'국어': 90, '수학': 100, '영어': 85}

# .items() 전용 메서드를 호출하면 과목명(키)과 해당 취득 점수(값) 쌍이 한 번에 튀어나옵니다.
for subject_name, score_point in exam_scores.items():
    print(f'나의 {subject_name} 과목 점수는 자랑스러운 {score_point}점 이다!')
```
