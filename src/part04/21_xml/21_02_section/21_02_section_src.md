---
layout: default
title: "21.02 XML"
---

# 21.02 XML

파이썬 내의 XML을 처리하는 모듈을 알아보겠다. 이 책에서는 xml.etee.ElementTree 패키지만 설명한다.

## 21.2.1 xml.ElementTree 패키지 내의 주요 클래스

ElementTree는 전체 XML 문서를 Tree로 나타내고 Element는이 Tree에서 단일 노드 를 나타낸다. 전체 문서와의 상호 작용(파일 읽기 및 쓰기)은 일반적으로 ElementTree 수준 에서 수행되고, 단일 XML 요소 및 해당 하위 요소와의 상호 작용은 요소 수준에서 수행 한다.

예제 21-2 : ElementTree 모듈

ElementTree 모듈 내의 클래스와 함수들을 확인해본다. 이 중에 Element, SubElement, ElementTree 클래스를 중심으로 알아보겠다.

```python
In : import xml.etree.ElementTree as ET
count = 0
for i in dir(ET) :
if not i.startswith("_") :
print(i, end=" ")
count += 1
if count % 5 == 0 :
print()
Out: Comment Element ElementPath ElementTree HTML_EMPTY
PI ParseError ProcessingInstruction QName SubElement
TreeBuilder VERSION XML XMLID XMLParser
XMLPullParser collections contextlib dump fromstring
fromstringlist io iselement iterparse parse
re register_namespace sys tostring tostringlist
warnings
```

ElementTree 클래스는 XML 파일을 파싱하면 Elememt를 Tree 구조로 만들어서 태그들 에 대한 정보를 검색하여 처리할 수 있는 메서드를 제공한다.

```python
In : import xml.etree.ElementTree as ET
print(ET.ElementTree)
count = 0
for i in dir(ET.ElementTree) :
if not i.startswith("_") :
print(i, end=" ")
count += 1
if count % 5 == 0 :
print()
Out: <class 'xml.etree.ElementTree.ElementTree'>
find findall findtext getiterator getroot
iter iterfind parse write write_c14n
```

XML 파일을 파싱하면 root와 하위 Element 간의 Tree 구조를 만든다. 이런 형태의 관계 를 구성하는 클래스이다.

Element 클래스는 XML 태그에 가지는 정보를 보관해서 처리할 수 있는 클래스이다. 아 래의 속성과 메서드를 이용해서 요소를 검색하거나 추가할 수도 있고 새로운 요소도 만들 어서 추가가 가능하다.

```python
In : import xml.etree.ElementTree as ET
print(ET.Element)
count = 0
for i in dir(ET.Element) :
if not i.startswith("_") :
print(i, end=" ")
count += 1
if count % 5 == 0 :
print()
Out: <class 'xml.etree.ElementTree.Element'>
append attrib clear extend find
findall findtext get getchildren getiterator
insert items iter iterfind itertext
keys makeelement remove set tag
tail text
```

## 21.2.2 XML 문서 파싱하기

XML 문서를 가지고 파싱(parsing)을 하면 ElementTree 구조를 만들고 각 태그별로 Element 클래스의 인스턴스로 만들어진다. 파싱된 결과를 가지고 XML 문서들이 어떤 구 조인지를 알아보겠다.

예제 21-3 : XML 문서 만들고 파싱하기

하나의 XML 문서를 만들어서 파일로 저장한다.

```python
In : %%writefile country_data.xml
<?xml version="1.0"?>
```

<data> Root 처리 <country name="Liechtenstein"> <rank>1</rank> <year>2008</year> <gdppc>141100</gdppc> <neighbor name="Austria" direction="E"/> <neighbor name="Switzerland" direction="W"/> </country> <country name="Singapore"> <rank>4</rank> <year>2011</year> <gdppc>59900</gdppc> <neighbor name="Malaysia" direction="N"/> </country> <country name="Panama"> <rank>68</rank> <year>2011</year> <gdppc>13600</gdppc> <neighbor name="Costa Rica" direction="W"/> <neighbor name="Colombia" direction="E"/> </country> </data>

