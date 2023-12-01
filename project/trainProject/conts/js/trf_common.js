$(function(){
	headEvt.init();
	formEvt.init();//input
	tabEvt();//tab 
	accoEvt.init()//아코디언
	popMotion.init(); // 팝업
	swiperArea.init();//swiper
	evtEtc.init()//기타
});

/* 모바일 에이전트 구분 */
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	IOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
	}
}

const headEvt = {
    init : () => {
		setTimeout(()=>{headEvt.btmFixEvt()}, 250);
		//headEvt.accoTopFixed();//아코디언 헤더 고정(개발 js로 이동 - 충돌위험으로 퍼블 js에서 반영 x : 시간표 조회 페이지 사용)
	},
	btmFixEvt : () =>{
		//하단 버튼 고정이 있을때 container padding-bottom 값 지정
		$(document).ready(function() {
			let $container = document.querySelector('#container'),
				$midFix = document.querySelector('.mid_fixed'),
				$fixBtn = document.querySelector('.btm_fixed');

			if($fixBtn || $midFix){
				let _btmH = $fixBtn.clientHeight;
				
				if($midFix){
					let _midH = $midFix.clientHeight;

					$container.style.paddingBottom = ((_btmH + _midH) + 32) +'px';
					// setTimeout(()=>{$container.style.paddingBottom = ((_btmH + _midH) + 32) +'px'}, 280);
				}else{
					$container.style.paddingBottom = (_btmH + 32) +'px';
					// setTimeout(()=>{$container.style.paddingBottom = (_btmH + 32) +'px'}, 280);
				}
			}
		})
	},
	accoTopFixed : () =>{
		let $accoFixWrap = document.querySelector('.j-accofixed');

		if($accoFixWrap){
			let $isVisible = false;
			let $contAcco =  $accoFixWrap.querySelector('.j-conts-accodion'),
				$wrapNextCont = $accoFixWrap.nextElementSibling,
				$btn = $accoFixWrap.querySelector('.btn_toggle');

			if($accoFixWrap.querySelector('.j_ui_tab')){
				let $tabCont = document.querySelector('.tab_cont.on');
				$contAcco = $tabCont.querySelector('.j-conts-accodion');
			}

			$panel = $contAcco.querySelector('.panel');
			$panel.setAttribute('aria-hidden', false);
			$panel.style.maxHeight = $panel.scrollHeight + "px";
			
			$btn.addEventListener('click', evt =>{
				let _this = evt.currentTarget;

				if(_this.classList.contains('on')){
					_this.classList.remove('on');
					_this.querySelector('span').innerText = '펼치기';
					$panel.style.maxHeight = 0;
					$panel.setAttribute('aria-hidden', true);
				}else {
					_this.classList.add('on');
					_this.querySelector('span').innerText = '닫기';
					$panel.setAttribute('aria-hidden', false);
					$panel.style.maxHeight = $panel.scrollHeight + "px";
				}

				evt.stopImmediatePropagation();
			}, false);
			
			window.addEventListener('scroll', e =>{
				e.stopPropagation();
				let _scrollY = this.scrollY;

				if(_scrollY >  document.body.offsetTop + 70){
					if(!$isVisible){
						$accoFixWrap.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
						$btn.style.opacity = 1;
						$panel.style.maxHeight = 0;
						$panel.setAttribute('aria-hidden', true);
						$isVisible = true;
					}
				}else{
					if($isVisible){
						$accoFixWrap.style.boxShadow = "none";
						$btn.style.opacity = 0;
						$btn.classList.remove('on');
						$btn.querySelector('span').innerText = '펼치기';
						$panel.setAttribute('aria-hidden', false);
						$panel.style.maxHeight = $panel.scrollHeight + "px";
						$isVisible = false;
					}
				}
			}, false);

			setTimeout(()=>{
				$wrapNextCont.style.paddingTop =  ($accoFixWrap.offsetHeight + 24) + 'px'
			}, 220);
		}
	}
}

