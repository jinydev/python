---
layout: docs
title: "5. 운영체제별 파이썬 설치 가이드"
permalink: /intro/install.html
description: "macOS, Windows, Linux 운영체제별 파이썬 3 설치 방법과 주의사항, 환경 변수(PATH) 설정법을 종합 안내합니다."
keywords: "파이썬 설치, 파이썬 맥 설치, 파이썬 윈도우 설치, 파이썬 리눅스 설치, PATH 설정, jinydev"
---

# 5. 운영체제별 파이썬 설치 가이드

파이썬은 크로스 플랫폼 언어로, **macOS, Windows, Linux** 등 거의 모든 현대 운영체제에서 동일하게 동작합니다.  
자신의 컴퓨터 환경에 맞는 설치 방식을 선택해 진행해 주세요.

---

## 💻 운영체제별 전용 가이드 바로가기

<div class="row g-4 my-4">
  <!-- macOS -->
  <div class="col-md-4">
    <div class="card h-100 border p-4 rounded-4 shadow-sm bg-white">
      <div class="fs-1 mb-2">🍏</div>
      <h5 class="fw-bold text-dark">macOS 설치 가이드</h5>
      <p class="small text-secondary mb-3 flex-grow-1">
        개발자 표준 패키지 매니저인 Homebrew를 이용한 간편 설치 및 pyenv 다중 버전 관리법.
      </p>
      <a href="/intro/install-macos.html" class="btn btn-outline-primary btn-sm rounded-pill fw-bold">
        macOS 설치 안내 ➔
      </a>
    </div>
  </div>

  <!-- Windows -->
  <div class="col-md-4">
    <div class="card h-100 border p-4 rounded-4 shadow-sm bg-white">
      <div class="fs-1 mb-2">🪟</div>
      <h5 class="fw-bold text-dark">Windows 설치 가이드</h5>
      <p class="small text-secondary mb-3 flex-grow-1">
        공식 인스톨러 사용 시 필수 체크포인트인 'Add to PATH' 설정 및 winget 설치법.
      </p>
      <a href="/intro/install-windows.html" class="btn btn-outline-warning text-dark btn-sm rounded-pill fw-bold">
        Windows 설치 안내 ➔
      </a>
    </div>
  </div>

  <!-- Linux -->
  <div class="col-md-4">
    <div class="card h-100 border p-4 rounded-4 shadow-sm bg-white">
      <div class="fs-1 mb-2">🐧</div>
      <h5 class="fw-bold text-dark">Linux 설치 가이드</h5>
      <p class="small text-secondary mb-3 flex-grow-1">
        Ubuntu/Debian의 apt 매니저, deadsnakes PPA, Fedora의 dnf를 통한 최신 환경 세팅.
      </p>
      <a href="/intro/install-linux.html" class="btn btn-outline-success btn-sm rounded-pill fw-bold">
        Linux 설치 안내 ➔
      </a>
    </div>
  </div>
</div>

---

## ⚡ 1분 핵심 요약 비교

| 운영체제 | 가장 권장하는 설치 방식 | 버전 확인 명령어 |
| :--- | :--- | :--- |
| **macOS** | 터미널에서 `brew install python` | `python3 --version` |
| **Windows** | 공식 인스톨러 (★ **Add to PATH 체크 필수**) | `python --version` |
| **Linux (Ubuntu)** | 터미널에서 `sudo apt install python3-pip python3-venv` | `python3 --version` |
