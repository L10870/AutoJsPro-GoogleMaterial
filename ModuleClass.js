function RandomName() {
    var item1 = ["赵", "萧", "梁", "胡", "谢", "曹", "袁", "傅", "彭", "蒋", "蔡", "魏", "薛", "阎", "潘", "戴", "夏", "姜", "姚", "邹", "熊",
        "郝", "秦蒋", "邵", "侯", "段", "武", "赖", "龚", "奥", "夏侯", "诸葛", "上官", "欧阳", "尉迟", "公孙", "岳", "墨", "琴", "涂",
        "温", "匡", "余", "余", "温", "景", "庄", "庄", "燕", "司马", "景", "马", "伊", "樊", "朱", "冯", "雷", "范", "穆", "麒", "安",
        "布", "卜", "白", "拜", "鲍", "庹", "崔", "程", "晨", "迟", "常", "车", "翟", "窦", "狄", "费", "范", "郭", "葛", "恭", "霍", "孔",
        "柯", "骆", "苗", "孟", "潘", "乔", "屠", "邰", "谭", "巫", "翁", "徐", "肖", "萧", "夏", "袁", "章", "童"
    ]
    var item2 = ["雷", "琳", "甜", "琪", "茂", "莆", "倩", "祥", "霞", "莠", "唇", "汝", "瑞", "妮", "莫", "终", "慧", "诗", "雯", "鸿", "乔",
        "雪", "君", "雅", "森", "沐", "淮", "莉", "淑", "申", "双", "霆", "媛", "熙", "彩", "瀚", "幽", "桦", "逸", "智", "鑫", "鹏",
        "顾", "玮", "益", "轩", "明", "琪", "兴", "旺", "泉", "诚", "秋", "生", "骏", "晶", "然", "怡", "蓉", "淳", "宇", "玉", "志",
        "麻", "宏", "静", "萱", "楚", "茵", "迪", "卡", "辉", "苑", "博", "新", "豪", "炫", "翰", "豪", "睿", "渊", "昊", "宸", "博", "哲"
    ]
    var item3 = ["敢", "款", "淦", "筐", "贵", "辜", "凯", "植", "奠", "捷", "掎", "探", "敦", "智", "棠", "淘", "淡", "焦", "婷",
        "荔", "轸", "迦", "钧", "婷", "喋", "塘", "塔", "暖", "楠", "幄", "涯", "焰", "雁", "雅", "雯", "喻", "宸", "瓿", "霞",
        "婺", "琬", "博", "棉", "涵", "淼", "淮", "番", "徨", "惠", "斑", "酣", "邯", "媚", "彬", "棠", "磊", "梅", "晴", "惠"
    ]
    var item1 = item1[Math.floor(Math.random() * item1.length)];
    var item2 = item2[Math.floor(Math.random() * item2.length)];
    var item3 = item3[Math.floor(Math.random() * item3.length)];
    var Name = item1 + item2 + item3;
    return Name; //随机取姓名
}
//字符串判断
function StringJudgment(array, trrs) {
    //var strss=/+trrs+/;
    array = array.split(trrs);
    if (array.length == 1)
        return false;
    else
        return true;
}
//模拟人工点击
function clickView(view) {
    //log(arguments.callee.name + '开始')
    //log(view)
    //随机数2-5
    try {
        if (view) {
            var x = view.bounds().centerX()
            var y = view.bounds().centerY()
            //log('将要点击的坐标x:' + x + "y:" + y);
            GetSleepNumbor();
            press(x, y, 10);
        } else {
            return false;
        }
    } catch (e) {
        dialogs.alert(e);
        return false;
    }
    return true;
}
//等待函数
function GetSleepNumbor() {
    var sleepNumber = random(Integer.valueOf(SleepString.split("-")[0]), Integer.valueOf(SleepString.split("-")[1]));
    //floatyLog(sleepNumber + "ms");
    sleep(sleepNumber);
}
//自定义等待
function CustomSleepNumbor(SleepText) {
    var sleepNumber = random(Integer.valueOf(SleepText.split("-")[0]), Integer.valueOf(SleepText.split("-")[1]));
    floatyLog("等待" + sleepNumber + "ms");
    sleep(sleepNumber);
}

// 获取随机字符
function randomRange(min, max) {
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
}

// 返回当前APP
function backAPP() {
    app.launchPackage(context.getPackageName());
}

