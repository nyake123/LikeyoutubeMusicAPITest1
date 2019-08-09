// IFrame Player API �̓ǂݍ���
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytPlayer;
var loopFlg = false;

// YouTube�̖��ߍ���
function onYouTubeIframeAPIReady() {
	ytPlayer = new YT.Player(
		'sample', // ���ߍ��ޏꏊ�̎w��
		{
			width: 600, // �v���[���[�̕�
			height: 200, // �v���[���[�̍���
			//videoId: 'bHQqvYy5KYo', // YouTube��ID
			
		    playerVars: {
		      'playlist': 'rxv76yHwrAw,CqIUyFBhRAM'
		    },
    
			// �C�x���g�̐ݒ�
			events: {
				'onReady': onPlayerReady, // �v���[���[�̏������ł����Ƃ��Ɏ��s
				'onStateChange': onPlayerStateChange // �v���[���[�̏�Ԃ��ύX���ꂽ�Ƃ��Ɏ��s
			}
		}
	);
}

var playUrls = "";
var lines = "";
var playListString = "";

var playerReady = false;

// �v���[���[�̏������ł����Ƃ�
function onPlayerReady(event) {
	playerReady = true;
	
	// ����Đ�
	//event.target.playVideo();
}

// �v���[���[�̏�Ԃ��ύX���ꂽ�Ƃ�
function onPlayerStateChange(event) {
	// ���݂̃v���[���[�̏�Ԃ��擾
	var ytStatus = event.data;
	/*
	// �Đ��I�������Ƃ�
	if (ytStatus == YT.PlayerState.ENDED) {
		console.log('�Đ��I��');
		// ����Đ�
		event.target.playVideo();
	}
	// �Đ����̂Ƃ�
	if (ytStatus == YT.PlayerState.PLAYING) {
		console.log('�Đ���');
	}
	// ��~���̂Ƃ�
	if (ytStatus == YT.PlayerState.PAUSED) {
		console.log('��~��');
	}
	// �o�b�t�@�����O���̂Ƃ�
	if (ytStatus == YT.PlayerState.BUFFERING) {
		console.log('�o�b�t�@�����O��');
	}
	// ���o���ς݂̂Ƃ�
	if (ytStatus == YT.PlayerState.CUED) {
		console.log('���o���ς�');
	}
	*/
}

function getVideoIdListFromTextBox(){

		playListString = "";
		
		var startIdx;
		var endIdx;
		var videoId1;
		
		playUrls = document.getElementById("textArea1").value;
    	playUrls  = playUrls.replace(/\r\n|\r/g, "\n");    
		lines = playUrls.split('\n');
		
	    for ( var i = 0; i < lines.length; i++ ) {
	        // ��s�͖�������
	        if ( lines[i] == '' ) {
	            continue;
	        }
	        
	        if(lines[i].indexOf('https://youtu.be/') == -1){
	        	
		 		startIndex = lines[i].indexOf("v=");
		 		endIndex = startIndex+11;
		 		videoId1 = lines[i].substr(startIndex+2,11); 
		 		
		        if(playListString != ''){
		         	playListString += ',';
		        }
		        playListString += videoId1;
		        
		    }else{
		    	
		 		startIndex = lines[i].length-11;
		 		endIndex = lines[i].length;
		 		
		 		videoId1 = lines[i].substr(startIndex,11); 
		 		
		        if(playListString != ''){
		         	playListString += ',';
		        }
		        playListString += videoId1;		    
		    
		    }
	    }
}

