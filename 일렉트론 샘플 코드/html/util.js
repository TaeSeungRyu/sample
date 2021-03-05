//단순 날짜형식 함수
function yymmddhhmmss(){
    function pad2(n) { return n < 10 ? '0' + n : n }
    var date = new Date();
    var yymm = date.getFullYear().toString() + '-' + pad2(date.getMonth() + 1) + '-' + pad2( date.getDate())+ ' ' + pad2( date.getHours() ) +':' + pad2( date.getMinutes() ) +':' + pad2( date.getSeconds() ) ;
    return yymm;    
}

//10줄 이상 문자를 줄이는 함수
function smalling(arg){
    if(arg && arg.length > 10){
        return $.trim(arg).substring(0,10) + '..';
    } else if(arg){
        return $.trim(arg);
    }
    return '';
}