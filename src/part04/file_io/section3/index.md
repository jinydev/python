---
layout: docs
title: "3. 우리의 언어: 텍스트 파일과 마법 주문 with"
permalink: /part04/file_io/section3/
---

# 3. 우리의 언어: 텍스트 파일과 마법 주문 with

이번엔 진짜 우리가 읽을 수 있는 일반 메모장 텍스트 파일 다루기입니다. 사실 너무 간단하지만, 실수하지 말아야 할 초보자 필수 스킬들이 숨어있습니다.

## 3.1 텍스트 처리와 인코딩 (TextIOWrapper)

읽기 전용 텍스트 파일(`rt`)을 열면 `TextIOWrapper`가 등장합니다. 이 기능은 안쪽에 있는 더러운 기계어를 유니코드라는 아주 예쁘고 일관된 글꼴로 바꾸어서 파이썬 화면에 뿌려주는 역할을 합니다.

특히 한글이 깨지는 것을 막으려면 외계어처럼 이상한 글자가 나오지 않도록 `encoding='utf-8'` 옵션을 습관적으로 걸어주는 것이 좋습니다.

```python
# 한글이 절대 안깨지는 방탄 텍스트 파일 열기!
f = open("diary.txt", "wt", encoding="utf-8")
f.write("오늘은 파이썬 IO를 배웠다. 재미있다!")
f.close()
```

---

## 3.2 허공의 진짜 메모장: StringIO

바이너리 쪽에 `BytesIO`가 있었다면 텍스트 쪽에는 똑같은 역할을 하는 녀석이 있습니다. 파일은 안 남기면서 파이썬 화면 메모리 상에서만 글자를 썼다 지우는 마법의 칠판, 바로 **`StringIO`**입니다. 

```python
import io

fake_memo = io.StringIO()
fake_memo.write("이건 허공에 쓴 일기야.")
print(fake_memo.getvalue()) # 읽어오기!
fake_memo.close()
```

---

## 3.3 문단속을 철저히! 마법의 키워드 `with`

파일을 열었으면 반드시 닫아야(`close()`) 합니다. 안 닫으면 좀비처럼 파일이 켜진 채 남아 에러를 뿜어냅니다. 그런데 매번 닫는 걸 까먹기 십상이죠?

`with` 라는 마법 주문을 앞에 쓰면, 파이썬이 "아! 들여쓰기가 끝나는 순간 내가 알아서 자동으로 파일 문을 닫아줄게!" 라고 약속해 줍니다. 

```python
# 파일을 엽니다. as f는 '이 파일을 f라는 별명으로 부를게'라는 뜻입니다.
with open("diary.txt", "rt", encoding="utf-8") as f:
    text = f.read()
    print("파일 내용:", text)
    # 이 구역(블록)을 빠져나가는 순간 f.close()가 알아서 실행됩니다!

# 파일이 이미 잘 닫혔습니다!
# print(f.read())  # 이렇게 블럭 밖에서 다시 읽으려 시도하면 에러가 납니다!
```

---

## 3.4 돋보기로 위치 콕! (`seek`, `tell`)

공책을 처음 열면 읽는 눈동자의 커서가 맨 처음에 있습니다. `tell`은 "지금 내 커서 번호가 어딘지 말해줘!" 이고, `seek`은 "야, 10번째 글자 뒤로 바로 순간이동 해!"라는 명령입니다.

```python
with open("diary.txt", "rt", encoding="utf-8") as f:
    print("내 위치:", f.tell()) # 0 출력
    
    # 0번(처음) 으로 강제 이동해!
    f.seek(0)
    
    # 라인 하나만 쓱 읽어오기
    print(f.readline()) 
```

### 🚨 시작 전 확인: 진짜 파일이 존재할까?
만약 `rt` 모드로 열려는데 파일이 없다면 프로그램이 터집니다! 그러니 문을 벌컥 열기 전 똑똑하게 확인해 봐야 합니다.
`os.path.exists()`를 쓰면 진짜 그 파일이 폴더 안에 있는지 진실을 말해줍니다.

```python
import os

if os.path.exists("diary.txt"):
    print("파일 찾았어! 열게!")
    # 파일 열기 진행 ... 
else:
    print("아무것도 없어. 창고가 비었네!")
```
