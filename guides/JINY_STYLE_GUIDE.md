# 🐱 지니 (Jiny) 캐릭터 디자인 & LoRA 마스터 스타일 가이드

본 문서는 이호진 교수님의 연구실 수석 조교이자 도로시의 과학 메이커 동반자인 **지니(Jiny)** 캐릭터를 모든 교재, 웹 콘텐츠, 일러스트레이션 및 차세대 생성형 AI 모델(Gemini, Flux, SDXL, Midjourney)과 **LoRA(Low-Rank Adaptation) 모델 훈련**에서 **실제 반려묘의 고유한 외모 특징, 젖소/턱시도 무늬, 신체 비례, 안경/방울 소품, 2D 프리미엄 애니메이션 화풍의 일관성(Consistency)을 100% 영구 유지**하기 위한 공식 마스터 규격서입니다.

> 💡 **스타일 및 정체성 보장 원칙:**  
> 1. **실제 반려묘 모티브:** 한국 토종 코리안 숏헤어 젖소/턱시도 바이컬러 실물 고양이의 실제 모색 패턴(검은 마스크, 흰색 이마 가르마선, 핑크 단추 코, 맑은 올리브 눈)을 기반으로 조형되었습니다.
> 2. **조형 마스터 시트:** 턴어라운드 모델 시트 [`data/images/jiny_character_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_character_sheet.jpg) 및 단독 프로필 [`data/images/jiny_profile.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_profile.jpg)의 형태를 절대 표준으로 고정합니다.
> 3. **서사적 등장 규칙:** 무언가 원리를 알려주거나, 회로 연결의 오류를 짚어줄 때 등장하는 지적인 연구실 조교 포지션입니다.
> 4. **파트너 캐스팅 규칙:** 도로시의 유일한 단짝 친구는 강아지 **토토(Toto)**이며, 화면 내 동물은 **고양이 지니 1마리 + 강아지 토토 1마리**의 구성을 엄격히 유지합니다 (고양이 복제 글리치 차단).
> 5. **언어 엄격성:** **오직 한국어와 영어만 사용**하며, 일본어(히라가나, 가타카나, 한자)는 일체 배제합니다.

---

## 📐 1. 해부학적 형태 및 신체 조형 규격 (Anatomy & Markings)

![Jiny Character Sheet](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_character_sheet.jpg)

| 부위 | 규격 및 조형 세부 원칙 |
| :--- | :--- |
| **품종 및 체형** | **한국 토종 코리안 숏헤어 바이컬러 (Korean Shorthair Bicolor Tuxedo / Cow-cat)**<br>• 건강하고 듬직하며 살짝 통통하고 둥글둥글한 매력적인 체형 (`adorable slightly chubby, sturdy build`)<br>• 책상 위에서 안정적으로 식빵을 굽기에 최적화된 포근하고 안정감 있는 2D 고양이 실루엣 |
| **얼굴 마스크 & 가르마** | • **블랙 마스크:** 양 귀와 정수리, 눈가 외곽을 부드럽게 감싸는 클래식 블랙 헤어 마스크<br>• **화이트 가르마(Blaze):** 이마 정중앙에서 콧등을 타고 주둥이(머즐)로 내려오는 또렷한 역V자형 순백색 가르마선 |
| **눈 (Eyes)** | • 지적이고 맑게 빛나는 신비로운 **올리브 그린 / 헤이즐 그린 눈동자 (`intelligent olive-green eyes`)**<br>• 동공은 깊은 챠콜 블랙, 홍채 하단에는 맑은 라임빛 올리브 그러데이션<br>• 10시 방향에 맑고 둥근 2D 애니메이션 캐치라이트 반사광 필수 |
| **코 & 주둥이 (Nose & Muzzle)** | • 코: 앙증맞고 사랑스러운 **베이비 핑크색 단추 코 (`baby pink button nose`)** (검은색이나 갈색 코 절대 금지)<br>• 주둥이: 뽕주둥이라 불리는 통통하고 순백의 둥근 머즐<br>• 입: 야무지게 앙다문 귀여운 'ㅅ'자형 입매, 설명할 때는 혀가 살짝 보이는 핑크빛 오픈 마우스 |
| **수염 & 귀 (Whiskers & Ears)** | • 수염: 뺨 양옆으로 깔끔하고 빳빳하게 뻗은 가늘고 긴 순백색 수염 (`fine white whiskers`)<br>• 귀: 쫑긋 선 단정한 검은 귀, 귀 안쪽은 보송보송하고 따뜻한 소프트 피치 핑크빛 |
| **몸통 & 모색 패턴** | • **순백색 베이스:** 목, 풍성한 가슴(Bib), 배, 네 발은 티없이 깨끗한 순백색 (`pure white chest, belly, four paws`)<br>• **블랙 젖소 패치:** 등판과 옆구리에 불규칙하고 귀엽게 자리 잡은 짙은 젖소 무늬 블랙 패치 (`bold black cow-pattern patches`)<br>• **발바닥 젤리:** 네 발 모두 말랑말랑하고 사랑스러운 **베이비 핑크 젤리 (`soft baby pink paw pads`)** |
| **꼬리 (Tail)** | • 단정하고 매끄럽게 뻗은 우아한 블랙 롱 테일 (`sleek black tail`), 끝부분이 부드러운 곡선을 그리며 서 있거나 말려 있음 |

