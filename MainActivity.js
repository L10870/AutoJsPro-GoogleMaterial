"ui";
importClass(android.graphics.Rect);
importClass(java.lang.Integer);
importClass(android.app.Instrumentation);
importClass(android.graphics.Color);
importClass(android.content.res.ColorStateList);
importClass(android.text.TextWatcher);
importClass(com.google.android.material.snackbar.Snackbar);
importClass(android.view.View);
importClass(android.content.DialogInterface);
importClass(android.content.Context);
importClass(android.view.ViewGroup);
importClass(android.widget.BaseAdapter);
importClass(android.widget.ImageView);
importClass(android.os.Bundle);
importClass(android.widget.AdapterViewFlipper);
importClass(android.widget.Button);
importClass(android.widget.CompoundButton);
importClass(android.animation.ObjectAnimator)
importClass(android.view.animation.AlphaAnimation);
importClass(android.view.animation.Animation);
importClass(android.view.animation.AnimationUtils);
importClass(android.view.animation.ScaleAnimation);
importClass(android.view.animation.TranslateAnimation);
importClass(android.animation.AnimatorListenerAdapter);
importClass(android.animation.ValueAnimator);
importClass(android.animation.AnimatorSet);
importClass(android.view.animation.LayoutAnimationController);
importClass(android.view.animation.AnimationSet);
importClass(android.view.ViewTreeObserver);
importClass(android.net.Uri);
importClass(android.content.res.Configuration);
importClass(android.app.UiModeManager);
importClass(android.provider.DocumentsContract);
importClass(Packages.androidx.documentfile.provider.DocumentFile);
importClass(java.nio.ByteBuffer);
importClass(com.google.android.material.dialog.MaterialAlertDialogBuilder)
importClass(com.google.android.material.slider.Slider);
//控件监听
var ControlClass = require('./ControlClass.js');
var ModuleClass = require('./ModuleClass.js');
var Storage = storages.create("App");
let androidx = Packages.androidx;
var ThemeColors = null;
var FloatyLog = new GeneralFloatyLog();



