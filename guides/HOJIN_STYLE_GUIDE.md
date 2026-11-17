# 👨‍🏫 이호진 교수님 (Professor Hojin) 캐릭터 디자인 & LoRA 마스터 스타일 가이드

본 문서는 **이호진 교수님(Professor Hojin)** 캐릭터를 모든 교재, 웹 강의, PPT 슬라이드, 일러스트레이션 및 차세대 생성형 AI 모델(Gemini, Flux, SDXL, Midjourney)과 **LoRA(Low-Rank Adaptation) 모델 훈련**에서 **얼굴 생김새, 신체 비례, 연령대(40대 초반 동안), 색감, 의상, 선화 화풍(Art Style)의 일관성(Consistency)을 100% 영구 유지**하기 위한 공식 마스터 규격서입니다.

> 💡 **스타일 및 정체성 보장 원칙:**  
> 1. **얼굴 기준:** [`data/images/legacy/hojin_legacy_clipart.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/legacy/hojin_legacy_clipart.jpg) 및 최신 턴어라운드 시트 [`data/dataset/hojin/hojin_character_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/hojin/hojin_character_sheet.jpg)의 스마트하고 친근한 얼굴 조형을 절대 기준으로 합니다.
> 2. **연령 불변(Anti-Aging):** 점점 더 늙어지거나 노안(주름, 처진 피부, 노인 인상)으로 묘사되는 것을 엄격히 차단하며, **생기 넘치는 40대 초반의 매끄러운 피부와 활력 있는 눈빛**을 고정합니다.
> 3. **배지/로고 정제:** 과거 착장에 존재했던 **'SNU' 로고나 명찰은 완전히 영구 제거**하며, 군더더기 없는 단색 솔리드 네이비 폴로 셔츠를 착용합니다.
> 4. **엄격한 언어:** **오직 한국어와 영어만 사용**하며, 일본어(히라가나, 가타카나, 한자)는 일체 배제합니다.
> 5. **도로시 세계관 동기화:** 도로시(Dorothy)의 2D 프리미엄 셀 셰이딩 화풍과 완벽히 동기화된 라인아트와 컬러 팔레트를 적용합니다.

---

## 📐 1. 해부학적 형태 및 신체 비례 규격 (Anatomy & Proportions)

| 부위 | 규격 및 조형 세부 원칙 |
| :--- | :--- |
| **신체 비율** | **정확한 6.5 ~ 7.0등신 성인 2D 애니메이션 비율**<br>• 두부(Head): 전체 신장의 약 14.5%<br>• 상체 및 몸통(Torso): 약 2.5단위 (단정하고 곧은 체형, 과도한 근육질이나 왜소함 배제)<br>• 하체 및 다리(Legs): 약 3.0단위 (자연스러운 스트레이트 핏 데님 실루엣)<br>• 도로시(4.5등신)와 나란히 섰을 때 든든하고 신뢰감을 주는 멘토의 황금 대비 |
| **연령 & 인상** | **40대 초반(Early 40s) 동안(Youthful Face)**<br>• **피부:** 잔주름이나 깊은 팔자주름, 눈가 처짐(Eye bags)이 전혀 없는 매끄럽고 건강한 피부결 (`smooth skin`, `youthful`)<br>• **인상:** 지적이고 총명하며, 학생들에게 언제나 친절하고 격려를 아끼지 않는 따뜻한 온화함 |
| **헤어스타일** | **세련된 7:3 가르마 숏 컷 (Stylishly Parted Short Hair)**<br>• 기장: 귀 위쪽이 깔끔하게 정돈되고 이마가 훤히 드러나 신뢰감을 주는 스마트 숏헤어<br>• 색상: 자연스러운 다크 차콜 흑발 베이스에 은빛/그레이 톤이 섞인 **세련된 솔트앤페퍼 (Salt-and-Pepper Gray Hair)**<br>• 결감: 부드러운 볼륨감과 가닥 분할로 정돈된 2D 결감 유지 |
| **안경 (Glasses)** | **스티브 잡스 스타일 라운드 메탈 와이어테 (Minimalist Round Wire Glasses)**<br>• 프레임: 매우 얇고 슬림한 원형/부드러운 타원형 실버 메탈 테 (`thin metal wire-rim`)<br>• 렌즈: 눈동자를 가리지 않는 투명한 렌즈 투과율, 렌즈 가장자리에 얇은 2D 반사광선 1줄 |
| **눈 & 눈썹** | • 눈: 지적이고 따뜻하게 빛나는 **깊은 밤색/에스프레소 갈색 눈동자 (Warm Brown Eyes)**<br>• 눈썹: 단정하게 정돈된 부드러운 굵기의 차콜 그레이 아치형 눈썹<br>• 웃을 때: 반달형으로 가늘어지며 눈꼬리에 인자한 온화함을 띠는 미소선 (단, 노화 주름이 아닌 생기 있는 표정선) |
| **코 & 입** | • 코: 날렵하고 오똑한 2D 애니메이션 콧날 (부드러운 음영 처리)<br>• 입: 항상 미소를 머금은 입꼬리, 설명할 때는 긍정적이고 또렷한 발음의 입술 모양 |
| **손 & 제스처** | • 손: 정밀한 전자 부품과 마이크로컨트롤러를 능숙하게 다루는 세련되고 단정한 메이커의 손<br>• 시그니처 제스처: 학생을 향한 자신감 넘치는 **'엄지 척(Thumbs-up)'**, 칠판을 가리키는 프레젠테이션 포인팅 |

