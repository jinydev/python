---
layout: default
title: "08.04 가변"
---

# 08.04 가변

함수를 정의할 때 매개변수를 무한정 정의하기도 힘들다. 이때 인자가 여러 개이지만 매 개변수는 하나일 수 있다. 이때 표기법은 위치 인자일 경우는 별표 하나를 변수에 지정해 서 처리하고 키워드 인자는 별표 2개를 변수에 지정해서 처리한다.

이때 매개변수가 패킹으로 처리되는 것을 알 수 있다.

## 8.4.1 가변 위치 인자

함수의 매개변수는 하나이고 인자가 여러 개일 경우 이를 묶어서 튜플에 넣어 매개변수의 값으로 넣는 방식이 가변 위치 인자 패킹 처리이다.

표기법은 하나의 매개변수명 앞에 *를 붙여서 처리하면 된다. 가변 위치 인자는 항상 고정 위치 인자 다음에 정의가 가능하다.

예제 8-17 : 매개변수에 동적 인자 패킹처리

함수의 하나의 매개변수 args를 지정한다. 보통 가변 위치 인자의 변수명을 args로 지정 해서 처리하는 것이 관행이다.

가변 위치 인자 앞에 고정 위치 인자가 없으므로 모든 것은 가변 위치 인자로만 사용된다.

```python
In : def var_pos_args(*args) :
print(type(args))
print(locals())
```

함수를 호출할 때 가변이므로 인자가 없을 때도 실행이 되며 지역 네임스페이스에 아무 것 도 없다는 튜플이 출력된다.

하나의 인자를 넣어서 처리하면 고정 위치 인자와 다르게 하나의 튜플로 생성된 것을 확인 할 수 있다. 가변 위치 인자는 튜플로만 관리되는 것을 알 수 있다. 또 함수를 호출해서 인 자를 2개 부여했다. 이번에는 튜플에 인자가 2개 들어가 있는 것을 알 수 있다.

다양한 인자가 들어와 모두 가변 위치 인자로 인식해서 하나의 튜플에 전부 할당되는 것을 알 수 있다.

```python
In : print(var_pos_args())
print(var_pos_args(1))
print(var_pos_args(1,2))
Out: <class 'tuple'>
{'args': ()}
None
<class 'tuple'>
{'args': (1,)}
None
<class 'tuple'>
{'args': (1, 2)}
None
```

함수 정의를 수정해서 고정 매개변수를 지정하고 가변 매개변수는 고정 매개변수 다음에 지정했다.

```python
In : def var_pos_args(x,y,z,*args) :
print(type(args))
print(locals())
```

함수를 호출할 때에 6개의 인자를 넣으면 3개는 고정 매개변수에 할당되고 나머지 3개의 인자는 가변 위치 인자들이므로 하나의 튜플로 구성되어 처리된다.

```python
In : print(var_pos_args(1,2,3,4,5,6))
Out: <class 'tuple'>
{'args': (4, 5, 6), 'z': 3, 'y': 2, 'x': 1}
None
```

고정 위치 인자와 가변 위치 인자를 혼합해서 처리할 때는 가변 위치 인자까지 처리한 후 에 키워드 인자가 처리된다.

위치 인자와 키워드 인자를 혼합해서 처리할 수 없으므로 구분해서 처리를 해야 한다.

```python
In : print(var_pos_args(1,z=3,y=5,345))
Out: File "<ipython-input-35-8ac765f63da1>", line 1
print(var_pos_args(1,z=3,y=5,345))
^
SyntaxError: positional argument follows keyword argument
```

예제 8-18 : 가변 위치 인자와 고정 키워드 인자에 혼합해서 사용

가변 위치 인자 다음에 매개변수 x가 정의되었다. 가변 위치 인자 다음에 정의된 매개변수 는 반드시 키워드 인자로 처리가 된다.

```python
In : def var_pos_args_(*args,x) :
print(type(args))
print(locals())
```

함수 호출할 때 위치 인자 6개를 넣어서 처리하면 가변위치 인자 다음에 들어온 인자가 키 워드 인자이므로 이 키워드 인자가 할당되지 않아서 함수가 호출되지 않는다는 예외가 발 생한다.

```python
In : print(var_pos_args_(1,2,3,4,5,6))
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-39-f0b8a42278d6> in <module>()
----> 1 print(var_pos_args_(1,2,3,4,5,6))
TypeError: var_pos_args_() missing 1 required keyword-only argument: 'x'
```

가변 위치 인자 후에 고정 키워드 인자로 값을 할당해야 정상적으로 처리되는 것을 확인할 수 있다.

