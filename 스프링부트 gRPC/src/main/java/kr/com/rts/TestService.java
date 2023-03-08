package kr.com.rts;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import com.google.protobuf.ByteString;

import io.grpc.stub.StreamObserver;
import kr.com.rts.proto.*;

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

	@Override
	public void giveMeData3(RequestMessage request, StreamObserver<ResponseMessageStyle3> responseObserver) {

		File filePath = new File("D:/test.txt");

		try (FileInputStream fis = new FileInputStream(filePath); BufferedInputStream bis = new BufferedInputStream(fis)) {
			int bufferSize = 256 * 1024;// 256k
			byte[] buffer = new byte[bufferSize];
			int length;
			while ((length = bis.read(buffer, 0, bufferSize)) != -1) {
				responseObserver.onNext(ResponseMessageStyle3.newBuilder().setFile(ByteString.copyFrom(buffer, 0, length)).build());
			}
			responseObserver.onCompleted();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