const formEvt = {
	init : () => {
		setTimeout(()=>{formEvt.inputDel();}, 100);//input text 삭제
		setTimeout(()=>{formEvt.checkAll();}, 100);//전체선택
		formEvt.countEvt();//카운트
    },
	inputDel : () =>{
		let $inputWarp = $('.input_wrap');

		if($inputWarp.length > 0){
			$inputWarp.each((idx, ele) => {
				const _inputWrap = $(ele),
					_thInp = _inputWrap.find('input'),
					_thBtn = _inputWrap.find('.btn_del');    
				
				if(_thInp.is(':read-only') || _thInp.is(':disabled')) _thBtn.remove();
				if(_thInp.val().length > 0) {
					_thInp.next('.btn_del').addClass('on');
					if(_thInp.siblings('.btn_del').hasClass('on')) inpEvt(_thInp)
				}
				if(_inputWrap.closest('.input_unit')){
					const _unitWrap = _inputWrap.closest('.input_unit'),
						_unitInp = _unitWrap.find('.input_grow'),
						_unitItem = _unitWrap.find('.unit');

					_unitInp.css('padding-right',_unitItem.width() + 10);
				}

				_thInp.on({
					focus: function(){
						$(this).addClass('focused');
						if($(this).closest('.input_grow').length>0) $(this).closest('.input_grow').addClass('focused');
					},
					focusout: function(){
						$(this).removeClass('focused');
						if($(this).closest('.input_grow').length>0) $(this).closest('.input_grow').removeClass('focused');
					}
				});

				_thInp.on('change keyup paste', function(k){
					k.preventDefault();
					$(this).siblings('.btn_del').addClass('on').removeClass($(this).val().length > 0 ? '':'on');
					if($(this).siblings('.btn_del').hasClass('on')) inpEvt($(this));
				})

				_thBtn.on('click', function(e){
					e.preventDefault();
					$(this).removeClass('on');
					$(this).prev('input').val('').focus();
				});

				function inpEvt(inp){
					inp.css('padding-right', inp.siblings().width() + 10);
							
					if(inp.siblings('.btn_del').next().length > 0){
						let _items = _thBtn.nextAll(),
							_itemsWid = '',
							_totalWid = 0;
	
						_items.each((i, e) => {
							_itemsWid = $(e).width();
							_totalWid = Math.floor(_totalWid + _itemsWid);
						})
						
						inp.siblings('.btn_del').css('right', _totalWid + 15);
						inp.css('padding-right', _totalWid + 45)	
					}
				}
			})
		}
	},
	checkAll : () =>{
		let $agreeArea = $('.agree_area')

		$agreeArea.each(function(idx, ele){
			let _chkAll = $(ele).find('.agree_chkall'),
				_chkList = $(ele).find('.agree_list li:not([style*="display:none"]) input[type=checkbox]'),//23.11.23 수정
				_inpDis = _chkList.not(':disabled'),
				_count = _chkAll.find('.count');
			
			_count.text("("+ _chkList.filter(':checked').length +")");

			_chkAll.on('change', function() {
				if(_chkAll.find('input').prop('checked')) _inpDis.prop('checked', true);
				else _inpDis.prop('checked', false);
				
				if(_count) _count.text("("+_chkList.filter(':checked').length+")");
			});

			_chkList.on('change', function() {
				console.log(_inpDis.length, _chkList.filter(':checked:disabled').length)
				if(_chkList.filter(':checked').length == _inpDis.length + _chkList.filter(':checked:disabled').length) _chkAll.find('input').prop('checked', true);
				else _chkAll.find('input').prop('checked', false);

				if(_count) _count.text("("+_chkList.filter(':checked').length+")");
			})
		})
	},
	countEvt : () =>{
		let $counterWrap = $('.counter_item');
		$counterWrap.each(function(idx, ele){
			let $btnCount = $(ele).find('.btn_count'),
				$textVal = $(ele).find('.num');

			$btnCount.on('click', function(e){
				e.preventDefault();
				let $numVal = +$textVal.val()
				if($(this).hasClass('minus')){
					$textVal.val($numVal - 1);
					if($textVal.val() == 0) $(this).attr('disabled', 'disabled')
				}else if($(this).hasClass('plus')){
					$textVal.val($numVal + 1);
					if($textVal.val() > 0) $(ele).find('.btn_count.minus').removeAttr('disabled')
				}
			})
		})
	}
}

