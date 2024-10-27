---
title: "So, you want a website. Part 1: WTF is the Internet?"
date: "2013-11-06"
excerpt: "I make websites for a living. Contrary to popular belief, nothing magical happens when my fingers press down on my keyboard. In a few articles, I explain in normal-people language how I taught my great aunt Bethany to build a website (and how you can, too)."
---

I make websites for a living. Contrary to popular belief, nothing magical happens when my fingers press down on my
keyboard. Making a basic website is a remarkably simple process based on following some rules. I am convinced that
anyone over the age of 10 can learn enough about web technology to create a personal blog or update an existing
website.[^1] All you need is 20 minutes and a good teacher. I can’t do anything about your available time, but I can
recommend to you a good teacher. His name is Steve Stevenson. You can email him at stevestevenson@stevesteveson.com.

J/K! I bet you whipped out your email program and started composing a passionate letter requesting Steve’s services.
Before you start feeling shame over your foolishness, I’m going to make your day. In a few articles, I’m going to
explain in normal-people language how I taught my great aunt Bethany to build a website (and how you can do it, too).

## The Internet is a Series of Tubes

Kinda. There is actually some truth in [Senator Stevens’ infamous rant][stevens], which you can
conveniently [dance][stevens-song1] [to][stevens-song2]. Let me show you by explaining what the Internet actually is.

You have a computer, don’t you? (Psst—it’s the thing you’re using to read this blog.) I love computers. They’re the
greatest way to [watch cat videos][cats1], among a few [other things][cats2]. But computers used to be really boring.
Back in the day, you could use them to, um, compute things, but that was about it.

The world of computing changed when somebody figured out that you connect a few computers together. That was a very good
idea.

The Internet is just a bunch of computers connected together, and it’s the one thing that makes my MacBook more than
just a beautifully designed calculator or typewriter. The computers that make up the Internet do many different jobs,
and if you’re going to set up a website, it’s important to understand what each computer’s job is.

<InterwebzNoSteps />

### The Client

Let’s start with the one you know most intimately: your computer. Yes, it’s part of the Internet, too. It’s commonly
called the “client” because it **receives files,** namely all the [wonderful cat videos][cats3] you’re watching now. The
client becomes part of the Internet when it connects to a “network” that already has access to all the other computers
on the Internet. This is where those tubes come in. While you may be connecting wirelessly to a network via wifi,
89.4%[^2] of the computers are connected via cables, like ethernet cables (those fat phone cables) and many (much
fatter, fiber-optic) underground cables, a.k.a. tubes. This _worldwide network of cables_ is how information gets sent
back and forth between your computer and all the others on the World Wide Web. Cool beans.

### The Router

When you connect to a network, whether it’s via wifi or ethernet, your computer has to distinguish itself from all the
other computers on the Internet. It needs a name. Unfortunately, you can’t just make one up. Your computer has to get
its name from another computer, the first one you connect to in the giant worldwide network. This computer, whose job is
to **direct traffic between computers** and **give names to other computers**, is called a “router.” Sadly, routers are
really bad at naming. You’d think they’d be good because it’s one of their only jobs, but they always come up with the
most boring names. However, the names they give are very unique, so they prevent your computer from getting mixed up
with all the others on the Internet. The name your computer gets is called its “Internet provider address,” or IP
address. It’s a set of numbers with a few decimal points, like 192.168.0.5. Yawn.

### The Server

Now that your computer has an IP address, it can start talking to other computers on the Internet. Open up a new tab in
your browser and type in the IP address of another computer into the location bar:

> 162.243.56.151

Huh? What just happened? (You should be seeing the homepage for this blog, BTW.) You just connected to another kind of
computer of the Internet. It’s called a “server,” and it’s job is to **send files.** The server with the IP address of
162.243.56.151 is the computer that’s storing all the files for my blog.

When you typed 162.243.56.151 into your location bar and hit enter, your computer sent a message to the router to which
you’re directly connected saying “Connect me to the computer whose name is 162.243.56.151.” The router then relays the
message to the router it’s connect to, which sends it to the router it’s connected to, and so on until the message
reaches **the router the server is connected to.** That router says “Hey! 162.243.56.151 is connected to me! I’ll give
it the message.” After my server receives your message (or a message from any computer, for that matter), it’s
programmed to automatically send the files for my website back to your computer. The files work their way through all
the tubes from router to router until they reach your computer. Then your browser processes all the files you just got,
and it shows you the result: my beautiful blog!

That’s how the Internet has worked since it was created: a client (you), through a series of routers, sends a message to
a server, which sends information back to the client. There’s just one more important type of computer on the Internet
you should know about if you’re going to set up a website.

### The Domain Name Server

You just connected to my blog’s server by putting it’s IP address into into your browser’s location bar. I bet you’ve
never done this before, and you probably never will again. That’s because computer names are boring and hard to
remember. Sure, you could find the power to change your life at [67.201.60.89](http://67.201.60.89/), but going
to [richardsimmons.com](http://richardsimmons.com/) is a bit more convenient.

“How does the Internet work the magic of connecting you to Richard’s server at [67.201.60.89](http://67.201.60.89/) by
putting [richardsimmons.com](http://richardsimmons.com/) in your location bar?” asked Great Aunt Bethany.

Why, I’m glad you asked.

When you put a domain name into your location bar, your computer has to figure out what server’s IP address matches up
with the domain name _richardsimmons.com_. To do this, your computer has to talk to **another** server first. This
server is called a “domain name server,” or DNS. A DNS has a very simple database, basically a two-column spreadsheet,
that pairs together IP addresses and domain names. It kind of looks like this, except with many, many more rows:

| Domain Name        | IP Address     |
|--------------------|----------------|
| sumwritings.com    | 162.243.56.151 |
| google.com         | 173.194.46.64  |
| richardsimmons.com | 67.201.60.89   |

The router you’re connected to doesn’t know all the IP address and domain name pairs out there, but it does know the IP
address of at least one DNS. So when you send your router a message directed at a domain name, it first sends a message
to a DNS asking, “What IP address matches richardsimmons.com?” If the DNS doesn’t know the IP address for
richardsimmons.com, it parlays the message to a bunch of other DNS’s until it finds the IP address.

Eventually, your router discovers that the server for richardsimmons.com is 67.201.60.89, and it then sends your
message (through other routers) to 67.201.60.89. After the Richard’s server receives the message, the process then works
in reverse, with the server sending files back to the client through a series of routers and tubes.

## In Summary

<Interwebz />

“OK, so what’s the deal? Why do I need to know all this anyway? You’d better not be wasting my time, or right hand to
God I will grab my switch and give you a good, ol’-fashioned whoopin’.”

Great Aunt Bethany can be quite the feisty one at times. I promise this read wasn’t a waste of your time. Find out next
time in _So, you want a website. Part 2: The 3 Things Everyone Needs to Do to Get a Website_.

[stevens]: http://www.youtube.com/watch?v=f99PcP0aFNE&feature=share&list=RD_cZC67wXUTs

[stevens-song1]: http://youtu.be/_cZC67wXUTs

[stevens-song2]: http://youtu.be/EtOoQFa5ug8

[cats1]: http://youtu.be/xEhaVhta7sI

[cats2]:  http://youtu.be/Kdgt1ZHkvnM

[cats3]: http://youtu.be/QH2-TGUlwu4

[^1]: I actually taught two people how to edit and maintain an existing Wordpress website—via HTML code—in under 30
minutes. It is possible.

[^2]: As always, this statistic was entirely fabricated.