---

## 🎨 2. 화풍 및 렌더링 물리 규격 (Rendering Physics & Line Art)

특정 상표나 스튜디오명을 쓰지 않고도 일관된 화풍을 100% 동일하게 생성하는 물리적 규칙입니다:

### ① 선화 (Line Art Mechanics)
- **선 색상:** 순수 블랙(`#000000`) 절대 금지! 반드시 **부드럽고 깊은 다크 에스프레소 브라운 (`#26211E`)** 적용.
- **선 두께:** 1.5pt ~ 2.0pt의 균일하고 깨끗한 2D 애니메이션 클린 라인아트 (`crisp clean vector line art`).
- **선 처리:** 러프 스케치선이나 거친 연필 느낌 없이 완벽히 패스(Path)가 닫힌 셀 애니메이션 외곽선.

### ② 채색 및 셰이딩 (Cel Shading)
- **2~3단계 웜톤 플랫 셀 셰이딩:**
  - 기본 밑색(Base Color) + 1단계 온화한 피부/패브릭 그림자(Soft Shade) + 옷 주름 심부 2단계 짙은 음영(Deep Fold).
- **무채색 회색 그림자 배제:**
  - 그림자가 탁한 쿨 그레이가 되지 않도록, 피부에는 **소프트 피치 앰버 (`#F5CEBA`)**, 네이비 셔츠에는 **깊은 미드나잇 블루 (`#15181E`)** 톤을 사용하여 따뜻하고 생동감 있는 분위기 연출.
- **표면 질감:**
  - 번들거리는 3D CGI 플라스틱 광택이나 유화 브러시 자국 금지. **매끄러운 무광택(Matte) 2D 프리미엄 애니메이션** 감성 유지.

### ③ 배경 규칙 (Background Standards)
- **단독 캐릭터/프로필 컷:** 결점 없는 순수 백색 (`#FFFFFF`, Pure Solid White Background), 발밑에만 아주 은은하고 부드러운 접지 그림자 배치.
- **강의실/연구실 씬:** 따뜻한 아카데믹 웜 라이팅(Warm lecture hall / maker lab lighting), 지저분하지 않고 정돈된 스마트 칠판과 실험 기자재.

---

## 🌈 3. 이호진 교수님 표준 컬러 팔레트 (Color Hex Codes)

