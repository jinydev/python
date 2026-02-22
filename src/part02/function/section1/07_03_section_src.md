---
layout: default
title: "07.03 람다"
---

# 07.03 람다

람다 함수(함수 표현식)으로 정의한 함수가 필요한 이유는 직접 정의해서 바로 사용하는 것 보다 좋은 경우가 있기 때문이다. 함수를 정의문으로 정의한 것과 내부적으로 거의 동일 하게 처리된다.

익명 함수(anonymous function)는 함수 정의문이 없으므로 lambda라는 키워드를 사용하 고 콜론( : )을 경계로 앞에는 매개변수를 정의하며 뒤에는 표현식을 정의한다. 표현식 대 신 문장으로 표현하면 예외가 발생하므로 반환값을 처리하는 return문이 필요 없고 표현 식을 실행된 결과가 자동으로 반환되는 것을 알 수 있다.

## 7.3.1 람다 함수 정의

파이썬에서 익명 함수인 lambda 표현식은 하나의 라인에 정의할 수 있다. 키워드 lambda를 사용하고 콜론( : )까지가 함수의 헤더 부분이며 그 다음에 사용될 표현식이 함 수의 본체에 해당한다. 함수의 매개변수와 동일하게 lambda 매개변수를 정의할 수 있고 판단 기준도 동일하다. Lambda 표현식이 정의되면 function class가 인스턴스가 되는 것 도 함수와 동일하다.

예제 7-17 : 함수 정의문과 람다 함수의 변수 할당 비교

앞에서는 함수 add를 정의하고 인자로 10,10을 지정해서 실행했다.

```python
In : def add(x,y) :
return x+y
print(add(10,10))
Out: 20
```

Lambda 키워드를 이용해서 하나의 익명 함수를 정의한다. 함수를 정의하고 재사용을 위 해 변수에 할당했으므로 이 함수를 이용해서 10,10을 인자로 정의 후 람다 함수를 호출해 서 처리하면 위의 함수 정의문으로 지정한 add 함수와 동일한 결과가 나오는 것을 알 수 있다.

```python
In : a = lambda x,y : x+y
print(a(10,10))
Out: 20
```

예제 7-18 : 람다 함수도 function class 객체 여부 확인

익명 함수인 lambda도 함수이다. 함수 표현식으로 정의는 되지만 정의하고 로딩이 되면 함수 정의문과 동일하게 function class의 인스턴스이다.

그러므로 함수 정의문이 가지는 function class와 code class 속성 등을 전부 동일하게 제공하는 것을 알 수 있다.

람다 함수를 정의하고 이 함수를 dir로 내부 속성과 메서드를 조회해서 set 클래스로 집합 의 인스턴스를 만든다. 이것을 가지고 최상위 클래스 object 내의 속성을 확인해서 set 인 스턴스를 만들고 실제 람다함수만 가진 속성과 메서드를 확인하면 함수 정의문으로 생성 한 경우와 동일하다는 것을 알 수 있다.

```python
In : lam = set(dir(lambda x,y : x+y))
print(type(lambda x,y : x+y))
obj = set(dir(object))
for i in (lam-obj) :
print(i)
Out: <class 'function'>
__call__
__name__
__dict__
__qualname__
__code__
__get__
__kwdefaults__
__closure__
__module__
__annotations__
__globals__
__defaults__
```

람다 함수는 이름이 없기 때문에 _ _name_ _, _ _qualname_ _ 으로 이름을 확인하면 이 름이 없다는 표현인 lambda라고 출력된다.

```python
In : a = lambda x,y : x+y
print(a)
print(a.__name__)
print(a.__qualname__)
Out: <function <lambda> at 0x0000000004B00400>
<lambda>
<lambda>
```

람다 함수도 매개변수를 정의할 때 함수 정의문과 동일하게 처리할 수 있다. 매개변수에 초기값을 주거나 키워드 인자로 할당하는 곳에도 초기화를 할 수 있다.

일반 함수 정의문과 다른 곳은 반환값에 대한 자료형을 정의하지 못하는 것을 빼고는 동일 하게 처리함을 알 수 있다.

```python
In : a = lambda x=100,*,y=100 : x+y
print(a)
print(a.__annotations__)
print(a.__defaults__)
print(a.__kwdefaults__)
Out: <function <lambda> at 0x10ddcd730>
{}
(100,)
{'y': 100}
```

예제 7-19 : 람다 함수의 표현식 처리에서 함수 호출하기

덧셈을 하는 함수를 정의한 뒤 람다 함수를 정의해서 함수 호출을 람다 함수 표현식 부분 에 처리했다. 함수 정의는 문장이지만 함수 호출은 함수 표현식이다.

함수 add를 정의하고 lambda 함수 정의 시 표현식 부분에 add 함수 호출을 작성해서 처 리하면 add 함수의 결과가 lambda 함수의 결과로 처리된다.

```python
In : def add(x,y) :
return x+y
a = lambda x,y : add(x,y)
print(a(10,10))
Out: 20
```

## 7.3.2 즉시 실행 함수(Immediately - invoked function

expression) 일반적인 함수는 함수를 정의한 후 함수를 바로 호출해서 사용한다. 다만 람다 함수는 함 수를 쓰고 바로 실행해서 사용할 수 있는 파이썬 문법이다.

정의된 람다는 함수를 정의하자마자 바로 실행을 해서 처리하고 바로 사라지는 함수이므 로 재사용하는 것보다 즉시 실행해서 처리하는 경우에 사용하는 것이 좋다.

✚ 즉시 실행 함수

