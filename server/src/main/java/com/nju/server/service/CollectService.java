package com.nju.server.service;

import com.nju.server.domain.Collect;

import java.util.List;

public interface CollectService {

    boolean addCollection(Collect collect);

    boolean existSongId(Integer userId, Integer songId);

    boolean updateCollectMsg(Collect collect);

    boolean deleteCollect(Integer userId, Integer songId);

    List<Collect> allCollect();

    List<Collect> collectionOfUser(Integer userId);
}
