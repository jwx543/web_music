package com.agile.server.entity;

import lombok.Data;

@Data
public class Rank {
    private Long id;

    private Long songListId;

    private Long userId;

    private Integer score;
}