```python
Out: Writing country_data.xml
```

ElementTree 모듈 내의 parse 함수를 통해 ElementTree 클래스를 만들어서 Tree를 만 든다. ElementTree.getiterater 메서드를 통해 Tree를 구성한 Element를 전부 조회해 본다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.parse('country_data.xml')
print(type(tree))
s = tree.getiterator()
for i in s :
print(i)
Out: <class 'xml.etree.ElementTree.ElementTree'>
<Element 'data' at 0x0000000005566D18>
<Element 'country' at 0x000000000558AB38>
<Element 'rank' at 0x000000000558A1D8>
<Element 'year' at 0x000000000558AC78>
<Element 'gdppc' at 0x000000000558A278>
<Element 'neighbor' at 0x000000000558AAE8>
<Element 'neighbor' at 0x000000000558AA98>
<Element 'country' at 0x000000000558A7C8>
<Element 'rank' at 0x000000000558A728>
<Element 'year' at 0x000000000558A2C8>
<Element 'gdppc' at 0x0000000005584138>
<Element 'neighbor' at 0x0000000005584188>
<Element 'country' at 0x00000000055841D8>
<Element 'rank' at 0x0000000005584228>
<Element 'year' at 0x0000000005584278>
<Element 'gdppc' at 0x00000000055842C8>
<Element 'neighbor' at 0x0000000005584318>
<Element 'neighbor' at 0x0000000005584368>
```

XML에서로 파싱한 Tree에서 getroot 메서드로 최상위 Element를 전달받는다. 이것을 출력해보면 Element 클래스의 인스턴스라는 것을 알 수가 있다.

```python
In : print(type(tree))
root = tree.getroot()
print(root)
print(type(root))
Out: <class 'xml.etree.ElementTree.ElementTree'>
<Element 'data' at 0x0000000005566D18>
<class 'xml.etree.ElementTree.Element'>
```

ElementTree 모듈 내의 ElementTree 클래스의 매개변수에 file과 파일명을 문자열로 입 력해서 파싱할 수 있다. 파싱한 결과에서 getroot 메서드를 통해 최상위 Element를 가져 오고 Element 객체로 만들어져 있는지를 확인한다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file='country_data.xml')
print(tree)
root = tree.getroot()
print(root)
print(type(root))
Out: <xml.etree.ElementTree.ElementTree object at 0x0000000005586D30>
<Element 'data' at 0x0000000005566368>
<class 'xml.etree.ElementTree.Element'>
```

예제 21-4 : Element 내부 속성과 메서드 확인하기

XML 각 태그들은 한 Element 객체의 인스턴스 객체이므로 최상위 인스턴스 객체 내에 있는 속성과 메서드를 확인해보면 Element 내의 태그 이름, 속성은 딕셔너리 자료형으로 제공하고 tail과 text 값을 출력한다.

```python
In : print(root)
print(root.tag)
print(root.attrib)
print(root.tail)
print(root.text)
Out: <Element 'data' at 0x0000000005566368>
data
{}
None
Root 처리
```

root에서 getchildren 메서드를 호출해서 3개의 자식 Element를 가져온다. 그 내부의 name 속성을 get 메서드를 이용해서 검색한다.

```python
In : country = root.getchildren()
print(country[0])
print(country[0].get("name"))
print(country[1])
print(country[1].get("name"))
print(country[2])
print(country[2].get("name"))
Out: <Element 'country' at 0x0000000005566048>
Liechtenstein
<Element 'country' at 0x00000000055668B8>
Singapore
<Element 'country' at 0x000000000558AEF8>
Panama
```

root에서 getchildren 메서드를 호출해서 자식 Element 내의 keys와 items 메서드로 Element 내부 관리 속성들을 조회해서 가져온다.

```python
In : print(country[0])
print(country[0].get("name"))
print(country[0].keys())
print(country[0].items())
Out: <Element 'country' at 0x0000000005566048>
Liechtenstein
['name']
[('name', 'Liechtenstein')]
```

