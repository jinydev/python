---
layout: default
title: "08.03 고정"
---

# 08.03 고정

앞에서 매개변수와 인자의 바인딩 및 초기화에 대해서 알아봤다. 이제 매개변수와 인자 간의 패킹과 언패킹을 처리하는 방식을 알아본다.

함수를 정의할 때는 주로 패킹에 대한 기준을 표시하고 함수를 호출할 때는 언패킹에 대한 기준을 표시한다. 인자를 어떻게 할당하는지에 따라 인자를 부르는 방식이 다르다는 것도 이해한다.

고정 매개변수는 위치 인자나 키워드 인자라도 항상 필수이므로 함수가 호출될 때 값이 들어와야 한다. 혹시 누락이 생길 수 있으므로 초기값을 배정해서 처리가 되도록 할 수 있다.

매개변수와 인자가 고정으로 정해져 일대일로 매핑되는 고정 처리부터 알아본다.

## 8.3.1 고정 위치 인자

함수의 매개변수를 지정하면 함수를 호출할 때 인자를 매개변수의 위치에 따라 그대로 매 핑하는 것이 고정 위치 인자이다. 고정 위치 인자는 필수이므로 값도 항상 하나만 들어가 야 한다.

예제 8-14 : 매개변수 위치에 인자 매핑하기

함수에 3개의 매개변수를 정의했다. 매개변수에 초기값을 정의하지 않았기 때문에 인자가 정해지면 매개변수와 일대일로 매핑이 되어야 한다.

전체의 매개변수와 인자의 수가 동일해야 하고 동일하지 않으면 예외가 발생한다.

```python
In : def position_args(x,y,z) :
return x,y,z
print(position_args(10,20))
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-20-b4b56d9d0f99> in <module>()
2   return x,y,z
----> 4 print(position_args(10,20))
TypeError: position_args() missing 1 required positional argument: 'z'
```

위의 매개변수에 맞춰 인자를 넣으면 함수가 실행되는 것을 알 수 있다.

```python
In : print(position_args(10,20,30))
Out: (10, 20, 30)
```

위의 에러가 왜 발생하는지를 확인해보면 _ _code_ _.co_varnames 속성 내에 관리되는 매개변수의 이름은 위치 인자의 순서대로 관리한다.

이를 이용해서 내부에서 동일한 변수에 지역 네임스페이스의 키로 값을 조회해서 다시 할 당했다.

```python
In : def position_args(x,y,z) :
local = locals()
varnames = position_args.__code__.co_varnames
x = local[varnames[0]]
y = local[varnames[1]]
z = local[varnames[2]]
return x,y,z
```

동일한 인자로 이 함수를 실행하면 실행이 되어 매개변수와 할당된 인자를 그대로 출력하 는 것을 볼 수 있다.

```python
In : print(position_args(10,20,30))
Out: (10, 20, 30)
```

## 8.3.2 고정 키워드 인자

함수 매개변수를 지정할 때 고정은 일대일 매핑을 처리한다. 위에서 그대로 위치별로 할 당을 했지만 사용자가 임의로 변수명을 할당해서 키워드 인자로도 인자를 할당해 처리할 수 있다.

고정 키워드 인자도 필수이므로 요구하는 값이 하나 들어가야 한다. 고정 키워드 인자에 값이 들어가지 않으면 예외가 발생한다.

예제 8-15 : 고정 키워드 인자 확인하기

함수를 고정 매개변수를 지정해서 정의했다. 항상 이 함수를 호출할 때는 3개의 인자를 지 정한다.

키워드 인자는 이 매개변수의 이름으로 정의하고 값을 할당한 후에 함수를 호출해서 처리 하면 된다. 매개변수명과 값을 매핑해서 넣어주면 내부의 지역 네임스페이스가 딕셔너리 자료형이므로 동일한 변수에 맞춰 처리가 된다.

```python
In : def key_args(x,y,z) :
local = locals()
varnames = key_args.__code__.co_varnames
x = local[varnames[0]]
y = local[varnames[1]]
z = local[varnames[2]]
return x,y,z
```

첫 번째 호출할 때 첫 인자는 값만 넣어서 매개변수 x는 고정 위치 인자로 바인딩이 되었 고 y,z는 키워드 인자로 할당해서 실행을 했다.

```python
In : print(key_args(10,z=20,y=30))
Out: (10, 30, 20)
```

두 번째 함수 호출은 위치에 상관없이 각 매개변수를 지정하고 값을 할당해 실행해서 결과 가 나온다.

```python
In : print(key_args(z=10,x=20,y=30))
Out: (20, 30, 10)
```

## 8.3.3 고정 위치 인자와 고정 키워드 인자 매핑

함수를 정의할 때 고정된 매개변수를 위치 인자와 키워드 인자를 혼재해서 사용할 수 있다. 동일한 매개변수가 사용되지 않도록 주의해야 하고 항상 위치 인자 앞에 키워드 인 자를 사용할 수 없다. 위치 인자가 없을 경우 전부 키워드 인자로 사용할 수는 있다.

예제 8-16 : 동일한 매개변수를 혼용 사용할 때 주의사항

함수를 정의하고 위치 인자를 넣어 함수를 호출해서 실행했다.

```python
In : def pos_key_args(x,y) :
return x,y
In : print(pos_key_args(10,10))
Out: (10, 10)
```

함수를 호출할 때 매개변수 x를 위치 인자로 할당하고 또 키워드 인자로 할당했다. 두 번 처리가 발생해서 예외를 발생시킨다.

```python
In : print(pos_key_args(10,x=10))
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-29-92b273f53cd0> in <module>()
----> 1 print(pos_key_args(10,x=10))
TypeError: pos_key_args() got multiple values for argument 'x'
```

위치 인자보다 키워드 인자가 먼저 오면 문법적인 오류가 발생한다. 첫 번째는 항상 위치 인자부터 처리해야 한다.

```python
In : print(pos_key_args(x=10,10))
Out: File "<ipython-input-30-81f72259ead5>", line 1
print(pos_key_args(x=10,10))
^
SyntaxError: positional argument follows keyword argument
```
