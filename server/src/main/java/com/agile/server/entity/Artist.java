package com.agile.server.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Artist {
    private Integer id;

    private String name;

    private Byte gender;

    private String place;

    private Date birthday;

    private String describe;

    private String pic;
}