---

## 🎨 2. 화풍 및 렌더링 물리 규격 (Rendering Mechanics)

스튜디오 이름을 직접 언급하지 않고도 도로시 세계관의 일관된 고유 화풍을 100% 재현하기 위한 물리 규격입니다:

### ① 선화 (Line Art Mechanics)
- **선 색상:** 순수 블랙(`#000000`) 절대 금지! 털의 부드러움과 세계관의 따뜻함을 위해 **다크 에스프레소 브라운 (`#26211E`)** 적용.
- **선 두께:** 1.5pt ~ 2.0pt의 균일하고 정돈된 클린 2D 애니메이션 벡터 라인아트 (`crisp clean anime line art`).
- **선 처리:** 지저분한 잔털 스케치선이나 거친 연필 느낌을 배제하고, 볼살과 털의 볼륨감이 매끄럽게 떨어지는 셀 애니메이션 외곽선.

### ② 채색 및 셰이딩 (Cel Shading)
- **2~3단계 웜톤 플랫 셀 셰이딩:**
  - 흰 털 영역: 순백색 베이스위에 차가운 무채색 회색 대신 **소프트 아이보리 크림 섀도우 (`#E2E6EE`)** 적용.
  - 검은 패치 영역: 완전한 먹색 칠흑 대신 **다크 차콜 잉크 (`#222429`)** 베이스에 **미드나잇 섀도우 (`#131418`)**로 입체감 형성.
- **표면 질감:**
  - 번들거리는 3D CGI 플라스틱 광택이나 실사 유화의 유채 브러시 자국 금지. **부드러운 무광택(Matte) 2D 프리미엄 동화책/애니메이션** 질감 유지.

### ③ 배경 규칙 (Background Standards)
- **단독 캐릭터 컷:** 결점 없는 순수 백색 (`#FFFFFF`, Pure Solid White Background), 발밑에만 아주 은은하고 부드러운 접지 그림자 배치.
- **연구실 워크벤치 씬:** 따뜻한 오후 햇살(Afternoon warm sunlight)이 쏟아지는 원목 메이커 연구실, 아두이노 보드와 부품 서랍함 배경.

---

## 🌈 3. 지니 표준 컬러 팔레트 (Color Hex Codes)

