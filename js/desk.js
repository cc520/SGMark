(function($,window) {
  	var selBlockCls = '_plugin_sel';
  	var $selBk = '#_selBlock',
  		$oper_icons = '.oper_icons';
  	jQuery(document).ready(function($) {
  		var isEdit = false,
  			isMoveEle = null;
  		$selBk = $($selBk);
  		$oper_icons = $($oper_icons);
  		if(!$selBk.length) return;
  		$('body').delegate('*','mousemove',function(e) {
  			if(isEdit) return;
  			if(isMoveEle === e.target) return;
  			isMoveEle = e.target;
  			var $self = $(this),
  				offset = $self.offset(),
  				w = $self.innerWidth() - 2,
  				h = $self.innerHeight() - 2;
  			$selBk.parent().width(w).offset(offset).end().height(h).width(w);
  			return false;
  		}).delegate('*','click',function(e) {
  			isEdit = !isEdit;
  			if(isEdit){
   		  		checkState($(e.target));
  		  		$oper_icons.show(0).data('oper_ele',$(e.target)); 				
  			}
  		  	else{
  		  		/* 检测状态 */
  		  		$oper_icons.hide(0).data('oper_ele',null);
  		  	}
  		  	function checkState($ele){
  		  		var $o_fixed = $oper_icons.find('.o_fixed');
  		  		if($ele.data('isFixed')){
  		  			$o_fixed.find('a').attr('title','解除固定');
  		  		}else{
  		  			$o_fixed.find('a').attr('title','固定');
  		  		}
  		  	};
  		  	return false;
  		});

  		$oper_icons.delegate('li','click',function(e) {
  		  	var ele = e.target,
  		  		cls = $(ele).closest('li')[0].className,
  		  		$ele = $oper_icons.data('oper_ele');
  		  	/* 如果出错不存在 则不执行*/
  		  	if(!$ele.length) return;
  		  	switch(cls){
  		  		case 'o_fixed':
  		  			fixedEle($ele);
  		  			break;
  		  		case 'o_remove':
  		  			removeEle($ele);
  		  			break;
  		  		case 'o_cancel':
  		  			cancelOper();
  		  			break;
  		  		default:
  		  			break;
  		  	};
  		  	/* 固定元素 */
  		  	function fixedEle($ele){
  		  		var offset = $ele.offset(),
  		  			$win = $(window),
  		  			st = $win.scrollTop(),
  		  			sl = $win.scrollLeft(),
              isFixed = $ele.data('isFixed');
            if (!isFixed) {
              $ele.data({
                'isFixed': true,
                'originTop': $ele.css('top'),
                'originLeft': $ele.css('left'),
                'pos' : $ele.css('position')
              }).css({
                'position' : 'fixed',
                'top': parseInt(offset.top) - st,
                'left': parseInt(offset.left) - sl
              });
            }else{
              var orginTop = $ele.data('originTop'),
                  originLeft = $ele.data('originLeft'),
                  pos = $ele.data('pos');
              $ele.data('isFixed',false).css('position',pos).css({
                top : originTop,
                left : originLeft
              });
            };
  		  		cancelOper();
  		  	};
  		  	/* 删除元素记录*/
  		  	function removeEle ($ele) {
  		  	  	$ele.css('display','none');
  		  	  	cancelOper();
  		  	};
  		  	/* 取消操作还原 */
  		  	function cancelOper() {
  		  		isEdit = false;
  		  		$oper_icons.hide(0);
  		  	};
  		  	return false;
  		});
  	});
})(jQuery,window);