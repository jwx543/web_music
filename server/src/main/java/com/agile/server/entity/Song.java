package com.agile.server.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Song {
    private Integer id;

    private Integer artistId;

    private String name;

    private String describe;

    private String url;

    private String pic;

    private String lyric;

    private Date updateTime;

    private Date createTime;
}