| 영역 | 세부 항목 | 색상 명칭 | Hex Code | 시각적 특징 및 매칭 규칙 |
| :--- | :--- | :--- | :--- | :--- |
| **인체** | 피부 밑색 | Warm Ivory Peach | `#FEEFE6` | 40대 초반의 건강하고 매끄러운 웜톤 살구빛 |
| | 피부 그림자 | Soft Peach Amber | `#F5CEBA` | 칙칙하지 않은 따뜻한 온도의 음영 |
| | 머리카락 (베이스) | Dark Charcoal Black | `#2C2D30` | 깊고 부드러운 흑발 베이스 |
| | 머리카락 (솔트 스트릭) | Silver Gray Slate | `#8C9098` | 이마 양옆과 구레나룻에 섞인 세련된 은빛 |
| | 눈동자 (홍채) | Deep Espresso Brown | `#422A1D` | 지적이고 깊이 있는 밤색 눈 |
| | 안경테 | Sleek Metal Wire Silver | `#9EA7B0` | 스티브 잡스 스타일의 얇은 실버 메탈 |
| **의상** | **시그니처 폴로 셔츠** | Dark Charcoal Navy | `#1F242C` | **로고/명찰 없는 단정한 솔리드 네이비** |
| | 셔츠 단추 & 칼라 안쪽 | Deep Navy Ink | `#15181E` | 정돈된 카라 깃 음영 |
| | **클래식 데님 팬츠** | Classic Mid-Wash Blue | `#3F638A` | 리바이스 501 스타일의 정통 블루진 |
| | 청바지 스티치 | Golden Ochre | `#C88A3C` | 포켓 및 옆선 정통 골드 스티치 |
| | **스니커즈 (바디)** | Iconic Retro Gray Suede | `#7F8287` | 뉴발란스 99X 모티브 클래식 그레이 스웨이드 |
| | 스니커즈 (솔/밑창) | Crisp White Foam | `#F4F5F7` | 깔끔하고 경쾌한 화이트 미드솔 |
| **연구 룩** | **연구실 가운** | Clean Lab Coat White | `#F8F9FA` | 주름 없이 펄럭이는 순백의 랩 코트 |
| | 가운 포켓 펜 | Blue & Red Stylus | `#1E5FA8` / `#C83232` | 상단 주머니에 꽂힌 스마트 펜 2종 |

---

## 👕 4. 의상 규격 및 엄격한 배지/로고 규칙 (Outfits & Props)

### 🚨 [절대 준수] 명찰 및 로고 규정
* **'SNU' 텍스트/마크 일체 금지:** 가슴이나 소매, 명찰 등에 'SNU' 글자나 로고가 생성되지 않도록 프롬프트 및 네거티브에서 완전 차단합니다.
* **무지 솔리드 폴로 셔츠:** 어떠한 기업 로고나 대학 마크도 없는 순수 다크 차콜 네이비 폴로 셔츠를 기본으로 합니다.

### 👔 착장 2대 공식 스타일
1. **시그니처 스마트 캐주얼 룩 (Signature Smart Casual Look):**
   - **상의:** 깃이 단정한 다크 차콜 네이비 반팔 폴로 셔츠 (`dark charcoal navy short-sleeve collared polo shirt, plain, no badge, no name tag`)
   - **하의:** 자연스럽고 편안한 스트레이트 핏 중청 데님 청바지 (`classic medium-wash blue straight denim jeans`)
   - **신발:** 레트로 그레이 스웨이드 런닝 스니커즈 (`grey retro running sneakers with white soles`)
   - **활용처:** 프로필, 엄지 척, 메이커 멘토링, 기본 학습 교재 일러스트

2. **연구실 & 학술 세미나 룩 (Lab & Academic Lecture Look):**
   - **착장:** 시그니처 폴로 셔츠 + 청바지 + 스니커즈 위에 **앞을 잠그지 않고 자연스럽게 휘날리는 깨끗한 화이트 연구 가운(Lab Coat)** 착용
   - **소품:** 가슴 주머니에 꽂힌 2자루의 펜/스타일러스
   - **활용처:** 대형 강의실 강연, 전자현미경 및 AI 서버룸 점검, 공식 학술 세미나

---

## 🤝 5. 세계관 내 서사적 역할 및 캐스팅 규칙 (Narrative & Casting Rules)

도로시 프로젝트의 세계관에서 캐릭터들이 등장할 때 혼선이 없도록 규정된 서사 규칙입니다:

| 규칙 항목 | 명세 및 연출 원칙 |
| :--- | :--- |
| **이호진 교수님의 역할** | **'지식과 지혜의 등대' (The Mentor)**<br>• 도로시나 독자가 원리를 모르고 헤매거나, 새로운 기술(AI, 강화학습, 아두이노 회로 등)을 배울 때 결정적인 원리와 해법을 자상하게 알려주기 위해 등장<br>• 억압적이거나 권위적이지 않고, 호기심을 북돋우고 칭찬을 건네는 따뜻한 메이커 스승 |
| **도로시의 친구: 토토** | **하얗고 털이 복슬복슬한 강아지 '토토(Toto)'**<br>• 도로시의 단짝 친구이자 항상 곁을 지키는 든든한 반려견. 실습 시 도로시 발치나 옆 의자에 앉아 함께 호기심을 표현 |
| **지식의 요정 조교: 지니** | **보라색 턱시도 고양이 '지니(Jiny)'**<br>• 교수님의 작은 조교 요정이자 마법 같은 힌트를 별빛 지팡이로 전달하는 신비로운 고양이 |
| **중복 복제 방지 (Strict)** | **씬당 캐릭터 최대 개수: 이호진 교수님 1명, 도로시 1명, 토토(개) 1마리, 지니(고양이) 1마리**<br>• 화면 내에 고양이가 2마리 이상 중복 생성되는 글리치를 엄격히 금지하며, 동물 파트너는 '고양이 지니 1마리 + 강아지 토토 1마리'로 구성 |