하위 태그에 대한 정보를 getchildren 메서드를 호출해서 검색한다.

```python
In : for i in country[0].getchildren() :
print(i)
Out: <Element 'rank' at 0x00000000055661D8>
<Element 'year' at 0x0000000005566458>
<Element 'gdppc' at 0x0000000005566548>
<Element 'neighbor' at 0x0000000005566278>
<Element 'neighbor' at 0x00000000055662C8>
```

## 21.2.3 XML 문서 순환 조회

파이썬에서 XML 문서도 반복자 자료형에 속한다. 순환을 편리하게 처리할 수 있으므로 어떻게 처리하는지를 알아보겠다.

예제 21-5 : 순회 처리 알아보기

하나의 XML 문서를 만든다.

```python
In : %%writefile doc.xml
<?xml version="1.0" ?>
<doc>
<branch name="testing" hash="1cdfo45c">
text, source
</branch>
<branch name="release01" hash="f200013e">
test processing
<sub-branch name="subrelease01">
xml, sgml, html
</sub-branch>
</branch>
<branch name="invalid">
xml parsing
</branch>
</doc>
Out: Overwriting doc.xml
```

반복형이나 반복자로 점검하면 False가 나오지만 XML을 파싱한 결과의 클래스 내에 __ getitem__ 메서드가 존재하므로 반복형을 처리할 수 있다.

순환문으로 내부의 자식에 대한 정보를 확인해보면 3개 Element가 출력되는 것을 확인할 수 있다.

```python
In : import xml.etree.ElementTree as ET
import collections.abc as cols
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
print(issubclass(type(root), cols.Iterable))
print(issubclass(type(root), cols.Iterator))
for i in root :
print(i)
Out: False
False
<Element 'branch' at 0x000000000559D8B8>
<Element 'branch' at 0x000000000559D908>
<Element 'branch' at 0x000000000559D9F8>
```

순환이 되므로 반복자를 만들어서 next 함수를 통해 반복자를 처리한다. 반복자인 경우는 Tree를 구성한 전체를 검색하는 것을 알 수 있다.

```python
In : a = root.iter()
print(a)
print(issubclass(type(a), cols.Iterable))
print(issubclass(type(a), cols.Iterator))
print(next(a))
print(next(a))
print(next(a))
print(next(a))
print(next(a))
print(next(a))
Out: <_elementtree._element_iterator object at 0x000000000558DEB8>
True
True
<Element 'doc' at 0x0000000005567F48>
<Element 'branch' at 0x000000000559D8B8>
<Element 'branch' at 0x000000000559D908>
<Element 'sub-branch' at 0x000000000559D958>
<Element 'branch' at 0x000000000559D9F8>
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-13-9f7638537f59> in <module>()
9 print(next(a))
10 print(next(a))
---> 11 print(next(a))
StopIteration:
```

XML 문서를 반복해서 내부의 속성인 태그와 attrib를 출력한다. Root 요소에는 태그가 있지만 속성들을 가지고 있지 않아 빈 딕셔너리가 출력되고 자식 요소들에는 속성들이 있 어서 딕셔너리로 속성들을 출력하는 것을 볼 수 있다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
for child_tag in root :
print(child_tag.tag, child_tag.attrib, child_tag.text)
Out: branch {'name': 'testing', 'hash': '1cdfo45c'}
text, source
branch {'name': 'release01', 'hash': 'f200013e'}
test processing
branch {'name': 'invalid'}
xml parsing
```

## 21.2.4 xpath를 이용해서 순환 처리

XML 문서를 순환할 때 특정 경로를 지정해서 주면 그 범위 내에 해당하는 요소들만 처리 할 수 있다. Xpath로 접근할 수 있는 범위를 지정해서 처리하는 것을 알아본다.

예제 21-6 : 특정 태그 찾기

파싱된 root부터 특정 태그를 찾는 find 함수를 이용하면 찾고자 하는 태그의 이름을 넣어 서 검색한다. 동일한 태그 중에 첫 번째로 만나는 것을 찾아준다.

동일한 태그들이 여러 개가 있을 경우 findall 메서드를 이용해서 검색한 후에 각 태그의 내부를 조회하는 것을 권장한다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
print(root.find("branch").tag)
print(root.findtext("branch"),end=" ")
b = root.findall("branch")
for child_tag in b :
a = child_tag.text
print(a, end = " ")
Out: branch
text, source
text, source
test processing
xml parsing
```

