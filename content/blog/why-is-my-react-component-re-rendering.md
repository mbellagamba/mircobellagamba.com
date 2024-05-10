---
title: Why is my React Component re-rendering?
date: 2024-05-10
description: Discover 4 techniques to optimize React app performance, minimizing unnecessary component re-renders.
tags:
  - javascript
  - react
  - performance
---

React’s beauty lies in its simplicity and lightning-fast rendering. But as our component-heavy applications grow, so can performance bottlenecks. Unnecessary re-renders are a prime culprit. This article tackles this challenge head-on, offering 4 techniques to optimize your React app’s performance.

1.  **Components Composition**: Learn how to structure your components for optimal performance.
2.  **Uncontrolled Components**: Discover a lighter-weight alternative to controlled components for focused updates.
3.  **memo, useMemo, useCallback**: Master these hooks to optimize expensive calculations.
4.  **Splitting Large Context**: Break down complex contexts to minimize re-renders.

We’ll explore these techniques through the lens of a practical example: refactoring a simple tasks management application. This CodeSandbox provides a starting point for our journey. As you progress through the article, feel free to explore the code step-by-step to gain a deeper understanding. This initial version offers basic to-do list functionality, including displaying tasks, adding new ones, and customizing the background color.

**Version 0**

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&eslint=0&module=%2Fsrc%2Fversions%2Fversion-0.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

While the current app delivers a smooth experience, it’s important to consider future scalability. Unnecessary re-renders can become a performance bottleneck as the application grows with more features and components. To illustrate this potential challenge, let’s introduce a `SlowComponent` simulating a computationally expensive component or a large component tree. The top right counter tracks re-renders, excluding double re-renders due to React’s Strict Mode.

> _Before showing a new version of the example, I’ll keep a note of what’s changed in that version. In the code example, a comment with the UPDATE keyword highlights changes._

**What’s changed in version 1:** The following code adds a `SlowComponent` after the `ul`.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&eslint=0&initialpath=%2Fperformance-issue&module=%2Fsrc%2Fversions%2Fversion-1.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Typing becomes noticeably sluggish, with each character appearing after a measurable delay. In some browsers, like Chrome, changing the background color dragging the mouse can feel significantly slower than expected. Can we improve performance without removing the `SlowComponent`? Absolutely! Before diving into solutions, let’s understand why components re-render in the first place.

## Why does a React component re-render?

React operates on the core principle of **View = f(State)**, meaning the view you see on the screen is a direct function of the application’s state. In simpler terms, React re-renders a view whenever the state changes. However, it doesn’t blindly re-render the entire view. Instead, it employs a clever optimization algorithm to determine precisely which parts of the view need updating based on the specific state change that occurred.

Several factors can prompt a React component to re-render, including:

1.  **State changes**: A component will re-render whenever its internal state changes. This typically happens when a callback function calls the `setState` function, often within an effect.
2.  **Parent re-render**: Children components are inherently bound to their parents. Whenever a parent component re-renders, its children will re-render as well, even if their own state or props haven’t changed.
3.  **Context changes**: Components subscribing to a context will re-render whenever the context value is updated..
4.  **Hooks changes**: Custom hooks often encapsulate state or context changes, which means their usage can indirectly trigger re-renders in the components that use them.

> **Common pitfall**: Since a component is re-rendered when its props change, a common misconception is that it won’t do so if the props don’t change from the previous rendering. In reality, even with unchanged props, a component is re-rendered every time its parent re-renders.

## 1\. Components Composition

Component composition is a fundamental concept in React that involves building complex UIs from smaller, reusable components. It also plays a crucial role in optimizing performance by managing state effectively. By keeping state close to where it’s used, we can minimize unnecessary re-renders throughout the application.

There are two main ways to leverage composition for performance benefits:

1.  Moving state down
2.  Encapsulating state

### Moving state down

When a piece of state is only used by a single child component, it’s often inefficient to manage it in the parent. This can lead to the parent re-rendering even when the state change is only relevant to the child. We can improve this by “moving the state down” to the child component itself. This ensures that only the component directly responsible for the state triggers re-renders when it changes.