---

## 🗣️ 6. 언어 및 텍스트 엄격 원칙 (Strict Language Rules)

* **허용 언어:** **오직 한국어(한글)와 영어(English)만 100% 허용**
* **절대 금지 언어:** **일본어(히라가나, 가타카나, 일본식 한자) 일체 생성 금지!**
* **칠판 및 자료 표기:**
  - 화이트보드나 컴퓨터 화면, 슬라이드의 텍스트는 `ARDUINO`, `PYTHON`, `NEURAL NETWORK`, `경사하강법`, `오차역전파`, `아두이노 제어` 등 명확한 영문 코드나 한국어 용어로만 구성
  - 의미를 알 수 없는 괴문자나 글자 뭉개짐(Garbled glyphs)을 방지하기 위해 불필요한 장식 텍스트 대신 깔끔한 다이어그램/회로 기호로 연출

---

## 🧠 7. LoRA 학습 데이터셋 규격 및 하이퍼파라미터 (LoRA Training Guide)

[`data/dataset/hojin`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/hojin) 디렉토리는 이호진 교수님 전용 LoRA 모델 학습을 위해 완벽하게 정제된 25종의 이미지와 이중 레이어 캡션 파일로 구성되어 있습니다.

### ① 캡션 파일 포맷 표준 (Dual-Layer Tagging)
모든 `.txt` 캡션은 다음의 2단계 구조를 엄격히 준수합니다:
* **1행 (태그 레이어):** Danbooru 및 특화 트리거 태그 (콤마 구분)
* **3행 (자연어 레이어):** 장면의 상황, 표정, 조명, 의상을 서술한 고품질 영문 디스크립션

```text
professor hojin, 1man, solo, korean, early 40s, engineering professor, youthful face, smooth skin, parted short salt-and-pepper hair, thin metal wire-rim glasses, kind warm brown eyes, encouraging friendly smile, thumbs up gesture, hand in pocket, standing, front view, solid dark charcoal navy polo shirt, no name tag, no badge, no snu text, classic blue denim jeans, grey athletic sneakers, simple white background, pure solid white background, clean anime line art, soft 2D cel shading, masterpiece, best quality

A full-body front-view standing portrait of Professor Hojin giving an encouraging thumbs-up with a warm youthful smile, wearing his signature dark navy polo shirt, blue jeans, and grey sneakers on a pure white background.
```

### ② 핵심 트리거 토큰 (Core Trigger Tokens)
LoRA 호출 및 추론 시 고정적으로 사용하는 마스터 토큰 조합:
```text
professor hojin, 1man, solo, korean, early 40s, engineering professor, youthful face, smooth skin, parted short salt-and-pepper hair, thin metal wire-rim glasses, kind warm brown eyes, encouraging smile, solid dark charcoal navy polo shirt, no badge, no snu text, classic blue denim jeans, grey sneakers, clean 2d anime style
```

### ③ 권장 LoRA 학습 하이퍼파라미터 (Kohya-ss / SD-Scripts 기준)

| 파라미터 | 권장 설정값 | 비고 |
| :--- | :--- | :--- |
| **Base Model** | SDXL 1.0 / Flux.1-Dev / Animagine XL 3.1 | 애니메이션/일러스트 특화 베이스 모델 권장 |
| **Dataset Size** | 25 Images (`hojin_01.jpg` ~ `hojin_25.jpg`) | 100% 매칭 `.txt` 캡션 완비 |
| **Repeats per Image** | 10 repeats | 25 x 10 = 250 steps / epoch |
| **Epochs** | 10 ~ 12 epochs | 총 2,500 ~ 3,000 steps 최적 수렴 |
| **Network Rank / Alpha** | Dim: 32 / Alpha: 16 | 인물 얼굴 특징과 의상 선화를 섬세하게 보존 |
| **Learning Rate** | UNet: `1e-4` / Text Encoder: `5e-5` | 오버피팅 없이 유연한 화풍 동기화 |
| **Optimizer** | AdamW8bit 또는 Prodigy (d_coef=1.0) | 안정적인 가중치 수렴 |
| **Resolution** | 1024 x 1024 (Aspect Ratio Bucketing 활성화) | 전신 및 16:9 턴어라운드 시트 완벽 수용 |
| **Mixed Precision** | `bf16` 또는 `fp16` | 연산 효율 및 메모리 최적화 |

