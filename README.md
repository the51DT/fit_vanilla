# 퍼블리싱 시스템 구축 및 표준화

## 개요

이 프로젝트는 웹 UI 퍼블리싱의 표준화와 컴포넌트 재사용성을 높이기 위한 HTML/CSS 템플릿 모음입니다.  
TailwindCSS 기반의 디자인 시스템을 적용하며 논리적 구조, 유지보수성을 중점적으로 설계하였습니다.

## 폴더 구조

```
html/
├── components/         # 주요 UI 컴포넌트(버튼, 체크박스 등) 샘플 HTML
├── docs/               # 스타일 가이드 문서
├── templates/          # 전체 레이아웃 및 스타일 파일
│   └── styles/
│       └── components.css
└── index.html          # 컴포넌트 통합 데모
```

### 주요 파일 및 폴더 설명

- `components/`
  - `components_button.html` ~ `components_textarea.html`  
    : 버튼, 체크박스, 입력창, 드롭다운, 모달, 라디오, 셀렉트, 탭 등 UI 요소별 샘플 코드 제공
- `docs/style-guide.html`  
  : 디자인 시스템 및 퍼블리싱 가이드 문서
- `templates/templates_layout.html`  
  : 전체 페이지 레이아웃 템플릿
- `templates/styles/components.css`  
  : 커스텀 컴포넌트 스타일 정의
- `index.html`  
  : 모든 컴포넌트 데모 및 TailwindCSS 확장 컬러/스타일 예시 포함

## 사용 방법

1. `index.html`을 브라우저에서 열어 전체 컴포넌트 미리보기 가능
2. 각 `components/*.html` 파일에서 필요한 UI 요소 코드 복사하여 프로젝트에 적용
3. 커스텀 스타일은 `templates/styles/components.css` 참고 및 확장

## 코드 품질 및 확장성

- TailwindCSS + 커스텀 CSS 조합 (BEM 등 네이밍 규칙 준수)
- HTML5 시맨틱 마크업
- 재사용 가능한 컴포넌트 구조
- 유지보수 용이한 분리형 파일 구성