function getRandomVideoIdListFromTextBox(){

		playListString = "";
		
		var startIdx;
		var endIdx;
		var videoId1;
		var shaffleCount;
		var videoCount=0;
		var rnd1, rnd2;
		var tempStr;
		
		playUrls = document.getElementById("textArea1").value;
    	playUrls  = playUrls.replace(/\r\n|\r/g, "\n");    
		lines = playUrls.split('\n');
		shaffleCount = lines.length*0.8;
		videoCount = lines.length;

		//�z����V���b�t��
		for(i=0; i<shaffleCount; i++){
			rnd1 = Math.floor(Math.random()*(videoCount-1));
			rnd2 = Math.floor(Math.random()*(videoCount-1));
			tempStr = lines[rnd1];
			lines[rnd1] = lines[rnd2];
			lines[rnd2] = tempStr;
		}
		
	    for ( var i = 0; i < lines.length; i++ ) {
	        // ��s�͖�������
	        if ( lines[i] == '' ) {
	            continue;
	        }
	 
	        if(lines[i].indexOf('https://youtu.be/') == -1){
	        	
		 		startIndex = lines[i].indexOf("v=");
		 		endIndex = startIndex+11;
		 		videoId1 = lines[i].substr(startIndex+2,11); 
		 		
		        if(playListString != ''){
		         	playListString += ',';
		        }
		        playListString += videoId1;
		        
		    }else{
		    	
		 		startIndex = lines[i].length-11;
		 		endIndex = lines[i].length;
		 		
		 		videoId1 = lines[i].substr(startIndex,11); 
		 		
		        if(playListString != ''){
		         	playListString += ',';
		        }
		        playListString += videoId1;		    
		    
		    }
	    }
}

$(function() {

	//���[�v�Đ����[�h���Z�b�g
	$('#setLoop').click(function(){
		ytPlayer.setLoop(true);
		
		loopFlg = true;
		document.getElementById("id_loopFlg").textContent = "ON";
	});		
	//���[�v�Đ����[�h������
	$('#unSetLoop').click(function(){
		ytPlayer.setLoop(false);

		loopFlg = false;
		document.getElementById("id_loopFlg").textContent = "OFF";
	});	

	//�����Đ��Ńv���C���X�g�ɃZ�b�g
	$('#playSequentiallyStart').click(function(){
	
		getVideoIdListFromTextBox();
		
        ytPlayer.cuePlaylist({
            'listType': 'playlist',
            'playlist': playListString,
            'index': 0,
            'startSeconds': 0,
            'suggestedQuality': 'small'
        });
		
	});

	//�����_���Đ��Ńv���C���X�g�ɃZ�b�g
	$('#playRandomStart').click(function(){
	
		getRandomVideoIdListFromTextBox();
		
        ytPlayer.cuePlaylist({
            'listType': 'playlist',
            'playlist': playListString,
            'index': 0,
            'startSeconds': 0,
            'suggestedQuality': 'small'
        });
		
	});
	// �Đ�
	$('#play').click(function() {
		if(playerReady){
			ytPlayer.playVideo();
			
			loopFlg = false;
			document.getElementById("id_loopFlg").textContent = "OFF";
		}
	});
	// �ꎞ��~
	$('#pause').click(function() {
		if(playerReady){
			ytPlayer.pauseVideo();
		}
	});
	// 1���O��
	$('#prev').click(function() {
		if(playerReady){
			// ���݂̍Đ����Ԏ擾
			var currentTime = ytPlayer.getCurrentTime();
			// �V�[�N�o�[�̈ړ�
			ytPlayer.seekTo(currentTime - 60);
		}
	});
	// 1�����
	$('#next').click(function() {
		if(playerReady){
			// ���݂̍Đ����Ԏ擾
			var currentTime = ytPlayer.getCurrentTime();
			// �V�[�N�o�[�̈ړ�
			ytPlayer.seekTo(currentTime + 60);
		}
	});
	// ���̓���
	$('#nextVideo').click(function() {
		if(playerReady){
			ytPlayer.nextVideo();
		}
	});
	// �O�̓���
	$('#prevVideo').click(function() {
		if(playerReady){
			ytPlayer.previousVideo();
		}
	});
	//�N���A
	$('#clear').click(function() {
		document.getElementById("textArea1").value = "";
	});
});
