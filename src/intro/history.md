---
layout: docs
title: "2. 파이썬의 탄생과 유래 (역사)"
permalink: /intro/history.html
description: "귀도 반 로섬의 크리스마스 프로젝트에서 출발하여 몬티 파이선 코미디 쇼에서 유래한 명명 비화와 파이썬 발전 역사를 살펴봅니다."
keywords: "파이썬 역사, 귀도 반 로섬, 몬티 파이선, 파이썬 유래, Python history, spam eggs, jinydev"
---

# 2. 파이썬의 탄생과 유래 (역사)

{% include lecture_illustration.html 
   src="/assets/img/hojin_lab_lecture.jpg" 
   alt="이호진 교수님의 컴퓨터 공학사 세미나" 
   caption="휴일의 작은 호기심이 소프트웨어 역사를 바꾼 위대한 언어가 되었습니다 — 이호진 교수님의 파이썬 역사 특강" 
   character="이호진 교수님" 
%}

파이썬은 전 세계에서 가장 널리 쓰이는 프로그래밍 언어 중 하나이지만, 그 시작은 거창한 기업 프로젝트가 아닌 **한 엔지니어의 크리스마스 휴가 취미 프로젝트**였습니다.

{% include character_callout.html 
   char="dorothy" 
   title="크리스마스 휴가에 언어를 만들다니 대단해요!" 
   text="쉬는 날 심심풀이로 만든 프로젝트가 지금 전 세계 인공지능과 우주 항공까지 움직이는 언어가 되었다는 게 믿기지 않아요!" 
%}

{% include character_callout.html 
   char="hojin" 
   title="위대한 발견은 즐거움에서 나온다" 
   text="귀도 반 로섬은 '즐거움(Fun)'을 가장 중요한 철학으로 삼았단다. 프로그래밍이 지루한 노동이 아니라 즐거운 지적 유희가 될 수 있음을 증명한 것이 파이썬의 진정한 가치지!" 
%}

---

## 👨‍💻 창시자: 귀도 반 로섬 (Guido van Rossum)

<div class="card border-0 bg-light p-4 rounded-4 my-4">
  <div class="row align-items-center">
    <div class="col-md-9">
      <h4 class="fw-bold text-dark mb-2">귀도 반 로섬 (1956년 네덜란드 하를럼 출생)</h4>
      <p class="text-secondary small mb-2">
        암스테르담 대학교에서 수학 및 컴퓨터 과학 석사 학위를 취득한 후, 네덜란드 국립수학정보학연구소(CWI, Centrum Wiskunde & Informatica)에서 연구원으로 재직했습니다.
      </p>
      <p class="text-secondary small mb-0">
        이후 CNRI, 구글(Google), 드롭박스(Dropbox), 마이크로소프트(Microsoft)를 거치며 파이썬의 발전을 이끌었으며, 2018년까지 파이썬 커뮤니티의 <strong>BDFL(자비로운 종신 독재자, Benevolent Dictator For Life)</strong>로 활동했습니다.
      </p>
    </div>
    <div class="col-md-3 text-center mt-3 mt-md-0">
      <span class="badge rounded-pill bg-dark text-white px-3 py-2 fw-bold">Python Creator</span>
      <p class="small text-muted mt-2 mb-0">1989년 최초 개발<br>1991년 최초 공개</p>
    </div>
  </div>
</div>

### 🎄 1989년 크리스마스의 탄생 비화
1989년 12월, CWI 연구소는 연말 크리스마스 연휴로 문을 닫았습니다. 당시 연구소에서 개발하던 **ABC 언어** 프로젝트에 참여했던 귀도는 ABC의 직관적이고 우아한 구문 구조를 좋아했지만, 예외 처리의 부재와 운영체제 시스템 인터페이스와의 연계가 부족하다는 점에 아쉬움을 느끼고 있었습니다.

귀도는 연휴 동안 자신의 개인용 컴퓨터에서 C 언어로 작성된 유닉스 시스템 호출을 직접 다룰 수 있으면서도, ABC 언어처럼 배우기 쉽고 간결한 새로운 인터프리터 언어를 직접 만들어보기로 결심했습니다. 이것이 바로 파이썬의 첫 단추였습니다.

---

## 🎭 이름의 진짜 유래: 뱀이 아닌 코미디 쇼!

> *"단순하고 유쾌하며, 사람들의 눈길을 끄는 이름을 찾고 있었습니다."*  
> — 귀도 반 로섬

많은 사람들이 파이썬의 로고에 그려진 뱀 형상을 보고 그리스 신화의 거대한 뱀(Python)에서 따왔다고 생각하지만, 실제로는 영국 BBC의 전설적인 6인조 코미디 그룹 **"몬티 파이선(Monty Python)"**의 대표 프로그램인 **《몬티 파이선의 비행 서커스(Monty Python's Flying Circus)》**에서 따온 것입니다.

```text
       ┌────────────────────────────────────────────────────────┐
       │   영국 BBC 코미디 쇼: Monty Python's Flying Circus       │
       │                   ↓                                    │
       │   귀도 반 로섬: "짧고 독특하며 살짝 신비로운 이름을 찾다"   │
       │                   ↓                                    │
       │   공식 프로그래밍 언어 이름: "Python" 탄생!               │
       └────────────────────────────────────────────────────────┘
```

### 🍳 왜 파이썬 예제에는 `spam`과 `eggs`가 나올까?
프로그래밍 예제에서 흔히 쓰는 변수명인 `foo`, `bar`, `baz` 대신, 파이썬 공식 문서와 표준 라이브러리 예제에는 항상 **`spam`**, **`eggs`**, **`ham`**이 등장합니다.  
이는 몬티 파이선의 유명한 코미디 스케치인 《스팸 식당(Spam Sketch)》에서 손님이 모든 메뉴에 스팸이 들어간 음식을 주문하며 벌어지는 우스꽝스러운 대화에서 유래한 유쾌한 오마주입니다!

---

## 📈 파이썬 발전 연표 (Major Milestones)

- **1991년 2월 (Python 0.9.0)**: 유즈넷(alt.sources)에 최초 공개 (클래스, 함수, 예외 처리, 모듈 시스템 포함)
- **1994년 1월 (Python 1.0)**: 함수형 프로그래밍 도구(`lambda`, `map`, `filter`, `reduce`) 탑재
- **2000년 10월 (Python 2.0)**: 리스트 컴프리헨션(List Comprehension), 순환 참조를 감지하는 가비지 컬렉터(GC) 도입
- **2008년 12월 (Python 3.0)**: **"파이썬 역사상 가장 큰 대전환"**  
  - 유니코드 문자열 기본화(UTF-8)
  - `print` 문의 함수화 (`print "hi"` ➔ `print("hi")`)
  - 정수 나눗셈(`/`)의 실수 반환 등 하위 호환성을 과감히 버리고 언어의 일관성을 확립
- **2020년 1월 (Python 2 공식 수명 종료)**: Python 2.7 Sunset으로 완전한 Python 3 시대로의 전환 완료
- **현재 (Python 3.12 / 3.13)**: Faster CPython 프로젝트를 통한 획기적인 연산 속도 향상, Free-threaded(GIL 제거 프리뷰) 도입으로 현대 고성능 멀티코어 시대로 진화 중
