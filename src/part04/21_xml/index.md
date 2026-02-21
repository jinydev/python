---
layout: docs
title: "Chapter 21. 데이터의 거대한 나무: XML 세계로의 모험"
permalink: /part04/21_xml/
---

# Chapter 21. 데이터의 거대한 나무: XML 세계로의 모험

![XML 컨셉](/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd/xml_concept_upper_ele_16x9_1771691401673.png)

서로 말이 통하지 않는 컴퓨터 두 대가 데이터를 주고받아야 한다면 어떨까요? 컴퓨터 세계에서는 언어가 달라도 모두가 이해할 수 있는 '만국 공통어' 문서 양식이 필요합니다. 그중 아주 오랫동안 사랑받아 온 클래식한 언어가 바로 **XML(eXtensible Markup Language)**입니다.

XML은 커다란 박스 안에 작은 박스, 그 안에 다시 빛나는 보석 같은 데이터들이 들어있는 **러시아 인형(마트료시카)이나 가지가 무성한 거대한 나무(Tree)** 구조와 같습니다. 웹이나 안드로이드 앱 같은 다양한 곳에서 뼈대로 쓰이는 이 XML 창고를 파이썬으로 가볍게 분해하고 조립하는 방법을 탐험해 봅시다!

---

### 📖 목차

1. **[XML 왕국의 기본 법칙](./21_01_section/)**
   - 웰 폼(Well-formed) 문서란?
   - 루트(Root), 자식(Child), 속성(Attribute) 꼬리표 붙이기
   - 중복 방패: 네임스페이스(Namespace)
   
2. **[나무를 타고 노는 법: `ElementTree`](./21_02_section/)**
   - XML을 나무 구조로 변환하기 (`parse`, `fromstring`)
   - 나뭇가지(Element) 순회하며 보물 찾기 (`findall`, `iterfind`)
   - 새 나뭇가지 붙이고 XML 문서 만들기 (`SubElement`, `write`)
   
