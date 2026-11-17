---
layout: docs
title: "티니 (Tinny) - 캐릭터 프로필 & 스타일 가이드"
description: "스마트 데스크톱 계측 & 피드백 로봇 티니의 공식 디자인 규격, 컬러 팔레트 및 데이터셋 갤러리"
permalink: /character/tinny/
---

<!-- 상단 헤더 배너 -->
<div class="p-4 p-md-5 mb-5 rounded-4 shadow-sm" style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-left: 6px solid #475569;">
  <div class="row align-items-center">
    <div class="col-lg-8">
      <span class="badge rounded-pill bg-secondary text-white px-3 py-2 fw-bold mb-3">Desktop IoT Assistant Robot</span>
      <h1 class="display-6 fw-bold mb-2 text-dark">🤖 티니 (Tinny the Assistant Robot)</h1>
      <p class="fs-5 fw-bold mb-3 text-secondary">
        "삐빅! 회로 전원 전압 5.02V 안정적 유지. I2C 통신 주소 0x3C 감지 완료. 실시간 데이터 전송 개시!"
      </p>
      <p class="text-secondary leading-relaxed mb-0">
        연구실 책상 위에서 회로의 전기 신호, 전압, 통신 패킷을 계측하고 모니터 헤드의 표정 변화와 전구 안테나 빛으로 사용자에게 시각적 피드백을 전달하는 친절한 스마트 로봇입니다.
      </p>
    </div>
    <div class="col-lg-4 text-center mt-4 mt-lg-0">
      <div class="bg-white p-3 rounded-4 shadow-sm d-inline-block border">
        <img src="{{ '/assets/img/robot_tinny_profile.jpg' | relative_url }}" alt="티니 로봇" style="max-height: 220px; object-fit: contain;">
      </div>
      <p class="small text-muted mt-2 mb-0">▲ 공식 마스터 프로필 컷</p>
    </div>
  </div>
</div>

---

## 📐 1. 기구학적 형태 및 신체 비례 규격 (Robotics Anatomy)

| 부위 | 규격 및 조형 세부 원칙 |
| :--- | :--- |
| **신체 비율** | **약 2.5 ~ 3.0등신 레트로 모던 데스크톱 컴패니언 로봇**<br>• 도로시 키의 약 허리 높이(약 55~60cm 상당)로 책상 위나 옆에 자연스럽게 배치<br>• 과도한 밀리터리 기계미를 배제하고, 둥글둥글하고 친근한 곡선 위주의 백색 외장재 |
| **모니터 헤드** | • 형태: 모서리가 부드럽게 라운딩된 CRT/모던 디스플레이 큐브 헤드 (`#E8ECEF`)<br>• 안테나: 정수리 중앙에 솟아오른 얇은 황동 와이어 안테나 + **빛나는 노란색 미니 전구 팁 (`#FCD34D`)** |
| **디지털 페이스** | • 디스플레이: 짙은 다크 차콜 글래스 화면 (`#1E293B`)<br>• 디지털 아이: **발광하는 밝은 시안 블루 LED 눈 (`#38BDF8`)** (상태에 따라 하트, 윙크, 느낌표로 감정 표현) |
| **흉부 코어 (Heart)** | • 가슴 중앙에 장착된 투명 유리 돔 윈도우<br>• 내부: 따뜻한 호박색으로 맥동(Pulsing)하며 회전하는 **황금색 하트 코그휠 기어 (`#F59E0B`)** |
| **관절 & 팔다리** | • 볼 조인트(Ball-joint)와 피벗 힌지로 연결된 3자유도 관절 팔과 탄탄한 다리<br>• 손: 작은 전자 부품이나 핀셋을 정밀하게 잡을 수 있는 3지 핑거 엔드이펙터 |

---

## 🎨 2. 화풍 및 렌더링 물리 규격 (Rendering Physics)

1. **선화 (Line Art Mechanics):**
   - 선 색상: 다크 에스프레소 브라운 (`#26211E`)
   - 기계 부품이지만 날카로운 직선보다는 만화적인 둥근 볼륨선 적용
2. **채색 및 셰이딩:**
   - 바디 표면: 차가운 크롬 금속이 아닌 **따뜻한 매트 무광 세라믹 화이트 (`#F1F5F9`)**
   - 발광체 효과: 전구 팁과 디지털 눈동자 주위에 부드러운 2D 발광 오라(Bloom Halo) 표현

---

## 🌈 3. 표준 컬러 팔레트 (Color Hex Codes)