const tabEvt = () => {
	let $tabWrap = $('.j_ui_tab');
	if($tabWrap.length > 0){
		$tabWrap.each((idx, ele) => {
			let $thisTab = $(ele);

			if($thisTab.find('.tab_list').hasClass('ty2')){ $thisTab.find('.tab_list').addClass('left')}
			$thisTab.on('click', '> ul > li', function(e){
				e.preventDefault();
				let _target = $(this).find('a'),
					_targetId = _target.attr('href');

				if($(this).closest('ul').hasClass('ty2')){
					if($(this).index() === 0){
						$(this).closest('ul').addClass('left').removeClass('right');
					}else{
						$(this).closest('ul').addClass('right').removeClass('left');
					}
				}

				_target.attr('aria-selected',true).closest('li').addClass('on').siblings('li').removeClass('on').find('a').attr('aria-selected',false);
				$(_targetId).attr('aria-hidden',false).addClass('on').siblings('.tab_cont').attr('aria-hidden',true).removeClass('on')

				if($(_targetId).find('.btm_fixed').length > 0 || $(_targetId).closest('#container').find('.btm_fixed').length > 0) headEvt.init();
				
			})
		})
	}
}

const accoEvt = {
	init : ()=>{
		accoEvt.accoUiAction();
	},
	accoUiAction : () => {
		let $accoWrap = document.querySelectorAll('.j-ui-accodion');

		if($accoWrap.length > 0){
			$accoWrap.forEach(ele => {
				let $this = ele,
					$Btn = $this.querySelectorAll('.btn_toggle');

				$Btn.forEach((btnEle, idx) => {
					let $panel = btnEle.closest('.tit').nextElementSibling;

					if(btnEle.closest('.tit').classList.contains('on')){
						btnEle.setAttribute('aria-expanded', 'true');
						btnEle.querySelector('.blind').innerText = "상세내용 닫기";
						$panel.setAttribute('aria-hidden', 'false');
					}else {
						btnEle.setAttribute('aria-expanded', 'false');
						$panel.setAttribute('aria-hidden', 'true');
					}

					btnEle.addEventListener('click', ele => {
						ele.preventDefault();
						let _target = ele.target;

						if(_target.closest('.tit').classList.contains('on')){
							_target.closest('.tit').classList.remove('on');
							_target.setAttribute('aria-expanded', 'false');
							_target.querySelector('.blind').innerText = "상세내용 열기";
							$panel.setAttribute('aria-hidden', 'true');
						}else{
							_target.closest('.tit').classList.add('on');
							_target.setAttribute('aria-expanded', 'true')
							_target.querySelector('.blind').innerText = "상세내용 닫기";
							$panel.setAttribute('aria-hidden', 'false');
						}
						
						if(!$this.classList.contains('open')){
							$Btn.forEach((btnEleAll, idxAll)  => {
								if(idx !== idxAll){
									let $panel = btnEleAll.closest('.tit').nextElementSibling;
									btnEleAll.closest('.tit').classList.remove('on');
									btnEleAll.setAttribute('aria-expanded', 'false');
									btnEleAll.querySelector('.blind').innerText = "상세내용 열기";
									$panel.setAttribute('aria-hidden', 'true');
								}
							});
						}
					})
				})
			})
		}
	}
}

