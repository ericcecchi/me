---
title: "Realtime collaboration with Redux and WebSockets"
date: "2020-11-18"
excerpt: "Typically, when we speak of scale issues, we talk about how to make things work better when given a larger volume of data, and the solutions center around making things bigger and faster. However, there is another type of scale that we encounter, and its problems and solutions look very different."
---

Some of the most challenging problems we face in product development are issues of scale. Typically, when we speak of scale issues, we talk about how to make things work better when given a larger volume of data, and the solutions center around making things bigger and faster. Bigger servers! Lower latencies! More efficient queries! However, there is another type of scale that we encounter, and its problems and solutions look very different. We encountered this other type of scale when building the Reply Approval feature we launched earlier this year.

## Several people are typing…
Periodically during product development, a group of engineers, designers, and product managers will manually test a new feature in several scenarios or workflows. These “Bug Bash” sessions are great because they allow us to simulate the roles and personas of real users and find issues we would miss while manually testing alone. (Plus, they’re a super fun and social way to build user empathy!) During a Bug Bash for Reply Approval, we identified a series of what we called “collaboration issues”—user experience problems stemming from a lack of realtime support for multiple users working within the same part of the app at the same time. Collaboration is an important issue of scale that we can easily miss when designing and engineering a user experience in isolation.

There are certain features where realtime synchronization of events between clients is a core requirement, so those features are designed around it. However, many collaborative features don’t *require* realtime support—though they would benefit from it—so it’s often an afterthought or considered an “enhancement.” Reply Approval was one of those collaborative features that we didn’t initially design to be realtime because it didn’t seem like it needed to be. A workflow we designed around looked like this:

1. Intern Aaron drafts a reply to a social message and submits it for approval.
2. Manager Molly gets an email notification that there is a pending reply awaiting her review and click a link to view it in the app.
3. Molly reads the reply in context and decides to either approve or reject the reply with a comment.

It seemed at first to be a straightforward, synchronous collaboration workflow—no realtime synchronization required. But what if Intern Aaron and Manager Molly were both already in the app, viewing the same conversation? Without realtime support, the following scenarios could play out:

1. Aaron would see his pending reply in the thread after submitting it, but Molly would not see it until refreshing the page. She could reply to the same message without ever knowing a pending reply existed.
2. Molly could open the thread after Aaron submitted a pending reply, and then approve it. If Aaron were still viewing the same conversation, he wouldn’t see that his reply was approved and sent.
3. Aaron, unhappy with his first attempt, could delete his pending reply and submit a new one for approval. Molly could still see the original reply in the thread and attempt to approve it, not knowing Steve deleted it and submitted another.

We could (and did) guard against some of these bad situations, sending informative error messages to a client taking an invalid action on a stale state. And we could (but did not) refresh some of these stale states by periodically fetching for updated data in the background. We started to go down that route, but we quickly realized that aggressively polling would put an unnecessary strain on our servers since these requests could be expensive and most of the time the data wouldn’t need to be refreshed. We knew that the proper way to solve these collaboration issues was with realtime synchronization, but late in project, the additional scope would mean missing our deadline by a long shot. We left the Bug Bash feeling quite deflated. We knew we made something that worked, but we fell short of our own expectations.

## I want it all, and I want it now
A couple days after that fateful Bug Bash, we began to see our collaboration problem instead as a collaboration **opportunity**. One realization was key to this new perspective: the user taking an action would always see the true, updated state immediately afterward, before hearing back from the server. At Sprout, we try to follow this pattern of “optimistic UI” as much as possible, since it makes the app feel snappier. It works like so: when a user clicks a button, we immediately (optimistically) render a success state as the API request happens asynchronously in the background. If the request succeeds, we don’t need to update anything. If it fails, we revert the state and display an error message. These state changes—both the optimistic success and revert after a failure—are handled by dispatching standard Redux actions and updating the store, nothing fancy. The epiphany we had was that these same Redux actions, if dispatched on other clients viewing the same UI, would synchronize their UI state with the user taking the action. We just needed to figure out a way to broadcast these actions to all relevant users!

In modern web development, one technology immediately comes to mind when discussing realtime events: the WebSocket API. WebSockets are supported in all modern browsers and are the natural choice for a realtime collaboration feature. We use WebSockets at Sprout to power some of our team-oriented features such as Collision Detection and the Notification Center. This is essentially how WebSockets work:

1. Clients connect to a socket server, which subscribes them to various event “channels” based on their user permissions.
2. As the socket server processes incoming events, it broadcasts messages to the appropriate connected clients through their subscribed channels.
3. Connected clients receive the broadcasted events in realtime and process them, potentially triggering UI updates (e.g. displaying a notification).

Typically, the incoming events the socket server processes come from internal backend services and external APIs. But we saw in WebSockets the potential for a client-to-client event system, with the socket server merely acting as a relay between clients in the same channel. The solution to our stale UI problems? Sending standard Redux actions through the socket channel to Sprout users in the same group.

## Just my (proto)type
We were able to build a production-ready prototype of this idea in a couple days with just a few hundred lines of code between the client and server. And it worked! Every one of the half dozen collaboration issues we encountered was addressed by this solution. Moreover, it is virtually infinitely scalable since the server is only concerned with relaying messages, and dispatching new Redux actions over the socket requires no backend work! In other words, this solution can be used to easily add realtime collaboration functionality to any existing or new features.

Before anyone begins to worry about the security implications of clients sending arbitrary events to each other, there are a few key principles baked into our solution:

1. Redux actions types must be explicitly allowed to be sent and received over the socket. Any actions not in the allow list will be ignored.
2. Actions must be pure (i.e. they only update client state). They should not trigger side effects such as sending network requests, since this would spam the server with duplicate requests.
3. Actions must not send sensitive data.
4. Actions can only be sent between users in the same group.

These principles were enough to keep our app secure without limiting the flexibility of our implementation. Meaning: we’re just getting started with enhancements to the realtime collaboration capabilities of Sprout. Look out for what we do with it next!
