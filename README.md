# Beerfinda

Todo:

- 2. another bit of feedback mentioned the individual beer pages seemed like they had too much text so I've added another field on the /beer/beer_id/ endpoint called "session_savour_scale" which is a number between 1-10 where 1 is meant for session beers and 10 is mean for beers to savour. so I was thinking instead of the "occasion" text block section we could show a scale of 1-10 with session and the beginning and savour at the end with the scale at the number. (most are at 5 at the moment because I'm yet to run it over all data)
- 3. along the same lines as 2. I've switched the "pairing" section a bit to return an HTML formatted list. see /beer/675 for a good example. can you let me know if its easier for you to get the HTML formatted list or should I return a list like the characteristics value in the API response? 
- when youre working on the imrpovements can you check the search call is including other parameters
https://drspgoa.digifern.com/beer/?search=wired lager&merchantsellsfound__active=true
currently its doing the search without including other parameters

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
