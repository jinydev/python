---
layout: default
title: "09.04 메서드"
---

# 09.04 메서드

파이썬에는 세 가지 종류의 메서드가 있으며 인스턴스 메서드를 제외한 클래스 메서드 (classmethod)와 정적 메서드(staticmethod)는 정의할 때 데코레이터(@)나 별도 인스턴스 생 성의 기법을 이용해서 클래스 속성을 만들고 처리를 해야 한다.

일단 클래스 메서드나 정적 메서드는 클래스가 로딩될 때 한 번 만들어지고 이를 이용해서 사용이 가능하다.

인스턴스 메서드는 인스턴스가 바인딩할 때마다 내부적인 작업이 발생한다. 인스턴스가 많이 생성되는 경우에는 인스턴스 메서드보다는 클래스 내에 속성을 가지고 사용하는 디 스크립터 등의 사용을 권장한다.

일단 메서드가 어떻게 만들어지고 왜 인스턴스 메서드와 클래스 메서드에는 첫 번째 인자 가 고정되는지도 세부적으로 알아보기로 하겠다.

## 9.4.1 메스드(Method) 이해하기

인스턴스 메서드는 첫 번째 인자에 인스턴스의 레퍼런스가 자동으로 매핑되었다. 관행적 으로 self를 매개변수로 사용하지만 내부적으로는 _ _self_ _에 인스턴스 레퍼런스가 들어 가고 이를 자동으로 첫 번째 인자로 세팅해서 처리가 되는 것이다.

클래스 메서드는 classmethod라는 클래스를 이용해서 사용자 클래스 정의 내부에 클래 스 메서드로 생성하도록 만들어야 한다.

또한 정적 메서드는 staticmethod 클래스를 이용해서 사용자 클래스 정의 내부에 정적 메 서드를 생성한다.

이 클래스 메서드와 정적 메서드는 주로 데코레이터 기법을 많이 사용해서 메서드들을 등 록한다.

✚ 인스턴스 메서드(instance method) 확인하기

파이썬에서 클래스를 정의할 때 항상 인스턴스 메서드는 첫 번째 인자에 self라는 변수가 정의되어야 한다. 인스턴스 메서드는 인스턴스로 접근하기 전까지는 메서드로 처리가 되 지 않는다.

예제 9-26 : 인스턴스 메서드 정의하기

내부에 인스턴스 메서드를 하나만 가지는 Klass_ins 클래스를 정의했다. 인스턴스 set 메 서드 내의 로직으로는 setattr 함수를 이용해서 인스턴스에 들어갈 속성을 할당하도록 했다.

```python
In : class Klass_ins :
def set(self,name,value) :
setattr(self,name,value)
```

일단 아무런 일도 하지 않는 인스턴스가 생성이 되었는지를 확인한다. 이 인스턴스가 클 래스의 인스턴스인지를 isinstance 함수로 점검하면 True라고 출력한다.

```python
In : ki = Klass_ins()
print(ki)
print(isinstance(ki, Klass_ins))
Out: <__main__.Klass_ins object at 0x00000000052C6D68>
True
```

또 하나의 인스턴스를 만들어서 첫 번째 ki 인스턴스와 두 번째 kj 인스턴스 내부에 바인 딩된 메서드에 대한 레퍼런스가 동일한지를 확인하면 동일하지 않다는 결과를 확인할 수 있다.

두 개의 인스턴스에 바인딩된 set 메서드가 types 모듈을 이용해서 MethodType인지를 확인하면 둘 다 메서드라는 것을 알 수 있다.

```python
In : import types
kj = Klass_ins()
print(kj.set is ki.set)
print(type(ki.set) == types.MethodType)
print(type(kj.set) == types.MethodType)
Out: False
True
True
```

클래스 선언된 메서드에 대한 레퍼런스를 확인하면 인스턴스에 바인딩된 모든 메서드는 동일한 함수의 레퍼런스라는 것을 알 수 있다.