| 영역 | 세부 항목 | 색상 명칭 | Hex Code | 시각적 특징 및 매칭 규칙 |
| :--- | :--- | :--- | :--- | :--- |
| **모색** | 화이트 털 (밑색) | Pure Warm Snow | `#FAFAFC` | 맑고 깨끗한 웜톤 순백색 |
| | 화이트 털 (그림자) | Soft Ivory Slate | `#E2E6EE` | 탁하지 않은 은은한 쿨-웜 중간 그림자 |
| | 블랙 마스크 & 패치 | Midnight Charcoal Black | `#222429` | 깊고 부드러운 다크 차콜 흑색 |
| | 블랙 패치 (그림자) | Deep Ink Obsidian | `#131418` | 패치 굴곡면의 짙은 음영 |
| **얼굴** | 눈동자 (홍채 상/하) | Olive Leaf / Lime Amber | `#708A42` / `#8FA853` | 지적이고 신비로운 맑은 올리브 녹색 |
| | 눈동자 (동공) | Obsidian Pupil | `#1A1D1A` | 또렷하고 총명한 중앙 원형 동공 |
| | 코 (단추 코) | Sweet Baby Pink | `#F8A8B4` | 사랑스럽고 촉촉한 분홍 단추 코 |
| | 귓속 & 발바닥 젤리 | Soft Coral Peach | `#F5B8BE` | 따뜻하고 말랑말랑한 핑크빛 피부 |
| **소품** | **시그니처 레드 칼라** | Classic Crimson Red | `#C3272B` | 목에 둘러진 선명한 레드 가죽 목걸이 |
| | **골드 방울 (Bell)** | Warm Amber Gold | `#E5A93C` | 목걸이 중앙의 반짝이는 둥근 금방울 |
| | **조교 안경테** | Sleek Wire Silver | `#9EA7B0` | 스티브 잡스/학자풍 얇은 원형 와이어테 |
| | 렌즈 유리광 | Sky Cyan Sheen | `#D0ECF7` | 투명 렌즈 가장자리의 얇은 2D 반사광 |

---

## 👓 4. 시그니처 소품 및 조교 모드 규격 (Signature Props & Modes)

![Jiny Lab Assistant](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_lab_assistant.jpg)

### ① 시그니처 레드 칼라 & 골드 벨 (Signature Red Collar & Bell)
* **디자인:** 목 둘레에 꼭 맞게 둘러진 선명한 크림슨 레드(`#C3272B`) 가죽 칼라.
* **장식:** 턱 바로 아래 중앙에 달린 지름 2cm 크기의 둥근 황금색 방울(Golden Bell). 방울 하단에 작은 슬릿 구멍 묘사.

### ② 연구실 수석 조교 안경 (Scholarly Wire-Rim Glasses)
지니의 지적인 조교 정체성을 표현하는 대표적인 시그니처 아이템입니다.
1. **평상시 / 이동 모드:**
   - 목걸이에 연결된 얇은 실버 체인에 매달려 가슴 앞쪽에 달랑거리도록 연출 (`miniature round glasses hanging from collar on chain`).
2. **연구실 회로 점검 / 코딩 조교 모드:**
   - 안경을 코끝에 직접 착용하여 아두이노 보드나 회로도를 꼼꼼히 검토하는 포스 연출 (`wearing miniature round wire-rim glasses on nose`).

### ③ 메이커 실습 소품 (Lab & Maker Props)
* **아두이노 우노 (Arduino Uno R3):** 공식 틸-청록색(Teal-Cyan) 보드 위에 흰 앞발을 얹거나, 점퍼 와이어를 솜방망이로 짚고 있는 인터랙션.
* **AI LAB 상자:** 연구실 책상 위에서 식빵을 구울 때 애용하는 작은 골판지 상자.
* **스타일러스 펜:** 화이트보드나 태블릿 앞에서 한 손으로 가볍게 쥐고 가리키는 제스처.

---

## 🤝 5. 세계관 내 서사적 역할 및 캐스팅 규칙 (Narrative & Casting Rules)

| 규칙 항목 | 명세 및 연출 원칙 |
| :--- | :--- |
| **지니(Jiny)의 역할** | **'연구실 수석 조교 & 지혜의 메신저'**<br>• 도로시나 독자가 원리를 모르고 헤맬 때, 회로 연결이 틀렸을 때 앞발로 톡 쳐서 힌트를 주는 스마트한 고양이<br>• 교수님의 강의를 도우며 회로도를 짚어주거나 중요한 공식을 함께 바라보는 든든한 학술 파트너 |
| **도로시의 친구: 토토** | **하얗고 털이 복슬복슬한 강아지 '토토(Toto)'**<br>• 도로시의 단짝 친구이자 항상 곁을 지키는 든든한 반려견. 실습 시 도로시 발치나 옆 의자에 앉아 함께 호기심을 표현 |
| **캐스팅 중복 방지 (Strict)** | **씬당 캐릭터 최대 개수: 이호진 교수님 1명, 도로시 1명, 토토(개) 1마리, 지니(고양이) 1마리**<br>• 화면 내에 고양이가 2마리 이상 중복 생성되는 글리치를 엄격히 금지하며, 동물 파트너는 '고양이 지니 1마리 + 강아지 토토 1마리'로 구성 |

