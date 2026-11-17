---
layout: semester3
title: "6주차: 데이터베이스 기초 - 영구적인 데이터 저장소 🗄️"
permalink: /semester3/week06/
description: "6주차: 데이터베이스 기초 - 영구적인 데이터 저장소 🗄️에 대한 파이썬(Python) 강좌 문서입니다."
keywords: "6주차: 데이터베이스 기초 - 영구적인 데이터 저장소 🗄️, 파이썬, Python, 프로그래밍, 개발, jinydev"
---

# 6주차: 데이터베이스 기초 - 영구적인 데이터 저장소 🗄️

우리는 지금까지 파일에 데이터를 저장하는 법을 배웠습니다. 하지만 데이터가 수만, 수백만 개가 되면 파일만으로는 검색 속도가 너무 느리고 관리가 불가능해집니다. 이때 사용하는 것이 **데이터베이스(Database)**입니다. 이번 시간에는 가장 널리 쓰이는 관계형 DB인 **SQLite3**를 배웁니다.

---

## 1. 관계형 데이터베이스 (RDBMS)란?

RDBMS는 데이터를 **표(Table)** 형태로 저장하는 시스템입니다. 각 표는 행(Row)과 열(Column)로 구성되며, 서로 다른 표끼리 관계를 맺어 데이터를 관리합니다.

![DB 구조](./img/db_structure.svg)

### 1.1 핵심 개념
- **테이블 (Table):** 데이터가 저장되는 표.
- **열 (Column/Field):** 데이터의 속성 (예: 이름, 나이, 이메일).
- **행 (Row/Record):** 실제 데이터 한 건.
- **기본 키 (Primary Key, PK):** 각 행을 유일하게 식별할 수 있는 값 (예: 학번, 주민번호). 중복될 수 없습니다.

---

## 2. SQL (Structured Query Language)

데이터베이스와 대화하기 위해 사용하는 표준 언어가 바로 **SQL**입니다.

### 2.1 핵심 쿼리문
| 명령어 | 역할 | 예시 |
| :--- | :--- | :--- |
| `CREATE TABLE` | 새로운 표 생성 | `CREATE TABLE Users (id INT, name TEXT);` |
| `INSERT` | 데이터 추가 | `INSERT INTO Users VALUES (1, '지니');` |
| `SELECT` | 데이터 조회 | `SELECT name FROM Users WHERE id = 1;` |
| `UPDATE` | 데이터 수정 | `UPDATE Users SET name = '지니' WHERE id = 1;` |
| `DELETE` | 데이터 삭제 | `DELETE FROM Users WHERE id = 1;` |

---

## 3. 파이썬에서 SQLite3 사용하기

파이썬은 별도의 설치 없이 사용할 수 있는 가벼운 DB인 `sqlite3` 모듈을 제공합니다.

### 3.1 기본 사용 흐름
```python
import sqlite3

# 1. DB 연결 (파일이 없으면 생성됨)
conn = sqlite3.connect('my_database.db')

# 2. 커서(Cursor) 생성 (쿼리를 실행하는 도구)
cur = conn.cursor()

# 3. 테이블 생성
cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")

# 4. 데이터 삽입
cur.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("지니", 15))

# 5. 변경사항 저장 (Commit)
conn.commit()

# 6. 데이터 조회
cur.execute("SELECT * FROM users")
rows = cur.fetchall()
for row in rows:
    print(row)

# 7. 연결 종료
conn.close()
```

---

## 4. 🔍 Deep Dive: SQL Injection 공격과 방어

데이터베이스를 다룰 때 가장 주의해야 할 보안 문제가 **SQL 인젝션**입니다.

**위험한 코드:**
```python
# 사용자가 입력한 값을 그대로 쿼리에 넣는 경우
user_id = "1 OR 1=1" 
cur.execute(f"SELECT * FROM users WHERE id = {user_id}") 
# 결과: 모든 사용자의 정보가 유출됨!
```

