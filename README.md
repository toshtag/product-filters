## Image

<img width="1101" alt="Image" src="https://github.com/user-attachments/assets/ba12591e-b7b0-4256-8e0e-acc835ab39a9" />

## Tools & Packages Used

- Nextjs: <https://nextjs.org/>
- Shadcn UI: <https://ui.shadcn.com/docs/installation/next>
- Upstash: <https://upstash.com/>

## Installation Steps

### 1. **Install packages**

Run the following command:

```
npm install
```

or

```
yarn install
```

or

```
pnpm install
```

or

```
bun install
```

### 2. **Add .env file**

Create a new file named `.env` in the root of your project and add the following content:

```
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
```

or run the following command:

```
cp env.example .env
```

### 3. **Setup Database on Upstash**

- Access to <https://upstash.com/> and sign up or login.
- `Create Index` on Vector.
  - Type: `Dense`
  - Embedding Model: `Custom`
  - Dimensions: `3`
  - Metrics: `EUCLIDEAN`
- Add Environment Variables to `.env` file
- Set data from seed file.
  - `npm run seed` or `yarn seed` or `pnpm seed` or `bun seed`

### 4. **Start the development server**

Start the development server by running:

```
npm run dev
```

or

```
yarn dev
```

or

```
pnpm dev
```

or

```
bun dev
```

You can access the application in your browser at <http://localhost:3000>.

## Reference

<https://youtu.be/_017xTgnqGw>