---

## 🗂️ 8. 이호진 교수님 LoRA 데이터셋 매핑 테이블 (`hojin_01` ~ `hojin_25`)

| 번호 | 대표 파일명 | 캡션 요약 및 화각 | 주요 소품 및 상황 |
| :---: | :--- | :--- | :--- |
| **01** | `hojin_01.jpg` | 정면 전신, 엄지 척, 따뜻한 동안 미소 | 시그니처 폴로 + 청바지 + 스니커즈 (순백 배경) |
| **02** | `hojin_02.jpg` | 상반신 3/4각도, 자신감 넘치는 포즈 | 단정하고 온화한 미소 (순백 배경) |
| **03** | `hojin_03.jpg` | 클로즈업 포트레이트, 안경 너머 갈색 눈망울 | 동안 얼굴 해부학, 매끄러운 피부 (순백 배경) |
| **04** | `hojin_04.jpg` | 디지털 태블릿을 들고 설명하는 전신 | 프레젠테이션, 스마트 강의 제스처 (순백 배경) |
| **05** | `hojin_05.jpg` | 아두이노 우노(Arduino Uno R3) 보드 든 상반신 | 청록색 PCB 회로 보드 시연 (순백 배경) |
| **06** | `hojin_06.jpg` | 하얀 연구 가운(Lab Coat) 착용 전신 | 가운 속 네이비 폴로 셔츠 노출 (순백 배경) |
| **07** | `hojin_07.jpg` | 칠판 앞에서 분필/마커로 필기하는 모습 | 스마트 강의실 이론 설명 (순백 배경) |
| **08** | `hojin_08.jpg` | 돋보기로 마이크로칩 정밀 검사하는 컷 | 하드웨어 분석 및 메이커 진단 (순백 배경) |
| **09** | `hojin_09.jpg` | 양손을 펼쳐 원리를 알기 쉽게 설명하는 포즈 | 친절하고 명쾌한 교육자 인상 (순백 배경) |
| **10** | `hojin_10.jpg` | 턱을 괴고 온화하게 경청하는 상반신 | 학생의 질문에 집중하는 멘토 (순백 배경) |
| **11** | `hojin_11.jpg` | 대형 강의실 스마트 칠판 앞 풀씬 | 아두이노 및 AI 알고리즘 강의 씬 |
| **12** | `hojin_12.jpg` | 전자공학 메이커 연구실 풀씬 | 오실로스코프, 납땜기, 부품 박스 배경 |
| **13** | `hojin_13.jpg` | 고성능 AI 슈퍼컴퓨터 서버룸 점검 씬 | 랙 서버 LED 불빛, 지적인 시스템 점검 |
| **14** | `hojin_14.jpg` | 캠퍼스 잔디밭에서 학생들과 담소하는 씬 | 야외 자연광, 따뜻한 캠퍼스 멘토링 |
| **15** | `hojin_15.jpg` | 도서관 서가에서 전공 원서를 꺼내 읽는 씬 | 지적이고 차분한 학술 연구 분위기 |
| **16** | `hojin_16.jpg` | 아두이노 자율주행 RC카를 테스트하는 씬 | 바닥에 앉아 로봇 센서 튜닝 |
| **17** | `hojin_17.jpg` | 랩톱으로 딥러닝 손실 그래프를 분석하는 씬 | 모니터의 파이썬 코드 및 학습 곡선 분석 |
| **18** | `hojin_18.jpg` | 화이트보드에 신경망 구조를 드로잉하는 씬 | 입력층-은닉층-출력층 MLP 구조도 도식화 |
| **19** | `hojin_19.jpg` | 도로시에게 브레드보드 배선을 가르치는 씬 | 친절한 1:1 아두이노 하드웨어 실습 지도 |
| **20** | `hojin_20.jpg` | 완성된 도로시의 로봇을 함께 기뻐하는 씬 | 엄지 척 격려와 성취감 넘치는 협업 |
| **21** | `hojin_21.jpg` | **[Master]** 시그니처 엄지 척 1:1 히어로 컷 | `hojin_thumbs_up.jpg` 정식 마스터 규격 |
| **22** | `hojin_22.jpg` | **[Master]** 태블릿을 든 열정적 프레젠터 컷 | `hojin_lecture_presenter.jpg` 마스터 규격 |
| **23** | `hojin_23.jpg` | **[Master]** 도로시 & 토토 & 지니 연구실 멘토링 | `hojin_dorothy_mentoring.jpg` 마스터 규격 |
| **24** | `hojin_24.jpg` | **[Master]** 칠판 앞 아두이노 이론 강의 풀씬 | `hojin_lab_lecture.jpg` 마스터 규격 |
| **25** | `hojin_25.jpg` | **[Master]** 4각도 턴어라운드 모델 시트 | `hojin_character_sheet.jpg` 턴어라운드 |

