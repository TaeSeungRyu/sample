// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: test.proto

package kr.com.rts.proto;

public interface ResponseMessageStyle2OrBuilder extends
    // @@protoc_insertion_point(interface_extends:protocc.ResponseMessageStyle2)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string result = 1;</code>
   * @return The result.
   */
  java.lang.String getResult();
  /**
   * <code>string result = 1;</code>
   * @return The bytes for result.
   */
  com.google.protobuf.ByteString
      getResultBytes();

  /**
   * <code>string status = 2;</code>
   * @return The status.
   */
  java.lang.String getStatus();
  /**
   * <code>string status = 2;</code>
   * @return The bytes for status.
   */
  com.google.protobuf.ByteString
      getStatusBytes();

  /**
   * <code>float statusCode = 3;</code>
   * @return The statusCode.
   */
  float getStatusCode();

  /**
   * <code>.protocc.RequestMessage yourRequest = 4;</code>
   * @return Whether the yourRequest field is set.
   */
  boolean hasYourRequest();
  /**
   * <code>.protocc.RequestMessage yourRequest = 4;</code>
   * @return The yourRequest.
   */
  kr.com.rts.proto.RequestMessage getYourRequest();
  /**
   * <code>.protocc.RequestMessage yourRequest = 4;</code>
   */
  kr.com.rts.proto.RequestMessageOrBuilder getYourRequestOrBuilder();
}
