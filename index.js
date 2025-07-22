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
        title: 'فيديو تلقائي جديد 🎬',
        description: 'تم إنشاء هذا الفيديو تلقائيًا',
        tags: ['تلقائي', 'ذكاء اصطناعي', 'يوتيوب'],
      },
      status: {
        privacyStatus: 'public',
      },
    },
    media: {
      body: fs.createReadStream('output.mp4'),
    },
  });

  console.log('✅ Video uploaded:', res.data.id);
}

uploadVideo().catch(console.error);
