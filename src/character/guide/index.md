---
layout: docs
title: "캐릭터 제작 & AI 데이터셋 가이드"
description: "139MB 공식 데이터셋 구성, Multi-Concept LoRA 훈련 규칙 및 AI 프롬프트 가이드"
permalink: /character/guide/
---

<!-- 상단 헤더 배너 -->
<div class="p-4 p-md-5 mb-5 rounded-4 shadow-sm" style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border-left: 6px solid #a855f7;">
  <div class="row align-items-center">
    <div class="col-lg-8">
      <span class="badge rounded-pill bg-purple text-white px-3 py-2 fw-bold mb-3" style="background-color: #a855f7;">Dataset & Training Engineering</span>
      <h1 class="display-6 fw-bold mb-2 text-dark">🎨 캐릭터 제작 & AI 데이터셋 가이드</h1>
      <p class="fs-5 fw-bold mb-3" style="color: #7e22ce;">
        "캐릭터의 얼굴뿐만 아니라, 연구하는 실험실과 부품, 다이어그램까지 온전히 학습하여 완벽한 세계관 일관성을 구현합니다."
      </p>
      <p class="text-secondary leading-relaxed mb-0">
        본 가이드는 <strong>jiny.dev</strong>의 공식 이미지 데이터셋(139MB)의 구성 원리와, Gemini/Imagen/Flux/SDXL 모델 및 Multi-Concept LoRA 학습 시 캐릭터의 선화, 색감, 비례의 일관성을 100% 보장하는 엔지니어링 표준을 다룹니다.
      </p>
    </div>
    <div class="col-lg-4 text-center mt-4 mt-lg-0">
      <div class="bg-white p-3 rounded-4 shadow-sm d-inline-block border">
        <img src="{{ '/assets/img/robot_ecosystem_lab.jpg' | relative_url }}" alt="연구실 생태계" style="max-height: 200px; object-fit: cover;">
      </div>
      <p class="small text-muted mt-2 mb-0">▲ 2D 지브리 감성 데이터셋 통합 랩</p>
    </div>
  </div>
</div>

---

## 📂 1. 공식 데이터셋 디렉토리 구조 (139MB)

웹사이트 저장소의 `src/assets/dataset/` 및 `data/dataset/`에 실습 및 모델 훈련용 고해상도 이미지와 캡션 텍스트 파일이 1:1 페어로 완벽하게 구축되어 있습니다.

```text
src/assets/dataset/
├── dorothy/       # 👧 도로시 43장 (dorothy_01.jpg + .txt ~ dorothy_43.jpg)
├── hojin/         # 👨‍🏫 이호진 교수님 31장 (hojin_01.jpg + .txt ~ hojin_31.jpg)
├── jiny/          # 🐱 지니 고양이 27장 (jiny_01.jpg + .txt ~ jiny_27.jpg)
├── toto/          # 🐶 토토 강아지 23장 (toto_01.jpg + .txt ~ toto_23.jpg)
├── robot/         # 🤖 티니 로봇 23장 (robot_01.jpg + .txt ~ robot_23.jpg)
└── parts/         # 🔌 강의 환경/하드웨어 부품/소프트웨어 이론 그래픽 26종
    ├── 01_environments/   # 강의실, 메이커 워크숍, 서버실 배경
    ├── 02_hardware/       # 아두이노 우노, 라즈베리파이, 빵판, 센서, 모터
    ├── 03_software/       # 자바 OOP, PHP MVC, DB 스키마, 도커 다이어그램
    └── 05_logos/          # 파이썬, C++, 리눅스, 아두이노, 도커 로고
```

---

## 🎯 2. 황금 제작 원칙 (Golden Rules)

1. **NO UI 슬라이드 프레임:** 슬라이드 테두리나 발표용 카드 박스를 이미지에 포함하지 않고, **순수 캐릭터 + 개념 시각화 소품**만을 생성합니다.
2. **순백색 배경 (`#FFFFFF`):** 웹이나 슬라이드에 투명하게 녹아들 수 있도록 무결점 순백색 단색 배경과 은은한 바닥 접지 그림자만을 유지합니다.
3. **선화 색상 규칙:** 순수 블랙(`#000000`)을 일체 배제하고, **다크 에스프레소 브라운 (`#26211E`)** 1.5pt 클린 라인아트를 적용합니다.
4. **연령 불변 (Anti-Aging):** 이호진 교수님은 40대 초반의 건강하고 매끄러운 피부와 세련된 숏헤어를 영구 유지하며, 노화 주름을 그리지 않습니다.
5. **동물 개수 제약:** 화면 내 고양이 지니 1마리 + 강아지 토토 1마리를 엄격하게 초과하지 않습니다.
6. **언어 제한:** 오직 한국어와 영문 코드/수식만 허용하며, 왜곡된 가나/한자는 생성하지 않습니다.

---

## 🧬 3. Multi-Concept LoRA 훈련 규격 권장치

| 파라미터 | 권장 설정값 | 설명 및 이유 |
| :--- | :--- | :--- |
| **Base Model** | SDXL 1.0 / Pony / Flux.1-dev | 고해상도 해부학적 안정성과 클린 라인아트 재현율 |
| **Trigger Words** | `hojin_prof`, `dorothy_girl`, `jiny_cat`, `toto_dog`, `tinny_bot` | 캐릭터별 독립 고유 토큰 지정으로 개념 침범(Bleeding) 방지 |
| **Network Dim / Alpha** | Rank: `32` / Alpha: `16` (또는 Dim 64 / Alpha 32) | 복합 인물과 소품의 정밀 텍스처를 온전히 수용 |
| **Learning Rate** | UNet: `1e-4`, Text Encoder: `5e-5` | 과적합 없이 지브리 2D 스타일과 캐릭터 특징 동시 학습 |
| **Resolution** | `1024 × 1024` (Bucket Size: 512~1536) | 전신 및 흉상 컷의 고해상도 라인아트 디테일 보존 |

