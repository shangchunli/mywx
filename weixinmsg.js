const formatMsg = require('./fmtwxmsg');

function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}

//处理用户发过来的消息
//第一个参数是解析后的用户消息，
//第二个参数是要返回的消息对象
//基本处理过程：根据用户发过来的消息判断消息类型并进行处理
function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
   //关键词自动回复
    if (wxmsg.MsgType == 'text') {

        retmsg.msgtype='text';//设置要返回的消息类型为text
        // switch(){
        //     case 'help':
        //     case '?':
        //     case '? ':
        //     case '帮助':
        //         retmsg.msg=help();
        //         return formatMsg(retmsg);//格式化消息并返回
        //     case 'about':
        //         retmsg.msg='我是这个测试号的开发者';
        //         return formatMsg(retmsg);
        //     default:
        //         //非关键词原样返回
        //         retmsg.msg=wxmsg.Content;
        //         return formatMsg(retmsg);
        // }


        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        }else if(wxmsg.Content == 'who'){
            retmsg.msg = '开发者信息：尚春丽 2017011672 2017级1班';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if(wxmsg.Content=='about'){
            retmsg.msg='我是这个测试号的开发者';
            retmsg.msgtype='text';
            return formatMsg(retmsg);
        }else {
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                //因为消息类型不为空，所以会返回默认的文本信息
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

