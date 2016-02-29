---
layout: posti
title: OneStepAtATime
date:   2015-12-11 6:49:48
subcat: UniversalProgram
categories: 'cm'
image:
  feature: PZ/Fractals/5.jpg
---

I'm actually going to do the `UniversalProgram` project sireously now - but let's start by taking things one step at a time. As it stands, I'm probably not going to be able to do a wide a range of coding languages that I intended to because I am trying to implement way too many things at once.

First, let's start with one basic program - such as a `Hello World` program - and port it to all of the coding languages I want to try and we'll expand from there.

Most programmers will make a `Hello World` as their first program. I'm not "most programmers". So let's come up with a "first program" of our own:

<h3>The Higher or Lower Game</h3>
This is going to be the first program to be ported into every coding language. It has about the same real-world use as a `Hello World` program, but it's just slightly more interesting to make.

You've probably heard of or played this game before, but just in case, here's how it works:

A random number is generated.<br>
User tries to guess the number.<br>
Computer tells user if they were too high or too low.<br>
Keep guessing untill they get the number...<br>

<h3>Pseudocode</h3>
Here's a basic implementation of it in pseudocode:
{% highlight csharp %}
again:
set num = Rand.Next(0, 1000)
set done = false
do
{
input = GetInput().ToInteger()
	if(input greater than 9000)
	{
	print("That's over NINE THOUSAAANNNDD!")
	}
	if(input Equals num)
	{
	set done = true
	print("Cngrtz")
	break
	}
	if(input greater than num)
	{
	print("Too high")
	}
	if(input less than num)
	{
	print("Too Low")
	}
	
}
while(not done)

print("Play again? (y/n)")
if(GetInput() == "y")
{
	goto again
}

print("Press any key to continue...")
GetInput()
{% endhighlight %}