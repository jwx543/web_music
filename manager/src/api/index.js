import { get, post } from './handle'

const HttpHandler = {
    // login status
    getStatus: (params) => post(`admin/login/status`, params),

    // add user
    addUser: (params) => post(`user/add`, params),
    // user information
    getUserInfo: () => get(`user`),
    // update user
    updateUser: (params) => post(`user/update`, params),
    // delete user
    deleteUser: (id) => get(`user/delete?id=${id}`),
    // user id
    getUserId: (id) => get(`user/detail?id=${id}`),

    // update singer
    updateSinger: (params) => post(`singer/update`, params),
    // get singer
    getSinger: () => get(`singer`),
    // add singer
    addSinger: (params) => post(`singer/add`, params),
    // delete singer
    deleteSinger: (id) => get(`singer/delete?id=${id}`),

    // user collection
    getUserCollection: (userId) => get(`collection/detail?userId=${userId}`),
    // delete user collection
    deleteUserCollection: (userId, songId) => get(`/collection/delete?userId=${userId}&&songId=${songId}`),


    // List Song SongId
    getListSongSongId: (songListId) => get(`listSong/detail?songListId=${songListId}`),
    // add ListSong
    addListSong: (params) => post(`listSong/add`, params),
    // delete ListSong
    deleteListSong: (songId) => get(`listSong/delete?songId=${songId}`),

    // update songList
    updateSongList: (params) => post(`songList/update`, params),
    // add songList
    addSongList: (params) => post(`songList/add`, params),
    // get songList
    getSongList: () => get(`songList`),
    // delete SongList
    deleteSongList: (id) => get(`songList/delete?id=${id}`),

    // update comment
    updateComment: (params) => post(`comment/update`, params),
    // song id comment
    getCommentSongId: (songId) => get(`comment/song/detail?songId=${songId}`),
    // comment songList id
    getCommentSongListId: (songListId) => get(`comment/songList/detail?songListId=${songListId}`),
    // delete comment
    deleteComment: (id) => get(`comment/delete?id=${id}`),

    // get song
    getSong: () => get(`song`),
    // song id
    getSongId: (id) => get(`song/detail?id=${id}`),
    // update song
    updateSong: (params) => post(`song/update`, params),
    // song singer name
    getSongSingerName: (id) => get(`song/singerName/detail?name=${id}`),
    // song singer id
    getSongSingerId: (id) => get(`song/singer/detail?singerId=${id}`),
    // delete song
    deleteSong: (id) => get(`song/delete?id=${id}`)


}

export { HttpHandler }
