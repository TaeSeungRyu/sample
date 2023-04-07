package com.example.demo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {
	


	@RequestMapping(value = "/test")
	@ResponseBody
	public String test() {		
		return "succ";
	}

	@RequestMapping(value = "/test2")
	@ResponseBody
	public String test2() {		
		return "succ";
	}


}
