# Prismic Slice Library Example

Brought to you by Prismic Solution Engineering Team.

### Prerequisites

To make use of this project, you need to have the following:

  - NodeJS v18 or above installed on your local machine: https://nodejs.org/en/,
  - a Prismic and Next.js project built with Slice Machine (slice-machine-ui v1.26.0 or above),
  - Tailwind CSS already used for styling your project (or willingness to add it for Slice Library)

> [!NOTE]
> This project is a simplified version of Prismic Next.js Demo project a.k.a.
> [slicify](https://github.com/prismicio-solution-engineering/slicify-app)

You can see this slice library deployed [here](https://slicify-library.vercel.app/slice-library).

### Step 1. Add the `/app/slice-library` directory to your project

The directory contains components and styles for the slice library page. This directory needs to be copied to your `app` directory,
which — depending on the Next.js project configuration — can be located at either `<your-project>/app` or `<your-project>/src/app`.

> [!TIP]
> If you are not using TypeScript and don't want to set it up for your project, a simple way to produce plain JavaScript files
> without any TypeScript annotations is the following command (`<slice-library-project>` and `<your-project>` are of course placeholders,
> please adjust them to your current working directory):
> 
> ```bash
> npx sucrase <slice-library-project>/app/slice-library -d <your-project>/app/slice-library --transforms typescript,jsx --jsx-runtime preserve
> ```
>
> It will take all the TypeScript files for the `/slice-library` page, strip all TypeScript annotations from the code and place
> resulting files in the `app/slice-library` of your project. You will still have to copy the CSS file by hand if you need it, as
> the command transforms only the TypeScript files.

There are three main files you need to copy:

  - [page.tsx](https://github.com/prismicio-solution-engineering/slicify-library/blob/main/app/slice-library/page.tsx) — provides the main
    component for the slice library page and holds code to load model and mock data for all your defined slice libraries,
  - [SliceLibrary.tsx](https://github.com/prismicio-solution-engineering/slicify-library/blob/main/app/slice-library/SliceLibrary.tsx) —
    provides a UI server component to display all your slices on the page,
  - [SliceLibraryNav.tsx](https://github.com/prismicio-solution-engineering/slicify-library/blob/main/app/slice-library/SliceLibraryNav.tsx) —
    provides a UI client component to handle sidebar navigation.

We also provide those two optional files for your convenience:

  - [layout.tsx](https://github.com/prismicio-solution-engineering/slicify-library/blob/main/app/slice-library/layout.tsx) —
    provides a basic, empty layout for your slice library in case you don't have a global layout, or it will interfere with
    slice library styling (in which case, you might need to use [multiple root layouts](
    https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts) with this file
    being one of them). Feel free to adjust it to your needs or remove it,
  - [styles.css](https://github.com/prismicio-solution-engineering/slicify-library/blob/main/app/slice-library/styles.css) —
    provides Tailwind CSS styles for the slice library. If you already have a layout that includes your Tailwind CSS styling
    globally, feel free to remove it.

### Step 2. Setup dependencies

You will need to add those dependencies for the slice library page:

```bash
npm add @headlessui/react @prismicio/api-renderer
```

If you don't already use Tailwind CSS, you can follow the steps below to set it up:

<details>
<summary>
Tailwind CSS setup
</summary>

* install Tailwind CSS and it's dependencies:
  ```bash
  npm add tailwindcss postcss autoprefixer
  ```
* initialise Tailwind CSS in your repository:
  ```bash
  npx tailwindcss init -p
  ```
* include the slice library page in your Tailwind CSS configuration, if it's not already covered by other globs:
  ```javascript
  module.exports = {
    content: [
      // When not using the `src` directory:
      "./app/slice-library/**/*.{js,ts,jsx,tsx,mdx}"
  
      // Or, if using `src` directory:
      "./src/app/slice-library/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    ...
  }
  ```
* ensure Tailwind CSS styles are imported — e.g. by using included layout and stylesheet, or analogous
  configuration specific to how your project is set up.
</details>

### Step 3. Optional (only if you have multiple slice-libraries)

Edit the `SliceLibrary.tsx` file to include all your slice libraries components

```ts
// If needed, Add components from all your slice libraries if you have multiple:
// import { components as ecommerceComponents } from '@/slices/blog/index'
// import { components as marketingComponents } from '@/slices/marketing/index'
// const __allComponents = { ...ecommerceComponents, ...marketingComponents }

import { components as __allComponents } from '@/slices/index'
```

### Step 4. Run your app and go to the `/slice-library` page

```bash
npm run dev
```

You can now access your `/slice-library` page here: [http://localhost:3000/slice-library](http://localhost:3000/slice-library).


### Step 5. Run Slice Machine and edit your mocks

```bash
npm run slicemachine
```

You can now access your Slice Machine here: [http://localhost:9999](http://localhost:9999).

You can then go into each of your slices and edit the mock data by clicking the simulate button at the top right. This mock data will be
used to build your `/slice-library` page. Don't forget to save your mocks.

Slice Machine generates mocks automatically, but you might want to make them prettier!

# Troubleshooting

- If you have issues with Next.js not displaying your slices when deployed, you can add this configuration to your `next.config.js`, so that
  Next.js  knows to include your `/slices` folder when building your project, as shown [here](https://github.com/prismicio-solution-engineering/slicify-app/blob/main/next.config.mjs#L5-L9):

  ```js
  experimental: {
    outputFileTracingIncludes: {
      "/slice-library": ["./slices/**/*"]
    }
  },
  ```

- Some slices might fail if the slice data is empty (especially for unfilled content relationships or integration fields). In these cases
  the mocks are not generated by the Slice Machine currently, so the data might be missing (this feature will be added in future). You can
  modify your slice components to handle missing data gracefully, so the slice library page works without issues.

- If you include TypeScript files in a vanilla–JavaScript–based project, Next.js will helpfully try to set this project up for TypeScript
  for you. However, this automatic process doesn't respect alias configuration at the time of writing — if building your page fails with
  errors about `@/prismicio` being unresolvable, ensure that alias configuration at `compilerOptions.path` matches between `jsconfig.json`
  and `tsconfig.json`.

## Disclaimer

This project is made to test out Prismic, Slices used in this project are subject to Tailwind UI license: https://tailwindui.com/license.  
Images used in this project are from unsplash.com, please find unsplash license here: https://unsplash.com/license.
