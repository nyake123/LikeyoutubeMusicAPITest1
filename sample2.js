// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytPlayer;
var loopFlg = false;

// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
	ytPlayer = new YT.Player(
		'sample', // 埋め込む場所の指定
		{
			width: 600, // プレーヤーの幅
			height: 200, // プレーヤーの高さ
			//videoId: 'bHQqvYy5KYo', // YouTubeのID
			
		    playerVars: {
		      'playlist': 'rxv76yHwrAw,CqIUyFBhRAM'
		    },
    
			// イベントの設定
			events: {
				'onReady': onPlayerReady, // プレーヤーの準備ができたときに実行
				'onStateChange': onPlayerStateChange // プレーヤーの状態が変更されたときに実行
			}
		}
	);
}

var playUrls = "";
var lines = "";
var playListString = "";

var playerReady = false;

// プレーヤーの準備ができたとき
function onPlayerReady(event) {
	playerReady = true;
	
	// 動画再生
	//event.target.playVideo();
}

// プレーヤーの状態が変更されたとき
function onPlayerStateChange(event) {
	// 現在のプレーヤーの状態を取得
	var ytStatus = event.data;
	/*
	// 再生終了したとき
	if (ytStatus == YT.PlayerState.ENDED) {
		console.log('再生終了');
		// 動画再生
		event.target.playVideo();
	}
	// 再生中のとき
	if (ytStatus == YT.PlayerState.PLAYING) {
		console.log('再生中');
	}
	// 停止中のとき
	if (ytStatus == YT.PlayerState.PAUSED) {
		console.log('停止中');
	}
	// バッファリング中のとき
	if (ytStatus == YT.PlayerState.BUFFERING) {
		console.log('バッファリング中');
	}
	// 頭出し済みのとき
	if (ytStatus == YT.PlayerState.CUED) {
		console.log('頭出し済み');
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
	        // 空行は無視する
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

		//配列をシャッフル
		for(i=0; i<shaffleCount; i++){
			rnd1 = Math.floor(Math.random()*(videoCount-1));
			rnd2 = Math.floor(Math.random()*(videoCount-1));
			tempStr = lines[rnd1];
			lines[rnd1] = lines[rnd2];
			lines[rnd2] = tempStr;
		}
		
	    for ( var i = 0; i < lines.length; i++ ) {
	        // 空行は無視する
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

	//ループ再生モードをセット
	$('#setLoop').click(function(){
		ytPlayer.setLoop(true);
		
		loopFlg = true;
		document.getElementById("id_loopFlg").textContent = "ON";
	});		
	//ループ再生モードを解除
	$('#unSetLoop').click(function(){
		ytPlayer.setLoop(false);

		loopFlg = false;
		document.getElementById("id_loopFlg").textContent = "OFF";
	});	

	//順次再生でプレイリストにセット
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

	//ランダム再生でプレイリストにセット
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
	// 再生
	$('#play').click(function() {
		if(playerReady){
			ytPlayer.playVideo();
			
			loopFlg = false;
			document.getElementById("id_loopFlg").textContent = "OFF";
		}
	});
	// 一時停止
	$('#pause').click(function() {
		if(playerReady){
			ytPlayer.pauseVideo();
		}
	});
	// 1分前へ
	$('#prev').click(function() {
		if(playerReady){
			// 現在の再生時間取得
			var currentTime = ytPlayer.getCurrentTime();
			// シークバーの移動
			ytPlayer.seekTo(currentTime - 60);
		}
	});
	// 1分先へ
	$('#next').click(function() {
		if(playerReady){
			// 現在の再生時間取得
			var currentTime = ytPlayer.getCurrentTime();
			// シークバーの移動
			ytPlayer.seekTo(currentTime + 60);
		}
	});
	// 次の動画
	$('#nextVideo').click(function() {
		if(playerReady){
			ytPlayer.nextVideo();
		}
	});
	// 前の動画
	$('#prevVideo').click(function() {
		if(playerReady){
			ytPlayer.previousVideo();
		}
	});
	//クリア
	$('#clear').click(function() {
		document.getElementById("textArea1").value = "";
	});
});