```python
In : print(var_pos_args_(1,2,3,4,5,6,x=10))
Out: <class 'tuple'>
{'args': (1, 2, 3, 4, 5, 6), 'x': 10}
None
```

## 8.4.2 가변 키워드 인자

매개변수를 정의할 때도 고정 위치, 가변 위치, 고정 키워드, 가변 키워드 순으로 정의 한다. 함수를 호출할 때도 가변 키워드 인자는 고정 위치 인자, 가변 위치 인자, 고정 키워 드 인자가 할당된 다음에 넣어서 처리한다.

가변 키워드 인자를 지정하는 가변 키워드 매개변수명 앞에 별표를 두 개 지정해서 패킹이 된다는 것을 명기해야 하고 관행적으로 kwargs라는 이름으로 지정한다. 가변 키워드 인 자는 딕셔너리 자료형으로 구성된다.

✚ 가변 키워드 인자 처리

함수에 가변 키워드 인자만 처리해도 함수의 지역 네임스페이스에서 하나의 매개변수 내 에 다양한 키와 값을 쌍의 데이터로 보관할 수 있다. 매개변수를 고정하지 않고 다양한 로 직의 처리를 위해 사용할 수 있다.

예제 8-19 : 가변 키워드 인자 처리

함수의 매개변수에 **kwargs를 사용해서 정의한다. 이제 함수를 호출할 때는 가변 키워드 인자로만 전달한다.

```python
In : def var_key_args(**kwargs) :
print(type(kwargs), kwargs)
```

아무 것도 없이 함수를 실행해도 가변 키워드 인자와 매핑되는 가변 매개변수가 있으므로 아무 것도 없는 딕셔너리가 생성된 것을 알 수 있다.

키워드 인자를 3개 주고 처리하면 딕셔너리 내부에 3개의 키와 값을 쌍으로 구성한 딕셔 너리가 출력되는 것을 볼 수 있다.

```python
In : print(var_key_args())
print(var_key_args(a=1,b=2,c=3))
Out: <class 'dict'> {}
None
<class 'dict'> {'a': 1, 'b': 2, 'c': 3}
None
```

가변 키워드 인자는 딕셔너리로 관리하므로 내부의 키와 값을 쌍으로 조회하면 items 메 서드로 읽어서 처리하도록 함수를 정의했다.

```python
In : def var_key_args(**kwargs) :
print(type(kwargs), kwargs)
for k,v in kwargs.items() :
print("key ",k, " value ",v)
```

함수를 호출해서 출력된 결과를 보면 키와 값으로 구분해서 출력한 것을 확인할 수 있다.

```python
In : print(var_key_args())
print(var_key_args(a=1,b=2,c=3))
Out: <class 'dict'> {}
None
<class 'dict'> {'a': 1, 'b': 2, 'c': 3}
key a value 1
key b value 2
key c value 3
None
```

가변 키워드 인자에 들어온 값만을 처리하려면 values 메서드를 이용해서 값만을 불러와 덧셈을 처리한 결과를 반환해서 처리되는 함수를 정의한다.

```python
In : def var_key_args(**kwargs) :
print(type(kwargs), kwargs)
result = 0
for v in kwargs.values() :
result += v
return result
```

함수를 호출할 때 키워드 인자를 넣고 처리를 하면 키워드 인자의 값을 더한 결과를 출력 하는 것을 확인할 수 있다.

```python
In : print(var_key_args())
print(var_key_args(a=1,b=2,c=3))
Out: <class 'dict'> {}
<class 'dict'> {'a': 1, 'b': 2, 'c': 3}
```

✚ 가변 위치 인자와 가변 키워드 인자 혼합

함수의 매개변수를 정의할 때 가변 위치 인자 다음에 키워드 인자가 올 수 있다. 고정과 가변 키워드 인자를 처리하는 방식을 이해해보자.

예제 8-20 : 가변 위치 인자와 가변 키워드 인자 혼합 처리

함수를 정의할 때도 함수의 인자 호출 순서에 따라 가변 위치 인자와 가변 키워드 인자로 정의를 했다.

고정 위치 인자와 고정 키워드 인자가 없으므로 모든 인자는 가변으로 처리되는 것을 확인 한다.

```python
In : def var_pos_key_args(*args,**kwargs) :
print(type(args), args)
print(type(kwargs), kwargs)
result = 0
for v in args :
result += v
for v in kwargs.values() :
result += v
return result
```

가변이므로 아무런 인자도 없이 호출을 하면 값을 계산한 결과가 없으므로 0이 출력된다.

