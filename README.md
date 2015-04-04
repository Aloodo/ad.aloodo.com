ad.aloodo.com
=============

Third-party tracking protection tool for content sites.

Info at: [ad.aloodo.com](http://ad.aloodo.com/)

Tracking page: [ad.aloodo.com/track/](http://ad.aloodo.com/track/)

How it works
------------

**ad.js:** draws the "targeting" iframe onto the page.  Registers the startAloodo function to handle the "tracking detected" message if it comes in from the iframe.

The startAloodo function will:

 * redirect to an alternate page if the variable
   `trackingAlternateLocation` is set

 * Make a pre-existing tracking warning visible

 * Load additional JavaScript and show a pop-up warning.

**track/index.html:** contains inline JavaScript to test the value of a cookie, and send a message if it looks like third-party setting is possible. 


How to make it not work
-----------------------

The tracking is designed to be obvious and foiled by any decent tracking protection tool.  

 * Third-party JavaScript blocking

 * Third-party cookie blocking

 * Cookie double-keying

 * Explicit blacklisting

This is intended to get non-users of tracking protection tools started with something, to help shift the benefits of web advertising toward sites and brands, and away from intermediaries and fraud.


FAQ
---

**Should I add ad.aloodo.com to my tracking protection tool's blacklist?** Yes, please.

**Can I add just the iframe and not ad.js to my site?** Yes, please.

**Can I fork this, send pull requests, all that stuff?** Yes, please.

