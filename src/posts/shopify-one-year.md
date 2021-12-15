---
title: One Year at Shopify
date: 2020-12-14
description: I've been working at Shopify for one year now. Here's what I've learned.
---

I've been working at Shopify for one year now.

Before I joined Shopify, I'd determined that my next career goals were roughly the following:

1. Build something cool and new with experimental technology, like JavaScript or edge computing.
2. Gain the respect of my peers for my the work I do.
3. Make an impact and be recognized for that impact by company leadership.

In December 2021, I started on the performance team. We focused on measuring and improving the speed of Shopify's online stores — *and there are a bunch of online stores*.

What a terrific team that was! Everyone was super humble, empathetic, and genuinely smart.

A few months into 2021, I got pulled into a new project now known as [Hydrogen](https://hydrogen.shopify.dev/). This started as a close collaboration with our CEO [Tobi](https://twitter.com/tobi), [Cathryn](https://twitter.com/c_a_t_h_r_y_n), [Duncan](https://duncan.dev/) and a few other people.

Tobi [announced Hydrogen at Unite](https://www.youtube.com/watch?v=FPNZkPqUFIU) in June, and we launched the [developer preview](https://hydrogen.shopify.dev/) in November.

It's been a wild ride. Here are some things I've learned while working at Shopify.

## Alignment is Key

The first thing that jumped out to me when I joined Shopify was that folks are passionate. Developers debate ideas and technology and implementations all the time, and the debates are fierce.

I'm a conflict-averse person, so this caught me off-guard. At first, it felt like everyone was super opinionated for the sake of being opinionated. Almost abrasive in some cases.

However, I soon realized this was a key part of the culture: **building alignment is important**.

You could be working with the smartest people in the world, but if you're not aligned, it's all for naught. If you're pushing in different directions, this means you're not pushing forward!

This comes up all the time, and I don't think there's a silver bullet to keeping alignment within teams other than to constantly be raising questions, debating, and working together with the goal of forward progress.

My aversion to conflict surfaces a weakness in this area: **I don't like to tell people when I think they're wrong**. It makes me super uncomfortable.

I've already experienced a couple instances of choosing comfort over conflict, and led to team members working on things that really didn't align with the overall goal of the project.

I'm trying to get better at this!

## Naivety-Driven Development

When we started building Hydrogen, we had a decision to make.

Every other modern JavaScript framework had invented their own way of fetching data for a given route, hydrating that on the page, and fetching more data for future page navigations on the client. _If these words made no sense to you, don't worry — it doesn't matter_.

It felt icky to be inventing yet another unique strategy when this cool new experimental thing called [React Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) had been announced last December.

I remember us saying in Slack, "It's a bummer we can't just use server components."

So, one day, I decided to experiment with building a version of server components that matched the pattern set forth in the demo repo and see if we could make it work in Hydrogen.

I did some really, really gross coding, y'all.

I tried and failed dozens of times to get it to work.

And I did all of this without first reading through React's internals to understand the spec or how the React team had intended on building and scaling server components.

All I did was try to match the input and output of the streaming response from the server and turn it into a thing that created React elements on the page.

At this point, I should admit: **I'm not a React expert.**

I've dabbled with React before by [creating fun frameworks](https://flareact.com/) and using it to build side projects and work projects.

But _you should see_ all the smart React people that work at Shopify. They know how to `useMemo` in the right places, how to organize large React projects, and how to distribute and maintain complex React libraries.

However, I think that **being a naive developer helped me** to get out of my comfort zone and try to explore server components in a way that I wouldn't have otherwise tried to do.

If only I knew the sins I was committing with each (failed) incantation of server components, I'd have quit before I even started.

I think being naive and experimental can be super healthy, and I've leaned into this quite a bit over the past year.

Of course, it's important to update your experiments with real knowledge and better practices once you discover them. But for new stuff, it's an effective strategy.

## Humility and Ego

I think it's super important to be humble.

Whenever I encounter another person who is super ego-driven, it really turns me off and makes it difficult for me to work with them. Because of this, I try as much as possible to be humble in my work.

Humility is a superpower. It allows you to put your shield down, be curious, and ask questions. When you're not humble, it's easy to become arrogant and ignore new ideas.

You don't want to be _too humble_, though. Sometimes it's best to acknowledge something or take credit and move on. Otherwise, it can be a distraction or even a detractor from the work.

I've also had to reckon with my own ego in the past year. When working on a high-profile project like Hydrogen, it's easy to get swept up in the hype of it all and get a big head.

Discarding my ego has been a continual, intentional process. I have to constantly remind myself: "I'm not doing this for me; I'm doing it as part of a larger goal."

This isn't easy! I'll get occasional reminders that "sting." Someone else getting credit for a thing I helped build, someone else getting to ship that big new feature, etc.

But these tradeoffs have benefits. New people get exposure to a project, new people get to advance in their careers, and new people get to share the burden of ownership and maintenance.

## Managing Expectations

I think humility and ego are closely related to one of the most critical things I've learned this year: **managing expectations**.

When you're working on a team in "stealth mode" on an exciting new project, it's easy to let your mind run wild and get super hyped on something.

Even if you're not working on a big project, you can fall into the trap of thinking the results of your work are going to be well-received and put on a golden pedestal for all to see.

I generally try to set my expectations **lower than average**.

Here's what that looks like in practice:

- People will respond "meh" about the thing I've built
- It won't end up on the first page of Hacker News
- It will work, but it's not going to change the whole world

This goes on and on with a dozen different variations.

I started leaning into this practice after reading [Brene Brown's _Rising Strong_](https://brenebrown.com/book/rising-strong/) which talks about how unmet expectations often lead to resentment (and shame spirals).

One important thing here is that you don't set your expectations _too low_. That can lead to apathy. If you think what you're building is shit, then you're going to put a shit effort into something.

For this reason, I've found it's healthy to set my expectations slightly below average.

## Managing Reality

So, reality check. Here are some outcomes of the work I've done in the past year:

- We successfully announced Hydrogen at Unite
- We successfully launched a developer preview this fall
- We've grown the team to more than 10 people
- Hydrogen did end up on the front page of Hacker News
- Because of our early work on server components, we've been collaborating with Meta and the React core team, and we got some cool shout-outs during [React Conf 2021](https://conf.reactjs.org/)
- I've chatted with people I never dreamed I'd meet, including the React team, the Tailwind team, the Vercel team, the Cloudflare team, and creators of Vue & Vite
- Hydrogen has been featured on some cool software development newsletters and podcasts
- Oh, and [this website is built with Hydrogen](https://github.com/jplhomer/site) 😊

I'm quite happy with how the year has gone.

One thing that's resonated with me is the idea that [building things should be fun](https://www.youtube.com/watch?v=FPNZkPqUFIU). At the end of the day, I'm building cool things, and it should be fun to do those things.

I want to surround myself with people who take their _work_ seriously but don't take _themselves_ too seriously.

## What's next?

Revisiting the career goals I'd determined before joining Shopify:

1. Build something cool and new with experimental technology, like JavaScript or edge computing. **Hydrogen is an experimental JavaScript technology built for the edge (Oxygen)**.
2. Gain the respect of my peers for my the work I do. **My peers are great, and I think there's a mutual respect**.
3. Make an impact and be recognized for that impact by company leadership. **Yep, this happened**.

So what's next? I do not know.

I don't think it's realistic to "top" the year I've had. Some of this comes back to setting below-average expectations, but I think it's important to realize that a lot of projects _don't_ succeed and _don't_ have impact. I need to be prepared for that.

One path forward is to become a #thoughtleader on social media and tweet about React constantly. I would need to say controversial things to get picked up by the algorithm. Then I could tour the world and speak at conferences about React and JavaScript and what's in and what's not and get promoted and then tweet some more.

In practice, I find it very hard to do this. It just ain't me. So I guess I'll continue to be myself.

In the meantime, I'm going to double-down on **human relationships** at work — fostering team culture, mentoring (and being mentored), and continuing to learn.

Cheers!