익명 함수인 람다 함수를 표현하면 함수 표현식으로 사용된다. 함수 호출 연산자를 사용 하기 위해 람다 함수를 괄호로 묶어서 처리해야 즉시 실행 함수를 사용할 수 있다.

예제 7-20 : lambda 정의하고 즉시 실행 처리

람다 함수를 표현하고 함수 호출 연산자를 호출했지만 함수의 이름만 출력된다.

```python
In : lambda x : x (1)
Out: <function __main__.<lambda>>
```

람다 함수를 실행하려면 람다 표현식을 괄호로 묶어서 한 함수의 인스턴스를 가져오도록 하고 그 다음에 호출 연산자와 인자를 넣어서 함수를 호출한다. 그러면 람다 함수 처리된 결과를 반환하고 이 함수는 재사용이 불가능하다.

```python
In : (lambda x : x )(1)
Out: 1
```

예제 7-21 : 람다 함수를 재사용하기

람다 함수는 한번 사용하고 다시 호출해서 사용하지 않을 때 사용하는 것이다. 하지만 람다 함수도 다시 사용이 가능하다. 이럴 때는 이름 없는 함수이므로 네임스페이스에 할 당되지 않아 다른 변수에 할당해서 재사용해도 된다.

변수 add의 값을 람다 함수의 표현식으로 할당했다. 이 변수 add에서 _ _name_ _을 조회 하면 이름이 없다는 뜻의 lambda라고 출력된다.

이 add 함수에 인자를 넣고 호출하면 결과가 출력되는 것을 볼 수 있다.

```python
In : add = lambda x,y : x+y
print(add)
print(add.__name__)
print(add.__call__(5,5))
print(add(10,10))
Out: <function <lambda> at 0x00000000050726A8>
<lambda>
```

람다 함수도 함수 클래스의 인스턴스이므로 객체의 인스턴스로 사용이 가능하고, 객체 네 임스페이스로 관리할 수도 있다.

람다 함수를 변수에 할당해서 사용하고 이 변수를 이용해서 점 연산자를 통해 객체나 클래 스의 네임스페이스에 접근할 수 있다.

람다 함수를 정의하고 람다 함수의 표현식 부분에서 람다 인스턴스 속성에 접근하도록 했다. 이때 인스턴스 속성은 count를 접근해서 보여준다.

```python
In : add = lambda x,y : add.count
print(add)
add.count= 0
print(add.__dict__)
Out: <function <lambda> at 0x10ddcd1e0>
{'count': 0}
```

람다 함수를 호출한 후에 이 람다 함수가 할당된 변수를 이용해서 이 인스턴스에 있는 count 속성에 1을 더하고 add._ _dict_ _를 출력했다. 이 결과로 1이 출력된 것을 확인할 수 있다.

```python
In : print(add(5,5))
add.count +=1
print(add.__dict__)
Out: 0
{'count': 1}
```

## 7.3.3 지능형에서 람다 함수 사용하기

지능형을 작성할 때 람다 함수를 이용해서 값을 변경할 수 있다. 이런 방식으로 람다 함수 는 한번 사용해서 처리하는 경우에 많이 선택된다.

지능형 내의 람다 함수에 특정 값을 전달하고 나중에 실행해보면 원하지 않는 값도 나올 수 있다.

예제 7-22 : 지능형 리스트 내의 익명 함수 처리

지능형 리스트를 작성할 때 람다 함수가 원소로 만들어지도록 구성한다. 이 람다 함수 표 현식에 x라는 변수가 있는데 이 변수는 지능형 리스트에 정의된 변수 x와 동일하다.

```python
In : l = [ lambda : x for x in range(3)]
```

지능형 리스트의 원소들인 람다 함수를 출력하면 3개의 다른 레퍼런스를 가진 함수가 만 들어진다. 이를 실행하면 결과는 지능형 리스트 변수 x 값을 출력하는 것을 알 수 있다.

```python
In : for i in l :
print(i, i())
Out: <function <listcomp>.<lambda> at 0x10ddcd510> 2
<function <listcomp>.<lambda> at 0x10ddcd9d8> 2
<function <listcomp>.<lambda> at 0x10ddcd8c8> 2
```

지능형에서 원소들을 값으로 변형하려면 람다 함수를 즉시 실행해서 평가된 결과대로 출 력한다.

```python
In : l = [ (lambda : x)() for x in range(3)]
print(l)
Out: [0, 1, 2]
```

내장 함수를 map 처리하는 것과 유사하게 위의 지능형을 처리한다는 것을 알 수 있다.

```python
In : print(list(map(lambda x:x,[0,1,2])))
Out: [0, 1, 2]
```

지능형 내의 람다 함수를 이용해서 처리할 때 결과가 처리되는 것을 이해하려면 람다 함수 의 초기값을 지능형 리스트 내의 변수로 할당해서 처리하는 것이 좋다.

이를 실행해보면 값들이 순서대로 처리되는 것을 알 수 있다.

```python
In : l = [ lambda x=x : x for x in range(3)]
for i in l :
print(i, i())
Out: <function <listcomp>.<lambda> at 0x00000000050806A8> 0
<function <listcomp>.<lambda> at 0x0000000005080620> 1
<function <listcomp>.<lambda> at 0x0000000005080510> 2
```

위의 지능형 리스트 내의 람다함수를 즉시 실행해서 처리하면 지능형 for문이 순환되는 방 식에 맞도록 처리가 된다.

```python
In : l = [ (lambda x=n : x)() for n in range(3)]
print(l)
Out: [0, 1, 2]
```