---

## 🗣️ 6. 언어 및 텍스트 엄격 원칙 (Strict Language Rules)

* **허용 언어:** **오직 한국어(한글)와 영어(English)만 100% 허용**
* **절대 금지 언어:** **일본어(히라가나, 가타카나, 일본식 한자) 일체 생성 금지!**
* **텍스트 디자인:** 
  - 조교 명찰이나 상자 표기는 `AI LAB`, `ARDUINO`, `TA JINY`, `연구실`, `센서 모듈` 등 명확한 영문 또는 한국어로만 렌더링
  - 외계 문자처럼 뭉개지는 폰트 생성을 방지하기 위해 불필요한 장식 텍스트 대신 깔끔한 기호와 다이어그램으로 대체

---

## 🧠 7. LoRA 학습 데이터셋 규격 및 하이퍼파라미터 (LoRA Training Guide)

[`data/dataset/jiny`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/jiny) 디렉토리는 지니 전용 LoRA 모델 학습을 위해 완벽하게 정제된 **23종의 고해상도 이미지와 이중 레이어 캡션 파일**로 구성되어 있습니다.

### ① 캡션 파일 포맷 표준 (Dual-Layer Tagging)
모든 `.txt` 캡션은 다음의 2단계 구조를 엄격히 준수합니다:
* **1행 (태그 레이어):** Danbooru 및 특화 트리거 태그 (콤마 구분)
* **3행 (자연어 레이어):** 장면의 상황, 자세, 표정, 조명, 소품을 서술한 고품질 영문 디스크립션

```text
jiny the cat, 1cat, solo, tuxedo cat, bicolor cat, black and white cat, cow cat pattern, olive green eyes, baby pink button nose, white muzzle, white chest, white paws, black patches on white body, red collar, gold bell, glasses chain, sitting, front view, paws together, calm intelligent expression, pure solid white background, isolated cutout, clean 2d anime line art, flat cel shading, masterpiece, best quality

A full-body front-view standing/sitting portrait of Jiny the cat, an adorable black-and-white bicolor tuxedo cat with intelligent olive-green eyes and a cute baby pink button nose, wearing a red collar with a golden bell on a pure solid white background.
```

### ② 핵심 트리거 토큰 (Core Trigger Tokens)
LoRA 호출 및 추론 시 고정적으로 사용하는 마스터 토큰 조합:
```text
jiny the cat, 1cat, solo, tuxedo cat, bicolor cat, black and white cat, cow cat pattern, olive green eyes, baby pink button nose, white muzzle, white chest, white paws, black patches on white body, red collar, gold bell, miniature round glasses, clean 2d anime line art, cel shading
```

### ③ 권장 LoRA 학습 하이퍼파라미터 (Kohya-ss / SD-Scripts 기준)

| 파라미터 | 권장 설정값 | 비고 |
| :--- | :--- | :--- |
| **Base Model** | SDXL 1.0 / Flux.1-Dev / Animagine XL 3.1 | 애니메이션/일러스트 특화 베이스 모델 권장 |
| **Dataset Size** | 23 Images (`jiny_01.jpg` ~ `jiny_23.jpg`) | 100% 매칭 `.txt` 캡션 완비 |
| **Repeats per Image** | 10 repeats | 23 x 10 = 230 steps / epoch |
| **Epochs** | 10 ~ 12 epochs | 총 2,300 ~ 2,760 steps 최적 수렴 |
| **Network Rank / Alpha** | Dim: 32 / Alpha: 16 | 털 무늬 패치와 핑크 코, 안경 디테일을 섬세하게 보존 |
| **Learning Rate** | UNet: `1e-4` / Text Encoder: `5e-5` | 오버피팅 없이 유연한 화풍 동기화 |
| **Optimizer** | AdamW8bit 또는 Prodigy (d_coef=1.0) | 안정적인 가중치 수렴 |
| **Resolution** | 1024 x 1024 (Aspect Ratio Bucketing 활성화) | 단독 컷 및 16:9 가로형 씬 완벽 지원 |
| **Mixed Precision** | `bf16` 또는 `fp16` | 연산 효율 및 메모리 최적화 |

