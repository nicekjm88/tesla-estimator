This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

This project relies on two Supabase environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - the URL of your Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - the anonymous API key for the project.

Create a `.env.local` file in the project root and add these variables before running the development server:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

After setting them, start the server with:

```bash
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Summary

### 🗂️ 프로젝트 구조

- **src/app** – Next.js 페이지와 API 라우트, 전역 스타일 및 레이아웃 파일  
- **src/components** – 색상, 휠, 인테리어 등 사용자 인터페이스 구성요소  
- **src/constants** – 모델·옵션·가격 등의 데이터 정의  
- **src/utils** – 가격 계산 및 통화 포맷 기능  
- **src/lib** – Supabase 클라이언트  
- **src/services** – 향후 Firebase 등과 연동을 위한 자리(현재 비어 있음)  
- **public**, **src/assets** – 차량 이미지 등 정적 파일  

---

### 🔑 중요 포인트

- `calculatePrice` 함수가 **총 비용**을 산출하며, **보조금·자녀 혜택·취득세** 등을 모두 반영  
- **지역 정보**는 Supabase에서 읽어 오며, 환경 변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)가 필요  
- `jsconfig.json`에서 `@/…` 경로를 `src`로 매핑하여 **모듈 import가 간단**  
- 일부 컴포넌트(`CarDisplay.js`, `ActionButtons.js` 등)와 `services/firebase.js`는 **아직 구현되지 않아, 향후 확장 가능성**을 보여 줌

---

### 📝 다음 학습·확인 사항

- **Supabase 연동 세부 설정:**  
  `.env` 파일에 필요한 키를 넣고, 테이블 구조(특히 `regions`)를 이해해야 함

- **미완성 컴포넌트 구현:**  
  빈 파일로 남아 있는 구성요소들이 계획된 기능인지 확인하고, 구현 여부 결정

- **빌드/배포 흐름:**  
  `package.json`의 스크립트(`dev`, `build`, `deploy`) 사용 방식을 익혀야 함

- **테스트 및 문서화:**  
  현재 테스트 코드가 없으므로, 추후 **Jest** 등으로 유닛 테스트를 추가하면 안정성이 높아짐

- **Next.js App Router 구조:**  
  `src/app` 폴더의 `layout.js`와 `page.js` 파일을 통해 **라우팅 동작 방식**을 이해해야 함