An example of this is the add task form. The value entered in the form’s input field (`inputValue`) is only relevant to the form itself. By moving the `inputValue` state to the form component, we prevent unnecessary updates in other parts of the application when the user types.

**What’s changed in version 2**: it creates an `AddTaskForm` component and pushes the `inputValue` state inside this new component. The result is that typing something in the input does not trigger a re-render for the whole app, but only for the `AddTaskForm`. An additional `RenderCounter` shows how many times the form re-renders while typing, instead the original counter does not update.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&initialpath=%2Fcomposition-improvement-1&module=%2Fsrc%2Fversions%2Fversion-2.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Encapsulating state

In some cases, state might seem relevant to child components, but upon closer inspection, we might realize it doesn’t actually affect their behavior. In such scenarios, we can encapsulate the state within a container component. This prevents child components from re-rendering unnecessarily due to parent state updates.

This is the case of background color in our example. While child components might be rendered within a container with a background color, they typically don’t interact with or rely on this value. By managing the background color state within the container component, we can avoid unnecessary re-renders in child components when the background color changes.

**What’s changed in version 3:** The following code creates a `Container` component that is responsible for changing the background color and rendering its children.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&initialpath=%2Fcomposition-improvement-2&module=%2Fsrc%2Fversions%2Fversion-3.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Composition: final refactor

As a demonstration of the power of composition, consider the following final refactor, which encapsulates all task management logic within a separate component (`TasksView`). By doing so, even actions such as adding tasks or marking them as done do not cause unnecessary re-renders of unrelated components, resulting in improved performance.

**What’s changed in version 4**: `TasksView` is responsible for the task management logic and encapsulates the state and the update function related to tasks.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&initialpath=%2Fcomposition-improvement-3&module=%2Fsrc%2Fversions%2Fversion-4.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 2\. Uncontrolled components

When implementing forms in React.js applications, the canonical approach involves using controlled components where React manages the form state. While this approach is straightforward and effective for many scenarios, it can lead to performance issues, especially with complex forms that trigger re-renders with each user input. To address this, developers can leverage uncontrolled components, allowing the DOM to handle form state management in certain situations.

Uncontrolled components provide an alternative to controlled components by relinquishing control of form state management to the DOM.

### Uncontrolled form

In situations where the entire form state is not needed except for submission purposes, uncontrolled forms can be utilized. By relying on the DOM’s native form [submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), we can reduce unnecessary re-renders of the entire form, resulting in improved performance. However, it’s essential to ensure that all form inputs have proper names to capture their values during submission.

> A **common pitfall** when using uncontrolled components is neglecting to provide names for all form inputs, which can prevent their values from being captured during form submission. Ensuring that all inputs have proper names is crucial for the correct functioning of the form.

**What’s changed in version 5**: The `AddTaskForm` is implemented using an uncontrolled approach, while the `TaskView` is identical to the one in the previous example. The form contains an additional `SlowComponent` that introduces a delay for operations on tasks but not when editing the form.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&initialpath=%2Fcomposition-improvement-1&module=%2Fsrc%2Fversions%2Fversion-5.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Uncontrolled components & state colocation

State colocation principles can be applied to uncontrolled components by managing state within individual input components or a subset of inputs. This approach improves rendering performance by minimizing the scope of state updates and re-renders. For example, validating input fields while typing or managing dependencies between fields can be achieved by maintaining state within the relevant input components.

**What’s changed in version 6**: a new `TaskTextInput` component is introduced to manage the input value and the validation while the form still relies on the submit event to get the input value.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&initialpath=%2Fcomposition-improvement-1&module=%2Fsrc%2Fversions%2Fversion-6.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

It’s important to note that while uncontrolled components offer performance benefits, they may also present limitations. In the previous example, the form lost the reset functionality for form inputs. Developers should carefully consider these trade-offs and choose the approach that best suits their specific requirements and use cases.

## 3. memo, useMemo, useCallback

