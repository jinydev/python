---
layout: docs
title: "Chapter 14. 하나씩 쏙쏙 뽑아 쓰는 데이터 캡슐: 반복자와 제너레이터"
permalink: /part03/14_iterator/
---

# Chapter 14. 하나씩 쏙쏙 뽑아 쓰는 데이터 캡슐: 반복자와 제너레이터

![반복자와 제너레이터 컨셉](/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd/iterator_concept_upper_ele_16x9_1771690422161.png)

데이터가 100만 개쯤 들어있는 엄청나게 큰 리스트가 있다고 상상해볼까요? 이 데이터를 모두 한꺼번에 우리 컴퓨터의 임시 기억 장소(메모리)에 올려둔다면 컴퓨터가 무거워서 헉헉대며 느려질 것입니다. 
하지만 만약 **"전체 데이터를 무겁게 다 들고 있지 말고, 내가 '다음!' 하고 버튼을 누를 때마다 데이터를 딱 하나씩만 만들어줘"** 라고 명령할 수 있다면 어떨까요? 

파이썬에서는 이런 똑똑한 데이터 뽑기 기계들을 **반복자(Iterator)**와 **제너레이터(Generator)**라는 이름으로 부릅니다. 이 장에서는 방대한 데이터를 가볍고 우아하게 처리하는 파이썬 고수들의 핵심 기술을 배워보겠습니다.

---

### 📖 목차

1. **[반복형과 반복자 (Iterable & Iterator)](./14_01_section/)**
   - 언제든 뽑을 수 있는 상자(`Iterable`)와 실제로 하나씩 뽑는 기계(`Iterator`)
   - "이제 끝이야!" `StopIteration` 예외의 비밀
   - 나만의 수제 뽑기 기계 만들기 (사용자 정의 클래스)
2. **[마법의 순환 도구 상자 (`itertools`)](./14_02_section/)**
   - 변형하기: `accumulate`, `compress`
   - 연결하고 곱하기: `chain`, `product`, `zip_longest`
   - 순열과 조합, 그리고 무한 반복: `permutations`, `cycle`, `count`
3. **[게으른 데이터 공장: 제너레이터 (`generator`)](./14_03_generator/)**
   - `return` 대신 `yield`: 함수를 멈췄다 다시 켜는 방법
   - 제너레이터 표현식(Generator Expression)
   - 파이프라인 수급 연결: `yield from`
4. **[핑퐁 게임하듯 대화하는 함수: 코루틴 (`coroutine`)](./14_04_coroutine/)**
   - 밖에서 함수 안으로 데이터를 던져넣기 (`send`)
   - 멈추고 기다리는 함수의 사이클 제어하기 (`close`, `throw`)
   - 제너레이터와의 차이점과 응용
