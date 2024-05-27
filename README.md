# Beerfinda

Todo:
Home Page: - top image change to not diagonal and one of these images https://drive.google.com/drive/folders/1-MSCQxc4YXyR-u9e093esxRYpbN7bXZx, - center text, change all text to "All New Zealand Beers In One Place Curated To You". copy needs to be about customer benefits - center button, change button to same style as other buttons on home page (contrast on top of new image) - find my beer button links to sign up process - get rid of carousel, just do a grid with 3 across on desktop screen. i will only send 3 or 6 from api response - change cards to be a bit bigger to fill grid and have sharp top corners like the bottom corners. - width under 386 pixels causes "how it works" to go out of screen
Beers, Breweries, Merchants: - cards have sharp top corners like the bottom corners
Beers: - newest and oldest ordering doesnt work when signed in
Beer Individual: - buy now button on the where to buy section weirdly positioned - brewer link is broken when brewer has non alphanumeric characters. use 'brewer_link' instead of 'brewer_name' from api to build url
Profile Update: - needs required asterisk \* next to the update beer search part
General Responsiveness: - when viewing on Ipad Mini navbar truncated

What im currently working on: - Identifying when beer is on special so can notify users - Multipack flag on in stock to help with comparison of prices - Fresh Hop filter - Zero Percent filter - ABV ordering for beers - Number of beers ordering for merchants

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
