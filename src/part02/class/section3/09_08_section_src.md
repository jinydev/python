---
layout: default
title: "09.08 메타"
---

# 09.08 메타

파이썬에서 인스턴스의 자료형을 알아보기 위해 type 클래스를 앞에서 많이 사용했다. 이 클래스는 자료형만을 알아보기 위해 사용하는 것이 아니다.

이 클래스는 최상위 object 클래스처럼 파이썬의 기본이 되는 메타 클래스이다.

파이썬은 클래스를 만드는 메타 클래스가 있어 모든 것은 이 메타 클래스에 의해 클래스가 만들어지는 구조를 기반으로 한다. 추상화 클래스를 만들 때도 추상화 메타 클래스가 있 어야 하며 추상화 메타 클래스도 type으로 만든다.

사용자 메타 클래스를 만들어서 어떻게 실행되는지도 상세히 알아보기로 하겠다.

## 9.8.1 메타 클래스와 클래스 정의로 클래스 만들고 비교하기

메타 클래스는 클래스를 만드는 클래스이다. 파이썬은 class 키워드로도 클래스를 만들 수 있다. 두 가지로 만들어진 클래스가 동일한지를 확인해보면 왜 메타 클래스가 있어야 하 는지를 알 수가 있다.

✚ 파이썬에서 메타 클래스로 클래스가 만들어지는 순서

메타 클래스를 이용할 때 순서는 적절한 클래스를 결정하고, 클래스 네임스페이스가 준비 된다. 클래스 본체가 실행된 후에 최종적으로 클래스 객체를 생성하고 반환값으로 제공 한다.

예제 9-53 : 메타 클래스로 클래스 생성하기

네임스페이스를 딕셔너리 자료형으로 만들고, 상속 관계도 정의하고 나서 메타 클래스인 type에 인자로 클래스명, 상속 관계, 네임스페이스를 넣고 실행을 시키면 클래스가 만들 어지고 이것을 변수에 할당한다.

```python
In : import pprint
```

namespace = { 'name' : "메타 클래스로 클래스 생성"} bases = (object,) classname = "Klass" Klass = type(classname, bases, namespace) 만들어진 변수의 타입을 조회해보면 메타 클래스를 위해 만들어졌다고 표시하고 내부의 네임스페이스를 확인하면 name 속성이 들어가 있는 것을 볼 수 있다.

```python
In : print(type(Klass))
print(Klass)
pprint.pprint(Klass.__dict__)
Out: <class 'type'>
<class '__main__.Klass'>
mappingproxy({'__dict__': <attribute '__dict__' of 'Klass' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass'
objects>,
```

'name': '메타 클래스로 클래스 생성'}) 클래스 정의문으로 클래스를 만들어서 메타 클래스로 만들어진 것과 비교해도 동일한 형 태가 나온다. 메타 클래스로 클래스가 만들어졌다는 것을 알 수 있다.

```python
In : class Klass :
```

name = " 클래스 정의문으로 클래스 생성" print(type(Klass)) print(Klass) pprint.pprint(Klass.__dict__)

```python
Out: <class 'type'>
<class '__main__.Klass'>
mappingproxy({'__dict__': <attribute '__dict__' of 'Klass' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass'
objects>,
```

'name': ' 클래스 정의문으로 클래스 생성'})

## 9.8.2 클래스 상속과 메타 클래스의 관계

클래스 상속은 _ _bases_ _에 보관되지만 사용자 클래스를 만든 메타 클래스는 _ _class_ _ 에 보관한다.

사용자 클래스와 메타 클래스의 관계는 메타 클래스로 사용자 클래스를 만든 것이므로 하 나의 인스턴스가 된다. 이런 instance of 관계에 대한 정보는 _ _class_ _에 보관하여 관리 된다.

사용자 메타 클래스를 만들고 이를 사용자 클래스에 정의하면 메타 클래스 정보가 바 뀐다.

✚ 사용자 metaclass 만들기

사용자 정의 클래스 Meta가 메타 클래스 type을 상속받으면 사용자 정의 메타 클래스가 만들어진다. 이 메타 클래스를 상속 관계가 표시되는 곳에 metaclass=Meta 키워드 인자 로 변경하면 사용자 클래스의 메타 클래스가 변경된다.

예제 9-54 : 사용자 메타 클래스로 변경하기

Meta라는 사용자 정의 메타 클래스를 만들었지만 하는 일이 없는 메타 클래스를 만들었 고 A 클래스를 만들 때 메타 클래스로 Meta를 지정했다.

```python
In : class MyMeta(type) :
pass
class Klass(metaclass=MyMeta) :
pass
```

A 클래스를 만든 클래스의 정보를 _ _class_ _에서 확인해보면 Meta 클래스라 출력된 것 을 확인할 수 있다.

```python
In : print(Klass)
print(Klass.__class__)
Out: <class '__main__.Klass'>
<class '__main__.MyMeta'>
```
