---
title: How does React Router location.state works?
date: 2023-02-15
description: Have you ever asked where React Router stores the location state?
tags:
  - javascript
  - react
---

The first time I saw the React Router `location.state` API, I thought it was a really useful feature, somewhat magical, as is often the case with things we don't understand.
This feature allows you to pass data from one route to another, for example to branch the UI depending on the previous route or to avoid fetching data already loaded on the previous page. The API designed by the React Router team is extremely simple and perfectly integrated with the methods defined by React, that is through the use of props and hooks.
You can set the `location.state` in 2 ways: via `Link` or via `useNavigate`.

```javascript
<Link to="/users/123" state={{ '{{ fromLogin: true }}' }} />;
// or
let navigate = useNavigate();
navigate("/users/123/edit", { data: partialUser });
```

Then, from the landing page you can retrieve the state via `useLocation`.

```javascript
let location = useLocation();
location.state; // { fromLogin: true }
```

**But where is the state stored?**
Before delving into the documentation or directly into the library code, I wanted to have fun trying to deduce the nature of this feature only by observing its behavior.
I initially assumed that the Router uses a React State or a React Context to share the state between the Route components. This hypothesis was immediately denied by the fact that the state is maintained when the page is refreshed. This rules out the possibility that the state is only stored in the application's memory and implies the use of some persistence system.
This led me to speculate that WebStorage (sessionStorage or localStorage) or cookies were involved but, to my great regret, I found both were empty. I excluded IndexedDB because it's an advanced browser API and using it for this purpose would probably make little sense. Anyway, I checked to be sure and of course found it empty.
Seeing my analysis fail for a second time, I tried to investigate the browser features involved and I realized that I had left out one of the main objects responsible for client side navigation: the **History**, that allows to manipulate the browser _session history_. Let’s take a look at how it works.

```javascript
let state = { fromLogin: true };
window.history.pushState(state, "page2.html", url);

// in page2.html
window.history.state; // { fromLogin: true }
```

The first parameter of the function is the state used by React Router.
From the MDN documentation.

> The state object is a JavaScript object which is associated with the new history entry created by pushState(). Whenever the user navigates to the new state, a popstate event is fired, and the state property of the event contains a copy of the history entry's state object. The state object can be anything that can be serialized.

Indeed, after using `<Navigate state={...} />` the value of `window.history.state` is exactly the same as the prop of the same name.

The case is solved!🎉
Below you will find the main references to learn more about the topic and the link to the portion of React Router code that directly refers to the use of browser history, if you still feel skeptical.

[Working with the History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)

[Main Concepts | React Router](https://reactrouter.com/en/main/start/concepts#locations)

[index.ts - remix-run/history · GitHub](https://github.com/remix-run/history/blob/dev/packages/history/index.ts#L446)
