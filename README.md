[![Build Status](https://travis-ci.com/bouncecode/bouncecode-cms.svg?branch=master)](https://travis-ci.com/bouncecode/bouncecode-cms)

# BounceCode CMS

궁금하신게 있으시면 언제든 말씀해주세요.

카카오톡 오픈채팅: https://open.kakao.com/o/ghJjrKbb

## 실행 방법

```bash
# 서버 실행
docker-compose up --build

# 시드 데이터 추가 (최초 관리자 계정 생성 등)
docker-compose run --rm app.bouncecode-cms \
  bash -c "yarn seed:run"
```

## 개발 환경

```bash
# Storybook 실행
yarn storybook

# Jest 유닛 테스트
docker-compose run --rm app.bouncecode-cms \
  bash -c "yarn test"

# Storybook, Jest, Typedoc 문서화
docker-compose run --rm app.bouncecode-cms \
  bash -c "yarn docs"
```

## 관리자 설정

```bash
# 관리자 추가
docker-compose run --rm app.bouncecode-cms \
  bash -c "yarn admin:create --email=tpnet3@gmail.com --password=PASSWORD"


# 관리자로 전환 (회원가입 된 상태여야 합니다.)
docker-compose run --rm app.bouncecode-cms \
  bash -c "yarn admin:add --email=tpnet3@gmail.com"
```

## 스크린샷

![Graphql](media/screencapture-graphql.png)

![Dashboard](media/screencapture-dashboard.png)

![LogIn](media/screencapture-login.png)

![SignUp](media/screencapture-signup.png)
