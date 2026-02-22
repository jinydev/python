---
layout: default
title: "14.03 제너레이터(generator)"
---

# 14.03 제너레이터(generator)

기존의 반복형으로 만들어진 것을 반복자를 사용해서 동적으로 처리했다. 이제 처음부터 동적으로 생성해서 처리하는 제너레이터에 대해 알아본다.

제너레이터는 함수 정의문을 통해 정의하지만 함수와 달리 return문 대신 yield문을 사용 하고 첫 번째로 실행하면 제너레이터 인스턴스를 생성한다. 또한 제너레이터에도 표현식 으로 만들 수 있다. 제너레이터 표현식을 위한 표기법은 소괄호를 사용하고 내부 로직은 지능형 표기법을 사용한다.

제너레이터도 반복자를 생성해서 만들었으므로 반복자와 동일하게 한번 실행한 후에는 다시 사용할 수 없다. 다시 사용하려면 항상 제너레이터 인스턴스를 만들어서 사용해야 한다.

## 14.3.1 제너레이터 구조

제너레이터는 반복자를 상속받아 만들어진 구조로 함수를 이용하는 방법과 표현식을 처리 하는 방식이 있다.

예제 14-17 : 제너레이터 구조

추상 클래스 Generator는 Iterator를 상속받았고, Iterator는 Iterable을 상속받는 구조라 는 것을 알 수 있다.

```python
In : import collections.abc as cols
print(cols.Generator.__bases__)
print(cols.Iterator.__bases__)
print(cols.Iterable.__bases__)
Out: (<class 'collections.abc.Iterator'>,)
(<class 'collections.abc.Iterable'>,)
(<class 'object'>,)
```

제너레이터 클래스에 추가된 메서드가 3개이다. 이 제너레이터를 닫는 것과 제너레이터에 게 정보를 전달하는 send 메서드 그리고 예외를 처리하는 throw 메서드가 있다.

```python
In : for i in dir(cols.Generator) :
if not i.startswith("_") :
print(i)
Out: close
send
throw
```

제너레이터 표현식을 만들 때에는 리터럴 리스트를 지정해서 소괄호로 묶어 for 순환문으 로 작성하고 변수에 할당하면 제너레이터 인스턴스가 바로 만들어진다.

이 변수를 for 순환문으로 처리하면 원소들이 하나씩 처리된다. 상속 관계를 issubclass 함수로 확인하면 Generator 클래스이므로 True라는 것을 알 수 있다.

```python
In : g = (x for x in [1,2,3,4])
print(g)
print(issubclass(type(g), cols.Generator))
for i in g :
print(i)
Out: <generator object <genexpr> at 0x0000000004B37F10>
True
```

제너레이터 표현식 내부의 변화를 확인하기 위해서 지역 네임스페이스를 확인하는 locals 내장 함수를 가지고 내부를 출력해보면 내부 변수가 변하는 것을 알 수 있다.

```python
In : g = (locals() for x in [1,2,3,4])
print(g)
print(issubclass(type(g), cols.Generator))
for i in g :
print(i)
Out: <generator object <genexpr> at 0x0000000004B37D00>
True
{'x': 1, '.0': <tuple_iterator object at 0x0000000004B69898>}
{'x': 2, '.0': <tuple_iterator object at 0x0000000004B69898>}
{'x': 3, '.0': <tuple_iterator object at 0x0000000004B69898>}
{'x': 4, '.0': <tuple_iterator object at 0x0000000004B69898>}
```

## 14.3.2 제너레이터를 함수로 정의하기

제너레이터는 함수 정의를 이용해서 만들 수 있다. 함수를 처음으로 실행하면 제너레이터 인스턴스가 만들어지는 것이 함수와 다르다.

✚ 제너레이터 함수 정의

