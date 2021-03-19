const timerControl={
   timerStatusObj:{
                   timerId:null,
                   timerEnd:false,
                   timerMs:100,
                   timerIntervalMs:1000,
                   timerCount:0
                     },
   currentOpenTimer:[],
   blockClearAllTimers:false,
   getTimerIndex:function(setBlock=true){
    blockClearAllTimers=setBlock;
   	return this.currentOpenTimer.length;
   },
   verifyTimerIndex:function(timerIndex){
   	if(this.currentOpenTimer.length<=timerIndex)return false;
   	return true;
   },
   isTimerEnd:function(timerIndex){
   	 if(!this.verifyTimerIndex(timerIndex))return true;
   	 if(this.currentOpenTimer[timerIndex].timerEnd)return true;
     const maxCount=this.getTimerMaxCount(timerIndex);
      if(this.currentOpenTimer[timerIndex].timerCount>=maxCount)return true;
     return false;
   },
   endTimer:function(timerIndex){
     if(!this.verifyTimerIndex(timerIndex))return true;
     this.currentOpenTimer[timerIndex].timerEnd=true;
   },
   getTimerMaxCount:function(timerIndex){
     if(!this.verifyTimerIndex(timerIndex))return 0;
     if(this.currentOpenTimer[timerIndex].timerMs<=0)return 0;
     return (this.currentOpenTimer[timerIndex].timerIntervalMs/this.currentOpenTimer[timerIndex].timerMs);
   },
   addNewTimer:function (addTimerData,timerIndex,setBlock=false){
   	this.currentOpenTimer[timerIndex]=addTimerData;
   	blockClearAllTimers=setBlock;
   },
   addTimerCount:function(timerIndex){
   	if(!this.verifyTimerIndex(timerIndex))return false;
   	this.currentOpenTimer[timerIndex].timerCount++;
   	if(this.isTimerEnd(timerIndex))this.currentOpenTimer[timerIndex].timerEnd=true;
   	return true;
   },
   forceKillTimer:function(timerIndex){
   	if(!this.verifyTimerIndex(timerIndex))return false;
   	clearInterval(this.currentOpenTimer[timerIndex].timerId);
   	return true;
   },
   killTimerEnd:function(timerIndex){
   	if(!this.verifyTimerIndex(timerIndex))return false;
   	if(!this.isTimerEnd(timerIndex))return false;
   	this.forceKillTimer(timerIndex);
   	return true;
   },
   clearAllTimers:function(){
   	if(blockClearAllTimers)return false;
   	for(let i=0;i<this.currentOpenTimer.length;i++){
   		if(!this.currentOpenTimer[i].timerEnd)return false;
   		this.forceKillTimer(i);
   	}
   	this.currentOpenTimer=[];
   	return true;
   },
   timerEvent:function(timerIndex,callFunction){
   	 this.addTimerCount(timerIndex);
     callFunction();
	   this.killTimerEnd(timerIndex);
	   this.clearAllTimers();
     
   }


}