인스턴스 메서드가 생성될 때 내부적인 처리는 별도의 인스턴스 메서드를 만들어서 내부 클래스에 정의된 메서드를 원본으로 가지고 실행이 되면 클래스에 정의된 함수가 실행되 는 것을 알 수 있다.

```python
In : print(ki.set.__func__)
print(kj.set.__func__)
print(Klass_ins.set)
Out: <function Klass_ins.set at 0x0000000005180730>
<function Klass_ins.set at 0x0000000005180730>
<function Klass_ins.set at 0x0000000005180730>
```

set 인스턴스 메서드에 인자를 넣어서 갱신하고 인스턴스 객체의 네임스페이스를 확인하 면 name, age 속성이 추가되어 있다.

```python
In : ki.set("name","강감찬")
ki.set("age",45)
print(ki.__dict__)
Out: {'name': '강감찬', 'age': 45}
```

✚ 클래스 메서드 정의

파이썬 데코레이터를 이용해서 클래스의 메서드를 등록할 수 있다. classmethod는 하나 의 클래스이고 데코레이터로 등록이 발생하면 클래스에서 처리할 수 있는 클래스 메서드 로 전환해준다.

클래스 메서드가 등록되면 이 메서드의 이름이 클래스 네임스페이스에 등록되고 cls 변수 가 첫 번째로 정의되어 클래스와 바인딩되면 처리가 된다.

클래스 메서드를 데코레이터로 등록할 때는 반드시 메서드 바로 위에 @classmethod라 고 작성해야 한다.

예제 9-27 : 클래스 메서드 정의하기

내장 클래스인 classmethod 내부 구조를 먼저 알아보겠다. 처리하는 메서드를 정의하고, 클래스 메서드로 처리하기 위해서는 classmethod를 가지고 하나의 인스턴스를 만들어서 사용할 클래스 내부의 속성으로 만들어야 한다.

```python
In : print(classmethod)
Out: <class 'classmethod'>
```

이 classmethod 클래스의 내부 속성에는 인스턴스를 생성하는 _ _new_ _ 메서드가 있고 정의된 함수를 저장하는 _ _func_ _ 속성도 있다.

```python
In : import pprint
pprint.pprint(list(classmethod.__dict__))
Out: ['__get__',
'__init__',
'__new__',
'__func__',
'__isabstractmethod__',
'__dict__',
'__doc__']
```

이제 이런 classmethod를 가지고 클래스 Klass_cls를 정의하여 함수를 만들고 그 함수의 헤더 부분 바로 위에 데코레이터로 @classmethod를 정의해본다.

이 클래스에는 다른 속성이 없고 클래스 메서드로 등록되는 set 함수 하나만 있다. 이 함수 는 클래스 속성을 등록하는 데 사용된다.

```python
In : class Klass_cls :
@classmethod
def set(cls,name,value) :
setattr(cls,name,value)
```

이제 이 클래스에 name과 age 속성을 할당해서 등록한다.

```python
In : Klass_cls.set("name","클래스")
Klass_cls.set("age",50)
```

클래스 내에 클래스 메서드 set과 클래스 속성인 name과 age가 어떻게 등록이 되어 있는 지를 클래스 네임스페이스를 조회해서 출력해본다.

