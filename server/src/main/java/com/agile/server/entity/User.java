package com.agile.server.entity;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Integer id;

    private String name;

    private Byte gender;

    private String place;

    private String pwd;

    private Date birthday;

    private String phone;

    private String email;

    private String describe;

    private String avator;

    private Date updateTime;

    private Date createTime;
}
