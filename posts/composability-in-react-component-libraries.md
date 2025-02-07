---
title: 'Composability in React component libraries'
date: '2020-10-15'
excerpt: 'While composition is a pattern originating in functional programming, it has more recently emerged as a foundational principle of modern UI development.'
---

There is often a debate in the world of programming about composition vs. inheritance. Generally, composition is preferred over inheritance because it enables better code reuse and flexibility than inheritance.[^1] While composition is a pattern originating in functional programming, it has more recently emerged as a foundational principle of modern UI development. Closer to home, composition is the guiding light when creating components in our Racine component library. Why? These components are designed to be used in a variety of contexts and applications so that we don’t need to “reinvent the button” (so to speak) every time we build a new feature or app. Since these components are basic building blocks that need to appear “inside of” other components, they need to be built with composability in mind. In a React component library, this means embracing a few key paradigms.

## Paradigms of composability in React component libraries

### 1. Focus is on style over function.

A reusable component should be as “dumb” as possible. First, it should primarily be concerned with styling native DOM elements, and it should provide a generic, slim public API through `props`. A web developer should be able to drop it into any React app or website and it should “just work.” For example, a reusable Button component would compose a native `<button>` and apply styles based on the design system’s theme. Its API would pass through native DOM props (perhaps internally wrapping them to improve accessibility or testability).

Second, a reusable component may provide a few additional style-related props, such as `size` or `appearance` to create a few flavors that can be used in different contexts, e.g., a “large, destructive button,” my personal favorite. However, these props shouldn’t be required and should have sensible default values.

Third, the component should handle basic, accessible functionality without any of the bells and whistles. State management should be kept to a minimum, and edge cases should be pushed onto the implementor. Consider, “If this were a native HTML element, what would it need to do?” If someone needs bells and whistles, they have to bring their own. BYOB&W.

Finally, the component should provide escape hatches to enable advanced styling for special cases that we don’t want to support at the global system level, such as a “pulsating” style. If your PM is begging for a large, pulsating, destructive button, you can give it to them (though you should question their intentions).

### 2. Containers allow arbitrary children.

As soon as you think, “Folks will only put _these_ components inside of _this_ component,” someone has already figured out a use case that crushes your dreams of reusability. Components that accept a `children` prop should be thought of as **containers**—wrapper components that don’t make assumptions about what will be put inside of them. You may provide some **subcomponents** that include core functionality and base styles for things that commonly go inside your container, but it’s vital that the container accept _anything_ for `children` in order to maintain full composability.

### 3. Implementation details are hidden.

If using the component is painfully complex, then no one is going to use it, or they’re going to use it wrong. This means avoiding things like render props[^2], Function as Child Components (FaCC)[^3], required hooks, and an exposed React `Context`[^4]. A composable component _may_ provide some of these APIs as a convenience or for advanced use cases, but they should not be required for basic functionality. A reusable component should work as expected “out of the box” with as little configuration as possible.

## Example: Popout

A great example of building library components with composability in mind is Racine’s Popout component. Not only is this component used extensively through the Sprout web app, it’s also used under-the-hood of several other Racine components, such as Tooltip, DatePicker, and MenuButton. Moreover, Popout exemplifies the 3 paradigms of composability:

1. Style over function. Popout first focuses on giving a Seeds-compliant style and all the proper accessibility attributes to native `div` elements. It allows for some typical customization of appearance, such as the placement of the Popout content with a sensible “auto” default. The default `zIndex` works in apps entirely built on the Seeds design system, but it can easily be overridden to allow Popout to be used in a legacy context.

2. A container for arbitrary children. The `children` prop for Popout renders the Popout _trigger_ element (i.e. what is visible on the page before the Popout opens). This trigger can be anything from a Button to an Input to a Doohickey. And the Popout _content_ can be anything, too. This is what allows it to be so flexible that several other components can transparently compose it.

3. Implementation details are hidden. Popout itself composes several open source React components and libraries—though you wouldn’t know it just by using it. Pretty much every use case can be met with the out-of-the box functionality provided by Popout. Simply putting a component with an `onClick` prop as the immediate child of Popout will allow it to be opened and closed without any additional configuration. However, advanced use cases can be met using optional open/close callbacks, an optional render function for the `content` prop and `children`, and optional prop forwarding to the underlying Popper and FocusLock components. It can be a controlled (state managed externally) or uncontrolled (state managed internally) component, but it smartly defaults to uncontrolled so it “just works” with minimal configuration.

## Summary

Following these paradigms of composability, we can build libraries with infinitely reusable components. Our components can easily being implemented in any React app, and they provide enough flexibility to meet simple and advanced use cases.

[^1]: [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)

[^2]: [Render Props](https://reactjs.org/docs/render-props.html)

[^3]: [Function as Child Components Are an Anti-Pattern](https://americanexpress.io/faccs-are-an-antipattern/)

[^4]: [Before you use context](https://reactjs.org/docs/context.html#before-you-use-context)
