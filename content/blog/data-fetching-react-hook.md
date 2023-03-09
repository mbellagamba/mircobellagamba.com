---
title: Data fetching React Hook
date: 2020-06-26
description: React Hooks can make data fetching easier by hiding the asynchronous state management required to handle HTTP requests.
tags:
  - javascript
  - react
  - hooks
---

Making HTTP requests is a common task for most Single Page Applications. Due to the asynchronous nature of network requests, we need to manage the state of the request during its lifecycle: the start, the loading phase and finally the processing of the response or errors handling, if any occurred.

# The problem

Today it is more and more frequent to start a new [React.js](https://it.reactjs.org/) web app without using any external state management library, such as Redux, but just relying on the React State and the React Context. Since [React.js 16.8](https://it.reactjs.org/blog/2019/02/06/react-v16.8.0.html) was released, this trend increased even more because the introduction of the Hooks simplified the Context APIs, making them more appealing from a developer point of view.
In this kind of web app a React component making a network request could look like the following.

```javascript
import * as React from "react";
import { topicsURL } from "./api";

function TopicsList() {
	const [topics, setTopics] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	React.useEffect(() => {
		setLoading(true);
		fetch(topicsURL)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Request failed");
				}
				return response.json();
			})
			.then((data) => setTopics(data))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	}, []);

	if (error) {
		return <div>An error has occurred: {error.message}</div>;
	}
	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<ul>
			{topics.map((topic) => (
				<li key={topic.id}>
					<a href={topic.url}>{topic.title}</a>;
				</li>
			))}
		</ul>
	);
}
```

The `TopicsList` component is fairly good but most of its code deals with the management of the network request, hiding its real purpose: showing a list of topics. It smells like a separation of concerns issue.
Moreover, the same code will be duplicated in many other components, modifying only the request URL. Each component will declare three state variables, make the request inside an effect, manage the loading state, conditionally render the component only when the request is successful.
Finally, the request status depends on the value of three variables (`topics`, `loading`, `error`). It's easy to mess up things just checking these variables with the wrong order. To better understand the problem, check the article [Stop using isLoading booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans).

# The `useFetch` Hook

We could solve the issues previously described defining a custom hook that manages network requests. Our goals are:

1. Avoid rewriting the logic to manage requests.
2. Separate the request management code from the rendering.
3. Handle the request status in an atomic way.

```javascript
import * as React from "react";

const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return {
				status: "loading",
			};
		case "success":
			return {
				status: "success",
				data: action.data,
			};
		case "error":
			return {
				status: "error",
				error: action.error,
			};
		default:
			return state;
	}
};

export function useFetch(url) {
	const [state, dispatch] = React.useReducer(reducer, { status: "idle" });
	React.useEffect(() => {
		let subscribed = true;
		dispatch({ type: "loading" });
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Request failed");
				}
				return response.json();
			})
			.then((data) => {
				if (subscribed) {
					dispatch({ type: "success", data });
				}
			})
			.catch((error) => {
				if (subscribed) {
					dispatch({ type: "error", error });
				}
			});
		return () => {
			subscribed = false;
		};
	}, [url]);
	return state;
}
```

The `useFetch` hook is a useful abstraction and it can be easily shared among the components of the app. The request status depends on the single `status` variable, instead of three. The `subscribed` variable prevents a component update on an unmounted component, when the unmount event happens before the request completion.
No one is happy to see this warning in browser console.

> Warning: Can’t call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

## Using the hook

With the `useFetch` hook the `TopicsList` component becomes like this.

```javascript
import { useFetch, topicsURL } from "./api";

function TopicsList() {
	const res = useFetch(topicsURL);
	return (
		<>
			{res.status === "loading" && <div>Loading...</div>}
			{res.status === "error" && (
				<div>An error has occurred: {res.error.message}</div>
			)}
			{status === "success" && (
				<ul>
					{res.data.map((topic) => (
						<li key={topic.id}>
							<a href={topic.url}>{topic.title}</a>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
```

The code is more readable because it sharply defines the component purpose. Now the rendering logic is separated from request management and there's no mixed level of abstractions.

## Bonus #1: TypeScript version

For type safety lovers (here I am ✋), here's the TypeScript version.

```typescript
import * as React from "react";

export type RequestState<T> =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success"; data: T }
	| { status: "error"; error: Error };

export type RequestAction<T> =
	| { type: "start" }
	| { type: "completed"; data: T }
	| { type: "failed"; error: Error };

export function useFetch<T>(route: string): RequestState<T> {
	const [state, dispatch] = React.useReducer<
		React.Reducer<RequestState<T>, RequestAction<T>>
	>(reducer, { status: "idle" });
	React.useEffect(() => {
		let subscribed = true;
		if (route) {
			dispatch({ type: "start" });
			fetch(route)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Request failed");
					}
					return response.json();
				})
				.then((data) => {
					if (subscribed) {
						dispatch({ type: "completed", data });
					}
				})
				.catch((error) => {
					if (subscribed) {
						dispatch({ type: "failed", error });
					}
				});
		}
		return () => {
			subscribed = false;
		};
	}, [route]);
	return state;
}

export function reducer<T>(
	state: RequestState<T>,
	action: RequestAction<T>
): RequestState<T> {
	switch (action.type) {
		case "start":
			return {
				status: "loading",
			};
		case "completed":
			return {
				status: "success",
				data: action.data,
			};
		case "failed":
			return {
				status: "error",
				error: action.error,
			};
		default:
			return state;
	}
}
```

Then it could be useful to define an helper function with proper typing for each request, instead of using the hook directly in components. The _topics_ request would be like this.

```typescript
function useTopics(): RequestState<Topic[]> {
	return useFetch(topicsURL);
}
```

The Union type enforces us to check the status of the response before accessing any other properties. Writing `res.data` is allowed only if the language is sure that the status is "success" in the same scope. So, thanks to TypeScript, we can forget about mistakes like `Uncaught TypeError: Cannot read property 'map' of undefined`.

## Bonus #2: Testing tips

The `useFetch` hook could help us to simplify unit tests. In fact, we can spy on the hook and return a proper _test double_. Testing the component becomes easier because the _hook spy_ hides the asynchronous behavior of fetch requests, serving directly the response.
The stub let us reason about the component behavior and the test expectation without worrying about async execution.
Assuming to use [Jest](https://jestjs.io) and [Testing Library](https://testing-library.com), a unit test for the topics list component could be like the following.

```typescript
import * as React from "react";
import { render, screen } from "@testing-library/react";
import TopicsList from "../TopicsList";
import * as api from "../api";

const testData = Array.from(Array(5).keys(), (index) => ({
	id: index,
	title: `Topic ${index}`,
	url: `https://example.com/topics/${index}`,
}));