**안전한 코드 (Parameterized Query):**
항상 `?` (또는 `%s`)를 사용하고 값을 튜플로 전달해야 합니다.
```python
cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```

---

## ✍️ 이번 주 연습 문제

**문제 1.** `Library`라는 DB를 만들고, `Books` 테이블(id, title, author, year)을 생성하여 책 5권의 정보를 저장하는 프로그램을 작성해 보세요.

**문제 2.** 특정 저자의 책만 조회하여 출력하는 함수 `find_books_by_author(author_name)`를 구현해 보세요.

**문제 3.** (심화) SQLite3의 `VACUUM` 명령어가 무엇인지 조사하고, 왜 대량의 데이터를 삭제한 후에 이 명령어를 실행하는 것이 좋은지 설명해 보세요.
---

## 🔍 Deep Dive: SQLite3 B-Tree 인덱스 아키텍처와 DB 트랜잭션의 ACID 속성

데이터베이스는 데이터를 엑셀보다 압도적으로 빨리 찾고 영구 저장하기 위한 특수한 엔진입니다.
- **B-Tree 인덱스**: 데이터베이스는 원하는 데이터를 초고속으로 찾기 위해 데이터를 정렬된 트리(B-Tree) 구조의 주소록(Index)으로 복제하여 들고 있습니다. 덕분에 전체 테이블을 풀 스캔하지 않고 탐색 범위를 쪼개 0.001초 만에 데이터에 점프할 수 있습니다.
- **ACID 속성**: 트랜잭션(Transaction)은 "전부 성공하거나 전부 실패"해야 하는 안전 장치로, 원자성(Atomicity), 일관성(Consistency), 고립성(Isolation), 지속성(Durability)의 4대 규칙을 만족하여 계좌 이체 도중 컴퓨터 전원이 나가도 데이터 오염을 예방합니다.

---

## ☕ Java vs Python 스나이퍼 비교

### 데이터베이스 접속 라이브러리
*   **Java**: 표준인 **JDBC (Java Database Connectivity)** 스펙 인터페이스를 사용합니다. 각 DB 공급사(MySQL, Oracle 등)가 제공하는 JDBC 드라이버를 로드하고, `Connection`, `PreparedStatement`, `ResultSet` 리소스를 예외 상황에서도 반드시 닫기 위해 `try-with-resources` 블록으로 복잡하게 감싸서 제어해야 합니다.
*   **Python**: 표준 규격인 **PEP 249 (Python Database API Specification v2.0)**을 모든 데이터베이스 드라이버 모듈이 철저하게 준수하고 있습니다. 따라서 SQLite3를 쓰든 PostgreSQL을 쓰든 연결 객체의 `cursor()`와 `execute()` 함수의 사용법이 완벽히 일치하며 코드가 매우 단순합니다.

---

## 🎧 Vibe Coding

> **🗣️ 학생 프롬프트 (AI에게 이렇게 명령해 보세요):**
> "파이썬 내장 `sqlite3` 모듈을 사용하여 회원 테이블(`users`)을 생성하고, 유저 정보(이름, 이메일)를 입력받아 삽입한 뒤, SQL 인젝션을 방어할 수 있는 '플레이스홀더(?, Parameterized Query)' 방식으로 조회하는 파이썬 코드를 작성해 줘."

---

## 코딩 영단어 학습 📝

*   **`Transaction`**: 트랜잭션. (데이터베이스 내에서 하나의 논리적인 작업 단위를 이루는 쿼리문들의 묶음으로, 완전히 일괄 반영(Commit)되거나 아예 취소(Rollback)되어야 합니다.)
*   **`Index`**: 인덱스, 색인. (데이터 검색 성능을 비약적으로 끌어올리기 위해 특정 컬럼의 데이터를 미리 정렬하여 기록해 둔 데이터베이스 전용 주소록입니다.)
*   **`Cursor`**: 커서. (데이터베이스의 SQL 실행 결과 셋 메모리 영역을 가리키며, 한 행씩 데이터를 패치(Fetch)해 올 수 있도록 통제하는 포인터 탐색 도구입니다.)
