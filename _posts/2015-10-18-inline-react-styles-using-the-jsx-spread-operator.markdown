---
layout: post
title:  "Inline React Styles Using the JSX Spread Operator"
date:   2015-10-18 16:00:00
categories: react
---
### Background

This article shows you one of the many ways to modularize and reuse inline styles for React using Plain Old Javascript Objects with the help of the [React `statics` object][react_statics] and the [JSX Spread Operator][jsx_spread].

### React `statics` Object

As per the [React Component Specs and Lifecycle][react_statics] documentation, *the `statics` object allows you to define static methods [and properties] that can be called on the component class.*

What this means is that you can access these properties of your React component class outside of instantiation of the actual component.

For example, let's say we have the following React component:

{% highlight Javascript %}
const MyComponent = React.createClass({
  statics: {
    customMethod(foo) {
      return foo === 'bar';
    }
  },

  render() {
    return;
  }
});
{% endhighlight %}

We will then have access to `MyComponent#customMethod` anywhere within our application where `MyComponent` is defined (via import or require).

### JSX Spread Operator

Based on the [ES2015 (ES6) Spread Operator][es6_spread] for arrays and function calls, the [JSX Spread Operator][jsx_spread] brings the same goodness to objects.

What this means is that we can create new objects based on old ones while adding or overriding properties on the previous one.

Suppose we have an object in our code like:

{% highlight Javascript %}
let contact = {
  name: 'Zach',
  human: true
};
{% endhighlight %}

If we ever want to create a new object based on this one (as opposed to mutating it, for the purposes of using this object as our State in something like a [Redux][redux] store), we can then define a new object using:

{% highlight Javascript %}
let newContact = {
  ...contact,
  human: false
};
{% endhighlight %}

This would result in a `newContact` object with the value of:

{% highlight Javascript %}
{
  name: 'Zach',
  human: false
}
{% endhighlight %}

### How Can I Apply This to Inline Styles in React?

As an example, we'll be using a React component called `Person` that is the parent component wrapping a component called `PersonSummary`.

{% highlight Javascript %}
// Person component

const Person = React.createClass({
  statics: {
    styles: {
      backgroundColor: 'orange'
    }
  },

  render: function() {
    let person = {
      name: 'Zach',
      human: true,
      age: 27
    };

    return (
      <div style={Person.styles}>
        <h3>Person: {person.name}</h3>

        <PersonSummary person={person} />
      </div>
    );
  }
});
{% endhighlight %}

{% highlight Javascript %}
// PersonSummary component

const PersonSummary = React.createClass({
  styles: {
    ...Person.styles,
    color: 'white'
  },

  render: function() {
    let { person } = this.props;

    return (
      <div style={this.styles}>
        <div>human: {person.human.toString()}</div>
        <div>age: {person.age}</div>
      </div>
    );
  }
});
{% endhighlight %}

What's happening here is that the `styles` property of the `PersonSummary` component is being defined as the value of `Person.styles` (a static property that is available anywhere) with the addition of the `color` property, containing the value of `white`.

Our PersonSummary `styles` object will contain the following styles when it is rendered:

{% highlight Javascript %}
styles: {
  backgroundColor: 'orange', // from Person.styles
  color: 'white'             // added after JSX Spread Operator was used
}
{% endhighlight %}

The rendered Person component will look something like this:

![](/assets/styles.png)

### After Action Review

We covered one of many (and seemingly controversial) techniques used to implement reusable styles in React components. Personally, I think inline styling via Plain Old Javascript Objects seems to be the way to go.

By factoring style objects out into ES6 modules and recycling common CSS properties using the JSX Spread Operator as a sort of mixin seems like it would result in fairly clean and readable React components in your projects as they scale up in size.

[react_statics]: https://facebook.github.io/react/docs/component-specs.html#statics
[es6_spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
[jsx_spread]: https://facebook.github.io/react/docs/jsx-spread.html
[redux]: http://redux.js.org/
