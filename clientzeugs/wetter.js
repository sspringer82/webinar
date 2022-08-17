import * as cheerio from 'cheerio';

const url =
  'https://www.wetter.com/deutschland/muenchen/schwanthalerhoehe/DE6940467.html';
try {
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);

  const place = $('h2').first().text();
  const temp = $('.rtw_temp').text();
  const weather = $('.rtw_weather_txt').text();
  console.log(`${place}: ${temp} ${weather}`);
} catch (error) {
  console.error(error);
}
