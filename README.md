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

## Environment Variable Setup

This project is designed to use environment variables for assets and game keycode data.

* `NEXT_PUBLIC_BACKGROUND` - An HDR image used for environment background. Any panorama image can be used for this.
* `NEXT_PUBLIC_BACKGROUND_LOW` - An basic static image used for page background on low-end devices.
* `NEXT_PUBLIC_ENVELOPE` - An animated envelope model (I used [this one](https://www.fab.com/listings/3e5bfd19-2c9b-45bc-b2b4-0443e9525c9c)). Any similar model with corresponding animations could be used.
* `NEXT_PUBLIC_ENVELOPE_LOW` - A basic static image used for the envelope on low-end devices.
* `NEXT_PUBLIC_LETTER` - A jpg image used to provide texture for the letter.

There's also backend-specific `MYSTERY` environment variable containing a stringified JSON value containing gift game codes and personalized metadata. This is the expected interface for the object:

```ts
interface MysteryObject {
  [userID: string]: {
    name?: string; // recipient name
    message?: string; // customized gift message to override default top message
    footer?: string; // footer message after game codes, right before signature
    games: {
      name: string; // game name, not currently used anywhere
      code: string; // redeemable game code value
    }[]; // array of the game details
  }
}
```

For example:

```json
{
  "00000000-0000-0000-0000-000000000000":{
    "name":"Mr. Debug",
    "message":"Test debug message.",
    "footer": "Have a great holidays!",
    "games":[
      {"name":"Game 1","code":"00000-00000-00000"},
      {"name":"Game 2","code":"00000-00000-00000"},
      {"name":"Game 3","code":"00000-00000-00000"}
    ]
  },
  "11111111-1111-1111-1111-111111111111":{
    "games":[
      {"name":"Game 1","code":"00000-00000-00000"},
      {"name":"Game 2","code":"00000-00000-00000"},
      {"name":"Game 3","code":"00000-00000-00000"}
    ]
  }
}
```
Then stringify the JSON and store it as a `MYSTERY` environment variable.

User gifts can then be accessed via unique special `https://webserver/?id=<userID>` URLs, while anyone visiting the webserver without the proper ID will just get a basic holiday greeting (no gift).

# License

GLB model ["falling snow loop"](https://sketchfab.com/3d-models/falling-snow-loop-a19b97d7e64548b998eaeb4d8477c24c), Copyright 2020 Elin Hohler under [CC Attribution 4.0 license](https://creativecommons.org/licenses/by/4.0/)<br> 
Music ["Holiday Homecoming" by Steve Oxen](https://www.fesliyanstudios.com/royalty-free-music/download/holiday-homecoming/3191)<br> 
Paper crackle sound effect by [https://pixabay.com](https://pixabay.com)

Holiday Gift 2024 webapp is Copyright 2024, Jason Robitaille under the [Apache-2.0 license](https://www.apache.org/licenses/LICENSE-2.0.txt).
