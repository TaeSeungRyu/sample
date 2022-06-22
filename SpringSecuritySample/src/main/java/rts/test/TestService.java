package rts.test;

import org.springframework.stereotype.Service;

import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import rts.test.dbinit.DataBaseVo;

@Service("TestService")
public class TestService implements UserDetailsService {

	private final DBRepository dao;
	
	public TestService(DBRepository dao) {
		this.dao = dao;
	}

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException { //사용자를 찾습니다.
		DataBaseVo vo = dao.findByUserId(userId);
		return vo;
	}
	
	public boolean newMember(HashMap<Object, Object> param) {  //사용자 가입 메소드 입니다.
		DataBaseVo vo = new DataBaseVo();
		vo.setAuth(param.get("auth") == null ? "": param.get("auth").toString());
		vo.setUserId(param.get("userId") == null ? "": param.get("userId").toString());
		vo.setPassword(param.get("password") == null ? "": param.get("password").toString());
		vo.setName(param.get("name") == null ? "": param.get("name").toString());
		
		vo = dao.save(vo);
		
		if(vo.getIdx() == null || vo.getIdx().intValue() <=0) return false;
		return true;
	}
}
