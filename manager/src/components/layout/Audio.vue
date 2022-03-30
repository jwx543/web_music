<template>
    <div class="song-audio">
        <audio
            ref="player"
            controls="controls"
            preload="true"
            :src="url"
            @canplay="startPlay"
            @ended="ended"
        ></audio>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Audio"
    computed:{
        ...mapGetters([
            'url',
            'isPlay'
        ])
    },
    watch: {
        isPlay: function (){
            this.togglePlay()
        }
    },
    methods: {
        togglePlay(){
            const player = this.$refs.player.elm
            this.isPlay ? player.play() : player.pause()
        },
        startPlay(){
            const player = this.$refs.player.elm
            player.play()
        },
        ended(){
            this.isPlay = false
        }
    }
}
</script>

<style scoped>
#player {
    display: none;
}
</style>