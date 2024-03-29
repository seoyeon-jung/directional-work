# 디렉셔널 과제 테스트 - Tic Tac Toe 게임 변형

## 배포된 페이지 바로가기

[Tic Tac Toe](https://directional-work.vercel.app/)

<br/>
<br/>

## ✨ 사용한 기술 스택

`React` `Typescript` `Json-server` `axios` `tailwind CSS`

#### json-server 사용 이유

- 게임 세팅의 기록을 받아와서 게임을 구현할 때 게임 세팅 데이터를 저장해야 했기 때문입니다.
- 게임 종료 후 게임의 순서, winner, 결과 등을 저장할 서버가 필요했기 때문입니다.
- 초기에는 `firebase`를 사용하려 했으나, 단기간 내에 간단한 JSON 파일을 통해 API를 모의할 수 있기 때문입니다.
- 만약 실제로 게임을 배포할 경우에는 백엔드 서버와 연동하거나 `firebase`를 사용하는 게 더 유용하다는 생각을 했습니다.

#### axios를 사용한 이유

- fetch보다 편리한 API와 기능을 제공하기 때문입니다.
- 예를 들어, `get` 메서드로 간단하게 GET 요청을 보낼 수 있고 응답 받을 때는 `response.data`로 쉽게 접근할 수 있습니다.
- 또한 에러 핸들링은 `catch` 메서드로 처리할 수 있습니다

#### tailwind CSS를 사용한 이유

- 쉽고 빠르게 스타일링을 할 수 있기 때문입니다.
- 일관된 디자인을 적용할 수 있어서 편리했습니다.
  - `Button` 컴포넌트를 만들어 재사용했습니다.

<br/>
<br/>

## 🎯 게임 방법

- 게임보드는 3x3, 4x4, 5x5 또는 그 이상의 격자 형태입니다.
- 플레이어 두명은 번갈아 가면서 마크가 없는 격자 칸 하나에 자신의 마크를 표시합니다.
- 마크를 놓았을 때 가로, 세로, 또는 대각선 방향으로 승리조건(최소 3, 최대 게임판의 행 숫자)으로 설정한 숫자로 놓였다면 해당 마크를 놓은 플레이어가 승리합니다.
- 모든 칸이 마킹되었지만 어느 플레이어도 승리하지 못한 경우 무승부가 됩니다.
- 각 플레이어는 게임 종료 전일 경우 각자 3회까지 무르기가 가능합니다. 무르기를 하면 마지막 마크가 놓이기 전의 상황으로 돌아갑니다.

<br/>
<br/>

## 🚀 구현해야 할 화면

1. 홈
   - `게임 시작` 버튼
   - `게임 보기` 버튼
2. 게임 설정
   - 게임판 크기 설정
   - 각 플레이어의 마크 / 색상 설정
     - 기본값: 플레이어 1 - X, 파랑 / 플레이어 2 - O, 빨강
     - 선택 가능: 동그라미, 세모, 네모, 엑스 등
     - 선택 가능: 색 설정
   - 먼저 마크를 놓는 플레이어 설정
     - 기본값: 랜덤
   - `시작` 버튼
3. 게임 화면
   - `게임 보드`
   - 두 플레이어의 정보 (마크, 마크색, 남은 무르기 횟수)
   - 현재 마크를 놓는 플레이어의 정보
   - `홈으로 돌아가기` 버튼
4. 기록된 게임 보기
   - 게임 종료 후 게임 화면
   - 게임판 각 마크에 순서 표시
   - `홈으로 돌아가기` 버튼

<br/>
<br/>

## 📃 구현할 기능 목록 (추후 수정 가능)

### 0️⃣ 화면 구현

- [x] 홈
- [x] 게임 설정
- [x] 게임 화면
- [x] 기록된 게임

### 1️⃣ 게임 setting

- [x] 게임 setting 데이터 저장
- [x] 저장한 setting을 게임 보드 페이지에 불러오기

### 2️⃣ 게임 보드

- [x] 3x3, 4x4, 5x5, 그이상 게임 보드 구현
- [x] 보드 클릭 시 마크 표시 후 플레이어 변경
  - [x] 가로 / 세로 / 대각선 방향 승리 조건(최소 3, 최대 게임판의 행 숫자) 설정
- [x] `무르기 버튼` 클릭 시 직전으로 돌아가기
  - [x] 각 플레이어 당 `무르기` 3번으로 제한
- [x] 종료 후 게임 기록 저장
  - [x] 게임 종료 후 게임 보드 구현
  - [x] 각 마크 당 순서 구현

### 3️⃣ 게임 기록하기

- [x] 게임 종료 시 해당 게임의 데이터 저장
- [x] 게임 기록 페이지에 모든 게임 기록 불러오기

<br/>
<br/>

## 커밋 메세지

- `feat` : 새로운 기능을 추가
- `fix` : 버그 고치기
- `style` : 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- `refactor` : 코드 리팩토링
- `comment` : 주석 추가 및 변경
- `docs` : README 등의 문서 수정
- `test` : test 추가
- `design` : UI 구현
- `chore` : 라이브러리 install 등
- `rename` : 파일, 폴더명 수정 혹은 이동
- `remove` : 파일 삭제
