jQuery(document).ready(function(){
	$('#preloader').fadeOut();

	$('#navigation a').click(function() {
		$('#navigation a').removeClass('active');
		$(this).addClass('active');
	});

	$('.marquee').marquee({
		duration:         8000,
		gap:              24,
		delayBeforeStart: 0,
		direction:        'left',
		pauseOnHover:     true,
		duplicated:       true
	});

	window.addEventListener('hashchange', get_data, false);

	function get_data(fadein) {
		if (fadein == 1) {
			$('#main').hide();
		}

		var page = get_page();

		window.page = page;

		$.getJSON('storage/' + page + '.json', function(data) {
			json = data;

			var items = [];

			$.each(data, (function(index) {
				var item = data[index];

				if (data[index]['template'] !== undefined) {
					var template_id = data[index]['template'];
				} else {
					var template_id = 'default';
				}

				items.push('<section id="' + data[index]['slug'] + '" data-template="' + template_id + '" class="entry b-blue">');

				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});

				var source   = document.getElementById(template_id).innerHTML,
					template = Handlebars.compile(source),
					html     = template(item);

				items.push(html);

				items.push('</section>');
			}));

			var posts = $('<div/>', {'class': 'site-content', html: items.join('')});

			if (fadein == 1) {
				$('#main').html(posts).fadeIn();
			} else {
				$('#main').html(posts);
			}

			if (typeof init === 'function') {
				init();
			}
		});
	}

	get_data(1);

	function get_page() {
		var page = window.location.hash.substr(1).replace('/', '');

		if (page == '') {
			page = 'home';
		}

		$('#navigation a.' + page + '-item').addClass('active');

		return page;
	}

}); // jQuery

function smile(i = 0) {
	var smiles = [';)', ':)', ':)', ':)'],
		smile  = document.getElementById('smile');

	smile.innerHTML = smiles[i];
	i++;
	if (i == smiles.length) i = 0;
	setTimeout('smile(' + i + ')', 1000);
}

smile();
