var fileName  = "";
var photoPath = ""; //  이미지 경로 저장 전역 변수
var orgFileNm = "";
var apkPath = ["/sdcard/Download/LotteHomeShopping.apk","/sdcard/Download/LotteHomeShopping_dev.apk"];//다운받은 apk파일 삭제
var createFolders = ".myNote/";
var imagefail = 0;
var index = 0;

function onDeviceReady(){
	//createFolder(createFolders);
}
/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 14.
 * @What  : 탭 back button 클릭시 
 * @param : 
 * 
 */
function backBtnFunc(callback){
	document.addEventListener("backbutton", callback, true);
}
function exitFunc(){
	var mess="어플 종료 하시겠습니까?";
	try{
		setConfirm(mess,function(btnIndex){
				if(btnIndex==1){
					navigator.app.exitApp();
				}
			},"알림","예","아니요");
	}catch(e){
	}
}
/**
*
*
* @Auth  : HUANGMINGQI
* @Date  : 2014. 08. 15.
* @What  : gps좌표 받기
* @param : 
*
*/
function getCurrent(onSuccess,onError){
	//alert(333);
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 사진찍기
 * @param : 
 * 
 */
function takePhoto(inde){
	 index = inde;
	 navigator.camera.getPicture(onSuccessPic,onFailPic,
					{quality:30,
					encodingType: Camera.EncodingType.JPEG,
					correctOrientation:true,
					targetWidth: 1024,
					targetHeight: 768,
					sourceType : Camera.PictureSourceType.CAMERA, 
					destinationType:Camera.DestinationType.FILE_URI
					});
}
/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 앨범에서 사진 가져오기
 * @param : 
 * 
 */
function getPhoto(){
	navigator.camera.getPicture(
		onSuccessPicFromAlbum,
		onFailPic,
		{
			quality : 30,
			destinationType : navigator.camera.DestinationType.FILE_URL,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
			mediaType : navigator.camera.MediaType.PHOTO
		}
	);
}

/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : http방식 사진 업로드
 * @param : atchFilePath --> 사진경로
 * 
 */
function httpConfirm(atchFilePath){
	setConfirm("업로드 하시겠습니까?",function(btnIndex){
		if(btnIndex==1){
			httpUpload(atchFilePath);
		}
	},"확인","예","아니요");
}


/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 앨범에서 사진 가져오기 성공 콜백
 * @param : imageURI --> 사진경로
 * 
 */
function onSuccessPicFromAlbum(imageURI){
	var atchFilePath = "";
	window.resolveLocalFileSystemURI(imageURI,
		function(entry){
			doFile(2,entry.toURL());
		},		
		function(err) {
			if(err.code == 1){
				setalert("해당파일이 존재하지 않습니다.");
			}else{
				console.log(err.code);
			}
		}
	);
}

/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 사진찍기 성공 콜백
 * @param : imageURI --> 사진경로
 * 
 */
function onSuccessPic(imageURL){
	//사진 찍은 후 cache에 있는 사진 파일을 지정폴더에 복사
	doFile(index,imageURL);
}

/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 사진찍기 및 앨범에서 사진가져오기 실패시 콜백
 * @param : message --> 실패시 error 내용
 * 
 */
function onFailPic(message){
	$("#imagesrc").attr("src", "");
}


/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : http방식 파일 업로드
 * @param : imageURI --> 파일경로
 * 
 */
function httpUpload(imageURI) {
	try{
	var dir = imageURI.replace("file://","");
	}catch(e){
	var dir = imageURI;
	}
	var orgiName = dir.substring(dir.lastIndexOf("/")+1);
    //fileName = createFileName(orgiName);
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=orgiName;
	options.mimeType="image/jpeg";
    
	var params = {};
        params.filePath = imageURI;
        params.fileDir  = remoteFoldPath();
		params.fileSaveName = orgiName;
		params.fileTime = getymdhisx();
		//alert(JSON.stringify(params));
    options.params = params;
	var ft = new FileTransfer();
	//운영접속시 임시 파일은 개발바라본다
	ft.upload(dir,
		encodeURI(serverAddress+"/fileUpload.do"), 
		function(r){//성공시
			console.log("upload SUCCESS");
			//alert(JSON.stringify(r));
		}, 
		function(error){//실패시
			if(imagefail < 2){
				httpUpload(imageURI);
				imagefail++;
			}else{
				console.log("upload FAIL");
				imagefail = 0;
				setAlert("이미지 등록에 실패했습니다.");
				return false;
			}
			//alert(JSON.stringify(error));
		}, 
		options
	);		
}

/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : http방식 파일 다운로드
 * @param : filePath --> 파일경로
 * 
 */
function downloadFile(filePath){
	var fileTransfer = new FileTransfer();
	var localPath = "/storage/sdcard0/"+getFoldPath()+filePath.substring(filePath.lastIndexOf("/")+1);
	var uri = encodeURI(filePath);
	fileTransfer.download(
		uri,
	    localPath,
		function(entry) {
			window.plugin.refreshGallery();
			console.log("download complete: " + entry.fullPath);
			$("#imagesrc").attr("src", entry.fullPath);
			$("#imagesrc").attr("style", "width: 500px; height: 340px; margin-top:0px");
		},
		function(error) {
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
		}
	);
}


/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 캐시에 있는 파일 지정 폴더로 복사
 * @param : m_imageURI --> 파일경로
 * 
 */
function doFile(index,m_imageURI){

    fileName = createFileName();
	
	//전환 실패시
	var onFileFail = function(error){
		//console.log("error code: "+error.code+","+FileError.PATH_EXISTS_ERR);
		return false;
	};//end onFileFail
	var resolveFSU =    function(fileEntry){
		var reqFS = function(fileSystem){
			var oper = function( parent ){
					//파일 복사
					var copyFile = function(){
						 console.log("Copy OK: "+ parent.fullPath+  fileName );
						 photoPath = "/sdcard"+parent.fullPath +  fileName;
						 $(".showimg").eq(index).attr("src",photoPath).attr("data-src",photoPath).addClass("longImg");
							//갤러리 refresh
						// window.plugin.refreshGallery();
					    }//end copyFile
					fileEntry.copyTo(parent, fileName,copyFile,onFileFail);
			};//end oper
			fileSystem.root.getDirectory("/storage/sdcard0/"+createFolders, {create: true}, oper,onFileFail);
		};//end reqFS
		window.requestFileSystem(LocalFileSystem.PERSISTENT,0,reqFS ,onFileFail);
	};//end resolveFSU
	window.resolveLocalFileSystemURI(m_imageURI,resolveFSU,onFileFail);
}
/**
 * 
 * 
 * @Auth  : HUANGMINGQI
 * @Date  : 2014. 01. 07.
 * @What  : 파일명 생성
 * @param : orgiName --> 파일 원명
 * 
 */
function createFileName(){
    return getymdhisx()+".jpg";
}

//원격 폴더 경로
function remoteFoldPath(){
  return getFoldPath().replace("LotteHomeShopping","");
}

//파일 삭제
function removeLocalFile(){
	  for(var i=0;i<apkPath.length;i++){
		  var apkss = apkPath[i];
	   try{
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function(fileSystem){
				fileSystem.root.getFile(apkss, {create:false}, function(f) {
					f.remove(function() {
						//servicetoast("삭제 성공");
					});
				}, function(){
					
					//servicetoast("remove file err");
				});
			}, function(){
					//servicetoast("require file system err");
			});
		}catch(e){
			//servicetoast("apk 삭제 err");
					  //######console.log("apk 삭제 err");
		}
	  }
}