| 영역 | 세부 항목 | 색상 명칭 | Hex Code | 컬러 프리뷰 |
| :--- | :--- | :--- | :--- | :---: |
| **외장** | 세라믹 바디 밑색 | Matte Ceramic White | `#F1F5F9` | <span style="display:inline-block;width:32px;height:18px;background:#F1F5F9;border:1px solid #ccc;border-radius:4px;"></span> |
| | 바디 그림자 | Slate Gray Shade | `#CBD5E1` | <span style="display:inline-block;width:32px;height:18px;background:#CBD5E1;border:1px solid #ccc;border-radius:4px;"></span> |
| | 페이스 글래스 | Dark Obsidian Screen | `#1E293B` | <span style="display:inline-block;width:32px;height:18px;background:#1E293B;border:1px solid #ccc;border-radius:4px;"></span> |
| **발광** | 디지털 아이 LED | Glowing Cyan Blue | `#38BDF8` | <span style="display:inline-block;width:32px;height:18px;background:#38BDF8;border:1px solid #ccc;border-radius:4px;"></span> |
| | 전구 안테나 | Radiant Warm Yellow | `#FCD34D` | <span style="display:inline-block;width:32px;height:18px;background:#FCD34D;border:1px solid #ccc;border-radius:4px;"></span> |
| | 가슴 하트 코그휠 | Amber Gold Heart | `#F59E0B` | <span style="display:inline-block;width:32px;height:18px;background:#F59E0B;border:1px solid #ccc;border-radius:4px;"></span> |

---

## 🖼️ 4. 공식 학습 데이터셋 갤러리 (Dataset & Variations)

`data/dataset/robot/` 디렉토리에 구축된 고해상도 학습 데이터셋의 대표 컷입니다.

<div class="row row-cols-1 row-cols-md-3 g-4 my-4">
  <div class="col">
    <div class="card h-100 border rounded-4 p-2 shadow-sm bg-white">
      <img src="{{ '/assets/dataset/robot/robot_01.jpg' | relative_url }}" alt="로봇 01" class="img-fluid rounded-3 mb-2" style="height: 240px; object-fit: contain; background: #f8fafc;">
      <div class="card-body p-2">
        <h6 class="fw-bold mb-1">robot_01: 정면 기본 스탠딩</h6>
        <p class="small text-muted mb-0"><code>retro-modern assistant robot, blue digital eyes</code></p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card h-100 border rounded-4 p-2 shadow-sm bg-white">
      <img src="{{ '/assets/dataset/robot/robot_02.jpg' | relative_url }}" alt="로봇 02" class="img-fluid rounded-3 mb-2" style="height: 240px; object-fit: contain; background: #f8fafc;">
      <div class="card-body p-2">
        <h6 class="fw-bold mb-1">robot_02: 전구 안테나 발광 씬</h6>
        <p class="small text-muted mb-0"><code>glowing yellow lightbulb antenna, idea found</code></p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card h-100 border rounded-4 p-2 shadow-sm bg-white">
      <img src="{{ '/assets/dataset/robot/robot_03.jpg' | relative_url }}" alt="로봇 03" class="img-fluid rounded-3 mb-2" style="height: 240px; object-fit: contain; background: #f8fafc;">
      <div class="card-body p-2">
        <h6 class="fw-bold mb-1">robot_03: 브레드보드 멀티미터 계측</h6>
        <p class="small text-muted mb-0"><code>measuring circuit voltage, precision sensor</code></p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card h-100 border rounded-4 p-2 shadow-sm bg-white">
      <img src="{{ '/assets/dataset/robot/robot_05.jpg' | relative_url }}" alt="로봇 05" class="img-fluid rounded-3 mb-2" style="height: 240px; object-fit: contain; background: #f8fafc;">
      <div class="card-body p-2">
        <h6 class="fw-bold mb-1">robot_05: 산업용 코봇팔과의 데이터 통신</h6>
        <p class="small text-muted mb-0"><code>communicating with cobot arm, ROS2 telemetry</code></p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card h-100 border rounded-4 p-2 shadow-sm bg-white">
      <img src="{{ '/assets/dataset/robot/robot_08.jpg' | relative_url }}" alt="로봇 08" class="img-fluid rounded-3 mb-2" style="height: 240px; object-fit: contain; background: #f8fafc;">
      <div class="card-body p-2">
        <h6 class="fw-bold mb-1">robot_08: 도로시와의 협업 컷</h6>
        <p class="small text-muted mb-0"><code>working with Dorothy, desktop companion</code></p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card h-100 border rounded-4 p-2 shadow-sm bg-white">
      <img src="{{ '/assets/img/robot_tinny_profile.jpg' | relative_url }}" alt="티니 프로필" class="img-fluid rounded-3 mb-2" style="height: 240px; object-fit: contain; background: #f8fafc;">
      <div class="card-body p-2">
        <h6 class="fw-bold mb-1">robot_tinny_profile</h6>
        <p class="small text-muted mb-0"><code>마스터 렌더링 공식 3D 턴어라운드 컷</code></p>
      </div>
    </div>
  </div>
</div>

---

## 💡 5. 표준 AI 생성 프롬프트 블록 (Master Prompt Formula)

```text
Tinny the robot, a friendly and cute retro-modern desktop assistant robot, waist-height, matte white rounded cube monitor head with a dark screen, glowing cyan digital eyes, an antenna with a glowing warm yellow lightbulb tip on top of head, jointed metallic arms and legs, glowing amber heart cogwheel visible on chest. Clean dark brown line art (#26211E), soft 2D cel shading, Studio Ghibli anime aesthetic, pure solid white background.
```

