# Fetch Coding Challenge: Here Boy!

This React SPA was built for the Fetch Coding Challenge.

Here Boy! is a fictional dog adoption website where users can log in, browse the collection of dogs available, and select favorite dogs to find their perfect match.

## Run Locally

Clone the project

```bash
  git clone https://github.com/ZeaZuniga/fetch-challenge-zuniga.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## How To Use

1.) Either go to [Here Boy!](https://hereboycodechallenge.netlify.app/) or run the project locally.

2.) Log in with your name and an email address.

3.) Scroll the initial list of dogs with the page selector at the bottom of the list.

4.) Click on a dog card to see the a brief description about the dog.

5.) To search for specific features, enter search/filter parameters in the purple Search/Filters box.

6.) Click "Apply Filters" to apply specified search/filter parameters

7.) Once you find a dog you like, click the heart on the dog card to save it to your Favorite Dogs List.

8.) When you have saved a few of your favorite dogs, open the Favorite Dogs List by clicking the yellow tab on the bottom right of the screen.

9.) With the Favorite Dogs List open, you can see the dogs you've liked along with the option to "Find Your Match."

10.) Click the "Find Your Match" button to get a specific dog chosen for you as your new best friend.

## Known Issues

1.) Seach parameters are cleared on page refresh.

- This issue is caused by the parameters and Dog List being stored in the useState rather than in the URL.

2.) Search parameters are not present in FilterForm after submitting request.

- This is caused by not storing the current requests in the URL nor populating the FilterForm with the current requests.

3.) Favorite Dogs tab goes outside parent element on screens wider than 1600px.

- Due to the FavDogs tab having `position: fixed;` and was chosen over `position: absolute;` so that the tab can remain at the bottom of the viewport instead of at the bottom of the parent element.

4.) DogModal description occasionally repeats phrases.

- This is because the descriptions are randomly chosen from an array of options. I find it funny when it happens, and think of it as a **feature** rather than an issue.

5.) Pagination displays on Loading Page State.

- The Pagination element on render defaults to page 1. The original intention was to conditionally load the entire home page with a loading page, but this caused the Pagination element to reload every time the search results changed. This led to the element never registering past the 1st page. Final solution was to keep the element through page loads.

6.) When making a filter request for "African Hunting Dog" with no other additions, Willard has no city named.

- The zip code from the dog _Willard,_ "yMD-OZUBBPFf4ZNZzDmI", returns from post /locations as null, causing a rendering error. To avoid this, a check was added to ignore such instances and to display the zip code instead.

## Next Steps

- [ ] Store the search params in the current URLparams so that there can be persistent search results between pages.

- [ ] Auto-fill the FilterForm with the current search params to make editing previous search request easier.

- [ ] Clean up code by storing large functions in separate files in /src/utils/

- [ ] Add keyframes to page styling to have fluid animation between states.

  - One example would be for the FavDogs list to be pre-rendered and be hidden underneath the viewport, then on tab click, will slide up to be visible.

- [ ] Consider three.js, react-spring, or other animation frameworks to add animations to icons, backgrounds, and page interations.

- [ ] Add a search parameter option for "Search within _number_ miles of _city or zip code_.

## 🚀 About Me

Hi I'm Zea! I'm a full-stack web developer driven by faith, focused on excellence. I am passionate about building high quality, purpose-driven digital experiences. I specialize in JavaScript, React, Node.js and Typescript, with a skill set that spans from front-end design to back-end development. My approach combines a deep technical proficiency with a commitment to creating intuitive, reliable products designed to highlight what makes each client unique.

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://zunigaweb.dev/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zealtiel-zuniga-anaya)