test("Show a list of topic items", () => {
	jest.spyOn(api, "useTopics").mockReturnValue({
		status: "success",
		data: testData,
	});
	render(<TopicsList />);
	expect(screen.getAllByRole("listitem")).toHaveLength(testData.length);
});
```

Even if there are alternatives to mocking fetch requests in tests [Stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch), this approach can be useful in complex situations when setting up an asynchronous unit test would be tricky.

# Going further

The useFetch hook is a handy utility to retrieve data from the server and to manage network requests. It is simple enough yet quite powerful. Anyway, it is not perfect for every use case and I would leave you with some considerations.

- The custom hook can be easily modified to work with any asynchronous task, i.e. with every function returning a `Promise`. For instance, its signature can be like the following.

```typescript
function useAsync<T>(task: Promise<T> | () => Promise<T>): AsyncState<T>`
```

- It is easy to replace the native fetch with [Axios](https://github.com/axios/axios). There's only need to remove the code that checks if the response is successful and parse the JSON response body because Axios does it internally.
- If the API endpoint require some headers, like _Authorization_, you can define a custom client function that enhance fetch requests with required headers and replace fetch with this client.
- In complex web apps, making a lot of network requests, requiring advanced features like caching, it will probably be better to use [React Query](https://react-query.tanstack.com), a powerful React data synchronization library.
