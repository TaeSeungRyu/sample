package com.example.demo;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

@Component
public class JWT토큰필터 extends GenericFilterBean {
	
	private JWT토큰프로바이더 provider;
	
	public JWT토큰필터(JWT토큰프로바이더 provider) {
		this.provider = provider;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        
		String token = ((HttpServletRequest) request).getHeader(JWT토큰프로바이더.HTTP헤더에담을키값);

        //유효한 토큰인지 확인합니다.
        if (token != null && provider.토큰검사(token)) {
            // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
            Authentication authentication = provider.권한조회(token);
            //SecurityContext 에 Authentication 객체를 저장합니다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println(authentication);
        }
        chain.doFilter(request, response);
	}

}
