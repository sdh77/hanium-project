window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const apikey = 'AIzaSyBGIjrGM-UWx-eToQTWqZxE1UoTLkAkph4';
let recorder= null;

function startRecording() {
    navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
    	recorder = RecordRTC(stream, {
	    type: 'audio',
	    mimeType: 'audio/wav',
	    sampleRate: 44100,
	    desiredSampleRate: 16000,
	    languageCode: 'ko-KR',
	    recorderType: RecordRTC.StereoAudioRecorder
	});
	recorder.startRecording();
	console.log("Start Recording...");
    });
}
function stopRecording() {
    recorder.stopRecording(function() {
    	const recordedBlob = recorder.getBlob();
	transcribeAudio(recordedBlob);
    });
}

function transcribeAudio(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
	const base64data = reader.result;
	const data = base64data.split(',')[1];

	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	    	const response = JSON.parse(xhr.responseText);
		if (response && response.results && response.results.length > 0) {
		    const transcription = response.results[0].alternatives[0].transcript;
		    console.log(transcription);
		    addMessageToChat("user", transcription);
		    const botResponse = getBotResponse(transcription);
		    addMessageToChat("bot", botResponse);
		    document.querySelector('#userMessage').value = "";
		} else {
		    console.error('No results found in response');
		}
	    }
	};
	xhr.onerror = function(event) {
	    console.error(event);
	};
	const json = {
	    config: {
		encoding: 'LINEAR16',
		audio_channel_count: 2,
		languageCode: 'ko-KR',
		model: 'default',
		enableAutomaticPunctuation: true,
	    },
	    audio: {
		content: data,
	    },
	};

	xhr.open('POST', 'https://speech.googleapis.com/v1/speech:recognize?key=' + apikey, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(json));
    };
}

const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');

startRecordingButton.addEventListener('click', () => {
    startRecording();
});
stopRecordingButton.addEventListener('click', () => {
    stopRecording();
});
