---
layout: default
title: "01.05 내장"
---

# 01.05 내장

위에서 내장 자료형 등에 대해 여러 개의 클래스를 알아봤다. 그럼 내장 자료형을 어디에 서 검색해서 처리하는지 궁금할 것이다.

파이썬은 모든 것을 모듈에서 가져다 사용하므로 내장 자료형이나 함수 등도 다 모듈에 정 의해서 만들어져있다.

내장 자료형은 전부 _ _builtins_ _ 모듈 내에 있으므로 이를 확인하고 자동으로 검색해서 처리한다.

예제 1-38 : 내장 자료형을 알아보기

리스트를 만들 때 각 자료형에 대해 문자열로 이름를 정의한다. 내장 모듈인 _ _builtins _ _ 내의 네임스페이스인 _ _dict_ _를 검색하고 내장 자료형을 조회해서 출력한다.

```python
In : l = ["int",'float','complex','str','list','tuple','dict','bytes','byte
array']
for key in l :
print(key , ": ", __builtins__.__dict__[key])
Out: int : <class 'int'>
float : <class 'float'>
complex : <class 'complex'>
str : <class 'str'>
list : <class 'list'>
tuple : <class 'tuple'>
dict : <class 'dict'>
bytes : <class 'bytes'>
bytearray : <class 'bytearray'>
```

예제 1-39 : 내장 함수 알아보기

내장 함수도 제공하는데 이 내장 함수도 어디에 저장되어 관리되는지를 확인해보면 _ _ builtins_ _ 모듈 내에 들어가 있는 것을 확인할 수 있다.

```python
In : l = ["dir","help","print","isinstance"]
for key in l :
print(key , ": ", __builtins__.__dict__[key])
Out: dir : <built-in function dir>
help : Type help() for interactive help, or help(object) for help
about object.
print : <built-in function print>
isinstance : <built-in function isinstance>
CHAPTER
```

파이썬 문장(statements) 1장에서 파이썬을 구성하는 기본인 리터럴과 표현식을 배웠다. 이제 파이썬 로직을 실행 하는 데 필요한 다양한 문장에 대해 알아보겠다.

문장은 한 라인으로 처리되는 단순 문장부터 여러 라인을 처리하는 블록 문장 등이 있다.

특히 제어문, 순환문 등은 여러 라인을 하나의 블록으로 묶어서 처리하므로 블록 문장 이다.

여러 문장을 재사용하기 위해 사용되는 함수나 클래스 등의 정의문도 어떻게 여러 로직을 하나의 기능으로 묶어서 블록 단위로 구성하는지를 간단히 알아본다.

✚ 알아볼 주요 내용

● 기본 문장 이해하기 : 할당, 인용, 주석 등의 기본 문장

● 프로그램 내의 문장 이해하기 : 제어문, 순환문, 컨텍스트, 예외 처리 등의 문장

● 함수와 클래스 정의 : 함수와 클래스를 정의하는 문장

● 모듈과 패키지 처리 : 모듈과 패키지들의 관리 방법 및 import해서 사용하는 법

● 함수와 모듈 등의 네임스페이스 : 지역 네임스페이스와 전역 네임스페이스 관리

기준

● 함수는 항상 자신의 속한 모듈의 전역 네임스페이스를 사용
