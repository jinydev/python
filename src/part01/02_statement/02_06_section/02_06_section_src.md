---
layout: default
title: "02.06 단순한"
---

# 02.06 단순한

네임스페이스가 어떻게 작동하는지를 확인하기 위해 파이썬 내의 types 모듈에서 제공하 는 SimpleNamespace 클래스를 확인하고 이 클래스가 어떻게 구성되었는지를 클래스로 정의해서 작동되는 원리를 알아본다.

예제 2-50 : 간단한 네임스페이스 처리

모듈 types 내의 SimpleNamespace 클래스는 단순하게 네임을 관리하는 클래스의 기능 만을 제공한다.

인스턴스 생성을 위한 초기화 부분과 _ _repr_ _로 출력하는 것만 제공한다.

일단 이 모듈을 이용해서 간단하게 인스턴스를 생성하고 name과 age를 추가해서 출력해 본다.

```python
In : import types
In : c = types.SimpleNamespace(name="dahl")
print(type(c))
print(c.name)
c.age = 50
print(c.__dict__)
Out: <class 'types.SimpleNamespace'>
dahl
{'name': 'dahl', 'age': 50}
```

위의 SimpleNamespace를 사용자 클래스로 정의하고 동일하게 출력한다. 일단 클래 스 내에 초기화 메서드와 _ _repr_ _ 메서드를 정의한다. 초기화된 값들은 _ _dict_ _ 내에 **kwargs로 들어온 인자 즉 딕셔너리 자료형으로 들어온 인자를 딕셔너리 자료형에 연결 하는 update 메서드로 추가하도록 정의했다.

_ _repr_ _ 메서드는 인스턴스 내의 속성을 sorted 함수로 정렬을 하고 이 내부의 키와 값 을 items라는 변수에 할당할 때 출력 포맷 중 키는 그대로 표시하며, !r을 통해 일반 문자 열이 아닌 repr에 맞게 처리한다.

```python
In : class SimpleNamespace:
def __init__(self, **kwargs):
self.__dict__.update(kwargs)
def __repr__(self):
keys = sorted(self.__dict__)
items = ("{}={!r}".format(k, self.__dict__[k]) for k in keys)
return "{}({})".format(type(self).__name__, ", ".join(items))
```

이 클래스처럼 인스턴스를 하나 만들고 추가적인 속성 age는 직접 실행 시점에 할당해서 추가했다.

이를 repr 함수를 이용해서 출력하면 _ _repr_ _이 호출되어 출력되는 것을 볼 수 있다.

```python
In : c = SimpleNamespace(name="dahl")
print(type(c))
print(c.name)
c.age = 50
print(c.__dict__)
print(repr(c))
Out: <class '__main__.SimpleNamespace'>
dahl
{'name': 'dahl', 'age': 50}
SimpleNamespace(age=50, name='dahl')
CHAPTER
```

숫자 자료형(Data type) 파이썬 데이터 모델(Data Model)은 내장된 클래스에 대한 명확한 데이터 자료형 기준이다.

이 중에서 먼저 숫자들을 처리하는 숫자 자료형에 대한 클래스와 추가적인 숫자를 처리하 는 모듈에 있는 클래스를 알아본다.

기본 숫자형은 정수, 실수, 복소수를 제공한다. 추가적인 모듈에서 유리수와 큰 수를 처리 하는 모듈들이 제공된다. Decimal은 실수와 바로 연계해서 처리가 되지 않으므로 숫자를 계산할 경우 자료형을 맞춰 처리한다.

숫자 계산을 어떻게 처리하는지를 연산자와 함께 알아본다. 연산자 우선순위에 따라 처리 방식도 변하므로 이에 대한 기본 처리의 기준을 알아보자.

✚ 알아볼 주요 내용

● 숫자 자료형: int, float, complex

● 숫자 모듈: fractions, decimal

● 산술 연산자

● 비교 연산자

● 비트 연산자

● 논리 연산자

● 축약형 논리 연산자
