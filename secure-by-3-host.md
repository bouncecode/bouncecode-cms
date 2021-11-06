
```plantuml
database 사용자디바이스
actor 사용자
control 미스터로그인
actor 사용기관

사용자 -> 미스터로그인 : 회원가입
activate 미스터로그인
미스터로그인 -> 미스터로그인 : 사용자의 대칭키 생성
미스터로그인 --> 사용자
deactivate 미스터로그인

...

사용자 -> 미스터로그인 : 로그인
activate 미스터로그인
미스터로그인 -> 미스터로그인 : 사용자 인증 토큰 생성
미스터로그인 --> 사용자 : 사용자 인증 토큰
deactivate 미스터로그인

사용자 -> 사용자디바이스 : 사용자의 비대칭키\n(비밀키, 공개키) 생성
activate 사용자디바이스
사용자디바이스 -> 사용자디바이스 : 사용자의 비밀키 저장
사용자디바이스 --> 사용자
deactivate 사용자디바이스

사용자 -> 미스터로그인 : 사용자의 공개키 등록
activate 미스터로그인
미스터로그인 -> 미스터로그인 : 사용자의 공개키 저장
미스터로그인 -> 미스터로그인 : 사용자의 공개키로\n사용자의 대칭키를 암호화
미스터로그인 --> 사용자 : 암호화된 사용자의 대칭키 전송
deactivate 미스터로그인

사용자 -> 사용자디바이스 : 암호화된 사용자의 대칭키 전송
activate 사용자디바이스
사용자디바이스 -> 사용자디바이스 : 암호화된 사용자의 대칭키 저장
사용자디바이스 --> 사용자
deactivate 사용자디바이스

...

사용자 -> 사용자디바이스 : 사용자의 데이터 입력
activate 사용자디바이스
사용자디바이스 -> 사용자디바이스 : 암호화된 사용자의 대칭키를\n사용자의 비밀키로 복호화
사용자디바이스 -> 사용자디바이스 : 사용자의 데이터를\n사용자의 대칭키로 암호화
사용자디바이스 -> 사용자디바이스 : 사용자의 데이터를\n사용자의 비밀키로 서명
사용자디바이스 --> 사용자
deactivate 사용자디바이스

사용자 -> 미스터로그인 : 사용자의 데이터를 전송
activate 미스터로그인
미스터로그인 -> 미스터로그인 : 사용자의 데이터를\n사용자의 공개키로\n진정성 검증

미스터로그인 -> 사용기관 : 사용자의 데이터를 전송
activate 사용기관
사용기관 -> 사용기관 : 사용기관의 키로\n사용자의 데이터를 암호화
사용기관 --> 미스터로그인 : 사용기관의 키로 암호화된\n사용자의 데이터를 암호화
deactivate 사용기관

미스터로그인 -> 미스터로그인 : 미스터로그인의 키로\n사용자의 데이터를 암호화
미스터로그인 -> 미스터로그인 : 사용자의 키로 암호화,\n사용기관의 키로 암호화,\n미스터로그인의 키로 암호화된\n사용자의 데이터를 저장
미스터로그인 --> 사용자
deactivate 미스터로그인
deactivate 사용자
```