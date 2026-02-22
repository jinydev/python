---
layout: default
title: "21.01 XML"
---

# 21.01 XML

파이썬 XML 모듈은 XML을 파싱해서 내부의 Element를 찾아서 처리할 수 있는 함수나 메서드들을 제공한다.

## 21.1.1 XML

XML을 처리하기 위해서는 기본적인 구조를 이해해야 한다.

✚ 웰 폼(Well-formed) :

웰 폼 문서는 모든 XML의 구문을 허용한다. 예를 들어, 한 요소가 닫기 태그와 자체 닫기 없이 열기 태그를 가지고 있으면, 웰 폼이라고 부르지 않는다. 웰 폼이 아닌 문서는 XML 이 된다고 말하지 않는다. 순응 파서는 이를 처리하도록 허용하지 않는다.

✚ 유효 문서

유효 문서는 추가적으로 몇 가지 의미적 규칙을 허용한다. 이러한 규칙들은 사용자 정의 로 되어 있거나, XML 계획 또는 DTD로 포함된다. 예를 들어, 어느 문서가 정의되지 않은 태그를 포함하고 있으면, 유효한 것이 아니다. 유효화 파서는 이를 처리하도록 허용하지 않는다.

## 21.1.2 XML 구조

일단 간단히 XML로 문서를 작성하는 방법에 대해 알아보기로 하겠다.

예제 21-1 : xml prolog

XML 문서를 만들 때 XML 문서에 기본 정보를 선언하는 것을 xml prolog라고 한다.

<?xml version="1.0" encoding="UTF-8" ?> 이 문장처럼 버전과 인코딩에 대한 기본 정보를 XML 문서의 최상단에 표시한다.

```python
In : <?xml version="1.0" encoding="UTF-8" ?>
<note>
<to>Tove</to>
<from>Jandi</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
<note>
```

XML은 반드시 하나의 root tag로부터 시작해야 한다. 모든 XML 문서에서 최상위 root가 하나만 존재한다.

```python
In : <root>
<child>
<subchild> ...</subchild>
</child>
</root>
```

항상 시작과 끝이 구성되어야 하므로 반드시 Element에 closing 태그를 가져야 한다.

```python
In : <p>This is a paragraph</p>
<br />
```

주석 표시는 태크들이 무엇을 하는지를 추가적으로 표시할 수 있다. 이것을 주석이라고 하며 아래처럼 표시해서 적으면 XML 문서에서는 표현되지 않는다.

```python
In : <!-- This is a comment -->
```

XML 문장이 길어지면 동일한 태그가 많아진다. 이를 구분하기 위해 태그를 관리할 네임 스페이스를 지정할 수 있다. Xmlns: 네임스페이스 관리명 = “네임스페이스 구분명”을 지 정하고 각 태그의 앞에 구분하는 네임스페이스를 지정해서 중복을 방지해야 한다.

```python
In : <root>
<h:table xmlns:h="http://www.w3.org/TR/html14/">
<h:tr>
<h:td>Apples</h:td>
<h:td>Bananas</h:td>
</h:tr>
</h:table>
<f:table xmlns:f="http://www.w3schools.com/furniture">
<f:name>African Coffee Table </name>
<f:width>80</width>
<f:length>120</length>
</f:table>
</root>
```

네임스페이스를 root 내의 속성으로 지정하고 하위 태그명에 이름을 붙여서 관리하는 것 이 더 가독성이 높다.

```python
In : <root
xmlns:h="http://www.w3.org/TR/html14/"
xmlns:f="http://www.w3schools.com/furniture">
<h:table>
<h:tr>
<h:td>Apples</h:td>
<h:td>Bananas</h:td>
</h:tr>
</h:table>
<f:table >
<f:name>African Coffee Table </name>
<f:width>80</width>
<f:length>120</length>
</f:table>
</root>
```
