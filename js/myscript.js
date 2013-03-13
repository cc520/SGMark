(function($,window) {
	window._nowSel = jQuery(),
		_nowSelCls = 'selBlock';

	jQuery(document).ready(function($) {
		var $bl = $('<div class="box-shadow-left box-shadow"/>');
		var $br = $('<div class="box-shadow-right box-shadow"/>');
		var $bt = $('<div class="box-shadow-top box-shadow"/>');
		var $bb = $('<div class="box-shadow-bottom box-shadow"/>');
		$('body').append($bl,$br,$bt,$bb);
		window._nowBlock = jQuery();
		$('html').delegate('*:not(.box-shadow)', 'mousemove', function(e) {
			if(window._nowBlock === this) return false;
			window._nowBlock = this;
			var $self = $(this),
				off = $self.offset(),
				h = $self.outerHeight(),
				w = $self.outerWidth();
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
		}).delegate('.box-shadow',function(){
			return false;
		});
	});

})(jQuery,window);