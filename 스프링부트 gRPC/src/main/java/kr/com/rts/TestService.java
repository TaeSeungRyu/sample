package kr.com.rts;

import io.grpc.stub.StreamObserver;
import kr.com.rts.proto.*;
import kr.com.rts.proto.RequestMessage;
import kr.com.rts.proto.ResponseMessageStyle1;
import kr.com.rts.proto.ResponseMessageStyle2;

public class TestService extends MyProtoServiceGrpc.MyProtoServiceImplBase {

	@Override
	public void giveMeData1(RequestMessage request, StreamObserver<ResponseMessageStyle1> observer) {
		
		System.out.println(request.getId());
		System.out.println(request.getName());
		System.out.println(request.getPrice());
		

		ResponseMessageStyle1 res = ResponseMessageStyle1.newBuilder().setStatus("good").setResult("ok").build();
		observer.onNext(res);
		observer.onCompleted();
	}

	@Override
	public void giveMeData2(RequestMessage request, StreamObserver<ResponseMessageStyle2> observer) {
		
		System.out.println(request.getId());
		System.out.println(request.getName());
		System.out.println(request.getPrice());		
		
		ResponseMessageStyle2 res = ResponseMessageStyle2.newBuilder().setStatus("good").setResult("ok")
				.setStatusCode(200f).setYourRequest(request).build();
		observer.onNext(res);
		observer.onCompleted();
	}

}