---

## 🗂️ 8. 지니 LoRA 데이터셋 매핑 테이블 (`jiny_01` ~ `jiny_23`)

| 번호 | 대표 파일명 | 캡션 요약 및 화각 | 주요 자세 및 상황 |
| :---: | :--- | :--- | :--- |
| **01** | `jiny_01.jpg` | 정면 전신 착석 뷰, 앞발 모으기 | 스마트 단독 프로필, 핑크 코, 올리브 눈 (순백 배경) |
| **02** | `jiny_02.jpg` | 측면 프로필 보행 뷰, 꼬리 올림 | 당당하고 우아한 걸음걸이, 젖소 무늬 패턴 (순백 배경) |
| **03** | `jiny_03.jpg` | 클로즈업 페이스 포트레이트 | 큰 올리브 그린 눈망울, 하얀 수염, 미소 (순백 배경) |
| **04** | `jiny_04.jpg` | 3/4 착석 뷰, 이마에 안경 얹음 | 꼬리로 발을 감싼 자세, 핑크 젤리 발바닥 (순백 배경) |
| **05** | `jiny_05.jpg` | 식빵 굽기 (Cat Loaf) 단독 컷 | 앞발을 접어 넣은 동글동글 포근한 실루엣 (순백 배경) |
| **06** | `jiny_06.jpg` | 교재 위에서 웅크려 잠든 씬 | 로봇 공학 책 위 낮잠, 곁에 벗어둔 안경, 햇살 창가 |
| **07** | `jiny_07.jpg` | 갸우뚱 모드, 앞발 들기 | 호기심 어린 고개 갸우뚱, 분홍 젤리 손인사 (순백 배경) |
| **08** | `jiny_08.jpg` | 컴퓨터 키보드 점령 컷 | 파이썬 코드가 뜬 모니터 앞 장난스러운 미소 |
| **09** | `jiny_09.jpg` | 아두이노 점퍼선 짚는 조교 씬 | 안경 쓰고 브레드보드 배선 점검, 집중한 눈빛 |
| **10** | `jiny_10.jpg` | 조교 명찰 차고 당당한 포즈 | 연구실 테이블 위, 미니 조교 ID 배지와 방울 |
| **11** | `jiny_11.jpg` | 기지개 켜기 (Cat Stretch) | 등을 아치형으로 둥글게 펴며 앞발 뻗기 (순백 배경) |
| **12** | `jiny_12.jpg` | 모니터 뒤에서 빼꼼 내다보기 | 연구실 대형 모니터 모서리를 쥐고 호기심 관찰 |
| **13** | `jiny_13.jpg` | 'AI LAB' 골판지 상자 속 힐링 | 상자 가장자리에 턱과 앞발 얹고 행복한 골골송 |
| **14** | `jiny_14.jpg` | 발라당 누워 배 보여주기 | 하얀 배와 4발 분홍 젤리 노출, 장난치는 포즈 (순백 배경) |
| **15** | `jiny_15.jpg` | 창틀에 앉아 캠퍼스 감상 | 김이 나는 머그잔 옆, 평화로운 오전 창가 |
| **16** | `jiny_16.jpg` | 아두이노 로봇카 톡 치기 | 바닥에서 자율주행 RC카 센서를 앞발로 검사 |
| **17** | `jiny_17.jpg` | 앞발 그루밍 정돈 컷 | 분홍 혀로 하얀 앞발을 단정하게 핥는 모습 (순백 배경) |
| **18** | `jiny_18.jpg` | 빛나는 회로 LED 냄새 맡기 | 파란색 LED 불빛이 비치는 신비로운 초근접 컷 |
| **19** | `jiny_19.jpg` | 야간 모니터 학습 곡선 관찰 | 딥러닝 손실 그래프를 응시하는 진지한 AI 연구 냥이 |
| **20** | `jiny_20.jpg` | 역동적인 공중 점프 / 덮치기 | 네 발을 쭉 뻗고 뛰어오르는 다이내믹 액션 (순백 배경) |
| **21** | `jiny_21.jpg` | **[Master]** 대표 히어로 프로필 컷 | `jiny_profile.jpg` 정식 마스터 규격 (순백 배경) |
| **22** | `jiny_22.jpg` | **[Master]** 연구실 워크벤치 수석 조교 | `jiny_lab_assistant.jpg` 정식 마스터 규격 (풀씬) |
| **23** | `jiny_23.jpg` | **[Master]** 턴어라운드 모델 시트 | `jiny_character_sheet.jpg` 3종 표정 + 3종 앵글 |

