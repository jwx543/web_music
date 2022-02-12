package com.agile.server.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Collection {
    private Integer id;

    private Integer userId;

    private Integer songId;

    private Integer songListId;

    private Byte type;

    private Date createTime;
}
