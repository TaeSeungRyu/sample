package kr.com.rts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GRpcJavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GRpcJavaApplication.class, args);
		
		TestGrpcServer server = new TestGrpcServer();
		server.runServer();
	}

}
