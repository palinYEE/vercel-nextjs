# 칭찬 스티커판

학생들의 칭찬 스티커를 관리하는 웹 애플리케이션입니다.

## 기능

- 학생 등록 및 관리
- 스티커 추가/제거
- 교사별/레벨별 필터링
- TOP 3 학생 표시
- 스티커 수 통계 차트
- CSV 내보내기/가져오기

## 기술 스택

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- PapaParse

## 설치 및 실행

1. 저장소 클론

```bash
git clone [repository-url]
cd sticker-board
```

2. 의존성 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 빌드 및 프로덕션 실행

```bash
npm run build
npm start
```

## 환경 설정

1. Google Sheets API 설정

   - 스프레드시트 URL을 `SHEET_URL` 상수에 설정
   - Google Apps Script URL을 `POST_URL` 상수에 설정

2. 캐릭터 이미지
   - `public` 폴더에 `animal_1.png`부터 `animal_20.png`까지의 이미지 파일 추가

## 라이센스

MIT
