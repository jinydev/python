---
layout: docs
title: "00.01_파이썬 설치 가이드 (2026)"
permalink: /part01/setup/install/
---

# 00.01_파이썬 설치 가이드 (2026년 기준)

파이썬 개발을 시작하기 위해 가장 먼저 해야 할 일은 내 컴퓨터에 파이썬 실행 환경과 코드를 편리하게 작성할 수 있는 편집기를 설치하는 것입니다. 2026년 기준, 파이썬은 성능이 더욱 강화되고 보안 기준이 상향되었습니다.

## 1. 파이썬(Python) 최신 버전 설치

파이썬 공식 홈페이지에서 최신 버전(Python 3.13+)을 다운로드하여 설치합니다.

### Windows
1. [파이썬 공식 홈페이지(python.org)](https://www.python.org/downloads/)에 접속합니다.
2. 메인 화면의 **Download Python 3.1x** 버튼을 클릭하여 설치 파일(`exe`)을 받습니다.
3. 다운로드받은 파일을 실행합니다.
4. **[중요!]** 설치 첫 화면 하단의 **"Add Python 3.x to PATH"** 체크박스를 반드시 선택하세요. 이것을 체크하지 않으면 터미널에서 파이썬 명령어를 사용할 수 없습니다.
5. "Install Now"를 눌러 설치를 완료합니다.

### macOS
macOS는 기본적으로 구버전의 파이썬이 설치되어 있을 수 있으므로, Homebrew를 통해 최신 버전을 설치하는 것을 권장합니다.
1. 터미널(Terminal)을 엽니다.
2. Homebrew가 없다면 최초 설치를 진행합니다.
3. 터미널에 아래 명령어를 입력하여 파이썬 최신 버전을 설치합니다.
   ```bash
   brew install python
   ```
4. 설치가 완료되면 `python3 --version` 명령어로 버전을 확인합니다.

## 2. 통합 개발 환경(IDE): VS Code 설정

과거에는 여러 IDE가 사용되었지만, 현재는 가벼우면서도 강력한 확장을 제공하는 **Visual Studio Code(VS Code)**가 가장 널리 쓰이는 표준 개발 도구입니다.

1. [VS Code 공식 홈페이지(code.visualstudio.com)](https://code.visualstudio.com/)에서 각자의 OS에 맞는 설치 파일을 다운로드하고 설치합니다.
2. VS Code를 실행한 후, 좌측 메뉴 바에서 "Extensions(확장)" 뷰 아이콘(네모 블록 4개)을 클릭합니다.
3. 검색창에 **"Python"**을 입력하고, Microsoft에서 제공하는 공식 **Python** 확장을 설치합니다.
4. 추가로 터미널 환경을 개선하기 위한 테마나 디버깅 도구도 개인 취향에 맞게 설치할 수 있습니다.

## 3. 설치 확인 및 첫 코드 실행

환경이 잘 구축되었는지 확인해 봅니다.
1. VS Code에서 `hello.py`라는 새로운 파일을 만듭니다.
2. 아래 코드를 입력합니다.
   ```python
   print("Hello, Python 2026!")
   ```
3. 터미널을 열고 코드를 실행합니다. (`Ctrl + \`` 혹은 상단 메뉴 "Terminal -> New Terminal")
   ```bash
   python hello.py
   ```
   (macOS 이거나 설정에 따라 `python3 hello.py`로 입력해야 할 수도 있습니다.)
4. 화면에 `Hello, Python 2026!`이 출력되면 성공적으로 설치된 것입니다.
