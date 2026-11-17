---
layout: semester3
title: "12주차: 비동기 프로그래밍 (2) - 고성능 크롤러 제작 🌐"
permalink: /semester3/week12/
description: "12주차: 비동기 프로그래밍 (2) - 고성능 크롤러 제작 🌐에 대한 파이썬(Python) 강좌 문서입니다."
keywords: "12주차: 비동기 프로그래밍 (2) - 고성능 크롤러 제작 🌐, 파이썬, Python, 프로그래밍, 개발, jinydev"
---

# 12주차: 비동기 프로그래밍 (2) - 고성능 크롤러 제작 🌐

지난 시간에는 `asyncio`의 기본 개념과 코루틴을 배웠습니다. 이제 이 기술을 실제 서비스에서 가장 많이 활용하는 분야 중 하나인 **웹 크롤링**에 적용해 보겠습니다.

---

## 1. 비동기 HTTP 통신: `aiohttp`

파이썬의 `requests` 라이브러리는 매우 편리하지만, **동기(Synchronous)** 방식으로 작동합니다. 즉, 서버에서 응답이 올 때까지 프로그램 전체가 멈춥니다. 비동기 환경에서는 `aiohttp`라는 라이브러리를 사용해야 합니다.

![동기 vs 비동기 크롤러](./img/async_crawler.svg)

### 1.1 `aiohttp` 기본 사용법
```bash
pip install aiohttp
```

```python
import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        status = response.status
        text = await response.text()
        print(f"URL: {url}, Status: {status}, Length: {len(text)}")

async def main():
    urls = [
        "https://www.google.com",
        "https://www.python.org",
        "https://www.github.com"
    ]
    
    # ClientSession을 통해 연결 풀을 관리합니다.
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        await asyncio.gather(*tasks)

asyncio.run(main())
```

---

## 2. 비동기 크롤링의 성능 최적화

단순히 `asyncio.gather`를 사용하는 것만으로는 부족합니다. 수천 개의 URL을 동시에 요청하면 서버에서 공격으로 간주하여 차단(Ban)하거나, 내 컴퓨터의 메모리가 부족해질 수 있습니다.

### 2.1 세마포어 (Semaphore)를 이용한 동시성 제한
`asyncio.Semaphore`를 사용하면 동시에 실행될 코루틴의 개수를 제한할 수 있습니다.

```python
import asyncio
import aiohttp

async def fetch_with_limit(session, url, semaphore):
    async with semaphore: # 동시에 설정된 개수만큼만 진입 가능
        async with session.get(url) as response:
            return await response.text()

async def main():
    semaphore = asyncio.Semaphore(10) # 최대 10개까지만 동시 요청
    async with aiohttp.ClientSession() as session:
        urls = [f"https://example.com/page{i}" for i in range(100)]
        tasks = [fetch_with_limit(session, url, semaphore) for url in urls]
        await asyncio.gather(*tasks)

asyncio.run(main())
```

---

## 3. 🔍 Deep Dive: 비동기 vs 멀티스레딩 크롤링

둘 다 "동시에" 요청을 보내는 것처럼 보이지만, 내부 작동 방식은 완전히 다릅니다.

- **멀티스레딩:** OS가 스레드를 강제로 전환합니다. 스레드가 많아지면 메모리 사용량이 급증하고 컨텍스트 스위칭 비용이 커집니다.
- **비동기 (`asyncio`):** 단일 스레드에서 루프가 효율적으로 제어권을 넘깁니다. 메모리 사용량이 매우 적으며, 수만 개의 연결을 처리하는 데 최적화되어 있습니다.

---

## ✍️ 이번 주 연습 문제

**문제 1.** `aiohttp`를 사용하여 10개의 서로 다른 뉴스 사이트에서 제목을 가져오는 비동기 크롤러를 작성해 보세요.

**문제 2.** `asyncio.Semaphore`를 적용하여, 동시에 최대 3개의 요청만 보내도록 제한한 크롤러를 구현하고, 세마포어가 없을 때와 있을 때의 속도 및 서버 응답 차이를 관찰해 보세요.

**문제 3.** (심화) 비동기 크롤러를 만들 때 `BeautifulSoup` 같은 라이브러리를 함께 사용한다면, `BeautifulSoup`의 파싱 과정이 CPU-bound 작업이라는 점을 고려하여 어떻게 최적화할 수 있을지 생각해서 적어보세요. (힌트: `run_in_executor`)
---

## 🔍 Deep Dive: `asyncio.Semaphore`와 비동기 I/O 커널 폴링(Epoll/Kqueue) 메커니즘

비동기 크롤러를 돌릴 때 만 대의 서버에 한 번에 요청을 보내면 내 컴퓨터 소켓 리소스가 동나거나 공격으로 오해받아 IP가 차단됩니다.
- **비동기 세마포어 (`asyncio.Semaphore`)**: 동시에 `await`를 통과해 활성화될 수 있는 코루틴의 개수를 문지기처럼 통제(예: 최대 10개 제한)하는 동기화 장치입니다.
- **커널 폴링 (Kernel Polling)**: 파이썬의 비동기 I/O 뒷단에서는 운영체제 커널의 가장 빠른 다중화 I/O 통지 기술(Linux의 `epoll`, macOS/BSD의 `kqueue`)이 동작합니다. 이 기술들은 수만 개의 소켓 중 데이터가 들어온 녀석만 운영체제 레벨에서 낚아채 파이썬 이벤트 루프에 신호를 주기 때문에 리소스 낭비가 전혀 없습니다.

---

## ☕ Java vs Python 스나이퍼 비교

### 대규모 웹 수집기(크롤러) 비동기 호출
*   **Java**: 다중 HTTP 커넥션 및 파일 저장 처리를 비동기로 구현하려면 Netty 기반의 **Spring WebClient** 라이브러리와 Reactive Stream 스펙인 **Project Reactor** (`Mono`/`Flux`) 파이프라인을 엮어 제어해야 합니다. 리액티브 프로그래밍 특유의 체이닝 문법 때문에 가독성과 디버깅 난이도가 높습니다.
*   **Python**: 동기식 코드와 기막히게 유사한 `async with aiohttp.ClientSession()`과 **`await`** 구문을 그대로 유지하면서, 극도의 직관성과 압도적인 동시 데이터 처리 속도를 동시에 누릴 수 있는 최상의 크롤러 개발 환경을 보장합니다.

---

## 🎧 Vibe Coding

> **🗣️ 학생 프롬프트 (AI에게 이렇게 명령해 보세요):**
> "파이썬의 `aiohttp`와 `asyncio.Semaphore`를 사용하여 동시에 최대 3개의 원격 날씨 정보 서버만 안전하게 스크래핑해 오는 완성도 높은 고성능 비동기 크롤러 프로그램 코드를 작성해 줘."

---

## 코딩 영단어 학습 📝

*   **`Semaphore`**: 세마포어. (동시 통제 기법의 하나로, 공유 자원에 동시에 접근할 수 있는 스레드나 코루틴의 최대 허용 한도를 한정하는 차단기 장치입니다.)
*   **`Polling`**: 폴링. (데이터 송수신 상태나 장치 완료 여부를 확인하기 위해, 프로그램이나 OS가 주기적으로 상태를 검사하거나 신호를 확인하는 제어 방식입니다.)
*   **`Non-Blocking`**: 논블로킹. (호출된 함수가 제어권을 붙잡고 리턴을 미루지 않고, 즉각적인 응답이나 응답 없음 코드를 돌려주어 호출한 쪽이 가로막혀 멈춰있지(Block) 않게 해 주는 구동 모드입니다.)
