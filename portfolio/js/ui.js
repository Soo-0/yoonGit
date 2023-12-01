let $popWrap;
let cursor;
let winW, winH;

window.onload = () => {
    winW = window.innerWidth, winH = window.innerHeight;
    $popWrap = document.querySelector('.pop_wrap');
    
    // loadingEvt();
    mouseEvt.init();
    popup.init();
    etc.init();
}

let loadingEvt = (e) => {
    let $motionDiv = document.getElementById('textMotion'),
        $text = $motionDiv.querySelectorAll('p'),
        $settings = {
            expandDistanceFirst: 45,
            expandDistanceLast: 55,
            expandDistance : 50,
            expandEasing: "ease"
        };

    $text[0].animate([
        {top : $settings.expandDistance + "%"},
        {top: $settings.expandDistanceFirst + "%"},
        {top : $settings.expandDistance + "%"},
        {top : $settings.expandDistance + "%"}
    ],{
        duration: 2000,
        easing : $settings.expandEasing,
        fill : "both"
    })

    $text[$text.length-1].animate([
        {top : $settings.expandDistance + "%"},
        {top: $settings.expandDistanceLast + "%"},
        {top : $settings.expandDistance + "%"},
        {top : $settings.expandDistance + "%"}
    ],{
        duration: 2000,
        easing : $settings.expandEasing,
        fill : "both"
    })

    document.body.style.overflow = "hidden";
    const timeout = setTimeout(() => {
        $motionDiv.style.opacity = 0;
        document.body.style.overflow = "auto";
        setTimeout(()=> $motionDiv.style.display = "none", 1000)
        clearTimeout(timeout)
    }, 1200);
}

let mouseEvt = {
    init : () => {
        cursor = document.getElementById("cursorEvt");
        mouseEvt.contactEvt();
        if(!mobileChk) mouseEvt.cursorMove();
        else cursor.style.display = "none";
    },
    cursorMove : () => {
        window.addEventListener("mousemove", e => {mouseMove(e)});
    
        // for (let i = 0; i < $workImg.length; i++) {
        //     $workImg[i].addEventListener("mouseover", () => {
        //         cursor.style.transform = "translate(-50%,-50%) scale(1.7)";
        //         cursor.innerHTML = "Go Site";
        //     });
        //     $workImg[i].addEventListener("mouseleave", () => {
        //         cursor.style.transform = "translate(-50%,-50%) scale(.22)"
        //         cursor.innerHTML = "";
        //     });
        // }
        
        function mouseMove(evt){
            mouseX = evt.clientX;
            mouseY = evt.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    },
    contactEvt : () => {
        let item;
        let opacity = 0;
        // let $contactWrap = document.querySelector(".contact_area"),
        //     $contactBtn = $contactWrap.querySelector('.contact_area_tit'),
        //     $contactCont = $contactWrap.querySelector('.contact_area_cont');

        // $contactBtn.addEventListener('mouseover', e => {
        //     e.preventDefault();
        //     let interval = setInterval( () => {
        //         item = e.target;
        //         opacity = opacity + 0.1;
        //         item.nextElementSibling.style.display="block";
        //         item.nextElementSibling.style.opacity=opacity.toFixed(1);
        //         if(opacity.toFixed(1) == 1) clearInterval(interval);
        //     },50);
        // });

        // $contactCont.addEventListener('mouseleave', e => {
        //     let interval = setInterval( () => {
        //         item = e.target;
        //         opacity = opacity - 0.1;
        //         item.style.opacity = opacity.toFixed(1);
        //         if(opacity.toFixed(1) == 0){
        //             item.style.display="none";
        //             clearInterval(interval);
        //             opacity = 0;
        //         }
        //     },50);
            
        // })
    }
}

let popup = {
    init : () => {
        let popWrap, popOpenBtn, btnClose;

            popWrap = document.querySelectorAll('.pop_wrap');
            popOpenBtn = document.querySelectorAll('.j_pop_open');//팝업 오픈 버튼
            btnClose = document.querySelectorAll('.pop_close');//팝업 닫기 버튼

            popWrap.forEach(ele => {
                let popItem = ele.querySelector('.popup'),
                    popCont = ele.querySelector('.pop_cont');

                if(ele.classList.contains('is_active')){
                    popCont.setAttribute('tabindex', '0');
                    popItem.setAttribute('tabindex', '0');
                    popItem.focus();

                    document.body.classList.add('pop_open');
                    document.getElementById('wrap').setAttribute('aria-hidden','true');
                    document.getElementById('skipNavi').setAttribute('aria-hidden','true');
                }
            })

            popOpenBtn.forEach(ele => {
                ele.addEventListener('click', e =>{
                    e.preventDefault();
                    let $this = e.target,
                        $thisId = $this.dataset.popId,
                        $popId =  document.getElementById($thisId);

                    popup.popOpen($popId);
                    document.body.classList.add('pop_open');
                    document.getElementById('wrap').setAttribute('aria-hidden','true');
                    document.getElementById('skipNavi').setAttribute('aria-hidden','true');
                })
            })

            btnClose.forEach(ele => {
                ele.addEventListener('click', e => {
                    e.preventDefault();
                    let $this = e.target,
                        $thisId = $this.closest('.pop_wrap');
                        $btnId = $thisId.getAttribute('id')

                    popOpenBtn.forEach( ele => {
                        if(ele.dataset.popId === $btnId){
                            ele.focus();
                        }
                    })

                    popup.popClose($thisId);
                    document.body.classList.remove('pop_open');
                    document.getElementById('wrap').removeAttribute('aria-hidden');
                    document.getElementById('skipNavi').removeAttribute('aria-hidden');    
                })
            });

    },
    popOpen  : ele => {
        ele.classList.add('is_active');
        ele.querySelector('.popup').setAttribute('tabindex', 0);
        ele.querySelector('.pop_cont').setAttribute('tabindex', 0);
        ele.querySelector('.pop_cont').scrollTo(0,0);
        ele.querySelector('.popup').focus();
        // setTimeout(function(){ $tar.addClass('is_active') },100);
    },
    popClose : ele => {
        ele.classList.remove('is_active');
        ele.querySelector('.popup').removeAttribute('tabindex');
        ele.querySelector('.pop_cont').removeAttribute('tabindex');
    }
}

let etc = {
    init : () => {
        etc.mainCircle();
    },
    mainCircle : () => {
        console.log('test')
        let $main = document.querySelector('.main');

        if(winW < winH) {
            $main.style.setProperty('--circle-w', Math.floor(winW) + "px");
            $main.style.setProperty('--circle-h', (winW - 20) +  "px");
        }else{
            $main.style.setProperty('--circle-w', Math.floor(winW/2) + "px");
            $main.style.setProperty('--circle-h', Math.floor(winH/1.2)+  "px");
        }
        
        window.addEventListener('resize', () => {
            winW = window.innerWidth, winH = window.innerHeight;

            if(winW < winH) {
                $main.style.setProperty('--circle-w', Math.floor(winW) + "px");
                $main.style.setProperty('--circle-h', (winW - 20) +  "px");
            }else{
                $main.style.setProperty('--circle-w', Math.floor(winW/2) + "px");
                $main.style.setProperty('--circle-h', Math.floor(winH/1.2)+  "px");
            }
        })
		
    }
}

function scrapAddress(email){
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = email;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert('소스가 저장되었습니다. 붙여넣기 하시면 됩니다.');
}

function mobileChk() {
    var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            return true;
        }
    }
    return false;
}