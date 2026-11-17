---
layout: semester3
title: "1주차 3교시: 이벤트 연결과 동적 UI 업데이트 (3/3) 🖥️"
permalink: /semester3/week01/session3.html
description: "1주차 3교시: 이벤트 연결과 동적 UI 업데이트 (3/3) 🖥️에 대한 파이썬(Python) 강좌 문서입니다."
keywords: "1주차 3교시: 이벤트 연결과 동적 UI 업데이트 (3/3) 🖥️, 파이썬, Python, 프로그래밍, 개발, jinydev"
---

# 1주차 3교시: 이벤트 연결과 동적 UI 업데이트 (3/3) 🖥️

지난 시간에는 Tkinter의 기본 위젯과 배치 관리자를 배웠습니다. 이제 GUI 프로그램의 핵심인 **"사용자와의 상호작용"**을 구현하는 방법을 배웁니다. 위젯의 상태를 변경하고, 사용자의 입력값을 가져오는 방법을 중심으로 학습합니다.

---

## 1. 버튼 이벤트와 콜백 함수 (Callback Functions)

GUI 프로그램은 사용자가 버튼을 누를 때까지 기다립니다. 버튼이 눌렸을 때 실행될 함수를 **콜백 함수**라고 합니다.

### 1.1 콜백 함수 구현 패턴
```python
import tkinter as tk

def on_click():
    # 버튼이 눌렸을 때 실행될 로직
    print("버튼이 클릭되었습니다!")
    # 다른 위젯의 텍스트를 변경하는 코드 (동적 업데이트)
    result_label.config(text="버튼을 누르셨군요!")

root = tk.Tk()
result_label = tk.Label(root, text="결과가 여기에 표시됩니다.")
result_label.pack()

# command 옵션에 함수 이름을 전달 (괄호 없이!)
button = tk.Button(root, text="클릭!", command=on_click)
button.pack()

root.mainloop()
```

### 1.2 주의사항: 함수에 인자를 전달하고 싶을 때
`command=on_click`과 같이 작성하면 Tkinter는 함수를 실행만 시킵니다. 만약 함수에 인자를 전달하고 싶다면, **람다(lambda) 함수**를 사용해야 합니다.

- **잘못된 예:** `command=on_click("Hello")` $\rightarrow$ 프로그램 시작과 동시에 함수가 실행되어 버립니다.
- **올바른 예:** `command=lambda: on_click("Hello")` $\rightarrow$ 버튼을 눌렀을 때만 람다 함수가 실행되고, 그 내부에서 `on_click`이 호출됩니다.

---

## 2. 위젯의 상태 관리와 동적 업데이트

GUI 프로그램은 정적인 화면이 아니라, 사용자의 입력에 따라 화면이 계속 변하는 **동적 UI**를 지향합니다.

### 2.1 `config()` 메서드: 위젯 속성 변경
이미 생성된 위젯의 속성(텍스트, 색상, 폰트 등)을 나중에 변경하고 싶을 때 `config()` 메서드를 사용합니다.

```python
# 예: 라벨의 텍스트 변경
label.config(text="새로운 텍스트로 변경되었습니다!", fg="blue")
```

### 2.2 `Entry` 위젯에서 값 가져오기: `.get()`
사용자가 입력창에 쓴 내용을 가져오려면 `.get()` 메서드를 사용합니다.

```python
import tkinter as tk

def greet():
    name = entry.get() # 입력창의 텍스트를 가져옴
    if name:
        label.config(text=f"안녕하세요, {name}님!")
    else:
        label.config(text="이름을 입력해 주세요.")

root = tk.Tk()
entry = tk.Entry(root)
entry.pack()
entry.insert(0, "이름을 입력하세요") # 초기값 설정

button = tk.Button(root, text="확인", command=greet)
button.pack()
label = tk.Label(root, text="결과")
label.pack()

root.mainloop()
```

---

## 3. GUI 프로그램의 설계 원칙: 데이터와 UI의 분리

초보 개발자가 가장 많이 하는 실수는 모든 로직을 GUI 코드 안에 섞어 넣는 것입니다. 이는 유지보수를 매우 어렵게 만듭니다.

### 3.1 나쁜 설계 (Spaghetti Code)
- 버튼 클릭 함수 내부에 복잡한 계산 로직, DB 연결 코드, 네트워크 통신 코드가 모두 들어있는 경우.
- **문제:** UI 라이브러리를 Tkinter에서 PyQt로 바꾸고 싶을 때 모든 코드를 다시 짜야 합니다.

### 3.2 좋은 설계 (Separation of Concerns)
- **UI 레이어:** 오직 화면에 보여주는 것과 사용자 입력을 받는 것에만 집중합니다.
- **비즈니스 로직 레이어:** 실제 계산, 데이터 처리 등 핵심 기능을 수행하는.
- **연결:** UI 레이어에서 버튼을 누르면 비즈니스 로직 함수를 호출하고, 그 결과값을 받아 다시 UI에 표시합니다.

---

## ✍️ 3교시 종합 실습 및 심화 과제

### 종합 실습: 간단한 계산기 만들기
- `Entry` 2개(숫자 입력), `Button` 4개(+, -, *, /), `Label` 1개(결과 표시)를 배치합니다.
- 각 버튼을 클릭하면 두 숫자를 더하거나 빼는 등의 계산 결과가 라벨에 표시되도록 구현하세요.

### 심화 과제: 단위 변환기 (Unit Converter)
- **조건:**
    - 섭씨 $\rightarrow$ 화씨 변환기, 혹은 cm $\rightarrow$ inch 변환기 등을 선택합니다.
    - 입력값의 유효성 검사(숫자가 아닌 값이 입력되었을 때 에러 메시지 표시)를 포함하세요.
    - `grid()` 배치 관리자를 사용하여 깔끔한 정렬을 구현하세요.
    - `config()`를 사용하여 계산 결과에 따라 라벨의 색상을 변경해 보세요. (예: 결과가 음수면 빨간색, 양수면 파란색)

### 💡 생각할 거리
- 우리가 사용하는 윈도우 프로그램 중 `config()`와 같은 동적 업데이트가 가장 활발하게도 일어나는 부분은 어디일까요?
- 만약 100개의 버튼이 있고 각각 다른 기능을 수행해야 한다면, 100개의 함수를 일일이 만들어야 할까요? (힌트: 함수 인자와 람다 함수를 활용해 보세요.)
