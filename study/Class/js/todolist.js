window.onload = () => {
    tabItem();//tab
    calendarInit();//calendar

    //select_box
    let $selectBox = document.querySelectorAll(".sel_wrap");
    if ($selectBox !== null) selBox($selectBox) 
    
}

//calendar

const calendarInit = () => {
    let idx, day = 0, cnt = 1;
    let calendarWrap = document.querySelector('.days_swiper .swiper-wrapper'),
        calendarTodYear = document.querySelector('.calendar_month .year'),
        calendarTodMonth = document.querySelector('.calendar_month .month');
    let date = new Date(),
        currentYear = date.getFullYear(),//현재 년도
        currentMonth = date.getMonth(),//현재 월
        calendarToday = date.getDate(),
        first = new Date(currentYear, currentMonth,1),
        firstDay = new Date(currentYear, currentMonth,1).getDay(),//1일의 요일
        lastDate = new Date(currentYear, currentMonth + 1, 0).getDate(),// 이달 마지막날
        dayList = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'],
        monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if(currentYear % 4 === 0){
        lastDay[1] = 29;
    }else{
        lastDay[1] = 28;
    }
    for(let i = 0; i < 5; i++){
        let $ul = document.createElement('ul');
        
        $ul.className = "swiper-slide days";
        for(let j = 0; j < 7; j++){//요일일수
            let $li = document.createElement('li'),
                $a = document.createElement('a');
                $span = document.createElement('span');

            if(cnt <= lastDay[first.getMonth()]){
                $ul.appendChild($li); $li.appendChild($a);
                $a.setAttribute("href", "#"); $a.setAttribute("role", "button");
                $a.innerText = cnt;
                $a.appendChild($span);
                if(cnt == calendarToday){
                    $li.classList.add('on')
                }

                // if(firstDay !== 0){
                //     // day = firstDay;
                //     // $span.innerText = dayList[day];
                //     // day = day + 1;

                // }else{$span.innerText = dayList[j];}
            }
            
            cnt++;
        }
        calendarWrap.appendChild($ul);
        // dayList.forEach(function(val, idx){
        //     console.log(idx, firstDay);
            
        // })
    }
    
    let $daysUl = calendarWrap.querySelectorAll('ul'),
        $daysLi = calendarWrap.querySelectorAll('li'),
        $ulArr = Array.prototype.slice.call($daysUl);

    for(let h = 0; h < $daysLi.length; h++){
        if($daysLi[h].className == "on"){
            idx = $daysLi[h].parentNode;
        }
    }

    let test = calendarWrap.querySelectorAll('span');
    test.forEach(function(val){
        if(firstDay !== 0) {
            console.log(val)
            day = firstDay;
            console.log(day++)
            val.innerText = dayList[day++];
        }
    })

    // swiper.slideTo($ulArr.indexOf(idx));
    // console.log($daysLi[0].querySelector('span').innerText = dayList[firstDay])
    calendarTodYear.innerText = currentYear;
    calendarTodMonth.innerText = monthList[currentMonth]  + ",";
}

//tab
const tabItem = () => {
    //tab
    let $tab = document.querySelectorAll(".ui-tabmenu");
    if ($tab !== null) uiTab($tab) 

    function uiTab(wrap){
        wrap.forEach(tabArea => {
            let $tabList = tabArea.children[0].querySelectorAll('li');
        
            for(let j = 0; j < $tabList.length; j++){
                let $li = $tabList[j];
                
                $li.addEventListener("click", (e) => {
                    e.preventDefault();
                    let $target = $li.querySelector('a').getAttribute('href');
                    let $tabCont = siblings($li.parentElement);
                    
                    for(let i = 0; i < $tabList.length; i++){//li
                        $tabList[i].classList.remove('on');
                        $tabList[i].querySelector('a').setAttribute("aria-selected", "false");
                    }
    
                    for(let h = 0; h < $tabList.length; h++){//cont
                        $tabCont[h].classList.remove('on');
    
                        if($tabCont[h].getAttribute('id') === $target){
                            $tabCont[h].classList.add('on');
                        }
                    }
                    $li.classList.add('on');
                    $li.querySelector('a').setAttribute("aria-selected", "true");
                })
            }
        });
    }
}   

//selectBox
function selBox(wrap){
    
}

//인접요소 찾기 함수
function siblings(t) {
    let children = t.parentElement.children;
    let tempArr = [];

    for (let i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
    }

    return tempArr.filter(function(e){
        return e != t;
    });
}

// 부모요소 찾는 함수
// function findParent(el, className){
//     let check = el.parentNode.classList.contains(className);
    
//     if(check === true){
//         return el.parentNode;
//     }else{
//         return findParent(el.parentNode, className);
//     }
// }   

// // 자식요소 찾기 함수 
// function findChild(el, className){
//     let check2 = el.childNodes.classList.contains(className);
    
//     if(check2 === true){
//         return el.childNodes;
//     }else{
//         return findChild(el.childNodes, className);
//     }
// }   