function ActivityMain() {
    ThemeColors = Storage.get("ThemeColors") || "#0061A6";
    $dialogs.setDefaultDialogType("foreground-or-overlay");
    activity.setTheme(com.google.android.material.R$style.Theme_Material3_Light);
    //activity.theme.applyStyle(ui.R.style["Base.V14.Theme.Material3.Dark"], true);
    //导航栏颜色
    activity.getWindow().setNavigationBarColor(Color.parseColor("#E8EFF7"));
    //通知栏颜色
    ui.statusBarColor("#fafafa");
    ControlClass.StatusBarTransparency();
    ui.layout(files.read("src/layout/activity_main.xml"));
    UiOnClickListenerinit();
    ControlClass.Cacheinit();

    function UiOnClickListenerinit() {
        ControlClass.Navigationinit();
        ControlClass.DayWordinit();
        ControlClass.ChangeViewColor();

        //viewpager_tab未封装
        //设置滑动页面的标题
        ui.viewpager_tab.setTitles(["Item列表", "各种控件", "下拉刷新", "日志"]);
        /*ui.viewpager_tab.setOnTouchListener(new android.view.View.OnTouchListener({
            onTouch: function() {
                return true;
            }
        }))*/
        //log(ui.viewpager_tab.setOnTouchEvent)
        //让滑动页面和标签栏联动
        ui.TabLayout.setupWithViewPager(ui.viewpager_tab);


        //upWithDrawer未封装
        //ui.toolbar.setupWithDrawer(ui.drawer);
        // 配置ToolBar左上角点击时打开侧拉菜单
        var toggle = new androidx.appcompat.app.ActionBarDrawerToggle(activity, ui.drawer, ui.toolbar, ui.R.string.openDrawerContentDesc, 0);
        toggle.syncState();
        //设置按钮旋转动画
        ui.drawer.addDrawerListener(toggle);

        /*
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.id_drawer_layout);
        //左侧按钮 旋转
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawer,
        toolbar,
        R.string.openDrawerContentDesc, R.string.closeDrawerContentDesc);
        drawer.addDrawerListener(toggle);
        toggle.syncState();//同步状态
        */


        /*
        var ToneMonitoringThreads = SystemToneMonitoring(function(DarkPattern) {
            if (DarkPattern) {
                toast("暗色模式");
            } else {
                toast("亮色模式");
            }
        });
        */

        /*
        activity.onConfigurationChanged(
            new android.content.res.Configuration
        );/*function(newConfig) {
            //super.onConfigurationChanged(newConfig);
        });
        */




        //监听深色模式
        function SystemToneMonitoring(Function) {
            function Monitoring() {
                var PrimaryState = null;
                while (true) {
                    //深色模式的值为:0x21
                    //浅色模式的值为:0x11
                    var ColorPattern = context.getApplicationContext().getResources().getConfiguration().uiMode == 0x21;
                    if (ColorPattern != PrimaryState) {
                        Function(ColorPattern);
                        PrimaryState = ColorPattern;
                    }
                    sleep(3000);
                }
            }
            return threads.start(Monitoring);
        }




        var a = true;
        ui.ButtomSheet.on("click", function() {
            if (a) {
                ui.StartButton.hide()
                a = false
            } else {
                ui.StartButton.show()
                a = true
            }
            //toast(666)
            /*
            importClass(com.google.android.material.bottomsheet.BottomSheetBehavior);
            var behavior = BottomSheetBehavior.from(ui.viewpager);
            
            
            function GetLogDiaLogLayout() {
                return ui.inflate(files.read("src/layout/activity_Dialog_Log.xml"));
            }*/
        });

        //下拉刷新事件
        ui.swipe.setOnRefreshListener({
            onRefresh: function() {
                //改变控件状态
                ui.swipe.setRefreshing(false);
                Snackbar.make(ui.CoordinatorLayout, "我刷新了", Snackbar.LENGTH_SHORT).show();
            }
        });
        //设置圆形进度条大小
        //ui.swipe.setSize(50);
        //设置下拉多少距离之后开始刷新数据
        ui.swipe.setDistanceToTriggerSync(30);
        //获取进度条进度
        ui.CircularProgressIndicator_indeterminate_false.getProgress();
        //设置进度条进度
        ui.CircularProgressIndicator_indeterminate_false.setProgress(90);

        ui.LinearProgressIndicator_indeterminate_false.setProgress(70);


        //item未封装
        var items = [];
        for (var i = 0; i < 50; i++) {
            items[items.length] = {
                "Account": ModuleClass.RandomName(),
                "Password": ModuleClass.RandomChar(10, 12)
            }
        }
        //传入参数并且禁用自动数组监听模式
        //ui.ListView.setDataSource(items, false);

        ui.ListView.setDataSource(items);

        ui.ListView.on("item_bind", function(itemView, itemHolder) {
            itemView.ListButton.setOnClickListener(new View.OnClickListener({
                onClick: function(View) {
                    let item = itemHolder.item;
                    Snackbar.make(ui.CoordinatorLayout, "已经复制分享信息", Snackbar.LENGTH_SHORT).show();
                }
            }));
            itemView.ListButton.setOnLongClickListener(new View.OnLongClickListener({
                onLongClick: function(View) {
                    let item = itemHolder.item;
                    var popupMenu = new androidx.appcompat.widget.PopupMenu(activity, itemView.Account);
                    //log(popupMenu.setPopupBackground)
                    var menu = popupMenu.getMenu();
                    menu.add("修改");
                    menu.add("删除");
                    //log(menu.setPopupBackground)
                    popupMenu.setOnMenuItemClickListener(new androidx.appcompat.widget.PopupMenu.OnMenuItemClickListener({
                        onMenuItemClick: function(item) {
                            switch (item.getTitle()) {
                                case "修改":
                                    break;
                                case "删除":
                                    toast(itemHolder.position)
                                    items.splice(itemHolder.position, 1);
                                    // 手动通知列表在该位置有一条数据删除
                                    //ui.ListView.adapter.notifyItemRemoved(itemHolder.position);
                                    break;
                                default:
                                    Snackbar.make(ui.CoordinatorLayout, item.getTitle(), Snackbar.LENGTH_SHORT).show();
                                    break;
                            }
                            return true;
                        }
                    }));
                    popupMenu.show();
                    return true;
                }
            }));
        });

        //Lopv(activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0))

        //第二页右上角imageButton*2
        ui.ShapeableImageViewButton.setOnClickListener(ControlClass.OnClickListener());
        ui.ShapeableImageViewButton_A.setOnClickListener(ControlClass.OnClickListener());
        //Home大按钮
        ui.HomeButton.setOnClickListener(ControlClass.OnClickListener());
        //主题颜色
        ui.ThemeColors.setOnClickListener(ControlClass.OnClickListener());
        //启动按钮
        ui.StartButton.setOnClickListener(ControlClass.OnClickListener());
        //侧拉菜单中调试日志按钮
        ui.DebugLog.setOnClickListener(ControlClass.OnClickListener());
        //侧拉菜单中打赏按钮
        ui.Donation.setOnClickListener(ControlClass.OnClickListener());
        //侧拉菜单中微信按钮
        ui.WeChat.setOnClickListener(ControlClass.OnClickListener());
        //侧拉菜单中支付宝按钮
        ui.Alipay.setOnClickListener(ControlClass.OnClickListener());
        //侧拉菜单中关于按钮
        ui.About.setOnClickListener(ControlClass.OnClickListener());
        //日志个性化
        ui.LogTheme.setOnClickListener(ControlClass.OnClickListener());
        //稳定模式按钮
        ui.stable_mode.setOnCheckedChangeListener(ControlClass.OnCheckedChangeListener());
        //音量上键停止所有脚本按钮
        ui.stop_all_on_volume_up.setOnCheckedChangeListener(ControlClass.OnCheckedChangeListener());
        //启动时不显示日志界面按钮
        ui.not_show_console.setOnCheckedChangeListener(ControlClass.OnCheckedChangeListener());
        //前台服务按钮
        ui.foreground_service.setOnCheckedChangeListener(ControlClass.OnCheckedChangeListener());
        //无障碍权限
        ui.AccessibilityPermissions.setOnCheckedChangeListener(ControlClass.OnCheckedChangeListener());
        //悬浮窗权限
        ui.FloatingWindowPWPermissions.setOnCheckedChangeListener(ControlClass.OnCheckedChangeListener());
    }





}
ActivityMain();