React provides three [memoization](https://en.wikipedia.org/wiki/Memoization) techniques to improve the rendering performance. [Memoization](https://en.wikipedia.org/wiki/Memoization) is a type of caching technique, specifically used to speed up algorithms by storing the results of expensive function calls to pure functions (eg. expensive calculations) and returning the cached result when the same inputs occur again. In React, memoization means caching values that persist beyond a single render, so that you can reuse them on the next render without recalculating the result.

The React documentation defines them as follows.

- [memo](https://react.dev/reference/react/memo) this High Order Component lets you skip re-rendering a component when its props are unchanged.
- [useMemo](https://react.dev/reference/react/useMemo) is a React Hook that lets you cache the result of a calculation between re-renders.
- [useCallback](https://react.dev/reference/react/useCallback) is a React Hook that lets you cache a function definition between re-renders.

> While `useMemo` and `useCallback` serve similar purposes, they differ in the type of value they memoize. Both hooks cache values between re-renders to optimize performance; however, `useMemo` is used to memoize the result of a calculation (typically a variable), whereas `useCallback` is used to memoize the definition of a function. You could argue that functions are variables too and in fact memoizing them with `useMemo` is fully equivalent to doing it with `useCallback` but needs more code because of the required function wrapper. More on this can be found in [Memoizing a function](https://react.dev/reference/react/useMemo#memoizing-a-function).

So how could we benefit from them?

### memo

Optimizing with `memo`  is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive. Remember the false myth “a component re-renders only when its props change”? Well, `memo` makes this statement true. When using `memo` React will apply a change detection algorithm to the component’s props to decide whether to reuse its memoized version or not. Otherwise the component will always be re-rendered when its parent does.

The `SlowComponent` in the example is a perfect fit for `memo` because it is rendered often without changing its props (it has no props).

**What’s changed in version 7**: For the sake of simplicity, the next version re-starts from version 5, the one without input validation. The app uses a memoized version of `SlowComponent` leveraging `memo` benefits on subsequent re-renders.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?fontsize=14&hidenavigation=1&initialpath=%2Fcomposition-improvement-1&module=%2Fsrc%2Fversions%2Fversion-7.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Why not always use `memo`?

Memoization techniques come with a cost. When rendering a memoized component, React keeps a cache for it that is ready to use for the next render. Caching values means to allocate memory space for it. Keeping in mind that `memo` is ineffective if props changes across renders, using it when not necessary increases the memory consumption of the application and creates many values that the garbage collector must clean potentially provoking a performance degradation.

So `memo` is valuable only when props changes are minimized. For this reason it’s important to know [how React compares props](https://react.dev/reference/react/memo#minimizing-props-changes). It performs a shallow equality, comparing each prop with the corresponding one. While primitive values behave “as expected” (the equality check succeeds if values are equals), when dealing with arrays, functions and objects, a shallow equality comparison takes in consideration variable references, not their values. If these variables are defined during rendering, their reference will be different at each render, making the comparison fail.

How to minimize props changes?

### useMemo and useCallback

React provides hooks like useMemo and useCallback to help address this issue. We can leverage these memoization techniques to keep a stable reference to non-primitive variables. By using useMemo and useCallback strategically, you can prevent unnecessary re-calculations and reference changes within your React components, leading to improved performance when used in conjunction with `memo`.

In our code example, we could benefit from them by avoiding to re-render `AddTasksForm` and every task item when we add or we mark a task as complete.

**What’s changed in version 8**: the code is updated by adding a TaskItem component which is memoized and its props are kept stable by useCallback. The same technique is used for AddTaskForm. Additional RenderCounter are added to count how many times each task item renders.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?&fontsize=14&hidenavigation=1&initialpath=%2Fmemo-final&module=%2Fsrc%2Fversions%2Fversion-8.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

The memo HOC (Higher-Order Component) is used to wrap AddTaskForm and TaskItem components. This creates memoized versions (MemoAddTaskForm and MemoTaskItem) that will only re-render if their props actually change. The `useCallback` hook keeps stable across rendering the reference for `onAddTask` and `onToggleTask` functions. The overall impact is noticeable because both adding and toggling a task does not require to re-render nor the form, nor the other task items. Instead, TasksView will re-render because its state, the list of tasks, changes.

## 4\. Split large Context

React Context offers a built-in way to share state across components within the same tree, eliminating the need for tedious prop drilling. The official React documentation even suggests [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)  as a solution for managing shared state.

Context provides a way to share the state and update functions across components without passing props down the hierarchy. Reducer ensures a predictable and well-defined logic for updating the shared state.

However, Context has limitations:

- **Frequent re-renders**: Updating the context triggers a complete re-render of all components that use it, including their children. This can become inefficient, especially with large context objects and many dependent components.
- **Potential for misuse**: When dealing with complex state objects in Context, it’s easy to add unrelated properties over time. This can lead to a cluttered state and difficulty in managing updates.

For large-scale applications with frequently changing state, dedicated state management libraries like [Redux](https://redux-toolkit.js.org/), [MobX](https://mobx.js.org/), [Zustand](https://github.com/pmndrs/zustand), etc. are generally better choices. These libraries offer efficient ways to handle state updates and minimize unnecessary re-renders.

Context remains a valuable tool when dealing with:

- **Small and focused scope**: When the shared state affects a limited set of components, Context provides a clean and efficient solution.
- **Infrequent updates**: If the state doesn’t change frequently, Context’s re-render behavior is less of a concern.

In essence, Context excels at sharing state within a well-defined scope and for occasional updates. But for complex state management in larger applications, consider dedicated state management libraries.

Let’s revisit the todo list example using Context.

**What’s changed in version 9**: Here’s a fresh implementation using Context as a shared state.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?&fontsize=14&hidenavigation=1&initialpath=%2Fcontext-initial&module=%2Fsrc%2Fversions%2Fversion-9.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Our current context object mixes unrelated properties. Updating one triggers unnecessary re-renders in components reliant on others. Even components that don’t use the context directly can be impacted. With this approach every action provokes a full app re-render.

To fix this, we’ll split the context. Each new “slice” will group related properties that update together. We’ll also separate reading and update logic for better control.

**What’s changed in version 10**: It introduces 4 contexts ColorContext, InputContext, TasksContext, TasksDispatchContext.

<iframe src="https://codesandbox.io/embed/react-performance-patterns-ei4y2p?&fontsize=14&hidenavigation=1&initialpath=%2Fcontext-final&module=%2Fsrc%2Fversions%2Fversion-10.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-performance-patterns"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Each context limits update scope, ensuring only relevant components re-render. While this refactoring adds more code compared to the previous version (it might seem like overkill for this simple example), it showcases how to prevent unnecessary re-renders with Context. Once split, it becomes clear that ColorContext and InputContext are only used by a single component. In such cases, replacing them with a local useState hook is a viable option.

This refactoring mirrors the concept of function composition, but applied to object composition.

## What’s next: React Compiler and Automatic Optimizations

The future of React rendering looks even brighter with the introduction of the React Compiler (previously known as React Forget). This upcoming feature promises to automate many of the optimizations currently achieved with hooks like `useMemo` and useCallback. The compiler will analyze your component code and potentially inject optimizations to reduce unnecessary re-renders and improve performance. While the exact release date is still under development, this is a significant step towards a more streamlined and performant React development experience.

**Keep in mind**: While the React Compiler will likely simplify optimization tasks, understanding the fundamentals of reference values and memoization will remain valuable for React developers. This knowledge will help you write cleaner and more efficient code, and make informed decisions when to leverage the compiler’s capabilities.

## Final advices

While waiting for React Compiler, let’s optimize components following principles that [React team suggests](https://react.dev/reference/react/memo#should-you-add-memo-everywhere) that will be valuable also in future.

1.  When a component visually wraps other components, let it [accept JSX as children.](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](https://react.dev/learn/sharing-state-between-components) any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](https://react.dev/learn/keeping-components-pure) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](https://react.dev/learn/you-might-not-need-an-effect) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](https://react.dev/learn/removing-effect-dependencies) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.
