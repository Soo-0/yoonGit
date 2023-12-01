window.onload = function(){
  const bgHeight = document.querySelectorAll('.bg');
  for(var i = 0; i < bgHeight.length; i++){
    bgHeight[i].style.height = window.outerHeight + "px";
  }
  gsap.utils.toArray(".sec1").forEach(section => {
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
    let $bg =  section.querySelectorAll(".bg");
    tl.fromTo($bg, { width:0 }, {width:'100%'});
  })

  let $h2Left =  document.querySelectorAll(".sec1 .left h2");
  let $title = gsap.timeline({  
    scrollTrigger: {
      trigger:  $h2Left, // 객체기준범위
      start: "top bottom", 
      // end: "bottom top", 
      end: 'top top-='+window.innerHeight,
      scrub: 1, // 모션바운스
    },
    default : {duration:1}
  })
  $title.fromTo($h2Left, { x:-150 }, {x:0})

  let $h2Right =  document.querySelectorAll(".sec1 .right h2");
  let $title2 = gsap.timeline({  
    scrollTrigger: {
      trigger:  $h2Left, // 객체기준범위
      start: "top bottom", 
      // end: "bottom top", 
      end: 'top top-='+window.innerHeight,
      scrub: 1, // 모션바운스
    },
    default : {duration:1}
  })
  $title2.fromTo($h2Right, { x:150 }, {x:-150})


  // gsap.to(".filled-text, .outline-text", {
  //   scrollTrigger:{
  //     trigger: ".filled-text, .outline-text", 
  //     start: "top bottom", 
  //     end: "bottom top", 
  //     scrub: 1
  //   },
  // })

  // 1 type
  // // // Section2 - scroll motion
  // let sec = document.querySelector('.sec1');
  // let tl = gsap.timeline({  
  //   scrollTrigger: {
  //     trigger: ".sec1", // 객체기준범위
  //     pin: true, // 고정
  //     start: "top top", // 시작점
  //     end: () => "+=" + sec.offsetHeight, // 끝점
  //     scrub: 1, // 모션바운스
  //     markers: true, // 개발가이드선
  //     // onLeave: function(){
  //     //   console.log('end');
  //     // }
  //   },
  //   default : {duration:1}
  // })
  //   let $bg =  sec.querySelectorAll(".bg");
  //   let $h2 =  sec.querySelectorAll(".sec1 h2");
  //   tl.addLabel("start")
  //     .fromTo($h2[0], { opacity:0, x:-100 }, {opacity:1, x:100})
  //     .fromTo($bg, { width:0 }, {width:'100%'}, 0);
  // // tl.addLabel("start")
  // //   .from(".sec1 img", {scale: 0.3, rotation:45, autoAlpha: 0})
  // //   .addLabel("color")
  // //   .from(".sec1", {backgroundColor: "#28a92b"})
  // //   .addLabel("spin")
  // //   .to(".sec1", {rotation: 360})
  // //   .addLabel("end");


  // 2 type
  // const bgHeight = document.querySelectorAll('.bg');
  // for(var i = 0; i < bgHeight.length; i++){
  //   bgHeight[i].style.height = window.outerHeight + "px";
  // }

  // gsap.utils.toArray(".sec1").forEach(section => {
  //   let tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
  //         end: () => "+=" + section.offsetHeight, 
  //         // end: "bottom bottom",
  //         scrub: true,
  //         pin: true,
  //         // anticipatePin: 1,
  //         markers: true, // 개발가이드선
  //         // overwrite: true,
  //       },
  //       defaults: {ease: "none"}
  //     });
  // //   // animate the container one way...
  //   let $bg =  section.querySelectorAll(".bg");
  //   let $h2 =  section.querySelectorAll(".sec1 h2");
  //   tl.fromTo($h2[0], { opacity:0, x:-100 }, {opacity:1, x:100})
  //     .fromTo($bg, { width:0 }, {width:'100%'});
  // //     // ...and the image the opposite way (at the same time)
  //     // ti.fromTo(section.querySelector(".img img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
  // });

  
}