클래스 메서드 set을 보면 classmethod이 인스턴스로 등록된 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Klass_cls.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Klass_cls' objects>,
'__doc__': None,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass_cls'
objects>,
'age': 50,
```

'name': '클래스', 'set': <classmethod object at 0x00000000052F5438>}) 이번 Person 클래스에는 클래스 내에 먼저 name,age를 클래스 속성으로 정의했고 두 개 의 클래스 메서드 get, set을 정의했다.

```python
In : class Person :
name = ""
age = 0
@classmethod
def set(cls,name,value) :
setattr(cls,name,value)
@classmethod
def get(cls) :
return cls.name, cls.age
```

이번에서 name과 age 속성을 처리하면 기존에 정의된 것이 있으므로 갱신되는 것을 알 수 있다.

스페셜 메서드 get으로 이를 확인해보면 클래스 속성을 읽어서 튜플로 처리된 결과를 보 여주는 것을 확인한다.

```python
In : Person.set("name","클래스")
Person.set("age",50)
print(Person.get())
Out: ('클래스', 50)
```

클래스에서 인스턴스를 만들어 클래스 메서드를 호출하면 인스턴스에 아무 것도 없지만 클래스 메서드를 검색해서 실행한다. 또한 속성을 조회해도 인스턴스에는 아무 것도 없으 므로 상위인 클래스의 네임스페이스를 검색하면 조회가 되는 것을 확인할 수 있다.

```python
In : p = Person()
print(p.get())
print(p.name)
Out: ('클래스', 50)
클래스
```

파이썬은 실시간으로 속성을 추가할 수 있으므로 인스턴스.속성명으로 값을 할당하면 인 스턴스 속성에 값을 할당하는 것을 알 수 있다.

두 개의 속성이 인스턴스 네임스페이스에 추가가 되어 더 이상 클래스 속성을 참조하지 않 고 인스턴스 속성만 참조하는 것을 알 수 있다.

```python
In : c = Person()
```

c.name = "가을이" c.age = 55 print(c.get()) print(c.name) print(c.__dict__)

```python
Out: ('클래스', 50)
가을이
```

{'name': '가을이', 'age': 55} 하지만 클래스명으로 조회하면 클래스 속성을 조회해서 출력하는 것을 알 수 있다. 클래 스와 인스턴스에 동일한 이름으로 속성을 구성하지 않도록 주의해야 한다.

```python
In : print(Person.name)
print(Person.age)
Out: 클래스
```

클래스 메서드는 classmethod 클래스에 의해 만들어지므로 내부적으로 처리되는 자료형 도 MethodType이라는 것을 알 수 있다.

```python
In : import types
print(type(Person.set) == types.MethodType)
print(type(c.set) == types.MethodType)
Out: True
True
```

이번에는 하나의 인스턴스를 만들어서 classmethod를 가지고 처리하는 방식으로 클래스 메서드를 만들어보자. classmethod 생성자가 함수를 전달받아 클래스 속성에 할당해서 처리한다. 위에 정의된 데코레이터와 동일하게 실행되는지를 확인해보겠다.

```python
In : class KlassMethod :
def set(cls,name,value) :
setattr(cls,name,value)
set = classmethod(set)
```

클래스 메서드 set으로 내부의 클래스 속성 name을 추가했다. 클래스 메서드인지를 확인 하기 위해 set 메서드 이름으로 현재 저장된 인스턴스를 출력했다. 클래스 속성으로 name 이 들어 있는 것도 확인해봤다.

```python
In : KlassMethod.set("name","클래스 메서드")
print(KlassMethod.set)
print(KlassMethod.name)
Out: <bound method KlassMethod.set of <class '__main__.KlassMethod'>>
클래스 메서드
```

✚ 정적 메서드 정의

파이썬에서 정적 메서드는 클래스나 인스턴스에 대한 바인딩 지정이 필요 없다. 데코레이 터를 이용해서 메서드 바로 위에 @staticmethod로 지정하면 정적 메서드가 생성된다.

자바와 달리 정적 메서드는 클래스 메서드가 아니라 클래스 내에서 함수를 메서드처럼 사 용할 수 있도록 클래스와 인스턴스를 호출해서 사용이 가능하다.

예제 9-28 : 정적 메서드 정의하기

클래스 메서드와 같이 정적 메서드도 하나의 클래스인 staticmethod로 인스턴스를 만들 어서 등록한다.

전달되는 함수는 정적 메서드 인스턴스로 구성하므로 함수는 _ _func_ _에 들어가는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(list(staticmethod.__dict__))
Out: ['__get__',
'__init__',
'__new__',
'__func__',
'__isabstractmethod__',
'__dict__',
'__doc__']
```