//字符串去掉特殊字符
function stripscript(String) {
    let charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    var StringSplit = "";
    for (var i = 0; i < String.length; i++) {
        if (StringJudgment(charStr, String[i])) {
            StringSplit += String[i];
        } else {
            StringSplit += "_";
        }
    }
    return StringSplit;
}
//Json转String
function JsoninString(j) {
    try {
        return JSON.stringify(j);
    } catch (r) {
        return false;
    }
}
//字符串去掉除数字外所有字符
function GetNumbor(String) {
    let charStr = '0123456789';
    var StringSplit = "";
    for (var i = 0; i < String.length; i++) {
        if (StringJudgment(charStr, String[i])) {
            StringSplit += String[i];
        } else {
            StringSplit += "";
        }
    }
    return StringSplit;
}
//遍历所有子控件
function ChildLookControls(Layout, Condition) {
    var View = false;
    for (var i = 0; i < Layout.childCount(); i++) {
        var view = Layout.child(i);
        var Exists = true;
        for (Name in Condition) {
            switch (typeof view[Name]) {
                case "function":
                    if (!StringJudgment(view[Name]() + '', Condition[Name])) {
                        Exists = false;
                    }
                    break;
                default:
                    if (!StringJudgment(view[Name] + '', Condition[Name])) {
                        Exists = false;
                    }
                    break;
            }
        }
        if (Exists != false) {
            return view;
        }
        View = ChildLookControls(view, Condition);
        if (View != false) {
            return View;
        }
    }
    return false;
}

function AttrJudgment(data_str, data_stri) { //数组判断
    for (var i = 0; i < data_str.length; i++) {
        if (data_str[i] == data_stri) {
            var p = true;
            break;
        } else
            var p = false;
    }
    return p;
    //log(p);
}
// 获取随机字母
function RandomChar(min, max) {
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
}
// 获取随机数字
function Randomint(min, max) {
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        charStr = '0123456789';
    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
}


function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    }
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
}
//仿真随机带曲线滑动
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    }

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    }
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    }
    var dx3 = {
        "x": zx,
        "y": zy
    }
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    }
    //log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    //log(xxy);
    gesture.apply(null, xxy);
}
//从后往前取日志
function ScriptLog(Numbor) {
    const LogFilePath = console.getGlobalLogConfig().file;
    const LogList = files.read(LogFilePath).split("\n");
    var ConsoleList = [];
    for (var i = LogList.length - 1; i >= 0; i--) {
        var ConsoleText = "";
        if (WhetherLogHead(LogList[i])) {
            for (var j = i; j < LogList.length; j++) {
                ConsoleText += LogList[j];
                if ((j + 1) >= LogList.length) {
                    break;
                }
                if (WhetherLogHead(LogList[j + 1])) {
                    break;
                }
            }
            ConsoleList[ConsoleList.length] = ConsoleText;
        }
        if (ConsoleList.length >= Numbor) {
            break;
        }
    }
    return ConsoleList.reverse();

    function WhetherLogHead(Text) {
        if (StringJudgment(Text, "/DEBUG") ||
            StringJudgment(Text, "/TRACE") ||
            StringJudgment(Text, "/ERROR") ||
            StringJudgment(Text, "/WARN") ||
            StringJudgment(Text, "/INFO")) {
            return true;
        }
        return false;
    }
}
/**
 * 删除图片文件后更新数据库  通知媒体库更新文件夹
 *
 * @param context
 * @param filepath 文件夹路径）
 */
function updateFileFromDatabase(context, filepath) {
    importClass(android.provider.MediaStore);
    var where = MediaStore.Audio.Media.DATA + " like \"" + filepath + "%" + "\"";
    var i = context.getContentResolver().delete(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, where, null);
    if (i > 0) {
        floatyLog("媒体库更新成功！");
    }
}
//往后寻找控件
function ClickParent(View, Init) {
    if (!View) {
        floatyLog("控件不存在!");
        return false;
    }
    if (!Init) {
        Init = 0;
    }
    if (Init >= 5) {
        floatyLog("点击失败。");
        return false;
    }
    if (View.click()) {
        //floatyLog("在父布局" + Init + "点击成功。");
    } else {
        Init++;
        if (View.parent() == null) {
            return false;
        }
        return ClickParent(View.parent(), Init);
    }
    return true;
}
//等待控件出现
function AnimationWaiting(fun, time, errint) {
    for (var i = 0; i < time * 5; i++) {
        if (fun()) {
            //log('寻找成功');
            return true;
        }
        if (i % 5 == 0 && i != 0) {
            floatyLog(i * 200 / 1000 + 's');
        }
        sleep(200);
    }
    floatyLog(errint);
    return false;
}