---

## 📝 9. 프롬프트 표준 생성 템플릿 (Prompt Construction Templates)

### ① 시그니처 엄지 척 프로필 컷 (Hero Thumbs-Up Cutout)
```text
2D premium anime storybook illustration, clean anime line art, vibrant flat cel shading, studio animation screenshot. Full-body standing portrait of Professor Hojin, a youthful and distinguished Korean engineering professor in his early 40s, smooth skin without wrinkles, neatly parted stylish salt-and-pepper short hair, thin minimalist round metal wire-rim glasses, kind intelligent warm brown eyes with a gentle encouraging smile. Giving a confident and friendly thumbs-up gesture. Wearing a neat solid dark charcoal navy short-sleeve collared polo shirt without any badges or name tags, classic medium-wash blue straight denim jeans, and iconic grey suede retro running sneakers with white soles. Pure solid clean white background, isolated cutout asset, subtle soft contact shadow at feet, crisp lines, best quality, masterpiece.
```

### ② 태블릿을 든 강의 프레젠터 컷 (Lecture Presenter)
```text
2D premium anime storybook illustration, clean anime line art, soft 2D cel shading. Full-body portrait of Professor Hojin, a youthful Korean professor in his early 40s with smooth skin, parted salt-and-pepper hair, and thin round metal wire-rim glasses. He is holding a sleek digital tablet with stylus in one arm while gesturing forward enthusiastically with his open hand, explaining a technology concept with warmth and passion. Dressed in a plain solid dark navy collared polo shirt (no logos, no badges), classic blue straight jeans, and grey sneakers. Pure solid white background, high quality educational presentation cutout graphic.
```

### ③ 도로시 & 토토 & 지니와의 연구실 멘토링 씬 (Heartwarming Mentoring)
```text
2D premium anime storybook illustration, masterpiece, rich warm ambient lighting. A heartwarming educational scene featuring Professor Hojin mentoring young Dorothy at a sturdy wooden maker workbench in an Arduino electronics laboratory. Professor Hojin, looking youthful in his early 40s with smooth skin, thin wire glasses, and his signature dark navy polo shirt, sits warmly beside Dorothy, gently explaining the pinout of an Arduino Uno board. Dorothy in her denim overalls listens with sparkling curious eyes. Floating nearby is Jiny, the single purple fairy cat holding a star wand, while Toto the white fluffy puppy sits happily by their feet. Warm cozy workshop background with electronic components, glowing breadboard LEDs, and sunny window light. Strictly Korean or English labels on boards, no Japanese text.
```

### ④ 대형 스마트 칠판 앞 학술 강의 씬 (Academic Lecture Scene)
```text
2D studio anime illustration, crisp line art, beautiful lecture hall illumination. Professor Hojin wearing a clean white open lab coat over his plain dark navy polo shirt and blue jeans with grey sneakers, passionately delivering an artificial intelligence lecture in front of a high-tech smart blackboard filled with clear neural network diagrams, mathematical formulas, and Python code snippets. Youthful early 40s face with smooth skin, thin round wire-rim eyeglasses, intelligent warm brown eyes. Inspiring and prestigious academic atmosphere, attentive university classroom.
```

---

## 🚫 10. 안티 패턴 및 필수 부정 프롬프트 (What to Avoid)

원치 않는 스타일 왜곡이나 캐릭터 붕괴를 완전히 차단하기 위한 필수 부정 키워드입니다:

