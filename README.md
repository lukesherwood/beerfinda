# Beerfinda

Todo:

- filter count is off by one
- beerfinda blurb should be same width as container

- add delete 'search' from query for breweries and merchants
- searchTerm contamination when going back to breweries page after clicked on search for beers from brewery
- validation for contact form
- change profile create/update validation to vee-validate
- add change email features
- abstract (join) filter component from beerfilter component
- back to top hovering thingy on beers

- pull out repeated css from sign in register forgot password user etc
- fix login/register/forgotten password styling css needs to be abstracted/bootstrapped

Issues found but maybe too-hard-basket/low value:

- homepage banner hand beer messed up when menu opens
- scroll to top for each new page
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
