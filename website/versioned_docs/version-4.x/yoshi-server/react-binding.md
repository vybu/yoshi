---
id: react-binding
title: React Binding
sidebar_label: React Binding
---

> The React bindings for Yoshi Server lets your components consume and manage data from the server easily.

Passing the `httpClient` as a prop to your components might be cumbersome. Instead, we suggest using the `useRequest` hook, together with the `HttpProvider. This will make your code cleaner and will also simplify data management code by tracking error and loading states for you.

### Installation

```js
npm install yoshi-server-react
```

### Fetching data

Wrap your component with the `HttpProvider`, and pass it an `httpClient` instance:

```js
//client.tsx
import React from "react";
import ReactDOM from "react-dom";
import HttpClient from "yoshi-server-client";
import { HttpProvider } from "yoshi-server-react";
import App from "./components/App";

const client = new HttpClient();

ReactDOM.render(
  <HttpProvider client={client}>
    <App />
  </HttpProvider>,
  document.getElementById("root")
);
```

Next, use the `useRequest` [React Hook](https://reactjs.org/docs/hooks-intro.html) inside your React component to fetch data from your server function. When your component renders, `useRequest` returns an object that contains loading, error, and data properties you can use to render your UI.

Fetch data using `useRequest`, and handle the response:

```js
// App.tsx
import React from "react";
import { useRequest } from "yoshi-server-react";
import { greet } from "../../api/greeting.api";

const App = () => {
  // Fetch Data
  const req = useRequest(greet, "Yaniv");

  // Show a loading message
  if (req.loading) {
    return <p data-testid="loading">Loading...</p>;
  }

  // Show an error message
  if (req.error) {
    return <p data-testid="error">Error :(</p>;
  }

  // render the data
  return (
    <div>
      <h2>{req.data.greeting}</h2>
    </div>
  );
};

export default App;
```

#### How does it work?

As our query executes and the values of loading, error, and data change, the App component can intelligently render different UI elements according to the query's state:

- As long as loading is true (indicating the query is still in flight), the component presents a `Loading...` notice.

- When loading is false and there is no error, the query has completed. The component renders a greeting data returned by the server.

- Show an error messege in case there's an `req.error` (`req.error` contains an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object).
