# 🔎 Product Filter (Salsify Exercise)

## 📝 Project Description
This project is an implementation of the coding task 'Product Filtering Condition Editor UI'. The goal is to provide a robust and intuitive user interface to create and update a filter for a set of products. Products are filtered based on a selected property (like `name`, `color`, `category`, etc.), an operator (like `equals`, `contains`, `greater than`, `less than`, etc.), and one or more user-selected values (checkboxes with the options). The application returns a list of products that match the applied filter.

The project was designed with a special focus on global state management, allowing users to apply easy-to-manage filters and perform quick searches, thereby providing a more efficient and satisfying user experience.
___

## 🏛 Architecture
The project uses a component-based architecture structure with React. The project directory structure is as follows:
```
salsify-filters
├── .next
├── node_modules
├── public
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── Button
│   │   │   └── index.tsx
│   │   ├── Filter
│   │   │   └── index.tsx
│   │   ├── FilterItem
│   │   │   └── index.tsx
│   │   └── ProductList
│   │       ├── helpers
│   │       │   └── index.ts
│   │       ├── ProductCard
│   │       │   └── index.tsx
│   │       └── index.tsx
│   ├── hooks
│   │   └── filter
│   │       └── index.ts
│   ├── store
│   │   └── AppContext
│   │       ├── actions.ts
│   │       └── index.tsx
│   ├── utils
│   │   ├── data.ts
│   │   └── types.ts
│   └── datastore.ts
├── .eslintrc.json
├── .gitignore
├── .next.config.mjs
├── .next-env.d.ts
├── pnpm-lock.yaml
├── package.json
├── README.md
└── tsconfig.json
```
___
## 🗂 Main Files and Their Functions
- **Filter/index.tsx:** The main component for the filtering functionality. It manages the filter state and filtering logic, allowing users to select properties, operators, and values, and build the filter accordingly.

- **hooks/filter/index.ts:** The custom hook `useFilterActions` for the filtering functionality. This hook handles the filtering actions, such as submitting the filter, changing the selected property, changing the selected operator, and changing the selected values.

- **store/AppContext/index.tsx:** Defines The initial state of the application and the reducer that manages the actions dispatched to the state. It also exports the Product Provider that provides access to the application's state and actions to the application's components.

- **store/AppContext/actions.ts:** It defines the actions that can be dispatched to the reducer. Each action is a function that returns a new state that reflects the result of the action. Actions include clearing the current filter, performing a quick search, building a new filter, and applying a built filter.

- **ProductList/index.tsx:** Is the component that renders the list of products. It takes the filter state from the global state and applies the filter to the products before rendering them.

- **ProductList/helpers/index.ts:** Where the function `applyFilters`, used in `ProductList`, resides. This function applies the filters based on operators and action types, all written with the best principles, such as SOLID, for example. It receives the product list and the filter as arguments and returns the list of products that satisfy the filter.

- **utils/data.ts:** It contains helper functions to provide data needed by the application, such as the `getAvailableOperators`.

- **utils/types.ts:** Definitions of data types for the product, product property, filter operator, built filter, and quick search.
___
## 💡 How to Use
To use the product filter, follow these steps:

1. In the user interface, select a product property from the "Select a property" dropdown menu.
2. Select an operator from the "Select an Operator" dropdown menu.
3. Depending on the chosen property and operator, select the desired values.
4. Click on the "Filter" button to apply the filter.
5. *To perform a quick search, simply type the product name in the quick search box.* **(Extra functionality)**
___
### 🚀 Quick Search
In addition to advanced filters, the project also includes a "quick search" feature. With this, users can simply type the product name in a search box and get instant matching results, without having to go through the process of setting filters.
___
## ⏰ Development Time
~4h30
___
## 🚀 Installation and Use
In the project directory, you can run:
### `npm i && npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
___
## 🎯 Conclusion
The Product Filter project offers a robust and intuitive solution for filtering a set of products based on various criteria. With a component-based architecture, well-managed global state, and an optimized user experience, the application provides an efficient way to search and filter products.
___
## 📬 Contact
📧 lucas@padilha.io <br>
📞 +351912015235 <br>
🔗 [LinkedIn](https://www.linkedin.com/in/lucas-padilhax/)