let $popSpeed = 150;
const popMotion = {
	init : () => {
		if($('.pop_wrap').hasClass('is_active')) popMotion.popOpen($('.pop_wrap.is_active'));
		else $('.pop_wrap').attr('aria-hidden', 'true');

		if($('.tooltip_item').length > 0) popMotion.tooltip();

		$(document).on('click','.j_pop_open', function(e){
			e.preventDefault();
			let $pop = $(this).attr('href');
			popMotion.popOpen($pop);
		})

		$(document).on('click', '.j_pop_close', function(e){
			e.preventDefault();
			let $pop = $(this).closest('.pop_wrap'),
				$id = $pop.attr('id');
				
			popMotion.popClose($pop);
			$("a[href='#" + $id + "']").focus();
		})
	},
	popOpen : tar => {
		let $tar = $(tar);
		$tar.addClass('is_visible').attr('aria-hidden', 'false');
		$tar.find('.popup').attr('tabindex', 0).focus().find('.pop_cont').attr('tabindex',0);
		setTimeout(function(){$tar.addClass('is_active')}, $popSpeed);
		$('#wrap').attr('aria-hidden','true');
		$('body').addClass('pop_open');
		if($tar.find('.btm_fixed').length > 0){
			let btnH = $tar.find('.btm_fixed').outerHeight(true);
			$tar.find('.pop_cont').css('padding-bottom',btnH + 14);
			if($tar.hasClass('toast')){
				$tar.find('.pop_cont').css('padding-bottom','');
			}
		}
		if($tar.hasClass('toast')){
			setTimeout(function(){popMotion.popClose($tar)}, 1000);
		}
	},
	popClose: tar => {
		let $tar = $(tar),
			$id = $tar.attr('id');
		$tar.removeClass('is_active').attr('aria-hidden', 'true').find('.pop_cont').scrollTop(0);
		$('.pop_wrap.is_visible .popup').attr('tabindex','0').focus();
		setTimeout(function(){$tar.removeClass('is_visible')}, $popSpeed);
		$('#wrap').attr('aria-hidden','false');
		$('body').removeClass('pop_open');
	},
	tooltip: () => {

		if($('.tooltip_item').hasClass('visible')){
			$('.tooltip_item').find('.tooltip_cont').attr({'aria-hidden':'false', 'tabindex':'0'});
		}else{
			$('.tooltip_item').find('.tooltip_cont').attr({'aria-hidden':'true', 'tabindex':'-1'});
		}
		
		$('.tooltip_item').on('click', '.btn_tooltip', function(e){
			e.preventDefault();
			let $this = $(this),
				$area = $this.closest('.tooltip_item');
			$area.addClass('visible');
			setTimeout(function(){$area.addClass('act')},150);
			$area.find('.tooltip_cont').attr({'aria-hidden':'false', 'tabindex':'0'});
		})

		$('.tooltip_item').find('.tooltip_cont').on('click', function(e){
			e.preventDefault();

			$(this).closest('.tooltip_item').removeClass('act');
			setTimeout(function(){$(this).closest('.tooltip_item').removeClass('visible')},150);
			$(this).attr({'aria-hidden':'true', 'tabindex':'-1'});
			$(this).closest('.tooltip_item').find('.btn_tooltip').focus();
		})
		
		$('.tooltip_item').on('click', '.tooltip_close', function(e){
			e.preventDefault();
			let $this = $(this),
				$area = $this.closest('.tooltip_item');
			
			$area.removeClass('act');
			setTimeout(function(){$area.removeClass('visible')},150);
			$area.find('.tooltip_cont').attr({'aria-hidden':'true', 'tabindex':'-1'});
			$area.find('.btn_tooltip').focus();
		})
	},
}

