(function($,window) {
	window._nowSel = jQuery(),
		_nowSelCls = 'selBlock';

	jQuery(document).ready(function($) {
		window._nowBlock = jQuery();
		var $bl = $('.box-shadow-left'),
		$br = $('.box-shadow-right'),
		$bt = $('.box-shadow-top'),
		$bb = $('.box-shadow-bottom');
		$('html').delegate('*:not(.box-shadow)', 'mousemove', function(e) {
			var $self = $(this),
				off = $self.offset(),
				h = $self.height(),
				w = $self.width();

			$bl.offset(off).height(h);
			$br.offset({
				'left' : parseInt(off.left) + parseInt(w),
				'top' : parseInt(off.top)
			}).height(h);
			$bt.offset(off).width(w);
			$bb.offset({
				'left' : parseInt(off.left),
				'top' : parseInt(off.top) + parseInt(h)
			}).width(w);
			return false;
		});
	});

})(jQuery,window);