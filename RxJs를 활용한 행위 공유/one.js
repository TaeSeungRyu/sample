import { BehaviorSubject } from 'rxjs';


//공통 관심사 클래스 추가 
class CommonSubject {
    static #subject = new BehaviorSubject(null);
    constructor(){
        
    }
    listener(arg){
        if(arg && typeof arg === 'function'){
            CommonSubject.#subject.subscribe(arg)
        } else {
            throw new Error('구독행위(함수형)를 반드시 넣어주세요.')
        }
    }

    sendEvent(arg){
        if(arg){
            CommonSubject.#subject.next({...arg})
        }
    }
}


class SubBody extends CommonSubject {
    constructor(){
        super()
        this.canIRender = true
        console.log('작업 시작합니다.')
        setInterval(() => {
            if(this.canIRender){
                console.log('동작 합니다.')
            }
        }, 500);
    }
}

class MainBody extends CommonSubject {
    constructor(){
        super()
    }
}

const type1 = new MainBody()
const type2 = new SubBody()

type1.listener((arg)=>{ })

type2.listener((arg)=>{
    if(arg && arg.render !== null && arg.render !== undefined){
        type2.canIRender = arg.render;
        console.log('MainBody에서 상태가 넘어왔습니다. SubBody는 작업을 중지합니까? ',type2.canIRender)
    }
})

console.log('MainBody에서 작업이 시작되었습니다.')
type1.sendEvent({'render': false})



setTimeout(() => {
    type1.sendEvent({'render':true}) 
}, 5000);