const swiperArea = {
	init : () =>{
		swiperArea.evtBnrSwiper(); //하단 배너
		//swiperArea.ticketSwiper(); //승차권 예약 티켓 swiper (개발 js로 이동 - 충돌위험으로 퍼블 js에서 반영 x : 승차권 예약 환승일 경우)
	},
	evtBnrSwiper : () => {
		if($('.event_banner').length > 0){
			$('.event_banner').each(function(swIdx){
				let $bannerSwiper = undefined;
	
				$(this).addClass('bnr-swiper-'+ swIdx);
				if ($bannerSwiper != undefined){ 
					$bannerSwiper.destroy();
					$bannerSwiper = undefined;
				}
				
				$bannerSwiper = new Swiper('.bnr-swiper-'+ swIdx +' .evtBanner-swiper',{
					slidesPerView: 1,
					loop: true,
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					a11y: {
						prevSlideMessage: '이전 슬라이드',
						nextSlideMessage: '다음 슬라이드',
						slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
					},
					pagination: {
						el: ' .swiper-pagination',
						clickable: true,
						type: 'bullets',
					},
					observer: true,
					observeParents: true,
					on:{
						init:function(){
							let totalSlides = this.slides.length;
							if(totalSlides < 2){
								$('.bnr-swiper-'+swIdx).find('.swiper_btn_wrap').hide();
								$('.bnr-swiper-'+swIdx).find('.swiper_cntrl_wrap').hide();
							}
							$('.bnr-swiper-'+swIdx+ ' .swiper-btn-prev').on('click', function() {
								$bannerSwiper.slidePrev();
							});
							$('.bnr-swiper-'+swIdx+ ' .swiper-btn-next').on('click', function() {
								$bannerSwiper.slideNext();
							});
							$('.bnr-swiper-'+swIdx).find('.swiper-slide').attr({'aria-hidden':'true','tabindex':-1})
							$('.bnr-swiper-'+swIdx).find('.swiper-slide').eq(this.activeIndex).attr({'aria-hidden':'false','tabindex':0});
							// this.pagination.el = $('.bnr-swiper-'+ swIdx).find('.swiper-pagination');
						},
						slideChange : function(){
							let currentCount = this.realIndex + 1;
	
							$('.bnr-swiper-'+ swIdx).find('.swiper-pagination span').removeAttr('title');
							$('.bnr-swiper-'+ swIdx).find('.swiper-pagination span').eq(this.realIndex).attr({'title':currentCount+'번째 배너 선택됨'});
							$('.bnr-swiper-'+swIdx).find('.swiper-slide').attr({'aria-hidden':'true','tabindex':-1})
							$('.bnr-swiper-'+swIdx).find('.swiper-slide').eq(this.activeIndex).attr({'aria-hidden':'false','tabindex':0});
						}
					}
				})
				$('.bnr-swiper-'+swIdx+ ' .swiper-btn.pause').on('click', function() {
					if($(this).hasClass('play')){
						$(this).removeClass('play').addClass('pause');
						$(this).attr('aria-label','자동 재생 일시 정지')
						$bannerSwiper.autoplay.start();
					}else{
						$(this).removeClass('pause').addClass('play');
						$(this).attr('aria-label','자동 재생 재생')
						$bannerSwiper.autoplay.stop();
					}
				});
			})
		}
	},
	ticketSwiper : () => {
		if($('.ticket_swiper').length){
			if ($(".ticket_swiper .swiper-slide").length > 1 ) {

				$('.ticket_swiper').each(function(swIdx){
					let $ticketEvt = undefined;
	
					$(this).addClass('tic-swiper-'+ swIdx);
					if ($ticketEvt != undefined){ 
						$ticketEvt.destroy();
						$ticketEvt = undefined;
					}
					
					$ticketEvt = new Swiper('.tic-swiper-'+ swIdx +'.ticket_swiper',{
						slidesPerView: 1,
						spaceBetween: 6,
						observer: true,
						observeParents: true, 
						a11y: {
							prevSlideMessage: '이전 슬라이드',
							nextSlideMessage: '다음 슬라이드',
							slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
						},
						pagination: {
							el: ' .swiper-pagination',
							clickable: true,
							type: 'bullets',
						},
						on:{
							init:function(){
								let currentCount = this.realIndex + 1;

								$('.tic-swiper-'+swIdx).find('.swiper-pagination span').eq(this.realIndex).attr({'title':currentCount+'번째 배너 선택됨'});
								$('.tic-swiper-'+swIdx).find('.swiper-slide').attr({'aria-hidden':'true','tabindex':-1})
								$('.tic-swiper-'+swIdx).find('.swiper-slide').eq(this.activeIndex).attr({'aria-hidden':'false','tabindex':0});
							},
							slideChange : function(){
								let currentCount = this.realIndex + 1;
								
								$('.tic-swiper-'+swIdx).find('.swiper-pagination span').removeAttr('title');
								$('.tic-swiper-'+swIdx).find('.swiper-pagination span').eq(this.realIndex).attr({'title':currentCount+'번째 배너 선택됨'});
								$('.tic-swiper-'+swIdx).find('.swiper-slide').attr({'aria-hidden':'true','tabindex':-1}).find('.ticket_box').removeClass('on');
								$('.tic-swiper-'+swIdx).find('.swiper-slide').eq(this.activeIndex).attr({'aria-hidden':'false','tabindex':0}).find('.ticket_box').addClass('on');
							}
						}
					})
				
				})

			} 
		}
	}
}

