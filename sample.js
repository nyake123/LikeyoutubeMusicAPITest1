// IFrame Player API �̓ǂݍ���
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTube�̖��ߍ���
function onYouTubeIframeAPIReady() {
	ytPlayer = new YT.Player(
		'sample', // ���ߍ��ޏꏊ�̎w��
		{
			width: 640, // �v���[���[�̕�
			height: 390, // �v���[���[�̍���
			videoId: 'bHQqvYy5KYo' // YouTube��ID
			/*
			// �C�x���g�̐ݒ�
			events: {
				'onReady': onPlayerReady, // �v���[���[�̏������ł����Ƃ��Ɏ��s
				'onStateChange': onPlayerStateChange // �v���[���[�̏�Ԃ��ύX���ꂽ�Ƃ��Ɏ��s
			}
			*/
		}
	);
}

$(function() {
	// �Đ�
	$('#play').click(function() {
		ytPlayer.playVideo();
	});
	// �ꎞ��~
	$('#pause').click(function() {
		ytPlayer.pauseVideo();
	});
	// 1���O��
	$('#prev').click(function() {
		// ���݂̍Đ����Ԏ擾
		var currentTime = ytPlayer.getCurrentTime();
		// �V�[�N�o�[�̈ړ�
		ytPlayer.seekTo(currentTime - 60);
	});
	// 1�����
	$('#next').click(function() {
		// ���݂̍Đ����Ԏ擾
		var currentTime = ytPlayer.getCurrentTime();
		// �V�[�N�o�[�̈ړ�
		ytPlayer.seekTo(currentTime + 60);
	});
	// ���ʃA�b�v(+10)
	$('#volup').click(function() {
		// ���݂̉��ʎ擾
		var currentVol = ytPlayer.getVolume();
		// ���ʂ̕ύX
		ytPlayer.setVolume(currentVol + 10);
	});
	// ���ʃ_�E��(-10)
	$('#voldown').click(function() {
		// ���݂̉��ʎ擾
		var currentVol = ytPlayer.getVolume();
		// ���ʂ̕ύX
		ytPlayer.setVolume(currentVol - 10);
	});
	// �~���[�g
	$('#mute').click(function() {
		// �~���[�g����Ă��邩�ǂ���
		if(ytPlayer.isMuted()) {
			// �~���[�g�̉���
			ytPlayer.unMute();
		} else {
			// �~���[�g
			ytPlayer.mute();
		}
	});
});
