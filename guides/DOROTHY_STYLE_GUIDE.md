# 👧 도로시 (Dorothy) 캐릭터 디자인 & 이미지 생성 마스터 스타일 가이드

본 가이드라인은 **도로시(Dorothy)** 캐릭터를 모든 학습 교재, PPT 슬라이드, 웹 콘텐츠, 일러스트레이션에서 **얼굴 생김새, 신체 비례, 색감, 헤어스타일, 의상, 선화 화풍(Art Style)의 일관성(Consistency)을 100% 영구 유지**하기 위한 공식 마스터 규격입니다.

> 💡 **스타일 재현 보장 원칙:**  
> "스튜디오 지브리 스타일" 같은 단일 수식어에만 의존하지 않고, **선화의 굵기와 색상, 피부와 머리카락의 셰이딩 단계, 안면 해부학 비례, 정확한 컬러 헥스(HEX) 코드**를 체계적으로 정의하여 어떤 최신 생성형 AI 모델(Gemini, Flux, SDXL, Midjourney)이나 아티스트가 보더라도 **오차 없이 동일한 도로시 캐릭터를 재현**할 수 있도록 설계되었습니다.

---

## 📐 1. 해부학적 형태 및 비례 표준 (Anatomical Proportions)

| 부위 | 규격 및 조형 원칙 |
| :--- | :--- |
| **신체 비율** | **정확한 4.5등신 치비/주니어 2D 애니메이션 비율**<br>• 두부(Head): 전체 신장의 약 22% (1단위)<br>• 상체 및 몸통(Torso): 약 1.5단위<br>• 하체 및 다리(Legs): 약 2.0단위 (무릎 아래가 통통하고 튼튼한 어린이다운 체형) |
| **얼굴 윤곽** | • 턱선: 날카롭지 않고 부드럽게 둥글려진 통통한 볼살(U-shape chubby cheeks)<br>• 이마: 앞머리에 의해 적당히 덮이며, 옆광대가 살짝 도드라져 귀엽고 생기 넘치는 인상 |
| **눈 (Eyes)** | • 얼굴 세로 중심선보다 약간 아래에 위치하는 **대형 호박 갈색(Warm Amber-Brown) 눈망울**<br>• 외곽선: 진한 다크 초콜릿 라인 + 윗눈썹에 부드러운 쌍꺼풀 라인<br>• 동공 & 홍채: 상단은 짙은 에스프레소 브라운, 하단은 맑은 꿀색 앰버 그러데이션<br>• **스펙큘러 하이라이트 (고유 규칙):** 10시 방향에 큼직한 원형 반사광 1개 + 4시 방향에 작은 보조 반사광 1개 필수 |
| **코 & 입 (Nose & Mouth)** | • 코: 콧대 생략, 얼굴 정중앙에 위치한 **극도로 단순화된 작은 점/단선(Dash)**<br>• 입: 양끝 입꼬리가 살짝 올라간 부드러운 곡선의 반달형 미소, 활짝 웃을 때는 혀가 보이는 핑크빛 오픈 마우스 |
| **볼터치 (Blush)** | • 양쪽 뺨 중앙에 수채화처럼 번지는 **소프트 피치 핑크 타원형 홍조**<br>• 각 홍조 위로 **얇은 붉은색 3줄 빗금 (`///`)** 표정선 섬세하게 배치 |
| **손 & 발 (Hands & Feet)** | • 손: 통통하고 귀여운 손가락, 손등과 손바닥 관절이 거칠지 않고 매끄러운 주니어 손<br>• 발: 발목이 단단하고 둥근 캔버스 스니커즈 형태 |

---

## 🎨 2. 화풍 및 렌더링 물리 규격 (Rendering & Line Art Mechanics)

특정 스튜디오 이름을 언급하지 않아도 고유한 화풍을 100% 동일하게 뽑아내기 위한 렌더링 물리 명세입니다:

### ① 선화 (Line Art)
- **선 색상:** 순수 블랙(`#000000`) 금지! 반드시 **부드러운 다크 초콜릿 차콜 브라운 (`#2A1E17`)** 적용
- **선 두께:** 1.5pt ~ 2.0pt의 균일하고 정돈된 클린 라인아트 (Crisp clean vector line art)
- **필압 특성:** 스케치선이나 거친 연필선 없이, 외곽선은 또렷하고 내부 디테일선은 얇게 가늘어지는 미세 테이퍼링(Tapering)

