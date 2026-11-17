# 🧩 도로시 파츠 애셋 및 LoRA 학습 통합 가이드 (Parts & LoRA Training Guide)

> **"캐릭터의 얼굴뿐만 아니라, 그들이 살아 숨 쉬는 강의실, 만지는 아두이노 기판, 연구하는 딥러닝 그래프까지 온전히 학습하여 완벽한 세계관 일관성을 구현합니다."**

본 문서는 [`data/dataset/parts/`](file:///Users/hojin9/dev/projects/dorothy/data/dataset/parts/)에 구축된 26종의 강의 진행 파츠 애셋(환경, 하드웨어 부품, 소프트웨어 이론, AI 이론)의 구성과, 4대 캐릭터 데이터셋과 결합하여 **Multi-Concept LoRA(Low-Rank Adaptation)**를 성공적으로 훈련하기 위한 가이드입니다.

---

## 🎯 1. 파츠(Parts) 데이터셋의 목적과 가치

캐릭터 단독 이미지만으로 LoRA를 학습할 경우 다음과 같은 문제(Concept Bleeding & Distortion)가 발생할 수 있습니다:
1. **부품 왜곡:** '아두이노'나 '라즈베리파이' 프롬프트를 넣었을 때 일반 녹색 기판이나 왜곡된 핀으로 생성됨
2. **배경 불일치:** 연구실 분위기가 SF 사이버펑크나 일반 현대 사무실로 임의 변질됨
3. **이론 다이어그램 부재:** 벨만 방정식, 연합학습, 도커 구조도 등 교육용 다이어그램의 시각적 형태를 AI가 알지 못함

따라서 **캐릭터 4인방(76+장)**과 함께 **환경/부품/소프트웨어/AI 파츠(26장)**를 LoRA 데이터셋에 포함함으로써, AI 모델이 **"도로시 세계관의 사물과 배경 양식"**까지 완전히 흡수하게 됩니다.

---

## 📂 2. 파츠 데이터셋 4대 카테고리 구성 (총 26종)

```text
data/dataset/parts/
├── 01_environments/       # 🏫 6종 강의 및 실습 환경 배경
│   ├── env_01_lecture_hall.txt
│   ├── env_02_maker_workshop.txt
│   ├── env_03_coding_workstation.txt
│   ├── env_04_fablab_3d_printing.txt
│   ├── env_05_ai_server_room.txt
│   └── env_06_campus_testing_ground.txt
├── 02_hardware/           # 🔌 8종 실습용 전자 및 로보틱스 부품
│   ├── hw_01_arduino_uno.txt
│   ├── hw_02_raspberry_pi_4.txt
│   ├── hw_03_breadboard_circuit.txt
│   ├── hw_04_ultrasonic_sensor.txt
│   ├── hw_05_dht11_temp_sensor.txt
│   ├── hw_06_servo_motor_sg90.txt
│   ├── hw_07_dc_gear_motor_wheel.txt
│   └── hw_08_autonomous_car_chassis.txt
├── 03_software/           # 💻 프로그래밍 & 웹 & 인프라 이론 그래픽
│   ├── sw_01_java_oop_architecture.txt
│   ├── sw_02_php_web_mvc.txt
│   ├── sw_03_database_erd_schema.txt
│   ├── sw_04_docker_containerization.txt
│   ├── sw_05_web_telemetry_dashboard.txt
│   ├── sw_06_rest_api_json_flow.txt
│   └── dockers/               # 🐳 도커 강의 전문 파츠 20종 (로고 + Part 01~08 핵심 다이어그램)
│       ├── logo_10_docker.txt
│       ├── docker_01_cloud_migration_legacy.txt
│       └── ... (docker_02 ~ docker_19)
├── 04_ai_theory/          # 🧠 6종 인공지능 & 강화학습 & 연합학습 강의 그래픽
│   ├── ai_01_neural_network_mlp.txt
│   ├── ai_02_cnn_feature_extraction.txt
│   ├── ai_03_reinforcement_learning_mdp.txt
│   ├── ai_04_bellman_equation_chalk.txt
│   ├── ai_05_federated_learning_arch.txt
│   └── ai_06_training_loss_metrics.txt
└── 05_logos/              # 🏷️ 기술 스택 브랜드 및 마스코트 로고 파츠
```

---

## 🔬 3. 26종 파츠 상세 명세표

### 🏫 1) 환경 애셋 (`01_environments`)
| 파일 ID | 명칭 | 핵심 묘사 | LoRA 트리거 태그 |
| :--- | :--- | :--- | :--- |
| `env_01_lecture_hall` | 대형 공학 강의실 | 계단식 좌석, 녹색 칠판, 스마트 프로젝터 스크린, 햇살 | `scenery, lecture hall, university amphitheater, chalkboard` |
| `env_02_maker_workshop` | 메이커 공방 연구실 | 원목 작업대, 공구 걸이대, 부품함, 납땜기 스테이션, 아늑함 | `scenery, maker workshop, robotics laboratory, workbench, tools` |
| `env_03_coding_workstation` | 코딩 워크스테이션 | 듀얼 모니터, VS Code 에디터 화면, 기계식 키보드, 커피 머그잔 | `scenery, developer workstation, dual monitors, python code` |
| `env_04_fablab_3d_printing` | 팹랩 3D 프린팅 룸 | Prusa 3D 프린터, 필라멘트 랙, 모형 로봇, 아크릴 기어 | `scenery, fablab, 3d printing room, prusa, filament spools` |
| `env_05_ai_server_room` | 엣지 AI 서버 룸 | 서버 랙, 라즈베리파이 클러스터, 이더넷 케이블, 점멸 LED | `scenery, edge ai server room, raspberry pi cluster, server rack` |
| `env_06_campus_testing_ground` | 캠퍼스 잔디 광장 | 푸른 잔디, 산책로, 붉은 벽돌 건물, 자율주행 야외 실험장 | `scenery, university campus, green lawn, meadow, sunny day` |

### 🔌 2) 하드웨어 부품 애셋 (`02_hardware`)
| 파일 ID | 명칭 | 핵심 묘사 | LoRA 트리거 태그 |
| :--- | :--- | :--- | :--- |
| `hw_01_arduino_uno` | 아두이노 우노 R3 | 시안 블루 PCB, ATmega328P 칩, USB 포트, 핀 헤더 | `still life, arduino uno, microcontroller board, cyan blue pcb` |
| `hw_02_raspberry_pi_4` | 라즈베리파이 4B | 초록색 PCB, 방열판, 듀얼 micro-HDMI, 40핀 GPIO | `still life, raspberry pi 4, single board computer, green pcb` |
| `hw_03_breadboard_circuit` | 브레드보드 회로 | 화이트 브레드보드, 무지개 점퍼 와이어, 점등된 LED, 저항 | `still life, white breadboard, rainbow jumper wires, leds` |
| `hw_04_ultrasonic_sensor` | 초음파 센서 | HC-SR04 두 개의 원형 금속 송수신 통 (귀여운 로봇 눈 모양) | `still life, hc-sr04 ultrasonic distance sensor, robot eyes` |
| `hw_05_dht11_temp_sensor` | 온습도 센서 | 파란색 DHT11 플라스틱 케이스, 공기 통풍구 슬릿, 3핀 인터페이스 | `still life, dht11 sensor module, temperature and humidity` |
| `hw_06_servo_motor_sg90` | 마이크로 서보 모터 | 반투명 파란색 케이스, 흰색 혼 암, 3색 리본 케이블 | `still life, sg90 micro servo motor, translucent blue casing` |
| `hw_07_dc_gear_motor_wheel` | DC 기어 모터 휠 | 노란색 TT 모터와 검은색 고무 트레드 타이어 바퀴 | `still life, yellow tt dc gear motor, rubber tire wheel` |
| `hw_08_autonomous_car_chassis` | 2륜 로봇 모형차 섀시 | 투명 아크릴 하판, 구동 바퀴 2개, 캐스터 볼 휠, 배터리 홀더 | `still life, 2-wheel robot car chassis, acrylic plate, wheels` |

### 💻 3) 소프트웨어 & 인프라 애셋 (`03_software`)
| 파일 ID | 명칭 | 핵심 묘사 | LoRA 트리거 태그 |
| :--- | :--- | :--- | :--- |
| `sw_01_java_oop_architecture` | 자바 OOP 다이어그램 | 상속 계층도, 인터페이스, 캡슐화, 커피잔 마스코트 | `diagram, java object oriented programming, class hierarchy` |
| `sw_02_php_web_mvc` | PHP 웹 아키텍처 | 요청-응답 주기, MVC 패턴, 보라색 코끼리(elePHPant) 마스코트 | `diagram, php web server architecture, elephpant mascot` |
| `sw_03_database_erd_schema` | 데이터베이스 ERD | MySQL/PostgreSQL 테이블 스키마, 1:N 관계선, B-Tree 인덱스 | `diagram, database erd schema, mysql, postgresql, b-tree index` |
| `sw_04_docker_containerization` | 도커 가상화 아키텍처 | 컨테이너를 실은 파란 도커 고래(Moby Dock), 계층형 파일시스템 | `diagram, docker containerization, blue docker whale` |
| `sw_05_web_telemetry_dashboard` | 실시간 웹 대시보드 | 자바스크립트 차트, 센서 게이지, 다크모드 로보틱스 UI | `diagram, modern web telemetry dashboard, javascript charts` |
| `sw_06_rest_api_json_flow` | REST API & JSON | 클라이언트-서버 HTTP 요청/응답 흐름, 중괄호 JSON 데이터 | `diagram, rest api client server flow, json data payloads` |

### 🧠 4) 인공지능 & 딥러닝 이론 애셋 (`04_ai_theory`)
| 파일 ID | 명칭 | 핵심 묘사 | LoRA 트리거 태그 |
| :--- | :--- | :--- | :--- |
| `ai_01_neural_network_mlp` | 다층 신경망 (MLP) | 입력-은닉-출력층 원형 노드, 발광하는 시냅스 가중치 연결선 | `diagram, multilayer perceptron neural network, glowing synapses` |
| `ai_02_cnn_feature_extraction` | CNN 합성곱 시각화 | 슬라이딩 필터 커널, 풀링 레이어, 특성 맵(Feature Map) | `diagram, convolutional neural network, cnn, feature maps` |
| `ai_03_reinforcement_learning_mdp` | 강화학습 MDP 루프 | 에이전트-환경 상호작용, 상태(S)-행동(A)-보상(R) 전이 루프 | `diagram, reinforcement learning, markov decision process, mdp` |
| `ai_04_bellman_equation_chalk` | 칠판 벨만 방정식 | 녹색 칠판 위 흰 분필로 적힌 벨만 최적 방정식 및 Q-함수 | `diagram, chalkboard, bellman optimality equation, q-learning` |
| `ai_05_federated_learning_arch` | 연합학습 아키텍처 | 중앙 집계 서버와 분산 라즈베리파이 클라이언트 노드 가중치 결합 | `diagram, federated learning architecture, decentralized nodes` |
| `ai_06_training_loss_metrics` | 딥러닝 손실 곡선 | Epoch에 따른 Loss 감소 곡선과 Accuracy 상승 그래프 | `diagram, machine learning training metrics graph, loss curve` |

---

## 🛠️ 4. LoRA 학습 권장 파라미터 (Multi-Concept LoRA)

Kohya-ss(sd-scripts), ComfyUI 또는 Flux LoRA 학습 시 다음 설정을 권장합니다:

### 1) 데이터셋 폴더 구조 (Repeat Counts)
```text
dataset/
├── 10_dorothy/          # 도로시 20장 (x10 repeat = 200 steps/epoch)
├── 10_hojin/            # 이호진 교수님 20장 (x10 repeat = 200 steps/epoch)
├── 10_jiny/             # 조교 지니 20장 (x10 repeat = 200 steps/epoch)
├── 10_toto/             # 토토 20장 (x10 repeat = 200 steps/epoch)
└── 5_parts/             # 파츠 26장 (x5 repeat = 130 steps/epoch)
```
* **Repeat 비율:** 캐릭터는 10회, 파츠(배경/소품)는 5회로 조율하여 캐릭터의 아이덴티티가 배경에 묻히지 않도록 최적 가중치를 부여합니다.

### 2) 핵심 하이퍼파라미터
* **기반 모델:** SDXL 1.0 (또는 Flux.1-dev)
* **해상도:** 1024 x 1024 (정방형)
* **Network Rank (Dim):** 32 ~ 64
* **Network Alpha:** 16 ~ 32 (Dim의 1/2 권장)
* **Learning Rate:**
  * UNet: `1e-4`
  * Text Encoder: `5e-5` (캐릭터와 사물 트리거 단어 보존)
* **Optimizer:** AdamW8bit or Prodigy
* **Lr Scheduler:** Cosine with restarts (3 cycles)
* **Max Train Epochs:** 12 ~ 15 epochs

---

## 🚀 5. 파츠 이미지 생성 자동화 실행법

API 쿼터 리셋 후 아래 명령어로 파츠 상태를 확인하고 일괄 생성을 진행할 수 있습니다:

```bash
# 파츠 데이터셋 현황 확인
python3 /Users/hojin9/dev/projects/dorothy/scripts/generate_parts_dataset.py

# 캐릭터 및 기술 학습 데이터셋 현황 확인
python3 /Users/hojin9/dev/projects/dorothy/scripts/generate_learning_dataset.py
```
