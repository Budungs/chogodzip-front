## 🔖 Branch
- `main`: **안정화 버전** - 우선순위 그룹별 기능 구현 완료 시 `dev`로부터 병합
- `dev`:  **개발 환경**
- `feature_{기능명}`: **기능별 작업 환경**

<br>

## 🔖 Commit Message
- 커밋 메세지 참고: [.gitmessage.txt](https://github.com/Budungs/chogodzip-front/blob/main/.gitmessage.txt) or [커밋 메세지 작성법](https://jane-aeiou.tistory.com/93)   

<br>

## 🔖 Git Guide
**[ 처음 저장소 복제 ]**

```
$ git clone https://github.com/Budungs/chogodzip-front.git
```

<br>

**[ 기능 구현 시작할 때마다 반복 ]**

1. `dev` 브랜치를 베이스로 feature 브랜치 생성: 기능 브랜치는 이름을 `feature_기능명`으로 설정
```
$ git branch feature_{기능명} dev
```
2. 생성한 `feature_기능명` 브랜치로 이동하여 작업
```
$ git checkout feature_{기능명}

$ git add {등록할 파일} // 변경 사항 스테이징
$ git commit -m '{COMMIT MESSAGE}' //commit
```

3. 커밋을 원격 저장소에 push
```
$ git push origin feature_{기능명}
```

4. `feature_{기능명}` -> `dev` 브랜치로 **Pull Request(PR)** 요청 (Repo 웹페이지 'Compare & pull request')
    1. PR 대상 브랜치를 `dev`로 변경
    2. PR 제목, 본문을 템플릿에 맞게 입력 (제목도 커밋 메세지와 같이 `{타입}:{제목}`)
    3. 리뷰를 요청할 상대 설정
    4. 본인으로 설정 (현재 PR 담당자)
    5. **PR 승인 후 병합(merge)**
        - 본인  PR은 승인 후 본인이 병합!
        - 만약 브랜치에서 구현할 기능 구현이 완료되었다면, 해당 `feature_{기능명}` 브랜치 삭제
          ```
          $ git branch -d feature_{기능명} //로컬 브랜치 삭제
          $ git push origin --delete feature_{기능명} //원격 브랜치 삭제
          ```

**[우선순위가 같은 기능들의 구현 모두 종료]**

 5. <u>우선순위가 같은</u> 기능들의 구현이 모두 끝났다면, `dev` → `main` 병합: **PR**
