
import java.time.Duration;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;

@Component
public class 웹소켓핸들러 implements WebSocketHandler {
	
	Sinks.Many<WebSocketMessage> 공장 = Sinks.many().multicast().directAllOrNothing();  //발행자
	Flux<WebSocketMessage> 배달차량 = 공장.asFlux();  //구독을 위한 객체
	Sinks.EmitFailureHandler 실패할때부를보험사 = (signalType, emitResult) -> emitResult.equals(Sinks.EmitResult.FAIL_NON_SERIALIZED);
	
	
	public 웹소켓핸들러() {

	}

	@Override
	public Mono<Void> handle(WebSocketSession 웹소켓에접속한세션아이디) {
		
		System.out.println("connection start : " + 웹소켓에접속한세션아이디);

			
		웹소켓에접속한세션아이디.receive() //메시지를 수신하는 행동의 정의를 시작 합니다.
			.map(arg-> arg.getPayloadAsText())
			.concatMap( arg-> {  //조건을 통해 메시지를 처리합니다.
				 //아래 코드처럼 조건을 줄 수 있습니다.
				System.out.println("message in : " + arg);
				//if(arg.equals("DB에 조회하고 없으면 NULL을넣어서 메시지를 못 받게 하는..조건같은 프로세스")){
				//	return Mono.justOrEmpty(null);  //또는 웹소켓에접속한세션아이디.close() 통해 강제종료
				//}
				return Mono.justOrEmpty(웹소켓에접속한세션아이디.textMessage(arg));
			})
			.doOnError(arg-> { //오류에 대한 정의
				System.out.println("connection error : " + arg.getMessage());
			})
			.doFinally(arg->{ //커넥션이 끊긴 경우에 대한 정의
				System.out.println("connection end : " + 웹소켓에접속한세션아이디.getId());
			})
			.subscribe( wsmsg->{ //서버가 사용자에게 메시지를 받으면 할 행동에 대한 정의
				if(wsmsg != null)
					공장.emitNext(wsmsg, 실패할때부를보험사);
			});

		return 웹소켓에접속한세션아이디.send(  //메시지를 전달하는 행동에 대한 정의를 시작 합니다.
			Mono.delay(Duration.ofMillis(10))
	            .thenMany(   //메시지를 전달하는데..
	            	배달차량.filter( a-> a != null).map(it ->    //배달차량의 도움을 받아 메시지를 가져와
	            			웹소켓에접속한세션아이디.textMessage(it.getPayloadAsText()  //웹소켓이 사용하는 메시지로 컨버팅 합니다
	            		)
	            	)
	            )
		);
	}
    
}
