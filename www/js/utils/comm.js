//오늘 날짜 yyyy-MM-dd 형식 return
function getToday(){
	var today = new Date();
	var result = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
	return result;
}
 var userOS = navigator.userAgent;
//두 날짜 비교 
//0이면 str0 큼 1이면 str1 큼   2이면 str0 str1같음
function compareDate(str0,str1){
	var c0 = str0.split("-");
	var c1 = str1.split("-");
	var d0 = new Date(c0[0],c0[1],c0[2]);
	var d1 = new Date(c1[0],c1[1],c1[2]);
	if(d0>d1){
	   return 0;
	}else if(d0<d1){
	   return 1;
	}else if(d0==d1){
	   return 2;
	}
}

function serviceAlert(str){
	try{
	 window.plugins.toast.showLongBottom(str, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
	}catch(e){
	 alert(str);
	}
}

function setLocalStorage(key,value){
	window.localStorage.setItem(key,value);
}

function getLocalStorage(key){
	return window.localStorage.getItem(key);
}

function getymdhisx(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var time = d.getTime();
	var hour = d.getHours();
	var min = d.getMinutes();
	var sec = d.getSeconds();
	var output = d.getFullYear() + '' +
		((''+month).length<2 ? '0' : '') + month + '' +
		((''+day).length<2 ? '0' : '') + day + '' +
		((''+hour).length<2 ? '0' : '') + hour + '' +
		((''+min).length<2 ? '0' : '') + min + '' +
		((''+sec).length<2 ? '0' : '') + sec ;
	return output;
}

/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 06.
 * @What  : confirm
 * @param : 
 *        mess 알림 메시지
 *		 callback  버튼클릭후 처리 콜백함수
 *		 title  confirm창 title
 *		 btn1  버튼1 return 1
 *		 btn2  버튼2 return 2
 * 
 */
function setConfirm(mess,callback,title,btn1,btn2){
	try{
	  navigator.notification.confirm(
         mess, // message
         callback,            // callback to invoke with index of button pressed
         title,           // title
        [btn1,btn2]         // buttonLabels
      );
	}catch(e){
	 if(confirm(mess)){
	   callback;
	 }
	}
};

 function notiAlert(callback,mess,title,btnName) {
        navigator.notification.alert(
            mess,  // message
            callback,         // callback
            title,            // title
            btnName                  // buttonName
        );
}