  var _gaq = _gaq || [];
  // Hardcoded because I think it was turned off by the SSL issue.
  // You could have jekyll do this, somehow, but it is complicated and not necessary
  _gaq.push(['_setAccount', 'UA-4124866-15']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })()