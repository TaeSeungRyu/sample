package rts.test;


import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class IndexController {
	
	private final TestService service;
	
	public IndexController(TestService service) {
		this.service = service;
	}

	//서버가 잘 구동되었는지 테스트를 위해서 추가한 코드 입니다.
	@RequestMapping (value = "/", method = {RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public HashMap<Object, Object> getBoardData(@RequestParam HashMap<Object, Object> param) {
		return param;
	}
	
	//회원가입 코드 입니다.
	@RequestMapping (value = "/newMember", method = {RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public HashMap<Object, Object> newMember(@RequestParam HashMap<Object, Object> param) {
		System.out.println(param);
		param.put("result", service.newMember(param));
		return param;
	}	
}
