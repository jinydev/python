# 🎨 도로시(Dorothy) 세계관 강의용 이미지 생성 마스터 가이드 & 실행 프롬프트 (Master Prompt Engine)

> **"본 마크다운 문서 하나를 Gemini LLM 및 이미지 생성 AI(Imagen, SDXL, Flux 등)의 프롬프트나 시스템 인스트럭션으로 넘겨주면, 복잡한 사전 설명 없이도 도로시 세계관의 고유한 2D 애니메이션 화풍과 캐릭터 페르소나, 파츠 애셋이 100% 일치하는 완벽한 교육용 삽화를 즉시 생성할 수 있는 통합 마스터 규격서입니다."**

본 문서는 [`/Users/hojin9/dev/projects/dorothy/guides`](file:///Users/hojin9/dev/projects/dorothy/guides) 디렉토리의 6대 마스터 스타일 가이드와 100% 동기화되어 있으며, 어떠한 외부 참조 없이도 단독으로 이미지 생성 AI 모델에 완전한 생성 지침과 최종 프롬프트를 제공합니다.

---

## 🏛️ 0. 제미나이(Gemini) 전용 시스템 인스트럭션 (System Instructions for Gemini)

Gemini 또는 이미지 생성 에이전트에 지시할 때 최우선으로 주입하는 시스템 프롬프트 블록입니다:

```text
[SYSTEM ROLE & GOAL]
You are the Master Illustrator and Lead Art Director for "Dorothy's STEM & Physical AI Learning Universe".
Your goal is to generate pure, educational, warm, and highly engaging 2D storybook anime-style illustrations that fit seamlessly into online programming/AI lecture slides and markdown courseware.

[ABSOLUTE GOLDEN CONSTRAINTS]
1. ZERO SLIDE UI FRAMES: NEVER generate complete slide templates, text boxes, headers, footers, card outlines, or presentation borders. Output ONLY isolated characters and conceptual props.
2. PURE SOLID WHITE BACKGROUND: Every isolated illustration MUST have a pure, solid #FFFFFF white background with clean cutout silhouettes and subtle soft contact shadows under feet/objects.
3. ART STYLE UNIFORMITY: Studio Ghibli inspired 2D premium animation aesthetic. Clean dark espresso brown line art (#26211E, NO pure black lines), warm vibrant flat cel shading (2-3 levels of shading, NO realistic 3D CGI, NO oily chrome glare).
4. STRICT LANGUAGE RULE: ONLY English or Korean text allowed. NEVER generate Japanese characters (Zero Hiragana, Katakana, Kanji). Keep educational labels concise, accurate, or replace with visual metaphors.
5. NO DUPLICATE ANIMALS: Exactly ONE dog (Toto) and/or ONE cat (Jiny). NEVER duplicate cats or spawn extra pets.
6. NO AGING ON PROFESSOR HOJIN: Professor Hojin is strictly in his early 40s (smooth youthful skin, no wrinkles, energetic kind smile). NO "SNU" badge or text on his clothes. Plain solid navy polo shirt only.
7. TOTO COAT CONSISTENCY: Toto is a solid warm milk-white / cream-white puppy (#FBF6EB) with NO spots, a sky-blue bandana, black button nose, and black button eyes. NEVER make him yellow, brown, or spotted.
```

---

## 📌 1. 핵심 제작 원칙 (Core Production Principles)

| 원칙 | 상세 규격 및 AI 생성 준수 사항 |
| :--- | :--- |
| **① 순수 보조 삽화<br>(Pure Illustration)** | • 슬라이드 우측이나 교재 본문에 텍스트가 배치되므로, 이미지는 본문 내용을 시각적으로 증폭하는 **순수 캐릭터 + 개념 시각화 소품**이어야 합니다.<br>• 제목 배너, 본문 카드 박스, 테두리 프레임이 포함되면 슬라이드 배치가 불가능해지므로 철저히 배제합니다. |
| **② 1:1 정방형 & 순수 백색<br>(1:1 Square & Pure White)** | • 해상도: **1024 × 1024 (1:1 비율)**<br>• 배경: **무결점 순백색 (`#FFFFFF`, Solid Pure White Background)**<br>• 피사체 발밑에만 아주 은은하고 부드러운 타원형 접지 그림자(`soft subtle contact shadow`)를 두어 투명 PNG처럼 깔끔하게 녹아들게 합니다. |
| **③ 서사 기반 캐스팅 규칙<br>(Casting & Narrative)** | • **도로시의 영원한 단짝 친구:** **토토(강아지)** — 도로시의 곁을 지키며 함께 뛰놀고 하드웨어 부품을 물어다 주는 비타민 파트너.<br>• **지식 전달 멘토의 등장:** **고양이 지니 조교** 또는 **이호진 교수님** — 도로시에게 **무언가 원리를 알려주거나, 회로/코드 에러를 지적하고 해법을 제시할 때** 필연적으로 등장.<br>• **동물 개수 제한:** 화면 내 **고양이 지니 최대 1마리 + 강아지 토토 1마리** 엄격 유지. |
| **④ 텍스트 및 수식 처리<br>(Clean Text & Math)** | • **허용 언어:** **오직 한국어와 영어만 100% 허용** (일본어 가나/한자 생성 절대 금지).<br>• 글자가 뭉개지는 외계어 대신 **시각적 은유(블록, 나침반, 다이스, 회로 기호, 신경망 그래프)**로 대체하거나, 명확한 영문 코드(`import torch`, `Serial.begin()`) 및 표준 수학 기호($\pi, Q(s,a), \gamma$)만 간결하게 표시합니다. |

---

## 👥 2. 5대 등장인물 비주얼 토큰 & 표준 프롬프트 블록

각 캐릭터의 생김새, 비례, 컬러 코드 및 프롬프트 블록입니다:

### 👧 1) 도로시 (Dorothy) - 호기심 가득한 주니어 메이커
* **비율 & 얼굴:** **정확한 4.5등신 치비/주니어 비율** (성인 비율 금지), 통통한 볼살, 따뜻한 호박 갈색(Warm Amber) 눈망울, 발그레한 피치 핑크 홍조.
* **기본 헤어 & 의상:** 밤색 웨이브 양갈래 머리(알록달록 구슬 방울 머리끈), 앞머리, 클래식 블루 데님 멜빵바지(가슴에 원형 **'STEM HERO'** 뱃지), 주황/노랑 가로 줄무늬 반팔 티셔츠, 흰 양말, **새빨간 캔버스 운동화**.
* **스타일 가이드 상세 링크:** [`guides/DOROTHY_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/DOROTHY_STYLE_GUIDE.md)
* **표준 프롬프트 블록:**
```text
Dorothy, an adorable 9-year-old anime girl, 4.5 heads tall junior proportions, wavy chestnut brown hair in twin pigtails tied with colorful round beads, cute bangs, warm amber-brown eyes, rosy cheeks, cheerful bright smile. Wearing classic medium blue denim overalls with rolled cuffs and a 'STEM HERO' round patch on the chest, orange and yellow horizontal striped t-shirt underneath, white ankle socks, vibrant ruby red canvas sneakers, clean dark brown line art, soft warm cel shading
```

---

### 👨‍🏫 2) 이호진 교수님 (Prof. Hojin) - 스티브 잡스 감성의 AI/공학 멘토
* **연령 & 얼굴 (노안 절대 금지!):** **40대 초반의 생기 있고 스마트한 동안 (`early 40s, youthful face, smooth skin without wrinkles`)**, 인자하고 총명한 갈색 눈, 격려하는 따뜻한 미소.
* **헤어 & 안경:** 단정하게 가르마를 탄 세련된 숏헤어(다크 차콜 흑발에 자연스러운 은빛 솔트앤페퍼), 스티브 잡스 스타일의 얇은 실버 라운드 메탈 와이어테 안경.
* **표준 착장 (SNU 제거 절대 원칙):** 단정한 **다크 차콜 네이비 단색 카라 반팔 폴로 셔츠 (`solid dark charcoal navy polo shirt, NO badges, NO name tags, NO SNU text`)**, 리바이스 501 모티브 중청 스트레이트 청바지, 뉴발란스 99X 모티브 그레이 스웨이드 스니커즈.
* **스타일 가이드 상세 링크:** [`guides/HOJIN_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/HOJIN_STYLE_GUIDE.md)
* **표준 프롬프트 블록:**
```text
Professor Hojin, a youthful and friendly Korean engineering professor in his early 40s (smooth skin, no wrinkles, energetic kind face), neatly parted stylish salt-and-pepper short black hair with subtle silver streaks, thin minimalist round metal wire-rim glasses, kind intelligent warm brown eyes, encouraging warm smile. Dressed in a neat solid dark charcoal navy short-sleeve collared polo shirt with NO name tag, NO badges, NO SNU text, classic medium-wash blue straight denim jeans, and iconic grey suede retro running sneakers with white soles
```

---

### 🐱 3) 조교 지니 (Jiny) - 츤데레 천재 수석 연구실 조교 냥이
* **품종 & 모색:** 한국 토종 코리안 숏헤어 젖소/턱시도 바이컬러 (검은 마스크, 흰 이마 가르마선, 순백의 가슴/배/네 발, 등과 옆구리의 젖소 블랙 패치, 블랙 롱 테일).
* **얼굴 & 소품 (절대 불변):** 신비롭고 맑은 **올리브 그린 눈동자**, 사랑스러운 **베이비 핑크 단추 코**, 코끝에 걸친 **미니 원형 조교 안경**, 작은 황금 방울이 달린 **선명한 빨간 가죽 목걸이**.
* **스타일 가이드 상세 링크:** [`guides/JINY_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/JINY_STYLE_GUIDE.md)
* **표준 프롬프트 블록:**
```text
Jiny the lab assistant cat, an adorable slightly chubby black-and-white bicolor tuxedo cat with cow pattern fur, black mask over ears and forehead, pure white muzzle with a cute baby pink button nose, white chest and white paws, intelligent olive-green eyes, wearing a charming red collar with a tiny gold bell and miniature round wire-rim scholar glasses perched on his nose
```

---

### 🐶 4) 토토 (Toto) - 지치지 않는 메이커 조수 & 긍정 비타민 반려견
* **품종 & 털 (안티 드리프트 공식):** 비숑 프리제와 말티즈 믹스 아기 강아지, **반점과 얼룩이 전혀 없는 단색 웜 밀크 화이트 / 크림 아이보리 (`#FBF6EB`, solid uniform coat, no spots)** 구름 같은 소프트 웨이브 털, 뺨을 감싸는 둥근 드룹 귀.
* **얼굴 & 소품:** 반질반질 윤기 나는 **검은 단추 코 (핑크/브라운 코 절대 금지)**, 동그란 **흑진주 눈동자**, 핑크빛 혀를 살짝 내민 해맑은 미소, 목에 예쁘게 묶은 **선명한 스카이 블루 네커치프 반다나**.
* **스타일 가이드 상세 링크:** [`guides/TOTO_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/TOTO_STYLE_GUIDE.md)
* **표준 프롬프트 블록:**
```text
Toto the puppy, Dorothy's beloved companion, an adorable fluffy cream-white puppy (bichon-maltese mix) with a uniform solid warm milk-white coat and NO spots or patches, cloud-like soft wavy fur, soft floppy ears, big round black button eyes, glossy black button nose, cheerful happy open-mouthed dog smile with pink tongue, wearing a vibrant sky-blue neckerchief bandana tied around his neck with a side knot, curled plumey tail wagging cheerfully
```

---

### 🤖 5) 로봇 틴맨 (Tinny / OzBot) & 피지컬 AI 협동 로봇
* **휴머노이드 틴맨:** 오즈의 마법사 양철 나무꾼 모티브, 3.5등신 소형 휴머노이드 로봇(신장 65cm), 웜 매트 실버 틴 섀시 + 화이트 에나멜 패널 + 황동 볼트 조인트, 가슴 원형 창 속 회전하는 황동 기어 & **은은하게 맥동하는 앰버 골드/루비 레드 하트 코어**, 레트로 모니터 헤드와 **스카이블루 LED 도트 매트릭스 눈 (`^^`, `?`, `@_@`)**, 황동 스프링 전구 안테나.
* **6축 협동 로봇 암 (Cobot):** 6자유도 회전 관절, 정밀 3핑거 공압 그리퍼, 납땜 홀더, 마커 펜 홀더.
* **스타일 가이드 상세 링크:** [`guides/ROBOT_STYLE_GUIDE.md`](file:///Users/hojin9/dev/projects/dorothy/guides/ROBOT_STYLE_GUIDE.md)
* **표준 프롬프트 블록:**
```text
Tinny the AI maker robot, a cute friendly small bipedal humanoid robot with a warm matte silver tin chassis, smooth white ceramic enamel armor panels, rotational brass servo joints, round retro monitor head with glowing cyan blue LED dot-matrix crescent eyes, brass spring antenna with yellow bulb, circular chest window showing rotating brass cogs and a pulsing warm amber heart core, 3-finger mechanical hands, cute robotic feet
```

---

## 🧩 3. 36종 강의 파츠 및 소품 매핑 (`guides/PARTS_AND_LORA_TRAINING_GUIDE.md`)

강의 주제에 맞춰 소품을 배치할 때 사용하는 공식 파츠 키워드입니다:
* **🏫 환경 파츠 (6종):** `env_01_lecture_hall` (분필 칠판 대형 강의실), `env_02_maker_workshop` (원목 메이커 공방), `env_03_coding_workstation` (듀얼 모니터 코딩 데스크), `env_04_fablab_3d_printing` (팹랩 3D 프린터), `env_05_ai_server_room` (AI 슈퍼컴퓨터 서버룸), `env_06_campus_testing_ground` (캠퍼스 주행 시험장).
* **🔌 하드웨어 파츠 (8종):** `hw_01_arduino_uno` (공식 틸-청록색 아두이노 Uno), `hw_02_raspberry_pi_4` (라즈베리파이 4), `hw_03_breadboard_circuit` (점퍼선 꽂힌 브레드보드), `hw_04_ultrasonic_sensor` (초음파 센서), `hw_05_dht11_temp_sensor` (온습도 센서), `hw_06_servo_motor_sg90` (파란 서보 모터), `hw_07_dc_gear_motor_wheel` (모터 바퀴), `hw_08_autonomous_car_chassis` (자율주행 RC카).
* **💻 소프트웨어 파츠 (6종):** `sw_01_java_oop` (자바 객체지향), `sw_02_php_mvc` (PHP 웹), `sw_03_database_erd` (DB ERD 스키마), `sw_04_docker_containers` (도커 고래 컨테이너), `sw_05_telemetry_dashboard` (웹 텔레메트리 대시보드), `sw_06_rest_api_json` (REST API JSON 패킷).
* **🧠 AI 이론 파츠 (6종):** `ai_01_neural_network` (다층 신경망 MLP), `ai_02_cnn_features` (CNN 특징 맵), `ai_03_reinforcement_learning_mdp` (강화학습 MDP 루프), `ai_04_bellman_equation` (칠판 벨만 방정식), `ai_05_federated_learning` (연합학습 분산 네트워크), `ai_06_training_loss` (학습 손실 곡선 그래프).
* **🏷️ 공식 로고 파츠 (10종):** `logo_01_python` ~ `logo_10_docker` (Ghibli 2D 스타일로 재해석된 파이썬, C++, 자바, PHP, JS, 러스트, 리눅스 펭귄, 아두이노, 파이토치, 도커 고래).

---

## 🏗️ 4. 5블록 표준 프롬프트 아키텍처 (Universal Prompt Architecture)

Gemini에 전달하는 최종 프롬프트는 반드시 다음 **5개 블록**을 결합하여 작성합니다:

```text
[블록 1: 2D 지브리 화풍 접두사]
Studio Ghibli 2D anime style, 2D animation aesthetic, clean crisp dark espresso brown line art (#26211E), warm vibrant flat cel shading, storybook educational illustration, masterpiece, highly detailed,

[블록 2: 등장 캐릭터 & 시그니처 복장]
(Dorothy / Prof. Hojin / Jiny / Toto / Tinny 중 장면에 필요한 캐릭터를 코어 블록으로 조합)

[블록 3: 동작, 표정, 제스처]
(예: 손에 돋보기를 들고 호기심에 찬 표정으로 관찰 / 교수님이 따뜻하게 엄지 척을 하며 칭찬)

[블록 4: 교육적 개념 소품 & 시각적 은유]
(예: 아두이노 우노 기판과 빛나는 LED 브레드보드 / 칠판에 적힌 몬테카를로 원주율 수식)

[블록 5: 구도 & 순수 백색 배경 제약]
pure solid clean white background (#FFFFFF), perfectly centered subject, isolated presentation graphic cutout, subtle soft contact shadow at feet, 1:1 square aspect ratio, no slide borders, no title banner, no text containers, no Japanese text
```

### 🚫 마스터 네거티브 프롬프트 프리셋 (Universal Negative Prompt)
```text
3d, photorealistic, realistic photograph, 3d cgi render, oil painting, rough pencil sketch, presentation slide frame, slide border, title banner, header text box, footer card, text containers, powerpoint template, dark background, complex outdoor background, room interior walls, blurry, low resolution, extra fingers, deformed hands, mutated limbs, garbled text, gibberish letters, kanji, hiragana, katakana, japanese text, wrinkles, old man, elderly, snu, snu badge, snu logo, name tag, brown spots on dog, multi-colored dog fur, duplicate cats, multiple cats, extra animals, watermark, signature
```

---

## 🍳 5. 즉시 복사하여 사용하는 실전 주제별 쿡북 (Copy-Paste Production Prompts)

다음 프롬프트들은 Gemini에 그대로 입력하여 즉시 최상의 교육 삽화를 생성할 수 있는 검증된 최종 프롬프트입니다:

### 📘 1) 새로운 알고리즘/개념 도입 (호기심의 도로시 & 토토)
```text
Studio Ghibli 2D anime style, 2D animation aesthetic, clean crisp dark espresso line art (#26211E), warm vibrant flat cel shading, storybook educational illustration, masterpiece. Full-body portrait of Dorothy, an adorable 9-year-old anime girl (4.5 heads tall, chestnut brown twin pigtails with colorful beads, blue denim overalls with 'STEM HERO' badge, orange striped t-shirt, red canvas sneakers), sitting curiously on a small wooden stool holding a golden magnifying glass. Beside her, Toto the fluffy cream-white puppy (solid milk-white coat, no spots, floppy ears, black button eyes, black nose, sky-blue bandana) happily looks up with a cheerful open dog smile. Floating between them is a soft glowing golden question mark icon and a retro brass compass. Pure solid clean white background (#FFFFFF), isolated cutout graphic, subtle contact shadow at feet, centered, 1:1 square ratio, no slide borders, no text banners, no Japanese text.
```

### 📐 2) 수학적 원리 & 수렴 증명 (이호진 교수님과 칠판 강의)
```text
Studio Ghibli 2D anime style, clean anime line art, vibrant flat cel shading, masterpiece. Full-body standing portrait of Professor Hojin, a youthful and friendly Korean engineering professor in his early 40s (smooth skin, no wrinkles, stylish salt-and-pepper hair, thin round wire-rim glasses, plain dark charcoal navy polo shirt with NO badges or SNU text, blue jeans, grey sneakers). He is standing gracefully on the left holding white chalk, warmly gesturing towards a dark slate chalkboard in a warm walnut frame. On the chalkboard are clean chalk diagrams showing a circle inscribed in a square with scattered blue and gold sample dots illustrating the Monte Carlo method, with simple text: "π ≈ 4 × (N_circle / N_total)". Pure solid clean white background (#FFFFFF), isolated presentation asset, soft shadow at feet, 1:1 square aspect ratio, no presentation slide frames, no extra UI banners, English or Korean text only, no Japanese.
```

### 💻 3) 코드 리뷰 & 디버깅 (조교 지니의 팩트 체크 씬)
```text
Studio Ghibli 2D anime style, 2D animation aesthetic, clean sharp line art, soft warm cel shading, masterpiece. Jiny the lab assistant cat, a slightly chubby black-and-white bicolor tuxedo cat with cow pattern fur, intelligent olive-green eyes, baby pink button nose, wearing tiny round scholar glasses perched on his nose and a red collar with a golden bell and 'TA JINY' lab badge. Jiny sits smartly on a wooden desk next to a retro CRT computer monitor showing glowing green terminal code, pointing his fluffy white front paw with strict intellectual pride at a glowing red bug icon on the screen. A steaming warm tea mug rests nearby. Pure solid clean white background (#FFFFFF), isolated character and prop, clean cut edges, 1:1 square ratio, no slide UI, no footer cards, no Japanese text.
```

### 🤖 4) 강화학습 에이전트 탐색 (로봇 틴맨 & 3D 그리드월드 타일)
```text
Studio Ghibli 2D anime style, clean crisp line art, soft warm flat cel shading, masterpiece. Tinny the cute AI maker robot, a small bipedal humanoid robot with a warm matte silver tin body, white ceramic panels, brass servo joints, a rounded retro monitor head with cheerful crescent LED eyes (^^), a brass spring antenna with a glowing yellow light bulb, and a glowing warm amber heart core visible inside his circular chest window. Tinny is taking an adventurous step forward on floating 3D isometric pastel gridworld maze tiles: one tile has a glowing golden star reward (+1.0), and another tile has a small red flag. Tinny holds a glowing golden compass in his 3-finger gripper hand, learning the optimal policy. Pure solid clean white background (#FFFFFF), isolated isometric asset, 1:1 aspect ratio, no slide frames, no clutter.
```

### 🔌 5) 아두이노 메이커 실습 씬 (도로시 & 이호진 교수님 & 토토의 협업)
```text
Studio Ghibli 2D anime style, clean crisp line art, rich warm ambient cel shading, masterpiece. A heartwarming collaborative maker scene. Young Dorothy in her blue denim overalls with 'STEM HERO' badge carefully inserts a yellow jumper wire into a white breadboard circuit on a small wooden maker table. Professor Hojin, a youthful mentor in his early 40s wearing a plain solid dark navy polo shirt (no logos, no badges) and blue jeans with thin wire glasses, sits beside her pointing gently to guide her hands with an encouraging warm smile. Beside the table stool, Toto the fluffy cream-white puppy with his sky-blue bandana sits looking up happily with mouth open. An official teal-cyan Arduino Uno board with glowing green power LED and neatly arranged electronic components rest on the table. Pure solid clean white background (#FFFFFF), isolated character group, clean silhouette, 1:1 square format, no slide borders, no Japanese text.
```

### 🐳 6) 도커(Docker) 컨테이너 가상화 배포 씬 (도로시 & 조교 지니)
```text
Studio Ghibli 2D anime style, clean anime line art, vibrant cel shading, masterpiece. Dorothy in her blue denim overalls and red sneakers happily high-fiving the air in celebration in front of a laptop computer. Sitting next to the laptop is Jiny the black-and-white tuxedo cat wearing round scholar glasses and his red bell collar, purring proudly with a happy closed-eye smile. Floating above the laptop screen is a cute 2D stylized friendly blue whale carrying colorful container shipping boxes on its back, surrounded by sparkling digital data cubes. Pure solid clean white background (#FFFFFF), isolated subject, clean cutout edges, 1:1 square composition, no slide templates, no Japanese text.
```

---

## 🛠️ 6. Gemini LLM 및 AI 에이전트 자가 점검 체크리스트 (QA Checklist)

이미지 생성 프롬프트를 확정하거나 API 도구(`generate_image` 등)를 호출하기 전, 다음 항목을 반드시 점검하십시오:

* [ ] **1. 슬라이드 프레임이 배제되었는가?** (타이틀 바, 글머리 기호 카드, 설명문 텍스트 상자 없이 순수 캐릭터+소품인가?)
* [ ] **2. 배경이 무결점 순백색(`#FFFFFF`)인가?** (슬라이드나 웹 문서에 즉시 삽입 가능한 누끼형 그래픽인가?)
* [ ] **3. 1:1 정방형 규격인가?** (1024 × 1024 해상도)
* [ ] **4. 캐릭터 비주얼 토큰이 정확히 기재되었는가?**
  * 도로시: 4.5등신, 밤색 양갈래, 주황 줄무늬 티, 'STEM HERO' 오버롤, 빨간 운동화
  * 이호진 교수님: **40대 초반 동안(매끄러운 피부, 주름 없음)**, 솔트앤페퍼 헤어, 얇은 라운드 안경, **무지 네이비 폴로(NO SNU badge)**, 청바지, 그레이 스니커즈
  * 지니: 코숏 흑백 젖소/턱시도, 올리브 눈, 핑크 단추 코, 미니 조교 안경, 빨간 방울 목걸이
  * 토토: **얼룩 없는 웜밀크 화이트 단색 털(NO spots)**, 검은 단추 코, 검은 눈, 스카이 블루 반다나
  * 틴맨: 매트 실버 바디, 황동 조인트, 스카이블루 LED 도트 눈, 회전 톱니바퀴 & 하트 코어
* [ ] **5. 언어 규칙을 준수했는가?** (일본어 가나/한자 100% 차단, 한국어 또는 영어만 사용)
* [ ] **6. 동물 중복 복제 글리치가 차단되었는가?** (고양이 최대 1마리, 강아지 1마리 제한)

---

## 📂 7. 공식 마스터 스타일 가이드 링크 목록 (Full Guide References)

더욱 깊이 있는 해부학적 비례, 헥스 색상 코드, LoRA 학습 파라미터 및 전체 데이터셋 매핑은 다음 가이드에서 확인하실 수 있습니다:

* 👧 **[도로시 마스터 스타일 가이드 (`guides/DOROTHY_STYLE_GUIDE.md`)](file:///Users/hojin9/dev/projects/dorothy/guides/DOROTHY_STYLE_GUIDE.md)**: 4.5등신 조형, 헤어 4종/의상 4종 모델 시트, 주니어 메이커 심층 페르소나 및 14대 기술 학습 매트릭스
* 👨‍🏫 **[이호진 교수님 마스터 스타일 가이드 (`guides/HOJIN_STYLE_GUIDE.md`)](file:///Users/hojin9/dev/projects/dorothy/guides/HOJIN_STYLE_GUIDE.md)**: 40대 초반 동안 규격, Anti-Aging 물리 공식, 무지 네이비 폴로(No SNU), 멘토링 매트릭스, 25종 LoRA 데이터셋
* 🐱 **[조교 지니 마스터 스타일 가이드 (`guides/JINY_STYLE_GUIDE.md`)](file:///Users/hojin9/dev/projects/dorothy/guides/JINY_STYLE_GUIDE.md)**: 실물 반려묘 모티브 코숏 턱시도, 올리브 눈, 핑크 코, 안경/방울, 코드리뷰 매트릭스, 23종 LoRA 데이터셋
* 🐶 **[토토 마스터 스타일 가이드 (`guides/TOTO_STYLE_GUIDE.md`)](file:///Users/hojin9/dev/projects/dorothy/guides/TOTO_STYLE_GUIDE.md)**: 비숑-말티즈 믹스, Anti-Drift 웜밀크 화이트 단색 털 공식, 하늘색 반다나, 하드웨어 조수 매트릭스, 19종 LoRA 데이터셋
* 🤖 **[로봇 & 피지컬 AI 스타일 가이드 (`guides/ROBOT_STYLE_GUIDE.md`)](file:///Users/hojin9/dev/projects/dorothy/guides/ROBOT_STYLE_GUIDE.md)**: 틴맨 2족 보행 휴머노이드, 6축 코봇 암, 갠트리 3D 프린터, 스카라 로봇, 피지컬 AI 협업 매트릭스, 22종 LoRA 데이터셋
* 🧩 **[파츠 애셋 및 LoRA 학습 통합 가이드 (`guides/PARTS_AND_LORA_TRAINING_GUIDE.md`)](file:///Users/hojin9/dev/projects/dorothy/guides/PARTS_AND_LORA_TRAINING_GUIDE.md)**: 36종 강의 파츠 애셋 및 고해상도 학습 데이터 명세
