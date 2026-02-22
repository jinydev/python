---
layout: docs
title: "2. 나무를 타고 노는 법: ElementTree"
permalink: /part04/xml/section2/
---

# 2. 나무를 타고 노는 법: ElementTree

파이썬에서 방대한 XML 데이터를 조작할 때 가장 사랑받는 도구가 바로 `xml.etree.ElementTree` 모듈입니다. 이 마법사는 평범한 XML 텍스트 문서를 데이터들이 구조적으로 연결된 아름다운 **생명의 나무 형태(Tree)**로 변신시켜 줍니다!

> **팁**: 편의를 위해 보통 `import xml.etree.ElementTree as ET` 로 줄여 부릅니다.

## 2.1 문서 나무 심기 (Parsing)

디스크에 있는 `data.xml` 파일을 읽어 멋진 파이썬 나무 트리로 만드는 마법 주문은 `parse` 입니다.

```python
import xml.etree.ElementTree as ET

# 파일에서 묘목(데이터)을 가져와 나무를 통째로 생성합니다.
tree = ET.parse('country_data.xml')

# 나무의 가장 꼭대기(줄기)인 Root 요소를 가져옵니다.
root = tree.getroot()

print("최상위 태그 이름:", root.tag)
# 출력: 최상위 태그 이름: data
```

---

## 2.2 거대한 나무에서 보물(태그) 찾기

나무 구조의 장점은 탐색이 무척 빠르고 직관적이라는 것입니다. 가지에서 또 다른 가지로 건너갈 수 있죠.

- **`for i in root:`** : 줄기 아래 달린 큰 가지(자식 노드)들을 하나씩 다 확인할 때!
- **`find('태그명')`** : 수많은 가지 중에 '태그명'과 똑같은 **첫 번째가지** 딱 하나만 찾고 싶을 때.
- **`findall('태그명')`** : '태그명'과 똑같은 **모든 가지**를 수확해서 리스트에 몽땅 담아올 때!

```python
# root 아래에 있는 몬스터 정보를 다 뽑아보자!
for monster in root.findall('monster'):
    # 속성(attribute) 읽어오기
    name = monster.get('name')
    
    # 텍스트(text) 값 가져오기
    hp = monster.find('hp').text
    
    print(f"야생의 {name}이(가) 나타났다! 체력: {hp}")
```

---

## 2.3 내 손으로 나무 기르기 (XML 작성)

우리가 파이썬 코드상에서 새로운 노드를 덧붙여서 완전한 XML 문서를 만들어낼 수도 있습니다. 다 완성된 나무 뼈대는 `tostring`으로 텍스트로 뽑아내거나, `write`로 파일로 저장하면 끝입니다.

```python
import xml.etree.ElementTree as ET

# 1. 뿌리 뼈대 세우기
root = ET.Element("game_data")

# 2. 새로운 서브 뼈대(자식) 붙이기
player1 = ET.SubElement(root, "player", level="99") # level은 속성!
player1.text = "Dragon Slayer" 

# 3. 콘솔 화면에 멋지게 텍스트로 뽑아보기!
xml_string = ET.tostring(root, encoding="unicode")
print(xml_string)
# 출력: <game_data><player level="99">Dragon Slayer</player></game_data>

# + 4. 파일로 저장하고 싶다면?
# tree = ET.ElementTree(root)
# tree.write('my_game.xml')
```

XML로 튼튼한 데이터 창고를 짓는 파이썬 요정의 마법, 훌륭하죠?