function AltText(max, may, maz) {
    var tun = max.split(may).join(maz);
    return tun;
}

function SystemFileManagement() {
    function SystemFileManagement() {
        this.ResultIntent = this.SystemResultIntent();
        //初始化监听
        this.ResultIntent.init();
    }
    //接收信息
    SystemFileManagement.prototype.SystemResultIntent = function() {
        return {
            intentCallback: {},
            init: function() {
                activity.getEventEmitter().on("activity_result", (requestCode, resultCode, data) => {
                    this.onActivityResult(requestCode, resultCode, data);
                });
            },
            startActivityForResult: function(intent, callback) {
                var i;
                for (i = 0; i < 65536; i++) {
                    if (!(i in this.intentCallback)) break;
                }
                if (i >= 65536) {
                    toast("启动Intent失败：同时请求的Intent过多");
                    return;
                }
                this.intentCallback[i] = callback;
                activity.startActivityForResult(intent, i);
            },
            onActivityResult: function(requestCode, resultCode, data) {
                var cb = this.intentCallback[requestCode];
                if (!cb) return;
                delete this.intentCallback[requestCode];
                cb(resultCode, data);
            }
        };
    }
    //链接转换
    SystemFileManagement.prototype.PathToUri = function(path) {
        return Uri.parse("content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fdata/document/primary%3A" + path.replace("/storage/emulated/0/", "").replace("/", "%2F"));
    }
    //获得访问data权限
    SystemFileManagement.prototype.PermissionDeclaration = function() {
        var uri = Uri.parse("content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fdata");
        var documentFile = DocumentFile.fromTreeUri(activity, uri);
        var intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION |
            Intent.FLAG_GRANT_WRITE_URI_PERMISSION |
            Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION |
            Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);

        intent.putExtra(DocumentsContract.EXTRA_INITIAL_URI, documentFile.getUri());
        activity.startActivityForResult(intent, 8000);
    }
    //使用系统文件管理选择文件
    SystemFileManagement.prototype.OpenPath = function(Path, FileType, fun) {
        var path = AltText(Path, '/', '%2f');
        var uri = Uri.parse("content://com.android.externalstorage.documents/document/primary:" + path);
        var intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(FileType); //想要展示的文件类型
        intent.putExtra(DocumentsContract.EXTRA_INITIAL_URI, uri);
        //app.startActivity(intent);
        this.ResultIntent.startActivityForResult(intent, function(resultCode, data) {
            if (resultCode != activity.RESULT_OK) return;
            fun(new SystemFileManagement().URIUtils_uriToFile(data.getData()));
        });
        //替换字符串
        function AltText(max, may, maz) {
            var tun = max.split(may).join(maz);
            return tun;
        }
    }
    //转换文件路径
    SystemFileManagement.prototype.URIUtils_uriToFile = function(uri) { //Source : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
        var r = null,
            cursor, column_index, selection = null,
            selectionArgs = null,
            isKitKat = android.os.Build.VERSION.SDK_INT >= 19,
            docs;
        if (uri.getScheme().equalsIgnoreCase("content")) {
            if (isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)) {
                if (String(uri.getAuthority()) == "com.android.externalstorage.documents") {
                    docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                    if (docs[0] == "primary") {
                        return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
                    }
                } else if (String(uri.getAuthority()) == "com.android.providers.downloads.documents") {
                    uri = android.content.ContentUris.withAppendedId(
                        android.net.Uri.parse("content://downloads/public_downloads"),
                        parseInt(android.provider.DocumentsContract.getDocumentId(uri))
                    );
                } else if (String(uri.getAuthority()) == "com.android.providers.media.documents") {
                    docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                    if (docs[0] == "image") {
                        uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                    } else if (docs[0] == "video") {
                        uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                    } else if (docs[0] == "audio") {
                        uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                    }
                    selection = "_id=?";
                    selectionArgs = [docs[1]];
                }
            }
            try {
                cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
                if (cursor && cursor.moveToFirst()) {
                    r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
                }
            } catch (e) {
                log(e)
            }
            if (cursor) cursor.close();
            return r;
        } else if (uri.getScheme().equalsIgnoreCase("file")) {
            return String(uri.getPath());
        }
        return null;
    }
    return new SystemFileManagement;
}


module.exports = this;