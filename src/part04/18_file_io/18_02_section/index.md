---
layout: docs
title: "2. 컴퓨터의 언어: 바이너리(바이트) 처리"
permalink: /part04/18_file_io/18_02_section/
---

# 2. 컴퓨터의 언어: 바이너리(바이트) 처리

사람은 "가, 나, 다" 문자를 보지만, 컴퓨터는 오직 "01010111" 이런 전기 신호 덩어리만 이해합니다. 사진 파일이나 게임 세이브 파일처럼 글자가 아닌 파일들을 다룰 때는 **바이너리 모드(`b`)**를 써야 합니다.

## 2.1 BufferedReader와 BufferedWriter

바이너리 파일을 읽거나 쓸 때는 데이터를 하나하나 옮기지 않고 바구니(버퍼, Buffer)에 적당량을 듬뿍 담아서 한 번에 옮깁니다. 이쪽이 훨씬 속도가 빠르거든요! 

- 파일을 `rb` (읽기 전용 바이너리)로 열면 **`BufferedReader`**라는 요정이 튀어나와 데이터를 읽어옵니다.
- 파일을 `wb` (쓰기 전용 바이너리)로 열면 **`BufferedWriter`**라는 요정이 출동합니다.

```python
import io

# wb 모드: 바이너리로 글씨 쓰기 (글자 앞에 b를 꼭 붙여야 합니다!)
# 텍스트가 기계어로 번역(인코딩)된 상태라고 생각하면 됩니다.
f = open("my_binary.txt", "wb")
f.write(b"Hello! Im binary!") 
f.close()

# rb 모드: 바이너리로 읽어오기
f2 = open("my_binary.txt", "rb")
print(f2.read())  # 출력: b'Hello! Im binary!'
f2.close()
```

---

## 2.2 가짜 파일 만들기 대작전: BytesIO

프로그램을 만들다 보면, "진짜 하드디스크에 파일(C드라이브)을 만들기는 좀 부담스럽고 찌꺼기가 남는데... 메모리 허공에 가짜 파일을 만들어서 잠깐만 쓰고 버릴 순 없을까?" 할 때가 있습니다.

이럴 때 쓰는 아주 놀라운 마법이 바로 **`BytesIO`** 입니다.

```python
import io

# 하드디스크를 쓰지 않고 허공(메모리)에 빈 공책 펼치기!
memory_file = io.BytesIO()

# 파일처럼 막 써넣기
memory_file.write(b"It's fake file!")
memory_file.write(b" So fast!")

# 다 쓴 다음 어떤 내용이 담겼나 훔쳐보기 (getvalue)
print(memory_file.getvalue()) 
# 출력: b"It's fake file! So fast!"

# 허공의 공책 쓰레기통에 버리기
memory_file.close() 
```

`BytesIO`를 쓰면 굳이 컴퓨터에 쓰레기 파일들을 남기지 않고 빛의 속도로 썼다 지웠다 할 수 있어서, 네트워크 통신 등에서 데이터를 쏠 때 엄청 자주 쓴답니다!
