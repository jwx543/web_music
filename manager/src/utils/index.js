// 导入constant
import { HOME, BASE_URL, SINGER, SONG, SAVE, SIGN_IN, LIST_CONTENT, COMMENT, SONG_LIST, INFO, USER, ERROR, SIGN_OUT } from '../constants'

export const myFunction = {
    methods: {
        getUrl (url) {
            return `${BASE_URL}/${url}`
        },
        getTime (date = new Date()) {
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        },
        changeGender (value) {
            if (value === 0) {
                return '女'
            } else if (value === 1) {
                return '男'
            } else if (value === 2) {
                return '组合'
            } else if (value === 3) {
                return '不明'
            } else if (value === '男' || value === '女') {
                return value
            }
        },
        getBirth (val) {
            let birth = String(val).match(/[0-9-]+(?=\s)/)
            return Array.isArray(birth) ? birth[0] : birth
        },
        // delete
        DeleteById (id) {
            this.idx = id
            this.delVisible = true
        },
        // delete Multiple
        deleteMultiple (val) {
            this.multipleSelection = val
        },
        // delete ALL
        deleteAll () {
            for (let item of this.multipleSelection) {
                this.DeleteById(item.id)
                this.deleteRow(item.id)
            }
            this.multipleSelection = []
        },
        UpdatePic (res, file) {
            if (res.code === 1) {
                this.imageUrl = URL.createObjectURL(file.raw)
                this.getData()
                this.$notify({
                    title: '上传成功',
                    type: 'success'
                })
            } else {
                this.$notify({
                    title: '上传失败',
                    type: 'error'
                })
            }
        },
        // manage router
        routerHandler (routerName, { path, query }) {
            switch (routerName) {
                case HOME:
                case SONG_LIST:
                    this.$router.push({ path })
                    break
                case LIST_CONTENT:
                    this.$router.push({ path, query })
                    break
                case SONG:
                    this.$router.push({ path, query })
                    break
                case COMMENT:
                    this.$router.push({ path, query })
                    break
                case SIGN_OUT:
                    this.$router.push({ path })
                    break
                case SINGER:
                    this.$router.push({ path })
                    break
                case INFO:
                    this.$router.push({ path })
                    break
                case USER:
                    this.$router.push({ path, query })
                    break
                case SAVE:
                    this.$router.push({ path, query })
                    break
                case SIGN_IN:
                    this.$router.push({ path })
                    break
                case ERROR:
                    this.$router.push({ path })
                    break
                default:
                    this.$router.push({ path })
                    break
            }
        }
    }
}
