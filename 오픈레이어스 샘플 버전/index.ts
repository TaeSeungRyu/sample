import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import OlTileLayer from 'ol/layer/Tile.js';
import point from 'ol/geom/Point';
import {Icon, Style, Text, Fill, Stroke} from 'ol/style.js';
import Feature from 'ol/Feature.js';

import Vector from 'ol/source/Vector';
import VectorSource from 'ol/source/Vector';
import VectorLayer  from 'ol/layer/Vector.js';

import GeoJSON from 'ol/format/GeoJSON.js';
import koreaPos from './korea.json'  //korea.json 파일을 경로에 넣어주셔야 합니다!!!!

import Overlay from 'ol/Overlay';

type position = { lat : number, log : number }
let srokClass
let calback

class SrokOL {
    private openLayersMap : Map;
    private clicker : any;
    public static IdList : Array<string> = new Array<string>();
    private geoVector : any;



    //생성자를 통한 기초환경 구성
    constructor(targetId : string = 'map', lat : number = 126.7606, log : number = 37.4983){

        try {
            let width = document.getElementById(targetId).style.width || document.getElementById(targetId).parentElement.clientWidth;
            let height = document.getElementById(targetId).style.height || document.getElementById(targetId).parentElement.clientHeight;
            document.getElementById(targetId).style.width = width + 'px';
            document.getElementById(targetId).style.height = height + 'px';            
        } catch (error) {
            console.log(error, 'please check your element width, height values');
        }

        let layer : OlTileLayer = new OlTileLayer({ source: new OSM() });  

        let format : GeoJSON = new GeoJSON({   //포멧할 GeoJSON 객체 생성
            featureProjection:'EPSG:3857'
        });
        let parsing = format.readFeatures(koreaPos);  
        let source : Vector = new Vector({  //벡터의 구조를 파싱한 데이터로 넣기
            features : parsing
        });        
        let geoVector : VectorLayer = new VectorLayer({ // 벡터 레이어 생성
            source: source,
            style: (feature) => {
                //console.log(feature.get('name_eng'));
                return new Style({
                    stroke: new Stroke(
                        {color: 'rgba( 61, 61, 61, 0.5 )', width: 3}
                    )
                })
            }
        });
        this.geoVector = geoVector;
        this.openLayersMap = new Map({
            layers: [layer, geoVector],
            target: targetId,
            view: new View({
                center: this.getPos({lat: lat, log:log}).getCoordinates(),
                zoom: 13
            }),
            controls : []  //일반 컨트롤 기능 제거
        });

        this.openLayersMap.on('click', (evt)=>{
            this.openLayersMap.forEachFeatureAtPixel(evt.pixel, (f)=>{
                this.clicker = f;
                return true;
            });
            if (this.clicker != null) {
                if(calback){
                    console.log('use get method, you can get infomation param : _id, customTxt, customLat, customLog');
                    console.log('example : arg=>{arg.get("customTxt"), arg.get("_id")}');
                    calback(this.clicker);
                }
                this.clicker = null;
            } 
        });
        console.log('- 오픈레이어스');
        console.log('- 사용 가능한 함수 \n1.addMark(위,경,텍스트,옵션), 반환:id\n2.removeWithId(아이디), 반환:X,\n3.removePop(), 반환:X,\n4.clickEventer(람다), 반환:X\n5.getIdList(), 반환:아이디목록\n6.openLayersMap(), 반환:기준객체');
        console.log("  * addMark 옵션 : var option = { font_size : 13, font_color : 'rgba( 255, 202, 202, 0.36)' }");
        console.log("  * clickEventer 람다 : clickEventer( event=>{console.log(event, event.get('customTxt'))}) ");
    }

    addHtmlMark(lat : number, log : number, target : string) : void {
        this.valid({lat: lat, log:log});        
        const element = document.createElement('div')
        element.className = 'beautifulArea';
        element.innerHTML = "<div>"+target+"</div";
        element.onclick = ()=>{
            console.log(target);
        }
        var marker = new Overlay({
            position: this.getPos({lat: lat, log: log}).getCoordinates(),
            positioning: 'center-center',
            element: element,
            stopEvent: false
        });
        this.openLayersMap.addOverlay(marker);

        this.openLayersMap.getView().animate({
            center: this.getPos({lat: lat, log:log}).getCoordinates(),
            duration: 982
        })        
    }


