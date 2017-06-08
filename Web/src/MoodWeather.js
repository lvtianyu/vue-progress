var moodList = [{
    moodStyle: "moodStyle0",
    text:'开心'
  }, {
    moodStyle: "moodStyle1",
    text:'淡定'
  }, {
    moodStyle: "moodStyle2",
     text:'欢乐'
  }, {
    moodStyle: "moodStyle3",
    text:'酷'
  }, {
    moodStyle: "moodStyle4",
    text:'伤心'
  }, {
    moodStyle: "moodStyle5",
    text:'烦躁'
  }, {
    moodStyle: "moodStyle6",
    text:'哭泣'
  }, {
    moodStyle: "moodStyle7",
    text:'愤怒'
  }
];

var weatherList = [{
  weatherStyle: 'weatherStyle0',
    text:'晴天'
}, {
  weatherStyle: 'weatherStyle1',
    text:'阴天'
}, {
  weatherStyle: 'weatherStyle2',
      text:'刮风'

}, {
  weatherStyle: 'weatherStyle3',
        text:'小雨'

}, {
  weatherStyle: 'weatherStyle4',
          text:'大雨'

}, {
  weatherStyle: 'weatherStyle5',
 text:'雷电'
}, {
  weatherStyle: 'weatherStyle6',
   text:'小雪'

}, {
  weatherStyle: 'weatherStyle7',
  text:'雾气'
}];

var base = {
  primeMood: 8,
  primeWeather: 8,
  moodWeatherTime: "" || new Date().getTime()
};

export {
  moodList,
  weatherList,
  base
};
