const fs = require('fs');
const textToSpeech = require('text-to-speech-js');
const ffmpeg = require('fluent-ffmpeg');

const text = "مرحباً بكم في قناتنا. لا تنسوا الاشتراك والإعجاب!";
const audioPath = 'output.mp3';
const imagePath = 'background.jpg';
const videoPath = 'output.mp4';

textToSpeech.speak(text, 'ar', 1, function(audioBuffer) {
    fs.writeFileSync(audioPath, audioBuffer);

    ffmpeg()
        .addInput(imagePath)
        .loop(10)
        .addInput(audioPath)
        .outputOptions([
            '-c:v libx264',
            '-t 10',
            '-pix_fmt yuv420p'
        ])
        .save(videoPath)
        .on('end', () => console.log('✅ Video created successfully'))
        .on('error', (err) => console.error('❌ Error:', err));
});
