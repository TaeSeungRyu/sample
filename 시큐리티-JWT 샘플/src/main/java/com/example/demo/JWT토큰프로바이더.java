package com.example.demo;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWT토큰프로바이더 {
	
    public static String HTTP헤더에담을키값 = "Authorization";
    private String 비밀키 = "myJWTKey";
    private long 유지시간 = 60 * 60 * 1000L;  //토큰 유효시간 : 60분

    private final UserDetailsService 유저서비스;
    
    public JWT토큰프로바이더(UserDetailsService 유저서비스){
    	this.유저서비스 = 유저서비스;
    }

    //객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void 비밀키인코딩() {
    	비밀키 = Base64.getEncoder().encodeToString(비밀키.getBytes());
    }

    // JWT 토큰 생성 
    public String 토큰발행(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) //정보 저장
                .setIssuedAt(now) //토큰 발행 시간
                .setExpiration(new Date(now.getTime() + 유지시간)) //만료시간
                .signWith(SignatureAlgorithm.HS256, 비밀키)  //사용할 암호화 알고리즘과 signature 에 들어갈 secret값 세팅
                .compact();
    }

    //JWT 토큰에서 인증 정보 조회
    public Authentication 권한조회(String token) {
        UserDetails userDetails = 유저서비스.loadUserByUsername(this.사용자정보확인(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean 토큰검사(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(비밀키).parseClaimsJws(jwtToken);
            System.out.println(claims );
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
        	e.printStackTrace();
            return false;
        }
    }
    
    //토큰에서 회원 정보 추출
    private String 사용자정보확인(String token) {
        return Jwts.parser().setSigningKey(비밀키).parseClaimsJws(token).getBody().getSubject();
    }    
}
