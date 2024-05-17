import { faTruckFast,faDolly,faClipboard,faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-step-progress-bar/styles.css";
import { Checkmark } from 'react-checkmark';
import {React} from "react";
import './progress_bar.css';

function ProgressStep({color, index, percent}) {
   
    if(percent===100){
        return (
            <div>
                <Checkmark size='20px' color={color} />
            </div>
        ); 
    }
    else{
        var src=faClipboard;
       
        switch (index) {
            case 1:
                src=faDolly;
                break;
            case 2:
                src=faTruckFast;
                break;
            case 3:
                src=faBox;
                break;
            default:
                src=faClipboard;
                break;
        }
        
        var className="indexedStep";
        var style={}
        const current = parseInt(percent/33);
        
        if(current===index){
            className="currentStep";
            style={backgroundColor:color, borderColor:color};
        }
        else if(current>index){
            return (
                <div>
                    <Checkmark size='20px' color={color} />
                </div>
            ); 
        }
        return (
            <div className={className} style={style}>
                <FontAwesomeIcon icon={src} size="lg" style={{marginTop:"5px"}}/>
            </div>
        );
    
    }
}
export default ProgressStep;