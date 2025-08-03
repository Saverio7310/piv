# Prezzi in Vista
**Prezzi in Vista** is currently the most ambitious project I’ve worked on. After months of development, I’ve built what I consider a solid MVP (Minimum Viable Product).  
It is a **full-stack** project featuring a front-end built with **React** and a back-end powered by **Node.js** and **Express.js**. The Server connects to a relational database (**PostgreSQL**) and with a cache layer (**Redis**).

This repository contains the front-end side.

## Index
1. [Motivation](#motivation)
2. [Main Idea](#main-idea)
3. [Limitations](#limitations)
4. [Stack and Language](#stack-and-language)
5. [Structure](#structure)
6. [Architecture & State Management](#architecture--state-management)
    - [States](#states)
    - [Refs](#refs)
    - [Effects](#effects)
    - [Contexts](#contexts)
    - [Reducer](#reducer)
7. [Folder Structure](#folder-structure)
8. [How to Run](#how-to-run)
9. [Known Issues](#known-issues)

## Motivation
Supermarket pricing lacks transparency, and shoppers often miss out on savings. This project aims to simplify price comparison and promote smarter consumer habits by bringing data to the foreground.


## Main Idea
This project was born out of a desire to bring clarity to the chaotic pricing practices of Italian supermarkets. Too often, shoppers encounter prices that seem illogical: discounts that barely change the original price, inconsistent pricing across different branches of the same chain, or even identical products priced differently depending on where they’re placed in the store. The goal is to create a centralized hub where users can check real-time supermarket prices and build optimized shopping lists tailored to their preferred stores. By comparing current prices across selected supermarkets and tracking how prices change over time, Prezzi in Vista helps users make smarter shopping decisions and spot meaningful discounts.

## Limitations
Building this vision at full scale would require significant resources:
1. Data storage capacity to handle millions of prices
2. Constant scraping infrastructure and bandwidth to monitor product stocks
3. Scalable infrastructure to deliver real-time pricing without delays

These are expensive and complex tasks for a solo developer.  
As a result, this MVP is limited to just two supermarkets, and price scraping has only been done occasionally at a national level—not for every individual shop.
Despite these constraints, I chose to move forward with the project and create my **first full-stack experience** from the ground up.

## Stack and Language
I decided to use **React** as the main library in order to create the website's structure and logic and **React Router** to handle the different pages. This is the first time I've used them and I found it quite simple to understand the basics and create something new.  
I chose **JavaScript** as the language. In hindsight, I would’ve used **TypeScript** instead: the amount of time lost due to runtime errors, which are often difficult to identify and usually come bundled together, can be disheartening. At first you feel powerful by the amount of progression made but very soon you'll feel your debt with clarity and hard type definitions you left behind.  
The project was created and managed with **CRA**. I used it for the first time and it was super helpful in creating all the files and folders needed to start the project.

## Structure
The entire project relies on three major components: [ProductsListPage](src/components/ProductsListPage.js), [ProductInfoPage](src/components/ProductInfoPage.js) and [ShoppingCart](src/components/ShoppingCart.js).  
These components are rendered on the three main [pages](src/components/App.js#L16) of the website, respectively: `/products`, `/products/:productID` and `/shopping-cart`.  
The first component is the one responsible for the connection to the Server and the products fetching. It takes the input value from the [Header](src/components/Header.js)'s search bar and makes an HTTP request after a local validation of the input (Minimum and maximum length). The result list is then displayed as an *infinite scrolling* grid of [Card](src/components/ProductCard.js)s. Clicking one of the displayed cards will redirect you to the second component.  
The product's info page contains the product's data (fetched with an effect) with the help of many inner components. An image (which I guess I cannot actually show due to copyright and license), name, weight, [prices chart](src/components/ProductPricesChart.js) displaying the prices over time (if available), a brief [description](src/components/ProductPriceInfo.js) of the current price situation and a button that adds the product to the shopping cart.  
At the top-right corner of the header there is a shopping cart icon. Clicking this icon takes you to the third component. Here you will see the [list](src/components/ShoppingCartProductsList.js) of all the products added to the cart and a [selection](src/components/ShoppingCartSupermarketsSelection.js) of the available supermarkets. After selecting your favourite ones and pressing the button *Ottimizza*, a new list will be generated. This [optimized list](src/components/ShoppingCartOptimizedList.js) will divide the products in different sections. Each section represents a supermarket and all the products available at a lower price than the other supermarkets. You can, then, click the button below the list to generate a shopping list text message which is copied to the clipboard.

## Architecture & State Management
I used many of the most common hooks React has: states, refs, effects, contexts and reducers.  

### States
The most important states I've used are:
- [products fetched list](src/components/ProductsListPage.js#L19) - holds the current search results
- [iteration](src/components/ProductsListPage.js#L21) - triggers a new fetch when user scrolls down the page to see more products

Other minor states are, for example, the [loading](src/components/ProductInfoPage.js#L17) variables used to display a message and a rotating element to visually show the user the download of the data from the Server is happening.

### Refs
The use of refs I made is a little confusing. I used them [here](src/components/ProductsListPage.js#L22) to understand when a fetch should be happening and when it shouldn't.  
This component can do two things:
- preload the data from the `sessionStorage` when you reload the page
- make a HTTP request to fetch data

Doing either one of these two things will trigger a new re-render. This means that when the component mounts again, I need to determine what just happened and what should happen next.

### Effects
I used effects mainly for two jobs:
- [preloading](src/components/ShoppingCart.js#L23) data from `sessionStorage`or `localStorage` to prevent the loss of data when reloading the page
- [fetch](src/components/ProductInfoPage.js#L22) data from the Server

Another job was to add an `EventListener`to the [page](src/components/ProductsListPage.js#L34) which detects when the user scrolls down and reach a specific point, which is used to trigger a new HTTP request to fetch more products.

### Contexts
Three contexts were used.  
- [Shopping cart](src/components/CartProvider.js) - save products added to the shopping cart
- [Selected product](src/components/SelectedProductProvider.js) - save the current clicked product
- [Toast](src/components/ToastProvider.js) - handle messages for the user (e.g. current product has been added to the shopping cart)

### Reducer
I used a reducer to handle the [shopping cart list](src/components/CartProvider.js#L18), which is an array of objects. This list can be modified in five ways:
- add product
- update product
- remove product
- restore the entire list (after reloading the page)
- remove every product

## Folder Structure
- `node_modules` - libraries used in the project
- `build` - files to use in production
- `public` - static files
- `test` - test folders and files
- `src` - source code
- `src/components` - react components
- `src/fonts`- website's font
- `src/images`- website's icons and pics
- `src/model` - TypeScript classes
- `src/styles` - CSS files
- `src/utils` - helper functions and logic

## How to Run
These steps will make you start the project locally.
1. clone the repo
```bash
git clone https://github.com/Saverio7310/piv.git
```

2. open the project folder
```bash
cd piv
```

3. install the dependencies
```bash
npm install
```

4. start in dev mode
```bash
npm start
```

5. go to [http://localhost:3000](http://localhost:3000)

## Known Issues
The **biggest issue** is the handling of the products in the database. Offering the user the possibility to compare the same products between different supermarket chains requires proper handling of product identification.  
1. each product should be identified uniquely with a *master id*.
2. some kind of link must be defined between the *master id* of each product and their *local id* among the available supermarkets.
3. searching for a product will resolve in one single product returned instead of the same product being repeated multiple times—once for each supermarket

The problem is that each supermarket I've scraped has its own unique way of identifying a product's name, id, brand name, brand id. Having an algorithm grouping the same products amongst all the supermarkets available is impossible in my opinion. One solution could be to use a custom ML algorithm but that is another story.  
**This means** that, for now, very few products have the actual comparison feature available. To find them, you will have to search for 'abbracci' or 'biscotti' in the search bar.