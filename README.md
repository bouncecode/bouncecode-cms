[![Build Status](https://travis-ci.com/bouncecode/bouncecode-cms.svg?branch=master)](https://travis-ci.com/bouncecode/bouncecode-cms)

# BounceCode CMS

궁금하신게 있으시면 언제든 말씀해주세요.

카카오톡 오픈채팅: https://open.kakao.com/o/ghJjrKbb

## 서버 시작

```bash
docker-compose up --build
```

## Storybook 실행

```bash
yarn storybook
```

## Jest 유닛 테스트

```bash
docker-compose run --rm app \
  bash -c "yarn test"
```

## Storybook, Jest, Typedoc 문서화

```bash
docker-compose run --rm app \
  bash -c "yarn docs"
```

## 관리자 추가

```bash
# 회원가입 후 실행하셔야합니다.
docker-compose run --rm app \
  bash -c "yarn admin:add --email=tpnet3@gmail.com"
```

## 스크린샷

![Graphql](media/screencapture-graphql.png)

![Dashboard](media/screencapture-dashboard.png)

![LogIn](media/screencapture-login.png)

![SignUp](media/screencapture-signup.png)