function Lopv(v) {
    var list = v;
    for (name in list) {
        try {
            log(list[name])
            log("--" + name)
        } catch (e) {}
    }
}

function Main() {
    //改变动画时间
    FloatyLog.setMessageStartAnimation(Storage.get("MessageStartAnimation") || 100);
    //最高容纳多少条消息
    FloatyLog.setMaxMessage(Storage.get("MaxMessage") || 10);
    //设置透明度
    FloatyLog.setMessageAlpha(Storage.get("LayoutAlpha") || 0.8);
    //设置消息时间开关
    FloatyLog.setisMessageTime(Storage.get("isMessageTime") && true);
    //设置消息颜色
    FloatyLog.setBackgroundColor(Storage.get("BackgroundColors") || [
        "#64363C",
        "#8E354A",
        "#FB9966",
        "#FFB11B",
        "#DDD23B",
        "#1E88A8",
        "#005CAF",
        "#C1328E",
        "#8E354A",
        "#3A3226"
    ]);
    FloatyLog.show();
    //置顶消息
    floastTopLog("日志");

    for (var i = 0; i < 10; i++) {
        floatyLog(ModuleClass.randomRange(1, 60));
        sleep(random(150, 1000))
        //sleep(random(10, 100))
    }
    //关闭悬浮窗
    FloatyLog.Stop();
    return 0;
}






