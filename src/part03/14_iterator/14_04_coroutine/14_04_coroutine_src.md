---
layout: default
title: "14.04 코루틴(coroutine)"
---

# 14.04 코루틴(coroutine)

파이썬 함수는 기본적으로 한번 처리하고 실행이 끝나면 종료한다. 이런 점을 수정해서 처리해야 할 때 항상 정보를 전달하고 처리된 결과를 받아서 실행할 수 있는 코루틴이 필 요하다.

코루틴 작성 방식을 보면 제너레이터와 거의 유사하지만 yield가 표시된 부분이 다르다.

코루틴의 특징은 함수 내에서 호출한 것을 다시 호출할 수 있고, 다시 다른 루틴에서 함수 의 중간 지점을 호출할 수 있다는 것이 핵심이다.

이번에는 코루틴의 작동 원리와 간단한 사용법을 배운다.

## 14.4.1 코루틴 기본 이해하기

코루틴은 하나의 작업 단위를 처리하여 다음 코루틴으로 연결하는 프로세스 파이프를 구 성하는 단위를 만들기에 적합하다. 실행되는 동안 종료가 되지 않으므로 종료하기 위해서 는 close가 필요하다.

✚ 코루틴 주요 메서드 설명

● coroutine.send (value)

코루틴을 시작하거나 다시 시작한다. value가 None이면 시작, None이 아니면 이 값을 처리한다.

● coroutine.throw (type [, value [, traceback]])

코루틴에서 지정된 예외를 발생시킨다. 이 메서드는 코루틴을 일시 중단시키는 반복자의 throw ( ) 메서드에 위임한다.

● coroutine.close ( )

코루틴 자체를 종료한다.

예제 14-22 : 코루틴 제너레이터를 생성하고 클로즈하기

코루틴은 일단 특정 정보를 전달받아서 처리해야 하므로 yield 앞에 실행할 변수가 할당 되어야 한다.

이 로직을 보면 send로 보내진 것을 변수에 할당하고 이를 print문으로 출력한다.

```python
In : def cor() :
while True :
i = yield
print(" consumed %d " %i)
```

함수 cor로 인스턴스를 생성하면 제너레이터가 만들어진다. 사실 코루틴을 처리할 인스턴 스를 만든 것이다. 일단 코루틴이 작동하려면 next를 보내서 처리할 준비를 해야 한다.

```python
In : c = cor()
print(c)
Out: <generator object cor at 0x0000000005291BF8>
In : next(c)
Out: None
```

실행이 준비되어 send 메서드로 정보를 전달하면 print문이 실행된다. 코루틴은 계속 실 행될 준비를 하고 있으므로 close 메서드로 닫아야 코루틴이 종료되고 메모리에서 삭제 된다.

```python
In : c.send(10)
c.send(20)
c.close()
Out: consumed 10
consumed 20
```

종료된 코루틴을 다시 next로 호출하면 기존에 종료되었기에 StopIteration 예외가 발생 한다.

```python
In : next(c)
Out: ---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-16-73b012f9653f> in <module>()
----> 1 next(c)
StopIteration:
```

close 이후에 다시 send로 보내도 종료가 되어서 실행이 되지 않는 것을 알 수 있다.

```python
In : c.send(30)
Out: ---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-58-55afe42bdcee> in <module>()
----> 1 c.send(30)
StopIteration:
```

다시 함수를 실행하고 코루틴을 send 메서드에 None을 넣어 전달해야 코루틴이 활성화 된다.

send 메서드로 활성화시키려면 send 메서드의 인자값으로 None을 전달한다. Next 함수 로 호출하는 것과 동일하게 코루틴을 실행시킨다.

```python
In : c = cor()
print(c)
c.send(None)
Out: <generator object cor at 0x0000000004B6D888>
```

그리고 다시 정보를 보내면 print문이 실행되어 출력되는 것을 볼 수 있다. 다시 이 코루틴 을 종료한다.

```python
In : c.send(100)
c.send(200)
c.close()
Out: consumed 100
consumed 200
```

예제 14-23 : 코루틴 재사용하기

한번 사용하고 close로 종료하지 않으면 코루틴은 항상 사용이 가능하다. 코루틴 함수를 정의할 때 while문에 True를 지정해서 무한 순환을 처리할 수 있도록 만든다.

```python
In : def writer() :
while True :
w = yield
print(">>",w)
```

코루틴 실행을 위해 next 함수 대신 send 메서드에 인자를 None으로 호출한다.

```python
In : writer = writer()
print(writer)
Out: <generator object writer at 0x0000000004B6DC50>
In : writer.send(None)
print(writer)
Out: <generator object writer at 0x0000000004B6DC50>
```

