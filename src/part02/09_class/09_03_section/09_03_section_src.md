---
layout: default
title: "09.03 객체"
---

# 09.03 객체

파이썬에서 클래스나 인스턴스는 객체라서 내부 속성이나 메서드들에 대한 접근은 점 연 산자를 통해 검색해서 사용했다.

파이썬은 모든 제공되는 연산자를 스페셜 메서드로 정의해서 처리하므로 어떻게 연결되어 처리가 가능한가를 알아보겠다.

## 9.3.1 점(dot) 연산

파이썬은 모듈과 함수에서 변수는 직접 이름으로 네임스페이스로 접근하지만 클래스나 인 스턴스는 객체 접근을 위한 연산자를 통해 내부 네임스페이스로 접근해서 처리한다.

함수나 모듈에서도 객체 내부로 접근하기 위해서는 동일하게 점 연산을 통해 접근해서 사 용하는 패턴으로 처리된다.

이 점 연산자는 스페셜 메서드로는 조회를 위한 _ _getattribute_ _, _ _getattr_ _을 사용 하고 갱신을 위해서는 _ _setattr_ _, 삭제를 하는 경우는 _ _delattr_ _ 를 호출하도록 처리 가 된다. 이처럼 하나의 점 연산이지만 조회, 갱신, 삭제를 구분해서 스페셜 메서드(special method)가 제공되는 것을 알 수가 있다.

예제 9-23 : 초기화 처리할 때 속성에 접근

Person 클래스의 초기화(_ _init_ _) 메서드에 self라는 변수명 다음 점 연산을 정의해서 name, age를 추가하도록 정의했다.

클래스를 정의할 때 변경이 가능한 _ _setattr_ _를 재정의해서 처리한다.

인스턴스 내의 네임스페이스에 속성을 할당할 때 재정의한 메서드를 호출하는지를 확인해 본다.

```python
In : class Person :
def __init__(self, name, age) :
self.name = name
self.age = age
def __setattr__(self, name, value) :
print(" __setattr__ ", name)
self.__dict__[name] = value
```

Person(“사람”,50) 생성자를 통해 초기화 _ _init_ _ 메서드를 호출하면 그 내부에 있는 self.name, self.age에 전달된 인자를 할당한다.

이때 내부적으로 _ _setattr_ _ 메서드가 두 번 호출되어 인스턴스에 속성을 추가하는 것을 알 수 있다.

```python
In : p = Person("사람", 50)
Out: __setattr__ name
__setattr__ age
```

## 9.3.2 점 연산자 스페셜 메서드(special method) 기본 이해하기

클래스 멤버(클래스 속성과 모든 메서드), 인스턴스 멤버(인스턴스 속성)에 클래스명.멤버명, 인 스턴스명.멤버명으로 접근을 한다. 클래스는 직접 인스턴스 객체의 속성에 접근할 수 없 지만 인스턴스 객체는 클래스 멤버에 접근이 가능하다.

객체 접근 연산자가 호출되는 스페셜 메서드(special method)에 대한 기본을 알아보겠다.

자세한 사항은 스페셜 메서드(special method)를 설명하는 곳을 참조하기 바란다.

✚ 스페셜 메서드(special method)로 객체 속성 접근하기

스페셜 메서드(special method)인 _ _getattribute_ _을 통해 기본 네임스페이스에 대한 접 근이 가능하고 범위를 벗어나면 _ _getattr_ _을 불러서 처리한다.

예제 9-24 : __getattribute__를 이용해서 클래스 내부 검색

Person 클래스에 _ _getattribute_ _, _ _getattr_ _을 정의해서 점 연산이 어떻게 처리가 되는지를 알아보겠다.

속성 접근 연산자를 처리하는 _ _getattribute_ _ 메서드 내에 또 자기 자신을 부르도록 처리하면 재귀 순환이 발생한다. 재귀 순환을 없애려면 재정의할 때 상위 클래스의 _ _ getattribute_ _를 이용해서 처리한다.

```python
In : class Person :
```

job = "즐기기" def __init__(self, name, age) :

self.name = name self.age = age def __getattribute__(self, name) :

print(" attribute name ", name) return super().__getattribute__(name) def __getattr__(self, name) :

print(" attr name ", name) return Person.__dict__[name] 생성자를 통해 인스턴스를 만들면 _ _setattr_ _을 지정하지 않았지만 부모 클래스를 확인 하고 실행이 되어 인스턴스를 만든다.

인스턴스 p에서 name의 속성을 검색하면 Person 클래스에 재정의된 _ _getattribute_ _ 메서드가 바인딩되어 실행되는 것을 확인할 수 있다.

```python
In : p = Person("긍정",55)
print(p.name)
Out: attribute name name
긍정
```

인스턴스에서 클래스 속성을 참조할 경우에도 _ _getattribute_ _를 바인딩해 처리하는 것을 알 수 있다.

```python
In : p.job
Out: attribute name job
'즐기기'
```

인스턴스 p를 가지고 직접 _ _getattr_ _를 호출해도 이 메서드가 있는지를 확인하기 위해 서 _ _getattribute_ _를 먼저 실행하고 그 다음에 _ _getattr_ _메서드가 처리되어 클래스 속성을 검색해서 처리가 되는 것을 알 수 있다.

```python
In : p.__getattr__('job')
Out: attribute name __getattr__
attr name job
'즐기기'
```

예제 9-25 : attrgetter를 이용해서 속성 접근

Person 클래스로 하나의 인스턴스를 만들어 getname을 실행하면 name, age, job 속성 의 결과를 튜플로 출력한다.

```python
In : class Person :
```

job = "즐기기" def __init__(self, name, age) :

self.name = name self.age = age Person 클래스로 하나의 인스턴스를 만든다.

```python
In : p = Person("가을이",10)
```

operator.attrgetter라는 함수에 name, age, job이라는 속성을 등록해서 인스턴스가 들 어올 때 이 속성들을 조회해줄 새로운 인스턴스를 만들어 getname 변수에 할당하면 3개 의 속성이 전부 조회된 것을 알 수 있다.

```python
In : import operator
getname = operator.attrgetter("name","age","job")
print(getname)
print(getname(p))
Out: operator.attrgetter('name', 'age', 'job')
```

('가을이', 10, '즐기기')
