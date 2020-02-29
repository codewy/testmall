import axios from 'axios'

export function {
  return {
    axios({
      url: 'https://douban.uieee.com/v2/movie/in_theaters'
    }).then(res => {
      console.log(res.data.title)
      this.movie = res.data
    })
  }
}

