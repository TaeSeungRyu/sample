
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;

@Configuration
public class 웹소켓컨피그 {

	웹소켓핸들러 handler;
	
	public 웹소켓컨피그(웹소켓핸들러 handler) {
		this.handler = handler;
	}
	
	@Bean
	HandlerMapping webSocketHandlerMapping() {
	    Map<String, WebSocketHandler> map = new HashMap<>();
	    map.put("/chatting", handler);
	    SimpleUrlHandlerMapping handlerMapping = new SimpleUrlHandlerMapping();
	    handlerMapping.setOrder(1);
	    handlerMapping.setUrlMap(map);
	    return handlerMapping;
	}	
}