두 번 연속해서 코루틴을 호출하면 처리를 한다.

```python
In : for i in range(2) :
writer.send(i)
Out: >> 0
>> 1
```

Close 메서드를 이용해서 종료하지 않았으므로 계속 코루틴을 사용할 수 있다. 항상 데이 터가 오기를 기다리고 있다.

```python
In : for i in ["hello","world"] :
writer.send(i)
Out: >> hello
>> world
```

예제 14-24 : 코루틴 결과를 제너레이터로 반환하기

특정 결과를 다시 반환을 받아 처리하고 싶어서 코루틴을 정의한 곳에 return문을 정의하 면 어떤 결과가 나오는지를 확인해보자.

```python
In : def cor_return() :
while True :
i = yield
i = i + 100
return i
```

제너레이터를 생성하고 코루틴을 활성화하기 위해 send 메서드에 None을 보냈다.

```python
In : cor = cor_return()
cor.send(None)
```

코루틴를 실행하기 위해 send 메서드에 100을 넣고 실행하면 반환값을 받지만 return문 이 발생해서 종료되면 이 제너레이터가 종료된 것을 알 수 있다.

```python
In : v = cor.send(100)
print(v)
Out: ---------------------------------------------------------------------
StopIteration          Traceback (most recent call last)
<ipython-input-22-83fb1e5893e3> in <module>()
----> 1 v = cor.send(100)
2 print(v)
StopIteration: 200
```

처리된 결과를 받아서 확인하기 위해 yield 뒤에서 결과값이 처리되는 변수를 넣어 처리 하도록 만들었다.

```python
In : def cor_yield() :
i = 0
while True :
i = yield i
print("iii",i)
i = i + 100
```

코루틴을 기동시키면 i의 값이 초기값으로 출력되는 것을 확인할 수 있다.

```python
In : cory = cor_yield()
cory.send(None)
Out: 0
```

코루틴 로직을 처리하기 위해 100을 넣어 보내면 처리된 결과가 100이고 반환된 값은 200이 되는 것을 알 수 있다.

```python
In : v = cory.send(100)
print(v)
Out: iii 100
```

300을 보내면 처리된 결과를 400으로 반환하는 것을 알 수 있다.

```python
In : W = cory.send(300)
print(W)
Out: iii 300
```

300을 보내면 항상 100을 더해서 처리하는 것을 볼 수 있다. 처리된 결과를 내부에서 보 관하지 않았으므로 항상 100을 더한 결과만을 처리한다.

```python
In : W = cory.send(400)
print(W)
Out: iii 400
```

예제 14-25 : 코루틴으로 평균 처리하기

이번에는 코루틴 내부에 특정 처리 결과를 보관했다가 이 값을 전부 합산해서 평균을 구해 코루틴으로 만들었다.

내부에 전체를 더하는 total 변수와 입력 횟수를 계산하는 count로 값을 누적해서 매번 들 어올 때마다 평균을 계산하고 결과를 보낸다.

```python
In : def mean() :
total = 0
average = 0
count = 0
while True :
i = yield average
total += i
count += 1
average = total/count
```

제너레이터를 만들고 send 메서드로 None을 보내서 코루틴을 기동시킨다.

```python
In : mean = mean()
print(mean)
Out: <generator object mean at 0x0000000004C29150>
In : mean.send(None)
Out: 0
```

두 개의 값을 전달하면 이를 합산해서 평균을 계산한 결과를 반환하는 것을 볼 수 있다.

이 계산이 끝나면 이 코루틴을 종료한다.

```python
In : print(mean.send(100))
print(mean.send(200))
Out: 100.0
150.0
In : mean.close()
```

## 14.4.2 종료 예외 처리하기

코루틴을 처리할 때 무한 순환이 되지 않을 경우 항상 마지막이 처리되면 StopIteration을 발생시킨다.

모든 코루틴이 전부 처리되었는지를 확인하기 위해 Try except문으로 예외를 잡는 로직 을 추가하는 것이 좋다.

예제 14-26 : 코루틴 종료 예외 처리하기

코루틴을 처리할 수 있는 함수를 정의할 때 yield문을 한 번만 작성했다.

```python
In : def cor_except() :
i = yield
print(">>", i)
```

제너레이터를 생성하고 코루틴을 기동시킨다.

```python
In : cor_ = cor_except()
print(cor_)
Out: <generator object cor_except at 0x0000000004C29B48>
In : cor_.send(None)
```