### ② 채색 및 셰이딩 (Coloring & Cel Shading)
- **2~3단계 플랫 셀 셰이딩 (Flat Cel Shading):** 
  - 기본 밑색(Base Color) + 1단계 부드러운 그림자(Soft Shade) + 옷 주름 접힘면의 2단계 짙은 그림자(Deep Crease Shade)
- **따뜻한 앰비언트 반사광 (Ambient Lighting):**
  - 그림자 영역이 칙칙한 무채색 회색으로 빠지지 않고, **피치 살구색/따뜻한 주황빛 언더톤**을 머금도록 처리
- **머리카락 윤기광 (Angel Ring Highlight):**
  - 정수리에서 관자놀이로 이어지는 머리카락 굴곡선을 따라 **캐러멜 골드 톤의 맑은 띠광(Halo Highlight)** 연출
- **질감 (Texture):**
  - 플라스틱 광택이나 3D CGI 광원 효과 절대 배제! **부드러운 무광택(Matte) 동화책 수채화/과슈 느낌** 유지

### ③ 배경 원칙 (Background Principle)
- **단독 캐릭터/부품/도표:** 무결점 순백색 (`#FFFFFF`, Solid White Background)
- **배경 장면:** 따뜻한 오후 햇살(Afternoon golden ambient light)이 비치는 아늑한 아날로그 메이커 공방 및 캠퍼스

---

## 🌈 3. 도로시 표준 컬러 팔레트 (Color Codes)

| 영역 | 항목 | 색상명 | Hex Code | 비고 및 시각 효과 |
| :--- | :--- | :--- | :--- | :--- |
| **인체** | 피부 밑색 | Warm Peachy Cream | `#FFF0E6` | 밝고 깨끗한 주니어 살구빛 피부톤 |
| | 피부 그림자 | Soft Peach Amber | `#F7CDBA` | 따뜻하고 온화한 피부 그림자 |
| | 눈동자 (상/하) | Espresso / Honey Amber | `#4A2E1B` / `#B3682C` | 깊이감 있는 2단 그러데이션 홍채 |
| | 볼터치 홍조 | Soft Coral Pink | `#FFAAA6` | 생기 있는 소프트 핑크 볼터치 |
| **헤어** | 머리카락 기본 | Chestnut Warm Brown | `#6E432B` | 풍부하고 따뜻한 밤색 톤 |
| | 머리카락 윤기 | Caramel Gold Sheen | `#C49265` | 상단 아치형 엔젤링 하이라이트 |
| **시그니처** | 데님 멜빵바지 | Classic Medium Denim Blue | `#467194` | 친근하고 활동적인 오버롤 진 |
| | 이너 티셔츠 | Orange & Sunshine Yellow | `#F38B3C` / `#F8C84E` | 2.5cm 두께의 가로 줄무늬 |
| | 캔버스 운동화 | Ruby Red | `#D13838` | 발목 롤업 아래 돋보이는 레드 슈즈 |
| | 뱃지 | STEM HERO White Badge | `#FFFFFF` (Navy/Gold Text) | 멜빵 가슴 주머니 원형 패치 |
| | 구슬 머리끈 | Candy Bead Hair Ties | Red, Green, Yellow, Cyan | 양갈래 묶음 부위 컬러풀 구슬 방울 |

---

## 💇‍♀️ 4. 헤어 스타일 4대 베리에이션 (Hair Variations)

도로시의 활발한 성격과 학습 상황에 맞춰 연출할 수 있는 4가지 표준 헤어스타일입니다.

