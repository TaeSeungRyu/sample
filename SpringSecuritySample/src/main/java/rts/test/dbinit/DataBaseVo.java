package rts.test.dbinit;

import java.util.List;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@javax.persistence.Entity
@Getter
@Setter
@ToString
public class DataBaseVo  implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;
    private String name;
    private String auth;
    private String password;  //시큐리티에서는 password 라는 값을 비밀번호로 사용합니다. 그러므로 해당 규칙은 지켜야 합니다.
    private String userId;

    
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		list.add(new SimpleGrantedAuthority(this.auth));  //여기에 권한값을 넣어줍니다. 만약에 권한이 n개라면 반복문을 통해 add 하여 줍니다.
		return list;
	}
	
	@Override
	public String getUsername() {
		return this.userId;  //여기가 바로 사용자 아이디 입니다.
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
}