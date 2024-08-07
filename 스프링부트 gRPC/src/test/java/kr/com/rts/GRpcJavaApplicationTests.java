package kr.com.rts;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;
import java.util.Iterator;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.google.common.io.ByteSink;
import com.google.common.io.FileWriteMode;
import com.google.common.io.Files;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import kr.com.rts.proto.MyProtoServiceGrpc;
import kr.com.rts.proto.RequestMessage;
import kr.com.rts.proto.ResponseMessageStyle1;
import kr.com.rts.proto.ResponseMessageStyle2;
import kr.com.rts.proto.ResponseMessageStyle3;

@SpringBootTest
class GRpcJavaApplicationTests {

	@Test
	void contextLoads() {
		String url = "127.0.0.1:10777";
		
		try {
		    ManagedChannel channel = ManagedChannelBuilder.forTarget(url)
		            .usePlaintext()
		            .build();	
		    
		    RequestMessage req = RequestMessage.newBuilder().setId("첫번째 메시지").setName("첫번째 메시지2").setPrice(1234f).build();
		    RequestMessage req2 = RequestMessage.newBuilder().setId("두번째 메시지").setName("두번째 메시지2").setPrice(554f).build();
		    
		    MyProtoServiceGrpc.MyProtoServiceBlockingStub stub = MyProtoServiceGrpc.newBlockingStub(channel);
		    
		    ResponseMessageStyle1 response1 = stub.giveMeData1(req);
		    ResponseMessageStyle2 response2 = stub.giveMeData2(req2);
		    assertThat(response1);
		    assertThat(response2);
		    
		    //파일 요청
		    
		    ByteSink byteSink = Files.asByteSink( new File("D:/savedFile.txt"), FileWriteMode.APPEND);
		    Iterator<ResponseMessageStyle3> response3 = stub.giveMeData3(req2);
		    while (response3.hasNext()) {
		          byteSink.write(response3.next().getFile().toByteArray());
		        }		    
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

}
