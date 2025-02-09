---
title: 'A primer on atomic design'
date: '2020-10-01'
excerpt: 'A prerequisite for understanding composability in React component libraries.'
---

Modular UI design is well-articulated in Brad Frost’s notorious 2013 blog post, Atomic Design ([now a book by the same name](https://atomicdesign.bradfrost.com/chapter-2/)). Frost argues that modular design systems need a clear sense of hierarchy in a taxonomy of components. So that hierarchy can be inferred from the names of classes of components, he proposes classifying components using terms from basic chemistry: atoms, molecules, and organisms.

In atomic design, atoms are the basic building blocks of user interfaces, including HTML elements likes buttons, inputs, labels, and anything “that can’t be broken down any further without ceasing to be functional.” Most of the components in the Seeds component library can be considered atoms since they are React equivalents of basic HTML elements plus some extensions, such as switches, icons, and tooltips.

![The Button component in Seeds is an atom](https://p-pNF7b8x.b1.n0.cdn.getcloudapp.com/items/8LuPlr7v/Screen%20Shot%202020-09-03%20at%209.30.28%20PM.png?v=7a2af985c2aafcf5e9bb3bd1417e48c0)

Things start getting interesting when you put atoms together to form molecules. In atomic design, “molecules are relatively simple groups of UI elements functioning together as a unit.” In the Sprout web app, an example of a molecule would be the Filter component, which combines a checkbox, label, icon, button, and link.

![The Filter component in the web app is a molecule](https://p-pNF7b8x.b1.n0.cdn.getcloudapp.com/items/2Nuy9j5B/Screen%20Shot%202020-09-03%20at%209.29.05%20PM.png?v=94e54013323b96ffd2b853b3a373d763)
