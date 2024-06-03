# Beerfinda

Todo:

- fix pagination component again for mobile sizes

- add button to like a beer ie add to your beers-liked array
  - if logged in, show button.
  - button adds beer id to beers liked array
  - then sends user details to /UserUpdate "beers_like" array in particular
- finish and test contact form
- abstract (join) filter component from beerfilter component
- change profile create/update validation to vee-validate
- add change email features
- facebook login

Issues found but maybe too-hard-basket/low value:

- close hamburger menu after click
- see if we can further obfuscate the image api url with env variables.
- setup omniauth google, facebook etc
  - this has been implemented in the backend
- placeholder for featured beer cards, as they start loading small
- fix this.$refs.img error? image error handler not working at all
- logout message not working
- figure out why tooltips don't work or import a library

Deployment:
`git archive -v -o beerfinda.zip --format=zip HEAD`

## Build Setup

You'll need to create a .env file and add the **baseUrl** to point to the api backend

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).