함수로 제너레이터를 정의할 때는 수행될 만큼의 계산이 필요한 경우 순환문(for, while 문) 내에 yield를 넣어서 처리하며 더 이상 처리하고 싶지 않을 경우는 close로 닫아 종료 된다. 최종까지 다 사용되어 종료되면 반복자와 동일하게 다시 사용할 수 없다.

재사용을 위해서는 다시 제너레이터를 만들어야 한다.

예제 14-18 : 제너레이터를 만들고 실행해보기

한 번만 실행되는 제너레이터는 함수 정의문에 yield문이 한 번만 실행되도록 정의하면 된다.

이 제너레이터 정의문을 통해 하나의 제너레이터를 만든다.

```python
In : def onegen() :
yield 100
onegen = onegen()
print(onegen)
Out: <generator object onegen at 0x10ea50e60>
```

이 제너레이터를 next 함수로 한 번 호출했다. 이때 함수 내의 yield에 있는 부분이 처리 되었다.

다시 next로 호출하면 한번 처리가 되어 더 이상 이 로직은 처리가 되지 않는다. 그래서 제너레이터가 종료되어 더 이상 처리할 수 없다는 StopIteration이라는 예외를 출력한다.

```python
In : print(next(onegen))
print(next(onegen))
Out: 100
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-48-f60a871a1add> in <module>()
1 print(next(onegen))
----> 2 print(next(onegen))
StopIteration:
```

제너레이터의 함수 정의문으로 yield문을 두 번 작성했다. 이 말은 곧 이 제너레이터가 2 번 실행이 가능하다는 것을 말해준다.

```python
In : def twogen() :
yield 100
yield 200
twogen = twogen()
print(twogen)
Out: <generator object twogen at 0x10ea74410>
```

제너레이터가 만들어졌으므로 두 번 호출해서 처리를 하면 결과가 출력된다.

또 한 번 더 호출할 때마다 이 제너레이터는 종료되었기에 예외를 발생시켜서 더 이상 처 리할 것이 없다는 것을 알려준다.

```python
In : print(next(twogen))
print(next(twogen))
print(next(twogen))
Out: 100
---------------------------------------------------------------------
StopIteration           Traceback (most recent call last)
<ipython-input-50-d102697486c9> in <module>()
1 print(next(twogen))
2 print(next(twogen))
----> 3 print(next(twogen))
StopIteration:
```

제너레이터를 정의문을 통해 만들 경우는 함수 정의문 표기법을 그대로 사용한다. 차이점 은 반환된 값을 처리하는 return문이 없이 이를 생성하는 yield문으로 변경이 된 것을 알 수 있다.

매개변수 하나를 받아 순환문에서 하나의 숫자를 처리하는 것을 알 수 있다. 이를 출력해 보면 함수의 지역 네임스페이스와 출력값 i를 보여준다.

```python
In : def gen(x) :
for i in range(x) :
print(locals())
yield i
for i in gen(3) :
print(i)
Out: {'i': 0, 'x': 3}
{'i': 1, 'x': 3}
{'i': 2, 'x': 3}
```

함수를 정의하는 방법을 이용해서 제너레이터를 만든다. 순환문 안에 yield가 있어 순환 이 종료되는 시점까지 반복할 수 있다.

```python
In : def loopgen() :
count = 0
while True :
yield 100
if count >= 3 :
break
count += 1
loopgen = loopgen()
print(loopgen)
Out: <generator object loopgen at 0x0000000004AC9410>
```

함수를 실행하면 제너레이터 객체가 만들어진다. 이 제너레이터도 반복자이므로 next 연 산으로 호출해도 반환값을 받을 수 있다. 범위가 넘어가면 제너레이터가 종료되어 더 이 상 처리할 수 없다는 StopIteration이 출력된다.

```python
In : print(next(loopgen))
print(next(loopgen))
print(next(loopgen))
print(next(loopgen))
print(next(loopgen))
Out: 100
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-37-f030eb70da4e> in <module>()
3 print(next(loopgen))
4 print(next(loopgen))
----> 5 print(next(loopgen))
StopIteration:
```

