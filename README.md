# 🐍 파이썬 마스터 클래스 (Python Master Class)

<p align="center">
  <a href="https://python.jiny.dev">
    <img src="https://img.shields.io/badge/Site-python.jiny.dev-3776AB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Site" />
  </a>
  <a href="https://github.com/jinydev">
    <img src="https://img.shields.io/badge/GitHub-jinydev-black?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <img src="https://img.shields.io/badge/Python-3.12%20%7C%203.13-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.12/3.13" />
  <img src="https://img.shields.io/badge/Jekyll-4.4.1-CC0000?style=for-the-badge&logo=jekyll&logoColor=white" alt="Jekyll 4.4" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>"Life is short, you need Python."</strong><br>
  컴퓨터 과학의 본질적 원리부터 객체지향(OOP), 시스템 엔지니어링, 피지컬 AI까지 체계적으로 정복하는 48주 파이썬 바이블
</p>

---

## 💡 강좌 개요 (Overview)

**파이썬 마스터 클래스(Python Master Class)**는 단순한 문법 암기나 단편적인 코딩 튜토리얼을 넘어, **"컴퓨터가 코드를 어떻게 해석하고 메모리를 다루는가?"**라는 컴퓨터 과학(CS)의 본질적 시각에서 파이썬을 깊이 있게 탐구하는 정규 마스터 커리큘럼입니다.

초보자도 쉽게 이해할 수 있는 직관적인 스토리텔링과 **도로시 탐험대(Dorothy Universe)** 2D 생성형 일러스트레이션을 결합하여, 기초 문법부터 시작해 객체지향 설계(OOP), 동시성/비동기(AsyncIO), 시스템 프로그래밍까지 실무 엔지니어 수준으로 성장할 수 있도록 돕습니다.

