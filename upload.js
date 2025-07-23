const fs = require('fs');
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

async function uploadVideo() {
  const res = await youtube.videos.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: '🎬 فيديو تلقائي جديد',
        description: 'تم إنشاء هذا الفيديو باستخدام الذكاء الاصطناعي تلقائياً',
        tags: ['ذكاء اصطناعي', 'يوتيوب', 'تلقائي'],
      },
      status: {
        privacyStatus: 'public',
      },
    },
    media: {
      body: fs.createReadStream('output.mp4'),
    },
  });

  console.log('✅ تم رفع الفيديو: https://youtu.be/' + res.data.id);
}

module.exports = uploadVideo;