✚ 제너레이터를 wrap해서 처리하기

두 개의 제너레이터를 연결해서 사용할 경우 하나를 래핑해서 처리하면 된다. 이때 표기 법은 yield from을 이용해서 작성하면 된다.

예제 14-19 : 제너레이터를 연결해서 처리하기

제너레이터 두 개 source와 outer를 작성했다. 두 개 내부의 for 순환문에서 생성한 값을 처리한다.

```python
In : def source() :
for i in range(4) :
yield i
In : def outer(g) :
for i in g :
yield i
```

제너레이터를 연결해서 처리하기 위해 outer에 인자로 source를 실행한 제너레이터를 넣 어서 새로운 제너레이터를 만든다. 이를 순환문에서 원소 하나씩 실행하면 결과가 출력 된다.

```python
In : outer = outer(source())
print(outer)
Out: <generator object outer at 0x0000000004B6DC50>
In : for i in outer :
print(i)
Out: 0
```

예제 14-20 : 제너레이터를 바로 연결해서 처리하기

위의 예제는 제너레이터에 인자로 제너레이터를 만들어 전달하고 내부에도 for 순환문을 이용해서 전달된 제너레이터를 처리했다.

동일한 처리이지만 이번에는 yield from을 이용해서 연결하면 for문이 없어도 전달된 제 너레이터가 순환되면서 처리되기에 연결된 outer도 처리되는 것을 알 수 있다.

```python
In : def source() :
for i in range(4) :
yield i
In : def outer(g) :
yield from g
```

동일하게 outer로 제너레이터 인스턴스를 만들고 이를 for 순환문에서 처리하면 위의 예 제와 동일한 결과가 나오는 것을 알 수 있다.

```python
In : outer = outer(source())
print(outer)
Out: <generator object outer at 0x0000000004B6D258>
In : for i in outer :
print(i
Out: 0
```

예제 14-21 : 클래스를 이용해서 제너레이터 처리

제너레이터를 생성하는 find 함수를 정의한다.

```python
In : def find(l) :
for i in range(len(l)) :
yield l[i]
In : print(find)
Out: <function find at 0x0000000005220510>
In : print(find([1,2,3,4]))
Out: <generator object find at 0x0000000005291F68>
```

Apply 클래스를 정의하면서 하나의 함수를 받고 이 함수 인자의 모든 것을 받아서 처리할 수 있도록 *args, **kwargs로 준다. 반복자를 만드는 _ _iter_ _ 메서드에 전달된 함수로 제너레이터 인스턴스를 만들어서 처리하도록 정의했다.

```python
In : class Apply :
def __init__(self,func,*args, **kwargs) :
self.func = func
self.args = args
self.kwargs = kwargs
def __iter__(self) :
return self.func(*self.args,**self.kwargs)
```

Apply 생성자에 제너레이터 함수 find를 넣고 인스턴스를 만들었다. 이 인스턴스는 Apply 클래스의 인스턴스라는 것을 알 수 있다.

```python
In : apply = Apply(find,[1,2,3,4])
print(apply)
Out: <__main__.Apply object at 0x00000000052B6CF8>
```

Apply 클래스로 만든 인스턴스를 반복자로 만드는 iter 함수를 실행해서 변수에 할당하면 제너레이터 인스턴스가 만들어지는 것을 볼 수 있다.

```python
In : a = iter(apply)
print(a)
Out: <generator object find at 0x00000000052917D8>
```

제너레이터 인스턴스를 next로 호출하면 find 내부의 yield가 실행되어 원소 하나씩 호출 하고 출력한다. 모든 원소가 다 처리되면 제너레이터를 종료하기 위해 StopIteration 예외 가 발생한다.

```python
In : print(next(a))
print(next(a))
print(next(a))
print(next(a))
print(next(a))
Out: 1
---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-10-86b9db65e8f0> in <module>()
3 print(next(a))
4 print(next(a))
----> 5 print(next(a))
StopIteration:
```
