---
layout: docs
title: "6. 첫 파이썬 실행 및 가상환경(venv) 기본기"
permalink: /intro/venv.html
description: "대화형 인터프리터(REPL) 사용법, 소스 파일 실행, 그리고 프로젝트별 독립 가상환경(venv)을 생성하고 관리하는 필수 기본기를 익힙니다."
keywords: "파이썬 가상환경, python venv, 대화형 인터프리터, REPL, pip, requirements.txt, jinydev"
---

# 6. 첫 파이썬 실행 및 가상환경(venv) 기본기

파이썬 설치가 완료되었다면, 이제 코드를 실행해 보고 프로젝트별 독립 개발 환경을 구축하는 방법을 알아봅니다.

---

## ⚡ 1. 대화형 인터프리터 (REPL) 사용하기

터미널(또는 CMD/PowerShell)을 열고 `python3`(윈도우는 `python`)를 입력합니다:

```python
$ python3
Python 3.12.3 (main, Apr 15 2024, 18:20:19) [Clang 15.0.0] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print("Hello, Python Master Class!")
Hello, Python Master Class!
>>> a = 10
>>> b = 20
>>> a + b
30
>>> exit()   # 인터프리터 종료
```

---

## 📦 2. 독립 가상환경(venv)이란?

### 왜 가상환경을 사용해야 할까요?
- A 프로젝트는 `requests 2.25.0` 버전이 필요하고, B 프로젝트는 `requests 2.31.0` 버전이 필요할 수 있습니다.
- 모든 패키지를 전역(Global) 시스템에 설치하면 **패키지 간 버전 충돌(Dependency Hell)**이 발생합니다.
- **`venv`**를 사용하면 프로젝트 폴더마다 완전히 독립된 파이썬 실행기와 패키지 보관함을 분리할 수 있습니다.

---

## 🛠️ 3. 가상환경 생성 및 활성화 실습

### 1단계: 프로젝트 폴더 생성 및 이동
```bash
mkdir my_project
cd my_project
```

### 2단계: 가상환경 생성
```bash
# .venv 라는 이름의 폴더로 가상환경 생성
python3 -m venv .venv
```

### 3단계: 가상환경 활성화 (Activate)
운영체제에 맞는 명령어를 터미널에 입력합니다:

- **macOS / Linux**:
  ```bash
  source .venv/bin/activate
  ```
- **Windows (PowerShell)**:
  ```powershell
  .venv\Scripts\Activate.ps1
  ```
- **Windows (CMD)**:
  ```cmd
  .venv\Scripts\activate.bat
  ```

활성화되면 프롬프트 맨 앞에 **`(.venv)`** 표시가 나타납니다:
```bash
(.venv) user@computer:my_project$
```

### 4단계: 패키지 설치 및 목록 저장
```bash
# 패키지 설치
pip install requests

# 현재 가상환경에 설치된 패키지 목록을 파일로 저장
pip freeze > requirements.txt

# 나중에 다른 컴퓨터에서 동일한 패키지 환경 복원
pip install -r requirements.txt
```

### 5단계: 가상환경 비활성화
작업이 끝나면 아래 명령어로 가상환경을 종료합니다:
```bash
deactivate
```
