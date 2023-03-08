package kr.com.rts;

import java.io.IOException;

import io.grpc.Server;
import io.grpc.ServerBuilder;


public class TestGrpcServer {
	
	private Server server;

	public void runServer() {
		int port = 10777;
        try {
			server = ServerBuilder.forPort(port)
			        .addService(new TestService())
			        //.addService()  이런식으로 n개의 서비스를 등록..
			        .build()
			        .start();
			server.awaitTermination();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        
        Runtime.getRuntime().addShutdownHook(new Thread(()->{
        	try {
				if(server != null) {
					server.shutdownNow();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
        }));
	}
}
