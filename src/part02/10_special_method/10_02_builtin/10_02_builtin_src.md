---
layout: default
title: "10.02 내장"
---

# 10.02 내장

내장 함수가 처리될 때 스페셜 메서드(special method)을 호출하는 경우도 있지만 스페셜 속성이나 메서드가 있는지를 확인해서 불리언 값으로 제공하기도 한다.

## 10.2.1 호출 여부 확인하기: callable

callable는 함수, 클래스, 인스턴스, 메서드 등이 호출 가능한지 점검하는 함수이다. 호출 이 가능하면 True의 결과값을 전달한다. callable 함수가 확인하는 스페셜 메서드는 _ _ call_ _이므로 이 메서드가 존재하면 True로 표시한다.

예제 10-10 : 호출 가능 여부 확인

CallInstance 클래스를 정의하고 _ _call_ _ 메서드를 인스턴스 메서드로 정의한다. 이러 면 인스턴스를 생성하고 이 인스턴스를 바로 실행하는 것도 가능하다.

```python
In : class CallInstance :
def __init__(self, name) :
self.name = name
def __call__(self) :
print(" instance call ")
return self.name
```

인스턴스를 생성하고 callable 내장 함수로 이 인스턴스를 체크해보면 호출이 가능하다.

인스턴스에 실행 연산자를 사용해서 호출하면 _ _call_ _로 정의한 메서드가 실행되는 것 을 확인할 수 있다.

```python
In : c = CallInstance(" callable ")
print(c)
print(callable(c))
print(c())
Out: <__main__.CallInstance object at 0x0000000004AEA198>
True
instance call
callable
```

클래스, 메서드, 함수도 callable이 가능한지를 확인해보면 전부 True로 출력된다. 내부 에 _ _call_ _이 있어 호출 연산자인 괄호로 실행하면 _ _call_ _이 메서드로 호출되어 실행 되는 것이다.

```python
In : print(int)
print(callable(int))
print(int.bit_length)
print(callable(int.bit_length))
print(print)
print(callable(print))
Out: <class 'int'>
True
<method 'bit_length' of 'int' objects>
True
<built-in function print>
True
```

## 10.2.2 객체 주소 확인하기 : id/hash

내장 함수 id나 hash를 사용해서 주소를 확인한다. _ _hash_ _ 메서드를 이용하면 정수로 hash 값을 반환한다.

예제 10-11 : reference 주소를 정수로 전환

object 클래스로 생성한 인스턴스에서 레퍼런스의 해시값을 정수로 보여준다. 객체에서 레퍼런스의 값 중 id는 정수이고 hash는 id 값을 16으로 나눈 값이 동일하다.

```python
In : c = object()
print(c)
print(id(c)//16)
print(c.__hash__())
Out: <object object at 0x0000000001D39CC0>
```

클래스를 정의하고 인스턴스를 생성한 후에 id 함수로 레퍼런스를 정수 출력하면 해시를 정수로 표시한다. 이것을 hex 값으로 전환하면 객체에서 레퍼런스의 hex 값이 동일하다.

```python
In : class ID :
pass
c = ID()
print(c)
print(id(c))
print(hex(id(c)))
Out: <__main__.ID object at 0x0000000004BFD278>
0x4bfd278
```

## 10.2.3 상속과 인스턴스 유무 : isinstance / issubclass

파이썬에서는 상속이 없어도 상속이나 인스턴스 유무를 점검할 수 있도록 스페셜 메서드 (special method)를 제공한다.

내장 함수 isinstance와 issubclass로 기본적인 상속 관계나 인스턴스 관계를 확인할 수 있지만 이를 확장해서 다양한 관계를 오버로딩하여 처리할 수 있도록 제공한다. 상세한 오버로딩 부분인 추상화 클래스에서 _ _subclasshook_ _ 등의 구현 방법을 알아보자.

✚ 상속과 생성 클래스 점검

내장 함수 issubclass 함수(_ _subclasshook_ _메서드)는 상속 관계를 확인하고, 내장 함수 isinstance 함수(_ _instancecheck_ _메서드)는 클래스와 인스턴스 관계를 확인한다.

예제 10-12 : 상속과 생성 클래스 점검

부모 클래스를 가지고 자식 클래스인 인스턴스와의 isinstance 관계를 확인하면 True로 처리된다.

이것은 _ _instancecheck_ _ 스페셜 메서드로 처리되는 것을 알 수 있다.