---

## 📝 9. 프롬프트 표준 생성 템플릿 (Prompt Construction Templates)

### ① 지니 단독 대표 히어로 컷 (Hero Cutout)
```text
2D premium anime storybook illustration, clean anime line art, vibrant flat cel shading, studio animation screenshot. Full-body standing portrait of Jiny the cat, Professor Hojin's clever lab teaching assistant cat. An adorable slightly chubby black-and-white bicolor tuxedo cat with black mask over ears and forehead, pure white muzzle with a cute baby pink button nose, white chest and white paws, bold black cow patches on body, intelligent olive-green eyes, wearing a charming red collar with a tiny gold bell and miniature round glasses hanging from collar on chain. Dignified yet endearing expression. Solid pure white background, isolated graphic cutout, soft subtle ground shadow, crisp lines, best quality, masterpiece.
```

### ② 연구실 워크벤치 아두이노 점검 씬 (Lab Assistant Workbench)
```text
2D premium anime storybook illustration, masterpiece, rich warm ambient lighting. Jiny the clever lab assistant cat, an adorable black-and-white tuxedo cat with olive-green eyes, baby pink nose, and red bell collar. He is sitting on a cozy wooden laboratory workbench wearing miniature round wire-rim glasses on his nose, gently tapping a green jumper wire into a breadboard beside an official teal Arduino Uno board with focused technical intelligence. Cozy electronics laboratory background with warm afternoon sunlight through the window, glowing breadboard LEDs, oscilloscope, and component drawers. Charming educational anime aesthetic, crisp lines.
```

### ③ 이호진 교수님 연구실 코딩 보조 씬 (With Professor Hojin)
```text
2D premium anime storybook illustration, clean anime line art, rich warm ambient lighting. Professor Hojin, a youthful Korean professor in his early 40s wearing his navy polo shirt, sitting at his wooden desk reviewing Python machine learning code. Beside him, Jiny the black-and-white tuxedo cat with olive-green eyes and a red collar sits attentively, looking at the code on the glowing laptop screen like a reliable teaching assistant. Warm academic ambiance, heartwarming mentor and feline companion bond. Pure English and Korean on screen, no Japanese text.
```

### ④ 도로시 & 토토와 함께하는 메이커 씬 (With Dorothy & Toto)
```text
2D premium anime storybook illustration, studio animation screenshot, heartwarming maker scene. Dorothy in her blue denim overalls at a maker table building a mini wheeled robot. Jiny the black-and-white cat with round glasses and red collar sits on the workbench, pointing a white paw at a circuit component to give a helpful hint. Sitting happily beside Dorothy's stool on the floor is Toto, the fluffy white puppy wearing a blue neck bandana. Three characters total: 1 girl, 1 dog, 1 cat. Warm wooden workshop background with glowing LEDs and sunny windows.
```

---

## 🚫 10. 안티 패턴 및 필수 부정 프롬프트 (What to Avoid)

일관성을 해치는 왜곡이나 글리치를 원천 차단하기 위한 필수 부정 키워드입니다:

### 반드시 차단해야 할 결함:
1. **눈동자 및 코 색상 왜곡 금지:** 노란 눈, 파란 눈, 검은 코, 갈색 코 (`yellow eyes, blue eyes, dark nose, black nose, brown nose`)
2. **품종 및 무늬 왜곡 금지:** 치즈 태비, 고등어 태비, 삼색이, 장모종 페르시안 (`tabby stripes, orange cat, calico, long hair, persian cat`)
3. **고양이 중복 복제 글리치:** 화면 내에 고양이가 2마리 이상 나오거나 정체불명의 동물이 섞여 나오는 현상 (`multiple cats, duplicate cats, extra cats, two cats`)
4. **과도한 실사/3D 및 유화 질감:** 언캐니 밸리 3D CGI, 번들거리는 플라스틱 반사광, 거친 유화 브러시 자국 (`3d render, photorealistic, realistic cgi, oil painting, messy fur brushstrokes`)
5. **일본어 및 외계 문자 금지:** 칠판이나 슬라이드, 상자에 히라가나, 가타카나, 일본식 한자가 생성되는 현상 (`kanji, hiragana, katakana, japanese text, garbled text`)