//폴더 없을시 생성
function createFolder(path){
		var pathArr = path.split("/");
		var newFolder = "";
		try
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fileSystem){
								 for(var i=0;i<pathArr.length-1;i++){
								 newFolder += pathArr[i]+"/";
								 //alert(newFolder.substring(0,newFolder.length-1));
								 fileSystem.root.getDirectory(newFolder.substring(0,newFolder.length-1), {create: true},
									 function(){
										console.log("fold create");
									 },
									 function(){
										console.log("fold fail")
									}
								 );
								 }
								 });	
		}
		catch (e)
		{
		console.log("try err");
		}
}

function hasFile(fileName){
	//var isFile = false;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getDirectory(getFoldPath(), {create : false,exclusive : false}, function(newFile){
			newFile.getFile(fileName, {create : false,exclusive : false}, function(file){
				//alert(file);
				setLocal("hasFile","0");
			}, function(){
				setLocal("hasFile","1");
			});
		},function(){
			setLocal("hasFile","1");
		});
	},function(){
		setLocal("hasFile","1");
	});
}

function getFoldPath(){
	if(menuType=='0'){
		var foldPath = "LotteHomeShopping/qm/qm07/";  //A1
	}else if(menuType=='1'){
		var foldPath = "LotteHomeShopping/qm/qm07/wms/"; //WMS
	}

	return foldPath;
}