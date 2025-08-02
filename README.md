# 🐰 클릭 몇 번으로 일정 합의 완료, 이때어때 (Ittaeok)

효율적인 일정 조율을 위한 통합 스케줄링 플랫폼
개인과 그룹의 일정 조율 과정에서 발생하는 비효율성을 해결하고 모든 구성원이 참여하지 못하는 현실적인 상황을 고려하여 유연한 일정 관리 서비스를 제공합니다.

- 배포 URL : https://ittaeok.com
- 시연 URL : https://www.youtube.com/watch?v=coeKWbkHD6g

## 프로젝트 소개

![landing gif](/public/ladingPage.gif)

- 바쁜 현대인들의 일정 잡기를 클릭 몇번으로 쉽고 간편하게 해주는 서비스입니다.
- 나의 가능한 시간을 등록하고 다른 모임원들의 시간을 취합하여 가장 빠른 일정, 긴 시간 볼 수 있는 일정을 확인하고 정할 수 있습니다.
- (1회성 모임) 1번만 만나는 모임 일정을 조율할 수 있습니다.
- (그룹 모임) 자주 만나는 모임을 그룹으로 설정하고 해당 그룹원끼리 일정을 계속 생성할 수 있습니다.
- (오프라인 모임) 모임원들의 출발역 등록 후 모두의 출발지에서 가장 중간 지점을 계산하여 추천 목록을 보여주고 투표하여 중간 지점을 정할 수 있습니다.
- (온라인 모임) 온라인 미팅 플랫폼을 정하지 못했다면 줌 회의장을 생성해 줍니다.
- 정해진 일정에서는 다양한 워크스페이스 링크를 등록하여 사용할 수 있습니다.
- 마이페이지에서 내가 자주 등록하는 역, 기본 정해진 시간을 등록하여 불러오기를 통해 더 쉽게 일정 등록에 사용할 수 있습니다.

## 팀원 구성

|                                    박상윤                                    |                                    박은서                                    |                                    박준규                                     |                                    현혜주                                     |                                    황수지                                     |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/54721624?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/70631889?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/124859300?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/123932695?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/176355864?v=4" width="150"> |
|                     [@ygvbhy](https://github.com/ygvbhy)                     |                    [@snowari](https://github.com/snowari)                    |               [@parkjungyuxx](https://github.com/parkjungyuxx)                |                      [@hxezu](https://github.com/hxezu)                       |                 [@ssujissuji](https://github.com/ssujissuji)                  |

## 📦 Tech Stack

- **Next.js (App Router)**

## 🌳 프로젝트 구조

```bash
.
├── .github
├── .next
├── node_modules
├── public
└── src
  ├── app
  │   ├── auth
  │   ├── group
  │   ├── meeting
  │   ├── mypage
  │   ├── schedule
  │   └── utils
  ├── assets
  ├── components
  │   ├── auth
  │   ├── dashboard
  │   ├── election
  │   ├── feature
  │   ├── home
  │   ├── landing
  │   ├── layout
  │   ├── mypage
  │   └── ui
  ├── lib
  ├── providers
  ├── stores
  ├── types
  ├── middleware.ts
  ├── svg.d.ts
  ├── .env
  ├── .gitignore
  ├── components.json
  ├── eslint.config.mjs
  ├── localhost-key.pem
  ├── localhost.pem
  ├── next-env.d.ts
  ├── next.config.ts
  ├── package-lock.json
  ├── package.json
  ├── postcss.config.mjs
  ├── README.md
  ├── server.js
  └── tsconfig.json
```

## 역할 분담

### 🧛박상윤

### 👩‍🎤박은서

### 🥷박준규

### 🧝‍♀️현혜주

### 🧟‍♀️황수지

- 서비스 메인 캐릭터 기획 및 디자인
- 공통 컴포넌트 및 마이페이지 퍼블리싱
- 기능 구현
  - 유저 정보 조회
  - 유저 프로필 이미지, 유저 이름 수정
  - 근처역 등록 수정 및 저장
  - 구글 캘린더 등록 및 삭제

## 개발 기간 및 작업 관리

### 개발기간

- 전체 개발 기간 : 2025. 06. 26 ~ 2025. 07. 31
- 디자인 및 퍼블리싱 : 2025. 06. 26 ~ 2025. 07. 09
- 기능구현 : 2025. 07. 10 ~ 2025. 07. 31

### 작업관리

- WBS를 이용한 프로젝트 진척 정도 공유 및 확인

## 🚀 Getting Started

```bash
npm install
npm run dev
```