    addMark (lat : number, log : number, text : string, option : any) : string{
        let idx = randomString(50);
        this.valid({lat: lat, log:log});
        if(!option) option = {}
        if(!option.font_size) option.font_size = 12;     
        if(!option.font_color) option.font_color = 'rgba( 52, 52, 52  , 0.9)';      
        if(!option.font_background_color) option.font_background_color = 'rgba( 255, 255, 255 , 0.9)';            
        if(!option.font_background_stroke) option.font_background_stroke = 2;            
        if(!option.font_background_stroke_color) option.font_background_stroke_color = 'rgba( 52, 52, 52  , 0.9)';            
        if(!option.bg_color) option.bg_color = 'rgba( 52, 52, 52  , 0.9)';         

        let pnt = this.getPos({lat: lat, log:log});  //위경도를 오픈레이어스에서 사용중인 값으로 변환
        let createStyle = ()=>{
            return new Style({
               /* image: new Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    crossOrigin: 'anonymous',
                    src: 'img/2.png',
                    scale: 0.5
                }),*/
                text: new Text({  //텍스트
                    anchor: [0.5, 0.5],
                    text: text,
                    fill : new Fill({ color: option.font_color }),
                    backgroundStroke :  new Stroke( {color:option.font_background_stroke_color, width: option.font_background_stroke} ),
                    backgroundFill: new Fill({color: option.font_background_color }),
                    padding: [4, 10, 4, 10],
                    textBaseline: 'bottom',
                    textAlign: 'center',
                    offsetY: -12,
                    font: 'bold '+option.font_size + 'px roboto,sans-serif'
                })
            });
        }
    
        let iconFeature  = new Feature(pnt); //구조체로 형성
        iconFeature.setStyle(createStyle());
        iconFeature.set('_id', idx);
        iconFeature.set('customTxt', text);
        iconFeature.set('customLat', lat);
        iconFeature.set('customLog', log);
    
        let vectorSource = new VectorSource({
            projection: 'EPSG:4326',
            features: [iconFeature]
        }); //새로운 벡터 생성
    
        let iconLayer = new VectorLayer({  //추가할 벡터레이어
            source: vectorSource,
            customTxt: text,
            customLat: lat,
            customLog: log,
            _id: idx
        });
        this.openLayersMap.addLayer(iconLayer); //만들어진 벡터를 추가    
        this.openLayersMap.getView().animate({
            center: this.getPos({lat: lat, log:log}).getCoordinates(),
            duration: 982
        })
        SrokOL.IdList.push(idx);  
        return idx;
    }

    moveCenter(lat : number, log : number, duration? : number) : void{
        if(!duration) duration = 982
        this.valid({lat: lat, log:log});   
        this.openLayersMap.getView().animate({
            center: this.getPos({lat: lat, log:log}).getCoordinates(),
            duration: duration
        })
    }

    removeWithId(_id : string) : void{
        let removeTarget = -1;
        this.openLayersMap.getLayers().forEach(function (data, index) {
            console.log(index, data);
            if (data.get('_id') && data.get('_id') === _id) {
                removeTarget = index;
            }
        })
        if (removeTarget != -1) {
            this.openLayersMap.getLayers().removeAt(removeTarget)
            removeA(SrokOL.IdList,_id)
        }
    }
    
    removePop() : void{
        if(this.openLayersMap.getLayers().array_.length > 2){
            this.openLayersMap.getLayers().pop();
            SrokOL.IdList.pop();
        }
    }

    //지도 배경색과 스타일을 변경 합니다.
    setGeoStyle(arg : any, arg2 : any, arg3 : any) : void{
        this.geoVector.setStyle(new Style({
            stroke: new Stroke(
                {color: arg2, width: arg3}
            ),
            fill: new Fill({ color: arg })
        }))
    }
    
    private getPos(pos : position) : any{
        return new point([pos.lat, pos.log]).transform('EPSG:4326', 'EPSG:3857')
    }

    //좌표값에 대한 유효성을 검사 합니다.
    private valid(pos : position) : void{
        if(!pos || !pos.lat || !pos.log) {
            throw new Error('latitude and longitude could not empty');
        }
        if(isNaN(pos.lat) || isNaN(pos.log)) {
            throw new Error('latitude and longitude could not String, please insert Float type number ');
        }
    }

}

/**
 * 오픈 레이어스 객체 받는 함수
 */
module.exports.openLayersMap = function () {
    return srokClass.openLayersMap;
};

/**
 * 초기화 함수
 */
module.exports.init = function (targetId, lat, log) {  //전달!
    srokClass = new SrokOL(targetId, lat, log);
}


/**
 * 테스트 지오 백터
 */
module.exports.setGeoStyle = function (arg, arg2, arg3) {  //전달!
    srokClass.setGeoStyle(arg, arg2, arg3);
}

/**
 * 좌표를 마킹하는 함수 
 */
module.exports.addMark = function (lat, log, text, option) {
    return srokClass.addMark(lat, log, text, option) ;
}


/**
 * 좌표를 HTML 형식으로마킹하는 함수 
 */
module.exports.addHtmlMark = function (lat, log, text) {
    srokClass.addHtmlMark(lat, log, text) ;
}


/**
 * 중앙 이동 함수
 */
module.exports.moveCenter = function(lat, log, duration){
    srokClass.moveCenter(lat, log, duration)
}

/***
 * 대상 아이디를 삭제 하는 함수.
 */
module.exports.removeWithId = function (_id) {
    srokClass.removeWithId(_id)
}

/***
 * 가장 마지막 아이디를 삭제하는 함수
 */
module.exports.removePop = function () {
    srokClass.removePop()
}

/**
 * 클릭 이벤트 콜백함수를 받는 함수
 */
module.exports.clickEventer = function (arg) {
    calback = arg;
};

/**
 * 삭제할 아이디 리스트를 받는 함수
 */
module.exports.getIdList = function () {
    return SrokOL.IdList;
};

//내부용 함수 ------------------------------------------------------------------------

//랜덤 스트링~
function randomString(length) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

//배열에서 값 제거
function removeA(arr, what) {
    let a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