일단 가변 위치 인자만 넣고 함수를 호출하면 가변 키워드 인자는 아무 것도 없어서 빈 딕 셔너리와 가변 위치 인자가 들어온 값을 합산한 결과를 출력한다.

```python
In : print(var_pos_key_args())
print(var_pos_key_args(1,2,3,4))
Out: <class 'tuple'> ()
<class 'dict'> {}
<class 'tuple'> (1, 2, 3, 4)
<class 'dict'> {}
```

가변 위치 인자와 가변 키워드 인자를 동시에 넣고 실행하면 두 개의 매개변수에 대해 전 부 들어온 것을 알 수 있고 모든 값을 다 더해서 결과를 보여준다.

가변 키워드 인자만 넣고 처리하면 가변 위치 인자는 빈 튜플을 표시하고 가변 키워드 인 자만 더한 결과를 출력하는 것을 볼 수 있다.

```python
In : print(var_pos_key_args(1,2,3,4, a= 1, b=2))
print(var_pos_key_args( a= 1, b=2))
Out: <class 'tuple'> (1, 2, 3, 4)
<class 'dict'> {'a': 1, 'b': 2}
<class 'tuple'> ()
<class 'dict'> {'a': 1, 'b': 2}
```

예제 8-21 : 위치 인자, 가변 위치 인자, 키워드 인자, 가변 키워드 인자를 혼합

고정 위치 x,y와 고정 키워드 z, 가변 위치 args와 가변 키워드 kwargs로 매개변수를 지 정했다.

```python
In : def all_args(x,y,*args,z,**kwargs) :
print(locals())
```

고정 위치 인자 1을 넣고 고정 키워드 인자를 1개 넣어 호출하면 필수로 넣어야 할 고정 위치 인자 하나가 부족하므로 예외가 발생한다.

```python
In : all_args(5,z=1)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-52-c9aa824da4ca> in <module>()
----> 1 all_args(5,z=1)
TypeError: all_args() missing 1 required positional argument: 'y'
```

고정과 가변 위치 인자만 넣어도 에러가 나는 이유는 고정 키워드 인자에 값을 넣지 않았 기 때문이다. 고정 위치와 고정 키워드 인자는 필수적으로 넣어야 처리되는 것을 알 수 있다.

```python
In : all_args(5,6,7,8,9)
Out: ---------------------------------------------------------------------
TypeError              Traceback (most recent call last)
<ipython-input-54-ffbe98c1d79a> in <module>()
----> 1 all_args(5,6,7,8,9)
TypeError: all_args() missing 1 required keyword-only argument: 'z'
```

필수인 고정 위치 인자와 고정 키워드 인자를 넣어서 실행하면 예외는 발생하지 않고 가변 위치 인자와 가변 키워드 인자에 아무 것도 없다는 것을 표시한다.

```python
In : all_args(5,6,z=1)
Out: {'kwargs': {}, 'args': (), 'z': 1, 'y': 6, 'x': 5}
```

고정 위치 인자 2개, 가변 위치 인자 2개, 고정 키워드 인자 1개와 가변 키워드 인자 3개를 넣어서 처리하면 모든 매개변수에 인자가 전부 들어가 있는 것을 확인할 수 있다.

```python
In : all_args(5,6,7,8,z=9, a=1,b=2,c=4)
Out: {'kwargs': {'a': 1, 'b': 2, 'c': 4}, 'args': (7, 8), 'z': 9, 'y': 6,
'x': 5}
```

예제 8-22 : 키워드 인자를 확정해서 사용하고 싶을 경우

함수를 정의할 때 가변 위치 인자 자리에 *만 사용하면 가변 위치 인자로 넣어서 다음에 처 리되는 것은 항상 고정 키워드 인자로 명기해서 처리가 가능하다.

위치 인자는 2개인데 3개를 넣고 호출해도 키워드 인자에 매핑이 되지 않을 경우 예외를 발생시킨다.

```python
In : def key_args(x,y,*,z) :
print(locals())
print(key_args(10,10,10))
Out: ---------------------------------------------------------------------
TypeError               Traceback (most recent call last)
<ipython-input-32-5a84f122d8ac> in <module>()
2   print(locals())
----> 4 print(key_args(10,10,10))
TypeError: key_args() takes 2 positional arguments but 3 were given
```

고정이라는 뜻은 반드시 인자로 전달될 때 명기를 해서 처리한다는 뜻이므로 키워드 인자 에 z=10이라고 지정해서 처리한 결과 함수의 지역 네임스페이스에 제대로 값이 들어가 있 는 것을 확인할 수 있다.

```python
In : print(key_args(10,10,z=10))
Out: {'z': 10, 'y': 10, 'x': 10}
None
```
