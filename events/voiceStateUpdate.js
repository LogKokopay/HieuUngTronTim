process.env.FFMPEG_PATH = require('ffmpeg-static');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const googleTTS = require('google-tts-api');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        // Bỏ qua nếu không phải vào/ra voice hoặc là bot
        if (oldState.channelId === newState.channelId || newState.member.user.bot) return;

        const voiceChannel = newState.channel;
        if (!voiceChannel) return;

        try {
            // 🔧 Lấy tên hiển thị (nickname trong server), nếu không có thì fallback về username
            const displayName = newState.member?.displayName || newState.member.user.username;

            // Tạo TTS tiếng Việt
            const text = `${displayName} vừa vào kênh thoại!`;
            const url = googleTTS.getAudioUrl(text, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
            });

            // Kết nối vào voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
            });

            // Phát audio TTS
            const player = createAudioPlayer();
            const resource = createAudioResource(url, { inputType: StreamType.Arbitrary });

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });

            console.log(`✅ Phát TTS cho ${displayName}`);
        } catch (error) {
            console.error('❌ Lỗi khi phát TTS:', error);
        }
    },
};
