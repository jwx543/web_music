package com.agile.server.service;

import com.agile.server.domain.RankList;

public interface RankListService {

    int rankOfSongListId(Long songListId);

    boolean addRank(RankList rankList);
}