function GeneralFloatyLog() {
    importClass(android.view.View);
    importClass(android.view.animation.BounceInterpolator);
    importClass(android.animation.ValueAnimator);
    importClass(android.view.animation.AlphaAnimation);
    importClass(android.view.animation.TranslateAnimation);
    importClass(android.animation.ObjectAnimator)
    importClass(android.animation.AnimatorListenerAdapter);
    importClass(android.animation.AnimatorSet);
    importClass(android.view.animation.LayoutAnimationController);
    importClass(android.view.animation.AnimationSet);
    //悬浮窗
    var FloatWindow = null;
    //动画时间
    var MessageStartAnimation = 100;
    //开启动画
    var isAnimation = true;
    //最高容纳几个消息
    var MaxMessage = 10;
    //消息颜色
    var BackgroundColor = [
        "#F4A7B9"
    ];
    //悬浮窗透明度
    var LayoutAlpha = 1;
    //是否开启消息时间
    var isMessageTime = true;
    //坐标
    var x, y = null;
    this.GetFloatWindow = function() {
        return FloatWindow;
    }
    this.setMessageStartAnimation = function(Parameter) {
        MessageStartAnimation = Parameter;
        return this;
    }
    this.setIsAnimation = function(Parameter) {
        isAnimation = Parameter;
        return this;
    }
    this.setMaxMessage = function(Parameter) {
        MaxMessage = Parameter;
        return this;
    }
    this.setMessageAlpha = function(Parameter) {
        LayoutAlpha = Parameter
        return this;
    }
    this.setBackgroundColor = function(ColorList) {
        BackgroundColor = ColorList;
        return this;
    }
    this.setisMessageTime = function(Exists) {
        isMessageTime = Exists;
        return this;
    }
    this.Stop = function(Parameter) {
        if (FloatWindow == null) {
            return false;
        }
        ui.run(function() {
            FloatWindow.chronometer.stop();
            SetExitAnimation(FloatWindow.Layout);
        });
        return true;
    }
    this.show = function() {
        FloatWindow = floaty.rawWindow(
            <LinearLayout margin="20 10 0 10" layout_width="match_parent" layout_height="match_parent" id="Layout" orientation="vertical">
                    <LinearLayout  layout_height="1" layout_width="{{device.width}}"/>
                    <LinearLayout  orientation="vertical">
                        <androidx.cardview.widget.CardView  cardBackgroundColor="#CA7A2C" cardElevation="0" cardCornerRadius="25"  contentPadding="5" foreground="?attr/selectableItemBackground" layout_width="wrap_content">
                            <Chronometer id="chronometer" margin="5 0 5 0" textSize="15dp" textColor="#fafafa" style="Widget/AppCompat.Button.Borderless" textStyle="bold" />
                        </androidx.cardview.widget.CardView>
                    </LinearLayout>
                    <LinearLayout id="MessageLayout" orientation="vertical">
                    </LinearLayout>
                </LinearLayout>
        );
        //设置透明度
        FloatWindow.MessageLayout.setAlpha(LayoutAlpha);
        //不可触摸
        FloatWindow.setTouchable(false);
        //开始计时
        FloatWindow.chronometer.start();
        //设置动画
        FloatWindow.Layout.setLayoutAnimation(BuildAnimation());
        //普通消息
        floatyLog = function(Message) {
            let Time = dateFormat(new Date(), "HH:mm:ss");
            //log(Message)
            ui.run(function() {
                //待删除控件
                var EndView = null;
                //创建控件
                var MessageView = BuildMessageView(FloatWindow.Layout);
                //设置消息
                MessageView.Text.setText(Message + "");
                //设置时间
                MessageView.Time.setText(Time);
                //判断是否关闭时间显示
                if (!isMessageTime) {
                    MessageView.Time.attr('visibility', 'gone');
                }
                //动画倍率
                var AnimationMultiplyingPower = 1;
                MessageView.setCardBackgroundColor(colors.parseColor(BackgroundColor[random(0, BackgroundColor.length - 1)]));
                if (FloatWindow.MessageLayout.getChildCount() >= MaxMessage) {
                    //找出未执行动画的控件
                    var LayoutLength = FloatWindow.MessageLayout.getChildCount();
                    for (var i = 0; i < LayoutLength; i++) {
                        var view = FloatWindow.MessageLayout.getChildAt(i);
                        if (view.clickable == false) {
                            EndView = view;
                            AnimationMultiplyingPower = i + 1;
                            break;
                        }
                    }
                }
                //添加控件
                FloatWindow.MessageLayout.addView(MessageView.TextLayout);
                //开启动画
                SetAnimationStart(MessageView.TextLayout, EndView, AnimationMultiplyingPower);
                MessageView.TextLayout.attr('visibility', 'visible');
            })
        }
        //置顶消息
        floastTopLog = function(Message) {
            ui.run(function() {
                FloatWindow.chronometer.setFormat(Message + '\tTime: %s');
            });
        }
        return this;
    }

    //消息出现|消失动画
    function SetAnimationStart(StartView, EndView, AnimationMultiplyingPower) {
        if (EndView) {
            EndView.setClickable(true);
            var exitViewHidght = getViewHeight(EndView, true);
            var animator_C = ObjectAnimator.ofFloat(EndView, "translationY", 0, 0 - exitViewHidght * AnimationMultiplyingPower);
            var animator_E = ObjectAnimator.ofFloat("alpha", 0, 0 - exitViewHidght * AnimationMultiplyingPower);
            /*
            animator_E.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
                onAnimationUpdate: function(animation) {
                    //避免脚本停止后报错
                    if (!GetCurrentScriptRunningStatus()) {
                        return 0;
                    }
                    var params = EndView.getLayoutParams();
                    params.topMargin = animation.getAnimatedValue();
                    EndView.setLayoutParams(params);
                }
            }));
            */
            animator_C.addListener(new AnimatorListenerAdapter({
                onAnimationEnd: function(animation) {
                    //避免脚本停止后报错
                    if (!GetCurrentScriptRunningStatus()) {
                        return 0;
                    }
                    threads.start(function() {
                        ui.run(function() {
                            FloatWindow.MessageLayout.removeViewAt(0);
                        });
                    });
                }
            }));
            var animator_D = ObjectAnimator.ofFloat(EndView, "alpha", 1, 0);
        }
        var animator_A = ObjectAnimator.ofFloat(StartView, "alpha", 0, 1);
        var animator_B = ObjectAnimator.ofFloat(StartView, "translationX", device.width / 2, 0);
        //var mTimeInterpolator = new BounceInterpolator();
        //animator_B.setInterpolator(mTimeInterpolator);
        var set = new AnimatorSet();
        if (!EndView) {
            set.playTogether(animator_A, animator_B);
        } else {
            set.playTogether(animator_A, animator_B, animator_C, animator_D, animator_E);
        }
        set.setDuration(MessageStartAnimation); //动画时间
        set.start();
    }

    //悬浮窗退出动画
    function SetExitAnimation(ExitView) {
        var animator_A = ObjectAnimator.ofFloat(ExitView, "alpha", 1, 0);
        var animator_B = ObjectAnimator.ofFloat(ExitView, "translationX", 0, device.width / 2);
        animator_B.addListener(new AnimatorListenerAdapter({
            onAnimationEnd: function(animation) {
                //避免脚本停止后报错
                if (!GetCurrentScriptRunningStatus()) {
                    return 0;
                }
                threads.start(function() {
                    ui.run(function() {
                        FloatWindow.close();
                    });
                });
            }
        }));
        var set = new AnimatorSet();
        set.playTogether(animator_A, animator_B);
        set.setDuration(MessageStartAnimation); //动画时间
        set.start();
    }

    function BuildMessageView(ParentView) {
        return ui.inflate(
            <androidx.cardview.widget.CardView  id="TextLayout" cardBackgroundColor="#E16B8C" cardElevation="0" margin="0 2 20 0" cardCornerRadius="25"  contentPadding="5" foreground="?attr/selectableItemBackground" layout_width="wrap_content">
                <LinearLayout  orientation="vertical">
                    <text id="Text" text="" margin="5 0 5 0" textSize="11dp" textColor="#fafafa" textStyle="bold"/>
                    <text id="Time" text="" margin="15 0 15 0" textSize="10dp" textColor="#fafafa" textStyle="bold" gravity="right" />
                </LinearLayout>
            </androidx.cardview.widget.CardView>, ParentView);
    }

    function BuildAnimation() {
        var AnimatSet = new AnimationSet(true);
        var Animation = new AlphaAnimation(0, 1);
        Animation.setDuration(250);
        AnimatSet.addAnimation(Animation);
        Animation = new TranslateAnimation(Animation.RELATIVE_TO_SELF, 1, Animation.RELATIVE_TO_SELF, 0, Animation.RELATIVE_TO_SELF, 0, Animation.RELATIVE_TO_SELF, 0);
        Animation.setDuration(250);
        AnimatSet.addAnimation(Animation);
        return new LayoutAnimationController(AnimatSet, 0.25);
    }


    /**
     * 获取控件的高度或者宽度
     *   isHeight=true     则为测量该控件的高度
     *   isHeight=false    则为测量该控件的宽度
     * @param view
     * @param isHeight
     * @return
     */
    function getViewHeight(view, isHeight) {
        if (view == null) return 0;
        var result;
        var w = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        var h = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        view.measure(w, h);
        if (isHeight) {
            result = view.getMeasuredHeight();
        } else {
            result = view.getMeasuredWidth();
        }
        return result;
    }

    function dateFormat(date, fmt_str) {
        return java.text.SimpleDateFormat(fmt_str).format(new Date(date || new Date()));
    }

    //获取当前脚本运行状态
    function GetCurrentScriptRunningStatus() {
        var EnginesSource = engines.myEngine().getSource();
        var EnginesList = engines.all();
        if (EnginesList.length == 0) {
            return false;
        }
        for (var i = 0; i < EnginesList.length; i++) {
            if (EnginesList[i].source == EnginesSource) {
                return true;
            }
        }
        return false;
    }
    return this;
}