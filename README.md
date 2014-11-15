ad.aloodo.com
=============

Simple warnings about third-party tracking.

Info at: [ad.aloodo.com](http://ad.aloodo.com/)

Tracking page: [ad.aloodo.com/track/](http://ad.aloodo.com/track/)

How it works
------------

**ad.js:** draws the "targeting" iframe onto the page.  Registers the startAloodo function to handle the "tracking detected" message if it comes in from the iframe.

**track/index.html:** contains inline JavaScript to test the value of a cookie, and send a message if it looks like third-party setting is possible. 


How to make it not work
-----------------------

The tracking is designed to be obvious and foiled by any decent tracking protection tool.  

 * Third-party JavaScript blocking

 * Third-party cookie blocking

 * Cookie double-keying

 * Explicit blacklisting

This is intended to get non-users of tracking protection tools started with something, to help shift the benefits of web advertising toward sites and brands, and away from intermediaries and fraud.  It's not a comprehensive privacy measurement tool.


FAQ
---

**Should I add ad.aloodo.com to my tracking protection tool's blacklist?** Yes, please.

**Can I add just the iframe and not ad.js to my site?** Yes, please.

**Can I fork this, send pull requests, all that stuff?** Yes, please.

