window.onload = function(){
    const $mainBgImg = document.querySelector('.main__img img');
    setTimeout(function(){
        $mainBgImg.style.display = 'block';
        canvasEvt();
    }, 3000)
    secScrollEvt();
}

var canvasEvt = function(){
    const $canvas = document.getElementById('mainBgW');
    $canvas.width = window.innerWidth;
    $canvas.height = window.innerHeight;
    let x = 0;
    let timer = 0;

    // var windowW = window.innerWidth;
    // var vwSet = windowW / 100 * 0.0520833333;
    // var squareWidth = vwSet * 460;
    // var squareHeight = vwSet * 680;
    // var squareX = $canvas.width / 2 - squareWidth / 2;
    // var squareY = $canvas.height / 2 - squareHeight / 2; //pc
    if ($canvas.getContext) {
        var ctx = $canvas.getContext('2d');
    
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
        // ctx.clearRect(squareX, squareY, squareWidth, squareHeight);
        
        
        function animate(){
            // ctx.clearRect($canvas.width / 2 , 0, x, $canvas.height);
            // ctx.clearRect($canvas.width / 2 , 0, -x, $canvas.height);
            ctx.clearRect($canvas.width / 2 , $canvas.height / 2 , x, x);
            ctx.clearRect($canvas.width / 2 , $canvas.height / 2 , -x, x);
            ctx.clearRect($canvas.width / 2 , $canvas.height / 2 , x, -x);
            ctx.clearRect($canvas.width / 2 , $canvas.height / 2 , -x, -x)
            x++;
            if(x >= $canvas.width / 2){
                clearInterval(timer);
                return;
            }
        }
        timer = setInterval(animate, 5);
        
    }
}

var secScrollEvt = function(){
    // const bgHeight = document.querySelectorAll('.bg');
    // for(var i = 0; i < bgHeight.length; i++){
    //     bgHeight[i].style.height = window.outerHeight + "px";
    // }
    gsap.utils.toArray(".sec2").forEach(section => {
        let tl = gsap.timeline({  
            scrollTrigger: {
            trigger: section, // 객체기준범위
            pin: true, // 고정
            start: "top top", // 시작점
            end: () => "+=" + window.innerHeight, // 끝점
            scrub: 0.5, // 모션바운스
            markers: true, // 개발가이드선
            },
            defaults : {duration:5},
        })
        
        tl.fromTo(section, { height:0 }, {height:'100%'});
    })

    // let $h2Left =  document.querySelectorAll(".sec1 .left h2");
    // let $title = gsap.timeline({  
    // scrollTrigger: {
    //     trigger:  $h2Left, // 객체기준범위
    //     start: "top bottom", 
    //     // end: "bottom top", 
    //     end: 'top top-='+window.innerHeight,
    //     scrub: 1, // 모션바운스
    // },
    // default : {duration:1}
    // })
    // $title.fromTo($h2Left, { x:-150 }, {x:0})

    // let $h2Right =  document.querySelectorAll(".sec1 .right h2");
    // let $title2 = gsap.timeline({  
    //     scrollTrigger: {
    //         trigger:  $h2Left, // 객체기준범위
    //         start: "top bottom", 
    //         // end: "bottom top", 
    //         end: 'top top-='+window.innerHeight,
    //         scrub: 1, // 모션바운스
    //     },
    //     default : {duration:1}
    // })
    // $title2.fromTo($h2Right, { x:150 }, {x:-150})

}