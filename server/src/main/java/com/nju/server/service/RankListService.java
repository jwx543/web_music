package com.nju.server.service;

import com.nju.server.domain.RankList;

public interface RankListService {

    boolean addRank(RankList rankList);

    int rankOfSongListId(Long songListId);

    int getUserRank(Long consumerId, Long songListId);

}
