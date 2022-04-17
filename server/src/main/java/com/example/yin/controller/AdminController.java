package com.example.yin.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.yin.common.FailMessage;
import com.example.yin.common.SuccessMessage;
import com.example.yin.service.impl.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class AdminController {
    @Autowired
    private AdminServiceImpl adminService;

    // 判断是否登录成功
    @ResponseBody
    @RequestMapping(value = "/admin/login/status", method = RequestMethod.POST)
    public Object loginStatus(HttpServletRequest req, HttpSession session) {
        JSONObject jsonObject = new JSONObject();

        String name = req.getParameter("name");
        String password = req.getParameter("password");

        boolean res = adminService.veritypasswd(name, password);
        if (res) {
            jsonObject.put("code",1);
            jsonObject.put("msg","登录成功");
            session.setAttribute("name", name);
            //return new SuccessMessage("登录成功").getMessage();
            return jsonObject;
        } else {
            jsonObject.put("code",0);
            jsonObject.put("msg","用户名或密码错误");
            return jsonObject;
            //return new FailMessage("用户名或密码错误").getMessage();
        }

    }
}
