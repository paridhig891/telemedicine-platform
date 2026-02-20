"use client"
import { Renderprediction } from "./Renderprediction";
import Webcam from "react-webcam"
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd"
import { useEffect,useRef,useState } from "react";
import * as tf from '@tensorflow/tfjs'
import axios from 'axios'

let detectInterval;

function Object(){
const [loading,setLoading]=useState(false)
const [image,setImage]=useState(null)
const webcamRef=useRef(null)
const canvasRef=useRef(null)

const runcoco=async()=>{
    setLoading(true)
    const net=await cocoSSDLoad()
    setLoading(false)

    detectInterval=setInterval(()=>{
        runobjectdetection(net)
    },1000)
}
async function runobjectdetection(net){
    if(webcamRef.current!==null && webcamRef.current.video?.readyState===4 && canvasRef.current){
        canvasRef.current.width=webcamRef.current.video.videoWidth
     canvasRef.current.height=webcamRef.current.video.videoHeight

     const detectedobjects=await net.detect(webcamRef.current.video,undefined,0.3)
     //console.log(detectedobjects)
     const context=canvasRef.current.getContext('2d');
     Renderprediction(detectedobjects,context)
    }
    
}
const capture=async()=>{
    const imagesrc=webcamRef.current.getScreenshot();
    setImage(imagesrc)

    const res= await axios.post('http://localhost:5000',{
    image:imagesrc,
}
).then((res)=>{

    console.log(res.data)
})
}



const showmyvideo=()=>{
    if(webcamRef.current!==null && webcamRef.current.video?.readyState===4){
     const myvideowidth=webcamRef.current.video.videoWidth
     const myvideoheight=webcamRef.current.video.videoHeight

     webcamRef.current.video.width=myvideowidth
     webcamRef.current.video.height=myvideoheight
    }
}

useEffect(()=>{
    showmyvideo()
    runcoco()
},[])

    return(<>
<p>hello</p>
{loading?(<p>loading</p>):
(
   <div className="relative w-1/2">
  <Webcam
    ref={webcamRef}
    className="w-full h-auto" 
    screenshotFormat="image/jpeg"  // webcam fills container
  />
  <canvas
    ref={canvasRef}
    className="absolute top-0 left-0 w-full h-full" // canvas matches webcam
  />

</div>

)}

<button onClick={capture}>capture</button>
{image && (
        <div className="mt-4">
          <p>Captured Image:</p>
          <img src={image} alt="captured" className="border rounded-lg" />
        </div>
      )}
    </>);
}

export default Object