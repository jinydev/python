---
layout: default
title: "09.09 연관"
---

# 09.09 연관

상속 관계로 재사용을 많이 사용하지만 파이썬에서는 연관 관계를 사용해서 처리하는 패 턴들이 많이 발생한다.

파이썬이 2 버전과 3 버전이 동시에 사용되며, 상속 관계보다 연관 관계 등으로 구성되어 있어 기능이 다르지만 호환성을 가지면서 사용되고 있다.

추상화 클래스들을 가지는 모듈들도 제공하지만 파이썬 내장 클래스는 직접 이런 추상 클 래스를 상속해서 처리하지 않는다.

## 9.9.1 연관 관계

상속보다는 연관 관계(Association)로 모델링을 하면 상속 관계가 깨지는 경우에도 재사용 할 수 있다. 특히 상속 단계가 깊어지면 이를 관리하고 변경하는 비용도 많이 들 수 있다.

다양한 요건을 수용하기 위해 자식 클래스들이 변화를 전부 수용하기가 쉽지 않기 때문 이다.

변화도가 낮은 상속 관계이면 재사용성에 좋지만 상속 관계도 변경이 자주 발생하면 수정 보다 재개발이 발생할 수도 있어 이를 방지하기 위해 연관 관계로 구성할 필요가 있다.

연관 관계에는 구성과 집합 관계가 있고 이 관계에서 사용되는 인스턴스가 어떻게 유지되 는지에 따라 관계의 특성이 차이 나는 것을 알 수 있다.

예제 9-55 : 구성 관계(composition)

compostion 관계에서 클래스 중 하나는 다른 클래스 인스턴스를 하나 이상으로 구성 한다. 즉, 한 클래스는 컨테이너이고 다른 클래스는 이 컨테이너 내의 원소로 사용되므로 컨테이너가 삭제되면 해당 내용 객체도 모두 삭제된다.

포함된 객체의 수명이 컨테이너 객체에 완전히 의존하는 경우 이를 강력한 연관이라고 한다.

구성 관계를 가질 Salary 클래스를 만든다.

```python
In : class Salary:
def __init__(self,pay):
self.pay=pay
def get_total(self):
return (self.pay*12)
```

Employee 클래스 내부에서 Salary 클래스 인스턴스를 생성해서 만들도록 한다.

```python
In : class Employee:
def __init__(self,pay,bonus):
self.pay=pay
self.bonus=bonus
self.obj_salary=Salary(self.pay)
def annual_salary(self):
return "Total: " + str(self.obj_salary.get_total()+self.bonus)
```

Employee 인스턴스를 만들 때 내부에서 Salary 클래스 인스턴스가 만들어지므로 Employee 인스턴스가 삭제되면 Salary 클래스 인스턴스도 같이 삭제된다.

```python
In : obj_emp=Employee(100,10)
print (obj_emp.annual_salary())
Out: Total: 1210
```

예제 9-56 : 집합 관계(Aggregation)

연관 관계의 약한 구성 형태로서 전달되는 객체가 없어도 객체는 활용하는 데 이상이 없다. 약한 연관성이란 포함된 객체의 수명이 컨테이너 객체에 의존하지 않는 경우 weak association이라고 한다.

집합 관계를 가질 Salary 클래스를 생성한다.

```python
In : class Salary:
def __init__(self,pay):
self.pay=pay
def get_total(self):
return (self.pay*12)
```

위의 Salary 클래스의 인스턴스를 생성해서 Employee 클래스 초기화 내부에 인자로 전 달을 받아 처리한다. Employee 클래스에서 만들어진 인스턴스와 상관없이 Salary 클래 스의 인스턴스만 전달을 받아 처리하므로 Employee 클래스의 인스턴스가 삭제되어도 Salary 클래스 인스턴스는 계속 사용이 가능하다.

```python
In : class Employee:
def __init__(self,pay,bonus):
self.pay=pay
self.bonus=bonus
def annual_salary(self):
return "Total: " + str(self.pay.get_total()+self.bonus)
```

실행하고 Employee 클래스의 인스턴스를 삭제해도 Salary 클래스 인스턴스는 계속 유지 되는 것을 확인할 수 있다.

```python
In : obj_sal=Salary(100)
obj_emp=Employee(obj_sal,10)
print (obj_emp.annual_salary())
Out: Total: 1210
In : del obj_emp
print(obj_sal)
Out: <__main__.Salary object at 0x0000000004E8FB00>
```

## 9.9.2 위임 패턴 처리

객체지향에서 상속 구조는 구조가 깨질 위험이 많다. 상속 없는 관계를 지정해서 사용할 수 있다. 클래스는 만들고 다른 클래스에서 행위에 대한 처리를 맡겨 실행한다. 이런 패턴 을 위임(delegate)이라고 하고 연관 관계를 이용해서 처리한다.

예제 9-57 : 위임 메서드를 사용하기

두 클래스를 만들고 Student 클래스 내부에 Person 클래스로 인스턴스를 만들어서 연관 관계를 처리하도록 한다.

```python
In : class Person :
def __init__(self,name,age) :
self.name = name
self.age = age
In : class Student :
def __init__(self, name,age,college) :
self.person = Person(name,age)
self.college = college
```

Student 클래스로 인스턴스를 만들고 나서 인스턴스의 네임스페이스를 확인해보면 person 속성에 Person 클래스 인스턴스가 들어가 있는 것을 알 수 있다.

```python
In : s = Student("연관",22,"숭실대")
print(s.__dict__)
Out: {'person': <__main__.Person object at 0x0000000004E8FA90>, 'college':
'숭실대'}
```

위의 패턴을 사용하기 위해 Person 클래스 내에 인스턴스에 대한 속성을 처리하는 메서드 를 정의한다.

```python
In : class Person :
def __init__(self,name,age) :
self.name = name
self.age = age
def getname(self) :
return self.name
def getage(self) :
return self.age
```

Student 클래스에서 직접 Person 클래스 속성에 접근해서 사용하지 않고 Person 내의 메서드를 호출해서 처리하도록 수정한다.

```python
In : class Student :
def __init__(self, name,age,college) :
self.person = Person(name,age)
self.college = college
def getname(self) :
return self.person.getname()
def getage(self) :
return self.person.getage()
```

Student 클래스 내부의 name, age 속성에 대한 처리는 전적으로 Person 클래스의 인스 턴스가 전부 처리한다.

```python
In : s = Student("위임",22,"숭실대")
print(s.getname())
print(s.getage())
Out: 위임
CHAPTER
```

스페셜 메서드(special method) 9장에서는 파이썬 객체지향에 대한 개념과 연산자 오버로딩에 대해 간략하게 알아보았다.

이번 장에서는 스페셜 메서드에 대해 알아보자. 스페셜 메서드는 특정한 규약에 따라 상속 없이 재정의해서 다양한 기능을 처리할 수 있다. 이런 규약을 프로토콜 인터페이스(protocol interface)라 하며 다형 메서드(polymor phic methods)를 처리한다.

파이썬에서 프로토콜 인터페이스를 사용하는 이유는 일관성(consistency)을 유지하는 특수 구문(special syntax) 정책 때문이다. 추상화 클래스도 있지만, 인터프리터 내부에서 정해진 추상 관계를 유추하여 자동으로 처리하도록 만들었다.이런 프로토콜 처리 기준에 맞춰 스 페셜 메서드(special method)를 사용자 클래스에 재정의할 수 있다.

✚ 알아볼 주요 내용

● 스페셜 메서드 재정의 방법

● 객체의 속성 접근

● Sequence 자료형의 원소 접근

● 상속 관계 및 인스턴스 생성 관계 확인