특정 태그의 text를 조회하기 위해 findtext에 인자를 Xpath로 branch/sub-branch를 넣어서 찾으면 이 XML 문서에 하나만 있다는 값을 출력한다. 이것은 find 메서드로 검색 해서 text 속성으로 조회하는 것과 동일하다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
print(root.findtext("branch/sub-branch"))
print(root.find("branch/sub-branch").text)
Out:       xml, sgml, html
xml, sgml, html
```

예제 21-7 : 반복자를 이용해서 태그 찾기

ElementTree로 파싱한 Tree 구조의 iterfind 메서드에 Xpath로 branch를 지정해서 검 색하면 동일한 태그인 branch가 검색되어 나온다. Find 메서드와의 차이점은 동일한 태 그들이 있을 경우 전부 검색되어 나온다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
for i in root.iterfind("branch") :
print(i.tag, i.attrib, i.text)
Out: branch {'name': 'testing', 'hash': '1cdfo45c'}
text, source
branch {'name': 'release01', 'hash': 'f200013e'}
test processing
branch {'name': 'invalid'}
xml parsing
```

모든 하위 요소를 선택하려면 *를 이용해서 모든 것의 내부에 자식으로 sub-branch를 식 별하라고 했다. 곧 "* //sub-branch"으로 지정된 하나의 효소만 식별되어 결과를 출력하 는 것을 확인할 수 있다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
for i in root.iterfind("*//sub-branch") :
print(i.tag, i.attrib, i.text)
Out: sub-branch {'name': 'subrelease01'}
xml, sgml, html
```

XML문 내에서 특정 속성을 포함한 요소를 검색하도록 했다. 현재 branch 요소에 name 속성을 가진 것이 3개 중에 name 내의 명확한 값을 지정해서 검색이 가능하다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
for i in root.iterfind("branch[@name='invalid']") :
print(i.tag, i.attrib, i.text)
Out: branch {'name': 'invalid'}
xml parsing
```

문서에 있는 text를 조회해서 전부 출력해보자. itertext 메서드를 이용해서 전체를 조회할 수 있다.

```python
In : import xml.etree.ElementTree as ET
tree = ET.ElementTree(file="doc.xml")
root = tree.getroot()
for i in root.itertext() :
print(i, end="")
Out:
text, source
test processing
xml, sgml, html
xml parsing
```

## 21.2.5 XML 문서 생성하기

XML 모듈을 이용해서도 xml 문서를 만들 수 있다. Element 클래스를 이용해서 태그가 필요한 노드를 만들고 하위 노드도 추가해서 노드들 간의 관계를 가지고 붙이면 하나의 XML 문서 형태를 만든다. 이를 가지고 파일에 저장하면 XML 문서로 사용할 수 있다.

✚ XML 문서의 요소 추가하기

XML 문서를 구성하기 위해서는 root 요소부터 정의하고 그 자식들의 요소들을 추가해서 만들어야 한다.

예제 21-8 : Element 생성해서 요소 만들기

Element를 가지고 root와 child를 만들고 root에 append 메서드로 child 태그를 root 의 하위 태그로 붙인다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root")
print(root)
print(root.tag)
child = ET.Element("child")
print(child)
print(child.tag)
root.append(child)
ET.dump(root)
Out: <Element 'root' at 0x000000000567C4A8>
root
<Element 'child' at 0x000000000567C868>
child
<root><child /></root>
```

Element로 만들어서 append로 붙여도 되지만 SubElement 클래스를 이용하여 직접 하 위 요소를 생성해서 dump 함수를 통해 문서를 확인한다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root")
print(root)
print(root.tag)
ET.SubElement(root,"child2")
ET.dump(root)
Out: <Element 'root' at 0x00000000056810E8>
root
<root><child2 /></root>
```

