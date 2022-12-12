# TMG Test

I'd like to make a brief comment about my implementation of the store.

Initially - and this can be verified by the git history - I opted for using a setTimeout function that would call the delete method of the store on the new key.
However, I had problems getting Jest to work properly with the timers. Fake timers wouldn't work, and sometimes what looked like a race condition would be observed.
Also, the setTimeout solution had a complexity problem where, in case a key would be reinserted before the TTL expired, I had to keep the callback function returned
by the TTL to stop it and reinitialize the setTimeout function.

Because of that, I opted for a simpler and battle-tested solution. In a previous job, I had to create sort of a Redis clone for complicated reasons.
At that moment I became familiar with the way in which Redis implements it's own TTL method, and it was orginally extremely simple.
Redis would store the value with it's TTL. Then, whenever the value was requested, Redis would check the TTL and, if expired, return an empty value and delete the pair.

So I implemented a crude approximation of that. I store the TTL and check it before returning to the user. If the TTL is expired, then I return no value and delete the pair.

However, for the sake of this challenge, I did not implement the second part of the original Redis TTL implementation, which consisted of a background task that would randomly
hit keys in the store to trigger the clearing - a garbage collector, if you will.
While it would've been possible, for the sake of the challenge, I found it to be a bit too complicated. It would've consisted in a separate process that simply pings the
routes after some time had elapsed, or an actual separate thread that shared the store memory and would store the timestamps and check in whenever some key should expire.

Regarding the stack implementation, I think it's simple enough that the code should speak for itself.
