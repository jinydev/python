---
layout: docs
title: "72 컴퓨터의 진짜 언어: 바이너리(바이트) 파일과 메모리 뷰"
permalink: /basic/23_file_and_data_io/72_binary_and_bytes/
---

# 72 컴퓨터의 진짜 언어: 바이너리(바이트) 파일과 메모리 뷰

사람은 "가, 나, 다" 같은 문자를 보지만, 예쁜 이미지나 화려한 게임 저장 파일을 뜯어보면 컴퓨터는 오직 "01010111" 이런 전기 신호(바이트) 덩어리로만 저장하고 이해합니다.
글자가 아닌 파일들을 있는 형태 그대로 파괴 없이 다룰 때는 글자 번역기가 빠지고 날것을 다루는 **바이너리 모드(`b`)**를 써야 합니다.

## 1. 바이너리로 읽고 쓰기

바이너리 모드로 글씨를 쓰려면, 파이썬에게 "이건 우리가 읽을 글씨가 아니라 그냥 1바이트짜리 기호 덩어리(Raw Bytes)야!" 라고 알려주기 위해 따옴표 앞에 `b`를 꼭 붙여야 합니다.

```python
# wb 모드 (Write Binary): 바이너리로 기계어 쓰기
# 텍스트가 기계어로 번역(인코딩)된 상태라고 생각하면 됩니다.
with open("my_raw.bin", "wb") as f:
    f.write(b"Hello! I am a robot binary sequence!\x00") 

# rb 모드 (Read Binary): 바이너리로 원래 형태 그대로 읽어오기
with open("my_raw.bin", "rb") as f2:
    data = f2.read()
    print(data)  
    # 출력: b'Hello! I am a robot binary sequence!\x00'
```

---

## 2. 허공에 임시 파일 만들기 대작전 (`BytesIO`)

프로그램을 만들다 보면, "진짜 내 하드디스크 C드라이브에 파일을 썼다 지웠다 만들기는 속도도 느리고 너무 찌꺼기가 남아 부담스러워. 그냥 **허공(메모리)에 임시 가짜 파일을 만들어서 잠깐만 쓰고 확 버릴 순 없을까?**" 할 때가 자주 찾아옵니다.

이럴 때 쓰는 아주 놀라운 파이썬 마법이 바로 **`io.BytesIO`** (임시 버퍼) 입니다.

```python
import io

# 하드디스크를 건드리지 않고 허공 임시 메모리에 텅 빈 공책 펼치기!
memory_file = io.BytesIO()

# 진짜 파일인 것처럼 막 써넣기 (눈에 보이는 파일은 생성되지 않음!)
memory_file.write(b"It's fake memory file!")
memory_file.write(b" So fast and clean!")

# 다 쓴 다음 어떤 내용이 담겼나 전체 쏟아보기 (getvalue())
print(memory_file.getvalue()) 
# 출력: b"It's fake memory file! So fast and clean!"

# 허공의 임시 공책을 쓰레기통에 폐기
memory_file.close() 
```

`BytesIO`를 쓰면 굳이 컴퓨터 하드디스크 수명을 줄여가며 파일들을 저장했다가 지울 필요 없이, 빛의 속도로 램(RAM) 안에서 데이터를 썼다 전송했다 버릴 수 있어서 네트워크 통신 등에서 엄청 자주 씁니다!

---

## 3. 메모리 뻥튀기 막기! 복제의 마법 거울 `memoryview`

만약 10GB짜리 엄청 크고 무거운 동영상 파일 데이터를 리스트 슬라이싱(`[0:1000]`)해서 편집한다고 쳐 봅시다. 보통 파이썬 리스트에서는 슬라이싱을 하는 순간 똑같은 크기의 복사본 창고가 메모리에 하나 더 생겨서 순식간에 컴퓨터가 뻗고 멈춰버립니다.

이때 구세주처럼 등장하는 것이 바로 **`memoryview` (메모리뷰)** 마법의 전신 거울입니다!

```python
# 엄청 크고 방대한 바이트 데이터가 메모리에 있다고 상상해봅시다.
giant_data = bytearray(b"abcdefghijklmnopqrstuvwxyz")

# 10GB를 그대로 복사하는 대신, 
# 마법 거울(memoryview)을 꺼내 데이터를 그저 '비춰보기만' 합니다!
view = memoryview(giant_data)

# 거울에 비친 상을 조종해서 바꿔볼까요? 맨 앞 글자에 대문자 'A' 아바타 주입!
view[0] = ord(b'A')

# 원본 데이터를 확인하면 놀랍게도 같이 조작되어 있습니다!
print(giant_data)
# 출력: bytearray(b'Abcdefghijklmnopqrstuvwxyz')
```

`memoryview`는 데이터를 새로 무겁게 복사하지 않고 껍데기만 씌워 "저 멀리 있는 큰 원본 데이터를 바로 투시해서 조작할게!" 라는 뜻입니다. 아무리 크고 무거운 몬스터급 빅데이터라도 아주 가볍고 번개처럼 다룰 수 있게 해줍니다!
