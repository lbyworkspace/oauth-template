package com.lby.template.controller.user;

import com.lby.template.service.UserService;
import com.lby.template.utils.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/user")
public class LoginController {

    @Resource
    private UserService userService;

    @GetMapping("/getInfo")
    public ResponseEntity getInfo(@RequestParam String token){
        return ResponseEntity.ok(JwtUtils.parser(token));
    }

    @GetMapping("/getAllUser")
    public ResponseEntity getAllUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }
}
