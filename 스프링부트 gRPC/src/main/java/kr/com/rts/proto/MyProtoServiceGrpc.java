package kr.com.rts.proto;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.53.0)",
    comments = "Source: test.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class MyProtoServiceGrpc {

  private MyProtoServiceGrpc() {}

  public static final String SERVICE_NAME = "protocc.MyProtoService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage,
      kr.com.rts.proto.ResponseMessageStyle1> getGiveMeData1Method;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "giveMeData1",
      requestType = kr.com.rts.proto.RequestMessage.class,
      responseType = kr.com.rts.proto.ResponseMessageStyle1.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage,
      kr.com.rts.proto.ResponseMessageStyle1> getGiveMeData1Method() {
    io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage, kr.com.rts.proto.ResponseMessageStyle1> getGiveMeData1Method;
    if ((getGiveMeData1Method = MyProtoServiceGrpc.getGiveMeData1Method) == null) {
      synchronized (MyProtoServiceGrpc.class) {
        if ((getGiveMeData1Method = MyProtoServiceGrpc.getGiveMeData1Method) == null) {
          MyProtoServiceGrpc.getGiveMeData1Method = getGiveMeData1Method =
              io.grpc.MethodDescriptor.<kr.com.rts.proto.RequestMessage, kr.com.rts.proto.ResponseMessageStyle1>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "giveMeData1"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  kr.com.rts.proto.RequestMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  kr.com.rts.proto.ResponseMessageStyle1.getDefaultInstance()))
              .setSchemaDescriptor(new MyProtoServiceMethodDescriptorSupplier("giveMeData1"))
              .build();
        }
      }
    }
    return getGiveMeData1Method;
  }

  private static volatile io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage,
      kr.com.rts.proto.ResponseMessageStyle2> getGiveMeData2Method;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "giveMeData2",
      requestType = kr.com.rts.proto.RequestMessage.class,
      responseType = kr.com.rts.proto.ResponseMessageStyle2.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage,
      kr.com.rts.proto.ResponseMessageStyle2> getGiveMeData2Method() {
    io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage, kr.com.rts.proto.ResponseMessageStyle2> getGiveMeData2Method;
    if ((getGiveMeData2Method = MyProtoServiceGrpc.getGiveMeData2Method) == null) {
      synchronized (MyProtoServiceGrpc.class) {
        if ((getGiveMeData2Method = MyProtoServiceGrpc.getGiveMeData2Method) == null) {
          MyProtoServiceGrpc.getGiveMeData2Method = getGiveMeData2Method =
              io.grpc.MethodDescriptor.<kr.com.rts.proto.RequestMessage, kr.com.rts.proto.ResponseMessageStyle2>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "giveMeData2"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  kr.com.rts.proto.RequestMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  kr.com.rts.proto.ResponseMessageStyle2.getDefaultInstance()))
              .setSchemaDescriptor(new MyProtoServiceMethodDescriptorSupplier("giveMeData2"))
              .build();
        }
      }
    }
    return getGiveMeData2Method;
  }

  private static volatile io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage,
      kr.com.rts.proto.ResponseMessageStyle3> getGiveMeData3Method;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "giveMeData3",
      requestType = kr.com.rts.proto.RequestMessage.class,
      responseType = kr.com.rts.proto.ResponseMessageStyle3.class,
      methodType = io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
  public static io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage,
      kr.com.rts.proto.ResponseMessageStyle3> getGiveMeData3Method() {
    io.grpc.MethodDescriptor<kr.com.rts.proto.RequestMessage, kr.com.rts.proto.ResponseMessageStyle3> getGiveMeData3Method;
    if ((getGiveMeData3Method = MyProtoServiceGrpc.getGiveMeData3Method) == null) {
      synchronized (MyProtoServiceGrpc.class) {
        if ((getGiveMeData3Method = MyProtoServiceGrpc.getGiveMeData3Method) == null) {
          MyProtoServiceGrpc.getGiveMeData3Method = getGiveMeData3Method =
              io.grpc.MethodDescriptor.<kr.com.rts.proto.RequestMessage, kr.com.rts.proto.ResponseMessageStyle3>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "giveMeData3"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  kr.com.rts.proto.RequestMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  kr.com.rts.proto.ResponseMessageStyle3.getDefaultInstance()))
              .setSchemaDescriptor(new MyProtoServiceMethodDescriptorSupplier("giveMeData3"))
              .build();
        }
      }
    }
    return getGiveMeData3Method;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static MyProtoServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<MyProtoServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<MyProtoServiceStub>() {
        @java.lang.Override
        public MyProtoServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new MyProtoServiceStub(channel, callOptions);
        }
      };
    return MyProtoServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static MyProtoServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<MyProtoServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<MyProtoServiceBlockingStub>() {
        @java.lang.Override
        public MyProtoServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new MyProtoServiceBlockingStub(channel, callOptions);
        }
      };
    return MyProtoServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static MyProtoServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<MyProtoServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<MyProtoServiceFutureStub>() {
        @java.lang.Override
        public MyProtoServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new MyProtoServiceFutureStub(channel, callOptions);
        }
      };
    return MyProtoServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class MyProtoServiceImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     *송신 및 수신용 메소드1
     * </pre>
     */
    public void giveMeData1(kr.com.rts.proto.RequestMessage request,
        io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle1> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGiveMeData1Method(), responseObserver);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public void giveMeData2(kr.com.rts.proto.RequestMessage request,
        io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle2> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGiveMeData2Method(), responseObserver);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public void giveMeData3(kr.com.rts.proto.RequestMessage request,
        io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle3> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGiveMeData3Method(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getGiveMeData1Method(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                kr.com.rts.proto.RequestMessage,
                kr.com.rts.proto.ResponseMessageStyle1>(
                  this, METHODID_GIVE_ME_DATA1)))
          .addMethod(
            getGiveMeData2Method(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                kr.com.rts.proto.RequestMessage,
                kr.com.rts.proto.ResponseMessageStyle2>(
                  this, METHODID_GIVE_ME_DATA2)))
          .addMethod(
            getGiveMeData3Method(),
            io.grpc.stub.ServerCalls.asyncServerStreamingCall(
              new MethodHandlers<
                kr.com.rts.proto.RequestMessage,
                kr.com.rts.proto.ResponseMessageStyle3>(
                  this, METHODID_GIVE_ME_DATA3)))
          .build();
    }
  }

  /**
   */
  public static final class MyProtoServiceStub extends io.grpc.stub.AbstractAsyncStub<MyProtoServiceStub> {
    private MyProtoServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected MyProtoServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new MyProtoServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드1
     * </pre>
     */
    public void giveMeData1(kr.com.rts.proto.RequestMessage request,
        io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle1> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGiveMeData1Method(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public void giveMeData2(kr.com.rts.proto.RequestMessage request,
        io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle2> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGiveMeData2Method(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public void giveMeData3(kr.com.rts.proto.RequestMessage request,
        io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle3> responseObserver) {
      io.grpc.stub.ClientCalls.asyncServerStreamingCall(
          getChannel().newCall(getGiveMeData3Method(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class MyProtoServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<MyProtoServiceBlockingStub> {
    private MyProtoServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected MyProtoServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new MyProtoServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드1
     * </pre>
     */
    public kr.com.rts.proto.ResponseMessageStyle1 giveMeData1(kr.com.rts.proto.RequestMessage request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGiveMeData1Method(), getCallOptions(), request);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public kr.com.rts.proto.ResponseMessageStyle2 giveMeData2(kr.com.rts.proto.RequestMessage request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGiveMeData2Method(), getCallOptions(), request);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public java.util.Iterator<kr.com.rts.proto.ResponseMessageStyle3> giveMeData3(
        kr.com.rts.proto.RequestMessage request) {
      return io.grpc.stub.ClientCalls.blockingServerStreamingCall(
          getChannel(), getGiveMeData3Method(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class MyProtoServiceFutureStub extends io.grpc.stub.AbstractFutureStub<MyProtoServiceFutureStub> {
    private MyProtoServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected MyProtoServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new MyProtoServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드1
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<kr.com.rts.proto.ResponseMessageStyle1> giveMeData1(
        kr.com.rts.proto.RequestMessage request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGiveMeData1Method(), getCallOptions()), request);
    }

    /**
     * <pre>
     *송신 및 수신용 메소드2
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<kr.com.rts.proto.ResponseMessageStyle2> giveMeData2(
        kr.com.rts.proto.RequestMessage request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGiveMeData2Method(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GIVE_ME_DATA1 = 0;
  private static final int METHODID_GIVE_ME_DATA2 = 1;
  private static final int METHODID_GIVE_ME_DATA3 = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final MyProtoServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(MyProtoServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_GIVE_ME_DATA1:
          serviceImpl.giveMeData1((kr.com.rts.proto.RequestMessage) request,
              (io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle1>) responseObserver);
          break;
        case METHODID_GIVE_ME_DATA2:
          serviceImpl.giveMeData2((kr.com.rts.proto.RequestMessage) request,
              (io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle2>) responseObserver);
          break;
        case METHODID_GIVE_ME_DATA3:
          serviceImpl.giveMeData3((kr.com.rts.proto.RequestMessage) request,
              (io.grpc.stub.StreamObserver<kr.com.rts.proto.ResponseMessageStyle3>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class MyProtoServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    MyProtoServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return kr.com.rts.proto.HelloPrt.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("MyProtoService");
    }
  }

  private static final class MyProtoServiceFileDescriptorSupplier
      extends MyProtoServiceBaseDescriptorSupplier {
    MyProtoServiceFileDescriptorSupplier() {}
  }

  private static final class MyProtoServiceMethodDescriptorSupplier
      extends MyProtoServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    MyProtoServiceMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (MyProtoServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new MyProtoServiceFileDescriptorSupplier())
              .addMethod(getGiveMeData1Method())
              .addMethod(getGiveMeData2Method())
              .addMethod(getGiveMeData3Method())
              .build();
        }
      }
    }
    return result;
  }
}
