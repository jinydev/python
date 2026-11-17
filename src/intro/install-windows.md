---
layout: docs
title: "5.2 Windows 파이썬 설치 방법"
permalink: /intro/install-windows.html
description: "윈도우(Windows 10/11) 환경에서 파이썬 3를 설치할 때 주의해야 할 'Add python.exe to PATH' 설정과 winget 명령어 설치법을 안내합니다."
keywords: "파이썬 윈도우 설치, Windows python install, Add python.exe to PATH, winget, jinydev"
---

# 🪟 Windows 파이썬 설치 방법

Windows 환경에서 파이썬을 설치할 때 초보자가 가장 많이 겪는 실수는 **환경 변수(PATH)**를 등록하지 않아 터미널에서 `python` 명령어를 찾지 못하는 문제입니다. 아래 순서를 꼼꼼히 따라해 주세요.

---

## ⚠️ 가장 중요한 주의사항 (골든 룰)

> [!CAUTION]
> 공식 인스톨러를 실행했을 때 첫 화면 맨 아래에 있는 **`[✓] Add python.exe to PATH`** 체크박스를 **반드시 먼저 체크**한 뒤 `Install Now`를 눌러야 합니다!

---

## 🏆 방법 1: 공식 인스톨러로 설치하기

### 1단계: 인스톨러 다운로드
1. 웹 브라우저를 열고 [python.org/downloads/windows](https://www.python.org/downloads/windows/)로 이동합니다.
2. 최신 안정 버전인 **"Windows installer (64-bit)"**를 다운로드합니다.

### 2단계: 설치 옵션 선택
1. 다운로드된 `python-3.x.x-amd64.exe` 파일을 실행합니다.
2. 창 하단의 **`[✓] Add python.exe to PATH`**에 반드시 체크합니다.
3. 상단의 **`Install Now`**를 클릭하여 설치를 진행합니다.

### 3단계: 경로 길이 제한 해제 (Disable path length limit)
설치 완료 화면(Setup was successful)이 나타나면, 창 아래쪽에 **"Disable path length limit"** 버튼이 나타납니다.  
이 버튼을 클릭하여 관리자 권한을 승인해 주면, Windows의 고전적인 260자 파일 경로 제한이 해제되어 딥러닝이나 복잡한 패키지 설치 시 발생하는 에러를 예방할 수 있습니다.

### 4단계: 설치 확인
1. `Windows 키 + R`을 누르고 `cmd` 또는 `powershell`을 입력해 터미널을 실행합니다.
2. 아래 명령어로 버전이 출력되는지 확인합니다:
   ```cmd
   python --version
   pip --version
   ```

---

## ⚡ 방법 2: Winget 패키지 매니저로 한 줄 설치

Windows 10 및 11에서는 PowerShell에서 한 줄의 명령어로 빠르고 정확하게 설치할 수 있습니다:

```powershell
winget install Python.Python.3.12
```
설치가 끝나면 PowerShell 창을 닫고 새로 연 뒤 `python --version`을 확인합니다.
