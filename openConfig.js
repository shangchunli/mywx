const titbit=require('titbit');

const ceyto=require('crypto');

const xmlparse=require('xml2js').parseString; 

var app=new titbit();
var {router}=app;
0
router.get('/wx/msg',async c=>{
    var token='msgtalk';
    var urlargs=[
        c.query.nonce,//随机数
        c.query.timestamp,//时间戳
        token
    ];
    urlargs.sort();//字典排序

    var onestr=urlargs.join('');//拼接成一个字符串
    var hash = crypto.createHash('sha1');
    var sign = hash.update(onestr);//设置要进行加密处理的数据
		
    if (c.query.signature === sign.digest('hex')) {
        c.res.body = c.query.echostr;
    }
});
router.post('/wx/msg',async c=>{
    try{
        let data=await new Promise((rv,rj)=>{
            xmlparse(c.body,{explicitArray:false},(err,result)=>{
                if(err){
                    rj(err);
                }
                else{
                    rv(result.xml);
                }
            })
        })

        if(data.MsgType!=='text'){
            return ;
        }
        //按照公众平台开放文档格式化消息字符串
        let reText=`
            <xml>
                <fromUserName>$(data.ToUserName)</fromUserName>
                <ToUserName>$(data.fromUserName)</ToUserName>
                <MsgType><![CDATA[Text]]></MsgType>
                <Content>$(data.Content></Content>
                <CreateTime>${parseInt(Date.now()/1000)}</CreateTime>
            </xml>
            ;
            `
            c.res.body=reText;//返回消息
    }catch(err){
        console.log(err);
    }
})

app.run(8002, 'localhost');