var ActiveT={
	openDB:window.openDatabase("myIonic","1.0","IONIC DATABASE",1000000),	
	createT:function(){
		var createD = function(tx){
			tx.executeSql('DROP TABLE IF EXISTS myIonicDb');
			tx.executeSql('CREATE TABLE IF NOT EXISTS myIonicDb (ID integer primary key autoincrement,DATE,DELYN,ETC1,ETC2,ETC3,ETC4,ETC5)');
		};
		ActiveT.openDB.transaction(createD,ActiveT.errorT,ActiveT.createSuccessT);
	},
	insertT:function(DATE,DELYN,ETC1,ETC2,ETC3,ETC4,ETC5){
		//카운트를 먼저 하고
		//없으면 인서트 있으면 업데이트
		try
		{
		//	ActiveT.deleteT(a,b,c);
		}
		catch (e)
		{
		}
		var insertDB = function(tx){
			
			var qu="INSERT INTO myIonicDb (DATE,DELYN,ETC1,ETC2,ETC3,ETC4,ETC5) "+
				" VALUES ('"+DATE+"','"+DELYN+"','"+ETC1+"','"+ETC2+"','"+ETC3+"','"+ETC4+"','"+ETC5+"')";
			tx.executeSql(qu);
		};
		ActiveT.openDB.transaction(insertDB,ActiveT.errorT,ActiveT.inserSuccessT);
	},
	updateOneT:function(id){
		var updateDB = function(tx){
			tx.executeSql("UPDATE myIonicDb SET DELYN='Y' WHERE ID='"+id+"'");
		};
		ActiveT.openDB.transaction(updateDB,ActiveT.errorT,ActiveT.successT);
	},
	updateT:function(data){
		var updateDB = function(tx){
			tx.executeSql("UPDATE myIonicDb SET SOMETHING='"+data.title+"', PRICE='"+data.price+"'  WHERE ID='"+data.id+"'");
		};
		ActiveT.openDB.transaction(updateDB,ActiveT.errorT,ActiveT.successT);
	},
	
	deleteT:function(etc2){
		var selectDB = function(tx){
			tx.executeSql("DELETE FROM myIonicDb WHERE  ETC2='"+etc2+"' ",[],ActiveT.successT,ActiveT.errorT);
		};
		ActiveT.openDB.transaction(selectDB,ActiveT.errorT);
	},
	
	selectT:function(cb,etc2){
		var selectDB = function(tx){
			var qu="SELECT * FROM myIonicDb WHERE DELYN='N' AND ETC2='"+etc2+"'";
			tx.executeSql(qu,[],cb,ActiveT.errorT);
		};
		ActiveT.openDB.transaction(selectDB,ActiveT.errorT);
	},
	/*
	selectTone:function(cb,wk_date){
		var selectDB = function(tx){
			var qu="SELECT MAX(ID) ID FROM myIonicDb WHERE DELYN='N' AND DATE='"+wk_date+"'";
			console.log(qu);
			tx.executeSql(qu,[],cb,ActiveT.errorT);
		};
		ActiveT.openDB.transaction(selectDB,ActiveT.errorT);
	},
	selectTmonth:function(cb,wk_date){
		var selectDB = function(tx){
			var qu="SELECT * FROM myIonicDb WHERE DELYN='N' AND DATE like '%"+wk_date+"%'";
			console.log(qu);
			tx.executeSql(qu,[],cb,ActiveT.errorT);
		};
		ActiveT.openDB.transaction(selectDB,ActiveT.errorT);
	},
	*/
	errorT:function(err){
		console.log("Error processing SQL: "+JSON.stringify(err));
	},
	successT:function(){
		//console.log(" ActiveT 쿼리데이타");
	}
	,
	createSuccessT:function(){
		//console.log(" ActiveT 쿼리데이타");
		setLocalStorage("myIonicDb",1);
	},
	inserSuccessT:function(){
	
	}
};