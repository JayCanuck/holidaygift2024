# HolidayGift2024

I like to do cute surprises for friends around the holidays. For 2024, I decided to make a quick-n-dirty customized holiday gift website, which can provide customized message for predefined recipients as well as distribute preconfigured Steam game redeemable codes.

Realistically, this also ended up as a fun testbed example single-page Next.js webapp with a threejs 3D photosphere.

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

## Assets

This project expects certain dev-provided models available via env var values containing their static URL:

* `NEXT_PUBLIC_BACKGROUND` - An HDR image used for environment background. Any panorama image can be used for this.
* `NEXT_PUBLIC_LETTER` - A jpg image used as background for 
* `NEXT_PUBLIC_ENVELOPE` - An animated envelope model (I used [this one](https://www.fab.com/listings/3e5bfd19-2c9b-45bc-b2b4-0443e9525c9c)). Any similar model with corresponding animations could be used.

This repo includes "falling snow loop" GLB model, copyright 2020 Elin Hohler under [CC Attribution 4.0 license](https://creativecommons.org/licenses/by/4.0/)
https://sketchfab.com/3d-models/falling-snow-loop-a19b97d7e64548b998eaeb4d8477c24c
