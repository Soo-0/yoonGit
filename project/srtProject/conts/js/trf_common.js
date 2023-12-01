$(function(){
	headEvt.init();
	formEvt.init();//input
	tabEvt();//tab 
	accoEvt()//아코디언
	popMotion.init(); // 팝업
	swiperArea();//swiper
	selectUi.selInit()//셀렉트박스(사용x - 현재 팝업형태로 실행)
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
		headEvt.btmFixEvt();
    },
	btmFixEvt : () =>{
		//하단 버튼 고정이 있을때 container padding-bottom 값 지정
		$(document).ready(function() {
			let $container = $('#container'),
				$fixBtn = $('.btm_fixed');

			if($fixBtn){
				let btnH = $('.btm_fixed').outerHeight(true);
				$container.css('padding-bottom',btnH + 16);

				//탭 안에 fixed 버튼이 있는 경우
				if($container.closest('.tab_cont')){
					let $tabFixCont = $('.tab_cont');
					
					$tabFixCont.each(function(idx, ele){
						let $tabFixBtn = $(ele).find('.btm_fixed'),
							$tabFixBtnH = $tabFixBtn.outerHeight(true);
						
						$container.css('padding-bottom', $tabFixBtnH + 16);
					})
				}
			}
		})
	}
}

const formEvt = {
	init : () => {
		formEvt.inputDel();//input text 삭제
		formEvt.checkAll();//전체선택
		formEvt.countEvt();//카운트
    },
	inputDel : () =>{
		let $inputWarp = $('.input_wrap');

		$inputWarp.each(function(idx, ele){
			let $thInp = $(ele).find('input'),
				$thBtn = $thInp.siblings('.btn_del');
			if($thInp.is(':read-only') || $thInp.is(':disabled')){
				$(this).find('.btn_del').remove();
				$(this).find('input').css('padding-right', 0)
			}

			$thInp.on('focus keyup', function(){
				$(this).next('.btn_del').addClass('on').removeClass($thInp.val().length > 0 ? '':'on');
				
				if($(this).next('.btn_del').next().length > 0){
					let $items = $(this).next('.btn_del').nextAll(),
						itemsWid = '',
						totalWid = 0;
					$items.each(function(e, idx){
						itemsWid = $(idx).outerWidth();
						totalWid = totalWid + itemsWid;
					})
					$(this).next('.btn_del').css('right', totalWid + 8)
				}
			})
			$thBtn.on('click', function(e){
				e.preventDefault();
				$(this).prev().val('').focus();
				$(this).removeClass('on');
			})
		})
	},
	checkAll : () =>{
		let $agreeList = $('.agree_area')

		$agreeList.each(function(){
			let $chkAll = $(this).find('.check_all input'),
				$chkList = $(this).find('input[type=checkbox]').not($chkAll)
			
				$chkAll.on('change', function() {
				if($chkAll.prop('checked')) $chkList.prop('checked', true);
				else $chkList.prop('checked', false);
			});
			$chkList.on('change', function() {
				if($chkList.filter(':checked').length == $chkList.length) $chkAll.prop('checked', true)
				else $chkAll.prop('checked', false)
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
	let tabWrap = $('.j_ui_tab');
	if(tabWrap.length > 0){
		let tabLi = tabWrap.find('li');

		$(document).on('click', '.j_ui_tab a', function(e){
			e.preventDefault();
			let tabCont = $(this).attr('href');

			$(this).attr('aria-selected','true').closest('li').addClass('on').siblings('li').removeClass('on').find('a').attr('aria-selected','false');
			$(tabCont).addClass('on').siblings('.tab_cont').removeClass('on');
			
			if($(this).closest(tabWrap).hasClass('tab_seat')){
				$(this).closest(tabWrap).find('li').removeClass('on');
				$(this).addClass('on').closest('li').siblings('li').find('a').removeClass('on')
			}
			if($(tabCont).find('.btm_fixed').length > 0) headEvt.init();
			else $('#container').css('padding-bottom',"");

			return false;
		})
	}
}

const accoEvt = () => {
	let $accoWrap = $('.j_ui_acco'),
		$thBtn = $accoWrap.find('.j_acco_btn');

	if($accoWrap.length > 0){
		$accoWrap.each(function(){
			if($thBtn.hasClass('on')){
				$thBtn.attr('aria-expanded','true');
				$(this).find('.acco_cont').slideDown(200)
			} 
			else $thBtn.attr('aria-expanded','false');
		});
		
		$thBtn.on('click', function(e){
			e.preventDefault();
			let $thCont = $(this).closest('.acco_tit').siblings('.acco_cont');

			if(!$(this).hasClass('on')){
				$(this).addClass('on').attr('aria-expanded','true').find('span').text('상세내용 닫기');
				$thCont.slideDown(200)
			}else{
				$(this).removeClass('on').attr('aria-expanded','false').find('span').text('상세내용 열기');
				$thCont.slideUp(200)
			}
		})

		if($('.j_check_acco').length > 0){//체크박스 선택 시 아코디언 닫힘
			$('.j_check_acco').each(function(){
				let $this = $(this),
					$chkBox = $(this).find('.checkbox');

				$chkBox.on('change','input', function() {
					if($(this).prop('checked')){
						if($thBtn.hasClass('on')){
							$this.find('.acco_btn').click();
						} 
						$this.find('.acco_btn').attr('disabled', true)
					}else{
						$this.find('.acco_btn').attr('disabled', false);
						$this.find('.acco_btn').click();/* 23.05.09 추가 */
					}
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

		if($('.tooltip_area').length > 0) popMotion.tooltip();

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
		if($('.btm_fixed').length > 0){
			let btnH = $('.btm_fixed').outerHeight(true);
			console.log($tar.find('.pop_cont').css('padding-bottom',btnH + 14))
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
		$('#wrap').attr('aria-hidden','false');// $("a[href='#" + $id + "']").focus()
		$('body').removeClass('pop_open');
	},
	tooltip: () => {
		$('.tooltip_area').find('.tooltip_cont').attr({'aria-hidden':'true', 'tabindex':'-1'});
		$('.tooltip_area').on('click', '.btn_tooltip', function(e){
			e.preventDefault();
			let $this = $(this),
				$area = $this.closest('.tooltip_area');
			$area.addClass('visible');
			setTimeout(function(){$area.addClass('act')},150);
			$area.find('.tooltip_cont').attr({'aria-hidden':'false', 'tabindex':'0'});
			
			$('.tooltip_area').not($area).find('.tooltip_close').click();
		})
		
		$('.tooltip_area').on('click', '.tooltip_close', function(e){
			e.preventDefault();
			let $this = $(this),
				$area = $this.closest('.tooltip_area');
			
			$area.removeClass('act');
			setTimeout(function(){$area.removeClass('visible')},150);
			$area.find('.tooltip_cont').attr({'aria-hidden':'true', 'tabindex':'-1'});
			$area.find('.btn_tooltip').focus();
		})
	},
}

//팝업 셀렉트 박스
let selTxt;
const selectUi = {
	selInit:() => {
		if($('.j_sel_list').length > 0){
			let $openBtn;
			$('.j_sel_list').each(function(index){
				if(!($(this).find('.sel_list > li').length > 3)) $(this).addClass('ty2');
				$(this).find('.swiper').addClass("sel-swiper-" + index); 
			});

			$(document).on('click','.j_sel_open', function(e){
				e.preventDefault();
				$openBtn = $(this);
				let $pop = $(this).attr('href'),
					$selWrap = $($pop).find('.j_sel_list');
				popMotion.popOpen($pop);
				selectUi.selOpen($selWrap, $openBtn.text(), $('.j_sel_open').index(this));
			});

			$(document).on('click', '.j_sel_close', function(e){
				e.preventDefault();
				let $pop = $(this).closest('.pop_wrap');
				popMotion.popClose($pop);
				$openBtn.focus();
				if(!$(this).hasClass('btn_close')) $openBtn.text(selTxt).focus();
			})
		}
	},
	selOpen : (tar, selText, selIndex) =>{
		let $this = $(tar);
		let $swiperWrap = undefined;
		
		if ($swiperWrap != undefined){ //swiper 초기화
			$swiperWrap.destroy();
			$swiperWrap = undefined;
		}

		$swiperWrap = new Swiper('.sel-swiper-' + selIndex ,{
			direction: "vertical",
			slidesPerView: "auto",
			//slideToClickedSlide : true,// 해당 슬라이드 클릭시 슬라이드 위치로 이동
			centeredSlides: true,
			mousewheel: true,
			// keyboard: {
			// 	enabled: true,
			// 	onlyInViewport: false,
			// },
			on:{
				init : function(){
					$('.sel-swiper-' + selIndex).find('li').eq(this.activeIndex).find('a').attr('title','선택됨');
					setTimeout(() => {
						selTxt = $(this.slides).eq(this.activeIndex).find('a').text()
					}, 100);
				},
				slideChange: function(){
					$('.sel-swiper-' + selIndex).find('li a').removeAttr('title');
					$('.sel-swiper-' + selIndex).find('li').eq(this.activeIndex).find('a').attr('title','선택됨');
					selTxt = $(this.slides).eq(this.activeIndex).find('a').text()
				}
			}
		})

		// $swiperWrap.on("keyPress", (swiper, keyCode) => {
		// 	if(keyCode) return;
		// 	if(keyCode === 13){
		// 		console.log('test')
		// 		// $(swiper.el).closest('.pop_cont').siblings('.pop_btn').find('.j_sel_close').focus()
		// 		return false;
		// 	}
		// });

		$this.find('.swiper-slide').each(function(idx, ele){
			if($(ele).find('a').text() === selText) $swiperWrap.slideTo(idx, 100)
		})
	}
}

const swiperArea = ()=>{
	if($('.event_banner').length > 0){
		$('.event_banner').each(function(swIdx){
			let $this = $(this).find('.banner_mainvisual'),
				$bannerSwiper = undefined;

			$this.addClass('bnr-swiper-'+ swIdx);
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
			$('.bnr-swiper-'+swIdx+ ' .swiper-btn-play').on('click', function() {
				$(this).hide();
				$(this).siblings('.swiper-btn-pause').show();
				$bannerSwiper.autoplay.start();
				return false;
			});
			$('.bnr-swiper-'+swIdx+ ' .swiper-btn-pause').on('click', function() {
				$(this).hide();
				$(this).siblings('.swiper-btn-play').show();
				$bannerSwiper.autoplay.stop();
				return false;
			});
		})
	}
}

const evtEtc = {
    init : () => {
		evtEtc.xScroll();
	},
	xScroll : () => {
		if($('.j_scroll').length > 0){
			$('.j_scroll').each(function(){
				let $this = $(this);

				if($this.hasClass('inpchk_list')){
					let $list = $(this),
						$chkItem = $list.find('label')
						$chkInp = $chkItem.find('input');

					$chkInp.on('change', function(){
						let $listWid = $list.width(),
							$itemWid = $chkItem.outerWidth(true),
							$idx = $(this).closest('label').index();
						let q = 0;

						for(let i = 0; i< $idx; i++){
							q += $($chkItem[i]).outerWidth(true)
						}
						$list.stop().animate({scrollLeft:Math.max(0, q - ($listWid - $itemWid)/2)}, 300);
					})
				}
			})
		}
	}
}