const evtEtc = {
    init : () => {
		setTimeout(()=>{evtEtc.xScroll(); evtEtc.ticketGift();}, 150)
		evtEtc.searchTopScroll();
	},
	xScroll : () => {//가로스크롤 해당 위치로 이동
		const $xScrollWrap = document.querySelectorAll('.j_scroll');

		if($xScrollWrap.length){
			$xScrollWrap.forEach(ele => {
				let $this = ele,
					$items = [...$this.children];
				
				$items.forEach((target, idx) => {
					target.addEventListener('click', e =>{
						let _thisTarget = e.currentTarget;
						let _q = 0;

						$items.forEach(all => {
							all.classList.remove('act');
							if(target.getElementsByTagName('input').length == 0) all.setAttribute('aria-selected', 'false');
						})
						_thisTarget.classList.add('act');
						if(target.getElementsByTagName('input').length == 0) _thisTarget.setAttribute('aria-selected', 'true');

						for(let i = 0; i< idx; i++){
							_q += $items[i].clientWidth;
						}

						$($this).animate({scrollLeft : Math.floor(Math.max(0, _q - target.clientWidth))}, 200);
						// $this.scrollIntoView({behavior:'auto'})
						// $this.scrollTo({left: Math.floor(Math.max(0, _q - target.clientWidth)), behavior : 'smooth'})
					})
				})
			})
		}
	},
	searchTopScroll : ()=>{//검색 상단 고정
		const $searchTop = document.querySelector('.search_top');

		if($searchTop){
			let $isVisible = false;
			window.addEventListener('scroll', e =>{
				e.stopPropagation();
				let _scrollY = this.scrollY;
			
				if(_scrollY >  document.body.offsetTop){
					if(!$isVisible){
						$searchTop.style.borderBottom = "1px solid #000";
						$isVisible = true;
					}
				}else{
					$searchTop.style.borderBottom = "0";
					$isVisible = false
				}
			}, false);
		}
	},
	ticketGift : () =>{//받은 선물 #23.11.09 수정
		const $ele = document.querySelectorAll('.ticket_box.gift_get');

		if($ele.length){
			$ele.forEach(e => {
				if(!e.classList.contains('on')){
					const _contInfo =  e.querySelector('.ticket_info'),
							_btnView = e.querySelector('.ticket_view');
					_contInfo.style.height = "auto";
						
					const _contH = _contInfo.clientHeight + "px";
					_contInfo.style.height = 0;
					_contInfo.style.transition = "all 1s";
					_btnView.querySelector('button.btn').onclick = () => {
						e.classList.add('on');
						setTimeout(()=> {
							_contInfo.style.opacity = "1";
							_contInfo.style.height = _contH;
						},100)
					}
				}
			})
		}
	}
}