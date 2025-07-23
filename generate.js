const fs = require('fs');
const https = require('https');
const gTTS = require('google-tts-api');
const ffmpeg = require('fluent-ffmpeg');

async function generateVideo() {
  const text = 'مرحباً بك في قناتنا. هذا الفيديو تم إنشاؤه تلقائيًا.';
  const url = gTTS.getAudioUrl(text, { lang: 'ar', slow: false });

  return new Promise((resolve, reject) => {
    const audio = fs.createWriteStream('audio.mp3');
    https.get(url, (res) => {
      res.pipe(audio);
      audio.on('finish', () => {
        ffmpeg()
          .input('audio.mp3')
          .input('background.jpg') // تأكد من وجود صورة اسمها background.jpg
          .loop(10)
          .outputOptions('-shortest')
          .output('output.mp4')
          .on('end', () => {
            console.log('✅ تم إنشاء الفيديو');
            resolve();
          })
          .on('error', reject)
          .run();
      });
    });
  });
}

module.exports = generateVideo;
