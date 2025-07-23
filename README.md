# BeerFinda

**BeerFinda** is a comprehensive beer discovery platform that aggregates all New Zealand beers in one place, providing personalized recommendations and price comparisons across brewers and merchants.

## What It Does

BeerFinda helps beer enthusiasts discover and find the perfect beer by:

- **Comprehensive Beer Database**: Aggregates beers from brewers and merchants across New Zealand
- **Personalized Recommendations**: Users create taste profiles to receive curated beer suggestions
- **Price Comparison**: Compare prices across different merchants to find the best deals
- **Beer Discovery**: Browse featured beers, search by characteristics, and explore breweries
- **User Profiles**: Rate and review beers, build personal collections, and track preferences
- **Merchant Integration**: Find where to buy specific beers from various retailers

## Technology Stack

### Frontend
- **Nuxt.js 2** - Vue.js framework with server-side rendering
- **Vue.js 2** - Progressive JavaScript framework
- **Bootstrap 5** + **Bootstrap Vue** - UI framework and components
- **Sass/SCSS** - CSS preprocessing

### Authentication & Security
- **Nuxt Auth** - Authentication module with JWT token support
- **Google reCAPTCHA v3** - Bot protection
- **VeeValidate** - Form validation

### Development & Build Tools
- **Webpack 4** - Module bundler
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Node.js** - Runtime environment

### Key Features & Integrations
- **Vue Agile** - Carousel/slider components
- **Nuxt Image** - Optimized image handling
- **Axios** - HTTP client for API communication
- **Vuex** - State management
- **Vue Notifications** - User notifications
- **Multi-range Slider** - Interactive filter controls

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

## Development Todos

### Features
- Mailing list configuration for popup display
- Improve filter system architecture (move beertype to filters in state)
- Add beer "like" functionality with user collections
- Complete and test contact form
- Abstract filter component from BeerFilter component
- Migrate profile validation to VeeValidate
- Add change email feature
- Implement Facebook login integration

### Technical Improvements
- Close hamburger menu after navigation
- Enhance image API URL security with environment variables
- Add placeholders for featured beer cards during loading
- Fix image error handler issues
- Resolve logout message functionality
- Implement or import tooltip library

### Deployment
```bash
git archive -v -o beerfinda.zip --format=zip HEAD
```
