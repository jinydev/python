---
layout: docs
title: "5.1 macOS 파이썬 설치 방법"
permalink: /intro/install-macos.html
description: "맥(macOS) 환경에서 Homebrew 및 공식 인스톨러를 활용하여 파이썬 3를 설치하고 환경 변수를 설정하는 완벽 가이드입니다."
keywords: "파이썬 맥 설치, macOS python install, Homebrew python, zsh PATH, jinydev"
---

# 🍏 macOS 파이썬 설치 방법

macOS에는 운영체제 기본 도구용으로 오래된 파이썬 버전이 내장되어 있을 수 있습니다. 개발용으로는 반드시 독립된 최신 파이썬 3를 설치해야 합니다.

---

## 🏆 방법 1: Homebrew로 설치하기 (가장 권장)

macOS 개발 환경에서 가장 널리 쓰이는 패키지 매니저인 **Homebrew**를 사용하는 것이 패키지 의존성 및 업데이트 관리에 가장 깔끔합니다.

### 1단계: 터미널 실행
- `Command(⌘) + Space`를 눌러 Spotlight를 띄운 뒤 `Terminal`을 입력해 터미널을 실행합니다.

### 2단계: Homebrew 설치 확인
터미널에 아래 명령을 입력하여 Homebrew가 설치되어 있는지 확인합니다:
```bash
brew --version
```
설치되어 있지 않다면 아래 공식 명령어로 Homebrew를 설치합니다:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 3단계: 파이썬 최신 버전 설치
```bash
brew update
brew install python
```

### 4단계: 설치 확인
```bash
python3 --version
which python3
```
통상 Apple Silicon Mac의 경우 `/opt/homebrew/bin/python3`, Intel Mac의 경우 `/usr/local/bin/python3`에 설치됩니다.

---

## 📦 방법 2: 공식 웹사이트 PKG 인스톨러

1. [python.org/downloads/macos](https://www.python.org/downloads/macos/)에 접속합니다.
2. 최신 안정 버전인 **macOS 64-bit universal2 installer**를 다운로드합니다.
3. 다운로드된 `.pkg` 파일을 더블클릭하여 설치 마법사의 안내에 따라 설치를 완료합니다.
4. 설치가 끝나면 `/Applications/Python 3.x/` 폴더 내의 **`Install Certificates.command`** 파일을 더블클릭하여 SSL 루트 인증서를 업데이트해 줍니다.
