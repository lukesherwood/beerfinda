# Beerfinda

Todo:

- add button to like a beer ie add to your beers-liked array
- finish and test contact form
- abstract (join) filter component from beerfilter component
- change profile create/update validation to vee-validate
- add change email features

beers page - add created_on as a filter 'newest' and opposite as 'oldest'

individual beer page for desktop - smaller image, title etc to side
individual beer page for mobile - smaller title text. rating not centered. comma at end of characteristics

clicking next page on breweries, beer, merchants doesnt scroll back to top

individual brewer page - move details to the side of image and description below
individual brewer page - description doesnt format like beer description using \n etc
individual brewer page - if brewer_id greater than 0 then can you send them to brewer page instead of merchant page - dont want to duplicate pages
home page - change banner title from 'Find the best beer for you' to 'All New Zealand Beers In One Place'

i switched the individual brewer endpoint to return the beers_in_stock in the same format as beers_brewer. the card you use for beers_brewer can be applied to beers_in_stock

Issues found but maybe too-hard-basket/low value:

- scroll to top for each new page
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
