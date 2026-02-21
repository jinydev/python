# 기초탄탄 파이썬 (Hands-on Python)

이 프로젝트는 "기초탄탄 파이썬" 강의를 위한 웹사이트 소스 코드입니다.

## 프로젝트 구조

이 프로젝트는 Jekyll을 기반의 프로젝트의 구조를 따르고 있습니다.

- **src/**: 소스 코드가 위치하는 디렉토리입니다.
    - **_layouts/**: 페이지 레이아웃 템플릿 (bootstrap, default, docs, home, welcome 등)
    - **_includes/**: 재사용 가능한 HTML 조각 (헤더, 푸터, 네비게이션 등)
    - **assets/**: 이미지, CSS, JS 등의 정적 파일
    - **_data/**: 데이터 파일 (navigation.yml 등)
    - **part01/ ~ part04/**: 파이썬 마크다운 문서 소스
- **docs/**: 빌드된 정적 웹사이트가 출력되는 디렉토리 (GitHub Pages 배포용)
- **_config.yml**: Jekyll 설정 파일

## 시작하기

### 필요 조건

- Ruby (Jekyll 실행을 위해 필요)
- Bundler
- Node.js (Bootstrap 등 의존성 관리를 위해 필요)

### 설치 및 실행

1. 의존성 설치:
   ```bash
   bundle install
   npm install
   ```

2. 로컬 서버 실행:
   ```bash
   bundle exec jekyll serve --port 4001
   ```

## 기여

수정 사항이나 제안이 있다면 이슈를 등록하거나 PR을 보내주세요.