![Dorothy Hairstyles Sheet](file:///Users/hojin9/dev/projects/dorothy/data/images/dorothy_hairstyles_sheet.jpg)

| 스타일명 | 한글 명칭 | 디자인 세부 명세 | 추천 상황 및 분위기 |
| :--- | :--- | :--- | :--- |
| **Type A (Signature)** | **시그니처 구슬 양갈래** | • 귀 위쪽에서 높게 묶인 볼륨감 있는 웨이브 양갈래 머리<br>• 알록달록한 구슬 방울(빨강, 초록, 노랑, 하늘색) 머리끈<br>• 자연스러운 이마 뱅 앞머리와 옆머리 애교 헤어 | 기본 대표 스타일, 호기심 탐구, 아두이노 조립, 기본 교재 대표 일러스트 |
| **Type B (Sporty Maker)** | **하이 포니테일 & 메이커 캡** | • 머리 뒤통수 상단에서 단단히 묶은 찰랑이는 하이 포니테일<br>• 틸-청록색(Turquoise) 메이커 캡(모자) 착용<br>• 역동적이고 씩씩한 비타민 에너지 | 야외 주행 시험, 하드웨어 툴 작업, 활동적인 납땜 및 조립 실습 |
| **Type C (Smart Bob)** | **단발 웨이브 보브컷** | • 어깨선 위 턱선에 닿는 발랄하고 풍성한 웨이브 단발머리<br>• 얇은 레드/와인색 패브릭 헤어밴드(머리띠)<br>• 단정하면서도 지적이고 영리한 인상 | 소프트웨어 코딩, 데이터베이스 설계, 차분한 이론 공부 및 발표 |
| **Type D (Classic Braids)** | **양갈래 땋은 머리** | • 양옆 귀 아래로 정갈하게 세 가닥 땋아 어깨 앞으로 내린 땋은 머리<br>• 끝부분에 묶인 빨간 리본 타이<br>• 따뜻하고 차분한 모범생 소녀 감성 | 도서관 독서, 수학 공식 정리, 차분한 멘토링 청취 |

---

## 👗 5. 의상 스타일 4대 베리에이션 (Outfit Variations)

강의 콘텐츠의 주제와 계절감, 실습 성격에 따라 교체할 수 있는 4가지 공인 복장 규격입니다.

![Dorothy Outfits Sheet](file:///Users/hojin9/dev/projects/dorothy/data/images/dorothy_outfits_sheet.jpg)

### 1) 시그니처 멜빵 룩 (Signature Overalls)
- **착장:** 미디엄 블루 데님 오버롤(가슴 포켓에 원형 `STEM HERO` 뱃지, 황동 버클, 롤업 밑단) + 주황/노랑 가로 줄무늬 반팔 티셔츠 + 흰 양말 + 레드 캔버스 스니커즈
- **성격:** 도로시의 상징이자 메이커 정체성을 대변하는 대표 복장
- **프롬프트 토큰:**
  ```text
  wearing classic medium blue denim overalls with rolled cuffs and a 'STEM HERO' round patch on the front bib, orange and yellow horizontal striped t-shirt underneath, white ankle socks, vibrant ruby red canvas sneakers
  ```

### 2) 메이커 해커 룩 (Maker Hacker Look)
- **착장:** 가슴에 초록색 PCB 회로 기판 그래픽이 프린팅된 오버핏 포레스트 그린 후드티 + 튼튼한 카키 베이지 유틸리티 카고 반바지 + 가죽 도구 벨트(미니 펜치, 드라이버, 테스터기 수납) + 옐로우 브라운 워크 부츠
- **성격:** 로봇 제작, 3D 프린터 조작, 장비 수리 실습 시 착용
- **참조 이미지:** [`dorothy_21.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/dorothy/dorothy_21.jpg)
- **프롬프트 토큰:**
  ```text
  wearing an oversized cozy forest green hoodie with a printed microchip circuit board patch, khaki utility cargo shorts, a sturdy brown leather maker tool belt holding miniature pliers and screwdrivers, warm yellow-brown work boots
  ```

### 3) 연구실 가운 & 사이언티스트 룩 (Lab Researcher Look)
- **착장:** 주머니에 펜과 `STEM HERO` 뱃지가 꽂힌 깔끔한 무릎길이 화이트 랩 코트(연구실 가운) + 청록색 꽈배기 니트 스웨터와 카라 셔츠 + 롤업 일자 청바지 + 이마 위에 걸친 투명 안전 고글 + 단정한 가죽 신발
- **성격:** 인공지능 이론 연구, 화학/물리 실험, 학술 세미나 세션
- **참조 이미지:** [`dorothy_22.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/dorothy/dorothy_22.jpg)
- **프롬프트 토큰:**
  ```text
  wearing a crisp knee-length white scientist lab coat with pens in the chest pocket, cozy teal cable-knit sweater with collared shirt, rolled blue jeans, brown shoes, clear protective safety goggles resting playfully on her forehead
  ```

### 4) 겨울 야외 탐구자 룩 (Winter Explorer Look)
- **착장:** 산뜻한 번트 오렌지 컬러의 볼륨감 있는 숏 다운 패딩 + 목을 포근하게 감싼 크림색 굵은 꽈배기 니트 목도리 + 짙은 회색 방한 장갑 + 중청 데님 팬츠 + 털 안감의 보온 스노우 부츠
- **성격:** 겨울철 야외 로봇 주행 시험, 캠퍼스 필드 테스트, 연말 특별 강의
- **프롬프트 토큰:**
  ```text
  wearing a puffy warm burnt-orange winter down jacket, a thick cozy cream knitted wool scarf wrapped around her neck, charcoal winter gloves, medium blue straight jeans, fur-lined warm winter snow boots
  ```

---

## 🗣️ 6. 언어 및 텍스트 엄격 원칙 (STRICT LANGUAGE RULES)

* **허용 언어:** **오직 한국어(한글)와 영어(English)만 허용**
* **절대 금지 언어:** **일본어(히라가나, 가타카나) 및 한자(Kanji) 생성 일체 금지!**
* **텍스트 디자인:** 
  - 뱃지나 도표의 텍스트는 `STEM HERO`, `ARDUINO`, `입력층`, `출력층`, `손실 감소` 등 철저하게 의미가 통하는 한국어 또는 영어로만 렌더링
  - 외계어처럼 뭉개지는 폰트가 생성되지 않도록 복잡한 글자 대신 시각적 아이콘/다이어그램으로 대체

---

## 🚫 7. 안티 패턴 및 부정 프롬프트 (What to Avoid)

일관성을 깨뜨리는 저해요소를 완전히 차단하기 위한 필수 부정 키워드 셋입니다:

### 반드시 배제해야 할 조형적 오류:
1. **극화체 / 성인 체형:** 6~8등신의 성인 여성 비율로 도로시를 길게 늘려 그리는 현상 (반드시 4.5등신 주니어 유지)
2. **과도한 실사/3D:** 광택 플라스틱 피부, 언캐니 밸리 3D CGI 렌더링, 유화의 거친 붓터치
3. **차가운 사이버펑크 톤:** 어둡고 네온 빛이 번지는 디스토피아 느와르 분위기
4. **거친 선화 및 잡선:** 정리되지 않은 연필 스케치선, 뭉개진 손가락(손가락 왜곡), 잘못된 아두이노 부품 구조

### 필수 Negative Prompt 프리셋:
```text
3d, photorealistic, realistic CGI render, oil painting, messy sketch, rough sketch, monochrome, grayscale, deformed anatomy, bad hands, mutated fingers, missing fingers, extra limbs, poorly drawn face, adult proportions, tall body, sexy, seductive, grimdark, noir, horror, dark moody lighting, garbled text, kanji, hiragana, katakana, watermarks, blurry, low resolution
```

---

## 📋 8. 도로시 데이터셋 참조 파일 맵 (Dataset Reference Map)

| 파일 경로 | 형태 및 설명 |
| :--- | :--- |
| [`data/images/dorothy_front_view.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/dorothy_front_view.jpg) | 시그니처 멜빵 정면 표준 스탠딩 뷰 |
| [`data/images/dorothy_character_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/dorothy_character_sheet.jpg) | 턴어라운드 및 기본 3각도 모델 시트 |
| [`data/images/dorothy_hairstyles_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/dorothy_hairstyles_sheet.jpg) | **공식 헤어스타일 4대 베리에이션 모델 시트** |
| [`data/images/dorothy_outfits_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/dorothy_outfits_sheet.jpg) | **공식 의상 4대 베리에이션 모델 시트** |
| [`data/dataset/dorothy/dorothy_21.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/dorothy/dorothy_21.jpg) | **메이커 해커 후드티 + 하이 포니테일 + 아두이노 보드 단독 전신 컷** |
| [`data/dataset/dorothy/dorothy_22.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/dorothy/dorothy_22.jpg) | **연구실 가운 + 단발 보브컷 + 스타일러스 펜 단독 전신 컷** |

---

## 🎭 9. 도로시 심층 페르소나 & 14대 기술 학습 매트릭스 (Character Persona & Tech Matrix)

### 🌟 1) 핵심 정체성 및 가치관 (Identity & Values)
* **역할:** 도로시 세계관의 주인공, 호기심 넘치는 주니어 메이커 & 소프트웨어 탐구자
* **핵심 가치관:** *"에러 메시지는 실패가 아니라 컴퓨터가 나와 대화하려는 신호예요!"*
* **성격 키워드:** 무한한 호기심, 불굴의 실행력, 직관적 직진형, 따뜻한 공감 능력
* **메이커 철학:** 이론서에만 갇혀있지 않고, 직접 빵판(브레드보드)에 점퍼선을 꽂고 코드를 배포해봐야 진짜 내 지식이 된다고 믿음

### 💬 2) 말씨와 행동 양식 (Voice & Behavior)
* **대화 톤:** 발랄하고 예의 바르며, 궁금한 점이 생기면 호박 갈색 눈망울을 반짝이며 즉시 질문하는 솔직한 화법
* **대표 시그니처 대사:**
  * *"교수님! 아두이노 센서 값이 갑자기 요동치는데, 여기에 칼만 필터를 붙이면 해결될까요?"*
  * *"지니야, 왜 도커 빌드 캐시가 안 먹히지? 아, Dockerfile 명령어 순서 때문이었어?!"*
  * *"토토, 저기 초록색 점퍼 와이어 좀 입에 물어다 줘! 모터 핀에 연결해야 해!"*
  * *"PHP로 만든 레거시 웹 게시판을 파이썬 FastAPI와 PostgreSQL로 마이그레이션해 보고 싶어요!"*

### 🛠️ 3) 14대 핵심 기술 스택별 도로시의 학습 목표 & 실습 행동 매트릭스

| 기술 스택 | 분류 | 도로시의 학습 목표 & 실습 행동 | 상호작용 캐릭터 |
| :--- | :--- | :--- | :--- |
| **🧠 인공지능 (AI)** | 기초/개념 | 지도/비지도학습 원리를 일상 데이터로 분류 실험 (토토 사진과 지니 사진 분류기 만들기) | 교수님의 지도 청취 & 지니의 과적합 지적 |
| **🔬 딥러닝 (Deep Learning)** | 신경망 | CNN 사물인식기로 로봇 부품 감지, Transformer로 과학 질문 챗봇 구축 | 지니 조교와 함께 손실(Loss) 곡선 관찰 |
| **🤖 강화학습 (RL)** | 자율제어 | 자율주행 모형차와 틴맨 로봇의 Q-Learning & DQN 정책 훈련 (장애물 회피) | 토토와 함께 모형차 주행 시험 |
| **🔒 연합학습 (Federated Learning)** | 분산 프라이버시 | 라즈베리파이 다수 노드에서 개인정보 유출 없이 공기질 예측 모델 분산 합산 실습 | 교수님의 FedAvg 아키텍처 멘토링 |
| **🐍 파이썬 (Python)** | 코어 언어 | 데이터 처리(Pandas), PyTorch 모델링, FastAPI 경량 고성능 웹 서버 구현 | 파이썬 로고 뱃지를 가방에 달고 코딩 |
| **🌐 자바스크립트 (JS)** | 프론트엔드 | 모던 ES6+, 이벤트 루프, 반응형 로봇 텔레메트리 웹 대시보드 UI 제작 | 지니가 비동기 `Promise.all` 칭찬 |
| **☕ 자바 (Java)** | 엔터프라이즈 | 객체지향 4대 원칙(OOP), 스프링부트 기반 견고한 로봇 제어 REST API 구현 | 교수님과 JVM 메모리 구조 토론 |
| **🐘 PHP** | 웹 백엔드 | 웹의 역사 학습, 레거시 시스템 구조 이해 및 현대식 최신 PHP 8.x API 연동 | 코끼리 인형을 두고 웹 변천사 학습 |
| **🔌 아두이노 (Arduino)** | 피지컬 컴퓨팅 | 브레드보드 회로 배선, 센서 인터럽트, 서보 모터 PWM 제어로 틴맨 팔다리 구동 | 토토가 물어다 주는 점퍼선 배선 |
| **🍓 라즈베리파이 (Raspberry Pi)** | 싱글보드/엣지AI | 리눅스 OS 세팅, 파이썬 기반 카메라 엣지 AI 노드 구동 및 GPIO 제어 | 쿨링팬을 달아주며 지니에게 검사받기 |
| **🐬 MySQL** | 관계형 DB | 3단계 정규화, 테이블 스키마 설계, JOIN 쿼리 및 트랜잭션 무결성 실습 | 돌고래 로고 스티커를 노트북에 부착 |
| **🐘 PostgreSQL** | 고급 RDBMS | JSONB 비정형 센서 로그 처리, 공간 데이터(PostGIS), 복합 윈도우 함수 실습 | 지니 조교에게 `EXPLAIN ANALYZE` 쿼리 검수 |
| **🐳 도커 (Docker)** | 컨테이너 가상화 | Dockerfile 작성, 컨테이너 빌드, `docker-compose`로 로봇 서버 원클릭 배포 | "내 컴퓨터에선 됐는데!" 버그 탈출 환호 |
| **🐧 리눅스 (Linux CLI)** | 운영체제 | Bash 쉘 스크립트 작성, 파일 권한(chmod), systemd 로봇 데몬 서비스 등록 | 터미널 검은 화면에서 명령어 자유자재 구사 |

