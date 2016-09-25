<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Help detect when your site's users are vulnerable to third-party tracking.">
    <title>Anti-tracking pixel</title>
  </head>
  <body>
	<h1>Anti-tracking pixel</h1>

	<p>This page is part of the Aloodo system.</p>

	<h2>Request headers</h2>
	<pre>{{req_headers}}</pre>

	<h2>Response headers</h2>
	<pre>{{res_headers}}</pre>
  
	<img src="{{req_url}}" alt=" ">

	<p><a href="{{req_url}}">This page is at {{req_url}}</a></p>

	<p><a href="http://blog.aloodo.org/misc/howto/#pixel">How to use this pixel</a>
  </body>
</html>