send 메서드를 전달한다. 코루틴을 처리할 횟수가 한 번이므로 100을 출력한 뒤 더 이상 처리할 수 없다는 뜻인 StopIteration을 발생시킨다.

```python
In : cor_.send(100)
Out: >> 100
---------------------------------------------------------------------
StopIteration         Traceback (most recent call last)
<ipython-input-112-8765c01c5036> in <module>()
----> 1 cor_.send(100)
StopIteration:
```

예외를 발생시키지 않으려면 try except로 처리해서 예외가 발생하면 최종 처리가 종료되 었다고 출력한다.

```python
In : try :
cor_ = cor_except()
cor_.send(None)
cor_.send(200)
except StopIteration :
print(" coroutine stop ")
Out: >> 200
coroutine stop
```

## 14.4.3 코루틴 순차 처리

코루틴의 특징은 여러 코루틴들 간에 연결해서 로직을 처리하는 것이다. 코루틴 간의 연 결을 처리해서 사용해보겠다.

✚ 연속된 코루틴 호출해서 처리

코루틴 처리는 서브루틴 처리를 교환하면서 처리할 수 있는 구조로 만들어져 있기에 나눠 서 처리가 가능하다.

예제 14-27 : 코루틴을 호출해서 처리하기

코루틴 함수를 정의할 때 전달받은 것을 리스트에 계속 넣어 작성했다. 이 함수가 하는 일 은 단순히 리스트에 데이터를 저장하는 역할만 한다.

```python
In : la = []
def cor_sub() :
while True :
var = yield
la.append(var)
```

이제 메인 코루틴 함수를 정의한다. cor_sub인 함수를 명기해서 이 함수를 실행하고 이 인스턴스를 통해 코루틴을 처리하도록 만든다.

그 다음에 cor_main으로 전달되는 것을 cor_sub으로 보내서 저장하도록 했다.

```python
In : def cor_main() :
count = 0
while True :
var = yield
if count == 0 :
global cor_sub
cor_sub = cor_sub()
cor_sub.send(None)
count +=1
cor_sub.send(var)
```

메인 코루틴 함수를 코루틴 처리를 위해 기동시킨다.

```python
In : cor_main = cor_main()
cor_main.send(None)
```

메인 코루틴을 3번 실행해서 값을 전달했다.

```python
In : cor_main.send(100)
In : cor_main.send(200)
In : cor_main.send(300)
```

최종 처리 결과는 전역 변수 la에 리스트로 보관된다. 메인 코루틴에서 보낸 순서대로 리 스트에 들어가 있는 것을 볼 수 있다.

```python
In : la
Out: [100, 200, 300]
CHAPTER
```

파이썬 프로퍼티와 디스크립터 파이썬에서는 클래스를 정의할 때 속성과 메서드 외에 프로퍼티도 사용한다. 이런 프로퍼 티를 어떻게 처리할 것인가를 알아보고 이 프로퍼티를 구성하는 방법도 자세히 알아본다.

일단 프로퍼티(property)는 메서드를 처리하지만 이름으로만 접근해서 처리한다. 이 프로 퍼티는 특정한 계산을 처리한 결과만을 제공하기도 한다.

어떻게 속성도 아닌데 이름으로만 접근이 가능한지를 추가적으로 알아야 한다. 이는 디스 크립터(descriptor)라는 다른 클래스를 만들어서 속성에 접근하고 읽거나 쓰기를 처리할 수 있다. 이 대상이 함수가 될 수도 있다.

프로퍼티는 메서드 즉 함수의 이름으로 접근해서 처리하는 디스크립터이다. 보통 디스크 립터는 접근하는 이름을 작성하고 디스크립터 내부 스페셜 메서드로 속성을 조회, 갱신, 삭제할 수 있다.

정보 은닉을 프로퍼티(property)나 디스크립터(descriptor)로 처리하는 것이 파이썬 권고 사 항이다. 프로퍼티는 속성의 개수가 적을 때 많이 사용하지만 속성이 많을 경우는 디스크 립터를 사용하는 것이 좋다.

프로퍼티와 디스크립터로 생성된 속성은 클래스에 존재하고 이 클래스 속성이 먼저 접근 되어 처리가 되어야 하므로 _ _getattribute_ _ 스페셜 메서드가 클래스 속성부터 접근해 서 처리하는 것을 알 수 있다.

이 장에서는 객체의 속성에 접근해서 처리하는 특별한 방법을 이해하기로 하겠다.

✚ 알아볼 주요 내용

● 프로퍼티 클래스로 메서드 등록하기

● 디스크립터 클래스로 인스턴스 속성 처리하기

● 프로퍼티와 디스크립터 인스턴스 검색 방법 알아보기