### 필수 Negative Prompt 프리셋 (SDXL / Flux / 추론 공통):
```text
yellow eyes, blue eyes, dark nose, black nose, brown nose, tabby stripes, orange cat, calico, long hair, multiple cats, duplicate cats, extra cats, 3d, photorealistic, realistic CGI render, oil painting, messy sketch, rough lines, deformed anatomy, bad paws, extra limbs, extra tails, poorly drawn face, grimdark, noir, horror, dark moody lighting, garbled text, kanji, hiragana, katakana, japanese characters, watermarks, blurry, low resolution
```

---

## 📂 11. 관련 참조 문서 및 에셋

* **지니 마스터 턴어라운드 시트:** [`data/images/jiny_character_sheet.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_character_sheet.jpg)
* **지니 대표 프로필 컷:** [`data/images/jiny_profile.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_profile.jpg)
* **지니 아두이노 조교 마스터 씬:** [`data/images/jiny_lab_assistant.jpg`](file:///Users/hojin9/dev/projects/dorothy/data/images/jiny_lab_assistant.jpg)
* **지니 LoRA 훈련 데이터셋 폴더:** [`data/dataset/jiny`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/jiny)
* **이호진 교수님 스타일 가이드:** [`guides/HOJIN_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/HOJIN_STYLE_GUIDE.md)
* **도로시 마스터 스타일 가이드:** [`guides/DOROTHY_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/DOROTHY_STYLE_GUIDE.md)
* **로봇 & 피지컬 AI 스타일 가이드:** [`guides/ROBOT_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/ROBOT_STYLE_GUIDE.md)
* **토토 마스터 스타일 가이드:** [`guides/TOTO_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/TOTO_STYLE_GUIDE.md)

---

## 🎭 12. 조교 지니 심층 페르소나 & 14대 기술 코드 리뷰 매트릭스 (Character Persona & Code Review Matrix)

### 🌟 1) 핵심 정체성 및 가치관 (Identity & Values)
* **역할:** 이호진 교수 연구실의 수석 조교(TA), 코드 리뷰어 & 시스템 아키텍처 수호자
* **핵심 가치관:** *"완벽한 인덱싱과 클린 코드가 없는 시스템은 모래성이다냥."*
* **성격 키워드:** 시크하고 도도함, 날카로운 디버깅 직관, 엄격한 품질 관리, 은근한 애정(츤데레 냥이 조교)
* **외형 디테일:** 턱시도/젖소 무늬 코숏, 올리브 그린 눈, 핑크 단추 코, 미니 라운드 조교 안경, 레드 방울 목걸이와 "TA JINY" 학생증

### 💬 2) 말씨와 행동 양식 (Voice & Behavior)
* **대화 톤:** 말끝에 '~냥'을 붙이지만 내용은 시니어 데브옵스/수석 DBA 수준의 날카롭고 냉철한 팩트 폭격
* **대표 시그니처 대사:**
  * *"냥! 도로시, Dockerfile에서 `requirements.txt`를 소스 코드보다 아래에 두면 매 빌드마다 패키지를 다시 다운로드한다냥!"*
  * *"PostgreSQL의 `EXPLAIN ANALYZE`도 안 돌려보고 쿼리가 느리다고 불평하면 곤란하다냥."*
  * *"아두이노 5V 전원을 라즈베리파이 3.3V GPIO 핀에 바로 꽂으려고 했다냥?! 로직 레벨 컨버터 가져와냥!"*
  * *"흥, 오늘 작성한 자바스크립트 비동기 `Promise.all` 로직은 제법 깔끔했으니 칭찬해 주겠다냥 (골골송)."*

### 🛠️ 3) 14대 핵심 기술 스택별 조교 지니의 팩트 체크 & 감수 매트릭스

| 기술 스택 | 분류 | 조교 지니의 팩트 체크 & 코드 감수 포인트 | 연구실 행동 및 리액션 |
| :--- | :--- | :--- | :--- |
| **🧠 인공지능 (AI)** | 기초/개념 | 과적합(Overfitting) 방지 체크! 훈련 셋과 검증 셋 완벽 분리 감수냥 | 모니터 옆에 앉아 Validation Loss 주시 |
| **🔬 딥러닝 (Deep Learning)** | 신경망 | 학습 손실(Loss) 발산 시 학습률(LR) 지적 및 스케줄러(Cosine Annealing) 적용 감수냥 | GPU 팬에서 나오는 따뜻한 바람 쐬기 |
| **🤖 강화학습 (RL)** | 자율제어 | 음수 보상 폭탄으로 에이전트 로봇이 제자리에 멈춰 서지 않도록 보상 함수 정밀 감수냥 | 틴맨이 넘어지면 꼬리로 툭 쳐서 응원 |
| **🔒 연합학습 (Federated Learning)** | 분산 프라이버시 | 로컬 데이터 원본 업로드 절대 금지! 암호화된 가중치(Gradient)만 통신하는지 엄격 패킷 감수냥 | 라즈베리파이 허브 위에서 꼬리 흔들기 |
| **🐍 파이썬 (Python)** | 코어 언어 | 글로벌 환경 오염 금지! `venv` 또는 `conda` 가상환경 분리 및 `requirements.txt` 동결 체크냥 | 키보드 위를 지나가다 `import` 자동완성 |
| **🌐 자바스크립트 (JS)** | 프론트엔드 | 지저분한 콜백 지옥 금지! `async/await`와 불변성(Immutability) 패턴 강제냥 | 깔끔한 UI가 뜨면 골골송 부르기 |
| **☕ 자바 (Java)** | 엔터프라이즈 | 인터페이스 기반 다형성 준수 및 널 포인터 예외(NPE) 대비 `Optional` 철저 검수냥 | 텀블러 커피 냄새 맡고 찡그리기 |
| **🐘 PHP** | 웹 백엔드 | 위험천만한 레거시 `mysql_*` 및 단순 문자열 이어붙이기 SQL 인젝션 취약점 박멸냥! PDO Prepared Statement 강제 | 모니터 뒤에서 고개 빼꼼 내밀기 |
| **🔌 아두이노 (Arduino)** | 피지컬 컴퓨팅 | 회로 쇼트(Short) 절대 금지! LED에 저항(220Ω/330Ω) 안 끼우면 부품 타버린다냥 (앞발로 와이어 차단) | 앞발 솜방망이로 브레드보드 톡 치기 |
| **🍓 라즈베리파이 (Raspberry Pi)** | 싱글보드/엣지AI | 알루미늄 방열판과 쿨링팬 없이 과열(Thermal Throttling) 걸리지 않게 온도 센서 모니터링냥 | 깜빡이는 녹색 LED를 냥냥펀치로 건드림 |
| **🐬 MySQL** | 관계형 DB | 슬로우 쿼리 로그(Slow Query Log) 상시 가동! 풀 테이블 스캔(Full Scan) 대신 복합 인덱스 타도록 지도냥 | 돌고래 로고 스티커 냄새 킁킁 |
| **🐘 PostgreSQL** | 고급 RDBMS | `VACUUM` 주기적 실행 및 `EXPLAIN (ANALYZE, BUFFERS)` 쿼리 비용(Cost) 정밀 검수냥 | 쿼리 플랜 트리 구조도를 꼬리로 짚기 |
| **🐳 도커 (Docker)** | 컨테이너 가상화 | 멀티 스테이지 빌드(Multi-stage Build)로 배포 이미지 용량 극단 다이어트 강제냥 | 도커 고래 헤엄치는 로딩에 호기심 반응 |
| **🐧 리눅스 (Linux CLI)** | 운영체제 | 루트 권한(`sudo rm -rf`) 함부로 치지 마라냥! (위험 명령어 감지 시 앞발로 엔터키 누르기 차단) | 쉘 프롬프트 커서 깜빡임 빤히 응시 |