### 반드시 차단해야 할 결함:
1. **노안 및 주름 생성 금지:** 50~60대 노인 인상, 깊은 팔자주름, 눈가 처짐, 노화된 피부톤 (`wrinkles, old man, elderly, deep smile lines, eye bags, saggy skin, aging`)
2. **배지 및 특정 대학 로고 금지:** 가슴이나 셔츠의 'SNU' 글자, 명찰, 임의의 패치 (`snu, snu logo, snu badge, name tag, embroidered chest crest`)
3. **일본어 및 외계 문자 금지:** 칠판이나 슬라이드에 히라가나, 가타카나, 일본식 한자가 생성되는 현상 (`kanji, hiragana, katakana, japanese text, garbled text`)
4. **과도한 실사/3D 및 유화 질감:** 언캐니 밸리 3D CGI, 번들거리는 플라스틱 반사광, 거친 유화 브러시 자국 (`3d render, photorealistic, realistic cgi, oil painting, specular sheen`)
5. **동물 중복 복제 글리치:** 고양이가 2마리 이상 나오거나 정체불명의 동물이 섞여 나오는 현상 (`duplicate cats, multiple cats, extra animals`)

### 필수 Negative Prompt 프리셋 (SDXL / Flux / 추론 공통):
```text
wrinkles, old man, elderly, aging, saggy skin, deep wrinkles, eye bags, snu, snu badge, snu logo, name tag, 3d, photorealistic, realistic CGI render, oil painting, messy sketch, rough lines, deformed anatomy, bad hands, mutated fingers, missing fingers, extra limbs, poorly drawn face, grimdark, noir, horror, dark moody lighting, garbled text, kanji, hiragana, katakana, japanese characters, multiple cats, duplicate cats, watermarks, blurry, low resolution
```

---

## 📂 11. 관련 참조 문서 및 에셋

