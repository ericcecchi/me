---
title: 'Opinion: Software engineers should not be opinionated'
date: '2024-02-04'
excerpt: 'A recovering opinionated developer confesses to a career of being spectacularly wrong about everything—and explains why that might actually be a good thing.'
---

I've spent most of my career being wrong about things. Spectacularly, confidently, passionately wrong. I once wrote a 2,000-word manifesto about why CSS-in-JS was an abomination that would destroy web development as we know it. I'd sworn on a Bible there's no way React.js would ever supplant Ember. I've staked my professional reputation on Backbone.js being the future of frontend development.

Ok, not the last one. I've never been THAT wrong. But here's the thing: contrary to popular belief, being a successful software engineer isn't about having the strongest opinions. In fact, I've learned that the best engineers I've worked with have weakly held opinions about most things. And yes, this is strong opinion about not having strong opinions—sue me. (please don't)

## The Cost of Being "Right"

I recall the day I caught myself about to jump into a heated Slack thread about tabs versus spaces. My fingers were hovering over the keyboard, ready to unleash a carefully crafted argument complete with scientific studies about cognitive load and developer productivity. Then I remembered all the times I've been absolutely certain about something, only to completely change my mind a year later.

Remember when we all thought jQuery was the future of web development? When MongoDB was the answer to every data storage question? When we believed microservices would solve all our architectural problems? (Okay, some people still believe that last one, but give them time.) So, what separates the pragmatic engineers from the stubborn ones?

## The Three Pillars of Pragmatic Engineering

### 1. Context Is King

The hard truth is that technology choices should be boring. They should be so boring that they make enterprise software documentation look exciting. Because exciting technology choices usually mean exciting production incidents, exciting emergency meetings, and exciting updates to your resume.

Sure, you could spend three months rewriting a perfectly functional PHP application in Elixir because it's "more scalable." Turns out, your peak traffic of 50 requests per minute could have been handled by the PHP version running on a toaster.

### 2. Strong Opinions, Weakly Held

"But wait," you might be thinking, "didn't you just say we shouldn't be opinionated?" Well, grab your beverage of choice (I'm not opinionated about that either), and let me introduce you to a paradox.

The key isn't to have no opinions—it's to hold them loosely enough that you can change them when evidence suggests you should. Think of your technical opinions like that CSS framework you love right now: useful tools that should be upgraded when better options come along, not philosophical principles to defend to the death.

### 3. The Only Constant Is Change

Every time I've been absolutely certain about the "right way" to do something, future me has looked back and cringed. The "perfect" solution today might be legacy code tomorrow. And that's okay. Our industry moves even faster than AI startup valuations.

## In Practice: A Tale of Two Projects

The most valuable project I've ever worked on was also the messiest. We chose technologies based on team familiarity rather than technical superiority. We kept old systems running instead of rewriting them. We made peace with imperfection.

Meanwhile, I've also led projects where we prioritized technical purity above all else. We used cutting-edge frameworks, followed every best practice, and created architecture so clean it would make Marie Kondo envious. Those projects? They're either still in development or they've been rewritten three times because nobody could maintain them.

## The Path Forward

So, what does it mean to be an unopinionated engineer? It means:

- Evaluating solutions based on evidence rather than emotion
- Acknowledging that different contexts require different approaches
- Being willing to learn from approaches you initially disagree with
- Understanding that the "best" solution is often the one that actually ships

## In Summary

The next time you find yourself in a heated technical debate about whether Rust is better than Go, or whether monorepos are the one true path to engineering enlightenment, take a deep breath and ask yourself: "Will this matter in a year?"

Remember: The best engineers aren't the ones with the strongest opinions—they're the ones who deliver value while keeping their egos in check. Everything else is just semicolons and whitespace.

[^1]: Yes, I've actually seen entire engineering teams get into week-long debates about naming conventions. The productivity loss probably cost more than my first car.
