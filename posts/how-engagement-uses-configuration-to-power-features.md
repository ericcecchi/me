---
title: 'How Sprout’s Inbox uses configuration to power features'
date: '2020-11-01'
excerpt: 'It was familiar; it was fast. It *worked*. But as I started copying and pasting code from the Inbox, I thought, *there’s got to be a better way*.'
---

> Or, how we created a feature by deleting code

"Copy, paste, modify, repeat." That was our mantra for building message lists on the Sprout Social Smart Inbox team. Each time we needed a new one—whether for the Smart Inbox, Reviews, or Team Reports—we'd dutifully follow our well-worn path: create a layout file, instantiate the MessageList component, add a Sidebar, set up the data layer. It was familiar. It was fast. It _worked_.

But as I started copying and pasting code from the Inbox yet again, I thought, _there's got to be a better way_.

This is the story of how we eliminated thousands of lines of code by replacing copy-paste development with something more elegant: configuration.

## The Right Time to Abstract

Of course, there is often a better way—and while premature optimization is a trap, mature patterns present opportunities for meaningful improvements. When I looked at our various message lists—`InboxMessageList`, `FeedsMessageList`, `ReviewsMessageList`, `TeamMemberMessageList`—I realized they shared much more in common than they differed. Instead of creating a new ReplyApprovalMessageList by copying code again, I wondered if we could generalize and simplify.

The different message lists weren’t identical. They had different features, filters, and data sources. But fundamentally, they composed many of the same subcomponents, shared a similar layout, and stored data in the same part of the store with the same shape. Could we unite these similarities and create a flexible structure that solved for the differences?

## Optimizing Through Composition

At the UI level, we initially solved these variations using **composition**. By breaking down UI components into small, modular pieces[^1], we could reuse and reassemble them to serve different purposes. This approach worked well, especially for our smallest components, which lived in our design system[^2] and were flexible enough to be used across various applications.

> _Composition_: Breaking things down into small, reusable pieces and putting them together to make new, larger things.

These smaller, “_dumb components_” had simple APIs and no preconceived notions about how they would be used. They were flexible, and they made building larger components easy. As Tim Berners-Lee put it:

> "Modular design hinges on the simplicity and abstract nature of the interface definition between the modules."
>
> — Tim Berners-Lee, _Modularity_ (2008)[^3]

As we built larger components from smaller ones, we found diminishing returns. The larger components were too similar to justify repetition but too specific to be broken down further for reuse. We needed a shared abstraction that allowed us to reuse code while maintaining flexibility.

## From Composition to Configuration

The section-specific components for the message list, sidebar, and header were large but similar. They primarily set configuration variables and established layout. For example, the Smart inbox supported keyboard mode, bulk actions, and search, while the Reviews page did not. The components for these sections were structured like this:

```jsx
<InboxLayout>
  <InboxMessageList />
  <KeyboardMode />
  <InboxBulkActions />
  <InboxSidebar />
</InboxLayout>

<ReviewsLayout>
  <ReviewsMessageList />
  <ReviewsSidebar />
</ReviewsLayout>
```

The main differences were which **features** each section supported—keyboard mode, search, bulk actions, and more.

Instead of composing new components, what if we used a configuration layer to drive the differences? Each message list in the app—the Smart Inbox, Reply Approval, Feeds, Reviews, Team Report—used a different subset of the same broader feature set. Depending on a set of factors, such as the context, plan level, or user permissions, these features could be toggled on or off. Handling all these conditions repeatedly across different places led to redundant, complex code that was ripe for abstraction.

To move forward, we consolidated feature availability into a separate, shared configuration layer. By managing features through configuration, we could unify the message list components, reduce redundancy, and make the feature toggling logic reusable across the entire app.

## Implementing the Configuration Layer

The idea of using a configuration layer wasn’t entirely new—we’d done something similar for handling features within individual messages. Initially, feature toggles were baked directly into the message components, but later they were abstracted into a configuration. This allowed the same message data to be rendered differently depending on app context, message type, or user permissions.

<Mermaid chart={`graph LR     Base[Base Config] --> M{Merge}     Plan[Plan Features] --> M     User[User Permissions] --> M     M --> Final[Final Configuration]     Final --> Message[Message Component] `} />

Applying the same concept to the message list components was relatively straightforward. We began by listing all the features supported across message lists. We set each feature’s default to “false” to give us a blank slate, and then we created a matrix of feature availability by message list type. This matrix would serve as the defaults, which could be further overridden by special configurations (e.g., for Saved Views) or by user permissions and plan capabilities. In pseudo-code, it looked like this:

```jsx
const intialConfig = {
  smartInbox: {
    keyboardMode: true,
    bulkActions: true,
    search: true,
  },
  reviews: {
    keyboardMode: false,
    bulkActions: false,
    search: true,
  },
  replyApproval: {
    keyboardMode: false,
    bulkActions: false,
    search: false,
  },
  // ...
};

function getMessagesListConfig(type) {
  // Starting with the initial config, we can override the defaults with special configurations or user/plan features.
  let features = intialConfig[type];
  getFeaturesForPlan(features);
  getFeaturesForUser(features);

  return features;
}
```

Once the feature configuration was fully implemented, we updated the inbox message list components to use these config values. This allowed us to replace all the individual, bespoke message list components with a single, configurable one—and delete a lot of duplicated code:

```jsx
function MessageList({ type }) {
  const features = getMessagesListConfig(type);

  return (
    <Layout>
      <MessageList features={features} />
      {features.keyboardMode && <KeyboardMode />}
      {features.bulkActions && <BulkActions />}
      {features.search && <Search />}
      <Sidebar features={features} />
    </Layout>
  );
}

// All the bespoke message list components could now be replaced with a single, configurable one:
<MessageList type="smartInbox" />;
```

## Creating by Deleting

So, how did we build the new Reply Approval message list? We didn’t. Instead, we used the inbox message list and simply configured it for Reply Approval. The configuration was just 25 lines of code, and the initial state was set up in 19 lines. This minimal setup meant we could quickly move our focus onto building new features, and ultimately, the amount of code deleted far exceeded the amount written.

We created a feature by removing code. We should do that more often.

[^1]: See [A primer on Atomic Design](/blog/a-primer-on-atomic-design/) for more on the topic of modular design and development methodology.

[^2]: In [Composability in React component libraries](/blog/composability-in-react-component-libraries/), I cover the paradigms of composable UI components and how we apply them in the Seeds component library.

[^3]: _Modularity_, Time Berners-Lee (2008). https://www.w3.org/DesignIssues/Modularity.html
