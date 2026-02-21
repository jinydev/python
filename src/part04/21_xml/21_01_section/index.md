---
layout: docs
title: "1. XML 왕국의 기본 법칙"
permalink: /part04/21_xml/21_01_section/
---

# 1. XML 왕국의 기본 법칙

XML은 꺾쇠 괄호 `< >` 로 데이터를 예쁘게 이름표(Tag) 붙여 포장하는 방법입니다. 누구나 자기 마음대로 이름표를 만들 수 있지만, 기계들이 서로 해석하려면 깐깐한 몇 가지 규칙을 지켜야 합니다.

이 규칙들을 완벽하게 지킨 단정한 문서를 **웰 폼(Well-formed) 문서**라고 부릅니다. 

## 1.1 지켜야 할 철칙 3가지

1. **머리말 쓰기 (Prolog)**: 문서 맨 꼭대기에 "나는 XML이고, 버전 1.0이야!"라고 외쳐야 합니다.
   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   ```
   
2. **오직 단 하나의 대왕 뿌리 (Root)**: 문서 전체를 감싸는 최상위 껍질(Root)은 딱 하나만 있어야 합니다.
   ```xml
   <root>
       <!-- 모든 데이터는 이 안에 들어가야 합니다! -->
       <child>안녕하세요</child>
   </root>
   ```
   
3. **열었으면 반드시 닫기!**: `<태그>`로 문을 열었으면, 반드시 `</태그>`로 닫아야 합니다.
   ```xml
   <name>파이썬</name>   <!-- 올바름! -->
   <name>자바스크립트    <!-- 틀림! 닫는 태그 부족 폭발! -->
   ```

---

## 1.2 이름 충돌 막기: 네임스페이스(Namespace)

여러 명이 만든 데이터를 합치다 보면, 우연히 똑같은 `<table/>` 이라는 태그를 쓸 수도 있습니다. 하나는 '데이터 표(table)'고, 하나는 '가구 책상(table)'일 수 있죠. 

이런 충돌을 막기 위해 가문의 성씨 역할을 하는 **네임스페이스**를 붙입니다.

```xml
<root 
  xmlns:html="http://www.w3.org/TR/html14/"  
  xmlns:furn="http://www.w3schools.com/furniture">
  
  <!-- html 가문의 표(table) -->
  <html:table>
    <html:tr><html:td>사과</html:td></html:tr>
  </html:table>

  <!-- 가구 가문의 책상(table) -->
  <furn:table>
    <furn:name>멋진 나무 탁자</furn:name>
    <furn:width>80</furn:width>
  </furn:table>

</root>
```

이렇게 하면 컴퓨터가 태그 이름이 같아도 절대 헷갈리지 않고 착착 분류해냅니다!
