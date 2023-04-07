package com.example.demo;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class 시큐리티유저 implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> list = new LinkedList<GrantedAuthority>();
		list.add(new SimpleGrantedAuthority("auth1"));
		list.add(new SimpleGrantedAuthority("auth2"));
		return list;
	}

	@Override
	public String getPassword() {
		return "$2a$10$SDBxd18/9SovlON7h/HewOwTe/drGLIx/UV0G0k91qLRWnGz0VoR.";  //1234
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return "admin";
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
