package com.example.demo;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class 시큐리티서비스 implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		// #1. 여기에서 DB에 갔다왔다고 치고..
		System.out.println("들어온 사용자 아이디 :: " + username);
		시큐리티유저 user = new 시큐리티유저();// 요기에 db에 갔다온 결과가 필요 합니다. 유저클래스는 DTO객체 입니다.
		UserDetails build = null;
		
		try {
			User.UserBuilder userBuilder = User.withUsername(username).password(user.getPassword());
			userBuilder.authorities(user.getAuthorities());
			build = userBuilder.build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return build;
	}

}
