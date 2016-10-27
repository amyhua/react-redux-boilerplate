# react-redux-boilerplate
Boilerplate for creating a sample react-redux application

-----

# October 27, 2016: React/Redux Day 3


### Review: gist of redux

1. The whole state of your app is stored in an object tree inside a single store.
2. The only way to change the state tree is to emit an action, an object describing what happened.
3. To specify how the actions transform the state tree, you write reducers (as pure functions).

* The only way to mutate the internal state is to dispatch an action.

** Redux vs Flux **
* Redux doesn't have a Dispatcher or support many stores. Instead, there is just a single store with a single root reducing function

* See docs: [Redux data flow](http://redux.js.org/docs/basics/DataFlow.html)

---

#### With React-Redux bindings

Bare bones React Redux jsFiddle: [https://jsfiddle.net/uwg0zg5e/](https://jsfiddle.net/uwg0zg5e/)

* How is the "active" state being updated?
* How does the react redux bindings work?


----

## Debugging


#### react dev-tools

Open up the react-redux boilerplate application

Check out the countdown solution branch

```
git checkout feature/countdown-solution
```

Install react devtools

```
npm install --save-dev redux-devtools
```

[Get chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

See it in action!
Test it with `npm start` and open react dev tools on [http://localhost:8080/](http://localhost:8080/)

Integrates with [Jest](https://facebook.github.io/jest/) for testing!


#### Testing without building presentation components: logging current state

Example: client.js

```
import { createStore } from 'redux';
const store = createStore(someReducer);

console.log('Initial state');
console.log(JSON.stringify(state.getState())); // gets current state
console.log('---------------');

console.log('Dispatch ADD_TODO action');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
console.log('Current state');
console.log(JSON.stringify(state.getState()));
console.log('---------------');
```

---

In redux, `store.subscribe(onSubscribeCallback)` will update the UI in response to state changes

With react-redux bindings, we bind to the view automatically rather than use `subscribe()` directly.

---

Avoid state mutation

In reducer:

```
// return new state
return { ...state, completed: newCompletedStatus }
```

---

### Using the previous state to create the new state

E.g., an action to toggle a to-do item

Reducer:

```
case TOGGLE_TODO:
  return {
    ...state,
    completed: !state.completed
  }
```

---

## Reducer composition (with arrays)

One reducer can be called by another reducer

**Motivation**: anytime a function does too many things.. extract other functions from it
- Single function = single responsibility!

e.g., in a list of to-do items, create/update a single to-do item.

have a separate function for updating and creating a single to-do

reducer for single to-do item:
```
const todo = (state, action) => {
  // here, the state is a SINGLE todo (an object)
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case TOGGLE_TOD:
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
}
```

have a reducer for the **list** of todos,

which includes actions for manipulating individual to-dos....

```
const todos = (state=[], action) => {
  // here, the state is MULTIPLE todos (an array)
  switch (action.type) {
    case ADD_TODO:
      return [...state, todo(null, action)];
    case TOGGLE_TODO:
      return state.map(todoItem => todo(todoItem, action));
    default:
      return state;
  }
}
```
...as well as actions on the list of to-dos


---

Extending reducers:

E.g., filtering to-dos by completed

state now needs to look like:
```
{
  filter: 'completed',
  todos: [...]
}
```

Don't change existing reducers: compose reducers!

create a new reducer that calls existing reducers and combines the results in a single state object

```
const visibilityFilter = (state=SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
```

```
const todoApp = (state = {}, action) => P{
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
};
```

Reference: [https://egghead.io/lessons/javascript-redux-reducer-composition-with-objects](https://egghead.io/lessons/javascript-redux-reducer-composition-with-objects)

HIGHLY RECOMMENDED: complete all 30 videos to learn ins and outs of using redux

----

#### combineReducers

Shortcut: Redux provides function called `combineReducers` to generate toplevel reducer for you

```
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
```
equivalent to the above

**convention: always name reducers after the state keys they manage. Name top-level reducer after the component it managers**

Reference: [https://egghead.io/lessons/javascript-redux-reducer-composition-with-combinereducers](https://egghead.io/lessons/javascript-redux-reducer-composition-with-combinereducers)

---

### Async Actions with Redux

Related Docs link: [http://redux.js.org/docs/advanced/AsyncActions.html](http://redux.js.org/docs/advanced/AsyncActions.html)

Unfinished movie app: skeleton repo

```
git remote add amy https://github.com/amyhua/react-redux-boilerplate.git
git checkout -b feature/movie-list-unfinished
git pull amy feature/movie-list-unfinished
```

Github link: [https://github.com/amyhua/react-redux-boilerplate/tree/feature/movie-list-unfinished](https://github.com/amyhua/react-redux-boilerplate/tree/feature/movie-list-unfinished)

Beyond API fetches: [using middleware (docs: Async Flow)](http://redux.js.org/docs/advanced/AsyncFlow.html)

---

## Using React/Redux with React Router

[See docs! Usage with React Router](http://redux.js.org/docs/advanced/UsageWithReactRouter.html)

---

##  Learning from others: redux examples

See examples in the docs: [http://redux.js.org/docs/introduction/Examples.html](http://redux.js.org/docs/introduction/Examples.html)


## Going Beyond


* Implementing middleware for Redux with [redux-thunk](https://github.com/gaearon/redux-thunk)
* Beyond pure functions: immutable data collections for javascript with [ImmutableJS](https://facebook.github.io/immutable-js/)
  * ImmutableJS: data structures. E.g., [List](https://facebook.github.io/immutable-js/docs/#/List)
* Dealing with deeply nested data (as you would with composed reducers and redux states): [Normalizr](https://github.com/paularmstrong/normalizr)
  * Master example: [real-world example from redux](https://github.com/reactjs/redux/tree/master/examples/real-world)