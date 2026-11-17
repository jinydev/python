---
layout: docs
title: "5.3 Linux 파이썬 설치 방법"
permalink: /intro/install-linux.html
description: "Ubuntu, Debian, Fedora, RHEL 등 다양한 리눅스 배포판 환경에서 패키지 매니저(apt, dnf) 및 PPA를 이용해 최신 파이썬 3를 설치하는 방법입니다."
keywords: "파이썬 리눅스 설치, Ubuntu python install, apt python3, deadsnakes ppa, dnf, jinydev"
---

# 🐧 Linux 파이썬 설치 방법

대부분의 리눅스 배포판은 시스템 자체 유틸리티를 실행하기 위해 파이썬을 기본 내장하고 있습니다. 하지만 개발을 위해서는 `pip`와 가상환경 모듈(`venv`)을 포함한 완전한 패키지를 별도로 갖추어야 합니다.

---

## 📦 Ubuntu 및 Debian 계열

### 1) 기본 패키지 매니저(APT)로 설치
```bash
# 1. 패키지 저장소 색인 갱신
sudo apt update

# 2. 파이썬3, pip, 가상환경, 컴파일 빌드 도구 설치
sudo apt install -y python3 python3-pip python3-venv python3-dev build-essential

# 3. 설치 확인
python3 --version
pip3 --version
```

### 2) 최신 특정 버전(deadsnakes PPA) 설치
Ubuntu 기본 저장소에 포함된 버전보다 최신 파이썬(예: Python 3.12/3.13)이 필요할 때는 공식적으로 널리 쓰이는 `deadsnakes` PPA를 등록합니다:

```bash
# PPA 등록 도구 설치
sudo apt update
sudo apt install -y software-properties-common

# deadsnakes 저장소 추가
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update

# 원하는 특정 파이썬 버전 설치
sudo apt install -y python3.12 python3.12-venv python3.12-dev

# 버전 확인
python3.12 --version
```

---

## 🎩 RHEL, Fedora, CentOS, Rocky Linux 계열

```bash
# 패키지 업데이트
sudo dnf update -y

# 파이썬 및 개발 도구 설치
sudo dnf install -y python3 python3-pip python3-devel gcc

# 버전 확인
python3 --version
```

---

## 🏹 Arch Linux 계열

```bash
sudo pacman -Syu python python-pip
```
