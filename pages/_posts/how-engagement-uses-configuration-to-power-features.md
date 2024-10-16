---
title: "How Engagement uses configuration to power features"
date: "2020-11-01"
excerpt: "It was familiar; it was fast. It *worked*. But as I started copying and pasting code from the Inbox, I thought, *there’s got to be a better way*."
---

> Or, how we created a feature by deleting code

The time had come to build yet another list of messages. It was no surprise; this is what we do in Engagement, and it
had been a solid 6 months since we last built a list of messages. We could have done what we’ve been doing for years
when creating new lists of messages: create a layout file, create a new instance of the MessageList component, create a
new RightRail component, initialize the data layer, create the fetching logic. It was familiar; it was fast. It
*worked*. But as I started copying and pasting code from the Inbox, I thought, *there’s got to be a better way*.

Of course, there are always better ways. And we’ve all made the error of premature optimization. But when patterns
emerge, so do opportunities to *maturely* optimize. This is what I saw when I looked at InboxMessageList,
FeedsMessageList, ReviewsMessageList, and TeamMemberMessageList—as I faced the choice to create a
ReplyApprovalMessageList. (And right rail, and message saga, and message fetching service, and so on.)

Now, these components were not identical. They supported different features. They had different types of filters. They
called different endpoints to retrieve messages. But they had a lot more in common than they differed. They composed
many of the same subcomponents. They had very similar layouts. They stored messages and filter configurations in the
same part of the store and in the same shape. Could there be a way to unite these similarities and solve for the
differences?

At the UI level, we initially solved for the differences using **composition**. Composition takes advantage of the
modularity of UI components to enable a high level of reusability. By breaking down UI components into small enough
pieces, we can create progressively larger components that compose the same smaller building blocks in different ways to
meet a variety of use cases.[^1]

> *Composition*: Breaking things down into small, abstract pieces and putting them together to make new, bigger things.

At lowest level, optimizing for composability makes sense; after all, it is a foundational principle of modular design
systems, and most of our smallest components live within the design system itself. The smallest components are distinct
from each other in function and form—there is almost no overlap in how they are built and the purpose they serve. For
them to be reusable, these components must be flexible enough to be used in a variety of applications and contexts; thus
their APIs must be small and unopinionated—what I like to call “dumb components.” Said more eloquently than I ever
could:

> Modular design hinges on the simplicity and abstract nature of the interface definition between the modules.
>
> — Tim Berners-Lee, *Modularity* (2008)[^3]

Composing these dumb components within the context of an application is the smart way to solve for the nuances and
unique requirements of a particular feature.[^2]

As we build increasingly larger components from smaller ones, the benefits of composability start to wane. Larger
components look less distinct from each other because they are comprised of the same subcomponents. We don’t plan on
composing large components because it doesn’t make sense to. This is fine—optimizing for composability is hard and it
can take a long time. Just because we willingly sacrifice composability in opinionated monolith components doesn’t mean
we need to sacrifice *reusability*. When code duplication emerges, so do patterns. An opportunity to optimize presents
itself. We need a new abstraction.

The section-specific components for the message list, right rail, and header are large components that share a lot of
the same small components. Essentially, these larger components exist to set some configuration variables and create the
page layout. The main differences in the UI stem from what **features** are supported in that section of the app. If we
could control the visibility of features, we could combine these section-specific layout components into generic, shared
layout components.

Each message list that Engagement owns—the Smart Inbox, Reply Approval, Feeds, Reviews, and the Team Report—uses a
subset of all available message list features, such as keyboard mode, collision detection, search, bulk actions, spike
alerts, and more. While the availability of a message list feature can be represented by a boolean value, many
overlapping factors go into computing this value: app context, customer plan, and user permissions, to name a few.
Handling these calculations in the UI and data layer led to complex conditionals repeated in multiple places. In other
words feature availability in message lists was ripe for abstraction.

So there seemed to be a path to consolidation, to One Message List to Rule Them All. First, we needed to abstract
feature availability to a separate, shared configuration layer. Next, we needed to implement this configuration in
message list UI and data layer. Finally, we could replace the individual, bespoke message list components with instances
of the config-powered one and delete All the Things. This is what I did.

The idea for this kind of configuration layer was not new; in fact, the concept was taken from how we handle feature
availability within messages themselves. At first, feature configuration happened within the message component. Then, it
was abstracted into a separate config. Over time, that config was expanded to handle more layers of boolean logic for
hiding are disabling features in the message UI. Now, the same message component with the same message data can be
rendered differently based on app context, message type, user permissions, or application state. It works really well.

Applying this concept to the message list layout components was pretty straightforward. First, we listed out all the
features supported in message lists throughout the app. The default for feature in the config would be `false` to give
us a blank slate to build on. Then, we created a matrix of feature availability based on the type of message list, which
would serve as the defaults for that section of the app, overriding the falsely default values as needed. The next
layers would be special configuration overrides for things like Saved Views or the Smart Inbox, which has the broadest
set of feature support. Finally, user permissions and the customer plan capabilities could override the determined
feature availability up to this point. If by the end of these checks a feature is `true`, we should show that feature in
the UI, perform any necessary actions such as fetching data, and set up event listeners to enable its use. If the
feature is `false`, we don’t do any of that.

With this new feature config in hand, we could go about implementing it in the inbox message list components (which had
most features turned on). This involved simply pulling in the config values and replacing the existing conditionals.
Then we swapped in the config-based component everywhere we could, and voila—thousands of lines of code could be
obliterated.

So, how did we build the new reply approval message list? We didn’t. We used the inbox message list (and the rest of the
inbox layout components) and just turned on the features we needed for this new “type.” The config is 25 lines of code,
and the initial state for the list is created with 19 lines of code. With this minimal bootstrapping done, we could
quickly move our focus onto building new features. The total code written for creating the Reply Approval message list
never came close to the amount of code deleted, so we effectively created a feature by removing code. We should do that
more often.

[^1]: See [A primer on Atomic Design](/blog/a-primer-on-atomic-design/) for more on the topic of modular design and
development methodology.
[^2]: In [Composability in React component libraries](/blog/composability-in-react-component-libraries/), I cover the
paradigms of composable UI components and how we apply them in the Seeds component library.
[^3]: *Modularity*, Time Berners-Lee (2008). https://www.w3.org/DesignIssues/Modularity.html