- 🌐 **공식 온라인 강의 사이트**: [https://python.jiny.dev](https://python.jiny.dev)
- 🖥️ **로컬 개발 서버**: `http://localhost:4003`

---

## 🗺️ 전체 48주 커리큘럼 구성 (Curriculum)

본 강좌는 총 3개 학기(각 16주)와 기초 소개 및 스타일 가이드로 체계화되어 있습니다.

```text
파이썬 마스터 클래스
├── 📌 [소개] 파이썬 언어 소개 & 시작하기 (/intro/)
├── 🟢 [1학기] 기초 및 컴퓨터 과학 원리 (/semester1/ : 1~16주)
├── 🟡 [2학기] 고급: 객체지향(OOP) 및 소프트웨어 설계 (/semester2/ : 1~16주)
├── 🔴 [3학기] 심화: 시스템 프로그래밍 & 응용 개발 (/semester3/ : 1~16주)
└── 📜 [스타일] PEP 8 코딩 표준 가이드 (/pep8/)
```

### 1. 📌 파이썬 언어 소개 (`/intro/`)
- **특징과 철학**: 가독성, 다중 패러다임, 빠른 프로토타이핑, The Zen of Python (PEP 20)
- **탄생과 유래**: 귀도 반 로섬(Guido van Rossum)의 1989년 크리스마스 프로젝트, 몬티 파이선(Monty Python) 명명 비화
- **공식 로고 및 상징**: 유스티니아누스 반 로섬의 맞물린 뱀(Two Snakes) 심볼과 공식 컬러 시스템
- **최신 버전 정보**: Python 3.12 (안정 권장) 및 Python 3.13 (Free-threaded GIL 비활성화 프리뷰, JIT)
- **운영체제별 설치 및 가상환경**: macOS (Homebrew), Windows (Add to PATH 필수), Linux (apt/dnf), `.venv` 가상환경

### 2. 🟢 1학기: 기초 및 컴퓨터 과학 원리 (1~16주)
| 주차 | 주요 주제 | 핵심 학습 내용 |
| :---: | :--- | :--- |
| **01주** | 파이썬과 개발 환경 | 인터프리터 vs 컴파일러, CPython 가상머신, REPL, venv 가상환경 구축 |
| **02주** | 변수와 메모리 | 변수 할당과 객체 참조(Reference), 동적 타이핑 메커니즘, PEP 8 작명법 |
| **03주** | 기본 자료형 (1): 숫자와 문자열 | 정수/부동소수점 오차, 유니코드(Unicode)와 UTF-8 인코딩, 포맷팅 |
| **04주** | 기본 자료형 (2): 컨테이너 | List, Tuple, Set, Dict 내부 동작 원리와 해시 테이블(Hash Table) |
| **05주** | 제어문 (1): 조건문 | if-elif-else, 삼항 연산자, 불리언(Boolean)과 단락 평가(Short-circuit) |
| **06주** | 제어문 (2): 반복문 | for, while, 이터레이터(Iterator)와 제너레이터(Generator) 기초 |
| **07주** | 함수 기초 | Call by Object Reference, 매개변수/반환값, 스코프와 LEGB 규칙 |
| **08주** | 1학기 중간고사 | 1~7주차 이론 및 실습 종합 평가 |
| **09주** | 함수 심화 | 일급 객체(First-class Citizen), 람다(Lambda), 클로저와 데코레이터 기초 |
| **10주** | 모듈과 패키지 | `import` 메커니즘, `sys.path`, 모듈 패키징 및 배포 원리 |
| **11주** | 파일 I/O 및 예외 처리 | Context Manager(`with`문), 텍스트/바이너리 I/O, `try-except-finally` |
| **12주** | 표준 라이브러리 | `os`, `sys`, `math`, `datetime`, `re`(정규표현식) 실전 활용 |
| **13주** | 데이터 포맷 처리 | JSON 직렬화/역직렬화, CSV 파일 파싱과 전처리 |
| **14주** | 함수형 프로그래밍 | List/Dict/Set Comprehension, `map`, `filter`, `reduce` |
| **15주** | 알고리즘과 자료구조 맛보기 | 스택(Stack), 큐(Queue), 선형/이진 탐색, 기본 정렬 알고리즘 |
| **16주** | 1학기 기말 프로젝트 | 파이썬 기초 콘솔 애플리케이션 종합 제작 |

### 3. 🟡 2학기: 고급 - 객체지향(OOP) 및 소프트웨어 설계 (1~16주)
- 클래스와 인스턴스, 캡슐화, 상속, 다형성의 깊은 이해
- 파이썬 특유의 매직 메서드(Dunder Methods: `__init__`, `__str__`, `__repr__`, `__call__` 등)
- 속성 접근 제어와 프로퍼티(`@property`), 디스크립터(Descriptor)
- 추상 베이스 클래스(`abc.ABC`), 메타클래스(Metaclass)를 활용한 프레임워크 설계
- SOLID 객체지향 설계 5대 원칙과 실전 파이썬 디자인 패턴(GoF)

### 4. 🔴 3학기: 심화 - 시스템 프로그래밍 & 응용 개발 (1~16주)
- GIL(Global Interpreter Lock)의 원리와 멀티스레딩/멀티프로세싱 병렬 처리
- 비동기 프로그래밍: `asyncio`, 코루틴(Coroutine), `async`/`await` 이벤트 루프
- 네트워크 통신: TCP/UDP 소켓 프로그래밍, HTTP 클라이언트/서버 기초
- 데이터 영속성: SQLite3 내장 데이터베이스와 경량 ORM 설계
- 피지컬 AI 및 자동화: 아두이노/라즈베리파이 시리얼 통신, GUI(Tkinter) 대시보드 구축

---

## 👥 도로시 탐험대 (Dorothy Universe) 캐릭터 시스템

본 강좌는 학습의 몰입도와 재미를 극대화하기 위해 **스튜디오 지브리 감성의 2D 애니메이션 스타일** 교육용 캐릭터들이 매 강의마다 등장하여 원리를 해설하고 실무 팁을 전수합니다.

| 캐릭터 | 역할 | 성격 및 강의 내 페르소나 |
| :---: | :--- | :--- |
| **👨‍🏫 이호진 교수님**<br>*(Prof. Hojin)* | AI & CS 마스터 멘토 | 40대 초반의 동안이자 온화한 공학 멘토. 파이썬의 설계 철학과 컴퓨터 과학의 근본적인 원리를 차분하고 명쾌하게 짚어줍니다. |
| **👧 도로시**<br>*(Dorothy)* | 주니어 메이커 | 밤색 양갈래 머리와 데님 멜빵바지를 입은 9세 소녀. 학습자의 눈높이에서 날카롭고 순수한 질문을 던지며 함께 성장합니다. |
| **🐱 수석 조교 지니**<br>*(Jiny)* | 천재 연구실 조교 냥이 | 미니 안경을 쓴 턱시도 고양이. 엄격하고 꼼꼼한 코드 리뷰어로서 들여쓰기 에러, 타입 버그, 메모리 누수를 칼같이 짚어냅니다. |
| **🐶 조수 토토**<br>*(Toto)* | 긍정 비타민 파트너 | 하늘색 반다나를 두른 순백의 아기 강아지. 언제나 지치지 않는 긍정 에너지로 실습 명령어를 안내하고 응원을 북돋웁니다. |
| **🤖 오즈봇 틴맨**<br>*(Tinny)* | 피지컬 AI 로봇 | 가슴에 따뜻한 하트 코어가 뛰는 레트로 로봇. 시스템 자동화, 하드웨어 제어, 대용량 연산 최적화 팁을 제공합니다. |

---

## 🎨 생성형 AI 이미지 제작 시스템 (Prompt Engine)

본 프로젝트는 일관된 비주얼 아이덴티티를 유지하기 위한 **마스터 프롬프트 엔진 및 스타일 가이드**를 자체 내장하고 있습니다.

- 📜 **통합 프롬프트 규격서**: [`prompt.md`](file:///Users/hojin9/Library/Mobile%20Documents/com~apple~CloudDocs/02.강의/P05.파이썬/prompt.md)
- 📁 **캐릭터별 상세 스타일 가이드**: [`guides/`](file:///Users/hojin9/Library/Mobile%20Documents/com~apple~CloudDocs/02.강의/P05.파이썬/guides/)
- **핵심 생성 규칙**:
  1. **배경**: 무결점 순백색 (`#FFFFFF`, Solid Pure White Background)
  2. **화풍**: 스튜디오 지브리 감성 프리미엄 2D 셀 애니메이션 (NO 3D CGI, 2~3단계 음영)
  3. **선화**: 다크 에스프레소 브라운 (`#26211E`, 완전한 검은선 지양)
  4. **레이아웃**: 텍스트 상자나 슬라이드 테두리 없는 순수 피사체 독립형 삽화

---

## 💻 로컬 개발 및 빌드 환경 (Local Setup)

본 사이트는 정적 사이트 생성기인 **Jekyll(루비 3.x 기반)**로 제작되었습니다.

### 1. 필수 사전 요구사항
- Ruby (>= 3.0)
- Bundler (`gem install bundler`)
- Python 3.12+ (예제 코드 실행용)

### 2. 저장소 클론 및 패키지 설치
```bash
# 의존성 젬(Gem) 설치
bundle install
```

### 3. 로컬 핫리로드 개발 서버 실행 (포트 4003)
```bash
bundle exec jekyll serve --livereload --livereload-port 35732 --force_polling --port 4003
```
실행 후 브라우저에서 `http://localhost:4003`으로 접속합니다.

### 4. 정적 배포 빌드 (`docs/` 생성)
```bash
bundle exec jekyll build
```
빌드 결과물은 GitHub Pages 호환 디렉터리인 `docs/`에 자동으로 생성됩니다.

---

## 📂 디렉터리 구조 (Directory Structure)

```text
P05.파이썬/
├── _config.yml               # Jekyll 사이트 설정 (포털 메타데이터, mathjax 등)
├── Gemfile                   # Ruby 의존성 정의
├── README.md                 # 프로젝트 종합 안내 문서 (본 문서)
├── prompt.md                 # 도로시 세계관 이미지 생성 마스터 프롬프트 엔진
├── guides/                   # 5대 캐릭터별 공식 스타일 가이드
├── docs/                     # 배포용 정적 빌드 결과물 (GitHub Pages용)
└── src/                      # Jekyll 원본 소스
    ├── _data/                # 네비게이션 및 메뉴 데이터 (intro.yml, semester1.yml 등)
    ├── _includes/            # 공통 템플릿 (nav, footer, character_callout, lecture_illustration 등)
    ├── _layouts/             # 레이아웃 정의 (docs, semester1, home 등)
    ├── assets/
    │   ├── img/              # 공식 로고 및 도로시 유니버스 마스터 삽화
    │   └── css/              # 커스텀 스타일시트
    ├── intro/                # 파이썬 소개 및 설치 가이드
    ├── semester1/            # 1학기 기초 (1~16주차 강의)
    ├── semester2/            # 2학기 고급: 객체지향 OOP
    ├── semester3/            # 3학기 심화: 시스템 프로그래밍
    ├── pep8/                 # PEP 8 스타일 가이드
    ├── character/            # 도로시 탐험대 캐릭터 상세 소개
    └── syllabus.md           # 전체 강의 계획서
```

---

## 📜 저작권 및 라이선스 (License)

- **강의 텍스트 및 예제 코드**: MIT License
- **캐릭터 및 삽화 아트워크**: © Hojin Lee & Dorothy STEM AI Project. All rights reserved.
- **파이썬 상표 및 로고**: Python Software Foundation (PSF) Trademark Usage Policy 준수
