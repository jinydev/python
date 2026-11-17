---
layout: semester3
title: "7주차: ORM (Object Relational Mapping) - 객체와 DB의 연결 🔗"
permalink: /semester3/week07/
description: "7주차: ORM (Object Relational Mapping) - 객체와 DB의 연결 🔗에 대한 파이썬(Python) 강좌 문서입니다."
keywords: "7주차: ORM (Object Relational Mapping) - 객체와 DB의 연결 🔗, 파이썬, Python, 프로그래밍, 개발, jinydev"
---

# 7주차: ORM (Object Relational Mapping) - 객체와 DB의 연결 🔗

우리는 지난 시간 SQL을 사용하여 직접 데이터를 관리하는 법을 배웠습니다. 하지만 실제 대규모 프로젝트에서 모든 쿼리를 직접 작성하는 것은 매우 고통스러운 일입니다. 오타 하나만 나도 에러가 발생하고, DB 종류가 바뀌면 모든 쿼리를 수정해야 하기 때문입니다.

이 문제를 해결하기 위해 등장한 것이 **ORM (Object Relational Mapping)**입니다.

---

## 1. ORM이란 무엇인가?

ORM은 말 그대로 **객체(Object)**와 **관계형 데이터베이스(Relational)**를 **매핑(Mapping)**하는 기술입니다. 즉, SQL 쿼리를 직접 쓰는 대신, 파이썬 클래스와 메서드를 사용하여 DB를 조작하는 것입니다.

![ORM 원리](./img/orm_concept.svg)

### 1.1 ORM의 장점
1.  **생산성 향상:** SQL을 몰라도 파이썬 코드로 DB를 다룰 수 있습니다.
2.  **유지보수 용이:** DB 스키마가 변경되어도 클래스 정의만 수정하면 됩니다.
3.  **DB 독립성:** SQLAlchemy 같은 ORM을 쓰면, 설정만 바꾸면 SQLite에서 MySQL이나 PostgreSQL로 쉽게 전환할 수 있습니다.

---

## 2. SQLAlchemy 기초

파이썬에서 가장 강력하고 표준적인 ORM 라이브러리는 **SQLAlchemy**입니다.

### 2.1 모델 정의 (Declarative Base)
SQLAlchemy에서는 클래스를 정의하는 것이 곧 DB 테이블을 설계하는 것입니다.

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

# DB 테이블 설계
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

# DB 연결 설정
engine = create_engine('sqlite:///my_orm_db.db')
Base.metadata.create_all(engine)
```

### 2.2 데이터 조작 (CRUD)
```python
Session = sessionmaker(bind=engine)
session = Session()

# 1. 생성 (Create)
new_user = User(name="지니", age=15)
session.add(new_user)
session.commit()

# 2. 조회 (Read)
user = session.query(User).filter_by(name="지니").first()
print(f"찾은 사용자: {user.name}, {user.age}세")

# 3. 수정 (Update)
user.age = 16
session.commit()

# 4. 삭제 (Delete)
session.delete(user)
session.commit()
```

---

## 3. 🔍 Deep Dive: ORM의 트레이드-오프 (Trade-off)

ORM이 만능은 아닙니다. 모든 기술에는 장단점이 있습니다.

- **장점:** 개발 속도가 빠르고 코드가 깔끔하며 객체지향적입니다.
- **단점:** 내부적으로 SQL로 변환되는 과정을 거치므로, 직접 짠 최적화된 SQL보다 **성능이 약간 떨어질 수 있습니다.**

**결론:** 단순한 CRUD 작업은 ORM을 사용하고, 매우 복잡하고 성능이 중요한 쿼리는 **Raw SQL**을 직접 작성하는 방식을 혼합해서 사용하는 것이 가장 좋습니다.

---

## ✍️ 이번 주 연습 문제

**문제 1.** SQLAlchemy를 사용하여 `Product` (상품) 클래스를 설계해 보세요. (속성: id, name, price, stock)

**문제 2.** 상품의 가격이 10,000원 이상인 상품들만 조회하여 출력하는 함수 `get_expensive_products()`를 구현해 보세요.

**문제 3.** (심화) ORM의 'Lazy Loading'과 'Eager Loading'의 차이점이 무엇인지 조사하고, 왜 대량의 데이터를 조회할 때 N+1 문제가 발생하는지 설명해 보세요.
---

## 🔍 Deep Dive: ORM의 핵심 패턴 - 액티브 레코드(Active Record) vs 데이터 매퍼(Data Mapper)

ORM은 SQL 쿼리문을 직접 작성하지 않고 객체로 데이터베이스를 설계/제어하는 현대 백엔드 핵심 아키텍처입니다.
1. **Active Record 패턴 (예: Django ORM)**: 하나의 모델 클래스가 테이블 정의와 실제 DB 작업(save, delete 등)을 모두 도맡아 처리하는 모델입니다. 직관적이고 빠르게 코드를 짤 수 있어 소형 프로젝트에 강합니다.
2. **Data Mapper 패턴 (예: SQLAlchemy)**: 모델 클래스는 순수한 객체 상태만 가지고, 실제 데이터베이스 저장/조회 작업은 **`Session` (Unit of Work)** 객체가 담당하여 객체와 데이터베이스 매핑 레이어를 완전히 격리합니다. 설계가 엄격하고 유연하여 대형 비즈니스 프로젝트에 적합합니다.

---

## ☕ Java vs Python 스나이퍼 비교

### ORM 프레임워크 대결
*   **Java**: 표준 스펙인 **JPA (Jakarta Persistence)** 가 존재하며, 이를 구현한 대표적인 프레임워크가 바로 **Hibernate** 입니다. 스프링 프레임워크와 결합해 대다수의 엔터프라이즈 환경에서 사용되며 영속성 컨텍스트 관리와 1차/2차 캐시, 더티 체킹 등 고도로 정교하고 무거운 아키텍처가 동반됩니다.
*   **Python**: **SQLAlchemy**가 업계의 절대적인 지배자입니다. 자바의 JPA처럼 데이터 매퍼 패턴을 채택하면서도, 동적 언어의 파워를 활용해 선언적(Declarative) 베이스 기반으로 빠르게 스키마 클래스를 구성하고 직관적인 메커니즘을 제공합니다.

---

## 🎧 Vibe Coding

> **🗣️ 학생 프롬프트 (AI에게 이렇게 명령해 보세요):**
> "파이썬 **`SQLAlchemy`** 모던 버전(v2.0 등)을 활용하여 `User` 테이블 클래스를 선언하고, 데이터를 추가한 뒤 세션을 커밋하고, 전체 데이터를 나이 순서로 쿼리하는 객체 지향 ORM 예시 코드를 구현해 줘."

---

## 코딩 영단어 학습 📝

*   **`ORM` (Object-Relational Mapping)**: 객체-관계 매핑. (객체지향 클래스 구조와 관계형 데이터베이스의 테이블 스키마 구조를 자동으로 연결하여 SQL 없이 DB를 다루게 돕는 브릿지 기술입니다.)
*   **`Session`**: 세션. (데이터베이스와의 논리적인 연결 흐름을 유지하고, 변경된 객체의 트랜잭션을 수집 및 유도하는 ORM 핵심 작업 영역 공간입니다.)
*   **`Migration`**: 마이그레이션. (파이썬 클래스로 작성한 테이블 설계 변경 이력을 실제 DB 서버에 물리적으로 안전하게 반영하여 동기화하는 DB 버전 관리 프로세스입니다.)