```python
In : print(isinstance(1,int))
print(int.__instancecheck__(1))
print(isinstance(1,object))
print(object.__instancecheck__(1))
print(isinstance(1,float))
print(float.__instancecheck__(1))
Out: True
True
True
True
False
False
```

정수 int 클래스를 상속해서 정의된 Int 클래스를 정의하고 인스턴스를 생성한다. 부모 클 래스인 int 클래스와 자식 클래스인 Int 클래스와는 상속 관계이므로 부모 클래스에서 자 식 클래스의 인스턴스는 isinstancde 함수에서 True로 처리된다.

```python
In : class Int(int) :
pass
i = Int(100)
print(isinstance(i,int))
print(int.__instancecheck__(i))
Out: True
True
```

부모 클래스를 가지고 자식 클래스와의 issubclass 관계를 확인하면 True로 처리된다. _ _ subclasscheck_ _ 스페셜 메서드로 처리되는 것을 알 수 있다.

```python
In : print(issubclass(int,object))
print(object.__subclasscheck__(int))
OOuutt:: True
True
```

## 10.2.4 len 함수

Container 자료형(문자열, 튜플, dict, set 등)의 인스턴스에 대한 원소의 개수를 확인하는 len 함수는 Sequence 자료형 내의 원소 수를 확인한다.

예제 10-13 : 원소 수를 확인

리스트, 문자열, 딕셔너리 자료형에 대한 원소의 길이는 _ _len_ _ 스페셜 메서드로 처리 가 가능하다. 딕셔너리는 키와 값의 쌍을 하나의 원소로 분류한다. len 함수는 내부적으로 _ _len_ _ 스페셜 메서드를 호출해서 처리된다.

```python
In : l = [1,2,3,4]
s = "Hello"
d = {'a':1,'b':2}
print(len(l))
print(l.__len__())
print(len(s))
print(s.__len__())
print(len(d))
print(d.__len__())
OOuutt:: 4
```

LEN 클래스를 정의하고 스페셜 메서드 _ _len_ _을 추가해서 내부에 정의된 seq 속성 내 값의 길이를 처리한다. 내장 함수 len을 호출하면 스페셜 메서드 _ _len_ _이 처리되는 것 을 확인할 수 있다.

```python
In : class Len :
def __init__(self,content) :
self.content = content
def __len__(self) :
return len(self.content)
In : l = Len("원소의 개수 확인")
print(len(l))
OOuutt:: 9
```

## 10.2.5 getattr/setattr/delattr 함수

객체 접근 연산자를 사용하지 않고 내장 함수 getattr/setattr/delattr를 이용해서 속성에 접근할 수 있도록 구현되어 있다. 이 함수는 인스턴스나 객체를 넣어야 실행되므로 어느 객체를 처리하는지 이해하기 쉽다는 것이 장점이다.

getattr은 객체의 속성에 접근하는 내장 함수이다. 이 함수도 기본적으로 스페셜 메서드 (special method) _ _getattribute_ _를 호출한다.

setattr 내장 함수는 내부의 스페셜 메서드(special method)인 _ _setattr_ _를 호출해서 처 리한다.

함수 delattr, 스페셜 메서드(special method) _ _delattr_ _를 이용해서 인스턴스나 클래스 내의 속성에 접근하여 삭제가 가능하다.

예제 10-14 : getattr 함수로 내부 속성을 확인

Student 클래스를 정의하지만 내부에 메서드가 정의되지 않았다.

```python
In : class Student :
def __init__(self,name,age,school) :
self.name = name
self.age = age
self.school = school
```

인스턴스를 만들어 점 연산자로 접근해서 속성을 출력했고 _ _getattribute_ _ 스페셜 메 서드를 가지고 조회했다. 동일한 결과가 나온다.

마지막으로 getattr 내장 함수를 이용해서 내부 속성에 접근해도 동일한 결과가 나오는 것 을 알 수 있다.

```python
In : s = Student("김형기",20,"성균관대학교")
print(s.name)
print(s.__getattribute__("name"))
print(getattr(s,"name"))
```

OOuutt:: 김형기 김형기 김형기 클래스에 정의가 없는 속성을 getattr 함수로 호출하면 속성이 없다는 예외를 발생시킨다.

```python
In : getattr(s,"major")
OOuutt:: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-81-c36af0654aa6> in <module>()
----> 1 getattr(s,"major")
AttributeError: 'Student' object has no attribute 'major'
```

이 함수에는 초기값을 넣어서 정의되지 않는 속성이 들어올 경우에 초기값을 반환할 수 있다.