* **도로시 마스터 스타일 가이드:** [`guides/DOROTHY_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/DOROTHY_STYLE_GUIDE.md)
* **로봇 & 피지컬 AI 스타일 가이드:** [`guides/ROBOT_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/ROBOT_STYLE_GUIDE.md)
* **조교 지니 마스터 스타일 가이드:** [`guides/JINY_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/JINY_STYLE_GUIDE.md)
* **토토 마스터 스타일 가이드:** [`guides/TOTO_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/TOTO_STYLE_GUIDE.md)
* **공식 모델 시트 에셋:** [`data/dataset/hojin/hojin_character_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/hojin/hojin_character_sheet.jpg)

---

## 🎭 12. 이호진 교수님 심층 페르소나 & 14대 기술 멘토링 매트릭스 (Character Persona & Mentoring Matrix)

### 🌟 1) 핵심 정체성 및 가치관 (Identity & Values)
* **역할:** 컴퓨터 과학 & 피지컬 인공지능 연구실 지도교수, 도로시의 멘토
* **핵심 가치관:** *"화려한 프레임워크 뒤에 숨겨진 컴퓨터 구조와 수학적 원리를 이해할 때 진짜 엔지니어로서 자유로워진다."*
* **성격 키워드:** 인자하고 지적인 카리스마, 스티브 잡스 스타일의 실용주의 혁신가, 통찰력, 경청과 격려
* **외모 & 연령 정체성:** 40대 초반 동안(`early 40s, youthful face, smooth skin`), 매끄러운 피부, 단색 솔리드 네이비 폴로 셔츠(No SNU badge), 스티브 잡스풍 라운드 안경

### 💬 2) 말씨와 교육 철학 (Voice & Pedagogy)
* **대화 톤:** 차분하고 신뢰감 넘치는 온화한 표준어. 일방적인 주입식 강의가 아니라 학생의 호기심을 존중하며 유도 질문으로 스스로 원리를 깨닫게 하는 소크라테스식 문답법
* **대표 시그니처 대사:**
  * *"좋은 질문이야 도로시. 강화학습에서 에이전트가 탐색(Exploration)과 활용(Exploitation) 사이에서 균형을 잃으면 어떻게 될까?"*
  * *"자바의 강타입 객체지향 설계와 파이썬의 동적 유연성, 각각 어떤 비즈니스 환경에 적합한지 비교해 보렴."*
  * *"연합학습(Federated Learning)의 핵심은 '데이터는 각자의 기기에 머물고, 가중치(Gradient)만 모은다'는 분산 프라이버시 철학에 있단다."*
  * *"지니 조교, 도로시 코드에 N+1 쿼리 이슈가 없는지 쿼리 플랜 좀 같이 봐주겠나?"*

### 🛠️ 3) 14대 핵심 기술 스택별 이호진 교수님의 멘토링 매트릭스

| 기술 스택 | 분류 | 이호진 교수님의 멘토링 핵심 포인트 | 교육 방향 및 철학 |
| :--- | :--- | :--- | :--- |
| **🧠 인공지능 (AI)** | 기초/개념 | 지능의 정의와 튜링 테스트, 인공지능 윤리와 편향성(Bias) 지도 | 기술의 목적은 인간을 돕고 세상의 문제를 해결하는 데 있음을 강조 |
| **🔬 딥러닝 (Deep Learning)** | 신경망 | 퍼셉트론에서 출발하여 활성화 함수, 역전파(Backpropagation)의 미적분학적 직관 전수 | 수식에 겁먹지 않고 기하학적 경사하강법의 시각적 원리를 깨닫도록 유도 |
| **🤖 강화학습 (RL)** | 자율제어 | 마르코프 결정 과정(MDP), 벨만 방정식(Bellman Equation) 유도 및 가치 함수와 정책 신경망 연결 | 실패(감점)를 겪으며 정책을 스스로 최적화하는 에이전트의 끈기 교육 |
| **🔒 연합학습 (Federated Learning)** | 분산 프라이버시 | FedAvg 알고리즘 설계, 차분 프라이버시(DP) 아키텍처 및 엣지 노드 최적화 | "데이터는 로컬에, 지능은 글로벌에"라는 차세대 프라이버시 철학 교육 |
| **🐍 파이썬 (Python)** | 코어 언어 | 파이써닉(Pythonic)한 클린 코드, 제너레이터/이터레이터, GIL과 멀티프로세싱 구조 | 유연함 속에 숨겨진 메모리 관리와 성능 트레이드오프 분석 |
| **🌐 자바스크립트 (JS)** | 프론트엔드 | 비동기 논블로킹 I/O, 이벤트 루프(Call Stack & Task Queue), 클라이언트 렌더링 최적화 | 웹을 소프트웨어의 유니버설 플랫폼으로 이해하도록 지도 |
| **☕ 자바 (Java)** | 엔터프라이즈 | 객체지향 4대 원칙(캡슐화, 상속, 다형성, 추상화), 디자인 패턴, JVM 가비지 컬렉션(GC) 구조 | 대규모 엔터프라이즈 시스템이 요구하는 타입 안정성과 유지보수성 체득 |
| **🐘 PHP** | 웹 백엔드 | 웹의 역사적 발전 과정, 동적 웹의 태동과 최신 PHP 8.x의 객체지향 현대화 | 레거시 기술을 존중하되 최신 패러다임으로 리팩토링하는 안목 배양 |
| **🔌 아두이노 (Arduino)** | 피지컬 컴퓨팅 | 옴의 법칙(V=IR), 시리얼 통신(UART/SPI/I2C), 인터럽트 처리 및 노이즈 디바운싱 | 소프트웨어 코드가 전자의 물리적 흐름과 만나는 첫 관문 안내 |
| **🍓 라즈베리파이 (Raspberry Pi)** | 싱글보드/엣지AI | MCU(아두이노) vs SBC(라즈베리파이) 아키텍처 차이, 리눅스 커널 기반 하드웨어 제어 | 엣지 디바이스에서 직접 인공지능 추론(Edge AI)을 구동하는 안목 제시 |
| **🐬 MySQL** | 관계형 DB | ACID 원칙, B-Tree 인덱스 내부 구조, 데이터 무결성과 트랜잭션 격리 수준(Isolation Level) | 데이터베이스 설계가 소프트웨어의 척추임을 인식하도록 지도 |
| **🐘 PostgreSQL** | 고급 RDBMS | MVCC 동시성 제어 모델, 비정형 JSONB와 정형 RDB의 조화, 복합 쿼리 플랜 최적화 | 오픈소스 고급 관계형 데이터베이스의 확장성과 신뢰성 지도 |
| **🐳 도커 (Docker)** | 컨테이너 가상화 | 가상머신(Hypervisor) vs 컨테이너(Namespace/Cgroups)의 커널 공유 구조, 환경 일관성의 힘 | "배포 가능한 코드만이 살아있는 소프트웨어다"라는 데브옵스 철학 전수 |
| **🐧 리눅스 (Linux CLI)** | 운영체제 | 파일 디스크립터, 파이프라인(`|`), 프로세스 라이프사이클 및 시스템 자원 모니터링 | 모든 현대 서버와 클라우드의 근간인 POSIX 리눅스 생태계 마스터 유도 |

