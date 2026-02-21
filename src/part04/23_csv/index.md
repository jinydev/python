---
layout: docs
title: "Chapter 23. 데이터 줄 세우기: CSV 데이터 처리"
permalink: /part04/23_csv/
---

# Chapter 23. 데이터 줄 세우기: CSV 데이터 처리

![CSV 컨셉](/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd/csv_concept_upper_ele_16x9_1771691637855.png)

엑셀(Excel) 프로그램을 상상해 보세요. 칸칸이 데이터가 들어있는 아주 멋진 표가 있죠? 하지만 엑셀 파일은 색깔, 글꼴, 셀 병합 같은 너무 많은 꾸밈 정보가 들어 있어서 프로그램으로 가볍게 데이터를 주고받기엔 꽤 뚱뚱하고 무겁습니다.

그래서 온 세상 프로그래머들은 "화려한 껍데기는 다 버리고, 오직 **데이터(값)**만 **쉼표(,)**로 구분해서 가볍게 저장하자!"라는 규칙을 만들었습니다. 이것이 바로 **CSV(Comma-Separated Values)** 파일입니다!

파이썬은 이 쉼표 투성이인 복잡한 텍스트 파일을 아주 예쁜 표(데이터 리스트)로 순식간에 정리해주는 스마트 머신, `csv` 모듈을 가지고 있습니다. 지금부터 데이터 정리의 달인이 되어 봅시다!

---

### 📖 목차

1. **[쉼표로 정리하는 마법: CSV 읽기와 쓰기](./23_01_section/)**
   - CSV 파일의 규칙과 반복자(Iterator)의 특징
   - 리스트로 읽어오기 (`reader`), 저장하기 (`writer`)
   - 딕셔너리로 읽어오기 (`DictReader`), 저장하기 (`DictWriter`)
   - 탭(Tab)으로 구분하는 쌍둥이, TSV 파일
2. **[내 맘대로 룰 정하기: 커스텀 규칙(Dialect)](./23_02_section/)**
   - 쉼표 말고 다른 기호를 쓰고 싶다면?
   - 나만의 분리 규칙 등록하기 (`register_dialect`)