getattr 함수를 호출할 때 초기값으로 “CS”를 할당한다. 이번에는 예외가 발생하지 않고 없는 속성의 값을 초기값으로 준 결과가 반환되는 것을 알 수 있다.

```python
In : print(getattr(s,"major","CS"))
Out: CS
```

예제 10-15 : 내부 속성을 setattr로 변경

Empty 클래스는 아무 것도 하지 않는다. 별도의 딕셔너리 타입에 있는 정보를 가지고 이 인스턴스의 런타임에 속성을 추가한다. 이때 setattr 함수를 이용해서 추가하는 것을 볼 수 있다.

Setattr 함수를 호출하면 _ _setattr_ _을 호출해서 처리한다.

주의할 점은 self.key = value로 정의하면 재귀 호출이 발생하므로 self._ _dict_ _[key] = value를 이용해서 재귀 호출이 발생하지 않도록 했다.

```python
In : class Empty :
def __setattr__(self,key,value) :
print(" __setattr__ ")
self.__dict__[key] = value
```

아무런 속성도 없는 Empty 인스턴스를 만들고 속성을 추가해서 이를 리스트에 저장한다.

입력으로 들어오는 리스트 내에는 딕셔너리가 3개 들어가 있으므로 Empty 인스턴스도 3 개가 만들어질 것이다.

이 Empty 클래스에는 _ _setattr_ _ 스페셜 메서드를 연산자 오버로딩했지만 인스턴스를 만들 때는 setattr 함수를 이용해서 속성을 추가한다.

하지만 _ _setattr_ _ 내에 정의된 print문이 출력되는 것은 setattr도 스페셜 메서드를 호 출해서 처리하는 것을 알 수 있다.

```python
In : d = [ { "name" : "홍길동", "age" : 33},
```

{ "name" : "문길동", "age" : 33}, { "name" : "김길동", "age" : 33}, ] e_class = [] for elem in d :

e = Empty() for k,v in elem.items() :

setattr(e,k,v) e_class.append(e) OOuutt:: __setattr__ __setattr__ __setattr__ __setattr__ __setattr__ __setattr__ 3개의 인스턴스가 만들어진 리스트를 순환 처리하면서 내부에 들어간 값을 getattr로 속성 조회해서 출력한다.

```python
In : for i in range(len(e_class)) :
print(getattr(e_class[i],"name"))
print(getattr(e_class[i],"age"))
Out: 홍길동
문길동
김길동
```

첫 번째 인스턴스 내에 name이라는 속성을 삭제한다. 이 속성이 삭제되면 조회할 때 어 떻게 변하는지를 알아보자.

```python
In : delattr(e_class[0],"name")
```

조회할 때 하나의 인스턴스에 name 속성이 없어진 것을 확인할 수 있다.

```python
In : import pprint
pprint.pprint(e_class[0].__dict__.items())
Out: dict_items([('age', 33)])
```

이들 전체를 조회하면 name 속성이 없어서 예외가 발생한다.

```python
In : for i in range(len(e_class)) :
print(getattr(e_class[i],"name"))
print(getattr(e_class[i],"age"))
Out: ---------------------------------------------------------------------
AttributeError         Traceback (most recent call last)
<ipython-input-13-bcc666cd134c> in <module>()
1 for i in range(len(e_class)) :
----> 2 print(getattr(e_class[i],"name"))
3   print(getattr(e_class[i],"age"))
AttributeError: 'Empty' object has no attribute 'name'
CHAPTER
```

클로저(closure) 및 데코레이터(decorator) 파이썬에서 callable 함수를 이용해 호출 가능한 것을 조회해보면 함수, 클래스, 인스턴 스, 메서드 등이 있다.

이 중에서 함수를 이용하는 패턴 중 함수 내부 환경을 외부로 공유해서 처리하는 클로저 (closure)를 먼저 이해하고 그 다음은 이 클로저를 기반으로 해서 처리되는 데코레이터를 이해해보자. 데코레이터(decorator)는 함수뿐만 아니라 callable이 가능한 경우 적용이 가능하므로 클 래스, 인스턴스, 메서드 등에서 데코레이터 처리 방식을 알아본다.

또한, 이전 장에서 배운 클래스 메서드(@classmethod), 정적 메서드(@staticmethod) 등도 데코레이터를 이용해서 처리하는 예시이므로 자세히 처리되는 방식을 이해한다.

✚ 알아볼 주요 내용

● 클로저

● 부분 함수와 메모이제이션

● 함수 데코레이터

● 클래스, 인스턴스, 메서드 데코레이터

● 추상 클래스에 대한 스페셜 메서드 추가
