---
layout: docs
title: "Chapter 16. 강력한 도구 상자: 파이썬 특수 모듈"
permalink: /part04/16_modules/
---

# Chapter 16. 강력한 도구 상자: 파이썬 특수 모듈

![파이썬 모듈 컨셉](/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd/module_concept_upper_ele_16x9_1771690635607.png)

게임을 만들거나 복잡한 코딩을 할 때, 모든 것을 처음부터 다 만들 필요는 없습니다. 파이썬은 천재 발명가처럼 우리가 자주 쓰는 멋진 로봇 부품(코드 꾸러미)들을 이미 거대한 창고에 잘 정리해 두었습니다. 이런 부품 상자들을 **모듈(Module)**이라고 부릅니다!

이번 장에서는 기본 딕셔너리와 리스트를 강력하게 업그레이드해주는 파이썬의 핵심 **자료 구조 모듈**들에 대해 파헤쳐 봅니다. 줄서기, 투표 세기, 정렬하기 등 여러분의 코딩을 10배 더 빠르고 똑똑하게 만들어줄 마법의 도구들을 만나보세요!

---

### 📖 목차

1. **[업그레이드된 자료구조: collections 모듈](./16_01_section/)**
   - 불평 없는 딕셔너리: `defaultdict`
   - 순서를 기억하는 딕셔너리: `OrderedDict`
   - 투표 개표기: `Counter`
   - 이름이 있는 튜플: `namedtuple`
2. **[줄서기와 쌓기: stack, queue, heapq 모듈](./16_02_section/)**
   - 쌓고 빼는 스택(Stack)과 줄 서는 큐(Queue)
   - 파이썬이 제공하는 `queue` 모듈
   - 양쪽으로 뚫린 터널: `collections.deque`
   - 가장 작은 것을 쏙쏙 뽑는 마법: `heapq` 모듈
3. **[깔끔한 정리 정돈: bisect 모듈](./16_03_section/)**
   - 차례대로 끼워 넣는 이진 탐색 로직
