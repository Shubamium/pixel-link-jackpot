type PlayAudioParam = {
	src:string;
	loop?:boolean;
	volume?:number;
	destroy?:number | false;
}


function playAudio ({src,loop,volume = 1,destroy = 2}:PlayAudioParam) {
	const audioEl = document.createElement('audio');
	console.log('new el')
	audioEl.src = src;
	audioEl.volume = volume;
	if(loop){
		audioEl.loop = true
	}
	// audioEl.
	document.body.appendChild(audioEl)

	if(destroy){
		setTimeout(()=>{
			// document.removeChild(audioEl)
			if(audioEl){
				audioEl.pause()
				audioEl.remove()
			}
		},destroy*1000)
	}

	const play = (delay?:number) =>{
		if(delay){
			setTimeout(() => {
				audioEl.currentTime = 0

					audioEl.play().catch((e)=>{
						console.log(e)
					});
			}, delay*1000);
		}else{
			audioEl.play().catch((e)=>{
				console.log(e)
			});
		}
	}
	const pause = () => {
		audioEl.pause()
	}

	return {
		play,
		pause
	}
}


export default playAudio