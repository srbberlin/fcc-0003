$(document).ready(() => {
  var depth = 0, step = 0, set = 0, q = [], t, btns = $('[data-toggle="tooltip"]');
    
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  } (document, "script", "twitter-wjs"));

	var getQuote = () => {
		return $.ajax({
			url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
			headers: {
				'X-Mashape-Key': 'MUzqdeOSo1mshCuear7hljNznBWrp1N5SPTjsngfXZ9xvMJ9dv'
			},
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'json',
		})
	};

	var setQuote = (data) => {
		$('#tweet-quote').attr(
      'href', 
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(data.quote + "\r\n\r\n"+data.author));
	  $('#text').text(data.quote);
		$('#author').text("- " + data.author);
	};
  
  function load(border) {
    let i = 0
    while (i < border) {
      getQuote()
      .done(data => {
        q[set++] = data[0];
        if (depth === 0)
          setQuote(q[0]);
        depth++;
      })
      i++;
    }
  }
  
  function next() {
	  getQuote().done(data => {
		  setQuote(data[0]);
      if(set >= depth)
        set = 0;
      q[set++] = data[0];
		});
  }
  
  function shuffle() {
	  getQuote().done(data => {
		  setQuote(data[0]);
      if(set >= depth)
        set = 0;
      q[set++] = data[0];
      t = setTimeout(shuffle, 1000 + data[0].quote.length * 100);
	  });
  }
  
  function round() {
    if (step >= depth)
      step = 0;
    setQuote(q[step]);
    t = setTimeout(round, 1000 + q[step].quote.length * 100);
    step++;
  }

  $("#new-quote,#shuffle,#round").click(function(){
    if (t) clearInterval(t);
    switch(this.id) { 
      case "new-quote": next(); break;
      case "shuffle": shuffle(); break;
      case "round": round();
    }
  });
  
  $(window).resize(function(){
    var b = $("#BOX");
    b.height(b.scrollHeiht);
  })
  
  btns.tooltip({ trigger : 'hover' });
  load(10);
});