Element의 insert 메서드를 통해 요소의 위치를 지정해서 추가할 수 있다. 요소 child3를 만들고 2번째 위치에 넣으려면 insert 메서드를 이용해서 처리한다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root")
print(root)
print(root.tag)
ET.SubElement(root,"child2")
child3 = ET.Element("child3")
root.insert(2,child3)
ET.dump(root)
Out: <Element 'root' at 0x000000000567C458>
root
<root><child2 /><child3 /></root>
```

Element로 추가된 XML 문서의 요소 중 remove 메서드를 통해 특정 요소를 삭제할 수 있다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root")
print(root)
print(root.tag)
ET.SubElement(root,"child2")
child3 = ET.Element("child3")
root.insert(2,child3)
root.remove(child3)
ET.dump(root)
Out: <Element 'root' at 0x000000000567CD68>
root
<root><child2 /></root>
```

✚ XML 문서의 요소 내에 속성 추가하기

각 요소들을 만들 때 내부에 속성을 추가할 수 있다. 속성에 대한 정보는 요소를 식별하기 위해서는 반드시 필요한 것이므로 요소를 정의할 때 속성에 대한 부분도 많이 고려되어야 한다.

예제 21-9 : Element 생성 시 속성 추가

Element 요소가 만들어지면 특성 속성은 attrib[“속성명”] = 값을 넣어서 속성을 추가할 수 있다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root", interesting="totally")
print(sorted(root.keys()))
for name, value in sorted(root.items()):
print('%s = %r' % (name, value))
Out: ['interesting']
interesting = 'totally'
```

Element 내의 set 메서드를 이용해서 키와 값을 주고 속성을 추가할 수 있다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root", interesting="totally")
root.set("hello", "Huhu")
print(sorted(root.keys()))
for name, value in sorted(root.items()):
print('%s = %r' % (name, value))
Out: ['hello', 'interesting']
hello = 'Huhu'
interesting = 'totally'
```

Element 내에 들어와 있는 속성은 딕셔너리로 관리되므로 get 메서드로 확인하거나 인덱 스를 통해 검색 및 갱신도 가능하다.

```python
In : attributes = root.attrib
print(attributes["interesting"])
print(attributes.get("no-such-attribute"))
attributes["hello"] = "Guten Tag"
print(attributes["hello"])
print(root.get("hello"))
Out: totally
None
Guten Tag
Guten Tag
```

✚ XML을 문자열 처리하기

XML 문서를 만들어서 문자열로 볼 수도 있고 문자열 내에 들어간 XML를 바로 XML 문서 로 전환도 가능하다.

예제 21-10 : XML 문서를 만들고 문자열로 보기

XML 문서를 만들고 이를 tostirng 함수로 출력하면 문자열로 보이는 것을 확인할 수 있다. ElementTree 클래스를 tostring 함수로 출력하면 예외가 발생하므로 Element 클 래스로 만들어져 있는 인스턴스 객체를 인자로 넣어서 처리해야 한다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element("root")
print(root)
print(root.tag)
root.append( ET.Element("child1") )
child2 = ET.SubElement(root, "child2")
child3 = ET.SubElement(root, "child3")
print(ET.tostring(root))
Out: <Element 'root' at 0x0000000005605228>
root
b'<root><child1 /><child2 /><child3 /></root>'
```

문자열로 작성된 것을 fromstring으로 처리하면 파싱 처리가 된 상태로 변수에 할당이 된다. 이를 tostring으로 처리하면 바로 출력이 된다.

```python
In : import xml.etree.ElementTree as ET
xml_ = ET.fromstring('''<?xml version="1.0"?>
<!DOCTYPE root SYSTEM "test" [ <!ENTITY tasty "parsnips"> ]>
<root>
<a>&tasty;</a>
</root>
''')
print(ET.tostring(xml_))
Out: b'<root>\n<a>parsnips</a>\n</root>'
```

예제 21-11 : XML 문서를 파일 저장하기

BytesIO에 저장된 XML 문서를 읽어와서 파싱을 처리하고 문자열로 출력해본다.

```python
In : from io import BytesIO
import xml.etree.ElementTree as ET
file_like_object = BytesIO(b"<root>data</root>")
tree = ET.parse(file_like_object)
root = tree.getroot()
print(ET.tostring(root))
Out: b'<root>data</root>'
```

StringIO로 처리된 경우도 이를 파싱하고 태그를 검색해서 처리가 가능하다.

```python
In : import xml.etree.ElementTree as ET
from io import StringIO
f = StringIO('<foo><bar></bar></foo>')
tree = ET.parse(f)
root = tree.getroot()
print(root)
r = root.find('bar')
print(r.tag)
Out: <Element 'foo' at 0x000000000566AA48>
bar
```

파싱도 iterparse를 통해 반복자로 처리가 가능하다. 반복자로 만들어지면 한 번씩 실행해 서 결과를 가져와 처리가 가능하다. 특정 태그를 읽어서 그 내부의 text를 출력하게 했다.

```python
In : import xml.etree.ElementTree as ET
from io import BytesIO
some_file_like = BytesIO(b"<root><a><b>data</b></a><a><b/></a></root>")
for event, element in ET.iterparse(some_file_like):
if element.tag == 'b':
print(element.text)
elif element.tag == 'a':
print("** cleaning up the subtree")
element.clear()
Out: data
** cleaning up the subtree
None
** cleaning up the subtree
```

문자열로 XML 문서 하나를 만든다.

```python
In : import xml.etree.ElementTree as ET
input = '''
<stuff>
<users>
<user x="2">
<id>001</id>
<name>Chuck</name>
</user>
<user x="7">
<id>009</id>
<name>Brent</name>
</user>
</users>
</stuff>'''
```

특정 내부의 태그를 읽어와서 태그에 들어간 원소를 확인하고 자기 태그 내부의 속성과 자 식 태그를 읽고 그 내부에 있는 태그의 텍스트를 조회해서 출력한다.

```python
In : stuff = ET.fromstring(input)
lst = stuff.findall('users/user')
print('User count:', len(lst))
for item in lst:
print('Name', item.find('name').text)
print('Id', item.find('id').text)
print('Attribute', item.get("x"))
Out: FUser count: 2
Name Chuck
Id 001
Attribute 2
Name Brent
Id 009
Attribute 7
```

XML를 생성하고 ElementTree 클래스 내부의 write 메서드를 이용해서 파일에 저장한 뒤 바로 파일을 읽어 문자열로 출력한다.

```python
In : import xml.etree.ElementTree as ET
root = ET.Element('QuoteWerksXML')
tree = ET.ElementTree(root)
ver = ET.SubElement(root, "AppVersionMajor")
ver.text = '5.1'
tree.write(open('person.xml', 'wb'))
tree = ET.parse('person.xml')
root_ = tree.getroot()
print(ET.tostring(root_))
Out: b'<QuoteWerksXML><AppVersionMajor>5.1</AppVersionMajor></
QuoteWerksXML>'
CHAPTER
JSON
```

JSON은 JavaScript Object Notation의 약자로서 JavaScript 문법에 영향을 받아 개발된 Lightweight한 데이터 표현 방식이다. JSON은 데이터를 교환하는 한 포맷으로서 그 단 순함과 유연함 때문에 널리 사용되고 있다. 특히 웹 브라우저와 웹 서버 사이에 데이터를 교환하는 데 많이 사용되고 있다.

✚ 알아볼 주요 내용

● JSON과 파이썬 자료형 비교

● JSON과 파이썬 간의 특화된 자료형 변환하는 법

● JSON으로 파일 저장 및 읽기