Klass_st 클래스 내에 클래스 메서드와 정적 메서드를 정의한다. 정적 메서드의 첫 번째 인자에 obj로 정의하고 작성했다.

```python
In : class Klass_st :
name = ""
age = 0
def __init__(self,name,age) :
self.name = name
self.age = age
@classmethod
def set(cls,name,value) :
setattr(cls,name,value)
@staticmethod
def get(obj) :
return obj.name, obj.age
```

클래스의 네임스페이스를 확인하면 클래스 속성인 name, age, 클래스 메서드인 set, 정 적 메서드인 get이 정의되어 있는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Klass_st.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Klass_st' objects>,
'__doc__': None,
'__init__': <function Klass_st.__init__ at
0x00000000052EBE18>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Klass_st'
objects>,
'age': 0,
'get': <staticmethod object at 0x0000000005301518>,
'name': '',
'set': <classmethod object at 0x00000000053014A8>})
```

두 속성인 name,age는 클래스와 인스턴스 양쪽에 전부 있어서 인스턴스 메서드나 클래 스 메서드로 정의해야 하지만 정적 메서드 하나를 정의하고 양쪽을 전부 검색해서 출력하 도록 만들었다.

정적 메서드의 첫 번째 인자에 객체를 넣고 호출해야 하므로 메서드를 호출할 때 인스턴스 와 클래스에 대한 레퍼런스를 전달해줘야 한다.

```python
In : c = Klass_st("인스턴스",50)
```

Klass_st.set("name","클래스") Klass_st.set("age",55)

```python
In : print(c.get(c))
print(Klass_st.get(Klass_st))
Out: ('인스턴스', 50)
```

('클래스', 55) 정적 메서드에 대해서도 자료형을 비교해보면 메서드라는 것을 알 수 있다.

```python
In : import types
print(type(Klass_st.set) == types.MethodType)
print(type(c.set) == types.MethodType)
Out: True
True
```

정적 메서드는 데코레이터를 사용하지 않고 직접 인스턴스를 만들어서 클래스 속성에 넣 어 처리도 가능하다.

```python
In : class KlassMethod :
def set(cls,name, value) :
setattr(cls,name,value)
set = staticmethod(set)
```

클래스 메서드와의 차이점은 첫 번째 인자에 클래스 레퍼런스가 자동으로 들어가지 않으 므로 호출할 때 클래스에 대한 레퍼런스를 부여해서 메서드를 실행해야 클래스 속성이 처 리된다.

```python
In : KlassMethod.set(KlassMethod,"name","정적 메서드")
print(KlassMethod.set)
print(KlassMethod.name)
Out: <function KlassMethod.set at 0x10955af28>
정적 메서드
```

## 9.4.2 self/cls 매개변수 이해하기

파이썬에서 인스턴스 메서드와 클래스 메서드를 정의할 때 왜 첫 번째 인자로 self, cls 변 수를 지정하는지를 이해해야 한다.

메서드를 어떻게 바인딩해야 하는지를 명확히 이해해야 한다. 메서드가 함수와의 큰 차이 는 내부 속성에 _ _self_ _ 가 생기고 이 속성이 메서드의 첫 번째 인자에 자동으로 세팅되 는 것이다.

그래서 첫 번째 인자의 이름과 상관 없이 첫 번째 지정된 변수에 무조건 매칭되므로 self/ cls 관행을 따르는 것이 프로그램 가독성에 좋다.

✚ 인스턴스 메서드 정의 확인하기

인스턴스 메서드에서 매개변수 첫 번째 인자에 self를 관행적으로 붙이는 이유는 인스턴스 바이딩 시에 self 자리의 값은 항상 _ _self_ _ 속성에 들어와 있는 인스턴스 레퍼런스가 자 동으로 세팅되어 실행되기 때문이다.

예제 9-29 : 인스턴스 메서드 self 알아보기

Klass_insmetod 클래스에 인스턴스를 만들 때 name 속성과 getname 인스턴스 메서드 를 정의한다.

```python
In : class InsKlass :
def __init__(self,name) :
self.name = name
def getname(self) :
return self.name
```

클래스에 보관되는 getname 메서드 내의 레퍼런스를 확인하면 함수라고 표시되는 것을 알 수 있다. 인스턴스 하나를 만들고 인스턴스에서 메서드의 레퍼런스를 확인하면 메서드 라고 표시된다.

```python
In : print(InsKlass.getname)
```

ins = InsKlass("인스턴스") print(ins.getname)

```python
Out: <function InsKlass.getname at 0x00000000052EBB70>
<bound method InsKlass.getname of <__main__.InsKlass object at
0x00000000052C6C88>>
```

함수와 메서드일 때 속성과 메서드 차이를 확인해보면 _ _self_ _와 _ _func_ _ 두 가지 차 이가 있다는 것을 알 수 있다.

```python
In : s = set(dir(InsKlass.getname))
i = set(dir(ins.getname))
print(i - s)
Out: {'__func__', '__self__'}
```

인스턴스에서 메서드를 점 연산자로 이름을 호출하고 내부에 있는 _ _self_ _를 조사하면 인스턴스 레퍼런스가 들어가 있는 것을 알 수 있다.

클래스에 있는 메서드와 인스턴스가 바인딩한 메서드 내의 _ _func_ _에 들어 있는 함수의 레퍼런스와 동일하다는 것을 알 수 있다.

```python
In : print(ins)
print(ins.getname.__self__)
print(InsKlass.getname)
print(ins.getname.__func__)
Out: <__main__.InsKlass object at 0x00000000052C6C88>
<__main__.InsKlass object at 0x00000000052C6C88>
<function InsKlass.getname at 0x00000000052EBB70>
<function InsKlass.getname at 0x00000000052EBB70>
```

✚ 클래스 메서드 내부 확인하기

클래스 메서드가 정의되면 첫 번째 매개변수가 cls이고 이에 해당되는 내부 속성인 _ _ self_ _가 만들어진다. 클래스 메서드라고 인지되는 이유는 _ _self_ _ 정보를 가지고 바이 딩 시 세팅되고 매개변수 cls에 _ _self_ _ 정보가 세팅되기 때문이다.

예제 9-30 : 클래스 메서드 cls 알아보기

ClsKlass 클래스를 정의할 때 getname 클래스 메서드를 추가했다.

```python
In : class ClsKlass :
```

name = "클래스" def __init__(self,name) :

self.name = name @classmethod def getname(cls) :

return cls.name 하나의 인스턴스를 만들고 클래스에 보관된 메서드 상태를 조회하면 클래스 메서드라는 표시가 나온다.

```python
In : a = ClsKlass("인스턴스")
print(ClsKlass.getname)
Out: <bound method ClsKlass.getname of <class '__main__.ClsKlass'>>
```

클래스 메서드와 함수의 메서드를 비교해보면 _ _self_ _, _ _func_ _ 속성이 추가되어 있 는 것을 알 수 있다.

```python
In : s = set(dir(ClsKlass.__init__))
c = set(dir(ClsKlass.getname))
print(c-s)
Out: {'__func__', '__self__'}
```

클래스 내에 있는 _ _self_ _는 클래스 레퍼런스이지만 클래스 메서드와 클래스 메서드 안 에 있는 함수의 레퍼런스를 확인하면 상이한 것을 알 수 있다. 클래스 메서드가 데코레 이터 처리할 때 클래스에 정의된 함수를 전부 내부에 넣어서 새로운 클래스 메서드를 만 든다.

```python
In : print(ClsKlass)
print(ClsKlass.getname.__self__)
print(id(ClsKlass.getname))
print(id(ClsKlass.getname.__func__))
Out: <class '__main__.ClsKlass'>
<class '__main__.ClsKlass'>
```

✚ 인스턴스 메서드의 self 매개변수 위치 이해하기

인스턴스 메서드의 첫 번째 인자로 변수 self가 왜 필요한지를 명확히 확인해보기로 하 겠다. 메서드 정의 시 가변 위치 인자로 처리해보면 첫 번째 인자에 들어오는 값을 확인할 수 있다.

예제 9-31 : self 변수를 미지정해서 인스턴스 메서드 알아보기

클래스 이름을 Self로 정의하고 모든 인스턴스 메서드들의 매개변수를 가변 인자로 처리 했다. 가변 인자로 처리해도 첫 번째 인자는 항상 인스턴스 레퍼런스가 처리된다.

초기화 _ _init_ _ 메서드는 첫 번째 인자가 인스턴스 레퍼런스이므로 이 레퍼런스를 가지 고 점 연산자 다음에 내부 네임스페이스로 내부 속성을 추가할 수 있다. 이때 인덱싱으로 내부 속성을 확인하기 위해 키값을 문자열로 넣어야 한다.

인스턴스 내부를 조회하는 get 메서드는 args[0]에 들어온 것을 기준으로 내부 속성을 점 연산자로 접근해서 호출하도록 했다.

```python
In : class Self :
attr = ("name","age")
def __init__(*args) :
print("__self__ argument ",args[0])
print("__self__ attribute ",args[0].__init__.__self__)
for i in range(1,len(args)) :
args[0].__dict__[Self.attr[i-1]] = args[i]
def get(*args) :
print("__self__ attribute ",args[0].get.__self__)
return args[0].name, args[0].age
```

생성자로 인스턴스를 하나 생성했다. 이 인스턴스에 속성이 제대로 들어갔는지를 확인하 기 위해 인스턴스 네임스페이스를 조회해서 속성이 들어간 것을 확인했다.

```python
In : s = Self("Dahl",22)
print(s.__dict__)
print(s)
Out: __self__ argument <__main__.Self object at 0x00000000050500F0>
__self__ attribute <__main__.Self object at 0x00000000050500F0>
{'name': 'Dahl', 'age': 22}
<__main__.Self object at 0x00000000050500F0>
```

인스턴스 메서드를 호출하면 튜플로 결과를 출력하는 것을 알 수 있다.

```python
In : print(s.get())
Out: __self__ attribute <__main__.Self object at 0x00000000050500F0>
('Dahl', 22)
```

위의 방식를 간편하게 문법대로 작성하면 동일한 결과가 나오는 것을 확인할 수 있다. 클 래스를 정의할 때 메서드에 명확한 매개변수를 지정한다.

```python
In : class Self_ :
def __init__(self,name,age) :
self.name = name
self.age = age
def get(self) :
return self.name, self.age
```

인스턴스를 만들고 인스턴스의 네임스페이스를 조회해보면 이름과 나이가 들어가 있는 것 을 알 수 있다. get 메서드를 실행하면 결과가 나온다.

```python
In : s = Self_("Dahl",22)
print(s.__dict__)
print(s)
print(s.get())
Out: {'name': 'Dahl', 'age': 22}
<__main__.Self_ object at 0x0000000004F88940>
('Dahl', 22)
```

## 9.4.3 외부 함수와 메서드를 동시에 사용하는 패턴 이해하기

파이썬은 바인딩되는 시점에 함수를 메서드로 변환해서 처리하므로 외부에 정의된 함수를 가지고 클래스를 정의할 때 재사용이 가능하다.

실제 함수를 클래스 내의 메서드로 지정하면 인스턴스 메서드, 클래스 메서드일 경우 첫 번째 매개변수를 명확히 맞춰서 바인딩할 때 _ _self_ _가 들어가야 메서드로 바뀌는 것을 알 수 있다.

클래스 밖에 함수를 정의하고 클래스 내에서 메서드로 사용하는 방법을 예제를 통해 알아 보겠다.

✚ 외부 함수를 내부 인스턴스 메서드로 사용하기

파이썬은 함수도 객체이므로 외부에 함수를 정의하고 클래스 내의 변수에 할당해도 사용 할 때는 바인딩되면 메서드로 인지한다. 대신 외부 함수의 첫 번째 매개변수는 항상 인스 턴스 객체를 처리할 수 있어야 바인딩 시점에서 첫 번째 인자에 인스턴스가 들어가 메서드 로 인식한다.

클래스 내의 모든 메서드는 외부 함수를 정의하고 매개변수가 메서드를 처리할 수 있도록 지정하면 이를 클래스 내부에 할당해서 인스턴스 메서드, 클래스 메서드, 정적 메서드를 만들 수 있다.

예제 9-32 : 외부 함수를 정의하고 클래스 내부에 할당하기

함수 getname, getage를 외부에 정의할 때 첫 번째 인자에 self 변수를 정의해서 메서드 처리와 동일한 구조를 만든다.

```python
In : def getname(self) :
return self.name
def getage(self) :
return self.age
```

Person 클래스를 정의하고 내부 메서드 이름인 getname, getage에 외부에 지정된 함수 를 할당한다.

```python
In : class Person :
def __init__(self,name,age) :
self.name = name
self.age = age
getname = getname
getage = getage
```

두 개의 함수가 클래스 내부의 네임스페이스에 들어와 있는 것을 확인할 수 있다. 네임스 페이스가 이름 값으로 관리하므로 함수가 값으로 들어와도 로딩할 때는 특별한 문제가 없 이 처리되는 것을 알 수 있다.

```python
In : import pprint
pprint.pprint(Person.__dict__)
Out: mappingproxy({'__dict__': <attribute '__dict__' of 'Person' objects>,
'__doc__': None,
'__init__': <function Person.__init__ at
0x00000000052F97B8>,
'__module__': '__main__',
'__weakref__': <attribute '__weakref__' of 'Person'
objects>,
'getage': <function getage at 0x00000000052F92F0>,
'getname': <function getname at 0x00000000052F91E0>})
```

인스턴스 p를 만들고 함수와 메서드를 처리하면 동일하게 처리되는 것을 알 수 있다.

일단 인스턴스 메서드는 매개변수를 지정할 때 첫 번째 인자에 인스턴스 메서드가 들어가 도록 정의하고 나머지 매개변수는 그 메서드가 처리하는 내부 로직이 동일할 경우 함수나 메서드가 동일하게 처리되는 것을 알 수 있다.

함수의 내부 로직도 첫 번째 인자인 인스턴스를 가지고 처리하도록 명기를 하면 인스턴스 의 속성을 가지고 항상 동일하게 처리되는 것을 알 수 있다.

```python
In : p = Person("함수",44)
print(p.getname())
print(getname(p))
print(p.getage())
print(getage(p))
Out: 함수
함수
```

함수와 메서드 내의 원본 함수를 보관하는 _ _func_ _ 속성 내 함수의 레퍼런스를 비교해 보면 동일하다는 것을 알 수가 있다.

```python
In : print(p.getname)
print(getname)
print(p.getname.__func__ is getname)
print(p.getage)
print(getage)
print(p.getage.__func__ is getage)
Out: <bound method getname of <__main__.Person object at 0x0000000005042860>>
<function getname at 0x000000000501EBF8>
True
<bound method getage of <__main__.Person object at 0x0000000005042860>>
<function getage at 0x000000000501E9D8>
True
```

외부 함수 get을 정의한 후에 이 함수를 이용해서 클래스 메서드를 만들어보겠다.

```python
In : def get(cls) :
return cls.name
```

클래스를 정의하고 외부 함수를 classmethod에 인자로 넣어 인스턴스를 만들어서 get에 할당했다.

```python
In : class Klass_get :
name = "Klass_get"
get = classmethod(get)
```

이 클래스를 가지고 클래스 메서드를 호출해서 처리하면 클래스 속성 name을 호출해서 출력하는 것을 볼 수 있다.

```python
In : print(Klass_get.get())
Out: Klass_get
```

예제 9-33 : _ _init_ _ 를 함수로 정의하고 클래스 내에 할당할 경우

스페셜 메서드도 재정의가 가능하므로 외부 함수를 스페셜 메서드 이름으로 정의해도 함 수를 내부 메서드로 정의해서 처리할 수 있다.

_ _init_ _ 이름으로 함수를 하나 정의했다. 매개변수도 첫 번째 변수명은 self이고 내부 로 직에는 점 연산을 통해 내부 속성에 값을 할당했다. 초기화는 반환 값이 없으므로 정의하 지 않는다.

```python
In : def __init__(self,name,age) :
self.name = name
self.age = age
```

Person 클래스 내의 속성과 메서드도 네임스페이스가 딕셔너리 자료형으로 관리되므로 외부 함수를 클래스 Person 내의 속성에 할당되도록 처리해도 클래스 내부에 인스턴스 메 서드를 정의한 것과 동일하게 처리된다.

```python
In : class Person :
__init__ = __init__
```

Person 클래스로 인스턴스를 생성해서 p에 할당하고 인스턴스 내부 속성을 확인하면 name, age가 들어가 있는 것을 확인할 수 있다.

```python
In : p = Person("DahlMoon",22)
print(p.__dict__)
Out: {'name': 'DahlMoon', 'age': 22}
```

_ _init_ _메서드 내 _ _func_ _ 속성 내의 레퍼런스와 _ _init_ _ 함수의 주소를 비교해보면 동일한 함수의 레퍼런스가 들어가 있는 것을 알 수 있다.

```python
In : print(p.__init__.__func__)
print(__init__)
Out: <function __init__ at 0x000000000500F598>
<function __init__ at 0x000000000500F598>
```

## 9.4.4 fluent interface(메서드 체이닝)

객체의 메서드들을 처리할 때 메서드가 연속으로 호출되면서 처리가 필요할 때가 있다.

연속해서 메서드를 호출하기 위해 메서드들이 반환값으로 현재 처리되는 인스턴스를 넘겨 주면 정해진 메서드가 연속적으로 호출되어 실행된다.

순환을 방지하기 위해 제일 마지막 처리되는 부분을 정하고 마지막 처리는 인스턴스 객체 가 아닌 로직이 처리된 계산 결과로 반환한다.

예제 9-34 : Method Chain 처리

MethodChain클래스를 정의할 때 intent, suffix 메서드는 로직을 처리한 후에 self를 반 환해서 처리한다. 이런 구조로 만드는 이유는 이 메서드들을 처리한 후에도 인스턴스로 리턴하므로 연속해서 처리할 수 있기 때문이다.

```python
In : class MethodChain :
def __init__(self, content) :
self.content = content
def intent(self,space) :
self.content = " "*space + self.content
return self
def suffix(self,content) :
self.content = self.content + "-" + content
return self
```

MethodChain으로 인스턴스를 생성하고 바로 intent, suffix 메서드를 호출해서 처리 한다. 이 메서드 처리된 결과도 인스턴스이므로 마지막에 메서드에서 처리한 속성을 조회 해서 변수 m에는 self.content 내용이 할당되는 것을 알 수 있다.

```python
In : m = MethodChain("하늘과별과 시").intent(5).suffix("윤동주").content
print(m)
Out:   하늘과별과 시-윤동주
```
